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
var DeleteModalComponent = /** @class */ (function () {
    function DeleteModalComponent(element) {
        this.element = element;
        this.submit = new core_1.EventEmitter();
    }
    DeleteModalComponent.prototype.ngOnInit = function () {
    };
    DeleteModalComponent.prototype.ngAfterViewInit = function () {
        this._modal = $(this.element.nativeElement).find('.modal');
    };
    DeleteModalComponent.prototype.show = function () {
        this._modal.modal('show');
    };
    DeleteModalComponent.prototype.hide = function () {
        this._modal.modal('hide');
    };
    DeleteModalComponent.prototype.confirmDelete = function () {
        this.submit.emit(this.id);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DeleteModalComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DeleteModalComponent.prototype, "id", void 0);
    DeleteModalComponent = __decorate([
        core_1.Component({
            selector: 'app-delete-modal',
            templateUrl: './delete-modal.component.html',
            styleUrls: ['./delete-modal.component.css']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DeleteModalComponent);
    return DeleteModalComponent;
}());
exports.DeleteModalComponent = DeleteModalComponent;
//# sourceMappingURL=delete-modal.component.js.map