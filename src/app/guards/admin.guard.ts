import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {


  const _routerService = inject(Router);
  const _authService = inject(AuthService);

  return true;

  // if (_authService.isLoggedIn() && _authService.getRol() == "admin") {
  //   return true;
  // } else {
  //   _routerService.navigate(['/login']);
  //   return false;
  // }
  

}
