import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { Grupo } from '../../modelo/enums/Grupo';
import { AuthService } from '../auth/auth.service';

export const requestInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error.menssagem === 'Token Expirado.') {
        toastrService.error('Token expirado, faça o login novamente.');
        redirecionaUsuario(); // Limpa o token e desloga o usuário
      }

      return throwError(() => error); // Repropaga o erro
    })
  );

  function redirecionaUsuario() {
    const grupo = authService.getUserRole();
    if (grupo == Grupo.ADMINISTRADOR || grupo == Grupo.ESTOQUISTA) {
      authService.logout('/login');
    } else {
      authService.logout('/entrar');
    }
  }
};
