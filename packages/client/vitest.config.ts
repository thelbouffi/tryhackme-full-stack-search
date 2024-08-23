/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['./src/tests/e2e/**'],
    globals: true,
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
})
