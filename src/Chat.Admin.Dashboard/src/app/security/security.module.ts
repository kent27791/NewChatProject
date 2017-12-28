import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SecurityRoutes } from './security.routing';
import { GroupMemberComponent } from './group-member/group-member.component';
import { RoleComponent } from './role/role.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SecurityRoutes),
    NgxDatatableModule
  ],
  declarations: [GroupMemberComponent, RoleComponent]
})

export class SecurityModule {}