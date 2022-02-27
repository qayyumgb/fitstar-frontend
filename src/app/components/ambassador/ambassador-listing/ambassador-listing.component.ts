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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService ,ConfirmEventType, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {AbbassadorService} from '../../../services/AbbassadorService/abbassador.service'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

// import { UserService, AlertService } from '@app/_services';

@Component({
  selector: 'app-ambassador-listing',
  templateUrl: './ambassador-listing.component.html',
  styleUrls: ['./ambassador-listing.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class AmbassadorListingComponent implements OnInit {
  modalRef?: BsModalRef;
  createAmbassador: FormGroup;
  ambassadorList: ambassadorList[];
  // representatives: Representative[];
  checked1: boolean = false;
  statuses: any[]
  // loading: boolean = false;
  msgs: Message[] = [];
  position: string;
  AbbassadorData:any=[];
  AbbassodordataById:any=[];
  loading = true;
  id!: string;
  activityValues: number[] = [0, 100];


  dtConfig: any = {
    id: 'ambassadors',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  constructor(  private router: Router,private route: ActivatedRoute,private spinner: NgxSpinnerService, private cd: ChangeDetectorRef, private AbbassadorService:AbbassadorService, private toastr: ToastrService ,private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService ,private confirmationService: ConfirmationService ,private messageService: MessageService,private PrimeNGConfig:PrimeNGConfig) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createAmbassador = this.formBuilder.group(
      {
        name: ['', Validators.required],
        tagLine: ['', Validators.required],
        instagram: ['', Validators.required],
        facebook: ['', Validators.required],
        youtube: ['', Validators.required],
        tiwtter: ['', Validators.required],
        description:['',Validators.required],
        userProfile:['',Validators.required],
        picture:  [null],
      }
    );

    this.shopSevice.getAmbassadorList().then(ambassadors => {
      this.ambassadorList = ambassadors;
      this.loading = false;
    });

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" }
    ];
    this.PrimeNGConfig.ripple = true;

    this.UsersRecord();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.createAmbassador.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:"ambassadorListingModal"});
  }


  submitted = false
  onSubmit(): void {
    this.submitted = true;
    if (this.createAmbassador.invalid) {
      return;
    }
    else
    console.log(this.createAmbassador.value)
    this.CreateNewUser();
  }


  clear(table: Table) {
    table.clear();
  }

// Delete Record Confirm Popup

OnDeleteRecord(_id:any) {

  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.AbbassadorService.deleteUser(_id)
        .subscribe(
          (data:any) => {
            this.toastr.success(data.message);
            this.UsersRecord();

          },
          error => {
            console.log(error);
          });
      },
      reject: (type:any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
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
  let limit= this.dtConfig.itemsPerPage;
  let offset= this.dtConfig.currentPage;
  this.AbbassadorService.getAllAmbassador(limit,offset)
    .subscribe(
      (data:any)=> {
        this.dtConfig.totalItems = data.totalRecord;
        this.AbbassadorData = data.ambassador;
        console.log("Total Items::", this.dtConfig.totalItems);
        console.log(data.ambassador);
        console.log("Oie data ah gya ha agey kam kir hun ")
        console.log('Getting Vaule from DB :::::'+this.AbbassadorData)

      },

      error => {
        console.log(error);
      });
}


CreateNewUser(){
  const formData =this.createAmbassador.value
  delete formData.userProfile
  console.log(formData)
  console.log("sending data to service side")
  this.AbbassadorService.CreateNewUser(formData)
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
this.UsersRecord();
        },
        error => {
          console.log(error);
        });
}


updateAmbassador(id:any): void {
  this.AbbassadorService.update(id,this.AbbassadorData.ambassador)
    .subscribe(
      response => {
        console.log(response);
        console.log(this.AbbassadorData._id)
        console.log(this.AbbassadorData.ambassador)

        // this.toastr.success(response.message);
      },
      error => {
        console.log(error);
      });
}

private updateUser() {
  this.AbbassadorService.update(this.id, this.AbbassadorData.ambassador)
      .pipe(first())
      .subscribe(
        response => {
          console.log(response);
          console.log(this.AbbassadorData._id)
          console.log(this.AbbassadorData.ambassador)

          // this.toastr.success(response.message);
        },
        error => {
          console.log(error);
        });

}




  /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.createAmbassador.patchValue({
          picture:reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.createAmbassador.patchValue({
      picture: [null]
    });
  }

  limitChanged(value:any) {
    this.dtConfig.itemsPerPage = value;
    this.dtConfig.currentPage = 1;
    this.UsersRecord();
  }

  pageChanged(event:any) {
    this.dtConfig.currentPage = event;
    this.UsersRecord();
  }
}
