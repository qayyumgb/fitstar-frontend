import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ShopService } from 'src/app/services/shopService/shop.service';
import { CreateUpdateCollaborator, ICollaborator } from 'src/app/shared/interface/collaborator.interface';
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

  collaboratorList: ambassadorList[];
  // representatives: Representative[];
  checked1: boolean = false;
  statuses: any[]
  loading: boolean = false;
  msgs: Message[] = [];
  position: string;
  CollaboratorData: any = [];
  CollaboratordataById: any[];
  editCollaboratorData: ICollaborator;

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
    this.getCollaboratorRecord()
    this.shopSevice.getAmbassadorList().then(ambassadors => {
      this.collaboratorList = ambassadors;
      this.loading = false;
    });

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
              this.getCollaboratorRecord();
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


  getCollaboratorRecord(): void {
    let limit = this.dtConfig.itemsPerPage;
    let offset = this.dtConfig.currentPage;
    this.collaboratorService.getAllCollaborator(limit, offset)
      .subscribe(
        (data: any) => {
          console.log(data.collaborators);
          this.CollaboratorData = data.collaborators;
          console.log(`Getting data from ${this.CollaboratorData}`);
          console.log("Total Items::", this.dtConfig.totalItems);
          console.log(data.collaborators);
          console.log("Oie data ah gya ha agey kam kir hun ")
          console.log('Getting Vaule from DB :::::' + this.CollaboratorData)

        },

        error => {
          console.log(error);
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

  search() {
    if (this.searchText.length > 0) {
      this.collaboratorService.getSearchResult(this.searchText).subscribe(response => {
        this.CollaboratorData = response.collaborators;
      })
    }
    else {
      this.getCollaboratorRecord();
    }

  }



  limitChanged(value: any) {
    this.dtConfig.itemsPerPage = value;
    this.dtConfig.currentPage = 1;
    this.getCollaboratorRecord();
  }

  pageChanged(event: any) {
    this.dtConfig.currentPage = event;
    this.getCollaboratorRecord();
  }

  editCollaborator(item: ICollaborator) {

    this.collaboratorModal(true);
    this.editCollaboratorData = item;
  }
}
