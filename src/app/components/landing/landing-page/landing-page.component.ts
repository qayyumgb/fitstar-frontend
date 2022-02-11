import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Table } from 'primeng/table';
import {LandinpPageService} from '../../../services/LandingPageService/landinp-page.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  landingPagedetails: FormGroup;
  socialLinksDetails: FormGroup;
  todDetails: FormGroup;
  privacyDetails: FormGroup;
  submitted1 = false
  submitted2 = false
  submitted3 = false
  submitted4= false
  loginpagedata:any;

  constructor(private formBuilder:FormBuilder,private LandinpPageService:LandinpPageService) { }

  ngOnInit(): void {
    this.landingPagedetails = this.formBuilder.group(
      {
        bannerTitle: ['', Validators.required],
        aboutusHeading: ['', Validators.required],
        aboutUsSubHeading: ['', Validators.required],
        aboutus_description:['',Validators.required],
        footer_description: ['', Validators.required],
        footerPhoneNum: ['', Validators.required],
      }
    );

    this.socialLinksDetails = this.formBuilder.group(
      {
        instagramUrl: ['', Validators.required],
        facebookUrl: ['', Validators.required],
        youtubeUrl: ['', Validators.required],
        twitterUrl: ['', Validators.required],
        linkedInUrl: ['', Validators.required],
      }
    );

    this.todDetails = this.formBuilder.group(
      {
        todDescription: ['', Validators.required],

      }
    );

    this.privacyDetails = this.formBuilder.group(
      {
        privacyDetails: ['', Validators.required],

      }
    );

  }

  get f1(): { [key: string]: AbstractControl } {
    return this.landingPagedetails.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.socialLinksDetails.controls;
  }
  get f3(): { [key: string]: AbstractControl } {
    return this.todDetails.controls;
  }
  get f4(): { [key: string]: AbstractControl } {
    return this.privacyDetails.controls;
  }


  onSubmit(): void {
    this.submitted1 = true;
    if (this.landingPagedetails.invalid) {
      return;
    }
    else
    console.log(this.landingPagedetails.value)

  }
  onSubmit2(): void {
    this.submitted2 = true;
    if (this.socialLinksDetails.invalid) {
      return;
    }
    else
    console.log(this.socialLinksDetails.value)
  this.socialLinksDetails.reset()
  }
  onSubmit3(): void {
    this.submitted3 = true;
    if (this.todDetails.invalid) {
      return;
    }
    else
    console.log(this.todDetails.value)
  this.todDetails.reset()
  }
  onSubmit4(): void {
    this.submitted4 = true;
    if (this.privacyDetails.invalid) {
      return;
    }
    else
    console.log(this.privacyDetails.value)
  this.privacyDetails.reset()
  }
  clear(table: Table) {
    table.clear();
  }



  ContentlandingPage1() {
    const formdata =this.landingPagedetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')
          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset
        },
        error => {
          console.log(error);
        });
  }
  ContentlandingPage2() {
    const formdata =this.socialLinksDetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')
          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset

        },
        error => {
          console.log(error);
        });
  }
  ContentlandingPage3() {
    const formdata =this.todDetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')

          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset

        },
        error => {
          console.log(error);
        });
  }
  ContentlandingPage4() {
    const formdata =this.privacyDetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')

          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset

        },
        error => {
          console.log(error);
        });
  }


}
