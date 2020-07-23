import { TestBed } from '@angular/core/testing';

import { SoajsresInterceptor } from './soajsres.interceptor';

describe('SoajsresInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SoajsresInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SoajsresInterceptor = TestBed.inject(SoajsresInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
