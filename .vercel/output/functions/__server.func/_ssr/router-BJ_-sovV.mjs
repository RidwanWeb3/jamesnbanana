import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as createAppKit } from "../_libs/reown__appkit.mjs";
import { W as WagmiProvider, u as useConnection, a as useChainId, b as useSwitchChain, c as useBalance, d as useReadContracts, e as useWriteContract, f as useWaitForTransactionReceipt, g as useReadContract } from "../_libs/wagmi.mjs";
import { W as WagmiAdapter } from "../_libs/reown__appkit-adapter-wagmi.mjs";
import { ay as parseEther, az as formatEther, X as defineChain } from "../_libs/viem.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/@walletconnect/universal-provider+[...].mjs";
import "../_libs/walletconnect__sign-client.mjs";
import "events";
import "../_libs/@walletconnect/core.mjs";
import "../_libs/walletconnect__heartbeat.mjs";
import "../_libs/walletconnect__time.mjs";
import "../_libs/tslib.mjs";
import "../_libs/walletconnect__events.mjs";
import "../_libs/walletconnect__keyvaluestorage.mjs";
import "../_libs/unstorage.mjs";
import "../_libs/destr.mjs";
import "../_libs/idb-keyval.mjs";
import "../_libs/walletconnect__safe-json.mjs";
import "../_libs/walletconnect__logger.mjs";
import "../_libs/walletconnect__types.mjs";
import "../_libs/walletconnect__relay-auth.mjs";
import "../_libs/walletconnect__utils.mjs";
import "../_libs/detect-browser.mjs";
import "../_libs/walletconnect__window-getters.mjs";
import "../_libs/walletconnect__window-metadata.mjs";
import "../_libs/ox.mjs";
import "../_libs/abitype.mjs";
import "../_libs/zod.mjs";
import "../_libs/@noble/hashes.mjs";
import "node:crypto";
import "../_libs/noble__curves.mjs";
import "../_libs/adraffy__ens-normalize.mjs";
import "../_libs/scure__bip32.mjs";
import "../_libs/scure__base.mjs";
import "../_libs/noble__ciphers.mjs";
import "../_libs/scure__bip39.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/msgpack__msgpack.mjs";
import "../_libs/uint8arrays.mjs";
import "../_libs/multiformats.mjs";
import "../_libs/walletconnect__relay-api.mjs";
import "../_libs/blakejs.mjs";
import "../_libs/@walletconnect/jsonrpc-provider+[...].mjs";
import "../_libs/walletconnect__environment.mjs";
import "../_libs/walletconnect__jsonrpc-utils.mjs";
import "../_libs/walletconnect__jsonrpc-types.mjs";
import "../_libs/@walletconnect/jsonrpc-ws-connection+[...].mjs";
import "../_libs/@walletconnect/jsonrpc-http-connection+[...].mjs";
import "../_libs/cross-fetch.mjs";
import "../_libs/node-fetch.mjs";
import "http";
import "url";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "punycode";
import "../_libs/tr46.mjs";
import "https";
import "zlib";
import "../_libs/reown__appkit-ui.mjs";
import "../_libs/reown__appkit-common.mjs";
import "../_libs/dayjs.mjs";
import "../_libs/big.js.mjs";
import "../_libs/lit__reactive-element.mjs";
import "../_libs/lit-labs__ssr-dom-shim.mjs";
import "../_libs/lit-html.mjs";
import "../_libs/lit-element.mjs";
import "../_libs/qrcode.mjs";
import "fs";
import "../_libs/encode-utf8.mjs";
import "../_libs/dijkstrajs.mjs";
import "../_libs/pngjs.mjs";
import "assert";
import "buffer";
import "../_libs/reown__appkit-controllers.mjs";
import "../_libs/valtio.mjs";
import "../_libs/proxy-compare.mjs";
import "../_libs/reown__appkit-wallet.mjs";
import "../_libs/bs58.mjs";
import "../_libs/base-x.mjs";
import "../_libs/reown__appkit-utils.mjs";
import "../_libs/lit__react.mjs";
import "../_libs/reown__appkit-scaffold-ui.mjs";
import "../_libs/reown__appkit-pay.mjs";
import "../_libs/isows.mjs";
import "net";
import "tls";
import "path";
import "os";
import "../_libs/ws.mjs";
import "../_libs/bufferutil.mjs";
import "../_libs/node-gyp-build.mjs";
import "../_libs/utf-8-validate.mjs";
import "../_libs/wagmi__core.mjs";
import "../_libs/zustand.mjs";
import "../_libs/mipd.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-OIly2FAW.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const logo = "/assets/logobanana-B19BPfIB.jpg";
const links = [
  { href: "/#about", label: "About" },
  { href: "/#studio", label: "Studio" },
  { href: "/#tv", label: "Banana TV" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/#community", label: "Community" }
];
function Navbar() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 px-3 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl rounded-3xl border-2 border-[color:var(--banana)]/40 bg-white/85 backdrop-blur-md shadow-cute", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "James Banana", className: "h-10 w-10 rounded-full ring-banana group-hover:animate-wobble" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-extrabold tracking-tight", children: [
          "James ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--orange-accent)]", children: "Banana" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-1", children: [
        links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "px-3 py-2 rounded-full text-sm font-bold text-foreground/80 hover:bg-[color:var(--banana-light)] hover:text-foreground transition", children: l.label }, l.href)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/staking", className: "ml-2 px-4 py-2 rounded-full bg-banana-gradient text-foreground font-extrabold shadow-cute border-2 border-white hover:scale-105 transition", children: "🍌 Staking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("appkit-button", { balance: "hide", size: "sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "md:hidden rounded-full bg-[color:var(--banana)] p-2 shadow-cute", "aria-label": "menu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-0.5 w-5 bg-foreground mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-0.5 w-5 bg-foreground mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-0.5 w-5 bg-foreground" })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden px-4 pb-4 flex flex-col gap-2", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, onClick: () => setOpen(false), className: "px-3 py-2 rounded-2xl bg-[color:var(--banana-cream)] font-bold", children: l.label }, l.href)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/staking", onClick: () => setOpen(false), className: "px-3 py-2 rounded-2xl bg-banana-gradient font-extrabold text-center", children: "🍌 Staking" })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-20 px-3 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl rounded-3xl bg-banana-gradient p-8 shadow-cute border-2 border-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -bottom-10 text-[160px] opacity-20 select-none", children: "🍌" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col md:flex-row items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "James Banana", className: "h-14 w-14 rounded-full ring-banana" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-extrabold", children: "James Banana" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold opacity-80", children: "$JAMES · Monad Mainnet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://x.com/jamescatbanana", target: "_blank", rel: "noreferrer", className: "rounded-full bg-white px-4 py-2 shadow-cute hover:scale-105 transition", children: "🐦 @jamescatbanana" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/staking", className: "rounded-full bg-foreground text-[color:var(--banana)] px-4 py-2 shadow-cute hover:scale-105 transition", children: "🍌 Vault" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6 text-center text-xs font-bold opacity-70", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " James Banana. Forgotten fruit. Eternal meme."
    ] })
  ] }) });
}
const monadMainnet = defineChain({
  id: 143,
  name: "Monad",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.monad.xyz"] },
    public: { http: ["https://rpc.monad.xyz"] }
  },
  blockExplorers: {
    default: { name: "Monad Explorer", url: "https://explorer.monad.xyz" }
  },
  testnet: false
});
const projectId = "b56e18d47c72ab683b10814fe9495694";
const metadata = {
  name: "James Banana — Banana Vault",
  description: "Stake MON on Monad. Power the James Banana ecosystem.",
  url: typeof window !== "undefined" ? window.location.origin : "https://jamesbanana.app",
  icons: ["/favicon.ico"]
};
const wagmiAdapter = new WagmiAdapter({
  networks: [monadMainnet],
  projectId,
  ssr: true
});
const wagmiConfig = wagmiAdapter.wagmiConfig;
let initialized = false;
function initAppKit() {
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
      "--w3m-font-family": "Fredoka, Nunito, system-ui, sans-serif"
    }
  });
}
function Web3Provider({ children }) {
  reactExports.useEffect(() => {
    initAppKit();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WagmiProvider, { config: wagmiConfig, children });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$3 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JAMES BANANA | AI Meme Video Generator On Monad" },
      { name: "description", content: "Create hilarious AI-generated meme videos with James Banana and stake on Monad." },
      { name: "author", content: "James Banana" },
      { name: "theme-color", content: "#FFD54A" },
      { property: "og:title", content: "JAMES BANANA | AI Meme Video Generator On Monad" },
      { property: "og:description", content: "Create hilarious AI-generated meme videos with James Banana and stake on Monad." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logo },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@jamescatbanana" },
      { name: "twitter:image", content: logo }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: logo },
      { rel: "apple-touch-icon", href: logo },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$3.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Web3Provider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center", toastOptions: { style: { borderRadius: 18, fontWeight: 700 } } })
  ] }) });
}
const items = ["🍌", "✨", "🍌", "⭐", "🍌", "💛", "🍌"];
function FloatingBananas({ count = 14 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 overflow-hidden", children: Array.from({ length: count }).map((_, i) => {
    const left = i * 97 % 100;
    const top = i * 53 % 100;
    const delay = i % 7 * 0.4;
    const size = 18 + i * 13 % 28;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        initial: { y: 0, rotate: 0, opacity: 0 },
        animate: { y: [0, -20, 0], rotate: [0, 15, -10, 0], opacity: [0, 1, 1, 0.8] },
        transition: { duration: 6 + i % 4, repeat: Infinity, delay, ease: "easeInOut" },
        className: "absolute select-none",
        style: { left: `${left}%`, top: `${top}%`, fontSize: size },
        children: items[i % items.length]
      },
      i
    );
  }) });
}
function Counter({ to, suffix = "" }) {
  const [n, setN] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    n.toLocaleString(),
    suffix
  ] });
}
const STAKING_CONTRACT_ADDRESS = "0xbb8A0CDeED62D2633E03eCF14c40B0e6d18d29c7";
const JAMES_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";
const hasContracts = () => STAKING_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";
const BANANA_LITE_POOL = 0;
const BANANA_PLUS_POOL = 1;
const vaultAbi = [
  // ---- Read: Protocol-level ----
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  },
  {
    type: "function",
    name: "rewardToken",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  },
  {
    type: "function",
    name: "vaultWallet",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  },
  {
    type: "function",
    name: "emergencyMode",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    type: "function",
    name: "rewardMultiplier",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "activeStakeCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "totalProtocolPendingRewards",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "vaultCoverage",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "protocolHealth",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "protocolSummary",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "totalUsers", type: "uint256" },
      { name: "activeStakes", type: "uint256" },
      { name: "totalMonStaked", type: "uint256" },
      { name: "rewardsReserved", type: "uint256" },
      { name: "rewardsDistributed", type: "uint256" },
      { name: "burnedPenalty", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "getDashboardStats",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "totalActiveStakes", type: "uint256" },
      { name: "totalUsers", type: "uint256" },
      { name: "totalStakedMON", type: "uint256" },
      { name: "totalRewardsReserved", type: "uint256" },
      { name: "totalRewardsDistributed", type: "uint256" },
      { name: "totalBurnedPenalty", type: "uint256" },
      { name: "vaultBalance", type: "uint256" },
      { name: "vaultAllowance", type: "uint256" },
      { name: "vaultCoverage", type: "uint256" },
      { name: "emergencyMode", type: "bool" },
      { name: "paused", type: "bool" },
      { name: "rewardMultiplier", type: "uint256" },
      { name: "minHolding", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "vaultStatus",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "vaultBalance", type: "uint256" },
      { name: "vaultAllowance", type: "uint256" },
      { name: "reservedRewards", type: "uint256" },
      { name: "coverage", type: "uint256" },
      { name: "healthy", type: "bool" }
    ]
  },
  // ---- Read: User-level ----
  {
    type: "function",
    name: "getUserDashboard",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "monBalance", type: "uint256" },
      { name: "jamesBalance", type: "uint256" },
      { name: "currentTier", type: "uint8" },
      { name: "currentBonus", type: "uint16" },
      { name: "activeStakeCount", type: "uint256" },
      { name: "pendingRewards", type: "uint256" },
      { name: "totalStaked", type: "uint256" },
      { name: "rewardsEarned", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "getUserActiveStakes",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "stakeId", type: "uint256" },
          { name: "amount", type: "uint256" },
          { name: "reward", type: "uint256" },
          { name: "poolId", type: "uint8" },
          { name: "tier", type: "uint8" },
          { name: "startTime", type: "uint40" },
          { name: "unlockTime", type: "uint40" },
          { name: "status", type: "uint8" }
        ]
      }
    ]
  },
  {
    type: "function",
    name: "getStake",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "stakeId", type: "uint256" }
    ],
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "reward", type: "uint256" },
      { name: "startTime", type: "uint40" },
      { name: "unlockTime", type: "uint40" },
      { name: "holderTier", type: "uint8" },
      { name: "claimed", type: "bool" }
    ]
  },
  {
    type: "function",
    name: "activeStakeIds",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256[]" }]
  },
  {
    type: "function",
    name: "pendingReward",
    stateMutability: "view",
    inputs: [{ name: "stakeId", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "requiredBurnAmount",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "stakeId", type: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "calculateReward",
    stateMutability: "view",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "poolId", type: "uint8" }
    ],
    outputs: [
      { name: "baseReward", type: "uint256" },
      { name: "tierBonus", type: "uint256" },
      { name: "finalReward", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "isEligibleForStaking",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "eligible", type: "bool" },
      { name: "requiredHolding", type: "uint256" },
      { name: "currentBalance", type: "uint256" },
      { name: "reason", type: "string" }
    ]
  },
  // ---- Legacy aliases kept for backward-compat ----
  {
    type: "function",
    name: "previewReward",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "poolId", type: "uint8" }
    ],
    outputs: [
      { name: "base", type: "uint256" },
      { name: "bonus", type: "uint256" },
      { name: "total", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "tierOf",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint8" }]
  },
  {
    type: "function",
    name: "bonusOf",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint16" }]
  },
  {
    type: "function",
    name: "coverage",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint16" }]
  },
  {
    type: "function",
    name: "totalStaked",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "rewardsReserved",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "distributed",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "activeStakes",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  // ---- Write ----
  {
    type: "function",
    name: "stake",
    stateMutability: "payable",
    inputs: [{ name: "poolId", type: "uint8" }],
    outputs: []
  },
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [{ name: "stakeId", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    name: "earlyClaim",
    stateMutability: "nonpayable",
    inputs: [{ name: "stakeId", type: "uint256" }],
    outputs: []
  },
  // ---- Events ----
  {
    type: "event",
    name: "Staked",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "stakeId", type: "uint256", indexed: true },
      { name: "poolId", type: "uint8", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "Claimed",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "stakeId", type: "uint256", indexed: true },
      { name: "reward", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "EmergencyModeToggled",
    inputs: [{ name: "enabled", type: "bool", indexed: false }]
  }
];
const erc20Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }]
  }
];
const POOLS = [
  { id: 0, name: "Banana Lite", days: 7, apy: 30, emoji: "🍌" },
  { id: 1, name: "Banana Plus", days: 15, apy: 75, emoji: "🍌🍌" },
  { id: 2, name: "Banana Diamond", days: 30, apy: 180, emoji: "👑🍌" }
];
const Route$2 = createFileRoute("/staking")({
  head: () => ({
    meta: [
      { title: "Banana Vault | Stake $JAMES on Monad" },
      {
        name: "description",
        content: "Put your bananas to work. Stake MON and unlock rewards while powering the James Banana ecosystem."
      },
      { property: "og:title", content: "Banana Vault | James Banana Staking" },
      {
        property: "og:description",
        content: "Stake MON. Earn bananas. Power the meme machine."
      },
      { property: "og:image", content: logo }
    ],
    links: [{ rel: "canonical", href: "/staking" }]
  }),
  component: Staking
});
function zeroAddress() {
  return "0x0000000000000000000000000000000000000000";
}
function tierInfo(idx) {
  const t = [
    { name: "Bronze", emoji: "🍌", bonus: 0 },
    { name: "Silver", emoji: "🍌🍌", bonus: 10 },
    { name: "Gold", emoji: "🍌🍌🍌", bonus: 25 },
    { name: "Diamond", emoji: "👑🍌", bonus: 50 }
  ];
  return t[Math.min(idx, 3)];
}
function statusLabel(s) {
  return s === 0 ? "Active" : s === 1 ? "Claimed" : "Burned";
}
function useCountdown(unlockTimeSec) {
  const [now, setNow] = reactExports.useState(() => Math.floor(Date.now() / 1e3));
  reactExports.useEffect(() => {
    if (unlockTimeSec <= now) return;
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1e3)), 1e3);
    return () => clearInterval(id);
  }, [unlockTimeSec, now]);
  const remaining = Math.max(0, unlockTimeSec - now);
  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor(remaining % 86400 / 3600),
    minutes: Math.floor(remaining % 3600 / 60),
    seconds: remaining % 60,
    isUnlocked: remaining <= 0
  };
}
function Staking() {
  const { address, isConnected } = useConnection();
  const chainId = useChainId();
  const { switchChain, isPending: switching } = useSwitchChain();
  const wrongNetwork = isConnected && chainId !== monadMainnet.id;
  const userAddr = address ?? zeroAddress();
  const live = hasContracts();
  const [pool, setPool] = reactExports.useState(POOLS[1]);
  const [amount, setAmount] = reactExports.useState("10");
  const [burnOpen, setBurnOpen] = reactExports.useState(null);
  const amt = parseFloat(amount) || 0;
  const amtWei = reactExports.useMemo(() => {
    try {
      return parseEther((amt || 0).toString());
    } catch {
      return 0n;
    }
  }, [amt]);
  const { data: nativeBal } = useBalance({
    address,
    chainId: monadMainnet.id,
    query: { enabled: !!address, refetchInterval: 12e3 }
  });
  const reads = useReadContracts({
    allowFailure: true,
    contracts: [
      // 0: emergencyMode
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "emergencyMode" },
      // 1: rewardMultiplier
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "rewardMultiplier" },
      // 2: activeStakeCount
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "activeStakeCount" },
      // 3: totalProtocolPendingRewards
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "totalProtocolPendingRewards" },
      // 4: vaultCoverage
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "vaultCoverage" },
      // 5: protocolHealth
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "protocolHealth" },
      // 6: protocolSummary
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "protocolSummary" },
      // 7: getDashboardStats
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "getDashboardStats" },
      // 8: vaultStatus
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "vaultStatus" },
      // 9: getUserDashboard
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "getUserDashboard", args: [userAddr] },
      // 10: isEligibleForStaking
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "isEligibleForStaking", args: [userAddr] },
      // 11: calculateReward
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "calculateReward", args: [amtWei, pool.id] },
      // 12: getUserActiveStakes
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "getUserActiveStakes", args: [userAddr] },
      // 13: JAMES balanceOf
      { address: JAMES_TOKEN_ADDRESS, abi: erc20Abi, functionName: "balanceOf", args: [userAddr] },
      // 14: vaultWallet
      { address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "vaultWallet" }
    ],
    query: { enabled: live, refetchInterval: 15e3 }
  });
  const r = reads.data;
  const emergencyMode = r?.[0]?.result ?? false;
  r?.[1]?.result ?? 100n;
  r?.[2]?.result ?? 0n;
  r?.[3]?.result ?? 0n;
  const vaultCoverageRaw = r?.[4]?.result ?? 0n;
  const protocolHealthRaw = r?.[5]?.result ?? 0n;
  const psRaw = r?.[6]?.result ?? void 0;
  psRaw?.[0] ?? 0n;
  psRaw?.[1] ?? 0n;
  const psTotalMonStaked = psRaw?.[2] ?? 0n;
  const psRewardsReserved = psRaw?.[3] ?? 0n;
  psRaw?.[4] ?? 0n;
  psRaw?.[5] ?? 0n;
  const dsRaw = r?.[7]?.result ?? void 0;
  const dsTotalActiveStakes = dsRaw?.[0] ?? 0n;
  const dsTotalUsers = dsRaw?.[1] ?? 0n;
  const dsTotalStakedMON = dsRaw?.[2] ?? 0n;
  const dsTotalRewardsReserved = dsRaw?.[3] ?? 0n;
  const dsTotalRewardsDistributed = dsRaw?.[4] ?? 0n;
  const dsTotalBurnedPenalty = dsRaw?.[5] ?? 0n;
  const dsVaultBalance = dsRaw?.[6] ?? 0n;
  const dsVaultAllowance = dsRaw?.[7] ?? 0n;
  dsRaw?.[8] ?? 0n;
  const dsEmergencyMode = dsRaw?.[9] ?? false;
  const dsPaused = dsRaw?.[10] ?? false;
  const dsRewardMultiplier = dsRaw?.[11] ?? 100n;
  const dsMinHolding = dsRaw?.[12] ?? 0n;
  const vsRaw = r?.[8]?.result ?? void 0;
  const vsVaultBalance = vsRaw?.[0] ?? dsVaultBalance;
  const vsVaultAllowance = vsRaw?.[1] ?? dsVaultAllowance;
  const vsReservedRewards = vsRaw?.[2] ?? psRewardsReserved;
  const vsCoverage = vsRaw?.[3] ?? vaultCoverageRaw;
  const vsHealthy = vsRaw?.[4] ?? true;
  const udRaw = r?.[9]?.result ?? void 0;
  const userMonBalance = udRaw?.[0] ?? 0n;
  const userJamesBalance = udRaw?.[1] ?? 0n;
  const userTier = Number(udRaw?.[2] ?? 0n);
  Number(udRaw?.[3] ?? 0n);
  const userStakeCount = udRaw?.[4] ?? 0n;
  const userPendingRewards = udRaw?.[5] ?? 0n;
  const userTotalStaked = udRaw?.[6] ?? 0n;
  const userRewardsEarned = udRaw?.[7] ?? 0n;
  const elRaw = r?.[10]?.result ?? void 0;
  const eligible = elRaw?.[0] ?? true;
  const requiredHolding = elRaw?.[1] ?? 0n;
  const currentHolding = elRaw?.[2] ?? 0n;
  const eligibilityReason = elRaw?.[3] ?? "";
  const crRaw = r?.[11]?.result ?? void 0;
  const crBase = crRaw && live && amt > 0 ? crRaw[0] : null;
  const crBonus = crRaw && live && amt > 0 ? crRaw[1] : null;
  const crFinal = crRaw && live && amt > 0 ? crRaw[2] : null;
  const rawStakes = r?.[12]?.result ?? void 0;
  const userActiveStakes = reactExports.useMemo(() => {
    if (!rawStakes || !live) return [];
    return rawStakes.map((s) => {
      const t = s;
      return { stakeId: t[0], amount: t[1], reward: t[2], poolId: t[3], tier: t[4], startTime: t[5], unlockTime: t[6], status: t[7] };
    });
  }, [rawStakes, live]);
  const jamesBal = r?.[13]?.result ?? userJamesBalance;
  const vaultWallet = r?.[14]?.result ?? zeroAddress();
  const tier = tierInfo(userTier);
  const coverage = Number(vsCoverage) / 100;
  const protocolHealth = Number(protocolHealthRaw) / 100;
  const baseRewardDisplay = crBase !== null && live ? Number(formatEther(crBase)).toFixed(4) : amt > 0 ? (amt * pool.apy * pool.days / 365 / 100).toFixed(4) : "0.0000";
  const bonusRewardDisplay = crBonus !== null && live ? Number(formatEther(crBonus)).toFixed(4) : amt > 0 ? (amt * pool.apy * pool.days / 365 / 100 * (tier.bonus / 100)).toFixed(4) : "0.0000";
  const finalRewardDisplay = crFinal !== null && live ? Number(formatEther(crFinal)).toFixed(4) : amt > 0 ? (amt * pool.apy * pool.days / 365 / 100 * (1 + tier.bonus / 100)).toFixed(4) : "0.0000";
  const { writeContract, data: txHash, isPending: writing, reset: resetWrite } = useWriteContract();
  const { isLoading: confirming, isSuccess: confirmed } = useWaitForTransactionReceipt({ hash: txHash });
  reactExports.useEffect(() => {
    if (confirmed) {
      toast.success("Transaction confirmed");
      reads.refetch();
      resetWrite();
    }
  }, [confirmed]);
  function doSwitch() {
    switchChain({ chainId: monadMainnet.id });
  }
  const stake = reactExports.useCallback(() => {
    if (!isConnected) return toast.error("Connect wallet first");
    if (wrongNetwork) return toast.error("Switch to Monad Mainnet");
    if (amt <= 0) return toast.error("Enter an amount");
    if (emergencyMode || dsEmergencyMode) return toast.error("Emergency mode active — staking disabled");
    if (dsPaused) return toast.error("Contract paused — staking disabled");
    if (!eligible) return toast.error(`Not eligible: ${eligibilityReason}`);
    toast("Confirm the transaction in your wallet…");
    writeContract({ address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "stake", args: [pool.id], value: amtWei, chainId: monadMainnet.id });
  }, [isConnected, wrongNetwork, amt, live, emergencyMode, dsEmergencyMode, dsPaused, eligible, eligibilityReason, pool.id, amtWei, writeContract]);
  const claim = reactExports.useCallback((stakeId, isEarly) => {
    setBurnOpen(null);
    if (isEarly) {
      toast("Confirm early claim in your wallet…");
      writeContract({ address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "earlyClaim", args: [stakeId], chainId: monadMainnet.id });
    } else {
      toast("Confirm claim in your wallet…");
      writeContract({ address: STAKING_CONTRACT_ADDRESS, abi: vaultAbi, functionName: "claim", args: [stakeId], chainId: monadMainnet.id });
    }
  }, [live, writeContract]);
  const addressShort = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Not connected";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative mx-auto max-w-7xl px-4 pt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[36px] bg-banana-gradient p-8 md:p-12 shadow-pop border-4 border-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingBananas, { count: 14 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-white px-3 py-1 text-xs font-extrabold", children: "STAKING DAPP · MONAD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl md:text-7xl font-extrabold", children: "Banana Vault" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl md:text-2xl font-extrabold", children: "Put Your Bananas To Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-lg text-base md:text-lg font-semibold text-foreground/80", children: "Stake MON and unlock rewards while helping power the James Banana ecosystem." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("appkit-button", { label: "Connect Wallet", balance: "hide" }),
            isConnected && /* @__PURE__ */ jsxRuntimeExports.jsx("appkit-network-button", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#pools", className: "rounded-full bg-white px-6 py-3 font-extrabold shadow-cute border-2 border-foreground hover:scale-105 transition", children: "View Pools" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { animate: { rotate: [0, 5, -5, 0] }, transition: { duration: 6, repeat: Infinity }, className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-[40px] bg-white blur-2xl opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[40px] bg-white border-4 border-foreground shadow-pop p-6 w-72", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-xs font-extrabold opacity-70", children: "BANANA VAULT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: logo, alt: "vault", className: "mx-auto mt-2 h-32 w-32 rounded-full ring-banana", animate: { y: [0, -10, 0] }, transition: { duration: 3, repeat: Infinity } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-center font-extrabold text-2xl", children: `${Math.round(Number(formatEther(psTotalMonStaked))).toLocaleString()} MON` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-xs font-bold opacity-70", children: "staked across protocol" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex justify-around text-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: { y: [0, -6, 0] }, transition: { duration: 1.6, repeat: Infinity }, children: "🪙" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: { y: [0, -6, 0] }, transition: { duration: 1.6, repeat: Infinity, delay: 0.2 }, children: "🍌" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: { y: [0, -6, 0] }, transition: { duration: 1.6, repeat: Infinity, delay: 0.4 }, children: "🪙" })
            ] })
          ] })
        ] }) })
      ] })
    ] }) }),
    (emergencyMode || dsEmergencyMode || dsPaused) && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border-4 border-red-500 bg-red-50 p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-cute", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: dsPaused ? "Contract Paused — All operations temporarily disabled." : "Emergency Mode Active — New staking disabled. Claims remain available." }) }) }),
    wrongNetwork && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-4 border-[color:var(--orange-accent)] bg-[color:var(--banana-cream)] p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-cute", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: "Please switch to Monad Mainnet to use the vault." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: doSwitch, disabled: switching, className: "rounded-full bg-foreground text-[color:var(--banana)] px-5 py-2 font-extrabold shadow-cute disabled:opacity-60", children: switching ? "Switching…" : "Switch Network" })
    ] }) }),
    isConnected && !eligible && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-4 border-yellow-500 bg-yellow-50 p-5 shadow-cute", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: "Not Eligible for Staking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold mt-1", children: eligibilityReason }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold mt-2", children: [
        "Required: ",
        Number(formatEther(requiredHolding)).toLocaleString(),
        " $JAMES · Your Balance: ",
        Number(formatEther(currentHolding)).toLocaleString(),
        " $JAMES"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 mt-10 grid lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] bg-white border-2 border-[color:var(--banana)] p-6 shadow-cute", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, className: "h-12 w-12 rounded-full ring-banana", alt: "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-extrabold opacity-70", children: "CONNECTED WALLET" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: addressShort })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "MON", value: isConnected && live ? Number(formatEther(userMonBalance || nativeBal?.value || 0n)).toFixed(4) : "—", emoji: "🟣" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "$JAMES", value: isConnected && live ? Number(formatEther(jamesBal)).toLocaleString() : "—", emoji: "🍌" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Tier", value: `${tier.emoji} ${tier.name}`, emoji: "🏅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Bonus", value: `+${tier.bonus}%`, emoji: "✨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "My Stakes", value: isConnected && live ? Number(userStakeCount).toString() : "—", emoji: "🎫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Pending", value: isConnected && live ? Number(formatEther(userPendingRewards)).toFixed(4) : "—", emoji: "🪙" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Total Staked", value: isConnected && live ? Number(formatEther(userTotalStaked)).toFixed(4) : "—", emoji: "🔒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Earned", value: isConnected && live ? Number(formatEther(userRewardsEarned)).toFixed(4) : "—", emoji: "🎉" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-[28px] bg-banana-gradient p-6 shadow-cute border-2 border-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-2xl", children: "Protocol Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 md:grid-cols-4 gap-3", children: [
          { l: "Total Users", v: Number(dsTotalUsers), s: "" },
          { l: "Active Stakes", v: Number(dsTotalActiveStakes), s: "" },
          { l: "MON Staked", v: Math.round(Number(formatEther(dsTotalStakedMON))), s: "" },
          { l: "Rewards Reserved", v: Math.round(Number(formatEther(dsTotalRewardsReserved))), s: "" },
          { l: "Rewards Distributed", v: Math.round(Number(formatEther(dsTotalRewardsDistributed))), s: "" },
          { l: "Burned Penalty", v: Math.round(Number(formatEther(dsTotalBurnedPenalty))), s: "" },
          { l: "Coverage", v: Math.round(coverage), s: "%" },
          { l: "Health", v: Math.round(protocolHealth), s: "%" }
        ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white/90 p-3 text-center shadow-cute", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold opacity-60", children: m.l }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-extrabold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: m.v, suffix: m.s }) })
        ] }, m.l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] bg-white border-2 border-[color:var(--banana)] p-6 shadow-cute", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-2xl", children: "Advanced Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Min Holding", value: `${Number(formatEther(dsMinHolding)).toLocaleString()} $JAMES`, emoji: "📋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Reward Multiplier", value: `${Number(dsRewardMultiplier) / 100}x`, emoji: "⚡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Emergency", value: dsEmergencyMode ? "ON" : "Off", emoji: dsEmergencyMode ? "🔴" : "🟢" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Paused", value: dsPaused ? "Yes" : "No", emoji: dsPaused ? "⛔" : "🟢" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Vault Balance", value: `${Number(formatEther(dsVaultBalance)).toFixed(2)} MON`, emoji: "🏦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Vault Allowance", value: `${Number(formatEther(dsVaultAllowance)).toFixed(2)} MON`, emoji: "✅" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] bg-white border-2 border-[color:var(--banana)] p-6 shadow-cute", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-2xl", children: "Vault Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 md:grid-cols-5 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Vault", value: vaultWallet.slice(0, 6) + "…" + vaultWallet.slice(-4), emoji: "🏦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Balance", value: `${Number(formatEther(vsVaultBalance)).toFixed(2)} MON`, emoji: "💰" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Allowance", value: `${Number(formatEther(vsVaultAllowance)).toFixed(2)} MON`, emoji: "✅" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Reserved", value: `${Number(formatEther(vsReservedRewards)).toFixed(2)} MON`, emoji: "🔒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Healthy", value: vsHealthy ? "Yes" : "No", emoji: vsHealthy ? "💚" : "🔴" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-center", children: "Tier System" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        { n: "Bronze", e: "🍌", b: 0 },
        { n: "Silver", e: "🍌🍌", b: 10 },
        { n: "Gold", e: "🍌🍌🍌", b: 25 },
        { n: "Diamond", e: "👑🍌", b: 50 }
      ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          whileHover: { y: -6, rotate: -1 },
          className: `rounded-[24px] p-5 border-2 border-white shadow-cute text-center ${tier.name === t.n ? "bg-banana-gradient ring-banana" : "bg-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: t.e }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-extrabold text-xl", children: t.n }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold opacity-70", children: [
              "+",
              t.b,
              "% rewards bonus"
            ] }),
            tier.name === t.n && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs font-extrabold", children: "YOUR TIER" })
          ]
        },
        t.n
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "pools", className: "mx-auto max-w-7xl px-4 mt-12 grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-extrabold", children: "Staking Pools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground/70 mt-1", children: "Pick your banana adventure." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-4", children: POOLS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            whileHover: { scale: 1.01 },
            onClick: () => setPool(p),
            disabled: emergencyMode || dsEmergencyMode || dsPaused,
            className: `w-full text-left rounded-[24px] p-5 border-4 shadow-cute transition ${pool.id === p.id ? "border-foreground" : "border-white"} ${p.id === BANANA_LITE_POOL ? "bg-[color:var(--banana-cream)]" : p.id === BANANA_PLUS_POOL ? "bg-banana-gradient" : "bg-[color:var(--leaf)] text-white"} ${emergencyMode || dsEmergencyMode || dsPaused ? "opacity-60" : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl", children: p.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-xl mt-1", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold opacity-80", children: [
                  p.days,
                  " days lock"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-extrabold", children: [
                  p.apy,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-extrabold opacity-80", children: "APY" })
              ] })
            ] })
          },
          p.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] bg-white border-2 border-[color:var(--banana)] p-6 shadow-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-2xl", children: "Reward Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mt-4 block text-sm font-extrabold opacity-70", children: "Stake amount (MON)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 rounded-2xl bg-[color:var(--banana-cream)] p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              inputMode: "decimal",
              className: "flex-1 bg-transparent px-3 py-2 outline-none font-extrabold text-xl",
              disabled: emergencyMode || dsEmergencyMode || dsPaused
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setAmount(nativeBal ? Number(formatEther(nativeBal.value)).toString() : "0"),
              className: "rounded-full bg-foreground text-[color:var(--banana)] px-3 py-1.5 text-xs font-extrabold",
              children: "MAX"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Pool", v: `${pool.emoji} ${pool.name} · ${pool.days}d · ${pool.apy}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Estimated Reward", v: `${baseRewardDisplay} MON` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: `Tier Bonus (${tier.name})`, v: `+${bonusRewardDisplay} MON` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-[color:var(--banana)]/40 my-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Final Reward", v: `${finalRewardDisplay} MON`, highlight: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: stake,
            disabled: writing || confirming || (emergencyMode || dsEmergencyMode || dsPaused),
            className: "mt-5 w-full rounded-2xl bg-banana-gradient py-4 font-extrabold text-lg shadow-cute border-2 border-white hover:scale-[1.02] transition disabled:opacity-60",
            children: writing ? "Confirm in wallet…" : confirming ? "Confirming…" : emergencyMode || dsEmergencyMode ? "Emergency Mode" : dsPaused ? "Paused" : "Stake Now"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center text-xs font-extrabold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--banana-cream)] py-2", children: [
            "Coverage: ",
            Math.round(coverage),
            "% ",
            coverage > 50 ? "🟢" : "🟠"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--banana-cream)] py-2", children: [
            "Bonus: +",
            tier.bonus,
            "% 🟢"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--banana-cream)] py-2", children: [
            "Emergency: ",
            emergencyMode || dsEmergencyMode ? "ON 🔴" : "Off 🟢"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-extrabold", children: "Your Banana Certificates" }),
      userActiveStakes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-[28px] border-4 border-dashed border-[color:var(--banana)] bg-white p-10 text-center font-extrabold text-foreground/60", children: "No stakes yet. Mint your first banana certificate above!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: userActiveStakes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StakeCard,
        {
          stake: s,
          onClaimEarly: () => setBurnOpen(s),
          onClaim: () => claim(s.stakeId, false)
        },
        s.stakeId.toString()
      )) })
    ] }),
    burnOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EarlyClaimModal,
      {
        stake: burnOpen,
        userAddr,
        jamesBalance: Number(formatEther(jamesBal)),
        onCancel: () => setBurnOpen(null),
        onConfirm: () => claim(burnOpen.stakeId, true)
      }
    )
  ] });
}
function Mini({ label, value, emoji }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[color:var(--banana-cream)] p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-extrabold opacity-60", children: [
      emoji,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: value })
  ] });
}
function Row({ k, v, highlight }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold opacity-70", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-extrabold ${highlight ? "text-xl text-[color:var(--orange-accent)]" : ""}`, children: v })
  ] });
}
function StakeCard({ stake, onClaimEarly, onClaim }) {
  const poolCfg = POOLS.find((p) => p.id === stake.poolId) ?? POOLS[0];
  const stakeTier = tierInfo(stake.tier);
  const { days, hours, minutes, seconds, isUnlocked } = useCountdown(stake.unlockTime);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      className: "rounded-[24px] bg-banana-gradient p-1 shadow-pop",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[20px] bg-white p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: poolCfg.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-[color:var(--banana-cream)] px-2 py-0.5 text-[10px] font-extrabold", children: [
              stakeTier.emoji,
              " ",
              stakeTier.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-extrabold ${stake.status === 0 ? "bg-green-100 text-green-700" : stake.status === 1 ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-600"}`, children: statusLabel(stake.status) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-extrabold text-xl", children: poolCfg.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--banana-cream)] p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold opacity-60", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-extrabold", children: [
              Number(formatEther(stake.amount)),
              " MON"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--banana-cream)] p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold opacity-60", children: "Reward" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-extrabold", children: [
              Number(formatEther(stake.reward)).toFixed(4),
              " MON"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--banana-cream)] p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold opacity-60", children: "Start" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: new Date(stake.startTime * 1e3).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--banana-cream)] p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold opacity-60", children: "Unlock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: new Date(stake.unlockTime * 1e3).toLocaleDateString() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl bg-[color:var(--banana-cream)] p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold opacity-60 text-center mb-1", children: isUnlocked ? "UNLOCKED" : "COUNTDOWN" }),
          isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center font-extrabold text-green-600", children: "Ready to Claim!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-1 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: String(days).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold opacity-50", children: "DAYS" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: String(hours).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold opacity-50", children: "HRS" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: String(minutes).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold opacity-50", children: "MIN" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: String(seconds).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold opacity-50", children: "SEC" })
            ] })
          ] })
        ] }),
        stake.status === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: isUnlocked ? onClaim : onClaimEarly,
            className: `mt-3 w-full rounded-xl py-2.5 font-extrabold shadow-cute hover:scale-[1.02] transition ${isUnlocked ? "bg-foreground text-[color:var(--banana)]" : "bg-[color:var(--orange-accent)] text-white"}`,
            children: isUnlocked ? "Claim Reward" : "Early Claim"
          }
        )
      ] })
    }
  );
}
function EarlyClaimModal({ stake, userAddr, jamesBalance, onCancel, onConfirm }) {
  const { data: burnAmount } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: "requiredBurnAmount",
    args: [userAddr, stake.stakeId],
    query: { enabled: !!stake.stakeId }
  });
  const burnDisplay = burnAmount ? Number(formatEther(burnAmount)).toLocaleString() : "—";
  const penalty = (Number(formatEther(stake.reward)) * 0.2).toFixed(4);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur-sm px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { scale: 0.9, y: 20 },
      animate: { scale: 1, y: 0 },
      className: "max-w-md w-full rounded-[28px] bg-white p-6 border-4 border-[color:var(--orange-accent)] shadow-pop",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-5xl", children: "Burn Warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-2xl font-extrabold text-center", children: "Early Claim Warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-semibold text-foreground/80 text-center", children: "Claiming before unlock requires a 20% burn penalty. Burned tokens are permanently destroyed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-[color:var(--banana-cream)] p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Required Burn", v: `${burnDisplay} $JAMES` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Current Balance", v: `${jamesBalance.toLocaleString()} $JAMES` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Penalty", v: `20% of reward (~${penalty} MON)` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Burn Address", v: "0x000…dEaD" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onCancel, className: "flex-1 rounded-2xl bg-[color:var(--banana-cream)] py-3 font-extrabold", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onConfirm, className: "flex-1 rounded-2xl bg-[color:var(--orange-accent)] text-white py-3 font-extrabold shadow-cute", children: "Confirm Burn" })
        ] })
      ]
    }
  ) });
}
const BASE_URL = "";
const Route$1 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/staking", priority: "0.9", changefreq: "weekly" }
        ];
        const urls = entries.map((e) => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      }
    }
  }
});
const $$splitComponentImporter = () => import("./index-I2qR-_Am.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "JAMES BANANA | AI Meme Video Generator On Monad"
    }, {
      name: "description",
      content: "James Banana — the mysterious cat trapped in a banana peel. Create AI meme videos, watch Banana TV, and stake $JAMES on Monad."
    }, {
      property: "og:title",
      content: "JAMES BANANA | AI Meme Video Generator On Monad"
    }, {
      property: "og:description",
      content: "Create hilarious AI-generated meme videos with James Banana and stake on Monad."
    }, {
      property: "og:image",
      content: logo
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const StakingRoute = Route$2.update({
  id: "/staking",
  path: "/staking",
  getParentRoute: () => Route$3
});
const SitemapDotxmlRoute = Route$1.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$3
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  SitemapDotxmlRoute,
  StakingRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Counter as C,
  FloatingBananas as F,
  logo as l,
  router as r
};
