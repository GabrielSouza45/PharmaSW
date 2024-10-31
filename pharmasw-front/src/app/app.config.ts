import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { requestInterceptor } from './infra/interceptors/request-interceptor';
import { tokenInterceptor } from './infra/interceptors/token-interceptor';

registerLocaleData(localePt, 'pt-BR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    BsModalService,
    provideHttpClient(withInterceptors([tokenInterceptor, requestInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ], // Injeta dependência de forma global na aplicação
};
