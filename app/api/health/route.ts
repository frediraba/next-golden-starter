import { NextResponse } from 'next/server';

/**
 * Tervisekontroll: kas rakendus vastab. Kasulik monitooringule ja CI-le.
 * Laienda julgelt (DB ping, välisteenused jne).
 */
export async function GET() {
  const now = new Date().toISOString();

  // Vercel/Git build meta (kui olemas)
  const commit = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT || null;
  const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.GIT_BRANCH || null;
  const env = process.env.NODE_ENV;

  return NextResponse.json(
    {
      status: 'ok',
      time: now,
      env,
      git: { commit, branch },
    },
    { status: 200 },
  );
}
