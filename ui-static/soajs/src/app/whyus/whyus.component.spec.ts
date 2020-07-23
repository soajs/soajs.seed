import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyusComponent } from './whyus.component';

describe('WhyusComponent', () => {
  let component: WhyusComponent;
  let fixture: ComponentFixture<WhyusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
