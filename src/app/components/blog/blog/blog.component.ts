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
import { Blog, CreateUpdateBlogPost, IBlog, IBlogpost } from 'src/app/shared/interface/BlogPost.interface';
import { IPagination } from 'src/app/shared/interface/shared.interface';


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
  // representatives: Representative[];
  checked1: boolean = false;
  selectedcatagory: any[]
  catagory: any[];
  loading: boolean = false;
  position: string;
  BlogPostData: any[]=[];
  BlogdataById: any[]
  activityValues: number[] = [0, 100];
  // BlogData: any = [];
  dtConfig: any = {
    id: 'blogs',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  totalRecords: number;

  editBlogData: IBlogpost;


  constructor(private toastr: ToastrService, private cd: ChangeDetectorRef, private BlogPostService: BlogPostService, private modalService: BsModalService, private formBuilder: FormBuilder, private shopSevice: ShopService, private confirmationService: ConfirmationService, private messageService: MessageService, private PrimeNGConfig: PrimeNGConfig) { }


  ngOnInit(): void {


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


  search(searchText: any) {
    if (searchText.length > 0) {
      this.BlogPostService.getSearchResult(searchText).subscribe(response => {
        this.BlogPostData = response.blogs;
      })
    }
    else {
      this.apiDataLoad();
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






  editBlogPost(item: IBlogpost) {

    this.BlogModal(true);
    this.editBlogData = item;
  }



  apiDataLoad(event?: IPagination) {

    if (event?.globalFilter) {
      this.search(event.globalFilter)
      return
    }

    let _first = event?.first ? event?.first : 0;
    let _last = event?.rows ? event.rows + _first : 10;
    this.BlogPostService.getAllBlog(_last, _first + 1).subscribe(
      (data: IBlog) => {
        this.BlogPostData = data.blogs;
        this.totalRecords = data.totalRecord;
        console.log('Total Items::', this.BlogPostData);
      },
      (error) => {
        console.log(error);
      }
    );

  }






}
