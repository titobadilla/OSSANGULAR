import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAdicionalMaterialWorkOrderComponent } from './insert-adicional-material-work-order.component';

describe('InsertAdicionalMaterialWorkOrderComponent', () => {
  let component: InsertAdicionalMaterialWorkOrderComponent;
  let fixture: ComponentFixture<InsertAdicionalMaterialWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertAdicionalMaterialWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAdicionalMaterialWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
