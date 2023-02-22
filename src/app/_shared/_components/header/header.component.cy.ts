import { mount } from "cypress/angular";
import { HeaderComponent } from "./header.component";

const title = "Cypress & Angular Standalone Components Demo";

describe("HeaderComponent", () => {
  it("mounts", () => {
    mount(HeaderComponent);
  });

  it(`has title ${title}`, () => {
    mount(HeaderComponent, {
      componentProperties: {
        title,
      },
    });
    cy.get("[data-cy=title]").contains(title);
  });
});
