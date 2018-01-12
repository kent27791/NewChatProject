import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { DataTableRequest } from '../../../../shared/models/datatable-request.model';
import { DataTableResponse } from '../../../../shared/models/datatable-reponse.model';
import { UserViewModel } from '../../models/user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dtOptions = {
      lengthMenu:[[2, 5, 10], [2, 5, 10]],
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http.post<DataTableResponse>('http://localhost:5456/api/values/get-and-process', dataTablesParameters, {}).subscribe(reponse => {
          callback({
            recordsTotal: reponse.recordsTotal,
            recordsFiltered: reponse.recordsFiltered,
            data: reponse.data,
          });
        });
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
