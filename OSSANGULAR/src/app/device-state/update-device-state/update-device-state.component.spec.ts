import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeviceStateComponent } from './update-device-state.component';

describe('UpdateDeviceStateComponent', () => {
  let component: UpdateDeviceStateComponent;
  let fixture: ComponentFixture<UpdateDeviceStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeviceStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeviceStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
