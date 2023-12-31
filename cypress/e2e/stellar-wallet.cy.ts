/// <reference types="cypress" />

import {
  URL_HORIZON,
  URL_TRANSACTION_HISTORY,
  amount,
  destinationId,
  privateKey,
  signerAccountPublicKey,
  urlAccountViewer,
} from '../support/constants';

beforeEach(() => {
  cy.visit(Cypress.env('base_url'));
});

describe('Stellar Wallet management', () => {
  beforeEach(() => {
    cy.get('[data-cy="home-generate-keypair"]').as('connectBtnGenerateKeyPair');
    cy.get('[data-cy="home-connect-secret-key"]').as('connectWithPrivateKey');
    cy.get('[data-cy="home-container"]').as('homeContainer');
    cy.get('[data-cy="dashboard-main-container"]').should('not.exist').as('dashboardContainer');
  });
  describe('UI Layout', () => {
    it('Should show a navbar', () => {
      cy.get('[data-cy="nav-container"]').should('exist').and('be.visible');
      cy.get('[data-cy="nav-login-btn-copy"]').should('not.exist');
      cy.get('[data-cy="nav-btn-sign-out"]').should('not.exist');
      cy.get('[data-cy="nav-logo"]').should('be.visible');
      cy.get('[data-cy="nav-logo-link"]')
        .should('be.visible')
        .and('have.attr', 'href', Cypress.env('URL_STELLAR'));
      cy.get('[data-cy="nav-btn-account-viewer"]')
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Account Viewer');
    });
    it('Should show a home page with different options to connect to the wallet', () => {
      cy.get('@homeContainer').should('exist').and('be.visible');
      cy.get('[data-cy="home-title"]').should('be.visible').and('contain', 'Connect with a wallet');
      cy.get('[data-cy="home-button-list-container"]').should('exist').and('be.visible');

      cy.get('@connectBtnGenerateKeyPair')
        .should('be.visible')
        .and('contain', 'Generate key pair for a new account');
      cy.get('@connectWithPrivateKey')
        .should('be.visible')
        .and('contain', 'Connect with a secret key');
    });
    it('Should redirect to the Home page when you navigate to the account page without login', () => {
      const urlDashboard = '/dashboard';

      cy.get('@homeContainer').should('exist').and('be.visible');
      cy.get('@dashboardContainer').should('not.exist');

      cy.visit(`${Cypress.env('base_url')}${urlDashboard}`);

      cy.get('@homeContainer').should('exist').and('be.visible');
      cy.get('@dashboardContainer').should('not.exist');
    });
    it('Sould show a footer', () => {
      const urlStellarTermsOfService = `${Cypress.env('URL_STELLAR')}${Cypress.env(
        'STELLAR_TERMS_OF_SERVICE',
      )}`;
      const urlStellarPrivacyPolicy = `${Cypress.env('URL_STELLAR')}${Cypress.env(
        'STELLAR_PRIVACY_POLICY',
      )}`;
      cy.get('[data-cy="footer-container"]').should('exist').and('be.visible');
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
      cy.get('[data-cy="footer-repository-title"]').should('be.visible').and('contain', 'Github');

      cy.get('[data-cy="footer-repository-link"]')
        .should('be.visible')
        .and('have.attr', 'href', Cypress.env('URL_GITHUB_REPO'));
    });
  });

  describe('Login', () => {
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
        cy.get('[data-cy="albedo-btn-cancel"]')
          .should('exist')
          .and('be.visible')
          .contains('Cancel');
      });
    });
    describe('connect with a secret key', () => {
      beforeEach(() => {
        cy.get('@connectWithPrivateKey').click();
        cy.get('[data-cy="modal-container"]').as('modalContainer');
        cy.get('[data-cy="warning-accept-terms"]').as('warningAcceptTerms');
        cy.get('[data-cy="warning-btn-continue"]').as('warningBtnContinue');
      });
      it('Should show a modal with a warning', () => {
        cy.get('@modalContainer').should('exist').and('be.visible');

        cy.get('[data-cy="modal-btn-close"]').should('be.visible');
        cy.get('[data-cy="modal-title"]')
          .should('be.visible')
          .and('contain', 'Connect with a secret key');
        cy.get('[data-cy="warning-login-container"]').should('be.visible');
        cy.get('[data-cy="warning-details-container"]').should('be.visible');
        cy.get('@warningAcceptTerms')
          .find('label')
          .should('exist')
          .and('contain', 'I understand and accept the risks of entering my secret key.');
        cy.get('@warningAcceptTerms').find('input').should('exist').and('not.be.checked');
        cy.get('@warningBtnContinue').should('exist').and('contain', 'Continue').and('be.disabled');
        cy.get('[data-cy="warning-btn-cancel"]').should('exist').and('contain', 'Cancel');
      });
      it('Should not be able to click the Continue button when not accepting terms in the warning modal', () => {
        cy.get('@modalContainer').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-container"]')
          .should('not.exist')
          .as('loginPrivateKeyContainer');

        cy.get('@warningBtnContinue').click({ force: true });

        cy.get('@modalContainer').should('exist').and('be.visible');
        cy.get('@loginPrivateKeyContainer').should('not.exist');
      });
      it('Should show the login modal when clicking on continue in the warning modal', () => {
        cy.get('@warningAcceptTerms').find('input').check();
        cy.get('@warningBtnContinue').click();

        cy.get('[data-cy="warning-login-container"]').should('not.exist');
        cy.get('[data-cy="login-secret-key-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-info-svg"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-description"]').should('exist').and('be.visible');
        cy.get('[data-cy="login-secret-key-acount-viewer-url"]')
          .should('be.visible')
          .and('contain', urlAccountViewer)
          .and('have.attr', 'href', urlAccountViewer);
        cy.get('[data-cy="login-secret-key-form"]')
          .should('exist')
          .and('be.visible')
          .as('loginSecretKeyForm');
        cy.get('@loginSecretKeyForm').find('label').contains('YOUR SECRET KEY');
        cy.get('@loginSecretKeyForm').find('input').should('exist');
        cy.get('[data-cy="login-secret-key-form-errors"]').should('not.exist');
        cy.get('[data-cy="login-secret-key-btn-connect"]')
          .should('exist')
          .and('contain', 'Connect');
      });
      it('Should show a error message when the secret key is invalid', () => {
        const invalidSecretKeys = [
          'hello',
          '1234',
          'JOUTRBOUJGVFOFRKRQT2BZN',
          'GVFOFRKRQT2BZN3UR5ULVEN4FJKT7GRFSANEPI74NFPALZ4JOUTRBOUJ',
        ];
        const errorMessage =
          'Invalid secret key. Secret keys are uppercase and begin with the letter "S."';

        cy.get('@warningAcceptTerms').find('input').check();
        cy.get('@warningBtnContinue').click();

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
      it('Should log in successfully', () => {
        cy.get('@warningAcceptTerms').find('input').check();
        cy.get('@warningBtnContinue').click();

        cy.get('[data-cy="login-secret-key-form"]').find('input').type(privateKey);
        cy.get('[data-cy="login-secret-key-btn-connect"]').click();

        cy.url().should('include', '/dashboard');
        cy.get('[data-cy="nav-btn-sign-out"]').should('exist').and('be.visible');
        cy.get('[data-cy="nav-login-public-key"]').should('exist').and('be.visible');
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

  describe('Dashboard Wallet', () => {
    beforeEach(() => {
      cy.get('@connectWithPrivateKey').click();
      cy.get('[data-cy="warning-accept-terms"]').find('input').check();
      cy.get('[data-cy="warning-btn-continue"]').click();

      cy.get('[data-cy="login-secret-key-form"]').find('input').type(privateKey);
      cy.intercept(`${URL_HORIZON}/accounts/${signerAccountPublicKey}`, {
        fixture: 'signer-account.json',
      });
      cy.get('[data-cy="login-secret-key-btn-connect"]').click();

      cy.get('[data-cy="dashboard-balance-btn-send"]').as('btnSendPayment');
      cy.get('[data-cy="nav-login-btn-copy"]').as('loginBtnCopyPublicKey');
      cy.get('[data-cy="nav-btn-sign-out"]').as('loginBtnSignOut');
    });
    describe('Login container on Navbar', () => {
      it('Should show a button to copy the public key and another to sign out', () => {
        cy.get('@loginBtnCopyPublicKey').should('exist').and('be.visible');
        cy.get('[data-cy="nav-account-icon"]').should('exist').and('be.visible');
        cy.get('[data-cy="nav-login-public-key"]').should('exist').and('be.visible');
        cy.get('@loginBtnSignOut').should('exist').and('be.visible').contains('Sign out');
      });
      it('Should log out of the account', () => {
        cy.get('@loginBtnCopyPublicKey').should('exist').and('be.visible');
        cy.get('@loginBtnSignOut').should('exist').and('be.visible').contains('Sign out');
        cy.url().should('include', '/dashboard');

        cy.get('@loginBtnSignOut').click();

        cy.url().should('not.include', '/dashboard');
        cy.get('@loginBtnCopyPublicKey').should('not.exist');
        cy.get('@loginBtnSignOut').should('not.exist');
        cy.get('@homeContainer').should('exist').and('be.visible');
      });
    });
    describe('Balance information section', () => {
      beforeEach(() => {
        cy.get('[data-cy="dashboard-balance-information"]').as('balanceInformation');
        cy.get('[data-cy="dashboard-balance-public-key-container"]').as('balancePublicKey');
      });
      it('Should show user balance in XLM', () => {
        cy.get('@loginBtnCopyPublicKey').should('exist').and('be.visible');
        cy.get('@loginBtnSignOut').should('exist').and('be.visible').contains('Sign out');
        cy.get('[data-cy="dashboard-main-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="dashboard-balance-section-container"]').should('exist').and('be.visible');
        cy.get('@balanceInformation').should('exist').and('be.visible');
        cy.get('@balanceInformation').find('h3').contains('Your Balance');
        cy.get('@balanceInformation').find('p').contains('Lumens (XLM)');

        cy.get('[data-cy="dashboard-balance-btn-container"]').should('exist').and('be.visible');
        cy.get('@btnSendPayment').should('be.visible').contains('Send');
        cy.get('[data-cy="dashboard-balance-btn-receive"]')
          .should('be.visible')
          .contains('Receive');

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
        cy.get('[data-cy="dashboard-payment-container"]').as('dashboardPaymentContainer');
      });
      it('Should show a message that there are no transactions', () => {
        cy.intercept('GET', `${URL_TRANSACTION_HISTORY}`, {
          fixture: 'without-transaction-history.json',
        });

        cy.get('@loginBtnCopyPublicKey').should('exist').and('be.visible');
        cy.get('@dashboardPaymentContainer').should('exist').and('be.visible');

        cy.get('@dashboardPaymentContainer').find('h3').contains('Payments History');
        cy.get('@dashboardPaymentContainer').find('p').contains('There are no payments to show');
      });
      it('Should show your payments history', () => {
        const paymentTableHeader = ['DATE/TIME', 'ADDRESS', 'AMOUNT', 'OPERATION ID'];

        cy.intercept(`${URL_TRANSACTION_HISTORY}`, {
          fixture: 'transaction-history.json',
        }).as('transactionHistory');

        cy.get('@loginBtnSignOut').should('exist').and('be.visible').contains('Sign out');
        cy.get('@dashboardPaymentContainer').should('exist').and('be.visible');

        cy.get('@dashboardPaymentContainer').find('h3').contains('Payments History');
        cy.get('@dashboardPaymentContainer')
          .find('p')
          .contains('Hiding payments smaller than 0.5 XLM');

        cy.get('[data-cy="dashboard-payment-table-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="dashboard-payment-thead"]')
          .find('th')
          .then((th) => {
            const texts = Cypress._.map(th, 'innerText');
            expect(texts, 'headings').to.deep.equal(paymentTableHeader);
          });
        cy.wait('@transactionHistory');
        cy.get('[data-cy="dashboard-payment-tbody"]')
          .should('exist')
          .and('be.visible')
          .as('paymentTableBody');
        cy.get('@paymentTableBody').find('tr').should('have.length', 3);

        cy.get('[data-cy="dashboard-payment-tbody-icon-profile"]')
          .should('exist')
          .and('be.visible')
          .and('have.attr', 'alt', 'Transaction icon');
      });
    });
    describe('Send Payment', () => {
      beforeEach(() => {
        cy.get('@btnSendPayment').click();

        cy.get('[data-cy="send-payment-container"]').as('sendPaymentContainer');
        cy.get('[data-cy="send-payment-destination-id"]').as('destionationIdContainer');
        cy.get('[data-cy="send-payment-amount"]').as('amountContainer');
        cy.get('[data-cy="send-payment-btn-send"]').as('btnSendPayment');
      });
      it('Should show a modal to send payments', () => {
        cy.get('[data-cy="modal-container"]').should('exist').and('be.visible');
        cy.get('[data-cy="modal-btn-close"]').should('exist').and('be.visible');
        cy.get('@sendPaymentContainer').should('exist').and('be.visible');
        cy.get('[data-cy="send-payment-title"]').should('be.visible').contains('Send Lumens');
        cy.get('[data-cy="send-payment-form"]').should('exist').and('be.visible');

        cy.get('@destionationIdContainer').should('exist').and('be.visible');
        cy.get('@destionationIdContainer')
          .find('label')
          .should('be.visible')
          .contains('SENDING TO');
        cy.get('@destionationIdContainer')
          .find('input')
          .should('be.visible')
          .and('have.attr', 'placeholder', "Recipient's public key or federation address");
        cy.get('[data-cy="send-payment-destination-id-error"]').should('not.exist');

        cy.get('@amountContainer').should('exist').and('be.visible');
        cy.get('@amountContainer').find('label').should('be.visible').contains('AMOUNT');
        cy.get('@amountContainer')
          .find('input')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Amount to send');
        cy.get('@amountContainer').find('p').should('be.visible').contains('lumens');
        cy.get('[data-cy="send-payment-amount-error"]').should('not.exist');

        cy.get('@btnSendPayment').should('exist').and('be.visible').contains('Send');
        cy.get('[data-cy="send-payment-btn-cancel"]')
          .should('exist')
          .and('be.visible')
          .contains('Cancel');
      });
      it('Should show error messages', () => {
        cy.get('@destionationIdContainer').find('input').click();
        cy.get('@sendPaymentContainer').click({ force: true });
        cy.get('[data-cy="send-payment-destination-id-error"]')
          .should('exist')
          .contains('Please enter a valid Stellar or Federated address');
        cy.get('@destionationIdContainer').find('input').clear();

        cy.get('@amountContainer').find('input').click();
        cy.get('@sendPaymentContainer').click({ force: true });
        cy.get('[data-cy="send-payment-amount-error"]')
          .should('exist')
          .contains('Please enter amount');
        cy.get('@amountContainer').find('input').clear();

        cy.get('@destionationIdContainer').find('input').type('hello');
        cy.get('@sendPaymentContainer').click({ force: true });
        cy.get('[data-cy="send-payment-destination-id-error"]')
          .should('exist')
          .contains(
            'Stellar address or public key is invalid. Public keys are uppercase and begin with letter "G"',
          );
        cy.get('@destionationIdContainer').find('input').clear();

        cy.get('@destionationIdContainer').find('input').type('hello');
        cy.get('@sendPaymentContainer').click({ force: true });
        cy.get('[data-cy="send-payment-destination-id-error"]')
          .should('exist')
          .contains(
            'Stellar address or public key is invalid. Public keys are uppercase and begin with letter "G"',
          );
        cy.get('@destionationIdContainer').find('input').clear();
      });
      it('Should send payments with private key successfully', () => {
        cy.intercept('POST', `${Cypress.env('URL_HORIZON')}/transactions`, {
          fixture: 'transaction-success.json',
        });
        cy.intercept(`${Cypress.env('URL_HORIZON')}/accounts/${signerAccountPublicKey}`, {
          fixture: 'signer-account.json',
        });
        cy.intercept(`${Cypress.env('URL_HORIZON')}/accounts/${destinationId}`, {
          fixture: 'destionation-account.json',
        });

        cy.get('@destionationIdContainer').find('input').type(destinationId);
        cy.get('@amountContainer').find('input').type(amount);
        cy.get('@btnSendPayment').click();

        cy.wait(500);
        cy.url().should('include', '/dashboard');
        cy.get('[data-cy="modal-container"]').should('not.exist');
      });
    });
  });
});
