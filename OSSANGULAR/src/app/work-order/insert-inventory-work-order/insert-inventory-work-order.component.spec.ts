import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertInventoryWorkOrderComponent } from './insert-inventory-work-order.component';

describe('InsertInventoryWorkOrderComponent', () => {
  let component: InsertInventoryWorkOrderComponent;
  let fixture: ComponentFixture<InsertInventoryWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertInventoryWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertInventoryWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
