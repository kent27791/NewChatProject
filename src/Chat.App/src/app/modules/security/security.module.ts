import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { SecurityRoutingModule } from './security-routing.module';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { CreateOrUpdateModalComponent } from '../../shared/components/create-or-update-modal/create-or-update-modal.component';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';
import { IcheckDirective } from '../../shared/directives/icheck.directive';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SecurityRoutingModule,
  ],
  declarations: [
    RoleComponent,
    UserComponent, 
    CreateOrUpdateModalComponent,
    DeleteModalComponent,
    IcheckDirective
  ]
})
export class SecurityModule { }
