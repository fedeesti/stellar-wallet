/// <reference types="cypress" />

beforeEach(() => {
  cy.visit(Cypress.env('base_url'));
});

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
      cy.get('[data-cy="home-title"]').should('be.visible').and('contain', 'Connect with a wallet');
      cy.get('[data-cy="home-button-list-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="home-generate-keypair"]')
        .should('be.visible')
        .and('contain', 'Generate key pair for a new account');
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

  describe('Generate key pair for a new account', () => {
    it('when clicking on the button, should show a modal with a confirm', () => {
      cy.get('[data-cy="home-generate-keypair"]').click();

      cy.get('[data-cy="modal-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="modal-btn-close"]').should('be.visible');
      cy.get('[data-cy="modal-title"]').should('be.visible').contains('Generate a new keypair');

      cy.get('[data-cy="confirm-generate-description-container"]')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy="confirm-generate-warning-svg"]').should('exist').and('be.visible');
      cy.get('[data-cy="confirm-generate-description"]').should('exist').and('be.visible');
      cy.get('[data-cy="confirm-generate-btn-continue"]').should('exist').and('be.visible');
      cy.get('[data-cy="confirm-generate-btn-cancel"]').should('exist').and('be.visible');
    });
    it('when clicking on continue in the confirm modal, should show the generated keypair', () => {
      cy.get('[data-cy="home-generate-keypair"]').click();
      cy.get('[data-cy="confirm-generate-btn-continue"]').click();

      cy.get('[data-cy="modal-confirm-generate-container"]').should('not.exist');
      cy.get('[data-cy="modal-generate-keypair-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="modal-title"]').should('be.visible').contains('Generate a new keypair');
      cy.get('[data-cy="generate-keypair-description-container"]')
        .should('exist')
        .and('be.visible');

      cy.get('[data-cy="generate-keypair-public-container"]').find('h4').contains('PUBLIC KEY');
      cy.get('[data-cy="generate-keypair-secret-container"]').find('h4').contains('SECRET KEY');

      cy.get('[data-cy="generate-keypair-copy-text-container"]').should('exist');
      cy.get('[data-cy="generate-keypair-error-message"]').should('not.exist');
      cy.get('[data-cy="generate-keypair-stored-container"]').should('exist');
      cy.get('[data-cy="generate-keypair-btn-close"]').should('exist').contains('Close');
    });
    it('when not accepting to have saved the private key in a safe place, should show an error message', () => {
      cy.get('[data-cy="home-generate-keypair"]').click();
      cy.get('[data-cy="confirm-generate-btn-continue"]').click();
      cy.get('[data-cy="generate-keypair-error-message"]').should('not.exist');

      cy.get('[data-cy="generate-keypair-btn-close"]').click();
      cy.get('[data-cy="generate-keypair-error-message"]')
        .should('exist')
        .and('be.visible')
        .contains('Please confirm that you have copied and stored your secret key');
    });
    it('the error message should go away when you accept that you have saved the private key in a safe place', () => {
      cy.get('[data-cy="home-generate-keypair"]').click();
      cy.get('[data-cy="confirm-generate-btn-continue"]').click();
      cy.get('[data-cy="generate-keypair-error-message"]').should('not.exist');

      cy.get('[data-cy="generate-keypair-btn-close"]').click();
      cy.get('[data-cy="generate-keypair-error-message"]')
        .should('exist')
        .and('be.visible')
        .contains('Please confirm that you have copied and stored your secret key');

      cy.get('[data-cy="generate-keypair-stored-container"]').find('input').check();
      cy.get('[data-cy="generate-keypair-error-message"]').should('not.exist');
    });
  });
});
