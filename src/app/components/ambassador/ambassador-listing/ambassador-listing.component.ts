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
import { CreateUpdateAmbassador, IAmbassador } from 'src/app/shared/interface/ambassador.interface';

// import { UserService, AlertService } from '@app/_services';

@Component({
  selector: 'app-ambassador-listing',
  templateUrl: './ambassador-listing.component.html',
  styleUrls: ['./ambassador-listing.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class AmbassadorListingComponent implements OnInit {
  openCreateEditModal: boolean = false;
  modalRef?: BsModalRef;

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
  searchText: string = '';

  editAmbassadorData: IAmbassador;


  dtConfig: any = {
    id: 'ambassadors',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  constructor(  private router: Router,private route: ActivatedRoute,private spinner: NgxSpinnerService, private cd: ChangeDetectorRef, private AbbassadorService:AbbassadorService, private toastr: ToastrService ,private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService ,private confirmationService: ConfirmationService ,private messageService: MessageService,private PrimeNGConfig:PrimeNGConfig) { }


  ngOnInit(): void {

    this.getAmbassadorRecords();
    this.id = this.route.snapshot.params['id'];
    this.PrimeNGConfig.ripple = true;
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
            this.getAmbassadorRecords();

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

getAmbassadorRecords(): void {
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




AmbassdaorModal(response: boolean) {
  this.openCreateEditModal = response;
}

updateButtonState(item: IAmbassador) {
  let requestBody = {} as CreateUpdateAmbassador;
  requestBody._id = item._id;
  requestBody.active = item.active;
  this.AbbassadorService.updateAmbassador(requestBody).subscribe(
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
    this.AbbassadorService.getSearchResult(this.searchText).subscribe(response => {
      this.AbbassadorData = response.ambassadors;
    })
  }
  else {
    this.getAmbassadorRecords();
  }

}




  limitChanged(value:any) {
    this.dtConfig.itemsPerPage = value;
    this.dtConfig.currentPage = 1;
    this.getAmbassadorRecords();
  }

  pageChanged(event:any) {
    this.dtConfig.currentPage = event;
    this.getAmbassadorRecords();
  }

  editAmbassador(item: IAmbassador) {

    this.AmbassdaorModal(true);
    this.editAmbassadorData = item;
  }
}
