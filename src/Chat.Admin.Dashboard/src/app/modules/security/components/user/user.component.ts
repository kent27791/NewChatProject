import { Component, OnInit, AfterViewInit, QueryList, ViewChildren, NgZone } from '@angular/core';

import { DataTableRequest } from '../../../../shared/models/datatable-request.model';
import { DataTableResponse } from '../../../../shared/models/datatable-reponse.model';
import { UserService } from '../../services/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../services/role.service';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, RoleService]
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings[] = [];

  users: Array<any>;
  user: any = {};
  roles: Array<any>;
  constructor(private zone: NgZone, private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    let self = this;
    this.zone.run(() =>{
      this.dtOptions[0] = {
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        pageLength: 10,
        serverSide: true,
        processing: true,
        ajax: (request: any, callback) => {
          request.filter = {};
          self.userService.dataTablePaging(request).subscribe(
            response => {
              self.users = response.data;
              callback({
                recordsTotal: response.recordsTotal,
                recordsFiltered: response.recordsFiltered,
                data: [],
              });
            },
            error => {
              self.toastrService.error("Tìm kiếm dữ liệu lỗi.")
            })
        },
        columns: [
          { data: 'Id', name: 'Id', title: 'Id', },
          { data: 'UserName', name: 'UserName', title: 'UserName', },
          { data: 'Email', name: 'Email', title: 'Email', },
          { data: null, name: null, title: 'Action', },
        ],
      };
  
      this.dtOptions[1] = {
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        pageLength: 10,
        serverSide: true,
        processing: true,
        deferLoading: 0,
        ajax: (request: any, callback) => {
          request.filter = {};
          self.userService.roleGrantDataTablePaging(self.user.Id, request).subscribe(
            response => {
              self.roles = response.data;
              callback({
                recordsTotal: response.recordsTotal,
                recordsFiltered: response.recordsFiltered,
                data: response.data,
              });
            },
            error => {
              self.toastrService.error("Tìm kiếm dữ liệu lỗi.")
            })
        },
        createdRow: function (row, data, index) {
          self.zone.run(() =>{
            $(row).find('[data-toggle="tooltip"]').tooltip();
            $(row).find('.checkbox-grant-role').iCheck({
              checkboxClass: 'icheckbox_square-green',
              radioClass: 'iradio_square-green',
            }).on('ifChanged', function (event) {
              console.log(self.user)
              let checked = $(this).prop('checked');
              let roleId = $(this).attr('data-role-id');
              let userId = self.user.Id;
              if (checked) {
                self.userService.grantRole(userId, roleId).subscribe(
                  response => {
                    self.toastrService.success('Grant role thành công')
                  }
                )
              } else {
                self.userService.denyRole(userId, roleId).subscribe(
                  response => {
                    self.toastrService.success('Deny role thành công')
                  }
                )
              }
            });
          })
        },
        columns: [
          {
            data: null, name: null, orderable: false,
            render: function (data, type, row, meta) {
              if (data.Checked) {
                return `<input class="checkbox-grant-role" checked="checked" type="checkbox" data-role-id="${data.Id}"/>`
              }
              return `<input class="checkbox-grant-role" type="checkbox" data-role-id="${data.Id}"/>`
            }
          },
          { data: 'Id', name: 'Id', title: 'Id', },
          { data: 'Name', name: 'Name', title: 'RoleName', },
        ],
      };
    })
    
  }

  ngAfterViewInit() {

  }

  showGrantRole(user : any) {
    this.user = user;
    this.dtElements.find((item, index, array) => index == 1).dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
      $('#grant-role-modal').modal('show');
    });
  }

}
