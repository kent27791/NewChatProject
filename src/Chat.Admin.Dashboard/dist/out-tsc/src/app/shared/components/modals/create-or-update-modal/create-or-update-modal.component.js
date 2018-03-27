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
var CreateOrUpdateModalComponent = /** @class */ (function () {
    function CreateOrUpdateModalComponent(zone, element) {
        this.zone = zone;
        this.element = element;
        this.submit = new core_1.EventEmitter();
    }
    CreateOrUpdateModalComponent.prototype.ngOnInit = function () {
    };
    CreateOrUpdateModalComponent.prototype.ngAfterViewInit = function () {
        this._modal = $(this.element.nativeElement).find('.modal');
    };
    CreateOrUpdateModalComponent.prototype.show = function () {
        this._modal.modal('show');
    };
    CreateOrUpdateModalComponent.prototype.hide = function () {
        this._modal.modal('hide');
    };
    CreateOrUpdateModalComponent.prototype.createOrUpdate = function () {
        this.submit.emit(this.isEdit);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateOrUpdateModalComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CreateOrUpdateModalComponent.prototype, "isEdit", void 0);
    CreateOrUpdateModalComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-update-modal',
            templateUrl: './create-or-update-modal.component.html',
            styleUrls: ['./create-or-update-modal.component.css']
        }),
        __metadata("design:paramtypes", [core_1.NgZone, core_1.ElementRef])
    ], CreateOrUpdateModalComponent);
    return CreateOrUpdateModalComponent;
}());
exports.CreateOrUpdateModalComponent = CreateOrUpdateModalComponent;
//# sourceMappingURL=create-or-update-modal.component.js.map