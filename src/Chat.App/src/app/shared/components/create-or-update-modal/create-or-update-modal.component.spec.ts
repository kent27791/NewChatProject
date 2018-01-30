import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateModalComponent } from './create-or-update-modal.component';

describe('CreateOrUpdateModalComponent', () => {
  let component: CreateOrUpdateModalComponent;
  let fixture: ComponentFixture<CreateOrUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
