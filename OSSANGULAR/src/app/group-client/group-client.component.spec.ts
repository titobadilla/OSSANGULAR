import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupClientComponent } from './group-client.component';

describe('GroupClientComponent', () => {
  let component: GroupClientComponent;
  let fixture: ComponentFixture<GroupClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
