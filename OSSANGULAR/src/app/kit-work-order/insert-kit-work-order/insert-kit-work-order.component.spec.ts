import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertKitWorkOrderComponent } from './insert-kit-work-order.component';

describe('InsertKitWorkOrderComponent', () => {
  let component: InsertKitWorkOrderComponent;
  let fixture: ComponentFixture<InsertKitWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertKitWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertKitWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
