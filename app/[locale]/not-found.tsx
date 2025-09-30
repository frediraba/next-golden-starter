'use client';

import Link from 'next/link';

/**
 * not-found.tsx renderdub automaatselt, kui Next ei leia teed selles segmendis.
 * Asub app/[locale]/ all, et sobituda meie i18n struktuuriga.
 * Soovi korral võid kasutada next-intl hooke ja tõlkeid.
 */
export default function NotFound() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">404 – Page not found</h1>
      <p className="text-gray-600">The page you are looking for does not exist.</p>
      <div className="space-x-3">
        {/* Link „..“ viib sama locale juurkausta (nt /en) */}
        <Link href=".." className="underline">
          Go back
        </Link>
        <Link href="/" className="underline">
          Home
        </Link>
      </div>
    </main>
  );
}
