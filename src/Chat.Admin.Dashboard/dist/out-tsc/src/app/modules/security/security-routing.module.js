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
var role_component_1 = require("./components/role/role.component");
var user_component_1 = require("./components/user/user.component");
var page_component_1 = require("./components/page/page.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'role',
                component: role_component_1.RoleComponent
            },
            {
                path: 'user',
                component: user_component_1.UserComponent
            },
            {
                path: 'page',
                component: page_component_1.PageComponent
            }
        ]
    }
];
var SecurityRoutingModule = /** @class */ (function () {
    function SecurityRoutingModule() {
    }
    SecurityRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], SecurityRoutingModule);
    return SecurityRoutingModule;
}());
exports.SecurityRoutingModule = SecurityRoutingModule;
//# sourceMappingURL=security-routing.module.js.map