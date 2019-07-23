import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderDetailGeneralComponent } from './work-order-detail-general.component';

describe('WorkOrderDetailGeneralComponent', () => {
  let component: WorkOrderDetailGeneralComponent;
  let fixture: ComponentFixture<WorkOrderDetailGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderDetailGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderDetailGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
