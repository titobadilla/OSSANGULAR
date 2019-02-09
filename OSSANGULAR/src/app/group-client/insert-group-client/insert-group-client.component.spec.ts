import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertGroupClientComponent } from './insert-group-client.component';

describe('InsertGroupClientComponent', () => {
  let component: InsertGroupClientComponent;
  let fixture: ComponentFixture<InsertGroupClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertGroupClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertGroupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
