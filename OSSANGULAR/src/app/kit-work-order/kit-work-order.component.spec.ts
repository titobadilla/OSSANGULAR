import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitWorkOrderComponent } from './kit-work-order.component';

describe('KitWorkOrderComponent', () => {
  let component: KitWorkOrderComponent;
  let fixture: ComponentFixture<KitWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
