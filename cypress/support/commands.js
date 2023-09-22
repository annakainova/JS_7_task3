// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("create_user", (url, user) => {
  cy.request("POST", url, {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
  });
});

Cypress.Commands.add("find_user", (username) => {
  cy.request({
    url: `https://petstore.swagger.io/v2/user/${username}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("update_user_info", (updated_user2) => {
  cy.request("PUT", `https://petstore.swagger.io/v2/user/${updated_user2.username}`, {
    id: updated_user2.id,
    username: updated_user2.username,
    email: updated_user2.email,
    password: updated_user2.password,
  });
});

Cypress.Commands.add("delete_user", (username) => {
  cy.request("DELETE", `https://petstore.swagger.io/v2/user/${username}`);
});
