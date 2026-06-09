import { createConfig, http } from "wagmi";
import { monadMainnet } from "./chain";

// SSR-SAFE wagmi config: no wallet connectors, no Reown AppKit.
// This config is used during SSR so that wagmi hooks don't throw.
// It only includes the chain definition and a public transport.
// In the browser, the real config from config.ts (with Reown AppKit) is used instead.
export const ssrWagmiConfig = createConfig({
  chains: [monadMainnet],
  transports: {
    [monadMainnet.id]: http("https://rpc.monad.xyz"),
  },
  // No connectors — wallet connection is client-only
  ssr: true,
});
