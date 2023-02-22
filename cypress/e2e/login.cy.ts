/*
Run these commands in two different terminals
1. npm start
2. npm run test
3. After new browser window opens select E2E
*/

describe("Login process", () => {
  it("passes as USER", () => {
    cy.visit("http://localhost:4200");
    cy.get("[data-cy=login]").first().click();
    cy.get("[data-cy=user]").first().click();
    cy.get("[data-cy=login-btn]").first().click();
    cy.get("[data-cy=toggle-dropdown]").first().click();
    cy.get("[data-cy=profile-link]").first().click();
    cy.get("[data-cy=role]").contains("USER");
    cy.get("[data-cy=profile-info]").contains("Profile Information");
    cy.get("[data-cy=logout-link]").first().click();
  });

  it("passes as AUTHOR", () => {
    cy.visit("http://localhost:4200");
    cy.get("[data-cy=login]").first().click();
    cy.get("[data-cy=author]").first().click();
    cy.get("[data-cy=login-btn]").first().click();
    cy.get("[data-cy=toggle-dropdown]").first().click();
    cy.get("[data-cy=profile-link]").first().click();
    cy.get("[data-cy=role]").contains("AUTHOR");
    cy.get("[data-cy=profile-info]").contains("Profile Information");
    cy.get("[data-cy=logout-link]").first().click();
  });

  it("passes as ADMIN", () => {
    cy.visit("http://localhost:4200");
    cy.get("[data-cy=login]").first().click();
    cy.get("[data-cy=admin]").first().click();
    cy.get("[data-cy=login-btn]").first().click();
    cy.get("[data-cy=toggle-dropdown]").first().click();
    cy.get("[data-cy=profile-link]").first().click();
    cy.get("[data-cy=role]").contains("ADMIN");
    cy.get("[data-cy=profile-info]").contains("Profile Information");
    cy.get("[data-cy=logout-link]").first().click();
  });
});
