import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkOrderDetailComponent } from './update-work-order-detail.component';

describe('UpdateWorkOrderDetailComponent', () => {
  let component: UpdateWorkOrderDetailComponent;
  let fixture: ComponentFixture<UpdateWorkOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
