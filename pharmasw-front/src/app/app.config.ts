import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations'
import { BsModalService } from 'ngx-bootstrap/modal';
import { tokenInterceptor } from './infra/interceptors/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    BsModalService,
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ] // Injeta dependência de forma global na aplicação
};
