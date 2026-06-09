import { p as proxy, s as snapshot, a as subscribeKey, b as subscribe, r as ref, c as proxyMap } from "./valtio.mjs";
import { C as ConstantsUtil$1, P as PresetsUtil, S as SafeLocalStorage, a as SafeLocalStorageKeys, g as getSafeConnectorIdKey, b as ParseUtil, H as HelpersUtil, c as getW3mThemeVariables, A as AVAILABLE_NAMESPACES, d as ContractUtil, N as NumberUtil, E as ErrorUtil, U as UserRejectedRequestError, e as NetworkUtil$1 } from "./reown__appkit-common.mjs";
import "./@walletconnect/universal-provider+[...].mjs";
import { W as W3mFrameRpcConstants, a as W3mFrameStorage, b as W3mFrameConstants } from "./reown__appkit-wallet.mjs";
import "./react.mjs";
import { z as formatUnits, A as erc20Abi } from "./viem.mjs";
const SECURE_SITE = (
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org"
);
const ONRAMP_PROVIDERS = [
  {
    label: "Meld.io",
    name: "meld",
    feeRange: "1-2%",
    url: "https://meldcrypto.com",
    supportedChains: ["eip155", "solana"]
  }
];
const MELD_PUBLIC_KEY = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU";
const ConstantsUtil = {
  FOUR_MINUTES_MS: 24e4,
  TEN_SEC_MS: 1e4,
  FIVE_SEC_MS: 5e3,
  THREE_SEC_MS: 3e3,
  ONE_SEC_MS: 1e3,
  SECURE_SITE,
  SECURE_SITE_DASHBOARD: `${SECURE_SITE}/dashboard`,
  SECURE_SITE_FAVICON: `${SECURE_SITE}/images/favicon.png`,
  SOLANA_NATIVE_TOKEN_ADDRESS: "So11111111111111111111111111111111111111111",
  RESTRICTED_TIMEZONES: [
    "ASIA/SHANGHAI",
    "ASIA/URUMQI",
    "ASIA/CHONGQING",
    "ASIA/HARBIN",
    "ASIA/KASHGAR",
    "ASIA/MACAU",
    "ASIA/HONG_KONG",
    "ASIA/MACAO",
    "ASIA/BEIJING",
    "ASIA/HARBIN"
  ],
  SWAP_SUGGESTED_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP"
  ],
  SWAP_POPULAR_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP",
    "METAL",
    "DAI",
    "CHAMP",
    "WOLF",
    "SALE",
    "BAL",
    "BUSD",
    "MUST",
    "BTCpx",
    "ROUTE",
    "HEX",
    "WELT",
    "amDAI",
    "VSQ",
    "VISION",
    "AURUM",
    "pSP",
    "SNX",
    "VC",
    "LINK",
    "CHP",
    "amUSDT",
    "SPHERE",
    "FOX",
    "GIDDY",
    "GFC",
    "OMEN",
    "OX_OLD",
    "DE",
    "WNT"
  ],
  SUGGESTED_TOKENS_BY_CHAIN: {
    // Arbitrum One
    "eip155:42161": ["USD₮0"]
  },
  BALANCE_SUPPORTED_CHAINS: [
    ConstantsUtil$1.CHAIN.EVM,
    ConstantsUtil$1.CHAIN.SOLANA
  ],
  SEND_PARAMS_SUPPORTED_CHAINS: [ConstantsUtil$1.CHAIN.EVM],
  SWAP_SUPPORTED_NETWORKS: [
    // Ethereum'
    "eip155:1",
    // Arbitrum One'
    "eip155:42161",
    // Optimism'
    "eip155:10",
    // ZKSync Era'
    "eip155:324",
    // Base'
    "eip155:8453",
    // BNB Smart Chain'
    "eip155:56",
    // Polygon'
    "eip155:137",
    // Gnosis'
    "eip155:100",
    // Avalanche'
    "eip155:43114",
    // Fantom'
    "eip155:250",
    // Klaytn'
    "eip155:8217",
    // Aurora
    "eip155:1313161554"
  ],
  NAMES_SUPPORTED_CHAIN_NAMESPACES: [ConstantsUtil$1.CHAIN.EVM],
  ONRAMP_SUPPORTED_CHAIN_NAMESPACES: [
    ConstantsUtil$1.CHAIN.EVM,
    ConstantsUtil$1.CHAIN.SOLANA
  ],
  PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES: [
    ConstantsUtil$1.CHAIN.EVM,
    ConstantsUtil$1.CHAIN.SOLANA
  ],
  ACTIVITY_ENABLED_CHAIN_NAMESPACES: [
    ConstantsUtil$1.CHAIN.EVM,
    ConstantsUtil$1.CHAIN.TON
  ],
  NATIVE_TOKEN_ADDRESS: {
    eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    solana: "So11111111111111111111111111111111111111111",
    polkadot: "0x",
    bip122: "0x",
    cosmos: "0x",
    sui: "0x",
    stacks: "0x",
    ton: "0x",
    tron: "0x"
  },
  CONVERT_SLIPPAGE_TOLERANCE: 1,
  CONNECT_LABELS: {
    MOBILE: "Open and continue in the wallet app",
    WEB: "Open and continue in the wallet app"
  },
  SEND_SUPPORTED_NAMESPACES: [
    ConstantsUtil$1.CHAIN.EVM,
    ConstantsUtil$1.CHAIN.SOLANA
  ],
  DEFAULT_REMOTE_FEATURES: {
    swaps: ["1inch"],
    onramp: ["meld"],
    email: true,
    socials: [
      "google",
      "x",
      "discord",
      "farcaster",
      "github",
      "apple",
      "facebook"
    ],
    activity: true,
    reownBranding: true,
    multiWallet: false,
    emailCapture: false,
    payWithExchange: false,
    payments: false,
    reownAuthentication: false,
    headless: false
  },
  DEFAULT_REMOTE_FEATURES_DISABLED: {
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
    activity: false,
    reownBranding: false,
    emailCapture: false,
    reownAuthentication: false,
    headless: false
  },
  DEFAULT_FEATURES: {
    receive: true,
    send: true,
    emailShowWallets: true,
    connectorTypeOrder: [
      "walletConnect",
      "recent",
      "injected",
      "featured",
      "custom",
      "external",
      "recommended"
    ],
    analytics: true,
    allWallets: true,
    legalCheckbox: false,
    smartSessions: false,
    collapseWallets: false,
    walletFeaturesOrder: ["onramp", "swaps", "receive", "send"],
    connectMethodsOrder: void 0,
    pay: false,
    reownAuthentication: false,
    headless: false
  },
  DEFAULT_SOCIALS: [
    "google",
    "x",
    "farcaster",
    "discord",
    "apple",
    "github",
    "facebook"
  ],
  DEFAULT_ACCOUNT_TYPES: {
    bip122: "payment",
    eip155: "smartAccount",
    polkadot: "eoa",
    solana: "eoa",
    ton: "eoa",
    tron: "eoa"
  },
  ADAPTER_TYPES: {
    UNIVERSAL: "universal",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5",
    BITCOIN: "bitcoin"
  },
  SIWX_DEFAULTS: {
    signOutOnDisconnect: true
  },
  MANDATORY_WALLET_IDS_ON_MOBILE: [
    PresetsUtil.ConnectorExplorerIds[ConstantsUtil$1.CONNECTOR_ID.COINBASE],
    PresetsUtil.ConnectorExplorerIds[ConstantsUtil$1.CONNECTOR_ID.COINBASE_SDK],
    PresetsUtil.ConnectorExplorerIds[ConstantsUtil$1.CONNECTOR_ID.BASE_ACCOUNT],
    PresetsUtil.ConnectorExplorerIds[ConstantsUtil$1.SOLFLARE_CONNECTOR_NAME],
    PresetsUtil.ConnectorExplorerIds[ConstantsUtil$1.PHANTOM_CONNECTOR_NAME],
    PresetsUtil.ConnectorExplorerIds[ConstantsUtil$1.BINANCE_CONNECTOR_NAME]
  ],
  DEFAULT_CONNECT_METHOD_ORDER: ["email", "social", "wallet"]
};
const StorageUtil = {
  // Cache expiry in milliseconds
  cacheExpiry: {
    portfolio: 3e4,
    nativeBalance: 3e4,
    ens: 3e5,
    identity: 3e5,
    transactionsHistory: 15e3,
    tokenPrice: 15e3,
    // 7 Days
    latestAppKitVersion: 6048e5,
    // 1 Day
    tonWallets: 864e5
  },
  isCacheExpired(timestamp, cacheExpiry) {
    return Date.now() - timestamp > cacheExpiry;
  },
  getActiveNetworkProps() {
    const namespace = StorageUtil.getActiveNamespace();
    const caipNetworkId = StorageUtil.getActiveCaipNetworkId();
    const stringChainId = caipNetworkId ? caipNetworkId.split(":")[1] : void 0;
    const chainId = stringChainId ? isNaN(Number(stringChainId)) ? stringChainId : Number(stringChainId) : void 0;
    return {
      namespace,
      caipNetworkId,
      chainId
    };
  },
  setWalletConnectDeepLink({ name, href }) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.DEEPLINK_CHOICE, JSON.stringify({ href, name }));
    } catch {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  getWalletConnectDeepLink() {
    try {
      const deepLink = SafeLocalStorage.getItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
      if (deepLink) {
        return JSON.parse(deepLink);
      }
    } catch {
      console.info("Unable to get WalletConnect deep link");
    }
    return void 0;
  },
  deleteWalletConnectDeepLink() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
    } catch {
      console.info("Unable to delete WalletConnect deep link");
    }
  },
  setActiveNamespace(namespace) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE, namespace);
    } catch {
      console.info("Unable to set active namespace");
    }
  },
  setActiveCaipNetworkId(caipNetworkId) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID, caipNetworkId);
      StorageUtil.setActiveNamespace(caipNetworkId.split(":")[0]);
    } catch {
      console.info("Unable to set active caip network id");
    }
  },
  getActiveCaipNetworkId() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to get active caip network id");
      return void 0;
    }
  },
  deleteActiveCaipNetworkId() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to delete active caip network id");
    }
  },
  deleteConnectedConnectorId(namespace) {
    try {
      const key = getSafeConnectorIdKey(namespace);
      SafeLocalStorage.removeItem(key);
    } catch {
      console.info("Unable to delete connected connector id");
    }
  },
  setAppKitRecent(wallet) {
    try {
      const recentWallets = StorageUtil.getRecentWallets();
      const exists = recentWallets.find((w) => w.id === wallet.id);
      if (!exists) {
        recentWallets.unshift(wallet);
        if (recentWallets.length > 2) {
          recentWallets.pop();
        }
        SafeLocalStorage.setItem(SafeLocalStorageKeys.RECENT_WALLETS, JSON.stringify(recentWallets));
        SafeLocalStorage.setItem(SafeLocalStorageKeys.RECENT_WALLET, JSON.stringify(wallet));
      }
    } catch {
      console.info("Unable to set AppKit recent");
    }
  },
  getRecentWallets() {
    try {
      const recent = SafeLocalStorage.getItem(SafeLocalStorageKeys.RECENT_WALLETS);
      return recent ? JSON.parse(recent) : [];
    } catch {
      console.info("Unable to get AppKit recent");
    }
    return [];
  },
  getRecentWallet() {
    try {
      const recent = SafeLocalStorage.getItem(SafeLocalStorageKeys.RECENT_WALLET);
      return recent ? JSON.parse(recent) : null;
    } catch {
      console.info("Unable to get AppKit recent");
    }
    return null;
  },
  deleteRecentWallet() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.RECENT_WALLET);
    } catch {
      console.info("Unable to delete AppKit recent");
    }
  },
  setConnectedConnectorId(namespace, connectorId) {
    try {
      const key = getSafeConnectorIdKey(namespace);
      SafeLocalStorage.setItem(key, connectorId);
    } catch {
      console.info("Unable to set Connected Connector Id");
    }
  },
  getActiveNamespace() {
    try {
      const activeNamespace = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE);
      return activeNamespace;
    } catch {
      console.info("Unable to get active namespace");
    }
    return void 0;
  },
  getConnectedConnectorId(namespace) {
    if (!namespace) {
      return void 0;
    }
    try {
      const key = getSafeConnectorIdKey(namespace);
      return SafeLocalStorage.getItem(key);
    } catch (e) {
      console.info("Unable to get connected connector id in namespace", namespace);
    }
    return void 0;
  },
  setConnectedSocialProvider(socialProvider) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_SOCIAL, socialProvider);
    } catch {
      console.info("Unable to set connected social provider");
    }
  },
  getConnectedSocialProvider() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to get connected social provider");
    }
    return void 0;
  },
  deleteConnectedSocialProvider() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to delete connected social provider");
    }
  },
  getConnectedSocialUsername() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL_USERNAME);
    } catch {
      console.info("Unable to get connected social username");
    }
    return void 0;
  },
  getStoredActiveCaipNetworkId() {
    const storedCaipNetworkId = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    const networkId = storedCaipNetworkId?.split(":")?.[1];
    return networkId;
  },
  setConnectionStatus(status) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTION_STATUS, status);
    } catch {
      console.info("Unable to set connection status");
    }
  },
  getConnectionStatus() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTION_STATUS);
    } catch {
      return void 0;
    }
  },
  getConnectedNamespaces() {
    try {
      const namespaces = SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES);
      if (!namespaces?.length) {
        return [];
      }
      return namespaces.split(",");
    } catch {
      return [];
    }
  },
  setConnectedNamespaces(namespaces) {
    try {
      const uniqueNamespaces = Array.from(new Set(namespaces));
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES, uniqueNamespaces.join(","));
    } catch {
      console.info("Unable to set namespaces in storage");
    }
  },
  addConnectedNamespace(namespace) {
    try {
      const namespaces = StorageUtil.getConnectedNamespaces();
      if (!namespaces.includes(namespace)) {
        namespaces.push(namespace);
        StorageUtil.setConnectedNamespaces(namespaces);
      }
    } catch {
      console.info("Unable to add connected namespace");
    }
  },
  removeConnectedNamespace(namespace) {
    try {
      const namespaces = StorageUtil.getConnectedNamespaces();
      const index = namespaces.indexOf(namespace);
      if (index > -1) {
        namespaces.splice(index, 1);
        StorageUtil.setConnectedNamespaces(namespaces);
      }
    } catch {
      console.info("Unable to remove connected namespace");
    }
  },
  getTelegramSocialProvider() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to get telegram social provider");
      return null;
    }
  },
  setTelegramSocialProvider(socialProvider) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER, socialProvider);
    } catch {
      console.info("Unable to set telegram social provider");
    }
  },
  removeTelegramSocialProvider() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to remove telegram social provider");
    }
  },
  getBalanceCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return cache;
  },
  removeAddressFromBalanceCache(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify({ ...cache, [caipAddress]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", caipAddress);
    }
  },
  getBalanceCacheForCaipAddress(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      const balanceCache = cache[caipAddress];
      if (balanceCache && !this.isCacheExpired(balanceCache.timestamp, this.cacheExpiry.portfolio)) {
        return balanceCache.balance;
      }
      StorageUtil.removeAddressFromBalanceCache(caipAddress);
    } catch {
      console.info("Unable to get balance cache for address", caipAddress);
    }
    return void 0;
  },
  updateBalanceCache(params) {
    try {
      const cache = StorageUtil.getBalanceCache();
      cache[params.caipAddress] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update balance cache", params);
    }
  },
  getNativeBalanceCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return cache;
  },
  removeAddressFromNativeBalanceCache(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify({ ...cache, [caipAddress]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", caipAddress);
    }
  },
  getNativeBalanceCacheForCaipAddress(caipAddress) {
    try {
      const cache = StorageUtil.getNativeBalanceCache();
      const nativeBalanceCache = cache[caipAddress];
      if (nativeBalanceCache && !this.isCacheExpired(nativeBalanceCache.timestamp, this.cacheExpiry.nativeBalance)) {
        return nativeBalanceCache;
      }
      console.info("Discarding cache for address", caipAddress);
      StorageUtil.removeAddressFromBalanceCache(caipAddress);
    } catch {
      console.info("Unable to get balance cache for address", caipAddress);
    }
    return void 0;
  },
  updateNativeBalanceCache(params) {
    try {
      const cache = StorageUtil.getNativeBalanceCache();
      cache[params.caipAddress] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update balance cache", params);
    }
  },
  getEnsCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.ENS_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get ens name cache");
    }
    return cache;
  },
  getEnsFromCacheForAddress(address) {
    try {
      const cache = StorageUtil.getEnsCache();
      const ensCache = cache[address];
      if (ensCache && !this.isCacheExpired(ensCache.timestamp, this.cacheExpiry.ens)) {
        return ensCache.ens;
      }
      StorageUtil.removeEnsFromCache(address);
    } catch {
      console.info("Unable to get ens name from cache", address);
    }
    return void 0;
  },
  updateEnsCache(params) {
    try {
      const cache = StorageUtil.getEnsCache();
      cache[params.address] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update ens name cache", params);
    }
  },
  removeEnsFromCache(address) {
    try {
      const cache = StorageUtil.getEnsCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify({ ...cache, [address]: void 0 }));
    } catch {
      console.info("Unable to remove ens name from cache", address);
    }
  },
  getIdentityCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.IDENTITY_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get identity cache");
    }
    return cache;
  },
  getIdentityFromCacheForAddress(address) {
    try {
      const cache = StorageUtil.getIdentityCache();
      const identityCache = cache[address];
      if (identityCache && !this.isCacheExpired(identityCache.timestamp, this.cacheExpiry.identity)) {
        return identityCache.identity;
      }
      StorageUtil.removeIdentityFromCache(address);
    } catch {
      console.info("Unable to get identity from cache", address);
    }
    return void 0;
  },
  updateIdentityCache(params) {
    try {
      const cache = StorageUtil.getIdentityCache();
      cache[params.address] = {
        identity: params.identity,
        timestamp: params.timestamp
      };
      SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update identity cache", params);
    }
  },
  removeIdentityFromCache(address) {
    try {
      const cache = StorageUtil.getIdentityCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify({ ...cache, [address]: void 0 }));
    } catch {
      console.info("Unable to remove identity from cache", address);
    }
  },
  getTonWalletsCache() {
    try {
      const cache = SafeLocalStorage.getItem(SafeLocalStorageKeys.TON_WALLETS_CACHE);
      const parsedCache = cache ? JSON.parse(cache) : void 0;
      if (parsedCache && !this.isCacheExpired(parsedCache.timestamp, this.cacheExpiry.tonWallets)) {
        return parsedCache;
      }
      StorageUtil.removeTonWalletsCache();
    } catch {
      console.info("Unable to get ton wallets cache");
    }
    return void 0;
  },
  updateTonWalletsCache(wallets) {
    try {
      const cache = StorageUtil.getTonWalletsCache() || { timestamp: 0, wallets: [] };
      cache.timestamp = (/* @__PURE__ */ new Date()).getTime();
      cache.wallets = wallets;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.TON_WALLETS_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update ton wallets cache", wallets);
    }
  },
  removeTonWalletsCache() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.TON_WALLETS_CACHE);
    } catch {
      console.info("Unable to remove ton wallets cache");
    }
  },
  clearAddressCache() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.ENS_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.IDENTITY_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE);
    } catch {
      console.info("Unable to clear address cache");
    }
  },
  setPreferredAccountTypes(accountTypes) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES, JSON.stringify(accountTypes));
    } catch {
      console.info("Unable to set preferred account types", accountTypes);
    }
  },
  getPreferredAccountTypes() {
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES);
      if (!result) {
        return {};
      }
      return JSON.parse(result);
    } catch {
      console.info("Unable to get preferred account types");
    }
    return {};
  },
  setConnections(connections, chainNamespace) {
    try {
      const existingConnections = StorageUtil.getConnections();
      const existing = existingConnections[chainNamespace] ?? [];
      const connectorConnectionMap = /* @__PURE__ */ new Map();
      for (const conn of existing) {
        connectorConnectionMap.set(conn.connectorId, { ...conn });
      }
      for (const conn of connections) {
        const existingConn = connectorConnectionMap.get(conn.connectorId);
        const isAuth = conn.connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH;
        if (existingConn && !isAuth) {
          const existingAddrs = new Set(existingConn.accounts.map((a) => a.address.toLowerCase()));
          const newAccounts = conn.accounts.filter((a) => !existingAddrs.has(a.address.toLowerCase()));
          existingConn.accounts.push(...newAccounts);
        } else {
          connectorConnectionMap.set(conn.connectorId, { ...conn });
        }
      }
      const dedupedConnections = {
        ...existingConnections,
        [chainNamespace]: Array.from(connectorConnectionMap.values())
      };
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTIONS, JSON.stringify(dedupedConnections));
    } catch (error) {
      console.error("Unable to sync connections to storage", error);
    }
  },
  getConnections() {
    try {
      const connectionsStorage = SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTIONS);
      if (!connectionsStorage) {
        return {};
      }
      return JSON.parse(connectionsStorage);
    } catch (error) {
      console.error("Unable to get connections from storage", error);
      return {};
    }
  },
  deleteAddressFromConnection({ connectorId, address, namespace }) {
    try {
      const connections = StorageUtil.getConnections();
      const namespaceConnections = connections[namespace] ?? [];
      const connectionMap = new Map(namespaceConnections.map((conn) => [conn.connectorId, conn]));
      const connector = connectionMap.get(connectorId);
      if (connector) {
        const updatedAccounts = connector.accounts.filter((acc) => acc.address.toLowerCase() !== address.toLowerCase());
        if (updatedAccounts.length === 0) {
          connectionMap.delete(connectorId);
        } else {
          connectionMap.set(connectorId, {
            ...connector,
            accounts: connector.accounts.filter((acc) => acc.address.toLowerCase() !== address.toLowerCase())
          });
        }
      }
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTIONS, JSON.stringify({
        ...connections,
        [namespace]: Array.from(connectionMap.values())
      }));
    } catch {
      console.error(`Unable to remove address "${address}" from connector "${connectorId}" in namespace "${namespace}"`);
    }
  },
  getDisconnectedConnectorIds() {
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.DISCONNECTED_CONNECTOR_IDS);
      if (!result) {
        return {};
      }
      return JSON.parse(result);
    } catch {
      console.info("Unable to get disconnected connector ids");
    }
    return {};
  },
  addDisconnectedConnectorId(connectorId, chainNamespace) {
    try {
      const currentDisconnectedConnectorIds = StorageUtil.getDisconnectedConnectorIds();
      const disconnectedConnectorIdsByNamespace = currentDisconnectedConnectorIds[chainNamespace] ?? [];
      disconnectedConnectorIdsByNamespace.push(connectorId);
      SafeLocalStorage.setItem(SafeLocalStorageKeys.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
        ...currentDisconnectedConnectorIds,
        [chainNamespace]: Array.from(new Set(disconnectedConnectorIdsByNamespace))
      }));
    } catch {
      console.error(`Unable to set disconnected connector id "${connectorId}" for namespace "${chainNamespace}"`);
    }
  },
  removeDisconnectedConnectorId(connectorId, chainNamespace) {
    try {
      const currentDisconnectedConnectorIds = StorageUtil.getDisconnectedConnectorIds();
      let disconnectedConnectorIdsByNamespace = currentDisconnectedConnectorIds[chainNamespace] ?? [];
      disconnectedConnectorIdsByNamespace = disconnectedConnectorIdsByNamespace.filter((id) => id.toLowerCase() !== connectorId.toLowerCase());
      SafeLocalStorage.setItem(SafeLocalStorageKeys.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
        ...currentDisconnectedConnectorIds,
        [chainNamespace]: Array.from(new Set(disconnectedConnectorIdsByNamespace))
      }));
    } catch {
      console.error(`Unable to remove disconnected connector id "${connectorId}" for namespace "${chainNamespace}"`);
    }
  },
  isConnectorDisconnected(connectorId, chainNamespace) {
    try {
      const currentDisconnectedConnectorIds = StorageUtil.getDisconnectedConnectorIds();
      const disconnectedConnectorIdsByNamespace = currentDisconnectedConnectorIds[chainNamespace] ?? [];
      return disconnectedConnectorIdsByNamespace.some((id) => id.toLowerCase() === connectorId.toLowerCase());
    } catch {
      console.info(`Unable to get disconnected connector id "${connectorId}" for namespace "${chainNamespace}"`);
    }
    return false;
  },
  getTransactionsCache() {
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE);
      return result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get transactions cache");
    }
    return {};
  },
  getTransactionsCacheForAddress({ address, chainId = "" }) {
    try {
      const cache = StorageUtil.getTransactionsCache();
      const transactionsCache = cache[address]?.[chainId];
      if (transactionsCache && !this.isCacheExpired(transactionsCache.timestamp, this.cacheExpiry.transactionsHistory)) {
        return transactionsCache.transactions;
      }
      StorageUtil.removeTransactionsCache({ address, chainId });
    } catch {
      console.info("Unable to get transactions cache");
    }
    return void 0;
  },
  updateTransactionsCache({ address, chainId = "", timestamp, transactions }) {
    try {
      const cache = StorageUtil.getTransactionsCache();
      cache[address] = {
        ...cache[address],
        [chainId]: {
          timestamp,
          transactions
        }
      };
      SafeLocalStorage.setItem(SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update transactions cache", {
        address,
        chainId,
        timestamp,
        transactions
      });
    }
  },
  removeTransactionsCache({ address, chainId }) {
    try {
      const cache = StorageUtil.getTransactionsCache();
      const addressCache = cache?.[address] || {};
      const { [chainId]: _removed, ...updatedChainData } = addressCache;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE, JSON.stringify({
        ...cache,
        [address]: updatedChainData
      }));
    } catch {
      console.info("Unable to remove transactions cache", { address, chainId });
    }
  },
  getTokenPriceCache() {
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.TOKEN_PRICE_CACHE);
      return result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get token price cache");
    }
    return {};
  },
  getTokenPriceCacheForAddresses(addresses) {
    try {
      const cache = StorageUtil.getTokenPriceCache();
      const tokenPriceCache = cache[addresses.join(",")];
      if (tokenPriceCache && !this.isCacheExpired(tokenPriceCache.timestamp, this.cacheExpiry.tokenPrice)) {
        return tokenPriceCache.tokenPrice;
      }
      StorageUtil.removeTokenPriceCache(addresses);
    } catch {
      console.info("Unable to get token price cache for addresses", addresses);
    }
    return void 0;
  },
  updateTokenPriceCache(params) {
    try {
      const cache = StorageUtil.getTokenPriceCache();
      cache[params.addresses.join(",")] = {
        timestamp: params.timestamp,
        tokenPrice: params.tokenPrice
      };
      SafeLocalStorage.setItem(SafeLocalStorageKeys.TOKEN_PRICE_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update token price cache", params);
    }
  },
  removeTokenPriceCache(addresses) {
    try {
      const cache = StorageUtil.getTokenPriceCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.TOKEN_PRICE_CACHE, JSON.stringify({ ...cache, [addresses.join(",")]: void 0 }));
    } catch {
      console.info("Unable to remove token price cache", addresses);
    }
  },
  /* ----- AppKit Latest Version ------------------------- */
  getLatestAppKitVersion() {
    try {
      const result = this.getLatestAppKitVersionCache();
      const version = result?.version;
      if (version && !this.isCacheExpired(result.timestamp, this.cacheExpiry.latestAppKitVersion)) {
        return version;
      }
      return void 0;
    } catch {
      console.info("Unable to get latest AppKit version");
    }
    return void 0;
  },
  getLatestAppKitVersionCache() {
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.LATEST_APPKIT_VERSION);
      return result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get latest AppKit version cache");
    }
    return {};
  },
  updateLatestAppKitVersion(params) {
    try {
      const cache = StorageUtil.getLatestAppKitVersionCache();
      cache.timestamp = params.timestamp;
      cache.version = params.version;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.LATEST_APPKIT_VERSION, JSON.stringify(cache));
    } catch {
      console.info("Unable to update latest AppKit version on local storage", params);
    }
  }
};
const CoreHelperUtil = {
  getWindow() {
    if (typeof window === "undefined") {
      return void 0;
    }
    return window;
  },
  isMobile() {
    if (this.isClient()) {
      return Boolean(window?.matchMedia && typeof window.matchMedia === "function" && window.matchMedia("(pointer:coarse)")?.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent));
    }
    return false;
  },
  checkCaipNetwork(network, networkName = "") {
    return network?.caipNetworkId.toLocaleLowerCase().includes(networkName.toLowerCase());
  },
  isAndroid() {
    if (!this.isMobile()) {
      return false;
    }
    const ua = window?.navigator.userAgent.toLowerCase();
    return CoreHelperUtil.isMobile() && ua.includes("android");
  },
  isIos() {
    if (!this.isMobile()) {
      return false;
    }
    const ua = window?.navigator.userAgent.toLowerCase();
    return ua.includes("iphone") || ua.includes("ipad");
  },
  isSafari() {
    if (!this.isClient()) {
      return false;
    }
    const ua = window?.navigator.userAgent.toLowerCase();
    return ua.includes("safari");
  },
  isClient() {
    return typeof window !== "undefined";
  },
  isPairingExpired(expiry) {
    return expiry ? expiry - Date.now() <= ConstantsUtil.TEN_SEC_MS : true;
  },
  isAllowedRetry(lastRetry, differenceMs = ConstantsUtil.ONE_SEC_MS) {
    return Date.now() - lastRetry >= differenceMs;
  },
  copyToClopboard(text) {
    navigator.clipboard.writeText(text);
  },
  isIframe() {
    try {
      return window?.self !== window?.top;
    } catch (e) {
      return false;
    }
  },
  isSafeApp() {
    if (CoreHelperUtil.isClient() && window.self !== window.top) {
      try {
        const ancestor = window?.location?.ancestorOrigins?.[0];
        const safeAppUrl = "https://app.safe.global";
        if (ancestor) {
          const ancestorUrl = new URL(ancestor);
          const safeUrl = new URL(safeAppUrl);
          return ancestorUrl.hostname === safeUrl.hostname;
        }
      } catch {
        return false;
      }
    }
    return false;
  },
  getPairingExpiry() {
    return Date.now() + ConstantsUtil.FOUR_MINUTES_MS;
  },
  getNetworkId(caipAddress) {
    return caipAddress?.split(":")[1];
  },
  getPlainAddress(caipAddress) {
    return caipAddress?.split(":")[2];
  },
  async wait(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(func, timeout = 500) {
    let timer = void 0;
    return (...args) => {
      function next() {
        func(...args);
      }
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(next, timeout);
    };
  },
  isHttpUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
  },
  formatNativeUrl(appUrl, wcUri, universalLink = null) {
    if (CoreHelperUtil.isHttpUrl(appUrl)) {
      return this.formatUniversalUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    let safeUniversalLink = universalLink;
    if (!safeAppUrl.includes("://")) {
      safeAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
      safeAppUrl = `${safeAppUrl}://`;
    }
    if (!safeAppUrl.endsWith("/")) {
      safeAppUrl = `${safeAppUrl}/`;
    }
    if (safeUniversalLink && !safeUniversalLink?.endsWith("/")) {
      safeUniversalLink = `${safeUniversalLink}/`;
    }
    if (this.isTelegram() && this.isAndroid()) {
      wcUri = encodeURIComponent(wcUri);
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
      redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
      redirectUniversalLink: safeUniversalLink ? `${safeUniversalLink}wc?uri=${encodedWcUrl}` : void 0,
      href: safeAppUrl
    };
  },
  formatUniversalUrl(appUrl, wcUri) {
    if (!CoreHelperUtil.isHttpUrl(appUrl)) {
      return this.formatNativeUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.endsWith("/")) {
      safeAppUrl = `${safeAppUrl}/`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
      redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
      href: safeAppUrl
    };
  },
  getOpenTargetForPlatform(target) {
    if (target === "popupWindow") {
      return target;
    }
    if (this.isTelegram()) {
      if (StorageUtil.getTelegramSocialProvider()) {
        return "_top";
      }
      return "_blank";
    }
    return target;
  },
  openHref(href, target, features2) {
    window?.open(href, this.getOpenTargetForPlatform(target), features2 || "noreferrer noopener");
  },
  returnOpenHref(href, target, features2) {
    return window?.open(href, this.getOpenTargetForPlatform(target), features2 || "noreferrer noopener");
  },
  isTelegram() {
    return typeof window !== "undefined" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Boolean(window.TelegramWebviewProxy) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Boolean(window.Telegram) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Boolean(window.TelegramWebviewProxyProto));
  },
  isPWA() {
    if (typeof window === "undefined") {
      return false;
    }
    const isStandaloneDisplayMode = window?.matchMedia && typeof window.matchMedia === "function" ? window.matchMedia("(display-mode: standalone)")?.matches : false;
    const isIOSStandalone = window?.navigator?.standalone;
    return Boolean(isStandaloneDisplayMode || isIOSStandalone);
  },
  async preloadImage(src) {
    const imagePromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.crossOrigin = "anonymous";
      image.src = src;
    });
    return Promise.race([imagePromise, CoreHelperUtil.wait(2e3)]);
  },
  parseBalance(balance, symbol) {
    let formattedBalance = "0.000";
    if (typeof balance === "string") {
      const number = Number(balance);
      if (!isNaN(number)) {
        const formattedValue = (Math.floor(number * 1e3) / 1e3).toFixed(3);
        if (formattedValue) {
          formattedBalance = formattedValue;
        }
      }
    }
    const [valueString, decimalsString] = formattedBalance.split(".");
    const value = valueString || "0";
    const decimals = decimalsString || "000";
    const formattedText = `${value}.${decimals}${symbol ? ` ${symbol}` : ""}`;
    return {
      formattedText,
      value,
      decimals,
      symbol
    };
  },
  getApiUrl() {
    return ConstantsUtil$1.W3M_API_URL;
  },
  getBlockchainApiUrl() {
    return ConstantsUtil$1.BLOCKCHAIN_API_RPC_URL;
  },
  getAnalyticsUrl() {
    return ConstantsUtil$1.PULSE_API_URL;
  },
  getUUID() {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(error) {
    if (typeof error === "string") {
      return error;
    } else if (typeof error?.issues?.[0]?.message === "string") {
      return error.issues[0].message;
    } else if (error instanceof Error) {
      return error.message;
    }
    return "Unknown error";
  },
  sortRequestedNetworks(approvedIds, requestedNetworks = []) {
    const approvedIndexMap = {};
    if (requestedNetworks && approvedIds) {
      approvedIds.forEach((id, index) => {
        approvedIndexMap[id] = index;
      });
      requestedNetworks.sort((a, b) => {
        const indexA = approvedIndexMap[a.id];
        const indexB = approvedIndexMap[b.id];
        if (indexA !== void 0 && indexB !== void 0) {
          return indexA - indexB;
        } else if (indexA !== void 0) {
          return -1;
        } else if (indexB !== void 0) {
          return 1;
        }
        return 0;
      });
    }
    return requestedNetworks;
  },
  calculateBalance(array) {
    let sum = 0;
    for (const item of array) {
      sum += item.value ?? 0;
    }
    return sum;
  },
  formatTokenBalance(number) {
    const roundedNumber = number.toFixed(2);
    const [dollars, pennies] = roundedNumber.split(".");
    return { dollars, pennies };
  },
  isAddress(address, chain = "eip155") {
    switch (chain) {
      case "eip155":
        if (!/^(?:0x)?[0-9a-f]{40}$/iu.test(address)) {
          return false;
        } else if (/^(?:0x)?[0-9a-f]{40}$/iu.test(address) || /^(?:0x)?[0-9A-F]{40}$/iu.test(address)) {
          return true;
        }
        return false;
      case "solana":
        return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(address);
      case "bip122": {
        const isP2PKH = /^[1][a-km-zA-HJ-NP-Z1-9]{25,34}$/u.test(address);
        const isP2SH = /^[3][a-km-zA-HJ-NP-Z1-9]{25,34}$/u.test(address);
        const isBech32 = /^bc1[a-z0-9]{39,87}$/u.test(address);
        const isBech32m = /^bc1p[a-z0-9]{58}$/u.test(address);
        return isP2PKH || isP2SH || isBech32 || isBech32m;
      }
      default:
        return false;
    }
  },
  uniqueBy(arr, key) {
    const set = /* @__PURE__ */ new Set();
    return arr.filter((item) => {
      const keyValue = item[key];
      if (set.has(keyValue)) {
        return false;
      }
      set.add(keyValue);
      return true;
    });
  },
  generateSdkVersion(adapters, platform, version) {
    const hasNoAdapters = adapters.length === 0;
    const adapterNames = hasNoAdapters ? ConstantsUtil.ADAPTER_TYPES.UNIVERSAL : adapters.map((adapter) => adapter.adapterType).join(",");
    return `${platform}-${adapterNames}-${version}`;
  },
  createAccount(params) {
    const { chainNamespace, chainId, address } = ParseUtil.parseCaipAddress(params.caipAddress);
    return {
      namespace: chainNamespace,
      address,
      chainId,
      caipAddress: params.caipAddress,
      type: params.type,
      publicKey: params.publicKey,
      path: params.path
    };
  },
  isCaipAddress(address) {
    if (typeof address !== "string") {
      return false;
    }
    const sections = address.split(":");
    const namespace = sections[0];
    return sections.filter(Boolean).length === 3 && namespace in ConstantsUtil$1.CHAIN_NAME_MAP;
  },
  getAccount(account) {
    if (!account) {
      return {
        address: void 0,
        chainId: void 0
      };
    }
    if (typeof account === "string") {
      return {
        address: account,
        chainId: void 0
      };
    }
    return {
      address: account.address,
      chainId: account.chainId
    };
  },
  isMac() {
    const ua = window?.navigator.userAgent.toLowerCase();
    return ua.includes("macintosh") && !ua.includes("safari");
  },
  formatTelegramSocialLoginUrl(url) {
    const valueToInject = `--${encodeURIComponent(window?.location.href)}`;
    const paramToInject = "state=";
    const parsedUrl = new URL(url);
    if (parsedUrl.host === "auth.magic.link") {
      const providerParam = "provider_authorization_url=";
      const providerUrl = url.substring(url.indexOf(providerParam) + providerParam.length);
      const resultUrl = this.injectIntoUrl(decodeURIComponent(providerUrl), paramToInject, valueToInject);
      return url.replace(providerUrl, encodeURIComponent(resultUrl));
    }
    return this.injectIntoUrl(url, paramToInject, valueToInject);
  },
  injectIntoUrl(url, key, appendString) {
    const keyIndex = url.indexOf(key);
    if (keyIndex === -1) {
      throw new Error(`${key} parameter not found in the URL: ${url}`);
    }
    const keyEndIndex = url.indexOf("&", keyIndex);
    const keyLength = key.length;
    const keyParamEnd = keyEndIndex !== -1 ? keyEndIndex : url.length;
    const beforeKeyValue = url.substring(0, keyIndex + keyLength);
    const currentKeyValue = url.substring(keyIndex + keyLength, keyParamEnd);
    const afterKeyValue = url.substring(keyEndIndex);
    const newKeyValue = currentKeyValue + appendString;
    const newUrl = beforeKeyValue + newKeyValue + afterKeyValue;
    return newUrl;
  },
  isNumber(value) {
    if (typeof value !== "number" && typeof value !== "string") {
      return false;
    }
    return !isNaN(Number(value));
  },
  appendPayToUri(wcUri, wcPayUrl) {
    if (!wcPayUrl) {
      return wcUri;
    }
    return `${wcUri}&pay=${encodeURIComponent(wcPayUrl)}`;
  }
};
async function fetchData(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    const err = new Error(`HTTP status code: ${response.status}`, {
      cause: response
    });
    throw err;
  }
  return response;
}
class FetchUtil {
  constructor({ baseUrl: baseUrl2, clientId }) {
    this.baseUrl = baseUrl2;
    this.clientId = clientId;
  }
  async get({ headers, signal, cache, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, { method: "GET", headers, signal, cache });
    return response.json();
  }
  async getBlob({ headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, { method: "GET", headers, signal });
    return response.blob();
  }
  async post({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  async put({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  async delete({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "DELETE",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  createUrl({ path, params }) {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== void 0 && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }
    if (this.clientId) {
      url.searchParams.append("clientId", this.clientId);
    }
    return url;
  }
  sendBeacon({ body, ...args }) {
    const url = this.createUrl(args);
    return navigator.sendBeacon(url.toString(), body ? JSON.stringify(body) : void 0);
  }
}
const OptionsUtil = {
  getFeatureValue(key, features2) {
    const optionValue = features2?.[key];
    if (optionValue === void 0) {
      return ConstantsUtil.DEFAULT_FEATURES[key];
    }
    return optionValue;
  },
  filterSocialsByPlatform(socials) {
    if (!socials || !socials.length) {
      return socials;
    }
    let filteredSocials = socials;
    if (CoreHelperUtil.isTelegram()) {
      if (CoreHelperUtil.isIos()) {
        filteredSocials = filteredSocials.filter((s) => s !== "google");
      }
      if (CoreHelperUtil.isMac()) {
        filteredSocials = filteredSocials.filter((s) => s !== "x");
      }
      if (CoreHelperUtil.isAndroid()) {
        filteredSocials = filteredSocials.filter((s) => !["facebook", "x"].includes(s));
      }
    }
    if (CoreHelperUtil.isMobile()) {
      filteredSocials = filteredSocials.filter((s) => s !== "facebook");
    }
    return filteredSocials;
  },
  isSocialsEnabled() {
    return Array.isArray(OptionsController.state.features?.socials) && OptionsController.state.features?.socials.length > 0 || Array.isArray(OptionsController.state.remoteFeatures?.socials) && OptionsController.state.remoteFeatures?.socials.length > 0;
  },
  isEmailEnabled() {
    return Boolean(OptionsController.state.features?.email || OptionsController.state.remoteFeatures?.email);
  }
};
const state$p = proxy({
  features: ConstantsUtil.DEFAULT_FEATURES,
  projectId: "",
  sdkType: "appkit",
  sdkVersion: "html-wagmi-undefined",
  defaultAccountTypes: ConstantsUtil.DEFAULT_ACCOUNT_TYPES,
  enableNetworkSwitch: true,
  experimental_preferUniversalLinks: false,
  remoteFeatures: {},
  enableMobileFullScreen: false,
  coinbasePreference: "all"
});
const OptionsController = {
  state: state$p,
  subscribeKey(key, callback) {
    return subscribeKey(state$p, key, callback);
  },
  setOptions(options) {
    Object.assign(state$p, options);
  },
  setRemoteFeatures(remoteFeatures) {
    if (!remoteFeatures) {
      return;
    }
    const newRemoteFeatures = { ...state$p.remoteFeatures, ...remoteFeatures };
    state$p.remoteFeatures = newRemoteFeatures;
    if (state$p.remoteFeatures?.socials) {
      state$p.remoteFeatures.socials = OptionsUtil.filterSocialsByPlatform(state$p.remoteFeatures.socials);
    }
    if (state$p.features?.pay) {
      state$p.remoteFeatures.email = false;
      state$p.remoteFeatures.socials = false;
    }
  },
  setFeatures(features2) {
    if (!features2) {
      return;
    }
    if (!state$p.features) {
      state$p.features = ConstantsUtil.DEFAULT_FEATURES;
    }
    const newFeatures = { ...state$p.features, ...features2 };
    state$p.features = newFeatures;
    if (state$p.features?.pay && state$p.remoteFeatures) {
      state$p.remoteFeatures.email = false;
      state$p.remoteFeatures.socials = false;
    }
  },
  setProjectId(projectId) {
    state$p.projectId = projectId;
  },
  setCustomRpcUrls(customRpcUrls) {
    state$p.customRpcUrls = customRpcUrls;
  },
  setAllWallets(allWallets) {
    state$p.allWallets = allWallets;
  },
  setIncludeWalletIds(includeWalletIds) {
    state$p.includeWalletIds = includeWalletIds;
  },
  setExcludeWalletIds(excludeWalletIds) {
    state$p.excludeWalletIds = excludeWalletIds;
  },
  setFeaturedWalletIds(featuredWalletIds) {
    state$p.featuredWalletIds = featuredWalletIds;
  },
  setTokens(tokens) {
    state$p.tokens = tokens;
  },
  setTermsConditionsUrl(termsConditionsUrl) {
    state$p.termsConditionsUrl = termsConditionsUrl;
  },
  setPrivacyPolicyUrl(privacyPolicyUrl) {
    state$p.privacyPolicyUrl = privacyPolicyUrl;
  },
  setCustomWallets(customWallets) {
    state$p.customWallets = customWallets;
  },
  setIsSiweEnabled(isSiweEnabled) {
    state$p.isSiweEnabled = isSiweEnabled;
  },
  setIsUniversalProvider(isUniversalProvider) {
    state$p.isUniversalProvider = isUniversalProvider;
  },
  setSdkVersion(sdkVersion) {
    state$p.sdkVersion = sdkVersion;
  },
  setMetadata(metadata) {
    state$p.metadata = metadata;
  },
  setDisableAppend(disableAppend) {
    state$p.disableAppend = disableAppend;
  },
  setEIP6963Enabled(enableEIP6963) {
    state$p.enableEIP6963 = enableEIP6963;
  },
  setEnableInjected(enableInjected) {
    state$p.enableInjected = enableInjected;
  },
  setEnableCoinbase(enableCoinbase) {
    state$p.enableCoinbase = enableCoinbase;
  },
  setEnableBaseAccount(enableBaseAccount) {
    state$p.enableBaseAccount = enableBaseAccount;
  },
  setDebug(debug) {
    state$p.debug = debug;
  },
  setEnableWalletGuide(enableWalletGuide) {
    state$p.enableWalletGuide = enableWalletGuide;
  },
  setEnableAuthLogger(enableAuthLogger) {
    state$p.enableAuthLogger = enableAuthLogger;
  },
  setEnableWallets(enableWallets) {
    state$p.enableWallets = enableWallets;
  },
  setPreferUniversalLinks(preferUniversalLinks) {
    state$p.experimental_preferUniversalLinks = preferUniversalLinks;
  },
  setSIWX(siwx) {
    if (siwx) {
      for (const [key, isVal] of Object.entries(ConstantsUtil.SIWX_DEFAULTS)) {
        siwx[key] ??= isVal;
      }
    }
    state$p.siwx = siwx;
  },
  setConnectMethodsOrder(connectMethodsOrder) {
    state$p.features = {
      ...state$p.features,
      connectMethodsOrder
    };
  },
  setWalletFeaturesOrder(walletFeaturesOrder) {
    state$p.features = {
      ...state$p.features,
      walletFeaturesOrder
    };
  },
  setSocialsOrder(socialsOrder) {
    state$p.remoteFeatures = {
      ...state$p.remoteFeatures,
      socials: socialsOrder
    };
  },
  setCollapseWallets(collapseWallets) {
    state$p.features = {
      ...state$p.features,
      collapseWallets
    };
  },
  setEnableEmbedded(enableEmbedded) {
    state$p.enableEmbedded = enableEmbedded;
  },
  setAllowUnsupportedChain(allowUnsupportedChain) {
    state$p.allowUnsupportedChain = allowUnsupportedChain;
  },
  setManualWCControl(manualWCControl) {
    state$p.manualWCControl = manualWCControl;
  },
  setEnableNetworkSwitch(enableNetworkSwitch) {
    state$p.enableNetworkSwitch = enableNetworkSwitch;
  },
  setEnableMobileFullScreen(enableMobileFullScreen) {
    state$p.enableMobileFullScreen = CoreHelperUtil.isMobile() && enableMobileFullScreen;
  },
  setEnableReconnect(enableReconnect) {
    state$p.enableReconnect = enableReconnect;
  },
  setCoinbasePreference(coinbasePreference) {
    state$p.coinbasePreference = coinbasePreference;
  },
  setDefaultAccountTypes(defaultAccountType = {}) {
    Object.entries(defaultAccountType).forEach(([namespace, accountType]) => {
      if (accountType) {
        state$p.defaultAccountTypes[namespace] = accountType;
      }
    });
  },
  setUniversalProviderConfigOverride(universalProviderConfigOverride) {
    state$p.universalProviderConfigOverride = universalProviderConfigOverride;
  },
  getUniversalProviderConfigOverride() {
    return state$p.universalProviderConfigOverride;
  },
  getSnapshot() {
    return snapshot(state$p);
  }
};
const DEFAULT_STATE$2 = Object.freeze({
  message: "",
  variant: "success",
  svg: void 0,
  open: false,
  autoClose: true
});
const state$o = proxy({
  ...DEFAULT_STATE$2
});
const controller$e = {
  state: state$o,
  subscribeKey(key, callback) {
    return subscribeKey(state$o, key, callback);
  },
  showLoading(message, options = {}) {
    this._showMessage({ message, variant: "loading", ...options });
  },
  showSuccess(message) {
    this._showMessage({ message, variant: "success" });
  },
  showSvg(message, svg) {
    this._showMessage({ message, svg });
  },
  showError(message) {
    const errorMessage = CoreHelperUtil.parseError(message);
    this._showMessage({ message: errorMessage, variant: "error" });
  },
  hide() {
    state$o.message = DEFAULT_STATE$2.message;
    state$o.variant = DEFAULT_STATE$2.variant;
    state$o.svg = DEFAULT_STATE$2.svg;
    state$o.open = DEFAULT_STATE$2.open;
    state$o.autoClose = DEFAULT_STATE$2.autoClose;
  },
  _showMessage({ message, svg, variant = "success", autoClose = DEFAULT_STATE$2.autoClose }) {
    if (state$o.open) {
      state$o.open = false;
      setTimeout(() => {
        state$o.message = message;
        state$o.variant = variant;
        state$o.svg = svg;
        state$o.open = true;
        state$o.autoClose = autoClose;
      }, 150);
    } else {
      state$o.message = message;
      state$o.variant = variant;
      state$o.svg = svg;
      state$o.open = true;
      state$o.autoClose = autoClose;
    }
  }
};
const SnackController = controller$e;
const DEFAULT_OPTIONS = {
  purchaseCurrencies: [
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "USD Coin",
      symbol: "USDC",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    },
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "Ether",
      symbol: "ETH",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    }
  ],
  paymentCurrencies: [
    {
      id: "USD",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    },
    {
      id: "EUR",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    }
  ]
};
const baseUrl$2 = CoreHelperUtil.getBlockchainApiUrl();
const state$n = proxy({
  clientId: null,
  api: new FetchUtil({ baseUrl: baseUrl$2, clientId: null }),
  supportedChains: { http: [], ws: [] }
});
const BlockchainApiController = {
  state: state$n,
  async get(request) {
    const { st, sv } = BlockchainApiController.getSdkProperties();
    const projectId = OptionsController.state.projectId;
    const params = {
      ...request.params || {},
      st,
      sv,
      projectId
    };
    return state$n.api.get({
      ...request,
      params
    });
  },
  getSdkProperties() {
    const { sdkType, sdkVersion } = OptionsController.state;
    return {
      st: sdkType || "unknown",
      sv: sdkVersion || "unknown"
    };
  },
  async isNetworkSupported(networkId) {
    if (!networkId) {
      return false;
    }
    try {
      if (!state$n.supportedChains.http.length) {
        await BlockchainApiController.getSupportedNetworks();
      }
    } catch (e) {
      return false;
    }
    return state$n.supportedChains.http.includes(networkId);
  },
  async getSupportedNetworks() {
    try {
      const supportedChains = await BlockchainApiController.get({
        path: "v1/supported-chains"
      });
      state$n.supportedChains = supportedChains;
      return supportedChains;
    } catch {
      return state$n.supportedChains;
    }
  },
  async fetchIdentity({ address }) {
    const identityCache = StorageUtil.getIdentityFromCacheForAddress(address);
    if (identityCache) {
      return identityCache;
    }
    const result = await BlockchainApiController.get({
      path: `/v1/identity/${address}`,
      params: {
        sender: ChainController.state.activeCaipAddress ? CoreHelperUtil.getPlainAddress(ChainController.state.activeCaipAddress) : void 0
      }
    });
    StorageUtil.updateIdentityCache({
      address,
      identity: result,
      timestamp: Date.now()
    });
    return result;
  },
  async fetchTransactions({ account, cursor, signal, cache, chainId }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { data: [], next: void 0 };
    }
    const transactionsCache = StorageUtil.getTransactionsCacheForAddress({
      address: account,
      chainId
    });
    if (transactionsCache) {
      return transactionsCache;
    }
    const result = await BlockchainApiController.get({
      path: `/v1/account/${account}/history`,
      params: {
        cursor,
        chainId
      },
      signal,
      cache
    });
    StorageUtil.updateTransactionsCache({
      address: account,
      chainId,
      timestamp: Date.now(),
      transactions: result
    });
    return result;
  },
  async fetchSwapQuote({ amount, userAddress, from, to, gasPrice }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { quotes: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/quotes`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        amount,
        userAddress,
        from,
        to,
        gasPrice
      }
    });
  },
  async fetchSwapTokens({ chainId }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { tokens: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/tokens`,
      params: { chainId }
    });
  },
  async getAddressBalance({ caipNetworkId, address, method = "getAddressBalance", params }) {
    return state$n.api.post({
      path: `/v1?chainId=${caipNetworkId}&projectId=${OptionsController.state.projectId}`,
      body: {
        id: "1",
        jsonrpc: "2.0",
        method,
        params: params ?? { address }
      }
    }).then((result) => result.result);
  },
  async fetchTokenPrice({ addresses, caipNetworkId = ChainController.state.activeCaipNetwork?.caipNetworkId }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(caipNetworkId);
    if (!isSupported) {
      return { fungibles: [] };
    }
    const tokenPriceCache = StorageUtil.getTokenPriceCacheForAddresses(addresses);
    if (tokenPriceCache) {
      return tokenPriceCache;
    }
    const result = await state$n.api.post({
      path: "/v1/fungible/price",
      body: {
        currency: "usd",
        addresses,
        projectId: OptionsController.state.projectId
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    StorageUtil.updateTokenPriceCache({
      addresses,
      timestamp: Date.now(),
      tokenPrice: result
    });
    return result;
  },
  async fetchSwapAllowance({ tokenAddress, userAddress }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { allowance: "0" };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/allowance`,
      params: {
        tokenAddress,
        userAddress
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async fetchGasPrice({ chainId }) {
    const { st, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Gas Price");
    }
    return BlockchainApiController.get({
      path: `/v1/convert/gas-price`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        chainId,
        st,
        sv
      }
    });
  },
  async generateSwapCalldata({ amount, from, to, userAddress, disableEstimate }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Swaps");
    }
    return state$n.api.post({
      path: "/v1/convert/build-transaction",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        amount,
        eip155: {
          slippage: ConstantsUtil.CONVERT_SLIPPAGE_TOLERANCE
        },
        projectId: OptionsController.state.projectId,
        from,
        to,
        userAddress,
        disableEstimate
      }
    });
  },
  async generateApproveCalldata({ from, to, userAddress }) {
    const { st, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Swaps");
    }
    return BlockchainApiController.get({
      path: `/v1/convert/build-approve`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userAddress,
        from,
        to,
        st,
        sv
      }
    });
  },
  async getBalance(address, chainId, forceUpdate) {
    const { st, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      SnackController.showError("Token Balance Unavailable");
      return { balances: [] };
    }
    const caipAddress = `${chainId}:${address}`;
    const cachedBalance = StorageUtil.getBalanceCacheForCaipAddress(caipAddress);
    if (cachedBalance) {
      return cachedBalance;
    }
    const balance = await BlockchainApiController.get({
      path: `/v1/account/${address}/balance`,
      params: {
        currency: "usd",
        chainId,
        forceUpdate,
        st,
        sv
      }
    });
    StorageUtil.updateBalanceCache({
      caipAddress,
      balance,
      timestamp: Date.now()
    });
    return balance;
  },
  async lookupEnsName(name) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { addresses: {}, attributes: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/profile/account/${name}`,
      params: { apiVersion: "2" }
    });
  },
  async reverseLookupEnsName({ address }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return [];
    }
    const sender = ChainController.getAccountData()?.address;
    return BlockchainApiController.get({
      path: `/v1/profile/reverse/${address}`,
      params: {
        sender,
        apiVersion: "2"
      }
    });
  },
  async getEnsNameSuggestions(name) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { suggestions: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/profile/suggestions/${name}`,
      params: { zone: "reown.id" }
    });
  },
  async registerEnsName({ coinType, address, message, signature }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { success: false };
    }
    return state$n.api.post({
      path: `/v1/profile/account`,
      body: { coin_type: coinType, address, message, signature },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async generateOnRampURL({ destinationWallets, partnerUserId, defaultNetwork, purchaseAmount, paymentAmount }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return "";
    }
    const response = await state$n.api.post({
      path: `/v1/generators/onrampurl`,
      params: {
        projectId: OptionsController.state.projectId
      },
      body: {
        destinationWallets,
        defaultNetwork,
        partnerUserId,
        defaultExperience: "buy",
        presetCryptoAmount: purchaseAmount,
        presetFiatAmount: paymentAmount
      }
    });
    return response.url;
  },
  async getOnrampOptions() {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { paymentCurrencies: [], purchaseCurrencies: [] };
    }
    try {
      const response = await BlockchainApiController.get({
        path: `/v1/onramp/options`
      });
      return response;
    } catch (e) {
      return DEFAULT_OPTIONS;
    }
  },
  async getOnrampQuote({ purchaseCurrency, paymentCurrency, amount, network }) {
    try {
      const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
      if (!isSupported) {
        return null;
      }
      const response = await state$n.api.post({
        path: `/v1/onramp/quote`,
        params: {
          projectId: OptionsController.state.projectId
        },
        body: {
          purchaseCurrency,
          paymentCurrency,
          amount,
          network
        }
      });
      return response;
    } catch (e) {
      return {
        networkFee: { amount, currency: paymentCurrency.id },
        paymentSubtotal: { amount, currency: paymentCurrency.id },
        paymentTotal: { amount, currency: paymentCurrency.id },
        purchaseAmount: { amount, currency: paymentCurrency.id },
        quoteId: "mocked-quote-id"
      };
    }
  },
  async getSmartSessions(caipAddress) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return [];
    }
    return BlockchainApiController.get({
      path: `/v1/sessions/${caipAddress}`
    });
  },
  async revokeSmartSession(address, pci, signature) {
    const isSupported = await BlockchainApiController.isNetworkSupported(ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (!isSupported) {
      return { success: false };
    }
    return state$n.api.post({
      path: `/v1/sessions/${address}/revoke`,
      params: {
        projectId: OptionsController.state.projectId
      },
      body: {
        pci,
        signature
      }
    });
  },
  setClientId(clientId) {
    state$n.clientId = clientId;
    state$n.api = new FetchUtil({ baseUrl: baseUrl$2, clientId });
  }
};
const DEFAULT_STATE$1 = Object.freeze({
  enabled: true,
  events: []
});
const api$2 = new FetchUtil({ baseUrl: CoreHelperUtil.getAnalyticsUrl(), clientId: null });
const MAX_ERRORS_PER_MINUTE = 5;
const ONE_MINUTE_MS = 60 * 1e3;
const state$m = proxy({
  ...DEFAULT_STATE$1
});
const TelemetryController = {
  state: state$m,
  subscribeKey(key, callback) {
    return subscribeKey(state$m, key, callback);
  },
  async sendError(error, category) {
    if (!state$m.enabled) {
      return;
    }
    const now = Date.now();
    const recentErrors = state$m.events.filter((event) => {
      const eventTime = new Date(event.properties.timestamp || "").getTime();
      return now - eventTime < ONE_MINUTE_MS;
    });
    if (recentErrors.length >= MAX_ERRORS_PER_MINUTE) {
      return;
    }
    const errorEvent = {
      type: "error",
      event: category,
      properties: {
        errorType: error.name,
        errorMessage: error.message,
        stackTrace: error.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    state$m.events.push(errorEvent);
    try {
      if (typeof window === "undefined") {
        return;
      }
      const { projectId, sdkType, sdkVersion } = OptionsController.state;
      await api$2.post({
        path: "/e",
        params: {
          projectId,
          st: sdkType,
          sv: sdkVersion || "html-wagmi-4.2.2"
        },
        body: {
          eventId: CoreHelperUtil.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          props: {
            type: "error",
            event: category,
            errorType: error.name,
            errorMessage: error.message,
            stackTrace: error.stack
          }
        }
      });
    } catch {
    }
  },
  enable() {
    state$m.enabled = true;
  },
  disable() {
    state$m.enabled = false;
  },
  clearEvents() {
    state$m.events = [];
  }
};
class AppKitError extends Error {
  constructor(message, category, originalError) {
    super(message);
    this.originalName = "AppKitError";
    this.name = "AppKitError";
    this.category = category;
    this.originalError = originalError;
    if (originalError && originalError instanceof Error) {
      this.originalName = originalError.name;
    }
    Object.setPrototypeOf(this, AppKitError.prototype);
    let isStackConstructedFromOriginal = false;
    if (originalError instanceof Error && typeof originalError.stack === "string" && originalError.stack) {
      const originalErrorStack = originalError.stack;
      const firstNewlineIndex = originalErrorStack.indexOf("\n");
      if (firstNewlineIndex > -1) {
        const originalFrames = originalErrorStack.substring(firstNewlineIndex + 1);
        this.stack = `${this.name}: ${this.message}
${originalFrames}`;
        isStackConstructedFromOriginal = true;
      }
    }
    if (!isStackConstructedFromOriginal) {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AppKitError);
      } else if (!this.stack) {
        this.stack = `${this.name}: ${this.message}`;
      }
    }
  }
}
function errorHandler(err, defaultCategory) {
  let errMessage = "";
  try {
    if (err instanceof Error) {
      errMessage = err.message;
    } else if (typeof err === "string") {
      errMessage = err;
    } else if (typeof err === "object" && err !== null) {
      if (Object.keys(err).length === 0) {
        errMessage = "Unknown error";
      } else {
        errMessage = err?.message || JSON.stringify(err);
      }
    } else {
      errMessage = String(err);
    }
  } catch (_error) {
    errMessage = "Unknown error";
    console.error("Error parsing error message", _error);
  }
  const error = err instanceof AppKitError ? err : new AppKitError(errMessage, defaultCategory, err);
  TelemetryController.sendError(error, error.category);
  throw error;
}
function withErrorBoundary(controller2, defaultCategory = "INTERNAL_SDK_ERROR") {
  const newController = {};
  Object.keys(controller2).forEach((key) => {
    const original = controller2[key];
    if (typeof original === "function") {
      let wrapped = original;
      if (original.constructor.name === "AsyncFunction") {
        wrapped = async (...args) => {
          try {
            return await original(...args);
          } catch (err) {
            return errorHandler(err, defaultCategory);
          }
        };
      } else {
        wrapped = (...args) => {
          try {
            return original(...args);
          } catch (err) {
            return errorHandler(err, defaultCategory);
          }
        };
      }
      newController[key] = wrapped;
    } else {
      newController[key] = original;
    }
  });
  return newController;
}
const state$l = proxy({
  walletImages: {},
  networkImages: {},
  chainImages: {},
  connectorImages: {},
  tokenImages: {},
  currencyImages: {}
});
const controller$d = {
  state: state$l,
  subscribeNetworkImages(callback) {
    return subscribe(state$l.networkImages, () => callback(state$l.networkImages));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$l, key, callback);
  },
  subscribe(callback) {
    return subscribe(state$l, () => callback(state$l));
  },
  setWalletImage(key, value) {
    state$l.walletImages[key] = value;
  },
  setNetworkImage(key, value) {
    state$l.networkImages[key] = value;
  },
  setChainImage(key, value) {
    state$l.chainImages[key] = value;
  },
  setConnectorImage(key, value) {
    state$l.connectorImages = { ...state$l.connectorImages, [key]: value };
  },
  setTokenImage(key, value) {
    state$l.tokenImages[key] = value;
  },
  setCurrencyImage(key, value) {
    state$l.currencyImages[key] = value;
  }
};
const AssetController = withErrorBoundary(controller$d);
const namespaceImageIds = {
  // Ethereum
  eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
  // Solana
  solana: "a1b58899-f671-4276-6a5e-56ca5bd59700",
  // Polkadot
  polkadot: "",
  // Bitcoin
  bip122: "0b4838db-0161-4ffe-022d-532bf03dba00",
  // Cosmos
  cosmos: "",
  // Sui
  sui: "",
  // Stacks
  stacks: "",
  // TON
  ton: "20f673c0-095e-49b2-07cf-eb5049dcf600",
  // TRON
  tron: "3502bb86-cc4e-420f-a387-59ea63a28b00"
};
const state$k = proxy({
  networkImagePromises: {},
  tokenImagePromises: {}
});
const AssetUtil = {
  async fetchWalletImage(imageId) {
    if (!imageId) {
      return void 0;
    }
    await ApiController._fetchWalletImage(imageId);
    return this.getWalletImageById(imageId);
  },
  async fetchNetworkImage(imageId) {
    if (!imageId) {
      return void 0;
    }
    const existingImage = this.getNetworkImageById(imageId);
    if (existingImage) {
      return existingImage;
    }
    if (!state$k.networkImagePromises[imageId]) {
      state$k.networkImagePromises[imageId] = ApiController._fetchNetworkImage(imageId);
    }
    await state$k.networkImagePromises[imageId];
    return this.getNetworkImageById(imageId);
  },
  /**
   * Fetches the token image for the given image ID.
   * @param imageId - The image id of the token.
   * @returns The token image.
   */
  async fetchTokenImage(imageId) {
    if (!imageId) {
      return void 0;
    }
    if (!state$k.tokenImagePromises[imageId]) {
      state$k.tokenImagePromises[imageId] = ApiController._fetchTokenImage(imageId);
    }
    await state$k.tokenImagePromises[imageId];
    return this.getTokenImage(imageId);
  },
  getWalletImageById(imageId) {
    if (!imageId) {
      return void 0;
    }
    return AssetController.state.walletImages[imageId];
  },
  getWalletImage(wallet) {
    if (wallet?.image_url) {
      return wallet?.image_url;
    }
    if (wallet?.image_id) {
      return AssetController.state.walletImages[wallet.image_id];
    }
    return void 0;
  },
  getNetworkImage(network) {
    if (network?.assets?.imageUrl) {
      return network?.assets?.imageUrl;
    }
    if (network?.assets?.imageId) {
      return AssetController.state.networkImages[network.assets.imageId];
    }
    return void 0;
  },
  getNetworkImageById(imageId) {
    if (!imageId) {
      return void 0;
    }
    return AssetController.state.networkImages[imageId];
  },
  getConnectorImage(connector) {
    if (connector?.imageUrl) {
      return connector.imageUrl;
    }
    if (connector?.info?.icon) {
      return connector.info.icon;
    }
    if (connector?.imageId) {
      return AssetController.state.connectorImages[connector.imageId];
    }
    return void 0;
  },
  getChainImage(chain) {
    return AssetController.state.networkImages[namespaceImageIds[chain]];
  },
  getTokenImage(symbol) {
    if (!symbol) {
      return void 0;
    }
    return AssetController.state.tokenImages[symbol];
  },
  /**
   * Get the explorer wallet's image URL for the given image ID.
   * @param imageId - The image id of the wallet.
   * @returns The image URL for the wallet.
   */
  getWalletImageUrl(imageId) {
    if (!imageId) {
      return "";
    }
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    const url = new URL(`${ConstantsUtil$1.W3M_API_URL}/getWalletImage/${imageId}`);
    url.searchParams.set("projectId", projectId);
    url.searchParams.set("st", sdkType);
    url.searchParams.set("sv", sdkVersion);
    return url.toString();
  },
  /**
   * Get the public asset's image URL with the given image ID.
   * @param imageId - The image id of the asset.
   * @returns The image URL for the asset.
   */
  getAssetImageUrl(imageId) {
    if (!imageId) {
      return "";
    }
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    const url = new URL(`${ConstantsUtil$1.W3M_API_URL}/public/getAssetImage/${imageId}`);
    url.searchParams.set("projectId", projectId);
    url.searchParams.set("st", sdkType);
    url.searchParams.set("sv", sdkVersion);
    return url.toString();
  },
  /**
   * Get the image URL for the given chain namespace.
   * @param chainNamespace - The chain namespace to get the image URL for.
   * @returns The image URL for the chain namespace.
   */
  getChainNamespaceImageUrl(chainNamespace) {
    return this.getAssetImageUrl(namespaceImageIds[chainNamespace]);
  },
  /**
   * Get the image id for the given token and namespace.
   * @param token - The token address or 'native' to get the image id for.
   * @param namespace - The namespace to get the image id for.
   * @returns The image URL for the token.
   */
  async getImageByToken(token, namespace) {
    if (token === "native") {
      const imageId = ConstantsUtil$1.NATIVE_IMAGE_IDS_BY_NAMESPACE[namespace] ?? null;
      if (!imageId) {
        return void 0;
      }
      return AssetUtil.fetchNetworkImage(imageId);
    }
    const [, symbol] = Object.entries(ConstantsUtil$1.TOKEN_SYMBOLS_BY_ADDRESS).find(([address]) => address.toLowerCase() === token.toLowerCase()) ?? [];
    if (!symbol) {
      return void 0;
    }
    return AssetUtil.fetchTokenImage(symbol);
  }
};
const CUSTOM_DEEPLINK_WALLETS = {
  PHANTOM: {
    id: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    url: "https://phantom.app",
    androidPackage: "app.phantom"
  },
  SOLFLARE: {
    id: "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
    url: "https://solflare.com"
  },
  COINBASE: {
    id: "d0ca99ff52b99abc48743dad0f7fc891e041be73574f7fac4afe5d4bb83845c8",
    url: "https://go.cb-w.com",
    evmDeeplink: "cbwallet://miniapp"
  },
  /*
   * Got details from their npm package:
   * https://www.npmjs.com/package/@binance/w3w-utils?activeTab=code
   * https://developers.binance.com/docs/binance-w3w/evm-compatible-provider#getdeeplink
   */
  BINANCE: {
    id: "2fafea35bb471d22889ccb49c08d99dd0a18a37982602c33f696a5723934ba25",
    appId: "yFK5FCqYprrXDiVFbhyRx7",
    deeplink: "bnc://app.binance.com/mp/app",
    url: "https://app.binance.com/en/download"
  }
};
const MobileWalletUtil = {
  /**
   * Checks if a wallet is a custom deeplink wallet that uses Universal Links
   * instead of WalletConnect deeplinks for the given chain namespace.
   *
   * Only returns true for supported wallet-chain combinations:
   * - Phantom: Solana, EVM, and Bitcoin (doesn't support WalletConnect)
   * - Solflare: Solana only
   * - Coinbase: Solana and EVM
   * - Binance: Bitcoin only
   *
   * @param {string} id - The id of the wallet.
   * @param {ChainControllerState['activeChain']} namespace - The chain namespace.
   * @returns {boolean} Whether the wallet is a custom deeplink wallet for the given namespace.
   */
  isCustomDeeplinkWallet(id, namespace) {
    if (id === CUSTOM_DEEPLINK_WALLETS.PHANTOM.id) {
      return namespace === ConstantsUtil$1.CHAIN.SOLANA || namespace === ConstantsUtil$1.CHAIN.EVM || namespace === ConstantsUtil$1.CHAIN.BITCOIN;
    }
    if (id === CUSTOM_DEEPLINK_WALLETS.SOLFLARE.id) {
      return namespace === ConstantsUtil$1.CHAIN.SOLANA;
    }
    if (id === CUSTOM_DEEPLINK_WALLETS.COINBASE.id) {
      return namespace === ConstantsUtil$1.CHAIN.SOLANA || namespace === ConstantsUtil$1.CHAIN.EVM;
    }
    if (id === CUSTOM_DEEPLINK_WALLETS.BINANCE.id) {
      return namespace === ConstantsUtil$1.CHAIN.BITCOIN;
    }
    return false;
  },
  /**
   * Handles mobile wallet redirection for wallets that have Universal Links and doesn't support WalletConnect Deep Links.
   *
   * @param {string} id - The id of the wallet.
   * @param {ChainNamespace} namespace - The namespace of the chain.
   * @param {object} options - Optional configuration.
   * @param {boolean} options.isCoinbaseDisabled - Whether Coinbase wallet is disabled. When true, always trigger deeplink.
   */
  handleMobileDeeplinkRedirect(id, namespace, options) {
    const href = window.location.href;
    const encodedHref = encodeURIComponent(href);
    const isCoinbaseDisabled = options?.isCoinbaseDisabled ?? false;
    if (id === CUSTOM_DEEPLINK_WALLETS.PHANTOM.id && !("phantom" in window)) {
      const protocol = href.startsWith("https") ? "https" : "http";
      const host = href.split("/")[2];
      const encodedRef = encodeURIComponent(`${protocol}://${host}`);
      const browseUrl = `${CUSTOM_DEEPLINK_WALLETS.PHANTOM.url}/ul/browse/${encodedHref}?ref=${encodedRef}`;
      if (CoreHelperUtil.isAndroid()) {
        const intentUrl = `intent://browse/${encodedHref}?ref=${encodedRef}#Intent;scheme=phantom;package=${CUSTOM_DEEPLINK_WALLETS.PHANTOM.androidPackage};end`;
        window.location.href = intentUrl;
      } else {
        window.location.href = browseUrl;
      }
    }
    if (id === CUSTOM_DEEPLINK_WALLETS.SOLFLARE.id && namespace === ConstantsUtil$1.CHAIN.SOLANA && !("solflare" in window)) {
      window.location.href = `${CUSTOM_DEEPLINK_WALLETS.SOLFLARE.url}/ul/v1/browse/${encodedHref}?ref=${encodedHref}`;
    }
    if (namespace === ConstantsUtil$1.CHAIN.SOLANA) {
      if (id === CUSTOM_DEEPLINK_WALLETS.COINBASE.id && (isCoinbaseDisabled || !("coinbaseSolana" in window))) {
        window.location.href = `${CUSTOM_DEEPLINK_WALLETS.COINBASE.url}/dapp?cb_url=${encodedHref}`;
      }
    }
    if (namespace === ConstantsUtil$1.CHAIN.EVM) {
      if (id === CUSTOM_DEEPLINK_WALLETS.COINBASE.id && (isCoinbaseDisabled || !("coinbaseWalletExtension" in window))) {
        window.location.href = `${CUSTOM_DEEPLINK_WALLETS.COINBASE.evmDeeplink}?url=${encodedHref}`;
      }
    }
    if (namespace === ConstantsUtil$1.CHAIN.BITCOIN) {
      if (id === CUSTOM_DEEPLINK_WALLETS.BINANCE.id && !("binancew3w" in window)) {
        const activeCaipNetwork = ChainController.state.activeCaipNetwork;
        const startPagePath = window.btoa("/pages/browser/index");
        const startPageQuery = window.btoa(`url=${encodedHref}&defaultChainId=${activeCaipNetwork?.id ?? 1}`);
        const deeplink = new URL(CUSTOM_DEEPLINK_WALLETS.BINANCE.deeplink);
        deeplink.searchParams.set("appId", CUSTOM_DEEPLINK_WALLETS.BINANCE.appId);
        deeplink.searchParams.set("startPagePath", startPagePath);
        deeplink.searchParams.set("startPageQuery", startPageQuery);
        const universalLink = new URL(CUSTOM_DEEPLINK_WALLETS.BINANCE.url);
        universalLink.searchParams.set("_dp", window.btoa(deeplink.toString()));
        window.location.href = universalLink.toString();
      }
    }
  }
};
const baseUrl$1 = CoreHelperUtil.getAnalyticsUrl();
const api$1 = new FetchUtil({ baseUrl: baseUrl$1, clientId: null });
const excluded = ["MODAL_CREATED"];
const MAX_PENDING_EVENTS_KB = 45;
const FLUSH_EVENTS_INTERVAL_MS = 1e3 * 10;
const state$j = proxy({
  timestamp: Date.now(),
  lastFlush: Date.now(),
  reportedErrors: {},
  data: {
    type: "track",
    event: "MODAL_CREATED"
  },
  pendingEvents: [],
  subscribedToVisibilityChange: false,
  walletImpressions: []
});
const EventsController = {
  state: state$j,
  subscribe(callback) {
    return subscribe(state$j, () => callback(state$j));
  },
  getSdkProperties() {
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    return {
      projectId,
      st: sdkType,
      sv: sdkVersion || "html-wagmi-4.2.2"
    };
  },
  shouldFlushEvents() {
    const isOverMaxSize = JSON.stringify(state$j.pendingEvents).length / 1024 > MAX_PENDING_EVENTS_KB;
    const isExpired = state$j.lastFlush + FLUSH_EVENTS_INTERVAL_MS < Date.now();
    return isOverMaxSize || isExpired;
  },
  _setPendingEvent(payload) {
    try {
      let address = ChainController.getAccountData()?.address;
      if ("address" in payload.data && payload.data.address) {
        address = payload.data.address;
      }
      if (excluded.includes(payload.data.event) || typeof window === "undefined") {
        return;
      }
      const caipNetworkId = ChainController.getActiveCaipNetwork()?.caipNetworkId;
      this.state.pendingEvents.push({
        eventId: CoreHelperUtil.getUUID(),
        url: window.location.href,
        domain: window.location.hostname,
        timestamp: payload.timestamp,
        props: {
          ...payload.data,
          address,
          properties: {
            ..."properties" in payload.data ? payload.data.properties : {},
            caipNetworkId
          }
        }
      });
      state$j.reportedErrors["FORBIDDEN"] = false;
      const shouldFlush = EventsController.shouldFlushEvents();
      if (shouldFlush) {
        EventsController._submitPendingEvents();
      }
    } catch (err) {
      console.warn("_setPendingEvent", err);
    }
  },
  sendEvent(data) {
    state$j.timestamp = Date.now();
    state$j.data = data;
    const MANDATORY_EVENTS = [
      "INITIALIZE",
      "CONNECT_SUCCESS",
      "SOCIAL_LOGIN_SUCCESS"
    ];
    if (OptionsController.state.features?.analytics || MANDATORY_EVENTS.includes(data.event)) {
      EventsController._setPendingEvent(state$j);
    }
    this.subscribeToFlushTriggers();
  },
  /**
   * Adds a wallet impression item to the aggregated list. These are flushed as a single
   * WALLET_IMPRESSION_V2 batch in _submitPendingEvents.
   */
  sendWalletImpressionEvent(item) {
    state$j.walletImpressions.push(item);
  },
  _transformPendingEventsForBatch(events) {
    try {
      return events.filter((evt) => {
        const eventName = evt.props.event;
        return eventName !== "WALLET_IMPRESSION_V2";
      });
    } catch {
      return events;
    }
  },
  _submitPendingEvents() {
    state$j.lastFlush = Date.now();
    if (state$j.pendingEvents.length === 0 && state$j.walletImpressions.length === 0) {
      return;
    }
    try {
      const batch = EventsController._transformPendingEventsForBatch(state$j.pendingEvents);
      if (state$j.walletImpressions.length) {
        batch.push({
          eventId: CoreHelperUtil.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: Date.now(),
          props: {
            type: "track",
            event: "WALLET_IMPRESSION_V2",
            items: [...state$j.walletImpressions]
          }
        });
      }
      api$1.sendBeacon({
        path: "/batch",
        params: EventsController.getSdkProperties(),
        body: batch
      });
      state$j.reportedErrors["FORBIDDEN"] = false;
      state$j.pendingEvents = [];
      state$j.walletImpressions = [];
    } catch (err) {
      state$j.reportedErrors["FORBIDDEN"] = true;
    }
  },
  subscribeToFlushTriggers() {
    if (state$j.subscribedToVisibilityChange) {
      return;
    }
    if (typeof document === "undefined") {
      return;
    }
    state$j.subscribedToVisibilityChange = true;
    document?.addEventListener?.("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        EventsController._submitPendingEvents();
      }
    });
    document?.addEventListener?.("freeze", () => {
      EventsController._submitPendingEvents();
    });
    window?.addEventListener?.("pagehide", () => {
      EventsController._submitPendingEvents();
    });
    setInterval(() => {
      EventsController._submitPendingEvents();
    }, FLUSH_EVENTS_INTERVAL_MS);
  }
};
const baseUrl = CoreHelperUtil.getApiUrl();
const api = new FetchUtil({
  baseUrl,
  clientId: null
});
const entries = 40;
const recommendedEntries = 4;
const imageCountToFetch = 20;
const state$i = proxy({
  promises: {},
  page: 1,
  count: 0,
  featured: [],
  allFeatured: [],
  recommended: [],
  allRecommended: [],
  wallets: [],
  filteredWallets: [],
  search: [],
  isAnalyticsEnabled: false,
  excludedWallets: [],
  isFetchingRecommendedWallets: false,
  explorerWallets: [],
  explorerFilteredWallets: [],
  plan: {
    tier: "none",
    hasExceededUsageLimit: false,
    limits: {
      isAboveRpcLimit: false,
      isAboveMauLimit: false
    }
  }
});
const ApiController = {
  state: state$i,
  subscribeKey(key, callback) {
    return subscribeKey(state$i, key, callback);
  },
  _getSdkProperties() {
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    return {
      projectId,
      st: sdkType || "appkit",
      sv: sdkVersion || "html-wagmi-4.2.2"
    };
  },
  _filterOutExtensions(wallets) {
    if (OptionsController.state.isUniversalProvider) {
      return wallets.filter((w) => Boolean(w.mobile_link || w.desktop_link || w.webapp_link));
    }
    return wallets;
  },
  async _fetchWalletImage(imageId) {
    const imageUrl = `${api.baseUrl}/getWalletImage/${imageId}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setWalletImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchNetworkImage(imageId) {
    const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setNetworkImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchConnectorImage(imageId) {
    const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setConnectorImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchCurrencyImage(countryCode) {
    const imageUrl = `${api.baseUrl}/public/getCurrencyImage/${countryCode}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setCurrencyImage(countryCode, URL.createObjectURL(blob));
  },
  async _fetchTokenImage(symbol) {
    const imageUrl = `${api.baseUrl}/public/getTokenImage/${symbol}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setTokenImage(symbol, URL.createObjectURL(blob));
  },
  _filterWalletsByPlatform(wallets) {
    const walletsLength = wallets.length;
    const filteredWallets = CoreHelperUtil.isMobile() ? wallets?.filter((w) => {
      if (w.mobile_link || w.webapp_link) {
        return true;
      }
      const customDeeplinkWalletIds = Object.values(CUSTOM_DEEPLINK_WALLETS).map((wallet) => wallet.id);
      return customDeeplinkWalletIds.includes(w.id);
    }) : wallets;
    const mobileFilteredOutWalletsLength = walletsLength - filteredWallets.length;
    return { filteredWallets, mobileFilteredOutWalletsLength };
  },
  async fetchProjectConfig() {
    const response = await api.get({
      path: "/appkit/v1/config",
      params: ApiController._getSdkProperties()
    });
    return response.features;
  },
  async fetchUsage() {
    try {
      const response = await api.get({
        path: "/appkit/v1/project-limits",
        params: ApiController._getSdkProperties()
      });
      const { tier, isAboveMauLimit, isAboveRpcLimit } = response.planLimits;
      const isStarterPlan = tier === "starter";
      const isAboveUsageLimit = isAboveMauLimit || isAboveRpcLimit;
      ApiController.state.plan = {
        tier,
        hasExceededUsageLimit: isStarterPlan && isAboveUsageLimit,
        limits: {
          isAboveRpcLimit,
          isAboveMauLimit
        }
      };
    } catch (e) {
      console.warn("Failed to fetch usage", e);
    }
  },
  async fetchAllowedOrigins() {
    try {
      const { allowedOrigins } = await api.get({
        path: "/projects/v1/origins",
        params: ApiController._getSdkProperties()
      });
      return allowedOrigins;
    } catch (error) {
      if (error instanceof Error && error.cause instanceof Response) {
        const status = error.cause.status;
        if (status === ConstantsUtil$1.HTTP_STATUS_CODES.TOO_MANY_REQUESTS) {
          throw new Error("RATE_LIMITED", { cause: error });
        }
        if (status >= ConstantsUtil$1.HTTP_STATUS_CODES.SERVER_ERROR && status < 600) {
          throw new Error("SERVER_ERROR", { cause: error });
        }
        return [];
      }
      return [];
    }
  },
  async fetchNetworkImages() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const ids = requestedCaipNetworks?.map(({ assets: assets2 }) => assets2?.imageId).filter(Boolean).filter((imageId) => !AssetUtil.getNetworkImageById(imageId));
    if (ids) {
      await Promise.allSettled(ids.map((id) => ApiController._fetchNetworkImage(id)));
    }
  },
  async fetchConnectorImages() {
    const { connectors } = ConnectorController.state;
    const ids = connectors.map(({ imageId }) => imageId).filter(Boolean);
    await Promise.allSettled(ids.map((id) => ApiController._fetchConnectorImage(id)));
  },
  async fetchCurrencyImages(currencies = []) {
    await Promise.allSettled(currencies.map((currency) => ApiController._fetchCurrencyImage(currency)));
  },
  async fetchTokenImages(tokens = []) {
    await Promise.allSettled(tokens.map((token) => ApiController._fetchTokenImage(token)));
  },
  async fetchWallets(params) {
    const exclude = params.exclude ?? [];
    const sdkProperties = ApiController._getSdkProperties();
    if (sdkProperties.sv.startsWith("html-core-")) {
      exclude.push(...Object.values(CUSTOM_DEEPLINK_WALLETS).map((w) => w.id));
    }
    const wallets = await api.get({
      path: "/getWallets",
      params: {
        ...ApiController._getSdkProperties(),
        ...params,
        page: String(params.page),
        entries: String(params.entries),
        include: params.include?.join(",") || void 0,
        exclude: exclude.join(",") || void 0
      }
    });
    const { filteredWallets, mobileFilteredOutWalletsLength } = ApiController._filterWalletsByPlatform(wallets?.data);
    return {
      data: filteredWallets || [],
      // Keep original count for display on main page
      count: wallets?.count,
      mobileFilteredOutWalletsLength
    };
  },
  async prefetchWalletRanks() {
    const connectors = ConnectorController.state.connectors;
    if (!connectors?.length) {
      return;
    }
    const params = {
      page: 1,
      entries: 20,
      badge: "certified"
    };
    params.names = connectors.map((c) => c.name).join(",");
    if (ChainController.state.activeChain === ConstantsUtil$1.CHAIN.EVM) {
      const rdnsCandidates = [
        ...connectors.flatMap((c) => c.connectors?.map((sc) => sc.info?.rdns) || []),
        ...connectors.map((c) => c.info?.rdns)
      ].filter((val) => typeof val === "string" && val.length > 0);
      if (rdnsCandidates.length) {
        params.rdns = rdnsCandidates.join(",");
      }
    }
    const { data } = await ApiController.fetchWallets(params);
    state$i.explorerWallets = data;
    ConnectorController.extendConnectorsWithExplorerWallets(data);
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    state$i.explorerFilteredWallets = data.filter((wallet) => wallet.chains?.some((chain) => caipNetworkIds.includes(chain)));
  },
  async fetchFeaturedWallets() {
    const { featuredWalletIds } = OptionsController.state;
    if (featuredWalletIds?.length) {
      const params = {
        ...ApiController._getSdkProperties(),
        page: 1,
        entries: featuredWalletIds?.length ?? recommendedEntries,
        include: featuredWalletIds
      };
      const { data } = await ApiController.fetchWallets(params);
      const sortedData = [...data].sort((a, b) => featuredWalletIds.indexOf(a.id) - featuredWalletIds.indexOf(b.id));
      const images = sortedData.map((d) => d.image_id).filter(Boolean);
      await Promise.allSettled(images.map((id) => ApiController._fetchWalletImage(id)));
      state$i.featured = sortedData;
      state$i.allFeatured = sortedData;
    }
  },
  async fetchRecommendedWallets() {
    try {
      state$i.isFetchingRecommendedWallets = true;
      const { includeWalletIds, excludeWalletIds, featuredWalletIds } = OptionsController.state;
      const exclude = [...excludeWalletIds ?? [], ...featuredWalletIds ?? []].filter(Boolean);
      const chains = ChainController.getRequestedCaipNetworkIds().join(",");
      const params = {
        page: 1,
        entries: recommendedEntries,
        include: includeWalletIds,
        exclude,
        chains
      };
      const { data, count } = await ApiController.fetchWallets(params);
      const recent = StorageUtil.getRecentWallets();
      const recommendedImages = data.map((d) => d.image_id).filter(Boolean);
      const recentImages = recent.map((r) => r.image_id).filter(Boolean);
      await Promise.allSettled([...recommendedImages, ...recentImages].map((id) => ApiController._fetchWalletImage(id)));
      state$i.recommended = data;
      state$i.allRecommended = data;
      state$i.count = count ?? 0;
    } catch {
    } finally {
      state$i.isFetchingRecommendedWallets = false;
    }
  },
  async fetchWalletsByPage({ page, entries: entriesOverride, badge, include: includeOverride, exclude: excludeOverride }) {
    const { includeWalletIds, excludeWalletIds, featuredWalletIds } = OptionsController.state;
    const chains = ChainController.getRequestedCaipNetworkIds().join(",");
    const defaultExclude = [
      ...state$i.recommended.map(({ id }) => id),
      ...excludeWalletIds ?? [],
      ...featuredWalletIds ?? []
    ].filter(Boolean);
    const params = {
      page,
      entries: entriesOverride ?? entries,
      include: includeOverride ?? includeWalletIds,
      exclude: excludeOverride ?? defaultExclude,
      badge_type: badge,
      chains
    };
    const { data, count, mobileFilteredOutWalletsLength } = await ApiController.fetchWallets(params);
    state$i.mobileFilteredOutWalletsLength = mobileFilteredOutWalletsLength + (state$i.mobileFilteredOutWalletsLength ?? 0);
    const images = data.slice(0, imageCountToFetch).map((w) => w.image_id).filter(Boolean);
    await Promise.allSettled(images.map((id) => ApiController._fetchWalletImage(id)));
    state$i.wallets = CoreHelperUtil.uniqueBy([...state$i.wallets, ...ApiController._filterOutExtensions(data)], "id").filter((w) => w.chains?.some((chain) => chains.includes(chain)));
    state$i.count = count > state$i.count ? count : state$i.count;
    state$i.page = page;
  },
  async initializeExcludedWallets({ ids }) {
    const params = {
      page: 1,
      entries: ids.length,
      include: ids
    };
    const { data } = await ApiController.fetchWallets(params);
    if (data) {
      data.forEach((wallet) => {
        state$i.excludedWallets.push({ rdns: wallet.rdns, name: wallet.name });
      });
    }
  },
  async searchWallet({ search, badge, entries: entriesOverride, page: pageOverride, include: includeOverride, exclude: excludeOverride }) {
    const { includeWalletIds, excludeWalletIds } = OptionsController.state;
    const chains = ChainController.getRequestedCaipNetworkIds().join(",");
    state$i.search = [];
    const params = {
      page: pageOverride ?? 1,
      entries: entriesOverride ?? 100,
      search: search?.trim() || void 0,
      badge_type: badge,
      include: includeOverride ?? includeWalletIds,
      exclude: excludeOverride ?? excludeWalletIds,
      chains
    };
    const { data } = await ApiController.fetchWallets(params);
    EventsController.sendEvent({
      type: "track",
      event: "SEARCH_WALLET",
      properties: { badge: badge ?? "", search: search ?? "" }
    });
    const images = data.map((w) => w.image_id).filter(Boolean);
    await Promise.allSettled([
      ...images.map((id) => ApiController._fetchWalletImage(id)),
      CoreHelperUtil.wait(300)
    ]);
    state$i.search = ApiController._filterOutExtensions(data);
  },
  initPromise(key, fetchFn) {
    const existingPromise = state$i.promises[key];
    if (existingPromise) {
      return existingPromise;
    }
    return state$i.promises[key] = fetchFn();
  },
  prefetch({ fetchConnectorImages = true, fetchFeaturedWallets = true, fetchRecommendedWallets = true, fetchNetworkImages = true, fetchWalletRanks = true } = {}) {
    const promises = [
      fetchConnectorImages && ApiController.initPromise("connectorImages", ApiController.fetchConnectorImages),
      fetchFeaturedWallets && ApiController.initPromise("featuredWallets", ApiController.fetchFeaturedWallets),
      fetchRecommendedWallets && ApiController.initPromise("recommendedWallets", ApiController.fetchRecommendedWallets),
      fetchNetworkImages && ApiController.initPromise("networkImages", ApiController.fetchNetworkImages),
      fetchWalletRanks && ApiController.initPromise("walletRanks", ApiController.prefetchWalletRanks)
    ].filter(Boolean);
    return Promise.allSettled(promises);
  },
  prefetchAnalyticsConfig() {
    if (OptionsController.state.features?.analytics) {
      ApiController.fetchAnalyticsConfig();
    }
  },
  async fetchAnalyticsConfig() {
    try {
      const { isAnalyticsEnabled } = await api.get({
        path: "/getAnalyticsConfig",
        params: ApiController._getSdkProperties()
      });
      OptionsController.setFeatures({ analytics: isAnalyticsEnabled });
    } catch (error) {
      OptionsController.setFeatures({ analytics: false });
    }
  },
  filterByNamespaces(namespaces) {
    if (!namespaces?.length) {
      state$i.featured = state$i.allFeatured;
      state$i.recommended = state$i.allRecommended;
      return;
    }
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    state$i.featured = state$i.allFeatured.filter((wallet) => wallet.chains?.some((chain) => caipNetworkIds.includes(chain)));
    state$i.recommended = state$i.allRecommended.filter((wallet) => wallet.chains?.some((chain) => caipNetworkIds.includes(chain)));
    state$i.filteredWallets = state$i.wallets.filter((wallet) => wallet.chains?.some((chain) => caipNetworkIds.includes(chain)));
  },
  clearFilterByNamespaces() {
    state$i.filteredWallets = [];
  },
  setFilterByNamespace(namespace) {
    if (!namespace) {
      state$i.featured = state$i.allFeatured;
      state$i.recommended = state$i.allRecommended;
      return;
    }
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    state$i.featured = state$i.allFeatured.filter((wallet) => wallet.chains?.some((chain) => caipNetworkIds.includes(chain)));
    state$i.recommended = state$i.allRecommended.filter((wallet) => wallet.chains?.some((chain) => caipNetworkIds.includes(chain)));
    state$i.filteredWallets = state$i.wallets.filter((wallet) => wallet.chains?.some((chain) => caipNetworkIds.includes(chain)));
  }
};
const WalletUtil = {
  filterOutDuplicatesByRDNS(wallets) {
    const connectors = ConnectorController.state.connectors;
    const recent = StorageUtil.getRecentWallets();
    const connectorRDNSs = connectors.map((connector) => connector.info?.rdns).filter(Boolean);
    const recentRDNSs = recent.map((wallet) => wallet.rdns).filter(Boolean);
    const allRDNSs = connectorRDNSs.concat(recentRDNSs);
    if (allRDNSs.includes("io.metamask.mobile") && CoreHelperUtil.isMobile()) {
      const index = allRDNSs.indexOf("io.metamask.mobile");
      allRDNSs[index] = "io.metamask";
    }
    const filtered = wallets.filter((wallet) => {
      if (wallet?.rdns && allRDNSs.includes(String(wallet.rdns))) {
        return false;
      }
      if (!wallet?.rdns) {
        const hasMatchingConnectorName = connectors.some((connector) => connector.name === wallet.name);
        if (hasMatchingConnectorName) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  },
  filterOutDuplicatesByIds(wallets) {
    const connectors = ConnectorController.state.connectors.filter((connector) => connector.type === "ANNOUNCED" || connector.type === "INJECTED" || connector.type === "MULTI_CHAIN");
    const recent = StorageUtil.getRecentWallets();
    const connectorIds = connectors.map((connector) => connector.explorerId || connector.explorerWallet?.id || connector.id);
    const recentIds = recent.map((wallet) => wallet.id);
    const allIds = connectorIds.concat(recentIds);
    const filtered = wallets.filter((wallet) => !allIds.includes(wallet?.id));
    return filtered;
  },
  filterOutDuplicateWallets(wallets) {
    const uniqueByRDNS = this.filterOutDuplicatesByRDNS(wallets);
    const uniqueWallets = this.filterOutDuplicatesByIds(uniqueByRDNS);
    return uniqueWallets;
  },
  /**
   * Marks wallets as installed based on available connectors and sorts them
   * according to both installation status and featuredWalletIds order.
   *
   * @param wallets - Array of wallets to process
   * @returns Array of wallets marked as installed and sorted by priority
   */
  markWalletsAsInstalled(wallets) {
    const { connectors } = ConnectorController.state;
    const { featuredWalletIds } = OptionsController.state;
    const installedWalletRdnsMap = connectors.filter((connector) => connector.type === "ANNOUNCED").reduce((rdnsMap, connector) => {
      if (!connector.info?.rdns) {
        return rdnsMap;
      }
      rdnsMap[connector.info.rdns] = true;
      return rdnsMap;
    }, {});
    const walletsWithInstallationStatus = wallets.map((wallet) => ({
      ...wallet,
      installed: Boolean(wallet.rdns) && Boolean(installedWalletRdnsMap[wallet.rdns ?? ""])
    }));
    const sortedWallets = walletsWithInstallationStatus.sort((walletA, walletB) => {
      const installationComparison = Number(walletB.installed) - Number(walletA.installed);
      if (installationComparison !== 0) {
        return installationComparison;
      }
      if (featuredWalletIds?.length) {
        const walletAFeaturedIndex = featuredWalletIds.indexOf(walletA.id);
        const walletBFeaturedIndex = featuredWalletIds.indexOf(walletB.id);
        if (walletAFeaturedIndex !== -1 && walletBFeaturedIndex !== -1) {
          return walletAFeaturedIndex - walletBFeaturedIndex;
        }
        if (walletAFeaturedIndex !== -1) {
          return -1;
        }
        if (walletBFeaturedIndex !== -1) {
          return 1;
        }
      }
      return 0;
    });
    return sortedWallets;
  },
  getConnectOrderMethod(_features, _connectors) {
    const connectMethodOrder = _features?.connectMethodsOrder || OptionsController.state.features?.connectMethodsOrder;
    const connectors = _connectors || ConnectorController.state.connectors;
    if (connectMethodOrder) {
      return connectMethodOrder;
    }
    const { injected, announced } = ConnectorUtil.getConnectorsByType(connectors, ApiController.state.recommended, ApiController.state.featured);
    const shownInjected = injected.filter(ConnectorUtil.showConnector);
    const shownAnnounced = announced.filter(ConnectorUtil.showConnector);
    if (shownInjected.length || shownAnnounced.length) {
      return ["wallet", "email", "social"];
    }
    return ConstantsUtil.DEFAULT_CONNECT_METHOD_ORDER;
  },
  isExcluded(wallet) {
    const isRDNSExcluded = Boolean(wallet.rdns) && ApiController.state.excludedWallets.some((w) => w.rdns === wallet.rdns);
    const isNameExcluded = Boolean(wallet.name) && ApiController.state.excludedWallets.some((w) => HelpersUtil.isLowerCaseMatch(w.name, wallet.name));
    return isRDNSExcluded || isNameExcluded;
  },
  markWalletsWithDisplayIndex(wallets) {
    return wallets.map((w, index) => ({ ...w, display_index: index }));
  },
  /**
   * Filters wallets based on WalletConnect support and platform requirements.
   *
   * On mobile only wallets with WalletConnect support and some mandatory wallets are shown.
   * On desktop with Appkit Core only wallets with WalletConnect support are shown.
   * On desktop with Appkit all wallets are shown.
   *
   * @param wallets - Array of wallets to filter
   * @returns Filtered array of wallets based on WalletConnect support and platform
   */
  filterWalletsByWcSupport(wallets) {
    if (ConnectionController.state.wcBasic) {
      return wallets.filter((wallet) => wallet.supports_wc);
    }
    if (CoreHelperUtil.isMobile()) {
      return wallets.filter((wallet) => wallet.supports_wc || ConstantsUtil.MANDATORY_WALLET_IDS_ON_MOBILE.includes(wallet.id));
    }
    return wallets;
  },
  getWalletConnectWallets(allWallets) {
    const wallets = [...ApiController.state.featured, ...ApiController.state.recommended];
    if (ApiController.state.filteredWallets?.length > 0) {
      wallets.push(...ApiController.state.filteredWallets);
    } else {
      wallets.push(...allWallets);
    }
    const uniqueWallets = CoreHelperUtil.uniqueBy(wallets, "id");
    const walletsWithInstalled = WalletUtil.markWalletsAsInstalled(uniqueWallets);
    const walletsByWcSupport = WalletUtil.filterWalletsByWcSupport(walletsWithInstalled);
    return WalletUtil.markWalletsWithDisplayIndex(walletsByWcSupport);
  }
};
const ConnectorUtil = {
  getConnectorsByType(connectors, recommended, featured) {
    const { customWallets } = OptionsController.state;
    const recent = StorageUtil.getRecentWallets();
    const filteredRecommended = WalletUtil.filterOutDuplicateWallets(recommended);
    const filteredFeatured = WalletUtil.filterOutDuplicateWallets(featured);
    const multiChain = connectors.filter((connector) => connector.type === "MULTI_CHAIN");
    const announced = connectors.filter((connector) => connector.type === "ANNOUNCED");
    const injected = connectors.filter((connector) => connector.type === "INJECTED");
    const external = connectors.filter((connector) => connector.type === "EXTERNAL");
    return {
      custom: customWallets,
      recent,
      external,
      multiChain,
      announced,
      injected,
      recommended: filteredRecommended,
      featured: filteredFeatured
    };
  },
  showConnector(connector) {
    const rdns = connector.info?.rdns;
    const isRDNSExcluded = Boolean(rdns) && ApiController.state.excludedWallets.some((wallet) => Boolean(wallet.rdns) && wallet.rdns === rdns);
    const isNameExcluded = Boolean(connector.name) && ApiController.state.excludedWallets.some((wallet) => HelpersUtil.isLowerCaseMatch(wallet.name, connector.name));
    if (connector.type === "INJECTED") {
      const isBrowserWallet = connector.name === "Browser Wallet";
      if (isBrowserWallet) {
        if (!CoreHelperUtil.isMobile()) {
          return false;
        }
        if (CoreHelperUtil.isMobile() && !rdns && !ConnectionController.checkInstalled()) {
          return false;
        }
      }
      if (isRDNSExcluded || isNameExcluded) {
        return false;
      }
    }
    if ((connector.type === "ANNOUNCED" || connector.type === "EXTERNAL") && (isRDNSExcluded || isNameExcluded)) {
      return false;
    }
    const { includeWalletIds, excludeWalletIds } = OptionsController.state;
    const isFilterableConnectorType = connector.type === "INJECTED" || connector.type === "ANNOUNCED" || connector.type === "MULTI_CHAIN";
    if (isFilterableConnectorType) {
      const connectorWalletId = connector.explorerId || connector.explorerWallet?.id;
      if (excludeWalletIds?.length && connectorWalletId && excludeWalletIds.includes(connectorWalletId)) {
        return false;
      }
      if (includeWalletIds?.length && (!connectorWalletId || !includeWalletIds.includes(connectorWalletId))) {
        return false;
      }
    }
    return true;
  },
  /**
   * Returns true if the user is connected to a WalletConnect connector in the any of the available namespaces.
   * @returns boolean
   */
  getIsConnectedWithWC() {
    const chains = Array.from(ChainController.state.chains.values());
    const isConnectedWithWC = chains.some((chain) => {
      const connectorId = ConnectorController.getConnectorId(chain.namespace);
      return connectorId === ConstantsUtil$1.CONNECTOR_ID.WALLET_CONNECT;
    });
    return isConnectedWithWC;
  },
  /**
   * Returns the connector positions in the order of the user's preference.
   * @returns ConnectorTypeOrder[]
   */
  getConnectorTypeOrder({ recommended, featured, custom, recent, announced, injected, multiChain, external, overriddenConnectors = OptionsController.state.features?.connectorTypeOrder ?? [] }) {
    const allConnectors = [
      { type: "walletConnect", isEnabled: true },
      { type: "recent", isEnabled: recent.length > 0 },
      { type: "injected", isEnabled: [...injected, ...announced, ...multiChain].length > 0 },
      { type: "featured", isEnabled: featured.length > 0 },
      { type: "custom", isEnabled: custom && custom.length > 0 },
      { type: "external", isEnabled: external.length > 0 },
      { type: "recommended", isEnabled: recommended.length > 0 }
    ];
    const enabledConnectors = allConnectors.filter((option) => option.isEnabled);
    const enabledConnectorTypes = new Set(enabledConnectors.map((option) => option.type));
    const prioritizedConnectors = overriddenConnectors.filter((type) => enabledConnectorTypes.has(type)).map((type) => ({ type, isEnabled: true }));
    const remainingConnectors = enabledConnectors.filter(({ type: enabledConnectorType }) => {
      const hasPrioritizedConnector = prioritizedConnectors.some(({ type: prioritizedConnectorType }) => prioritizedConnectorType === enabledConnectorType);
      return !hasPrioritizedConnector;
    });
    return Array.from(new Set([...prioritizedConnectors, ...remainingConnectors].map(({ type }) => type)));
  },
  sortConnectorsByExplorerWallet(connectors) {
    return [...connectors].sort((a, b) => {
      if (a.explorerWallet && b.explorerWallet) {
        return (a.explorerWallet.order ?? 0) - (b.explorerWallet.order ?? 0);
      }
      if (a.explorerWallet) {
        return -1;
      }
      if (b.explorerWallet) {
        return 1;
      }
      return 0;
    });
  },
  /**
   * Returns the priority of a connector. Base Account has highest priority, followed by Coinbase then the rest.
   *
   * This is needed because Base Account and Coinbase share the same explorer wallet ID.
   * Without prioritization, selecting Base Account could incorrectly trigger the Coinbase Wallet extension.
   *
   * @param connector - The connector to get the priority of.
   * @returns The priority of the connector.
   */
  getPriority(connector) {
    if (connector.id === ConstantsUtil$1.CONNECTOR_ID.BASE_ACCOUNT) {
      return 0;
    }
    if (connector.id === ConstantsUtil$1.CONNECTOR_ID.COINBASE || connector.id === ConstantsUtil$1.CONNECTOR_ID.COINBASE_SDK) {
      return 1;
    }
    return 2;
  },
  /**
   * Sorts connectors by priority.
   * @param connectors - The connectors to sort.
   * @returns Sorted connectors.
   */
  sortConnectorsByPriority(connectors) {
    return [...connectors].sort((a, b) => ConnectorUtil.getPriority(a) - ConnectorUtil.getPriority(b));
  },
  getAuthName({ email, socialUsername, socialProvider }) {
    if (socialUsername) {
      if (socialProvider && socialProvider === "discord" && socialUsername.endsWith("0")) {
        return socialUsername.slice(0, -1);
      }
      return socialUsername;
    }
    return email.length > 30 ? `${email.slice(0, -3)}...` : email;
  },
  async fetchProviderData(connector) {
    try {
      if (connector.name === "Browser Wallet" && !CoreHelperUtil.isMobile()) {
        return { accounts: [], chainId: void 0 };
      }
      if (connector.id === ConstantsUtil$1.CONNECTOR_ID.AUTH) {
        return { accounts: [], chainId: void 0 };
      }
      const [accounts, chainId] = await Promise.all([
        connector.provider?.request({ method: "eth_accounts" }),
        connector.provider?.request({ method: "eth_chainId" }).then((hexChainId) => Number(hexChainId))
      ]);
      return { accounts, chainId };
    } catch (err) {
      console.warn(`Failed to fetch provider data for ${connector.name}`, err);
      return { accounts: [], chainId: void 0 };
    }
  },
  /**
   * Filter out duplicate custom wallets by RDNS
   * @param wallets
   */
  getFilteredCustomWallets(wallets) {
    const recent = StorageUtil.getRecentWallets();
    const connectorRDNSs = ConnectorController.state.connectors.map((connector) => connector.info?.rdns).filter(Boolean);
    const recentRDNSs = recent.map((wallet) => wallet.rdns).filter(Boolean);
    const allRDNSs = connectorRDNSs.concat(recentRDNSs);
    if (allRDNSs.includes("io.metamask.mobile") && CoreHelperUtil.isMobile()) {
      const index = allRDNSs.indexOf("io.metamask.mobile");
      allRDNSs[index] = "io.metamask";
    }
    const filtered = wallets.filter((wallet) => !allRDNSs.includes(String(wallet?.rdns)));
    return filtered;
  },
  hasWalletConnector(wallet) {
    return ConnectorController.state.connectors.some((connector) => connector.id === wallet.id || connector.name === wallet.name);
  },
  isWalletCompatibleWithCurrentChain(wallet) {
    const currentNamespace = ChainController.state.activeChain;
    if (currentNamespace && wallet.chains) {
      return wallet.chains.some((c) => {
        const chainNamespace = c.split(":")[0];
        return currentNamespace === chainNamespace;
      });
    }
    return true;
  },
  getFilteredRecentWallets() {
    const recentWallets = StorageUtil.getRecentWallets();
    const filteredRecentWallets = recentWallets.filter((wallet) => !WalletUtil.isExcluded(wallet)).filter((wallet) => !this.hasWalletConnector(wallet)).filter((wallet) => this.isWalletCompatibleWithCurrentChain(wallet));
    return filteredRecentWallets;
  },
  getCappedRecommendedWallets(wallets) {
    const { connectors } = ConnectorController.state;
    const { customWallets, featuredWalletIds } = OptionsController.state;
    const wcConnector = connectors.find((c) => c.id === "walletConnect");
    const injectedConnectors = connectors.filter((c) => c.type === "INJECTED" || c.type === "ANNOUNCED" || c.type === "MULTI_CHAIN");
    if (!wcConnector && !injectedConnectors.length && !customWallets?.length) {
      return [];
    }
    const isEmailEnabled = OptionsUtil.isEmailEnabled();
    const isSocialsEnabled = OptionsUtil.isSocialsEnabled();
    const injectedWallets = injectedConnectors.filter((i) => i.name !== "Browser Wallet" && i.name !== "WalletConnect");
    const featuredWalletAmount = featuredWalletIds?.length || 0;
    const customWalletAmount = customWallets?.length || 0;
    const injectedWalletAmount = injectedWallets.length || 0;
    const emailWalletAmount = isEmailEnabled ? 1 : 0;
    const socialWalletAmount = isSocialsEnabled ? 1 : 0;
    const walletsDisplayed = featuredWalletAmount + customWalletAmount + injectedWalletAmount + emailWalletAmount + socialWalletAmount;
    const DISPLAYED_WALLETS_AMOUNT = 4;
    const sliceAmount = Math.max(0, DISPLAYED_WALLETS_AMOUNT - walletsDisplayed);
    if (sliceAmount <= 0) {
      return [];
    }
    const filtered = WalletUtil.filterOutDuplicateWallets(wallets);
    return filtered.slice(0, sliceAmount);
  },
  processConnectorsByType(connectors, shouldFilter = true) {
    const sorted = ConnectorUtil.sortConnectorsByExplorerWallet([...connectors]);
    return shouldFilter ? sorted.filter(ConnectorUtil.showConnector) : sorted;
  },
  connectorList() {
    const byType = ConnectorUtil.getConnectorsByType(ConnectorController.state.connectors, ApiController.state.recommended, ApiController.state.featured);
    const announced = this.processConnectorsByType(byType.announced.filter((c) => c.id !== "walletConnect"));
    const injected = this.processConnectorsByType(byType.injected);
    const multiChain = this.processConnectorsByType(byType.multiChain.filter((c) => c.name !== "WalletConnect"), false);
    const custom = byType.custom;
    const recent = byType.recent;
    const external = this.processConnectorsByType(byType.external.filter((c) => c.id !== ConstantsUtil$1.CONNECTOR_ID.COINBASE_SDK && c.id !== ConstantsUtil$1.CONNECTOR_ID.BASE_ACCOUNT));
    const recommended = byType.recommended;
    const featured = byType.featured;
    const connectorTypeOrder = ConnectorUtil.getConnectorTypeOrder({
      custom,
      recent,
      announced,
      injected,
      multiChain,
      recommended,
      featured,
      external
    });
    const wcConnector = ConnectorController.state.connectors.find((c) => c.id === "walletConnect");
    const isMobile = CoreHelperUtil.isMobile();
    const items = [];
    for (const type of connectorTypeOrder) {
      switch (type) {
        case "walletConnect": {
          if (!isMobile && wcConnector) {
            items.push({ kind: "connector", subtype: "walletConnect", connector: wcConnector });
          }
          break;
        }
        case "recent": {
          const filteredRecent = ConnectorUtil.getFilteredRecentWallets();
          filteredRecent.forEach((w) => items.push({ kind: "wallet", subtype: "recent", wallet: w }));
          break;
        }
        case "injected": {
          multiChain.forEach((c) => items.push({ kind: "connector", subtype: "multiChain", connector: c }));
          announced.forEach((c) => items.push({ kind: "connector", subtype: "announced", connector: c }));
          injected.forEach((c) => items.push({ kind: "connector", subtype: "injected", connector: c }));
          break;
        }
        case "featured": {
          featured.forEach((w) => items.push({ kind: "wallet", subtype: "featured", wallet: w }));
          break;
        }
        case "custom": {
          const filteredCustom = ConnectorUtil.getFilteredCustomWallets(custom ?? []);
          filteredCustom.forEach((w) => items.push({ kind: "wallet", subtype: "custom", wallet: w }));
          break;
        }
        case "external": {
          external.forEach((c) => items.push({ kind: "connector", subtype: "external", connector: c }));
          break;
        }
        case "recommended": {
          const cappedRecommended = ConnectorUtil.getCappedRecommendedWallets(recommended);
          cappedRecommended.forEach((w) => items.push({ kind: "wallet", subtype: "recommended", wallet: w }));
          break;
        }
        default:
          console.warn(`Unknown connector type: ${type}`);
      }
    }
    return items;
  },
  hasInjectedConnectors() {
    return ConnectorController.state.connectors.filter((c) => (c.type === "INJECTED" || c.type === "ANNOUNCED" || c.type === "MULTI_CHAIN") && c.name !== "Browser Wallet" && c.name !== "WalletConnect").length;
  }
};
const RESTRICTED_VIEWS_BASED_ON_USAGE = [
  "ConnectingExternal",
  "ConnectingMultiChain",
  "ConnectingSocial",
  "ConnectingFarcaster"
];
const state$h = proxy({
  view: "Connect",
  history: ["Connect"],
  transactionStack: []
});
const controller$c = {
  state: state$h,
  subscribeKey(key, callback) {
    return subscribeKey(state$h, key, callback);
  },
  pushTransactionStack(action) {
    state$h.transactionStack.push(action);
  },
  popTransactionStack(status) {
    const action = state$h.transactionStack.pop();
    if (!action) {
      return;
    }
    const { onSuccess, onError, onCancel } = action;
    switch (status) {
      case "success":
        onSuccess?.();
        break;
      case "error":
        onError?.();
        RouterController.goBack();
        break;
      case "cancel":
        onCancel?.();
        RouterController.goBack();
        break;
    }
  },
  push(view, data) {
    let finalView = view;
    let finalData = data;
    if (ApiController.state.plan.hasExceededUsageLimit && RESTRICTED_VIEWS_BASED_ON_USAGE.includes(view)) {
      finalView = "UsageExceeded";
      finalData = void 0;
    }
    if (finalView !== state$h.view) {
      state$h.view = finalView;
      state$h.history.push(finalView);
      state$h.data = finalData;
    }
  },
  reset(view, data) {
    state$h.view = view;
    state$h.history = [view];
    state$h.data = data;
  },
  replace(view, data) {
    const lastView = state$h.history.at(-1);
    const isSameView = lastView === view;
    if (!isSameView) {
      state$h.view = view;
      state$h.history[state$h.history.length - 1] = view;
      state$h.data = data;
    }
  },
  goBack() {
    const isConnected = ChainController.state.activeCaipAddress;
    const isFarcasterView = RouterController.state.view === "ConnectingFarcaster";
    const shouldReload = !isConnected && isFarcasterView;
    if (state$h.history.length > 1) {
      state$h.history.pop();
      const [last] = state$h.history.slice(-1);
      if (last) {
        const isConnectView = last === "Connect";
        if (isConnected && isConnectView) {
          state$h.view = "Account";
        } else {
          state$h.view = last;
        }
      }
    } else {
      ModalController.close();
    }
    if (state$h.data?.wallet) {
      state$h.data.wallet = void 0;
    }
    if (state$h.data?.redirectView) {
      state$h.data.redirectView = void 0;
    }
    setTimeout(() => {
      if (shouldReload) {
        ChainController.setAccountProp("farcasterUrl", void 0, ChainController.state.activeChain);
        const authConnector = ConnectorController.getAuthConnector();
        authConnector?.provider?.reload();
        const optionsState = snapshot(OptionsController.state);
        authConnector?.provider?.syncDappData?.({
          metadata: optionsState.metadata,
          sdkVersion: optionsState.sdkVersion,
          projectId: optionsState.projectId,
          sdkType: optionsState.sdkType
        });
      }
    }, 100);
  },
  goBackToIndex(historyIndex) {
    if (state$h.history.length > 1) {
      state$h.history = state$h.history.slice(0, historyIndex + 1);
      const [last] = state$h.history.slice(-1);
      if (last) {
        state$h.view = last;
      }
    }
  },
  goBackOrCloseModal() {
    if (RouterController.state.history.length > 1) {
      RouterController.goBack();
    } else {
      ModalController.close();
    }
  }
};
const RouterController = withErrorBoundary(controller$c);
const state$g = proxy({
  themeMode: "dark",
  themeVariables: {},
  w3mThemeVariables: void 0
});
const controller$b = {
  state: state$g,
  subscribe(callback) {
    return subscribe(state$g, () => callback(state$g));
  },
  setThemeMode(themeMode) {
    state$g.themeMode = themeMode;
    try {
      const authConnector = ConnectorController.getAuthConnector();
      if (authConnector) {
        const themeVariables = controller$b.getSnapshot().themeVariables;
        authConnector.provider.syncTheme({
          themeMode,
          themeVariables,
          w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  setThemeVariables(themeVariables) {
    state$g.themeVariables = { ...state$g.themeVariables, ...themeVariables };
    try {
      const authConnector = ConnectorController.getAuthConnector();
      if (authConnector) {
        const themeVariablesSnapshot = controller$b.getSnapshot().themeVariables;
        authConnector.provider.syncTheme({
          themeVariables: themeVariablesSnapshot,
          w3mThemeVariables: getW3mThemeVariables(state$g.themeVariables, state$g.themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  getSnapshot() {
    return snapshot(state$g);
  }
};
const ThemeController = withErrorBoundary(controller$b);
const defaultActiveConnectors = Object.fromEntries(AVAILABLE_NAMESPACES.map((namespace) => [namespace, void 0]));
const defaultFilterByNamespaceMap = Object.fromEntries(AVAILABLE_NAMESPACES.map((namespace) => [namespace, true]));
const state$f = proxy({
  allConnectors: [],
  connectors: [],
  activeConnector: void 0,
  filterByNamespace: void 0,
  activeConnectorIds: defaultActiveConnectors,
  filterByNamespaceMap: defaultFilterByNamespaceMap
});
const controller$a = {
  state: state$f,
  subscribe(callback) {
    return subscribe(state$f, () => {
      callback(state$f);
    });
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$f, key, callback);
  },
  initialize(namespaces) {
    namespaces.forEach((namespace) => {
      const connectorId = StorageUtil.getConnectedConnectorId(namespace);
      if (connectorId) {
        ConnectorController.setConnectorId(connectorId, namespace);
      }
    });
  },
  setActiveConnector(connector) {
    if (connector) {
      state$f.activeConnector = ref(connector);
    }
  },
  setConnectors(connectors) {
    const newConnectors = connectors.filter((newConnector) => !state$f.allConnectors.some((existingConnector) => existingConnector.id === newConnector.id && ConnectorController.getConnectorName(existingConnector.name) === ConnectorController.getConnectorName(newConnector.name) && existingConnector.chain === newConnector.chain));
    newConnectors.forEach((connector) => {
      if (connector.type !== "MULTI_CHAIN") {
        state$f.allConnectors.push(ref(connector));
      }
    });
    const enabledNamespaces = ConnectorController.getEnabledNamespaces();
    const connectorsFilteredByNamespaces = ConnectorController.getEnabledConnectors(enabledNamespaces);
    state$f.connectors = ConnectorController.mergeMultiChainConnectors(connectorsFilteredByNamespaces);
  },
  filterByNamespaces(enabledNamespaces) {
    Object.keys(state$f.filterByNamespaceMap).forEach((namespace) => {
      state$f.filterByNamespaceMap[namespace] = false;
    });
    enabledNamespaces.forEach((namespace) => {
      state$f.filterByNamespaceMap[namespace] = true;
    });
    ConnectorController.updateConnectorsForEnabledNamespaces();
  },
  filterByNamespace(namespace, enabled) {
    state$f.filterByNamespaceMap[namespace] = enabled;
    ConnectorController.updateConnectorsForEnabledNamespaces();
  },
  updateConnectorsForEnabledNamespaces() {
    const enabledNamespaces = ConnectorController.getEnabledNamespaces();
    const enabledConnectors = ConnectorController.getEnabledConnectors(enabledNamespaces);
    const areAllNamespacesEnabled = ConnectorController.areAllNamespacesEnabled();
    state$f.connectors = ConnectorController.mergeMultiChainConnectors(enabledConnectors);
    if (areAllNamespacesEnabled) {
      ApiController.clearFilterByNamespaces();
    } else {
      ApiController.filterByNamespaces(enabledNamespaces);
    }
  },
  getEnabledNamespaces() {
    return Object.entries(state$f.filterByNamespaceMap).filter(([_, enabled]) => enabled).map(([namespace]) => namespace);
  },
  getEnabledConnectors(enabledNamespaces) {
    return state$f.allConnectors.filter((connector) => enabledNamespaces.includes(connector.chain));
  },
  areAllNamespacesEnabled() {
    return Object.values(state$f.filterByNamespaceMap).every((enabled) => enabled);
  },
  mergeMultiChainConnectors(connectors) {
    const connectorsByNameMap = ConnectorController.generateConnectorMapByName(connectors);
    const mergedConnectors = [];
    connectorsByNameMap.forEach((keyConnectors) => {
      const firstItem = keyConnectors[0];
      const isAuthConnector = firstItem?.id === ConstantsUtil$1.CONNECTOR_ID.AUTH;
      if (keyConnectors.length > 1 && firstItem) {
        mergedConnectors.push({
          name: firstItem.name,
          imageUrl: firstItem.imageUrl,
          imageId: firstItem.imageId,
          connectors: [...keyConnectors],
          type: isAuthConnector ? "AUTH" : "MULTI_CHAIN",
          // These values are just placeholders, we don't use them in multi-chain connector select screen
          chain: "eip155",
          id: firstItem?.id || ""
        });
      } else if (firstItem) {
        mergedConnectors.push(firstItem);
      }
    });
    return mergedConnectors;
  },
  generateConnectorMapByName(connectors) {
    const connectorsByNameMap = /* @__PURE__ */ new Map();
    connectors.forEach((connector) => {
      const { name } = connector;
      const connectorName = ConnectorController.getConnectorName(name);
      if (!connectorName) {
        return;
      }
      const connectorsByName = connectorsByNameMap.get(connectorName) || [];
      const haveSameConnector = connectorsByName.find((c) => c.chain === connector.chain);
      if (!haveSameConnector) {
        connectorsByName.push(connector);
      }
      connectorsByNameMap.set(connectorName, connectorsByName);
    });
    return connectorsByNameMap;
  },
  getConnectorName(name) {
    if (!name) {
      return name;
    }
    const nameOverrideMap = {
      "Trust Wallet": "Trust"
    };
    return nameOverrideMap[name] || name;
  },
  getUniqueConnectorsByName(connectors) {
    const uniqueConnectors = [];
    connectors.forEach((c) => {
      if (!uniqueConnectors.find((uc) => uc.chain === c.chain)) {
        uniqueConnectors.push(c);
      }
    });
    return uniqueConnectors;
  },
  addConnector(connector) {
    if (connector.id === ConstantsUtil$1.CONNECTOR_ID.AUTH) {
      const authConnector = connector;
      const optionsState = snapshot(OptionsController.state);
      const themeMode = ThemeController.getSnapshot().themeMode;
      const themeVariables = ThemeController.getSnapshot().themeVariables;
      authConnector?.provider?.syncDappData?.({
        metadata: optionsState.metadata,
        sdkVersion: optionsState.sdkVersion,
        projectId: optionsState.projectId,
        sdkType: optionsState.sdkType
      });
      authConnector?.provider?.syncTheme({
        themeMode,
        themeVariables,
        w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
      });
      ConnectorController.setConnectors([connector]);
    } else {
      ConnectorController.setConnectors([connector]);
    }
  },
  getAuthConnector(chainNamespace) {
    const activeNamespace = chainNamespace || ChainController.state.activeChain;
    const authConnector = state$f.connectors.find((c) => c.id === ConstantsUtil$1.CONNECTOR_ID.AUTH);
    if (!authConnector) {
      return void 0;
    }
    if (authConnector?.connectors?.length) {
      const connector = authConnector.connectors.find((c) => c.chain === activeNamespace);
      return connector;
    }
    return authConnector;
  },
  getAnnouncedConnectorRdns() {
    return state$f.connectors.filter((c) => c.type === "ANNOUNCED").map((c) => c.info?.rdns);
  },
  getConnectorById(id) {
    const sortedConnectors = ConnectorUtil.sortConnectorsByPriority(state$f.allConnectors);
    return sortedConnectors.find((c) => c.id === id);
  },
  getConnector({ id, namespace }) {
    const namespaceToUse = namespace || ChainController.state.activeChain;
    const connectorsByNamespace = state$f.allConnectors.filter((c) => c.chain === namespaceToUse);
    const sortedConnectorsByNamespace = ConnectorUtil.sortConnectorsByPriority(connectorsByNamespace);
    const connector = sortedConnectorsByNamespace.find((c) => c.id === id || c.explorerId === id);
    return connector;
  },
  syncIfAuthConnector(connector) {
    if (connector.id !== "AUTH") {
      return;
    }
    const authConnector = connector;
    const optionsState = snapshot(OptionsController.state);
    const themeMode = ThemeController.getSnapshot().themeMode;
    const themeVariables = ThemeController.getSnapshot().themeVariables;
    authConnector?.provider?.syncDappData?.({
      metadata: optionsState.metadata,
      sdkVersion: optionsState.sdkVersion,
      sdkType: optionsState.sdkType,
      projectId: optionsState.projectId
    });
    authConnector.provider.syncTheme({
      themeMode,
      themeVariables,
      w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
    });
  },
  /**
   * Returns the connectors filtered by namespace.
   * @param namespace - The namespace to filter the connectors by.
   * @returns ConnectorWithProviders[].
   */
  getConnectorsByNamespace(namespace) {
    const namespaceConnectors = state$f.allConnectors.filter((connector) => connector.chain === namespace);
    return ConnectorController.mergeMultiChainConnectors(namespaceConnectors);
  },
  canSwitchToSmartAccount(namespace) {
    const isSmartAccountEnabled = ChainController.checkIfSmartAccountEnabled();
    return isSmartAccountEnabled && getPreferredAccountType(namespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.EOA;
  },
  selectWalletConnector(wallet) {
    const redirectView = RouterController.state.data?.redirectView;
    const namespace = ChainController.state.activeChain;
    const connector = namespace ? ConnectorController.getConnector({ id: wallet.id, namespace }) : void 0;
    MobileWalletUtil.handleMobileDeeplinkRedirect(connector?.explorerId || wallet.id, ChainController.state.activeChain, { isCoinbaseDisabled: OptionsController.state.enableCoinbase === false });
    if (connector) {
      RouterController.push("ConnectingExternal", { connector, wallet, redirectView });
    } else {
      RouterController.push("ConnectingWalletConnect", { wallet, redirectView });
    }
  },
  /**
   * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
   * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
   * @returns ConnectorWithProviders[].
   */
  getConnectors(namespace) {
    if (namespace) {
      return ConnectorController.getConnectorsByNamespace(namespace);
    }
    return ConnectorController.mergeMultiChainConnectors(state$f.allConnectors);
  },
  /**
   * Sets the filter by namespace and updates the connectors.
   * @param namespace - The namespace to filter the connectors by.
   */
  setFilterByNamespace(namespace) {
    state$f.filterByNamespace = namespace;
    state$f.connectors = ConnectorController.getConnectors(namespace);
    ApiController.setFilterByNamespace(namespace);
  },
  setConnectorId(connectorId, namespace) {
    if (connectorId) {
      state$f.activeConnectorIds = {
        ...state$f.activeConnectorIds,
        [namespace]: connectorId
      };
      StorageUtil.setConnectedConnectorId(namespace, connectorId);
    }
  },
  removeConnectorId(namespace) {
    state$f.activeConnectorIds = {
      ...state$f.activeConnectorIds,
      [namespace]: void 0
    };
    StorageUtil.deleteConnectedConnectorId(namespace);
  },
  getConnectorId(namespace) {
    if (!namespace) {
      return void 0;
    }
    return state$f.activeConnectorIds[namespace];
  },
  isConnected(namespace) {
    if (!namespace) {
      return Object.values(state$f.activeConnectorIds).some((id) => Boolean(id));
    }
    return Boolean(state$f.activeConnectorIds[namespace]);
  },
  resetConnectorIds() {
    state$f.activeConnectorIds = { ...defaultActiveConnectors };
  },
  extendConnectorsWithExplorerWallets(explorerWallets) {
    state$f.allConnectors.forEach((connector) => {
      const explorerWallet = explorerWallets.find((wallet) => wallet.id === connector.id || wallet.rdns && wallet.rdns === connector.info?.rdns);
      if (explorerWallet) {
        connector.explorerWallet = explorerWallet;
      }
    });
    const enabledNamespaces = ConnectorController.getEnabledNamespaces();
    const enabledConnectors = ConnectorController.getEnabledConnectors(enabledNamespaces);
    state$f.connectors = ConnectorController.mergeMultiChainConnectors(enabledConnectors);
  },
  /**
   * Opens the connect modal and waits until the user connects their wallet.
   * @param params - Connection parameters.
   * @returns Promise resolving to the connected wallet's CAIP address.
   */
  async connect(params = {}) {
    const { namespace } = params;
    ConnectorController.setFilterByNamespace(namespace);
    RouterController.push("Connect", {
      addWalletForNamespace: namespace
    });
    return new Promise((resolve, reject) => {
      if (namespace) {
        const unsubscribeChainController = ChainController.subscribeChainProp("accountState", (val) => {
          if (val?.caipAddress) {
            resolve({ caipAddress: val?.caipAddress });
            unsubscribeChainController();
          }
        }, namespace);
        const unsubscribeModalController = ModalController.subscribeKey("open", (val) => {
          if (!val) {
            reject(new Error("Modal closed"));
            unsubscribeModalController();
          }
        });
      } else {
        const unsubscribeChainController = ChainController.subscribeKey("activeCaipAddress", (val) => {
          if (val) {
            resolve({ caipAddress: val });
            unsubscribeChainController();
          }
        });
        const unsubscribeModalController = ModalController.subscribeKey("open", (val) => {
          if (!val) {
            reject(new Error("Modal closed"));
            unsubscribeModalController();
          }
        });
      }
    });
  }
};
const ConnectorController = withErrorBoundary(controller$a);
const UPDATE_EMAIL_INTERVAL_MS = 1e3;
const ConnectorControllerUtil = {
  checkNamespaceConnectorId(namespace, connectorId) {
    return ConnectorController.getConnectorId(namespace) === connectorId;
  },
  isSocialProvider(socialProvider) {
    return ConstantsUtil.DEFAULT_REMOTE_FEATURES.socials.includes(socialProvider);
  },
  connectWalletConnect({ walletConnect, connector, closeModalOnConnect = true, redirectViewOnModalClose = "Connect", onOpen, onConnect }) {
    return new Promise((resolve, reject) => {
      if (walletConnect) {
        ConnectorController.setActiveConnector(connector);
      }
      onOpen?.(CoreHelperUtil.isMobile() && walletConnect);
      if (redirectViewOnModalClose) {
        const unsubscribeModalController = ModalController.subscribeKey("open", (val) => {
          if (!val) {
            if (RouterController.state.view !== redirectViewOnModalClose) {
              RouterController.replace(redirectViewOnModalClose);
            }
            unsubscribeModalController();
            reject(new Error("Modal closed"));
          }
        });
      }
      const unsubscribeChainController = ChainController.subscribeKey("activeCaipAddress", (val) => {
        if (val) {
          onConnect?.();
          if (closeModalOnConnect) {
            ModalController.close();
          }
          unsubscribeChainController();
          resolve(ParseUtil.parseCaipAddress(val));
        }
      });
    });
  },
  connectExternal(connector) {
    return new Promise((resolve, reject) => {
      const unsubscribeChainController = ChainController.subscribeKey("activeCaipAddress", (val) => {
        if (val) {
          ModalController.close();
          unsubscribeChainController();
          resolve(ParseUtil.parseCaipAddress(val));
        }
      });
      ConnectionController.connectExternal(connector, connector.chain).catch(() => {
        unsubscribeChainController();
        reject(new Error("Connection rejected"));
      });
    });
  },
  connectSocial({ social: socialProvider, namespace, closeModalOnConnect = true, onOpenFarcaster, onConnect }) {
    let socialWindow = void 0;
    let isConnectingSocial = false;
    let popupWindow = null;
    const namespaceToUse = namespace || ChainController.state.activeChain;
    const unsubscribeChainController = ChainController.subscribeKey("activeCaipAddress", (val) => {
      if (val) {
        if (closeModalOnConnect) {
          ModalController.close();
        }
        unsubscribeChainController();
      }
    });
    return new Promise((resolve, reject) => {
      async function handleSocialConnection(event) {
        if (event.data?.resultUri) {
          if (event.origin === ConstantsUtil$1.SECURE_SITE_SDK_ORIGIN) {
            window.removeEventListener("message", handleSocialConnection, false);
            try {
              const authConnector = ConnectorController.getAuthConnector(namespaceToUse);
              if (authConnector && !isConnectingSocial) {
                if (socialWindow) {
                  socialWindow.close();
                }
                isConnectingSocial = true;
                const uri = event.data.resultUri;
                EventsController.sendEvent({
                  type: "track",
                  event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
                  properties: { provider: socialProvider }
                });
                StorageUtil.setConnectedSocialProvider(socialProvider);
                await ConnectionController.connectExternal({
                  id: authConnector.id,
                  type: authConnector.type,
                  socialUri: uri
                }, authConnector.chain);
                const caipAddress = ChainController.state.activeCaipAddress;
                if (!caipAddress) {
                  reject(new Error("Failed to connect"));
                  return;
                }
                resolve(ParseUtil.parseCaipAddress(caipAddress));
                EventsController.sendEvent({
                  type: "track",
                  event: "SOCIAL_LOGIN_SUCCESS",
                  properties: { provider: socialProvider }
                });
              }
            } catch (err) {
              EventsController.sendEvent({
                type: "track",
                event: "SOCIAL_LOGIN_ERROR",
                properties: { provider: socialProvider, message: CoreHelperUtil.parseError(err) }
              });
              reject(new Error("Failed to connect"));
            }
          } else {
            EventsController.sendEvent({
              type: "track",
              event: "SOCIAL_LOGIN_ERROR",
              properties: { provider: socialProvider, message: "Untrusted Origin" }
            });
          }
        }
      }
      async function connectSocial2() {
        EventsController.sendEvent({
          type: "track",
          event: "SOCIAL_LOGIN_STARTED",
          properties: { provider: socialProvider }
        });
        if (socialProvider === "farcaster") {
          onOpenFarcaster?.();
          const unsubscribeModalController = ModalController.subscribeKey("open", (val) => {
            if (!val && socialProvider === "farcaster") {
              reject(new Error("Popup closed"));
              onConnect?.();
              unsubscribeModalController();
            }
          });
          const authConnector = ConnectorController.getAuthConnector();
          if (authConnector) {
            const _accountData = ChainController.getAccountData(namespaceToUse);
            if (!_accountData?.farcasterUrl) {
              try {
                const { url } = await authConnector.provider.getFarcasterUri();
                ChainController.setAccountProp("farcasterUrl", url, namespaceToUse);
              } catch {
                reject(new Error("Failed to connect to farcaster"));
              }
            }
          }
        } else {
          const authConnector = ConnectorController.getAuthConnector();
          popupWindow = CoreHelperUtil.returnOpenHref(`${ConstantsUtil$1.SECURE_SITE_SDK_ORIGIN}/loading`, "popupWindow", "width=600,height=800,scrollbars=yes");
          try {
            if (authConnector) {
              const { uri } = await authConnector.provider.getSocialRedirectUri({
                provider: socialProvider
              });
              if (popupWindow && uri) {
                popupWindow.location.href = uri;
                socialWindow = popupWindow;
                const interval = setInterval(() => {
                  if (socialWindow?.closed && !isConnectingSocial) {
                    reject(new Error("Popup closed"));
                    clearInterval(interval);
                  }
                }, 1e3);
                window.addEventListener("message", handleSocialConnection, false);
              } else {
                popupWindow?.close();
                reject(new Error("Failed to initiate social connection"));
              }
            }
          } catch {
            reject(new Error("Failed to initiate social connection"));
            popupWindow?.close();
          }
        }
      }
      connectSocial2();
    });
  },
  connectEmail({ closeModalOnConnect = true, redirectViewOnModalClose = "Connect", onOpen, onConnect }) {
    return new Promise((resolve, reject) => {
      onOpen?.();
      if (redirectViewOnModalClose) {
        const unsubscribeModalController = ModalController.subscribeKey("open", (val) => {
          if (!val) {
            if (RouterController.state.view !== redirectViewOnModalClose) {
              RouterController.replace(redirectViewOnModalClose);
            }
            unsubscribeModalController();
            reject(new Error("Modal closed"));
          }
        });
      }
      const unsubscribeChainController = ChainController.subscribeKey("activeCaipAddress", (val) => {
        if (val) {
          onConnect?.();
          if (closeModalOnConnect) {
            ModalController.close();
          }
          unsubscribeChainController();
          resolve(ParseUtil.parseCaipAddress(val));
        }
      });
    });
  },
  async updateEmail() {
    const connectorId = StorageUtil.getConnectedConnectorId(ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector) {
      throw new Error("No auth connector found");
    }
    if (connectorId !== ConstantsUtil$1.CONNECTOR_ID.AUTH) {
      throw new Error("Not connected to email or social");
    }
    const initialEmail = authConnector.provider.getEmail() ?? "";
    await ModalController.open({
      view: "UpdateEmailWallet",
      data: {
        email: initialEmail,
        redirectView: void 0
      }
    });
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const newEmail = authConnector.provider.getEmail() ?? "";
        if (newEmail !== initialEmail) {
          ModalController.close();
          clearInterval(interval);
          unsubscribeModalController();
          resolve({ email: newEmail });
        }
      }, UPDATE_EMAIL_INTERVAL_MS);
      const unsubscribeModalController = ModalController.subscribeKey("open", (val) => {
        if (!val) {
          if (RouterController.state.view !== "Connect") {
            RouterController.push("Connect");
          }
          clearInterval(interval);
          unsubscribeModalController();
          reject(new Error("Modal closed"));
        }
      });
    });
  },
  canSwitchToSmartAccount(namespace) {
    const isSmartAccountEnabled = ChainController.checkIfSmartAccountEnabled();
    return isSmartAccountEnabled && getPreferredAccountType(namespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.EOA;
  }
};
function getActiveNetworkTokenAddress() {
  const namespace = ChainController.state.activeCaipNetwork?.chainNamespace || "eip155";
  const chainId = ChainController.state.activeCaipNetwork?.id || 1;
  const address = ConstantsUtil.NATIVE_TOKEN_ADDRESS[namespace];
  return `${namespace}:${chainId}:${address}`;
}
function getNativeTokenAddress(namespace) {
  return ConstantsUtil.NATIVE_TOKEN_ADDRESS[namespace];
}
function getPreferredAccountType(namespace) {
  const preferredAccountType = ChainController.getAccountData(namespace)?.preferredAccountType;
  return preferredAccountType;
}
function getActiveCaipNetwork(chainNamespace) {
  if (chainNamespace) {
    return ChainController.state.chains.get(chainNamespace)?.networkState?.caipNetwork;
  }
  return ChainController.state.activeCaipNetwork;
}
const ConnectionControllerUtil = {
  getConnectionStatus(connection, namespace) {
    const connectedConnectorId = ConnectorController.state.activeConnectorIds[namespace];
    const connections = ConnectionController.getConnections(namespace);
    const isConnectorConnected = Boolean(connectedConnectorId) && connection.connectorId === connectedConnectorId;
    if (isConnectorConnected) {
      return "connected";
    }
    const isConnectionConnected = connections.some((c) => c.connectorId.toLowerCase() === connection.connectorId.toLowerCase());
    if (isConnectionConnected) {
      return "active";
    }
    return "disconnected";
  },
  excludeConnectorAddressFromConnections({ connections, connectorId, addresses }) {
    return connections.map((connection) => {
      const isConnectorMatch = connectorId ? connection.connectorId.toLowerCase() === connectorId.toLowerCase() : false;
      if (isConnectorMatch && addresses) {
        const filteredAccounts = connection.accounts.filter((account) => {
          const isAddressIncluded = addresses.some((address) => address.toLowerCase() === account.address.toLowerCase());
          return !isAddressIncluded;
        });
        return { ...connection, accounts: filteredAccounts };
      }
      return connection;
    });
  },
  excludeExistingConnections(connectorIds, newConnections) {
    const existingConnectorIds = new Set(connectorIds);
    return newConnections.filter((c) => !existingConnectorIds.has(c.connectorId));
  },
  getConnectionsByConnectorId(connections, connectorId) {
    return connections.filter((c) => c.connectorId.toLowerCase() === connectorId.toLowerCase());
  },
  getConnectionsData(namespace) {
    const isMultiWalletEnabled = Boolean(OptionsController.state.remoteFeatures?.multiWallet);
    const activeConnectorId = ConnectorController.state.activeConnectorIds[namespace];
    const connections = ConnectionController.getConnections(namespace);
    const recentConnections = ConnectionController.state.recentConnections.get(namespace) ?? [];
    const recentConnectionsWithCurrentActiveConnectors = recentConnections.filter((connection) => ConnectorController.getConnectorById(connection.connectorId));
    const dedupedRecentConnections = ConnectionControllerUtil.excludeExistingConnections([...connections.map((c) => c.connectorId), ...activeConnectorId ? [activeConnectorId] : []], recentConnectionsWithCurrentActiveConnectors);
    if (!isMultiWalletEnabled) {
      return {
        connections: connections.filter((c) => c.connectorId.toLowerCase() === activeConnectorId?.toLowerCase()),
        recentConnections: []
      };
    }
    return {
      connections,
      recentConnections: dedupedRecentConnections
    };
  },
  onConnectMobile(wallet, wcPayUrl) {
    const wcUri = ConnectionController.state.wcUri;
    if (wallet?.mobile_link && wcUri) {
      try {
        ConnectionController.setWcError(false);
        const { mobile_link, link_mode, name } = wallet;
        const uriWithPay = CoreHelperUtil.appendPayToUri(wcUri, wcPayUrl);
        const { redirect, redirectUniversalLink, href } = CoreHelperUtil.formatNativeUrl(mobile_link, uriWithPay, link_mode);
        const deepLink = redirect;
        const universalLink = redirectUniversalLink;
        const target = CoreHelperUtil.isIframe() ? "_top" : "_self";
        ConnectionController.setWcLinking({ name, href });
        ConnectionController.setRecentWallet(wallet);
        if (OptionsController.state.experimental_preferUniversalLinks && universalLink) {
          CoreHelperUtil.openHref(universalLink, target);
        } else {
          CoreHelperUtil.openHref(deepLink, target);
        }
      } catch (e) {
        EventsController.sendEvent({
          type: "track",
          event: "CONNECT_PROXY_ERROR",
          properties: {
            message: e instanceof Error ? e.message : "Error parsing the deep link",
            uri: wcUri,
            mobile_link: wallet.mobile_link,
            name: wallet.name
          }
        });
        ConnectionController.setWcError(true);
      }
    }
  }
};
const state$e = proxy({
  loading: false,
  open: false,
  selectedNetworkId: void 0,
  activeChain: void 0,
  initialized: false,
  connectingWallet: void 0
});
const PublicStateController = {
  state: state$e,
  subscribe(callback) {
    return subscribe(state$e, () => callback(state$e));
  },
  subscribeOpen(callback) {
    return subscribeKey(state$e, "open", callback);
  },
  set(newState) {
    Object.assign(state$e, { ...state$e, ...newState });
  }
};
const state$d = proxy({
  transactions: [],
  transactionsByYear: {},
  lastNetworkInView: void 0,
  loading: false,
  empty: false,
  next: void 0
});
const controller$9 = {
  state: state$d,
  subscribe(callback) {
    return subscribe(state$d, () => callback(state$d));
  },
  setLastNetworkInView(lastNetworkInView) {
    state$d.lastNetworkInView = lastNetworkInView;
  },
  async fetchTransactions(accountAddress) {
    if (!accountAddress) {
      throw new Error("Transactions can't be fetched without an accountAddress");
    }
    state$d.loading = true;
    try {
      const response = await BlockchainApiController.fetchTransactions({
        account: accountAddress,
        cursor: state$d.next,
        chainId: ChainController.state.activeCaipNetwork?.caipNetworkId
      });
      const nonSpamTransactions = TransactionsController.filterSpamTransactions(response.data);
      const sameChainTransactions = TransactionsController.filterByConnectedChain(nonSpamTransactions);
      const filteredTransactions = [...state$d.transactions, ...sameChainTransactions];
      state$d.loading = false;
      state$d.transactions = filteredTransactions;
      state$d.transactionsByYear = TransactionsController.groupTransactionsByYearAndMonth(state$d.transactionsByYear, sameChainTransactions);
      state$d.empty = filteredTransactions.length === 0;
      state$d.next = response.next ? response.next : void 0;
    } catch (error) {
      const activeChainNamespace = ChainController.state.activeChain;
      EventsController.sendEvent({
        type: "track",
        event: "ERROR_FETCH_TRANSACTIONS",
        properties: {
          address: accountAddress,
          projectId: OptionsController.state.projectId,
          cursor: state$d.next,
          isSmartAccount: getPreferredAccountType(activeChainNamespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      SnackController.showError("Failed to fetch transactions");
      state$d.loading = false;
      state$d.empty = true;
      state$d.next = void 0;
    }
  },
  groupTransactionsByYearAndMonth(transactionsMap = {}, transactions = []) {
    const grouped = transactionsMap;
    transactions.forEach((transaction) => {
      const year = new Date(transaction.metadata.minedAt).getFullYear();
      const month = new Date(transaction.metadata.minedAt).getMonth();
      const yearTransactions = grouped[year] ?? {};
      const monthTransactions = yearTransactions[month] ?? [];
      const newMonthTransactions = monthTransactions.filter((tx) => tx.id !== transaction.id);
      grouped[year] = {
        ...yearTransactions,
        [month]: [...newMonthTransactions, transaction].sort((a, b) => new Date(b.metadata.minedAt).getTime() - new Date(a.metadata.minedAt).getTime())
      };
    });
    return grouped;
  },
  filterSpamTransactions(transactions) {
    return transactions.filter((transaction) => {
      const isAllSpam = transaction.transfers?.every((transfer) => transfer.nft_info?.flags.is_spam === true);
      return !isAllSpam;
    });
  },
  filterByConnectedChain(transactions) {
    const chainId = ChainController.state.activeCaipNetwork?.caipNetworkId;
    const filteredTransactions = transactions.filter((transaction) => transaction.metadata.chain === chainId);
    return filteredTransactions;
  },
  clearCursor() {
    state$d.next = void 0;
  },
  resetTransactions() {
    state$d.transactions = [];
    state$d.transactionsByYear = {};
    state$d.lastNetworkInView = void 0;
    state$d.loading = false;
    state$d.empty = false;
    state$d.next = void 0;
  }
};
const TransactionsController = withErrorBoundary(controller$9, "API_ERROR");
const state$c = proxy({
  connections: /* @__PURE__ */ new Map(),
  recentConnections: /* @__PURE__ */ new Map(),
  isSwitchingConnection: false,
  wcError: false,
  wcFetchingUri: false,
  buffering: false,
  status: "disconnected"
});
let wcConnectionPromise;
const controller$8 = {
  state: state$c,
  subscribe(callback) {
    return subscribe(state$c, () => callback(state$c));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$c, key, callback);
  },
  _getClient() {
    return state$c._client;
  },
  setClient(client) {
    state$c._client = ref(client);
  },
  initialize(adapters) {
    const namespaces = adapters.filter((a) => Boolean(a.namespace)).map((a) => a.namespace);
    ConnectionController.syncStorageConnections(namespaces);
  },
  syncStorageConnections(namespaces) {
    const storageConnections = StorageUtil.getConnections();
    const namespacesToSync = namespaces ?? Array.from(ChainController.state.chains.keys());
    for (const namespace of namespacesToSync) {
      const storageConnectionsByNamespace = storageConnections[namespace] ?? [];
      const recentConnectionsMap = new Map(state$c.recentConnections);
      recentConnectionsMap.set(namespace, storageConnectionsByNamespace);
      state$c.recentConnections = recentConnectionsMap;
    }
  },
  getConnections(namespace) {
    return namespace ? state$c.connections.get(namespace) ?? [] : [];
  },
  hasAnyConnection(connectorId) {
    const connections = ConnectionController.state.connections;
    return Array.from(connections.values()).flatMap((_connections) => _connections).some(({ connectorId: _connectorId }) => _connectorId === connectorId);
  },
  async connectWalletConnect({ cache = "auto" } = {}) {
    state$c.wcFetchingUri = true;
    const isInTelegramOrSafariIos = CoreHelperUtil.isTelegram() || CoreHelperUtil.isSafari() && CoreHelperUtil.isIos();
    try {
      if (cache === "always" || cache === "auto" && isInTelegramOrSafariIos) {
        if (wcConnectionPromise) {
          await wcConnectionPromise;
          wcConnectionPromise = void 0;
          return;
        }
        if (!CoreHelperUtil.isPairingExpired(state$c?.wcPairingExpiry)) {
          const link = state$c.wcUri;
          state$c.wcUri = link;
          return;
        }
        wcConnectionPromise = ConnectionController._getClient()?.connectWalletConnect?.();
        ConnectionController.state.status = "connecting";
        await wcConnectionPromise;
        wcConnectionPromise = void 0;
        state$c.wcPairingExpiry = void 0;
        ConnectionController.state.status = "connected";
      } else {
        await ConnectionController._getClient()?.connectWalletConnect?.();
      }
    } catch (error) {
      state$c.wcError = true;
      state$c.wcFetchingUri = false;
      state$c.status = "disconnected";
      wcConnectionPromise = void 0;
      throw error;
    }
  },
  async connectExternal(options, chain, setChain = true) {
    const connectData = await ConnectionController._getClient()?.connectExternal?.(options);
    if (setChain) {
      ChainController.setActiveNamespace(chain);
    }
    const connector = ConnectorController.state.allConnectors.find((c) => c.id === options?.id);
    const connectSuccessEventMethod = options.type === "AUTH" ? "email" : "browser";
    EventsController.sendEvent({
      type: "track",
      event: "CONNECT_SUCCESS",
      properties: {
        method: connectSuccessEventMethod,
        name: connector?.name || "Unknown",
        view: RouterController.state.view,
        walletRank: connector?.explorerWallet?.order
      }
    });
    return connectData;
  },
  async reconnectExternal(options) {
    await ConnectionController._getClient()?.reconnectExternal?.(options);
    const namespace = options.chain || ChainController.state.activeChain;
    if (namespace) {
      ConnectorController.setConnectorId(options.id, namespace);
    }
  },
  async setPreferredAccountType(accountType, namespace) {
    if (!namespace) {
      return;
    }
    ModalController.setLoading(true, ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector) {
      return;
    }
    ChainController.setAccountProp("preferredAccountType", accountType, namespace);
    await authConnector.provider.setPreferredAccount(accountType);
    StorageUtil.setPreferredAccountTypes(Object.entries(ChainController.state.chains).reduce((acc, [key, _]) => {
      const namespace2 = key;
      const accountType2 = getPreferredAccountType(namespace2);
      if (accountType2 !== void 0) {
        acc[namespace2] = accountType2;
      }
      return acc;
    }, {}));
    await ConnectionController.reconnectExternal(authConnector);
    ModalController.setLoading(false, ChainController.state.activeChain);
    EventsController.sendEvent({
      type: "track",
      event: "SET_PREFERRED_ACCOUNT_TYPE",
      properties: {
        accountType,
        network: ChainController.state.activeCaipNetwork?.caipNetworkId || ""
      }
    });
  },
  async signMessage(message) {
    return ConnectionController._getClient()?.signMessage(message);
  },
  parseUnits(value, decimals) {
    return ConnectionController._getClient()?.parseUnits(value, decimals);
  },
  formatUnits(value, decimals) {
    return ConnectionController._getClient()?.formatUnits(value, decimals);
  },
  updateBalance(namespace) {
    return ConnectionController._getClient()?.updateBalance(namespace);
  },
  async sendTransaction(args) {
    return ConnectionController._getClient()?.sendTransaction(args);
  },
  async getCapabilities(params) {
    return ConnectionController._getClient()?.getCapabilities(params);
  },
  async grantPermissions(params) {
    return ConnectionController._getClient()?.grantPermissions(params);
  },
  async walletGetAssets(params) {
    return ConnectionController._getClient()?.walletGetAssets(params) ?? {};
  },
  async estimateGas(args) {
    return ConnectionController._getClient()?.estimateGas(args);
  },
  async writeContract(args) {
    return ConnectionController._getClient()?.writeContract(args);
  },
  async writeSolanaTransaction(args) {
    return ConnectionController._getClient()?.writeSolanaTransaction(args);
  },
  async getEnsAddress(value) {
    return ConnectionController._getClient()?.getEnsAddress(value);
  },
  async getEnsAvatar(value) {
    return ConnectionController._getClient()?.getEnsAvatar(value);
  },
  checkInstalled(ids) {
    return ConnectionController._getClient()?.checkInstalled?.(ids) || false;
  },
  resetWcConnection() {
    state$c.wcUri = void 0;
    state$c.wcPairingExpiry = void 0;
    state$c.wcLinking = void 0;
    state$c.recentWallet = void 0;
    state$c.wcFetchingUri = false;
    state$c.status = "disconnected";
    TransactionsController.resetTransactions();
    StorageUtil.deleteWalletConnectDeepLink();
    StorageUtil.deleteRecentWallet();
    PublicStateController.set({ connectingWallet: void 0 });
  },
  resetUri() {
    state$c.wcUri = void 0;
    state$c.wcPairingExpiry = void 0;
    wcConnectionPromise = void 0;
    state$c.wcFetchingUri = false;
    PublicStateController.set({ connectingWallet: void 0 });
  },
  finalizeWcConnection(address) {
    const { wcLinking, recentWallet } = ConnectionController.state;
    if (wcLinking) {
      StorageUtil.setWalletConnectDeepLink(wcLinking);
    }
    if (recentWallet) {
      StorageUtil.setAppKitRecent(recentWallet);
    }
    if (address) {
      EventsController.sendEvent({
        type: "track",
        event: "CONNECT_SUCCESS",
        address,
        properties: {
          method: wcLinking ? "mobile" : "qrcode",
          name: RouterController.state.data?.wallet?.name || "Unknown",
          view: RouterController.state.view,
          walletRank: recentWallet?.order
        }
      });
    }
  },
  setWcBasic(wcBasic) {
    state$c.wcBasic = wcBasic;
  },
  setUri(uri) {
    state$c.wcUri = uri;
    state$c.wcFetchingUri = false;
    state$c.wcPairingExpiry = CoreHelperUtil.getPairingExpiry();
  },
  setWcLinking(wcLinking) {
    state$c.wcLinking = wcLinking;
  },
  setWcError(wcError) {
    state$c.wcError = wcError;
    state$c.wcFetchingUri = false;
    state$c.buffering = false;
  },
  setRecentWallet(wallet) {
    state$c.recentWallet = wallet;
  },
  setBuffering(buffering) {
    state$c.buffering = buffering;
  },
  setStatus(status) {
    state$c.status = status;
  },
  setIsSwitchingConnection(isSwitchingConnection) {
    state$c.isSwitchingConnection = isSwitchingConnection;
  },
  async disconnect({ id, namespace, initialDisconnect } = {}) {
    try {
      await ConnectionController._getClient()?.disconnect({
        id,
        chainNamespace: namespace,
        initialDisconnect
      });
    } catch (error) {
      throw new AppKitError("Failed to disconnect", "INTERNAL_SDK_ERROR", error);
    }
  },
  async disconnectConnector({ id, namespace }) {
    try {
      await ConnectionController._getClient()?.disconnectConnector({ id, namespace });
    } catch (error) {
      throw new AppKitError("Failed to disconnect connector", "INTERNAL_SDK_ERROR", error);
    }
  },
  setConnections(connections, chainNamespace) {
    const connectionsMap = new Map(state$c.connections);
    connectionsMap.set(chainNamespace, connections);
    state$c.connections = connectionsMap;
  },
  async handleAuthAccountSwitch({ address, namespace }) {
    const accountData = ChainController.getAccountData(namespace);
    const smartAccount = accountData?.user?.accounts?.find((c) => c.type === "smartAccount");
    const accountType = smartAccount && smartAccount.address.toLowerCase() === address.toLowerCase() && ConnectorControllerUtil.canSwitchToSmartAccount(namespace) ? "smartAccount" : "eoa";
    await ConnectionController.setPreferredAccountType(accountType, namespace);
  },
  async handleActiveConnection({ connection, namespace, address }) {
    const connector = ConnectorController.getConnectorById(connection.connectorId);
    const isAuthConnector = connection.connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH;
    if (!connector) {
      throw new Error(`No connector found for connection: ${connection.connectorId}`);
    }
    if (!isAuthConnector) {
      const connectData = await ConnectionController.connectExternal({
        id: connector.id,
        type: connector.type,
        provider: connector.provider,
        address,
        chain: namespace
      }, namespace);
      return connectData?.address;
    } else if (address) {
      await ConnectionController.handleAuthAccountSwitch({ address, namespace });
    }
    return address;
  },
  async handleDisconnectedConnection({ connection, namespace, address, closeModalOnConnect }) {
    const connector = ConnectorController.getConnectorById(connection.connectorId);
    const authName = connection.auth?.name?.toLowerCase();
    const isAuthConnector = connection.connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH;
    const isWCConnector = connection.connectorId === ConstantsUtil$1.CONNECTOR_ID.WALLET_CONNECT;
    if (!connector) {
      throw new Error(`No connector found for connection: ${connection.connectorId}`);
    }
    let newAddress = void 0;
    if (isAuthConnector) {
      if (authName && ConnectorControllerUtil.isSocialProvider(authName)) {
        const { address: socialAddress } = await ConnectorControllerUtil.connectSocial({
          social: authName,
          closeModalOnConnect,
          onOpenFarcaster() {
            ModalController.open({ view: "ConnectingFarcaster" });
          },
          onConnect() {
            RouterController.replace("ProfileWallets");
          }
        });
        newAddress = socialAddress;
      } else {
        const { address: emailAddress } = await ConnectorControllerUtil.connectEmail({
          closeModalOnConnect,
          onOpen() {
            ModalController.open({ view: "EmailLogin" });
          },
          onConnect() {
            RouterController.replace("ProfileWallets");
          }
        });
        newAddress = emailAddress;
      }
    } else if (isWCConnector) {
      const { address: wcAddress } = await ConnectorControllerUtil.connectWalletConnect({
        walletConnect: true,
        connector,
        closeModalOnConnect,
        onOpen(isMobile) {
          const view = isMobile ? "AllWallets" : "ConnectingWalletConnect";
          if (ModalController.state.open) {
            RouterController.push(view);
          } else {
            ModalController.open({ view });
          }
        },
        onConnect() {
          RouterController.replace("ProfileWallets");
        }
      });
      newAddress = wcAddress;
    } else {
      const connectData = await ConnectionController.connectExternal({
        id: connector.id,
        type: connector.type,
        provider: connector.provider,
        chain: namespace
      }, namespace);
      if (connectData) {
        newAddress = connectData.address;
      }
    }
    if (isAuthConnector && address) {
      await ConnectionController.handleAuthAccountSwitch({ address, namespace });
    }
    return newAddress;
  },
  async switchConnection({ connection, address, namespace, closeModalOnConnect, onChange }) {
    let currentAddress = void 0;
    const caipAddress = ChainController.getAccountData(namespace)?.caipAddress;
    if (caipAddress) {
      const { address: currentAddressParsed } = ParseUtil.parseCaipAddress(caipAddress);
      currentAddress = currentAddressParsed;
    }
    const status = ConnectionControllerUtil.getConnectionStatus(connection, namespace);
    switch (status) {
      case "connected":
      case "active": {
        const newAddress = await ConnectionController.handleActiveConnection({
          connection,
          namespace,
          address
        });
        if (currentAddress && newAddress) {
          const hasSwitchedAccount = newAddress.toLowerCase() !== currentAddress.toLowerCase();
          onChange?.({
            address: newAddress,
            namespace,
            hasSwitchedAccount,
            hasSwitchedWallet: status === "active"
          });
        }
        break;
      }
      case "disconnected": {
        const newAddress = await ConnectionController.handleDisconnectedConnection({
          connection,
          namespace,
          address,
          closeModalOnConnect
        });
        if (newAddress) {
          onChange?.({
            address: newAddress,
            namespace,
            hasSwitchedAccount: true,
            hasSwitchedWallet: true
          });
        }
        break;
      }
      default:
        throw new Error(`Invalid connection status: ${status}`);
    }
  }
};
const ConnectionController = withErrorBoundary(controller$8);
const ERC7811Utils = {
  /**
   * Creates a Balance object from an ERC7811 Asset object
   * @param asset - Asset object to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns Balance object
   */
  createBalance(asset, chainId) {
    const metadata = {
      name: asset.metadata["name"] || "",
      symbol: asset.metadata["symbol"] || "",
      decimals: asset.metadata["decimals"] || 0,
      value: asset.metadata["value"] || 0,
      price: asset.metadata["price"] || 0,
      iconUrl: asset.metadata["iconUrl"] || ""
    };
    return {
      name: metadata.name,
      symbol: metadata.symbol,
      chainId,
      address: asset.address === "native" ? void 0 : this.convertAddressToCAIP10Address(asset.address, chainId),
      value: metadata.value,
      price: metadata.price,
      quantity: {
        decimals: metadata.decimals.toString(),
        numeric: this.convertHexToBalance({
          hex: asset.balance,
          decimals: metadata.decimals
        })
      },
      iconUrl: metadata.iconUrl
    };
  },
  /**
   * Converts a hex string to a Balance object
   * @param hex - Hex string to convert
   * @param decimals - Number of decimals to use
   * @returns Balance object
   */
  convertHexToBalance({ hex, decimals }) {
    return formatUnits(BigInt(hex), decimals);
  },
  /**
   * Converts an address to a CAIP-10 address
   * @param address - Address to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns CAIP-10 address
   */
  convertAddressToCAIP10Address(address, chainId) {
    return `${chainId}:${address}`;
  },
  /**
   *  Creates a CAIP-2 Chain ID from a chain ID and namespace
   * @param chainId  - Chain ID in hex format
   * @param namespace  - Chain namespace
   * @returns
   */
  createCAIP2ChainId(chainId, namespace) {
    return `${namespace}:${parseInt(chainId, 16)}`;
  },
  /**
   * Gets the chain ID in hex format from a CAIP-2 Chain ID
   * @param caip2ChainId - CAIP-2 Chain ID
   * @returns Chain ID in hex format
   */
  getChainIdHexFromCAIP2ChainId(caip2ChainId) {
    const parts = caip2ChainId.split(":");
    if (parts.length < 2 || !parts[1]) {
      return "0x0";
    }
    const chainPart = parts[1];
    const parsed = parseInt(chainPart, 10);
    return isNaN(parsed) ? "0x0" : `0x${parsed.toString(16)}`;
  },
  /**
   * Checks if a response is a valid WalletGetAssetsResponse
   * @param response - The response to check
   * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
   */
  isWalletGetAssetsResponse(response) {
    if (typeof response !== "object" || response === null) {
      return false;
    }
    return Object.values(response).every((value) => Array.isArray(value) && value.every((asset) => this.isValidAsset(asset)));
  },
  /**
   * Checks if an asset object is valid.
   * @param asset - The asset object to check.
   * @returns True if the asset is valid, false otherwise.
   */
  isValidAsset(asset) {
    return typeof asset === "object" && asset !== null && typeof asset.address === "string" && typeof asset.balance === "string" && (asset.type === "ERC20" || asset.type === "NATIVE") && typeof asset.metadata === "object" && asset.metadata !== null && typeof asset.metadata["name"] === "string" && typeof asset.metadata["symbol"] === "string" && typeof asset.metadata["decimals"] === "number" && typeof asset.metadata["price"] === "number" && typeof asset.metadata["iconUrl"] === "string";
  }
};
let cachedViemUtils = void 0;
async function loadViemUtils() {
  if (!cachedViemUtils) {
    const { createPublicClient, http, defineChain } = await import("./viem.mjs").then(function(n) {
      return n.aA;
    });
    cachedViemUtils = {
      createPublicClient,
      http,
      defineChain
    };
  }
  return cachedViemUtils;
}
const ViemUtil = {
  getBlockchainApiRpcUrl(caipNetworkId, projectId) {
    const url = new URL("https://rpc.walletconnect.org/v1/");
    url.searchParams.set("chainId", caipNetworkId);
    url.searchParams.set("projectId", projectId);
    return url.toString();
  },
  async getViemChain(caipNetwork) {
    const { defineChain } = await loadViemUtils();
    const { chainId } = ParseUtil.parseCaipNetworkId(caipNetwork.caipNetworkId);
    return defineChain({ ...caipNetwork, id: Number(chainId) });
  },
  async createViemPublicClient(caipNetwork) {
    const { createPublicClient, http } = await loadViemUtils();
    const projectId = OptionsController.state.projectId;
    const viemChain = await ViemUtil.getViemChain(caipNetwork);
    if (!viemChain) {
      throw new Error(`Chain ${caipNetwork.caipNetworkId} not found in viem/chains`);
    }
    return createPublicClient({
      chain: viemChain,
      transport: http(ViemUtil.getBlockchainApiRpcUrl(caipNetwork.caipNetworkId, projectId))
    });
  }
};
const BalanceUtil = {
  /**
   * Get the balances of the user's tokens. If user connected with Auth provider or and on the EIP155 network,
   * it'll use the `wallet_getAssets` and `wallet_getCapabilities` calls to fetch the balance rather than Blockchain API
   * @param forceUpdate - If true, the balances will be fetched from the server
   * @returns The balances of the user's tokens
   */
  async getMyTokensWithBalance(params = {
    forceUpdate: void 0,
    caipNetwork: ChainController.state.activeCaipNetwork,
    address: ChainController.getAccountData()?.address
  }) {
    const { forceUpdate, caipNetwork, address } = params;
    const isAuthConnector = ConnectorController.getConnectorId("eip155") === ConstantsUtil$1.CONNECTOR_ID.AUTH;
    if (!address) {
      return [];
    }
    const caipAddress = caipNetwork ? `${caipNetwork.caipNetworkId}:${address}` : address;
    const cachedBalance = StorageUtil.getBalanceCacheForCaipAddress(caipAddress);
    if (cachedBalance) {
      return cachedBalance.balances;
    }
    if (caipNetwork && caipNetwork.chainNamespace === ConstantsUtil$1.CHAIN.EVM && isAuthConnector) {
      const eip155Balances = await this.getEIP155Balances(address, caipNetwork);
      if (eip155Balances) {
        return this.filterLowQualityTokens(eip155Balances);
      }
    }
    const response = await BlockchainApiController.getBalance(address, caipNetwork?.caipNetworkId, forceUpdate);
    return this.filterLowQualityTokens(response.balances);
  },
  /**
   * Get the balances of the user's tokens on the EIP155 network using native `wallet_getAssets` and `wallet_getCapabilities` calls
   * @param address - The address of the user
   * @param caipNetwork - The CAIP network
   * @returns The balances of the user's tokens on the EIP155 network
   */
  async getEIP155Balances(address, caipNetwork) {
    try {
      const chainIdHex = ERC7811Utils.getChainIdHexFromCAIP2ChainId(caipNetwork.caipNetworkId);
      const walletCapabilities = await ConnectionController.getCapabilities(address);
      if (!walletCapabilities?.[chainIdHex]?.["assetDiscovery"]?.supported) {
        return null;
      }
      const walletGetAssetsResponse = await ConnectionController.walletGetAssets({
        account: address,
        chainFilter: [chainIdHex]
      });
      if (!ERC7811Utils.isWalletGetAssetsResponse(walletGetAssetsResponse)) {
        return null;
      }
      const assets2 = walletGetAssetsResponse[chainIdHex] || [];
      const filteredAssets = assets2.map((asset) => ERC7811Utils.createBalance(asset, caipNetwork.caipNetworkId));
      StorageUtil.updateBalanceCache({
        caipAddress: `${caipNetwork.caipNetworkId}:${address}`,
        balance: { balances: filteredAssets },
        timestamp: Date.now()
      });
      return filteredAssets;
    } catch (error) {
      return null;
    }
  },
  /**
   * The 1Inch API includes many low-quality tokens in the balance response,
   * which appear inconsistently. This filter prevents them from being displayed.
   */
  filterLowQualityTokens(balances) {
    return balances.filter((balance) => balance.quantity.decimals !== "0");
  },
  async fetchERC20Balance({ caipAddress, assetAddress, caipNetwork }) {
    const publicClient = await ViemUtil.createViemPublicClient(caipNetwork);
    const { address } = ParseUtil.parseCaipAddress(caipAddress);
    const [{ result: name }, { result: symbol }, { result: balance }, { result: decimals }] = await publicClient.multicall({
      contracts: [
        {
          address: assetAddress,
          functionName: "name",
          args: [],
          abi: erc20Abi
        },
        {
          address: assetAddress,
          functionName: "symbol",
          args: [],
          abi: erc20Abi
        },
        {
          address: assetAddress,
          functionName: "balanceOf",
          args: [address],
          abi: erc20Abi
        },
        {
          address: assetAddress,
          functionName: "decimals",
          args: [],
          abi: erc20Abi
        }
      ]
    });
    return {
      name,
      symbol,
      decimals,
      balance: balance && decimals ? formatUnits(balance, decimals) : "0"
    };
  }
};
const state$b = {
  adapters: {}
};
const AdapterController = {
  state: state$b,
  initialize(adapters) {
    state$b.adapters = { ...adapters };
  },
  get(namespace) {
    return state$b.adapters[namespace];
  }
};
const CLEAN_PROVIDERS_STATE = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0,
  sui: void 0,
  stacks: void 0,
  ton: void 0,
  tron: void 0
};
const state$a = proxy({
  providers: { ...CLEAN_PROVIDERS_STATE },
  providerIds: { ...CLEAN_PROVIDERS_STATE }
});
const ProviderController = {
  state: state$a,
  subscribeKey(key, callback) {
    return subscribeKey(state$a, key, callback);
  },
  subscribe(callback) {
    return subscribe(state$a, () => {
      callback(state$a);
    });
  },
  subscribeProviders(callback) {
    return subscribe(state$a.providers, () => callback(state$a.providers));
  },
  setProvider(chainNamespace, provider) {
    if (chainNamespace && provider) {
      state$a.providers[chainNamespace] = ref(provider);
    }
  },
  getProvider(chainNamespace) {
    if (!chainNamespace) {
      return void 0;
    }
    return state$a.providers[chainNamespace];
  },
  setProviderId(chainNamespace, providerId) {
    if (providerId) {
      state$a.providerIds[chainNamespace] = providerId;
    }
  },
  getProviderId(chainNamespace) {
    if (!chainNamespace) {
      return void 0;
    }
    return state$a.providerIds[chainNamespace];
  },
  reset() {
    state$a.providers = { ...CLEAN_PROVIDERS_STATE };
    state$a.providerIds = { ...CLEAN_PROVIDERS_STATE };
  },
  resetChain(chainNamespace) {
    state$a.providers[chainNamespace] = void 0;
    state$a.providerIds[chainNamespace] = void 0;
  }
};
const SwapApiUtil = {
  async getTokenList(caipNetworkId) {
    const response = await BlockchainApiController.fetchSwapTokens({
      chainId: caipNetworkId
    });
    const tokens = response?.tokens?.map((token) => ({
      ...token,
      eip2612: false,
      quantity: {
        decimals: "0",
        numeric: "0"
      },
      price: 0,
      value: 0
    })) || [];
    return tokens;
  },
  async fetchGasPrice() {
    const caipNetwork = ChainController.state.activeCaipNetwork;
    if (!caipNetwork) {
      return null;
    }
    try {
      switch (caipNetwork.chainNamespace) {
        case "solana":
          const lamportsPerSignature = (await ConnectionController?.estimateGas({ chainNamespace: "solana" }))?.toString();
          return {
            standard: lamportsPerSignature,
            fast: lamportsPerSignature,
            instant: lamportsPerSignature
          };
        case "eip155":
        default:
          return await BlockchainApiController.fetchGasPrice({
            chainId: caipNetwork.caipNetworkId
          });
      }
    } catch {
      return null;
    }
  },
  async fetchSwapAllowance({ tokenAddress, userAddress, sourceTokenAmount, sourceTokenDecimals }) {
    const response = await BlockchainApiController.fetchSwapAllowance({
      tokenAddress,
      userAddress
    });
    if (response?.allowance && sourceTokenAmount && sourceTokenDecimals) {
      const parsedValue = ConnectionController.parseUnits(sourceTokenAmount, sourceTokenDecimals) || 0;
      const hasAllowance = BigInt(response.allowance) >= parsedValue;
      return hasAllowance;
    }
    return false;
  },
  async getMyTokensWithBalance(forceUpdate) {
    const balances = await BalanceUtil.getMyTokensWithBalance({
      forceUpdate,
      caipNetwork: ChainController.state.activeCaipNetwork,
      address: ChainController.getAccountData()?.address
    });
    ChainController.setAccountProp("tokenBalance", balances, ChainController.state.activeChain);
    return this.mapBalancesToSwapTokens(balances);
  },
  /**
   * Maps the balances from Blockchain API to SwapTokenWithBalance array
   * @param balances
   * @returns SwapTokenWithBalance[]
   */
  mapBalancesToSwapTokens(balances) {
    return balances?.map((token) => ({
      ...token,
      address: token?.address ? token.address : getActiveNetworkTokenAddress(),
      decimals: parseInt(token.quantity.decimals, 10),
      logoUri: token.iconUrl,
      eip2612: false
    })) || [];
  },
  async handleSwapError(error) {
    try {
      const cause = error?.cause;
      if (!cause?.json) {
        return void 0;
      }
      const response = await cause.json();
      const reason = response?.reasons?.[0]?.description;
      if (reason?.includes("insufficient liquidity")) {
        return "Insufficient liquidity";
      }
      return void 0;
    } catch {
      return void 0;
    }
  }
};
const state$9 = proxy({
  tokenBalances: [],
  loading: false
});
const controller$7 = {
  state: state$9,
  subscribe(callback) {
    return subscribe(state$9, () => callback(state$9));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$9, key, callback);
  },
  setToken(token) {
    if (token) {
      state$9.token = ref(token);
    }
  },
  setTokenAmount(sendTokenAmount) {
    state$9.sendTokenAmount = sendTokenAmount;
  },
  setReceiverAddress(receiverAddress) {
    state$9.receiverAddress = receiverAddress;
  },
  setReceiverProfileImageUrl(receiverProfileImageUrl) {
    state$9.receiverProfileImageUrl = receiverProfileImageUrl;
  },
  setReceiverProfileName(receiverProfileName) {
    state$9.receiverProfileName = receiverProfileName;
  },
  setNetworkBalanceInUsd(networkBalanceInUSD) {
    state$9.networkBalanceInUSD = networkBalanceInUSD;
  },
  setLoading(loading) {
    state$9.loading = loading;
  },
  getSdkEventProperties(error) {
    return {
      message: CoreHelperUtil.parseError(error),
      isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
      token: state$9.token?.symbol || "",
      amount: Number(state$9.sendTokenAmount ?? "0"),
      network: ChainController.state.activeCaipNetwork?.caipNetworkId || ""
    };
  },
  async sendToken() {
    try {
      SendController.setLoading(true);
      switch (ChainController.state.activeCaipNetwork?.chainNamespace) {
        case "eip155":
          await SendController.sendEvmToken();
          return;
        case "solana":
          await SendController.sendSolanaToken();
          return;
        default:
          throw new Error("Unsupported chain");
      }
    } catch (err) {
      if (ErrorUtil.isUserRejectedRequestError(err)) {
        throw new UserRejectedRequestError(err);
      }
      throw err;
    } finally {
      SendController.setLoading(false);
    }
  },
  async sendEvmToken() {
    const activeChainNamespace = ChainController.state.activeChain;
    if (!activeChainNamespace) {
      throw new Error("SendController:sendEvmToken - activeChainNamespace is required");
    }
    const activeAccountType = getPreferredAccountType(activeChainNamespace);
    if (!SendController.state.sendTokenAmount || !SendController.state.receiverAddress) {
      throw new Error("An amount and receiver address are required");
    }
    if (!SendController.state.token) {
      throw new Error("A token is required");
    }
    if (SendController.state.token?.address) {
      EventsController.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: activeAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: SendController.state.token.address,
          amount: Number(SendController.state.sendTokenAmount),
          network: ChainController.state.activeCaipNetwork?.caipNetworkId || ""
        }
      });
      const { hash } = await SendController.sendERC20Token({
        receiverAddress: SendController.state.receiverAddress,
        tokenAddress: SendController.state.token.address,
        sendTokenAmount: SendController.state.sendTokenAmount,
        decimals: SendController.state.token.quantity.decimals
      });
      if (hash) {
        state$9.hash = hash;
      }
    } else {
      EventsController.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: activeAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: SendController.state.token.symbol || "",
          amount: Number(SendController.state.sendTokenAmount),
          network: ChainController.state.activeCaipNetwork?.caipNetworkId || ""
        }
      });
      const { hash } = await SendController.sendNativeToken({
        receiverAddress: SendController.state.receiverAddress,
        sendTokenAmount: SendController.state.sendTokenAmount,
        decimals: SendController.state.token.quantity.decimals
      });
      if (hash) {
        state$9.hash = hash;
      }
    }
  },
  async fetchTokenBalance(onError) {
    state$9.loading = true;
    const namespace = ChainController.state.activeChain;
    const chainId = ChainController.state.activeCaipNetwork?.caipNetworkId;
    const chain = ChainController.state.activeCaipNetwork?.chainNamespace;
    const caipAddress = ChainController.getAccountData(namespace)?.caipAddress ?? ChainController.state.activeCaipAddress;
    const address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    if (state$9.lastRetry && !CoreHelperUtil.isAllowedRetry(state$9.lastRetry, 30 * ConstantsUtil.ONE_SEC_MS)) {
      state$9.loading = false;
      return [];
    }
    try {
      if (address && chainId && chain) {
        const balances = await BalanceUtil.getMyTokensWithBalance();
        state$9.tokenBalances = balances;
        state$9.lastRetry = void 0;
        return balances;
      }
    } catch (error) {
      state$9.lastRetry = Date.now();
      onError?.(error);
      SnackController.showError("Token Balance Unavailable");
    } finally {
      state$9.loading = false;
    }
    return [];
  },
  fetchNetworkBalance() {
    if (state$9.tokenBalances.length === 0) {
      return;
    }
    const networkTokenBalances = SwapApiUtil.mapBalancesToSwapTokens(state$9.tokenBalances);
    if (!networkTokenBalances) {
      return;
    }
    const networkToken = networkTokenBalances.find((token) => token.address === getActiveNetworkTokenAddress());
    if (!networkToken) {
      return;
    }
    state$9.networkBalanceInUSD = networkToken ? NumberUtil.multiply(networkToken.quantity.numeric, networkToken.price).toString() : "0";
  },
  async sendNativeToken(params) {
    RouterController.pushTransactionStack({});
    const to = params.receiverAddress;
    const address = ChainController.getAccountData()?.address;
    const value = ConnectionController.parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
    const data = "0x";
    const hash = await ConnectionController.sendTransaction({
      chainNamespace: ConstantsUtil$1.CHAIN.EVM,
      to,
      address,
      data,
      value: value ?? BigInt(0)
    });
    EventsController.sendEvent({
      type: "track",
      event: "SEND_SUCCESS",
      properties: {
        isSmartAccount: getPreferredAccountType("eip155") === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: SendController.state.token?.symbol || "",
        amount: Number(params.sendTokenAmount),
        network: ChainController.state.activeCaipNetwork?.caipNetworkId || "",
        hash: hash || ""
      }
    });
    ConnectionController._getClient()?.updateBalance("eip155");
    SendController.resetSend();
    return { hash };
  },
  async sendERC20Token(params) {
    RouterController.pushTransactionStack({
      onSuccess() {
        RouterController.replace("Account");
      }
    });
    const amount = ConnectionController.parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
    const address = ChainController.getAccountData()?.address;
    if (address && params.sendTokenAmount && params.receiverAddress && params.tokenAddress) {
      const tokenAddress = CoreHelperUtil.getPlainAddress(params.tokenAddress);
      if (!tokenAddress) {
        throw new Error("SendController:sendERC20Token - tokenAddress is required");
      }
      const hash = await ConnectionController.writeContract({
        fromAddress: address,
        tokenAddress,
        args: [params.receiverAddress, amount ?? BigInt(0)],
        method: "transfer",
        abi: ContractUtil.getERC20Abi(tokenAddress),
        chainNamespace: ConstantsUtil$1.CHAIN.EVM
      });
      EventsController.sendEvent({
        type: "track",
        event: "SEND_SUCCESS",
        properties: {
          isSmartAccount: getPreferredAccountType("eip155") === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: SendController.state.token?.symbol || "",
          amount: Number(params.sendTokenAmount),
          network: ChainController.state.activeCaipNetwork?.caipNetworkId || "",
          hash: hash || ""
        }
      });
      SendController.resetSend();
      return { hash };
    }
    return { hash: void 0 };
  },
  async sendSolanaToken() {
    if (!SendController.state.sendTokenAmount || !SendController.state.receiverAddress) {
      throw new Error("An amount and receiver address are required");
    }
    RouterController.pushTransactionStack({
      onSuccess() {
        RouterController.replace("Account");
      }
    });
    let tokenMint = void 0;
    if (SendController.state.token && SendController.state.token.address !== ConstantsUtil.SOLANA_NATIVE_TOKEN_ADDRESS) {
      if (CoreHelperUtil.isCaipAddress(SendController.state.token.address)) {
        tokenMint = CoreHelperUtil.getPlainAddress(SendController.state.token.address);
      } else {
        tokenMint = SendController.state.token.address;
      }
    }
    const hash = await ConnectionController.sendTransaction({
      chainNamespace: "solana",
      tokenMint,
      to: SendController.state.receiverAddress,
      value: Number(SendController.state.sendTokenAmount)
    });
    if (hash) {
      state$9.hash = hash;
    }
    ConnectionController._getClient()?.updateBalance("solana");
    EventsController.sendEvent({
      type: "track",
      event: "SEND_SUCCESS",
      properties: {
        isSmartAccount: false,
        token: SendController.state.token?.symbol || "",
        amount: Number(SendController.state.sendTokenAmount),
        network: ChainController.state.activeCaipNetwork?.caipNetworkId || "",
        hash: hash || ""
      }
    });
    SendController.resetSend();
  },
  resetSend() {
    state$9.token = void 0;
    state$9.sendTokenAmount = void 0;
    state$9.receiverAddress = void 0;
    state$9.receiverProfileImageUrl = void 0;
    state$9.receiverProfileName = void 0;
    state$9.loading = false;
    state$9.tokenBalances = [];
  }
};
const SendController = withErrorBoundary(controller$7);
const defaultAccountState = {
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: false,
  addressLabels: /* @__PURE__ */ new Map(),
  user: void 0,
  preferredAccountType: void 0
};
const networkState = {
  caipNetwork: void 0,
  supportsAllNetworks: true,
  smartAccountEnabledNetworks: []
};
const state$8 = proxy({
  chains: proxyMap(),
  activeCaipAddress: void 0,
  activeChain: void 0,
  activeCaipNetwork: void 0,
  noAdapters: false,
  universalAdapter: {
    connectionControllerClient: void 0
  },
  isSwitchingNamespace: false
});
const controller$6 = {
  state: state$8,
  subscribe(callback) {
    return subscribe(state$8, () => {
      callback(state$8);
    });
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$8, key, callback);
  },
  subscribeAccountStateProp(property, callback, chain) {
    const activeChain = chain || state$8.activeChain;
    if (!activeChain) {
      return () => void 0;
    }
    return subscribeKey(state$8.chains.get(activeChain)?.accountState || {}, property, callback);
  },
  subscribeChainProp(property, callback, chain) {
    let prev = void 0;
    return subscribe(state$8.chains, () => {
      const activeChain = chain || state$8.activeChain;
      if (activeChain) {
        const nextValue = state$8.chains.get(activeChain)?.[property];
        if (prev !== nextValue) {
          prev = nextValue;
          callback(nextValue);
        }
      }
    });
  },
  initialize(adapters, caipNetworks, clients) {
    const { chainId: activeChainId, namespace: activeNamespace } = StorageUtil.getActiveNetworkProps();
    const activeCaipNetwork = caipNetworks?.find((network) => network.id.toString() === activeChainId?.toString());
    const defaultAdapter = adapters.find((adapter) => adapter?.namespace === activeNamespace);
    const adapterToActivate = defaultAdapter || adapters?.[0];
    const namespacesFromAdapters = adapters.map((a) => a.namespace).filter((n) => n !== void 0);
    const namespaces = OptionsController.state.enableEmbedded ? /* @__PURE__ */ new Set([...namespacesFromAdapters]) : /* @__PURE__ */ new Set([...caipNetworks?.map((network) => network.chainNamespace) ?? []]);
    if (adapters?.length === 0 || !adapterToActivate) {
      state$8.noAdapters = true;
    }
    if (!state$8.noAdapters) {
      state$8.activeChain = adapterToActivate?.namespace;
      state$8.activeCaipNetwork = activeCaipNetwork;
      ChainController.setChainNetworkData(adapterToActivate?.namespace, {
        caipNetwork: activeCaipNetwork
      });
      if (state$8.activeChain) {
        PublicStateController.set({ activeChain: adapterToActivate?.namespace });
      }
    }
    namespaces.forEach((namespace) => {
      const namespaceNetworks = caipNetworks?.filter((network) => network.chainNamespace === namespace);
      const storedAccountTypes = StorageUtil.getPreferredAccountTypes() || {};
      const defaultTypes = { ...OptionsController.state.defaultAccountTypes, ...storedAccountTypes };
      ChainController.state.chains.set(namespace, {
        namespace,
        networkState: proxy({ ...networkState, caipNetwork: namespaceNetworks?.[0] }),
        accountState: proxy({
          ...defaultAccountState,
          preferredAccountType: defaultTypes[namespace]
        }),
        caipNetworks: namespaceNetworks ?? [],
        ...clients
      });
      ChainController.setRequestedCaipNetworks(namespaceNetworks ?? [], namespace);
    });
  },
  removeAdapter(namespace) {
    if (state$8.activeChain === namespace) {
      const nextAdapter = Array.from(state$8.chains.entries()).find(([chainNamespace]) => chainNamespace !== namespace);
      if (nextAdapter) {
        const caipNetwork = nextAdapter[1]?.caipNetworks?.[0];
        if (caipNetwork) {
          ChainController.setActiveCaipNetwork(caipNetwork);
        }
      }
    }
    state$8.chains.delete(namespace);
  },
  addAdapter(adapter, { connectionControllerClient }, caipNetworks) {
    if (!adapter.namespace) {
      throw new Error("ChainController:addAdapter - adapter must have a namespace");
    }
    state$8.chains.set(adapter.namespace, {
      namespace: adapter.namespace,
      networkState: { ...networkState, caipNetwork: caipNetworks[0] },
      accountState: { ...defaultAccountState },
      caipNetworks,
      connectionControllerClient
    });
    ChainController.setRequestedCaipNetworks(caipNetworks?.filter((caipNetwork) => caipNetwork.chainNamespace === adapter.namespace) ?? [], adapter.namespace);
  },
  addNetwork(network) {
    const chainAdapter = state$8.chains.get(network.chainNamespace);
    if (chainAdapter) {
      const newNetworks = [...chainAdapter.caipNetworks || []];
      if (!chainAdapter.caipNetworks?.find((caipNetwork) => caipNetwork.id === network.id)) {
        newNetworks.push(network);
      }
      state$8.chains.set(network.chainNamespace, { ...chainAdapter, caipNetworks: newNetworks });
      ChainController.setRequestedCaipNetworks(newNetworks, network.chainNamespace);
      ConnectorController.filterByNamespace(network.chainNamespace, true);
    }
  },
  removeNetwork(namespace, networkId) {
    const chainAdapter = state$8.chains.get(namespace);
    if (chainAdapter) {
      const isActiveNetwork = state$8.activeCaipNetwork?.id === networkId;
      const newCaipNetworksOfAdapter = [
        ...chainAdapter.caipNetworks?.filter((network) => network.id !== networkId) || []
      ];
      if (isActiveNetwork && chainAdapter?.caipNetworks?.[0]) {
        ChainController.setActiveCaipNetwork(chainAdapter.caipNetworks[0]);
      }
      state$8.chains.set(namespace, { ...chainAdapter, caipNetworks: newCaipNetworksOfAdapter });
      ChainController.setRequestedCaipNetworks(newCaipNetworksOfAdapter || [], namespace);
      if (newCaipNetworksOfAdapter.length === 0) {
        ConnectorController.filterByNamespace(namespace, false);
      }
    }
  },
  setAdapterNetworkState(chain, props) {
    const chainAdapter = state$8.chains.get(chain);
    if (chainAdapter) {
      chainAdapter.networkState = {
        ...chainAdapter.networkState || networkState,
        ...props
      };
      state$8.chains.set(chain, chainAdapter);
    }
  },
  setChainAccountData(chain, accountProps, _unknown = true) {
    if (!chain) {
      throw new Error("Chain is required to update chain account data");
    }
    const chainAdapter = state$8.chains.get(chain);
    if (chainAdapter) {
      const newAccountState = {
        ...chainAdapter.accountState || defaultAccountState,
        ...accountProps
      };
      state$8.chains.set(chain, { ...chainAdapter, accountState: newAccountState });
      if (state$8.chains.size === 1 || state$8.activeChain === chain) {
        if (accountProps.caipAddress) {
          state$8.activeCaipAddress = accountProps.caipAddress;
        }
      }
    }
  },
  setChainNetworkData(chain, networkProps) {
    if (!chain) {
      return;
    }
    const chainAdapter = state$8.chains.get(chain);
    if (chainAdapter) {
      const newNetworkState = { ...chainAdapter.networkState || networkState, ...networkProps };
      state$8.chains.set(chain, { ...chainAdapter, networkState: newNetworkState });
    }
  },
  // eslint-disable-next-line max-params
  setAccountProp(prop, value, chain, replaceState = true) {
    ChainController.setChainAccountData(chain, { [prop]: value }, replaceState);
  },
  setActiveNamespace(chain) {
    state$8.activeChain = chain;
    const newAdapter = chain ? state$8.chains.get(chain) : void 0;
    const caipNetwork = newAdapter?.networkState?.caipNetwork;
    if (caipNetwork?.id && chain) {
      state$8.activeCaipAddress = newAdapter?.accountState?.caipAddress;
      state$8.activeCaipNetwork = caipNetwork;
      ChainController.setChainNetworkData(chain, { caipNetwork });
      StorageUtil.setActiveCaipNetworkId(caipNetwork?.caipNetworkId);
      PublicStateController.set({
        activeChain: chain,
        selectedNetworkId: caipNetwork?.caipNetworkId
      });
    }
  },
  setActiveCaipNetwork(caipNetwork) {
    if (!caipNetwork) {
      return;
    }
    const isSameNamespace = state$8.activeChain === caipNetwork.chainNamespace;
    if (!isSameNamespace) {
      ChainController.setIsSwitchingNamespace(true);
    }
    const newAdapter = state$8.chains.get(caipNetwork.chainNamespace);
    state$8.activeChain = caipNetwork.chainNamespace;
    state$8.activeCaipNetwork = caipNetwork;
    ChainController.setChainNetworkData(caipNetwork.chainNamespace, { caipNetwork });
    let address = newAdapter?.accountState?.address;
    if (address) {
      state$8.activeCaipAddress = `${caipNetwork.chainNamespace}:${caipNetwork.id}:${address}`;
    } else if (isSameNamespace && state$8.activeCaipAddress) {
      const { address: parsedAddress } = ParseUtil.parseCaipAddress(state$8.activeCaipAddress);
      address = parsedAddress;
      state$8.activeCaipAddress = `${caipNetwork.caipNetworkId}:${address}`;
    } else {
      state$8.activeCaipAddress = void 0;
    }
    ChainController.setChainAccountData(caipNetwork.chainNamespace, {
      address,
      caipAddress: state$8.activeCaipAddress
    });
    SendController.resetSend();
    PublicStateController.set({
      activeChain: state$8.activeChain,
      selectedNetworkId: state$8.activeCaipNetwork?.caipNetworkId
    });
    StorageUtil.setActiveCaipNetworkId(caipNetwork.caipNetworkId);
    const isSupported = ChainController.checkIfSupportedNetwork(caipNetwork.chainNamespace);
    if (!isSupported && OptionsController.state.enableNetworkSwitch && !OptionsController.state.allowUnsupportedChain && !ConnectionController.state.wcBasic) {
      ChainController.showUnsupportedChainUI();
    }
  },
  addCaipNetwork(caipNetwork) {
    if (!caipNetwork) {
      return;
    }
    const chain = state$8.chains.get(caipNetwork.chainNamespace);
    if (chain) {
      chain?.caipNetworks?.push(caipNetwork);
    }
  },
  async switchActiveNamespace(namespace) {
    if (!namespace) {
      return;
    }
    const isDifferentChain = namespace !== ChainController.state.activeChain;
    const caipNetworkOfNamespace = ChainController.getNetworkData(namespace)?.caipNetwork;
    const firstNetworkWithChain = ChainController.getCaipNetworkByNamespace(namespace, caipNetworkOfNamespace?.id);
    if (isDifferentChain && firstNetworkWithChain) {
      await ChainController.switchActiveNetwork(firstNetworkWithChain);
    }
  },
  async switchActiveNetwork(network, { throwOnFailure = false } = {}) {
    const namespace = ChainController.state.activeChain;
    if (!namespace) {
      throw new Error("ChainController:switchActiveNetwork - namespace is required");
    }
    const isAuthProvider = ProviderController.getProviderId(state$8.activeChain) === "AUTH";
    const namespaceAddress = ChainController.getAccountData(namespace)?.address;
    const isAuthSupported = ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(network.chainNamespace);
    try {
      if (namespaceAddress && network.chainNamespace === namespace || isAuthProvider && isAuthSupported) {
        const adapter = AdapterController.get(network.chainNamespace);
        if (!adapter) {
          throw new Error("Adapter not found");
        }
        await adapter.switchNetwork({ caipNetwork: network });
      }
      ChainController.setActiveCaipNetwork(network);
    } catch (error) {
      if (throwOnFailure) {
        throw error;
      }
    }
    EventsController.sendEvent({
      type: "track",
      event: "SWITCH_NETWORK",
      properties: { network: network.caipNetworkId }
    });
  },
  getConnectionControllerClient(_chain) {
    const chain = _chain || state$8.activeChain;
    if (!chain) {
      throw new Error("Chain is required to get connection controller client");
    }
    const chainAdapter = state$8.chains.get(chain);
    if (!chainAdapter?.connectionControllerClient) {
      throw new Error("ConnectionController client not set");
    }
    return chainAdapter.connectionControllerClient;
  },
  getNetworkProp(key, namespace) {
    const chainNetworkState = state$8.chains.get(namespace)?.networkState;
    if (!chainNetworkState) {
      return void 0;
    }
    return chainNetworkState[key];
  },
  getRequestedCaipNetworks(chainToFilter) {
    const adapter = state$8.chains.get(chainToFilter);
    const { approvedCaipNetworkIds = [], requestedCaipNetworks = [] } = adapter?.networkState || {};
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    const filteredNetworks = sortedNetworks.filter((network) => network?.id);
    return filteredNetworks;
  },
  getAllRequestedCaipNetworks() {
    const requestedCaipNetworks = [];
    state$8.chains.forEach((chainAdapter) => {
      if (!chainAdapter.namespace) {
        throw new Error("ChainController:getAllRequestedCaipNetworks - chainAdapter must have a namespace");
      }
      const caipNetworks = ChainController.getRequestedCaipNetworks(chainAdapter.namespace);
      requestedCaipNetworks.push(...caipNetworks);
    });
    return requestedCaipNetworks;
  },
  setRequestedCaipNetworks(caipNetworks, chain) {
    ChainController.setAdapterNetworkState(chain, { requestedCaipNetworks: caipNetworks });
    const allRequestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const namespaces = allRequestedCaipNetworks.map((network) => network.chainNamespace);
    const uniqueNamespaces = Array.from(new Set(namespaces));
    ConnectorController.filterByNamespaces(uniqueNamespaces);
  },
  getAllApprovedCaipNetworkIds() {
    const approvedCaipNetworkIds = [];
    state$8.chains.forEach((chainAdapter) => {
      if (!chainAdapter.namespace) {
        throw new Error("ChainController:getAllApprovedCaipNetworkIds - chainAdapter must have a namespace");
      }
      const approvedIds = ChainController.getApprovedCaipNetworkIds(chainAdapter.namespace);
      approvedCaipNetworkIds.push(...approvedIds);
    });
    return approvedCaipNetworkIds;
  },
  getActiveCaipNetwork(chainNamespace) {
    if (chainNamespace) {
      return state$8.chains.get(chainNamespace)?.networkState?.caipNetwork;
    }
    return state$8.activeCaipNetwork;
  },
  getActiveCaipAddress() {
    return state$8.activeCaipAddress;
  },
  getApprovedCaipNetworkIds(namespace) {
    const adapter = state$8.chains.get(namespace);
    const approvedCaipNetworkIds = adapter?.networkState?.approvedCaipNetworkIds || [];
    return approvedCaipNetworkIds;
  },
  setApprovedCaipNetworksData(namespace, params) {
    ChainController.setAdapterNetworkState(namespace, params);
  },
  checkIfSupportedNetwork(namespace, caipNetworkId) {
    const activeCaipNetworkId = caipNetworkId || state$8.activeCaipNetwork?.caipNetworkId;
    const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(namespace);
    if (!requestedCaipNetworks.length) {
      return true;
    }
    return requestedCaipNetworks?.some((network) => network.caipNetworkId === activeCaipNetworkId);
  },
  checkIfSupportedChainId(chainId) {
    if (!state$8.activeChain) {
      return true;
    }
    const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(state$8.activeChain);
    return requestedCaipNetworks?.some((network) => network.id === chainId);
  },
  checkIfSmartAccountEnabled() {
    const networkId = NetworkUtil$1.caipNetworkIdToNumber(state$8.activeCaipNetwork?.caipNetworkId);
    const activeChain = state$8.activeChain;
    if (!activeChain || !networkId) {
      return false;
    }
    const smartAccountEnabledNetworks = W3mFrameStorage.get(W3mFrameConstants.SMART_ACCOUNT_ENABLED_NETWORKS)?.split(",") || [];
    return Boolean(smartAccountEnabledNetworks?.includes(networkId.toString()));
  },
  showUnsupportedChainUI() {
    ModalController.open({ view: "UnsupportedChain" });
  },
  checkIfNamesSupported() {
    const activeCaipNetwork = state$8.activeCaipNetwork;
    return Boolean(activeCaipNetwork?.chainNamespace && ConstantsUtil.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(activeCaipNetwork.chainNamespace));
  },
  resetNetwork(namespace) {
    ChainController.setAdapterNetworkState(namespace, {
      approvedCaipNetworkIds: void 0,
      supportsAllNetworks: true
    });
  },
  resetAccount(chain) {
    const chainToWrite = chain;
    if (!chainToWrite) {
      throw new Error("Chain is required to set account prop");
    }
    const currentAccountType = ChainController.state.chains.get(chainToWrite)?.accountState?.preferredAccountType;
    const optionsAccountType = OptionsController.state.defaultAccountTypes[chainToWrite];
    state$8.activeCaipAddress = void 0;
    ChainController.setChainAccountData(chainToWrite, {
      smartAccountDeployed: false,
      currentTab: 0,
      caipAddress: void 0,
      address: void 0,
      balance: void 0,
      balanceSymbol: void 0,
      profileName: void 0,
      profileImage: void 0,
      addressExplorerUrl: void 0,
      tokenBalance: [],
      connectedWalletInfo: void 0,
      preferredAccountType: optionsAccountType || currentAccountType,
      socialProvider: void 0,
      socialWindow: void 0,
      farcasterUrl: void 0,
      user: void 0,
      status: "disconnected"
    });
    ConnectorController.removeConnectorId(chainToWrite);
  },
  setIsSwitchingNamespace(isSwitchingNamespace) {
    state$8.isSwitchingNamespace = isSwitchingNamespace;
  },
  getFirstCaipNetworkSupportsAuthConnector() {
    const availableChains = [];
    let firstCaipNetwork = void 0;
    state$8.chains.forEach((chain) => {
      if (ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((ns) => ns === chain.namespace)) {
        if (chain.namespace) {
          availableChains.push(chain.namespace);
        }
      }
    });
    if (availableChains.length > 0) {
      const firstAvailableChain = availableChains[0];
      firstCaipNetwork = firstAvailableChain ? state$8.chains.get(firstAvailableChain)?.caipNetworks?.[0] : void 0;
      return firstCaipNetwork;
    }
    return void 0;
  },
  getAccountData(chainNamespace) {
    const namespace = chainNamespace || state$8.activeChain;
    if (!namespace) {
      return void 0;
    }
    return ChainController.state.chains.get(namespace)?.accountState;
  },
  getNetworkData(chainNamespace) {
    const namespace = chainNamespace || state$8.activeChain;
    if (!namespace) {
      return void 0;
    }
    return ChainController.state.chains.get(namespace)?.networkState;
  },
  getCaipNetworkByNamespace(chainNamespace, chainId) {
    if (!chainNamespace) {
      return void 0;
    }
    const chain = ChainController.state.chains.get(chainNamespace);
    const byChainId = chain?.caipNetworks?.find((network) => network.id.toString() === chainId?.toString());
    if (byChainId) {
      return byChainId;
    }
    return chain?.networkState?.caipNetwork || chain?.caipNetworks?.[0];
  },
  /**
   * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
   * @param namespace - The namespace to get the requested CaipNetwork IDs for
   * @returns The requested CaipNetwork IDs
   */
  getRequestedCaipNetworkIds() {
    const namespace = ConnectorController.state.filterByNamespace;
    const chains = namespace ? [state$8.chains.get(namespace)] : Array.from(state$8.chains.values());
    return chains.flatMap((chain) => chain?.caipNetworks || []).map((caipNetwork) => caipNetwork.caipNetworkId);
  },
  getCaipNetworks(namespace) {
    if (namespace) {
      return ChainController.getRequestedCaipNetworks(namespace);
    }
    return ChainController.getAllRequestedCaipNetworks();
  },
  getCaipNetworkById(id, namespace) {
    return controller$6.getCaipNetworks(namespace).find((n) => n.id.toString() === id.toString() || n.caipNetworkId.toString() === id.toString());
  },
  setLastConnectedSIWECaipNetwork(network) {
    state$8.lastConnectedSIWECaipNetwork = network;
  },
  getLastConnectedSIWECaipNetwork() {
    return state$8.lastConnectedSIWECaipNetwork;
  },
  async fetchTokenBalance(onError) {
    const accountState = ChainController.getAccountData();
    if (!accountState) {
      return [];
    }
    const chainId = ChainController.state.activeCaipNetwork?.caipNetworkId;
    const chain = ChainController.state.activeCaipNetwork?.chainNamespace;
    const caipAddress = ChainController.state.activeCaipAddress;
    const address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    ChainController.setAccountProp("balanceLoading", true, chain);
    if (accountState.lastRetry && !CoreHelperUtil.isAllowedRetry(accountState.lastRetry, 30 * ConstantsUtil.ONE_SEC_MS)) {
      ChainController.setAccountProp("balanceLoading", false, chain);
      return [];
    }
    try {
      if (address && chainId && chain) {
        const balance = await BalanceUtil.getMyTokensWithBalance();
        ChainController.setAccountProp("tokenBalance", balance, chain);
        ChainController.setAccountProp("lastRetry", void 0, chain);
        ChainController.setAccountProp("balanceLoading", false, chain);
        return balance;
      }
    } catch (error) {
      ChainController.setAccountProp("lastRetry", Date.now(), chain);
      onError?.(error);
      SnackController.showError("Token Balance Unavailable");
    } finally {
      ChainController.setAccountProp("balanceLoading", false, chain);
    }
    return [];
  },
  isCaipNetworkDisabled(network) {
    const networkNamespace = network.chainNamespace;
    const isNextNamespaceConnected = Boolean(ChainController.getAccountData(networkNamespace)?.caipAddress);
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const shouldSupportAllNetworks = ChainController.getNetworkProp("supportsAllNetworks", networkNamespace) !== false;
    const connectorId = ConnectorController.getConnectorId(networkNamespace);
    const authConnector = ConnectorController.getAuthConnector();
    const isConnectedWithAuth = connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH && authConnector;
    if (!isNextNamespaceConnected || shouldSupportAllNetworks || isConnectedWithAuth) {
      return false;
    }
    return !approvedCaipNetworkIds?.includes(network.caipNetworkId);
  }
};
const ChainController = withErrorBoundary(controller$6);
const NetworkUtil = {
  /**
   * Function to handle the network switch.
   * This function has variety of conditions to handle the network switch depending on the connectors or namespace's connection states.
   * @param args.network - The network to switch to.
   * @param args.shouldConfirmSwitch - Whether to confirm the switch. If true, the user will be asked to confirm the switch if necessary.
   * @returns void
   */
  onSwitchNetwork({ network, ignoreSwitchConfirmation = false }) {
    const currentNetwork = ChainController.state.activeCaipNetwork;
    const currentNamespace = ChainController.state.activeChain;
    const routerData = RouterController.state.data;
    const isSameNetwork = network.id === currentNetwork?.id;
    if (isSameNetwork) {
      return;
    }
    const isCurrentNamespaceConnected = Boolean(ChainController.getAccountData(currentNamespace)?.address);
    const isNextNamespaceConnected = Boolean(ChainController.getAccountData(network.chainNamespace)?.address);
    const isDifferentNamespace = network.chainNamespace !== currentNamespace;
    const connectorId = ConnectorController.getConnectorId(currentNamespace);
    const isConnectedWithAuth = connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH;
    const isSupportedForAuthConnector = ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((c) => c === network.chainNamespace);
    if (ignoreSwitchConfirmation || isConnectedWithAuth && isSupportedForAuthConnector) {
      RouterController.push("SwitchNetwork", { ...routerData, network });
    } else if (
      /**
       * If user switching to a different namespace and next namespace is not connected, we need to show switch active chain view for confirmation first.
       */
      isCurrentNamespaceConnected && isDifferentNamespace && !isNextNamespaceConnected
    ) {
      RouterController.push("SwitchActiveChain", {
        switchToChain: network.chainNamespace,
        navigateTo: "Connect",
        navigateWithReplace: true,
        network
      });
    } else {
      RouterController.push("SwitchNetwork", { ...routerData, network });
    }
  }
};
const state$7 = proxy({
  loading: false,
  loadingNamespaceMap: /* @__PURE__ */ new Map(),
  open: false,
  shake: false,
  namespace: void 0
});
const controller$5 = {
  state: state$7,
  subscribe(callback) {
    return subscribe(state$7, () => callback(state$7));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$7, key, callback);
  },
  async open(options) {
    const namespace = options?.namespace;
    const currentNamespace = ChainController.state.activeChain;
    const isSwitchingNamespace = namespace && namespace !== currentNamespace;
    const caipAddress = ChainController.getAccountData(options?.namespace)?.caipAddress;
    const hasNoAdapters = ChainController.state.noAdapters;
    if (ConnectionController.state.wcBasic) {
      ApiController.prefetch({
        fetchNetworkImages: false,
        fetchConnectorImages: false,
        fetchWalletRanks: false
      });
    } else {
      await ApiController.prefetch();
    }
    ConnectorController.setFilterByNamespace(options?.namespace);
    ModalController.setLoading(true, namespace);
    if (namespace && isSwitchingNamespace) {
      const namespaceNetwork = ChainController.getNetworkData(namespace)?.caipNetwork || ChainController.getRequestedCaipNetworks(namespace)[0];
      if (namespaceNetwork) {
        if (hasNoAdapters) {
          await ChainController.switchActiveNetwork(namespaceNetwork);
          RouterController.push("ConnectingWalletConnectBasic");
        } else {
          NetworkUtil.onSwitchNetwork({ network: namespaceNetwork, ignoreSwitchConfirmation: true });
        }
      }
    } else if (OptionsController.state.manualWCControl || hasNoAdapters && !caipAddress) {
      if (CoreHelperUtil.isMobile()) {
        RouterController.reset("AllWallets");
      } else {
        RouterController.reset("ConnectingWalletConnectBasic");
      }
    } else if (options?.view) {
      RouterController.reset(options.view, options.data);
    } else if (caipAddress) {
      RouterController.reset("Account");
    } else {
      RouterController.reset("Connect");
    }
    state$7.open = true;
    PublicStateController.set({ open: true });
    EventsController.sendEvent({
      type: "track",
      event: "MODAL_OPEN",
      properties: { connected: Boolean(caipAddress) }
    });
  },
  close() {
    const isEmbeddedEnabled = OptionsController.state.enableEmbedded;
    const isConnected = Boolean(ChainController.state.activeCaipAddress);
    if (state$7.open) {
      EventsController.sendEvent({
        type: "track",
        event: "MODAL_CLOSE",
        properties: { connected: isConnected }
      });
    }
    state$7.open = false;
    RouterController.reset("Connect");
    ModalController.clearLoading();
    if (isEmbeddedEnabled) {
      if (isConnected) {
        RouterController.replace("Account");
      } else {
        RouterController.push("Connect");
      }
    } else {
      PublicStateController.set({ open: false });
    }
    ConnectionController.resetUri();
  },
  setLoading(loading, namespace) {
    if (namespace) {
      state$7.loadingNamespaceMap.set(namespace, loading);
    }
    state$7.loading = loading;
    PublicStateController.set({ loading });
  },
  clearLoading() {
    state$7.loadingNamespaceMap.clear();
    state$7.loading = false;
    PublicStateController.set({ loading: false });
  },
  shake() {
    if (state$7.shake) {
      return;
    }
    state$7.shake = true;
    setTimeout(() => {
      state$7.shake = false;
    }, 500);
  }
};
const ModalController = withErrorBoundary(controller$5);
const USDC_CURRENCY_DEFAULT = {
  id: "2b92315d-eab7-5bef-84fa-089a131333f5",
  name: "USD Coin",
  symbol: "USDC",
  networks: [
    {
      name: "ethereum-mainnet",
      display_name: "Ethereum",
      chain_id: "1",
      contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    },
    {
      name: "polygon-mainnet",
      display_name: "Polygon",
      chain_id: "137",
      contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    }
  ]
};
const USD_CURRENCY_DEFAULT = {
  id: "USD",
  payment_method_limits: [
    {
      id: "card",
      min: "10.00",
      max: "7500.00"
    },
    {
      id: "ach_bank_account",
      min: "10.00",
      max: "25000.00"
    }
  ]
};
const defaultState = {
  providers: ONRAMP_PROVIDERS,
  selectedProvider: null,
  error: null,
  purchaseCurrency: USDC_CURRENCY_DEFAULT,
  paymentCurrency: USD_CURRENCY_DEFAULT,
  purchaseCurrencies: [USDC_CURRENCY_DEFAULT],
  paymentCurrencies: [],
  quotesLoading: false
};
const state$6 = proxy(defaultState);
const controller$4 = {
  state: state$6,
  subscribe(callback) {
    return subscribe(state$6, () => callback(state$6));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$6, key, callback);
  },
  setSelectedProvider(provider) {
    if (provider && provider.name === "meld") {
      const activeChain = ChainController.state.activeChain;
      const currency = activeChain === ConstantsUtil$1.CHAIN.SOLANA ? "SOL" : "USDC";
      const address = activeChain ? ChainController.state.chains.get(activeChain)?.accountState?.address ?? "" : "";
      const url = new URL(provider.url);
      url.searchParams.append("publicKey", MELD_PUBLIC_KEY);
      url.searchParams.append("destinationCurrencyCode", currency);
      url.searchParams.append("walletAddress", address);
      url.searchParams.append("externalCustomerId", OptionsController.state.projectId);
      state$6.selectedProvider = { ...provider, url: url.toString() };
    } else {
      state$6.selectedProvider = provider;
    }
  },
  setOnrampProviders(providers) {
    if (Array.isArray(providers) && providers.every((item) => typeof item === "string")) {
      const validOnramp = providers;
      const newProviders = ONRAMP_PROVIDERS.filter((provider) => validOnramp.includes(provider.name));
      state$6.providers = newProviders;
    } else {
      state$6.providers = [];
    }
  },
  setPurchaseCurrency(currency) {
    state$6.purchaseCurrency = currency;
  },
  setPaymentCurrency(currency) {
    state$6.paymentCurrency = currency;
  },
  setPurchaseAmount(amount) {
    OnRampController.state.purchaseAmount = amount;
  },
  setPaymentAmount(amount) {
    OnRampController.state.paymentAmount = amount;
  },
  async getAvailableCurrencies() {
    const options = await BlockchainApiController.getOnrampOptions();
    state$6.purchaseCurrencies = options.purchaseCurrencies;
    state$6.paymentCurrencies = options.paymentCurrencies;
    state$6.paymentCurrency = options.paymentCurrencies[0] || USD_CURRENCY_DEFAULT;
    state$6.purchaseCurrency = options.purchaseCurrencies[0] || USDC_CURRENCY_DEFAULT;
    await ApiController.fetchCurrencyImages(options.paymentCurrencies.map((currency) => currency.id));
    await ApiController.fetchTokenImages(options.purchaseCurrencies.map((currency) => currency.symbol));
  },
  async getQuote() {
    state$6.quotesLoading = true;
    try {
      const quote = await BlockchainApiController.getOnrampQuote({
        purchaseCurrency: state$6.purchaseCurrency,
        paymentCurrency: state$6.paymentCurrency,
        amount: state$6.paymentAmount?.toString() || "0",
        network: state$6.purchaseCurrency?.symbol
      });
      state$6.quotesLoading = false;
      state$6.purchaseAmount = Number(quote?.purchaseAmount.amount);
      return quote;
    } catch (error) {
      state$6.error = error.message;
      state$6.quotesLoading = false;
      return null;
    } finally {
      state$6.quotesLoading = false;
    }
  },
  resetState() {
    state$6.selectedProvider = null;
    state$6.error = null;
    state$6.purchaseCurrency = USDC_CURRENCY_DEFAULT;
    state$6.paymentCurrency = USD_CURRENCY_DEFAULT;
    state$6.purchaseCurrencies = [USDC_CURRENCY_DEFAULT];
    state$6.paymentCurrencies = [];
    state$6.paymentAmount = void 0;
    state$6.purchaseAmount = void 0;
    state$6.quotesLoading = false;
  }
};
const OnRampController = withErrorBoundary(controller$4);
const SLIP44_MSB = 2147483648;
const EnsUtil = {
  convertEVMChainIdToCoinType(chainId) {
    if (chainId >= SLIP44_MSB) {
      throw new Error("Invalid chainId");
    }
    return (SLIP44_MSB | chainId) >>> 0;
  }
};
const state$5 = proxy({
  suggestions: [],
  loading: false
});
const controller$3 = {
  state: state$5,
  subscribe(callback) {
    return subscribe(state$5, () => callback(state$5));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$5, key, callback);
  },
  async resolveName(name) {
    try {
      return await BlockchainApiController.lookupEnsName(name);
    } catch (e) {
      const error = e;
      throw new Error(error?.reasons?.[0]?.description || "Error resolving name");
    }
  },
  async isNameRegistered(name) {
    try {
      await BlockchainApiController.lookupEnsName(name);
      return true;
    } catch {
      return false;
    }
  },
  async getSuggestions(value) {
    try {
      state$5.loading = true;
      state$5.suggestions = [];
      const response = await BlockchainApiController.getEnsNameSuggestions(value);
      state$5.suggestions = response.suggestions || [];
      return state$5.suggestions;
    } catch (e) {
      const errorMessage = EnsController.parseEnsApiError(e, "Error fetching name suggestions");
      throw new Error(errorMessage);
    } finally {
      state$5.loading = false;
    }
  },
  async getNamesForAddress(address) {
    try {
      const network = ChainController.state.activeCaipNetwork;
      if (!network) {
        return [];
      }
      const cachedEns = StorageUtil.getEnsFromCacheForAddress(address);
      if (cachedEns) {
        return cachedEns;
      }
      const response = await BlockchainApiController.reverseLookupEnsName({ address });
      StorageUtil.updateEnsCache({
        address,
        ens: response,
        timestamp: Date.now()
      });
      return response;
    } catch (e) {
      const errorMessage = EnsController.parseEnsApiError(e, "Error fetching names for address");
      throw new Error(errorMessage);
    }
  },
  async registerName(name) {
    const network = ChainController.state.activeCaipNetwork;
    const address = ChainController.getAccountData(network?.chainNamespace)?.address;
    const emailConnector = ConnectorController.getAuthConnector();
    if (!network) {
      throw new Error("Network not found");
    }
    if (!address || !emailConnector) {
      throw new Error("Address or auth connector not found");
    }
    state$5.loading = true;
    try {
      const message = JSON.stringify({
        name,
        attributes: {},
        // Unix timestamp
        timestamp: Math.floor(Date.now() / 1e3)
      });
      RouterController.pushTransactionStack({
        onCancel() {
          RouterController.replace("RegisterAccountName");
        }
      });
      const signature = await ConnectionController.signMessage(message);
      state$5.loading = false;
      const networkId = network.id;
      if (!networkId) {
        throw new Error("Network not found");
      }
      const coinType = EnsUtil.convertEVMChainIdToCoinType(Number(networkId));
      await BlockchainApiController.registerEnsName({
        coinType,
        address,
        signature,
        message
      });
      ChainController.setAccountProp("profileName", name, network.chainNamespace);
      StorageUtil.updateEnsCache({
        address,
        ens: [
          {
            name,
            registered_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: void 0,
            addresses: {},
            attributes: []
          }
        ],
        timestamp: Date.now()
      });
      RouterController.replace("RegisterAccountNameSuccess");
    } catch (e) {
      const errorMessage = EnsController.parseEnsApiError(e, `Error registering name ${name}`);
      RouterController.replace("RegisterAccountName");
      throw new Error(errorMessage);
    } finally {
      state$5.loading = false;
    }
  },
  validateName(name) {
    return /^[a-zA-Z0-9-]{4,}$/u.test(name);
  },
  parseEnsApiError(error, defaultError) {
    const ensError = error;
    return ensError?.reasons?.[0]?.description || defaultError;
  }
};
const EnsController = withErrorBoundary(controller$3);
function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}
function parseSchemelessHostPort(pattern) {
  const parts = pattern.split("/");
  const withoutPath = parts.length > 0 && parts[0] !== void 0 ? parts[0] : "";
  const lastColon = withoutPath.lastIndexOf(":");
  if (lastColon === -1) {
    return { host: withoutPath };
  }
  return {
    host: withoutPath.slice(0, lastColon),
    port: withoutPath.slice(lastColon + 1)
  };
}
function parseOriginRaw(origin) {
  const schemeIdx = origin.indexOf("://");
  if (schemeIdx === -1) {
    return null;
  }
  const scheme = origin.slice(0, schemeIdx);
  const start = schemeIdx + 3;
  let end = origin.indexOf("/", start);
  if (end === -1) {
    end = origin.length;
  }
  const hostPort = origin.slice(start, end);
  const lastColon = hostPort.lastIndexOf(":");
  if (lastColon === -1) {
    return { scheme, host: hostPort };
  }
  return { scheme, host: hostPort.slice(0, lastColon), port: hostPort.slice(lastColon + 1) };
}
function matchNonWildcardPattern(currentOrigin, pattern) {
  if (pattern.includes("://")) {
    const url = parseUrl(pattern);
    return url ? url.origin === currentOrigin : false;
  }
  const { host, port } = parseSchemelessHostPort(pattern);
  const schemeIdx = currentOrigin.indexOf("://");
  if (schemeIdx !== -1) {
    const start = schemeIdx + 3;
    let end = currentOrigin.indexOf("/", start);
    if (end === -1) {
      end = currentOrigin.length;
    }
    const rawHostPort = currentOrigin.slice(start, end);
    if (port !== void 0) {
      return `${host}:${port}` === rawHostPort;
    }
    const rawHostOnly = rawHostPort.split(":")[0];
    return host === rawHostOnly;
  }
  const current = parseUrl(currentOrigin);
  if (!current) {
    return false;
  }
  if (port !== void 0) {
    return host === current.hostname && port === (current.port || void 0);
  }
  return host === current.hostname;
}
function matchWildcardPattern(current, currentOrigin, pattern) {
  let working = pattern;
  let scheme = void 0;
  const schemeIdx = working.indexOf("://");
  if (schemeIdx !== -1) {
    scheme = working.slice(0, schemeIdx);
    working = working.slice(schemeIdx + 3);
  }
  const slashIdx = working.indexOf("/");
  if (slashIdx !== -1) {
    working = working.slice(0, slashIdx);
  }
  let hostPart = working;
  let portPart = void 0;
  const lastColon = hostPart.lastIndexOf(":");
  if (lastColon !== -1) {
    portPart = hostPart.slice(lastColon + 1);
    hostPart = hostPart.slice(0, lastColon);
  }
  const patternLabels = hostPart.split(".");
  for (const label of patternLabels) {
    if (label.includes("*") && label !== "*") {
      return false;
    }
  }
  const currentScheme = current.protocol.replace(/:$/u, "");
  if (scheme && scheme !== currentScheme) {
    return false;
  }
  if (portPart !== void 0) {
    if (portPart !== "*" && portPart !== current.port) {
      return false;
    }
  }
  const raw = parseOriginRaw(currentOrigin);
  const hostForCompare = raw ? raw.host : current.hostname;
  const currentLabels = hostForCompare.split(".");
  if (patternLabels.length !== currentLabels.length) {
    return false;
  }
  for (let i = patternLabels.length - 1; i >= 0; i -= 1) {
    const p = patternLabels[i];
    const c = currentLabels[i];
    if (p !== "*" && p !== c) {
      return false;
    }
  }
  return true;
}
const DEFAULT_METHODS = {
  ton: ["ton_sendMessage", "ton_signData"],
  solana: [
    "solana_signMessage",
    "solana_signTransaction",
    "solana_requestAccounts",
    "solana_getAccounts",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction"
  ],
  eip155: [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "personal_sign",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
    // EIP-5792
    "wallet_getCallsStatus",
    "wallet_showCallsStatus",
    "wallet_sendCalls",
    "wallet_getCapabilities",
    // EIP-7715
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    //EIP-7811
    "wallet_getAssets"
  ],
  bip122: ["sendTransfer", "signMessage", "signPsbt", "getAccountAddresses"],
  tron: ["tron_signMessage", "tron_signTransaction"]
};
const WcHelpersUtil = {
  RPC_ERROR_CODE: {
    USER_REJECTED: 5e3,
    USER_REJECTED_METHODS: 5002
  },
  /**
   * Retrieves the array of supported methods for a given chain namespace.
   * @param chainNamespace - The chain namespace.
   * @returns An array of method strings.
   */
  getMethodsByChainNamespace(chainNamespace) {
    return DEFAULT_METHODS[chainNamespace] || [];
  },
  /**
   * Creates a default WalletConnect namespace configuration for the given chain namespace.
   * @param chainNamespace - The chain namespace.
   * @returns The default Namespace object.
   */
  createDefaultNamespace(chainNamespace) {
    return {
      methods: this.getMethodsByChainNamespace(chainNamespace),
      events: ["accountsChanged", "chainChanged"],
      chains: [],
      rpcMap: {}
    };
  },
  /**
   * Applies overrides to the base WalletConnect NamespaceConfig.
   * @param baseNamespaces - The base namespace configuration.
   * @param overrides - Optional overrides for methods, chains, events, rpcMap.
   * @returns The resulting NamespaceConfig with overrides applied.
   */
  applyNamespaceOverrides(baseNamespaces, overrides) {
    if (!overrides) {
      return { ...baseNamespaces };
    }
    const result = { ...baseNamespaces };
    const namespacesToOverride = /* @__PURE__ */ new Set();
    if (overrides.methods) {
      Object.keys(overrides.methods).forEach((ns) => namespacesToOverride.add(ns));
    }
    if (overrides.chains) {
      Object.keys(overrides.chains).forEach((ns) => namespacesToOverride.add(ns));
    }
    if (overrides.events) {
      Object.keys(overrides.events).forEach((ns) => namespacesToOverride.add(ns));
    }
    if (overrides.rpcMap) {
      Object.keys(overrides.rpcMap).forEach((chainId) => {
        const [ns] = chainId.split(":");
        if (ns) {
          namespacesToOverride.add(ns);
        }
      });
    }
    namespacesToOverride.forEach((ns) => {
      if (!result[ns]) {
        result[ns] = this.createDefaultNamespace(ns);
      }
    });
    if (overrides.methods) {
      Object.entries(overrides.methods).forEach(([ns, methods]) => {
        if (result[ns]) {
          result[ns].methods = methods;
        }
      });
    }
    if (overrides.chains) {
      Object.entries(overrides.chains).forEach(([ns, chains]) => {
        if (result[ns]) {
          result[ns].chains = chains;
        }
      });
    }
    if (overrides.events) {
      Object.entries(overrides.events).forEach(([ns, events]) => {
        if (result[ns]) {
          result[ns].events = events;
        }
      });
    }
    if (overrides.rpcMap) {
      const processedNamespaces = /* @__PURE__ */ new Set();
      Object.entries(overrides.rpcMap).forEach(([chainId, rpcUrl]) => {
        const [ns, id] = chainId.split(":");
        if (!ns || !id || !result[ns]) {
          return;
        }
        if (!result[ns].rpcMap) {
          result[ns].rpcMap = {};
        }
        if (!processedNamespaces.has(ns)) {
          result[ns].rpcMap = {};
          processedNamespaces.add(ns);
        }
        result[ns].rpcMap[id] = rpcUrl;
      });
    }
    return result;
  },
  /**
   * Creates WalletConnect namespaces based on CAIP network definitions,
   * optionally applying custom overrides.
   * @param caipNetworks - Array of CaipNetwork definitions.
   * @param configOverride - Optional overrides for namespaces.
   * @returns The resulting NamespaceConfig.
   */
  createNamespaces(caipNetworks, configOverride) {
    const defaultNamespaces = caipNetworks.reduce((acc, chain) => {
      const { id, chainNamespace, rpcUrls } = chain;
      const rpcUrl = rpcUrls.default.http[0];
      if (!acc[chainNamespace]) {
        acc[chainNamespace] = this.createDefaultNamespace(chainNamespace);
      }
      const caipNetworkId = `${chainNamespace}:${id}`;
      const namespace = acc[chainNamespace];
      namespace.chains.push(caipNetworkId);
      switch (caipNetworkId) {
        case "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp":
          namespace.chains.push("solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ");
          break;
        case "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1":
          namespace.chains.push("solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K");
          break;
      }
      if (namespace?.rpcMap && rpcUrl) {
        namespace.rpcMap[id] = rpcUrl;
      }
      return acc;
    }, {});
    return this.applyNamespaceOverrides(defaultNamespaces, configOverride);
  },
  /**
   * Resolves a Reown/ENS name to its first matching address across configured networks.
   * @param name - The ENS or Reown name to resolve.
   * @returns The resolved address as a string, or false if not found.
   */
  resolveReownName: async (name) => {
    const wcNameAddress = await EnsController.resolveName(name);
    const networkNameAddresses = wcNameAddress?.addresses ? Object.values(wcNameAddress.addresses) : [];
    return networkNameAddresses[0]?.address || false;
  },
  /**
   * Extracts all CAIP network IDs used in given WalletConnect namespaces.
   * @param namespaces - WalletConnect Namespaces object.
   * @returns Array of CAIP network IDs (chainNamespace:chainId).
   */
  getChainsFromNamespaces(namespaces = {}) {
    return Object.values(namespaces).flatMap((namespace) => {
      const chains = namespace.chains || [];
      const accountsChains = namespace.accounts.map((account) => {
        const [chainNamespace, chainId] = account.split(":");
        return `${chainNamespace}:${chainId}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...chains, ...accountsChains]));
    });
  },
  /**
   * Type guard to check if an object is a WalletConnect session event data.
   * @param data - The data to check.
   * @returns True if data matches SessionEventData structure.
   */
  isSessionEventData(data) {
    return typeof data === "object" && data !== null && "id" in data && "topic" in data && "params" in data && typeof data.params === "object" && data.params !== null && "chainId" in data.params && "event" in data.params && typeof data.params.event === "object" && data.params.event !== null;
  },
  /**
   * Detects if an error object represents a user-rejected WalletConnect request.
   * @param error - The error object to check.
   * @returns True if user rejected request, otherwise false.
   */
  isUserRejectedRequestError(error) {
    try {
      if (typeof error === "object" && error !== null) {
        const objErr = error;
        const hasCode = typeof objErr["code"] === "number";
        const hasUserRejectedMethods = hasCode && objErr["code"] === WcHelpersUtil.RPC_ERROR_CODE.USER_REJECTED_METHODS;
        const hasUserRejected = hasCode && objErr["code"] === WcHelpersUtil.RPC_ERROR_CODE.USER_REJECTED;
        return hasUserRejectedMethods || hasUserRejected;
      }
      return false;
    } catch {
      return false;
    }
  },
  /**
   * Checks if a current origin is allowed by configured allowed and default origin patterns.
   * Localhost and 127.0.0.1 are always allowed.
   * @param currentOrigin - The current web origin.
   * @param allowedPatterns - Patterns from project configuration.
   * @param defaultAllowedOrigins - Built-in or default allowed patterns.
   * @returns True if the origin is allowed, false otherwise.
   */
  isOriginAllowed(currentOrigin, allowedPatterns, defaultAllowedOrigins) {
    const patterns = [...allowedPatterns, ...defaultAllowedOrigins];
    if (allowedPatterns.length === 0) {
      return true;
    }
    const current = parseUrl(currentOrigin);
    if (!current) {
      return patterns.some((pattern) => !pattern.includes("*") && pattern === currentOrigin);
    }
    if (current.hostname === "localhost" || current.hostname === "127.0.0.1") {
      return true;
    }
    for (const pattern of patterns) {
      if (pattern.includes("*")) {
        if (matchWildcardPattern(current, currentOrigin, pattern)) {
          return true;
        }
      } else if (matchNonWildcardPattern(currentOrigin, pattern)) {
        return true;
      }
    }
    return false;
  },
  /**
   * Attaches event listeners to a UniversalProvider instance for WalletConnect events.
   * @param params - The listener parameters including handlers for connect, disconnect, etc.
   */
  listenWcProvider({ universalProvider, namespace, onConnect, onDisconnect, onAccountsChanged, onChainChanged, onDisplayUri }) {
    if (onConnect) {
      universalProvider.on("connect", () => {
        const accounts = WcHelpersUtil.getWalletConnectAccounts(universalProvider, namespace);
        onConnect(accounts);
      });
    }
    if (onDisconnect) {
      universalProvider.on("disconnect", () => {
        onDisconnect();
      });
    }
    if (onAccountsChanged) {
      universalProvider.on("accountsChanged", (accounts) => {
        try {
          const allAccounts = universalProvider.session?.namespaces?.[namespace]?.accounts || [];
          const defaultChain = universalProvider.rpcProviders?.[namespace]?.getDefaultChain();
          const parsedAccounts = accounts.map((account) => {
            const caipAccount = allAccounts.find((acc) => acc.includes(`${namespace}:${defaultChain}:${account}`));
            if (!caipAccount) {
              return void 0;
            }
            const { chainId, chainNamespace } = ParseUtil.parseCaipAddress(caipAccount);
            return {
              address: account,
              chainId,
              chainNamespace
            };
          }).filter((account) => account !== void 0);
          if (parsedAccounts.length > 0) {
            onAccountsChanged(parsedAccounts);
          }
        } catch (error) {
          console.warn("Failed to parse accounts for namespace on accountsChanged event", namespace, accounts, error);
        }
      });
    }
    if (onChainChanged) {
      universalProvider.on("chainChanged", (chainId) => {
        onChainChanged(chainId);
      });
    }
    if (onDisplayUri) {
      universalProvider.on("display_uri", (uri) => {
        onDisplayUri(uri);
      });
    }
  },
  /**
   * Retrieves and parses the unique set of accounts for a given WalletConnect namespace.
   * @param universalProvider - The UniversalProvider instance.
   * @param namespace - The chain namespace to extract accounts for.
   * @returns Array of parsed CaipAddress objects.
   */
  getWalletConnectAccounts(universalProvider, namespace) {
    const accountsAdded = /* @__PURE__ */ new Set();
    const accounts = universalProvider?.session?.namespaces?.[namespace]?.accounts?.map((account) => ParseUtil.parseCaipAddress(account)).filter(({ address }) => {
      if (accountsAdded.has(address.toLowerCase())) {
        return false;
      }
      accountsAdded.add(address.toLowerCase());
      return true;
    });
    if (accounts && accounts.length > 0) {
      return accounts;
    }
    return [];
  }
};
const IGNORED_CONNECTOR_IDS_FOR_LISTENER = [
  ConstantsUtil$1.CONNECTOR_ID.AUTH,
  ConstantsUtil$1.CONNECTOR_ID.WALLET_CONNECT
];
class AdapterBlueprint {
  /**
   * Creates an instance of AdapterBlueprint.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  constructor(params) {
    this.availableConnectors = [];
    this.availableConnections = [];
    this.providerHandlers = {};
    this.eventListeners = /* @__PURE__ */ new Map();
    this.getCaipNetworks = (namespace) => ChainController.getCaipNetworks(namespace);
    this.getConnectorId = (namespace) => ConnectorController.getConnectorId(namespace);
    if (params) {
      this.construct(params);
    }
  }
  /**
   * Initializes the adapter with the given parameters.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  construct(params) {
    this.projectId = params.projectId;
    this.namespace = params.namespace;
    this.adapterType = params.adapterType;
  }
  /**
   * Gets the available connectors.
   * @returns {Connector[]} An array of available connectors
   */
  get connectors() {
    return this.availableConnectors;
  }
  /**
   * Gets the available connections.
   * @returns {Connection[]} An array of available connections
   */
  get connections() {
    return this.availableConnections;
  }
  /**
   * Gets the supported networks.
   * @returns {CaipNetwork[]} An array of supported networks
   */
  get networks() {
    return this.getCaipNetworks(this.namespace);
  }
  /**
   * Handles the auth connected event.
   * @param {W3mFrameTypes.Responses['FrameGetUserResponse']} user - The user response
   */
  onAuthConnected({ accounts, chainId }) {
    const caipNetwork = this.getCaipNetworks().filter((n) => n.chainNamespace === this.namespace).find((n) => n.id.toString() === chainId?.toString());
    if (accounts && caipNetwork) {
      this.addConnection({
        connectorId: ConstantsUtil$1.CONNECTOR_ID.AUTH,
        accounts,
        caipNetwork
      });
    }
  }
  /**
   * Sets the auth provider.
   * @param {W3mFrameProvider} authProvider - The auth provider instance
   */
  setAuthProvider(authProvider) {
    authProvider.onConnect(this.onAuthConnected.bind(this));
    authProvider.onSocialConnected(this.onAuthConnected.bind(this));
    this.addConnector({
      id: ConstantsUtil$1.CONNECTOR_ID.AUTH,
      type: "AUTH",
      name: ConstantsUtil$1.CONNECTOR_NAMES.AUTH,
      provider: authProvider,
      imageId: void 0,
      chain: this.namespace,
      chains: []
    });
  }
  /**
   * Adds one or more connectors to the available connectors list.
   * @param {...Connector} connectors - The connectors to add
   */
  addConnector(...connectors) {
    const connectorsAdded = /* @__PURE__ */ new Set();
    this.availableConnectors = [...connectors, ...this.availableConnectors].filter((connector) => {
      if (connectorsAdded.has(connector.id)) {
        return false;
      }
      connectorsAdded.add(connector.id);
      return true;
    });
    this.emit("connectors", this.availableConnectors);
  }
  /**
   * Adds connections to the available connections list
   * @param {...Connection} connections - The connections to add
   */
  addConnection(...connections) {
    const connectionsAdded = /* @__PURE__ */ new Set();
    this.availableConnections = [...connections, ...this.availableConnections].filter((connection) => {
      if (connectionsAdded.has(connection.connectorId.toLowerCase())) {
        return false;
      }
      connectionsAdded.add(connection.connectorId.toLowerCase());
      return true;
    });
    this.emit("connections", this.availableConnections);
  }
  /**
   * Deletes a connection from the available connections list
   * @param {string} connectorId - The connector ID of the connection to delete
   */
  deleteConnection(connectorId) {
    this.availableConnections = this.availableConnections.filter((c) => c.connectorId.toLowerCase() !== connectorId.toLowerCase());
    this.emit("connections", this.availableConnections);
  }
  /**
   * Clears all connections from the available connections list
   * @param {boolean} emit - Whether to emit the connections event
   */
  clearConnections(emit = false) {
    this.availableConnections = [];
    if (emit) {
      this.emit("connections", this.availableConnections);
    }
  }
  setStatus(status, chainNamespace) {
    ChainController.setAccountProp("status", status, chainNamespace);
  }
  /**
   * Adds an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
   */
  on(eventName, callback) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, /* @__PURE__ */ new Set());
    }
    this.eventListeners.get(eventName)?.add(callback);
  }
  /**
   * Removes an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be removed
   */
  off(eventName, callback) {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.delete(callback);
    }
  }
  /**
   * Removes all event listeners.
   */
  removeAllEventListeners() {
    this.eventListeners.forEach((listeners) => {
      listeners.clear();
    });
  }
  /**
   * Emits an event with the given name and optional data.
   * @template T
   * @param {T} eventName - The name of the event to emit
   * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
   */
  emit(eventName, data) {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }
  /**
   * Connects to WalletConnect.
   * @param {number | string} [_chainId] - Optional chain ID to connect to
   */
  async connectWalletConnect(_chainId) {
    try {
      const connector = this.getWalletConnectConnector();
      const result = await connector.connectWalletConnect();
      return { clientId: result.clientId };
    } catch (err) {
      if (WcHelpersUtil.isUserRejectedRequestError(err)) {
        throw new UserRejectedRequestError(err);
      }
      throw err;
    }
  }
  /**
   * Switches the network.
   * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
   */
  async switchNetwork(params) {
    const { caipNetwork } = params;
    const providerType = ProviderController.getProviderId(caipNetwork.chainNamespace);
    const provider = ProviderController.getProvider(caipNetwork.chainNamespace);
    if (!provider) {
      throw new Error("Provider not found");
    }
    if (providerType === "WALLET_CONNECT") {
      const walletConnectProvider = provider;
      walletConnectProvider.setDefaultChain(caipNetwork.caipNetworkId);
      return;
    }
    if (providerType === "AUTH") {
      const authProvider = ConnectorController.getAuthConnector()?.provider;
      if (!authProvider) {
        throw new Error("Auth provider not found");
      }
      const preferredAccountType = getPreferredAccountType(caipNetwork.chainNamespace);
      await authProvider.switchNetwork({ chainId: caipNetwork.caipNetworkId });
      const user = await authProvider.getUser({
        chainId: caipNetwork.caipNetworkId,
        preferredAccountType
      });
      this.emit("switchNetwork", user);
    }
  }
  getWalletConnectConnector() {
    const connector = this.connectors.find((c) => c.id === "walletConnect");
    if (!connector) {
      throw new Error("WalletConnectConnector not found");
    }
    return connector;
  }
  /**
   * Handles connect event for a specific connector.
   * @param {string[]} accounts - The accounts that changed
   * @param {string} connectorId - The ID of the connector
   */
  onConnect(accounts, connectorId) {
    if (accounts.length > 0) {
      const { address, chainId } = CoreHelperUtil.getAccount(accounts[0]);
      const caipNetwork = this.getCaipNetworks().filter((n) => n.chainNamespace === this.namespace).find((n) => n.id.toString() === chainId?.toString());
      const connector = this.connectors.find((c) => c.id === connectorId);
      if (address) {
        this.emit("accountChanged", {
          address,
          chainId,
          connector
        });
        this.addConnection({
          connectorId,
          accounts: accounts.map((_account) => {
            const { address: address2 } = CoreHelperUtil.getAccount(_account);
            return { address: address2 };
          }),
          caipNetwork
        });
      }
    }
  }
  /**
   * Handles accounts changed event for a specific connector.
   * @param {string[]} accounts - The accounts that changed
   * @param {string} connectorId - The ID of the connector
   */
  onAccountsChanged(accounts, connectorId, disconnectIfNoAccounts = true) {
    if (accounts.length > 0) {
      const { address } = CoreHelperUtil.getAccount(accounts[0]);
      const connection = this.getConnection({
        connectorId,
        connections: this.connections,
        connectors: this.connectors
      });
      if (address && this.getConnectorId(ConstantsUtil$1.CHAIN.EVM)?.toLowerCase() === connectorId.toLowerCase()) {
        this.emit("accountChanged", {
          address,
          chainId: connection?.caipNetwork?.id,
          connector: connection?.connector
        });
      }
      this.addConnection({
        connectorId,
        accounts: accounts.map((_account) => {
          const { address: address2 } = CoreHelperUtil.getAccount(_account);
          return { address: address2 };
        }),
        caipNetwork: connection?.caipNetwork
      });
    } else if (disconnectIfNoAccounts) {
      this.onDisconnect(connectorId);
    }
  }
  /**
   * Handles disconnect event for a specific connector.
   * @param {string} connectorId - The ID of the connector
   */
  onDisconnect(connectorId) {
    this.removeProviderListeners(connectorId);
    this.deleteConnection(connectorId);
    if (this.getConnectorId(ConstantsUtil$1.CHAIN.EVM)?.toLowerCase() === connectorId.toLowerCase()) {
      this.emitFirstAvailableConnection();
    }
    if (this.connections.length === 0) {
      this.emit("disconnect");
    }
  }
  /**
   * Handles chain changed event for a specific connector.
   * @param {string} chainId - The ID of the chain that changed
   * @param {string} connectorId - The ID of the connector
   */
  onChainChanged(chainId, connectorId) {
    const formattedChainId = typeof chainId === "string" && chainId.startsWith("0x") ? parseInt(chainId, 16).toString() : chainId.toString();
    const connection = this.getConnection({
      connectorId,
      connections: this.connections,
      connectors: this.connectors
    });
    const caipNetwork = this.getCaipNetworks().filter((n) => n.chainNamespace === this.namespace).find((n) => n.id.toString() === formattedChainId);
    if (connection) {
      this.addConnection({
        connectorId,
        accounts: connection.accounts,
        caipNetwork
      });
    }
    if (this.getConnectorId(ConstantsUtil$1.CHAIN.EVM)?.toLowerCase() === connectorId.toLowerCase()) {
      this.emit("switchNetwork", { chainId: formattedChainId });
    }
  }
  /**
   * Listens to provider events for a specific connector.
   * @param {string} connectorId - The ID of the connector
   * @param {Provider | CombinedProvider} provider - The provider to listen to
   */
  listenProviderEvents(connectorId, provider) {
    if (IGNORED_CONNECTOR_IDS_FOR_LISTENER.includes(connectorId)) {
      return;
    }
    const accountsChangedHandler = (accounts) => this.onAccountsChanged(accounts, connectorId);
    const chainChangedHandler = (chainId) => this.onChainChanged(chainId, connectorId);
    const disconnectHandler = () => this.onDisconnect(connectorId);
    if (!this.providerHandlers[connectorId]) {
      provider.on("disconnect", disconnectHandler);
      provider.on("accountsChanged", accountsChangedHandler);
      provider.on("chainChanged", chainChangedHandler);
      this.providerHandlers[connectorId] = {
        provider,
        disconnect: disconnectHandler,
        accountsChanged: accountsChangedHandler,
        chainChanged: chainChangedHandler
      };
    }
  }
  /**
   * Removes provider listeners for a specific connector.
   * @param {string} connectorId - The ID of the connector
   */
  removeProviderListeners(connectorId) {
    if (this.providerHandlers[connectorId]) {
      const { provider, disconnect, accountsChanged, chainChanged } = this.providerHandlers[connectorId];
      provider.removeListener("disconnect", disconnect);
      provider.removeListener("accountsChanged", accountsChanged);
      provider.removeListener("chainChanged", chainChanged);
      this.providerHandlers[connectorId] = null;
    }
  }
  /**
   * Emits the first available connection.
   */
  emitFirstAvailableConnection() {
    const connection = this.getConnection({
      connections: this.connections,
      connectors: this.connectors
    });
    if (connection) {
      const [account] = connection.accounts;
      this.emit("accountChanged", {
        address: account?.address,
        chainId: connection.caipNetwork?.id,
        connector: connection.connector
      });
    }
  }
  /**
   * Gets a connection based on provided parameters.
   * If connectorId is provided, returns connection for that specific connector.
   * Otherwise, returns the first available valid connection.
   *
   * @param params - Connection parameters
   * @param params.address - Optional address to filter by
   * @param params.connectorId - Optional connector ID to filter by
   * @param params.connections - List of available connections
   * @param params.connectors - List of available connectors
   * @returns Connection or null if none found
   */
  getConnection({ address, connectorId, connections, connectors }) {
    if (connectorId) {
      const connection = connections.find((c) => c.connectorId.toLowerCase() === connectorId.toLowerCase());
      if (!connection) {
        return null;
      }
      const connector = connectors.find((c) => c.id.toLowerCase() === connection.connectorId.toLowerCase());
      const account = address ? connection.accounts.find((a) => a.address.toLowerCase() === address.toLowerCase()) : connection.accounts[0];
      return { ...connection, account, connector };
    }
    const validConnection = connections.find((c) => c.accounts.length > 0 && connectors.some((conn) => conn.id.toLowerCase() === c.connectorId.toLowerCase()));
    if (validConnection) {
      const [account] = validConnection.accounts;
      const connector = connectors.find((c) => c.id.toLowerCase() === validConnection.connectorId.toLowerCase());
      return {
        ...validConnection,
        account,
        connector
      };
    }
    return null;
  }
}
let addEmbeddedWalletSessionPromise = null;
const SIWXUtil = {
  getSIWX() {
    return OptionsController.state.siwx;
  },
  async initializeIfEnabled(caipAddress = ChainController.getActiveCaipAddress()) {
    const siwx = OptionsController.state.siwx;
    if (!(siwx && caipAddress)) {
      return;
    }
    const [namespace, chainId, address] = caipAddress.split(":");
    if (!ChainController.checkIfSupportedNetwork(namespace, `${namespace}:${chainId}`)) {
      return;
    }
    try {
      if (OptionsController.state.remoteFeatures?.emailCapture) {
        const user = ChainController.getAccountData(namespace)?.user;
        await ModalController.open({
          view: "DataCapture",
          data: {
            email: user?.email ?? void 0
          }
        });
        return;
      }
      if (addEmbeddedWalletSessionPromise) {
        await addEmbeddedWalletSessionPromise;
      }
      const sessions = await siwx.getSessions(`${namespace}:${chainId}`, address);
      if (sessions.length) {
        return;
      }
      await ModalController.open({
        view: "SIWXSignMessage"
      });
    } catch (error) {
      console.error("SIWXUtil:initializeIfEnabled", error);
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties: this.getSIWXEventProperties(error)
      });
      await ConnectionController._getClient()?.disconnect().catch(console.error);
      RouterController.reset("Connect");
      SnackController.showError("A problem occurred while trying initialize authentication");
    }
  },
  async isAuthenticated(caipAddress = ChainController.getActiveCaipAddress()) {
    const siwx = OptionsController.state.siwx;
    if (!siwx) {
      return true;
    }
    if (!caipAddress) {
      return true;
    }
    const { chainNamespace, chainId, address } = ParseUtil.parseCaipAddress(caipAddress);
    const caipNetworkId = `${chainNamespace}:${chainId}`;
    const sessions = await SIWXUtil.getSessions({
      address,
      caipNetworkId
    });
    return sessions.length > 0;
  },
  async requestSignMessage() {
    const siwx = OptionsController.state.siwx;
    const address = CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress());
    const network = getActiveCaipNetwork();
    if (!siwx) {
      throw new Error("SIWX is not enabled");
    }
    if (!address) {
      throw new Error("No ActiveCaipAddress found");
    }
    if (!network) {
      throw new Error("No ActiveCaipNetwork or client found");
    }
    try {
      const siwxMessage = await siwx.createMessage({
        chainId: network.caipNetworkId,
        accountAddress: address
      });
      const message = siwxMessage.toString();
      let signature = "";
      if (siwx.signMessage) {
        signature = await siwx.signMessage({
          message,
          chainId: network.caipNetworkId,
          accountAddress: address
        });
      } else {
        const connectorId = ConnectorController.getConnectorId(network.chainNamespace);
        if (connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH) {
          RouterController.pushTransactionStack({});
        }
        signature = await ConnectionController.signMessage(message) || "";
      }
      await siwx.addSession({
        data: siwxMessage,
        message,
        signature
      });
      ChainController.setLastConnectedSIWECaipNetwork(network);
      ModalController.close();
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_SUCCESS",
        properties: this.getSIWXEventProperties()
      });
    } catch (error) {
      if (!ModalController.state.open || RouterController.state.view === "ApproveTransaction") {
        await ModalController.open({
          view: "SIWXSignMessage"
        });
      }
      SnackController.showError("Error signing message");
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties: this.getSIWXEventProperties(error)
      });
      console.error("SWIXUtil:requestSignMessage", error);
    }
  },
  async cancelSignMessage() {
    try {
      const siwx = this.getSIWX();
      const isRequired = siwx?.getRequired?.();
      if (isRequired) {
        const lastNetwork = ChainController.getLastConnectedSIWECaipNetwork();
        if (lastNetwork) {
          const sessions = await siwx?.getSessions(lastNetwork?.caipNetworkId, CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress()) || "");
          if (sessions && sessions.length > 0) {
            await ChainController.switchActiveNetwork(lastNetwork);
          } else {
            await ConnectionController.disconnect();
          }
        } else {
          await ConnectionController.disconnect();
        }
      } else {
        ModalController.close();
      }
      ModalController.close();
      EventsController.sendEvent({
        event: "CLICK_CANCEL_SIWX",
        type: "track",
        properties: this.getSIWXEventProperties()
      });
    } catch (error) {
      console.error("SIWXUtil:cancelSignMessage", error);
    }
  },
  async getAllSessions() {
    const siwx = this.getSIWX();
    const allRequestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const sessions = [];
    await Promise.all(allRequestedCaipNetworks.map(async (caipNetwork) => {
      const session = await siwx?.getSessions(caipNetwork.caipNetworkId, CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress()) || "");
      if (session) {
        sessions.push(...session);
      }
    }));
    return sessions;
  },
  async getSessions(args) {
    const siwx = OptionsController.state.siwx;
    let address = args?.address;
    if (!address) {
      const activeCaipAddress = ChainController.getActiveCaipAddress();
      address = CoreHelperUtil.getPlainAddress(activeCaipAddress);
    }
    let network = args?.caipNetworkId;
    if (!network) {
      const activeCaipNetwork = ChainController.getActiveCaipNetwork();
      network = activeCaipNetwork?.caipNetworkId;
    }
    if (!(siwx && address && network)) {
      return [];
    }
    return siwx.getSessions(network, address);
  },
  async isSIWXCloseDisabled() {
    const siwx = this.getSIWX();
    if (siwx) {
      const isApproveSignScreen = RouterController.state.view === "ApproveTransaction";
      const isSiwxSignMessage = RouterController.state.view === "SIWXSignMessage";
      if (isApproveSignScreen || isSiwxSignMessage) {
        return siwx.getRequired?.() && (await this.getSessions()).length === 0;
      }
    }
    return false;
  },
  async authConnectorAuthenticate({ authConnector, chainId, socialUri, preferredAccountType, chainNamespace }) {
    const siwx = SIWXUtil.getSIWX();
    const network = getActiveCaipNetwork();
    if (!siwx || !chainNamespace.includes(ConstantsUtil$1.CHAIN.EVM) || // Request to input email and sign message when email capture is enabled
    OptionsController.state.remoteFeatures?.emailCapture) {
      const result2 = await authConnector.connect({
        chainId,
        socialUri,
        preferredAccountType
      });
      return {
        address: result2.address,
        chainId: result2.chainId,
        accounts: result2.accounts
      };
    }
    const caipNetwork = `${chainNamespace}:${chainId}`;
    const siwxMessage = await siwx.createMessage({
      chainId: caipNetwork,
      accountAddress: "<<AccountAddress>>"
    });
    const siwxMessageData = {
      accountAddress: siwxMessage.accountAddress,
      chainId: siwxMessage.chainId,
      domain: siwxMessage.domain,
      uri: siwxMessage.uri,
      version: siwxMessage.version,
      nonce: siwxMessage.nonce,
      notBefore: siwxMessage.notBefore,
      statement: siwxMessage.statement,
      resources: siwxMessage.resources,
      requestId: siwxMessage.requestId,
      issuedAt: siwxMessage.issuedAt,
      expirationTime: siwxMessage.expirationTime,
      serializedMessage: siwxMessage.toString()
    };
    const result = await authConnector.connect({
      chainId,
      socialUri,
      siwxMessage: siwxMessageData,
      preferredAccountType
    });
    siwxMessageData.accountAddress = result.address;
    siwxMessageData.serializedMessage = result.message || "";
    if (result.signature && result.message) {
      const promise = SIWXUtil.addEmbeddedWalletSession(siwxMessageData, result.message, result.signature);
      await promise;
    }
    ChainController.setLastConnectedSIWECaipNetwork(network);
    return {
      address: result.address,
      chainId: result.chainId,
      accounts: result.accounts
    };
  },
  async addEmbeddedWalletSession(siwxMessageData, message, signature) {
    if (addEmbeddedWalletSessionPromise) {
      return addEmbeddedWalletSessionPromise;
    }
    const siwx = SIWXUtil.getSIWX();
    if (!siwx) {
      return Promise.resolve();
    }
    addEmbeddedWalletSessionPromise = siwx.addSession({
      data: siwxMessageData,
      message,
      signature
    }).finally(() => {
      addEmbeddedWalletSessionPromise = null;
    });
    return addEmbeddedWalletSessionPromise;
  },
  async universalProviderAuthenticate({ universalProvider, chains, methods }) {
    const siwx = SIWXUtil.getSIWX();
    const network = getActiveCaipNetwork();
    const namespaces = new Set(chains.map((chain) => chain.split(":")[0]));
    if (!siwx || namespaces.size !== 1 || !namespaces.has("eip155")) {
      return false;
    }
    const siwxMessage = await siwx.createMessage({
      chainId: getActiveCaipNetwork()?.caipNetworkId || "",
      accountAddress: ""
    });
    const result = await universalProvider.authenticate({
      nonce: siwxMessage.nonce,
      domain: siwxMessage.domain,
      uri: siwxMessage.uri,
      exp: siwxMessage.expirationTime,
      iat: siwxMessage.issuedAt,
      nbf: siwxMessage.notBefore,
      requestId: siwxMessage.requestId,
      version: siwxMessage.version,
      resources: siwxMessage.resources,
      statement: siwxMessage.statement,
      chainId: siwxMessage.chainId,
      methods,
      // The first chainId is what is used for universal provider to build the message
      chains: [siwxMessage.chainId, ...chains.filter((chain) => chain !== siwxMessage.chainId)]
    });
    SnackController.showLoading("Authenticating...", { autoClose: false });
    const walletInfo = {
      ...result.session.peer.metadata,
      name: result.session.peer.metadata.name,
      icon: result.session.peer.metadata.icons?.[0],
      type: "WALLET_CONNECT"
    };
    ChainController.setAccountProp("connectedWalletInfo", walletInfo, Array.from(namespaces)[0]);
    if (result?.auths?.length) {
      const sessions = result.auths.map((cacao) => {
        const message = universalProvider.client.formatAuthMessage({
          request: cacao.p,
          iss: cacao.p.iss
        });
        return {
          data: {
            ...cacao.p,
            accountAddress: cacao.p.iss.split(":").slice(-1).join(""),
            chainId: cacao.p.iss.split(":").slice(2, 4).join(":"),
            uri: cacao.p.aud ?? "",
            version: cacao.p.version || siwxMessage.version,
            expirationTime: cacao.p.exp,
            issuedAt: cacao.p.iat,
            notBefore: cacao.p.nbf
          },
          message,
          signature: cacao.s.s,
          cacao
        };
      });
      try {
        await siwx.setSessions(sessions);
        if (network) {
          ChainController.setLastConnectedSIWECaipNetwork(network);
        }
        EventsController.sendEvent({
          type: "track",
          event: "SIWX_AUTH_SUCCESS",
          properties: SIWXUtil.getSIWXEventProperties()
        });
      } catch (error) {
        console.error("SIWX:universalProviderAuth - failed to set sessions", error);
        EventsController.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: SIWXUtil.getSIWXEventProperties(error)
        });
        await universalProvider.disconnect().catch(console.error);
        throw error;
      } finally {
        SnackController.hide();
      }
    }
    return true;
  },
  getSIWXEventProperties(error) {
    const namespace = ChainController.state.activeChain;
    if (!namespace) {
      throw new Error("SIWXUtil:getSIWXEventProperties - namespace is required");
    }
    return {
      network: ChainController.state.activeCaipNetwork?.caipNetworkId || "",
      isSmartAccount: getPreferredAccountType(namespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
      message: error ? CoreHelperUtil.parseError(error) : void 0
    };
  },
  async clearSessions() {
    const siwx = this.getSIWX();
    if (siwx) {
      await siwx.setSessions([]);
    }
  }
};
class WalletConnectConnector {
  constructor({ provider, namespace }) {
    this.id = ConstantsUtil$1.CONNECTOR_ID.WALLET_CONNECT;
    this.name = "WalletConnect";
    this.type = "WALLET_CONNECT";
    this.imageId = "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400";
    this.getCaipNetworks = ChainController.getCaipNetworks.bind(ChainController);
    this.caipNetworks = this.getCaipNetworks();
    this.provider = provider;
    this.chain = namespace;
  }
  get chains() {
    return this.getCaipNetworks();
  }
  async connectWalletConnect() {
    const isAuthenticated = await this.authenticate();
    if (!isAuthenticated) {
      const caipNetworks = this.getCaipNetworks();
      const universalProviderConfigOverride = OptionsController.state.universalProviderConfigOverride;
      const namespaces = WcHelpersUtil.createNamespaces(caipNetworks, universalProviderConfigOverride);
      await this.provider.connect({ optionalNamespaces: namespaces });
    }
    return {
      clientId: await this.provider.client.core.crypto.getClientId(),
      session: this.provider.session
    };
  }
  async disconnect() {
    await this.provider.disconnect();
  }
  async authenticate() {
    const chains = this.chains.map((network) => network.caipNetworkId);
    return SIWXUtil.universalProviderAuthenticate({
      universalProvider: this.provider,
      chains,
      methods: OPTIONAL_METHODS
    });
  }
}
const OPTIONAL_METHODS = [
  "eth_accounts",
  "eth_requestAccounts",
  "eth_sendRawTransaction",
  "eth_sign",
  "eth_signTransaction",
  "eth_signTypedData",
  "eth_signTypedData_v3",
  "eth_signTypedData_v4",
  "eth_sendTransaction",
  "personal_sign",
  "wallet_switchEthereumChain",
  "wallet_addEthereumChain",
  "wallet_getPermissions",
  "wallet_requestPermissions",
  "wallet_registerOnboarding",
  "wallet_watchAsset",
  "wallet_scanQRCode",
  // EIP-5792
  "wallet_getCallsStatus",
  "wallet_sendCalls",
  "wallet_getCapabilities",
  // EIP-7715
  "wallet_grantPermissions",
  "wallet_revokePermissions",
  //EIP-7811
  "wallet_getAssets"
];
const SwapCalculationUtil = {
  getGasPriceInEther(gas, gasPrice) {
    const totalGasCostInWei = gasPrice * gas;
    const totalGasCostInEther = Number(totalGasCostInWei) / 1e18;
    return totalGasCostInEther;
  },
  getGasPriceInUSD(networkPrice, gas, gasPrice) {
    const totalGasCostInEther = SwapCalculationUtil.getGasPriceInEther(gas, gasPrice);
    const networkPriceInUSD = NumberUtil.bigNumber(networkPrice);
    const gasCostInUSD = networkPriceInUSD.times(totalGasCostInEther);
    return gasCostInUSD.toNumber();
  },
  getPriceImpact({ sourceTokenAmount, sourceTokenPriceInUSD, toTokenPriceInUSD, toTokenAmount }) {
    const inputValue = NumberUtil.bigNumber(sourceTokenAmount).times(sourceTokenPriceInUSD);
    const outputValue = NumberUtil.bigNumber(toTokenAmount).times(toTokenPriceInUSD);
    const priceImpact = inputValue.minus(outputValue).div(inputValue).times(100);
    return priceImpact.toNumber();
  },
  getMaxSlippage(slippage, toTokenAmount) {
    const slippageToleranceDecimal = NumberUtil.bigNumber(slippage).div(100);
    const maxSlippageAmount = NumberUtil.multiply(toTokenAmount, slippageToleranceDecimal);
    return maxSlippageAmount.toNumber();
  },
  getProviderFee(sourceTokenAmount, feePercentage = 85e-4) {
    const providerFee = NumberUtil.bigNumber(sourceTokenAmount).times(feePercentage);
    return providerFee.toString();
  },
  isInsufficientNetworkTokenForGas(networkBalanceInUSD, gasPriceInUSD) {
    const gasPrice = gasPriceInUSD || "0";
    if (NumberUtil.bigNumber(networkBalanceInUSD).eq(0)) {
      return true;
    }
    return NumberUtil.bigNumber(NumberUtil.bigNumber(gasPrice)).gt(networkBalanceInUSD);
  },
  isInsufficientSourceTokenForSwap(sourceTokenAmount, sourceTokenAddress, balance) {
    const sourceTokenBalance = balance?.find((token) => token.address === sourceTokenAddress)?.quantity?.numeric;
    const isInSufficientBalance = NumberUtil.bigNumber(sourceTokenBalance || "0").lt(sourceTokenAmount);
    return isInSufficientBalance;
  }
};
const state$4 = proxy({
  message: "",
  variant: "info",
  open: false
});
const controller$2 = {
  state: state$4,
  subscribeKey(key, callback) {
    return subscribeKey(state$4, key, callback);
  },
  open(message, variant) {
    const { debug } = OptionsController.state;
    const { code, displayMessage, debugMessage } = message;
    if (displayMessage && debug) {
      state$4.message = displayMessage;
      state$4.variant = variant;
      state$4.open = true;
    }
    if (debugMessage) {
      if (!ConstantsUtil$1.IS_DEVELOPMENT) {
        return;
      }
      const resolved = typeof debugMessage === "function" ? debugMessage() : debugMessage;
      const meta = code ? { code } : void 0;
      if (variant === "error") {
        console.error(resolved, meta);
      } else if (variant === "warning") {
        console.warn(resolved, meta);
      } else {
        console.info(resolved, meta);
      }
    }
  },
  warn(title, description, code) {
    state$4.open = true;
    state$4.message = title;
    state$4.variant = "warning";
    if (description) {
      console.warn(description, code);
    }
  },
  close() {
    state$4.open = false;
    state$4.message = "";
    state$4.variant = "info";
  }
};
const AlertController = withErrorBoundary(controller$2);
const INITIAL_GAS_LIMIT = 15e4;
const TO_AMOUNT_DECIMALS = 6;
const initialState = {
  // Loading states
  initializing: false,
  initialized: false,
  loadingPrices: false,
  loadingQuote: false,
  loadingApprovalTransaction: false,
  loadingBuildTransaction: false,
  loadingTransaction: false,
  // Control states
  switchingTokens: false,
  // Error states
  fetchError: false,
  // Approval & Swap transaction states
  approvalTransaction: void 0,
  swapTransaction: void 0,
  transactionError: void 0,
  // Input values
  sourceToken: void 0,
  sourceTokenAmount: "",
  sourceTokenPriceInUSD: 0,
  toToken: void 0,
  toTokenAmount: "",
  toTokenPriceInUSD: 0,
  networkPrice: "0",
  networkBalanceInUSD: "0",
  networkTokenSymbol: "",
  inputError: void 0,
  // Request values
  slippage: ConstantsUtil.CONVERT_SLIPPAGE_TOLERANCE,
  // Tokens
  tokens: void 0,
  popularTokens: void 0,
  suggestedTokens: void 0,
  foundTokens: void 0,
  myTokensWithBalance: void 0,
  tokensPriceMap: {},
  // Calculations
  gasFee: "0",
  gasPriceInUSD: 0,
  priceImpact: void 0,
  maxSlippage: void 0,
  providerFee: void 0
};
const state$3 = proxy({ ...initialState });
const controller$1 = {
  state: state$3,
  subscribe(callback) {
    return subscribe(state$3, () => callback(state$3));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$3, key, callback);
  },
  getParams() {
    const namespace = ChainController.state.activeChain;
    const caipAddress = ChainController.getAccountData(namespace)?.caipAddress ?? ChainController.state.activeCaipAddress;
    const address = CoreHelperUtil.getPlainAddress(caipAddress);
    const networkAddress = getActiveNetworkTokenAddress();
    const connectorId = ConnectorController.getConnectorId(ChainController.state.activeChain);
    if (!address) {
      throw new Error("No address found to swap the tokens from.");
    }
    const invalidToToken = !state$3.toToken?.address || !state$3.toToken?.decimals;
    const invalidSourceToken = !state$3.sourceToken?.address || !state$3.sourceToken?.decimals || !NumberUtil.bigNumber(state$3.sourceTokenAmount).gt(0);
    const invalidSourceTokenAmount = !state$3.sourceTokenAmount;
    return {
      networkAddress,
      fromAddress: address,
      fromCaipAddress: caipAddress,
      sourceTokenAddress: state$3.sourceToken?.address,
      toTokenAddress: state$3.toToken?.address,
      toTokenAmount: state$3.toTokenAmount,
      toTokenDecimals: state$3.toToken?.decimals,
      sourceTokenAmount: state$3.sourceTokenAmount,
      sourceTokenDecimals: state$3.sourceToken?.decimals,
      invalidToToken,
      invalidSourceToken,
      invalidSourceTokenAmount,
      availableToSwap: caipAddress && !invalidToToken && !invalidSourceToken && !invalidSourceTokenAmount,
      isAuthConnector: connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH
    };
  },
  async setSourceToken(sourceToken) {
    if (!sourceToken) {
      state$3.sourceToken = sourceToken;
      state$3.sourceTokenAmount = "";
      state$3.sourceTokenPriceInUSD = 0;
      return;
    }
    state$3.sourceToken = sourceToken;
    await SwapController.setTokenPrice(sourceToken.address, "sourceToken");
  },
  setSourceTokenAmount(amount) {
    state$3.sourceTokenAmount = amount;
  },
  async setToToken(toToken) {
    if (!toToken) {
      state$3.toToken = toToken;
      state$3.toTokenAmount = "";
      state$3.toTokenPriceInUSD = 0;
      return;
    }
    state$3.toToken = toToken;
    await SwapController.setTokenPrice(toToken.address, "toToken");
  },
  setToTokenAmount(amount) {
    state$3.toTokenAmount = amount ? NumberUtil.toFixed(amount, TO_AMOUNT_DECIMALS) : "";
  },
  async setTokenPrice(address, target) {
    let price = state$3.tokensPriceMap[address] || 0;
    if (!price) {
      state$3.loadingPrices = true;
      price = await SwapController.getAddressPrice(address);
    }
    if (target === "sourceToken") {
      state$3.sourceTokenPriceInUSD = price;
    } else if (target === "toToken") {
      state$3.toTokenPriceInUSD = price;
    }
    if (state$3.loadingPrices) {
      state$3.loadingPrices = false;
    }
    if (SwapController.getParams().availableToSwap && !state$3.switchingTokens) {
      SwapController.swapTokens();
    }
  },
  async switchTokens() {
    if (state$3.initializing || !state$3.initialized || state$3.switchingTokens) {
      return;
    }
    state$3.switchingTokens = true;
    try {
      const newSourceToken = state$3.toToken ? { ...state$3.toToken } : void 0;
      const newToToken = state$3.sourceToken ? { ...state$3.sourceToken } : void 0;
      const newSourceTokenAmount = newSourceToken && state$3.toTokenAmount === "" ? "1" : state$3.toTokenAmount;
      SwapController.setSourceTokenAmount(newSourceTokenAmount);
      SwapController.setToTokenAmount("");
      await SwapController.setSourceToken(newSourceToken);
      await SwapController.setToToken(newToToken);
      state$3.switchingTokens = false;
      SwapController.swapTokens();
    } catch (error) {
      state$3.switchingTokens = false;
      throw error;
    }
  },
  resetState() {
    state$3.myTokensWithBalance = initialState.myTokensWithBalance;
    state$3.tokensPriceMap = initialState.tokensPriceMap;
    state$3.initialized = initialState.initialized;
    state$3.initializing = initialState.initializing;
    state$3.switchingTokens = initialState.switchingTokens;
    state$3.sourceToken = initialState.sourceToken;
    state$3.sourceTokenAmount = initialState.sourceTokenAmount;
    state$3.sourceTokenPriceInUSD = initialState.sourceTokenPriceInUSD;
    state$3.toToken = initialState.toToken;
    state$3.toTokenAmount = initialState.toTokenAmount;
    state$3.toTokenPriceInUSD = initialState.toTokenPriceInUSD;
    state$3.networkPrice = initialState.networkPrice;
    state$3.networkTokenSymbol = initialState.networkTokenSymbol;
    state$3.networkBalanceInUSD = initialState.networkBalanceInUSD;
    state$3.inputError = initialState.inputError;
  },
  resetValues() {
    const { networkAddress } = SwapController.getParams();
    const networkToken = state$3.tokens?.find((token) => token.address === networkAddress);
    SwapController.setSourceToken(networkToken);
    SwapController.setToToken(void 0);
  },
  getApprovalLoadingState() {
    return state$3.loadingApprovalTransaction;
  },
  clearError() {
    state$3.transactionError = void 0;
  },
  async initializeState() {
    if (state$3.initializing) {
      return;
    }
    state$3.initializing = true;
    if (!state$3.initialized) {
      try {
        await SwapController.fetchTokens();
        state$3.initialized = true;
      } catch (error) {
        state$3.initialized = false;
        SnackController.showError("Failed to initialize swap");
        RouterController.goBack();
      }
    }
    state$3.initializing = false;
  },
  async fetchTokens() {
    const { networkAddress } = SwapController.getParams();
    await SwapController.getNetworkTokenPrice();
    await SwapController.getMyTokensWithBalance();
    const networkToken = state$3.myTokensWithBalance?.find((token) => token.address === networkAddress);
    if (networkToken) {
      state$3.networkTokenSymbol = networkToken.symbol;
      SwapController.setSourceToken(networkToken);
      SwapController.setSourceTokenAmount("0");
    }
  },
  async getTokenList() {
    const activeCaipNetworkId = ChainController.state.activeCaipNetwork?.caipNetworkId;
    if (state$3.caipNetworkId === activeCaipNetworkId && state$3.tokens) {
      return;
    }
    try {
      state$3.tokensLoading = true;
      const tokens = await SwapApiUtil.getTokenList(activeCaipNetworkId);
      state$3.tokens = tokens;
      state$3.caipNetworkId = activeCaipNetworkId;
      state$3.popularTokens = tokens.sort((aTokenInfo, bTokenInfo) => {
        if (aTokenInfo.symbol < bTokenInfo.symbol) {
          return -1;
        }
        if (aTokenInfo.symbol > bTokenInfo.symbol) {
          return 1;
        }
        return 0;
      });
      const suggestedTokensByChain = activeCaipNetworkId && ConstantsUtil.SUGGESTED_TOKENS_BY_CHAIN?.[activeCaipNetworkId] || [];
      const suggestedTokenObjects = suggestedTokensByChain.map((symbol) => tokens.find((t) => t.symbol === symbol)).filter((t) => Boolean(t));
      const allSuggestedTokens = ConstantsUtil.SWAP_SUGGESTED_TOKENS || [];
      const allSuggestedTokenObjects = allSuggestedTokens.map((symbol) => tokens.find((t) => t.symbol === symbol)).filter((t) => Boolean(t)).filter((t) => !suggestedTokenObjects.some((ct) => ct.address === t.address));
      state$3.suggestedTokens = [...suggestedTokenObjects, ...allSuggestedTokenObjects];
    } catch (error) {
      state$3.tokens = [];
      state$3.popularTokens = [];
      state$3.suggestedTokens = [];
    } finally {
      state$3.tokensLoading = false;
    }
  },
  async getAddressPrice(address) {
    const existPrice = state$3.tokensPriceMap[address];
    if (existPrice) {
      return existPrice;
    }
    const response = await BlockchainApiController.fetchTokenPrice({
      addresses: [address]
    });
    const fungibles = response?.fungibles || [];
    const allTokens = [...state$3.tokens || [], ...state$3.myTokensWithBalance || []];
    const symbol = allTokens?.find((token) => token.address === address)?.symbol;
    const price = fungibles.find((p) => p.symbol.toLowerCase() === symbol?.toLowerCase())?.price || 0;
    const priceAsFloat = parseFloat(price.toString());
    state$3.tokensPriceMap[address] = priceAsFloat;
    return priceAsFloat;
  },
  async getNetworkTokenPrice() {
    const { networkAddress } = SwapController.getParams();
    const response = await BlockchainApiController.fetchTokenPrice({
      addresses: [networkAddress]
    }).catch(() => {
      SnackController.showError("Failed to fetch network token price");
      return { fungibles: [] };
    });
    const token = response.fungibles?.[0];
    const price = token?.price.toString() || "0";
    state$3.tokensPriceMap[networkAddress] = parseFloat(price);
    state$3.networkTokenSymbol = token?.symbol || "";
    state$3.networkPrice = price;
  },
  async getMyTokensWithBalance(forceUpdate) {
    const balances = await BalanceUtil.getMyTokensWithBalance({
      forceUpdate,
      caipNetwork: ChainController.state.activeCaipNetwork,
      address: ChainController.getAccountData()?.address
    });
    const swapBalances = SwapApiUtil.mapBalancesToSwapTokens(balances);
    if (!swapBalances) {
      return;
    }
    await SwapController.getInitialGasPrice();
    SwapController.setBalances(swapBalances);
  },
  setBalances(balances) {
    const { networkAddress } = SwapController.getParams();
    const caipNetwork = ChainController.state.activeCaipNetwork;
    if (!caipNetwork) {
      return;
    }
    const networkToken = balances.find((token) => token.address === networkAddress);
    balances.forEach((token) => {
      state$3.tokensPriceMap[token.address] = token.price || 0;
    });
    state$3.myTokensWithBalance = balances.filter((token) => token.address.startsWith(caipNetwork.caipNetworkId));
    state$3.networkBalanceInUSD = networkToken ? NumberUtil.multiply(networkToken.quantity.numeric, networkToken.price).toString() : "0";
  },
  async getInitialGasPrice() {
    const res = await SwapApiUtil.fetchGasPrice();
    if (!res) {
      return { gasPrice: null, gasPriceInUSD: null };
    }
    switch (ChainController.state?.activeCaipNetwork?.chainNamespace) {
      case ConstantsUtil$1.CHAIN.SOLANA:
        state$3.gasFee = res.standard ?? "0";
        state$3.gasPriceInUSD = NumberUtil.multiply(res.standard, state$3.networkPrice).div(1e9).toNumber();
        return {
          gasPrice: BigInt(state$3.gasFee),
          gasPriceInUSD: Number(state$3.gasPriceInUSD)
        };
      case ConstantsUtil$1.CHAIN.EVM:
      default:
        const value = res.standard ?? "0";
        const gasFee = BigInt(value);
        const gasLimit = BigInt(INITIAL_GAS_LIMIT);
        const gasPrice = SwapCalculationUtil.getGasPriceInUSD(state$3.networkPrice, gasLimit, gasFee);
        state$3.gasFee = value;
        state$3.gasPriceInUSD = gasPrice;
        return { gasPrice: gasFee, gasPriceInUSD: gasPrice };
    }
  },
  // -- Swap -------------------------------------- //
  async swapTokens() {
    const address = ChainController.getAccountData()?.address;
    const sourceToken = state$3.sourceToken;
    const toToken = state$3.toToken;
    const haveSourceTokenAmount = NumberUtil.bigNumber(state$3.sourceTokenAmount).gt(0);
    if (!haveSourceTokenAmount) {
      SwapController.setToTokenAmount("");
    }
    if (!toToken || !sourceToken || state$3.loadingPrices || !haveSourceTokenAmount || !address) {
      return;
    }
    state$3.loadingQuote = true;
    const amountDecimal = NumberUtil.bigNumber(state$3.sourceTokenAmount).times(10 ** sourceToken.decimals).round(0).toFixed(0);
    try {
      const quoteResponse = await BlockchainApiController.fetchSwapQuote({
        userAddress: address,
        from: sourceToken.address,
        to: toToken.address,
        gasPrice: state$3.gasFee,
        amount: amountDecimal.toString()
      });
      state$3.loadingQuote = false;
      const quoteToAmount = quoteResponse?.quotes?.[0]?.toAmount;
      if (!quoteToAmount) {
        AlertController.open({
          displayMessage: "Incorrect amount",
          debugMessage: "Please enter a valid amount"
        }, "error");
        return;
      }
      const toTokenAmount = NumberUtil.bigNumber(quoteToAmount).div(10 ** toToken.decimals).toString();
      SwapController.setToTokenAmount(toTokenAmount);
      const isInsufficientToken = SwapController.hasInsufficientToken(state$3.sourceTokenAmount, sourceToken.address);
      if (isInsufficientToken) {
        state$3.inputError = "Insufficient balance";
      } else {
        state$3.inputError = void 0;
        SwapController.setTransactionDetails();
      }
    } catch (error) {
      const response = await SwapApiUtil.handleSwapError(error);
      state$3.loadingQuote = false;
      state$3.inputError = response || "Insufficient balance";
    }
  },
  // -- Create Transactions -------------------------------------- //
  async getTransaction() {
    const { fromCaipAddress, availableToSwap } = SwapController.getParams();
    const sourceToken = state$3.sourceToken;
    const toToken = state$3.toToken;
    if (!fromCaipAddress || !availableToSwap || !sourceToken || !toToken || state$3.loadingQuote) {
      return void 0;
    }
    try {
      state$3.loadingBuildTransaction = true;
      const hasAllowance = await SwapApiUtil.fetchSwapAllowance({
        userAddress: fromCaipAddress,
        tokenAddress: sourceToken.address,
        sourceTokenAmount: state$3.sourceTokenAmount,
        sourceTokenDecimals: sourceToken.decimals
      });
      let transaction = void 0;
      if (hasAllowance) {
        transaction = await SwapController.createSwapTransaction();
      } else {
        transaction = await SwapController.createAllowanceTransaction();
      }
      state$3.loadingBuildTransaction = false;
      state$3.fetchError = false;
      return transaction;
    } catch (error) {
      RouterController.goBack();
      SnackController.showError("Failed to check allowance");
      state$3.loadingBuildTransaction = false;
      state$3.approvalTransaction = void 0;
      state$3.swapTransaction = void 0;
      state$3.fetchError = true;
      return void 0;
    }
  },
  async createAllowanceTransaction() {
    const { fromCaipAddress, sourceTokenAddress, toTokenAddress } = SwapController.getParams();
    if (!fromCaipAddress || !toTokenAddress) {
      return void 0;
    }
    if (!sourceTokenAddress) {
      throw new Error("createAllowanceTransaction - No source token address found.");
    }
    try {
      const response = await BlockchainApiController.generateApproveCalldata({
        from: sourceTokenAddress,
        to: toTokenAddress,
        userAddress: fromCaipAddress
      });
      const address = CoreHelperUtil.getPlainAddress(response.tx.from);
      if (!address) {
        throw new Error("SwapController:createAllowanceTransaction - address is required");
      }
      const transaction = {
        data: response.tx.data,
        to: address,
        gasPrice: BigInt(response.tx.eip155.gasPrice),
        value: BigInt(response.tx.value),
        toAmount: state$3.toTokenAmount
      };
      state$3.swapTransaction = void 0;
      state$3.approvalTransaction = {
        data: transaction.data,
        to: transaction.to,
        gasPrice: transaction.gasPrice,
        value: transaction.value,
        toAmount: transaction.toAmount
      };
      return {
        data: transaction.data,
        to: transaction.to,
        gasPrice: transaction.gasPrice,
        value: transaction.value,
        toAmount: transaction.toAmount
      };
    } catch (error) {
      RouterController.goBack();
      SnackController.showError("Failed to create approval transaction");
      state$3.approvalTransaction = void 0;
      state$3.swapTransaction = void 0;
      state$3.fetchError = true;
      return void 0;
    }
  },
  async createSwapTransaction() {
    const { networkAddress, fromCaipAddress, sourceTokenAmount } = SwapController.getParams();
    const sourceToken = state$3.sourceToken;
    const toToken = state$3.toToken;
    if (!fromCaipAddress || !sourceTokenAmount || !sourceToken || !toToken) {
      return void 0;
    }
    let amount = ConnectionController.parseUnits(sourceTokenAmount, sourceToken.decimals)?.toString();
    try {
      const isSourceTokenIsNetworkToken = sourceToken.address === networkAddress;
      let response = await BlockchainApiController.generateSwapCalldata({
        userAddress: fromCaipAddress,
        from: sourceToken.address,
        to: toToken.address,
        amount,
        disableEstimate: true
      });
      let gas = BigInt(response.tx.eip155.gas);
      let gasPrice = BigInt(response.tx.eip155.gasPrice);
      if (isSourceTokenIsNetworkToken && amount) {
        const nativeToken = state$3.myTokensWithBalance?.find((t) => t.address === networkAddress);
        if (nativeToken) {
          const decimals = parseInt(nativeToken.quantity.decimals, 10);
          const rawBalance = ConnectionController.parseUnits(nativeToken.quantity.numeric, decimals) ?? 0n;
          const gasCost = gas * gasPrice;
          const value = BigInt(amount);
          if (value + gasCost > rawBalance) {
            const adjustedAmount = rawBalance > gasCost ? rawBalance - gasCost : 0n;
            if (adjustedAmount > 0n) {
              response = await BlockchainApiController.generateSwapCalldata({
                userAddress: fromCaipAddress,
                from: sourceToken.address,
                to: toToken.address,
                amount: adjustedAmount.toString(),
                disableEstimate: true
              });
              amount = adjustedAmount.toString();
              gas = BigInt(response.tx.eip155.gas);
              gasPrice = BigInt(response.tx.eip155.gasPrice);
            }
          }
        }
      }
      const address = CoreHelperUtil.getPlainAddress(response.tx.to);
      if (!address) {
        throw new Error("SwapController:createSwapTransaction - address is required");
      }
      const transaction = {
        data: response.tx.data,
        to: address,
        gas,
        gasPrice,
        value: isSourceTokenIsNetworkToken ? BigInt(amount ?? "0") : BigInt("0"),
        toAmount: state$3.toTokenAmount
      };
      state$3.gasPriceInUSD = SwapCalculationUtil.getGasPriceInUSD(state$3.networkPrice, gas, gasPrice);
      state$3.approvalTransaction = void 0;
      state$3.swapTransaction = transaction;
      return transaction;
    } catch (error) {
      RouterController.goBack();
      SnackController.showError("Failed to create transaction");
      state$3.approvalTransaction = void 0;
      state$3.swapTransaction = void 0;
      state$3.fetchError = true;
      return void 0;
    }
  },
  onEmbeddedWalletApprovalSuccess() {
    SnackController.showLoading("Approve limit increase in your wallet");
    RouterController.replace("SwapPreview");
  },
  // -- Send Transactions --------------------------------- //
  async sendTransactionForApproval(data) {
    const { fromAddress, isAuthConnector } = SwapController.getParams();
    state$3.loadingApprovalTransaction = true;
    const approveLimitMessage = `Approve limit increase in your wallet`;
    if (isAuthConnector) {
      RouterController.pushTransactionStack({
        onSuccess: SwapController.onEmbeddedWalletApprovalSuccess
      });
    } else {
      SnackController.showLoading(approveLimitMessage);
    }
    try {
      await ConnectionController.sendTransaction({
        address: fromAddress,
        to: data.to,
        data: data.data,
        value: data.value,
        chainNamespace: ConstantsUtil$1.CHAIN.EVM
      });
      await SwapController.swapTokens();
      await SwapController.getTransaction();
      state$3.approvalTransaction = void 0;
      state$3.loadingApprovalTransaction = false;
    } catch (err) {
      const error = err;
      state$3.transactionError = error?.displayMessage;
      state$3.loadingApprovalTransaction = false;
      SnackController.showError(error?.displayMessage || "Transaction error");
      EventsController.sendEvent({
        type: "track",
        event: "SWAP_APPROVAL_ERROR",
        properties: {
          message: error?.displayMessage || error?.message || "Unknown",
          network: ChainController.state.activeCaipNetwork?.caipNetworkId || "",
          swapFromToken: SwapController.state.sourceToken?.symbol || "",
          swapToToken: SwapController.state.toToken?.symbol || "",
          swapFromAmount: SwapController.state.sourceTokenAmount || "",
          swapToAmount: SwapController.state.toTokenAmount || "",
          isSmartAccount: getPreferredAccountType(ConstantsUtil$1.CHAIN.EVM) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
    }
  },
  async sendTransactionForSwap(data) {
    if (!data) {
      return void 0;
    }
    const { fromAddress, toTokenAmount, isAuthConnector } = SwapController.getParams();
    state$3.loadingTransaction = true;
    const snackbarPendingMessage = `Swapping ${state$3.sourceToken?.symbol} to ${NumberUtil.formatNumberToLocalString(toTokenAmount, 3)} ${state$3.toToken?.symbol}`;
    const snackbarSuccessMessage = `Swapped ${state$3.sourceToken?.symbol} to ${NumberUtil.formatNumberToLocalString(toTokenAmount, 3)} ${state$3.toToken?.symbol}`;
    if (isAuthConnector) {
      RouterController.pushTransactionStack({
        onSuccess() {
          RouterController.replace("Account");
          SnackController.showLoading(snackbarPendingMessage);
          controller$1.resetState();
        }
      });
    } else {
      SnackController.showLoading("Confirm transaction in your wallet");
    }
    try {
      const forceUpdateAddresses = [state$3.sourceToken?.address, state$3.toToken?.address].join(",");
      const transactionHash = await ConnectionController.sendTransaction({
        address: fromAddress,
        to: data.to,
        data: data.data,
        value: data.value,
        chainNamespace: ConstantsUtil$1.CHAIN.EVM
      });
      state$3.loadingTransaction = false;
      SnackController.showSuccess(snackbarSuccessMessage);
      EventsController.sendEvent({
        type: "track",
        event: "SWAP_SUCCESS",
        properties: {
          network: ChainController.state.activeCaipNetwork?.caipNetworkId || "",
          swapFromToken: SwapController.state.sourceToken?.symbol || "",
          swapToToken: SwapController.state.toToken?.symbol || "",
          swapFromAmount: SwapController.state.sourceTokenAmount || "",
          swapToAmount: SwapController.state.toTokenAmount || "",
          isSmartAccount: getPreferredAccountType(ConstantsUtil$1.CHAIN.EVM) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      controller$1.resetState();
      if (!isAuthConnector) {
        RouterController.replace("Account");
      }
      controller$1.getMyTokensWithBalance(forceUpdateAddresses);
      return transactionHash;
    } catch (err) {
      const error = err;
      state$3.transactionError = error?.displayMessage;
      state$3.loadingTransaction = false;
      SnackController.showError(error?.displayMessage || "Transaction error");
      EventsController.sendEvent({
        type: "track",
        event: "SWAP_ERROR",
        properties: {
          message: error?.displayMessage || error?.message || "Unknown",
          network: ChainController.state.activeCaipNetwork?.caipNetworkId || "",
          swapFromToken: SwapController.state.sourceToken?.symbol || "",
          swapToToken: SwapController.state.toToken?.symbol || "",
          swapFromAmount: SwapController.state.sourceTokenAmount || "",
          swapToAmount: SwapController.state.toTokenAmount || "",
          isSmartAccount: getPreferredAccountType(ConstantsUtil$1.CHAIN.EVM) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      return void 0;
    }
  },
  // -- Checks -------------------------------------------- //
  hasInsufficientToken(sourceTokenAmount, sourceTokenAddress) {
    const isInsufficientSourceTokenForSwap = SwapCalculationUtil.isInsufficientSourceTokenForSwap(sourceTokenAmount, sourceTokenAddress, state$3.myTokensWithBalance);
    return isInsufficientSourceTokenForSwap;
  },
  // -- Calculations -------------------------------------- //
  setTransactionDetails() {
    const { toTokenAddress, toTokenDecimals } = SwapController.getParams();
    if (!toTokenAddress || !toTokenDecimals) {
      return;
    }
    state$3.gasPriceInUSD = SwapCalculationUtil.getGasPriceInUSD(state$3.networkPrice, BigInt(state$3.gasFee), BigInt(INITIAL_GAS_LIMIT));
    state$3.priceImpact = SwapCalculationUtil.getPriceImpact({
      sourceTokenAmount: state$3.sourceTokenAmount,
      sourceTokenPriceInUSD: state$3.sourceTokenPriceInUSD,
      toTokenPriceInUSD: state$3.toTokenPriceInUSD,
      toTokenAmount: state$3.toTokenAmount
    });
    state$3.maxSlippage = SwapCalculationUtil.getMaxSlippage(state$3.slippage, state$3.toTokenAmount);
    state$3.providerFee = SwapCalculationUtil.getProviderFee(state$3.sourceTokenAmount);
  }
};
const SwapController = withErrorBoundary(controller$1);
const state$2 = proxy({
  message: "",
  open: false,
  triggerRect: {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  },
  variant: "shade"
});
const controller = {
  state: state$2,
  subscribe(callback) {
    return subscribe(state$2, () => callback(state$2));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$2, key, callback);
  },
  showTooltip({ message, triggerRect, variant }) {
    state$2.open = true;
    state$2.message = message;
    state$2.triggerRect = triggerRect;
    state$2.variant = variant;
  },
  hide() {
    state$2.open = false;
    state$2.message = "";
    state$2.triggerRect = {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
  }
};
const TooltipController = withErrorBoundary(controller);
const state$1 = proxy({
  isLegalCheckboxChecked: false
});
const OptionsStateController = {
  state: state$1,
  subscribe(callback) {
    return subscribe(state$1, () => callback(state$1));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$1, key, callback);
  },
  setIsLegalCheckboxChecked(isLegalCheckboxChecked) {
    state$1.isLegalCheckboxChecked = isLegalCheckboxChecked;
  }
};
const CHAIN_ASSET_INFO_MAP = {
  eip155: {
    native: { assetNamespace: "slip44", assetReference: "60" },
    defaultTokenNamespace: "erc20"
  },
  solana: {
    native: { assetNamespace: "slip44", assetReference: "501" },
    defaultTokenNamespace: "token"
  }
};
const EVM_NATIVE_SLIP44_OVERRIDES = {
  // BNB on Binance Smart Chain
  "56": "714",
  // BNB on opBNB
  "204": "714"
};
class JsonRpcError extends Error {
}
function getApiUrl() {
  const { sdkType, sdkVersion, projectId } = OptionsController.getSnapshot();
  const url = new URL("https://rpc.walletconnect.org/v1/json-rpc");
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("st", sdkType);
  url.searchParams.set("sv", sdkVersion);
  url.searchParams.set("source", "fund-wallet");
  return url.toString();
}
async function sendRequest(method, params) {
  const url = getApiUrl();
  const { projectId } = OptionsController.getSnapshot();
  const requestBody = {
    jsonrpc: "2.0",
    id: 1,
    method,
    params: {
      ...params || {},
      projectId
    }
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" }
  });
  const json = await response.json();
  if (json.error) {
    throw new JsonRpcError(json.error.message);
  }
  return json;
}
async function getExchanges(params) {
  const response = await sendRequest("reown_getExchanges", params);
  return response.result;
}
async function getPayUrl(params) {
  const response = await sendRequest("reown_getExchangePayUrl", params);
  return response.result;
}
async function getBuyStatus(params) {
  const response = await sendRequest("reown_getExchangeBuyStatus", params);
  return response.result;
}
function formatCaip19Asset(caipNetworkId, asset) {
  const { chainNamespace, chainId } = ParseUtil.parseCaipNetworkId(caipNetworkId);
  const chainInfo = CHAIN_ASSET_INFO_MAP[chainNamespace];
  if (!chainInfo) {
    throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${chainNamespace}`);
  }
  let assetNamespace = chainInfo.native.assetNamespace;
  let assetReference = chainInfo.native.assetReference;
  if (asset !== "native") {
    assetNamespace = chainInfo.defaultTokenNamespace;
    assetReference = asset;
  } else if (chainNamespace === "eip155" && EVM_NATIVE_SLIP44_OVERRIDES[chainId]) {
    assetReference = EVM_NATIVE_SLIP44_OVERRIDES[chainId];
  }
  const networkPart = `${chainNamespace}:${chainId}`;
  return `${networkPart}/${assetNamespace}:${assetReference}`;
}
const ethereumETH = {
  network: "eip155:1",
  asset: "native",
  metadata: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18
  }
};
const baseETH = {
  network: "eip155:8453",
  asset: "native",
  metadata: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18
  }
};
const baseUSDC = {
  network: "eip155:8453",
  asset: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  metadata: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6
  }
};
const baseSepoliaUSDC = {
  asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
};
const baseSepoliaETH = {
  network: "eip155:84532",
  asset: "native",
  metadata: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18
  }
};
const ethereumUSDC = {
  network: "eip155:1",
  asset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  metadata: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6
  }
};
const arbitrumUSDC = {
  network: "eip155:42161",
  asset: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  metadata: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6
  }
};
const polygonUSDC = {
  network: "eip155:137",
  asset: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  metadata: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6
  }
};
const solanaUSDC = {
  network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  metadata: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6
  }
};
const ethereumUSDT = {
  network: "eip155:1",
  asset: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  metadata: {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6
  }
};
const optimismUSDT = {
  network: "eip155:10",
  asset: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  metadata: {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6
  }
};
const arbitrumUSDT = {
  network: "eip155:42161",
  asset: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  metadata: {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6
  }
};
const polygonUSDT = {
  network: "eip155:137",
  asset: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  metadata: {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6
  }
};
const solanaUSDT = {
  network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  asset: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  metadata: {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6
  }
};
const solanaSOL = {
  network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  asset: "native",
  metadata: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9
  }
};
const assets = {
  ethereumETH,
  baseETH,
  baseUSDC,
  baseSepoliaETH,
  ethereumUSDC,
  arbitrumUSDC,
  polygonUSDC,
  solanaUSDC,
  ethereumUSDT,
  optimismUSDT,
  arbitrumUSDT,
  polygonUSDT,
  solanaUSDT,
  solanaSOL
};
function getPaymentAssetsForNetwork(network) {
  return Object.values(assets).filter((asset) => asset.network === network);
}
const DEFAULT_PAGE = 0;
const DEFAULT_STATE = {
  paymentAsset: null,
  amount: null,
  tokenAmount: 0,
  priceLoading: false,
  error: null,
  exchanges: [],
  isLoading: false,
  currentPayment: void 0,
  isPaymentInProgress: false,
  paymentId: "",
  assets: []
};
const state = proxy(DEFAULT_STATE);
const ExchangeController = {
  state,
  // -- Subscriptions ----------------------------------- //
  subscribe(callback) {
    return subscribe(state, () => callback(state));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state, key, callback);
  },
  resetState() {
    Object.assign(state, { ...DEFAULT_STATE });
  },
  async getAssetsForNetwork(network) {
    const assets2 = getPaymentAssetsForNetwork(network);
    const metadata = await ExchangeController.getAssetsImageAndPrice(assets2);
    const assetsWithPrice = assets2.map((asset) => {
      const assetAddress = asset.asset === "native" ? getActiveNetworkTokenAddress() : `${asset.network}:${asset.asset}`;
      const assetMetadata = metadata.find((m) => m.fungibles?.[0]?.address?.toLowerCase() === assetAddress.toLowerCase());
      return {
        ...asset,
        price: assetMetadata?.fungibles?.[0]?.price || 1,
        metadata: {
          ...asset.metadata,
          iconUrl: assetMetadata?.fungibles?.[0]?.iconUrl
        }
      };
    });
    state.assets = assetsWithPrice;
    return assetsWithPrice;
  },
  async getAssetsImageAndPrice(assets2) {
    const addresses = assets2.map((asset) => asset.asset === "native" ? getActiveNetworkTokenAddress() : `${asset.network}:${asset.asset}`);
    const metadata = await Promise.all(addresses.map((address) => BlockchainApiController.fetchTokenPrice({ addresses: [address] })));
    return metadata;
  },
  getTokenAmount() {
    if (!state?.paymentAsset?.price) {
      throw new Error("Cannot get token price");
    }
    const bigAmount = NumberUtil.bigNumber(state.amount ?? 0).round(8);
    const bigPrice = NumberUtil.bigNumber(state.paymentAsset.price).round(8);
    return bigAmount.div(bigPrice).round(8).toNumber();
  },
  setAmount(amount) {
    state.amount = amount;
    if (state.paymentAsset?.price) {
      state.tokenAmount = ExchangeController.getTokenAmount();
    }
  },
  setPaymentAsset(asset) {
    state.paymentAsset = asset;
  },
  isPayWithExchangeEnabled() {
    return OptionsController.state.remoteFeatures?.payWithExchange;
  },
  isPayWithExchangeSupported() {
    return ExchangeController.isPayWithExchangeEnabled() && ChainController.state.activeCaipNetwork && ConstantsUtil.PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES.includes(ChainController.state.activeCaipNetwork.chainNamespace);
  },
  // -- Getters ----------------------------------------- //
  async fetchExchanges() {
    try {
      const isPayWithExchangeSupported = ExchangeController.isPayWithExchangeSupported();
      if (!state.paymentAsset || !isPayWithExchangeSupported) {
        state.exchanges = [];
        state.isLoading = false;
        return;
      }
      state.isLoading = true;
      const response = await getExchanges({
        page: DEFAULT_PAGE,
        asset: formatCaip19Asset(state.paymentAsset.network, state.paymentAsset.asset),
        amount: state.amount?.toString() ?? "0"
      });
      state.exchanges = response.exchanges.slice(0, 2);
    } catch (error) {
      SnackController.showError("Unable to get exchanges");
      throw new Error("Unable to get exchanges");
    } finally {
      state.isLoading = false;
    }
  },
  async getPayUrl(exchangeId, params) {
    try {
      const numericAmount = Number(params.amount);
      const response = await getPayUrl({
        exchangeId,
        asset: formatCaip19Asset(params.network, params.asset),
        amount: numericAmount.toString(),
        recipient: `${params.network}:${params.recipient}`
      });
      EventsController.sendEvent({
        type: "track",
        event: "PAY_EXCHANGE_SELECTED",
        properties: {
          exchange: {
            id: exchangeId
          },
          configuration: {
            network: params.network,
            asset: params.asset,
            recipient: params.recipient,
            amount: numericAmount
          },
          currentPayment: {
            type: "exchange",
            exchangeId
          },
          source: "fund-from-exchange",
          headless: false
        }
      });
      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes("is not supported")) {
        throw new Error("Asset not supported");
      }
      throw new Error(error.message);
    }
  },
  async handlePayWithExchange(exchangeId) {
    try {
      const address = ChainController.getAccountData()?.address;
      if (!address) {
        throw new Error("No account connected");
      }
      if (!state.paymentAsset) {
        throw new Error("No payment asset selected");
      }
      const popupWindow = CoreHelperUtil.returnOpenHref("", "popupWindow", "scrollbar=yes,width=480,height=720");
      if (!popupWindow) {
        throw new Error("Could not create popup window");
      }
      state.isPaymentInProgress = true;
      state.paymentId = crypto.randomUUID();
      state.currentPayment = {
        type: "exchange",
        exchangeId
      };
      const { network, asset } = state.paymentAsset;
      const payUrlParams = {
        network,
        asset,
        amount: state.tokenAmount,
        recipient: address
      };
      const payUrl = await ExchangeController.getPayUrl(exchangeId, payUrlParams);
      if (!payUrl) {
        try {
          popupWindow.close();
        } catch (err) {
          console.error("Unable to close popup window", err);
        }
        throw new Error("Unable to initiate payment");
      }
      state.currentPayment.sessionId = payUrl.sessionId;
      state.currentPayment.status = "IN_PROGRESS";
      state.currentPayment.exchangeId = exchangeId;
      popupWindow.location.href = payUrl.url;
    } catch (error) {
      state.error = "Unable to initiate payment";
      SnackController.showError(state.error);
    }
  },
  async waitUntilComplete({ exchangeId, sessionId, paymentId, retries = 20 }) {
    const status = await ExchangeController.getBuyStatus(exchangeId, sessionId, paymentId);
    if (status.status === "SUCCESS" || status.status === "FAILED") {
      return status;
    }
    if (retries === 0) {
      throw new Error("Unable to get deposit status");
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 5e3);
    });
    return ExchangeController.waitUntilComplete({
      exchangeId,
      sessionId,
      paymentId,
      retries: retries - 1
    });
  },
  async getBuyStatus(exchangeId, sessionId, paymentId) {
    try {
      if (!state.currentPayment) {
        throw new Error("No current payment");
      }
      const status = await getBuyStatus({ sessionId, exchangeId });
      state.currentPayment.status = status.status;
      if (status.status === "SUCCESS" || status.status === "FAILED") {
        const address = ChainController.getAccountData()?.address;
        state.currentPayment.result = status.txHash;
        state.isPaymentInProgress = false;
        EventsController.sendEvent({
          type: "track",
          event: status.status === "SUCCESS" ? "PAY_SUCCESS" : "PAY_ERROR",
          properties: {
            message: status.status === "FAILED" ? CoreHelperUtil.parseError(state.error) : void 0,
            source: "fund-from-exchange",
            paymentId,
            configuration: {
              network: state.paymentAsset?.network || "",
              asset: state.paymentAsset?.asset || "",
              recipient: address || "",
              amount: state.amount ?? 0
            },
            currentPayment: {
              type: "exchange",
              exchangeId: state.currentPayment?.exchangeId,
              sessionId: state.currentPayment?.sessionId,
              result: status.txHash
            }
          }
        });
      }
      return status;
    } catch (error) {
      return {
        status: "UNKNOWN",
        txHash: ""
      };
    }
  },
  reset() {
    state.currentPayment = void 0;
    state.isPaymentInProgress = false;
    state.paymentId = "";
    state.paymentAsset = null;
    state.amount = 0;
    state.tokenAmount = 0;
    state.priceLoading = false;
    state.error = null;
    state.exchanges = [];
    state.isLoading = false;
  }
};
const ModalUtil = {
  isUnsupportedChainView() {
    return RouterController.state.view === "UnsupportedChain" || RouterController.state.view === "SwitchNetwork" && RouterController.state.history.includes("UnsupportedChain");
  },
  async safeClose() {
    if (this.isUnsupportedChainView()) {
      ModalController.shake();
      return;
    }
    const isSIWXCloseDisabled = await SIWXUtil.isSIWXCloseDisabled();
    if (isSIWXCloseDisabled) {
      ModalController.shake();
      return;
    }
    if (RouterController.state.view === "DataCapture" || RouterController.state.view === "DataCaptureOtpConfirm") {
      ConnectionController.disconnect();
    }
    ModalController.close();
  }
};
function getPopupWindow() {
  try {
    return CoreHelperUtil.returnOpenHref(`${ConstantsUtil$1.SECURE_SITE_SDK_ORIGIN}/loading`, "popupWindow", "width=600,height=800,scrollbars=yes");
  } catch (error) {
    throw new Error("Could not open social popup");
  }
}
async function connectFarcaster() {
  RouterController.push("ConnectingFarcaster");
  const authConnector = ConnectorController.getAuthConnector();
  if (authConnector) {
    const accountData = ChainController.getAccountData();
    if (!accountData?.farcasterUrl) {
      try {
        const { url } = await authConnector.provider.getFarcasterUri();
        ChainController.setAccountProp("farcasterUrl", url, ChainController.state.activeChain);
      } catch (error) {
        RouterController.goBack();
        SnackController.showError(error);
      }
    }
  }
}
async function connectSocial(socialProvider) {
  RouterController.push("ConnectingSocial");
  const authConnector = ConnectorController.getAuthConnector();
  let popupWindow = null;
  try {
    const timeout = setTimeout(() => {
      throw new Error("Social login timed out. Please try again.");
    }, 45e3);
    if (authConnector && socialProvider) {
      if (!CoreHelperUtil.isTelegram()) {
        popupWindow = getPopupWindow();
      }
      if (popupWindow) {
        ChainController.setAccountProp("socialWindow", ref(popupWindow), ChainController.state.activeChain);
      } else if (!CoreHelperUtil.isTelegram()) {
        throw new Error("Could not create social popup");
      }
      const { uri } = await authConnector.provider.getSocialRedirectUri({
        provider: socialProvider
      });
      if (!uri) {
        popupWindow?.close();
        throw new Error("Could not fetch the social redirect uri");
      }
      if (popupWindow) {
        popupWindow.location.href = uri;
      }
      if (CoreHelperUtil.isTelegram()) {
        StorageUtil.setTelegramSocialProvider(socialProvider);
        const parsedUri = CoreHelperUtil.formatTelegramSocialLoginUrl(uri);
        CoreHelperUtil.openHref(parsedUri, "_top");
      }
      clearTimeout(timeout);
    }
  } catch (error) {
    popupWindow?.close();
    const errorMessage = CoreHelperUtil.parseError(error);
    SnackController.showError(errorMessage);
    EventsController.sendEvent({
      type: "track",
      event: "SOCIAL_LOGIN_ERROR",
      properties: { provider: socialProvider, message: errorMessage }
    });
  }
}
async function executeSocialLogin(socialProvider) {
  ChainController.setAccountProp("socialProvider", socialProvider, ChainController.state.activeChain);
  EventsController.sendEvent({
    type: "track",
    event: "SOCIAL_LOGIN_STARTED",
    properties: { provider: socialProvider }
  });
  if (socialProvider === "farcaster") {
    await connectFarcaster();
  } else {
    await connectSocial(socialProvider);
  }
}
class ReownAuthenticationMessenger {
  constructor(params) {
    this.getNonce = params.getNonce;
  }
  async createMessage(input) {
    const params = {
      accountAddress: input.accountAddress,
      chainId: input.chainId,
      version: "1",
      domain: typeof document === "undefined" ? "Unknown Domain" : document.location.host,
      uri: typeof document === "undefined" ? "Unknown URI" : document.location.href,
      resources: this.resources,
      nonce: await this.getNonce(input),
      issuedAt: this.stringifyDate(/* @__PURE__ */ new Date()),
      statement: void 0,
      expirationTime: void 0,
      notBefore: void 0
    };
    const methods = {
      toString: () => this.stringify(params)
    };
    return Object.assign(params, methods);
  }
  stringify(params) {
    const networkName = this.getNetworkName(params.chainId);
    return [
      `${params.domain} wants you to sign in with your ${networkName} account:`,
      params.accountAddress,
      params.statement ? `
${params.statement}
` : "",
      `URI: ${params.uri}`,
      `Version: ${params.version}`,
      `Chain ID: ${params.chainId}`,
      `Nonce: ${params.nonce}`,
      params.issuedAt && `Issued At: ${params.issuedAt}`,
      params.expirationTime && `Expiration Time: ${params.expirationTime}`,
      params.notBefore && `Not Before: ${params.notBefore}`,
      params.requestId && `Request ID: ${params.requestId}`,
      params.resources?.length && params.resources.reduce((acc, resource) => `${acc}
- ${resource}`, "Resources:")
    ].filter((line) => typeof line === "string").join("\n").trim();
  }
  getNetworkName(chainId) {
    const requestedNetworks = ChainController.getAllRequestedCaipNetworks();
    return NetworkUtil$1.getNetworkNameByCaipNetworkId(requestedNetworks, chainId);
  }
  stringifyDate(date) {
    return date.toISOString();
  }
}
class ReownAuthentication {
  constructor(params = {}) {
    this.otpUuid = null;
    this.listeners = {
      sessionChanged: []
    };
    this.localAuthStorageKey = params.localAuthStorageKey || SafeLocalStorageKeys.SIWX_AUTH_TOKEN;
    this.localNonceStorageKey = params.localNonceStorageKey || SafeLocalStorageKeys.SIWX_NONCE_TOKEN;
    this.required = params.required ?? true;
    this.messenger = new ReownAuthenticationMessenger({
      getNonce: this.getNonce.bind(this)
    });
  }
  async createMessage(input) {
    return this.messenger.createMessage(input);
  }
  async addSession(session) {
    const response = await this.request({
      method: "POST",
      key: "authenticate",
      body: {
        data: session.data,
        message: session.message,
        signature: session.signature,
        clientId: this.getClientId(),
        walletInfo: this.getWalletInfo()
      },
      headers: ["nonce", "otp"]
    });
    this.setStorageToken(response.token, this.localAuthStorageKey);
    this.emit("sessionChanged", session);
    this.setAppKitAccountUser(jwtDecode(response.token));
    this.otpUuid = null;
  }
  async getSessions(chainId, address) {
    try {
      if (!this.getStorageToken(this.localAuthStorageKey)) {
        return [];
      }
      const account = await this.request({
        method: "GET",
        key: "me",
        query: {},
        headers: ["auth"]
      });
      if (!account) {
        return [];
      }
      const isSameAddress = account.address.toLowerCase() === address.toLowerCase();
      const isSameNetwork = account.caip2Network === chainId;
      if (!isSameAddress || !isSameNetwork) {
        return [];
      }
      const session = {
        data: {
          accountAddress: account.address,
          chainId: account.caip2Network
        },
        message: "",
        signature: ""
      };
      this.emit("sessionChanged", session);
      this.setAppKitAccountUser(account);
      return [session];
    } catch {
      return [];
    }
  }
  async revokeSession(_chainId, _address) {
    return Promise.resolve(this.clearStorageTokens());
  }
  async setSessions(sessions) {
    if (sessions.length === 0) {
      this.clearStorageTokens();
    } else {
      const session = sessions.find((s) => s.data.chainId === getActiveCaipNetwork()?.caipNetworkId) || sessions[0];
      await this.addSession(session);
    }
  }
  getRequired() {
    return this.required;
  }
  async getSessionAccount() {
    if (!this.getStorageToken(this.localAuthStorageKey)) {
      throw new Error("Not authenticated");
    }
    return this.request({
      method: "GET",
      key: "me",
      body: void 0,
      query: {
        includeAppKitAccount: true
      },
      headers: ["auth"]
    });
  }
  async setSessionAccountMetadata(metadata = null) {
    if (!this.getStorageToken(this.localAuthStorageKey)) {
      throw new Error("Not authenticated");
    }
    return this.request({
      method: "PUT",
      key: "account-metadata",
      body: { metadata },
      headers: ["auth"]
    });
  }
  on(event, callback) {
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    };
  }
  removeAllListeners() {
    const keys = Object.keys(this.listeners);
    keys.forEach((key) => {
      this.listeners[key] = [];
    });
  }
  async requestEmailOtp({ email, account }) {
    const otp = await this.request({
      method: "POST",
      key: "otp",
      body: { email, account }
    });
    this.otpUuid = otp.uuid;
    this.messenger.resources = [`email:${email}`];
    return otp;
  }
  confirmEmailOtp({ code }) {
    return this.request({
      method: "PUT",
      key: "otp",
      body: { code },
      headers: ["otp"]
    });
  }
  async request({ method, key, query, body, headers }) {
    const { projectId, st, sv } = this.getSDKProperties();
    const url = new URL(`${ConstantsUtil$1.W3M_API_URL}/auth/v1/${String(key)}`);
    url.searchParams.set("projectId", projectId);
    url.searchParams.set("st", st);
    url.searchParams.set("sv", sv);
    if (query) {
      Object.entries(query).forEach(([queryKey, queryValue]) => url.searchParams.set(queryKey, String(queryValue)));
    }
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : void 0,
      headers: Array.isArray(headers) ? headers.reduce((acc, header) => {
        switch (header) {
          case "nonce":
            acc["x-nonce-jwt"] = `Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;
            break;
          case "auth":
            acc["Authorization"] = `Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;
            break;
          case "otp":
            if (this.otpUuid) {
              acc["x-otp"] = this.otpUuid;
            }
            break;
        }
        return acc;
      }, {}) : void 0
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }
    return null;
  }
  getStorageToken(key) {
    return SafeLocalStorage.getItem(key);
  }
  setStorageToken(token, key) {
    SafeLocalStorage.setItem(key, token);
  }
  clearStorageTokens() {
    this.otpUuid = null;
    SafeLocalStorage.removeItem(this.localAuthStorageKey);
    SafeLocalStorage.removeItem(this.localNonceStorageKey);
    this.emit("sessionChanged", void 0);
  }
  async getNonce() {
    const { nonce, token } = await this.request({
      method: "GET",
      key: "nonce"
    });
    this.setStorageToken(token, this.localNonceStorageKey);
    return nonce;
  }
  getClientId() {
    return BlockchainApiController.state.clientId;
  }
  getWalletInfo() {
    const walletInfo = ChainController.getAccountData()?.connectedWalletInfo;
    if (!walletInfo) {
      return void 0;
    }
    if ("social" in walletInfo && "identifier" in walletInfo) {
      const social = walletInfo["social"];
      const identifier = walletInfo["identifier"];
      return { type: "social", social, identifier };
    }
    const { name, icon } = walletInfo;
    let type = "unknown";
    switch (walletInfo.type) {
      case "EXTERNAL":
      case "INJECTED":
      case "ANNOUNCED":
        type = "extension";
        break;
      case "WALLET_CONNECT":
        type = "walletconnect";
        break;
      default:
        type = "unknown";
    }
    return {
      type,
      name,
      icon
    };
  }
  getSDKProperties() {
    return ApiController._getSdkProperties();
  }
  emit(event, data) {
    this.listeners[event].forEach((listener) => listener(data));
  }
  setAppKitAccountUser(session) {
    const { email } = session;
    if (email) {
      Object.values(ConstantsUtil$1.CHAIN).forEach((chainNamespace) => {
        ChainController.setAccountProp("user", { email }, chainNamespace);
      });
    }
  }
}
function jwtDecode(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }
  const payload = parts[1];
  if (typeof payload !== "string") {
    throw new Error("Invalid token");
  }
  const base64 = payload.replace(/-/gu, "+").replace(/_/gu, "/");
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
  const decoded = JSON.parse(atob(padded));
  return decoded;
}
const features = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ReownAuthentication,
  ReownAuthenticationMessenger
});
export {
  AdapterBlueprint as A,
  BlockchainApiController as B,
  ChainController as C,
  OptionsStateController as D,
  EnsController as E,
  executeSocialLogin as F,
  AppKitError as G,
  MobileWalletUtil as H,
  SwapController as I,
  BalanceUtil as J,
  ReownAuthentication as K,
  ModalUtil as L,
  ModalController as M,
  NetworkUtil as N,
  OptionsController as O,
  ProviderController as P,
  FetchUtil as Q,
  RouterController as R,
  StorageUtil as S,
  ThemeController as T,
  getNativeTokenAddress as U,
  features as V,
  WalletConnectConnector as W,
  ConnectorController as a,
  baseSepoliaUSDC as b,
  baseUSDC as c,
  CoreHelperUtil as d,
  ConstantsUtil as e,
  ApiController as f,
  AlertController as g,
  getPreferredAccountType as h,
  ConnectionController as i,
  AssetUtil as j,
  ConnectionControllerUtil as k,
  ConnectorUtil as l,
  OnRampController as m,
  SendController as n,
  WcHelpersUtil as o,
  EventsController as p,
  AdapterController as q,
  SIWXUtil as r,
  PublicStateController as s,
  SnackController as t,
  WalletUtil as u,
  getActiveCaipNetwork as v,
  AssetController as w,
  ExchangeController as x,
  TransactionsController as y,
  TooltipController as z
};
