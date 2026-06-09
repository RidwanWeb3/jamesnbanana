import { z } from "./zod.mjs";
import { C as ConstantsUtil, b as ParseUtil } from "./reown__appkit-common.mjs";
import { G as Ge, U as Ue, R as Re } from "./walletconnect__logger.mjs";
const DEFAULT_SDK_URL = "https://secure.walletconnect.org/sdk";
const SECURE_SITE_SDK = (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_SDK_URL"] : void 0) || DEFAULT_SDK_URL;
const DEFAULT_LOG_LEVEL = (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_DEFAULT_LOG_LEVEL"] : void 0) || "error";
const SECURE_SITE_SDK_VERSION = (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_SDK_VERSION"] : void 0) || "4";
const W3mFrameConstants = {
  APP_EVENT_KEY: "@w3m-app/",
  FRAME_EVENT_KEY: "@w3m-frame/",
  RPC_METHOD_KEY: "RPC_",
  STORAGE_KEY: "@appkit-wallet/",
  SESSION_TOKEN_KEY: "SESSION_TOKEN_KEY",
  EMAIL_LOGIN_USED_KEY: "EMAIL_LOGIN_USED_KEY",
  LAST_USED_CHAIN_KEY: "LAST_USED_CHAIN_KEY",
  LAST_EMAIL_LOGIN_TIME: "LAST_EMAIL_LOGIN_TIME",
  EMAIL: "EMAIL",
  PREFERRED_ACCOUNT_TYPE: "PREFERRED_ACCOUNT_TYPE",
  SMART_ACCOUNT_ENABLED: "SMART_ACCOUNT_ENABLED",
  SMART_ACCOUNT_ENABLED_NETWORKS: "SMART_ACCOUNT_ENABLED_NETWORKS",
  SOCIAL_USERNAME: "SOCIAL_USERNAME",
  APP_SWITCH_NETWORK: "@w3m-app/SWITCH_NETWORK",
  APP_CONNECT_EMAIL: "@w3m-app/CONNECT_EMAIL",
  APP_CONNECT_DEVICE: "@w3m-app/CONNECT_DEVICE",
  APP_CONNECT_OTP: "@w3m-app/CONNECT_OTP",
  APP_CONNECT_SOCIAL: "@w3m-app/CONNECT_SOCIAL",
  APP_GET_SOCIAL_REDIRECT_URI: "@w3m-app/GET_SOCIAL_REDIRECT_URI",
  APP_GET_USER: "@w3m-app/GET_USER",
  APP_SIGN_OUT: "@w3m-app/SIGN_OUT",
  APP_IS_CONNECTED: "@w3m-app/IS_CONNECTED",
  APP_GET_CHAIN_ID: "@w3m-app/GET_CHAIN_ID",
  APP_RPC_REQUEST: "@w3m-app/RPC_REQUEST",
  APP_UPDATE_EMAIL: "@w3m-app/UPDATE_EMAIL",
  APP_UPDATE_EMAIL_PRIMARY_OTP: "@w3m-app/UPDATE_EMAIL_PRIMARY_OTP",
  APP_UPDATE_EMAIL_SECONDARY_OTP: "@w3m-app/UPDATE_EMAIL_SECONDARY_OTP",
  APP_AWAIT_UPDATE_EMAIL: "@w3m-app/AWAIT_UPDATE_EMAIL",
  APP_SYNC_THEME: "@w3m-app/SYNC_THEME",
  APP_SYNC_DAPP_DATA: "@w3m-app/SYNC_DAPP_DATA",
  APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS: "@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS",
  APP_INIT_SMART_ACCOUNT: "@w3m-app/INIT_SMART_ACCOUNT",
  APP_SET_PREFERRED_ACCOUNT: "@w3m-app/SET_PREFERRED_ACCOUNT",
  APP_CONNECT_FARCASTER: "@w3m-app/CONNECT_FARCASTER",
  APP_GET_FARCASTER_URI: "@w3m-app/GET_FARCASTER_URI",
  APP_RELOAD: "@w3m-app/RELOAD",
  APP_RPC_ABORT: "@w3m-app/RPC_ABORT",
  FRAME_SWITCH_NETWORK_ERROR: "@w3m-frame/SWITCH_NETWORK_ERROR",
  FRAME_SWITCH_NETWORK_SUCCESS: "@w3m-frame/SWITCH_NETWORK_SUCCESS",
  FRAME_CONNECT_EMAIL_ERROR: "@w3m-frame/CONNECT_EMAIL_ERROR",
  FRAME_CONNECT_EMAIL_SUCCESS: "@w3m-frame/CONNECT_EMAIL_SUCCESS",
  FRAME_CONNECT_DEVICE_ERROR: "@w3m-frame/CONNECT_DEVICE_ERROR",
  FRAME_CONNECT_DEVICE_SUCCESS: "@w3m-frame/CONNECT_DEVICE_SUCCESS",
  FRAME_CONNECT_OTP_SUCCESS: "@w3m-frame/CONNECT_OTP_SUCCESS",
  FRAME_CONNECT_OTP_ERROR: "@w3m-frame/CONNECT_OTP_ERROR",
  FRAME_CONNECT_SOCIAL_SUCCESS: "@w3m-frame/CONNECT_SOCIAL_SUCCESS",
  FRAME_CONNECT_SOCIAL_ERROR: "@w3m-frame/CONNECT_SOCIAL_ERROR",
  FRAME_CONNECT_FARCASTER_SUCCESS: "@w3m-frame/CONNECT_FARCASTER_SUCCESS",
  FRAME_CONNECT_FARCASTER_ERROR: "@w3m-frame/CONNECT_FARCASTER_ERROR",
  FRAME_GET_FARCASTER_URI_SUCCESS: "@w3m-frame/GET_FARCASTER_URI_SUCCESS",
  FRAME_GET_FARCASTER_URI_ERROR: "@w3m-frame/GET_FARCASTER_URI_ERROR",
  FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS",
  FRAME_GET_SOCIAL_REDIRECT_URI_ERROR: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR",
  FRAME_GET_USER_SUCCESS: "@w3m-frame/GET_USER_SUCCESS",
  FRAME_GET_USER_ERROR: "@w3m-frame/GET_USER_ERROR",
  FRAME_SIGN_OUT_SUCCESS: "@w3m-frame/SIGN_OUT_SUCCESS",
  FRAME_SIGN_OUT_ERROR: "@w3m-frame/SIGN_OUT_ERROR",
  FRAME_IS_CONNECTED_SUCCESS: "@w3m-frame/IS_CONNECTED_SUCCESS",
  FRAME_IS_CONNECTED_ERROR: "@w3m-frame/IS_CONNECTED_ERROR",
  FRAME_GET_CHAIN_ID_SUCCESS: "@w3m-frame/GET_CHAIN_ID_SUCCESS",
  FRAME_GET_CHAIN_ID_ERROR: "@w3m-frame/GET_CHAIN_ID_ERROR",
  FRAME_RPC_REQUEST_SUCCESS: "@w3m-frame/RPC_REQUEST_SUCCESS",
  FRAME_RPC_REQUEST_ERROR: "@w3m-frame/RPC_REQUEST_ERROR",
  FRAME_SESSION_UPDATE: "@w3m-frame/SESSION_UPDATE",
  FRAME_UPDATE_EMAIL_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SUCCESS",
  FRAME_UPDATE_EMAIL_ERROR: "@w3m-frame/UPDATE_EMAIL_ERROR",
  FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS",
  FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR",
  FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS",
  FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR",
  FRAME_SYNC_THEME_SUCCESS: "@w3m-frame/SYNC_THEME_SUCCESS",
  FRAME_SYNC_THEME_ERROR: "@w3m-frame/SYNC_THEME_ERROR",
  FRAME_SYNC_DAPP_DATA_SUCCESS: "@w3m-frame/SYNC_DAPP_DATA_SUCCESS",
  FRAME_SYNC_DAPP_DATA_ERROR: "@w3m-frame/SYNC_DAPP_DATA_ERROR",
  FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS",
  FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR",
  FRAME_INIT_SMART_ACCOUNT_SUCCESS: "@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS",
  FRAME_INIT_SMART_ACCOUNT_ERROR: "@w3m-frame/INIT_SMART_ACCOUNT_ERROR",
  FRAME_SET_PREFERRED_ACCOUNT_SUCCESS: "@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS",
  FRAME_SET_PREFERRED_ACCOUNT_ERROR: "@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR",
  FRAME_READY: "@w3m-frame/READY",
  FRAME_RELOAD_SUCCESS: "@w3m-frame/RELOAD_SUCCESS",
  FRAME_RELOAD_ERROR: "@w3m-frame/RELOAD_ERROR",
  FRAME_RPC_ABORT_SUCCESS: "@w3m-frame/RPC_ABORT_SUCCESS",
  FRAME_RPC_ABORT_ERROR: "@w3m-frame/RPC_ABORT_ERROR",
  RPC_RESPONSE_TYPE_ERROR: "RPC_RESPONSE_ERROR",
  RPC_RESPONSE_TYPE_TX: "RPC_RESPONSE_TRANSACTION_HASH",
  RPC_RESPONSE_TYPE_OBJECT: "RPC_RESPONSE_OBJECT"
};
const W3mFrameRpcConstants = {
  SAFE_RPC_METHODS: [
    "eth_accounts",
    "eth_blockNumber",
    "eth_call",
    "eth_chainId",
    "eth_estimateGas",
    "eth_feeHistory",
    "eth_gasPrice",
    "eth_getAccount",
    "eth_getBalance",
    "eth_getBlockByHash",
    "eth_getBlockByNumber",
    "eth_getBlockReceipts",
    "eth_getBlockTransactionCountByHash",
    "eth_getBlockTransactionCountByNumber",
    "eth_getCode",
    "eth_getFilterChanges",
    "eth_getFilterLogs",
    "eth_getLogs",
    "eth_getProof",
    "eth_getStorageAt",
    "eth_getTransactionByBlockHashAndIndex",
    "eth_getTransactionByBlockNumberAndIndex",
    "eth_getTransactionByHash",
    "eth_getTransactionCount",
    "eth_getTransactionReceipt",
    "eth_getUncleCountByBlockHash",
    "eth_getUncleCountByBlockNumber",
    "eth_maxPriorityFeePerGas",
    "eth_newBlockFilter",
    "eth_newFilter",
    "eth_newPendingTransactionFilter",
    "eth_sendRawTransaction",
    "eth_syncing",
    "eth_uninstallFilter",
    "wallet_getCapabilities",
    "wallet_getCallsStatus",
    "eth_getUserOperationReceipt",
    "eth_estimateUserOperationGas",
    "eth_getUserOperationByHash",
    "eth_supportedEntryPoints",
    "wallet_getAssets"
  ],
  NOT_SAFE_RPC_METHODS: [
    "personal_sign",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "solana_signMessage",
    "solana_signTransaction",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction",
    "wallet_sendCalls",
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    "eth_sendUserOperation"
  ],
  GET_CHAIN_ID: "eth_chainId",
  RPC_METHOD_NOT_ALLOWED_MESSAGE: "Requested RPC call is not allowed",
  RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: "Action not allowed",
  ACCOUNT_TYPES: {
    EOA: "eoa",
    SMART_ACCOUNT: "smartAccount"
  }
};
const RegexUtil = {
  transactionHash: /^0x(?:[A-Fa-f0-9]{64})$/u,
  signedMessage: /^0x(?:[a-fA-F0-9]{62,})$/u
};
const W3mFrameStorage = {
  set(key, value) {
    if (W3mFrameHelpers.isClient) {
      localStorage.setItem(`${W3mFrameConstants.STORAGE_KEY}${key}`, value);
    }
  },
  get(key) {
    if (W3mFrameHelpers.isClient) {
      return localStorage.getItem(`${W3mFrameConstants.STORAGE_KEY}${key}`);
    }
    return null;
  },
  delete(key, social) {
    if (W3mFrameHelpers.isClient) {
      if (social) {
        localStorage.removeItem(key);
      } else {
        localStorage.removeItem(`${W3mFrameConstants.STORAGE_KEY}${key}`);
      }
    }
  }
};
const EMAIL_MINIMUM_TIMEOUT = 30 * 1e3;
const W3mFrameHelpers = {
  checkIfAllowedToTriggerEmail() {
    const lastEmailLoginTime = W3mFrameStorage.get(W3mFrameConstants.LAST_EMAIL_LOGIN_TIME);
    if (lastEmailLoginTime) {
      const difference = Date.now() - Number(lastEmailLoginTime);
      if (difference < EMAIL_MINIMUM_TIMEOUT) {
        const cooldownSec = Math.ceil((EMAIL_MINIMUM_TIMEOUT - difference) / 1e3);
        throw new Error(`Please try again after ${cooldownSec} seconds`);
      }
    }
  },
  getTimeToNextEmailLogin() {
    const lastEmailLoginTime = W3mFrameStorage.get(W3mFrameConstants.LAST_EMAIL_LOGIN_TIME);
    if (lastEmailLoginTime) {
      const difference = Date.now() - Number(lastEmailLoginTime);
      if (difference < EMAIL_MINIMUM_TIMEOUT) {
        return Math.ceil((EMAIL_MINIMUM_TIMEOUT - difference) / 1e3);
      }
    }
    return 0;
  },
  checkIfRequestExists(request) {
    return W3mFrameRpcConstants.NOT_SAFE_RPC_METHODS.includes(request.method) || W3mFrameRpcConstants.SAFE_RPC_METHODS.includes(request.method);
  },
  getResponseType(response) {
    const isPayloadString = typeof response === "string";
    const isTransactionHash = isPayloadString && (response?.match(RegexUtil.transactionHash) || response?.match(RegexUtil.signedMessage));
    if (isTransactionHash) {
      return W3mFrameConstants.RPC_RESPONSE_TYPE_TX;
    }
    return W3mFrameConstants.RPC_RESPONSE_TYPE_OBJECT;
  },
  checkIfRequestIsSafe(request) {
    return W3mFrameRpcConstants.SAFE_RPC_METHODS.includes(request.method);
  },
  isClient: typeof window !== "undefined"
};
const zError = z.object({ message: z.string() });
function zType(key) {
  return z.literal(W3mFrameConstants[key]);
}
const SIWXMessage = z.object({
  serializedMessage: z.string().optional(),
  accountAddress: z.string(),
  chainId: z.string(),
  notBefore: z.string().optional(),
  domain: z.string(),
  uri: z.string(),
  version: z.string(),
  nonce: z.string(),
  statement: z.string().optional(),
  resources: z.array(z.string()).optional(),
  requestId: z.string().optional(),
  issuedAt: z.string().optional(),
  expirationTime: z.string().optional()
});
z.object({
  accessList: z.array(z.string()),
  blockHash: z.string().nullable(),
  blockNumber: z.string().nullable(),
  chainId: z.string().or(z.number()),
  from: z.string(),
  gas: z.string(),
  hash: z.string(),
  input: z.string().nullable(),
  maxFeePerGas: z.string(),
  maxPriorityFeePerGas: z.string(),
  nonce: z.string(),
  r: z.string(),
  s: z.string(),
  to: z.string(),
  transactionIndex: z.string().nullable(),
  type: z.string(),
  v: z.string(),
  value: z.string()
});
const AppSwitchNetworkRequest = z.object({
  chainId: z.string().or(z.number()),
  rpcUrl: z.optional(z.string())
});
const AppConnectEmailRequest = z.object({ email: z.string().email() });
const AppConnectOtpRequest = z.object({ otp: z.string() });
const AppConnectSocialRequest = z.object({
  uri: z.string(),
  preferredAccountType: z.optional(z.string()),
  chainId: z.optional(z.string().or(z.number())),
  siwxMessage: z.optional(SIWXMessage),
  rpcUrl: z.optional(z.string())
});
const AppGetUserRequest = z.object({
  chainId: z.optional(z.string().or(z.number())),
  preferredAccountType: z.optional(z.string()),
  socialUri: z.optional(z.string()),
  siwxMessage: z.optional(SIWXMessage),
  rpcUrl: z.optional(z.string())
});
const AppGetSocialRedirectUriRequest = z.object({
  provider: z.enum(["google", "github", "apple", "facebook", "x", "discord"])
});
const AppUpdateEmailRequest = z.object({ email: z.string().email() });
const AppUpdateEmailPrimaryOtpRequest = z.object({ otp: z.string() });
const AppUpdateEmailSecondaryOtpRequest = z.object({ otp: z.string() });
const AppSyncThemeRequest = z.object({
  themeMode: z.optional(z.enum(["light", "dark"])),
  themeVariables: z.optional(z.record(z.string(), z.string().or(z.number()))),
  w3mThemeVariables: z.optional(z.record(z.string(), z.string()))
});
const AppSyncDappDataRequest = z.object({
  metadata: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    icons: z.array(z.string())
  }).optional(),
  sdkVersion: z.string().optional(),
  sdkType: z.string().optional(),
  projectId: z.string()
});
const AppSetPreferredAccountRequest = z.object({ type: z.string() });
const FrameConnectEmailResponse = z.object({
  action: z.enum(["VERIFY_DEVICE", "VERIFY_OTP", "CONNECT"])
});
const FrameGetFarcasterUriResponse = z.object({
  url: z.string()
});
const FrameConnectFarcasterResponse = z.object({
  userName: z.string()
});
const FrameConnectSocialResponse = z.object({
  email: z.string().optional().nullable(),
  address: z.string(),
  chainId: z.string().or(z.number()),
  accounts: z.array(z.object({
    address: z.string(),
    type: z.enum([
      W3mFrameRpcConstants.ACCOUNT_TYPES.EOA,
      W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  userName: z.string().optional().nullable(),
  preferredAccountType: z.optional(z.string()),
  signature: z.string().optional(),
  message: z.string().optional(),
  siwxMessage: z.optional(SIWXMessage)
});
const FrameUpdateEmailResponse = z.object({
  action: z.enum(["VERIFY_PRIMARY_OTP", "VERIFY_SECONDARY_OTP"])
});
const FrameGetUserResponse = z.object({
  email: z.string().email().optional().nullable(),
  address: z.string(),
  chainId: z.string().or(z.number()),
  smartAccountDeployed: z.optional(z.boolean()),
  accounts: z.array(z.object({
    address: z.string(),
    type: z.enum([
      W3mFrameRpcConstants.ACCOUNT_TYPES.EOA,
      W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  preferredAccountType: z.optional(z.string()),
  signature: z.string().optional(),
  message: z.string().optional(),
  siwxMessage: z.optional(SIWXMessage)
});
const FrameGetSocialRedirectUriResponse = z.object({ uri: z.string() });
const FrameIsConnectedResponse = z.object({ isConnected: z.boolean() });
const FrameGetChainIdResponse = z.object({ chainId: z.string().or(z.number()) });
const FrameSwitchNetworkResponse = z.object({ chainId: z.string().or(z.number()) });
const FrameUpdateEmailSecondaryOtpResponse = z.object({ newEmail: z.string().email() });
const FrameGetSmartAccountEnabledNetworksResponse = z.object({
  smartAccountEnabledNetworks: z.array(z.number())
});
z.object({
  address: z.string(),
  isDeployed: z.boolean()
});
const FrameReadyResponse = z.object({
  version: z.string().optional()
});
const FrameSetPreferredAccountResponse = z.object({ type: z.string(), address: z.string() });
const RpcResponse = z.any();
const RpcEthAccountsRequest = z.object({
  method: z.literal("eth_accounts")
});
const RpcEthBlockNumber = z.object({
  method: z.literal("eth_blockNumber")
});
const RpcEthCall = z.object({
  method: z.literal("eth_call"),
  params: z.array(z.any())
});
const RpcEthChainId = z.object({
  method: z.literal("eth_chainId")
});
const RpcEthEstimateGas = z.object({
  method: z.literal("eth_estimateGas"),
  params: z.array(z.any())
});
const RpcEthFeeHistory = z.object({
  method: z.literal("eth_feeHistory"),
  params: z.array(z.any())
});
const RpcEthGasPrice = z.object({
  method: z.literal("eth_gasPrice")
});
const RpcEthGetAccount = z.object({
  method: z.literal("eth_getAccount"),
  params: z.array(z.any())
});
const RpcEthGetBalance = z.object({
  method: z.literal("eth_getBalance"),
  params: z.array(z.any())
});
const RpcEthGetBlockyByHash = z.object({
  method: z.literal("eth_getBlockByHash"),
  params: z.array(z.any())
});
const RpcEthGetBlockByNumber = z.object({
  method: z.literal("eth_getBlockByNumber"),
  params: z.array(z.any())
});
const RpcEthGetBlockReceipts = z.object({
  method: z.literal("eth_getBlockReceipts"),
  params: z.array(z.any())
});
const RcpEthGetBlockTransactionCountByHash = z.object({
  method: z.literal("eth_getBlockTransactionCountByHash"),
  params: z.array(z.any())
});
const RcpEthGetBlockTransactionCountByNumber = z.object({
  method: z.literal("eth_getBlockTransactionCountByNumber"),
  params: z.array(z.any())
});
const RpcEthGetCode = z.object({
  method: z.literal("eth_getCode"),
  params: z.array(z.any())
});
const RpcEthGetFilter = z.object({
  method: z.literal("eth_getFilterChanges"),
  params: z.array(z.any())
});
const RpcEthGetFilterLogs = z.object({
  method: z.literal("eth_getFilterLogs"),
  params: z.array(z.any())
});
const RpcEthGetLogs = z.object({
  method: z.literal("eth_getLogs"),
  params: z.array(z.any())
});
const RpcEthGetProof = z.object({
  method: z.literal("eth_getProof"),
  params: z.array(z.any())
});
const RpcEthGetStorageAt = z.object({
  method: z.literal("eth_getStorageAt"),
  params: z.array(z.any())
});
const RpcEthGetTransactionByBlockHashAndIndex = z.object({
  method: z.literal("eth_getTransactionByBlockHashAndIndex"),
  params: z.array(z.any())
});
const RpcEthGetTransactionByBlockNumberAndIndex = z.object({
  method: z.literal("eth_getTransactionByBlockNumberAndIndex"),
  params: z.array(z.any())
});
const RpcEthGetTransactionByHash = z.object({
  method: z.literal("eth_getTransactionByHash"),
  params: z.array(z.any())
});
const RpcEthGetTransactionCount = z.object({
  method: z.literal("eth_getTransactionCount"),
  params: z.array(z.any())
});
const RpcEthGetTransactionReceipt = z.object({
  method: z.literal("eth_getTransactionReceipt"),
  params: z.array(z.any())
});
const RpcEthGetUncleCountByBlockHash = z.object({
  method: z.literal("eth_getUncleCountByBlockHash"),
  params: z.array(z.any())
});
const RpcEthGetUncleCountByBlockNumber = z.object({
  method: z.literal("eth_getUncleCountByBlockNumber"),
  params: z.array(z.any())
});
const RpcEthMaxPriorityFeePerGas = z.object({
  method: z.literal("eth_maxPriorityFeePerGas")
});
const RpcEthNewBlockFilter = z.object({
  method: z.literal("eth_newBlockFilter")
});
const RpcEthNewFilter = z.object({
  method: z.literal("eth_newFilter"),
  params: z.array(z.any())
});
const RpcEthNewPendingTransactionFilter = z.object({
  method: z.literal("eth_newPendingTransactionFilter")
});
const RpcEthSendRawTransaction = z.object({
  method: z.literal("eth_sendRawTransaction"),
  params: z.array(z.any())
});
const RpcEthSyncing = z.object({
  method: z.literal("eth_syncing"),
  params: z.array(z.any())
});
const RpcUnistallFilter = z.object({
  method: z.literal("eth_uninstallFilter"),
  params: z.array(z.any())
});
const RpcPersonalSignRequest = z.object({
  method: z.literal("personal_sign"),
  params: z.array(z.any())
});
const RpcEthSignTypedDataV4 = z.object({
  method: z.literal("eth_signTypedData_v4"),
  params: z.array(z.any())
});
const RpcEthSendTransactionRequest = z.object({
  method: z.literal("eth_sendTransaction"),
  params: z.array(z.any())
});
const RpcSolanaSignMessageRequest = z.object({
  method: z.literal("solana_signMessage"),
  params: z.object({
    message: z.string(),
    pubkey: z.string()
  })
});
const RpcSolanaSignTransactionRequest = z.object({
  method: z.literal("solana_signTransaction"),
  params: z.object({
    transaction: z.string()
  })
});
const RpcSolanaSignAllTransactionsRequest = z.object({
  method: z.literal("solana_signAllTransactions"),
  params: z.object({
    transactions: z.array(z.string())
  })
});
const RpcSolanaSignAndSendTransactionRequest = z.object({
  method: z.literal("solana_signAndSendTransaction"),
  params: z.object({
    transaction: z.string(),
    options: z.object({
      skipPreflight: z.boolean().optional(),
      preflightCommitment: z.enum([
        "processed",
        "confirmed",
        "finalized",
        "recent",
        "single",
        "singleGossip",
        "root",
        "max"
      ]).optional(),
      maxRetries: z.number().optional(),
      minContextSlot: z.number().optional()
    }).optional()
  })
});
const WalletSendCallsRequest = z.object({
  method: z.literal("wallet_sendCalls"),
  params: z.array(z.object({
    chainId: z.string().or(z.number()).optional(),
    from: z.string().optional(),
    version: z.string().optional(),
    capabilities: z.any().optional(),
    calls: z.array(z.object({
      to: z.string().startsWith("0x"),
      data: z.string().startsWith("0x").optional(),
      value: z.string().optional()
    }))
  }))
});
const WalletGetCallsReceiptRequest = z.object({
  method: z.literal("wallet_getCallsStatus"),
  params: z.array(z.string())
});
const WalletGetCapabilitiesRequest = z.object({
  method: z.literal("wallet_getCapabilities"),
  params: z.array(z.string().or(z.number()).optional()).optional()
});
const WalletGrantPermissionsRequest = z.object({
  method: z.literal("wallet_grantPermissions"),
  params: z.array(z.any())
});
const WalletRevokePermissionsRequest = z.object({
  method: z.literal("wallet_revokePermissions"),
  params: z.any()
});
const WalletGetAssetsRequest = z.object({
  method: z.literal("wallet_getAssets"),
  params: z.any()
});
const FrameSession = z.object({
  token: z.string()
});
const EventSchema = z.object({
  id: z.string().optional()
});
const W3mFrameSchema = {
  appEvent: EventSchema.extend({
    type: zType("APP_SWITCH_NETWORK"),
    payload: AppSwitchNetworkRequest
  }).or(EventSchema.extend({
    type: zType("APP_CONNECT_EMAIL"),
    payload: AppConnectEmailRequest
  })).or(EventSchema.extend({ type: zType("APP_CONNECT_DEVICE") })).or(EventSchema.extend({ type: zType("APP_CONNECT_OTP"), payload: AppConnectOtpRequest })).or(EventSchema.extend({
    type: zType("APP_CONNECT_SOCIAL"),
    payload: AppConnectSocialRequest
  })).or(EventSchema.extend({ type: zType("APP_GET_FARCASTER_URI") })).or(EventSchema.extend({ type: zType("APP_CONNECT_FARCASTER") })).or(EventSchema.extend({
    type: zType("APP_GET_USER"),
    payload: z.optional(AppGetUserRequest)
  })).or(EventSchema.extend({
    type: zType("APP_GET_SOCIAL_REDIRECT_URI"),
    payload: AppGetSocialRedirectUriRequest
  })).or(EventSchema.extend({ type: zType("APP_SIGN_OUT") })).or(EventSchema.extend({
    type: zType("APP_IS_CONNECTED"),
    payload: z.optional(FrameSession)
  })).or(EventSchema.extend({ type: zType("APP_GET_CHAIN_ID") })).or(EventSchema.extend({ type: zType("APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS") })).or(EventSchema.extend({ type: zType("APP_INIT_SMART_ACCOUNT") })).or(EventSchema.extend({
    type: zType("APP_SET_PREFERRED_ACCOUNT"),
    payload: AppSetPreferredAccountRequest
  })).or(EventSchema.extend({
    type: zType("APP_RPC_REQUEST"),
    payload: RpcPersonalSignRequest.or(WalletGetAssetsRequest).or(RpcEthAccountsRequest).or(RpcEthBlockNumber).or(RpcEthCall).or(RpcEthChainId).or(RpcEthEstimateGas).or(RpcEthFeeHistory).or(RpcEthGasPrice).or(RpcEthGetAccount).or(RpcEthGetBalance).or(RpcEthGetBlockyByHash).or(RpcEthGetBlockByNumber).or(RpcEthGetBlockReceipts).or(RcpEthGetBlockTransactionCountByHash).or(RcpEthGetBlockTransactionCountByNumber).or(RpcEthGetCode).or(RpcEthGetFilter).or(RpcEthGetFilterLogs).or(RpcEthGetLogs).or(RpcEthGetProof).or(RpcEthGetStorageAt).or(RpcEthGetTransactionByBlockHashAndIndex).or(RpcEthGetTransactionByBlockNumberAndIndex).or(RpcEthGetTransactionByHash).or(RpcEthGetTransactionCount).or(RpcEthGetTransactionReceipt).or(RpcEthGetUncleCountByBlockHash).or(RpcEthGetUncleCountByBlockNumber).or(RpcEthMaxPriorityFeePerGas).or(RpcEthNewBlockFilter).or(RpcEthNewFilter).or(RpcEthNewPendingTransactionFilter).or(RpcEthSendRawTransaction).or(RpcEthSyncing).or(RpcUnistallFilter).or(RpcPersonalSignRequest).or(RpcEthSignTypedDataV4).or(RpcEthSendTransactionRequest).or(RpcSolanaSignMessageRequest).or(RpcSolanaSignTransactionRequest).or(RpcSolanaSignAllTransactionsRequest).or(RpcSolanaSignAndSendTransactionRequest).or(WalletGetCallsReceiptRequest).or(WalletSendCallsRequest).or(WalletGetCapabilitiesRequest).or(WalletGrantPermissionsRequest).or(WalletRevokePermissionsRequest).and(z.object({
      chainId: z.string().or(z.number()).optional(),
      chainNamespace: z.enum(["eip155", "solana", "polkadot", "bip122", "cosmos"]).optional(),
      rpcUrl: z.string().optional()
    }))
  })).or(EventSchema.extend({ type: zType("APP_UPDATE_EMAIL"), payload: AppUpdateEmailRequest })).or(EventSchema.extend({
    type: zType("APP_UPDATE_EMAIL_PRIMARY_OTP"),
    payload: AppUpdateEmailPrimaryOtpRequest
  })).or(EventSchema.extend({
    type: zType("APP_UPDATE_EMAIL_SECONDARY_OTP"),
    payload: AppUpdateEmailSecondaryOtpRequest
  })).or(EventSchema.extend({ type: zType("APP_SYNC_THEME"), payload: AppSyncThemeRequest })).or(EventSchema.extend({
    type: zType("APP_SYNC_DAPP_DATA"),
    payload: AppSyncDappDataRequest
  })).or(EventSchema.extend({
    type: zType("APP_RELOAD")
  })).or(EventSchema.extend({
    type: zType("APP_RPC_ABORT")
  })),
  frameEvent: EventSchema.extend({ type: zType("FRAME_SWITCH_NETWORK_ERROR"), payload: zError }).or(EventSchema.extend({
    type: zType("FRAME_SWITCH_NETWORK_SUCCESS"),
    payload: FrameSwitchNetworkResponse
  })).or(EventSchema.extend({
    type: zType("FRAME_CONNECT_EMAIL_SUCCESS"),
    payload: FrameConnectEmailResponse
  })).or(EventSchema.extend({ type: zType("FRAME_CONNECT_EMAIL_ERROR"), payload: zError })).or(EventSchema.extend({
    type: zType("FRAME_GET_FARCASTER_URI_SUCCESS"),
    payload: FrameGetFarcasterUriResponse
  })).or(EventSchema.extend({ type: zType("FRAME_GET_FARCASTER_URI_ERROR"), payload: zError })).or(EventSchema.extend({
    type: zType("FRAME_CONNECT_FARCASTER_SUCCESS"),
    payload: FrameConnectFarcasterResponse
  })).or(EventSchema.extend({ type: zType("FRAME_CONNECT_FARCASTER_ERROR"), payload: zError })).or(EventSchema.extend({ type: zType("FRAME_CONNECT_OTP_ERROR"), payload: zError })).or(EventSchema.extend({ type: zType("FRAME_CONNECT_OTP_SUCCESS") })).or(EventSchema.extend({ type: zType("FRAME_CONNECT_DEVICE_ERROR"), payload: zError })).or(EventSchema.extend({ type: zType("FRAME_CONNECT_DEVICE_SUCCESS") })).or(EventSchema.extend({
    type: zType("FRAME_CONNECT_SOCIAL_SUCCESS"),
    payload: FrameConnectSocialResponse
  })).or(EventSchema.extend({
    type: zType("FRAME_CONNECT_SOCIAL_ERROR"),
    payload: zError
  })).or(EventSchema.extend({ type: zType("FRAME_GET_USER_ERROR"), payload: zError })).or(EventSchema.extend({
    type: zType("FRAME_GET_USER_SUCCESS"),
    payload: FrameGetUserResponse
  })).or(EventSchema.extend({
    type: zType("FRAME_GET_SOCIAL_REDIRECT_URI_ERROR"),
    payload: zError
  })).or(EventSchema.extend({
    type: zType("FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS"),
    payload: FrameGetSocialRedirectUriResponse
  })).or(EventSchema.extend({ type: zType("FRAME_SIGN_OUT_ERROR"), payload: zError })).or(EventSchema.extend({ type: zType("FRAME_SIGN_OUT_SUCCESS") })).or(EventSchema.extend({ type: zType("FRAME_IS_CONNECTED_ERROR"), payload: zError })).or(EventSchema.extend({
    type: zType("FRAME_IS_CONNECTED_SUCCESS"),
    payload: FrameIsConnectedResponse
  })).or(EventSchema.extend({ type: zType("FRAME_GET_CHAIN_ID_ERROR"), payload: zError })).or(EventSchema.extend({
    type: zType("FRAME_GET_CHAIN_ID_SUCCESS"),
    payload: FrameGetChainIdResponse
  })).or(EventSchema.extend({ type: zType("FRAME_RPC_REQUEST_ERROR"), payload: zError })).or(EventSchema.extend({ type: zType("FRAME_RPC_REQUEST_SUCCESS"), payload: RpcResponse })).or(EventSchema.extend({ type: zType("FRAME_SESSION_UPDATE"), payload: FrameSession })).or(EventSchema.extend({ type: zType("FRAME_UPDATE_EMAIL_ERROR"), payload: zError })).or(EventSchema.extend({
    type: zType("FRAME_UPDATE_EMAIL_SUCCESS"),
    payload: FrameUpdateEmailResponse
  })).or(EventSchema.extend({
    type: zType("FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR"),
    payload: zError
  })).or(EventSchema.extend({ type: zType("FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS") })).or(EventSchema.extend({
    type: zType("FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR"),
    payload: zError
  })).or(EventSchema.extend({
    type: zType("FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS"),
    payload: FrameUpdateEmailSecondaryOtpResponse
  })).or(EventSchema.extend({ type: zType("FRAME_SYNC_THEME_ERROR"), payload: zError })).or(EventSchema.extend({ type: zType("FRAME_SYNC_THEME_SUCCESS") })).or(EventSchema.extend({ type: zType("FRAME_SYNC_DAPP_DATA_ERROR"), payload: zError })).or(EventSchema.extend({ type: zType("FRAME_SYNC_DAPP_DATA_SUCCESS") })).or(EventSchema.extend({
    type: zType("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS"),
    payload: FrameGetSmartAccountEnabledNetworksResponse
  })).or(EventSchema.extend({
    type: zType("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR"),
    payload: zError
  })).or(EventSchema.extend({ type: zType("FRAME_INIT_SMART_ACCOUNT_ERROR"), payload: zError })).or(EventSchema.extend({
    type: zType("FRAME_SET_PREFERRED_ACCOUNT_SUCCESS"),
    payload: FrameSetPreferredAccountResponse
  })).or(EventSchema.extend({
    type: zType("FRAME_SET_PREFERRED_ACCOUNT_ERROR"),
    payload: zError
  })).or(EventSchema.extend({ type: zType("FRAME_READY"), payload: FrameReadyResponse })).or(EventSchema.extend({
    type: zType("FRAME_RELOAD_ERROR"),
    payload: zError
  })).or(EventSchema.extend({ type: zType("FRAME_RELOAD_SUCCESS") }))
};
function shouldHandleEvent(eventKey, data = {}) {
  return typeof data?.type === "string" && data?.type?.includes(eventKey);
}
function createSecureSiteSdkUrl({ projectId, chainId, enableLogger, rpcUrl = ConstantsUtil.BLOCKCHAIN_API_RPC_URL, enableCloudAuthAccount = false }) {
  const url = new URL(SECURE_SITE_SDK);
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("chainId", String(chainId));
  url.searchParams.set("version", SECURE_SITE_SDK_VERSION);
  url.searchParams.set("enableLogger", String(enableLogger));
  url.searchParams.set("rpcUrl", rpcUrl);
  const smartAccountVersion = W3mFrameStorage.get("dapp_smart_account_version");
  if (smartAccountVersion && (smartAccountVersion === "v6" || smartAccountVersion === "v7")) {
    console.warn(">> AppKit - Forcing smart account version", smartAccountVersion);
    url.searchParams.set("smartAccountVersion", smartAccountVersion);
  }
  if (enableCloudAuthAccount) {
    url.searchParams.set("enableCloudAuthAccount", "true");
  }
  return url.toString();
}
class W3mFrame {
  constructor({ projectId, isAppClient = false, chainId = "eip155:1", enableLogger = true, enableCloudAuthAccount = false, rpcUrl = ConstantsUtil.BLOCKCHAIN_API_RPC_URL }) {
    this.iframe = null;
    this.iframeIsReady = false;
    this.initFrame = () => {
      const isFrameInitialized = document.getElementById("w3m-iframe");
      if (this.iframe && !isFrameInitialized) {
        document.body.appendChild(this.iframe);
      }
    };
    this.events = {
      registerFrameEventHandler: (id, callback, signal) => {
        function eventHandler({ data }) {
          if (!shouldHandleEvent(W3mFrameConstants.FRAME_EVENT_KEY, data)) {
            return;
          }
          const frameEvent = W3mFrameSchema.frameEvent.safeParse(data);
          if (!frameEvent.success) {
            console.warn("W3mFrame: invalid frame event", frameEvent.error.message);
            return;
          }
          if (frameEvent.data?.id === id) {
            callback(frameEvent.data);
            window.removeEventListener("message", eventHandler);
          }
        }
        if (W3mFrameHelpers.isClient) {
          window.addEventListener("message", eventHandler);
          signal.addEventListener("abort", () => {
            window.removeEventListener("message", eventHandler);
          });
        }
      },
      onFrameEvent: (callback) => {
        if (W3mFrameHelpers.isClient) {
          window.addEventListener("message", ({ data }) => {
            if (!shouldHandleEvent(W3mFrameConstants.FRAME_EVENT_KEY, data)) {
              return;
            }
            const frameEvent = W3mFrameSchema.frameEvent.safeParse(data);
            if (frameEvent.success) {
              callback(frameEvent.data);
            } else {
              console.warn("W3mFrame: invalid frame event", frameEvent.error.message);
            }
          });
        }
      },
      onAppEvent: (callback) => {
        if (W3mFrameHelpers.isClient) {
          window.addEventListener("message", ({ data }) => {
            if (!shouldHandleEvent(W3mFrameConstants.APP_EVENT_KEY, data)) {
              return;
            }
            const appEvent = W3mFrameSchema.appEvent.safeParse(data);
            if (!appEvent.success) {
              console.warn("W3mFrame: invalid app event", appEvent.error.message);
            }
            callback(data);
          });
        }
      },
      postAppEvent: (event) => {
        if (W3mFrameHelpers.isClient) {
          if (!this.iframe?.contentWindow) {
            throw new Error("W3mFrame: iframe is not set");
          }
          this.iframe.contentWindow.postMessage(event, "*");
        }
      },
      postFrameEvent: (event) => {
        if (W3mFrameHelpers.isClient) {
          if (!parent) {
            throw new Error("W3mFrame: parent is not set");
          }
          parent.postMessage(event, "*");
        }
      }
    };
    this.projectId = projectId;
    this.frameLoadPromise = new Promise((resolve, reject) => {
      this.frameLoadPromiseResolver = { resolve, reject };
    });
    this.rpcUrl = rpcUrl;
    if (isAppClient) {
      this.frameLoadPromise = new Promise((resolve, reject) => {
        this.frameLoadPromiseResolver = { resolve, reject };
      });
      if (W3mFrameHelpers.isClient) {
        const iframe = document.createElement("iframe");
        iframe.id = "w3m-iframe";
        iframe.src = createSecureSiteSdkUrl({
          projectId,
          chainId,
          enableLogger,
          rpcUrl: this.rpcUrl,
          enableCloudAuthAccount
        });
        iframe.name = "w3m-secure-iframe";
        iframe.style.position = "fixed";
        iframe.style.zIndex = "999999";
        iframe.style.display = "none";
        iframe.style.border = "none";
        iframe.style.animationDelay = "0s, 50ms";
        iframe.style.borderBottomLeftRadius = `clamp(0px, var(--apkt-borderRadius-8), 44px)`;
        iframe.style.borderBottomRightRadius = `clamp(0px, var(--apkt-borderRadius-8), 44px)`;
        this.iframe = iframe;
        this.iframe.onerror = () => {
          this.frameLoadPromiseResolver?.reject("Unable to load email login dependency");
        };
        this.events.onFrameEvent((event) => {
          if (event.type === "@w3m-frame/READY") {
            this.iframeIsReady = true;
            this.frameLoadPromiseResolver?.resolve(void 0);
          }
        });
      }
    }
  }
  get networks() {
    const data = [
      "eip155:1",
      "eip155:5",
      "eip155:11155111",
      "eip155:10",
      "eip155:420",
      "eip155:42161",
      "eip155:421613",
      "eip155:137",
      "eip155:80001",
      "eip155:42220",
      "eip155:1313161554",
      "eip155:1313161555",
      "eip155:56",
      "eip155:97",
      "eip155:43114",
      "eip155:43113",
      "eip155:324",
      "eip155:280",
      "eip155:100",
      "eip155:8453",
      "eip155:84531",
      "eip155:84532",
      "eip155:7777777",
      "eip155:999",
      "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
      "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
    ].map((id) => ({
      [id]: {
        rpcUrl: `${this.rpcUrl}/v1/?chainId=${id}&projectId=${this.projectId}`,
        chainId: id
      }
    }));
    return Object.assign({}, ...data);
  }
}
class W3mFrameLogger {
  constructor(projectId) {
    const loggerOptions = Ge({
      level: DEFAULT_LOG_LEVEL
    });
    const { logger, chunkLoggerController } = Ue({
      opts: loggerOptions
    });
    this.logger = Re(logger, this.constructor.name);
    this.chunkLoggerController = chunkLoggerController;
    if (typeof window !== "undefined" && this.chunkLoggerController?.downloadLogsBlobInBrowser) {
      if (!window.downloadAppKitLogsBlob) {
        window.downloadAppKitLogsBlob = {};
      }
      window.downloadAppKitLogsBlob["sdk"] = () => {
        if (this.chunkLoggerController?.downloadLogsBlobInBrowser) {
          this.chunkLoggerController.downloadLogsBlobInBrowser({
            projectId
          });
        }
      };
    }
  }
}
function serializeBigInts(value) {
  if (typeof value === "bigint") {
    return `0x${value.toString(16)}`;
  }
  if (Array.isArray(value)) {
    return value.map(serializeBigInts);
  }
  if (value !== null && typeof value === "object") {
    const result = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = serializeBigInts(v);
    }
    return result;
  }
  return value;
}
class W3mFrameProvider {
  constructor({ projectId, chainId, enableLogger = true, onTimeout, abortController, getActiveCaipNetwork, getCaipNetworks, enableCloudAuthAccount, metadata, sdkVersion, sdkType }) {
    this.openRpcRequests = /* @__PURE__ */ new Map();
    this.isInitialized = false;
    if (enableLogger) {
      this.w3mLogger = new W3mFrameLogger(projectId);
    }
    this.abortController = abortController;
    this.getActiveCaipNetwork = getActiveCaipNetwork;
    this.getCaipNetworks = getCaipNetworks;
    const rpcUrl = this.getRpcUrl(chainId);
    this.projectId = projectId;
    this.sdkVersion = sdkVersion;
    this.sdkType = sdkType;
    this.metadata = metadata;
    this.w3mFrame = new W3mFrame({
      projectId,
      isAppClient: true,
      chainId,
      enableLogger,
      rpcUrl,
      enableCloudAuthAccount
    });
    this.onTimeout = onTimeout;
    if (this.getLoginEmailUsed()) {
      this.createFrame();
    }
  }
  async createFrame() {
    this.w3mFrame.initFrame();
    this.initPromise = new Promise((resolve) => {
      this.w3mFrame.events.onFrameEvent((event) => {
        if (event.type === W3mFrameConstants.FRAME_READY) {
          setTimeout(() => {
            resolve();
          }, 500);
        }
      });
    });
    await this.initPromise;
    await this.syncDappData({
      metadata: this.metadata,
      projectId: this.projectId,
      sdkVersion: this.sdkVersion,
      sdkType: this.sdkType
    });
    await this.getSmartAccountEnabledNetworks();
    this.isInitialized = true;
    this.initPromise = void 0;
  }
  async init() {
    if (this.isInitialized) {
      return;
    }
    if (this.initPromise) {
      await this.initPromise;
      return;
    }
    await this.createFrame();
  }
  getLoginEmailUsed() {
    return Boolean(W3mFrameStorage.get(W3mFrameConstants.EMAIL_LOGIN_USED_KEY));
  }
  getEmail() {
    return W3mFrameStorage.get(W3mFrameConstants.EMAIL);
  }
  getUsername() {
    return W3mFrameStorage.get(W3mFrameConstants.SOCIAL_USERNAME);
  }
  async reload() {
    try {
      await this.appEvent({
        type: W3mFrameConstants.APP_RELOAD
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error reloading iframe");
      throw error;
    }
  }
  async connectEmail(payload) {
    try {
      W3mFrameHelpers.checkIfAllowedToTriggerEmail();
      await this.init();
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_CONNECT_EMAIL,
        payload
      });
      this.setNewLastEmailLoginTime();
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error connecting email");
      throw error;
    }
  }
  async connectDevice() {
    try {
      return this.appEvent({
        type: W3mFrameConstants.APP_CONNECT_DEVICE
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error connecting device");
      throw error;
    }
  }
  async connectOtp(payload) {
    try {
      return this.appEvent({
        type: W3mFrameConstants.APP_CONNECT_OTP,
        payload
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error connecting otp");
      throw error;
    }
  }
  async isConnected() {
    try {
      if (!this.getLoginEmailUsed()) {
        return { isConnected: false };
      }
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_IS_CONNECTED
      });
      if (!response?.isConnected) {
        this.deleteAuthLoginCache();
      }
      return response;
    } catch (error) {
      this.deleteAuthLoginCache();
      this.w3mLogger?.logger.error({ error }, "Error checking connection");
      throw error;
    }
  }
  async getChainId() {
    try {
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_GET_CHAIN_ID
      });
      this.setLastUsedChainId(response.chainId);
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error getting chain id");
      throw error;
    }
  }
  async getSocialRedirectUri(payload) {
    try {
      await this.init();
      return this.appEvent({
        type: W3mFrameConstants.APP_GET_SOCIAL_REDIRECT_URI,
        payload
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error getting social redirect uri");
      throw error;
    }
  }
  async updateEmail(payload) {
    try {
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_UPDATE_EMAIL,
        payload
      });
      this.setNewLastEmailLoginTime();
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error updating email");
      throw error;
    }
  }
  async updateEmailPrimaryOtp(payload) {
    try {
      return this.appEvent({
        type: W3mFrameConstants.APP_UPDATE_EMAIL_PRIMARY_OTP,
        payload
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error updating email primary otp");
      throw error;
    }
  }
  async updateEmailSecondaryOtp(payload) {
    try {
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_UPDATE_EMAIL_SECONDARY_OTP,
        payload
      });
      this.setLoginSuccess(response.newEmail);
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error updating email secondary otp");
      throw error;
    }
  }
  async syncTheme(payload) {
    try {
      return this.appEvent({
        type: W3mFrameConstants.APP_SYNC_THEME,
        payload
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error syncing theme");
      throw error;
    }
  }
  async syncDappData(payload) {
    try {
      return this.appEvent({
        type: W3mFrameConstants.APP_SYNC_DAPP_DATA,
        payload
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error syncing dapp data");
      throw error;
    }
  }
  async getSmartAccountEnabledNetworks() {
    try {
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS
      });
      this.persistSmartAccountEnabledNetworks(response.smartAccountEnabledNetworks);
      return response;
    } catch (error) {
      this.persistSmartAccountEnabledNetworks([]);
      this.w3mLogger?.logger.error({ error }, "Error getting smart account enabled networks");
      throw error;
    }
  }
  async setPreferredAccount(type) {
    try {
      return this.appEvent({
        type: W3mFrameConstants.APP_SET_PREFERRED_ACCOUNT,
        payload: { type }
      });
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error setting preferred account");
      throw error;
    }
  }
  async connect(payload) {
    if (payload?.socialUri) {
      try {
        await this.init();
        const rpcUrl = this.getRpcUrl(payload.chainId);
        const response = await this.appEvent({
          type: W3mFrameConstants.APP_CONNECT_SOCIAL,
          payload: {
            uri: payload.socialUri,
            preferredAccountType: payload.preferredAccountType,
            chainId: payload.chainId,
            siwxMessage: payload.siwxMessage,
            rpcUrl
          }
        });
        if (response.userName) {
          this.setSocialLoginSuccess(response.userName);
        }
        this.setLoginSuccess(response.email);
        this.setLastUsedChainId(response.chainId);
        this.user = response;
        return response;
      } catch (error) {
        this.w3mLogger?.logger.error({ error }, "Error connecting social");
        throw error;
      }
    } else {
      try {
        const chainId = payload?.chainId || this.getLastUsedChainId() || 1;
        const response = await this.getUser({
          chainId,
          preferredAccountType: payload?.preferredAccountType,
          siwxMessage: payload?.siwxMessage,
          rpcUrl: this.getRpcUrl(chainId)
        });
        this.setLoginSuccess(response.email);
        this.setLastUsedChainId(response.chainId);
        this.user = response;
        return response;
      } catch (error) {
        this.w3mLogger?.logger.error({ error }, "Error connecting");
        throw error;
      }
    }
  }
  async getUser(payload) {
    try {
      await this.init();
      const chainId = payload?.chainId || this.getLastUsedChainId() || 1;
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_GET_USER,
        payload: { ...payload, chainId, rpcUrl: this.getRpcUrl(chainId) }
      });
      this.user = response;
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error connecting");
      throw error;
    }
  }
  async connectSocial({ uri, chainId, preferredAccountType }) {
    try {
      await this.init();
      const rpcUrl = this.getRpcUrl(chainId);
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_CONNECT_SOCIAL,
        payload: { uri, chainId, rpcUrl, preferredAccountType }
      });
      if (response.userName) {
        this.setSocialLoginSuccess(response.userName);
      }
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error connecting social");
      throw error;
    }
  }
  async getFarcasterUri() {
    try {
      await this.init();
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_GET_FARCASTER_URI
      });
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error getting farcaster uri");
      throw error;
    }
  }
  async connectFarcaster() {
    try {
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_CONNECT_FARCASTER
      });
      if (response.userName) {
        this.setSocialLoginSuccess(response.userName);
      }
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error connecting farcaster");
      throw error;
    }
  }
  async switchNetwork({ chainId }) {
    try {
      const rpcUrl = this.getRpcUrl(chainId);
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_SWITCH_NETWORK,
        payload: { chainId, rpcUrl }
      });
      this.setLastUsedChainId(response.chainId);
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error switching network");
      throw error;
    }
  }
  async disconnect() {
    try {
      this.deleteAuthLoginCache();
      const response = await new Promise(async (resolve) => {
        const timeout = setTimeout(() => {
          resolve();
        }, 3e3);
        await this.appEvent({
          type: W3mFrameConstants.APP_SIGN_OUT
        });
        clearTimeout(timeout);
        resolve();
      });
      return response;
    } catch (error) {
      this.w3mLogger?.logger.error({ error }, "Error disconnecting");
      throw error;
    }
  }
  async request(req) {
    const request = req;
    try {
      if (W3mFrameRpcConstants.GET_CHAIN_ID === req.method) {
        return this.getLastUsedChainId();
      }
      const namespace = req.chainNamespace || "eip155";
      const chainId = this.getActiveCaipNetwork(namespace)?.id;
      request.chainNamespace = namespace;
      request.chainId = chainId;
      request.rpcUrl = this.getRpcUrl(chainId);
      this.rpcRequestHandler?.(req);
      const response = await this.appEvent({
        type: W3mFrameConstants.APP_RPC_REQUEST,
        payload: serializeBigInts(request)
      });
      this.rpcSuccessHandler?.(response, request);
      return response;
    } catch (error) {
      this.rpcErrorHandler?.(error, request);
      this.w3mLogger?.logger.error({ error }, "Error requesting");
      throw error;
    }
  }
  onRpcRequest(callback) {
    this.rpcRequestHandler = callback;
  }
  onRpcSuccess(callback) {
    this.rpcSuccessHandler = callback;
  }
  onRpcError(callback) {
    this.rpcErrorHandler = callback;
  }
  onIsConnected(callback) {
    this.w3mFrame.events.onFrameEvent((event) => {
      if (event.type === W3mFrameConstants.FRAME_IS_CONNECTED_SUCCESS && event.payload.isConnected) {
        callback();
      }
    });
  }
  onNotConnected(callback) {
    this.w3mFrame.events.onFrameEvent((event) => {
      if (event.type === W3mFrameConstants.FRAME_IS_CONNECTED_ERROR) {
        callback();
      }
      if (event.type === W3mFrameConstants.FRAME_IS_CONNECTED_SUCCESS && !event.payload.isConnected) {
        callback();
      }
    });
  }
  onConnect(callback) {
    this.w3mFrame.events.onFrameEvent((event) => {
      if (event.type === W3mFrameConstants.FRAME_GET_USER_SUCCESS) {
        callback(event.payload);
      }
    });
  }
  onSocialConnected(callback) {
    this.w3mFrame.events.onFrameEvent((event) => {
      if (event.type === W3mFrameConstants.FRAME_CONNECT_SOCIAL_SUCCESS) {
        callback(event.payload);
      }
    });
  }
  async getCapabilities() {
    try {
      const capabilities = await this.request({
        method: "wallet_getCapabilities"
      });
      return capabilities || {};
    } catch {
      return {};
    }
  }
  onSetPreferredAccount(callback) {
    this.w3mFrame.events.onFrameEvent((event) => {
      if (event.type === W3mFrameConstants.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS) {
        callback(event.payload);
      } else if (event.type === W3mFrameConstants.FRAME_SET_PREFERRED_ACCOUNT_ERROR) {
        callback({ type: W3mFrameRpcConstants.ACCOUNT_TYPES.EOA });
      }
    });
  }
  getAvailableChainIds() {
    return Object.keys(this.w3mFrame.networks);
  }
  async rejectRpcRequests() {
    try {
      await Promise.all(Array.from(this.openRpcRequests.values()).map(async ({ abortController, method }) => {
        if (!W3mFrameRpcConstants.SAFE_RPC_METHODS.includes(method)) {
          abortController.abort();
        }
        await this.appEvent({
          type: W3mFrameConstants.APP_RPC_ABORT
        });
      }));
      this.openRpcRequests.clear();
    } catch (e) {
      this.w3mLogger?.logger.error({ error: e }, "Error aborting RPC request");
    }
  }
  async appEvent(event) {
    let requestTimeout = void 0;
    let iframeReadyTimeout = void 0;
    function replaceEventType(type2) {
      return type2.replace("@w3m-app/", "");
    }
    const safeEventTypes = [
      W3mFrameConstants.APP_SYNC_DAPP_DATA,
      W3mFrameConstants.APP_SYNC_THEME,
      W3mFrameConstants.APP_SET_PREFERRED_ACCOUNT
    ];
    const type = replaceEventType(event.type);
    if (!this.w3mFrame.iframeIsReady && !safeEventTypes.includes(event.type)) {
      iframeReadyTimeout = setTimeout(() => {
        this.onTimeout?.("iframe_load_failed");
        this.abortController.abort();
      }, 2e4);
    }
    await this.w3mFrame.frameLoadPromise;
    clearTimeout(iframeReadyTimeout);
    const shouldCheckForTimeout = [
      W3mFrameConstants.APP_CONNECT_EMAIL,
      W3mFrameConstants.APP_CONNECT_DEVICE,
      W3mFrameConstants.APP_CONNECT_OTP,
      W3mFrameConstants.APP_CONNECT_SOCIAL,
      W3mFrameConstants.APP_GET_SOCIAL_REDIRECT_URI
    ].map(replaceEventType).includes(type);
    if (shouldCheckForTimeout) {
      requestTimeout = setTimeout(() => {
        this.onTimeout?.("iframe_request_timeout");
        this.abortController.abort();
      }, 12e4);
    }
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(7);
      this.w3mLogger?.logger.info?.({ event, id }, "Sending app event");
      this.w3mFrame.events.postAppEvent({ ...event, id });
      const abortController = new AbortController();
      if (type === "RPC_REQUEST") {
        const rpcEvent = event;
        this.openRpcRequests.set(id, { ...rpcEvent.payload, abortController });
      }
      abortController.signal.addEventListener("abort", () => {
        if (type === "RPC_REQUEST") {
          reject(new Error("Request was aborted"));
        } else if (type !== "GET_FARCASTER_URI") {
          reject(new Error("Something went wrong"));
        }
      });
      const handler = (framEvent, logger) => {
        if (framEvent.id !== id) {
          return;
        }
        logger?.logger.info?.({ framEvent, id }, "Received frame response");
        this.openRpcRequests.delete(framEvent.id);
        if (framEvent.type === `@w3m-frame/${type}_SUCCESS`) {
          if (requestTimeout) {
            clearTimeout(requestTimeout);
          }
          if (iframeReadyTimeout) {
            clearTimeout(iframeReadyTimeout);
          }
          if ("payload" in framEvent) {
            resolve(framEvent.payload);
          }
          resolve(void 0);
        } else if (framEvent.type === `@w3m-frame/${type}_ERROR`) {
          if (requestTimeout) {
            clearTimeout(requestTimeout);
          }
          if (iframeReadyTimeout) {
            clearTimeout(iframeReadyTimeout);
          }
          if ("payload" in framEvent) {
            reject(new Error(framEvent.payload?.message || "An error occurred"));
          }
          reject(new Error("An error occurred"));
        }
      };
      this.w3mFrame.events.registerFrameEventHandler(id, (frameEvent) => handler(frameEvent, this.w3mLogger), this.abortController.signal);
    });
  }
  setNewLastEmailLoginTime() {
    W3mFrameStorage.set(W3mFrameConstants.LAST_EMAIL_LOGIN_TIME, Date.now().toString());
  }
  setSocialLoginSuccess(username) {
    W3mFrameStorage.set(W3mFrameConstants.SOCIAL_USERNAME, username);
  }
  setLoginSuccess(email) {
    if (email) {
      W3mFrameStorage.set(W3mFrameConstants.EMAIL, email);
    }
    W3mFrameStorage.set(W3mFrameConstants.EMAIL_LOGIN_USED_KEY, "true");
    W3mFrameStorage.delete(W3mFrameConstants.LAST_EMAIL_LOGIN_TIME);
  }
  deleteAuthLoginCache() {
    W3mFrameStorage.delete(W3mFrameConstants.EMAIL_LOGIN_USED_KEY);
    W3mFrameStorage.delete(W3mFrameConstants.EMAIL);
    W3mFrameStorage.delete(W3mFrameConstants.LAST_USED_CHAIN_KEY);
    W3mFrameStorage.delete(W3mFrameConstants.SOCIAL_USERNAME);
  }
  setLastUsedChainId(chainId) {
    if (chainId) {
      W3mFrameStorage.set(W3mFrameConstants.LAST_USED_CHAIN_KEY, String(chainId));
    }
  }
  getLastUsedChainId() {
    const chainId = W3mFrameStorage.get(W3mFrameConstants.LAST_USED_CHAIN_KEY) ?? void 0;
    const numberChainId = Number(chainId);
    return isNaN(numberChainId) ? chainId : numberChainId;
  }
  persistSmartAccountEnabledNetworks(networks) {
    W3mFrameStorage.set(W3mFrameConstants.SMART_ACCOUNT_ENABLED_NETWORKS, networks.join(","));
  }
  getRpcUrl(chainId) {
    let namespace = chainId === void 0 ? void 0 : "eip155";
    if (typeof chainId === "string") {
      if (chainId.includes(":")) {
        namespace = ParseUtil.parseCaipNetworkId(chainId)?.chainNamespace;
      } else if (Number.isInteger(Number(chainId))) {
        namespace = "eip155";
      } else {
        namespace = "solana";
      }
    }
    const caipNetworks = this.getCaipNetworks(namespace);
    const activeNetwork = chainId ? caipNetworks.find((network) => String(network.id) === String(chainId) || network.caipNetworkId === chainId) : caipNetworks[0];
    return activeNetwork?.rpcUrls.default.http?.[0];
  }
}
export {
  W3mFrameRpcConstants as W,
  W3mFrameStorage as a,
  W3mFrameConstants as b,
  W3mFrameProvider as c,
  W3mFrameHelpers as d
};
