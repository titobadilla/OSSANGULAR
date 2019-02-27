import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMeasurementUnitComponent } from './insert-measurement-unit.component';

describe('InsertMeasurementUnitComponent', () => {
  let component: InsertMeasurementUnitComponent;
  let fixture: ComponentFixture<InsertMeasurementUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertMeasurementUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
