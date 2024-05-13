import { addBackPackToCartButton, addBoltTshirt, backPackName, removeBackPackFromCartButton, removeBoltTshirt } from '../../fixtures/consts';
import '../../support/commands'

describe('Products', () => {
    it("Access the product", () => {
        cy.validLogin();
        cy.get(backPackName).first().click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=4');
    });

    it("Add a product to the cart", () => {
        cy.errorUser();
        cy.get(addBoltTshirt).click();
        cy.get(removeBoltTshirt).should('be.visible');
    });

    it('Remove a product from the cart', () => {
        cy.errorUser();
        cy.get(addBackPackToCartButton).click();
        cy.get(removeBackPackFromCartButton).click();
        cy.get(addBackPackToCartButton).should('be.visible');
    });
});