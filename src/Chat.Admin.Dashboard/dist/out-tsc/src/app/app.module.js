"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ngx_toastr_1 = require("ngx-toastr");
var shared_module_1 = require("./shared/shared.module");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var token_interceptor_1 = require("./shared/interceptors/token.interceptor");
var admin_layout_component_1 = require("./shared/components/layouts/admin-layout/admin-layout.component");
var auth_layout_component_1 = require("./shared/components/layouts/auth-layout/auth-layout.component");
var auth_service_1 = require("./modules/authentication/services/auth.service");
var auth_guard_1 = require("./shared/guards/auth.guard");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                admin_layout_component_1.AdminLayoutComponent,
                auth_layout_component_1.AuthLayoutComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                shared_module_1.SharedModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ngx_toastr_1.ToastrModule.forRoot({
                    timeOut: 3000,
                    progressBar: true,
                    progressAnimation: 'increasing',
                    positionClass: 'toast-top-right',
                    closeButton: true
                }),
            ],
            providers: [
                auth_service_1.AuthService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true,
                },
                auth_guard_1.AuthGuard
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map