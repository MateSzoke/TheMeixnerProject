import { TestBed } from '@angular/core/testing';

import { RouteSelectorService } from './route-selector.service';

describe('RouteSelectorService', () => {
  let service: RouteSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
