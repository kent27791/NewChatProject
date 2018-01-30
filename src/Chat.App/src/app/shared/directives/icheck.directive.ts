import { Directive, ElementRef } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appIcheck]'
})
export class IcheckDirective {

  constructor(element: ElementRef) {
    $(element.nativeElement).iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green',
    })
  }

}
