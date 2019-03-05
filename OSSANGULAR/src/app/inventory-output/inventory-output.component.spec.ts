import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutputComponent } from './inventory-output.component';

describe('InventoryOutputComponent', () => {
  let component: InventoryOutputComponent;
  let fixture: ComponentFixture<InventoryOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
