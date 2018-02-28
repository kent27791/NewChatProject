import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-or-update-modal',
  templateUrl: './create-or-update-modal.component.html',
  styleUrls: ['./create-or-update-modal.component.css']
})
export class CreateOrUpdateModalComponent implements OnInit {
  @Output()
  submit: EventEmitter<boolean> = new EventEmitter();

  @Input()
  isEdit: boolean;

  private _modal;
  constructor(private element: ElementRef) {

  }

  ngOnInit() {
    console.log(this.isEdit);
  }

  ngAfterViewInit() {
    this._modal = $(this.element.nativeElement).find('.modal');
  }

  show(){
    this._modal.modal('show');
  }

  hide(){
    this._modal.modal('hide');
  }

  createOrUpdate(){
    this.submit.emit(this.isEdit);
  }
}
