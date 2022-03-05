import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ShopService } from 'src/app/services/shopService/shop.service';
import { CreateUpdateCollaborator, ICollaborator, ICollaborators } from 'src/app/shared/interface/collaborator.interface';
import { IPagination } from 'src/app/shared/interface/shared.interface';
// import { MessageService } from "primeng/api";
import { ambassadorList } from '../../../globalInterface/global.interface';
import { CollaboratorService } from '../../../services/collaboratorService/collaborator.service';

@Component({
  selector: 'app-collaborator-listing',
  templateUrl: './collaborator-listing.component.html',
  styleUrls: ['./collaborator-listing.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CollaboratorListingComponent implements OnInit {
  openCreateEditModal: boolean = false;

  // representatives: Representative[];
  checked1: boolean = false;
  statuses: any[]
  loading: boolean = false;
  msgs: Message[] = [];
  position: string;
  CollaboratorData: ICollaborator[];
  CollaboratordataById: any[];
  editCollaboratorData: ICollaborator;
  totalRecords: number;

  activityValues: number[] = [0, 100];
  searchText: string = '';
  dtConfig: any = {
    id: 'collaborators',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };


  constructor(private toastService: ToastrService, private collaboratorService: CollaboratorService, private shopSevice: ShopService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {


  }




  clear(table: Table) {
    table.clear();
  }

  // Delete Record Confirm Popup


  OnDeleteRecord(_id: any) {
    console.log('delete')
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.collaboratorService.deleteUser(_id)
          .subscribe(
            (data: any) => {
              this.toastService.success(data.message);
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




  collaboratorModal(response: boolean) {
    this.openCreateEditModal = response;
  }
  updateButtonState(item: ICollaborator) {
    let requestBody = {} as CreateUpdateCollaborator;
    requestBody._id = item._id;
    requestBody.active = item.active;
    this.collaboratorService.updateCollaborator(requestBody).subscribe(
      response => {
        this.toastService.success(response.message);
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  search(searchText: any) {
    if (this.searchText.length > 0) {
      this.collaboratorService.getSearchResult(searchText).subscribe(response => {
        this.CollaboratorData = response.collaborators;
      })
    }
    else {
      this.apiDataLoad();
    }

  }




  apiDataLoad(event?: IPagination) {

    if (event?.globalFilter) {
      this.search(event.globalFilter)
      return
    }

    let _first = event?.first ? event?.first : 0;
    let _last = event?.rows ? event.rows + _first : 10;
    this.collaboratorService.getAllCollaborator(_last, _first + 1).subscribe((data: ICollaborators) => {
      console.log('DATA::::', data.collaborators);
      this.CollaboratorData = data.collaborators;
      this.totalRecords = data.totalRecord;
      console.log('Total Items::', this.dtConfig.totalItems);
    },
      (error) => {
        console.log(error);
      }
    );

  }

  editCollaborator(item: ICollaborator) {
    ;
    this.collaboratorModal(true);
    this.editCollaboratorData = item;
  }
}
