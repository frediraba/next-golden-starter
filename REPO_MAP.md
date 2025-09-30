# Repo Map (kust miski asub ja miks)

> See fail on _kiirkompass_ uuele arendajale ja AI-assarile.  
> Lühidalt selgitab **kausta rolli** ja **oluliste failide mõtte**.

---

## 1) Rakenduse kihid

### `app/`

Next.js **App Router** juur. Iga alamkaust on **route segment**.

- `app/[locale]/` – **i18n segment**
  - `layout.tsx` – laeb locale-põhised tõlked (`messages/{locale}.json`), seab `<html lang>`, wrappib `NextIntlClientProvider`.
    - _Miks_: locale jääb URL-i (`/en/...`, `/et/...`) ja sisu saab tõlkeid.
  - `page.tsx` – avaleht (kasutab presentatsioonikomponenti `components/HomeView.tsx`).
    - _Miks_: leht hoiab i18n/routingut; UI on testitav eraldi komponendina.
  - `not-found.tsx` – 404 selles segmendis.
  - `error.tsx` – error boundary (server+client), `reset()` nupp dev UX-i jaoks.

- `app/[locale]/db-demo/` – **Prisma demo**
  - `actions.ts` – `use server` server-actions; kasutab `lib/db.ts`.
  - `page.tsx` – lihtne UI kasutajate loomiseks/kuvamiseks.

- `app/api/` – **serverless** route’d
  - `health/route.ts` – `GET /api/health` (status, aeg, env, git meta)
  - `auth/[...nextauth]/route.ts` – Auth.js v5 GitHub OAuth

---

## 2) Raamistiku utilid

- `i18n.ts` – locales (`["en","et"]`), defaultLocale, tüübid.
- `i18n/request.ts` – serveripoolne next-intl util (kui kasutad; optional).
- `next-intl.config.ts` – next-intl konfiguratsioon (keelte loend jms).
- `middleware.ts` – **i18n redirect + turvapealkirjad**
  - Dev CSP lubab HMR/RSC (`'unsafe-inline' 'unsafe-eval' blob:`; `connect ws:/localhost`).
  - Prod CSP range; **CSP presetid** ENV-iga (`csp.config.ts`).
  - **/api/** _EI_ saa i18n-redirecti (health/webhooks jms).
- `csp.config.ts` – deklaratiivsed CSP presetid (GA, Sentry, PostHog, Stripe, Google Fonts/Maps, Mapbox).
  - `mergePresets(names)` → koondab domeenid CSP direktiividesse.

---

## 3) UI

- `components/HomeView.tsx` – **presentatsioonikomponent** (puhtalt UI, testitav).
  - _Miks_: hoia ärikiht (i18n, routing, server actions) **lehtedes**; UI eraldi → **lihtne testida**, **taaskasutada**.

---

## 4) Andmekiht

- `prisma/schema.prisma` – Mudelid (näidis: `User`).
- `prisma/dev.db` – SQLite dev andmebaas.
- `lib/db.ts` – Prisma kliendi singleton (hot-reload safe).

---

## 5) Tõlked

- `messages/en.json`, `messages/et.json` – **namespace’d** (nt `"Home": {...}`)
  - _Nippe_: hoia tekstitükid lühikesed; väldi toorest HTML-i tekstis.

---

## 6) Testid

- `tests/` – **Vitest (+React Testing Library)**
  - `setup.ts` – JSDOM cleanup, jest-dom matchers.
  - `home.test.tsx` – näidis (renderdab `HomeView`).
- `e2e/` – **Playwright**
  - `basic.spec.ts` – põhinäidis (kontrollib esilehte).
- `vitest.config.ts` – tsconfig-paths plugin, alias fallback `@`, exclude `.next/`, coverage v8.
- `playwright.config.ts` – `webServer`-käivitus (dev) + e2e runner.

---

## 7) Kvaliteet & DX

- `.eslint.config.mjs` – ESLint 9 **flat** (pluginid, reeglid).
- `.prettierrc` – Prettier.
- `.editorconfig` – editori ühtlustus (indent, charset, EOL).
- `.npmrc` – lukustused/registreid jms.
- `.husky/pre-commit` – lint-staged hook (Prettier, ESLint, kiire typecheck).
- `.vscode/` – soovitatud extensionid, settings (ESLint flat, Prettier, Tailwind, i18n Ally), launch/tasks.

---

## 8) CI

- `.github/workflows/ci.yml` – lint → build/typecheck → unit+coverage → e2e
  - Artefakt: Playwright report, kui e2e feilib.

---

## 9) Turve

- **CSP**: dev vs prod; presetid ENV-iga.  
   Näide ENV:
  ```env
  CSP_ENABLE_GA=true
  CSP_ENABLE_GOOGLE_FONTS=true
  HSTS: lisandub ainult prod HTTPS all (mitte localhost).
  ```

10. Kiired rajad uue featuuri jaoks
    Leht: app/[locale]/feature/page.tsx

UI: components/FeatureView.tsx (testitav)

Server (vajadusel): app/[locale]/feature/actions.ts ("use server")

Tõlked: lisa võtmed messages/{en,et}.json alla

Test: tests/feature.test.tsx (Vitest+RTL)

CSP: kui lisad analüütika/CDN/kaardid → lülita ENV-iga preset sisse

11. Nõuanded
    Hoia presentatsioon ja orkestreerimine lahus (testitavus!).

ENV -> CSP preset on “lüliti”, mitte koodimuutus – ideaalne starteri taaskasutuseks.

Prisma: alusta SQLite’ga; migreeri Postgres/MySQL’ile, kui vaja (vaheta datasource + DATABASE_URL).

Line endings: LF (ka Windowsis).

Alias @/\*: importi alati juurest (@/components/…, @/lib/…).
