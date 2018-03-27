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
var environment_1 = require("../../../../environments/environment");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var AuthService = /** @class */ (function () {
    function AuthService(router, http) {
        this.router = router;
        this.http = http;
        this.uri = 'api/security/';
        this._endPoint = environment_1.environment.endPoint;
    }
    AuthService.prototype.getToken = function () {
        return localStorage.getItem(environment_1.environment.tokenName);
    };
    AuthService.prototype.isAuthenticated = function () {
        // get the token
        var token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return false;
    };
    AuthService.prototype.signIn = function (userSignIn) {
        return this.http.post(this._endPoint + this.uri + 'sign-in/', userSignIn, {});
    };
    AuthService.prototype.signUp = function (userSignUp) {
        return this.http.post(this._endPoint + this.uri + 'sign-up/', userSignUp, {});
    };
    AuthService.prototype.logOut = function () {
        localStorage.removeItem(environment_1.environment.tokenName);
        this.router.navigate(['/authentication/sign-in']);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map