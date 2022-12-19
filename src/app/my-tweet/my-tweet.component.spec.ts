import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTweetComponent } from './my-tweet.component';

describe('MyTweetComponent', () => {
  let component: MyTweetComponent;
  let fixture: ComponentFixture<MyTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
