import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "@app/app-routes";
import { mount } from "cypress/angular";
import { PageNotFoundComponent } from "./page-not-found.component";

const title = "404 - Not Found";

describe("PageNotFoundComponent", () => {
  it("mounts", () => {
    mount(PageNotFoundComponent, {
      imports: [PageNotFoundComponent],
      providers: [provideRouter([...APP_ROUTES])],
    });
  });

  it(`should have title ${title}`, () => {
    mount(PageNotFoundComponent, {
      imports: [PageNotFoundComponent],
      providers: [provideRouter([...APP_ROUTES])],
    });

    cy.get("[data-cy=title]").contains(title);
  });
});
