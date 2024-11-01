import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Grupo } from '../../modelo/enums/Grupo';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'] as string[];

  if (expectedRole.includes(authService.getUserRole())) {
    return true;
  } else {
    const grupo = authService.getUserRole();
    if (grupo == Grupo.ADMINISTRADOR || grupo == Grupo.ESTOQUISTA) {
      router.navigate(['/pagina-inicial']);
    } else {
      router.navigate(['/']);
    }
    return false;
  }
};
