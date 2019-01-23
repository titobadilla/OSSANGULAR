import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWorkOrderComponent } from './insert-work-order.component';

describe('InsertWorkOrderComponent', () => {
  let component: InsertWorkOrderComponent;
  let fixture: ComponentFixture<InsertWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
