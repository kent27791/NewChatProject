"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_not_found_component_1 = require("./components/errors/page-not-found/page-not-found.component");
var icheck_directive_1 = require("./directives/icheck.directive");
var create_or_update_modal_component_1 = require("./components/modals/create-or-update-modal/create-or-update-modal.component");
var delete_modal_component_1 = require("./components/modals/delete-modal/delete-modal.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            declarations: [
                icheck_directive_1.IcheckDirective,
                page_not_found_component_1.PageNotFoundComponent,
                create_or_update_modal_component_1.CreateOrUpdateModalComponent,
                delete_modal_component_1.DeleteModalComponent,
            ],
            exports: [
                icheck_directive_1.IcheckDirective,
                page_not_found_component_1.PageNotFoundComponent,
                create_or_update_modal_component_1.CreateOrUpdateModalComponent,
                delete_modal_component_1.DeleteModalComponent,
            ],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map