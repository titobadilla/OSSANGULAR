import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkOrderDetailComponent } from './search-work-order-detail.component';

describe('SearchWorkOrderDetailComponent', () => {
  let component: SearchWorkOrderDetailComponent;
  let fixture: ComponentFixture<SearchWorkOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWorkOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWorkOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
