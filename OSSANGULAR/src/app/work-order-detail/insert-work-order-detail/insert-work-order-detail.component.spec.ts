import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWorkOrderDetailComponent } from './insert-work-order-detail.component';

describe('InsertWorkOrderDetailComponent', () => {
  let component: InsertWorkOrderDetailComponent;
  let fixture: ComponentFixture<InsertWorkOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertWorkOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWorkOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
