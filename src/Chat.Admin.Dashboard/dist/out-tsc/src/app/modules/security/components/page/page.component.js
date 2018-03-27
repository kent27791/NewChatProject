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
var angular_datatables_1 = require("angular-datatables");
var Subject_1 = require("rxjs/Subject");
var ngx_toastr_1 = require("ngx-toastr");
var page_service_1 = require("../../services/page.service");
var PageComponent = /** @class */ (function () {
    function PageComponent(zone, pageService, toastrService) {
        this.zone = zone;
        this.pageService = pageService;
        this.toastrService = toastrService;
        this.dtTrigger = new Subject_1.Subject();
        this.dtOptions = {};
        this.page = {};
        this.prePage = {};
        this.pageTypes = [
            {
                Id: 1,
                Name: 'Page'
            },
            {
                Id: 2,
                Name: 'Api'
            }
        ];
    }
    PageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.zone.run(function () {
            self.dtOptions = {
                lengthMenu: [[10, 25, 50], [10, 25, 50]],
                pageLength: 10,
                serverSide: true,
                processing: true,
                deferLoading: 0,
                ajax: function (request, callback) {
                    request.filter = {};
                    _this.pageService.userGrantDataTablePaging(_this.page.Id, request).subscribe(function (response) {
                        callback({
                            recordsTotal: response.recordsTotal,
                            recordsFiltered: response.recordsFiltered,
                            data: response.data,
                        });
                    });
                },
                createdRow: function (row, data, index) {
                    self.zone.run(function () {
                        $(row).find('[data-toggle="tooltip"]').tooltip();
                        $(row).find('.checkbox-grant').iCheck({
                            checkboxClass: 'icheckbox_square-green',
                            radioClass: 'iradio_square-green',
                        }).on('ifChanged', function (event) {
                            var checked = $(this).prop('checked');
                            var userId = $(this).attr('data-user-id');
                            var pageId = self.page.Id;
                            if (checked) {
                                self.pageService.grantUserPermission(userId, pageId).subscribe(function (response) {
                                    self.toastrService.success('Grant page thành công');
                                });
                            }
                            else {
                                self.pageService.denyUserPermission(userId, pageId).subscribe(function (response) {
                                    self.toastrService.success('Deny page thành công');
                                });
                            }
                        });
                    });
                },
                order: [1, 'desc'],
                columns: [
                    {
                        data: null, name: null, orderable: false,
                        render: function (data, type, row, meta) {
                            if (data.Checked) {
                                return "<input class=\"checkbox-grant\" checked=\"checked\" type=\"checkbox\" data-user-id=\"" + data.Id + "\"/>";
                            }
                            return "<input class=\"checkbox-grant\" type=\"checkbox\" data-user-id=\"" + data.Id + "\"/>";
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
                }
                else {
                    self.prePage = data.node.original;
                    self.page = {
                        ParentId: self.prePage.Id,
                        Type: 1
                    };
                }
            });
            self.loadTree();
            $(document).on('change', '#change-form', function () {
                var checked = $(this).prop("checked");
                if (checked) {
                    self.isEdit = false;
                    self.page = {
                        ParentId: self.prePage.Id,
                        Type: 1
                    };
                }
                else {
                    self.isEdit = true;
                    self.page = self.prePage;
                }
            });
            $(document).on('click', '.show-grant-user-permission', function () {
                var id = $(this).attr('data-id');
                $('#grant-user-permission-modal').modal('show');
                self.dtElement.dtInstance.then(function (dtInstance) {
                    dtInstance.draw();
                    $('#grant-user-permission-modal').modal('show');
                });
            });
        });
    };
    PageComponent.prototype.ngAfterViewInit = function () {
        this.dtTrigger.next();
        this.isEdit = !($('#change-form').prop('checked'));
    };
    PageComponent.prototype.reRender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            _this.dtTrigger.next();
        });
    };
    PageComponent.prototype.loadTree = function () {
        var _this = this;
        var type = -1;
        this.pageService.tree(type).subscribe(function (response) {
            for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                var node = response_1[_i];
                node.id = node.Id;
                node.parent = node.ParentId == 0 ? '#' : node.ParentId;
                node.text = "<span class=\"nav-label\">" + node.Id + "." + node.Name + "</span>\n                      <span data-id=\"" + node.Id + "\" class=\"show-grant-user-permission label label-primary\">\n                        <i class=\"fa fa-sitemap\"></i>\n                      </span>\n                      ";
                node.icon = node.Type == 1 ? 'fa fa-folder' : 'fa fa-file';
            }
            _this.page = response[0];
            _this.tree = response;
            $('#tree-page').jstree(true).settings.core.data = response;
            $('#tree-page').jstree(true).refresh();
        });
    };
    PageComponent.prototype.submitPage = function () {
        var _this = this;
        console.log(this.page);
        if (!this.isEdit) {
            this.pageService.create(this.page).subscribe(function (response) {
                _this.page = response;
                _this.prePage = response;
                _this.loadTree();
                _this.toastrService.success('Thêm mới thành công.');
            });
        }
        else {
            this.pageService.edit(this.page.Id, this.page).subscribe(function (response) {
                _this.page = response;
                _this.prePage = response;
                _this.loadTree();
                _this.toastrService.success('Cập nhật thành công.');
            });
        }
    };
    PageComponent.prototype.ngOnDestroy = function () {
        //$('#grant-user-permission-modal').modal('hide');
    };
    __decorate([
        core_1.ViewChild(angular_datatables_1.DataTableDirective),
        __metadata("design:type", angular_datatables_1.DataTableDirective)
    ], PageComponent.prototype, "dtElement", void 0);
    PageComponent = __decorate([
        core_1.Component({
            selector: 'app-page',
            templateUrl: './page.component.html',
            styleUrls: ['./page.component.css'],
            providers: [page_service_1.PageService]
        }),
        __metadata("design:paramtypes", [core_1.NgZone, page_service_1.PageService, ngx_toastr_1.ToastrService])
    ], PageComponent);
    return PageComponent;
}());
exports.PageComponent = PageComponent;
//# sourceMappingURL=page.component.js.map