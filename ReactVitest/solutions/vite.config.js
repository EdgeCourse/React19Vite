import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { defineConfig as defineVitestConfig } from 'vitest/config';

// Vite configuration with Vitest setup
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows global test functions like describe, it, expect, etc.
    environment: 'jsdom', // Use jsdom for browser-like environment
    setupFiles: './vitest.setup.js', // Specify the setup file for global configurations
  },
});
