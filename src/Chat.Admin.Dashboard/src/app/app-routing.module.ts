import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/errors/page-not-found/page-not-found.component';
import { SecurityModule } from './modules/security/security.module';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: 'security',
      loadChildren: () => SecurityModule
    }]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'authentication',
      loadChildren: () => AuthenticationModule
    }]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
