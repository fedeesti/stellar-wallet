/// <reference types="cypress" />

beforeEach(() => {
  cy.visit(Cypress.env('base_url'));
});

describe('Stellar Wallet management', () => {
  beforeEach(() => {
    cy.get('[data-cy="home-generate-keypair"]').as('connectBtnGenerateKeyPair');
  });
  describe('UI Layout', () => {
    it('Should show a navbar', () => {
      cy.get('[data-cy="nav-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="nav-logo"]').should('be.visible').and('have.attr', 'alt', 'Stellar Logo');
      cy.get('[data-cy="nav-logo-link"]')
        .should('be.visible')
        .and('have.attr', 'href', Cypress.env('URL_STELLAR'));
    });
    it('Should show a home page with different options to connect to the wallet', () => {
      cy.get('[data-cy="home-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="home-title"]').should('be.visible').and('contain', 'Connect with a wallet');
      cy.get('[data-cy="home-button-list-container"]').should('exist').and('be.visible');
      cy.get('@connectBtnGenerateKeyPair')
        .should('be.visible')
        .and('contain', 'Generate key pair for a new account');
    });
    it('Should show a footer', () => {
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
    beforeEach(() => {
      cy.get('@connectBtnGenerateKeyPair').click();
      cy.get('[data-cy="confirm-generate-btn-continue"]').as('confirmGenerateBtnContinue');
    });
    describe('in the confirmation modal', () => {
      it('Should show a modal with a confirm when clicking on the button', () => {
        cy.get('[data-cy="modal-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="modal-btn-close"]').should('be.visible');
        cy.get('[data-cy="modal-title"]').should('be.visible').contains('Generate a new keypair');

        cy.get('[data-cy="confirm-generate-description-container"]')
          .should('exist')
          .and('be.visible');
        cy.get('[data-cy="confirm-generate-warning-svg"]').should('exist').and('be.visible');
        cy.get('[data-cy="confirm-generate-description"]').should('exist').and('be.visible');
        cy.get('@confirmGenerateBtnContinue').should('exist').and('be.visible');
        cy.get('[data-cy="confirm-generate-btn-cancel"]').should('exist').and('be.visible');
      });
    });
    describe('in the generated keys modal', () => {
      beforeEach(() => {
        cy.get('@confirmGenerateBtnContinue').click();

        cy.get('[data-cy="generate-keypair-btn-close"]').as('generateKaypairBtnClose');
        cy.get('[data-cy="generate-keypair-stored-container"]').as(
          'generateKeypairStoredContainer',
        );
        cy.get('[data-cy="generate-keypair-error-message"]')
          .should('not.exist')
          .as('generateKeypairErrorMessage');
      });
      it('Should show the generated keypair when clicking on continue in the confirm modal', () => {
        cy.get('[data-cy="modal-confirm-generate-container"]').should('not.exist');
        cy.get('[data-cy="modal-generate-keypair-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="modal-title"]').should('be.visible').contains('Generate a new keypair');
        cy.get('[data-cy="generate-keypair-description-container"]')
          .should('exist')
          .and('be.visible');

        cy.get('[data-cy="generate-keypair-public-container"]').find('h4').contains('PUBLIC KEY');
        cy.get('[data-cy="generate-keypair-secret-container"]').find('h4').contains('SECRET KEY');

        cy.get('[data-cy="generate-keypair-copy-text-container"]').should('exist');
        cy.get('@generateKeypairErrorMessage');
        cy.get('@generateKeypairStoredContainer').should('exist');
        cy.get('@generateKaypairBtnClose').should('exist').contains('Close');
      });
      it('Should show an error message when not accepting to have saved the private key in a safe place', () => {
        cy.get('@generateKeypairErrorMessage');
        cy.get('@generateKaypairBtnClose').click();
        cy.get('[data-cy="generate-keypair-error-message"]')
          .should('exist')
          .and('be.visible')
          .contains('Please confirm that you have copied and stored your secret key');
      });
      it('Should go away the error message when you accept that you have saved the private key in a safe place', () => {
        cy.get('@generateKeypairErrorMessage');

        cy.get('@generateKaypairBtnClose').click();
        cy.get('[data-cy="generate-keypair-error-message"]')
          .should('exist')
          .and('be.visible')
          .contains('Please confirm that you have copied and stored your secret key');

        cy.get('@generateKeypairStoredContainer').find('input').check();
        cy.get('@generateKeypairErrorMessage');
      });
    });
  });
});
