import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "@app/_services";
import {
  errorInterceptor,
  authInterceptor,
  cacheInterceptor,
} from "@app/_shared/_interceptors";
import { BACKEND_API } from "@app/_shared/_models";
import { mount } from "cypress/angular";
import { RegisterComponent } from "./register.component";

const title = "Sign up to your account";
const username = "noahhx";
const password = "9uQFF1Lh";

describe("RegisterComponent", () => {
  it("mounts", () => {
    mount(RegisterComponent, {
      imports: [RegisterComponent],
      providers: [
        importProvidersFrom([NoopAnimationsModule]),
        { provide: BACKEND_API, useValue: "https://dummyjson.com" },
        { provide: AuthService, useClass: AuthService },
        provideHttpClient(
          withInterceptors([
            errorInterceptor,
            authInterceptor,
            cacheInterceptor,
          ])
        ),
      ],
    });
  });

  it("should register as USER", () => {
    mount(RegisterComponent, {
      imports: [RegisterComponent],
      providers: [
        importProvidersFrom([NoopAnimationsModule]),
        { provide: BACKEND_API, useValue: "https://dummyjson.com" },
        { provide: AuthService, useClass: AuthService },
        provideHttpClient(
          withInterceptors([
            errorInterceptor,
            authInterceptor,
            cacheInterceptor,
          ])
        ),
      ],
    });

    cy.get("[data-cy=title]").contains(title);
    cy.get('[data-cy="username"]').clear().type(username);
    cy.get('[data-cy="password"]').clear().type(password);
    cy.get('[data-cy="register-btn"]').click();
  });
});
