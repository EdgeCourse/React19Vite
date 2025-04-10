import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { defineConfig as defineVitestConfig } from 'vitest/config';

// Vite configuration with Vitest setup
export default defineConfig({
  plugins: [react()],
 
});
