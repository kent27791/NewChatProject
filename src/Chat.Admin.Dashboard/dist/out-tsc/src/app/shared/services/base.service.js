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
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../environments/environment");
var BaseService = /** @class */ (function () {
    function BaseService(http, uri) {
        this.http = http;
        this.uri = uri;
        this._endPoint = environment_1.environment.endPoint;
    }
    BaseService.prototype.dataTablePaging = function (request) {
        return this.http.post(this._endPoint + this.uri + 'data-table-paging', request, {});
    };
    BaseService.prototype.find = function (id) {
        return this.http.get(this._endPoint + this.uri + 'find/' + id);
    };
    BaseService.prototype.create = function (viewModel) {
        return this.http.post(this._endPoint + this.uri + 'create', viewModel);
    };
    BaseService.prototype.edit = function (id, viewModel) {
        return this.http.put(this._endPoint + this.uri + 'edit/' + id, viewModel);
    };
    BaseService.prototype.delete = function (id) {
        return this.http.delete(this._endPoint + this.uri + 'delete/' + id);
    };
    BaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, String])
    ], BaseService);
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map