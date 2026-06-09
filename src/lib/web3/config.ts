// ---------------------------------------------------------------------------
// web3/config.ts — Reown AppKit + Wagmi configuration
//
// SSR SAFETY: During SSR, the Vite "ssr-stub-reown" plugin replaces all @reown/*
// modules with stubs. The stubs export Proxy objects that return undefined for
// any property access. We guard all browser-only code with typeof window checks
// and optional chaining.
//
// In the browser, this module loads normally and provides the real WagmiAdapter,
// createAppKit, and wagmiConfig.
// ---------------------------------------------------------------------------
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { monadMainnet } from "./chain";

export const projectId =
  (import.meta.env.VITE_REOWN_PROJECT_ID as string | undefined) ||
  "b56e18d47c72ab683b10814fe9495694";

const metadata = {
  name: "James Banana — Banana Vault",
  description: "Stake MON on Monad. Power the James Banana ecosystem.",
  url: typeof window !== "undefined" ? window.location.origin : "https://bananastaking.vercel.app",
  icons: ["/favicon.ico"],
};

// SSR-SAFE: During SSR, WagmiAdapter is a Proxy stub (not a real class).
// The typeof window guard prevents instantiation during SSR.
// The instanceof check ensures we only call the real constructor in the browser.
const wagmiAdapter =
  typeof window !== "undefined" && WagmiAdapter && typeof (WagmiAdapter as any) === "function" && (WagmiAdapter as any).prototype
    ? new (WagmiAdapter as any)({
        networks: [monadMainnet],
        projectId,
        ssr: true,
      })
    : null;

// SSR-SAFE: wagmiConfig is undefined during SSR (wagmiAdapter is null).
// It's only used in the browser via CsrWeb3Provider.
export const wagmiConfig: any = wagmiAdapter?.wagmiConfig;

let initialized = false;
export function initAppKit() {
  if (initialized || typeof window === "undefined" || !wagmiAdapter || !createAppKit) return;
  initialized = true;
  createAppKit({
    adapters: [wagmiAdapter],
    networks: [monadMainnet],
    defaultNetwork: monadMainnet,
    projectId,
    metadata,
    features: { analytics: false, email: false, socials: false },
    themeMode: "light",
    themeVariables: {
      "--w3m-accent": "#FFD54A",
      "--w3m-border-radius-master": "4px",
      "--w3m-font-family": "Fredoka, Nunito, system-ui, sans-serif",
    },
  });
}
