import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {

  const router =inject(Router)
  const authService=inject(AuthService)

  if(authService.isLoading()){
    return false
  }
  if(authService.isAuthenticated()){
    return true
  }
  return router.createUrlTree(['/login']);
};

