/// <reference types="cypress" />

beforeEach(() => {
  cy.visit(Cypress.env('base_url'));
});

describe('UI Layout', () => {
  it('Should show a navbar', () => {
    cy.get('[data-cy="nav-container"]').should('exist').and('be.visible');
    cy.get('[data-cy="nav-logo"]').should('be.visible').and('have.attr', 'alt', 'Stellar Logo');
    cy.get('[data-cy="nav-logo-link"]')
      .should('be.visible')
      .and('have.attr', 'href', Cypress.env('URL_STELLAR'));
  });
  it('Should show a footer', () => {
    const urlStellarTermsOfService = `${Cypress.env('URL_STELLAR')}${Cypress.env(
      'STELLAR_TERMS_OF_SERVICE',
    )}`;
    const urlStellarPrivacyPolicy = `${Cypress.env('URL_STELLAR')}${Cypress.env(
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
      .and('have.attr', 'href', urlStellarTermsOfService);
    cy.get('[data-cy="footer-privacy-policy-title"]')
      .should('be.visible')
      .and('contain', 'Privacy Policy');
    cy.get('[data-cy="footer-privacy-policy-link"]')
      .should('be.visible')
      .and('have.attr', 'href', urlStellarPrivacyPolicy);
    cy.get('[data-cy="footer-repository-title"]').should('be.visible').and('contain', 'Repository');
    cy.get('[data-cy="footer-repository-link"]')
      .should('be.visible')
      .and('have.attr', 'href', Cypress.env('URL_GITHUB_REPO'));
  });
});

describe('Dashboard Wallet', () => {
  describe('Balance information section', () => {
    beforeEach(() => {
      cy.get('[data-cy="dashboard-balance-information"]').as('balanceInformation');
      cy.get('[data-cy="dashboard-balance-public-key-container"]').as('balancePublicKey');
    });
    it('Should show your balance in XLM', () => {
      cy.get('[data-cy="dashboard-main-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-balance-section-container"]').should('exist').and('be.visible');
      cy.get('@balanceInformation').should('exist').and('be.visible');
      cy.get('@balanceInformation').find('h3').contains('Your Balance');
      cy.get('@balanceInformation').find('p').contains('Lumens (XLM)');

      cy.get('[data-cy="dashboard-balance-btn-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-balance-btn-send"]').should('be.visible').contains('Send');
      cy.get('[data-cy="dashboard-balance-btn-receive"]').should('be.visible').contains('Receive');

      cy.get('@balancePublicKey').should('exist').and('be.visible');
      cy.get('@balancePublicKey')
        .find('h3')
        .should('be.visible')
        .contains('Your Stellar Public Key');
      cy.get('@balancePublicKey')
        .find('code')
        .invoke('text')
        .then((text) => {
          const firstLetter = text.trim()[0];
          expect(firstLetter).to.equal('G');
        });
    });
  });
  describe('Payments History', () => {
    beforeEach(() => {
      cy.get('[data-cy="dashboard-payment-header-container"]').as('paymentHeader');
    });
    it('Should show your payments history', () => {
      const paymentTableHeader = ['DATE/TIME', 'ADDRESS', 'AMOUNT', 'MEMO', 'OPERATION ID'];

      cy.get('[data-cy="dashboard-payment-container"]').should('exist').and('be.visible');

      cy.get('@paymentHeader').should('exist').and('be.visible');
      cy.get('@paymentHeader').find('h3').contains('Payments History');
      cy.get('@paymentHeader').find('p').contains('Hiding payments smaller than 0.5 XLM');

      cy.get('[data-cy="dashboard-payment-table-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="dashboard-payment-thead"]')
        .find('th')
        .then((th) => {
          const texts = Cypress._.map(th, 'innerText');
          expect(texts, 'headings').to.deep.equal(paymentTableHeader);
        });
      cy.get('[data-cy="dashboard-payment-tbody"]').find('td').should('have.length', 5);
    });
  });
  describe('Liquidity Pool Transactions', () => {
    beforeEach(() => {
      cy.get('[data-cy="dashboard-transaction-header-container"]').as('transactionHeader');
    });
    it('Should show your transactions', () => {
      cy.get('[data-cy="dashboard-transaction-container"]').should('exist').and('be.visible');
      cy.get('@transactionHeader').should('exist').and('be.visible');
      cy.get('@transactionHeader').find('h3').contains('Liquidity Pool Transactions');
      cy.get('@transactionHeader')
        .find('p')
        .contains('There are no recent liquidity pool transactions to show');
    });
  });
});
