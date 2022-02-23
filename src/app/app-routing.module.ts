import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './_AuthGuard/-auth.guard'

const routes: Routes = [
  {
    path: 'Auth',

    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'shop',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'ambassador',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/ambassador/ambassador.module').then(m => m.AmbassadorModule)
  },
  {
    path: 'blog',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'collaborator',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/collaborator/collaborator.module').then(m => m.CollaboratorModule)
  },
  {
    path: 'landing',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'sponsor',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/sponsor/sponsor.module').then(m => m.SponsorModule)
  },
  {
    path: 'users',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
