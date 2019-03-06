import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutputSpecificComponent } from './inventory-output-specific.component';

describe('InventoryOutputSpecificComponent', () => {
  let component: InventoryOutputSpecificComponent;
  let fixture: ComponentFixture<InventoryOutputSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryOutputSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutputSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
