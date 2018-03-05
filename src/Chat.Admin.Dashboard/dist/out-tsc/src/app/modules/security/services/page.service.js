"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var http_1 = require("@angular/common/http");
var base_service_1 = require("../../../shared/services/base.service");
var PageService = /** @class */ (function (_super) {
    __extends(PageService, _super);
    function PageService(http) {
        return _super.call(this, http, 'api/page/') || this;
    }
    PageService.prototype.tree = function (type) {
        return this.http.get(this._endPoint + this.uri + 'tree/' + type);
    };
    PageService.prototype.userGrantDataTablePaging = function (id, request) {
        return this.http.post(this._endPoint + this.uri + 'user-grant-data-table-paging/' + id, request, {});
    };
    PageService.prototype.grantUser = function (userId, pageId) {
        return this.http.get(this._endPoint + this.uri + 'grant-user/' + userId, { params: { pageId: pageId.toString() } });
    };
    PageService.prototype.denyUser = function (userId, pageId) {
        return this.http.get(this._endPoint + this.uri + 'deny-user/' + userId, { params: { pageId: pageId.toString() } });
    };
    PageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PageService);
    return PageService;
}(base_service_1.BaseService));
exports.PageService = PageService;
//# sourceMappingURL=page.service.js.map