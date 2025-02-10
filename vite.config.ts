/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/verkehrsmittelvergleich/",
  plugins: [
    react(), 
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  server: {
    host: true, // Allows external access (equivalent to 0.0.0.0)
    port: 3000,
    strictPort: true, // Ensures the server fails if the port is unavailable
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
      ],
    },
  },
});
