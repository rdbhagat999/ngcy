import { mount } from "cypress/angular";
import { AboutComponent } from "./about.component";

const title = "Work with us";

describe("AboutComponent", () => {
  it("mounts", () => {
    mount(AboutComponent, {
      imports: [AboutComponent],
    });
  });

  it(`should have title ${title}`, () => {
    mount(AboutComponent, {
      imports: [AboutComponent],
    });

    cy.get("[data-cy=title]").contains(title);
  });
});
