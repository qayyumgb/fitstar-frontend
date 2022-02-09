import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ShopService } from 'src/app/services/shopService/shop.service';
import { Table } from 'primeng/table';
// import { MessageService } from "primeng/api";
import { ambassadorList } from '../../../globalInterface/global.interface';

import {ConfirmationService ,ConfirmEventType, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {BlogPostService} from '../../../services/BlogPostService/blog-post.service'
import { ToastrService } from 'ngx-toastr';
import {TooltipModule} from 'primeng/tooltip';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class BlogComponent implements OnInit {

  modalRef?: BsModalRef;
  createBlogPost: FormGroup;
  ambassadorList: ambassadorList[];
  // representatives: Representative[];
  checked1: boolean = false;
  selectedcatagory: any[]
  catagory: any[];
  loading: boolean = false;
  position: string;
  BlogPostData:any[]
  BlogdataById:any[]
  activityValues: number[] = [0, 100];
  constructor(private toastr: ToastrService, private cd: ChangeDetectorRef,private BlogPostService:BlogPostService, private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService ,private confirmationService: ConfirmationService ,private messageService: MessageService,private PrimeNGConfig:PrimeNGConfig) { }


  ngOnInit(): void {
    this.createBlogPost = this.formBuilder.group(
      {
        blogTitile: ['', Validators.required],
        shortdescription: ['', Validators.required],
        authorName: ['', Validators.required],
        catagory: ['', Validators.required],
        featuredImage: ['', Validators.required],
        authorImage: ['', Validators.required],
        secoundFeaturedImage: ['', Validators.required],
        videolink: ['', Validators.required],
        typeDetail: ['', Validators.required],
        file:[null],
        featuredimage:[null],
        secFeaturedImaga:[null]

      }
    );

    this.shopSevice.getAmbassadorList().then(ambassadors => {
      this.ambassadorList = ambassadors;
      this.loading = false;
    });

    this.catagory = [
      { label: "Nutrition", value: "nutrition" },
      { label: "Recipies", value: "recipies" },
      { label: "Workouts", value: "workouts" },
      { label: "Reviews", value: "reviews" },
      { label: "Podcasts", value: "podcasts" },
      { label: "Music", value: "music" },
      { label: "News", value: "news" }
    ];
  }
  get f(): { [key: string]: AbstractControl } {
    return this.createBlogPost.controls;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:"BlogListingModal"});
  }
  submitted = false
  onSubmit(): void {
    this.submitted = true;
    if (this.createBlogPost.invalid) {
      return;
    }
    else
    console.log(this.createBlogPost.value)
  this.createBlogPost.reset()
  }


  clear(table: Table) {
    table.clear();
  }
  OnDeleteRecord(position: string) {
    this.position = position;
  console.log('delete')
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
        },
        reject: (type:any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'}),{class:"BlogListingModal"};
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        },
        key: "deleteAlert"
    });
  }



  UsersRecord(): void {
    this.BlogPostService.getAllUser()
      .subscribe(
        data=> {
          this.BlogPostData = data;
          console.log(data);
          console.log("Oie data ah gya ha agey kam kir hun ")
          console.log('Getting Vaule from DB'+this.BlogPostData)

        },

        error => {
          console.log(error);
        });
  }

  getUserById(id?:any): void{

    this.BlogPostService.getUserById(id)
      .subscribe(
        data => {
          this.BlogdataById=data
          console.log(data);
          console.log(this.BlogdataById)
        },
        error => {
          console.log(error);
        });

  }

  CreateNewUser(){
    console.log("sending data to service side")
    this.BlogPostService.CreateNewUser(this.createBlogPost.value)
        .subscribe(
          response => {
            console.log('data addedd')
            this.toastr.success('Abbassador Data Added  Succesfully','',{
              timeOut: 2000,
            });
            console.log(response);
            this.submitted = true;
            this.modalService.hide();
            // this.createAmbassador.value.reset

          },
          error => {
            console.log(error);
          });
  }

  DeleteUserById(id?:any): void{

    this.BlogPostService.deleteUser(id)
      .subscribe(
        data => {
          this.BlogdataById=data
          console.log(data);
          console.log(this.BlogdataById)
        },
        error => {
          console.log(error);
        });

  }

  /*########################## Profile Image Upload ########################*/
  @ViewChild('profileImage') profileImg: ElementRef;
  ProfileimageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editProfileImg: boolean = true;
  removeProfileImg: boolean = false;

  uploadProfileFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.ProfileimageUrl = reader.result;
        this.createBlogPost.patchValue({
          file: reader.result
        });
        this.editProfileImg = false;
        this.removeProfileImg = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeprofileUploadedFile() {
    let newFileList = Array.from(this.profileImg.nativeElement.files);
    this.ProfileimageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editProfileImg = true;
    this.removeProfileImg = false;
    this.createBlogPost.patchValue({
      file: [null]
    });
  }

  ///////******** Featured Image******/

  @ViewChild('FeaturedImg') FeaturedImg: ElementRef;
  FeaturedImageUrl: any = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  editFeaturedImg: boolean = true;
  removeFeaturedImg: boolean = false;

  uploadFeauterdFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.FeaturedImageUrl = reader.result;
        this.createBlogPost.patchValue({
          featuredimage: reader.result
        });
        this.editFeaturedImg = false;
        this.removeFeaturedImg = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeFeaturedUploadedFile() {
    let newFileList = Array.from(this.FeaturedImg.nativeElement.files);
    this.FeaturedImageUrl = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    this.editFeaturedImg = true;
    this.removeFeaturedImg = false;
    this.createBlogPost.patchValue({
      featuredimage: [null]
    });
  }



///////******** Secoundary Featured Image******/

@ViewChild('SecFeaturedImg') secFeaturedImaga: ElementRef;


uploadSecFeauterdFile(event:any) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.createBlogPost.patchValue({
        secFeaturedImaga: reader.result

      });
    }
    debugger
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();
  }
}












  @ViewChild('uploadfile',{static: true}) ele: ElementRef;

  handleClick() {
    // document.getElementById('upload-file').click();
    this.ele.nativeElement.click();
    console.log('clicking event fire')
  }

  addAttachment(fileInput: any) {
    const fileReaded = fileInput.target.files[0];
    //  handle the rest
  }

}
