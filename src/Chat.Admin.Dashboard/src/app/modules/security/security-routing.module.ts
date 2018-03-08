import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from './components/page/page.component';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'role',
        component: RoleComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'user',
        component: UserComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'page',
        component: PageComponent,
        //canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
