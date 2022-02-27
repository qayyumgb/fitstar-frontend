import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { LandingPage, ILandingPage, Data } from 'src/app/shared/interface/landingPage.interface';
import { LandingPageService } from '../../../services/LandingPageService/landing-page.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  landingPageDetails: FormGroup = new FormGroup({
    footerDetails: new FormGroup({
      footerDetails: new FormControl(''),
      footerPhone: new FormControl('')
    }),
    aboutPageDetails: new FormGroup({
      aboutUsBannerImage: new FormControl(''),
      bannerTitle: new FormControl(''),
      aboutUsMainHeading: new FormControl(''),
      aboutUsSubHeading: new FormControl(''),
      aboutUsDetails: new FormControl('')
    }),
    landingPage: new FormArray([this.landingPageFormControls()]),
  });
  submitted = false
  bannerImagesList: LandingPage[];
  bannerSubscription: Subscription = null as any;
  landingPageApiData: Data;

  constructor(private landingPageService: LandingPageService, private toastr: ToastrService) { }


  landingPageFormControls(data?: any) {

    return new FormGroup({
      bannerTitle: new FormControl(data ? data.bannerTitle : ''),
      bannerImage: new FormControl(data ? data.bannerImage : '')
    })
  }

  get landingBannerList() {
    return this.landingPageDetails.get('landingPage') as FormArray;
  }

  ngOnInit(): void {
    this.bannerSubscription = this.landingPageService.getLandingPage().subscribe((response: ILandingPage) => {
      this.landingPageDetails.patchValue(response.data);
      this.landingPageApiData = response.data;
      this.landingBannerList.removeAt(0);
      response.data.landingPage.forEach((element: LandingPage) => {
        this.landingBannerList.push(this.landingPageFormControls(element));
      })
    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.landingPageDetails.controls;
  }





  clear(table: Table) {
    table.clear();
  }





  uploadFile(event: any, index: number) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formControl
      reader.onload = () => {
        this.landingBannerList.at(index).patchValue({
          bannerImage: reader.result
        })
      }

    }
  }



  uploadAboutImage(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.landingPageDetails.get('aboutPageDetails')?.patchValue({
          aboutUsBannerImage: reader.result
        });
      }

    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.landingPageDetails.invalid) {
      return;
    }
    else {

      let formValue = this.landingPageDetails.value;
      let requestBody = { ...this.landingPageApiData, ...formValue };

      console.log(requestBody)
      this.landingPageService.updateLandingPage(requestBody).subscribe((response: any) => {
        this.toastr.success('Landing Page Info Updated');
      });
    }

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.bannerSubscription?.unsubscribe();
  }
}
