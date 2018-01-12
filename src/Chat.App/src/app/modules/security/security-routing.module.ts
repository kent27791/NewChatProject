import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: 'user',
        component: UserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
