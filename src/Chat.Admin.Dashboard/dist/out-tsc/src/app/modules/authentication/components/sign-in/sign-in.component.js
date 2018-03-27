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
var auth_service_1 = require("../../services/auth.service");
var ngx_toastr_1 = require("ngx-toastr");
var environment_1 = require("../../../../../environments/environment");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var SignInComponent = /** @class */ (function () {
    function SignInComponent(location, router, authService, toastrService) {
        this.location = location;
        this.router = router;
        this.authService = authService;
        this.toastrService = toastrService;
        this.userSignIn = {};
    }
    SignInComponent.prototype.ngOnInit = function () {
    };
    SignInComponent.prototype.signIn = function () {
        var _this = this;
        this.authService.signIn(this.userSignIn).subscribe(function (response) {
            localStorage.setItem(environment_1.environment.tokenName, response.access_token);
            _this.toastrService.success('Đăng nhập thành công.');
            _this.location.back();
        }, function (error) {
            console.log(error);
            _this.toastrService.error('Đăng nhập không thành công.');
        });
    };
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'app-sign-in',
            templateUrl: './sign-in.component.html',
            styleUrls: ['./sign-in.component.css']
        }),
        __metadata("design:paramtypes", [common_1.Location, router_1.Router, auth_service_1.AuthService, ngx_toastr_1.ToastrService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign-in.component.js.map