import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { CreateOrUpdateModalComponent } from '../../../../shared/components/create-or-update-modal/create-or-update-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [RoleService]
})
export class RoleComponent implements OnInit, AfterViewInit {
  @ViewChild('createOrUpdateRole')
  createOrUpdateModal: CreateOrUpdateModalComponent;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  dtOptions: DataTables.Settings = {};
  roles: Array<any> = [];
  role: any = {};
  isEdit: boolean = false;

  constructor(private viewContainerRef: ViewContainerRef, private roleService: RoleService) {
    
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
        this.roleService.dataTablePaging(request).subscribe(response => {
          this.roles = response.data
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
          data: null, name: null, title: 'Action',
          render: function (data, type, row, meta) {
            return `<a data-id="${data.Id}" data-toggle="tooltip" data-placement="left" data-original-title="Cập nhật" class="btn-edit btn btn-sm btn-icon btn-info"><i class="fa fa-edit"></i></a>
                   <a data-id="${data.Id}" data-toggle="tooltip" data-placement="left" data-original-title="Xóa" class="btn btn-sm btn-icon btn-danger"><i class="fa fa-trash"></i></a>`;
          }
        }
      ],
    };

    $(document).on('click', '.btn-edit', function() {
       let id = $(this).attr('data-id');
       self.roleService.find(id).subscribe(response => {
        self.role = response;
        self.isEdit = true;
        self.onShow();
      })
      
    })

    $(document).on('click', '.btn-delete', function() {
      let id = $(this).attr('data-id');
    })
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  onShow() {
    this.createOrUpdateModal.show();
  }

  onHide() {
    this.createOrUpdateModal.hide();
  }

  onSubmit($event) {
    if ($event) {
      //update
      this.roleService.edit(this.role.Id, this.role).subscribe(response => {
        console.log('updated')
        console.log(response);
        this.rerender();
        this.onHide();
      })
    } else {
      //create
      this.roleService.create(this.role).subscribe(response => {
        console.log('created');
        console.log(response);
        this.rerender();
        this.onHide();
      })
      
    }

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
