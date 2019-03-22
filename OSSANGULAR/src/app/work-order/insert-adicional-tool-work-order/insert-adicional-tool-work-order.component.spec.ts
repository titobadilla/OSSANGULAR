import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAdicionalToolWorkOrderComponent } from './insert-adicional-tool-work-order.component';

describe('InsertAdicionalToolWorkOrderComponent', () => {
  let component: InsertAdicionalToolWorkOrderComponent;
  let fixture: ComponentFixture<InsertAdicionalToolWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertAdicionalToolWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAdicionalToolWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
