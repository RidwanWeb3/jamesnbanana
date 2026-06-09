// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Force-enable Nitro with Vercel preset for production SSR.
  nitro: {
    preset: "vercel",
    // Copy public/ files to the static output directory.
    // Without this, favicon.ico and other public assets are not included
    // in the Vercel deployment, causing 500 errors when browsers request them.
    publicAssets: [
      {
        dir: "public",
        baseURL: "/",
      },
    ],
  },
});
