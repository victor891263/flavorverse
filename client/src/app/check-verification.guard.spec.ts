import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkVerificationGuard } from './check-verification.guard';

describe('checkVerificationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkVerificationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
