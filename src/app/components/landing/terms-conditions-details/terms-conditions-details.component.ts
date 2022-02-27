import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Data, ILandingPage } from 'src/app/shared/interface/landingPage.interface';
import { LandingPageService } from './../../../services/LandingPageService/landing-page.service';

@Component({
  selector: 'app-terms-conditions-details',
  templateUrl: './terms-conditions-details.component.html',
  styleUrls: ['./terms-conditions-details.component.scss']
})
export class TermsConditionsDetailsComponent implements OnInit {
  LandingPageItemList: [];
  submitted: boolean = false;
  termSubscription: Subscription = null as any;
  todDetails: FormGroup = new FormGroup({
    termsAndConditions: new FormControl('', Validators.required),
  });
  landingPageApiData: Data

  constructor(private landingPageService: LandingPageService, private toastr: ToastrService) { }


  get f(): { [key: string]: AbstractControl } {
    return this.todDetails.controls;
  }


  ngOnInit(): void {
    this.termSubscription = this.landingPageService.getLandingPage().subscribe((response: ILandingPage) => {
      this.todDetails.patchValue(response.data.termConditions);
      this.landingPageApiData = response.data;

    })
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.todDetails.invalid) {
      return;
    }
    else {

      let formValue = { termConditions: this.todDetails.value }
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
    this.termSubscription?.unsubscribe();
  }
}
