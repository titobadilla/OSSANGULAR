import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAdicionalDeviceWorkOrderComponent } from './insert-adicional-device-work-order.component';

describe('InsertAdicionalDeviceWorkOrderComponent', () => {
  let component: InsertAdicionalDeviceWorkOrderComponent;
  let fixture: ComponentFixture<InsertAdicionalDeviceWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertAdicionalDeviceWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAdicionalDeviceWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
