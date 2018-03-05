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
var rxjs_1 = require("rxjs");
var ngx_toastr_1 = require("ngx-toastr");
var UserComponent = /** @class */ (function () {
    function UserComponent(userService, toastrService) {
        this.userService = userService;
        this.toastrService = toastrService;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.user = {};
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            lengthMenu: [[10, 25, 50], [10, 25, 50]],
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: function (request, callback) {
                request.filter = {};
                _this.userService.dataTablePaging(request).subscribe(function (response) {
                    _this.users = response.data;
                    callback({
                        recordsTotal: response.recordsTotal,
                        recordsFiltered: response.recordsFiltered,
                        data: [],
                    });
                }, function (error) {
                    _this.toastrService.error("Tìm kiếm dữ liệu lỗi.");
                });
            },
            columns: [
                { data: 'Id', name: 'Id', title: 'Id', },
                { data: 'UserName', name: 'UserName', title: 'UserName', },
                { data: 'Email', name: 'Email', title: 'Email', },
            ],
        };
    };
    UserComponent.prototype.ngAfterViewInit = function () {
        this.dtTrigger.next();
    };
    UserComponent.prototype.reRender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            _this.dtTrigger.next();
        });
    };
    __decorate([
        core_1.ViewChild(angular_datatables_1.DataTableDirective),
        __metadata("design:type", angular_datatables_1.DataTableDirective)
    ], UserComponent.prototype, "dtElement", void 0);
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css'],
            providers: [user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, ngx_toastr_1.ToastrService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map