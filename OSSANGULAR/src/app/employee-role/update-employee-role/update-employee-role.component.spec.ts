import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeRoleComponent } from './update-employee-role.component';

describe('UpdateEmployeeRoleComponent', () => {
  let component: UpdateEmployeeRoleComponent;
  let fixture: ComponentFixture<UpdateEmployeeRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
