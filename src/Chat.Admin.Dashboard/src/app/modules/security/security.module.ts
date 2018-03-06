import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { SecurityRoutingModule } from './security-routing.module';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from './components/page/page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    SharedModule,
    DataTablesModule
  ],
  declarations: [
    RoleComponent,
    UserComponent, 
    PageComponent
  ]
})
export class SecurityModule { }
