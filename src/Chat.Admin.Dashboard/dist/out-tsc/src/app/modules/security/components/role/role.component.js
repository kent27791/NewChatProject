"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var role_service_1 = require("../../services/role.service");
var create_or_update_modal_component_1 = require("../../../../shared/components/modals/create-or-update-modal/create-or-update-modal.component");
var delete_modal_component_1 = require("../../../../shared/components/modals/delete-modal/delete-modal.component");
var angular_datatables_1 = require("angular-datatables");
var Subject_1 = require("rxjs/Subject");
var ngx_toastr_1 = require("ngx-toastr");
var RoleComponent = /** @class */ (function () {
    function RoleComponent(roleService, toastrService) {
        this.roleService = roleService;
        this.toastrService = toastrService;
        this.dtTrigger = new Subject_1.Subject();
        this.dtOptions = {};
        this.role = {};
        this.isEdit = false;
    }
    RoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.dtOptions = {
            lengthMenu: [[10, 25, 50], [10, 25, 50]],
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: function (request, callback) {
                request.filter = {};
                _this.roleService.dataTablePaging(request).subscribe(function (response) {
                    _this.roles = response.data;
                    callback({
                        recordsTotal: response.recordsTotal,
                        recordsFiltered: response.recordsFiltered,
                        data: response.data,
                    });
                });
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
                        return "<a data-id=\"" + data.Id + "\" data-toggle=\"tooltip\" data-placement=\"left\" data-original-title=\"C\u1EADp nh\u1EADt\" class=\"btn-edit btn btn-sm btn-icon btn-info\"><i class=\"fa fa-edit\"></i></a>\n                   <a data-id=\"" + data.Id + "\" data-toggle=\"tooltip\" data-placement=\"left\" data-original-title=\"X\u00F3a\" class=\"btn-delete btn btn-sm btn-icon btn-danger\"><i class=\"fa fa-trash\"></i></a>";
                    }
                }
            ],
        };
        $(document).on('click', '.btn-edit', function () {
            var id = $(this).attr('data-id');
            self.roleService.find(id).subscribe(function (response) {
                self.role = response;
                self.isEdit = true;
                self.showCreateOrUpdateModal();
            });
        });
        $(document).on('click', '.btn-delete', function () {
            var id = $(this).attr('data-id');
            self.roleService.find(id).subscribe(function (response) {
                self.role = response;
                self.showDeleteModal();
            });
        });
    };
    RoleComponent.prototype.ngAfterViewInit = function () {
        this.dtTrigger.next();
    };
    RoleComponent.prototype.reRender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            _this.dtTrigger.next();
        });
    };
    RoleComponent.prototype.showCreateOrUpdateModal = function () {
        this.createOrUpdateModal.show();
    };
    RoleComponent.prototype.hideCreateOrUpdateModal = function () {
        this.createOrUpdateModal.hide();
    };
    RoleComponent.prototype.createOrUpdate = function ($event) {
        var _this = this;
        if ($event) {
            //update
            this.roleService.edit(this.role.Id, this.role).subscribe(function (response) {
                _this.toastrService.success('Cập nhật dữ liệu thành công');
                _this.reRender();
                _this.hideCreateOrUpdateModal();
            }, function (error) {
                console.log(error);
                _this.toastrService.error("Cập nhật dữ liệu không thành công");
            });
        }
        else {
            //create
            this.roleService.create(this.role).subscribe(function (response) {
                _this.toastrService.success('Tạo mới dữ liệu thành công');
                _this.reRender();
                _this.hideCreateOrUpdateModal();
            }, function (error) {
                console.log(error);
                _this.toastrService.error("Tạo mới dữ liệu không thành công");
            });
        }
    };
    RoleComponent.prototype.showDeleteModal = function () {
        this.deleteModal.show();
    };
    RoleComponent.prototype.hideDeleteModal = function () {
        this.deleteModal.hide();
    };
    RoleComponent.prototype.delete = function ($event) {
        var _this = this;
        if ($event > 0) {
            var id = $event;
            this.roleService.delete(id).subscribe(function (response) {
                _this.toastrService.success('Xóa dữ liệu thành công');
                _this.reRender();
                _this.hideDeleteModal();
            }, function (error) {
                console.log(error);
                _this.toastrService.error("Xóa dữ liệu không thành công");
            });
        }
    };
    RoleComponent.prototype.ngOnDestroy = function () {
        //this.createOrUpdateModal.hide();
        //this.deleteModal.hide();
    };
    __decorate([
        core_1.ViewChild('createOrUpdateRole'),
        __metadata("design:type", create_or_update_modal_component_1.CreateOrUpdateModalComponent)
    ], RoleComponent.prototype, "createOrUpdateModal", void 0);
    __decorate([
        core_1.ViewChild('deleteRole'),
        __metadata("design:type", delete_modal_component_1.DeleteModalComponent)
    ], RoleComponent.prototype, "deleteModal", void 0);
    __decorate([
        core_1.ViewChild(angular_datatables_1.DataTableDirective),
        __metadata("design:type", angular_datatables_1.DataTableDirective)
    ], RoleComponent.prototype, "dtElement", void 0);
    RoleComponent = __decorate([
        core_1.Component({
            selector: 'app-role',
            templateUrl: './role.component.html',
            styleUrls: ['./role.component.css'],
            providers: [role_service_1.RoleService]
        }),
        __metadata("design:paramtypes", [role_service_1.RoleService, ngx_toastr_1.ToastrService])
    ], RoleComponent);
    return RoleComponent;
}());
exports.RoleComponent = RoleComponent;
//# sourceMappingURL=role.component.js.map