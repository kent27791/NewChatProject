import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DataTableRequest } from '../../../../shared/models/datatable-request.model';
import { DataTableResponse } from '../../../../shared/models/datatable-reponse.model';
import { UserViewModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.dtOptions = {
      lengthMenu:[[2, 5, 10], [2, 5, 10]],
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.filter = {
          'userId': 1
        }
        this.userService.getAndProcess(dataTablesParameters).subscribe(response =>{
          callback({
            recordsTotal: response.recordsTotal,
            recordsFiltered: response.recordsFiltered,
            data: response.data,
          });
        })
      },
      columns: [
        { data: 'Id', title: 'Id', },
        { data: 'UserName', title: 'UserName', },
      ],
    };
  }

  ngAfterViewInit() {

  }

}
