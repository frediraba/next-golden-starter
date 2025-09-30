import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './i18n';
import { mergePresets } from './csp.config';

function envEnabled(name: string) {
  const v = process.env[name];
  return v && /^(1|true|yes|on)$/i.test(v);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV !== 'production';

  // --- Valitud CSP presetid ENV-ist (prod) ---
  const presetNames: string[] = [];
  if (envEnabled('CSP_ENABLE_GA')) presetNames.push('GA');
  if (envEnabled('CSP_ENABLE_SENTRY')) presetNames.push('SENTRY');
  if (envEnabled('CSP_ENABLE_POSTHOG')) presetNames.push('POSTHOG');
  if (envEnabled('CSP_ENABLE_STRIPE')) presetNames.push('STRIPE');
  if (envEnabled('CSP_ENABLE_VERCEL_ANALYTICS')) presetNames.push('VERCEL_ANALYTICS');
  if (envEnabled('CSP_ENABLE_GOOGLE_FONTS')) presetNames.push('GOOGLE_FONTS');
  if (envEnabled('CSP_ENABLE_MAPBOX')) presetNames.push('MAPBOX');
  if (envEnabled('CSP_ENABLE_GOOGLE_MAPS')) presetNames.push('GOOGLE_MAPS');
  const allow = mergePresets(presetNames);

  // Koosta ühtne vastus + turvapealkirjad
  const res = NextResponse.next();

  // Ühised turvapealkirjad
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CSP (dev vs prod)
  const devScript = "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:";
  const devConnect =
    "connect-src 'self' ws: http://localhost:* http://127.0.0.1:* https://localhost:* https://127.0.0.1:*";
  const prodScript = ["script-src 'self'", ...allow.script].join(' ');
  const prodConnect = ["connect-src 'self'", ...allow.connect].join(' ');
  const cspParts = [
    "default-src 'self'",
    ["img-src 'self' data: blob:", ...allow.img].join(' '),
    isDev ? devScript : prodScript,
    ["style-src 'self' 'unsafe-inline'", ...allow.style].join(' '),
    ["font-src 'self' data:", ...allow.font].join(' '),
    isDev ? devConnect : prodConnect,
    "frame-ancestors 'none'",
    allow.frame.length ? ['frame-src', ...allow.frame].join(' ') : "frame-src 'none'",
    allow.worker.length ? ['worker-src', ...allow.worker].join(' ') : undefined,
    "base-uri 'self'",
    "form-action 'self'",
  ].filter(Boolean) as string[];

  res.headers.set('Content-Security-Policy', cspParts.join('; '));

  // HSTS ainult HTTPS prod’is (mitte localhost)
  const proto =
    request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
  const host = request.headers.get('host') ?? request.nextUrl.hostname;
  const isLocal = !!host && (host.startsWith('localhost') || host.startsWith('127.0.0.1'));
  if (!isDev && proto === 'https' && !isLocal) {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  // --- ERIREEGEL: API teed (/api/*) EI tohi lokaliseerida ---
  // Tagasta kohe (turvapealkirjad on juba lisatud), ilma i18n redirectita.
  if (pathname.startsWith('/api')) {
    return res;
  }

  // --- i18n redirect ülejäänutele ---
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  // Middleware käib kõikidel teedel v.a. Nexti sisefailid ja staatilised failid
  matcher: ['/((?!_next|.*\\..*).*)'],
};
