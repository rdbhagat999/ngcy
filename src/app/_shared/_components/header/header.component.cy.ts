import { mount } from "cypress/angular";
import { HeaderComponent } from "./header.component";

const title = "Cypress & Angular Standalone Components";

describe("HeaderComponent", () => {
  it("mounts", () => {
    mount(HeaderComponent);
  });

  it(`have title ${title}`, () => {
    mount(HeaderComponent, {
      componentProperties: {
        title,
      },
    });
    cy.get("[data-cy=title]").contains(title);
  });
});
