import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: [],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    css: true,
    globals: true,
  },
});
