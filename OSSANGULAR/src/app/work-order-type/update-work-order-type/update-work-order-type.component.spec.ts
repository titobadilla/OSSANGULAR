import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkOrderTypeComponent } from './update-work-order-type.component';

describe('UpdateWorkOrderTypeComponent', () => {
  let component: UpdateWorkOrderTypeComponent;
  let fixture: ComponentFixture<UpdateWorkOrderTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkOrderTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
