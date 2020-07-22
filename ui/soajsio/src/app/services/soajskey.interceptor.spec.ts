import { TestBed } from '@angular/core/testing';

import { SoajskeyInterceptor } from './soajskey.interceptor';

describe('SoajskeyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SoajskeyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SoajskeyInterceptor = TestBed.inject(SoajskeyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
