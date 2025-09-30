# AI Guide (Codex/Copilot)

**Eesmärk:** genereeri koodi, mis sobitub selle starteri reeglitega.

## Kirjutamise reeglid

- Keel: TypeScript. React komponendid `tsx`.
- Stiil: Prettier + ESLint 9 (flat). Ära lisa globaalset custom formatit.
- Import tee aliasiga `@/...` (baseUrl "."; paths "@/_": ["./_"]).
- Tailwind 4 klassid; lisa semantilised klassid, mitte inline-stiilid.
- Testitavus: UI loogika eraldi presentatsioonikomponenti (vt `components/HomeView.tsx`), leht orkestreerib i18n/routingu.
- i18n: uued tekstid lisa `messages/{en,et}.json` alla; komponendis kasuta `useTranslations("Namespace")`.
- Server-Actionid: `\"use server\"`; Prisma päringud läbi `lib/db.ts`.
- Turve: ära lisa kolmandaid skripte ilma CSP lülitit lisamata (`csp.config.ts` + ENV).
- Kaustastrateegia: uuel featuuril oma kaust (komponendid + testid + route).

## Commit stiil

- `feat:`, `fix:`, `chore:`, `docs:`…
- Husky + lint-staged jooksevad pre-commit (eslint, prettier, kiire typecheck).

## Koodi alguspunktid uue lehe loomiseks

1. Lisa `app/[locale]/feature/page.tsx` + vajadusel `layout.tsx`
2. Lisa presentatsioonikomponent `components/FeatureView.tsx`
3. Lisa test `tests/feature.test.tsx` (Vitest+RTL)
4. Lisa tõlked `messages/{en,et}.json`
