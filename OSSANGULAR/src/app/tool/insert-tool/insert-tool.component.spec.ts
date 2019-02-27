import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertToolComponent } from './insert-tool.component';

describe('InsertToolComponent', () => {
  let component: InsertToolComponent;
  let fixture: ComponentFixture<InsertToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
