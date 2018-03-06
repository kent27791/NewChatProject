import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { DataTableRequest } from '../../../../shared/models/datatable-request.model';
import { DataTableResponse } from '../../../../shared/models/datatable-reponse.model';
import { UserService } from '../../services/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users: Array<any>;
  user: any = {};

  constructor(private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.dtOptions = {
      lengthMenu: [[10, 25, 50], [10, 25, 50]],
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (request: any, callback) => {
        request.filter = {};
        this.userService.dataTablePaging(request).subscribe(
          response => {
            this.users = response.data;
            callback({
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
              data: [],
            });
          },
          error => {
            this.toastrService.error("Tìm kiếm dữ liệu lỗi.")
          })
      },
      columns: [
        { data: 'Id', name: 'Id', title: 'Id', },
        { data: 'UserName', name: 'UserName', title: 'UserName', },
        { data: 'Email', name: 'Email', title: 'Email', },
      ],
    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
