import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanMatchFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if( authService.isLoggedIn){
    return true
  }
  return router.createUrlTree(['/login']);
};
