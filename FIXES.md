# Fix Guide — Windows Development + Vercel Deployment

## Quick Fix (Windows PowerShell)

```powershell
cd C:\Users\user\james-banana
npm install
npm run dev
```

The `postinstall` script automatically installs the correct Rollup native binary.

---

## If `npm install` fails with ERESOLVE (nitro version)

```powershell
cd C:\Users\user\james-banana
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## If `npm run dev` fails with rollup error

```powershell
cd C:\Users\user\james-banana
node scripts/patch-rollup.cjs
npm run dev
```

---

## Deploy to Vercel

```powershell
git pull origin main
```

Then redeploy on Vercel dashboard, or:
```powershell
git push origin main
```

---

## Environment Variables (Vercel Dashboard)

| Variable | Value |
|---|---|
| `VITE_REOWN_PROJECT_ID` | `14a6012ffc42d98b14cc3637e1c3c924` |

---

## What Was Fixed

1. **Rollup native binary** — `.npmrc` disables optional deps auto-install. Postinstall script manually installs the correct binary for the current platform.
2. **SSR crash** — `initAppKit` dynamically imported in browser only. No more `window` references during SSR.
3. **Missing favicon** — Added `public/favicon.ico` + configured Nitro to copy public assets.
4. **Nitro Vercel preset** — `vite.config.ts` has `nitro: { preset: "vercel" }` for proper serverless function output.
5. **Node heap** — Build uses `NODE_OPTIONS='--max-old-space-size=4096'` to prevent OOM.
