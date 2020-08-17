import { TestBed } from '@angular/core/testing';

import { UracService } from './urac.service';

describe('UracService', () => {
  let service: UracService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UracService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
