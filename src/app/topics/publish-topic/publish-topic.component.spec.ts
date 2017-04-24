import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishTopicComponent } from './publish-topic.component';

describe('PublishTopicComponent', () => {
  let component: PublishTopicComponent;
  let fixture: ComponentFixture<PublishTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
