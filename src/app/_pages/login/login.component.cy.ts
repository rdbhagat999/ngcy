import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ErrorHandler, importProvidersFrom } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { AuthService } from "@app/_services";
import {
  errorInterceptor,
  authInterceptor,
  cacheInterceptor,
} from "@app/_shared/_interceptors";
import { BACKEND_URL } from "@app/_shared/_models";
import { mount } from "cypress/angular";
import { LoginComponent } from "./login.component";

const API_URL = "https://dummyjson.com";
const title = "Sign in to your account";
const username = "atuny0";
const password = "9uQFF1Lh";
const email = "atuny0@sohu.com";

describe("LoginComponent", () => {
  it("mounts", () => {
    mount(LoginComponent, {
      imports: [LoginComponent],
      providers: [
        importProvidersFrom([NoopAnimationsModule]),
        { provide: BACKEND_URL, useValue: "https://dummyjson.com" },
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

  it("should login as USER", () => {
    mount(LoginComponent, {
      imports: [LoginComponent],
      providers: [
        importProvidersFrom([NoopAnimationsModule]),
        { provide: BACKEND_URL, useValue: "https://dummyjson.com" },
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
    cy.get("[data-cy=user]").first().click();
    cy.get('[data-cy="username"]').clear().type(username);
    cy.get('[data-cy="password"]').clear().type(password);
    cy.get('[data-cy="login-btn"]').click();

    cy.intercept("POST", `${API_URL}/auth/login`, (req) => {
      req.body = { username, password };
    }).as("LoginAsUser");

    cy.wait("@LoginAsUser").then((interception) => {
      expect(interception.request.body.username).to.eq(username);
      expect(interception.response?.body?.username).to.eq(username);
      expect(interception.response?.body?.email).to.eq(email);
    });
  });

  it("should fail login as USER", () => {
    mount(LoginComponent, {
      imports: [LoginComponent],
      providers: [
        importProvidersFrom([NoopAnimationsModule]),
        { provide: BACKEND_URL, useValue: "https://dummyjson.com" },
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

    const wrong_password = "12345";

    cy.get("[data-cy=title]").contains(title);
    cy.get("[data-cy=user]").first().click();
    cy.get('[data-cy="username"]').clear().type(username);
    cy.get('[data-cy="password"]').clear().type(wrong_password);
    cy.get('[data-cy="login-btn"]').click();

    cy.intercept("POST", `${API_URL}/auth/login`, (req) => {
      req.body = { username, wrong_password };
    }).as("LoginAsUser");

    cy.wait("@LoginAsUser").then((interception) => {
      expect(interception.request.body.password).to.eq(wrong_password);
      expect(interception.response?.statusCode).to.eq(400);
      expect(interception.response?.body?.message).to.eq("Invalid credentials");
    });
  });
});
