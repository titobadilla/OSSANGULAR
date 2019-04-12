import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRefreshComponent } from './login-refresh.component';

describe('LoginRefreshComponent', () => {
  let component: LoginRefreshComponent;
  let fixture: ComponentFixture<LoginRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
