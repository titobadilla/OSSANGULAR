import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToolWorkOrderComponent } from './list-tool-work-order.component';

describe('ListToolWorkOrderComponent', () => {
  let component: ListToolWorkOrderComponent;
  let fixture: ComponentFixture<ListToolWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListToolWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListToolWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
