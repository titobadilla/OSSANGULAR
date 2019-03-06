import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutputGeneralComponent } from './inventory-output-general.component';

describe('InventoryOutputGeneralComponent', () => {
  let component: InventoryOutputGeneralComponent;
  let fixture: ComponentFixture<InventoryOutputGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryOutputGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutputGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
