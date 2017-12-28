import { Routes } from '@angular/router';

import { GroupMemberComponent } from './group-member/group-member.component';
import { RoleComponent } from './role/role.component';

export const SecurityRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'group-member',
        component: GroupMemberComponent
      },
      {
        path: 'role',
        component: RoleComponent
      },
    ]
  }
];