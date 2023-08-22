import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {},
  env: {
    base_url: 'http://localhost:5173',
  },
});
