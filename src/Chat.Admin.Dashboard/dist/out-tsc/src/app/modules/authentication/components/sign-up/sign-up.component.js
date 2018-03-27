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
var router_1 = require("@angular/router");
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(router, authService, toastrService) {
        this.router = router;
        this.authService = authService;
        this.toastrService = toastrService;
        this.userSignUp = {};
    }
    SignUpComponent.prototype.ngOnInit = function () {
    };
    SignUpComponent.prototype.signUp = function () {
        var _this = this;
        this.authService.signUp(this.userSignUp).subscribe(function (response) {
            _this.toastrService.success('Đăng ký thành công.');
            _this.router.navigate(['/autithencation/sign-in']);
        }, function (error) {
            _this.toastrService.error('Đăng ký không thành công.');
        });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'app-sign-up',
            templateUrl: './sign-up.component.html',
            styleUrls: ['./sign-up.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, ngx_toastr_1.ToastrService])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=sign-up.component.js.map