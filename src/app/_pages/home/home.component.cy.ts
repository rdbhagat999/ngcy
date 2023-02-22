import { mount } from "cypress/angular";
import { HomeComponent } from "./home.component";

const title = "Home page";

describe("HomeComponent", () => {
  it("mounts", () => {
    mount(HomeComponent, {
      imports: [HomeComponent],
    });
  });

  it(`should have title ${title}`, () => {
    mount(HomeComponent, {
      imports: [HomeComponent],
    });

    cy.get("[data-cy=title]").contains(title);
  });
});
