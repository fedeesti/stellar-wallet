import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {},
  env: {
    base_url: 'http://localhost:5173',
    URL_STELLAR: 'https://www.stellar.org/',
    STELLAR_TERMS_OF_SERVICE: 'terms-of-service',
    STELLAR_PRIVACY_POLICY: 'privacy-policy',
    URL_GITHUB_REPO: 'https://github.com/fedeesti/stellar-wallet',
    URL_ALBEDO_LINK: 'https://albedo.link/',
  },
});
