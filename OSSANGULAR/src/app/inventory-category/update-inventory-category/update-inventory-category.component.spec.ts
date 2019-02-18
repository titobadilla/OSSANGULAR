import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryCategoryComponent } from './update-inventory-category.component';

describe('UpdateInventoryCategoryComponent', () => {
  let component: UpdateInventoryCategoryComponent;
  let fixture: ComponentFixture<UpdateInventoryCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInventoryCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInventoryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
