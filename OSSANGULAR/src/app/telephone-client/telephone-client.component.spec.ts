import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneClientComponent } from './telephone-client.component';

describe('TelephoneClientComponent', () => {
  let component: TelephoneClientComponent;
  let fixture: ComponentFixture<TelephoneClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephoneClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
