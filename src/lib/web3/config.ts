// ---------------------------------------------------------------------------
// web3/config.ts — Reown AppKit + Wagmi configuration
//
// SSR SAFETY: This module exports wagmiConfig (safe at module level) and
// initAppKit() (must only run in browser). The initAppKit function is called
// via dynamic import in __root.tsx useEffect, never during SSR.
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
  url: typeof window !== "undefined" ? window.location.origin : "https://jamesbanana.app",
  icons: ["/favicon.ico"],
};

export const wagmiAdapter = new WagmiAdapter({
  networks: [monadMainnet],
  projectId,
  ssr: true,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

let initialized = false;
export function initAppKit() {
  if (initialized || typeof window === "undefined") return;
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
