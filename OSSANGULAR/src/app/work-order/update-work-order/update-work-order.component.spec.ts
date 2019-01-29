import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkOrderComponent } from './update-work-order.component';

describe('UpdateWorkOrderComponent', () => {
  let component: UpdateWorkOrderComponent;
  let fixture: ComponentFixture<UpdateWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
