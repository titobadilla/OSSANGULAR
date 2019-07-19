import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKitWorkOrderComponent } from './update-kit-work-order.component';

describe('UpdateKitWorkOrderComponent', () => {
  let component: UpdateKitWorkOrderComponent;
  let fixture: ComponentFixture<UpdateKitWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKitWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateKitWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
