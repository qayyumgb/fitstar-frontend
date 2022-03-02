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

import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { BlogPostService } from '../../../services/BlogPostService/blog-post.service'
import { ToastrService } from 'ngx-toastr';
import { TooltipModule } from 'primeng/tooltip';
import { CreateUpdateBlogPost, IBlogpost } from 'src/app/shared/interface/BlogPost.interface';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BlogComponent implements OnInit {
  openCreateEditModal: boolean = false;
  modalRef?: BsModalRef;
  createBlogPost: FormGroup;
  ambassadorList: ambassadorList[];
  // representatives: Representative[];
  checked1: boolean = false;
  selectedcatagory: any[]
  catagory: any[];
  loading: boolean = false;
  position: string;
  BlogPostData: any[]
  BlogdataById: any[]
  activityValues: number[] = [0, 100];
  searchText: string = '';
  BlogData:any=[];
  dtConfig: any = {
    id: 'blogs',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  editBlogData: IBlogpost;


  constructor(private toastr: ToastrService, private cd: ChangeDetectorRef, private BlogPostService: BlogPostService, private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService, private confirmationService: ConfirmationService, private messageService: MessageService, private PrimeNGConfig: PrimeNGConfig) { }


  ngOnInit(): void {
    this.getBlogPosts()
    this.createBlogPost = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        authorName: ['', Validators.required],
        category: ['', Validators.required],
        featuredImage: ['', Validators.required],
        authorProfile: ['', Validators.required],
        secoundFeaturedImage: ['', Validators.required],
        videoLink: ['', Validators.required],
        details: ['', Validators.required],
        authorImage: [null],
        featuredImageOne: [null],
        featuredImageTwo: [null]

      }
    );

    this.shopSevice.getAmbassadorList().then(ambassadors => {
      this.ambassadorList = ambassadors;
      this.loading = false;
    });

    this.catagory = [
      { label: "Nutrition", value: "Nutrition" },
      { label: "Recipies", value: "Recipies" },
      { label: "Workouts", value: "Workouts" },
      { label: "Reviews", value: "Reviews" },
      { label: "Podcasts", value: "Podcasts" },
      { label: "Music", value: "Music" },
      { label: "News", value: "News" }
    ];
  }


  get f(): { [key: string]: AbstractControl } {
    return this.createBlogPost.controls;
  }





  BlogModal(response: boolean) {
    this.openCreateEditModal = response;
  }







  clear(table: Table) {
    table.clear();
  }




  getBlogPosts(): void {
    let limit = this.dtConfig.itemsPerPage;
    let offset = this.dtConfig.currentPage;
    this.BlogPostService.getAllBlog(limit, offset)
      .subscribe(
        (data: any) => {
          this.BlogPostData = data.blogs;
          console.log(data.blogs);
          console.log("Oie data ah gya ha agey kam kir hun ")
          console.log('Getting Vaule from DB' + this.BlogPostData)
          console.log("Total Items::", this.dtConfig.totalItems);
          console.log(data.blogs);
          console.log("Oie data ah gya ha agey kam kir hun ")
          console.log('Getting Vaule from DB :::::' + this.BlogPostData)
        },

        error => {
          console.log(error);
        });
  }



  updateButtonState(item: IBlogpost) {
    let requestBody = {} as CreateUpdateBlogPost;
    requestBody._id = item._id;
    requestBody.active = item.active;
    this.BlogPostService.updateBlogPost(requestBody).subscribe(
      response => {
        this.toastr.success(response.message);
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }


  search() {
    if (this.searchText.length > 0) {
      this.BlogPostService.getSearchResult(this.searchText).subscribe(response => {
        this.BlogData = response.blogs;
      })
    }
    else {
      this.getBlogPosts();
    }

  }



  OnDeleteRecord(_id: any) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.BlogPostService.deleteUser(_id)
          .subscribe(
            (data: any) => {
              this.toastr.success(data.message);
              this.getBlogPosts();

            },
            error => {
              console.log(error);
            });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: "deleteAlert"
    });
  }




  limitChanged(value: any) {
    this.dtConfig.itemsPerPage = value;
    this.dtConfig.currentPage = 1;
    this.getBlogPosts();
  }

  pageChanged(event: any) {
    this.dtConfig.currentPage = event;
    this.getBlogPosts();
  }


  editBlogPost(item: IBlogpost) {

    this.BlogModal(true);
    this.editBlogData = item;
  }








}
