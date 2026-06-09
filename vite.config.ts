// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * SSR stub plugin: replaces Reown AppKit and Lit modules with empty stubs during SSR build.
 *
 * These modules reference HTMLElement, customElements, window, and other browser-only APIs
 * that crash during SSR with: ReferenceError: HTMLElement is not defined
 *
 * During the SSR build phase, all @reown/* and lit/* imports are replaced with empty stubs.
 * During client build and dev, they work normally.
 */
const ssrStubPlugin = (): Plugin => {
  const stubPackages = [
    "@reown/appkit",
    "@reown/appkit/react",
    "@reown/appkit-adapter-wagmi",
    "@reown/appkit-common",
    "@reown/appkit-controllers",
    "@reown/appkit-ui",
    "@reown/appkit-utils",
    "@reown/appkit-wallet",
    "@reown/appkit-scaffold-ui",
    "@reown/appkit-pay",
    "@reown/appkit-polyfills",
    "@walletconnect/core",
    "@walletconnect/utils",
    "@walletconnect/types",
    "@walletconnect/sign-client",
    "@walletconnect/universal-provider",
    "lit",
    "lit-element",
    "lit-html",
    "@lit/reactive-element",
    "@lit-labs/ssr-dom-shim",
  ];

  const stubRegex = new RegExp(
    `^(${stubPackages.map(p => p.replace("/", "[/\\\\]")).join("|")})`
  );

  return {
    name: "ssr-stub-reown",
    enforce: "pre",

    resolveId(id, _importer, options) {
      // Only stub during SSR builds (options.ssr is true when building for server)
      if (options?.ssr && id.match(stubRegex)) {
        return `\0ssr-stub:${id}`;
      }
      return null;
    },

    load(id) {
      if (id.startsWith("\0ssr-stub:")) {
        // Export a Proxy that returns undefined for any property access.
        // This allows `import { WagmiAdapter } from "@reown/..."` to succeed
        // during SSR without actually loading the browser-only code.
        return `
          const noop = new Proxy({}, { get: () => undefined });
          export default noop;
          export const WagmiAdapter = noop;
          export const createAppKit = noop;
          export const __ssr_stub__ = true;
        `;
      }
      return null;
    },
  };
};

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
  plugins: [ssrStubPlugin()],
});
