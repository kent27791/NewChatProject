"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_not_found_component_1 = require("./shared/components/errors/page-not-found/page-not-found.component");
var security_module_1 = require("./modules/security/security.module");
var admin_layout_component_1 = require("./shared/components/layouts/admin-layout/admin-layout.component");
var auth_layout_component_1 = require("./shared/components/layouts/auth-layout/auth-layout.component");
var authentication_module_1 = require("./modules/authentication/authentication.module");
var routes = [
    {
        path: '',
        component: admin_layout_component_1.AdminLayoutComponent,
        children: [{
                path: 'security',
                loadChildren: function () { return security_module_1.SecurityModule; },
            }]
    },
    {
        path: '',
        component: auth_layout_component_1.AuthLayoutComponent,
        children: [{
                path: 'authentication',
                loadChildren: function () { return authentication_module_1.AuthenticationModule; }
            }]
    },
    {
        path: '**',
        component: page_not_found_component_1.PageNotFoundComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map