import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  todDetails: FormGroup = new FormGroup({
    termsAndConditions: new FormControl('', Validators.required),
  });
  @Input() landingPageApiData: Data

  constructor(private landingPageService: LandingPageService, private toastr: ToastrService) { }


  get f(): { [key: string]: AbstractControl } {
    return this.todDetails.controls;
  }


  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {
      this.todDetails.patchValue(this.landingPageApiData?.termConditions);
    }

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

}
