import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertInventoryCategoryComponent } from './insert-inventory-category.component';

describe('InsertInventoryCategoryComponent', () => {
  let component: InsertInventoryCategoryComponent;
  let fixture: ComponentFixture<InsertInventoryCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertInventoryCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertInventoryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
