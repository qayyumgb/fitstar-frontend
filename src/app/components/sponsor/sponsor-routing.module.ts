import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorListingComponent } from './sponsor-listing/sponsor-listing.component';

const routes: Routes = [

  {

  path: 'create',
  component: SponsorListingComponent,
  pathMatch:"full"
},
{
  path: 'delete',
  component: SponsorListingComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }
