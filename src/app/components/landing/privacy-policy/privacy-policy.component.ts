import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() landingPageApiData: Data;


  constructor(private landingPageService: LandingPageService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {
      this.privacyDetails.patchValue(this.landingPageApiData?.privacyDetails);
    }

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


}
