import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {

    const expectedRole = route.data['expectedRole'] as string[];
    if(expectedRole.includes('ADMINISTRADOR') || expectedRole.includes('ESTOQUISTA')){
      router.navigate(['/login']);

    } else {
      router.navigate(['/entrar']);

    }

    return false;
  }
};
