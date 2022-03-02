import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorListingComponent } from './sponsor-listing/sponsor-listing.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from 'src/app/shared/shared.module';


import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddSponsorComponent } from './add-sponsor/add-sponsor.component';
// import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SponsorListingComponent,
    AddSponsorComponent
  ],
  imports: [
    CommonModule,
    SponsorRoutingModule,
    TableModule,
    ToastModule,
    SharedModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    // NgxPaginationModule,
    InputTextModule,
    FormsModule,
    InputSwitchModule,
    MessagesModule,
    ConfirmDialogModule
  ]
})
export class SponsorModule { }
