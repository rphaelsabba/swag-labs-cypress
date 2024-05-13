const { usernameField, username, passwordField, password, loginButton, errorUser, addBackPackToCartButton, cartButton, addBikeLightToCartButton } = require("../fixtures/consts");

Cypress.Commands.add('validLogin', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(usernameField).type(username);
    cy.get(passwordField).type(password);
    cy.get(loginButton).click();
});

Cypress.Commands.add('errorUser', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(usernameField).type(errorUser);
    cy.get(passwordField).type(password);
    cy.get(loginButton).click();
});

Cypress.Commands.add('addProductToCart', () => {
    cy.get(addBackPackToCartButton).click();
    cy.get(cartButton).click();
});

Cypress.Commands.add('addTwoProductsToCart', () => {
    cy.get(addBackPackToCartButton).click();
    cy.get(addBikeLightToCartButton).click();
    cy.get(cartButton).click();
});