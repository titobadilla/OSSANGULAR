import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeWorkOrderDetailComponent } from './see-work-order-detail.component';

describe('SeeWorkOrderDetailComponent', () => {
  let component: SeeWorkOrderDetailComponent;
  let fixture: ComponentFixture<SeeWorkOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeWorkOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeWorkOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
