import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, NgZone, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { PageService } from '../../services/page.service';
declare var $: any;
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [PageService]
})
export class PageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  page: any = {};
  prePage: any = {};
  tree: Array<any>;
  pageTypes: Array<any>;
  isEdit: boolean;
  constructor(private zone: NgZone, private pageService: PageService, private toastrService: ToastrService) {
    this.pageTypes = [
      {
        Id: 1,
        Name: 'Page'
      },
      {
        Id: 2,
        Name: 'Api'
      }
    ]
  }

  ngOnInit() {
    let self = this;
    this.zone.run(() =>{
      self.dtOptions = {
        lengthMenu: [[10, 25, 50], [10, 25, 50]],
        pageLength: 10,
        serverSide: true,
        processing: true,
        deferLoading: 0,
        ajax: (request: any, callback) => {
          request.filter = {};
          this.pageService.userGrantDataTablePaging(this.page.Id, request).subscribe(
            response => {
              callback({
                recordsTotal: response.recordsTotal,
                recordsFiltered: response.recordsFiltered,
                data: response.data,
              });
            })
        },
        createdRow: function (row, data, index) {
          self.zone.run(() =>{
            $(row).find('[data-toggle="tooltip"]').tooltip();
            $(row).find('.checkbox-grant').iCheck({
              checkboxClass: 'icheckbox_square-green',
              radioClass: 'iradio_square-green',
            }).on('ifChanged', function (event) {
              let checked = $(this).prop('checked');
              let userId = $(this).attr('data-user-id');
              let pageId = self.page.Id;
              if (checked) {
                self.pageService.grantUserPermission(userId, pageId).subscribe(
                  response => {
                    self.toastrService.success('Grant page thành công')
                  }
                )
              } else {
                self.pageService.denyUserPermission(userId, pageId).subscribe(
                  response => {
                    self.toastrService.success('Deny page thành công')
                  }
                )
              }
            });
          })
        },
        order: [1, 'desc'],
        columns: [
          {
            data: null, name: null, orderable: false,
            render: function (data, type, row, meta) {
              if (data.Checked) {
                return `<input class="checkbox-grant" checked="checked" type="checkbox" data-user-id="${data.Id}"/>`
              }
              return `<input class="checkbox-grant" type="checkbox" data-user-id="${data.Id}"/>`
            }
          },
          { data: 'Id', name: 'Id', title: 'Id', },
          { data: 'UserName', name: 'UserName', title: 'UserName', },
        ],
      };
      $('#tree-page').jstree({
        'core': {
          'data': null
        },
        'types': {
          'default': {
            'icon': 'fa fa-folder',
          },
          'file': {
            'icon': 'fa fa-file'
          }
        },
        'plugins': ['types']
      }).on('select_node.jstree ', function (event, data) {
        if (self.isEdit) {
          self.page = data.node.original;
          self.prePage = data.node.original;
        } else {
          self.prePage = data.node.original;
          self.page = {
            ParentId: self.prePage.Id,
            Type: 1
          };
        }
  
      });
  
      self.loadTree();
  
      $(document).on('change', '#change-form', function () {
        let checked = $(this).prop("checked");
        if (checked) {
          self.isEdit = false;
          self.page = {
            ParentId: self.prePage.Id,
            Type: 1
          };
  
        } else {
          self.isEdit = true;
          self.page = self.prePage;
        }
      })
  
      $(document).on('click', '.show-grant-user-permission', function () {
        let id = $(this).attr('data-id');
        $('#grant-user-permission-modal').modal('show');
        self.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.draw();
          $('#grant-user-permission-modal').modal('show');
        });
      })
    })
    

  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.isEdit = !($('#change-form').prop('checked'));
  }

  reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  loadTree() {
    let type = -1;
    this.pageService.tree(type).subscribe(
      response => {
        for (let node of response) {
          node.id = node.Id;
          node.parent = node.ParentId == 0 ? '#' : node.ParentId;
          node.text = `<span class="nav-label">${node.Id}.${node.Name}</span>
                      <span data-id="${node.Id}" class="show-grant-user-permission label label-primary">
                        <i class="fa fa-sitemap"></i>
                      </span>
                      `;
          node.icon = node.Type == 1 ? 'fa fa-folder' : 'fa fa-file';
        }
        this.page = response[0];
        this.tree = response;
        $('#tree-page').jstree(true).settings.core.data = response;
        $('#tree-page').jstree(true).refresh()
      }
    )
  }

  submitPage() {
    console.log(this.page);
    if (!this.isEdit) {
      this.pageService.create(this.page).subscribe(
        response => {
          this.page = response;
          this.prePage = response;
          this.loadTree();
          this.toastrService.success('Thêm mới thành công.');
        })
    } else {
      this.pageService.edit(this.page.Id, this.page).subscribe(
        response => {
          this.page = response;
          this.prePage = response;
          this.loadTree();
          this.toastrService.success('Cập nhật thành công.')
        }
      )
    }
  }

  ngOnDestroy() {
    //$('#grant-user-permission-modal').modal('hide');
  }
}
