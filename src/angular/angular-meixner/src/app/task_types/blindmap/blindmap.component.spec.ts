import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlindmapComponent } from './blindmap.component';

describe('BlindmapComponent', () => {
  let component: BlindmapComponent;
  let fixture: ComponentFixture<BlindmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlindmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlindmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
