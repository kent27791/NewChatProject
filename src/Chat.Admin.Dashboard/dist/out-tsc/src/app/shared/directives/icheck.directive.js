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
var forms_1 = require("@angular/forms");
var IcheckDirective = /** @class */ (function () {
    function IcheckDirective(element, ngModel, zone) {
        this.element = element;
        this.ngModel = ngModel;
        this.zone = zone;
    }
    IcheckDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var self = this;
        this.zone.run(function () {
            $(_this.element.nativeElement).iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            }).on('ifChanged', function (event) {
                self.ngModel.update.emit($(self.element.nativeElement).prop('checked'));
            });
            _this.ngModel.valueChanges.subscribe(function (value) {
                if (value == true) {
                    $(self.element.nativeElement).iCheck('check');
                }
                else if (value == false) {
                    $(self.element.nativeElement).iCheck('uncheck');
                }
                $(self.element.nativeElement).iCheck('update');
            });
        });
    };
    IcheckDirective = __decorate([
        core_1.Directive({
            selector: '[appIcheck]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, forms_1.NgModel, core_1.NgZone])
    ], IcheckDirective);
    return IcheckDirective;
}());
exports.IcheckDirective = IcheckDirective;
//# sourceMappingURL=icheck.directive.js.map