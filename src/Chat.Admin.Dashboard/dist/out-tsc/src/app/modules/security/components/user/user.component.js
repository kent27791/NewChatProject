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
var user_service_1 = require("../../services/user.service");
var angular_datatables_1 = require("angular-datatables");
var ngx_toastr_1 = require("ngx-toastr");
var role_service_1 = require("../../services/role.service");
var UserComponent = /** @class */ (function () {
    function UserComponent(zone, userService, toastrService) {
        this.zone = zone;
        this.userService = userService;
        this.toastrService = toastrService;
        this.dtOptions = [];
        this.user = {};
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.zone.run(function () {
            _this.dtOptions[0] = {
                lengthMenu: [[10, 25, 50], [10, 25, 50]],
                pageLength: 10,
                serverSide: true,
                processing: true,
                ajax: function (request, callback) {
                    request.filter = {};
                    self.userService.dataTablePaging(request).subscribe(function (response) {
                        self.users = response.data;
                        callback({
                            recordsTotal: response.recordsTotal,
                            recordsFiltered: response.recordsFiltered,
                            data: [],
                        });
                    }, function (error) {
                        self.toastrService.error("Tìm kiếm dữ liệu lỗi.");
                    });
                },
                columns: [
                    { data: 'Id', name: 'Id', title: 'Id', },
                    { data: 'UserName', name: 'UserName', title: 'UserName', },
                    { data: 'Email', name: 'Email', title: 'Email', },
                    { data: null, name: null, title: 'Action', },
                ],
            };
            _this.dtOptions[1] = {
                lengthMenu: [[10, 25, 50], [10, 25, 50]],
                pageLength: 10,
                serverSide: true,
                processing: true,
                deferLoading: 0,
                ajax: function (request, callback) {
                    request.filter = {};
                    self.userService.roleGrantDataTablePaging(self.user.Id, request).subscribe(function (response) {
                        self.roles = response.data;
                        callback({
                            recordsTotal: response.recordsTotal,
                            recordsFiltered: response.recordsFiltered,
                            data: response.data,
                        });
                    }, function (error) {
                        self.toastrService.error("Tìm kiếm dữ liệu lỗi.");
                    });
                },
                createdRow: function (row, data, index) {
                    self.zone.run(function () {
                        $(row).find('[data-toggle="tooltip"]').tooltip();
                        $(row).find('.checkbox-grant-role').iCheck({
                            checkboxClass: 'icheckbox_square-green',
                            radioClass: 'iradio_square-green',
                        }).on('ifChanged', function (event) {
                            console.log(self.user);
                            var checked = $(this).prop('checked');
                            var roleId = $(this).attr('data-role-id');
                            var userId = self.user.Id;
                            if (checked) {
                                self.userService.grantRole(userId, roleId).subscribe(function (response) {
                                    self.toastrService.success('Grant role thành công');
                                });
                            }
                            else {
                                self.userService.denyRole(userId, roleId).subscribe(function (response) {
                                    self.toastrService.success('Deny role thành công');
                                });
                            }
                        });
                    });
                },
                columns: [
                    {
                        data: null, name: null, orderable: false,
                        render: function (data, type, row, meta) {
                            if (data.Checked) {
                                return "<input class=\"checkbox-grant-role\" checked=\"checked\" type=\"checkbox\" data-role-id=\"" + data.Id + "\"/>";
                            }
                            return "<input class=\"checkbox-grant-role\" type=\"checkbox\" data-role-id=\"" + data.Id + "\"/>";
                        }
                    },
                    { data: 'Id', name: 'Id', title: 'Id', },
                    { data: 'Name', name: 'Name', title: 'RoleName', },
                ],
            };
        });
    };
    UserComponent.prototype.ngAfterViewInit = function () {
    };
    UserComponent.prototype.showGrantRole = function (user) {
        this.user = user;
        this.dtElements.find(function (item, index, array) { return index == 1; }).dtInstance.then(function (dtInstance) {
            dtInstance.draw();
            $('#grant-role-modal').modal('show');
        });
    };
    __decorate([
        core_1.ViewChildren(angular_datatables_1.DataTableDirective),
        __metadata("design:type", core_1.QueryList)
    ], UserComponent.prototype, "dtElements", void 0);
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css'],
            providers: [user_service_1.UserService, role_service_1.RoleService]
        }),
        __metadata("design:paramtypes", [core_1.NgZone, user_service_1.UserService, ngx_toastr_1.ToastrService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map