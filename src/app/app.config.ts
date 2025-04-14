import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";

import {
  provideClientHydration,
  withIncrementalHydration,
} from "@angular/platform-browser";
import {
  errorInterceptor,
  authInterceptor,
  cacheInterceptor,
} from "./_shared/_interceptors";
import { BACKEND_API } from "./_shared/_models";
import { APP_ROUTES } from "./app-routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: BACKEND_API, useValue: "https://dummyjson.com" },
    provideHttpClient(
      withInterceptors([errorInterceptor, authInterceptor, cacheInterceptor])
    ),
    provideRouter(APP_ROUTES),
    provideClientHydration(withIncrementalHydration()),
    provideHttpClient(withFetch()),
  ],
};
