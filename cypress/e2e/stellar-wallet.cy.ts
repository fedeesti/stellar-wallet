/// <reference types="cypress" />

beforeEach(() => {
  cy.visit(Cypress.env('base_url'));
});

describe('UI Layout', () => {
  describe('Navbar', () => {
    it('should show a navbar', () => {
      cy.get('[data-cy="nav-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="nav-logo"]').should('be.visible');
      cy.get('[data-cy="nav-logo-link"]')
        .should('be.visible')
        .and('have.attr', 'href', Cypress.env('URL_STELLAR'));
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
