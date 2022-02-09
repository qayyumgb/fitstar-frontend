import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorListingComponent } from './collaborator-listing/collaborator-listing.component';

const routes: Routes = [  {
  path: 'create',
  component: CollaboratorListingComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorRoutingModule { }
