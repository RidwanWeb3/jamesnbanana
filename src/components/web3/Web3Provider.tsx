import { WagmiProvider } from "wagmi";
import { useEffect, type ReactNode } from "react";
import { wagmiConfig, initAppKit } from "@/lib/web3/config";

export function Web3Provider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initAppKit();
  }, []);
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}

// Allow <appkit-button /> JSX usage.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "appkit-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        balance?: "show" | "hide";
        size?: "md" | "sm";
      };
      "appkit-network-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "appkit-account-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}