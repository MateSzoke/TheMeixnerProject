import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTopRowComponent } from './task-top-row.component';

describe('TaskTopRowComponent', () => {
  let component: TaskTopRowComponent;
  let fixture: ComponentFixture<TaskTopRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTopRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTopRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
