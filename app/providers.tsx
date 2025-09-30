'use client';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/lib/theme';

// NB: next-intl provider on app/[locale]/layout.tsx failis (serveris).
export default function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
