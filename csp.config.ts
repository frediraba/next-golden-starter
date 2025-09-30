/**
 * Deklaratiivsed CSP presetid populaarsete teenuste jaoks.
 * Mitte midagi pole vaikimisi lubatud – kõik on OFF kuni paned ENV lüliti.
 */
export type CspBuckets = {
  script: string[];
  connect: string[];
  img: string[];
  style: string[];
  font: string[];
  frame: string[];
  worker: string[];
};

export type CspPreset = Partial<CspBuckets>;

export const PRESETS: Record<string, CspPreset> = {
  // Google Analytics 4 / Tag Manager
  GA: {
    script: ['https://www.googletagmanager.com'],
    connect: ['https://www.google-analytics.com', 'https://www.googletagmanager.com'],
    img: ['https://www.google-analytics.com'],
    frame: ['https://www.googletagmanager.com'],
  },

  // Vercel Analytics / Speed Insights
  VERCEL_ANALYTICS: {
    script: ['https://vitals.vercel-insights.com'],
    connect: ['https://vitals.vercel-insights.com'],
  },

  // Sentry browser SDK
  SENTRY: {
    script: ['https://browser.sentry-cdn.com'],
    connect: ['https://o*.ingest.sentry.io', 'https://sentry.io'],
    img: ['https://o*.ingest.sentry.io', 'https://sentry.io'],
  },

  // PostHog Cloud
  POSTHOG: {
    script: ['https://*.posthog.com'],
    connect: ['https://*.posthog.com'],
    img: ['https://*.posthog.com'],
  },

  // Stripe Checkout/Elements
  STRIPE: {
    script: ['https://js.stripe.com'],
    connect: ['https://api.stripe.com'],
    frame: ['https://js.stripe.com', 'https://hooks.stripe.com'],
    img: ['https://q.stripe.com'],
  },

  // Google Fonts
  GOOGLE_FONTS: {
    style: ['https://fonts.googleapis.com'],
    font: ['https://fonts.gstatic.com'],
  },

  // Mapbox
  MAPBOX: {
    script: ['https://api.mapbox.com'],
    style: ['https://api.mapbox.com'],
    img: ['https://api.mapbox.com', 'https://events.mapbox.com', 'data:', 'blob:'],
    connect: ['https://api.mapbox.com', 'https://events.mapbox.com'],
    worker: ['blob:'],
  },

  // Google Maps
  GOOGLE_MAPS: {
    script: ['https://maps.googleapis.com'],
    style: ['https://fonts.googleapis.com'],
    font: ['https://fonts.gstatic.com'],
    img: ['https://maps.gstatic.com', 'https://maps.googleapis.com'],
    connect: ['https://maps.googleapis.com', 'https://maps.gstatic.com'],
  },
};

// Abi: koosta täis bucket’id tühjade massiividega
export function emptyBuckets(): CspBuckets {
  return { script: [], connect: [], img: [], style: [], font: [], frame: [], worker: [] };
}

// Liida mitu presetit üheks bucketiks (unikaalsed väärtused)
export function mergePresets(names: string[]): CspBuckets {
  const acc = emptyBuckets();
  for (const name of names) {
    const p = PRESETS[name];
    if (!p) continue;
    for (const k of Object.keys(acc) as (keyof CspBuckets)[]) {
      const list = p[k] ?? [];
      for (const v of list) if (!acc[k].includes(v)) acc[k].push(v);
    }
  }
  return acc;
}
