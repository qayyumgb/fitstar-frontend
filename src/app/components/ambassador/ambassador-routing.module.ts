import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbassadorListingComponent } from './ambassador-listing/ambassador-listing.component';

const routes: Routes = [
  {
    path: 'create',
    component: AmbassadorListingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmbassadorRoutingModule { }
