import { Component, OnInit } from '@angular/core';

import {GroupMemberService} from "../shared/service/group-member.service";

import {DataTableRequest} from '../shared/model/datatable-request'
import { DatatableResponse } from '../shared/model/datatable-response';
import { GroupMember } from 'app/security/shared/model/group-member';

@Component({
  selector: 'group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss'],
  providers: [
    GroupMemberService
  ]
})
export class GroupMemberComponent implements OnInit {
  columns = [{ 'name': 'Id', 'prop': 'id' }, { 'name': 'Group', 'prop': 'group_name' }];
  response = new DatatableResponse<GroupMember>();

  constructor(private groupMemberService: GroupMemberService) {
    this.response.page.offset = 0;
    this.response.page.limit = 3;
    this.response.page.count = 0;
  }

  ngOnInit() {

    this.setPage(this.response.page);
  }

  setPage(request: DataTableRequest){
    this.groupMemberService.pagingDataTable(request).subscribe(response => {
        this.response = response;
    });
  }
}