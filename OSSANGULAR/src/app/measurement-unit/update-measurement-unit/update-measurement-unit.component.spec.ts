import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeasurementUnitComponent } from './update-measurement-unit.component';

describe('UpdateMeasurementUnitComponent', () => {
  let component: UpdateMeasurementUnitComponent;
  let fixture: ComponentFixture<UpdateMeasurementUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMeasurementUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
