import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaterialWorkOrderComponent } from './list-material-work-order.component';

describe('ListMaterialWorkOrderComponent', () => {
  let component: ListMaterialWorkOrderComponent;
  let fixture: ComponentFixture<ListMaterialWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMaterialWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaterialWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
