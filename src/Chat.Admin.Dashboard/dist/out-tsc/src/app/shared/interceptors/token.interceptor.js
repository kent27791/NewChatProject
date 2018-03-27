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
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
var environment_1 = require("../../../environments/environment");
var auth_service_1 = require("../../modules/authentication/services/auth.service");
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.ajaxInterceptor();
    }
    TokenInterceptor.prototype.getToken = function () {
        return localStorage.getItem(environment_1.environment.tokenName);
    };
    TokenInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        // Clone the request to add the new header.
        var authReq = req.clone({
            setHeaders: {
                Authorization: "Bearer " + this.getToken()
            }
        });
        //send the newly created request
        return next.handle(authReq).catch(function (error, caught) {
            //intercept the respons error and displace it to the console
            console.log(error);
            //return the error to the method that called it
            return _this.handleError(error);
        });
    };
    TokenInterceptor.prototype.handleError = function (error) {
        if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/authentication/sign-in']);
            //return typeof(error);
            return Rx_1.Observable.throw(error);
        }
        return Rx_1.Observable.throw(error);
    };
    TokenInterceptor.prototype.ajaxInterceptor = function () {
        var self = this;
        $.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + this.getToken());
            },
            error: function (jqXHR, textStatus) {
                if (jqXHR.status === 401) {
                    self.router.navigate(['/authentication/sign-in']);
                }
                console.log(jqXHR.statusText);
            }
        });
    };
    TokenInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
//# sourceMappingURL=token.interceptor.js.map