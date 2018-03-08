import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { CreateOrUpdateModalComponent } from '../../../../shared/components/modals/create-or-update-modal/create-or-update-modal.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [RoleService]
})
export class RoleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('createOrUpdateRole')
  createOrUpdateModal: CreateOrUpdateModalComponent;

  @ViewChild('deleteRole')
  deleteModal: DeleteModalComponent;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  dtOptions: DataTables.Settings = {};
  roles: Array<any>;
  role: any = {};
  isEdit: boolean = false;

  constructor(private roleService: RoleService, private toastrService: ToastrService) {

  }
  ngOnInit() {
    let self = this;
    this.dtOptions = {
      lengthMenu: [[10, 25, 50], [10, 25, 50]],
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (request: any, callback) => {
        request.filter = {};
        this.roleService.dataTablePaging(request).subscribe(
          response => {
            this.roles = response.data;
            callback({
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
              data: response.data,
            });
          })
      },
      createdRow: function (row, data, index) {
        $(row).find('[data-toggle="tooltip"]').tooltip();
      },
      columns: [
        { data: 'Id', name: 'Id', title: 'Id', },
        { data: 'Name', name: 'Name', title: 'Tên nhóm', },
        {
          data: null, name: null, title: 'Action', orderable: false,
          render: function (data, type, row, meta) {
            return `<a data-id="${data.Id}" data-toggle="tooltip" data-placement="left" data-original-title="Cập nhật" class="btn-edit btn btn-sm btn-icon btn-info"><i class="fa fa-edit"></i></a>
                   <a data-id="${data.Id}" data-toggle="tooltip" data-placement="left" data-original-title="Xóa" class="btn-delete btn btn-sm btn-icon btn-danger"><i class="fa fa-trash"></i></a>`;
          }
        }
      ],
    };

    $(document).on('click', '.btn-edit', function () {
      let id = $(this).attr('data-id');
      self.roleService.find(id).subscribe(response => {
        self.role = response;
        self.isEdit = true;
        self.showCreateOrUpdateModal();
      })
    })

    $(document).on('click', '.btn-delete', function () {
      let id = $(this).attr('data-id');
      self.roleService.find(id).subscribe(response => {
        self.role = response;
        self.showDeleteModal();
      })
    })
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

  showCreateOrUpdateModal() {
    this.createOrUpdateModal.show();
  }

  hideCreateOrUpdateModal() {
    this.createOrUpdateModal.hide();
  }

  createOrUpdate($event) {
    if ($event) {
      //update
      this.roleService.edit(this.role.Id, this.role).subscribe(
        response => {
          this.toastrService.success('Cập nhật dữ liệu thành công');
          this.reRender();
          this.hideCreateOrUpdateModal();
        },
        error => {
          console.log(error);
          this.toastrService.error("Cập nhật dữ liệu không thành công");
        })
    } else {
      //create
      this.roleService.create(this.role).subscribe(
        response => {
          this.toastrService.success('Tạo mới dữ liệu thành công');
          this.reRender();
          this.hideCreateOrUpdateModal();
        },
        error => {
          console.log(error);
          this.toastrService.error("Tạo mới dữ liệu không thành công");
        })
    }
  }


  showDeleteModal() {
    this.deleteModal.show();
  }

  hideDeleteModal() {
    this.deleteModal.hide();
  }

  delete($event) {

    if ($event > 0) {
      let id = $event;
      this.roleService.delete(id).subscribe(
        response => {
          this.toastrService.success('Xóa dữ liệu thành công');
          this.reRender();
          this.hideDeleteModal();
        },
        error => {
          console.log(error);
          this.toastrService.error("Xóa dữ liệu không thành công");
        })
    }
  }

  ngOnDestroy(){
    this.createOrUpdateModal.hide();
    this.deleteModal.hide();
  }


}
