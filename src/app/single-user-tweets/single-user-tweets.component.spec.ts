import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserTweetsComponent } from './single-user-tweets.component';

describe('SingleUserTweetsComponent', () => {
  let component: SingleUserTweetsComponent;
  let fixture: ComponentFixture<SingleUserTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUserTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
