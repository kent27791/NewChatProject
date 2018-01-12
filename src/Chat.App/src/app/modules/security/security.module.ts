import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { SecurityRoutingModule } from './security-routing.module';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SecurityRoutingModule
  ],
  declarations: [RoleComponent, UserComponent]
})
export class SecurityModule { }
