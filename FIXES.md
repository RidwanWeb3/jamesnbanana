# Dependency Repair & SSR Fix Guide

## TASK #1: Rollup Windows Native Binary Fix

### Root Cause
`node_modules/@rollup/` only contains `rollup-linux-x64-gnu` (WSL).
When running from Windows (CMD/PowerShell), Vite needs `@rollup/rollup-win32-x64-msvc`.
This is an optional dependency that npm sometimes skips due to a known npm bug.

### Fix Commands

#### Windows PowerShell:
```powershell
cd C:\Users\user\james-banana
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install --include=optional
```

#### Windows CMD:
```cmd
cd C:\Users\user\james-banana
rmdir /s /q node_modules
del package-lock.json
npm install --include=optional
```

#### Git Bash:
```bash
cd /mnt/c/Users/user/james-banana
rm -rf node_modules package-lock.json
npm install --include=optional
```

### Verification:
```bash
ls node_modules/@rollup/
# Should show BOTH:
#   rollup-linux-x64-gnu
#   rollup-win32-x64-msvc
```

---

## TASK #2: SSR Crash Fix

### Root Cause
`Web3Provider.tsx` (line 7, old version) imported `initAppKit` from `@/lib/web3/config`.
Importing `config.ts` triggers module-level import of `@reown/appkit-adapter-wagmi`,
which contains browser-only code (`window` references) that crashes during SSR
module resolution — BEFORE `useEffect` ever runs.

Error seen in Vercel logs:
```
h3 swallowed SSR error: {"status":500,"unhandled":true,"message":"HTTPError"}
```

### Fix Applied

#### File: src/components/web3/Web3Provider.tsx
REMOVED: `import { initAppKit } from "@/lib/web3/config"` and `useEffect` calling it.
REASON: This import chain crashes SSR.

#### File: src/routes/__root.tsx
ADDED: Dynamic import of initAppKit inside useEffect:
```tsx
useEffect(() => {
  if (typeof window === "undefined") return;
  import("@/lib/web3/config").then(({ initAppKit }) => {
    initAppKit();
  });
}, []);
```
REASON: Dynamic import only executes in browser, never during SSR.

#### File: src/lib/web3/config.ts
KEPT: `initAppKit()` guarded with `typeof window !== "undefined"` check inside function body.

### Secondary Fix: Missing Favicon
`public/` directory had no `favicon.ico` or `favicon.png`.
Browser requests to `/favicon.ico` hit the SSR handler → crash.
FIX: Copied `src/assets/logobanana.jpg` to `public/favicon.ico`.

---

## ENVIRONMENT VARIABLES

Required in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value |
|---|---|
| `VITE_REOWN_PROJECT_ID` | `14a6012ffc42d98b14cc3637e1c3c924` |

Note: Only variables prefixed with `VITE_` are exposed to the client by Vite.

---

## VERIFICATION CHECKLIST

### Local Dev:
- [ ] `npm install --include=optional` completes without errors
- [ ] `node_modules/@rollup/rollup-win32-x64-msvc` directory exists
- [ ] `npm run dev` starts without crash
- [ ] http://localhost:8080 loads (no 500)
- [ ] http://localhost:8080/staking loads (no 500)
- [ ] http://localhost:8080/favicon.ico returns 200

### Production (after deploy):
- [ ] `npm run build` completes without OOM (uses 4GB heap)
- [ ] `.vercel/output/functions/__server.func/index.mjs` exists
- [ ] Root URL returns 200
- [ ] /staking returns 200
- [ ] /favicon.ico returns 200 (not 500)
- [ ] No "h3 swallowed SSR error" in Vercel logs
