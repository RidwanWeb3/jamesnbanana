# SSR Crash Analysis — HTMLElement is not defined

## Root Cause

The Nitro SSR bundle was including the entire Reown AppKit module tree because
`Web3Provider.tsx` imported `wagmiConfig` from `@/lib/web3/config` at module level.

### Crash Chain

1. `__root.tsx` imports `Web3Provider` from `@/components/web3/Web3Provider`
2. `Web3Provider.tsx` imports `wagmiConfig` from `@/lib/web3/config` (line 3)
3. `config.ts` calls `new WagmiAdapter({...})` at module level (line 23)
4. `WagmiAdapter` imports from `@reown/appkit-adapter-wagmi`
5. `@reown/appkit-adapter-wagmi` imports from `@reown/appkit-controllers`
6. `@reown/appkit-controllers` imports Lit/Web Component libraries
7. Lit libraries reference `HTMLElement` at module initialization
8. During SSR, `HTMLElement` is not defined → **ReferenceError crash**

### Evidence from Nitro Build Output

In `.vercel/output/functions/__ssr/router-BJ_-sovV.mjs`:
```
Line 6:  import { c as createAppKit } from "../_libs/reown__appkit.mjs";
Line 8:  import { W as WagmiAdapter } from "../_libs/reown__appkit-adapter-wagmi.mjs";
Line 213: const wagmiAdapter = new WagmiAdapter({...});
Line 223: createAppKit({...});
```

These were being called at MODULE SCOPE in the SSR bundle, causing the crash
before any page could render.

## Fix Applied

### 1. `src/components/web3/Web3Provider.tsx`
**BEFORE**: Imported `wagmiConfig` from `@/lib/web3/config` at module level.
**AFTER**: Does NOT import anything from `@/lib/web3/config`. Just passes children through.

### 2. `src/routes/__root.tsx`
**BEFORE**: Imported `Web3Provider` at module level, wrapped entire app.
**AFTER**: Uses `useState` + `useEffect` to dynamically import BOTH `Web3Provider` AND
`initAppKit` ONLY in the browser after mount. During SSR, children render without
any Web3 provider.

### 3. `src/lib/web3/config.ts`
**BEFORE**: `new WagmiAdapter({...})` called unconditionally at module level.
**AFTER**: Wrapped with `typeof window !== "undefined"` guard for defense-in-depth.

## Result

After the fix, the Nitro SSR bundle should NOT contain:
- `createAppKit`
- `WagmiAdapter`
- Any `@reown/*` modules
- Any Lit/Web Component code

The entire Reown AppKit tree is now ONLY loaded in the browser via dynamic import
after the initial SSR render completes.
