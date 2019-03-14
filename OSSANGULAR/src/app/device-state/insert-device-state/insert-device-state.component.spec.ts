import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDeviceStateComponent } from './insert-device-state.component';

describe('InsertDeviceStateComponent', () => {
  let component: InsertDeviceStateComponent;
  let fixture: ComponentFixture<InsertDeviceStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertDeviceStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDeviceStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
