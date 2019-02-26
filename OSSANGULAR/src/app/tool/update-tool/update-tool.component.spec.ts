import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToolComponent } from './update-tool.component';

describe('UpdateToolComponent', () => {
  let component: UpdateToolComponent;
  let fixture: ComponentFixture<UpdateToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
