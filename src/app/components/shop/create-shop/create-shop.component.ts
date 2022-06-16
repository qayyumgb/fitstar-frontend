import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectorRef,
  ElementRef,
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

import { MustMatch } from '../../../_helpers/must-match-validitor';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
// import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { AddUsersService } from '../../../services/AddUserService/add-users.service';
import { IShopStatusInterface, IShopUser, IShopUserEntity, UserStatusEnum } from 'src/app/shared/interface/shop-user.interface';
import { IPagination } from 'src/app/shared/interface/shared.interface';
import { Country, State, City } from 'country-state-city';
interface Country {
  shortName: string;
  name: string;
}
@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CreateShopComponent implements OnInit {
  modalRef?: BsModalRef;
  createUser: FormGroup;
  // representatives: Representative[];
  checked1: boolean = false;
  statuses: any[];
  loading: boolean = false;
  position: string;
  isLoading = false
  userRole: any[];
  selectedRole: any[];
  totalRecords: number
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  countryData: any;
  stateData: any;
  cityData: any;
  activityValues: number[] = [0, 100];

  userdataById: any[];

  usersArray: any = [];
  dtConfig: any = {
    id: 'users',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };

  countries = Country.getAllCountries();
  states: any;
  cities: any;
  constructor(
    private userService: AddUsersService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private PrimeNGConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {

    this.createUser = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        cpassword: ['', Validators.required],
        // location: ['', Validators.required],
        location: this.formBuilder.group({
          country: ['', Validators.required],
          state: [null],
          city: [null],
        }),
        role: ['', Validators.required],
        ProfileImage: ['', Validators.required],
        file: [null],
        image: [null],
      },
      {
        validator: MustMatch('password', 'cpassword'),
      }
    );

    // this.shopSevice.getCustomersLarge().then(users => {
    //   this.loading = false;
    // });

    this.statuses = [
      { label: 'Pros', value: 'pro' },
      { label: 'Centers', value: 'center' },
      { label: 'Models', value: 'model' },

    ];

    this.userRole = [
      { name: 'Fitness Center', code: 'center' },
      { name: 'Fitness Model', code: 'model' },
      { name: 'Fitness Professional', code: 'pro' },
    ];
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createUser.controls;
  }
  get f2() {
    return ((this.createUser.get('location') as FormGroup).controls)
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
    if (this.createUser.invalid) {
      return;
    } else this.CreateNewUser();
    console.log(this.createUser.value);
  }

  clear(table: Table) {
    table.clear();
  }

  OnDeleteRecord(id: any) {
    console.log('delete');
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(id).subscribe(
          (data) => {
            this.toastr.success('User Deleted Successfully');
            this.apiDataLoad();
          },
          (error) => {
            console.log(error);
          }
        );
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

  onCountryChange(event: any) {
    this.countryData = event
    this.states = State.getStatesOfCountry(event.isoCode);
    this.selectedCountry = event;
    this.cities = this.selectedState = this.selectedCity = null;

  }
  onStateChange(event: any): void {
    this.stateData = event
    this.cities = City.getCitiesOfState(this.countryData.isoCode, this.stateData.isoCode)
    this.selectedState = this.stateData;
    this.selectedCity = null;

  }

  onCityChange(event: any): void {
    this.cityData = event
    this.selectedCity = this.cityData
  }

  search(searchText: string | null, event?: IPagination) {
    let _first = event?.first ? event?.first : 0;
    let _last = event?.rows ? event.rows + _first : 10;
    if (searchText?.length) {
      debugger;
      console.log(`Search text is ${searchText}`)
      this.userService.getSearchResult(searchText, _last, _first + 1).subscribe(response => {
        debugger
        console.log(response)
        this.usersArray = response.users;
      })
    }
    else {
      this.apiDataLoad();
    }
  }

  filterRole(filterRole: string | null, event?: IPagination) {
    let _first = event?.first ? event?.first : 0;
    let _last = event?.rows ? event.rows + _first : 10;
    console.log(`Selected Filter Role is ${filterRole}`)
    if (filterRole?.length) {
      console.log(`Search text is ${filterRole}`)
      this.userService.getSearchResultByFilterRole(filterRole, _last, _first + 1).subscribe(response => {
        console.log(response);
        this.usersArray = response.users;
      })
    }
    else {
      this.apiDataLoad();
    }
  }




  toggleActiveStatus(userObject: IShopUserEntity) {

    userObject.activeStatus ? userObject.status = UserStatusEnum.active : userObject.status = UserStatusEnum.blocked;
    this.userService.updateUser(userObject).subscribe((res: IShopStatusInterface) => {
      if (res.message === 'User successfully updated.') {
        this.toastr.success(res.message, '', {
          timeOut: 1000,
        });
      }
      else {
        this.toastr.error('Failed To Update Role Status');
      }

    })
  }


  userStatusDataMapping(usersArray: IShopUserEntity[]) {
    for (let iterator of usersArray as IShopUserEntity[]) {
      if (iterator.status === UserStatusEnum.active) {
        iterator.activeStatus = true;
      }
      else {
        iterator.activeStatus = false;
      }
    }
    this.usersArray = usersArray;
  }

  getUserById(id?: any): void {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.userdataById = data;
        console.log(data);
        console.log(this.userdataById);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getId(user: any) {
    console.log(user);

  }
  CreateNewUser() {
    debugger
    const formData = this.createUser.value;
    let data = this.createUser.value
    Object.assign(data.location, { city: data.location.city.name, country: data.location.country.name, state: data.location.state.name })
    delete formData.ProfileImage;
    delete formData.cpassword;

    formData.role = formData.role.code;
    console.log('sending data to service side');
    console.log(formData);
    delete formData.file;
    this.toggleLoading()
    this.userService.CreateNewUser(data).subscribe(

      (response) => {

        this.toastr.success('User  Added  Successfully', '', {
          timeOut: 4000,
        });
        console.log(response);
        this.submitted = true;
        this.modalService.hide();
        window.location.reload();
        // this.createUser.reset();
        // this.apiDataLoad();
        this.isLoading = false
      },
      (error) => {
        console.log(error);
        this.isLoading = false
      }
    );
  }



  toggleLoading() {
    this.isLoading = true;
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
        this.createUser.patchValue({
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
    this.createUser.patchValue({
      image: [null],
    });
  }



  apiDataLoad(event?: IPagination) {

    if (event?.globalFilter) {
      this.search(event.globalFilter)
      return
    }

    let _first = event?.first ? event?.first : 0;
    let _last = event?.rows ? event.rows + _first : 10;
    this.userService.getAllUser(_last, _first + 1).subscribe(
      (data: IShopUser) => {
        console.log('DATA::::', data);
        this.usersArray = data.users;
        this.totalRecords = data.totalRecord;
        this.userStatusDataMapping(this.usersArray)
        console.log('Total Items::', this.dtConfig.totalItems);
        console.log('Getting Vaule from DB:::', this.usersArray);
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
