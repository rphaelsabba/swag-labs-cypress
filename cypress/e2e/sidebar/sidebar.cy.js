import { aboutLink, addBackPackToCartButton, addBackpackToCartButton, allItemsLink, logoutLink, removeBackPackFromCartButton, resetAppStateLink, sidebar } from '../../fixtures/consts';
import '../../support/commands'

describe('Sidebar', () => {
    beforeEach(() => {
        cy.validLogin();
    })
    it('Sidebar options', () => {
        cy.get(sidebar).click();
        cy.get(allItemsLink).contains('All Items');
        cy.get(aboutLink).contains('About');
        cy.get(logoutLink).contains('Logout');
        cy.get(resetAppStateLink).contains('Reset App State');
    });

    it('Sidebar - Logout', () => {
        cy.get(sidebar).click();
        cy.get(logoutLink).click();
        cy.url().should('eq', 'https://www.saucedemo.com/');
    });

    it('Sidebar - Reset App State', () => {
        cy.get(addBackPackToCartButton).click();
        cy.get(sidebar).click();
        cy.get(resetAppStateLink).click();
        cy.get(removeBackPackFromCartButton).should('not.be.visible');
    });
})