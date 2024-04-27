import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
  import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { demoInterceptor } from './Admin/car-company/demo.interceptor';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([demoInterceptor])),
  ],
};
