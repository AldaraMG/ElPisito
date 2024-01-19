import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const _routerService = inject(Router);
  const _authService = inject(AuthService);

  return true;
};
