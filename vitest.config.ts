import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fallback alias juhuks, kui tsconfigPaths ei lae
const aliasFallback = {
  '@': resolve(__dirname, '.'),
};

export default defineConfig({
  resolve: { alias: aliasFallback },
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    // välista .next ja e2e testid Vitesti runnerist
    exclude: ['.next/**', '**/.next/**', 'e2e/**', 'node_modules/**'],
    css: true,
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      // Välista Nexti buildi väljund, node_modules, e2e jms
      exclude: [
        '.next/**',
        '**/.next/**',
        'node_modules/**',
        'e2e/**',
        'tests/setup.ts',
        '**/*.d.ts',
      ],
      // ära proovi “untested files” läbi kammida – katame ainult jooksutatud moodulid
      all: false,
    },
  },
});
