# Project Overview

**Mis see on?** Universaalne Next.js starter (Next 15, React 19, Tailwind 4, TypeScript, ESLint 9 flat, next-intl, Prisma+SQLite, Auth.js v5, Vitest+Playwright, CI, CSP).

## Kiirnupud

- Dev: `npm run dev` → http://localhost:3000
- Test (unit): `npm run test:unit`
- Test (e2e): `npm run test:e2e` (vajab `npx playwright install`)
- Build: `npm run build`

## Entry points

- `app/[locale]/layout.tsx` – locale layout + messages laadimine
- `app/[locale]/page.tsx` – avaleht (kasutab `components/HomeView.tsx`)
- `messages/{en,et}.json` – tõlked
- `i18n.ts` / `next-intl.config.ts` – i18n seadistus
- `app/api/health/route.ts` – healthcheck
- `app/api/auth/[...nextauth]/route.ts` – Auth.js v5
- `prisma/schema.prisma` – DB skeem (SQLite devis)
- `middleware.ts` – i18n redirect + CSP (dev vs prod), /api/\* EI lokaliseerita

## Testimine

- Vitest + React Testing Library (`tests/`)
- Playwright e2e (`e2e/`, `playwright.config.ts`, `webServer`)

## Turve

- CSP dev/prod eraldi; kolmandad teenused ENV-lülititega (`csp.config.ts`).

## Reeglid

- ESLint 9 (flat) + Prettier – “fix on save” explicit
- LF line endings
- Path alias `@/*` → repo juur
