import { TestBed } from '@angular/core/testing';

import { SoajsInterceptor } from './soajs.interceptor';

describe('SoajsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SoajsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SoajsInterceptor = TestBed.inject(SoajsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
