import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMaterialComponent } from './insert-material.component';

describe('InsertMaterialComponent', () => {
  let component: InsertMaterialComponent;
  let fixture: ComponentFixture<InsertMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
