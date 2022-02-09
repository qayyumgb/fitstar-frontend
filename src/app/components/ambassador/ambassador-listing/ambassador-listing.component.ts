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
  loading: boolean = false;
  msgs: Message[] = [];
  position: string;
  AbbassadorData:any=[];
  AbbassodordataById:any=[]

  activityValues: number[] = [0, 100];
  constructor(private cd: ChangeDetectorRef, private AbbassadorService:AbbassadorService, private toastr: ToastrService ,private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService ,private confirmationService: ConfirmationService ,private messageService: MessageService,private PrimeNGConfig:PrimeNGConfig) { }


  ngOnInit(): void {
    this.createAmbassador = this.formBuilder.group(
      {
        abbassadorName: ['', Validators.required],
        tagLine: ['', Validators.required],
        instagramUrl: ['', Validators.required],
        facebookUrl: ['', Validators.required],
        youtubeUrl: ['', Validators.required],
        twitterUrl: ['', Validators.required],
        description:['',Validators.required],
        userProfile:['',Validators.required],
        file: [null],
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
  this.createAmbassador.reset()
  }


  clear(table: Table) {
    table.clear();
  }

// Delete Record Confirm Popup


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
  this.AbbassadorService.getAllUser()
    .subscribe(
      data=> {
        this.AbbassadorData = data;
        console.log(data);
        console.log("Oie data ah gya ha agey kam kir hun ")
        console.log('Getting Vaule from DB'+this.AbbassadorData)

      },

      error => {
        console.log(error);
      });
}

getUserById(id?:any): void{

  this.AbbassadorService.getUserById(id)
    .subscribe(
      data => {
        this.AbbassodordataById=data
        console.log(data);
        console.log(this.AbbassodordataById)
      },
      error => {
        console.log(error);
      });

}

CreateNewUser(){
  console.log("sending data to service side")
  this.AbbassadorService.CreateNewUser(this.createAmbassador.value)
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

  this.AbbassadorService.deleteUser(id)
    .subscribe(
      data => {
        this.AbbassodordataById=data
        console.log(data);
        console.log(this.AbbassodordataById)
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
          file: reader.result
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
      file: [null]
    });
  }


}
