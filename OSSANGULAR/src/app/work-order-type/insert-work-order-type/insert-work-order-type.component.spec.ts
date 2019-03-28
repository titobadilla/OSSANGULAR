import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWorkOrderTypeComponent } from './insert-work-order-type.component';

describe('InsertWorkOrderTypeComponent', () => {
  let component: InsertWorkOrderTypeComponent;
  let fixture: ComponentFixture<InsertWorkOrderTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertWorkOrderTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWorkOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
