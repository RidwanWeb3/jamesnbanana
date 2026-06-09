var dist = {};
var endpoint = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var __awaiter = utils && utils.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.insertParams = insertParams;
  utils.stringifyQuery = stringifyQuery;
  utils.fetchData = fetchData;
  utils.getData = getData;
  const isErrorResponse = (data) => {
    const isObject = typeof data === "object" && data !== null;
    return isObject && ("code" in data || "statusCode" in data) && "message" in data;
  };
  function replaceParam(str, key, value) {
    return str.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  function insertParams(template, params) {
    return params ? Object.keys(params).reduce((result, key) => {
      return replaceParam(result, key, String(params[key]));
    }, template) : template;
  }
  function stringifyQuery(query) {
    if (!query) {
      return "";
    }
    const searchParams = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      if (query[key] != null) {
        searchParams.append(key, String(query[key]));
      }
    });
    const searchString = searchParams.toString();
    return searchString ? `?${searchString}` : "";
  }
  function parseResponse(resp) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      let json;
      try {
        json = yield resp.json();
      } catch (_b) {
        json = {};
      }
      if (!resp.ok) {
        const errTxt = isErrorResponse(json) ? `CGW error - ${(_a = json.code) !== null && _a !== void 0 ? _a : json.statusCode}: ${json.message}` : `CGW error - status ${resp.statusText}`;
        throw new Error(errTxt);
      }
      return json;
    });
  }
  function fetchData(url, method, body, headers, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
      const requestHeaders = Object.assign({ "Content-Type": "application/json" }, headers);
      const options = {
        method: method !== null && method !== void 0 ? method : "POST",
        headers: requestHeaders
      };
      if (credentials) {
        options["credentials"] = credentials;
      }
      if (body != null) {
        options.body = typeof body === "string" ? body : JSON.stringify(body);
      }
      const resp = yield fetch(url, options);
      return parseResponse(resp);
    });
  }
  function getData(url, headers, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
      const options = {
        method: "GET"
      };
      if (headers) {
        options["headers"] = Object.assign(Object.assign({}, headers), { "Content-Type": "application/json" });
      }
      if (credentials) {
        options["credentials"] = credentials;
      }
      const resp = yield fetch(url, options);
      return parseResponse(resp);
    });
  }
  return utils;
}
var hasRequiredEndpoint;
function requireEndpoint() {
  if (hasRequiredEndpoint) return endpoint;
  hasRequiredEndpoint = 1;
  Object.defineProperty(endpoint, "__esModule", { value: true });
  endpoint.postEndpoint = postEndpoint;
  endpoint.putEndpoint = putEndpoint;
  endpoint.deleteEndpoint = deleteEndpoint;
  endpoint.getEndpoint = getEndpoint;
  const utils_1 = requireUtils();
  function makeUrl(baseUrl, path, pathParams, query) {
    const pathname = (0, utils_1.insertParams)(path, pathParams);
    const search = (0, utils_1.stringifyQuery)(query);
    return `${baseUrl}${pathname}${search}`;
  }
  function postEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, "POST", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
  }
  function putEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, "PUT", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
  }
  function deleteEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, "DELETE", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
  }
  function getEndpoint(baseUrl, path, params, rawUrl) {
    if (rawUrl) {
      return (0, utils_1.getData)(rawUrl, void 0, params === null || params === void 0 ? void 0 : params.credentials);
    }
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.getData)(url, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
  }
  return endpoint;
}
var config = {};
var hasRequiredConfig;
function requireConfig() {
  if (hasRequiredConfig) return config;
  hasRequiredConfig = 1;
  Object.defineProperty(config, "__esModule", { value: true });
  config.DEFAULT_BASE_URL = void 0;
  config.DEFAULT_BASE_URL = "https://safe-client.safe.global";
  return config;
}
var safeInfo = {};
var hasRequiredSafeInfo;
function requireSafeInfo() {
  if (hasRequiredSafeInfo) return safeInfo;
  hasRequiredSafeInfo = 1;
  Object.defineProperty(safeInfo, "__esModule", { value: true });
  safeInfo.ImplementationVersionState = void 0;
  var ImplementationVersionState;
  (function(ImplementationVersionState2) {
    ImplementationVersionState2["UP_TO_DATE"] = "UP_TO_DATE";
    ImplementationVersionState2["OUTDATED"] = "OUTDATED";
    ImplementationVersionState2["UNKNOWN"] = "UNKNOWN";
  })(ImplementationVersionState || (safeInfo.ImplementationVersionState = ImplementationVersionState = {}));
  return safeInfo;
}
var safeApps = {};
var hasRequiredSafeApps;
function requireSafeApps() {
  if (hasRequiredSafeApps) return safeApps;
  hasRequiredSafeApps = 1;
  Object.defineProperty(safeApps, "__esModule", { value: true });
  safeApps.SafeAppSocialPlatforms = safeApps.SafeAppFeatures = safeApps.SafeAppAccessPolicyTypes = void 0;
  var SafeAppAccessPolicyTypes;
  (function(SafeAppAccessPolicyTypes2) {
    SafeAppAccessPolicyTypes2["NoRestrictions"] = "NO_RESTRICTIONS";
    SafeAppAccessPolicyTypes2["DomainAllowlist"] = "DOMAIN_ALLOWLIST";
  })(SafeAppAccessPolicyTypes || (safeApps.SafeAppAccessPolicyTypes = SafeAppAccessPolicyTypes = {}));
  var SafeAppFeatures;
  (function(SafeAppFeatures2) {
    SafeAppFeatures2["BATCHED_TRANSACTIONS"] = "BATCHED_TRANSACTIONS";
  })(SafeAppFeatures || (safeApps.SafeAppFeatures = SafeAppFeatures = {}));
  var SafeAppSocialPlatforms;
  (function(SafeAppSocialPlatforms2) {
    SafeAppSocialPlatforms2["TWITTER"] = "TWITTER";
    SafeAppSocialPlatforms2["GITHUB"] = "GITHUB";
    SafeAppSocialPlatforms2["DISCORD"] = "DISCORD";
    SafeAppSocialPlatforms2["TELEGRAM"] = "TELEGRAM";
  })(SafeAppSocialPlatforms || (safeApps.SafeAppSocialPlatforms = SafeAppSocialPlatforms = {}));
  return safeApps;
}
var transactions = {};
var hasRequiredTransactions;
function requireTransactions() {
  if (hasRequiredTransactions) return transactions;
  hasRequiredTransactions = 1;
  Object.defineProperty(transactions, "__esModule", { value: true });
  transactions.LabelValue = transactions.StartTimeValue = transactions.DurationType = transactions.DetailedExecutionInfoType = transactions.TransactionListItemType = transactions.ConflictType = transactions.TransactionInfoType = transactions.SettingsInfoType = transactions.TransactionTokenType = transactions.TransferDirection = transactions.TransactionStatus = transactions.Operation = void 0;
  var Operation;
  (function(Operation2) {
    Operation2[Operation2["CALL"] = 0] = "CALL";
    Operation2[Operation2["DELEGATE"] = 1] = "DELEGATE";
  })(Operation || (transactions.Operation = Operation = {}));
  var TransactionStatus;
  (function(TransactionStatus2) {
    TransactionStatus2["AWAITING_CONFIRMATIONS"] = "AWAITING_CONFIRMATIONS";
    TransactionStatus2["AWAITING_EXECUTION"] = "AWAITING_EXECUTION";
    TransactionStatus2["CANCELLED"] = "CANCELLED";
    TransactionStatus2["FAILED"] = "FAILED";
    TransactionStatus2["SUCCESS"] = "SUCCESS";
  })(TransactionStatus || (transactions.TransactionStatus = TransactionStatus = {}));
  var TransferDirection;
  (function(TransferDirection2) {
    TransferDirection2["INCOMING"] = "INCOMING";
    TransferDirection2["OUTGOING"] = "OUTGOING";
    TransferDirection2["UNKNOWN"] = "UNKNOWN";
  })(TransferDirection || (transactions.TransferDirection = TransferDirection = {}));
  var TransactionTokenType;
  (function(TransactionTokenType2) {
    TransactionTokenType2["ERC20"] = "ERC20";
    TransactionTokenType2["ERC721"] = "ERC721";
    TransactionTokenType2["NATIVE_COIN"] = "NATIVE_COIN";
  })(TransactionTokenType || (transactions.TransactionTokenType = TransactionTokenType = {}));
  var SettingsInfoType;
  (function(SettingsInfoType2) {
    SettingsInfoType2["SET_FALLBACK_HANDLER"] = "SET_FALLBACK_HANDLER";
    SettingsInfoType2["ADD_OWNER"] = "ADD_OWNER";
    SettingsInfoType2["REMOVE_OWNER"] = "REMOVE_OWNER";
    SettingsInfoType2["SWAP_OWNER"] = "SWAP_OWNER";
    SettingsInfoType2["CHANGE_THRESHOLD"] = "CHANGE_THRESHOLD";
    SettingsInfoType2["CHANGE_IMPLEMENTATION"] = "CHANGE_IMPLEMENTATION";
    SettingsInfoType2["ENABLE_MODULE"] = "ENABLE_MODULE";
    SettingsInfoType2["DISABLE_MODULE"] = "DISABLE_MODULE";
    SettingsInfoType2["SET_GUARD"] = "SET_GUARD";
    SettingsInfoType2["DELETE_GUARD"] = "DELETE_GUARD";
  })(SettingsInfoType || (transactions.SettingsInfoType = SettingsInfoType = {}));
  var TransactionInfoType;
  (function(TransactionInfoType2) {
    TransactionInfoType2["TRANSFER"] = "Transfer";
    TransactionInfoType2["SETTINGS_CHANGE"] = "SettingsChange";
    TransactionInfoType2["CUSTOM"] = "Custom";
    TransactionInfoType2["CREATION"] = "Creation";
    TransactionInfoType2["SWAP_ORDER"] = "SwapOrder";
    TransactionInfoType2["TWAP_ORDER"] = "TwapOrder";
    TransactionInfoType2["SWAP_TRANSFER"] = "SwapTransfer";
    TransactionInfoType2["NATIVE_STAKING_DEPOSIT"] = "NativeStakingDeposit";
    TransactionInfoType2["NATIVE_STAKING_VALIDATORS_EXIT"] = "NativeStakingValidatorsExit";
    TransactionInfoType2["NATIVE_STAKING_WITHDRAW"] = "NativeStakingWithdraw";
  })(TransactionInfoType || (transactions.TransactionInfoType = TransactionInfoType = {}));
  var ConflictType;
  (function(ConflictType2) {
    ConflictType2["NONE"] = "None";
    ConflictType2["HAS_NEXT"] = "HasNext";
    ConflictType2["END"] = "End";
  })(ConflictType || (transactions.ConflictType = ConflictType = {}));
  var TransactionListItemType;
  (function(TransactionListItemType2) {
    TransactionListItemType2["TRANSACTION"] = "TRANSACTION";
    TransactionListItemType2["LABEL"] = "LABEL";
    TransactionListItemType2["CONFLICT_HEADER"] = "CONFLICT_HEADER";
    TransactionListItemType2["DATE_LABEL"] = "DATE_LABEL";
  })(TransactionListItemType || (transactions.TransactionListItemType = TransactionListItemType = {}));
  var DetailedExecutionInfoType;
  (function(DetailedExecutionInfoType2) {
    DetailedExecutionInfoType2["MULTISIG"] = "MULTISIG";
    DetailedExecutionInfoType2["MODULE"] = "MODULE";
  })(DetailedExecutionInfoType || (transactions.DetailedExecutionInfoType = DetailedExecutionInfoType = {}));
  var DurationType;
  (function(DurationType2) {
    DurationType2["AUTO"] = "AUTO";
    DurationType2["LIMIT_DURATION"] = "LIMIT_DURATION";
  })(DurationType || (transactions.DurationType = DurationType = {}));
  var StartTimeValue;
  (function(StartTimeValue2) {
    StartTimeValue2["AT_MINING_TIME"] = "AT_MINING_TIME";
    StartTimeValue2["AT_EPOCH"] = "AT_EPOCH";
  })(StartTimeValue || (transactions.StartTimeValue = StartTimeValue = {}));
  var LabelValue;
  (function(LabelValue2) {
    LabelValue2["Queued"] = "Queued";
    LabelValue2["Next"] = "Next";
  })(LabelValue || (transactions.LabelValue = LabelValue = {}));
  return transactions;
}
var chains = {};
var hasRequiredChains;
function requireChains() {
  if (hasRequiredChains) return chains;
  hasRequiredChains = 1;
  Object.defineProperty(chains, "__esModule", { value: true });
  chains.FEATURES = chains.GAS_PRICE_TYPE = chains.RPC_AUTHENTICATION = void 0;
  var RPC_AUTHENTICATION;
  (function(RPC_AUTHENTICATION2) {
    RPC_AUTHENTICATION2["API_KEY_PATH"] = "API_KEY_PATH";
    RPC_AUTHENTICATION2["NO_AUTHENTICATION"] = "NO_AUTHENTICATION";
    RPC_AUTHENTICATION2["UNKNOWN"] = "UNKNOWN";
  })(RPC_AUTHENTICATION || (chains.RPC_AUTHENTICATION = RPC_AUTHENTICATION = {}));
  var GAS_PRICE_TYPE;
  (function(GAS_PRICE_TYPE2) {
    GAS_PRICE_TYPE2["ORACLE"] = "ORACLE";
    GAS_PRICE_TYPE2["FIXED"] = "FIXED";
    GAS_PRICE_TYPE2["FIXED_1559"] = "FIXED1559";
    GAS_PRICE_TYPE2["UNKNOWN"] = "UNKNOWN";
  })(GAS_PRICE_TYPE || (chains.GAS_PRICE_TYPE = GAS_PRICE_TYPE = {}));
  var FEATURES;
  (function(FEATURES2) {
    FEATURES2["ERC721"] = "ERC721";
    FEATURES2["SAFE_APPS"] = "SAFE_APPS";
    FEATURES2["CONTRACT_INTERACTION"] = "CONTRACT_INTERACTION";
    FEATURES2["DOMAIN_LOOKUP"] = "DOMAIN_LOOKUP";
    FEATURES2["SPENDING_LIMIT"] = "SPENDING_LIMIT";
    FEATURES2["EIP1559"] = "EIP1559";
    FEATURES2["SAFE_TX_GAS_OPTIONAL"] = "SAFE_TX_GAS_OPTIONAL";
    FEATURES2["TX_SIMULATION"] = "TX_SIMULATION";
    FEATURES2["EIP1271"] = "EIP1271";
  })(FEATURES || (chains.FEATURES = FEATURES = {}));
  return chains;
}
var common = {};
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  Object.defineProperty(common, "__esModule", { value: true });
  common.TokenType = void 0;
  var TokenType;
  (function(TokenType2) {
    TokenType2["ERC20"] = "ERC20";
    TokenType2["ERC721"] = "ERC721";
    TokenType2["NATIVE_TOKEN"] = "NATIVE_TOKEN";
    TokenType2["UNKNOWN"] = "UNKNOWN";
  })(TokenType || (common.TokenType = TokenType = {}));
  return common;
}
var masterCopies = {};
var hasRequiredMasterCopies;
function requireMasterCopies() {
  if (hasRequiredMasterCopies) return masterCopies;
  hasRequiredMasterCopies = 1;
  Object.defineProperty(masterCopies, "__esModule", { value: true });
  return masterCopies;
}
var decodedData = {};
var hasRequiredDecodedData;
function requireDecodedData() {
  if (hasRequiredDecodedData) return decodedData;
  hasRequiredDecodedData = 1;
  Object.defineProperty(decodedData, "__esModule", { value: true });
  decodedData.NativeStakingStatus = decodedData.ConfirmationViewTypes = void 0;
  var ConfirmationViewTypes;
  (function(ConfirmationViewTypes2) {
    ConfirmationViewTypes2["GENERIC"] = "GENERIC";
    ConfirmationViewTypes2["COW_SWAP_ORDER"] = "COW_SWAP_ORDER";
    ConfirmationViewTypes2["COW_SWAP_TWAP_ORDER"] = "COW_SWAP_TWAP_ORDER";
    ConfirmationViewTypes2["KILN_NATIVE_STAKING_DEPOSIT"] = "KILN_NATIVE_STAKING_DEPOSIT";
    ConfirmationViewTypes2["KILN_NATIVE_STAKING_VALIDATORS_EXIT"] = "KILN_NATIVE_STAKING_VALIDATORS_EXIT";
    ConfirmationViewTypes2["KILN_NATIVE_STAKING_WITHDRAW"] = "KILN_NATIVE_STAKING_WITHDRAW";
  })(ConfirmationViewTypes || (decodedData.ConfirmationViewTypes = ConfirmationViewTypes = {}));
  var NativeStakingStatus;
  (function(NativeStakingStatus2) {
    NativeStakingStatus2["NOT_STAKED"] = "NOT_STAKED";
    NativeStakingStatus2["ACTIVATING"] = "ACTIVATING";
    NativeStakingStatus2["DEPOSIT_IN_PROGRESS"] = "DEPOSIT_IN_PROGRESS";
    NativeStakingStatus2["ACTIVE"] = "ACTIVE";
    NativeStakingStatus2["EXIT_REQUESTED"] = "EXIT_REQUESTED";
    NativeStakingStatus2["EXITING"] = "EXITING";
    NativeStakingStatus2["EXITED"] = "EXITED";
    NativeStakingStatus2["SLASHED"] = "SLASHED";
  })(NativeStakingStatus || (decodedData.NativeStakingStatus = NativeStakingStatus = {}));
  return decodedData;
}
var safeMessages = {};
var hasRequiredSafeMessages;
function requireSafeMessages() {
  if (hasRequiredSafeMessages) return safeMessages;
  hasRequiredSafeMessages = 1;
  Object.defineProperty(safeMessages, "__esModule", { value: true });
  safeMessages.SafeMessageStatus = safeMessages.SafeMessageListItemType = void 0;
  var SafeMessageListItemType;
  (function(SafeMessageListItemType2) {
    SafeMessageListItemType2["DATE_LABEL"] = "DATE_LABEL";
    SafeMessageListItemType2["MESSAGE"] = "MESSAGE";
  })(SafeMessageListItemType || (safeMessages.SafeMessageListItemType = SafeMessageListItemType = {}));
  var SafeMessageStatus;
  (function(SafeMessageStatus2) {
    SafeMessageStatus2["NEEDS_CONFIRMATION"] = "NEEDS_CONFIRMATION";
    SafeMessageStatus2["CONFIRMED"] = "CONFIRMED";
  })(SafeMessageStatus || (safeMessages.SafeMessageStatus = SafeMessageStatus = {}));
  return safeMessages;
}
var notifications = {};
var hasRequiredNotifications;
function requireNotifications() {
  if (hasRequiredNotifications) return notifications;
  hasRequiredNotifications = 1;
  Object.defineProperty(notifications, "__esModule", { value: true });
  notifications.DeviceType = void 0;
  var DeviceType;
  (function(DeviceType2) {
    DeviceType2["ANDROID"] = "ANDROID";
    DeviceType2["IOS"] = "IOS";
    DeviceType2["WEB"] = "WEB";
  })(DeviceType || (notifications.DeviceType = DeviceType = {}));
  return notifications;
}
var relay = {};
var hasRequiredRelay;
function requireRelay() {
  if (hasRequiredRelay) return relay;
  hasRequiredRelay = 1;
  Object.defineProperty(relay, "__esModule", { value: true });
  return relay;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports) {
    var __createBinding = dist && dist.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __exportStar = dist && dist.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setBaseUrl = void 0;
    exports.relayTransaction = relayTransaction;
    exports.getRelayCount = getRelayCount;
    exports.getSafeInfo = getSafeInfo;
    exports.getIncomingTransfers = getIncomingTransfers;
    exports.getModuleTransactions = getModuleTransactions;
    exports.getMultisigTransactions = getMultisigTransactions;
    exports.getBalances = getBalances;
    exports.getFiatCurrencies = getFiatCurrencies;
    exports.getOwnedSafes = getOwnedSafes;
    exports.getAllOwnedSafes = getAllOwnedSafes;
    exports.getCollectibles = getCollectibles;
    exports.getCollectiblesPage = getCollectiblesPage;
    exports.getTransactionHistory = getTransactionHistory;
    exports.getTransactionQueue = getTransactionQueue;
    exports.getTransactionDetails = getTransactionDetails;
    exports.deleteTransaction = deleteTransaction;
    exports.postSafeGasEstimation = postSafeGasEstimation;
    exports.getNonces = getNonces;
    exports.proposeTransaction = proposeTransaction;
    exports.getConfirmationView = getConfirmationView;
    exports.getTxPreview = getTxPreview;
    exports.getChainsConfig = getChainsConfig;
    exports.getChainConfig = getChainConfig;
    exports.getSafeApps = getSafeApps;
    exports.getMasterCopies = getMasterCopies;
    exports.getDecodedData = getDecodedData;
    exports.getSafeMessages = getSafeMessages;
    exports.getSafeMessage = getSafeMessage;
    exports.proposeSafeMessage = proposeSafeMessage;
    exports.confirmSafeMessage = confirmSafeMessage;
    exports.getDelegates = getDelegates;
    exports.registerDevice = registerDevice;
    exports.unregisterSafe = unregisterSafe;
    exports.unregisterDevice = unregisterDevice;
    exports.registerEmail = registerEmail;
    exports.changeEmail = changeEmail;
    exports.resendEmailVerificationCode = resendEmailVerificationCode;
    exports.verifyEmail = verifyEmail;
    exports.getRegisteredEmail = getRegisteredEmail;
    exports.deleteRegisteredEmail = deleteRegisteredEmail;
    exports.registerRecoveryModule = registerRecoveryModule;
    exports.unsubscribeSingle = unsubscribeSingle;
    exports.unsubscribeAll = unsubscribeAll;
    exports.getSafeOverviews = getSafeOverviews;
    exports.getContract = getContract;
    exports.getAuthNonce = getAuthNonce;
    exports.verifyAuth = verifyAuth;
    exports.createAccount = createAccount;
    exports.getAccount = getAccount;
    exports.deleteAccount = deleteAccount;
    exports.getAccountDataTypes = getAccountDataTypes;
    exports.getAccountDataSettings = getAccountDataSettings;
    exports.putAccountDataSettings = putAccountDataSettings;
    exports.getIndexingStatus = getIndexingStatus;
    const endpoint_1 = requireEndpoint();
    const config_1 = requireConfig();
    __exportStar(requireSafeInfo(), exports);
    __exportStar(requireSafeApps(), exports);
    __exportStar(requireTransactions(), exports);
    __exportStar(requireChains(), exports);
    __exportStar(requireCommon(), exports);
    __exportStar(requireMasterCopies(), exports);
    __exportStar(requireDecodedData(), exports);
    __exportStar(requireSafeMessages(), exports);
    __exportStar(requireNotifications(), exports);
    __exportStar(requireRelay(), exports);
    let baseUrl = config_1.DEFAULT_BASE_URL;
    const setBaseUrl = (url) => {
      baseUrl = url;
    };
    exports.setBaseUrl = setBaseUrl;
    function relayTransaction(chainId, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/relay", { path: { chainId }, body });
    }
    function getRelayCount(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/relay/{address}", { path: { chainId, address } });
    }
    function getSafeInfo(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}", { path: { chainId, address } });
    }
    function getIncomingTransfers(chainId, address, query, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/incoming-transfers/", {
        path: { chainId, address },
        query
      }, pageUrl);
    }
    function getModuleTransactions(chainId, address, query, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/module-transactions/", {
        path: { chainId, address },
        query
      }, pageUrl);
    }
    function getMultisigTransactions(chainId, address, query, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/multisig-transactions/", {
        path: { chainId, address },
        query
      }, pageUrl);
    }
    function getBalances(chainId, address, currency = "usd", query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/balances/{currency}", {
        path: { chainId, address, currency },
        query
      });
    }
    function getFiatCurrencies() {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/balances/supported-fiat-codes");
    }
    function getOwnedSafes(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/owners/{address}/safes", { path: { chainId, address } });
    }
    function getAllOwnedSafes(address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/owners/{address}/safes", { path: { address } });
    }
    function getCollectibles(chainId, address, query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/collectibles", {
        path: { chainId, address },
        query
      });
    }
    function getCollectiblesPage(chainId, address, query = {}, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v2/chains/{chainId}/safes/{address}/collectibles", { path: { chainId, address }, query }, pageUrl);
    }
    function getTransactionHistory(chainId, address, query = {}, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/transactions/history", { path: { chainId, safe_address: address }, query }, pageUrl);
    }
    function getTransactionQueue(chainId, address, query = {}, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/transactions/queued", { path: { chainId, safe_address: address }, query }, pageUrl);
    }
    function getTransactionDetails(chainId, transactionId) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{transactionId}", {
        path: { chainId, transactionId }
      });
    }
    function deleteTransaction(chainId, safeTxHash, signature) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safeTxHash}", {
        path: { chainId, safeTxHash },
        body: { signature }
      });
    }
    function postSafeGasEstimation(chainId, address, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations", {
        path: { chainId, safe_address: address },
        body
      });
    }
    function getNonces(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/nonces", {
        path: { chainId, safe_address: address }
      });
    }
    function proposeTransaction(chainId, address, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safe_address}/propose", {
        path: { chainId, safe_address: address },
        body
      });
    }
    function getConfirmationView(chainId, safeAddress, operation, data, to, value) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation", {
        path: { chainId, safe_address: safeAddress },
        body: { operation, data, to, value }
      });
    }
    function getTxPreview(chainId, safeAddress, operation, data, to, value) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safe_address}/preview", {
        path: { chainId, safe_address: safeAddress },
        body: { operation, data, to, value }
      });
    }
    function getChainsConfig(query) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains", {
        query
      });
    }
    function getChainConfig(chainId) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}", {
        path: { chainId }
      });
    }
    function getSafeApps(chainId, query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safe-apps", {
        path: { chainId },
        query
      });
    }
    function getMasterCopies(chainId) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/about/master-copies", {
        path: { chainId }
      });
    }
    function getDecodedData(chainId, operation, encodedData, to) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/data-decoder", {
        path: { chainId },
        body: { operation, data: encodedData, to }
      });
    }
    function getSafeMessages(chainId, address, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/messages", { path: { chainId, safe_address: address }, query: {} }, pageUrl);
    }
    function getSafeMessage(chainId, messageHash) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/messages/{message_hash}", {
        path: { chainId, message_hash: messageHash }
      });
    }
    function proposeSafeMessage(chainId, address, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/messages", {
        path: { chainId, safe_address: address },
        body
      });
    }
    function confirmSafeMessage(chainId, messageHash, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/messages/{message_hash}/signatures", {
        path: { chainId, message_hash: messageHash },
        body
      });
    }
    function getDelegates(chainId, query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v2/chains/{chainId}/delegates", {
        path: { chainId },
        query
      });
    }
    function registerDevice(body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/register/notifications", {
        body
      });
    }
    function unregisterSafe(chainId, address, uuid) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}", {
        path: { chainId, safe_address: address, uuid }
      });
    }
    function unregisterDevice(chainId, uuid) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/notifications/devices/{uuid}", {
        path: { chainId, uuid }
      });
    }
    function registerEmail(chainId, safeAddress, body, headers) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails", {
        path: { chainId, safe_address: safeAddress },
        body,
        headers
      });
    }
    function changeEmail(chainId, safeAddress, signerAddress, body, headers) {
      return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body,
        headers
      });
    }
    function resendEmailVerificationCode(chainId, safeAddress, signerAddress) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body: ""
      });
    }
    function verifyEmail(chainId, safeAddress, signerAddress, body) {
      return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body
      });
    }
    function getRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers
      });
    }
    function deleteRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers
      });
    }
    function registerRecoveryModule(chainId, safeAddress, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/recovery", {
        path: { chainId, safe_address: safeAddress },
        body
      });
    }
    function unsubscribeSingle(query) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/subscriptions", { query });
    }
    function unsubscribeAll(query) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/subscriptions/all", { query });
    }
    function getSafeOverviews(safes, query) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/safes", {
        query: Object.assign(Object.assign({}, query), { safes: safes.join(",") })
      });
    }
    function getContract(chainId, contractAddress) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/contracts/{contractAddress}", {
        path: {
          chainId,
          contractAddress
        }
      });
    }
    function getAuthNonce() {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/auth/nonce", { credentials: "include" });
    }
    function verifyAuth(body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/auth/verify", {
        body,
        credentials: "include"
      });
    }
    function createAccount(body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/accounts", {
        body,
        credentials: "include"
      });
    }
    function getAccount(address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/{address}", {
        path: { address },
        credentials: "include"
      });
    }
    function deleteAccount(address) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/accounts/{address}", {
        path: { address },
        credentials: "include"
      });
    }
    function getAccountDataTypes() {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/data-types");
    }
    function getAccountDataSettings(address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/{address}/data-settings", {
        path: { address },
        credentials: "include"
      });
    }
    function putAccountDataSettings(address, body) {
      return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/accounts/{address}/data-settings", {
        path: { address },
        body,
        credentials: "include"
      });
    }
    function getIndexingStatus(chainId) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/about/indexing", {
        path: { chainId }
      });
    }
  })(dist);
  return dist;
}
var distExports = requireDist();
export {
  distExports as d,
  requireDist as r
};
