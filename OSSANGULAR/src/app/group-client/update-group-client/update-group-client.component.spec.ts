import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupClientComponent } from './update-group-client.component';

describe('UpdateGroupClientComponent', () => {
  let component: UpdateGroupClientComponent;
  let fixture: ComponentFixture<UpdateGroupClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGroupClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
