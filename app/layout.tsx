import type { ReactNode } from 'react';
import Providers from './providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Container from '@/components/common/Container';
import './globals.css';

export const metadata = {
  title: 'Next Golden Starter',
  description: 'Minimal, modern Next.js starter with i18n, Auth.js, Prisma and great DX.',
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <Providers>
          <Header />
          <main>
            <Container className="py-8">{children}</Container>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
