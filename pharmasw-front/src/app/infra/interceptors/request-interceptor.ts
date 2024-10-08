import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

export const requestInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error.menssagem === 'Token Expirado.') {
        toastrService.error('Token expirado, faça o login novamente.');
        authService.logout('/login'); // Limpa o token e desloga o usuário
      }

      return throwError(() => error); // Repropaga o erro
    })
  );
};
