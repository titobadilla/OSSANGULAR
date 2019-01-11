import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneEmployeeComponent } from './telephone-employee.component';

describe('TelephoneEmployeeComponent', () => {
  let component: TelephoneEmployeeComponent;
  let fixture: ComponentFixture<TelephoneEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephoneEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
