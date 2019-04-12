import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSesionRefreshComponent } from './modal-sesion-refresh.component';

describe('ModalSesionRefreshComponent', () => {
  let component: ModalSesionRefreshComponent;
  let fixture: ComponentFixture<ModalSesionRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSesionRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSesionRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
