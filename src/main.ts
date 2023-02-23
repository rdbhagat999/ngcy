import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ErrorHandler, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "@app/app-routes";
import { AppComponent } from "@app/app.component";
import { ToastrService } from "@app/toastr";
import { AuthService, GlobalErrorHandlerService } from "@app/_services";
import {
  authInterceptor,
  cacheInterceptor,
  errorInterceptor,
} from "@app/_shared/_interceptors";

import { BACKEND_API } from "@app/_shared/_models/BackendUrl";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([BrowserAnimationsModule]),
    { provide: BACKEND_API, useValue: "https://dummyjson.com" },
    { provide: ToastrService, useClass: ToastrService },
    { provide: AuthService, useClass: AuthService },
    provideHttpClient(
      withInterceptors([errorInterceptor, authInterceptor, cacheInterceptor])
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideRouter([...APP_ROUTES]),
  ],
});
