import { CanActivateFn } from '@angular/router';

export const checkVerificationGuard: CanActivateFn = (route, state) => {
  return true;
};
