import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalModalComponent } from './universal-modal.component';

describe('UniversalModalComponent', () => {
  let component: UniversalModalComponent;
  let fixture: ComponentFixture<UniversalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
