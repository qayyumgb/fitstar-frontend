import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LandingPageService } from 'src/app/services/LandingPageService/landing-page.service';
import { Data, ILandingPage } from 'src/app/shared/interface/landingPage.interface';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyDetails: FormGroup = new FormGroup({
    privacyPolicy: new FormControl('', Validators.required)
  });
  submitted: boolean = false;
  policySubscription: Subscription = null as any;
  landingPageApiData: Data;


  constructor(private landingPageService: LandingPageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.policySubscription = this.landingPageService.getLandingPage().subscribe((response: ILandingPage) => {
      this.privacyDetails.patchValue(response.data.privacyDetails);
      this.landingPageApiData = response.data
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.privacyDetails.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.privacyDetails.invalid) {
      return;
    }
    else {


      let formValue = { privacyDetails: this.privacyDetails.value }
      let requestBody = { ...this.landingPageApiData, ...formValue };
      console.log(requestBody);
      this.landingPageService.updateLandingPage(requestBody).subscribe((response: any) => {
        this.toastr.success('Landing Page Info Updated');
      });
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.policySubscription?.unsubscribe();
  }

}
