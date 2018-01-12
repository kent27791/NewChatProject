import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule
  ],
  declarations: [RoleComponent, UserComponent]
})
export class SecurityModule { }
