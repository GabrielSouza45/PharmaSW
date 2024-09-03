import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'] as string[];

  if (expectedRole.includes(authService.getUserRole())) {
    return true;
  } else {
    router.navigate(['/nao-autorizado']);
    return false;
  }
};
