import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { CreateOrUpdateModalComponent } from '../../../../shared/components/create-or-update-modal/create-or-update-modal.component';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [RoleService]
})
export class RoleComponent implements OnInit, AfterViewInit {
  @ViewChild('createOrUpdateRole')
  createOrUpdateModal: CreateOrUpdateModalComponent;
  
  dtOptions: DataTables.Settings = {};
  constructor(private roleService : RoleService) { 
    
  }
  ngOnInit() {
    this.dtOptions = {
      lengthMenu:[[10, 25, 50], [10, 25, 50]],
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (request: any, callback) => {
        request.filter = {};
        this.roleService.dataTablePaging(request).subscribe(response =>{
          callback({
            recordsTotal: response.recordsTotal,
            recordsFiltered: response.recordsFiltered,
            data: response.data,
          });
        })
      },
      columns: [
        { data: 'Id', name: 'Id', title: 'Id', },
        { data: 'Name', name: 'Name', title: 'Tên nhóm', },
      ],
    };
  }

  ngAfterViewInit(){
     
  }

  onShow(){
    this.createOrUpdateModal.show();
  }

  onHide(){
    this.createOrUpdateModal.hide();
  }
}
