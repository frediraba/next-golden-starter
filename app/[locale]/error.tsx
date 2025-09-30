'use client';

import { useEffect } from 'react';

/**
 * error.tsx püüab runtime vead selle segmendi all (server+client).
 * Next annab siia {error, reset}. Reset proovib uuesti renderdada.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Siin võid logida Sentry/PostHog vms (kui hiljem lisad)
    // console.error(error);
  }, [error]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-gray-600">Please try again.</p>
      <div className="space-x-3">
        <button onClick={() => reset()} className="px-3 py-2 rounded bg-black text-white">
          Try again
        </button>
      </div>
      {/* Diagnoosimiseks (ära näita prodis tundlikku infot) */}
      {process.env.NODE_ENV !== 'production' && (
        <pre className="text-xs text-gray-500 overflow-auto">{error.message}</pre>
      )}
    </main>
  );
}
