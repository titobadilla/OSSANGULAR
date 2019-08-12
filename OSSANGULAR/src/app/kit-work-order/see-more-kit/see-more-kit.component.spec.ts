import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMoreKitComponent } from './see-more-kit.component';

describe('SeeMoreKitComponent', () => {
  let component: SeeMoreKitComponent;
  let fixture: ComponentFixture<SeeMoreKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeMoreKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMoreKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
