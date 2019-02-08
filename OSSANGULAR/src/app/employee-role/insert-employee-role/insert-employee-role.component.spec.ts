import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEmployeeRoleComponent } from './insert-employee-role.component';

describe('InsertEmployeeRoleComponent', () => {
  let component: InsertEmployeeRoleComponent;
  let fixture: ComponentFixture<InsertEmployeeRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertEmployeeRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEmployeeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
