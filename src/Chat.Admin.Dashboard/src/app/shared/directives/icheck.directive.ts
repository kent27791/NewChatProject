import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;
@Directive({
  selector: '[appIcheck]'
})
export class IcheckDirective {

  constructor(private element: ElementRef, private ngModel: NgModel, private zone: NgZone) {

  }
  ngAfterViewInit() {
    let self = this;
    this.zone.run(() => {
      $(this.element.nativeElement).iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
      }).on('ifChanged', function (event) {
        self.ngModel.update.emit($(self.element.nativeElement).prop('checked'));
      });

      this.ngModel.valueChanges.subscribe(function (value) {
        if (value == true) {
          $(self.element.nativeElement).iCheck('check')
        } else if (value == false) {
          $(self.element.nativeElement).iCheck('uncheck')
        }
        $(self.element.nativeElement).iCheck('update')
      });
    })
  }

}
