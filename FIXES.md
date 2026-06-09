# Fix Guide — Windows Development Environment

## Issue 1: `Cannot find module @rollup/rollup-win32-x64-msvc`

### What Happened
npm optional dependencies are resolved per-platform. When `npm install` runs on WSL/Linux,
it fetches `rollup-linux-x64-gnu` but skips `rollup-win32-x64-msvc`. When you then run
`npm run dev` from Windows PowerShell, Node.js needs the Windows binary which doesn't exist.

### Fix (run in Windows PowerShell)
```powershell
cd C:\Users\user\james-banana
npm install
```

The `postinstall` script will automatically patch Rollup to fall back to WASM if the
native binary is missing. The repo now also includes `@rollup/wasm-node` as a devDependency
and `@rollup/rollup-win32-x64-msvc` in optionalDependencies.

### If the error persists, do a clean reinstall:
```powershell
cd C:\Users\user\james-banana
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

---

## Issue 2: Vercel SSR 500 Error

### What Happened
`Web3Provider.tsx` imported `initAppKit` from `@/lib/web3/config` at module level.
This triggered loading of `@reown/appkit-adapter-wagmi` which contains `window` references.
During SSR, `window` is undefined → crash. The real error was hidden by h3's error swallowing.

### Fix (already applied in source)
- `Web3Provider.tsx` no longer imports `initAppKit`
- `__root.tsx` dynamically imports `initAppKit` inside `useEffect` with `typeof window` guard
- `public/favicon.ico` added (was missing, causing favicon requests to hit SSR)

### Verify after deploy
- Root URL returns 200
- /staking returns 200
- /favicon.ico returns 200
- No "h3 swallowed SSR error" in Vercel logs

---

## Issue 3: nitro version mismatch (ERESOLVE)

### What Happened
`@lovable.dev/vite-tanstack-config@2.3.2` requires `nitro >=3.0.260603-beta` (peerOptional).
Old `node_modules` had `nitro@3.0.260429-beta`, causing ERESOLVE on `npm install`.

### Fix
The `package.json` now pins `nitro: "3.0.260603-beta"` in devDependencies.
A clean `npm install` will fetch the correct version.

```powershell
cd C:\Users\user\james-banana
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## Quick Start (Windows PowerShell)

```powershell
cd C:\Users\user\james-banana
npm install
npm run dev
```

Expected output:
```
  VITE v7.3.5  ready in XXX ms

  ➜  Local:   http://localhost:8080/
```

## Environment Variables

Create a `.env` file in `C:\Users\user\james-banana\` with:
```
VITE_REOWN_PROJECT_ID=14a6012ffc42d98b14cc3637e1c3c924
```

## Deploy to Vercel

```powershell
git pull origin main
git push origin main
```

Or trigger a redeploy from the Vercel dashboard. The latest commit has all fixes.
