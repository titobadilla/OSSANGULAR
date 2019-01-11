import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeviceWorkOrderComponent } from './list-device-work-order.component';

describe('ListDeviceWorkOrderComponent', () => {
  let component: ListDeviceWorkOrderComponent;
  let fixture: ComponentFixture<ListDeviceWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeviceWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeviceWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
