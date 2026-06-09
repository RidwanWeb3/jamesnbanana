import { d as dayjs, r as relativeTime, u as updateLocale, e as englishLocale } from "./dayjs.mjs";
import { B as Big } from "./big.js.mjs";
const HelpersUtil = {
  isLowerCaseMatch(str1, str2) {
    return str1?.toLowerCase() === str2?.toLowerCase();
  }
};
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
const localeObject = {
  ...englishLocale,
  name: "en-web3-modal",
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d sec",
    m: "1 min",
    mm: "%d min",
    h: "1 hr",
    hh: "%d hrs",
    d: "1 d",
    dd: "%d d",
    M: "1 mo",
    MM: "%d mo",
    y: "1 yr",
    yy: "%d yr"
  }
};
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
dayjs.locale("en-web3-modal", localeObject);
const DateUtil = {
  getMonthNameByIndex(monthIndex) {
    return MONTH_NAMES[monthIndex];
  },
  getYear(date = (/* @__PURE__ */ new Date()).toISOString()) {
    return dayjs(date).year();
  },
  getRelativeDateFromNow(date) {
    return dayjs(date).locale("en-web3-modal").fromNow(true);
  },
  formatDate(date, format = "DD MMM") {
    return dayjs(date).format(format);
  }
};
const ConstantsUtil = {
  WC_NAME_SUFFIX: ".reown.id",
  WC_NAME_SUFFIX_LEGACY: ".wcn.id",
  BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
  PULSE_API_URL: "https://pulse.walletconnect.org",
  W3M_API_URL: "https://api.web3modal.org",
  CONNECTOR_ID: {
    WALLET_CONNECT: "walletConnect",
    INJECTED: "injected",
    WALLET_STANDARD: "announced",
    COINBASE: "coinbaseWallet",
    COINBASE_SDK: "coinbaseWalletSDK",
    BASE_ACCOUNT: "baseAccount",
    SAFE: "safe",
    LEDGER: "ledger",
    OKX: "okx",
    EIP6963: "eip6963",
    AUTH: "AUTH"
  },
  CONNECTOR_NAMES: {
    AUTH: "Auth"
  },
  AUTH_CONNECTOR_SUPPORTED_CHAINS: ["eip155", "solana"],
  LIMITS: {
    PENDING_TRANSACTIONS: 99
  },
  CHAIN: {
    EVM: "eip155",
    SOLANA: "solana",
    POLKADOT: "polkadot",
    BITCOIN: "bip122",
    TON: "ton",
    TRON: "tron"
  },
  CHAIN_NAME_MAP: {
    eip155: "EVM Networks",
    solana: "Solana",
    polkadot: "Polkadot",
    bip122: "Bitcoin",
    cosmos: "Cosmos",
    sui: "Sui",
    stacks: "Stacks",
    ton: "TON",
    tron: "TRON"
  },
  ADAPTER_TYPES: {
    BITCOIN: "bitcoin",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5",
    TON: "ton",
    TRON: "tron"
  },
  USDT_CONTRACT_ADDRESSES: [
    "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
    "0x919C1c267BC06a7039e03fcc2eF738525769109c",
    "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    "0x55d398326f99059fF775485246999027B3197955",
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  ],
  SOLANA_SPL_TOKEN_ADDRESSES: {
    SOL: "So11111111111111111111111111111111111111112"
  },
  NATIVE_IMAGE_IDS_BY_NAMESPACE: {
    eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
    solana: "3e8119e5-2a6f-4818-c50c-1937011d5900",
    bip122: "0b4838db-0161-4ffe-022d-532bf03dba00"
  },
  TOKEN_SYMBOLS_BY_ADDRESS: {
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "USDC",
    "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913": "USDC",
    "0x0b2c639c533813f4aa9d7837caf62653d097ff85": "USDC",
    "0xaf88d065e77c8cc2239327c5edb3a432268e5831": "USDC",
    "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359": "USDC",
    "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": "USDC",
    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
    "0xdac17f958d2ee523a2206206994597c13d831ec7": "USDT",
    "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58": "USDT",
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9": "USDT",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": "USDT",
    Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT"
  },
  HTTP_STATUS_CODES: {
    SERVER_ERROR: 500,
    TOO_MANY_REQUESTS: 429,
    SERVICE_UNAVAILABLE: 503,
    FORBIDDEN: 403
  },
  UNSUPPORTED_NETWORK_NAME: "Unknown Network",
  SECURE_SITE_SDK_ORIGIN: (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org",
  REMOTE_FEATURES_ALERTS: {
    MULTI_WALLET_NOT_ENABLED: {
      DEFAULT: {
        displayMessage: "Multi-Wallet Not Enabled",
        debugMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com."
      },
      CONNECTIONS_HOOK: {
        displayMessage: "Multi-Wallet Not Enabled",
        debugMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnections hook."
      },
      CONNECTION_HOOK: {
        displayMessage: "Multi-Wallet Not Enabled",
        debugMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnection hook."
      }
    },
    HEADLESS_NOT_ENABLED: {
      DEFAULT: {
        displayMessage: "",
        debugMessage: "Headless support is not enabled. Please enable it with the features.headless option in the AppKit configuration and make sure your current plan supports it."
      }
    }
  },
  IS_DEVELOPMENT: typeof process !== "undefined" && process.env["NODE_ENV"] === "development",
  DEFAULT_ALLOWED_ANCESTORS: [
    "http://localhost:*",
    "https://localhost:*",
    "http://127.0.0.1:*",
    "https://127.0.0.1:*",
    "https://*.pages.dev",
    "https://*.vercel.app",
    "https://*.ngrok-free.app",
    "https://secure-mobile.walletconnect.com",
    "https://secure-mobile.walletconnect.org"
  ],
  METMASK_CONNECTOR_NAME: "MetaMask",
  TRUST_CONNECTOR_NAME: "Trust Wallet",
  SOLFLARE_CONNECTOR_NAME: "Solflare",
  PHANTOM_CONNECTOR_NAME: "Phantom",
  COIN98_CONNECTOR_NAME: "Coin98",
  MAGIC_EDEN_CONNECTOR_NAME: "Magic Eden",
  BACKPACK_CONNECTOR_NAME: "Backpack",
  BITGET_CONNECTOR_NAME: "Bitget Wallet",
  FRONTIER_CONNECTOR_NAME: "Frontier",
  XVERSE_CONNECTOR_NAME: "Xverse Wallet",
  LEATHER_CONNECTOR_NAME: "Leather",
  OKX_CONNECTOR_NAME: "OKX Wallet",
  BINANCE_CONNECTOR_NAME: "Binance Wallet",
  EIP155: "eip155",
  ADD_CHAIN_METHOD: "wallet_addEthereumChain",
  EIP6963_ANNOUNCE_EVENT: "eip6963:announceProvider",
  EIP6963_REQUEST_EVENT: "eip6963:requestProvider",
  CONNECTOR_RDNS_MAP: {
    coinbaseWallet: "com.coinbase.wallet",
    coinbaseWalletSDK: "com.coinbase.wallet"
  },
  CONNECTOR_TYPE_EXTERNAL: "EXTERNAL",
  CONNECTOR_TYPE_WALLET_CONNECT: "WALLET_CONNECT",
  CONNECTOR_TYPE_INJECTED: "INJECTED",
  CONNECTOR_TYPE_ANNOUNCED: "ANNOUNCED",
  CONNECTOR_TYPE_AUTH: "AUTH",
  CONNECTOR_TYPE_MULTI_CHAIN: "MULTI_CHAIN",
  CONNECTOR_TYPE_W3M_AUTH: "AUTH"
};
const NetworkUtil = {
  caipNetworkIdToNumber(caipnetworkId) {
    return caipnetworkId ? Number(caipnetworkId.split(":")[1]) : void 0;
  },
  parseEvmChainId(chainId) {
    return typeof chainId === "string" ? this.caipNetworkIdToNumber(chainId) : chainId;
  },
  getNetworksByNamespace(networks, namespace) {
    return networks?.filter((network) => network.chainNamespace === namespace) || [];
  },
  getFirstNetworkByNamespace(networks, namespace) {
    return this.getNetworksByNamespace(networks, namespace)[0];
  },
  getNetworkNameByCaipNetworkId(caipNetworks, caipNetworkId) {
    if (!caipNetworkId) {
      return void 0;
    }
    const caipNetwork = caipNetworks.find((network) => network.caipNetworkId === caipNetworkId);
    if (caipNetwork) {
      return caipNetwork.name;
    }
    const [namespace] = caipNetworkId.split(":");
    return ConstantsUtil.CHAIN_NAME_MAP?.[namespace] || void 0;
  }
};
const AVAILABLE_NAMESPACES = [
  "eip155",
  "solana",
  "polkadot",
  "bip122",
  "cosmos",
  "sui",
  "stacks"
];
const NumberUtil = {
  bigNumber(value, params = {
    safe: false
  }) {
    try {
      if (!value) {
        return new Big(0);
      }
      return new Big(value);
    } catch (err) {
      if (params.safe) {
        return new Big(0);
      }
      throw err;
    }
  },
  formatNumber(value, params) {
    const { decimals, round = 8, safe = true } = params;
    const bigNumber = NumberUtil.bigNumber(value, { safe });
    return bigNumber.div(new Big(10).pow(decimals)).round(round);
  },
  multiply(a, b) {
    if (a === void 0 || b === void 0) {
      return new Big(0);
    }
    const aBigNumber = new Big(a);
    const bBigNumber = new Big(b);
    return aBigNumber.times(bBigNumber);
  },
  toFixed(value, decimals = 2) {
    if (value === void 0 || value === "") {
      return new Big(0).toFixed(decimals);
    }
    return new Big(value).toFixed(decimals);
  },
  formatNumberToLocalString(value, decimals = 2) {
    if (value === void 0 || value === "") {
      return "0.00";
    }
    if (typeof value === "number") {
      return value.toLocaleString("en-US", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
        roundingMode: "floor"
      });
    }
    return parseFloat(value).toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
      roundingMode: "floor"
    });
  },
  parseLocalStringToNumber(value) {
    if (value === void 0 || value === "") {
      return 0;
    }
    const sanitizedValue = value.replace(/,/gu, "");
    return new Big(sanitizedValue).toNumber();
  }
};
const InputUtil = {
  numericInputKeyDown(event, currentValue, onChange) {
    const allowedKeys = [
      "Backspace",
      "Meta",
      "Ctrl",
      "a",
      "A",
      "c",
      "C",
      "x",
      "X",
      "v",
      "V",
      "ArrowLeft",
      "ArrowRight",
      "Tab"
    ];
    const controlPressed = event.metaKey || event.ctrlKey;
    const eventKey = event.key;
    const lowercaseEventKey = eventKey.toLocaleLowerCase();
    const selectAll = lowercaseEventKey === "a";
    const copyKey = lowercaseEventKey === "c";
    const pasteKey = lowercaseEventKey === "v";
    const cutKey = lowercaseEventKey === "x";
    const isComma = eventKey === ",";
    const isDot = eventKey === ".";
    const isNumericKey = eventKey >= "0" && eventKey <= "9";
    if (!controlPressed && (selectAll || copyKey || pasteKey || cutKey)) {
      event.preventDefault();
    }
    if (currentValue === "0" && !isComma && !isDot && eventKey === "0") {
      event.preventDefault();
    }
    if (currentValue === "0" && isNumericKey) {
      onChange(eventKey);
      event.preventDefault();
    }
    if (isComma || isDot) {
      if (!currentValue) {
        onChange("0.");
        event.preventDefault();
      }
      if (currentValue?.includes(".") || currentValue?.includes(",")) {
        event.preventDefault();
      }
    }
    if (!isNumericKey && !allowedKeys.includes(eventKey) && !isDot && !isComma) {
      event.preventDefault();
    }
  }
};
const erc20ABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];
const swapABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }]
  }
];
const usdtABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];
const ContractUtil = {
  getERC20Abi: (tokenAddress) => {
    if (ConstantsUtil.USDT_CONTRACT_ADDRESSES.includes(tokenAddress)) {
      return usdtABI;
    }
    return erc20ABI;
  },
  getSwapAbi: () => swapABI
};
const NavigationUtil = {
  URLS: {
    FAQ: "https://walletconnect.com/faq"
  }
};
const PresetsUtil = {
  ConnectorExplorerIds: {
    [ConstantsUtil.CONNECTOR_ID.COINBASE]: "d0ca99ff52b99abc48743dad0f7fc891e041be73574f7fac4afe5d4bb83845c8",
    [ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]: "d0ca99ff52b99abc48743dad0f7fc891e041be73574f7fac4afe5d4bb83845c8",
    [ConstantsUtil.CONNECTOR_ID.BASE_ACCOUNT]: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
    [ConstantsUtil.CONNECTOR_ID.SAFE]: "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
    [ConstantsUtil.CONNECTOR_ID.LEDGER]: "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",
    [ConstantsUtil.CONNECTOR_ID.OKX]: "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    [ConstantsUtil.METMASK_CONNECTOR_NAME]: "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    [ConstantsUtil.TRUST_CONNECTOR_NAME]: "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    [ConstantsUtil.SOLFLARE_CONNECTOR_NAME]: "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
    [ConstantsUtil.PHANTOM_CONNECTOR_NAME]: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    [ConstantsUtil.COIN98_CONNECTOR_NAME]: "2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01",
    [ConstantsUtil.MAGIC_EDEN_CONNECTOR_NAME]: "8b830a2b724a9c3fbab63af6f55ed29c9dfa8a55e732dc88c80a196a2ba136c6",
    [ConstantsUtil.BACKPACK_CONNECTOR_NAME]: "2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0",
    [ConstantsUtil.BITGET_CONNECTOR_NAME]: "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
    [ConstantsUtil.FRONTIER_CONNECTOR_NAME]: "85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041",
    [ConstantsUtil.XVERSE_CONNECTOR_NAME]: "2a87d74ae02e10bdd1f51f7ce6c4e1cc53cd5f2c0b6b5ad0d7b3007d2b13de7b",
    [ConstantsUtil.LEATHER_CONNECTOR_NAME]: "483afe1df1df63daf313109971ff3ef8356ddf1cc4e45877d205eee0b7893a13",
    [ConstantsUtil.OKX_CONNECTOR_NAME]: "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    [ConstantsUtil.BINANCE_CONNECTOR_NAME]: "2fafea35bb471d22889ccb49c08d99dd0a18a37982602c33f696a5723934ba25"
  },
  ConnectorImageIds: {
    [ConstantsUtil.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [ConstantsUtil.CONNECTOR_ID.BASE_ACCOUNT]: "bba2c8be-7fd1-463e-42b1-796ecb0ad200",
    [ConstantsUtil.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
    [ConstantsUtil.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
    [ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
    [ConstantsUtil.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
  },
  ConnectorNamesMap: {
    [ConstantsUtil.CONNECTOR_ID.INJECTED]: "Browser Wallet",
    [ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
    [ConstantsUtil.CONNECTOR_ID.COINBASE]: "Coinbase",
    [ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
    [ConstantsUtil.CONNECTOR_ID.BASE_ACCOUNT]: "Base Account",
    [ConstantsUtil.CONNECTOR_ID.LEDGER]: "Ledger",
    [ConstantsUtil.CONNECTOR_ID.SAFE]: "Safe"
  },
  ConnectorTypesMap: {
    [ConstantsUtil.CONNECTOR_ID.INJECTED]: "INJECTED",
    [ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]: "WALLET_CONNECT",
    [ConstantsUtil.CONNECTOR_ID.EIP6963]: "ANNOUNCED",
    [ConstantsUtil.CONNECTOR_ID.AUTH]: "AUTH",
    [ConstantsUtil.CONNECTOR_ID.COINBASE]: "EXTERNAL",
    [ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]: "EXTERNAL",
    [ConstantsUtil.CONNECTOR_ID.BASE_ACCOUNT]: "EXTERNAL"
  }
};
const ParseUtil = {
  validateCaipAddress(address) {
    if (address.split(":")?.length !== 3) {
      throw new Error("Invalid CAIP Address");
    }
    return address;
  },
  parseCaipAddress(caipAddress) {
    const parts = caipAddress.split(":");
    if (parts.length !== 3) {
      throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
    }
    const [chainNamespace, chainId, address] = parts;
    if (!chainNamespace || !chainId || !address) {
      throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
    }
    return {
      chainNamespace,
      chainId,
      address
    };
  },
  parseCaipNetworkId(caipNetworkId) {
    const parts = caipNetworkId.split(":");
    if (parts.length !== 2) {
      throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
    }
    const [chainNamespace, chainId] = parts;
    if (!chainNamespace || !chainId) {
      throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
    }
    return {
      chainNamespace,
      chainId
    };
  }
};
const ErrorUtil = {
  RPC_ERROR_CODE: {
    USER_REJECTED_REQUEST: 4001,
    USER_REJECTED_METHODS: 5002,
    USER_REJECTED: 5e3,
    SEND_TRANSACTION_ERROR: 5001
  },
  PROVIDER_RPC_ERROR_NAME: {
    PROVIDER_RPC: "ProviderRpcError",
    USER_REJECTED_REQUEST: "UserRejectedRequestError",
    SEND_TRANSACTION_ERROR: "SendTransactionError"
  },
  isRpcProviderError(error) {
    try {
      if (typeof error === "object" && error !== null) {
        const objErr = error;
        const hasMessage = typeof objErr["message"] === "string";
        const hasCode = typeof objErr["code"] === "number";
        return hasMessage && hasCode;
      }
      return false;
    } catch {
      return false;
    }
  },
  isUserRejectedMessage(message) {
    return message.toLowerCase().includes("user rejected") || message.toLowerCase().includes("user cancelled") || message.toLowerCase().includes("user canceled");
  },
  isUserRejectedRequestError(error) {
    if (ErrorUtil.isRpcProviderError(error)) {
      const isUserRejectedCode = error.code === ErrorUtil.RPC_ERROR_CODE.USER_REJECTED_REQUEST;
      const isUserRejectedMethodsCode = error.code === ErrorUtil.RPC_ERROR_CODE.USER_REJECTED_METHODS;
      return isUserRejectedCode || isUserRejectedMethodsCode || ErrorUtil.isUserRejectedMessage(error.message);
    }
    if (error instanceof Error) {
      return ErrorUtil.isUserRejectedMessage(error.message);
    }
    return false;
  }
};
class ProviderRpcError extends Error {
  constructor(cause, options) {
    super(options.message, { cause });
    this.name = ErrorUtil.PROVIDER_RPC_ERROR_NAME.PROVIDER_RPC;
    this.code = options.code;
  }
}
class UserRejectedRequestError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: ErrorUtil.RPC_ERROR_CODE.USER_REJECTED_REQUEST,
      message: "User rejected the request"
    });
    this.name = ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
  }
}
const SafeLocalStorageKeys = {
  WALLET_ID: "@appkit/wallet_id",
  WALLET_NAME: "@appkit/wallet_name",
  SOLANA_WALLET: "@appkit/solana_wallet",
  SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain",
  ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id",
  CONNECTED_SOCIAL: "@appkit/connected_social",
  CONNECTED_SOCIAL_USERNAME: "@appkit-wallet/SOCIAL_USERNAME",
  RECENT_WALLETS: "@appkit/recent_wallets",
  RECENT_WALLET: "@appkit/recent_wallet",
  DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
  ACTIVE_NAMESPACE: "@appkit/active_namespace",
  CONNECTED_NAMESPACES: "@appkit/connected_namespaces",
  CONNECTION_STATUS: "@appkit/connection_status",
  SIWX_AUTH_TOKEN: "@appkit/siwx-auth-token",
  SIWX_NONCE_TOKEN: "@appkit/siwx-nonce-token",
  TELEGRAM_SOCIAL_PROVIDER: "@appkit/social_provider",
  NATIVE_BALANCE_CACHE: "@appkit/native_balance_cache",
  PORTFOLIO_CACHE: "@appkit/portfolio_cache",
  ENS_CACHE: "@appkit/ens_cache",
  IDENTITY_CACHE: "@appkit/identity_cache",
  PREFERRED_ACCOUNT_TYPES: "@appkit/preferred_account_types",
  CONNECTIONS: "@appkit/connections",
  DISCONNECTED_CONNECTOR_IDS: "@appkit/disconnected_connector_ids",
  HISTORY_TRANSACTIONS_CACHE: "@appkit/history_transactions_cache",
  TOKEN_PRICE_CACHE: "@appkit/token_price_cache",
  RECENT_EMAILS: "@appkit/recent_emails",
  LATEST_APPKIT_VERSION: "@appkit/latest_version",
  TON_WALLETS_CACHE: "@appkit/ton_wallets_cache"
};
function getSafeConnectorIdKey(namespace) {
  if (!namespace) {
    throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");
  }
  return `@appkit/${namespace}:connected_connector_id`;
}
const SafeLocalStorage = {
  setItem(key, value) {
    if (isSafe() && value !== void 0) {
      localStorage.setItem(key, value);
    }
  },
  getItem(key) {
    if (isSafe()) {
      return localStorage.getItem(key) || void 0;
    }
    return void 0;
  },
  removeItem(key) {
    if (isSafe()) {
      localStorage.removeItem(key);
    }
  },
  clear() {
    if (isSafe()) {
      localStorage.clear();
    }
  }
};
function isSafe() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}
function getW3mThemeVariables(themeVariables, themeType) {
  const accent = themeVariables?.["--apkt-accent"] ?? themeVariables?.["--w3m-accent"];
  if (themeType === "light") {
    return {
      "--w3m-accent": accent || "hsla(231, 100%, 70%, 1)",
      "--w3m-background": "#fff"
    };
  }
  return {
    "--w3m-accent": accent || "hsla(230, 100%, 67%, 1)",
    "--w3m-background": "#202020"
  };
}
export {
  AVAILABLE_NAMESPACES as A,
  ConstantsUtil as C,
  DateUtil as D,
  ErrorUtil as E,
  HelpersUtil as H,
  InputUtil as I,
  NumberUtil as N,
  PresetsUtil as P,
  SafeLocalStorage as S,
  UserRejectedRequestError as U,
  SafeLocalStorageKeys as a,
  ParseUtil as b,
  getW3mThemeVariables as c,
  ContractUtil as d,
  NetworkUtil as e,
  NavigationUtil as f,
  getSafeConnectorIdKey as g,
  isSafe as i
};
