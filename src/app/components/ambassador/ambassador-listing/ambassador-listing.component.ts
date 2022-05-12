import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ShopService } from 'src/app/services/shopService/shop.service';
import { CreateUpdateAmbassador, IAmbassador, IAmbassadors } from 'src/app/shared/interface/ambassador.interface';
import { IPagination } from 'src/app/shared/interface/shared.interface';
// import { MessageService } from "primeng/api";
import { ambassadorList } from '../../../globalInterface/global.interface';
import { AbbassadorService } from '../../../services/AbbassadorService/abbassador.service';

// import { UserService, AlertService } from '@app/_services';

@Component({
  selector: 'app-ambassador-listing',
  templateUrl: './ambassador-listing.component.html',
  styleUrls: ['./ambassador-listing.component.scss'],
  providers: [ConfirmationService, MessageService]
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
  AbbassadorData: IAmbassador[] = [];
  AbbassodordataById: any = [];
  loading = false;
  id!: string;
  activityValues: number[] = [0, 100];
  totalRecords: number;
  editAmbassadorData: IAmbassador;
  public ambassadorsData= this.apiDataLoad()


  dtConfig: any = {
    id: 'ambassadors',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, private cd: ChangeDetectorRef, private AbbassadorService: AbbassadorService, private toastr: ToastrService, private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService, private confirmationService: ConfirmationService, private messageService: MessageService, private PrimeNGConfig: PrimeNGConfig) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.PrimeNGConfig.ripple = true;
  }

  clear(table: Table) {
    table.clear();
  }

  // Delete Record Confirm Popup

  OnDeleteRecord(_id: any) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.AbbassadorService.deleteUser(_id)
          .subscribe(
            (data: any) => {
              this.toastr.success(data.message);
              this.apiDataLoad();

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

  AmbassdaorModal(response: boolean) {
    this.openCreateEditModal = response;
    this.apiDataLoad()
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

  search(searchText: string | null, event?: IPagination) {
    if (searchText?.length) {
      let _first = event?.first ? event?.first : 0;
      let _last = event?.rows ? event.rows + _first : 10;
      this.AbbassadorService.getSearchResult(searchText,_last, _first + 1).subscribe(response => {
        this.AbbassadorData = response.ambassador;
      })
    }
    else {
      this.apiDataLoad();
    }

  }


  editAmbassador(item: IAmbassador) {

    this.AmbassdaorModal(true);
    this.editAmbassadorData = item;
    this.apiDataLoad()
  }


  apiDataLoad(event?: IPagination) {

    if (event?.globalFilter) {
      this.search(event.globalFilter)
      return
    }
   debugger
    let _first = event?.first ? event?.first : 0;
    let _last = event?.rows ? event.rows + _first : 10;
debugger
    this.AbbassadorService.getAllAmbassador(_last, _first + 1).subscribe(
      (data: IAmbassadors) => {
        console.log(_first)
        console.log('DATA::::', data.ambassador);
        this.AbbassadorData = data.ambassador;
        this.totalRecords = data.totalRecord;
        console.log('Total Items::', this.dtConfig.totalItems);
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
