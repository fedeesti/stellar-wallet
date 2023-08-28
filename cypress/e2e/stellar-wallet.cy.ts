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

describe('Dashboard Wallet', () => {
  describe('Balance information section', () => {
    it('should show your balance in XLM', () => {
      cy.get('[data-cy="dashboard-main-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-balance-section-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-balance-information"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-balance-information"]').find('h3').contains('Your Balance');
      cy.get('[data-cy="dashboard-balance-information"]').find('p').contains('Lumens (XLM)');

      cy.get('[data-cy="dashboard-balance-btn-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-balance-btn-send"]').should('be.visible').contains('Send');
      cy.get('[data-cy="dashboard-balance-btn-receive"]').should('be.visible').contains('Receive');

      cy.get('[data-cy="dashboard-balance-public-key-container"]')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy="dashboard-balance-public-key-container"]')
        .find('h3')
        .should('be.visible')
        .contains('Your Stellar Public Key');
      cy.get('[data-cy="dashboard-balance-public-key-container"]')
        .find('code')
        .invoke('text')
        .then((text) => {
          const firstLetter = text.trim()[0];
          expect(firstLetter).to.equal('G');
        });
    });
  });
  describe('', () => {
    it('should show your payments history', () => {
      const theadArray = ['DATE/TIME', 'ADDRESS', 'AMOUNT', 'MEMO', 'OPERATION ID'];

      cy.get('[data-cy="dashboard-payment-container"]').should('exist').and('be.visible');

      cy.get('[data-cy="dashboard-payment-header-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-payment-header-container"]')
        .find('h3')
        .contains('Payments History');
      cy.get('[data-cy="dashboard-payment-header-container"]')
        .find('p')
        .contains('Hiding payments smaller than 0.5 XLM');

      cy.get('[data-cy="dashboard-payment-table-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-payment-thead"]')
        .find('th')
        .then((th) => {
          const texts = Cypress._.map(th, 'innerText');
          expect(texts, 'headings').to.deep.equal(theadArray);
        });
      cy.get('[data-cy="dashboard-payment-tbody"]').find('td').should('have.length', 5);
    });
  });
});
