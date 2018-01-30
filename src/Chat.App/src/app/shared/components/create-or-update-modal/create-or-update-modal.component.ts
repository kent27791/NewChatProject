import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-create-or-update-modal',
  templateUrl: './create-or-update-modal.component.html',
  styleUrls: ['./create-or-update-modal.component.css']
})
export class CreateOrUpdateModalComponent implements OnInit {
  @Input()
  private isEdit;
  
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

  onCreateOrUpdate(){
    console.log("submit create or update");
  }
}
