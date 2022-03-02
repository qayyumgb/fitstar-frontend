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
import { ToastrService } from 'ngx-toastr';
import {SponserService} from '../../../services/SponserService/sponser.service'
import { CreateUpdateSponsors, ISponsors } from 'src/app/shared/interface/sponsor.interface';


@Component({
  selector: 'app-sponsor-listing',
  templateUrl: './sponsor-listing.component.html',
  styleUrls: ['./sponsor-listing.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class SponsorListingComponent implements OnInit {
  openCreateEditModal: boolean = false;
  modalRef?: BsModalRef;
  createsponsor: FormGroup;
  sponserList: ambassadorList[];
  // representatives: Representative[];
  checked1: boolean = false;
  statuses: any[]
  loading: boolean = false;
  msgs: Message[] = [];
  position: string;
SponserData:any=[];
// data:{};
SponerdataById:any[];
  activityValues: number[] = [0, 100];
  searchText: string = '';

  dtConfig: any = {
    id: 'sponsors',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  editSponsorData: ISponsors;
  constructor(private cd: ChangeDetectorRef,private toastr: ToastrService,private SponserService :SponserService,private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService ,private confirmationService: ConfirmationService ,private messageService: MessageService,private PrimeNGConfig:PrimeNGConfig) { }


  ngOnInit(): void {

    this.getAllSponsors();
    this.PrimeNGConfig.ripple = true;

  }








  clear(table: Table) {
    table.clear();
  }

// Delete Record Confirm Popup


OnDeleteRecord(id:any) {

console.log('delete')
  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.SponserService.deleteUser(id)
        .subscribe(
          data => {

            this.toastr.success('User Deleted Succesfully', 'Deleting User!',{
              timeOut: 4000,
            });
            this.getAllSponsors();

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


// Getting All Sponsors Records
getAllSponsors(): void {
  let limit= this.dtConfig.itemsPerPage;
  let offset= this.dtConfig.currentPage;
  this.SponserService.getAllSponser(limit,offset)
    .subscribe(
      (data:any)=> {
        console.log(data)

        this.SponserData=data.sponsors
        console.log(this.SponserData)
        console.log("Total Items::", this.dtConfig.totalItems);
        console.log(data.sponsors);
        console.log("Oie data ah gya ha agey kam kir hun ")
        console.log('Getting Vaule from DB :::::'+this.SponserData)
      },

      error => {
        console.log(error);
      });
}






SponsorModal(response: boolean) {
  this.openCreateEditModal = response;
}


updateButtonState(item: ISponsors) {
  let requestBody = {} as CreateUpdateSponsors;
  requestBody._id = item._id;
  requestBody.active = item.active;
  this.SponserService.updateSponsors(requestBody).subscribe(
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
    this.SponserService.getSearchResult(this.searchText).subscribe(response => {
      this.SponserData = response.sponsors;
    })
  }
  else {
    this.getAllSponsors();
  }

}


 limitChanged(value:any) {
  this.dtConfig.itemsPerPage = value;
  this.dtConfig.currentPage = 1;
  this.getAllSponsors();
}

pageChanged(event:any) {
  this.dtConfig.currentPage = event;
  this.getAllSponsors();
}


editSponsor(item: ISponsors) {

  this.SponsorModal(true);
  this.editSponsorData = item;
}
}
