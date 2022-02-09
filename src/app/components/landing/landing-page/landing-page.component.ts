import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Table } from 'primeng/table';

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
  submitted = false

  constructor(private formBuilder:FormBuilder) { }

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
    this.submitted = true;
    if (this.landingPagedetails.invalid) {
      return;
    }
    else
    console.log(this.landingPagedetails.value)

  }
  onSubmit2(): void {
    this.submitted = true;
    if (this.socialLinksDetails.invalid) {
      return;
    }
    else
    console.log(this.socialLinksDetails.value)
  this.socialLinksDetails.reset()
  }
  onSubmit3(): void {
    this.submitted = true;
    if (this.todDetails.invalid) {
      return;
    }
    else
    console.log(this.todDetails.value)
  this.todDetails.reset()
  }
  onSubmit4(): void {
    this.submitted = true;
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
}
