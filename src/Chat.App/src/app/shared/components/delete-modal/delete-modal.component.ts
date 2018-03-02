import { Component, OnInit, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit, AfterViewInit {

  @Output()
  submit: EventEmitter<number> = new EventEmitter();
  
  @Input()
  id: number;

  private _modal;
  constructor(private element: ElementRef) {

  }

  ngOnInit() {
    
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

  confirmDelete(){
    this.submit.emit(this.id);
  }

}
