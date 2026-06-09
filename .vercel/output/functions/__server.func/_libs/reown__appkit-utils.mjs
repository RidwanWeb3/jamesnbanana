import { C as ConstantsUtil$1, i as isSafe } from "./reown__appkit-common.mjs";
import { S as StorageUtil, C as ChainController, a as ConnectorController, O as OptionsController, b as baseSepoliaUSDC, c as baseUSDC } from "./reown__appkit-controllers.mjs";
import { G as Ge, U as Ue } from "./walletconnect__logger.mjs";
import { B as fallback, D as http } from "./viem.mjs";
const ConstantsUtil = {
  /* Connector names */
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
  EIP155: ConstantsUtil$1.CHAIN.EVM,
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
  CONNECTOR_TYPE_W3M_AUTH: "AUTH",
  getSDKVersionWarningMessage(currentVersion, latestVersion) {
    return `
     @@@@@@@           @@@@@@@@@@@@@@@@@@      
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@   @@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@  @@@@@@@@@@@@@
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@   @@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@   @@@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@  @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
      @@@@@            @@@@@@@@@@@@@@@@@@  
      
AppKit SDK version ${currentVersion} is outdated. Latest version is ${latestVersion}. Please update to the latest version for bug fixes and new features.
            
Changelog: https://github.com/reown-com/appkit/releases
NPM Registry: https://www.npmjs.com/package/@reown/appkit`;
  }
};
const PresetsUtil = {
  NetworkImageIds: {
    // Ethereum
    1: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
    // Arbitrum
    42161: "3bff954d-5cb0-47a0-9a23-d20192e74600",
    // Avalanche
    43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
    // Binance Smart Chain
    56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
    // Fantom
    250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
    // Optimism
    10: "ab9c186a-c52f-464b-2906-ca59d760a400",
    // Polygon
    137: "41d04d42-da3b-4453-8506-668cc0727900",
    // Mantle
    5e3: "e86fae9b-b770-4eea-e520-150e12c81100",
    // Hedera Mainnet
    295: "6a97d510-cac8-4e58-c7ce-e8681b044c00",
    // Sepolia
    11155111: "e909ea0a-f92a-4512-c8fc-748044ea6800",
    // Base Sepolia
    84532: "a18a7ecd-e307-4360-4746-283182228e00",
    // Unichain Sepolia
    1301: "4eeea7ef-0014-4649-5d1d-07271a80f600",
    // Unichain Mainnet
    130: "2257980a-3463-48c6-cbac-a42d2a956e00",
    // Monad
    10143: "0a728e83-bacb-46db-7844-948f05434900",
    143: "0a728e83-bacb-46db-7844-948f05434900",
    // Gnosis
    100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
    // EVMos
    9001: "f926ff41-260d-4028-635e-91913fc28e00",
    // ZkSync
    324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
    // Filecoin
    314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
    // Iotx
    4689: "34e68754-e536-40da-c153-6ef2e7188a00",
    // Metis,
    1088: "3897a66d-40b9-4833-162f-a2c90531c900",
    // Moonbeam
    1284: "161038da-44ae-4ec7-1208-0ea569454b00",
    // Moonriver
    1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00",
    // Zora
    7777777: "845c60df-d429-4991-e687-91ae45791600",
    // Celo
    42220: "ab781bbc-ccc6-418d-d32d-789b15da1f00",
    // Base
    8453: "7289c336-3981-4081-c5f4-efc26ac64a00",
    // Aurora
    1313161554: "3ff73439-a619-4894-9262-4470c773a100",
    // Ronin Mainnet
    2020: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    // Saigon Testnet (a.k.a. Ronin)
    2021: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    // Berachain Mainnet
    80094: "e329c2c9-59b0-4a02-83e4-212ff3779900",
    // Abstract Mainnet
    2741: "fc2427d1-5af9-4a9c-8da5-6f94627cd900",
    // Solana networks
    "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    EtWTRABZaYq6iMfeYKouRu166VU2xqa1: "a1b58899-f671-4276-6a5e-56ca5bd59700",
    // Bitcoin
    "000000000019d6689c085ae165831e93": "0b4838db-0161-4ffe-022d-532bf03dba00",
    // Bitcoin Testnet
    "000000000933ea01ad0ee984209779ba": "39354064-d79b-420b-065d-f980c4b78200",
    // Bitcoin Signet
    "00000008819873e925422c1ff0f99f7c": "b3406e4a-bbfc-44fb-e3a6-89673c78b700",
    // TON
    "-239": "20f673c0-095e-49b2-07cf-eb5049dcf600",
    // TON Testnet
    "-3": "20f673c0-095e-49b2-07cf-eb5049dcf600",
    // TRON
    "0x2b6653dc": "3502bb86-cc4e-420f-a387-59ea63a28b00",
    // TRON Shasta Testnet
    "0x94a9059e": "3502bb86-cc4e-420f-a387-59ea63a28b00",
    // TRON Nile Testnet
    "0xcd8690dc": "3502bb86-cc4e-420f-a387-59ea63a28b00"
  }
};
const HelpersUtil = {
  getCaipTokens(tokens) {
    if (!tokens) {
      return void 0;
    }
    const caipTokens = {};
    Object.entries(tokens).forEach(([id, token]) => {
      caipTokens[`${ConstantsUtil.EIP155}:${id}`] = token;
    });
    return caipTokens;
  },
  isLowerCaseMatch(str1, str2) {
    return str1?.toLowerCase() === str2?.toLowerCase();
  },
  /**
   * Iterates the Auth connector supported chains and returns the namespace that is last connected to the active chain.
   * @returns ChainNamespace | undefined
   */
  getActiveNamespaceConnectedToAuth() {
    const activeChain = ChainController.state.activeChain;
    return ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((chain) => ConnectorController.getConnectorId(chain) === ConstantsUtil$1.CONNECTOR_ID.AUTH && chain === activeChain);
  },
  /**
   * Runs a condition function again and again until it returns true or the max number of tries is reached.
   *
   * @param conditionFn - A function (can be async) that returns true when the condition is met.
   * @param intervalMs - Time to wait between tries, in milliseconds.
   * @param maxRetries - Maximum number of times to try before stopping.
   * @returns A Promise that resolves to true if the condition becomes true in time, or false if it doesn't.
   */
  withRetry({ conditionFn, intervalMs, maxRetries }) {
    let attempts = 0;
    return new Promise((resolve) => {
      async function tryCheck() {
        attempts += 1;
        const isConditionMet = await conditionFn();
        if (isConditionMet) {
          return resolve(true);
        }
        if (attempts >= maxRetries) {
          return resolve(false);
        }
        setTimeout(tryCheck, intervalMs);
        return null;
      }
      tryCheck();
    });
  },
  /**
   * Returns the chain namespace from user's chainId which is returned from Auth provider.
   * @param chainId - The chainId to parse.
   * @returns The chain namespace.
   */
  userChainIdToChainNamespace(chainId) {
    if (typeof chainId === "number") {
      return ConstantsUtil$1.CHAIN.EVM;
    }
    const [namespace] = chainId.split(":");
    return namespace;
  },
  /**
   * Get all auth namespaces except the active one
   * @param activeNamespace - The active namespace
   * @returns All auth namespaces except the active one
   */
  getOtherAuthNamespaces(activeNamespace) {
    if (!activeNamespace) {
      return [];
    }
    const authNamespaces = ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS;
    const otherAuthNamespaces = authNamespaces.filter((ns) => ns !== activeNamespace);
    return otherAuthNamespaces;
  },
  /**
   * Gets the storage info for a connector
   * @param connectorId - The ID of the connector
   * @param namespace - The namespace of the connector
   * @returns
   */
  getConnectorStorageInfo(connectorId, namespace) {
    const storageConnectionsByNamespace = StorageUtil.getConnections();
    const storageConnections = storageConnectionsByNamespace[namespace] ?? [];
    return {
      hasDisconnected: StorageUtil.isConnectorDisconnected(connectorId, namespace),
      hasConnected: storageConnections.some((c) => HelpersUtil.isLowerCaseMatch(c.connectorId, connectorId))
    };
  }
};
const abortController = new AbortController();
const ErrorUtil = {
  EmbeddedWalletAbortController: abortController,
  /**
   * Universal Provider errors. Make sure the `message` is matching with the errors thrown by the Universal Provider.
   * We use the `alertErrorKey` to map the error to the correct AppKit alert error.
   */
  UniversalProviderErrors: {
    UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
      message: "Unauthorized: origin not allowed",
      alertErrorKey: "ORIGIN_NOT_ALLOWED"
    },
    JWT_VALIDATION_ERROR: {
      message: "JWT validation error: JWT Token is not yet valid",
      alertErrorKey: "JWT_TOKEN_NOT_VALID"
    },
    INVALID_KEY: {
      message: "Unauthorized: invalid key",
      alertErrorKey: "INVALID_PROJECT_ID"
    }
  },
  ALERT_ERRORS: {
    SWITCH_NETWORK_NOT_FOUND: {
      code: "APKT001",
      displayMessage: "Network Not Found",
      debugMessage: "The specified network is not recognized. Please ensure it is included in the `networks` array of your `createAppKit` configuration."
    },
    ORIGIN_NOT_ALLOWED: {
      code: "APKT002",
      displayMessage: "Invalid App Configuration",
      debugMessage: () => `The origin ${isSafe() ? window.origin : "unknown"} is not in your allow list. Please update your allowed domains at https://dashboard.reown.com. [PID: ${OptionsController.state.projectId}]`
    },
    IFRAME_LOAD_FAILED: {
      code: "APKT003",
      displayMessage: "Network Error: Wallet Load Failed",
      debugMessage: () => "Failed to load the embedded wallet. This may be due to network issues or server downtime. Please check your network connection and try again shortly. Contact support if the issue persists."
    },
    IFRAME_REQUEST_TIMEOUT: {
      code: "APKT004",
      displayMessage: "Wallet Request Timeout",
      debugMessage: () => "The request to the embedded wallet timed out. Please check your network connection and try again shortly. Contact support if the issue persists."
    },
    UNVERIFIED_DOMAIN: {
      code: "APKT005",
      displayMessage: "Unverified Domain",
      debugMessage: () => "Embedded wallet load failed. Ensure your domain is verified in https://dashboard.reown.com."
    },
    JWT_TOKEN_NOT_VALID: {
      code: "APKT006",
      displayMessage: "Session Expired",
      debugMessage: "Your session is invalid or expired. Please check your system’s date and time settings, then reconnect."
    },
    INVALID_PROJECT_ID: {
      code: "APKT007",
      displayMessage: "Invalid Project ID",
      debugMessage: "The specified project ID is invalid. Please visit https://dashboard.reown.com to obtain a valid project ID."
    },
    PROJECT_ID_NOT_CONFIGURED: {
      code: "APKT008",
      displayMessage: "Project ID Missing",
      debugMessage: "No project ID is configured. You can create and configure a project ID at https://dashboard.reown.com."
    },
    SERVER_ERROR_APP_CONFIGURATION: {
      code: "APKT009",
      displayMessage: "Server Error",
      debugMessage: (errorMessage) => `Unable to fetch App Configuration. ${errorMessage}. Please check your network connection and try again shortly. Contact support if the issue persists.`
    },
    RATE_LIMITED_APP_CONFIGURATION: {
      code: "APKT010",
      displayMessage: "Rate Limited",
      debugMessage: "You have been rate limited while retrieving App Configuration. Please wait a few minutes and try again. Contact support if the issue persists."
    }
  },
  ALERT_WARNINGS: {
    LOCAL_CONFIGURATION_IGNORED: {
      debugMessage: (warningMessage) => `[Reown Config Notice] ${warningMessage}`
    },
    INACTIVE_NAMESPACE_NOT_CONNECTED: {
      code: "APKTW001",
      displayMessage: "Inactive Namespace Not Connected",
      debugMessage: (namespace, errorMessage) => `An error occurred while connecting an inactive namespace ${namespace}: "${errorMessage}"`
    },
    INVALID_EMAIL: {
      code: "APKTW002",
      displayMessage: "Invalid Email Address",
      debugMessage: "Please enter a valid email address"
    }
  }
};
const TokenUtil = {
  TOKEN_ADDRESSES_BY_SYMBOL: {
    USDC: {
      8453: baseUSDC.asset,
      84532: baseSepoliaUSDC.asset
    }
  },
  getTokenSymbolByAddress(tokenAddress) {
    if (!tokenAddress) {
      return void 0;
    }
    const [symbol] = Object.entries(TokenUtil.TOKEN_ADDRESSES_BY_SYMBOL).find(([_, addressesByChain]) => Object.values(addressesByChain).includes(tokenAddress)) ?? [];
    return symbol;
  }
};
const LoggerUtil = {
  createLogger(onError, level = "error") {
    const loggerOptions = Ge({
      level
    });
    const { logger } = Ue({
      opts: loggerOptions
    });
    logger.error = (...args) => {
      for (const arg of args) {
        if (arg instanceof Error) {
          onError(arg, ...args);
          return;
        }
      }
      onError(void 0, ...args);
    };
    return logger;
  }
};
const RPC_URL_HOST = "rpc.walletconnect.org";
function getBlockchainApiRpcUrl(caipNetworkId, projectId) {
  const url = new URL("https://rpc.walletconnect.org/v1/");
  url.searchParams.set("chainId", caipNetworkId);
  url.searchParams.set("projectId", projectId);
  return url.toString();
}
const WC_HTTP_RPC_SUPPORTED_CHAINS = [
  "near:mainnet",
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "eip155:1101",
  "eip155:56",
  "eip155:42161",
  "eip155:7777777",
  "eip155:59144",
  "eip155:324",
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  "eip155:5000",
  "solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz",
  "eip155:80084",
  "eip155:5003",
  "eip155:100",
  "eip155:8453",
  "eip155:42220",
  "eip155:1313161555",
  "eip155:17000",
  "eip155:1",
  "eip155:300",
  "eip155:1313161554",
  "eip155:1329",
  "eip155:84532",
  "eip155:421614",
  "eip155:11155111",
  "eip155:8217",
  "eip155:43114",
  "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  "eip155:999999999",
  "eip155:11155420",
  "eip155:80002",
  "eip155:97",
  "eip155:43113",
  "eip155:137",
  "eip155:10",
  "eip155:1301",
  "eip155:80094",
  "eip155:80069",
  "eip155:560048",
  "eip155:31",
  "eip155:2818",
  "eip155:57054",
  "eip155:911867",
  "eip155:534351",
  "eip155:1112",
  "eip155:534352",
  "eip155:1111",
  "eip155:146",
  "eip155:130",
  "eip155:1284",
  "eip155:30",
  "eip155:2810",
  "eip155:55931",
  "bip122:000000000019d6689c085ae165831e93",
  "bip122:000000000933ea01ad0ee984209779ba",
  "tron:0x2b6653dc",
  "tron:0xcd8690dc"
];
const CaipNetworksUtil = {
  /**
   * Extends the RPC URL with the project ID if the RPC URL is a Reown URL
   * @param rpcUrl - The RPC URL to extend
   * @param projectId - The project ID to extend the RPC URL with
   * @returns The extended RPC URL
   */
  extendRpcUrlWithProjectId(rpcUrl, projectId) {
    let isReownUrl = false;
    try {
      const url = new URL(rpcUrl);
      isReownUrl = url.host === RPC_URL_HOST;
    } catch (e) {
      isReownUrl = false;
    }
    if (isReownUrl) {
      const url = new URL(rpcUrl);
      if (!url.searchParams.has("projectId")) {
        url.searchParams.set("projectId", projectId);
      }
      return url.toString();
    }
    return rpcUrl;
  },
  isCaipNetwork(network) {
    return "chainNamespace" in network && "caipNetworkId" in network;
  },
  getChainNamespace(network) {
    if (this.isCaipNetwork(network)) {
      return network.chainNamespace;
    }
    return ConstantsUtil$1.CHAIN.EVM;
  },
  getCaipNetworkId(network) {
    if (this.isCaipNetwork(network)) {
      return network.caipNetworkId;
    }
    return `${ConstantsUtil$1.CHAIN.EVM}:${network.id}`;
  },
  // eslint-disable-next-line max-params
  getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId) {
    const defaultRpcUrl = caipNetwork.rpcUrls?.default?.http?.[0];
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetworkId)) {
      return getBlockchainApiRpcUrl(caipNetworkId, projectId);
    }
    return defaultRpcUrl || "";
  },
  /**
   * Extends the CaipNetwork object with the image ID and image URL if the image ID is not provided
   * @param params - The parameters object
   * @param params.caipNetwork - The CaipNetwork object to extend
   * @param params.networkImageIds - The network image IDs
   * @param params.customNetworkImageUrls - The custom network image URLs
   * @param params.projectId - The project ID
   * @param params.customRpc - Boolean to indicate if the custom RPC URL should be used
   * @param params.customRpcUrls - The map of chain and custom RPC URLs to be used by the AppKit
   * @returns The extended array of CaipNetwork objects
   */
  extendCaipNetwork(caipNetwork, { customNetworkImageUrls, projectId, customRpcUrls }) {
    const chainNamespace = this.getChainNamespace(caipNetwork);
    const caipNetworkId = this.getCaipNetworkId(caipNetwork);
    const networkDefaultRpcUrl = caipNetwork.rpcUrls?.default?.http?.[0];
    const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId);
    const chainDefaultRpcUrl = caipNetwork?.rpcUrls?.["chainDefault"]?.http?.[0] || networkDefaultRpcUrl;
    const customRpcUrlsOfNetwork = customRpcUrls?.[caipNetworkId]?.map((i) => i.url) || [];
    const rpcUrls = [...customRpcUrlsOfNetwork, ...reownRpcUrl ? [reownRpcUrl] : []];
    const rpcUrlsWithoutReown = [...customRpcUrlsOfNetwork];
    if (chainDefaultRpcUrl && !rpcUrlsWithoutReown.includes(chainDefaultRpcUrl)) {
      rpcUrlsWithoutReown.push(chainDefaultRpcUrl);
    }
    return {
      ...caipNetwork,
      chainNamespace,
      caipNetworkId,
      assets: {
        imageId: PresetsUtil.NetworkImageIds[caipNetwork.id],
        imageUrl: customNetworkImageUrls?.[caipNetwork.id]
      },
      rpcUrls: {
        ...caipNetwork.rpcUrls,
        default: {
          http: rpcUrls
        },
        // Save the networks original RPC URL default
        chainDefault: {
          http: rpcUrlsWithoutReown
        }
      }
    };
  },
  /**
   * Extends the array of CaipNetwork objects with the image ID and image URL if the image ID is not provided
   * @param caipNetworks - The array of CaipNetwork objects to extend
   * @param params - The parameters object
   * @param params.networkImageIds - The network image IDs
   * @param params.customNetworkImageUrls - The custom network image URLs
   * @param params.customRpcUrls - The map of chain and custom RPC URLs to be used by the AppKit
   * @param params.projectId - The project ID
   * @returns The extended array of CaipNetwork objects
   */
  extendCaipNetworks(caipNetworks, { customNetworkImageUrls, projectId, customRpcUrls }) {
    return caipNetworks.map((caipNetwork) => CaipNetworksUtil.extendCaipNetwork(caipNetwork, {
      customNetworkImageUrls,
      customRpcUrls,
      projectId
    }));
  },
  getViemTransport(caipNetwork, projectId, customRpcUrls) {
    const transports = [];
    customRpcUrls?.forEach((rpcUrl) => {
      transports.push(http(rpcUrl.url, rpcUrl.config));
    });
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
      transports.push(http(getBlockchainApiRpcUrl(caipNetwork.caipNetworkId, projectId), {
        /*
         * The Blockchain API uses "Content-Type: text/plain" to avoid OPTIONS preflight requests
         * It will only work for viem >= 2.17.7
         */
        fetchOptions: {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      }));
    }
    caipNetwork?.rpcUrls?.default?.http?.forEach((rpcUrl) => {
      transports.push(http(rpcUrl));
    });
    return fallback(transports);
  },
  extendWagmiTransports(caipNetwork, projectId, transport) {
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
      const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetwork.caipNetworkId, projectId);
      return fallback([transport, http(reownRpcUrl)]);
    }
    return transport;
  },
  /**
   * Generates the unsupported network object with the given CaipNetwork ID
   * @param caipNetworkId - The CAIP network ID
   * @returns The unsupported CAIP network object
   */
  getUnsupportedNetwork(caipNetworkId) {
    return {
      id: caipNetworkId.split(":")[1],
      caipNetworkId,
      name: ConstantsUtil$1.UNSUPPORTED_NETWORK_NAME,
      chainNamespace: caipNetworkId.split(":")[0],
      nativeCurrency: {
        name: "",
        decimals: 0,
        symbol: ""
      },
      rpcUrls: {
        default: {
          http: []
        }
      }
    };
  },
  /**
   * Gets the CaipNetwork object from the storage if `@appkit/active_caip_network_id` is being set
   * @returns CaipNetwork or undefined
   */
  getCaipNetworkFromStorage(defaultCaipNetwork) {
    const caipNetworkIdFromStorage = StorageUtil.getActiveCaipNetworkId();
    const caipNetworks = ChainController.getAllRequestedCaipNetworks();
    const availableNamespaces = Array.from(ChainController.state.chains?.keys() || []);
    const namespace = caipNetworkIdFromStorage?.split(":")[0];
    const isNamespaceAvailable = namespace ? availableNamespaces.includes(namespace) : false;
    const caipNetwork = caipNetworks?.find((cn) => cn.caipNetworkId === caipNetworkIdFromStorage);
    const isUnsupportedNetwork = isNamespaceAvailable && !caipNetwork && caipNetworkIdFromStorage;
    if (isUnsupportedNetwork) {
      return this.getUnsupportedNetwork(caipNetworkIdFromStorage);
    }
    if (caipNetwork) {
      return caipNetwork;
    }
    if (defaultCaipNetwork) {
      return defaultCaipNetwork;
    }
    return caipNetworks?.[0];
  }
};
export {
  CaipNetworksUtil as C,
  ErrorUtil as E,
  HelpersUtil as H,
  LoggerUtil as L,
  TokenUtil as T,
  ConstantsUtil as a
};
