import { d as distExports, r as requireDist } from "./@safe-global/safe-gateway-typescript-sdk+[...].mjs";
import { a8 as encodeFunctionData, $ as hashMessage, _ as hashTypedData, ax as require_cjs } from "./viem.mjs";
const getSDKVersion = () => "9.1.0";
const dec2hex = (dec) => dec.toString(16).padStart(2, "0");
const generateId = (len) => {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};
const generateRequestId = () => {
  if (typeof window !== "undefined") {
    return generateId(10);
  }
  return (/* @__PURE__ */ new Date()).getTime().toString(36);
};
class MessageFormatter {
}
MessageFormatter.makeRequest = (method, params) => {
  const id = generateRequestId();
  return {
    id,
    method,
    params,
    env: {
      sdkVersion: getSDKVersion()
    }
  };
};
MessageFormatter.makeResponse = (id, data, version2) => ({
  id,
  success: true,
  version: version2,
  data
});
MessageFormatter.makeErrorResponse = (id, error, version2) => ({
  id,
  success: false,
  error,
  version: version2
});
var Methods;
(function(Methods2) {
  Methods2["sendTransactions"] = "sendTransactions";
  Methods2["rpcCall"] = "rpcCall";
  Methods2["getChainInfo"] = "getChainInfo";
  Methods2["getSafeInfo"] = "getSafeInfo";
  Methods2["getTxBySafeTxHash"] = "getTxBySafeTxHash";
  Methods2["getSafeBalances"] = "getSafeBalances";
  Methods2["signMessage"] = "signMessage";
  Methods2["signTypedMessage"] = "signTypedMessage";
  Methods2["getEnvironmentInfo"] = "getEnvironmentInfo";
  Methods2["getOffChainSignature"] = "getOffChainSignature";
  Methods2["requestAddressBook"] = "requestAddressBook";
  Methods2["wallet_getPermissions"] = "wallet_getPermissions";
  Methods2["wallet_requestPermissions"] = "wallet_requestPermissions";
})(Methods || (Methods = {}));
var RestrictedMethods;
(function(RestrictedMethods2) {
  RestrictedMethods2["requestAddressBook"] = "requestAddressBook";
})(RestrictedMethods || (RestrictedMethods = {}));
class PostMessageCommunicator {
  constructor(allowedOrigins = null, debugMode = false) {
    this.allowedOrigins = null;
    this.callbacks = /* @__PURE__ */ new Map();
    this.debugMode = false;
    this.isServer = typeof window === "undefined";
    this.isValidMessage = ({ origin, data, source }) => {
      const emptyOrMalformed = !data;
      const sentFromParentEl = !this.isServer && source === window.parent;
      const majorVersionNumber = typeof data.version !== "undefined" && parseInt(data.version.split(".")[0]);
      const allowedSDKVersion = typeof majorVersionNumber === "number" && majorVersionNumber >= 1;
      let validOrigin = true;
      if (Array.isArray(this.allowedOrigins)) {
        validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== void 0;
      }
      return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
    };
    this.logIncomingMessage = (msg) => {
      console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
    };
    this.onParentMessage = (msg) => {
      if (this.isValidMessage(msg)) {
        this.debugMode && this.logIncomingMessage(msg);
        this.handleIncomingMessage(msg.data);
      }
    };
    this.handleIncomingMessage = (payload) => {
      const { id } = payload;
      const cb = this.callbacks.get(id);
      if (cb) {
        cb(payload);
        this.callbacks.delete(id);
      }
    };
    this.send = (method, params) => {
      const request = MessageFormatter.makeRequest(method, params);
      if (this.isServer) {
        throw new Error("Window doesn't exist");
      }
      window.parent.postMessage(request, "*");
      return new Promise((resolve, reject) => {
        this.callbacks.set(request.id, (response) => {
          if (!response.success) {
            reject(new Error(response.error));
            return;
          }
          resolve(response);
        });
      });
    };
    this.allowedOrigins = allowedOrigins;
    this.debugMode = debugMode;
    if (!this.isServer) {
      window.addEventListener("message", this.onParentMessage);
    }
  }
}
const isObjectEIP712TypedData = (obj) => {
  return typeof obj === "object" && obj != null && "domain" in obj && "types" in obj && "message" in obj;
};
class TXs {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getBySafeTxHash(safeTxHash) {
    if (!safeTxHash) {
      throw new Error("Invalid safeTxHash");
    }
    const response = await this.communicator.send(Methods.getTxBySafeTxHash, { safeTxHash });
    return response.data;
  }
  async signMessage(message) {
    const messagePayload = {
      message
    };
    const response = await this.communicator.send(Methods.signMessage, messagePayload);
    return response.data;
  }
  async signTypedMessage(typedData) {
    if (!isObjectEIP712TypedData(typedData)) {
      throw new Error("Invalid typed data");
    }
    const response = await this.communicator.send(Methods.signTypedMessage, { typedData });
    return response.data;
  }
  async send({ txs: txs2, params }) {
    if (!txs2 || !txs2.length) {
      throw new Error("No transactions were passed");
    }
    const messagePayload = {
      txs: txs2,
      params
    };
    const response = await this.communicator.send(Methods.sendTransactions, messagePayload);
    return response.data;
  }
}
const RPC_CALLS = {
  eth_call: "eth_call",
  eth_gasPrice: "eth_gasPrice",
  eth_getLogs: "eth_getLogs",
  eth_getBalance: "eth_getBalance",
  eth_getCode: "eth_getCode",
  eth_getBlockByHash: "eth_getBlockByHash",
  eth_getBlockByNumber: "eth_getBlockByNumber",
  eth_getStorageAt: "eth_getStorageAt",
  eth_getTransactionByHash: "eth_getTransactionByHash",
  eth_getTransactionReceipt: "eth_getTransactionReceipt",
  eth_getTransactionCount: "eth_getTransactionCount",
  eth_estimateGas: "eth_estimateGas",
  safe_setSettings: "safe_setSettings"
};
const inputFormatters = {
  defaultBlockParam: (arg = "latest") => arg,
  returnFullTxObjectParam: (arg = false) => arg,
  blockNumberToHex: (arg) => Number.isInteger(arg) ? `0x${arg.toString(16)}` : arg
};
class Eth {
  constructor(communicator) {
    this.communicator = communicator;
    this.call = this.buildRequest({
      call: RPC_CALLS.eth_call,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getBalance = this.buildRequest({
      call: RPC_CALLS.eth_getBalance,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getCode = this.buildRequest({
      call: RPC_CALLS.eth_getCode,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getStorageAt = this.buildRequest({
      call: RPC_CALLS.eth_getStorageAt,
      formatters: [null, inputFormatters.blockNumberToHex, inputFormatters.defaultBlockParam]
    });
    this.getPastLogs = this.buildRequest({
      call: RPC_CALLS.eth_getLogs
    });
    this.getBlockByHash = this.buildRequest({
      call: RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.returnFullTxObjectParam]
    });
    this.getBlockByNumber = this.buildRequest({
      call: RPC_CALLS.eth_getBlockByNumber,
      formatters: [inputFormatters.blockNumberToHex, inputFormatters.returnFullTxObjectParam]
    });
    this.getTransactionByHash = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionByHash
    });
    this.getTransactionReceipt = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionReceipt
    });
    this.getTransactionCount = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionCount,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getGasPrice = this.buildRequest({
      call: RPC_CALLS.eth_gasPrice
    });
    this.getEstimateGas = (transaction) => this.buildRequest({
      call: RPC_CALLS.eth_estimateGas
    })([transaction]);
    this.setSafeSettings = this.buildRequest({
      call: RPC_CALLS.safe_setSettings
    });
  }
  buildRequest(args) {
    const { call, formatters } = args;
    return async (params) => {
      if (formatters && Array.isArray(params)) {
        formatters.forEach((formatter, i) => {
          if (formatter) {
            params[i] = formatter(params[i]);
          }
        });
      }
      const payload = {
        call,
        params: params || []
      };
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data;
    };
  }
}
const MAGIC_VALUE = "0x1626ba7e";
const MAGIC_VALUE_BYTES = "0x20c13b0b";
const PERMISSIONS_REQUEST_REJECTED = 4001;
class PermissionsError extends Error {
  constructor(message, code, data) {
    super(message);
    this.code = code;
    this.data = data;
    Object.setPrototypeOf(this, PermissionsError.prototype);
  }
}
class Wallet {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getPermissions() {
    const response = await this.communicator.send(Methods.wallet_getPermissions, void 0);
    return response.data;
  }
  async requestPermissions(permissions2) {
    if (!this.isPermissionRequestValid(permissions2)) {
      throw new PermissionsError("Permissions request is invalid", PERMISSIONS_REQUEST_REJECTED);
    }
    try {
      const response = await this.communicator.send(Methods.wallet_requestPermissions, permissions2);
      return response.data;
    } catch {
      throw new PermissionsError("Permissions rejected", PERMISSIONS_REQUEST_REJECTED);
    }
  }
  isPermissionRequestValid(permissions2) {
    return permissions2.every((pr) => {
      if (typeof pr === "object") {
        return Object.keys(pr).every((method) => {
          if (Object.values(RestrictedMethods).includes(method)) {
            return true;
          }
          return false;
        });
      }
      return false;
    });
  }
}
const hasPermission = (required, permissions2) => permissions2.some((permission) => permission.parentCapability === required);
const requirePermission = () => (_, propertyKey, descriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function() {
    const wallet2 = new Wallet(this.communicator);
    let currentPermissions = await wallet2.getPermissions();
    if (!hasPermission(propertyKey, currentPermissions)) {
      currentPermissions = await wallet2.requestPermissions([{ [propertyKey]: {} }]);
    }
    if (!hasPermission(propertyKey, currentPermissions)) {
      throw new PermissionsError("Permissions rejected", PERMISSIONS_REQUEST_REJECTED);
    }
    return originalMethod.apply(this);
  };
  return descriptor;
};
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Safe {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getChainInfo() {
    const response = await this.communicator.send(Methods.getChainInfo, void 0);
    return response.data;
  }
  async getInfo() {
    const response = await this.communicator.send(Methods.getSafeInfo, void 0);
    return response.data;
  }
  // There is a possibility that this method will change because we may add pagination to the endpoint
  async experimental_getBalances({ currency = "usd" } = {}) {
    const response = await this.communicator.send(Methods.getSafeBalances, {
      currency
    });
    return response.data;
  }
  async check1271Signature(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_dataHash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE;
    } catch (err) {
      return false;
    }
  }
  async check1271SignatureBytes(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_data",
              type: "bytes"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE_BYTES;
    } catch (err) {
      return false;
    }
  }
  calculateMessageHash(message) {
    return hashMessage(message);
  }
  calculateTypedMessageHash(typedMessage) {
    const chainId = typeof typedMessage.domain.chainId === "object" ? typedMessage.domain.chainId.toNumber() : Number(typedMessage.domain.chainId);
    let primaryType = typedMessage.primaryType;
    if (!primaryType) {
      const fields = Object.values(typedMessage.types);
      const primaryTypes = Object.keys(typedMessage.types).filter((typeName) => fields.every((dataTypes) => dataTypes.every(({ type }) => type.replace("[", "").replace("]", "") !== typeName)));
      if (primaryTypes.length === 0 || primaryTypes.length > 1)
        throw new Error("Please specify primaryType");
      primaryType = primaryTypes[0];
    }
    return hashTypedData({
      message: typedMessage.message,
      domain: {
        ...typedMessage.domain,
        chainId,
        verifyingContract: typedMessage.domain.verifyingContract,
        salt: typedMessage.domain.salt
      },
      types: typedMessage.types,
      primaryType
    });
  }
  async getOffChainSignature(messageHash) {
    const response = await this.communicator.send(Methods.getOffChainSignature, messageHash);
    return response.data;
  }
  async isMessageSigned(message, signature = "0x") {
    let check;
    if (typeof message === "string") {
      check = async () => {
        const messageHash = this.calculateMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (isObjectEIP712TypedData(message)) {
      check = async () => {
        const messageHash = this.calculateTypedMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (check) {
      const isValid = await check();
      return isValid;
    }
    throw new Error("Invalid message type");
  }
  async isMessageHashSigned(messageHash, signature = "0x") {
    const checks = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
    for (const check of checks) {
      const isValid = await check(messageHash, signature);
      if (isValid) {
        return true;
      }
    }
    return false;
  }
  async getEnvironmentInfo() {
    const response = await this.communicator.send(Methods.getEnvironmentInfo, void 0);
    return response.data;
  }
  async requestAddressBook() {
    const response = await this.communicator.send(Methods.requestAddressBook, void 0);
    return response.data;
  }
}
__decorate([
  requirePermission()
], Safe.prototype, "requestAddressBook", null);
class SafeAppsSDK {
  constructor(opts = {}) {
    const { allowedDomains = null, debug = false } = opts;
    this.communicator = new PostMessageCommunicator(allowedDomains, debug);
    this.eth = new Eth(this.communicator);
    this.txs = new TXs(this.communicator);
    this.safe = new Safe(this.communicator);
    this.wallet = new Wallet(this.communicator);
  }
}
const index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MessageFormatter,
  get Methods() {
    return Methods;
  },
  Operation: distExports.Operation,
  RPC_CALLS,
  get RestrictedMethods() {
    return RestrictedMethods;
  },
  TokenType: distExports.TokenType,
  TransactionStatus: distExports.TransactionStatus,
  TransferDirection: distExports.TransferDirection,
  default: SafeAppsSDK,
  getSDKVersion,
  isObjectEIP712TypedData
});
var cjs = {};
var sdk$1 = {};
var communication = {};
var messageFormatter = {};
var version = {};
var hasRequiredVersion;
function requireVersion() {
  if (hasRequiredVersion) return version;
  hasRequiredVersion = 1;
  Object.defineProperty(version, "__esModule", { value: true });
  version.getSDKVersion = void 0;
  const getSDKVersion2 = () => "9.1.0";
  version.getSDKVersion = getSDKVersion2;
  return version;
}
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.generateRequestId = void 0;
  const dec2hex2 = (dec) => dec.toString(16).padStart(2, "0");
  const generateId2 = (len) => {
    const arr = new Uint8Array(len / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex2).join("");
  };
  const generateRequestId2 = () => {
    if (typeof window !== "undefined") {
      return generateId2(10);
    }
    return (/* @__PURE__ */ new Date()).getTime().toString(36);
  };
  utils.generateRequestId = generateRequestId2;
  return utils;
}
var hasRequiredMessageFormatter;
function requireMessageFormatter() {
  if (hasRequiredMessageFormatter) return messageFormatter;
  hasRequiredMessageFormatter = 1;
  Object.defineProperty(messageFormatter, "__esModule", { value: true });
  messageFormatter.MessageFormatter = void 0;
  const version_js_1 = requireVersion();
  const utils_js_1 = requireUtils();
  class MessageFormatter2 {
  }
  messageFormatter.MessageFormatter = MessageFormatter2;
  MessageFormatter2.makeRequest = (method, params) => {
    const id = (0, utils_js_1.generateRequestId)();
    return {
      id,
      method,
      params,
      env: {
        sdkVersion: (0, version_js_1.getSDKVersion)()
      }
    };
  };
  MessageFormatter2.makeResponse = (id, data, version2) => ({
    id,
    success: true,
    version: version2,
    data
  });
  MessageFormatter2.makeErrorResponse = (id, error, version2) => ({
    id,
    success: false,
    error,
    version: version2
  });
  return messageFormatter;
}
var methods = {};
var hasRequiredMethods;
function requireMethods() {
  if (hasRequiredMethods) return methods;
  hasRequiredMethods = 1;
  Object.defineProperty(methods, "__esModule", { value: true });
  methods.RestrictedMethods = methods.Methods = void 0;
  var Methods2;
  (function(Methods3) {
    Methods3["sendTransactions"] = "sendTransactions";
    Methods3["rpcCall"] = "rpcCall";
    Methods3["getChainInfo"] = "getChainInfo";
    Methods3["getSafeInfo"] = "getSafeInfo";
    Methods3["getTxBySafeTxHash"] = "getTxBySafeTxHash";
    Methods3["getSafeBalances"] = "getSafeBalances";
    Methods3["signMessage"] = "signMessage";
    Methods3["signTypedMessage"] = "signTypedMessage";
    Methods3["getEnvironmentInfo"] = "getEnvironmentInfo";
    Methods3["getOffChainSignature"] = "getOffChainSignature";
    Methods3["requestAddressBook"] = "requestAddressBook";
    Methods3["wallet_getPermissions"] = "wallet_getPermissions";
    Methods3["wallet_requestPermissions"] = "wallet_requestPermissions";
  })(Methods2 || (methods.Methods = Methods2 = {}));
  var RestrictedMethods2;
  (function(RestrictedMethods3) {
    RestrictedMethods3["requestAddressBook"] = "requestAddressBook";
  })(RestrictedMethods2 || (methods.RestrictedMethods = RestrictedMethods2 = {}));
  return methods;
}
var hasRequiredCommunication;
function requireCommunication() {
  if (hasRequiredCommunication) return communication;
  hasRequiredCommunication = 1;
  (function(exports) {
    var __createBinding = communication && communication.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = communication && communication.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    const messageFormatter_js_1 = requireMessageFormatter();
    class PostMessageCommunicator2 {
      constructor(allowedOrigins = null, debugMode = false) {
        this.allowedOrigins = null;
        this.callbacks = /* @__PURE__ */ new Map();
        this.debugMode = false;
        this.isServer = typeof window === "undefined";
        this.isValidMessage = ({ origin, data, source }) => {
          const emptyOrMalformed = !data;
          const sentFromParentEl = !this.isServer && source === window.parent;
          const majorVersionNumber = typeof data.version !== "undefined" && parseInt(data.version.split(".")[0]);
          const allowedSDKVersion = typeof majorVersionNumber === "number" && majorVersionNumber >= 1;
          let validOrigin = true;
          if (Array.isArray(this.allowedOrigins)) {
            validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== void 0;
          }
          return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
        };
        this.logIncomingMessage = (msg) => {
          console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
        };
        this.onParentMessage = (msg) => {
          if (this.isValidMessage(msg)) {
            this.debugMode && this.logIncomingMessage(msg);
            this.handleIncomingMessage(msg.data);
          }
        };
        this.handleIncomingMessage = (payload) => {
          const { id } = payload;
          const cb = this.callbacks.get(id);
          if (cb) {
            cb(payload);
            this.callbacks.delete(id);
          }
        };
        this.send = (method, params) => {
          const request = messageFormatter_js_1.MessageFormatter.makeRequest(method, params);
          if (this.isServer) {
            throw new Error("Window doesn't exist");
          }
          window.parent.postMessage(request, "*");
          return new Promise((resolve, reject) => {
            this.callbacks.set(request.id, (response) => {
              if (!response.success) {
                reject(new Error(response.error));
                return;
              }
              resolve(response);
            });
          });
        };
        this.allowedOrigins = allowedOrigins;
        this.debugMode = debugMode;
        if (!this.isServer) {
          window.addEventListener("message", this.onParentMessage);
        }
      }
    }
    exports.default = PostMessageCommunicator2;
    __exportStar(requireMethods(), exports);
  })(communication);
  return communication;
}
var txs = {};
var types = {};
var sdk = {};
var hasRequiredSdk$1;
function requireSdk$1() {
  if (hasRequiredSdk$1) return sdk;
  hasRequiredSdk$1 = 1;
  Object.defineProperty(sdk, "__esModule", { value: true });
  sdk.isObjectEIP712TypedData = void 0;
  const isObjectEIP712TypedData2 = (obj) => {
    return typeof obj === "object" && obj != null && "domain" in obj && "types" in obj && "message" in obj;
  };
  sdk.isObjectEIP712TypedData = isObjectEIP712TypedData2;
  return sdk;
}
var rpc = {};
var hasRequiredRpc;
function requireRpc() {
  if (hasRequiredRpc) return rpc;
  hasRequiredRpc = 1;
  Object.defineProperty(rpc, "__esModule", { value: true });
  return rpc;
}
var gateway = {};
var hasRequiredGateway;
function requireGateway() {
  if (hasRequiredGateway) return gateway;
  hasRequiredGateway = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransferDirection = exports.TransactionStatus = exports.TokenType = exports.Operation = void 0;
    var safe_gateway_typescript_sdk_1 = requireDist();
    Object.defineProperty(exports, "Operation", { enumerable: true, get: function() {
      return safe_gateway_typescript_sdk_1.Operation;
    } });
    Object.defineProperty(exports, "TokenType", { enumerable: true, get: function() {
      return safe_gateway_typescript_sdk_1.TokenType;
    } });
    Object.defineProperty(exports, "TransactionStatus", { enumerable: true, get: function() {
      return safe_gateway_typescript_sdk_1.TransactionStatus;
    } });
    Object.defineProperty(exports, "TransferDirection", { enumerable: true, get: function() {
      return safe_gateway_typescript_sdk_1.TransferDirection;
    } });
  })(gateway);
  return gateway;
}
var messaging = {};
var hasRequiredMessaging;
function requireMessaging() {
  if (hasRequiredMessaging) return messaging;
  hasRequiredMessaging = 1;
  Object.defineProperty(messaging, "__esModule", { value: true });
  requireMethods();
  return messaging;
}
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  (function(exports) {
    var __createBinding = types && types.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = types && types.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(requireSdk$1(), exports);
    __exportStar(requireRpc(), exports);
    __exportStar(requireGateway(), exports);
    __exportStar(requireMessaging(), exports);
  })(types);
  return types;
}
var hasRequiredTxs;
function requireTxs() {
  if (hasRequiredTxs) return txs;
  hasRequiredTxs = 1;
  Object.defineProperty(txs, "__esModule", { value: true });
  txs.TXs = void 0;
  const methods_js_1 = requireMethods();
  const index_js_1 = requireTypes();
  class TXs2 {
    constructor(communicator) {
      this.communicator = communicator;
    }
    async getBySafeTxHash(safeTxHash) {
      if (!safeTxHash) {
        throw new Error("Invalid safeTxHash");
      }
      const response = await this.communicator.send(methods_js_1.Methods.getTxBySafeTxHash, { safeTxHash });
      return response.data;
    }
    async signMessage(message) {
      const messagePayload = {
        message
      };
      const response = await this.communicator.send(methods_js_1.Methods.signMessage, messagePayload);
      return response.data;
    }
    async signTypedMessage(typedData) {
      if (!(0, index_js_1.isObjectEIP712TypedData)(typedData)) {
        throw new Error("Invalid typed data");
      }
      const response = await this.communicator.send(methods_js_1.Methods.signTypedMessage, { typedData });
      return response.data;
    }
    async send({ txs: txs2, params }) {
      if (!txs2 || !txs2.length) {
        throw new Error("No transactions were passed");
      }
      const messagePayload = {
        txs: txs2,
        params
      };
      const response = await this.communicator.send(methods_js_1.Methods.sendTransactions, messagePayload);
      return response.data;
    }
  }
  txs.TXs = TXs2;
  return txs;
}
var eth = {};
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  Object.defineProperty(constants, "__esModule", { value: true });
  constants.RPC_CALLS = void 0;
  constants.RPC_CALLS = {
    eth_call: "eth_call",
    eth_gasPrice: "eth_gasPrice",
    eth_getLogs: "eth_getLogs",
    eth_getBalance: "eth_getBalance",
    eth_getCode: "eth_getCode",
    eth_getBlockByHash: "eth_getBlockByHash",
    eth_getBlockByNumber: "eth_getBlockByNumber",
    eth_getStorageAt: "eth_getStorageAt",
    eth_getTransactionByHash: "eth_getTransactionByHash",
    eth_getTransactionReceipt: "eth_getTransactionReceipt",
    eth_getTransactionCount: "eth_getTransactionCount",
    eth_estimateGas: "eth_estimateGas",
    safe_setSettings: "safe_setSettings"
  };
  return constants;
}
var hasRequiredEth;
function requireEth() {
  if (hasRequiredEth) return eth;
  hasRequiredEth = 1;
  Object.defineProperty(eth, "__esModule", { value: true });
  eth.Eth = void 0;
  const constants_js_1 = requireConstants();
  const methods_js_1 = requireMethods();
  const inputFormatters2 = {
    defaultBlockParam: (arg = "latest") => arg,
    returnFullTxObjectParam: (arg = false) => arg,
    blockNumberToHex: (arg) => Number.isInteger(arg) ? `0x${arg.toString(16)}` : arg
  };
  class Eth2 {
    constructor(communicator) {
      this.communicator = communicator;
      this.call = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_call,
        formatters: [null, inputFormatters2.defaultBlockParam]
      });
      this.getBalance = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getBalance,
        formatters: [null, inputFormatters2.defaultBlockParam]
      });
      this.getCode = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getCode,
        formatters: [null, inputFormatters2.defaultBlockParam]
      });
      this.getStorageAt = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getStorageAt,
        formatters: [null, inputFormatters2.blockNumberToHex, inputFormatters2.defaultBlockParam]
      });
      this.getPastLogs = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getLogs
      });
      this.getBlockByHash = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getBlockByHash,
        formatters: [null, inputFormatters2.returnFullTxObjectParam]
      });
      this.getBlockByNumber = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getBlockByNumber,
        formatters: [inputFormatters2.blockNumberToHex, inputFormatters2.returnFullTxObjectParam]
      });
      this.getTransactionByHash = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getTransactionByHash
      });
      this.getTransactionReceipt = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getTransactionReceipt
      });
      this.getTransactionCount = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_getTransactionCount,
        formatters: [null, inputFormatters2.defaultBlockParam]
      });
      this.getGasPrice = this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_gasPrice
      });
      this.getEstimateGas = (transaction) => this.buildRequest({
        call: constants_js_1.RPC_CALLS.eth_estimateGas
      })([transaction]);
      this.setSafeSettings = this.buildRequest({
        call: constants_js_1.RPC_CALLS.safe_setSettings
      });
    }
    buildRequest(args) {
      const { call, formatters } = args;
      return async (params) => {
        if (formatters && Array.isArray(params)) {
          formatters.forEach((formatter, i) => {
            if (formatter) {
              params[i] = formatter(params[i]);
            }
          });
        }
        const payload = {
          call,
          params: params || []
        };
        const response = await this.communicator.send(methods_js_1.Methods.rpcCall, payload);
        return response.data;
      };
    }
  }
  eth.Eth = Eth2;
  return eth;
}
var safe = {};
var signatures = {};
var hasRequiredSignatures;
function requireSignatures() {
  if (hasRequiredSignatures) return signatures;
  hasRequiredSignatures = 1;
  Object.defineProperty(signatures, "__esModule", { value: true });
  signatures.MAGIC_VALUE_BYTES = signatures.MAGIC_VALUE = void 0;
  const MAGIC_VALUE2 = "0x1626ba7e";
  signatures.MAGIC_VALUE = MAGIC_VALUE2;
  const MAGIC_VALUE_BYTES2 = "0x20c13b0b";
  signatures.MAGIC_VALUE_BYTES = MAGIC_VALUE_BYTES2;
  return signatures;
}
var requirePermissions$1 = {};
var wallet = {};
var permissions = {};
var hasRequiredPermissions;
function requirePermissions() {
  if (hasRequiredPermissions) return permissions;
  hasRequiredPermissions = 1;
  Object.defineProperty(permissions, "__esModule", { value: true });
  permissions.PermissionsError = permissions.PERMISSIONS_REQUEST_REJECTED = void 0;
  permissions.PERMISSIONS_REQUEST_REJECTED = 4001;
  class PermissionsError2 extends Error {
    constructor(message, code, data) {
      super(message);
      this.code = code;
      this.data = data;
      Object.setPrototypeOf(this, PermissionsError2.prototype);
    }
  }
  permissions.PermissionsError = PermissionsError2;
  return permissions;
}
var hasRequiredWallet;
function requireWallet() {
  if (hasRequiredWallet) return wallet;
  hasRequiredWallet = 1;
  Object.defineProperty(wallet, "__esModule", { value: true });
  wallet.Wallet = void 0;
  const methods_js_1 = requireMethods();
  const permissions_js_1 = requirePermissions();
  class Wallet2 {
    constructor(communicator) {
      this.communicator = communicator;
    }
    async getPermissions() {
      const response = await this.communicator.send(methods_js_1.Methods.wallet_getPermissions, void 0);
      return response.data;
    }
    async requestPermissions(permissions2) {
      if (!this.isPermissionRequestValid(permissions2)) {
        throw new permissions_js_1.PermissionsError("Permissions request is invalid", permissions_js_1.PERMISSIONS_REQUEST_REJECTED);
      }
      try {
        const response = await this.communicator.send(methods_js_1.Methods.wallet_requestPermissions, permissions2);
        return response.data;
      } catch {
        throw new permissions_js_1.PermissionsError("Permissions rejected", permissions_js_1.PERMISSIONS_REQUEST_REJECTED);
      }
    }
    isPermissionRequestValid(permissions2) {
      return permissions2.every((pr) => {
        if (typeof pr === "object") {
          return Object.keys(pr).every((method) => {
            if (Object.values(methods_js_1.RestrictedMethods).includes(method)) {
              return true;
            }
            return false;
          });
        }
        return false;
      });
    }
  }
  wallet.Wallet = Wallet2;
  return wallet;
}
var hasRequiredRequirePermissions;
function requireRequirePermissions() {
  if (hasRequiredRequirePermissions) return requirePermissions$1;
  hasRequiredRequirePermissions = 1;
  Object.defineProperty(requirePermissions$1, "__esModule", { value: true });
  const index_js_1 = requireWallet();
  const permissions_js_1 = requirePermissions();
  const hasPermission2 = (required, permissions2) => permissions2.some((permission) => permission.parentCapability === required);
  const requirePermission2 = () => (_, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function() {
      const wallet2 = new index_js_1.Wallet(this.communicator);
      let currentPermissions = await wallet2.getPermissions();
      if (!hasPermission2(propertyKey, currentPermissions)) {
        currentPermissions = await wallet2.requestPermissions([{ [propertyKey]: {} }]);
      }
      if (!hasPermission2(propertyKey, currentPermissions)) {
        throw new permissions_js_1.PermissionsError("Permissions rejected", permissions_js_1.PERMISSIONS_REQUEST_REJECTED);
      }
      return originalMethod.apply(this);
    };
    return descriptor;
  };
  requirePermissions$1.default = requirePermission2;
  return requirePermissions$1;
}
var hasRequiredSafe;
function requireSafe() {
  if (hasRequiredSafe) return safe;
  hasRequiredSafe = 1;
  var __decorate2 = safe && safe.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __importDefault = safe && safe.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(safe, "__esModule", { value: true });
  safe.Safe = void 0;
  const viem_1 = /* @__PURE__ */ require_cjs();
  const signatures_js_1 = requireSignatures();
  const methods_js_1 = requireMethods();
  const constants_js_1 = requireConstants();
  const index_js_1 = requireTypes();
  const requirePermissions_js_1 = __importDefault(requireRequirePermissions());
  class Safe2 {
    constructor(communicator) {
      this.communicator = communicator;
    }
    async getChainInfo() {
      const response = await this.communicator.send(methods_js_1.Methods.getChainInfo, void 0);
      return response.data;
    }
    async getInfo() {
      const response = await this.communicator.send(methods_js_1.Methods.getSafeInfo, void 0);
      return response.data;
    }
    // There is a possibility that this method will change because we may add pagination to the endpoint
    async experimental_getBalances({ currency = "usd" } = {}) {
      const response = await this.communicator.send(methods_js_1.Methods.getSafeBalances, {
        currency
      });
      return response.data;
    }
    async check1271Signature(messageHash, signature = "0x") {
      const safeInfo = await this.getInfo();
      const encodedIsValidSignatureCall = (0, viem_1.encodeFunctionData)({
        abi: [
          {
            constant: false,
            inputs: [
              {
                name: "_dataHash",
                type: "bytes32"
              },
              {
                name: "_signature",
                type: "bytes"
              }
            ],
            name: "isValidSignature",
            outputs: [
              {
                name: "",
                type: "bytes4"
              }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        functionName: "isValidSignature",
        args: [messageHash, signature]
      });
      const payload = {
        call: constants_js_1.RPC_CALLS.eth_call,
        params: [
          {
            to: safeInfo.safeAddress,
            data: encodedIsValidSignatureCall
          },
          "latest"
        ]
      };
      try {
        const response = await this.communicator.send(methods_js_1.Methods.rpcCall, payload);
        return response.data.slice(0, 10).toLowerCase() === signatures_js_1.MAGIC_VALUE;
      } catch (err) {
        return false;
      }
    }
    async check1271SignatureBytes(messageHash, signature = "0x") {
      const safeInfo = await this.getInfo();
      const encodedIsValidSignatureCall = (0, viem_1.encodeFunctionData)({
        abi: [
          {
            constant: false,
            inputs: [
              {
                name: "_data",
                type: "bytes"
              },
              {
                name: "_signature",
                type: "bytes"
              }
            ],
            name: "isValidSignature",
            outputs: [
              {
                name: "",
                type: "bytes4"
              }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        functionName: "isValidSignature",
        args: [messageHash, signature]
      });
      const payload = {
        call: constants_js_1.RPC_CALLS.eth_call,
        params: [
          {
            to: safeInfo.safeAddress,
            data: encodedIsValidSignatureCall
          },
          "latest"
        ]
      };
      try {
        const response = await this.communicator.send(methods_js_1.Methods.rpcCall, payload);
        return response.data.slice(0, 10).toLowerCase() === signatures_js_1.MAGIC_VALUE_BYTES;
      } catch (err) {
        return false;
      }
    }
    calculateMessageHash(message) {
      return (0, viem_1.hashMessage)(message);
    }
    calculateTypedMessageHash(typedMessage) {
      const chainId = typeof typedMessage.domain.chainId === "object" ? typedMessage.domain.chainId.toNumber() : Number(typedMessage.domain.chainId);
      let primaryType = typedMessage.primaryType;
      if (!primaryType) {
        const fields = Object.values(typedMessage.types);
        const primaryTypes = Object.keys(typedMessage.types).filter((typeName) => fields.every((dataTypes) => dataTypes.every(({ type }) => type.replace("[", "").replace("]", "") !== typeName)));
        if (primaryTypes.length === 0 || primaryTypes.length > 1)
          throw new Error("Please specify primaryType");
        primaryType = primaryTypes[0];
      }
      return (0, viem_1.hashTypedData)({
        message: typedMessage.message,
        domain: {
          ...typedMessage.domain,
          chainId,
          verifyingContract: typedMessage.domain.verifyingContract,
          salt: typedMessage.domain.salt
        },
        types: typedMessage.types,
        primaryType
      });
    }
    async getOffChainSignature(messageHash) {
      const response = await this.communicator.send(methods_js_1.Methods.getOffChainSignature, messageHash);
      return response.data;
    }
    async isMessageSigned(message, signature = "0x") {
      let check;
      if (typeof message === "string") {
        check = async () => {
          const messageHash = this.calculateMessageHash(message);
          const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
          return messageHashSigned;
        };
      }
      if ((0, index_js_1.isObjectEIP712TypedData)(message)) {
        check = async () => {
          const messageHash = this.calculateTypedMessageHash(message);
          const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
          return messageHashSigned;
        };
      }
      if (check) {
        const isValid = await check();
        return isValid;
      }
      throw new Error("Invalid message type");
    }
    async isMessageHashSigned(messageHash, signature = "0x") {
      const checks = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
      for (const check of checks) {
        const isValid = await check(messageHash, signature);
        if (isValid) {
          return true;
        }
      }
      return false;
    }
    async getEnvironmentInfo() {
      const response = await this.communicator.send(methods_js_1.Methods.getEnvironmentInfo, void 0);
      return response.data;
    }
    async requestAddressBook() {
      const response = await this.communicator.send(methods_js_1.Methods.requestAddressBook, void 0);
      return response.data;
    }
  }
  safe.Safe = Safe2;
  __decorate2([
    (0, requirePermissions_js_1.default)()
  ], Safe2.prototype, "requestAddressBook", null);
  return safe;
}
var hasRequiredSdk;
function requireSdk() {
  if (hasRequiredSdk) return sdk$1;
  hasRequiredSdk = 1;
  var __importDefault = sdk$1 && sdk$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(sdk$1, "__esModule", { value: true });
  const index_js_1 = __importDefault(requireCommunication());
  const index_js_2 = requireTxs();
  const index_js_3 = requireEth();
  const index_js_4 = requireSafe();
  const index_js_5 = requireWallet();
  class SafeAppsSDK2 {
    constructor(opts = {}) {
      const { allowedDomains = null, debug = false } = opts;
      this.communicator = new index_js_1.default(allowedDomains, debug);
      this.eth = new index_js_3.Eth(this.communicator);
      this.txs = new index_js_2.TXs(this.communicator);
      this.safe = new index_js_4.Safe(this.communicator);
      this.wallet = new index_js_5.Wallet(this.communicator);
    }
  }
  sdk$1.default = SafeAppsSDK2;
  return sdk$1;
}
var hasRequiredCjs;
function requireCjs() {
  if (hasRequiredCjs) return cjs;
  hasRequiredCjs = 1;
  (function(exports) {
    var __createBinding = cjs && cjs.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = cjs && cjs.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    var __importDefault = cjs && cjs.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSDKVersion = void 0;
    const sdk_js_1 = __importDefault(requireSdk());
    exports.default = sdk_js_1.default;
    __exportStar(requireSdk(), exports);
    __exportStar(requireTypes(), exports);
    __exportStar(requireMethods(), exports);
    __exportStar(requireMessageFormatter(), exports);
    var version_js_1 = requireVersion();
    Object.defineProperty(exports, "getSDKVersion", { enumerable: true, get: function() {
      return version_js_1.getSDKVersion;
    } });
    __exportStar(requireConstants(), exports);
  })(cjs);
  return cjs;
}
export {
  index as i,
  requireCjs as r
};
