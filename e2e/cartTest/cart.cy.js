import { cartButton, checkoutButton, continueButton, errorMessage, finishButton, firstName, firstNameField, lastName, lastNameField, postalCode, postalCodeField, successfulPurchaseMessage } from '../../fixtures/consts';
import '../../support/commands'

describe('Valid purchase', () => {
    beforeEach(() => {
        cy.validLogin();
    })
    it('Buying one prodcut', () => {
         cy.addProductToCart();
        // CHECKOUT
         cy.get(checkoutButton).click();
        // FILL CHECKOUT FORM
         cy.get(firstNameField).type(firstName);
         cy.get(lastNameField).type(lastName);
         cy.get(postalCodeField).type(postalCode);
         cy.get(continueButton).click();
         //FINISH THE PURCHASE
         cy.get(finishButton).click();
         cy.get(successfulPurchaseMessage).should('contain', 'Thank you for your order!');
        });

    it('Buying two products', () => {
        cy.addTwoProductsToCart();
        // CHECKOUT
        cy.get(checkoutButton).click();
        // FILL CHECKOUT FORM
        cy.get(firstNameField).type(firstName);
        cy.get(lastNameField).type(lastName);
        cy.get(postalCodeField).type(postalCode);
        cy.get(continueButton).click();
        //FINISH THE PURCHASE
        cy.get(finishButton).click();
        cy.get(successfulPurchaseMessage).should('contain', 'Thank you for your order!');
    });
})

describe('Invalid purchase', () => {
    beforeEach(() => {
        cy.validLogin();
    })
    it('No products selected', () => {
        cy.get(cartButton).click();
        // CHECKOUT
        cy.get(checkoutButton).click();
        // FILL CHECKOUT FORM
        cy.get(firstNameField).type(firstName);
        cy.get(lastNameField).type(lastName);
        cy.get(postalCodeField).type(postalCode);
        cy.get(continueButton).click();
        //FINISH THE PURCHASE
        cy.get(finishButton).click();
        cy.get(successfulPurchaseMessage).should('not.be.visible');
    });

    it('First name field empty', () => {
        cy.addProductToCart();
        // CHECKOUT
        cy.get(checkoutButton).click();
        // FILL CHECKOUT FORM
        cy.get(lastNameField).type(lastName);
        cy.get(postalCodeField).type(postalCode);
        cy.get(continueButton).click();
        cy.get(errorMessage).contains('Error: First Name is required');
    });

    it('Last name field empty', () => {
        cy.addProductToCart();
        // CHECKOUT
        cy.get(checkoutButton).click();
        // FILL CHECKOUT FORM
        cy.get(firstNameField).type(firstName);
        cy.get(postalCodeField).type(postalCode);
        cy.get(continueButton).click();
        cy.get(errorMessage).contains('Error: Last Name is required');
    })

    it('Postal code field empty', () => {
        cy.addProductToCart();
        // CHECKOUT
        cy.get(checkoutButton).click();
        // FILL CHECKOUT FORM
        cy.get(firstNameField).type(firstName);
        cy.get(lastNameField).type(lastName);
        cy.get(continueButton).click();
        cy.get(errorMessage).contains('Error: Postal Code is required');
    })

    it('All the fields empty', () => {
        cy.addProductToCart();
        // CHECKOUT
        cy.get(checkoutButton).click();
        // FILL CHECKOUT FORM
        cy.get(continueButton).click();
        cy.get(errorMessage).contains('Error: First Name is required');
    });
});