/// <reference types="cypress" />

beforeEach(() => {
  cy.visit(Cypress.env('base_url'));
});

describe('Stellar Wallet management', () => {
  describe('UI Layout', () => {
    describe('Navbar', () => {
      it('should show a navbar', () => {
        cy.get('[data-cy="nav-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="nav-logo"]').should('be.visible').and('have.attr', 'alt', 'Stellar Logo');
        cy.get('[data-cy="nav-logo-link"]')
          .should('be.visible')
          .and('have.attr', 'href', Cypress.env('URL_STELLAR'));
      });
    });
    describe('Home page', () => {
      it('should show a home page with different options to connect to the wallet', () => {
        cy.get('[data-cy="home-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="home-title"]')
          .should('be.visible')
          .and('contain', 'Connect with a wallet');
        cy.get('[data-cy="home-button-list-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="home-connect-secret-key"]')
          .should('be.visible')
          .and('contain', 'Connect with a secret key');
      });
    });
    describe('Footer', () => {
      it('should show a footer', () => {
        const UrlStellarTermsOfService = `${Cypress.env('URL_STELLAR')}${Cypress.env(
          'STELLAR_TERMS_OF_SERVICE',
        )}`;
        const UrlStellarPrivacyPolicy = `${Cypress.env('URL_STELLAR')}${Cypress.env(
          'STELLAR_PRIVACY_POLICY',
        )}`;
        cy.get('[data-cy="footer-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="footer-stellar-description"]')
          .should('be.visible')
          .and('contain', 'All Rights Reserved');
        cy.get('[data-cy="footer-stellar-link"]').should('be.visible').and('contain', 'Stellar');
        cy.get('[data-cy="footer-stellar-link"]')
          .should('be.visible')
          .and('contain', 'Stellar')
          .and('have.attr', 'href', Cypress.env('URL_STELLAR'));
        cy.get('[data-cy="footer-terms-of-service-title"]')
          .should('be.visible')
          .and('contain', 'Terms of Service');
        cy.get('[data-cy="footer-terms-of-service-link"]')
          .should('be.visible')
          .and('have.attr', 'href', UrlStellarTermsOfService);
        cy.get('[data-cy="footer-privacy-policy-title"]')
          .should('be.visible')
          .and('contain', 'Privacy Policy');
        cy.get('[data-cy="footer-privacy-policy-link"]')
          .should('be.visible')
          .and('have.attr', 'href', UrlStellarPrivacyPolicy);
        cy.get('[data-cy="footer-repository-title"]')
          .should('be.visible')
          .and('contain', 'Repository');
        cy.get('[data-cy="footer-repository-link"]')
          .should('be.visible')
          .and('have.attr', 'href', Cypress.env('URL_GITHUB_REPO'));
      });
    });
  });
  describe('Login', () => {
    describe('connect with a secret key', () => {
      it('when clicking on the button, should show a modal with a warning', () => {
        cy.get('[data-cy="home-connect-secret-key"]').click();

        cy.get('[data-cy="modal-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="modal-btn-close"]').should('be.visible');
        cy.get('[data-cy="modal-title"]')
          .should('be.visible')
          .and('contain', 'Connect with a secret key');

        cy.get('[data-cy="warning-login-container"]').should('be.visible');
        cy.get('[data-cy="warning-details-container"]').should('be.visible');
        cy.get('[data-cy="warning-accept-terms"]').should('be.visible');
        cy.get('[data-cy="warning-accept-terms"] > label')
          .should('be.visible')
          .and('contain', 'I understand and accept the risks of entering my secret key.');
        cy.get('[data-cy="warning-accept-terms"] > input').should('be.visible');
        cy.get('[data-cy="warning-accept-terms"] > input').should('not.be.checked');
        cy.get('[data-cy="warning-btn-continue"]').should('be.visible').and('contain', 'Continue');
        cy.get('[data-cy="warning-btn-continue"]').should('be.disabled');
        cy.get('[data-cy="warning-btn-cancel"]').should('be.visible').and('contain', 'Cancel');
      });
      it('when not accepting terms in the warning modal, you should not be able to click the Continue button', () => {
        cy.get('[data-cy="home-connect-secret-key"]').click();

        cy.get('[data-cy="modal-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-container"]').should('not.exist');

        cy.get('[data-cy="warning-btn-continue"]').click({ force: true });

        cy.get('[data-cy="modal-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-container"]').should('not.exist');
      });
      it('when clicking on continue in the warning modal, should show the login modal', () => {
        const urlAccountViewer = 'https://accountviewer.stellar.org';

        cy.get('[data-cy="home-connect-secret-key"]').click();
        cy.get('[data-cy="warning-accept-terms"] > input').check();
        cy.get('[data-cy="warning-btn-continue"]').click();

        cy.get('[data-cy="warning-login-container"]').should('not.exist');
        cy.get('[data-cy="login-secret-key-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-info-svg"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-description"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-acount-viewer-url"]')
          .should('be.visible')
          .and('contain', urlAccountViewer)
          .and('have.attr', 'href', urlAccountViewer);
        cy.get('[data-cy="login-secret-key-form"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-form"]').find('label').contains('YOUR SECRET KEY');
        cy.get('[data-cy="login-secret-key-form"]').find('input').should('be.visible');
        cy.get('[data-cy="login-secret-key-form-errors"]').should('not.exist');
        cy.get('[data-cy="login-secret-key-btn-connect"]')
          .should('exist')
          .and('contain', 'Connect');
      });
      it('when the secret key is invalid, should show a error message', () => {
        const invalidSecretKeys = [
          'hello',
          '1234',
          'JOUTRBOUJGVFOFRKRQT2BZN',
          'GVFOFRKRQT2BZN3UR5ULVEN4FJKT7GRFSANEPI74NFPALZ4JOUTRBOUJ',
        ];
        const errorMessage =
          'Invalid secret key. Secret keys are uppercase and begin with the letter "S."';

        cy.get('[data-cy="home-connect-secret-key"]').click();
        cy.get('[data-cy="warning-accept-terms"] > input').check();
        cy.get('[data-cy="warning-btn-continue"]').click();

        cy.get('[data-cy="warning-login-container"]').should('not.exist');
        cy.get('[data-cy="login-secret-key-container"]').should('exist').and('be.visible');

        cy.get('[data-cy="login-secret-key-btn-connect"]').click();
        cy.get('[data-cy="login-secret-key-form-errors"]')
          .should('exist')
          .and('contain', 'Please enter your secret key');

        for (let i = 0; i < invalidSecretKeys.length; i++) {
          cy.get('[data-cy="login-secret-key-form"]').find('input').type(invalidSecretKeys[i]);
          cy.get('[data-cy="login-secret-key-btn-connect"]').click();
          cy.get('[data-cy="login-secret-key-form-errors"]')
            .should('exist')
            .and('contain', errorMessage);
          cy.get('[data-cy="login-secret-key-form"]').find('input').clear();
        }
      });
    });
  });
});
