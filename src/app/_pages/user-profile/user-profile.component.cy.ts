import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "@app/app-routes";
import { AuthService } from "@app/_services";
import {
  errorInterceptor,
  authInterceptor,
  cacheInterceptor,
} from "@app/_shared/_interceptors";
import { BACKEND_API } from "@app/_shared/_models";
import { mount } from "cypress/angular";
import { UserProfileComponent } from "./user-profile.component";

const title = "Profile Information";

describe("UserProfileComponent", () => {
  beforeEach(() => {
    mount(UserProfileComponent, {
      imports: [UserProfileComponent, HttpClientTestingModule],
      providers: [
        provideRouter([...APP_ROUTES]),
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

  it(`should have text ${title}`, () => {
    cy.get("[data-cy=profile-info]").contains(title);
  });
});
