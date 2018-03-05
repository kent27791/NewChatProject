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
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
var auth_service_1 = require("../services/auth.service");
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    TokenInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        // Clone the request to add the new header.
        var authReq = req.clone({
            setHeaders: {
                Authorization: "Bearer " + this.auth.getToken()
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
        console.log('abc');
        if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/home']);
            return typeof (null);
        }
        return typeof (error);
    };
    TokenInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
//# sourceMappingURL=token.interceptor.js.map