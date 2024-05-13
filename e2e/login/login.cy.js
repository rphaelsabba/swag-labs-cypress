/// <reference types="cypress" />

import { errorMessage, lockedUser, loginButton, password, passwordField, productsTitle, username, usernameField } from '../../fixtures/consts';
import '../../support/commands'
import { faker } from '@faker-js/faker';

describe('Valid login flow', () => {
    it('Valid login', () => {
        cy.validLogin()
        cy.get(productsTitle).contains('Products')
    });
});

describe('Invalid login flow', () => {
    it('Invalid login - Empty password', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get(usernameField).type(username);
        cy.get(loginButton).click();
        cy.get(errorMessage).invoke('text').should('match', /^The Password is required$/);
    });

    it('Invalid login - Empty username', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get(passwordField).type(password);
        cy.get(loginButton).click();
        cy.get(errorMessage).invoke('text').should('match', /^Username is required$/);
    });

    it('Invalid login - Empty username and password fields', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get(loginButton).click();
        cy.get(errorMessage).invoke('text').should('match', /^Username isrequired$/);
    });

    it('Invalid login - Not registered account', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get(usernameField).type(faker.internet.userName());
        cy.get(passwordField).type(faker.internet.password());
        cy.get(loginButton).click();
        cy.get(errorMessage).invoke('text').should('match', /^Username and password do not match any user in this servicee$/);
    });

    it('Invalid login - Wrong password', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get(usernameField).type(username);
        cy.get(passwordField).type(faker.internet.password());
        cy.get(loginButton).click();
        cy.get(errorMessage).invoke('text').should('match', /^Username and password do not match any user in this servicee$/);
    });

    it('Invalid login - Locked out user', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get(usernameField).type(lockedUser);
        cy.get(passwordField).type(password);
        cy.get(loginButton).click();
        cy.get(errorMessage).invoke('text').should('match', /^Sorry, this user has been locked out.$/);
    });
});