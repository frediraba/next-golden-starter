import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Puhasta DOM iga testi järel
afterEach(() => {
  cleanup();
});
