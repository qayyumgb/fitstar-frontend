import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Table } from 'primeng/table';
// import { MessageService } from "primeng/api";
import { ambassadorList } from '../../../globalInterface/global.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/UserService/users.service';
import { addUsers } from 'src/app/Models/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class UserListComponent implements OnInit {
  modalRef?: BsModalRef;
  createsponsor: FormGroup;
  sponserList: ambassadorList[];
  // representatives: Representative[];
  checked1: boolean = false;
  statuses: any[];
  loading: boolean = false;
  msgs: Message[] = [];
  position: string;
  usersList: any= [];
  dtConfig: any = {
    id: 'users',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  // data:{};
  SponerdataById: any[];
  activityValues: number[] = [0, 100];
  constructor(
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private userService: UsersService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private PrimeNGConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.createsponsor = this.formBuilder.group({
      userProfile: ['', Validators.required],
      image: [null],
    });

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ];
    this.PrimeNGConfig.ripple = true;
    this.UsersRecord();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.createsponsor.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitted = false;
  onSubmit(): void {
    this.submitted = true;
    if (this.createsponsor.invalid) {
      return;
    } else this.CreateNewUser();
    console.log(this.createsponsor.value);
  }

  clear(table: Table) {
    table.clear();
  }

  // Delete Record Confirm Popup

  OnDeleteRecord(position: string) {
    this.position = position;
    console.log('delete');
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
      key: 'deleteAlert',
    });
  }

  // Getting All Sponsors Records
  UsersRecord(): void {
    let limit= this.dtConfig.itemsPerPage;
    let offset= this.dtConfig.currentPage;
    this.userService.getAllUser(limit,offset).subscribe(
      (data) => {
        console.log("DATA::::", data);
        this.dtConfig.totalItems = data.totalRecord;
        this.usersList = data.users;
        // this.usersList = [...data.users];
        console.log("Total Items::", this.dtConfig.totalItems);
        console.log('Getting Vaule from DB:::', this.usersList);
      },

      (error) => {
        console.log(error);
      }
    );
  }

  getUserById(id?: any): void {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.SponerdataById = data;
        console.log(data);
        console.log(this.SponerdataById);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  CreateNewUser() {
    const formData = this.createsponsor.value;
    delete formData.userProfile;
    console.log(formData);
    console.log('sending data to service side');
    this.userService.CreateNewUser(formData).subscribe(
      (response) => {
        console.log('data addedd');
        this.toastr.success('usersList Added  Succesfully', '', {
          timeOut: 2000,
        });
        console.log(response);
        this.submitted = true;
        // this.createAmbassador.value.reset
        this.modalService.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  DeleteUserById(id?: any): void {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        this.SponerdataById = data;
        console.log(data);
        console.log(this.SponerdataById);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any =
    'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.createsponsor.patchValue({
          image: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl =
      'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.createsponsor.patchValue({
      file: [null],
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
