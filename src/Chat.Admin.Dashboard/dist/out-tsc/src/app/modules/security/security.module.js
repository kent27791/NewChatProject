"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var security_routing_module_1 = require("./security-routing.module");
var role_component_1 = require("./components/role/role.component");
var user_component_1 = require("./components/user/user.component");
var create_or_update_modal_component_1 = require("../../shared/components/create-or-update-modal/create-or-update-modal.component");
var delete_modal_component_1 = require("../../shared/components/delete-modal/delete-modal.component");
var icheck_directive_1 = require("../../shared/directives/icheck.directive");
var page_component_1 = require("./components/page/page.component");
var SecurityModule = /** @class */ (function () {
    function SecurityModule() {
    }
    SecurityModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                angular_datatables_1.DataTablesModule,
                security_routing_module_1.SecurityRoutingModule,
                forms_1.FormsModule
            ],
            declarations: [
                role_component_1.RoleComponent,
                user_component_1.UserComponent,
                page_component_1.PageComponent,
                create_or_update_modal_component_1.CreateOrUpdateModalComponent,
                delete_modal_component_1.DeleteModalComponent,
                icheck_directive_1.IcheckDirective,
            ]
        })
    ], SecurityModule);
    return SecurityModule;
}());
exports.SecurityModule = SecurityModule;
//# sourceMappingURL=security.module.js.map