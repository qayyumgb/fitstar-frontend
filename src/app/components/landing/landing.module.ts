import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialAccountDetailsComponent } from './social-account-details/social-account-details.component';
import { TermsConditionsDetailsComponent } from './terms-conditions-details/terms-conditions-details.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    LandingPageComponent,
    SocialAccountDetailsComponent,
    TermsConditionsDetailsComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    TabViewModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,

  ]
})
export class LandingModule { }
