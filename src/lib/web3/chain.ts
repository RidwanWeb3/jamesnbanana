import { defineChain } from "viem";

export const monadMainnet = defineChain({
  id: 143,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Robinhood Chain", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.monad.xyz"] },
    public: { http: ["https://rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "Robinhood Chain Explorer", url: "https://explorer.monad.xyz" },
  },
  iconUrl: "https://cryptologos.cc/logos/robinhood-hood-logo.png",
  testnet: false,
});