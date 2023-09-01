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

describe('Connect with Albedo', () => {
  it('Should show a modal to connect with Albedo', () => {
    cy.get('[data-cy="login-albedo-btn"]')
      .should('exist')
      .and('be.visible')
      .contains('Connect with Albedo');
    cy.get('[data-cy="modal-container"]').should('not.exist');

    cy.get('[data-cy="login-albedo-btn"]').click();

    cy.get('[data-cy="modal-container"]').should('exist').and('be.visible');
    cy.get('[data-cy="modal-btn-close"]').should('exist').and('be.visible');
    cy.get('[data-cy="albedo-logo-svg"]').should('exist').and('be.visible');
    cy.get('[data-cy="albedo-title"]').should('be.visible').contains('Connect with Albedo');
    cy.get('[data-cy="modal-albedo-information"]')
      .should('be.visible')
      .contains('Albedo is a browser wallet.');
    cy.get('[data-cy="modal-albedo-information-link"]')
      .should('be.visible')
      .contains('Learn more')
      .and('have.attr', 'href', Cypress.env('URL_ALBEDO_LINK'));
    cy.get('[data-cy="modal-albedo-body-container"]').should('exist').and('be.visible');
    cy.get('[data-cy="modal-albedo-info-svg"]').should('exist').and('be.visible');
    cy.get('[data-cy="modal-albedo-description"]')
      .find('p')
      .should('exist')
      .and('be.visible')
      .contains('Click on "Connect with Albedo" to launch Albedo browser wallet.');
    cy.get('[data-cy="albedo-btn-connect"]')
      .should('exist')
      .and('be.visible')
      .contains('Connect with Albedo');
    cy.get('[data-cy="albedo-btn-cancel"]').should('exist').and('be.visible').contains('Cancel');
  });
});
