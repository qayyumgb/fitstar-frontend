import { Component, OnInit, TemplateRef, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
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
import { userlist } from '../../../globalInterface/global.interface';

import {MustMatch} from '../../../_helpers/must-match-validitor'
import {ConfirmationService ,ConfirmEventType, MessageService} from 'primeng/api';
// import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import {UsersService} from '../../../services/UserService/users.service';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class CreateShopComponent implements OnInit {
  modalRef?: BsModalRef;
  createUser: FormGroup;
  userList: userlist[];
  // representatives: Representative[];
  checked1: boolean = false;
  statuses: any[]
  loading: boolean = false;
  position: string;

  userRole: any[];
  selectedRole: any[];

  activityValues: number[] = [0, 100];

  UsersData:any[]=[];
  userdataById:any[]
  NewUserData:any[]




  constructor(private userService:UsersService,private messageService: MessageService,private toastr: ToastrService, private modalService: BsModalService, private formBuilder: FormBuilder,private cd: ChangeDetectorRef, private shopSevice: ShopService,private confirmationService: ConfirmationService ,private PrimeNGConfig:PrimeNGConfig) { }

  ngOnInit(): void {
    this.UsersRecord();


    this.createUser = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        cpassword: ['', Validators.required],
        location: ['', Validators.required],
        role: ['', Validators.required],
        ProfileImage:['',Validators.required],
        Imagefile: [null],
      },{
        validator: MustMatch('password', 'cpassword')

      }
    );

    this.shopSevice.getCustomersLarge().then(users => {
      this.userList = users;
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

    this.userRole = [
      {name: 'Admin', code: 'admin'},
      {name: 'Fitness Center', code: 'center'},
      {name: 'Fitness Model', code: 'model'},
      {name: 'Fitness Professional', code: 'pro'},

  ];
  }






  get f(): { [key: string]: AbstractControl } {
    return this.createUser.controls;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  submitted = false


  onSubmit(): void {

    this.submitted = true;
    if (this.createUser.invalid) {
      return;
    }
    else
    this.CreateNewUser()
      console.log(this.createUser.value)


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
    let limit = 5;
    let offset = 1;
    this.userService.getAllUser(limit,offset)
      .subscribe(
        data=> {
          // this.UsersData = data;
          console.log(data);
          console.log("Oie data ah gya ha agey kam kir hun ")
          // console.log('Getting Vaule from DB'+this.UsersData)

        },

        error => {
          console.log(error);
        });
  }

  getUserById(id?:any): void{

    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.userdataById=data
          console.log(data);
          console.log(this.userdataById)
        },
        error => {
          console.log(error);
        });

  }

  CreateNewUser(){
    const formData =this.createUser.value;
    delete formData.ProfileImage
    console.log(formData)
    console.log("sending data to service side")
    this.userService.CreateNewUser(formData)
        .subscribe(
          response => {

            this.toastr.success('User  Added  Succesfully','',{
              timeOut: 4000,
            });
            console.log(response);
            this.submitted = true;
            this.modalService.hide();
            // window.location.reload()

          },
          error => {
            console.log(error);
          });
  }

  DeleteUserById(id?:any): void{

    this.userService.deleteUser(id)
      .subscribe(
        data => {
          this.userdataById=data
          console.log(data);
          console.log(this.userdataById)
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
      this.createUser.patchValue({
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
  this.createUser.patchValue({
    file: [null]
  });
}


}
