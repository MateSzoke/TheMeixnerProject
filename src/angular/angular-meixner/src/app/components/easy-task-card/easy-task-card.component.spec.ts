import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyTaskCardComponent } from './easy-task-card.component';

describe('EasyTaskCardComponent', () => {
  let component: EasyTaskCardComponent;
  let fixture: ComponentFixture<EasyTaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyTaskCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
