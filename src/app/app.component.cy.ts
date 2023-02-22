import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ErrorHandler, importProvidersFrom } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { mount } from "cypress/angular";
import { APP_ROUTES } from "./app-routes";
import { AppComponent } from "./app.component";
import { ToastrService } from "./toastr";
import { AuthService, GlobalErrorHandlerService } from "./_services";
import {
  errorInterceptor,
  authInterceptor,
  cacheInterceptor,
} from "./_shared/_interceptors";
import { BACKEND_URL } from "./_shared/_models";

describe("AppComponent", () => {
  it("mounts", () => {
    mount(AppComponent, {
      imports: [AppComponent],
      providers: [
        importProvidersFrom([NoopAnimationsModule]),
        { provide: BACKEND_URL, useValue: "https://dummyjson.com" },
        { provide: ToastrService, useClass: ToastrService },
        { provide: AuthService, useClass: AuthService },
        provideHttpClient(
          withInterceptors([
            errorInterceptor,
            authInterceptor,
            cacheInterceptor,
          ])
        ),
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
        provideRouter([...APP_ROUTES]),
      ],
    });
  });
});
