# next-golden-starter

![CI](https://github.com/frediraba/next-golden-starter/actions/workflows/ci.yml/badge.svg)

Universaalne Next.js starter õppimiseks ja päris projektideks. Fookus on **modernil stackil** ja **puhtal arenduskogemusel**:

- Next.js 15 + React 19 + Turbopack (dev)
- Tailwind CSS 4 (konfigita)
- TypeScript, ESLint 9 (flat) + Prettier
- Auth.js v5 (GitHub OAuth, JWT sessioon) — **DB pole nõutud**
- Vitest + Testing Library (unit/komponent), Playwright (e2e)
- GitHub Actions (lint → build/typecheck → unit → e2e)

---

## Quick Start

```bash
# Node 22 LTS soovitatav
node -v

# Install
npm ci

# Keskkonnamuutujad (vali üks):
# macOS/Linux
cp env.example .env
# Windows PowerShell
copy env.example .env

# AUTH_SECRET → pane tugev väärtus (nt PowerShell):
# [Convert]::ToBase64String((1..32 | % {Get-Random -Max 256}))

# Dev
npm run dev   # http://localhost:3000
Ava http://localhost:3000 ja alusta arendust failist app/page.tsx.

Sisselogimine (GitHub OAuth, valikuline)
.env

env
Copy code
AUTH_SECRET=...                     # tugev juhuslik string (Base64 OK)
GITHUB_ID=__your_github_client_id__ # GitHub OAuth App
GITHUB_SECRET=__your_github_secret__
GitHub OAuth App seadistus

Homepage: http://localhost:3000

Authorization callback: http://localhost:3000/api/auth/callback/github

Testi

http://localhost:3000/api/auth/signin – GitHub login

http://localhost:3000/(protected)/dashboard – suunab loginile, kui sessiooni pole

Skriptid
bash
Copy code
npm run dev       # dev-server (Turbopack)
npm run build     # build + typecheck
npm run lint      # ESLint (flat-config)
npx vitest run    # unit/komponent testid
npx playwright test  # e2e (vajab, et dev jookseb paralleelselt)
Kaustastruktuur (lühi)
bash
Copy code
app/
  (protected)/
    layout.tsx          # serveripoolne auth guard (redirect signinile)
    dashboard/page.tsx  # näidis kaitstud leht
  api/auth/[...nextauth]/route.ts   # Auth.js v5 route handler
  ui-demo/page.tsx      # shadcn/ui demo (kui lisatud)
components/ui/*         # shadcn/ui komponendid (kui lisatud)
lib/
  auth.ts               # NextAuth konfiguratsioon
  utils.ts              # pisifunktsioonid
tests/                  # Vitest + RTL testid
e2e/                    # Playwright e2e testid
.github/workflows/ci.yml# CI (lint → build → unit → e2e)
Kasulikud märkmed
Tailwind 4: piisab @import "tailwindcss"; reast app/globals.css failis. Eraldi tailwind.config.js pole vaja.

ESLint 9 (flat): konfiguratsioon failis .eslint.config.mjs.

Typescript path alias: @/* (Vite/Vitest jaoks kasutame vite-tsconfig-paths pluginit).

Use this repository as a template
Klikka Use this template GitHubis.

Clone uue repo.

Käivita:

bash
Copy code
npm ci
cp env.example .env   # või Windowsis: copy env.example .env
npm run dev
Litsents / panustamine
Kui teed avalikuks: lisa siia litsents (MIT vms) ja panustamise juhised.

PR-id ja issue’d teretulnud. CI peab minema roheliseks (lint, build, unit, e2e).

yaml
Copy code

---

Kui see on sees, tee kiire commit ja push:

```powershell
git add README.md
git commit -m "docs: replace default CRA README with Golden v1 quick start"
git push