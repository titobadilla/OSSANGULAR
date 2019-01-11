import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDescriptionComponent } from './address-description.component';

describe('AddressDescriptionComponent', () => {
  let component: AddressDescriptionComponent;
  let fixture: ComponentFixture<AddressDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
