# next-golden-starter

![CI](https://github.com/frediraba/next-golden-starter/actions/workflows/ci.yml/badge.svg)

**Universaalne Next.js starter** õppimiseks ja päris projektideks. Fookus on **modernil stackil**, **turvalisel vaikekonfigil** ja **mõnusal DX-il** – ilma, et projekt mõttetult paisuks.

- Next.js 15 + React 19 (Turbopack dev)
- Tailwind CSS 4 (konfigita; `@import "tailwindcss";`)
- TypeScript, ESLint 9 (flat), Prettier
- i18n – `next-intl` (URL-locale `/en`, `/et`, automaatne redirect)
- Auth.js v5 (GitHub OAuth, JWT sessioon) – _DB pole nõutud_
- Prisma + SQLite (devis failipõhine DB)
- Testid: Vitest (+RTL, JSDOM, coverage) & Playwright (e2e)
- CI: GitHub Actions (lint → build/typecheck → unit+coverage → e2e)
- Turve: CSP (dev/prod eraldi), HSTS, jpm. **CSP presetid ENV-iga** (GA, Sentry, PostHog, Stripe, Google Fonts/Maps, Mapbox)
- DX: husky + lint-staged, VSCode seadistused, `.editorconfig`, `.npmrc`

---

## 🧰 Eeldused

- **Node 22 LTS**
- **npm** (soovi korral pnpm/bun – kohanda käske)

Kontroll:

```bash
node -v
# v22.x
🚀 Kiirkäivitus
bash
Copy code
# 1) sõltuvused
npm ci

# 2) keskkonnamuutujad
copy env.example .env       # Windows PowerShell
# või
cp env.example .env         # macOS/Linux

# 3) Andmebaas (Prisma)
npx prisma generate
npx prisma migrate dev --name init

# 4) Dev
npm run dev   # http://localhost:3000
Ava:

http://localhost:3000/en ja http://localhost:3000/et

http://localhost:3000/en/db-demo – Prisma demo (loo kasutajaid)

http://localhost:3000/api/health – health-check (NB: API teed ei ole locale all)

🔐 Autentimine (valikuline)
Auth.js v5 GitHub OAuth (JWT sessioon). DB pole kohustuslik.

.env (näide):

env
Copy code
AUTH_SECRET= # tugev juhuslik string (nt Base64)
GITHUB_ID=__your_github_client_id__
GITHUB_SECRET=__your_github_secret__
GitHub OAuth App:

Homepage: http://localhost:3000

Authorization callback: http://localhost:3000/api/auth/callback/github

Testi:

/api/auth/signin – GitHub login

vajadusel suuna kaitstud lehtedel sisselogimisele, kui sessiooni pole

🌐 i18n (next-intl)
Locale middleware lisab puuduvasse URL-i /<defaultLocale> (vaikimisi en).

Tõlked elavad messages/en.json ja messages/et.json.

Komponentides kasuta useTranslations("Namespace").

🗃️ Andmebaas (Prisma + SQLite)
Dev: prisma/dev.db (failipõhine SQLite).

Prod: vaheta schema.prisma datasource Postgres/MySQL vastu ja sea DATABASE_URL.

Käsklused:

bash
Copy code
npx prisma generate
npx prisma migrate dev --name <nimi>
npx prisma studio
🧪 Testimine
Unit/komponent (Vitest + RTL):

bash
Copy code
npm run test:unit
npm run test:coverage   # text + lcov (coverage/)
E2E (Playwright):

bash
Copy code
npx playwright install  # esmakordsel
npm run test:e2e
# või
npm run test:e2e:headed
Vitest välistab .next/ ja e2e testid; coverage kogutakse ainult jooksutatud failidelt.

🛡️ Turve (CSP, HSTS jms)
Dev: CSP lubab HMR/RSC jaoks 'unsafe-inline' 'unsafe-eval' blob: ja ws:/localhost connect-src.

Prod: range baas ('self'). Kolmandate teenuste domeenid lülitad ENV-iga (vt csp.config.ts).

Näide – lubame GA ja Google Fonts:

env
Copy code
CSP_ENABLE_GA=true
CSP_ENABLE_GOOGLE_FONTS=true
Middleware koondab domeenid automaatselt presetitest.
NB: /api/* EI lokaliseerita (health, webhooks jms).

🩺 Health-check & vealehed
GET /api/health → 200 OK JSON (aeg, env, git meta võimalusel)

404: app/[locale]/not-found.tsx

Error boundary: app/[locale]/error.tsx (reset() nupuga)

🧭 VS Code & AI-assar
.vscode/ – extensions, settings (ESLint flat, Prettier, Tailwind, i18n Ally), launch/tasks

docs/OVERVIEW.md – repo kaart

docs/AI_GUIDE.md – reeglid AI-le (TypeScript, alias @/*, i18n, server actions, CSP presetid)

Avad VS Code’is → installi soovitatud laiendused → F5 (“Next.js dev”).

🛠️ Kasulikud skriptid
jsonc
Copy code
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "test:unit": "vitest run",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "test:e2e:headed": "playwright test --headed",
  "ci": "npm run lint && npm run build && npm run test:unit && npm run test:e2e"
}
🧹 Koodistiil & DX
ESLint 9 (flat) + Prettier

husky + lint-staged – pre-commit: prettier, eslint, kiire typecheck

LF reavahetused
Windowsi hoiatusi vältimiseks:

bash
Copy code
git config --global core.autocrlf false
git config --global core.eol lf
git add --renormalize .
git commit -m "chore: normalize line endings to LF"
🐛 Tõrkeabi
Dev CSP vead (inline script refused) – kontrolli, et middleware.ts kasutab dev-režiimis inline/eval/WS lõdvendust.

Vitest alias @/… ei toimi – vaata tsconfig.json (baseUrl, paths) + vitest.config.ts alias fallback.

Husky “command not found” – .husky/pre-commit peab olema LF ja käivitatav (UNIX: chmod +x).
```
