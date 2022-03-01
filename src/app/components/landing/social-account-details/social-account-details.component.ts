import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LandingPageService } from './../../../services/LandingPageService/landing-page.service';
import { Data, ILandingPage } from './../../../shared/interface/landingPage.interface';

@Component({
  selector: 'app-social-account-details',
  templateUrl: './social-account-details.component.html',
  styleUrls: ['./social-account-details.component.scss']
})
export class SocialAccountDetailsComponent implements OnInit {

  socialLinksDetails: FormGroup = new FormGroup({
    instagram: new FormControl('', Validators.required),
    facebook: new FormControl('', Validators.required),
    youtube: new FormControl('', Validators.required),
    twitter: new FormControl('', Validators.required),
    linkedin: new FormControl('', Validators.required),
  });

  submitted: boolean = false
  @Input() landingPageApiData: Data;
  constructor(private landingPageService: LandingPageService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {
      this.socialLinksDetails.patchValue(this.landingPageApiData?.socialAccountDetails);

    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.socialLinksDetails.controls;
  }

  onSubmitForm(): void {
    this.submitted = true;
    if (this.socialLinksDetails.invalid) {
      return;
    }
    else {
      let formValue = { socialAccountDetails: this.socialLinksDetails.value }
      let requestBody = { ...this.landingPageApiData, ...formValue };
      console.log(requestBody)

      this.landingPageService.updateLandingPage(requestBody).subscribe((response: any) => {
        this.toastr.success('Landing Page Info Updated');

      });
    }
  }


}