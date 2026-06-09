/**
 * CsrWeb3Provider — Client-Side Rendered Web3 Provider
 *
 * This module is ONLY loaded via dynamic import() in __root.tsx useEffect.
 * It must NEVER be imported at module level during SSR.
 *
 * During SSR, the Vite plugin "ssr-stub-reown" replaces all @reown/* and lit/*
 * modules with empty stubs, preventing HTMLElement references from crashing.
 *
 * In the browser, this module loads normally and provides WagmiProvider.
 */
import { WagmiProvider } from "wagmi";
import { type ReactNode } from "react";
import { wagmiConfig } from "@/lib/web3/config";

export function CsrWeb3Provider({ children }: { children: ReactNode }) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}
