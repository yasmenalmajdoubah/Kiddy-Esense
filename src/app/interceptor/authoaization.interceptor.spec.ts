import { TestBed } from '@angular/core/testing';

import { AuthoaizationInterceptor } from './authoaization.interceptor';

describe('AuthoaizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthoaizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthoaizationInterceptor = TestBed.inject(AuthoaizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
