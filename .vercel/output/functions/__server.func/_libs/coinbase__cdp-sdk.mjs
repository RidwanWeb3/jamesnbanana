import { m as md5 } from "./md5.mjs";
import { A as AxiosHeaders, a as axios } from "./axios.mjs";
import { a as axiosRetry, e as exponentialDelay } from "./axios-retry.mjs";
import { s as subtle, g as getRandomValues } from "./uncrypto.mjs";
import { i as importPKCS8, S as SignJWT, a as importJWK } from "./jose.mjs";
import { randomUUID, publicEncrypt, constants, createHash, generateKeyPair, createPrivateKey, privateDecrypt } from "crypto";
import { b as bs58 } from "./bs58.mjs";
import { W as optimismSepolia, Q as optimism, an as arbitrumSepolia, L as arbitrum, ao as polygonMumbai, M as polygon, V as sepolia, N as mainnet, T as baseSepolia, J as base, H as createPublicClient, D as http, ap as createWalletClient, aq as toAccount, al as chains, a8 as encodeFunctionData, A as erc20Abi, ar as serializeTransaction, _ as hashTypedData, as as sliceHex, ae as encodePacked, ab as encodeAbiParameters, n as numberToHex, ac as size, at as concat, au as getTypesForEIP712Domain, $ as hashMessage, av as serializeErc6492Signature } from "./viem.mjs";
import { c as createKeyPairFromPrivateKeyBytes } from "./solana__keys.mjs";
import { A as Address, o as Abi } from "./abitype.mjs";
import { o as objectType, l as literalType, a as arrayType, d as discriminatedUnionType, e as enumType, s as stringType, u as unionType, n as numberType, r as recordType, f as anyType } from "./zod.mjs";
import { g as getTransferSolInstruction } from "./solana-program__system.mjs";
import { f as fetchMint, a as findAssociatedTokenPda, b as fetchToken, g as getCreateAssociatedTokenInstructionAsync, c as getTransferCheckedInstruction, T as TOKEN_PROGRAM_ADDRESS } from "./solana-program__token.mjs";
import { c as createSolanaRpc } from "./solana__rpc.mjs";
import { a as address } from "./solana__addresses.mjs";
import { p as pipe } from "./solana__functional.mjs";
import { c as compileTransaction, g as getBase64EncodedWireTransaction } from "./solana__transactions.mjs";
import { c as createTransactionMessage, a as appendTransactionMessageInstructions, s as setTransactionMessageLifetimeUsingBlockhash, b as setTransactionMessageFeePayer } from "./solana__transaction-messages.mjs";
import { c as createNoopSigner } from "./solana__signers.mjs";
class TimeoutError extends Error {
  /**
   * Initializes a new TimeoutError instance.
   *
   * @param message - The error message.
   */
  constructor(message = "Timeout Error") {
    super(message);
    this.name = "TimeoutError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError);
    }
  }
}
class UserInputValidationError extends Error {
  /**
   * Initializes a new UserInputValidationError instance.
   *
   * @param message - The user input validation error message.
   */
  constructor(message) {
    super(message);
    this.name = "UserInputValidationError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserInputValidationError);
    }
  }
}
const ERROR_DOCS_PAGE_URL = "https://docs.cdp.coinbase.com/api-reference/v2/errors";
const ImportAccountPublicRSAKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2Fxydgm/ryYk0IexQIuL
9DKyiIk2WmS36AZ83a9Z0QX53qdveg08b05g1Qr+o+COoYOT/FDi8anRGAs7rIyS
uigrjHR6VrmFjnGrrTr3MINwC9cYQFHwET8YVGRq+BB3iFTB1kIb9XJ/vT2sk1xP
hJ6JihEwSl4DgbeVjqw59wYqrNg355oa8EdFqkmfGU2tpbM56F8iv1F+shwkGo3y
GhW/UOQ5OLauXvsqo8ranwsK+lqFblLEMlNtn1VSJeO2vMxryeKFrY2ob8VqGchC
ftPJiLWs2Du6juw4C1rOWwSMlXzZ6cNMHkxdTcEHMr3C2TEHgzjZY41whMwNTB8q
/pxXnIbH77caaviRs4R/POe8cSsznalXj85LULvFWOIHp0w+jEYSii9Rp9XtHWAH
nrK/O/SVDtT1ohp2F+Zg1mojTgKfLOyGdOUXTi95naDTuG770rSjHdL80tJBz1Fd
+1pzGTGXGHLZQLX5YZm5iuy2cebWfF09VjIoCIlDB2++tr4M+O0Z1X1ZE0J5Ackq
rOluAFalaKynyH3KMyRg+NuLmibu5OmcMjCLK3D4X1YLiN2OK8/bbpEL8JYroDwb
EXIUW5mGS06YxfSUsxHzL9Tj00+GMm/Gvl0+4/+Vn8IXVHjQOSPNEy3EnqCiH/OW
8v0IMC32CeGrX7mGbU+MzlsCAwEAAQ==
-----END PUBLIC KEY-----`;
class APIError extends Error {
  statusCode;
  errorType;
  errorMessage;
  correlationId;
  errorLink;
  /**
   * Constructor for the APIError class
   *
   * @param statusCode - The HTTP status code
   * @param errorType - The type of error
   * @param errorMessage - The error message
   * @param correlationId - The correlation ID
   * @param errorLink - URL to documentation about this error
   * @param cause - The cause of the error
   */
  constructor(statusCode, errorType, errorMessage, correlationId, errorLink, cause) {
    super(errorMessage, { cause });
    this.name = "APIError";
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    if (correlationId !== void 0) {
      this.correlationId = correlationId;
    }
    if (errorLink !== void 0) {
      this.errorLink = errorLink;
    }
  }
  /**
   * Convert the error to a JSON object, excluding undefined properties
   *
   * @returns The error as a JSON object
   */
  toJSON() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      errorType: this.errorType,
      errorMessage: this.errorMessage,
      ...this.correlationId && { correlationId: this.correlationId },
      ...this.errorLink && { errorLink: this.errorLink }
    };
  }
}
class UnknownError extends Error {
  /**
   * Constructor for the UnknownError class
   *
   * @param message - The error message
   * @param cause - The cause of the error
   */
  constructor(message, cause) {
    super(message, { cause });
    this.name = "UnknownError";
  }
}
class NetworkError extends APIError {
  networkDetails;
  /**
   * Constructor for the NetworkError class
   *
   * @param errorType - The type of network error
   * @param errorMessage - The error message
   * @param networkDetails - Additional network error details
   * @param networkDetails.code - The error code
   * @param networkDetails.message - The error message
   * @param networkDetails.retryable - Whether the error is retryable
   * @param cause - The cause of the error
   */
  constructor(errorType, errorMessage, networkDetails, cause) {
    super(
      0,
      // Status code 0 indicates no response was received
      errorType,
      errorMessage,
      void 0,
      `${ERROR_DOCS_PAGE_URL}#network-errors`,
      cause
    );
    this.name = "NetworkError";
    this.networkDetails = networkDetails;
  }
  /**
   * Convert the error to a JSON object, including network details
   *
   * @returns The error as a JSON object
   */
  toJSON() {
    return {
      ...super.toJSON(),
      ...this.networkDetails && { networkDetails: this.networkDetails }
    };
  }
}
function isOpenAPIError(obj) {
  return obj !== null && typeof obj === "object" && "errorType" in obj && typeof obj.errorType === "string" && "errorMessage" in obj && typeof obj.errorMessage === "string";
}
const version = "1.51.0";
const publicClientId = "54f2ee2fb3d2b901a829940d70fbfc13";
const Analytics = {
  identifier: "",
  // set in cdp.ts
  sendEvent,
  trackAction,
  trackError
};
async function sendEvent(event) {
  if (event.name === "error" && process.env.DISABLE_CDP_ERROR_REPORTING === "true") {
    return;
  }
  if (event.name !== "error" && process.env.DISABLE_CDP_USAGE_TRACKING === "true") {
    return;
  }
  const timestamp = Date.now();
  const enhancedEvent = {
    user_id: Analytics.identifier,
    event_type: event.name,
    platform: "server",
    timestamp,
    event_properties: {
      project_name: "cdp-sdk",
      cdp_sdk_language: "typescript",
      version,
      ...event
    }
  };
  const events = [enhancedEvent];
  const stringifiedEventData = JSON.stringify(events);
  const uploadTime = timestamp.toString();
  const checksum = md5(stringifiedEventData + uploadTime);
  const analyticsServiceData = {
    client: publicClientId,
    e: stringifiedEventData,
    checksum
  };
  const apiEndpoint = "https://cca-lite.coinbase.com";
  const eventPath = "/amp";
  const eventEndPoint = `${apiEndpoint}${eventPath}`;
  await fetch(eventEndPoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(analyticsServiceData)
  });
}
function trackAction(params) {
  if (params.properties?.network && typeof params.properties.network === "string" && params.properties.network.startsWith("http")) {
    const url = new URL(params.properties.network);
    params.properties.customRpcHost = url.hostname;
    params.properties.network = "custom";
  }
  sendEvent({
    action: params.action,
    accountType: params.accountType,
    properties: params.properties,
    name: "action"
  }).catch(() => {
  });
}
function trackError(error, method) {
  if (process.env.DISABLE_CDP_ERROR_REPORTING === "true")
    return;
  if (!shouldTrackError(error))
    return;
  const { message, stack } = error;
  sendEvent({ method, message, stack, name: "error" }).catch(() => {
  });
}
function shouldTrackError(error) {
  if (!(error instanceof Error)) {
    return false;
  }
  if (error instanceof UserInputValidationError) {
    return false;
  }
  if (error instanceof NetworkError) {
    return true;
  }
  if (error instanceof APIError && error.errorType !== "unexpected_error") {
    return false;
  }
  return true;
}
const EvmUserOperationNetwork = {
  "base-sepolia": "base-sepolia",
  base: "base",
  arbitrum: "arbitrum",
  optimism: "optimism",
  zora: "zora",
  polygon: "polygon",
  bnb: "bnb",
  avalanche: "avalanche",
  ethereum: "ethereum",
  "ethereum-sepolia": "ethereum-sepolia"
};
const EvmUserOperationStatus = {
  complete: "complete",
  failed: "failed"
};
const EvmEip7702DelegationOperationStatus = {
  COMPLETED: "COMPLETED",
  FAILED: "FAILED"
};
const convertBigIntsToStrings = (obj) => {
  if (typeof obj === "bigint") {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntsToStrings);
  }
  if (obj && typeof obj === "object") {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, convertBigIntsToStrings(v)]));
  }
  return obj;
};
const authHash = async (data) => {
  const hashBuffer = await subtle.digest("SHA-256", new Uint8Array(data));
  return Buffer.from(hashBuffer).toString("hex");
};
const sortKeys = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortKeys);
  }
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = sortKeys(obj[key]);
    return acc;
  }, {});
};
class BaseError extends Error {
  /**
   * Base error constructor.
   *
   * @param message - The message to display.
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
class InvalidWalletSecretFormatError extends BaseError {
  /**
   * Invalid Wallet Secret format error constructor.
   *
   * @param message - The message to display.
   */
  constructor(message) {
    super("Invalid Wallet Secret format: " + message);
  }
}
class UndefinedWalletSecretError extends BaseError {
  /**
   * Undefined Wallet Secret error constructor.
   *
   * @param message - The message to display.
   */
  constructor(message) {
    super("Undefined Wallet Secret: " + message);
  }
}
async function generateJwt(options) {
  if (!options.apiKeyId) {
    throw new Error("Key name is required");
  }
  if (!options.apiKeySecret) {
    throw new Error("Private key is required");
  }
  const hasAllRequestParams = Boolean(options.requestMethod && options.requestHost && options.requestPath);
  const hasNoRequestParams = (options.requestMethod === void 0 || options.requestMethod === null) && (options.requestHost === void 0 || options.requestHost === null) && (options.requestPath === void 0 || options.requestPath === null);
  if (!hasAllRequestParams && !hasNoRequestParams) {
    throw new Error("Either all request details (method, host, path) must be provided, or all must be null for JWTs intended for websocket connections");
  }
  const now = Math.floor(Date.now() / 1e3);
  const expiresIn = options.expiresIn || 120;
  const claims = {
    sub: options.apiKeyId,
    iss: "cdp",
    aud: options.audience
  };
  if (hasAllRequestParams) {
    claims.uris = [`${options.requestMethod} ${options.requestHost}${options.requestPath}`];
  }
  const randomNonce = nonce();
  if (await isValidECKey(options.apiKeySecret)) {
    return await buildECJWT(options.apiKeySecret, options.apiKeyId, claims, now, expiresIn, randomNonce);
  } else if (isValidEd25519Key(options.apiKeySecret)) {
    return await buildEdwardsJWT(options.apiKeySecret, options.apiKeyId, claims, now, expiresIn, randomNonce);
  } else {
    throw new UserInputValidationError("Invalid key format - must be either PEM EC key or base64 Ed25519 key");
  }
}
async function generateWalletJwt(options) {
  if (!options.walletSecret) {
    throw new UndefinedWalletSecretError("Wallet Secret is not defined");
  }
  const uri = `${options.requestMethod} ${options.requestHost}${options.requestPath}`;
  const now = Math.floor(Date.now() / 1e3);
  const claims = {
    uris: [uri]
  };
  const shouldIncludeReqHash = typeof options.requestData === "object" && Object.keys(options.requestData).length > 0 && Object.values(options.requestData).some((value) => value !== void 0);
  if (shouldIncludeReqHash) {
    const sortedData = sortKeys(options.requestData);
    claims.reqHash = await authHash(Buffer.from(JSON.stringify(sortedData)));
  }
  try {
    const derBuffer = Buffer.from(options.walletSecret, "base64");
    const pemKey = `-----BEGIN PRIVATE KEY-----
${derBuffer.toString("base64").match(/.{1,64}/g)?.join("\n")}
-----END PRIVATE KEY-----`;
    const ecKey = await importPKCS8(pemKey, "ES256");
    return await new SignJWT(claims).setProtectedHeader({ alg: "ES256", typ: "JWT" }).setIssuedAt(now).setNotBefore(now).setJti(nonce()).sign(ecKey);
  } catch (error) {
    throw new InvalidWalletSecretFormatError("Could not create the EC key: " + error);
  }
}
function isValidEd25519Key(str) {
  try {
    const decoded = Buffer.from(str, "base64");
    return decoded.length === 64;
  } catch {
    return false;
  }
}
async function isValidECKey(str) {
  try {
    await importPKCS8(str, "ES256");
    return true;
  } catch {
    return false;
  }
}
async function buildECJWT(privateKey, keyName, claims, now, expiresIn, nonce2) {
  try {
    const ecKey = await importPKCS8(privateKey, "ES256");
    return await new SignJWT(claims).setProtectedHeader({ alg: "ES256", kid: keyName, typ: "JWT", nonce: nonce2 }).setIssuedAt(Math.floor(now)).setNotBefore(Math.floor(now)).setExpirationTime(Math.floor(now + expiresIn)).sign(ecKey);
  } catch (error) {
    throw new Error(`Failed to generate EC JWT: ${error.message}`);
  }
}
async function buildEdwardsJWT(privateKey, keyName, claims, now, expiresIn, nonce2) {
  try {
    const decoded = Buffer.from(privateKey, "base64");
    if (decoded.length !== 64) {
      throw new UserInputValidationError("Invalid Ed25519 key length");
    }
    const seed = decoded.subarray(0, 32);
    const publicKey = decoded.subarray(32);
    const jwk = {
      kty: "OKP",
      crv: "Ed25519",
      d: seed.toString("base64url"),
      x: publicKey.toString("base64url")
    };
    const key = await importJWK(jwk, "EdDSA");
    return await new SignJWT(claims).setProtectedHeader({ alg: "EdDSA", kid: keyName, typ: "JWT", nonce: nonce2 }).setIssuedAt(Math.floor(now)).setNotBefore(Math.floor(now)).setExpirationTime(Math.floor(now + expiresIn)).sign(key);
  } catch (error) {
    throw new Error(`Failed to generate Ed25519 JWT: ${error.message}`);
  }
}
function nonce() {
  const bytes = new Uint8Array(16);
  getRandomValues(bytes);
  return Buffer.from(bytes).toString("hex");
}
async function getAuthHeaders(options) {
  const headers = {};
  const jwt = await generateJwt({
    apiKeyId: options.apiKeyId,
    apiKeySecret: options.apiKeySecret,
    requestMethod: options.requestMethod,
    requestHost: options.requestHost,
    requestPath: options.requestPath,
    expiresIn: options.expiresIn,
    audience: options.audience
  });
  headers["Authorization"] = `Bearer ${jwt}`;
  headers["Content-Type"] = "application/json";
  if (requiresWalletAuth(options.requestMethod, options.requestPath)) {
    if (!options.walletSecret) {
      throw new UserInputValidationError("Wallet Secret not configured. Please set the CDP_WALLET_SECRET environment variable, or pass it as an option to the CdpClient constructor.");
    }
    const walletAuthToken = await generateWalletJwt({
      walletSecret: options.walletSecret,
      requestMethod: options.requestMethod,
      requestHost: options.requestHost,
      requestPath: options.requestPath,
      requestData: options.requestBody || {}
    });
    headers["X-Wallet-Auth"] = walletAuthToken;
  }
  headers["Correlation-Context"] = getCorrelationData(options.source, options.sourceVersion);
  return headers;
}
function requiresWalletAuth(requestMethod, requestPath) {
  return (requestPath?.includes("/accounts") || requestPath?.includes("/spend-permissions") || requestPath?.includes("/user-operations/prepare-and-send") || requestPath?.includes("/embedded-wallet-api/") || requestPath?.endsWith("/end-users") || requestPath?.endsWith("/end-users/import") || /\/end-users\/[^/]+\/evm$/.test(requestPath) || /\/end-users\/[^/]+\/evm-smart-account$/.test(requestPath) || /\/end-users\/[^/]+\/solana$/.test(requestPath)) && (requestMethod === "POST" || requestMethod === "DELETE" || requestMethod === "PUT");
}
function getCorrelationData(source, sourceVersion) {
  const data = {
    sdk_version: version,
    sdk_language: "typescript",
    source
  };
  if (sourceVersion) {
    data["source_version"] = sourceVersion;
  }
  return Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`).join(",");
}
function withAuth(axiosClient, options) {
  axiosClient.interceptors.request.use(async (axiosConfig) => {
    const method = axiosConfig.method?.toString().toUpperCase() || "GET";
    if (!axiosConfig.url) {
      throw new Error("URL is required for authentication");
    }
    const fullyQualifiedURL = axiosClient.getUri() + axiosConfig.url;
    const url = new URL(fullyQualifiedURL);
    if (axiosConfig.data) {
      axiosConfig.data = convertBigIntsToStrings(axiosConfig.data);
    }
    const headers = await getAuthHeaders({
      apiKeyId: options.apiKeyId,
      apiKeySecret: options.apiKeySecret,
      requestMethod: method,
      requestHost: url.host,
      requestPath: url.pathname,
      requestBody: axiosConfig.data,
      walletSecret: options.walletSecret,
      source: options.source,
      sourceVersion: options.sourceVersion,
      expiresIn: options.expiresIn
    });
    axiosConfig.headers = new AxiosHeaders({
      ...axiosConfig.headers,
      ...headers
    });
    if (options.debug) {
      console.log("Request:", {
        method,
        url: fullyQualifiedURL,
        headers: axiosConfig.headers,
        data: axiosConfig.data
      });
    }
    return axiosConfig;
  });
  if (options.debug) {
    axiosClient.interceptors.response.use((response) => {
      console.log("Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      return response;
    }, (error) => {
      const errorDetails = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data,
        message: error.message,
        cause: error.cause
      };
      console.error("Response Error:", errorDetails);
      return Promise.reject(error);
    });
  }
  return axiosClient;
}
let axiosInstance;
let config = void 0;
const configure = (options) => {
  const baseURL = options.basePath || "https://api.cdp.coinbase.com/platform";
  config = {
    ...options,
    basePath: baseURL
  };
  axiosInstance = axios.create({
    baseURL
  });
  axiosRetry(axiosInstance, {
    retryDelay: exponentialDelay
  });
  axiosInstance = withAuth(axiosInstance, {
    apiKeyId: options.apiKeyId,
    apiKeySecret: options.apiKeySecret,
    source: options.source || "sdk-openapi-client",
    sourceVersion: options.sourceVersion,
    walletSecret: options.walletSecret,
    expiresIn: options.expiresIn,
    debug: options.debugging
  });
};
const addIdempotencyKey = (config2, idempotencyKey) => {
  if (!idempotencyKey) {
    return config2;
  }
  return {
    ...config2,
    headers: {
      ...config2.headers || {},
      "X-Idempotency-Key": idempotencyKey
    }
  };
};
const cdpApiClient = async (config2, idempotencyKey) => {
  validateCall(config2);
  const configWithIdempotencyKey = addIdempotencyKey(config2, idempotencyKey);
  try {
    const response = await axiosInstance(configWithIdempotencyKey);
    return response.data;
  } catch (error) {
    if (error instanceof UserInputValidationError) {
      throw error;
    }
    if (axios.isAxiosError(error) && !error.response) {
      const errorMessage = (error.message || "").toLowerCase();
      const errorCode = error.code?.toLowerCase();
      if (errorCode === "econnrefused" || errorMessage.includes("connection refused")) {
        throw new NetworkError("network_connection_failed", "Unable to connect to CDP service. The service may be unavailable.", { code: error.code, message: error.message, retryable: true }, error.cause);
      } else if (errorCode === "etimedout" || errorCode === "econnaborted" || errorMessage.includes("timeout")) {
        throw new NetworkError("network_timeout", "Request timed out. Please try again.", { code: error.code, message: error.message, retryable: true }, error.cause);
      } else if (errorCode === "enotfound" || errorMessage.includes("getaddrinfo")) {
        throw new NetworkError("network_dns_failure", "DNS resolution failed. Please check your network connection.", { code: error.code, message: error.message, retryable: false }, error.cause);
      } else if (errorMessage.includes("network error") || errorMessage.includes("econnreset")) {
        throw new NetworkError("network_connection_failed", "Network error occurred. Please check your connection and try again.", { code: error.code, message: error.message, retryable: true }, error.cause);
      } else {
        throw new NetworkError("unknown", error.cause instanceof Error ? error.cause.message : error.message, { code: error.code, message: error.message, retryable: true }, error.cause);
      }
    }
    if (axios.isAxiosError(error) && error.response) {
      if (isOpenAPIError(error.response.data)) {
        throw new APIError(error.response.status, error.response.data.errorType, error.response.data.errorMessage, error.response.data.correlationId, error.response.data.errorLink, error.cause);
      } else {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        const isGatewayError = responseData && typeof responseData === "string" && (responseData.toLowerCase().includes("forbidden") || responseData.toLowerCase().includes("ip") || responseData.toLowerCase().includes("blocked") || responseData.toLowerCase().includes("gateway"));
        switch (statusCode) {
          case 401:
            throw new APIError(statusCode, "unauthorized", "Unauthorized.", void 0, `${ERROR_DOCS_PAGE_URL}#unauthorized`, error.cause);
          case 403:
            if (isGatewayError) {
              throw new NetworkError("network_ip_blocked", "Access denied. Your IP address may be blocked or restricted.", {
                code: "IP_BLOCKED",
                message: typeof responseData === "string" ? responseData : JSON.stringify(responseData),
                retryable: false
              }, error.cause);
            }
            throw new APIError(statusCode, "unauthorized", "Forbidden. You don't have permission to access this resource.", void 0, `${ERROR_DOCS_PAGE_URL}#forbidden`, error.cause);
          case 404:
            throw new APIError(statusCode, "not_found", "API not found.", void 0, `${ERROR_DOCS_PAGE_URL}#not_found`, error.cause);
          case 502:
            throw new APIError(statusCode, "bad_gateway", "Bad gateway.", void 0, `${ERROR_DOCS_PAGE_URL}`, error.cause);
          case 503:
            throw new APIError(statusCode, "service_unavailable", "Service unavailable. Please try again later.", void 0, `${ERROR_DOCS_PAGE_URL}`, error.cause);
          default: {
            let errorText = "";
            if (error.response.data) {
              try {
                errorText = JSON.stringify(error.response.data);
              } catch {
                errorText = String(error.response.data);
              }
            }
            const errorMessage = errorText ? `An unexpected error occurred: ${errorText}` : "An unexpected error occurred.";
            throw new APIError(statusCode, "unexpected_error", errorMessage, void 0, `${ERROR_DOCS_PAGE_URL}`, error.cause);
          }
        }
      }
    }
    throw new UnknownError("Something went wrong. Please reach out at https://discord.com/channels/1220414409550336183/1271495764580896789 for help.", error instanceof Error ? error : void 0);
  }
};
const validateCall = (config2) => {
  if (!axiosInstance.getUri() || axiosInstance.getUri() === "") {
    throw new Error("CDP client URI not configured. Call configure() first.");
  }
  if (!config2.url || config2.url === "") {
    throw new Error("AxiosRequestConfig URL is empty. This should never happen.");
  }
  if (!config2.method || config2.method === "") {
    throw new Error("AxiosRequestConfig method is empty. This should never happen.");
  }
};
const listEvmAccounts = (params, options) => {
  return cdpApiClient({ url: `/v2/evm/accounts`, method: "GET", params }, options);
};
const createEvmAccount = (createEvmAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createEvmAccountBody
  }, options);
};
const getEvmAccount = (address2, options) => {
  return cdpApiClient({ url: `/v2/evm/accounts/${address2}`, method: "GET" }, options);
};
const updateEvmAccount = (address2, updateEvmAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: updateEvmAccountBody
  }, options);
};
const getEvmAccountByName = (name, options) => {
  return cdpApiClient({ url: `/v2/evm/accounts/by-name/${name}`, method: "GET" }, options);
};
const sendEvmTransaction = (address2, sendEvmTransactionBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}/send/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendEvmTransactionBody
  }, options);
};
const signEvmTransaction = (address2, signEvmTransactionBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}/sign/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signEvmTransactionBody
  }, options);
};
const signEvmHash = (address2, signEvmHashBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}/sign`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signEvmHashBody
  }, options);
};
const signEvmMessage = (address2, signEvmMessageBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}/sign/message`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signEvmMessageBody
  }, options);
};
const signEvmTypedData = (address2, eIP712Message, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}/sign/typed-data`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: eIP712Message
  }, options);
};
const createEvmEip7702Delegation = (address2, createEvmEip7702DelegationBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}/eip7702/delegation`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createEvmEip7702DelegationBody
  }, options);
};
const getEvmEip7702DelegationOperationById = (delegationOperationId, options) => {
  return cdpApiClient({ url: `/v2/evm/eip7702/delegation-operations/${delegationOperationId}`, method: "GET" }, options);
};
const importEvmAccount = (importEvmAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/import`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: importEvmAccountBody
  }, options);
};
const exportEvmAccount = (address2, exportEvmAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/${address2}/export`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: exportEvmAccountBody
  }, options);
};
const exportEvmAccountByName = (name, exportEvmAccountByNameBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/accounts/export/by-name/${name}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: exportEvmAccountByNameBody
  }, options);
};
const evm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createEvmAccount,
  createEvmEip7702Delegation,
  exportEvmAccount,
  exportEvmAccountByName,
  getEvmAccount,
  getEvmAccountByName,
  getEvmEip7702DelegationOperationById,
  importEvmAccount,
  listEvmAccounts,
  sendEvmTransaction,
  signEvmHash,
  signEvmMessage,
  signEvmTransaction,
  signEvmTypedData,
  updateEvmAccount
});
const listEvmSmartAccounts = (params, options) => {
  return cdpApiClient({ url: `/v2/evm/smart-accounts`, method: "GET", params }, options);
};
const createEvmSmartAccount = (createEvmSmartAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/smart-accounts`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createEvmSmartAccountBody
  }, options);
};
const getEvmSmartAccountByName = (name, options) => {
  return cdpApiClient({ url: `/v2/evm/smart-accounts/by-name/${name}`, method: "GET" }, options);
};
const getEvmSmartAccount = (address2, options) => {
  return cdpApiClient({ url: `/v2/evm/smart-accounts/${address2}`, method: "GET" }, options);
};
const updateEvmSmartAccount = (address2, updateEvmSmartAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/smart-accounts/${address2}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: updateEvmSmartAccountBody
  }, options);
};
const prepareUserOperation = (address2, prepareUserOperationBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/smart-accounts/${address2}/user-operations`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: prepareUserOperationBody
  }, options);
};
const prepareAndSendUserOperation = (address2, prepareAndSendUserOperationBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/smart-accounts/${address2}/user-operations/prepare-and-send`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: prepareAndSendUserOperationBody
  }, options);
};
const getUserOperation$1 = (address2, userOpHash, options) => {
  return cdpApiClient({ url: `/v2/evm/smart-accounts/${address2}/user-operations/${userOpHash}`, method: "GET" }, options);
};
const sendUserOperation$1 = (address2, userOpHash, sendUserOperationBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/smart-accounts/${address2}/user-operations/${userOpHash}/send`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendUserOperationBody
  }, options);
};
const createSpendPermission = (address2, createSpendPermissionRequest, options) => {
  return cdpApiClient({
    url: `/v2/evm/smart-accounts/${address2}/spend-permissions`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createSpendPermissionRequest
  }, options);
};
const listSpendPermissions$1 = (address2, params, options) => {
  return cdpApiClient({ url: `/v2/evm/smart-accounts/${address2}/spend-permissions/list`, method: "GET", params }, options);
};
const revokeSpendPermission = (address2, revokeSpendPermissionRequest, options) => {
  return cdpApiClient({
    url: `/v2/evm/smart-accounts/${address2}/spend-permissions/revoke`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: revokeSpendPermissionRequest
  }, options);
};
const evmSmartAccounts = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createEvmSmartAccount,
  createSpendPermission,
  getEvmSmartAccount,
  getEvmSmartAccountByName,
  getUserOperation: getUserOperation$1,
  listEvmSmartAccounts,
  listSpendPermissions: listSpendPermissions$1,
  prepareAndSendUserOperation,
  prepareUserOperation,
  revokeSpendPermission,
  sendUserOperation: sendUserOperation$1,
  updateEvmSmartAccount
});
const getEvmSwapPrice = (params, options) => {
  return cdpApiClient({ url: `/v2/evm/swaps/quote`, method: "GET", params }, options);
};
const createEvmSwapQuote = (createEvmSwapQuoteBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/swaps`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createEvmSwapQuoteBody
  }, options);
};
const evmSwaps = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createEvmSwapQuote,
  getEvmSwapPrice
});
const listEvmTokenBalances = (network, address2, params, options) => {
  return cdpApiClient({ url: `/v2/evm/token-balances/${network}/${address2}`, method: "GET", params }, options);
};
const evmTokenBalances = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  listEvmTokenBalances
});
const listSolanaAccounts = (params, options) => {
  return cdpApiClient({ url: `/v2/solana/accounts`, method: "GET", params }, options);
};
const createSolanaAccount = (createSolanaAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createSolanaAccountBody
  }, options);
};
const getSolanaAccount = (address2, options) => {
  return cdpApiClient({ url: `/v2/solana/accounts/${address2}`, method: "GET" }, options);
};
const updateSolanaAccount = (address2, updateSolanaAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts/${address2}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: updateSolanaAccountBody
  }, options);
};
const getSolanaAccountByName = (name, options) => {
  return cdpApiClient({ url: `/v2/solana/accounts/by-name/${name}`, method: "GET" }, options);
};
const importSolanaAccount = (importSolanaAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts/import`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: importSolanaAccountBody
  }, options);
};
const exportSolanaAccount = (address2, exportSolanaAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts/${address2}/export`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: exportSolanaAccountBody
  }, options);
};
const exportSolanaAccountByName = (name, exportSolanaAccountByNameBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts/export/by-name/${name}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: exportSolanaAccountByNameBody
  }, options);
};
const signSolanaTransaction = (address2, signSolanaTransactionBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts/${address2}/sign/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signSolanaTransactionBody
  }, options);
};
const signSolanaMessage = (address2, signSolanaMessageBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts/${address2}/sign/message`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signSolanaMessageBody
  }, options);
};
const sendSolanaTransaction = (sendSolanaTransactionBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/accounts/send/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendSolanaTransactionBody
  }, options);
};
const solana = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSolanaAccount,
  exportSolanaAccount,
  exportSolanaAccountByName,
  getSolanaAccount,
  getSolanaAccountByName,
  importSolanaAccount,
  listSolanaAccounts,
  sendSolanaTransaction,
  signSolanaMessage,
  signSolanaTransaction,
  updateSolanaAccount
});
const listSolanaTokenBalances = (network, address2, params, options) => {
  return cdpApiClient({ url: `/v2/solana/token-balances/${network}/${address2}`, method: "GET", params }, options);
};
const solanaTokenBalances = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  listSolanaTokenBalances
});
const requestEvmFaucet = (requestEvmFaucetBody, options) => {
  return cdpApiClient({
    url: `/v2/evm/faucet`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: requestEvmFaucetBody
  }, options);
};
const requestSolanaFaucet = (requestSolanaFaucetBody, options) => {
  return cdpApiClient({
    url: `/v2/solana/faucet`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: requestSolanaFaucetBody
  }, options);
};
const faucets = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  requestEvmFaucet,
  requestSolanaFaucet
});
const listPolicies = (params, options) => {
  return cdpApiClient({ url: `/v2/policy-engine/policies`, method: "GET", params }, options);
};
const createPolicy = (createPolicyBody, options) => {
  return cdpApiClient({
    url: `/v2/policy-engine/policies`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createPolicyBody
  }, options);
};
const getPolicyById = (policyId, options) => {
  return cdpApiClient({ url: `/v2/policy-engine/policies/${policyId}`, method: "GET" }, options);
};
const deletePolicy = (policyId, options) => {
  return cdpApiClient({ url: `/v2/policy-engine/policies/${policyId}`, method: "DELETE" }, options);
};
const updatePolicy = (policyId, updatePolicyBody, options) => {
  return cdpApiClient({
    url: `/v2/policy-engine/policies/${policyId}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: updatePolicyBody
  }, options);
};
const policies = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createPolicy,
  deletePolicy,
  getPolicyById,
  listPolicies,
  updatePolicy
});
const listTokensForAccount = (network, address2, options) => {
  return cdpApiClient({ url: `/v2/data/evm/token-ownership/${network}/${address2}`, method: "GET" }, options);
};
const listDataTokenBalances = (network, address2, params, options) => {
  return cdpApiClient({ url: `/v2/data/evm/token-balances/${network}/${address2}`, method: "GET", params }, options);
};
const onchainData = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  listDataTokenBalances,
  listTokensForAccount
});
const signEvmTransactionWithEndUserAccount = (userId, signEvmTransactionWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/evm/sign/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signEvmTransactionWithEndUserAccountBody,
    params
  }, options);
};
const sendEvmTransactionWithEndUserAccount = (userId, sendEvmTransactionWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/evm/send/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendEvmTransactionWithEndUserAccountBody,
    params
  }, options);
};
const sendEvmAssetWithEndUserAccount = (userId, address2, asset, sendEvmAssetWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/evm/${address2}/send/${asset}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendEvmAssetWithEndUserAccountBody,
    params
  }, options);
};
const signEvmMessageWithEndUserAccount = (userId, signEvmMessageWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/evm/sign/message`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signEvmMessageWithEndUserAccountBody,
    params
  }, options);
};
const signEvmTypedDataWithEndUserAccount = (userId, signEvmTypedDataWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/evm/sign/typed-data`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signEvmTypedDataWithEndUserAccountBody,
    params
  }, options);
};
const getDelegationForEndUser = (userId, params, options) => {
  return cdpApiClient({ url: `/v2/embedded-wallet-api/end-users/${userId}/delegation`, method: "GET", params }, options);
};
const revokeDelegationForEndUser = (userId, revokeDelegationForEndUserBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/delegation`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    data: revokeDelegationForEndUserBody,
    params
  }, options);
};
const createDelegationForEndUserAccount = (userId, address2, createDelegationForEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/address/${address2}/delegation`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createDelegationForEndUserAccountBody,
    params
  }, options);
};
const getDelegationForEndUserAccount = (userId, address2, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/address/${address2}/delegation`,
    method: "GET",
    params
  }, options);
};
const revokeDelegationForEndUserAccount = (userId, address2, revokeDelegationForEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/address/${address2}/delegation`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    data: revokeDelegationForEndUserAccountBody,
    params
  }, options);
};
const createEvmEip7702DelegationWithEndUserAccount = (userId, createEvmEip7702DelegationWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/evm/eip7702/delegation`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createEvmEip7702DelegationWithEndUserAccountBody,
    params
  }, options);
};
const sendUserOperationWithEndUserAccount = (userId, address2, sendUserOperationWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/evm/smart-accounts/${address2}/send`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendUserOperationWithEndUserAccountBody,
    params
  }, options);
};
const signSolanaMessageWithEndUserAccount = (userId, signSolanaMessageWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/solana/sign/message`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signSolanaMessageWithEndUserAccountBody,
    params
  }, options);
};
const signSolanaTransactionWithEndUserAccount = (userId, signSolanaTransactionWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/solana/sign/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signSolanaTransactionWithEndUserAccountBody,
    params
  }, options);
};
const sendSolanaTransactionWithEndUserAccount = (userId, sendSolanaTransactionWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/solana/send/transaction`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendSolanaTransactionWithEndUserAccountBody,
    params
  }, options);
};
const sendSolanaAssetWithEndUserAccount = (userId, address2, asset, sendSolanaAssetWithEndUserAccountBody, params, options) => {
  return cdpApiClient({
    url: `/v2/embedded-wallet-api/end-users/${userId}/solana/${address2}/send/${asset}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sendSolanaAssetWithEndUserAccountBody,
    params
  }, options);
};
const endUserAccounts = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createDelegationForEndUserAccount,
  createEvmEip7702DelegationWithEndUserAccount,
  getDelegationForEndUser,
  getDelegationForEndUserAccount,
  revokeDelegationForEndUser,
  revokeDelegationForEndUserAccount,
  sendEvmAssetWithEndUserAccount,
  sendEvmTransactionWithEndUserAccount,
  sendSolanaAssetWithEndUserAccount,
  sendSolanaTransactionWithEndUserAccount,
  sendUserOperationWithEndUserAccount,
  signEvmMessageWithEndUserAccount,
  signEvmTransactionWithEndUserAccount,
  signEvmTypedDataWithEndUserAccount,
  signSolanaMessageWithEndUserAccount,
  signSolanaTransactionWithEndUserAccount
});
const createEndUser = (createEndUserBody, options) => {
  return cdpApiClient({
    url: `/v2/end-users`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createEndUserBody
  }, options);
};
const listEndUsers = (params, options) => {
  return cdpApiClient({ url: `/v2/end-users`, method: "GET", params }, options);
};
const validateEndUserAccessToken = (validateEndUserAccessTokenBody, options) => {
  return cdpApiClient({
    url: `/v2/end-users/auth/validate-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: validateEndUserAccessTokenBody
  }, options);
};
const getEndUser = (userId, options) => {
  return cdpApiClient({ url: `/v2/end-users/${userId}`, method: "GET" }, options);
};
const lookupEndUser = (params, options) => {
  return cdpApiClient({ url: `/v2/end-users/lookup`, method: "GET", params }, options);
};
const addEndUserEvmAccount = (userId, addEndUserEvmAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/end-users/${userId}/evm`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: addEndUserEvmAccountBody
  }, options);
};
const addEndUserEvmSmartAccount = (userId, addEndUserEvmSmartAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/end-users/${userId}/evm-smart-account`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: addEndUserEvmSmartAccountBody
  }, options);
};
const addEndUserSolanaAccount = (userId, addEndUserSolanaAccountBody, options) => {
  return cdpApiClient({
    url: `/v2/end-users/${userId}/solana`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: addEndUserSolanaAccountBody
  }, options);
};
const importEndUser = (importEndUserBody, options) => {
  return cdpApiClient({
    url: `/v2/end-users/import`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: importEndUserBody
  }, options);
};
const endUserAccountManagement = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addEndUserEvmAccount,
  addEndUserEvmSmartAccount,
  addEndUserSolanaAccount,
  createEndUser,
  getEndUser,
  importEndUser,
  listEndUsers,
  lookupEndUser,
  validateEndUserAccessToken
});
const listWebhookSubscriptions = (params, options) => {
  return cdpApiClient({ url: `/v2/data/webhooks/subscriptions`, method: "GET", params }, options);
};
const createWebhookSubscription$1 = (webhookSubscriptionRequest, options) => {
  return cdpApiClient({
    url: `/v2/data/webhooks/subscriptions`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: webhookSubscriptionRequest
  }, options);
};
const getWebhookSubscription = (subscriptionId, options) => {
  return cdpApiClient({ url: `/v2/data/webhooks/subscriptions/${subscriptionId}`, method: "GET" }, options);
};
const updateWebhookSubscription = (subscriptionId, webhookSubscriptionUpdateRequest, options) => {
  return cdpApiClient({
    url: `/v2/data/webhooks/subscriptions/${subscriptionId}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: webhookSubscriptionUpdateRequest
  }, options);
};
const deleteWebhookSubscription = (subscriptionId, options) => {
  return cdpApiClient({ url: `/v2/data/webhooks/subscriptions/${subscriptionId}`, method: "DELETE" }, options);
};
const listWebhookSubscriptionEvents = (subscriptionId, params, options) => {
  return cdpApiClient({ url: `/v2/data/webhooks/subscriptions/${subscriptionId}/events`, method: "GET", params }, options);
};
const webhooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createWebhookSubscription: createWebhookSubscription$1,
  deleteWebhookSubscription,
  getWebhookSubscription,
  listWebhookSubscriptionEvents,
  listWebhookSubscriptions,
  updateWebhookSubscription
});
const CdpOpenApiClient = {
  ...evm,
  ...evmSmartAccounts,
  ...evmSwaps,
  ...evmTokenBalances,
  ...webhooks,
  ...solana,
  ...solanaTokenBalances,
  ...faucets,
  ...onchainData,
  ...policies,
  ...endUserAccounts,
  ...endUserAccountManagement,
  configure
};
function resolveEvmAddress(endUser, override) {
  const address2 = override ?? endUser.evmAccountObjects[0]?.address;
  if (!address2) {
    throw new Error("No EVM account found on this end user. Provide an explicit address or add an EVM account first.");
  }
  return address2;
}
function resolveEvmSmartAccountAddress(endUser, override) {
  const address2 = override ?? endUser.evmSmartAccountObjects[0]?.address;
  if (!address2) {
    throw new Error("No EVM smart account found on this end user. Provide an explicit address or add an EVM smart account first.");
  }
  return address2;
}
function resolveSolanaAddress(endUser, override) {
  const address2 = override ?? endUser.solanaAccountObjects[0]?.address;
  if (!address2) {
    throw new Error("No Solana account found on this end user. Provide an explicit address or add a Solana account first.");
  }
  return address2;
}
function toEndUserAccount(apiClient, options) {
  const { endUser } = options;
  const endUserAccount = {
    // Pass through all properties from the OpenAPI EndUser
    userId: endUser.userId,
    authenticationMethods: endUser.authenticationMethods,
    mfaMethods: endUser.mfaMethods,
    evmAccounts: endUser.evmAccounts,
    evmAccountObjects: endUser.evmAccountObjects,
    evmSmartAccounts: endUser.evmSmartAccounts,
    evmSmartAccountObjects: endUser.evmSmartAccountObjects,
    solanaAccounts: endUser.solanaAccounts,
    solanaAccountObjects: endUser.solanaAccountObjects,
    createdAt: endUser.createdAt,
    // ─── Account Management Methods ───
    async addEvmAccount(idempotencyKey) {
      Analytics.trackAction({ action: "end_user_add_evm_account" });
      return apiClient.addEndUserEvmAccount(endUser.userId, {}, idempotencyKey);
    },
    async addEvmSmartAccount(smartAccountOptions) {
      Analytics.trackAction({ action: "end_user_add_evm_smart_account" });
      return apiClient.addEndUserEvmSmartAccount(endUser.userId, { enableSpendPermissions: smartAccountOptions.enableSpendPermissions }, smartAccountOptions.idempotencyKey);
    },
    async addSolanaAccount(idempotencyKey) {
      Analytics.trackAction({ action: "end_user_add_solana_account" });
      return apiClient.addEndUserSolanaAccount(endUser.userId, {}, idempotencyKey);
    },
    async getDelegation() {
      Analytics.trackAction({ action: "end_user_get_delegation" });
      return apiClient.getDelegationForEndUser(endUser.userId);
    },
    async revokeDelegation(idempotencyKey) {
      Analytics.trackAction({ action: "end_user_revoke_delegation" });
      await apiClient.revokeDelegationForEndUser(endUser.userId, {}, void 0, idempotencyKey);
    },
    // ─── Account-Scoped Delegation Methods ───
    async getDelegationForAccount(opts) {
      Analytics.trackAction({ action: "end_user_get_delegation_for_account" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      return apiClient.getDelegationForEndUserAccount(endUser.userId, address2);
    },
    async revokeDelegationForAccount(opts) {
      Analytics.trackAction({ action: "end_user_revoke_delegation_for_account" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      await apiClient.revokeDelegationForEndUserAccount(endUser.userId, address2, {}, void 0, opts.idempotencyKey);
    },
    // ─── Delegated EVM Sign Methods ───
    async signEvmTransaction(opts) {
      Analytics.trackAction({ action: "end_user_sign_evm_transaction" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      return apiClient.signEvmTransactionWithEndUserAccount(endUser.userId, { address: address2, transaction: opts.transaction }, void 0, opts.idempotencyKey);
    },
    async signEvmMessage(opts) {
      Analytics.trackAction({ action: "end_user_sign_evm_message" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      return apiClient.signEvmMessageWithEndUserAccount(endUser.userId, { address: address2, message: opts.message }, void 0, opts.idempotencyKey);
    },
    async signEvmTypedData(opts) {
      Analytics.trackAction({ action: "end_user_sign_evm_typed_data" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      return apiClient.signEvmTypedDataWithEndUserAccount(endUser.userId, { address: address2, typedData: opts.typedData }, void 0, opts.idempotencyKey);
    },
    // ─── Delegated EVM Send Methods ───
    async sendEvmTransaction(opts) {
      Analytics.trackAction({ action: "end_user_send_evm_transaction" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      return apiClient.sendEvmTransactionWithEndUserAccount(endUser.userId, { address: address2, transaction: opts.transaction, network: opts.network }, void 0, opts.idempotencyKey);
    },
    async sendEvmAsset(opts) {
      Analytics.trackAction({ action: "end_user_send_evm_asset" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      const asset = opts.asset ?? "usdc";
      return apiClient.sendEvmAssetWithEndUserAccount(endUser.userId, address2, asset, {
        to: opts.to,
        amount: opts.amount,
        network: opts.network,
        useCdpPaymaster: opts.useCdpPaymaster,
        paymasterUrl: opts.paymasterUrl
      }, void 0, opts.idempotencyKey);
    },
    async sendUserOperation(opts) {
      Analytics.trackAction({ action: "end_user_send_user_operation" });
      const address2 = resolveEvmSmartAccountAddress(endUser, opts.address);
      return apiClient.sendUserOperationWithEndUserAccount(endUser.userId, address2, {
        network: opts.network,
        calls: opts.calls,
        useCdpPaymaster: opts.useCdpPaymaster,
        paymasterUrl: opts.paymasterUrl,
        dataSuffix: opts.dataSuffix
      }, void 0, opts.idempotencyKey);
    },
    // ─── Delegated EVM EIP-7702 Delegation Method ───
    async createEvmEip7702Delegation(opts) {
      Analytics.trackAction({ action: "end_user_create_evm_eip7702_delegation" });
      const address2 = resolveEvmAddress(endUser, opts.address);
      return apiClient.createEvmEip7702DelegationWithEndUserAccount(endUser.userId, {
        address: address2,
        network: opts.network,
        enableSpendPermissions: opts.enableSpendPermissions
      }, void 0, opts.idempotencyKey);
    },
    // ─── Delegated Solana Sign Methods ───
    async signSolanaMessage(opts) {
      Analytics.trackAction({ action: "end_user_sign_solana_message" });
      const address2 = resolveSolanaAddress(endUser, opts.address);
      return apiClient.signSolanaMessageWithEndUserAccount(endUser.userId, { address: address2, message: opts.message }, void 0, opts.idempotencyKey);
    },
    async signSolanaTransaction(opts) {
      Analytics.trackAction({ action: "end_user_sign_solana_transaction" });
      const address2 = resolveSolanaAddress(endUser, opts.address);
      return apiClient.signSolanaTransactionWithEndUserAccount(endUser.userId, { address: address2, transaction: opts.transaction }, void 0, opts.idempotencyKey);
    },
    // ─── Delegated Solana Send Methods ───
    async sendSolanaTransaction(opts) {
      Analytics.trackAction({ action: "end_user_send_solana_transaction" });
      const address2 = resolveSolanaAddress(endUser, opts.address);
      return apiClient.sendSolanaTransactionWithEndUserAccount(endUser.userId, { address: address2, transaction: opts.transaction, network: opts.network }, void 0, opts.idempotencyKey);
    },
    async sendSolanaAsset(opts) {
      Analytics.trackAction({ action: "end_user_send_solana_asset" });
      const address2 = resolveSolanaAddress(endUser, opts.address);
      const asset = opts.asset ?? "usdc";
      return apiClient.sendSolanaAssetWithEndUserAccount(endUser.userId, address2, asset, {
        to: opts.to,
        amount: opts.amount,
        network: opts.network,
        createRecipientAta: opts.createRecipientAta
      }, void 0, opts.idempotencyKey);
    }
  };
  return endUserAccount;
}
class EndUserClient {
  /**
   * Creates an end user. An end user is an entity that can own CDP EVM accounts,
   * EVM smart accounts, and/or Solana accounts.
   *
   * @param options - The options for creating an end user.
   *
   * @returns A promise that resolves to the created end user.
   *
   * @example **Create an end user with an email authentication method**
   *          ```ts
   *          const endUser = await cdp.endUser.createEndUser({
   *            authenticationMethods: [
   *              { type: "email", email: "user@example.com" }
   *            ]
   *          });
   *          console.log(endUser.userId);
   *          ```
   *
   * @example **Create an end user with an EVM EOA account**
   *          ```ts
   *          const endUser = await cdp.endUser.createEndUser({
   *            authenticationMethods: [
   *              { type: "email", email: "user@example.com" }
   *            ],
   *            evmAccount: { createSmartAccount: false }
   *          });
   *          ```
   */
  async createEndUser(options) {
    Analytics.trackAction({
      action: "create_end_user"
    });
    const userId = options.userId ?? randomUUID();
    const endUser = await CdpOpenApiClient.createEndUser({
      ...options,
      userId
    }, options.idempotencyKey);
    return toEndUserAccount(CdpOpenApiClient, { endUser });
  }
  /**
   * Lists end users belonging to the developer's CDP Project.
   * By default, the response is sorted by creation date in ascending order and paginated to 20 users per page.
   *
   * @param options - The options for listing end users.
   *
   * @returns A promise that resolves to a paginated list of end users.
   *
   * @example **List all end users**
   *          ```ts
   *          const result = await cdp.endUsers.listEndUsers();
   *          console.log(result.endUsers);
   *          ```
   *
   * @example **With pagination**
   *          ```ts
   *          let page = await cdp.endUsers.listEndUsers({ pageSize: 10 });
   *
   *          while (page.nextPageToken) {
   *            page = await cdp.endUsers.listEndUsers({
   *              pageSize: 10,
   *              pageToken: page.nextPageToken
   *            });
   *          }
   *          ```
   *
   * @example **With sorting**
   *          ```ts
   *          const result = await cdp.endUsers.listEndUsers({
   *            sort: ['createdAt=desc']
   *          });
   *          ```
   */
  async listEndUsers(options = {}) {
    Analytics.trackAction({
      action: "list_end_users"
    });
    const params = {
      ...options,
      ...options.sort && { sort: options.sort.join(",") }
    };
    return CdpOpenApiClient.listEndUsers(params);
  }
  /**
   * Gets an end user by their unique identifier.
   *
   * @param options - The options for getting an end user.
   *
   * @returns A promise that resolves to the end user.
   *
   * @example **Get an end user by ID**
   *          ```ts
   *          const endUser = await cdp.endUser.getEndUser({
   *            userId: "user-123"
   *          });
   *          console.log(endUser.userId);
   *          ```
   */
  async getEndUser(options) {
    Analytics.trackAction({
      action: "get_end_user"
    });
    const { userId } = options;
    const endUser = await CdpOpenApiClient.getEndUser(userId);
    return toEndUserAccount(CdpOpenApiClient, { endUser });
  }
  /**
   * Adds an EVM EOA (Externally Owned Account) to an existing end user. End users can have up to 10 EVM accounts.
   *
   * @param options - The options for adding an EVM account.
   *
   * @returns A promise that resolves to the newly created EVM EOA account.
   *
   * @example **Add an EVM EOA account to an existing end user**
   *          ```ts
   *          const result = await cdp.endUser.addEndUserEvmAccount({
   *            userId: "user-123"
   *          });
   *          console.log(result.evmAccount.address);
   *          ```
   */
  async addEndUserEvmAccount(options) {
    Analytics.trackAction({
      action: "add_end_user_evm_account"
    });
    const { userId, idempotencyKey } = options;
    return CdpOpenApiClient.addEndUserEvmAccount(userId, {}, idempotencyKey);
  }
  /**
   * Adds an EVM smart account to an existing end user. This also creates a new EVM EOA account to serve as the owner of the smart account.
   *
   * @param options - The options for adding an EVM smart account.
   *
   * @returns A promise that resolves to the newly created EVM smart account.
   *
   * @example **Add an EVM smart account to an existing end user**
   *          ```ts
   *          const result = await cdp.endUser.addEndUserEvmSmartAccount({
   *            userId: "user-123",
   *            enableSpendPermissions: false
   *          });
   *          console.log(result.evmSmartAccount.address);
   *          ```
   *
   * @example **Add an EVM smart account with spend permissions enabled**
   *          ```ts
   *          const result = await cdp.endUser.addEndUserEvmSmartAccount({
   *            userId: "user-123",
   *            enableSpendPermissions: true
   *          });
   *          console.log(result.evmSmartAccount.address);
   *          ```
   */
  async addEndUserEvmSmartAccount(options) {
    Analytics.trackAction({
      action: "add_end_user_evm_smart_account"
    });
    const { userId, enableSpendPermissions, idempotencyKey } = options;
    return CdpOpenApiClient.addEndUserEvmSmartAccount(userId, { enableSpendPermissions }, idempotencyKey);
  }
  /**
   * Adds a Solana account to an existing end user. End users can have up to 10 Solana accounts.
   *
   * @param options - The options for adding a Solana account.
   *
   * @returns A promise that resolves to the newly created Solana account.
   *
   * @example **Add a Solana account to an existing end user**
   *          ```ts
   *          const result = await cdp.endUser.addEndUserSolanaAccount({
   *            userId: "user-123"
   *          });
   *          console.log(result.solanaAccount.address);
   *          ```
   */
  async addEndUserSolanaAccount(options) {
    Analytics.trackAction({
      action: "add_end_user_solana_account"
    });
    const { userId, idempotencyKey } = options;
    return CdpOpenApiClient.addEndUserSolanaAccount(userId, {}, idempotencyKey);
  }
  /**
   * Gets the active delegation for the specified end user, if one exists.
   * This operation can be performed by the end user themselves or by a developer using their API key.
   *
   * @param options - The options for getting the delegation.
   *
   * @returns A promise that resolves to the delegation details including its expiry.
   *
   * @example **Get the active delegation for an end user**
   *          ```ts
   *          const delegation = await cdp.endUser.getDelegationForEndUser({
   *            userId: "user-123"
   *          });
   *          console.log(delegation.expiresAt);
   *          ```
   */
  async getDelegationForEndUser(options) {
    Analytics.trackAction({
      action: "get_delegation_for_end_user"
    });
    const { userId } = options;
    return CdpOpenApiClient.getDelegationForEndUser(userId);
  }
  /**
   * Revokes all active delegations for the specified end user.
   * This operation can be performed by the end user themselves or by a developer using their API key.
   *
   * @param options - The options for revoking the delegation.
   *
   * @returns A promise that resolves when the delegation has been revoked.
   *
   * @example **Revoke all delegations for an end user**
   *          ```ts
   *          await cdp.endUser.revokeDelegationForEndUser({
   *            userId: "user-123"
   *          });
   *          ```
   */
  async revokeDelegationForEndUser(options) {
    Analytics.trackAction({
      action: "revoke_delegation_for_end_user"
    });
    const { userId, idempotencyKey } = options;
    await CdpOpenApiClient.revokeDelegationForEndUser(userId, {}, void 0, idempotencyKey);
  }
  // ─── Account-Scoped Delegation Methods ───
  /**
   * Gets the active account-scoped delegation for the specified end user account address, if one exists.
   *
   * @param options - The options for getting the account-scoped delegation.
   *
   * @returns A promise that resolves to the delegation details including its expiry.
   *
   * @example **Get the account-scoped delegation for an address**
   *          ```ts
   *          const delegation = await cdp.endUser.getDelegationForEndUserAccount({
   *            userId: "user-123",
   *            address: "0x1234...",
   *          });
   *          console.log(delegation.expiresAt);
   *          ```
   */
  async getDelegationForEndUserAccount(options) {
    Analytics.trackAction({
      action: "get_delegation_for_end_user_account"
    });
    const { userId, address: address2 } = options;
    return CdpOpenApiClient.getDelegationForEndUserAccount(userId, address2);
  }
  /**
   * Revokes the active account-scoped delegation for the specified end user account address.
   * Other account-scoped delegations for the same user are unaffected.
   *
   * @param options - The options for revoking the account-scoped delegation.
   *
   * @returns A promise that resolves when the delegation has been revoked.
   *
   * @example **Revoke the account-scoped delegation for an address**
   *          ```ts
   *          await cdp.endUser.revokeDelegationForEndUserAccount({
   *            userId: "user-123",
   *            address: "0x1234...",
   *          });
   *          ```
   */
  async revokeDelegationForEndUserAccount(options) {
    Analytics.trackAction({
      action: "revoke_delegation_for_end_user_account"
    });
    const { userId, address: address2, idempotencyKey } = options;
    await CdpOpenApiClient.revokeDelegationForEndUserAccount(userId, address2, {}, void 0, idempotencyKey);
  }
  // ─── Delegated EVM Sign Methods ───
  /**
   * Signs an EVM transaction on behalf of an end user using a delegation.
   *
   * @param options - The options for signing an EVM transaction.
   *
   * @returns A promise that resolves to the signed transaction.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.signEvmTransaction({
   *   userId: "user-123",
   *   address: "0x1234...",
   *   transaction: "0x02..."
   * });
   * console.log(result.signedTransaction);
   * ```
   */
  async signEvmTransaction(options) {
    Analytics.trackAction({ action: "end_user_sign_evm_transaction" });
    return CdpOpenApiClient.signEvmTransactionWithEndUserAccount(options.userId, { address: options.address, transaction: options.transaction }, void 0, options.idempotencyKey);
  }
  /**
   * Signs an EVM message (EIP-191) on behalf of an end user using a delegation.
   *
   * @param options - The options for signing an EVM message.
   *
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.signEvmMessage({
   *   userId: "user-123",
   *   address: "0x1234...",
   *   message: "Hello, World!"
   * });
   * console.log(result.signature);
   * ```
   */
  async signEvmMessage(options) {
    Analytics.trackAction({ action: "end_user_sign_evm_message" });
    return CdpOpenApiClient.signEvmMessageWithEndUserAccount(options.userId, { address: options.address, message: options.message }, void 0, options.idempotencyKey);
  }
  /**
   * Signs EVM EIP-712 typed data on behalf of an end user using a delegation.
   *
   * @param options - The options for signing EVM typed data.
   *
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.signEvmTypedData({
   *   userId: "user-123",
   *   address: "0x1234...",
   *   typedData: { domain: {}, types: {}, primaryType: "...", message: {} }
   * });
   * console.log(result.signature);
   * ```
   */
  async signEvmTypedData(options) {
    Analytics.trackAction({ action: "end_user_sign_evm_typed_data" });
    return CdpOpenApiClient.signEvmTypedDataWithEndUserAccount(options.userId, { address: options.address, typedData: options.typedData }, void 0, options.idempotencyKey);
  }
  // ─── Delegated EVM Send Methods ───
  /**
   * Sends an EVM transaction on behalf of an end user using a delegation.
   *
   * @param options - The options for sending an EVM transaction.
   *
   * @returns A promise that resolves to the transaction hash.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.sendEvmTransaction({
   *   userId: "user-123",
   *   address: "0x1234...",
   *   transaction: "0x02...",
   *   network: "base-sepolia"
   * });
   * console.log(result.transactionHash);
   * ```
   */
  async sendEvmTransaction(options) {
    Analytics.trackAction({ action: "end_user_send_evm_transaction" });
    return CdpOpenApiClient.sendEvmTransactionWithEndUserAccount(options.userId, { address: options.address, transaction: options.transaction, network: options.network }, void 0, options.idempotencyKey);
  }
  /**
   * Sends an EVM asset (e.g. USDC) on behalf of an end user using a delegation.
   *
   * @param options - The options for sending an EVM asset.
   *
   * @returns A promise that resolves to the transaction result.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.sendEvmAsset({
   *   userId: "user-123",
   *   address: "0x1234...",
   *   to: "0xabcd...",
   *   amount: "1000000",
   *   network: "base-sepolia"
   * });
   * console.log(result.transactionHash);
   * ```
   */
  async sendEvmAsset(options) {
    Analytics.trackAction({ action: "end_user_send_evm_asset" });
    const asset = options.asset ?? "usdc";
    return CdpOpenApiClient.sendEvmAssetWithEndUserAccount(options.userId, options.address, asset, {
      to: options.to,
      amount: options.amount,
      network: options.network,
      useCdpPaymaster: options.useCdpPaymaster,
      paymasterUrl: options.paymasterUrl
    }, void 0, options.idempotencyKey);
  }
  /**
   * Sends a user operation on behalf of an end user using a delegation.
   *
   * @param options - The options for sending a user operation.
   *
   * @returns A promise that resolves to the user operation result.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.sendUserOperation({
   *   userId: "user-123",
   *   address: "0x1234...",
   *   network: "base-sepolia",
   *   calls: [{ to: "0xabcd...", value: "0", data: "0x" }],
   *   useCdpPaymaster: true
   * });
   * ```
   */
  async sendUserOperation(options) {
    Analytics.trackAction({ action: "end_user_send_user_operation" });
    return CdpOpenApiClient.sendUserOperationWithEndUserAccount(options.userId, options.address, {
      network: options.network,
      calls: options.calls,
      useCdpPaymaster: options.useCdpPaymaster,
      paymasterUrl: options.paymasterUrl,
      dataSuffix: options.dataSuffix
    }, void 0, options.idempotencyKey);
  }
  // ─── Delegated EVM EIP-7702 Delegation Method ───
  /**
   * Creates an EVM EIP-7702 delegation on behalf of an end user.
   *
   * @param options - The options for creating an EIP-7702 delegation.
   *
   * @returns A promise that resolves to the delegation operation ID.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.createEvmEip7702Delegation({
   *   userId: "user-123",
   *   address: "0x1234...",
   *   network: "base-sepolia"
   * });
   * console.log(result.delegationOperationId);
   * ```
   */
  async createEvmEip7702Delegation(options) {
    Analytics.trackAction({ action: "end_user_create_evm_eip7702_delegation" });
    return CdpOpenApiClient.createEvmEip7702DelegationWithEndUserAccount(options.userId, {
      address: options.address,
      network: options.network,
      enableSpendPermissions: options.enableSpendPermissions
    }, void 0, options.idempotencyKey);
  }
  // ─── Delegated Solana Sign Methods ───
  /**
   * Signs a Solana message on behalf of an end user using a delegation.
   *
   * @param options - The options for signing a Solana message.
   *
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.signSolanaMessage({
   *   userId: "user-123",
   *   address: "So1ana...",
   *   message: "base64message..."
   * });
   * console.log(result.signature);
   * ```
   */
  async signSolanaMessage(options) {
    Analytics.trackAction({ action: "end_user_sign_solana_message" });
    return CdpOpenApiClient.signSolanaMessageWithEndUserAccount(options.userId, { address: options.address, message: options.message }, void 0, options.idempotencyKey);
  }
  /**
   * Signs a Solana transaction on behalf of an end user using a delegation.
   *
   * @param options - The options for signing a Solana transaction.
   *
   * @returns A promise that resolves to the signed transaction.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.signSolanaTransaction({
   *   userId: "user-123",
   *   address: "So1ana...",
   *   transaction: "base64tx..."
   * });
   * console.log(result.signedTransaction);
   * ```
   */
  async signSolanaTransaction(options) {
    Analytics.trackAction({ action: "end_user_sign_solana_transaction" });
    return CdpOpenApiClient.signSolanaTransactionWithEndUserAccount(options.userId, { address: options.address, transaction: options.transaction }, void 0, options.idempotencyKey);
  }
  // ─── Delegated Solana Send Methods ───
  /**
   * Sends a Solana transaction on behalf of an end user using a delegation.
   *
   * @param options - The options for sending a Solana transaction.
   *
   * @returns A promise that resolves to the transaction signature.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.sendSolanaTransaction({
   *   userId: "user-123",
   *   address: "So1ana...",
   *   transaction: "base64tx...",
   *   network: "solana-devnet"
   * });
   * console.log(result.transactionSignature);
   * ```
   */
  async sendSolanaTransaction(options) {
    Analytics.trackAction({ action: "end_user_send_solana_transaction" });
    return CdpOpenApiClient.sendSolanaTransactionWithEndUserAccount(options.userId, {
      address: options.address,
      transaction: options.transaction,
      network: options.network
    }, void 0, options.idempotencyKey);
  }
  /**
   * Sends a Solana asset (e.g. USDC) on behalf of an end user using a delegation.
   *
   * @param options - The options for sending a Solana asset.
   *
   * @returns A promise that resolves to the transaction signature.
   *
   * @example
   * ```ts
   * const result = await cdp.endUser.sendSolanaAsset({
   *   userId: "user-123",
   *   address: "So1ana...",
   *   to: "Recipi...",
   *   amount: "1000000",
   *   network: "solana-devnet"
   * });
   * console.log(result.transactionSignature);
   * ```
   */
  async sendSolanaAsset(options) {
    Analytics.trackAction({ action: "end_user_send_solana_asset" });
    const asset = options.asset ?? "usdc";
    return CdpOpenApiClient.sendSolanaAssetWithEndUserAccount(options.userId, options.address, asset, {
      to: options.to,
      amount: options.amount,
      network: options.network,
      createRecipientAta: options.createRecipientAta
    }, void 0, options.idempotencyKey);
  }
  /**
   * Validates an end user's access token. Throws an error if the access token is invalid.
   *
   * @param options - The options for validating an access token.
   *
   * @returns The end user object if the access token is valid.
   */
  async validateAccessToken(options) {
    Analytics.trackAction({
      action: "validate_access_token"
    });
    const { accessToken } = options;
    const endUser = await CdpOpenApiClient.validateEndUserAccessToken({
      accessToken
    });
    return toEndUserAccount(CdpOpenApiClient, { endUser });
  }
  /**
   * Imports an existing private key for an end user.
   *
   * @param options - The options for importing an end user.
   *
   * @returns A promise that resolves to the imported end user.
   *
   * @example **Import an end user with an EVM private key**
   *          ```ts
   *          const endUser = await cdp.endUser.importEndUser({
   *            authenticationMethods: [
   *              { type: "sms", phoneNumber: "+12055555555" }
   *            ],
   *            privateKey: "0x...",
   *            keyType: "evm"
   *          });
   *          ```
   *
   * @example **Import an end user with a Solana private key (base58)**
   *          ```ts
   *          const endUser = await cdp.endUser.importEndUser({
   *            authenticationMethods: [
   *              { type: "sms", phoneNumber: "+12055555555" }
   *            ],
   *            privateKey: "3Kzj...",
   *            keyType: "solana"
   *          });
   *          ```
   */
  async importEndUser(options) {
    Analytics.trackAction({
      action: "import_end_user"
    });
    const userId = options.userId ?? randomUUID();
    let privateKeyBytes;
    if (options.keyType === "evm") {
      if (typeof options.privateKey !== "string") {
        throw new UserInputValidationError("EVM private key must be a hex string");
      }
      const privateKeyHex = options.privateKey.startsWith("0x") ? options.privateKey.slice(2) : options.privateKey;
      if (!/^[0-9a-fA-F]+$/.test(privateKeyHex)) {
        throw new UserInputValidationError("Private key must be a valid hexadecimal string");
      }
      privateKeyBytes = Buffer.from(privateKeyHex, "hex");
    } else {
      if (typeof options.privateKey === "string") {
        privateKeyBytes = bs58.decode(options.privateKey);
      } else {
        privateKeyBytes = options.privateKey;
      }
      if (privateKeyBytes.length !== 32 && privateKeyBytes.length !== 64) {
        throw new UserInputValidationError("Invalid Solana private key length");
      }
      if (privateKeyBytes.length === 64) {
        privateKeyBytes = privateKeyBytes.subarray(0, 32);
      }
    }
    const encryptedPrivateKey = publicEncrypt({
      key: options.encryptionPublicKey ?? ImportAccountPublicRSAKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256"
    }, privateKeyBytes);
    const endUser = await CdpOpenApiClient.importEndUser({
      userId,
      authenticationMethods: options.authenticationMethods,
      encryptedPrivateKey: encryptedPrivateKey.toString("base64"),
      keyType: options.keyType
    }, options.idempotencyKey);
    return toEndUserAccount(CdpOpenApiClient, { endUser });
  }
}
function mapChainToNetwork(chain) {
  const chainIdToNetwork = {
    // Ethereum networks
    1: "ethereum",
    11155111: "ethereum-sepolia",
    17e3: "ethereum-hoodi",
    // Holesky
    // Base networks
    8453: "base",
    84532: "base-sepolia",
    // Polygon networks
    137: "polygon",
    80001: "polygon-mumbai",
    // Arbitrum networks
    42161: "arbitrum",
    421614: "arbitrum-sepolia",
    // Optimism networks
    10: "optimism",
    11155420: "optimism-sepolia"
  };
  return chainIdToNetwork[chain.id];
}
const NETWORK_CAPABILITIES = {
  base: {
    listTokenBalances: true,
    requestFaucet: false,
    quoteFund: true,
    fund: true,
    waitForFundOperationReceipt: true,
    transfer: true,
    sendTransaction: true,
    quoteSwap: true,
    swap: true,
    useSpendPermission: true
  },
  "base-sepolia": {
    listTokenBalances: true,
    requestFaucet: true,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: true,
    sendTransaction: true,
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  },
  ethereum: {
    listTokenBalances: true,
    requestFaucet: false,
    quoteFund: false,
    // Only base is supported for quoteFund
    fund: false,
    // Only base is supported for fund
    waitForFundOperationReceipt: false,
    transfer: true,
    sendTransaction: true,
    quoteSwap: true,
    swap: true,
    useSpendPermission: true
  },
  "ethereum-sepolia": {
    listTokenBalances: false,
    requestFaucet: true,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: true,
    sendTransaction: true,
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  },
  "ethereum-hoodi": {
    listTokenBalances: false,
    requestFaucet: true,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: false,
    swap: false,
    useSpendPermission: false
  },
  optimism: {
    listTokenBalances: false,
    requestFaucet: false,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: true,
    swap: true,
    useSpendPermission: true
  },
  "optimism-sepolia": {
    listTokenBalances: false,
    requestFaucet: true,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  },
  arbitrum: {
    listTokenBalances: false,
    requestFaucet: true,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: true,
    swap: true,
    useSpendPermission: true
  },
  "arbitrum-sepolia": {
    listTokenBalances: false,
    requestFaucet: true,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  },
  avalanche: {
    listTokenBalances: false,
    requestFaucet: false,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  },
  binance: {
    listTokenBalances: false,
    requestFaucet: false,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  },
  polygon: {
    listTokenBalances: false,
    requestFaucet: false,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  },
  zora: {
    listTokenBalances: false,
    requestFaucet: false,
    quoteFund: false,
    fund: false,
    waitForFundOperationReceipt: false,
    transfer: false,
    sendTransaction: true,
    // Always available (uses wallet client for non-base networks)
    quoteSwap: false,
    swap: false,
    useSpendPermission: true
  }
};
function isMethodSupportedOnNetwork(method, network) {
  const networkConfig = NETWORK_CAPABILITIES[network];
  return networkConfig ? networkConfig[method] : false;
}
async function getBaseNodeRpcUrl(network) {
  if (!config) {
    return;
  }
  try {
    const basePath = config.basePath?.replace("/platform", "");
    const jwt = await generateJwt({
      apiKeyId: config.apiKeyId,
      apiKeySecret: config.apiKeySecret,
      requestMethod: "GET",
      requestHost: basePath.replace("https://", ""),
      requestPath: "/apikeys/v1/tokens/active"
    });
    const response = await fetch(`${basePath}/apikeys/v1/tokens/active`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    return `${basePath}/rpc/v1/${network}/${json.id}`;
  } catch {
    return;
  }
}
const NETWORK_TO_CHAIN_MAP = {
  base,
  "base-sepolia": baseSepolia,
  ethereum: mainnet,
  "ethereum-sepolia": sepolia,
  polygon,
  "polygon-mumbai": polygonMumbai,
  arbitrum,
  "arbitrum-sepolia": arbitrumSepolia,
  optimism,
  "optimism-sepolia": optimismSepolia
};
function resolveNetworkToChain(network) {
  const chain = NETWORK_TO_CHAIN_MAP[network.toLowerCase()];
  if (!chain) {
    throw new Error(`Unsupported network identifier: ${network}`);
  }
  return chain;
}
function getChain(id) {
  const chainList = Object.values(chains);
  const found = chainList.find((chain) => chain.id === id);
  if (!found)
    throw new Error(`Unsupported chain ID: ${id}`);
  return found;
}
function isNetworkIdentifier(input) {
  const normalizedInput = input.toLowerCase();
  return NETWORK_TO_CHAIN_MAP[normalizedInput] !== void 0;
}
async function resolveNodeUrlToChain(nodeUrl) {
  if (!isValidUrl(nodeUrl)) {
    throw new UserInputValidationError(`Invalid URL format: ${nodeUrl}`);
  }
  const tempPublicClient = createPublicClient({
    transport: http(nodeUrl)
  });
  try {
    const chainId = await tempPublicClient.getChainId();
    const chain = getChain(Number(chainId));
    return chain;
  } catch (error) {
    throw new Error(`Failed to resolve chain ID from Node URL: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
function isValidUrl(input) {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}
async function resolveViemClients(options) {
  const { networkOrNodeUrl } = options;
  let chain;
  if (isNetworkIdentifier(networkOrNodeUrl)) {
    const rpcUrl = networkOrNodeUrl === "base" || networkOrNodeUrl === "base-sepolia" ? await getBaseNodeRpcUrl(networkOrNodeUrl) : void 0;
    chain = resolveNetworkToChain(networkOrNodeUrl);
    const publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl)
    });
    const walletClient = createWalletClient({
      account: toAccount(options.account),
      chain,
      transport: http(rpcUrl)
    });
    return {
      chain,
      publicClient,
      walletClient
    };
  }
  try {
    chain = await resolveNodeUrlToChain(networkOrNodeUrl);
    const publicClient = createPublicClient({
      chain,
      transport: http(networkOrNodeUrl)
    });
    const walletClient = createWalletClient({
      account: toAccount(options.account),
      chain,
      transport: http(networkOrNodeUrl)
    });
    return {
      chain,
      publicClient,
      walletClient
    };
  } catch (error) {
    if (error instanceof Error && (error.message.includes("Invalid URL format") || error.message.includes("Unsupported chain ID") || error.message.includes("Failed to resolve chain ID"))) {
      throw error;
    }
    throw new UserInputValidationError(`Unsupported network identifier or invalid Node URL: ${networkOrNodeUrl}`);
  }
}
const addressMap = {
  base: {
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
  },
  "base-sepolia": {
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
  }
};
function getErc20Address(token, network) {
  return addressMap[network]?.[token] ?? token;
}
async function transferWithViem(walletClient, from, transferArgs) {
  const token = transferArgs.token;
  const to = typeof transferArgs.to === "string" ? transferArgs.to : transferArgs.to.address;
  const value = transferArgs.amount;
  if (token === "eth") {
    const hash2 = await walletClient.sendTransaction({
      account: from.address,
      to,
      value
    });
    return { transactionHash: hash2 };
  }
  const network = mapChainToNetwork(walletClient.chain);
  const erc20Address = getErc20Address(token, network);
  await walletClient.sendTransaction({
    account: from.address,
    to: erc20Address,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [to, value]
    })
  });
  const hash = await walletClient.sendTransaction({
    account: from.address,
    to: erc20Address,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, value]
    })
  });
  return { transactionHash: hash };
}
async function toNetworkScopedEvmServerAccount(options) {
  const { publicClient, walletClient, chain } = await resolveViemClients({
    networkOrNodeUrl: options.network,
    account: options.account
  });
  const resolvedNetworkName = mapChainToNetwork(chain) ?? options.network;
  const shouldUseApiForSends = chain.id === base.id || chain.id === baseSepolia.id || chain.id === mainnet.id || chain.id === sepolia.id;
  const account = {
    address: options.account.address,
    network: options.network,
    signMessage: options.account.signMessage,
    sign: options.account.sign,
    signTransaction: options.account.signTransaction,
    signTypedData: options.account.signTypedData,
    name: options.account.name,
    type: "evm-server",
    policies: options.account.policies,
    sendTransaction: async (txOpts) => {
      if (shouldUseApiForSends) {
        return options.account.sendTransaction({
          ...txOpts,
          network: mapChainToNetwork(chain)
        });
      } else {
        Analytics.trackAction({
          action: "send_transaction",
          accountType: "evm_server",
          properties: {
            network: options.network,
            managed: true
          }
        });
        const hash = await walletClient.sendTransaction(txOpts.transaction);
        return { transactionHash: hash };
      }
    },
    transfer: async (transferArgs) => {
      if (shouldUseApiForSends) {
        return options.account.transfer({
          ...transferArgs,
          network: mapChainToNetwork(chain)
        });
      } else {
        Analytics.trackAction({
          action: "transfer",
          accountType: "evm_server",
          properties: {
            network: options.network,
            managed: true
          }
        });
        return transferWithViem(walletClient, account, transferArgs);
      }
    },
    waitForTransactionReceipt: async (waitOptions) => {
      Analytics.trackAction({
        action: "wait_for_transaction_receipt",
        accountType: "evm_server",
        properties: {
          managed: true
        }
      });
      if ("transactionHash" in waitOptions) {
        return publicClient.waitForTransactionReceipt({
          hash: waitOptions.transactionHash
        });
      }
      return publicClient.waitForTransactionReceipt(waitOptions);
    }
  };
  if (isMethodSupportedOnNetwork("listTokenBalances", resolvedNetworkName)) {
    Object.assign(account, {
      listTokenBalances: async (listTokenBalancesOptions) => {
        Analytics.trackAction({
          action: "list_token_balances",
          accountType: "evm_server",
          properties: {
            managed: true
          }
        });
        return options.account.listTokenBalances({
          ...listTokenBalancesOptions,
          network: options.network
        });
      }
    });
  }
  if (isMethodSupportedOnNetwork("requestFaucet", resolvedNetworkName)) {
    Object.assign(account, {
      requestFaucet: async (faucetOptions) => {
        Analytics.trackAction({
          action: "request_faucet",
          accountType: "evm_server",
          properties: {
            managed: true
          }
        });
        return options.account.requestFaucet({
          ...faucetOptions,
          network: chain.id === baseSepolia.id ? "base-sepolia" : "ethereum-sepolia"
        });
      }
    });
  }
  if (isMethodSupportedOnNetwork("quoteSwap", resolvedNetworkName)) {
    Object.assign(account, {
      quoteSwap: async (quoteSwapOptions) => {
        Analytics.trackAction({
          action: "quote_swap",
          accountType: "evm_server",
          properties: {
            managed: true
          }
        });
        return options.account.quoteSwap({
          ...quoteSwapOptions,
          network: options.network
        });
      }
    });
  }
  if (isMethodSupportedOnNetwork("swap", resolvedNetworkName)) {
    Object.assign(account, {
      swap: async (swapOptions) => {
        Analytics.trackAction({
          action: "swap",
          accountType: "evm_server",
          properties: {
            managed: true
          }
        });
        const swapOptionsWithNetwork = "swapQuote" in swapOptions ? swapOptions : { ...swapOptions, network: options.network };
        return options.account.swap(swapOptionsWithNetwork);
      }
    });
  }
  if (isMethodSupportedOnNetwork("useSpendPermission", resolvedNetworkName)) {
    Object.assign(account, {
      useSpendPermission: async (spendPermissionOptions) => {
        Analytics.trackAction({
          action: "use_spend_permission",
          accountType: "evm_server",
          properties: {
            managed: true
          }
        });
        return options.account.useSpendPermission({
          ...spendPermissionOptions,
          network: options.network
        });
      }
    });
  }
  return account;
}
async function listTokenBalances(client, options) {
  const response = await client.listDataTokenBalances(options.network, options.address, {
    pageSize: options.pageSize,
    pageToken: options.pageToken
  });
  const balances = response.balances.map((balance) => {
    return {
      token: {
        network: balance.token.network,
        contractAddress: balance.token.contractAddress,
        symbol: balance.token.symbol,
        name: balance.token.name
      },
      amount: {
        amount: BigInt(balance.amount.amount),
        decimals: balance.amount.decimals
      }
    };
  });
  return {
    balances,
    nextPageToken: response.nextPageToken
  };
}
async function requestFaucet$1(apiClient, options) {
  const { transactionHash } = await apiClient.requestEvmFaucet({ address: options.address, network: options.network, token: options.token }, options.idempotencyKey);
  return {
    transactionHash
  };
}
async function sendTransaction$1(apiClient, options) {
  const { address: address2, network, idempotencyKey } = options;
  let transaction = options.transaction;
  if (typeof transaction !== "string") {
    transaction = serializeTransaction({
      ...transaction,
      // chainId is ignored in favor of network
      chainId: 1,
      type: "eip1559"
    });
  }
  const result = await apiClient.sendEvmTransaction(address2, { transaction, network }, idempotencyKey);
  return {
    transactionHash: result.transactionHash
  };
}
const SPEND_PERMISSION_MANAGER_ADDRESS = "0xf85210B21cC50302F477BA56686d2019dC9b67Ad";
const SPEND_PERMISSION_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: "contract PublicERC6492Validator",
        name: "publicERC6492Validator",
        type: "address"
      },
      { internalType: "address", name: "magicSpend", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      { internalType: "uint48", name: "currentTimestamp", type: "uint48" },
      { internalType: "uint48", name: "end", type: "uint48" }
    ],
    name: "AfterSpendPermissionEnd",
    type: "error"
  },
  {
    inputs: [
      { internalType: "uint48", name: "currentTimestamp", type: "uint48" },
      { internalType: "uint48", name: "start", type: "uint48" }
    ],
    name: "BeforeSpendPermissionStart",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "ERC721TokenNotSupported",
    type: "error"
  },
  { inputs: [], name: "EmptySpendPermissionBatch", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "allowance", type: "uint256" }
    ],
    name: "ExceededSpendPermission",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint160", name: "spend", type: "uint160" }
        ],
        internalType: "struct SpendPermissionManager.PeriodSpend",
        name: "actualLastUpdatedPeriod",
        type: "tuple"
      },
      {
        components: [
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint160", name: "spend", type: "uint160" }
        ],
        internalType: "struct SpendPermissionManager.PeriodSpend",
        name: "expectedLastUpdatedPeriod",
        type: "tuple"
      }
    ],
    name: "InvalidLastUpdatedPeriod",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "expected", type: "address" }
    ],
    name: "InvalidSender",
    type: "error"
  },
  { inputs: [], name: "InvalidSignature", type: "error" },
  {
    inputs: [
      { internalType: "uint48", name: "start", type: "uint48" },
      { internalType: "uint48", name: "end", type: "uint48" }
    ],
    name: "InvalidStartEnd",
    type: "error"
  },
  {
    inputs: [
      { internalType: "uint128", name: "noncePostfix", type: "uint128" },
      { internalType: "uint128", name: "permissionHashPostfix", type: "uint128" }
    ],
    name: "InvalidWithdrawRequestNonce",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "firstAccount", type: "address" },
      { internalType: "address", name: "secondAccount", type: "address" }
    ],
    name: "MismatchedAccounts",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "spendToken", type: "address" },
      { internalType: "address", name: "withdrawAsset", type: "address" }
    ],
    name: "SpendTokenWithdrawAssetMismatch",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "SpendValueOverflow",
    type: "error"
  },
  {
    inputs: [
      { internalType: "uint256", name: "spendValue", type: "uint256" },
      { internalType: "uint256", name: "withdrawAmount", type: "uint256" }
    ],
    name: "SpendValueWithdrawAmountMismatch",
    type: "error"
  },
  { inputs: [], name: "UnauthorizedSpendPermission", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "received", type: "uint256" },
      { internalType: "uint256", name: "expected", type: "uint256" }
    ],
    name: "UnexpectedReceiveAmount",
    type: "error"
  },
  { inputs: [], name: "ZeroAllowance", type: "error" },
  { inputs: [], name: "ZeroPeriod", type: "error" },
  { inputs: [], name: "ZeroSpender", type: "error" },
  { inputs: [], name: "ZeroToken", type: "error" },
  { inputs: [], name: "ZeroValue", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "hash", type: "bytes32" },
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        indexed: false,
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "SpendPermissionApproved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "hash", type: "bytes32" },
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        indexed: false,
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "SpendPermissionRevoked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "hash", type: "bytes32" },
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "address", name: "token", type: "address" },
      {
        components: [
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint160", name: "spend", type: "uint160" }
        ],
        indexed: false,
        internalType: "struct SpendPermissionManager.PeriodSpend",
        name: "periodSpend",
        type: "tuple"
      }
    ],
    name: "SpendPermissionUsed",
    type: "event"
  },
  {
    inputs: [],
    name: "MAGIC_SPEND",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "NATIVE_TOKEN",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PERMISSION_DETAILS_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PUBLIC_ERC6492_VALIDATOR",
    outputs: [{ internalType: "contract PublicERC6492Validator", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "SPEND_PERMISSION_BATCH_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "SPEND_PERMISSION_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          {
            components: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint160", name: "allowance", type: "uint160" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes", name: "extraData", type: "bytes" }
            ],
            internalType: "struct SpendPermissionManager.PermissionDetails[]",
            name: "permissions",
            type: "tuple[]"
          }
        ],
        internalType: "struct SpendPermissionManager.SpendPermissionBatch",
        name: "spendPermissionBatch",
        type: "tuple"
      },
      { internalType: "bytes", name: "signature", type: "bytes" }
    ],
    name: "approveBatchWithSignature",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "permissionToApprove",
        type: "tuple"
      },
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "permissionToRevoke",
        type: "tuple"
      },
      {
        components: [
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint160", name: "spend", type: "uint160" }
        ],
        internalType: "struct SpendPermissionManager.PeriodSpend",
        name: "expectedLastUpdatedPeriod",
        type: "tuple"
      }
    ],
    name: "approveWithRevoke",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      },
      { internalType: "bytes", name: "signature", type: "bytes" }
    ],
    name: "approveWithSignature",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          {
            components: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint160", name: "allowance", type: "uint160" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes", name: "extraData", type: "bytes" }
            ],
            internalType: "struct SpendPermissionManager.PermissionDetails[]",
            name: "permissions",
            type: "tuple[]"
          }
        ],
        internalType: "struct SpendPermissionManager.SpendPermissionBatch",
        name: "spendPermissionBatch",
        type: "tuple"
      }
    ],
    name: "getBatchHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "getCurrentPeriod",
    outputs: [
      {
        components: [
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint160", name: "spend", type: "uint160" }
        ],
        internalType: "struct SpendPermissionManager.PeriodSpend",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "getHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "getLastUpdatedPeriod",
    outputs: [
      {
        components: [
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint160", name: "spend", type: "uint160" }
        ],
        internalType: "struct SpendPermissionManager.PeriodSpend",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "isApproved",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "isRevoked",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "isValid",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "revoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      }
    ],
    name: "revokeAsSpender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      },
      { internalType: "uint160", name: "value", type: "uint160" }
    ],
    name: "spend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint160", name: "allowance", type: "uint160" },
          { internalType: "uint48", name: "period", type: "uint48" },
          { internalType: "uint48", name: "start", type: "uint48" },
          { internalType: "uint48", name: "end", type: "uint48" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct SpendPermissionManager.SpendPermission",
        name: "spendPermission",
        type: "tuple"
      },
      { internalType: "uint160", name: "value", type: "uint160" },
      {
        components: [
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint48", name: "expiry", type: "uint48" }
        ],
        internalType: "struct MagicSpend.WithdrawRequest",
        name: "withdrawRequest",
        type: "tuple"
      }
    ],
    name: "spendWithWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];
function serializeEIP1559Transaction(transaction) {
  return serializeTransaction({
    ...transaction,
    chainId: 1,
    // ignored by Coinbase API
    type: "eip1559"
  });
}
async function useSpendPermission$1(apiClient, address2, options) {
  const { spendPermission, value, network } = options;
  const result = await apiClient.sendEvmTransaction(address2, {
    transaction: serializeEIP1559Transaction({
      to: SPEND_PERMISSION_MANAGER_ADDRESS,
      data: encodeFunctionData({
        abi: SPEND_PERMISSION_MANAGER_ABI,
        functionName: "spend",
        args: [spendPermission, value]
      })
    }),
    network
  });
  return {
    transactionHash: result.transactionHash
  };
}
function createDeterministicUuidV4(input, salt = "salt") {
  const hash = createHash("sha256").update(input + "-" + salt).digest("hex");
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    "4" + hash.slice(13, 16),
    // Version 4
    (parseInt(hash.slice(16, 17), 16) & 3 | 8).toString(16) + hash.slice(17, 20),
    // Variant bits
    hash.slice(20, 32)
  ].join("-");
}
function isContractCall(call) {
  return "abi" in call && "functionName" in call;
}
async function sendUserOperation(client, options) {
  const { calls, network, paymasterUrl: _paymasterUrl } = options;
  const paymasterUrl = await (async () => {
    if (!_paymasterUrl && network === "base") {
      return getBaseNodeRpcUrl("base");
    }
    return _paymasterUrl;
  })();
  if (calls.length === 0) {
    throw new Error("Calls array is empty");
  }
  const encodedCalls = calls.map((call) => {
    const baseCall = call;
    const value = (baseCall.value ?? BigInt(0)).toString();
    const overrideGasLimit = baseCall.overrideGasLimit?.toString();
    if (isContractCall(baseCall)) {
      return {
        to: baseCall.to,
        data: encodeFunctionData({
          abi: baseCall.abi,
          functionName: baseCall.functionName,
          args: baseCall.args
        }),
        value,
        overrideGasLimit
      };
    }
    const directCall = baseCall;
    return {
      to: directCall.to,
      data: directCall.data ?? "0x",
      value,
      overrideGasLimit
    };
  });
  const createOpResponse = await client.prepareUserOperation(options.smartAccount.address, {
    network,
    calls: encodedCalls,
    paymasterUrl,
    dataSuffix: options.dataSuffix
  });
  const owner = options.smartAccount.owners[0];
  const signature = await owner.sign({
    hash: createOpResponse.userOpHash
  });
  const broadcastResponse = await client.sendUserOperation(options.smartAccount.address, createOpResponse.userOpHash, {
    signature
  }, options.idempotencyKey);
  return {
    smartAccountAddress: options.smartAccount.address,
    status: broadcastResponse.status,
    userOpHash: createOpResponse.userOpHash
  };
}
async function signAndWrapTypedDataForSmartAccount(client, options) {
  const { smartAccount, chainId, typedData, ownerIndex = 0n } = options;
  const replaySafeTypedData = createReplaySafeTypedData({
    typedData,
    chainId,
    smartAccountAddress: smartAccount.address
  });
  const owner = smartAccount.owners[Number(ownerIndex)];
  const signature = await client.signEvmTypedData(owner.address, replaySafeTypedData, options.idempotencyKey);
  const wrappedSignature = createSmartAccountSignatureWrapper({
    signatureHex: signature.signature,
    ownerIndex
  });
  return {
    signature: wrappedSignature
  };
}
function createReplaySafeTypedData({ typedData, chainId, smartAccountAddress }) {
  const originalHash = hashTypedData(typedData);
  return {
    domain: {
      name: "Coinbase Smart Wallet",
      version: "1",
      chainId: Number(chainId),
      verifyingContract: smartAccountAddress
    },
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" }
      ],
      CoinbaseSmartWalletMessage: [{ name: "hash", type: "bytes32" }]
    },
    primaryType: "CoinbaseSmartWalletMessage",
    message: {
      hash: originalHash
    }
  };
}
function createSmartAccountSignatureWrapper({ signatureHex, ownerIndex }) {
  const r = sliceHex(signatureHex, 0, 32);
  const s = sliceHex(signatureHex, 32, 64);
  const v = Number(`0x${signatureHex.slice(130, 132)}`);
  const signatureData = encodePacked(["bytes32", "bytes32", "uint8"], [r, s, v]);
  return encodeAbiParameters([SignatureWrapperStruct], [
    {
      ownerIndex: Number(ownerIndex),
      signatureData
    }
  ]);
}
const SignatureWrapperStruct = {
  components: [
    {
      name: "ownerIndex",
      type: "uint8"
    },
    {
      name: "signatureData",
      type: "bytes"
    }
  ],
  name: "SignatureWrapper",
  type: "tuple"
};
async function sendSwapOperation(client, options) {
  const { smartAccount, paymasterUrl, idempotencyKey } = options;
  let swapResult;
  if ("swapQuote" in options) {
    swapResult = options.swapQuote;
  } else {
    const swapQuoteIdempotencyKey = idempotencyKey ? createDeterministicUuidV4(idempotencyKey, "createSwapQuote") : void 0;
    swapResult = await createSwapQuote(client, {
      network: options.network,
      toToken: options.toToken,
      fromToken: options.fromToken,
      fromAmount: options.fromAmount,
      taker: options.taker,
      signerAddress: options.signerAddress,
      gasPrice: options.gasPrice,
      slippageBps: options.slippageBps,
      idempotencyKey: swapQuoteIdempotencyKey
    });
  }
  if (!swapResult.liquidityAvailable) {
    throw new Error("Insufficient liquidity for swap");
  }
  const swap = swapResult;
  if (swap.issues?.allowance) {
    const { currentAllowance, spender } = swap.issues.allowance;
    throw new Error(`Insufficient token allowance for swap. Current allowance: ${currentAllowance}. Please approve the Permit2 contract (${spender}) to spend your tokens.`);
  }
  if (!swap.transaction) {
    throw new Error("No transaction data found in the swap");
  }
  let txData = swap.transaction.data;
  if (swap.permit2?.eip712) {
    const permit2IdempotencyKey = idempotencyKey ? createDeterministicUuidV4(idempotencyKey, "permit2") : void 0;
    const { signature: wrappedSignature } = await signAndWrapTypedDataForSmartAccount(client, {
      smartAccount,
      chainId: BigInt(swap.permit2.eip712.domain.chainId || 1),
      typedData: swap.permit2.eip712,
      ownerIndex: 0n,
      idempotencyKey: permit2IdempotencyKey
    });
    const permit2SignatureLengthInHex = numberToHex(size(wrappedSignature), {
      signed: false,
      size: 32
    });
    txData = concat([txData, permit2SignatureLengthInHex, wrappedSignature]);
  }
  const result = await sendUserOperation(client, {
    smartAccount,
    network: swap.network,
    paymasterUrl,
    idempotencyKey,
    calls: [
      {
        to: swap.transaction.to,
        data: txData,
        // Only include value if it exists
        ...swap.transaction.value ? { value: BigInt(swap.transaction.value) } : {}
      }
    ]
  });
  return result;
}
async function sendSwapTransaction(client, options) {
  const { address: address2, idempotencyKey } = options;
  let swapResult;
  if ("swapQuote" in options) {
    swapResult = options.swapQuote;
  } else {
    const swapQuoteIdempotencyKey = idempotencyKey ? createDeterministicUuidV4(idempotencyKey, "createSwapQuote") : void 0;
    swapResult = await createSwapQuote(client, {
      network: options.network,
      toToken: options.toToken,
      fromToken: options.fromToken,
      fromAmount: options.fromAmount,
      taker: options.taker,
      signerAddress: options.signerAddress,
      gasPrice: options.gasPrice,
      slippageBps: options.slippageBps,
      idempotencyKey: swapQuoteIdempotencyKey
    });
  }
  if (!swapResult.liquidityAvailable) {
    throw new Error("Insufficient liquidity for swap");
  }
  const swap = swapResult;
  if (swap.issues?.allowance) {
    const { currentAllowance, spender } = swap.issues.allowance;
    throw new Error(`Insufficient token allowance for swap. Current allowance: ${currentAllowance}. Please approve the Permit2 contract (${spender}) to spend your tokens.`);
  }
  if (!swap.transaction) {
    throw new Error("No transaction data found in the swap");
  }
  let txData = swap.transaction.data;
  if (swap.permit2?.eip712) {
    const permit2IdempotencyKey = idempotencyKey ? createDeterministicUuidV4(idempotencyKey, "permit2") : void 0;
    const signature = await client.signEvmTypedData(address2, {
      domain: swap.permit2.eip712.domain,
      types: swap.permit2.eip712.types,
      primaryType: swap.permit2.eip712.primaryType,
      message: swap.permit2.eip712.message
    }, permit2IdempotencyKey);
    const signatureLengthInHex = numberToHex(size(signature.signature), {
      signed: false,
      size: 32
    });
    txData = concat([txData, signatureLengthInHex, signature.signature]);
  }
  const transaction = {
    to: swap.transaction.to,
    data: txData,
    // Only include these properties if they exist
    ...swap.transaction.value ? { value: BigInt(swap.transaction.value) } : {},
    ...swap.transaction.gas ? { gas: BigInt(swap.transaction.gas) } : {}
  };
  const result = await sendTransaction$1(client, {
    address: address2,
    network: swap.network,
    transaction,
    idempotencyKey
  });
  return {
    transactionHash: result.transactionHash
  };
}
async function createSwapQuote(client, options) {
  if (!options.taker) {
    throw new Error("taker is required for createSwapQuote");
  }
  const taker = options.taker;
  const response = await client.createEvmSwapQuote({
    network: options.network,
    toToken: options.toToken,
    fromToken: options.fromToken,
    fromAmount: options.fromAmount.toString(),
    taker,
    signerAddress: options.signerAddress,
    gasPrice: options.gasPrice?.toString(),
    slippageBps: options.slippageBps
  }, options.idempotencyKey);
  if (!response.liquidityAvailable) {
    return {
      liquidityAvailable: false
    };
  }
  const swapResponse = response;
  const result = {
    liquidityAvailable: true,
    network: options.network,
    toToken: swapResponse.toToken,
    fromToken: swapResponse.fromToken,
    fromAmount: BigInt(swapResponse.fromAmount),
    toAmount: BigInt(swapResponse.toAmount),
    minToAmount: BigInt(swapResponse.minToAmount),
    blockNumber: BigInt(swapResponse.blockNumber),
    fees: {
      gasFee: swapResponse.fees.gasFee ? {
        amount: BigInt(swapResponse.fees.gasFee.amount),
        token: swapResponse.fees.gasFee.token
      } : void 0,
      protocolFee: swapResponse.fees.protocolFee ? {
        amount: BigInt(swapResponse.fees.protocolFee.amount),
        token: swapResponse.fees.protocolFee.token
      } : void 0
    },
    issues: {
      allowance: swapResponse.issues.allowance ? {
        currentAllowance: BigInt(swapResponse.issues.allowance.currentAllowance),
        spender: swapResponse.issues.allowance.spender
      } : void 0,
      balance: swapResponse.issues.balance ? {
        token: swapResponse.issues.balance.token,
        currentBalance: BigInt(swapResponse.issues.balance.currentBalance),
        requiredBalance: BigInt(swapResponse.issues.balance.requiredBalance)
      } : void 0,
      simulationIncomplete: swapResponse.issues.simulationIncomplete
    },
    transaction: swapResponse.transaction ? {
      to: swapResponse.transaction.to,
      data: swapResponse.transaction.data,
      value: BigInt(swapResponse.transaction.value),
      gas: BigInt(swapResponse.transaction.gas),
      gasPrice: BigInt(swapResponse.transaction.gasPrice)
    } : void 0,
    permit2: swapResponse.permit2 ? {
      eip712: {
        domain: {
          ...swapResponse.permit2.eip712.domain,
          verifyingContract: swapResponse.permit2.eip712.domain.verifyingContract,
          salt: swapResponse.permit2.eip712.domain.salt
        },
        types: swapResponse.permit2.eip712.types,
        primaryType: swapResponse.permit2.eip712.primaryType,
        message: swapResponse.permit2.eip712.message
      }
    } : void 0,
    // Add the execute method
    execute: async (executeOptions = {}) => {
      if (options.smartAccount) {
        const userOpResult = await sendSwapOperation(client, {
          smartAccount: options.smartAccount,
          network: result.network,
          swapQuote: result,
          idempotencyKey: executeOptions.idempotencyKey
        });
        return {
          userOpHash: userOpResult.userOpHash,
          smartAccountAddress: userOpResult.smartAccountAddress,
          status: userOpResult.status
        };
      } else {
        const { transactionHash } = await sendSwapTransaction(client, {
          address: taker,
          network: result.network,
          swapQuote: result,
          idempotencyKey: executeOptions.idempotencyKey
        });
        return { transactionHash };
      }
    }
  };
  return result;
}
const accountTransferStrategy = {
  executeTransfer: async ({ apiClient, from, to, value, token, network }) => {
    network = network;
    if (token === "eth") {
      return apiClient.sendEvmTransaction(from.address, {
        transaction: serializeEIP1559Transaction({
          value,
          to
        }),
        network
      });
    }
    const erc20Address = getErc20Address(token, network);
    return apiClient.sendEvmTransaction(from.address, {
      transaction: serializeEIP1559Transaction({
        to: erc20Address,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [to, value]
        })
      }),
      network
    });
  }
};
function isValidNetworkForAccount(network, account) {
  if (isSmartAccount(account)) {
    return Object.values(EvmUserOperationNetwork).includes(network);
  }
  return true;
}
function isSmartAccount(account) {
  return "type" in account && account.type === "evm-smart";
}
async function transfer$1(apiClient, from, transferArgs, transferStrategy) {
  if (!isValidNetworkForAccount(transferArgs.network, from)) {
    throw new Error(`Network "${transferArgs.network}" is not supported for the given account type.`);
  }
  const to = typeof transferArgs.to === "string" ? transferArgs.to : transferArgs.to.address;
  const transfer2 = {
    apiClient,
    from,
    to,
    value: transferArgs.amount,
    token: transferArgs.token,
    network: transferArgs.network,
    paymasterUrl: "paymasterUrl" in transferArgs ? transferArgs.paymasterUrl : void 0
  };
  return transferStrategy.executeTransfer(transfer2);
}
function toEvmServerAccount(apiClient, options) {
  const account = {
    address: options.account.address,
    async signMessage({ message }) {
      Analytics.trackAction({
        action: "sign_message",
        accountType: "evm_server"
      });
      try {
        if (typeof message === "string") {
          const result2 = await apiClient.signEvmMessage(options.account.address, {
            message
          });
          return result2.signature;
        }
        const result = await apiClient.signEvmHash(options.account.address, {
          hash: hashMessage(message)
        });
        return result.signature;
      } catch (error) {
        Analytics.trackError(error, "signMessage");
        throw error;
      }
    },
    async sign(parameters) {
      Analytics.trackAction({
        action: "sign",
        accountType: "evm_server"
      });
      try {
        const result = await apiClient.signEvmHash(options.account.address, {
          hash: parameters.hash
        });
        return result.signature;
      } catch (error) {
        Analytics.trackError(error, "sign");
        throw error;
      }
    },
    async signTransaction(transaction) {
      Analytics.trackAction({
        action: "sign_transaction",
        accountType: "evm_server"
      });
      try {
        const result = await apiClient.signEvmTransaction(options.account.address, {
          transaction: serializeTransaction(transaction)
        });
        return result.signedTransaction;
      } catch (error) {
        Analytics.trackError(error, "signTransaction");
        throw error;
      }
    },
    async signTypedData(parameters) {
      Analytics.trackAction({
        action: "sign_typed_data",
        accountType: "evm_server"
      });
      try {
        const { domain = {}, message, primaryType } = parameters;
        const types = {
          EIP712Domain: getTypesForEIP712Domain({ domain }),
          ...parameters.types
        };
        const openApiMessage = {
          domain,
          types,
          primaryType,
          message
        };
        const result = await apiClient.signEvmTypedData(options.account.address, openApiMessage);
        return result.signature;
      } catch (error) {
        Analytics.trackError(error, "signTypedData");
        throw error;
      }
    },
    async transfer(transferArgs) {
      Analytics.trackAction({
        action: "transfer",
        accountType: "evm_server",
        properties: {
          network: transferArgs.network
        }
      });
      try {
        return transfer$1(apiClient, account, transferArgs, accountTransferStrategy);
      } catch (error) {
        Analytics.trackError(error, "transfer");
        throw error;
      }
    },
    async listTokenBalances(options2) {
      Analytics.trackAction({
        action: "list_token_balances",
        accountType: "evm_server",
        properties: {
          network: options2.network
        }
      });
      try {
        return listTokenBalances(apiClient, {
          ...options2,
          address: this.address
        });
      } catch (error) {
        Analytics.trackError(error, "listTokenBalances");
        throw error;
      }
    },
    async requestFaucet(options2) {
      Analytics.trackAction({
        action: "request_faucet",
        accountType: "evm_server",
        properties: {
          network: options2.network
        }
      });
      try {
        return requestFaucet$1(apiClient, {
          ...options2,
          address: this.address
        });
      } catch (error) {
        Analytics.trackError(error, "requestFaucet");
        throw error;
      }
    },
    async sendTransaction(options2) {
      Analytics.trackAction({
        action: "send_transaction",
        accountType: "evm_server",
        properties: {
          network: options2.network
        }
      });
      try {
        return sendTransaction$1(apiClient, {
          ...options2,
          address: this.address
        });
      } catch (error) {
        Analytics.trackError(error, "sendTransaction");
        throw error;
      }
    },
    async quoteSwap(options2) {
      Analytics.trackAction({
        action: "quote_swap",
        accountType: "evm_server",
        properties: {
          network: options2.network
        }
      });
      try {
        return createSwapQuote(apiClient, {
          ...options2,
          taker: this.address
        });
      } catch (error) {
        Analytics.trackError(error, "quoteSwap");
        throw error;
      }
    },
    async swap(options2) {
      Analytics.trackAction({
        action: "swap",
        accountType: "evm_server",
        properties: {
          network: "network" in options2 ? options2.network : void 0
        }
      });
      try {
        return sendSwapTransaction(apiClient, {
          ...options2,
          address: this.address,
          taker: this.address
          // Always use account's address as taker
        });
      } catch (error) {
        Analytics.trackError(error, "swap");
        throw error;
      }
    },
    async useSpendPermission(options2) {
      Analytics.trackAction({
        action: "use_spend_permission",
        accountType: "evm_server",
        properties: {
          network: options2.network
        }
      });
      try {
        return useSpendPermission$1(apiClient, this.address, options2);
      } catch (error) {
        Analytics.trackError(error, "useSpendPermission");
        throw error;
      }
    },
    name: options.account.name,
    type: "evm-server",
    policies: options.account.policies,
    useNetwork: async (networkOrRpcUrl) => {
      Analytics.trackAction({
        action: "use_network",
        accountType: "evm_server",
        properties: {
          network: networkOrRpcUrl
        }
      });
      try {
        return toNetworkScopedEvmServerAccount({
          account,
          network: networkOrRpcUrl
        });
      } catch (error) {
        Analytics.trackError(error, "useNetwork");
        throw error;
      }
    }
  };
  return account;
}
const COINBASE_SMART_WALLET_FACTORY = "0xBA5ED110eFDBa3D005bfC882d75358ACBbB85842";
const COINBASE_SMART_WALLET_FACTORY_ABI = [
  {
    name: "createAccount",
    type: "function",
    inputs: [
      { name: "owners", type: "bytes[]" },
      { name: "nonce", type: "uint256" }
    ],
    outputs: [{ name: "account", type: "address" }],
    stateMutability: "payable"
  }
];
async function wrapSignatureWithEip6492IfUndeployed(publicClient, accountAddress, ownerAddress, signature) {
  const bytecode = await publicClient.getCode({ address: accountAddress });
  const isDeployed = bytecode !== void 0 && bytecode !== "0x";
  if (!isDeployed) {
    const ownerBytes = encodeAbiParameters([{ type: "address" }], [ownerAddress]);
    const factoryCalldata = encodeFunctionData({
      abi: COINBASE_SMART_WALLET_FACTORY_ABI,
      functionName: "createAccount",
      args: [[ownerBytes], 0n]
    });
    return serializeErc6492Signature({
      address: COINBASE_SMART_WALLET_FACTORY,
      data: factoryCalldata,
      signature
    });
  }
  return signature;
}
async function getUserOperation(client, options) {
  const address2 = typeof options.smartAccount === "string" ? options.smartAccount : options.smartAccount.address;
  const userOp = await client.getUserOperation(address2, options.userOpHash);
  return {
    calls: userOp.calls.map((call) => ({
      to: call.to,
      value: BigInt(call.value),
      data: call.data
    })),
    network: userOp.network,
    status: userOp.status,
    transactionHash: userOp.transactionHash,
    userOpHash: userOp.userOpHash,
    receipts: userOp.receipts
  };
}
const smartAccountTransferStrategy = {
  executeTransfer: async ({ apiClient, from, to, value, token, network, paymasterUrl }) => {
    const smartAccountNetwork = network;
    if (token === "eth") {
      const result = await sendUserOperation(apiClient, {
        smartAccount: from,
        paymasterUrl,
        network: smartAccountNetwork,
        calls: [
          {
            to,
            value,
            data: "0x"
          }
        ]
      });
      return result;
    } else {
      const erc20Address = getErc20Address(token, network);
      const result = await sendUserOperation(apiClient, {
        smartAccount: from,
        paymasterUrl,
        network: smartAccountNetwork,
        calls: [
          {
            to: erc20Address,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "transfer",
              args: [to, value]
            })
          }
        ]
      });
      return result;
    }
  }
};
async function wait(reload, isTerminal2, transform = (obj) => obj, options = {}) {
  const { intervalSeconds = 0.2, timeoutSeconds = 10 } = options;
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutSeconds * 1e3) {
    const updatedObject = await reload();
    if (isTerminal2(updatedObject)) {
      return transform(updatedObject);
    }
    await new Promise((resolve) => setTimeout(resolve, intervalSeconds * 1e3));
  }
  throw new TimeoutError(`Operation has not reached a terminal state after ${timeoutSeconds} seconds and may still succeed. Retry with a longer timeout using the timeoutSeconds option.`);
}
async function waitForUserOperation(client, options) {
  const { userOpHash, smartAccountAddress } = options;
  const reload = async () => {
    const response = await client.getUserOperation(smartAccountAddress, userOpHash);
    return response;
  };
  const transform = (operation) => {
    if (operation.status === EvmUserOperationStatus.failed) {
      return {
        smartAccountAddress,
        status: EvmUserOperationStatus.failed,
        userOpHash: operation.userOpHash
      };
    } else if (operation.status === EvmUserOperationStatus.complete) {
      return {
        smartAccountAddress,
        transactionHash: operation.transactionHash,
        status: EvmUserOperationStatus.complete,
        userOpHash: operation.userOpHash
      };
    } else {
      throw new Error("User operation is not terminal");
    }
  };
  const waitOptions = options.waitOptions || {
    timeoutSeconds: 30
  };
  return await wait(reload, isTerminal, transform, waitOptions);
}
const isTerminal = (operation) => {
  return operation.status === EvmUserOperationStatus.complete || operation.status === EvmUserOperationStatus.failed;
};
async function toNetworkScopedEvmSmartAccount(apiClient, options) {
  const paymasterUrl = await (async () => {
    if (options.network === "base") {
      return getBaseNodeRpcUrl(options.network);
    }
    return void 0;
  })();
  const account = {
    address: options.smartAccount.address,
    network: options.network,
    owners: [options.owner],
    name: options.smartAccount.name,
    type: "evm-smart",
    sendUserOperation: async (userOpOptions) => {
      Analytics.trackAction({
        action: "send_user_operation",
        accountType: "evm_smart",
        properties: {
          network: options.network,
          managed: true
        }
      });
      return sendUserOperation(apiClient, {
        ...userOpOptions,
        smartAccount: options.smartAccount,
        network: options.network,
        paymasterUrl: userOpOptions.paymasterUrl ?? paymasterUrl
      });
    },
    waitForUserOperation: async (waitOptions) => {
      Analytics.trackAction({
        action: "wait_for_user_operation",
        accountType: "evm_smart",
        properties: {
          managed: true
        }
      });
      return waitForUserOperation(apiClient, {
        ...waitOptions,
        smartAccountAddress: options.smartAccount.address
      });
    },
    getUserOperation: async (getOptions) => {
      Analytics.trackAction({
        action: "get_user_operation",
        accountType: "evm_smart",
        properties: {
          managed: true
        }
      });
      return getUserOperation(apiClient, {
        ...getOptions,
        smartAccount: options.smartAccount
      });
    }
  };
  if (isMethodSupportedOnNetwork("transfer", options.network)) {
    Object.assign(account, {
      transfer: async (transferOptions) => {
        Analytics.trackAction({
          action: "transfer",
          accountType: "evm_smart",
          properties: {
            network: options.network,
            managed: true
          }
        });
        return transfer$1(apiClient, options.smartAccount, {
          ...transferOptions,
          network: options.network,
          paymasterUrl: transferOptions.paymasterUrl ?? paymasterUrl
        }, smartAccountTransferStrategy);
      }
    });
  }
  if (isMethodSupportedOnNetwork("listTokenBalances", options.network)) {
    Object.assign(account, {
      listTokenBalances: async (listOptions) => {
        Analytics.trackAction({
          action: "list_token_balances",
          accountType: "evm_smart",
          properties: {
            network: options.network,
            managed: true
          }
        });
        return listTokenBalances(apiClient, {
          ...listOptions,
          address: options.smartAccount.address,
          network: options.network
        });
      }
    });
  }
  if (isMethodSupportedOnNetwork("requestFaucet", options.network)) {
    Object.assign(account, {
      requestFaucet: async (faucetOptions) => {
        Analytics.trackAction({
          action: "request_faucet",
          accountType: "evm_smart",
          properties: {
            network: options.network,
            managed: true
          }
        });
        return requestFaucet$1(apiClient, {
          ...faucetOptions,
          address: options.smartAccount.address,
          network: options.network
        });
      }
    });
  }
  if (isMethodSupportedOnNetwork("quoteSwap", options.network)) {
    Object.assign(account, {
      quoteSwap: async (quoteSwapOptions) => {
        Analytics.trackAction({
          action: "quote_swap",
          accountType: "evm_smart",
          properties: {
            network: options.network,
            managed: true
          }
        });
        return createSwapQuote(apiClient, {
          ...quoteSwapOptions,
          taker: options.smartAccount.address,
          signerAddress: options.owner.address,
          smartAccount: options.smartAccount,
          network: options.network
        });
      }
    });
  }
  if (isMethodSupportedOnNetwork("swap", options.network)) {
    Object.assign(account, {
      swap: async (swapOptions) => {
        Analytics.trackAction({
          action: "swap",
          accountType: "evm_smart",
          properties: {
            network: options.network,
            managed: true
          }
        });
        const swapOptionsWithNetwork = "swapQuote" in swapOptions ? swapOptions : { ...swapOptions, network: options.network };
        return sendSwapOperation(apiClient, {
          ...swapOptionsWithNetwork,
          smartAccount: options.smartAccount,
          taker: options.smartAccount.address,
          signerAddress: options.owner.address,
          paymasterUrl: swapOptions.paymasterUrl ?? paymasterUrl
        });
      }
    });
  }
  if (isMethodSupportedOnNetwork("useSpendPermission", options.network)) {
    Object.assign(account, {
      useSpendPermission: async (spendPermissionOptions) => {
        Analytics.trackAction({
          action: "use_spend_permission",
          accountType: "evm_smart",
          properties: {
            managed: true
          }
        });
        return options.smartAccount.useSpendPermission({
          ...spendPermissionOptions,
          network: options.network
        });
      }
    });
  }
  Object.assign(account, {
    signTypedData: async (typedDataOptions) => {
      Analytics.trackAction({
        action: "sign_typed_data",
        accountType: "evm_smart",
        properties: {
          network: options.network,
          managed: true
        }
      });
      try {
        const { publicClient, chain } = await resolveViemClients({
          networkOrNodeUrl: options.network,
          account: options.owner
        });
        const result = await signAndWrapTypedDataForSmartAccount(apiClient, {
          chainId: BigInt(chain.id),
          smartAccount: options.smartAccount,
          typedData: typedDataOptions
        });
        return wrapSignatureWithEip6492IfUndeployed(publicClient, options.smartAccount.address, options.smartAccount.owners[0].address, result.signature);
      } catch (error) {
        Analytics.trackError(error, "signTypedData");
        throw error;
      }
    }
  });
  return account;
}
function useSpendPermission(apiClient, account, options) {
  const { spendPermission, value, network } = options;
  const data = encodeFunctionData({
    abi: SPEND_PERMISSION_MANAGER_ABI,
    functionName: "spend",
    args: [spendPermission, value]
  });
  return sendUserOperation(apiClient, {
    smartAccount: account,
    network,
    calls: [
      {
        to: SPEND_PERMISSION_MANAGER_ADDRESS,
        data,
        value: 0n
      }
    ]
  });
}
function toEvmSmartAccount(apiClient, options) {
  const account = {
    address: options.smartAccount.address,
    owners: [options.owner],
    policies: options.smartAccount.policies,
    async transfer(transferArgs) {
      Analytics.trackAction({
        action: "transfer",
        accountType: "evm_smart",
        properties: {
          network: transferArgs.network
        }
      });
      try {
        return transfer$1(apiClient, account, transferArgs, smartAccountTransferStrategy);
      } catch (error) {
        Analytics.trackError(error, "transfer");
        throw error;
      }
    },
    async listTokenBalances(options2) {
      Analytics.trackAction({
        action: "list_token_balances",
        accountType: "evm_smart",
        properties: {
          network: options2.network
        }
      });
      try {
        return listTokenBalances(apiClient, {
          ...options2,
          address: this.address
        });
      } catch (error) {
        Analytics.trackError(error, "listTokenBalances");
        throw error;
      }
    },
    async sendUserOperation(options2) {
      Analytics.trackAction({
        action: "send_user_operation",
        accountType: "evm_smart",
        properties: {
          network: options2.network
        }
      });
      try {
        return sendUserOperation(apiClient, {
          ...options2,
          smartAccount: account
        });
      } catch (error) {
        Analytics.trackError(error, "sendUserOperation");
        throw error;
      }
    },
    async waitForUserOperation(options2) {
      Analytics.trackAction({
        action: "wait_for_user_operation",
        accountType: "evm_smart"
      });
      try {
        return waitForUserOperation(apiClient, {
          ...options2,
          smartAccountAddress: account.address
        });
      } catch (error) {
        Analytics.trackError(error, "waitForUserOperation");
        throw error;
      }
    },
    async getUserOperation(options2) {
      Analytics.trackAction({
        action: "get_user_operation",
        accountType: "evm_smart"
      });
      try {
        return getUserOperation(apiClient, {
          ...options2,
          smartAccount: account
        });
      } catch (error) {
        Analytics.trackError(error, "getUserOperation");
        throw error;
      }
    },
    async requestFaucet(options2) {
      Analytics.trackAction({
        action: "request_faucet",
        accountType: "evm_smart",
        properties: {
          network: options2.network
        }
      });
      try {
        return requestFaucet$1(apiClient, {
          ...options2,
          address: account.address
        });
      } catch (error) {
        Analytics.trackError(error, "requestFaucet");
        throw error;
      }
    },
    async quoteSwap(options2) {
      Analytics.trackAction({
        action: "quote_swap",
        accountType: "evm_smart",
        properties: {
          network: options2.network
        }
      });
      try {
        return createSwapQuote(apiClient, {
          ...options2,
          taker: this.address,
          // Always use smart account's address as taker
          signerAddress: this.owners[0].address,
          // Always use owner's address as signer
          smartAccount: account
          // Pass smart account for execute method support
        });
      } catch (error) {
        Analytics.trackError(error, "quoteSwap");
        throw error;
      }
    },
    async swap(options2) {
      Analytics.trackAction({
        action: "swap",
        accountType: "evm_smart",
        properties: {
          network: "network" in options2 ? options2.network : void 0
        }
      });
      try {
        return sendSwapOperation(apiClient, {
          ...options2,
          smartAccount: account,
          taker: this.address,
          // Always use smart account's address as taker
          signerAddress: this.owners[0].address
          // Always use owner's address as signer
        });
      } catch (error) {
        Analytics.trackError(error, "swap");
        throw error;
      }
    },
    async signTypedData(options2) {
      Analytics.trackAction({
        action: "sign_typed_data",
        accountType: "evm_smart",
        properties: {
          network: options2.network
        }
      });
      try {
        const chain = resolveNetworkToChain(options2.network);
        const result = await signAndWrapTypedDataForSmartAccount(apiClient, {
          chainId: BigInt(chain.id),
          smartAccount: account,
          typedData: options2
        });
        const publicClient = createPublicClient({ chain, transport: http() });
        return wrapSignatureWithEip6492IfUndeployed(publicClient, account.address, account.owners[0].address, result.signature);
      } catch (error) {
        Analytics.trackError(error, "signTypedData");
        throw error;
      }
    },
    async useSpendPermission(options2) {
      Analytics.trackAction({
        action: "use_spend_permission",
        accountType: "evm_smart",
        properties: {
          network: options2.network
        }
      });
      try {
        return useSpendPermission(apiClient, account, options2);
      } catch (error) {
        Analytics.trackError(error, "useSpendPermission");
        throw error;
      }
    },
    name: options.smartAccount.name,
    type: "evm-smart",
    useNetwork: async (network) => {
      Analytics.trackAction({
        action: "use_network",
        accountType: "evm_smart",
        properties: {
          network
        }
      });
      try {
        return toNetworkScopedEvmSmartAccount(apiClient, {
          smartAccount: account,
          owner: options.owner,
          network
        });
      } catch (error) {
        Analytics.trackError(error, "useNetwork");
        throw error;
      }
    }
  };
  return account;
}
async function listSpendPermissions(client, options) {
  const result = await client.listSpendPermissions(options.address, {
    pageSize: options.pageSize,
    pageToken: options.pageToken
  });
  return {
    spendPermissions: result.spendPermissions.map((permission) => ({
      ...permission,
      permissionHash: permission.permissionHash,
      permission: {
        ...permission.permission,
        account: permission.permission.account,
        spender: permission.permission.spender,
        token: permission.permission.token,
        allowance: BigInt(permission.permission.allowance),
        period: Number(permission.permission.period),
        start: Number(permission.permission.start),
        end: Number(permission.permission.end),
        salt: BigInt(permission.permission.salt),
        extraData: permission.permission.extraData
      }
    }))
  };
}
function resolveTokenAddress(token, network) {
  if (token === "eth") {
    return "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  }
  if (token === "usdc" && (network === "base" || network === "base-sepolia")) {
    return getErc20Address(token, network);
  }
  if (token === "usdc") {
    throw new UserInputValidationError(`Automatic token address lookup for ${token} is not supported on ${network}. Please provide the token address manually.`);
  }
  return token;
}
function generateRandomSalt() {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  let result = 0n;
  for (let i = 0; i < randomBytes.length; i++) {
    result = (result << 8n) + BigInt(randomBytes[i]);
  }
  return result;
}
function resolveSpendPermission(spendPermissionInput, network) {
  if (spendPermissionInput.period !== void 0 && spendPermissionInput.periodInDays !== void 0) {
    throw new UserInputValidationError("Cannot specify both 'period' and 'periodInDays'. Please provide only one.");
  }
  if (spendPermissionInput.period === void 0 && spendPermissionInput.periodInDays === void 0) {
    throw new UserInputValidationError("Must specify either 'period' (in seconds) or 'periodInDays'.");
  }
  const period = spendPermissionInput.period ?? spendPermissionInput.periodInDays * 24 * 60 * 60;
  const now = /* @__PURE__ */ new Date();
  const startDate = spendPermissionInput.start ?? now;
  const endDate = spendPermissionInput.end;
  const start = Math.floor(startDate.getTime() / 1e3);
  const end = endDate ? Math.floor(endDate.getTime() / 1e3) : 281474976710655;
  const { periodInDays: _periodInDays, ...inputWithoutPeriodInDays } = spendPermissionInput;
  return {
    ...inputWithoutPeriodInDays,
    token: resolveTokenAddress(spendPermissionInput.token, network),
    period,
    start,
    end,
    salt: spendPermissionInput.salt ?? generateRandomSalt(),
    extraData: spendPermissionInput.extraData ?? "0x"
  };
}
async function getSwapPrice(client, options) {
  const response = await client.getEvmSwapPrice({
    network: options.network,
    toToken: options.toToken,
    fromToken: options.fromToken,
    fromAmount: options.fromAmount.toString(),
    taker: options.taker,
    signerAddress: options.signerAddress,
    gasPrice: options.gasPrice?.toString(),
    slippageBps: options.slippageBps
  }, options.idempotencyKey);
  if (!response.liquidityAvailable) {
    return {
      liquidityAvailable: false
    };
  }
  const quoteResponse = response;
  return {
    blockNumber: BigInt(quoteResponse.blockNumber),
    toAmount: BigInt(quoteResponse.toAmount),
    toToken: quoteResponse.toToken,
    fees: {
      gasFee: quoteResponse.fees.gasFee ? {
        amount: BigInt(quoteResponse.fees.gasFee.amount),
        token: quoteResponse.fees.gasFee.token
      } : void 0,
      protocolFee: quoteResponse.fees.protocolFee ? {
        amount: BigInt(quoteResponse.fees.protocolFee.amount),
        token: quoteResponse.fees.protocolFee.token
      } : void 0
    },
    issues: {
      allowance: quoteResponse.issues.allowance ? {
        currentAllowance: BigInt(quoteResponse.issues.allowance.currentAllowance),
        spender: quoteResponse.issues.allowance.spender
      } : void 0,
      balance: quoteResponse.issues.balance ? {
        token: quoteResponse.issues.balance.token,
        currentBalance: BigInt(quoteResponse.issues.balance.currentBalance),
        requiredBalance: BigInt(quoteResponse.issues.balance.requiredBalance)
      } : void 0,
      simulationIncomplete: quoteResponse.issues.simulationIncomplete
    },
    liquidityAvailable: true,
    minToAmount: BigInt(quoteResponse.minToAmount),
    fromAmount: BigInt(quoteResponse.fromAmount),
    fromToken: quoteResponse.fromToken,
    gas: quoteResponse.gas ? BigInt(quoteResponse.gas) : void 0,
    gasPrice: quoteResponse.gasPrice ? BigInt(quoteResponse.gasPrice) : void 0
  };
}
async function waitForEvmEip7702DelegationOperationStatus(client, options) {
  const { delegationOperationId } = options;
  const reload = async () => {
    return client.getEvmEip7702DelegationOperationById(delegationOperationId);
  };
  const isTerminal2 = (operation) => {
    return operation.status === EvmEip7702DelegationOperationStatus.COMPLETED || operation.status === EvmEip7702DelegationOperationStatus.FAILED;
  };
  const waitOptions = options.waitOptions ?? { timeoutSeconds: 60 };
  return await wait(reload, isTerminal2, (s) => s, waitOptions);
}
const generateExportEncryptionKeyPair = async () => {
  return await new Promise((resolve, reject) => {
    generateKeyPair("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "der"
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "der"
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      }
      resolve({
        publicKey: publicKey.toString("base64"),
        privateKey: privateKey.toString("base64")
      });
    });
  });
};
const decryptWithPrivateKey = (b64PrivateKey, b64Cipher) => {
  try {
    const privateKey = createPrivateKey({
      key: Buffer.from(b64PrivateKey, "base64"),
      format: "der",
      type: "pkcs1"
    });
    const decryptedBuffer = privateDecrypt({
      key: privateKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256"
    }, Buffer.from(b64Cipher, "base64"));
    return decryptedBuffer.toString("hex");
  } catch (error) {
    throw new Error(`Decryption failed: ${String(error)}`);
  }
};
const formatSolanaPrivateKey = async (privateKey) => {
  const privateKeyBytes = new Uint8Array(Buffer.from(privateKey, "hex"));
  const keyPair = await createKeyPairFromPrivateKeyBytes(privateKeyBytes);
  const publicKeyBytes = new Uint8Array(await crypto.subtle.exportKey("raw", keyPair.publicKey));
  const fullKey = Buffer.concat([privateKeyBytes, publicKeyBytes]);
  return bs58.encode(fullKey);
};
class EvmClient {
  /**
   * Creates a new CDP EVM account.
   *
   * @param {CreateServerAccountOptions} [options] - Optional parameters for creating the account.
   * @param {string} [options.name] - A name for the account to create.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the newly created account.
   *
   * @example **Without arguments**
   *          ```ts
   *          const account = await cdp.evm.createAccount();
   *          ```
   *
   * @example **With a name**
   *          ```ts
   *          const account = await cdp.evm.createAccount({ name: "MyAccount" });
   *          ```
   *
   * @example **With an idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // First call
   *          await cdp.evm.createAccount({
   *            idempotencyKey,
   *          });
   *
   *          // Second call with the same idempotency key will return the same account
   *          await cdp.evm.createAccount({
   *            idempotencyKey,
   *          });
   *          ```
   */
  async createAccount(options = {}) {
    Analytics.trackAction({
      action: "create_account",
      accountType: "evm_server"
    });
    try {
      return await this._createAccountInternal(options);
    } catch (error) {
      Analytics.trackError(error, "createAccount");
      throw error;
    }
  }
  /**
   * Imports a CDP EVM account from an external source.
   *
   * @param {ImportServerAccountOptions} options - Parameters for importing the account.
   * @param {string} options.privateKey - The private key of the account to import.
   * @param {string} [options.name] - A name for the account to import.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the imported account.
   *
   * @example **Without arguments**
   *          ```ts
   *          const account = await cdp.evm.importAccount({
   *            privateKey: "0x123456"
   *          });
   *          ```
   *
   * @example **With a name**
   *          ```ts
   *          const account = await cdp.evm.importAccount({
   *            privateKey: "0x123456",
   *            name: "MyAccount"
   *          });
   *          ```
   *
   * @example **With an idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // First call
   *          await cdp.evm.importAccount({
   *            privateKey: "0x123456",
   *            idempotencyKey,
   *          });
   *
   *          // Second call with the same idempotency key will return the same account
   *          await cdp.evm.importAccount({
   *            privateKey: "0x123456"
   *            idempotencyKey,
   *          });
   *          ```
   */
  async importAccount(options) {
    Analytics.trackAction({
      action: "import_account",
      accountType: "evm_server"
    });
    try {
      const encryptionPublicKey = options.encryptionPublicKey || ImportAccountPublicRSAKey;
      const privateKeyHex = options.privateKey.startsWith("0x") ? options.privateKey.slice(2) : options.privateKey;
      if (!/^[0-9a-fA-F]+$/.test(privateKeyHex)) {
        throw new UserInputValidationError("Private key must be a valid hexadecimal string");
      }
      const privateKeyBytes = Buffer.from(privateKeyHex, "hex");
      const encryptedPrivateKey = publicEncrypt({
        key: encryptionPublicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
      }, privateKeyBytes);
      const openApiAccount = await CdpOpenApiClient.importEvmAccount({
        name: options.name,
        encryptedPrivateKey: encryptedPrivateKey.toString("base64")
      }, options.idempotencyKey);
      const account = toEvmServerAccount(CdpOpenApiClient, {
        account: openApiAccount
      });
      return account;
    } catch (error) {
      if (!(error instanceof UserInputValidationError)) {
        Analytics.trackError(error, "importAccount");
      }
      if (error instanceof APIError) {
        throw error;
      }
      throw new Error(`Failed to import account: ${String(error)}`);
    }
  }
  /**
   * Exports a CDP EVM account's private key.
   * It is important to store the private key in a secure place after it's exported.
   *
   * @param {ExportServerAccountOptions} options - Parameters for exporting the account.
   * @param {string} [options.address] - The address of the account to export.
   * @param {string} [options.name] - The name of the account to export.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the exported account’s 32-byte private key as a hex string, without the "0x" prefix.
   *
   * @example **With an address**
   * ```ts
   * const privateKey = await cdp.evm.exportAccount({
   *   address: "0x1234567890123456789012345678901234567890",
   * });
   * ```
   *
   * @example **With a name**
   * ```ts
   * const privateKey = await cdp.evm.exportAccount({
   *   name: "MyAccount",
   * });
   * ```
   */
  async exportAccount(options) {
    Analytics.trackAction({
      action: "export_account",
      accountType: "evm_server"
    });
    try {
      const { publicKey, privateKey } = await generateExportEncryptionKeyPair();
      const { encryptedPrivateKey } = await (async () => {
        if (options.address) {
          return CdpOpenApiClient.exportEvmAccount(options.address, {
            exportEncryptionKey: publicKey
          }, options.idempotencyKey);
        }
        if (options.name) {
          return CdpOpenApiClient.exportEvmAccountByName(options.name, {
            exportEncryptionKey: publicKey
          }, options.idempotencyKey);
        }
        throw new UserInputValidationError("Either address or name must be provided");
      })();
      return decryptWithPrivateKey(privateKey, encryptedPrivateKey);
    } catch (error) {
      if (!(error instanceof UserInputValidationError)) {
        Analytics.trackError(error, "exportAccount");
      }
      throw error;
    }
  }
  /**
   * Creates a new CDP EVM smart account.
   *
   * @param {CreateSmartAccountOptions} options - Parameters for creating the smart account.
   * @param {Account} options.owner - The owner of the smart account.
   * The owner can be any Ethereum account with signing capabilities,
   * such as a CDP EVM account or a Viem LocalAccount.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the newly created smart account.
   *
   * @example **With a CDP EVM Account as the owner**
   *          ```ts
   *          const account = await cdp.evm.createAccount();
   *          const smartAccount = await cdp.evm.createSmartAccount({
   *            owner: account,
   *          });
   *          ```
   *
   * @example **With a Viem LocalAccount as the owner**
   *          ```ts
   *          // See https://viem.sh/docs/accounts/local/privateKeyToAccount
   *          const privateKey = generatePrivateKey();
   *          const account = privateKeyToAccount(privateKey);
   *          const smartAccount = await client.evm.createSmartAccount({
   *            owner: account,
   *          });
   *          ```
   *
   * @example **With an idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // First call
   *          await cdp.evm.createSmartAccount({
   *            owner: account,
   *            idempotencyKey,
   *          });
   *
   *          // Second call with the same idempotency key will return the same smart account
   *          await cdp.evm.createSmartAccount({
   *            owner: account,
   *            idempotencyKey,
   *          ```
   */
  async createSmartAccount(options) {
    Analytics.trackAction({
      action: "create_smart_account",
      accountType: "evm_smart"
    });
    try {
      return await this._createSmartAccountInternal(options);
    } catch (error) {
      Analytics.trackError(error, "createSmartAccount");
      throw error;
    }
  }
  /**
   * Creates a spend permission for a smart account.
   *
   * @param {CreateSpendPermissionOptions} options - Parameters for creating the spend permission.
   * @param {SpendPermission} options.spendPermission - The spend permission to create.
   * @param {string} [options.idempotencyKey] - The idempotency key to use for the spend permission.
   *
   * @returns A promise that resolves to the spend permission.
   *
   * @example
   * ```ts
   * const userOperation = await cdp.evm.createSpendPermission({
   *   spendPermission,
   *   network: "base-sepolia",
   * });
   * ```
   */
  async createSpendPermission(options) {
    Analytics.trackAction({
      action: "create_spend_permission"
    });
    try {
      const resolvedSpendPermission = resolveSpendPermission(options.spendPermission, options.network);
      const userOperation = await CdpOpenApiClient.createSpendPermission(resolvedSpendPermission.account, {
        spender: resolvedSpendPermission.spender,
        token: resolvedSpendPermission.token,
        allowance: resolvedSpendPermission.allowance.toString(),
        period: resolvedSpendPermission.period.toString(),
        start: resolvedSpendPermission.start.toString(),
        end: resolvedSpendPermission.end.toString(),
        salt: resolvedSpendPermission.salt.toString(),
        extraData: resolvedSpendPermission.extraData,
        network: options.network,
        paymasterUrl: options.paymasterUrl
      }, options.idempotencyKey);
      return {
        network: userOperation.network,
        userOpHash: userOperation.userOpHash,
        status: userOperation.status,
        calls: userOperation.calls.map((call) => ({
          to: call.to,
          value: BigInt(call.value),
          data: call.data
        }))
      };
    } catch (error) {
      Analytics.trackError(error, "createSpendPermission");
      throw error;
    }
  }
  /**
   * Revokes a spend permission for a smart account.
   *
   * @param {RevokeSpendPermissionOptions} options - Parameters for revoking the spend permission.
   * @param {string} options.address - The address of the smart account.
   * @param {string} options.permissionHash - The hash of the spend permission to revoke.
   * @param {string} options.network - The network of the spend permission.
   * @param {string} [options.paymasterUrl] - The paymaster URL of the spend permission.
   *
   * @returns A promise that resolves to the user operation.
   *
   * @example
   * ```ts
   * const userOperation = await cdp.evm.revokeSpendPermission({
   *   address: "0x1234567890123456789012345678901234567890",
   *   permissionHash: "0x1234567890123456789012345678901234567890123456789012345678901234",
   *   network: "base-sepolia",
   * });
   * ```
   */
  async revokeSpendPermission(options) {
    Analytics.trackAction({
      action: "revoke_spend_permission"
    });
    try {
      const userOperation = await CdpOpenApiClient.revokeSpendPermission(options.address, {
        network: options.network,
        permissionHash: options.permissionHash,
        paymasterUrl: options.paymasterUrl
      }, options.idempotencyKey);
      return {
        network: userOperation.network,
        userOpHash: userOperation.userOpHash,
        status: userOperation.status,
        calls: userOperation.calls.map((call) => ({
          to: call.to,
          value: BigInt(call.value),
          data: call.data
        }))
      };
    } catch (error) {
      Analytics.trackError(error, "revokeSpendPermission");
      throw error;
    }
  }
  /**
   * Gets a CDP EVM account.
   *
   * @param {GetServerAccountOptions} options - Parameters for getting the account.
   * Either `address` or `name` must be provided.
   * If both are provided, lookup will be done by `address` and `name` will be ignored.
   * @param {string} [options.address] - The address of the account to get.
   * @param {string} [options.name] - The name of the account to get.
   *
   * @returns A promise that resolves to the account.
   *
   * @example **Get an account by address**
   *          ```ts
   *          const account = await cdp.evm.getAccount({
   *            address: "0x1234567890123456789012345678901234567890",
   *          });
   *          ```
   *
   * @example **Get an account by name**
   *          ```ts
   *          const account = await cdp.evm.getAccount({
   *            name: "MyAccount",
   *          });
   *          ```
   */
  async getAccount(options) {
    Analytics.trackAction({
      action: "get_account",
      accountType: "evm_server"
    });
    try {
      return await this._getAccountInternal(options);
    } catch (error) {
      Analytics.trackError(error, "getAccount");
      throw error;
    }
  }
  /**
   * Gets a CDP EVM smart account.
   *
   * @param {GetSmartAccountOptions} options - Parameters for getting the smart account.
   * Either `address` or `name` must be provided.
   * If both are provided, lookup will be done by `address` and `name` will be ignored.
   * @param {string} [options.address] - The address of the smart account to get.
   * @param {string} [options.name] - The name of the smart account to get.
   * @param {Account} options.owner - The owner of the smart account.
   * You must pass the signing-capable owner of the smart account so that the returned smart account
   * can be functional.
   *
   * @returns A promise that resolves to the smart account.
   *
   * @example
   * ```ts
   * const smartAccount = await cdp.evm.getSmartAccount({
   *   address: "0x1234567890123456789012345678901234567890",
   *   owner: account,
   * });
   * ```
   */
  async getSmartAccount(options) {
    Analytics.trackAction({
      action: "get_smart_account"
    });
    try {
      return await this._getSmartAccountInternal(options);
    } catch (error) {
      Analytics.trackError(error, "getSmartAccount");
      throw error;
    }
  }
  /**
   * Gets a CDP EVM account, or creates one if it doesn't exist.
   *
   * @param {GetOrCreateServerAccountOptions} options - Parameters for getting or creating the account.
   * @param {string} [options.name] - The name of the account to get or create.
   *
   * @returns A promise that resolves to the account.
   *
   * @example
   * ```ts
   * const account = await cdp.evm.getOrCreateAccount({
   *   name: "MyAccount",
   * });
   * ```
   */
  async getOrCreateAccount(options) {
    Analytics.trackAction({
      action: "get_or_create_account",
      accountType: "evm_server"
    });
    try {
      try {
        const account = await this._getAccountInternal(options);
        return account;
      } catch (error) {
        const doesAccountNotExist = error instanceof APIError && error.statusCode === 404;
        if (doesAccountNotExist) {
          try {
            const account = await this._createAccountInternal(options);
            return account;
          } catch (error2) {
            const doesAccountAlreadyExist = error2 instanceof APIError && error2.statusCode === 409;
            if (doesAccountAlreadyExist) {
              const account = await this._getAccountInternal(options);
              return account;
            }
            throw error2;
          }
        }
        throw error;
      }
    } catch (error) {
      Analytics.trackError(error, "getOrCreateAccount");
      throw error;
    }
  }
  /**
   * Gets a CDP EVM smart account, or creates one if it doesn't exist.
   * This method first attempts to retrieve an existing smart account with the given parameters.
   * If no account exists, it creates a new one with the specified owner.
   *
   * @param {GetOrCreateSmartAccountOptions} options - Configuration options for getting or creating the smart account.
   * @param {string} [options.name] - The name of the smart account to get or create.
   * @param {Account} options.owner - The owner of the smart account.
   *
   * @returns {Promise<SmartAccount>} A promise that resolves to the retrieved or newly created smart account.
   *
   * @example
   * ```ts
   * const smartAccount = await cdp.evm.getOrCreateSmartAccount({
   *   name: "MySmartAccount",
   *   owner: account,
   * });
   * ```
   */
  async getOrCreateSmartAccount(options) {
    Analytics.trackAction({
      action: "get_or_create_smart_account",
      accountType: "evm_smart"
    });
    try {
      try {
        const account = await this._getSmartAccountInternal(options);
        return account;
      } catch (error) {
        const doesAccountNotExist = error instanceof APIError && error.statusCode === 404;
        if (doesAccountNotExist) {
          try {
            const account = await this._createSmartAccountInternal(options);
            return account;
          } catch (error2) {
            const doesAccountAlreadyExist = error2 instanceof APIError && error2.statusCode === 409;
            if (doesAccountAlreadyExist) {
              const account = await this._getSmartAccountInternal(options);
              return account;
            }
            throw error2;
          }
        }
        throw error;
      }
    } catch (error) {
      Analytics.trackError(error, "getOrCreateSmartAccount");
      throw error;
    }
  }
  /**
   * Gets the price for a swap between two tokens on an EVM network.
   *
   * @param {GetSwapPriceOptions} options - The options for getting a swap price.
   *
   * @returns {Promise<GetSwapPriceResult | SwapUnavailableResult>} A promise that resolves to the swap price result or a response indicating that liquidity is unavailable.
   *
   * @example
   * ```typescript
   * const price = await cdp.evm.getSwapPrice({
   *   network: "ethereum-mainnet",
   *   toToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
   *   fromToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
   *   fromAmount: BigInt("1000000000000000000"), // 1 WETH
   *   taker: "0x1234567890123456789012345678901234567890"
   * });
   * ```
   */
  async getSwapPrice(options) {
    Analytics.trackAction({
      action: "get_swap_price",
      properties: {
        network: options.network
      }
    });
    try {
      return await getSwapPrice(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "getSwapPrice");
      throw error;
    }
  }
  /**
   * Creates a quote for a swap between two tokens on an EVM network.
   *
   * @param {CreateSwapQuoteOptions} options - The options for creating a swap quote.
   *
   * @returns {Promise<CreateSwapQuoteResult | SwapUnavailableResult>} A promise that resolves to the swap quote result or a response indicating that liquidity is unavailable.
   *
   * @example
   * ```typescript
   * const swapQuote = await cdp.evm.createSwapQuote({
   *   network: "ethereum",
   *   toToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
   *   fromToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
   *   fromAmount: BigInt("1000000000000000000"), // 1 WETH
   *   taker: "0x1234567890123456789012345678901234567890"
   * });
   * ```
   */
  async createSwapQuote(options) {
    Analytics.trackAction({
      action: "create_swap_quote",
      properties: {
        network: options.network
      }
    });
    try {
      return await createSwapQuote(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "createSwapQuote");
      throw error;
    }
  }
  /**
   * Gets a user operation for a smart account by user operation hash.
   *
   * @param {GetUserOperationOptions} options - Parameters for getting the user operation.
   * @param {SmartAccount} options.smartAccount - The smart account signing the user operation.
   * @param {string} options.userOpHash - The user operation hash.
   *
   * @returns A promise that resolves to the user operation.
   *
   * @example
   * ```ts
   * const userOp = await cdp.evm.getUserOperation({
   *   smartAccount,
   *   userOpHash: "0x1234567890123456789012345678901234567890123456789012345678901234",
   * });
   * ```
   */
  async getUserOperation(options) {
    Analytics.trackAction({
      action: "get_user_operation"
    });
    try {
      return await getUserOperation(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "getUserOperation");
      throw error;
    }
  }
  /**
   * Lists CDP EVM accounts.
   *
   * @param {ListServerAccountsOptions} [options] - Optional parameters for listing the accounts.
   * @param {number} [options.pageSize] - The number of accounts to return.
   * @param {string} [options.pageToken] - The page token to begin listing from.
   * This is obtained by previous calls to this method.
   *
   * @returns A promise that resolves to an array of accounts, and a token to paginate through the accounts.
   *
   * @example
   * ```ts
   * const accounts = await cdp.evm.listAccounts();
   * ```
   *
   * @example **With pagination**
   *          ```ts
   *          let page = await cdp.evm.listAccounts();
   *
   *          while (page.nextPageToken) {
   *            page = await cdp.evm.listAccounts({ pageToken: page.nextPageToken });
   *          }
   *          ```
   */
  async listAccounts(options = {}) {
    Analytics.trackAction({
      action: "list_accounts",
      accountType: "evm_server"
    });
    try {
      const ethAccounts = await CdpOpenApiClient.listEvmAccounts({
        pageSize: options.pageSize,
        pageToken: options.pageToken
      });
      return {
        accounts: ethAccounts.accounts.map((account) => {
          const evmAccount = toEvmServerAccount(CdpOpenApiClient, {
            account
          });
          return evmAccount;
        }),
        nextPageToken: ethAccounts.nextPageToken
      };
    } catch (error) {
      Analytics.trackError(error, "listAccounts");
      throw error;
    }
  }
  /**
   * Lists CDP EVM token balances.
   *
   * @param {ListTokenBalancesOptions} options - Parameters for listing the token balances.
   * @param {number} [options.pageSize] - The number of token balances to return.
   * @param {string} [options.pageToken] - The page token to begin listing from.
   * This is obtained by previous calls to this method.
   *
   * @returns A promise that resolves to an array of token balances, and a token to paginate through the token balances.
   *
   * @example
   * ```ts
   * const tokenBalances = await cdp.evm.listTokenBalances({
   *   address: "0x1234567890123456789012345678901234567890",
   *   network: "base-sepolia",
   * });
   * ```
   *
   * @example
   * **With pagination**
   * ```ts
   * let page = await cdp.evm.listTokenBalances({
   *   address: "0x1234567890123456789012345678901234567890",
   *   network: "base-sepolia",
   * });
   *
   * while (page.nextPageToken) {
   *   page = await cdp.evm.listTokenBalances({
   *     address: "0x1234567890123456789012345678901234567890",
   *     network: "base-sepolia",
   *     pageToken: page.nextPageToken,
   *   });
   * }
   */
  async listTokenBalances(options) {
    Analytics.trackAction({
      action: "list_token_balances",
      properties: {
        network: options.network
      }
    });
    try {
      return await listTokenBalances(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "listTokenBalances");
      throw error;
    }
  }
  /**
   * Lists CDP EVM smart accounts.
   *
   * @param {ListSmartAccountsOptions} options - Parameters for listing the smart accounts.
   * @param {number} [options.pageSize] - The number of smart accounts to return.
   * @param {string} [options.pageToken] - The page token to begin listing from.
   * This is obtained by previous calls to this method.
   *
   * @returns A promise that resolves to an array of smart accounts, and a token to paginate through the smart accounts.
   *
   * @example
   * ```ts
   * const smartAccounts = await cdp.evm.listSmartAccounts();
   * ```
   *
   * @example **With pagination**
   *          ```ts
   *          let page = await cdp.evm.listSmartAccounts();
   *
   *          while (page.nextPageToken) {
   *            page = await cdp.evm.listSmartAccounts({ pageToken: page.nextPageToken });
   *          }
   *          ```
   */
  async listSmartAccounts(options = {}) {
    Analytics.trackAction({
      action: "list_smart_accounts"
    });
    try {
      const smartAccounts = await CdpOpenApiClient.listEvmSmartAccounts({
        pageSize: options.pageSize,
        pageToken: options.pageToken
      });
      return {
        accounts: smartAccounts.accounts.map((account) => ({
          address: account.address,
          owners: [account.owners[0]],
          type: "evm-smart",
          policies: account.policies
        })),
        nextPageToken: smartAccounts.nextPageToken
      };
    } catch (error) {
      Analytics.trackError(error, "listSmartAccounts");
      throw error;
    }
  }
  /**
   * Lists the spend permissions for a smart account.
   *
   * @param {ListSpendPermissionsOptions} options - Parameters for listing the spend permissions.
   * @param {string} options.address - The address of the smart account.
   * @param {number} [options.pageSize] - The number of spend permissions to return.
   * @param {string} [options.pageToken] - The page token to return the next page of spend permissions.
   *
   * @returns A promise that resolves to the spend permissions.
   */
  async listSpendPermissions(options) {
    Analytics.trackAction({
      action: "list_spend_permissions"
    });
    try {
      return await listSpendPermissions(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "listSpendPermissions");
      throw error;
    }
  }
  /**
   * Prepares a user operation for a smart account.
   *
   * @param {PrepareUserOperationOptions} options - Parameters for preparing the user operation.
   * @param {SmartAccount} options.smartAccount - The smart account signing the user operation.
   * @param {string} options.network - The network to prepare the user operation for.
   * @param {EvmCall[]} options.calls - The calls to include in the user operation.
   * @param {string} [options.paymasterUrl] - The optional paymaster URL to use for the user operation.
   *
   * @returns A promise that resolves to the user operation hash.
   *
   * @example
   * ```ts
   * const userOp = await cdp.evm.prepareUserOperation({
   *   smartAccount,
   *   network: "base-sepolia",
   *   calls: [
   *     {
   *       to: "0x1234567890123456789012345678901234567890",
   *       value: parseEther("0.000001"),
   *       data: "0x",
   *     },
   *   ],
   * });
   * ```
   */
  async prepareUserOperation(options) {
    Analytics.trackAction({
      action: "prepare_user_operation",
      properties: {
        network: options.network
      }
    });
    try {
      const userOp = await CdpOpenApiClient.prepareUserOperation(options.smartAccount.address, {
        network: options.network,
        calls: options.calls.map((call) => ({
          to: call.to,
          value: call.value.toString(),
          data: call.data,
          overrideGasLimit: call.overrideGasLimit
        })),
        paymasterUrl: options.paymasterUrl,
        dataSuffix: options.dataSuffix
      });
      return {
        network: userOp.network,
        userOpHash: userOp.userOpHash,
        status: userOp.status,
        calls: userOp.calls.map((call) => ({
          to: call.to,
          value: BigInt(call.value),
          data: call.data
        }))
      };
    } catch (error) {
      Analytics.trackError(error, "prepareUserOperation");
      throw error;
    }
  }
  /**
   * Prepares and sends a user operation for a smart account.
   *
   * @param {PrepareAndSendUserOperationOptions} options - Parameters for preparing and sending the user operation.
   * @param {SmartAccount} options.smartAccount - The smart account signing the user operation.
   * @param {string} options.network - The network to prepare and send the user operation on.
   * @param {EvmCall[]} options.calls - The calls to include in the user operation.
   * @param {string} [options.paymasterUrl] - The optional paymaster URL to use for the user operation.
   *
   * @returns A promise that resolves to the smart account address, user operation hash, and status of the user operation.
   *
   * @example
   * ```ts
   * const { userOpHash } = await cdp.evm.prepareAndSendUserOperation({
   *   smartAccount,
   *   network: "base-sepolia",
   *   calls: [
   *     {
   *       to: "0x1234567890123456789012345678901234567890",
   *       value: parseEther("0.000001"),
   *       data: "0x",
   *     },
   *   ],
   * });
   * ```
   */
  async prepareAndSendUserOperation(options) {
    Analytics.trackAction({
      action: "prepare_and_send_user_operation",
      properties: {
        network: options.network
      }
    });
    try {
      const userOp = await CdpOpenApiClient.prepareAndSendUserOperation(options.smartAccount.address, {
        network: options.network,
        calls: options.calls.map((call) => ({
          to: call.to,
          value: call.value.toString(),
          data: call.data
        })),
        paymasterUrl: options.paymasterUrl
      }, options.idempotencyKey);
      return {
        smartAccountAddress: options.smartAccount.address,
        userOpHash: userOp.userOpHash,
        status: userOp.status
      };
    } catch (error) {
      Analytics.trackError(error, "prepareAndSendUserOperation");
      throw error;
    }
  }
  /**
   * Requests funds from an EVM faucet.
   *
   * @param {RequestFaucetOptions} options - Parameters for requesting funds from the EVM faucet.
   * @param {string} options.address - The address to request funds for.
   * @param {string} options.network - The network to request funds from.
   * @param {string} options.token - The token to request funds for.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the transaction hash.
   *
   * @example
   * ```ts
   * const result = await cdp.evm.requestFaucet({
   *   address: "0x1234567890123456789012345678901234567890",
   *   network: "base-sepolia",
   *   token: "eth",
   * });
   * ```
   */
  async requestFaucet(options) {
    Analytics.trackAction({
      action: "request_faucet",
      properties: {
        network: options.network
      }
    });
    try {
      return await requestFaucet$1(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "requestFaucet");
      throw error;
    }
  }
  /**
   * Signs an EVM transaction and sends it to the specified network using the Coinbase API.
   * This method handles nonce management and gas estimation automatically.
   *
   * @param {SendTransactionOptions} options - Configuration options for sending the transaction.
   * @returns A promise that resolves to the transaction hash.
   *
   * @example
   * **Sending an RLP-encoded transaction**
   * ```ts
   * import { parseEther, serializeTransaction } from "viem";
   * import { baseSepolia } from "viem/chains";
   *
   * const { transactionHash } = await cdp.evm.sendTransaction({
   *   address: account.address,
   *   transaction: serializeTransaction({
   *     to: "0x4252e0c9A3da5A2700e7d91cb50aEf522D0C6Fe8",
   *     value: parseEther("0.000001"),
   *     chainId: baseSepolia.id,
   *     // Fields below are optional, CDP API will populate them if omitted.
   *     // nonce
   *     // maxPriorityFeePerGas
   *     // maxFeePerGas
   *     // gas
   *   }),
   *   network: "base-sepolia",
   * });
   * ```
   * @example
   * **Sending an EIP-1559 transaction request object**
   * ```ts
   * const { transactionHash } = await cdp.evm.sendTransaction({
   *   address: account.address,
   *   transaction: {
   *     to: "0x4252e0c9A3da5A2700e7d91cb50aEf522D0C6Fe8",
   *     value: parseEther("0.000001"),
   *     // Fields below are optional, CDP API will populate them if omitted.
   *     // nonce
   *     // maxPriorityFeePerGas
   *     // maxFeePerGas
   *     // gas
   *   },
   *   network: "base-sepolia",
   * });
   * ```
   */
  async sendTransaction(options) {
    Analytics.trackAction({
      action: "send_transaction",
      properties: {
        network: options.network
      }
    });
    try {
      return await sendTransaction$1(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "sendTransaction");
      throw error;
    }
  }
  /**
   * Sends a user operation.
   *
   * @param {SendUserOperationOptions} options - Parameters for sending the user operation.
   * @param {SmartAccount} options.smartAccount - The smart account sending the user operation.
   * @param {string} options.network - The network to send the user operation on.
   * @param {EvmCall[]} options.calls - The calls to include in the user operation.
   * @param {string} [options.paymasterUrl] - The optional paymaster URL to use for the user operation.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to an object containing the smart account address,
   * the user operation hash, and the status of the user operation.
   *
   * @example
   * ```ts
   * const userOp = await cdp.evm.sendUserOperation({
   *   smartAccount,
   *   network: "base-sepolia",
   *   calls: [
   *     {
   *       to: "0x1234567890123456789012345678901234567890",
   *       value: parseEther("0.000001"),
   *       data: "0x",
   *     },
   *   ],
   * });
   * ```
   */
  async sendUserOperation(options) {
    Analytics.trackAction({
      action: "send_user_operation",
      properties: {
        network: options.network
      }
    });
    try {
      return await sendUserOperation(CdpOpenApiClient, {
        smartAccount: options.smartAccount,
        network: options.network,
        calls: options.calls,
        paymasterUrl: options.paymasterUrl,
        idempotencyKey: options.idempotencyKey,
        dataSuffix: options.dataSuffix
      });
    } catch (error) {
      Analytics.trackError(error, "sendUserOperation");
      throw error;
    }
  }
  /**
   * Signs an EVM hash.
   *
   * @param {SignHashOptions} options - Parameters for signing the hash.
   * @param {string} options.address - The address to sign the hash for.
   * @param {string} options.hash - The hash to sign.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * // Create a new EVM server account to sign with
   * const ethAccount = await cdp.createEvmServerAccount({});
   *
   * const signature = await cdp.evm.signHash({
   *   address: ethAccount.address,
   *   hash: "0x1234567890123456789012345678901234567890123456789012345678901234",
   * });
   * ```
   */
  async signHash(options) {
    Analytics.trackAction({
      action: "sign_hash"
    });
    try {
      const signature = await CdpOpenApiClient.signEvmHash(options.address, {
        hash: options.hash
      }, options.idempotencyKey);
      return {
        signature: signature.signature
      };
    } catch (error) {
      Analytics.trackError(error, "signHash");
      throw error;
    }
  }
  /**
   * Signs an EIP-191 message.
   *
   * @param {SignMessageOptions} options - Parameters for signing the message.
   * @param {string} options.address - The address to sign the message for.
   * @param {string} options.message - The message to sign.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * // Create a new EVM server account to sign with
   * const ethAccount = await cdp.createEvmServerAccount({});
   *
   * const signature = await cdp.evm.signMessage({
   *   address: ethAccount.address,
   *   message: "Hello, world!",
   * });
   * ```
   */
  async signMessage(options) {
    Analytics.trackAction({
      action: "sign_message"
    });
    try {
      const signature = await CdpOpenApiClient.signEvmMessage(options.address, {
        message: options.message
      }, options.idempotencyKey);
      return {
        signature: signature.signature
      };
    } catch (error) {
      Analytics.trackError(error, "signMessage");
      throw error;
    }
  }
  /**
   * Signs an EIP-712 message.
   *
   * @param {SignTypedDataOptions} options - Parameters for signing the EIP-712 message.
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * const signature = await cdp.evm.signTypedData({
   *   address: account.address,
   *   domain: {
   *     name: "Permit2",
   *     chainId: 1,
   *     verifyingContract: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
   *   },
   *   types: {
   *     EIP712Domain: [
   *       { name: "name", type: "string" },
   *       { name: "chainId", type: "uint256" },
   *       { name: "verifyingContract", type: "address" },
   *     ],
   *     PermitTransferFrom: [
   *       { name: "permitted", type: "TokenPermissions" },
   *       { name: "spender", type: "address" },
   *       { name: "nonce", type: "uint256" },
   *       { name: "deadline", type: "uint256" },
   *     ],
   *     TokenPermissions: [
   *       { name: "token", type: "address" },
   *       { name: "amount", type: "uint256" },
   *     ],
   *   },
   *   primaryType: "PermitTransferFrom",
   *   message: {
   *     permitted: {
   *       token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
   *       amount: "1000000",
   *     },
   *     spender: "0xFfFfFfFFfFFfFFfFFfFFFFFffFFFffffFfFFFfFf",
   *     nonce: "0",
   *     deadline: "1717123200",
   *   },
   * });
   * ```
   */
  async signTypedData(options) {
    Analytics.trackAction({
      action: "sign_typed_data"
    });
    try {
      const { domain, message, primaryType } = options;
      const types = {
        EIP712Domain: getTypesForEIP712Domain({ domain }),
        ...options.types
      };
      const openApiMessage = {
        domain,
        types,
        primaryType,
        message
      };
      const signature = await CdpOpenApiClient.signEvmTypedData(options.address, openApiMessage, options.idempotencyKey);
      return {
        signature: signature.signature
      };
    } catch (error) {
      Analytics.trackError(error, "signTypedData");
      throw error;
    }
  }
  /**
   * Signs an EVM transaction.
   *
   * @param {SignTransactionOptions} options - Configuration options for signing the transaction.
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * import { parseEther, serializeTransaction } from "viem";
   * import { baseSepolia } from "viem/chains";
   *
   * // Create a new EVM server account to sign with
   * const ethAccount = await cdp.createEvmServerAccount({});
   *
   * const serializedTx = serializeTransaction(
   *   {
   *     chainId: baseSepolia.id,
   *     data: "0x",
   *     to: "0x4252e0c9A3da5A2700e7d91cb50aEf522D0C6Fe8",
   *     type: "eip1559",
   *     value: parseEther("0.000001"),
   *   },
   * );
   *
   * const signature = await cdp.evm.signTransaction({
   *   address: ethAccount.address,
   *   transaction: serializedTx,
   * });
   * ```
   */
  async signTransaction(options) {
    Analytics.trackAction({
      action: "sign_transaction"
    });
    try {
      const signature = await CdpOpenApiClient.signEvmTransaction(options.address, {
        transaction: options.transaction
      }, options.idempotencyKey);
      return {
        signature: signature.signedTransaction
      };
    } catch (error) {
      Analytics.trackError(error, "signTransaction");
      throw error;
    }
  }
  /**
   * Updates a CDP EVM account.
   *
   * @param {UpdateEvmAccountOptions} [options] - Optional parameters for creating the account.
   * @param {string} options.address - The address of the account to update
   * @param {UpdateEvmAccountBody} options.update - An object containing account fields to update.
   * @param {string} [options.update.name] - The new name for the account.
   * @param {string} [options.update.accountPolicy] - The ID of a Policy to apply to the account.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the updated account.
   *
   * @example **With a name**
   *          ```ts
   *          const account = await cdp.evm.updateAccount({ address: "0x...", update: { name: "New Name" } });
   *          ```
   *
   * @example **With an account policy**
   *          ```ts
   *          const account = await cdp.evm.updateAccount({ address: "0x...", update: { accountPolicy: "73bcaeeb-d7af-4615-b064-42b5fe83a31e" } });
   *          ```
   *
   * @example **With an idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // First call
   *          await cdp.evm.updateAccount({
   *            address: "0x...",
   *            update: { accountPolicy: "73bcaeeb-d7af-4615-b064-42b5fe83a31e" },
   *            idempotencyKey,
   *          });
   *
   *          // Second call with the same idempotency key will not update
   *          await cdp.evm.updateAccount({
   *            address: '0x...',
   *            update: { name: "" },
   *            idempotencyKey,
   *          });
   *          ```
   */
  async updateAccount(options) {
    Analytics.trackAction({
      action: "update_account"
    });
    try {
      const openApiAccount = await CdpOpenApiClient.updateEvmAccount(options.address, options.update, options.idempotencyKey);
      const account = toEvmServerAccount(CdpOpenApiClient, {
        account: openApiAccount
      });
      return account;
    } catch (error) {
      Analytics.trackError(error, "updateAccount");
      throw error;
    }
  }
  /**
   * Updates a CDP EVM smart account.
   *
   * @param {UpdateEvmSmartAccountOptions} [options] - Optional parameters for updating the account.
   * @param {string} options.address - The address of the account to update
   * @param {UpdateEvmSmartAccount} options.update - An object containing account fields to update.
   * @param {string} options.owner - The owner of the account.
   * @param {string} [options.update.name] - The new name for the account.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the updated account.
   */
  async updateSmartAccount(options) {
    Analytics.trackAction({
      action: "update_smart_account"
    });
    try {
      const openApiSmartAccount = await CdpOpenApiClient.updateEvmSmartAccount(options.address, options.update, options.idempotencyKey);
      const smartAccount = toEvmSmartAccount(CdpOpenApiClient, {
        smartAccount: openApiSmartAccount,
        owner: options.owner
      });
      return smartAccount;
    } catch (error) {
      Analytics.trackError(error, "updateSmartAccount");
      throw error;
    }
  }
  /**
   * Creates an EIP-7702 delegation for an EVM EOA account, upgrading it with smart account capabilities.
   * The delegation allows the EVM EOA to be used as a smart account, which enables batched transactions and gas sponsorship via paymaster.
   *
   * @param {CreateEvmEip7702DelegationOptions} options - The delegation parameters (address and network required, enableSpendPermissions and idempotencyKey optional).
   * @returns A promise that resolves to the delegation result including the delegation operation ID.
   *
   * @example
   * ```ts
   * const result = await cdp.evm.createEvmEip7702Delegation({
   *   address: account.address,
   *   network: "base-sepolia",
   *   enableSpendPermissions: false,
   * });
   * console.log(result.delegationOperationId);
   * ```
   */
  async createEvmEip7702Delegation(options) {
    Analytics.trackAction({
      action: "create_eip7702_delegation"
    });
    try {
      const { address: address2, network, enableSpendPermissions, idempotencyKey } = options;
      const body = {
        network,
        ...enableSpendPermissions !== void 0 && { enableSpendPermissions }
      };
      return await CdpOpenApiClient.createEvmEip7702Delegation(address2, body, idempotencyKey);
    } catch (error) {
      Analytics.trackError(error, "createEvmEip7702Delegation");
      throw error;
    }
  }
  /**
   * Gets the EIP-7702 delegation operation status.
   *
   * @param {string} delegationOperationId - The delegation operation ID returned by createEvmEip7702Delegation.
   * @returns A promise that resolves to the delegation operation status.
   *
   * @example
   * ```ts
   * const operation = await cdp.evm.getEvmEip7702DelegationOperationById(
   *   "delegation-op-123",
   * );
   * console.log(operation.status); // "PENDING" | "SUBMITTED" | "COMPLETED" | "FAILED"
   * ```
   */
  async getEvmEip7702DelegationOperationById(delegationOperationId) {
    Analytics.trackAction({
      action: "get_eip7702_delegation_operation_by_id"
    });
    try {
      return await CdpOpenApiClient.getEvmEip7702DelegationOperationById(delegationOperationId);
    } catch (error) {
      Analytics.trackError(error, "getEvmEip7702DelegationOperationById");
      throw error;
    }
  }
  /**
   * Polls the EIP-7702 delegation operation status until the status is COMPLETED or a timeout occurs.
   *
   * @param {WaitForEvmEip7702DelegationOperationStatusOptions} options - Parameters for waiting, including delegationOperationId and optional wait configuration.
   * @param {string} options.delegationOperationId - The delegation operation ID returned by createEvmEip7702Delegation.
   * @param {WaitOptions} [options.waitOptions] - Optional parameters for the wait operation.
   *
   * @returns A promise that resolves to the delegation operation once it reaches COMPLETED.
   *
   * @example
   * ```ts
   * const operation = await cdp.evm.waitForEvmEip7702DelegationOperationStatus({
   *   delegationOperationId: "delegation-op-123",
   * });
   * console.log(operation.status); // "COMPLETED"
   * ```
   */
  async waitForEvmEip7702DelegationOperationStatus(options) {
    Analytics.trackAction({
      action: "wait_for_eip7702_delegation_operation_status"
    });
    try {
      return await waitForEvmEip7702DelegationOperationStatus(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "waitForEvmEip7702DelegationOperationStatus");
      throw error;
    }
  }
  /**
   * Waits for a user operation to complete or fail.
   *
   * @param {WaitForUserOperationOptions} options - Parameters for waiting for the user operation.
   * @param {string} options.smartAccountAddress - The address of the smart account.
   * @param {string} options.userOpHash - The user operation hash.
   * @param {WaitOptions} [options.waitOptions] - Optional parameters for the wait operation.
   *
   * @returns A promise that resolves to the transaction receipt.
   *
   * @example
   * ```ts
   * // Send a user operation and get the user operation hash
   * const { userOpHash } = await cdp.evm.sendUserOperation({
   *   smartAccount,
   *   network: "base-sepolia",
   *   calls: [
   *     {
   *       to: "0x0000000000000000000000000000000000000000",
   *       value: parseEther("0.000001"),
   *       data: "0x",
   *     },
   *   ],
   * });
   *
   * // Wait for the user operation to complete or fail
   * const result = await cdp.evm.waitForUserOperation({
   *   smartAccountAddress: smartAccount.address,
   *   userOpHash: userOp.userOpHash,
   * });
   * ```
   */
  async waitForUserOperation(options) {
    Analytics.trackAction({
      action: "wait_for_user_operation"
    });
    try {
      return await waitForUserOperation(CdpOpenApiClient, {
        ...options
      });
    } catch (error) {
      Analytics.trackError(error, "waitForUserOperation");
      throw error;
    }
  }
  /**
   * Internal method to create an account without tracking analytics.
   * Used internally by composite operations to avoid double-counting.
   *
   * @param {CreateServerAccountOptions} options - Parameters for creating the account.
   * @returns {Promise<ServerAccount>} A promise that resolves to the newly created account.
   */
  async _createAccountInternal(options = {}) {
    const openApiAccount = await CdpOpenApiClient.createEvmAccount({
      name: options.name,
      accountPolicy: options.accountPolicy
    }, options.idempotencyKey);
    const account = toEvmServerAccount(CdpOpenApiClient, {
      account: openApiAccount
    });
    return account;
  }
  /**
   * Internal method to get an account without tracking analytics.
   * Used internally by composite operations to avoid double-counting.
   *
   * @param {GetServerAccountOptions} options - Parameters for getting the account.
   * @returns {Promise<ServerAccount>} A promise that resolves to the account.
   */
  async _getAccountInternal(options) {
    const openApiAccount = await (() => {
      if (options.address) {
        return CdpOpenApiClient.getEvmAccount(options.address);
      }
      if (options.name) {
        return CdpOpenApiClient.getEvmAccountByName(options.name);
      }
      throw new UserInputValidationError("Either address or name must be provided");
    })();
    const account = toEvmServerAccount(CdpOpenApiClient, {
      account: openApiAccount
    });
    return account;
  }
  /**
   * Internal method to create a smart account without tracking analytics.
   * Used internally by composite operations to avoid double-counting.
   *
   * @param {CreateSmartAccountOptions} options - Parameters for creating the smart account.
   * @returns {Promise<SmartAccount>} A promise that resolves to the newly created smart account.
   */
  async _createSmartAccountInternal(options) {
    const owners = [options.owner.address];
    if (options.enableSpendPermissions) {
      owners.push(SPEND_PERMISSION_MANAGER_ADDRESS);
    }
    const openApiSmartAccount = await CdpOpenApiClient.createEvmSmartAccount({
      owners,
      name: options.name
    }, options.idempotencyKey);
    const smartAccount = toEvmSmartAccount(CdpOpenApiClient, {
      smartAccount: openApiSmartAccount,
      owner: options.owner
    });
    return smartAccount;
  }
  /**
   * Internal method to get a smart account without tracking analytics.
   * Used internally by composite operations to avoid double-counting.
   *
   * @param {GetSmartAccountOptions} options - Parameters for getting the smart account.
   * @returns {Promise<SmartAccount>} A promise that resolves to the smart account.
   */
  async _getSmartAccountInternal(options) {
    const openApiSmartAccount = await (async () => {
      if (options.address) {
        return CdpOpenApiClient.getEvmSmartAccount(options.address);
      } else if (options.name) {
        return CdpOpenApiClient.getEvmSmartAccountByName(options.name);
      }
      throw new UserInputValidationError("Either address or name must be provided");
    })();
    if (!openApiSmartAccount.owners.includes(options.owner.address)) {
      throw new UserInputValidationError(`Owner mismatch: The provided owner address is not an owner of the smart account. Please use a valid owner for this smart account.

Smart Account Address: ${openApiSmartAccount.address}
Smart Account Owners: ${openApiSmartAccount.owners.join(", ")}
Provided Owner Address: ${options.owner.address}
`);
    }
    const smartAccount = toEvmSmartAccount(CdpOpenApiClient, {
      smartAccount: openApiSmartAccount,
      owner: options.owner
    });
    return smartAccount;
  }
}
const EthValueOperatorEnum = enumType([">", ">=", "<", "<=", "=="]);
const EvmAddressOperatorEnum = enumType(["in", "not in"]);
const EvmNetworkOperatorEnum = enumType(["in", "not in"]);
const EthValueCriterionSchema = objectType({
  /** The type of criterion, must be "ethValue" for Ethereum value-based rules. */
  type: literalType("ethValue"),
  /**
   * The ETH value amount in wei to compare against, as a string.
   * Must contain only digits.
   */
  ethValue: stringType().regex(/^[0-9]+$/),
  /** The comparison operator to use for evaluating transaction values against the threshold. */
  operator: EthValueOperatorEnum
});
const EvmAddressCriterionSchema = objectType({
  /** The type of criterion, must be "evmAddress" for EVM address-based rules. */
  type: literalType("evmAddress"),
  /**
   * Array of EVM addresses to compare against.
   * Each address must be a 0x-prefixed 40-character hexadecimal string.
   * Limited to a maximum of 300 addresses per criterion.
   */
  addresses: arrayType(Address).max(300),
  /**
   * The operator to use for evaluating transaction addresses.
   * "in" checks if an address is in the provided list.
   * "not in" checks if an address is not in the provided list.
   */
  operator: EvmAddressOperatorEnum
});
const PrepareUserOperationEvmNetworkEnum = enumType([
  "base-sepolia",
  "base",
  "arbitrum",
  "optimism",
  "zora",
  "polygon",
  "bnb",
  "avalanche",
  "ethereum",
  "ethereum-sepolia"
]);
const SendEvmTransactionEvmNetworkEnum = enumType([
  "base",
  "base-sepolia",
  "ethereum",
  "ethereum-sepolia",
  "avalanche",
  "polygon",
  "optimism",
  "arbitrum"
]);
const SendEvmTransactionEvmNetworkCriterionSchema = objectType({
  /** The type of criterion, must be "evmAddress" for EVM address-based rules. */
  type: literalType("evmNetwork"),
  /**
   * Array of EVM network identifiers to compare against.
   * Either "base", "base-sepolia", "ethereum", "ethereum-sepolia", "avalanche", "polygon", "optimism", "arbitrum"
   */
  networks: arrayType(SendEvmTransactionEvmNetworkEnum),
  /**
   * The operator to use for evaluating transaction network.
   * "in" checks if a network is in the provided list.
   * "not in" checks if a network is not in the provided list.
   */
  operator: EvmNetworkOperatorEnum
});
const PrepareUserOperationEvmNetworkCriterionSchema = objectType({
  /** The type of criterion, must be "evmAddress" for EVM address-based rules. */
  type: literalType("evmNetwork"),
  /**
   * Array of EVM network identifiers to compare against.
   * Either "base-sepolia", "base", "arbitrum", "optimism", "zora", "polygon", "bnb", "avalanche", "ethereum", "ethereum-sepolia"
   */
  networks: arrayType(PrepareUserOperationEvmNetworkEnum),
  /**
   * The operator to use for evaluating transaction network.
   * "in" checks if a network is in the provided list.
   * "not in" checks if a network is not in the provided list.
   */
  operator: EvmNetworkOperatorEnum
});
unionType([
  SendEvmTransactionEvmNetworkCriterionSchema,
  PrepareUserOperationEvmNetworkCriterionSchema
]);
const EvmMessageCriterionSchema = objectType({
  /** The type of criterion, must be "evmMessage" for EVM message-based rules. */
  type: literalType("evmMessage"),
  /**
   * A regular expression the message is matched against.
   * Accepts valid regular expression syntax described by [RE2](https://github.com/google/re2/wiki/Syntax).
   */
  match: stringType().min(1)
});
const NetUSDChangeCriterionSchema = objectType({
  /** The type of criterion, must be "netUSDChange" for USD denominated asset transfer rules. */
  type: literalType("netUSDChange"),
  /**
   * The amount of USD, in cents, that the total USD value of a transaction's asset transfer and exposure should be compared to.
   */
  changeCents: numberType().int().nonnegative(),
  /**
   * The operator to use for the comparison. The total value of a transaction's asset transfer and exposure in USD will be on the left-hand side of the operator, and the `changeCents` field will be on the right-hand side.
   */
  operator: EthValueOperatorEnum
});
const EvmTypedAddressConditionSchema = objectType({
  /**
   * Array of EVM addresses to compare against.
   * Each address must be a 0x-prefixed 40-character hexadecimal string.
   * Limited to a maximum of 300 addresses per condition.
   */
  addresses: arrayType(Address).max(300),
  /**
   * The operator to use for evaluating addresses.
   * "in" checks if an address is in the provided list.
   * "not in" checks if an address is not in the provided list.
   */
  operator: EvmAddressOperatorEnum,
  /**
   * The path to the field to compare against this criterion.
   * To reference deeply nested fields, use dot notation (e.g., "order.buyer").
   */
  path: stringType().min(1)
});
const EvmTypedNumericalConditionSchema = objectType({
  /**
   * The numerical value to compare against, as a string.
   * Must contain only digits.
   */
  value: stringType().regex(/^[0-9]+$/),
  /**
   * The comparison operator to use.
   */
  operator: EthValueOperatorEnum,
  /**
   * The path to the field to compare against this criterion.
   * To reference deeply nested fields, use dot notation (e.g., "order.price").
   */
  path: stringType().min(1)
});
const EvmTypedStringConditionSchema = objectType({
  /**
   * A regular expression the string field is matched against.
   * Accepts valid regular expression syntax described by [RE2](https://github.com/google/re2/wiki/Syntax).
   */
  match: stringType().min(1),
  /**
   * The path to the field to compare against this criterion.
   * To reference deeply nested fields, use dot notation (e.g., "metadata.description").
   */
  path: stringType().min(1)
});
const SignEvmTypedDataFieldCriterionSchema = objectType({
  /** The type of criterion, must be "evmTypedDataField" for typed data field-based rules. */
  type: literalType("evmTypedDataField"),
  /**
   * The EIP-712 type definitions for the typed data.
   * Must include at minimum the primary type being signed.
   */
  types: objectType({
    /**
     * EIP-712 compliant map of model names to model definitions.
     */
    types: recordType(arrayType(objectType({
      name: stringType(),
      type: stringType()
    }))),
    /**
     * The name of the root EIP-712 type. This value must be included in the `types` object.
     */
    primaryType: stringType()
  }),
  /**
   * Array of conditions to apply against typed data fields.
   * Each condition specifies how to validate a specific field within the typed data.
   */
  conditions: arrayType(unionType([
    EvmTypedAddressConditionSchema,
    EvmTypedNumericalConditionSchema,
    EvmTypedStringConditionSchema
  ])).min(1)
});
const SignEvmTypedDataVerifyingContractCriterionSchema = objectType({
  /** The type of criterion, must be "evmTypedDataVerifyingContract" for verifying contract-based rules. */
  type: literalType("evmTypedDataVerifyingContract"),
  /**
   * Array of EVM addresses allowed or disallowed as verifying contracts.
   * Each address must be a 0x-prefixed 40-character hexadecimal string.
   * Limited to a maximum of 300 addresses per criterion.
   */
  addresses: arrayType(Address).max(300),
  /**
   * The operator to use for evaluating verifying contract addresses.
   * "in" checks if the verifying contract is in the provided list.
   * "not in" checks if the verifying contract is not in the provided list.
   */
  operator: EvmAddressOperatorEnum
});
const SignEvmTypedDataCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SignEvmTypedDataFieldCriterionSchema,
  SignEvmTypedDataVerifyingContractCriterionSchema
])).max(10).min(1);
const EvmDataParameterConditionListSchema = objectType({
  /**
   * The name of the parameter to check against a transaction's calldata.
   * If name is unknown, or is not named, you may supply an array index, e.g., `0` for first parameter.
   */
  name: unionType([stringType().min(1), stringType().regex(/^\d+$/)]),
  /**
   * The operator to use for the comparison. The value resolved at the `name` will be on the
   * left-hand side of the operator, and the `values` field will be on the right-hand side.
   */
  operator: enumType(["in", "not in"]),
  /**
   * Values to compare against the resolved `name` value.
   * All values are encoded as strings. Refer to the table in the documentation for how values
   * should be encoded, and which operators are supported for each type.
   */
  values: arrayType(stringType())
});
const EvmDataParameterConditionSchema = objectType({
  /**
   * The name of the parameter to check against a transaction's calldata.
   * If name is unknown, or is not named, you may supply an array index, e.g., `0` for first parameter.
   */
  name: unionType([stringType().min(1), stringType().regex(/^\d+$/)]),
  /**
   * The operator to use for the comparison. The value resolved at the `name` will be on the
   * left-hand side of the operator, and the `value` field will be on the right-hand side.
   */
  operator: EthValueOperatorEnum,
  /**
   * A single value to compare the value resolved at `name` to.
   * All values are encoded as strings. Refer to the table in the documentation for how values
   * should be encoded, and which operators are supported for each type.
   */
  value: stringType()
});
const EvmDataConditionSchema = objectType({
  /**
   * The name of a smart contract function being called.
   */
  function: stringType().min(1),
  /**
   * An optional list of parameter conditions to apply against encoded arguments in the transaction's `data` field.
   */
  params: arrayType(unionType([EvmDataParameterConditionSchema, EvmDataParameterConditionListSchema])).min(1).optional()
});
const EvmDataCriterionSchema = objectType({
  /** The type of criterion, must be "evmData" for EVM transaction rules. */
  type: literalType("evmData"),
  /**
   * The ABI of the smart contract being called. This can be a partial structure with only specific functions.
   */
  abi: unionType([enumType(["erc20", "erc721", "erc1155"]), Abi]),
  /**
   * A list of conditions to apply against the function and encoded arguments in the transaction's `data` field.
   * Each condition must be met in order for this policy to be accepted or rejected.
   */
  conditions: arrayType(EvmDataConditionSchema).min(1)
});
const SignEvmTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  EthValueCriterionSchema,
  EvmAddressCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const SignEvmMessageCriteriaSchema = arrayType(discriminatedUnionType("type", [EvmMessageCriterionSchema])).max(10).min(1);
const SendEvmTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  EthValueCriterionSchema,
  EvmAddressCriterionSchema,
  SendEvmTransactionEvmNetworkCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const PrepareUserOperationCriteriaSchema = arrayType(discriminatedUnionType("type", [
  EthValueCriterionSchema,
  EvmAddressCriterionSchema,
  PrepareUserOperationEvmNetworkCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const SendUserOperationCriteriaSchema = arrayType(discriminatedUnionType("type", [
  EthValueCriterionSchema,
  EvmAddressCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const SignEndUserEvmTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  EthValueCriterionSchema,
  EvmAddressCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const SendEndUserEvmTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  EthValueCriterionSchema,
  EvmAddressCriterionSchema,
  PrepareUserOperationEvmNetworkCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const SignEndUserEvmMessageCriteriaSchema = arrayType(discriminatedUnionType("type", [EvmMessageCriterionSchema])).max(10).min(1);
const SignEndUserEvmTypedDataCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SignEvmTypedDataFieldCriterionSchema,
  SignEvmTypedDataVerifyingContractCriterionSchema
])).max(10).min(1);
enumType([
  "signEvmTransaction",
  "sendEvmTransaction",
  "signEvmMessage",
  "signEvmTypedData",
  "signEvmHash",
  "prepareUserOperation",
  "sendUserOperation",
  "signEndUserEvmHash",
  "sendEndUserOperation"
]);
const ActionEnum$1 = enumType(["reject", "accept"]);
const SignEvmTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEvmTransaction".
   */
  operation: literalType("signEvmTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEvmTransactionCriteriaSchema
});
const SignEvmHashRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the signing, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEvmHash".
   */
  operation: literalType("signEvmHash")
});
const SignEndUserEvmHashRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the signing, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEndUserEvmHash".
   */
  operation: literalType("signEndUserEvmHash")
});
const SignEvmMessageRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the signing, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEvmMessage".
   */
  operation: literalType("signEvmMessage"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEvmMessageCriteriaSchema
});
const SignEvmTypedDataRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the signing, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEvmTypedData".
   */
  operation: literalType("signEvmTypedData"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEvmTypedDataCriteriaSchema
});
const SendEvmTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "sendEvmTransaction".
   */
  operation: literalType("sendEvmTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendEvmTransactionCriteriaSchema
});
const PrepareUserOperationRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the operation, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "prepareUserOperation".
   */
  operation: literalType("prepareUserOperation"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: PrepareUserOperationCriteriaSchema
});
const SendUserOperationRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the operation, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "sendUserOperation".
   */
  operation: literalType("sendUserOperation"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendUserOperationCriteriaSchema
});
const SignEndUserEvmTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEndUserEvmTransaction".
   */
  operation: literalType("signEndUserEvmTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEndUserEvmTransactionCriteriaSchema
});
const SendEndUserEvmTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "sendEndUserEvmTransaction".
   */
  operation: literalType("sendEndUserEvmTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendEndUserEvmTransactionCriteriaSchema
});
const SignEndUserEvmMessageRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the signing, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEndUserEvmMessage".
   */
  operation: literalType("signEndUserEvmMessage"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEndUserEvmMessageCriteriaSchema
});
const SignEndUserEvmTypedDataRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the signing, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "signEndUserEvmTypedData".
   */
  operation: literalType("signEndUserEvmTypedData"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEndUserEvmTypedDataCriteriaSchema
});
const SendEndUserOperationCriteriaSchema = arrayType(discriminatedUnionType("type", [
  EthValueCriterionSchema,
  EvmAddressCriterionSchema,
  PrepareUserOperationEvmNetworkCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const SendEndUserOperationRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the operation, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "sendEndUserOperation".
   */
  operation: literalType("sendEndUserOperation"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendEndUserOperationCriteriaSchema
});
const SendEndUserEvmAssetCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SendEvmTransactionEvmNetworkCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const SendEndUserEvmAssetRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the operation, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "sendEndUserEvmAsset".
   */
  operation: literalType("sendEndUserEvmAsset"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendEndUserEvmAssetCriteriaSchema
});
const CreateEndUserEvmSwapCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SendEvmTransactionEvmNetworkCriterionSchema,
  EvmDataCriterionSchema,
  NetUSDChangeCriterionSchema
])).max(10).min(1);
const CreateEndUserEvmSwapRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the operation, "reject" will block it.
   */
  action: ActionEnum$1,
  /**
   * The operation to which this rule applies.
   * Must be "createEndUserEvmSwap".
   */
  operation: literalType("createEndUserEvmSwap"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: CreateEndUserEvmSwapCriteriaSchema
});
const ActionEnum = enumType(["reject", "accept"]);
const SolAddressOperatorEnum = enumType(["in", "not in"]);
const SolValueOperatorEnum = enumType([">", ">=", "<", "<=", "=="]);
const SplAddressOperatorEnum = enumType(["in", "not in"]);
const SplValueOperatorEnum = enumType([">", ">=", "<", "<=", "=="]);
const MintAddressOperatorEnum = enumType(["in", "not in"]);
const ProgramIdOperatorEnum = enumType(["in", "not in"]);
const SolNetworkOperatorEnum = enumType(["in", "not in"]);
const SolNetworkEnum = enumType(["solana-devnet", "solana"]);
const KnownIdlTypeEnum = enumType(["SystemProgram", "TokenProgram", "AssociatedTokenProgram"]);
const IdlSchema = objectType({
  /** The program address */
  address: stringType(),
  /** Array of instruction specifications */
  instructions: arrayType(anyType())
}).passthrough();
const SolDataParameterOperatorEnum = enumType([">", ">=", "<", "<=", "=="]);
const SolDataParameterListOperatorEnum = enumType(["in", "not in"]);
const SolDataParameterConditionSchema = objectType({
  /** The parameter name */
  name: stringType(),
  /** The operator to use for the comparison */
  operator: SolDataParameterOperatorEnum,
  /** The value to compare against */
  value: stringType()
});
const SolDataParameterConditionListSchema = objectType({
  /** The parameter name */
  name: stringType(),
  /** The operator to use for the comparison */
  operator: SolDataParameterListOperatorEnum,
  /** The values to compare against */
  values: arrayType(stringType())
});
const SolDataConditionSchema = objectType({
  /** The instruction name */
  instruction: stringType(),
  /** Parameter conditions for the instruction */
  params: arrayType(unionType([SolDataParameterConditionSchema, SolDataParameterConditionListSchema])).optional()
});
const SolAddressCriterionSchema = objectType({
  /** The type of criterion, must be "solAddress" for Solana address-based rules. */
  type: literalType("solAddress"),
  /**
   * Array of Solana addresses to compare against.
   * Each address must be a valid Base58-encoded Solana address (32-44 characters).
   */
  addresses: arrayType(stringType().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)),
  /**
   * The operator to use for evaluating transaction addresses.
   * "in" checks if an address is in the provided list.
   * "not in" checks if an address is not in the provided list.
   */
  operator: SolAddressOperatorEnum
});
const SolValueCriterionSchema = objectType({
  /** The type of criterion, must be "solValue" for SOL value-based rules. */
  type: literalType("solValue"),
  /**
   * The SOL value amount in lamports to compare against, as a string.
   * Must contain only digits.
   */
  solValue: stringType().regex(/^[0-9]+$/),
  /** The comparison operator to use for evaluating transaction SOL values against the threshold. */
  operator: SolValueOperatorEnum
});
const SplAddressCriterionSchema = objectType({
  /** The type of criterion, must be "splAddress" for SPL address-based rules. */
  type: literalType("splAddress"),
  /**
   * Array of Solana addresses to compare against for SPL token transfer recipients.
   * Each address must be a valid Base58-encoded Solana address (32-44 characters).
   */
  addresses: arrayType(stringType().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)),
  /**
   * The operator to use for evaluating SPL token transfer recipient addresses.
   * "in" checks if an address is in the provided list.
   * "not in" checks if an address is not in the provided list.
   */
  operator: SplAddressOperatorEnum
});
const SplValueCriterionSchema = objectType({
  /** The type of criterion, must be "splValue" for SPL token value-based rules. */
  type: literalType("splValue"),
  /**
   * The SPL token value amount to compare against, as a string.
   * Must contain only digits.
   */
  splValue: stringType().regex(/^[0-9]+$/),
  /** The comparison operator to use for evaluating SPL token values against the threshold. */
  operator: SplValueOperatorEnum
});
const MintAddressCriterionSchema = objectType({
  /** The type of criterion, must be "mintAddress" for token mint address-based rules. */
  type: literalType("mintAddress"),
  /**
   * Array of Solana addresses to compare against for token mint addresses.
   * Each address must be a valid Base58-encoded Solana address (32-44 characters).
   */
  addresses: arrayType(stringType().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)),
  /**
   * The operator to use for evaluating token mint addresses.
   * "in" checks if an address is in the provided list.
   * "not in" checks if an address is not in the provided list.
   */
  operator: MintAddressOperatorEnum
});
const SolDataCriterionSchema = objectType({
  /** The type of criterion, must be "solData" for Solana data-based rules. */
  type: literalType("solData"),
  /**
   * List of IDL specifications. Can contain known program names (strings) or custom IDL objects.
   */
  idls: arrayType(unionType([KnownIdlTypeEnum, IdlSchema])),
  /**
   * A list of conditions to apply against the transaction instruction.
   * Only one condition must evaluate to true for this criterion to be met.
   */
  conditions: arrayType(SolDataConditionSchema)
});
const ProgramIdCriterionSchema = objectType({
  /** The type of criterion, must be "programId" for program ID-based rules. */
  type: literalType("programId"),
  /**
   * Array of Solana program IDs to compare against.
   * Each program ID must be a valid Base58-encoded Solana address (32-44 characters).
   */
  programIds: arrayType(stringType().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)),
  /**
   * The operator to use for evaluating transaction program IDs.
   * "in" checks if a program ID is in the provided list.
   * "not in" checks if a program ID is not in the provided list.
   */
  operator: ProgramIdOperatorEnum
});
const SolNetworkCriterionSchema = objectType({
  /** The type of criterion, must be "solNetwork" for network-based rules. */
  type: literalType("solNetwork"),
  /**
   * Array of Solana networks to compare against.
   */
  networks: arrayType(SolNetworkEnum),
  /**
   * The operator to use for evaluating transaction network.
   * "in" checks if the network is in the provided list.
   * "not in" checks if the network is not in the provided list.
   */
  operator: SolNetworkOperatorEnum
});
const SolMessageCriterionSchema = objectType({
  /** The type of criterion, must be "solMessage" for message-based rules. */
  type: literalType("solMessage"),
  /**
   * A regular expression pattern to match against the message.
   */
  match: stringType()
});
const SignSolTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SolAddressCriterionSchema,
  SolValueCriterionSchema,
  SplAddressCriterionSchema,
  SplValueCriterionSchema,
  MintAddressCriterionSchema,
  SolDataCriterionSchema,
  ProgramIdCriterionSchema
])).max(10).min(1);
const SendSolTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SolAddressCriterionSchema,
  SolValueCriterionSchema,
  SplAddressCriterionSchema,
  SplValueCriterionSchema,
  MintAddressCriterionSchema,
  SolDataCriterionSchema,
  ProgramIdCriterionSchema,
  SolNetworkCriterionSchema
])).max(10).min(1);
const SignEndUserSolTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SolAddressCriterionSchema,
  SolValueCriterionSchema,
  SplAddressCriterionSchema,
  SplValueCriterionSchema,
  MintAddressCriterionSchema,
  SolDataCriterionSchema,
  ProgramIdCriterionSchema
])).max(10).min(1);
const SendEndUserSolTransactionCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SolAddressCriterionSchema,
  SolValueCriterionSchema,
  SplAddressCriterionSchema,
  SplValueCriterionSchema,
  MintAddressCriterionSchema,
  SolDataCriterionSchema,
  ProgramIdCriterionSchema,
  SolNetworkCriterionSchema
])).max(10).min(1);
const SignEndUserSolMessageCriteriaSchema = arrayType(SolMessageCriterionSchema).max(10).min(1);
enumType([
  "signSolTransaction",
  "sendSolTransaction",
  "signSolMessage"
]);
const SignSolTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum,
  /**
   * The operation to which this rule applies.
   * Must be "signSolTransaction".
   */
  operation: literalType("signSolTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignSolTransactionCriteriaSchema
});
const SendSolTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum,
  /**
   * The operation to which this rule applies.
   * Must be "sendSolTransaction".
   */
  operation: literalType("sendSolTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendSolTransactionCriteriaSchema
});
const SignSolMessageCriteriaSchema = arrayType(SolMessageCriterionSchema).max(10).min(1);
const SignSolMessageRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the message signing, "reject" will block it.
   */
  action: ActionEnum,
  /**
   * The operation to which this rule applies.
   * Must be "signSolMessage".
   */
  operation: literalType("signSolMessage"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignSolMessageCriteriaSchema
});
const SignEndUserSolTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum,
  /**
   * The operation to which this rule applies.
   * Must be "signEndUserSolTransaction".
   */
  operation: literalType("signEndUserSolTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEndUserSolTransactionCriteriaSchema
});
const SendEndUserSolTransactionRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the transaction, "reject" will block it.
   */
  action: ActionEnum,
  /**
   * The operation to which this rule applies.
   * Must be "sendEndUserSolTransaction".
   */
  operation: literalType("sendEndUserSolTransaction"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendEndUserSolTransactionCriteriaSchema
});
const SignEndUserSolMessageRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the message signing, "reject" will block it.
   */
  action: ActionEnum,
  /**
   * The operation to which this rule applies.
   * Must be "signEndUserSolMessage".
   */
  operation: literalType("signEndUserSolMessage"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SignEndUserSolMessageCriteriaSchema
});
const SendEndUserSolAssetCriteriaSchema = arrayType(discriminatedUnionType("type", [
  SplAddressCriterionSchema,
  SplValueCriterionSchema,
  SolDataCriterionSchema,
  SolNetworkCriterionSchema
])).max(10).min(1);
const SendEndUserSolAssetRuleSchema = objectType({
  /**
   * Determines whether matching the rule will cause a request to be rejected or accepted.
   * "accept" will allow the operation, "reject" will block it.
   */
  action: ActionEnum,
  /**
   * The operation to which this rule applies.
   * Must be "sendEndUserSolAsset".
   */
  operation: literalType("sendEndUserSolAsset"),
  /**
   * The set of criteria that must be matched for this rule to apply.
   * Must be compatible with the specified operation type.
   */
  criteria: SendEndUserSolAssetCriteriaSchema
});
const PolicyScopeEnum = enumType(["project", "account"]);
const RuleSchema = discriminatedUnionType("operation", [
  SignEvmTransactionRuleSchema,
  SignEvmHashRuleSchema,
  SignEvmMessageRuleSchema,
  SignEvmTypedDataRuleSchema,
  SendEvmTransactionRuleSchema,
  SignSolTransactionRuleSchema,
  SendSolTransactionRuleSchema,
  SignSolMessageRuleSchema,
  PrepareUserOperationRuleSchema,
  SendUserOperationRuleSchema,
  SignEndUserEvmTransactionRuleSchema,
  SendEndUserEvmTransactionRuleSchema,
  SignEndUserEvmMessageRuleSchema,
  SignEndUserEvmTypedDataRuleSchema,
  SignEndUserEvmHashRuleSchema,
  SignEndUserSolTransactionRuleSchema,
  SendEndUserSolTransactionRuleSchema,
  SignEndUserSolMessageRuleSchema,
  SendEndUserEvmAssetRuleSchema,
  SendEndUserOperationRuleSchema,
  CreateEndUserEvmSwapRuleSchema,
  SendEndUserSolAssetRuleSchema
]);
const CreatePolicyBodySchema = objectType({
  /**
   * The scope of the policy.
   * "project" applies to the entire project, "account" applies to specific accounts.
   */
  scope: PolicyScopeEnum,
  /**
   * An optional human-readable description for the policy.
   * Limited to 50 characters of alphanumeric characters, spaces, commas, and periods.
   */
  description: stringType().regex(/^[A-Za-z0-9 ,.]{1,50}$/).optional(),
  /**
   * Array of rules that comprise the policy.
   * Limited to a maximum of 10 rules per policy.
   */
  rules: arrayType(RuleSchema).max(10).min(1)
});
const UpdatePolicyBodySchema = objectType({
  /**
   * An optional human-readable description for the policy.
   * Limited to 50 characters of alphanumeric characters, spaces, commas, and periods.
   */
  description: stringType().regex(/^[A-Za-z0-9 ,.]{1,50}$/).optional(),
  /**
   * Array of rules that comprise the policy.
   * Limited to a maximum of 10 rules per policy.
   */
  rules: arrayType(RuleSchema).max(10).min(1)
});
class PoliciesClient {
  /**
   * Lists policies belonging to the developer's CDP Project.
   * Can be filtered by scope (project or account).
   *
   * @param {ListPoliciesOptions} [options] - Options for filtering and paginating the results
   * @param {string} [options.scope] - Filter policies by scope ('project' or 'account')
   * @param {number} [options.pageSize] - Maximum number of policies to return
   * @param {string} [options.pageToken] - Pagination cursor for fetching next page of results
   *
   * @returns {Promise<ListPoliciesResult>} A paginated list of policies
   *
   * @example **List all policies**
   *          ```ts
   *          const { policies } = await cdp.policies.listPolicies();
   *          ```
   *
   * @example **Filter by scope**
   *          ```ts
   *          const { policies } = await cdp.policies.listPolicies({
   *            scope: 'project'
   *          });
   *          ```
   *
   * @example **With pagination**
   *          ```ts
   *          // Get first page
   *          const firstPage = await cdp.policies.listPolicies({
   *            pageSize: 10
   *          });
   *
   *          // Get next page using cursor
   *          const nextPage = await cdp.policies.listPolicies({
   *            pageSize: 10,
   *            pageToken: firstPage.pageToken
   *          });
   *          ```
   */
  async listPolicies(options = {}) {
    Analytics.trackAction({
      action: "list_policies",
      properties: {
        scope: options.scope
      }
    });
    try {
      return CdpOpenApiClient.listPolicies(options);
    } catch (error) {
      Analytics.trackError(error, "listPolicies");
      throw error;
    }
  }
  /**
   * Creates a new policy that can be used to govern the behavior of projects and accounts.
   *
   * @param {CreatePolicyOptions} options - Options for creating the policy
   * @param {CreatePolicyBody} options.policy - The policy configuration to create
   * @param {string} [options.policy.description] - Description of the policy's purpose
   * @param {Rule[]} options.policy.rules - Rules that define the policy behavior
   * @param {string} [options.idempotencyKey] - An idempotency key to prevent duplicate policy creation
   *
   * @returns {Promise<Policy>} The created policy
   * @throws {ZodError<typeof CreatePolicyBodySchema>} When the policy is invalid
   *
   * @example **Creating a new EVM policy**
   *          ```ts
   *          const policy = await cdp.policies.createPolicy({
   *            policy: {
   *              scope: "account",
   *              description: "Limits the amount of ETH in transaction",
   *              rules: [
   *                {
   *                  action: "reject",
   *                  operation: "signEvmTransaction",
   *                  criteria: [
   *                    {
   *                      type: "ethValue",
   *                      ethValue: "1000000000000000000",
   *                      operator: ">",
   *                    },
   *                  ],
   *                },
   *              ],
   *            }
   *          });
   *          ```
   *
   * @example **Creating a new Solana policy**
   *          ```ts
   *          const policy = await cdp.policies.createPolicy({
   *            policy: {
   *              scope: "account",
   *              description: "Limits SOL transfers and SPL token operations",
   *              rules: [
   *                {
   *                  action: "reject",
   *                  operation: "signSolTransaction",
   *                  criteria: [
   *                    {
   *                      type: "solValue",
   *                      solValue: "1000000000", // 1 SOL in lamports
   *                      operator: ">",
   *                    },
   *                    {
   *                      type: "solAddress",
   *                      addresses: ["9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"],
   *                      operator: "in",
   *                    },
   *                  ],
   *                },
   *                {
   *                  action: "accept",
   *                  operation: "sendSolTransaction",
   *                  criteria: [
   *                    {
   *                      type: "mintAddress",
   *                      addresses: ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"], // USDC mint
   *                      operator: "in",
   *                    },
   *                  ],
   *                },
   *              ],
   *            }
   *          });
   *          ```
   *
   * @example **With idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // First call creates the policy
   *          const policy = await cdp.policies.createPolicy({
   *            policy: {
   *              scope: "account",
   *              description: "Limits the amount of ETH in transaction",
   *              rules: [
   *                {
   *                  action: "reject",
   *                  operation: "signEvmTransaction",
   *                  criteria: [
   *                    {
   *                      type: "ethValue",
   *                      ethValue: "1000000000000000000",
   *                      operator: ">",
   *                    },
   *                  ],
   *                },
   *              ],
   *            },
   *            idempotencyKey
   *          });
   *
   *          // Second call with same key returns the same policy
   *          const samePolicy = await cdp.policies.createPolicy({
   *            policy: { ... },
   *            idempotencyKey
   *          });
   *          ```
   */
  async createPolicy(options) {
    Analytics.trackAction({
      action: "create_policy",
      properties: {
        scope: options.policy.scope
      }
    });
    try {
      CreatePolicyBodySchema.parse(options.policy);
      return CdpOpenApiClient.createPolicy(
        // There are arbitrary differences between the abitype Abi and the openapi Abi
        options.policy,
        options.idempotencyKey
      );
    } catch (error) {
      Analytics.trackError(error, "createPolicy");
      throw error;
    }
  }
  /**
   * Retrieves a policy by its unique identifier.
   *
   * @param {GetPolicyByIdOptions} options - Options containing the policy ID to retrieve
   * @param {string} options.id - The unique identifier of the policy to retrieve
   *
   * @returns {Promise<Policy>} The requested policy
   *
   * @example **Retrieving a policy by ID**
   *          ```ts
   *          const policy = await cdp.policies.getPolicyById({
   *            id: "__ID__"
   *          });
   *
   *          console.log(policy.name);
   *          console.log(policy.rules);
   *          ```
   */
  async getPolicyById(options) {
    Analytics.trackAction({
      action: "get_policy_by_id"
    });
    try {
      return CdpOpenApiClient.getPolicyById(options.id);
    } catch (error) {
      Analytics.trackError(error, "getPolicyById");
      throw error;
    }
  }
  /**
   * Deletes a policy by its unique identifier.
   * If a policy is referenced by an active project or account, this operation will fail.
   *
   * @param {DeletePolicyOptions} options - Options containing the policy ID to delete
   * @param {string} options.id - The unique identifier of the policy to delete
   * @param {string} [options.idempotencyKey] - An idempotency key to prevent duplicate deletion
   *
   * @returns {Promise<void>} Void on successful deletion
   *
   * @example **Deleting a policy**
   *          ```ts
   *          await cdp.policies.deletePolicy({
   *            id: "__ID__"
   *          });
   *          ```
   *
   * @example **With idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // This operation is idempotent with the key
   *          await cdp.policies.deletePolicy({
   *            id: "__ID__",
   *            idempotencyKey
   *          });
   *          ```
   */
  async deletePolicy(options) {
    Analytics.trackAction({
      action: "delete_policy"
    });
    try {
      return CdpOpenApiClient.deletePolicy(options.id, options.idempotencyKey);
    } catch (error) {
      Analytics.trackError(error, "deletePolicy");
      throw error;
    }
  }
  /**
   * Updates an existing policy by its unique identifier.
   * This will apply the updated policy to any project or accounts that are currently using it.
   *
   * @param {UpdatePolicyOptions} options - Options containing the policy ID and updated policy data
   * @param {string} options.id - The unique identifier of the policy to update
   * @param {UpdatePolicyBody} options.policy - The updated policy configuration
   * @param {string} [options.policy.description] - Updated description of the policy's purpose
   * @param {Rule[]} [options.policy.rules] - Updated rules that define the policy behavior
   * @param {string} [options.idempotencyKey] - An idempotency key to prevent duplicate updates
   *
   * @returns {Promise<Policy>} The updated policy
   * @throws {ZodError<typeof UpdatePolicyBodySchema>} When the updated policy is invalid
   *
   * @example **Updating an EVM policy**
   *          ```ts
   *          const updatedPolicy = await cdp.policies.updatePolicy({
   *            id: "__ID__",
   *            policy: {
   *              description: "Now with lower transaction limits",
   *              rules: [
   *                {
   *                  action: "reject",
   *                  operation: "signEvmTransaction",
   *                  criteria: [
   *                    {
   *                      type: "ethValue",
   *                      ethValue: "1000000000",
   *                      operator: ">",
   *                    },
   *                  ],
   *                },
   *              ],
   *            },
   *          });
   *          ```
   *
   * @example **Updating a Solana policy**
   *          ```ts
   *          const updatedPolicy = await cdp.policies.updatePolicy({
   *            id: "__ID__",
   *            policy: {
   *              description: "Updated Solana transaction limits",
   *              rules: [
   *                {
   *                  action: "reject",
   *                  operation: "signSolTransaction",
   *                  criteria: [
   *                    {
   *                      type: "splValue",
   *                      splValue: "1000000", // SPL token amount
   *                      operator: ">=",
   *                    },
   *                    {
   *                      type: "mintAddress",
   *                      addresses: ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"], // USDC mint
   *                      operator: "in",
   *                    },
   *                  ],
   *                },
   *              ],
   *            },
   *          });
   *          ```
   *
   * @example **With idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // This operation is idempotent with the key
   *          await cdp.policies.updatePolicy({
   *            id: "__ID__",
   *            policy: {
   *              description: "Modified Policy",
   *              rules: { ... }
   *            },
   *            idempotencyKey
   *          });
   *          ```
   */
  async updatePolicy(options) {
    Analytics.trackAction({
      action: "update_policy"
    });
    try {
      UpdatePolicyBodySchema.parse(options.policy);
      return CdpOpenApiClient.updatePolicy(
        options.id,
        // There are arbitrary differences between the abitype Abi and the openapi Abi
        options.policy,
        options.idempotencyKey
      );
    } catch (error) {
      Analytics.trackError(error, "updatePolicy");
      throw error;
    }
  }
}
async function requestFaucet(apiClient, options) {
  const signature = await apiClient.requestSolanaFaucet({ address: options.address, token: options.token }, options.idempotencyKey);
  return {
    signature: signature.transactionSignature
  };
}
async function sendTransaction(apiClient, options) {
  const signature = await apiClient.sendSolanaTransaction({
    network: options.network,
    transaction: options.transaction,
    useCdpSponsor: options.useCdpSponsor
  }, options.idempotencyKey);
  return {
    transactionSignature: signature.transactionSignature,
    signature: signature.transactionSignature
  };
}
async function signMessage(apiClient, options) {
  const signature = await apiClient.signSolanaMessage(options.address, { message: options.message }, options.idempotencyKey);
  return {
    signature: signature.signature
  };
}
async function signTransaction(apiClient, options) {
  const signature = await apiClient.signSolanaTransaction(options.address, {
    transaction: options.transaction
  }, options.idempotencyKey);
  return {
    signedTransaction: signature.signedTransaction,
    signature: signature.signedTransaction
  };
}
function createRpcClient(network) {
  const endpoint = network === "mainnet" ? "https://api.mainnet-beta.solana.com" : "https://api.devnet.solana.com";
  return createSolanaRpc(endpoint);
}
const GENESIS_HASH_MAINNET = "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d";
const GENESIS_HASH_DEVNET = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG";
const USDC_MAINNET_MINT_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const USDC_DEVNET_MINT_ADDRESS = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
function getOrCreateConnection({ networkOrConnection }) {
  if (typeof networkOrConnection !== "string") {
    return networkOrConnection;
  }
  return createSolanaRpc(networkOrConnection === "mainnet" ? "https://api.mainnet-beta.solana.com" : "https://api.devnet.solana.com");
}
async function getConnectedNetwork(rpc) {
  const genesisHash = await rpc.getGenesisHash().send();
  if (genesisHash === GENESIS_HASH_MAINNET) {
    return "mainnet";
  } else if (genesisHash === GENESIS_HASH_DEVNET) {
    return "devnet";
  }
  throw new Error("Unknown or unsupported network");
}
function getUsdcMintAddress(network) {
  if (network === "mainnet") {
    return USDC_MAINNET_MINT_ADDRESS;
  }
  return USDC_DEVNET_MINT_ADDRESS;
}
async function transfer(apiClient, options) {
  const connection = getOrCreateConnection({ networkOrConnection: options.network });
  const connectedNetwork = await getConnectedNetwork(connection);
  const rpc = createRpcClient(connectedNetwork);
  const base64Transaction = options.token === "sol" ? await getNativeTransferBase64Transaction({
    rpc,
    from: options.from,
    to: options.to,
    amount: options.amount
  }) : await getSplTransferBase64Transaction({
    rpc,
    from: options.from,
    to: options.to,
    mintAddress: options.token === "usdc" ? getUsdcMintAddress(connectedNetwork) : options.token,
    amount: options.amount
  });
  const signature = await sendTransaction(apiClient, {
    network: connectedNetwork === "mainnet" ? "solana" : "solana-devnet",
    transaction: base64Transaction
  });
  return signature;
}
async function getNativeTransferBase64Transaction({ rpc, from, to, amount }) {
  const fromAddr = address(from);
  const toAddr = address(to);
  const instructions = [
    getTransferSolInstruction({
      source: createNoopSigner(fromAddr),
      destination: toAddr,
      amount
    })
  ];
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  const txMsg = pipe(createTransactionMessage({ version: 0 }), (tx) => setTransactionMessageFeePayer(fromAddr, tx), (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx), (tx) => appendTransactionMessageInstructions(instructions, tx));
  const compiledTransaction = compileTransaction(txMsg);
  return getBase64EncodedWireTransaction(compiledTransaction);
}
async function getSplTransferBase64Transaction({ rpc, from, to, mintAddress, amount }) {
  const fromAddr = address(from);
  const toAddr = address(to);
  const mintAddr = address(mintAddress);
  const mintInfo = await fetchMint(rpc, mintAddr);
  const [sourceAta] = await findAssociatedTokenPda({
    mint: mintAddr,
    owner: fromAddr,
    tokenProgram: TOKEN_PROGRAM_ADDRESS
  });
  const [destAta] = await findAssociatedTokenPda({
    mint: mintAddr,
    owner: toAddr,
    tokenProgram: TOKEN_PROGRAM_ADDRESS
  });
  const sourceAcct = await fetchToken(rpc, sourceAta);
  if (sourceAcct.data.amount < amount) {
    throw new Error(`Insufficient token balance: have ${sourceAcct.data.amount}, need ${amount}`);
  }
  const instructions = [];
  try {
    await fetchToken(rpc, destAta);
  } catch {
    const createDestIx = await getCreateAssociatedTokenInstructionAsync({
      payer: createNoopSigner(fromAddr),
      owner: toAddr,
      ata: destAta,
      mint: mintAddr
    });
    instructions.push(createDestIx);
  }
  instructions.push(getTransferCheckedInstruction({
    source: sourceAta,
    mint: mintAddr,
    destination: destAta,
    authority: fromAddr,
    amount,
    decimals: mintInfo.data.decimals
  }));
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  const txMsg = pipe(createTransactionMessage({ version: 0 }), (tx) => setTransactionMessageFeePayer(fromAddr, tx), (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx), (tx) => appendTransactionMessageInstructions(instructions, tx));
  const compiledTransaction = compileTransaction(txMsg);
  return getBase64EncodedWireTransaction(compiledTransaction);
}
function toSolanaAccount(apiClient, options) {
  const account = {
    address: options.account.address,
    name: options.account.name,
    policies: options.account.policies,
    async requestFaucet(options2) {
      Analytics.trackAction({
        action: "request_faucet",
        accountType: "solana"
      });
      try {
        return requestFaucet(apiClient, {
          ...options2,
          address: account.address
        });
      } catch (error) {
        Analytics.trackError(error, "requestFaucet");
        throw error;
      }
    },
    async signMessage(options2) {
      Analytics.trackAction({
        action: "sign_message",
        accountType: "solana"
      });
      try {
        return signMessage(apiClient, {
          ...options2,
          address: account.address
        });
      } catch (error) {
        Analytics.trackError(error, "signMessage");
        throw error;
      }
    },
    async signTransaction(options2) {
      Analytics.trackAction({
        action: "sign_transaction",
        accountType: "solana"
      });
      try {
        return signTransaction(apiClient, {
          ...options2,
          address: account.address
        });
      } catch (error) {
        Analytics.trackError(error, "signTransaction");
        throw error;
      }
    },
    async sendTransaction(options2) {
      Analytics.trackAction({
        action: "send_transaction",
        accountType: "solana"
      });
      try {
        return sendTransaction(apiClient, {
          ...options2
        });
      } catch (error) {
        Analytics.trackError(error, "sendTransaction");
        throw error;
      }
    },
    async transfer(options2) {
      Analytics.trackAction({
        action: "transfer",
        accountType: "solana",
        properties: {
          network: options2.network
        }
      });
      try {
        return transfer(apiClient, {
          ...options2,
          from: account.address
        });
      } catch (error) {
        Analytics.trackError(error, "transfer");
        throw error;
      }
    }
  };
  return account;
}
class SolanaClient {
  /**
   * Creates a new Solana account.
   *
   * @param {CreateAccountOptions} options - Parameters for creating the Solana account.
   * @param {string} [options.name] - The name of the account.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the newly created account.
   *
   * @example **Without arguments**
   *          ```ts
   *          const account = await cdp.solana.createAccount();
   *          ```
   *
   * @example **With a name**
   *          ```ts
   *          const account = await cdp.solana.createAccount({ name: "MyAccount" });
   *          ```
   *
   * @example **With an idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // First call
   *          await cdp.solana.createAccount({ idempotencyKey });
   *
   *          // Second call with the same idempotency key will return the same account
   *          await cdp.solana.createAccount({ idempotencyKey });
   *          ```
   */
  async createAccount(options = {}) {
    Analytics.trackAction({
      action: "create_account",
      accountType: "solana"
    });
    try {
      return this._createAccountInternal(options);
    } catch (error) {
      Analytics.trackError(error, "createAccount");
      throw error;
    }
  }
  /**
   * Exports a CDP Solana account's private key.
   * It is important to store the private key in a secure place after it's exported.
   *
   * @param {ExportAccountOptions} options - Parameters for exporting the Solana account.
   * @param {string} [options.address] - The address of the account.
   * @param {string} [options.name] - The name of the account.
   *
   * @returns A promise that resolves to the exported account's full 64-byte private key as a base58 encoded string.
   *
   * @example **With an address**
   * ```ts
   * const privateKey = await cdp.solana.exportAccount({
   *   address: "1234567890123456789012345678901234567890",
   * });
   * ```
   *
   * @example **With a name**
   * ```ts
   * const privateKey = await cdp.solana.exportAccount({
   *   name: "MyAccount",
   * });
   * ```
   */
  async exportAccount(options) {
    Analytics.trackAction({
      action: "export_account",
      accountType: "solana"
    });
    try {
      const { publicKey, privateKey } = await generateExportEncryptionKeyPair();
      const { encryptedPrivateKey } = await (async () => {
        if (options.address) {
          return CdpOpenApiClient.exportSolanaAccount(options.address, {
            exportEncryptionKey: publicKey
          }, options.idempotencyKey);
        }
        if (options.name) {
          return CdpOpenApiClient.exportSolanaAccountByName(options.name, {
            exportEncryptionKey: publicKey
          }, options.idempotencyKey);
        }
        throw new UserInputValidationError("Either address or name must be provided");
      })();
      const decryptedPrivateKey = decryptWithPrivateKey(privateKey, encryptedPrivateKey);
      return await formatSolanaPrivateKey(decryptedPrivateKey);
    } catch (error) {
      if (!(error instanceof UserInputValidationError)) {
        Analytics.trackError(error, "exportAccount");
      }
      throw error;
    }
  }
  /**
   * Imports a Solana account using a private key.
   * The private key will be encrypted before being stored securely.
   *
   * @param {ImportAccountOptions} options - Parameters for importing the Solana account.
   * @param {string} options.privateKey - The private key to import (32 or 64 bytes). Can be a base58 encoded string or raw bytes.
   * @param {string} [options.name] - The name of the account.
   * @param {string} [options.encryptionPublicKey] - The RSA public key for encrypting the private key.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the imported account.
   *
   * @example **Import with private key only**
   *          ```ts
   *          const account = await cdp.solana.importAccount({
   *            privateKey: "3Kzj...",
   *          });
   *          ```
   *
   * @example **Import with name**
   *          ```ts
   *          const account = await cdp.solana.importAccount({
   *            privateKey: "3Kzj...",
   *            name: "ImportedAccount",
   *          });
   *          ```
   *
   * @example **Import with idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          const account = await cdp.solana.importAccount({
   *            privateKey: "3Kzj...",
   *            name: "ImportedAccount",
   *            idempotencyKey,
   *          });
   *          ```
   */
  async importAccount(options) {
    Analytics.trackAction({
      action: "import_account",
      accountType: "solana"
    });
    try {
      let privateKeyBytes = new Uint8Array();
      if (typeof options.privateKey === "string") {
        privateKeyBytes = bs58.decode(options.privateKey);
      } else {
        privateKeyBytes = options.privateKey;
      }
      if (privateKeyBytes.length !== 32 && privateKeyBytes.length !== 64) {
        throw new UserInputValidationError("Invalid private key length");
      }
      if (privateKeyBytes.length === 64) {
        privateKeyBytes = privateKeyBytes.subarray(0, 32);
      }
      const encryptionPublicKey = options.encryptionPublicKey || ImportAccountPublicRSAKey;
      const encryptedPrivateKey = publicEncrypt({
        key: encryptionPublicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
      }, privateKeyBytes);
      const openApiAccount = await CdpOpenApiClient.importSolanaAccount({
        encryptedPrivateKey: encryptedPrivateKey.toString("base64"),
        name: options.name
      }, options.idempotencyKey);
      const account = toSolanaAccount(CdpOpenApiClient, {
        account: openApiAccount
      });
      return account;
    } catch (error) {
      if (!(error instanceof UserInputValidationError)) {
        Analytics.trackError(error, "importAccount");
      }
      throw error;
    }
  }
  /**
   * Gets a Solana account by its address.
   *
   * @param {GetAccountOptions} options - Parameters for getting the Solana account.
   * Either `address` or `name` must be provided.
   * If both are provided, lookup will be done by `address` and `name` will be ignored.
   * @param {string} [options.address] - The address of the account.
   * @param {string} [options.name] - The name of the account.
   *
   * @returns A promise that resolves to the account.
   *
   * @example **Get an account by address**
   *          ```ts
   *          const account = await cdp.solana.getAccount({
   *            address: "1234567890123456789012345678901234567890",
   *          });
   *          ```
   *
   * @example **Get an account by name**
   *          ```ts
   *          const account = await cdp.solana.getAccount({
   *            name: "MyAccount",
   *          });
   *          ```
   */
  async getAccount(options) {
    Analytics.trackAction({
      action: "get_account",
      accountType: "solana"
    });
    try {
      return this._getAccountInternal(options);
    } catch (error) {
      Analytics.trackError(error, "getAccount");
      throw error;
    }
  }
  /**
   * Gets a Solana account by its address.
   *
   * @param {GetOrCreateAccountOptions} options - Parameters for getting or creating the Solana account.
   * @param {string} options.name - The name of the account.
   *
   * @returns A promise that resolves to the account.
   *
   * @example
   * ```ts
   * const account = await cdp.solana.getOrCreateAccount({
   *   name: "MyAccount",
   * });
   * ```
   */
  async getOrCreateAccount(options) {
    Analytics.trackAction({
      action: "get_or_create_account",
      accountType: "solana"
    });
    try {
      try {
        const account = await this._getAccountInternal(options);
        return account;
      } catch (error) {
        const doesAccountNotExist = error instanceof APIError && error.statusCode === 404;
        if (doesAccountNotExist) {
          try {
            const account = await this._createAccountInternal(options);
            return account;
          } catch (error2) {
            const doesAccountAlreadyExist = error2 instanceof APIError && error2.statusCode === 409;
            if (doesAccountAlreadyExist) {
              const account = await this._getAccountInternal(options);
              return account;
            }
            throw error2;
          }
        }
        throw error;
      }
    } catch (error) {
      Analytics.trackError(error, "getOrCreateAccount");
      throw error;
    }
  }
  /**
   * Lists all Solana accounts.
   *
   * @param {ListAccountsOptions} options - Parameters for listing the Solana accounts.
   * @param {number} [options.pageSize] - The number of accounts to return.
   * @param {string} [options.pageToken] - The page token to begin listing from.
   * This is obtained by previous calls to this method.
   *
   * @returns A promise that resolves to an array of Solana account instances.
   *
   * @example **Without arguments**
   *          ```ts
   *          const accounts = await cdp.solana.listAccounts();
   *          ```
   *
   * @example **With pagination**
   *          ```ts
   *          let page = await cdp.solana.listAccounts();
   *
   *          while (page.nextPageToken) {
   *            page = await cdp.solana.listAccounts({ pageToken: page.nextPageToken });
   *          }
   *
   *          page.accounts.forEach(account => console.log(account));
   *          ```
   * }
   * ```
   */
  async listAccounts(options = {}) {
    Analytics.trackAction({
      action: "list_accounts",
      accountType: "solana"
    });
    try {
      const solAccounts = await CdpOpenApiClient.listSolanaAccounts({
        pageSize: options.pageSize,
        pageToken: options.pageToken
      });
      return {
        accounts: solAccounts.accounts.map((account) => {
          const solanaAccount = toSolanaAccount(CdpOpenApiClient, {
            account
          });
          return solanaAccount;
        }),
        nextPageToken: solAccounts.nextPageToken
      };
    } catch (error) {
      Analytics.trackError(error, "listAccounts");
      throw error;
    }
  }
  /**
   * Requests funds from a Solana faucet.
   *
   * @param {RequestFaucetOptions} options - Parameters for requesting funds from the Solana faucet.
   * @param {string} options.address - The address to request funds for.
   * @param {string} options.token - The token to request funds for.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the transaction signature.
   *
   * @example
   *          ```ts
   *          const signature = await cdp.solana.requestFaucet({
   *            address: "1234567890123456789012345678901234567890",
   *            token: "sol",
   *          });
   *          ```
   */
  async requestFaucet(options) {
    Analytics.trackAction({
      action: "request_faucet",
      accountType: "solana"
    });
    try {
      return requestFaucet(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "requestFaucet");
      throw error;
    }
  }
  /**
   * Signs a message.
   *
   * @param {SignMessageOptions} options - Parameters for signing the message.
   * @param {string} options.address - The address to sign the message for.
   * @param {string} options.message - The message to sign.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * // Create a Solana account
   * const account = await cdp.solana.createAccount();
   *
   * // When you want to sign a message, you can do so by address
   * const signature = await cdp.solana.signMessage({
   *   address: account.address,
   *   message: "Hello, world!",
   * });
   * ```
   */
  async signMessage(options) {
    Analytics.trackAction({
      action: "sign_message",
      accountType: "solana"
    });
    try {
      return signMessage(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "signMessage");
      throw error;
    }
  }
  /**
   * Signs a transaction.
   *
   * @param {SignTransactionOptions} options - Parameters for signing the transaction.
   * @param {string} options.address - The address to sign the transaction for.
   * @param {string} options.transaction - The transaction to sign.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the signature.
   *
   * @example
   * ```ts
   * // Create a Solana account
   * const account = await cdp.solana.createAccount();
   *
   * // Build your transaction using @solana/kit
   * import {
   *   address as solanaAddress,
   *   appendTransactionMessageInstructions,
   *   compileTransaction,
   *   createNoopSigner,
   *   createSolanaRpc,
   *   createTransactionMessage,
   *   getBase64EncodedWireTransaction,
   *   pipe,
   *   setTransactionMessageFeePayer,
   *   setTransactionMessageLifetimeUsingBlockhash,
   * } from "@solana/kit";
   * import { getTransferSolInstruction } from "@solana-program/system";
   *
   * const rpc = createSolanaRpc("https://api.devnet.solana.com");
   * const { value: { blockhash, lastValidBlockHeight } } = await rpc.getLatestBlockhash().send();
   *
   * const txMsg = pipe(
   *   createTransactionMessage({ version: 0 }),
   *   (tx) => setTransactionMessageFeePayer(solanaAddress(account.address), tx),
   *   (tx) => setTransactionMessageLifetimeUsingBlockhash(
   *     { blockhash, lastValidBlockHeight },
   *     tx,
   *   ),
   *   (tx) => appendTransactionMessageInstructions([
   *     getTransferSolInstruction({
   *       source: createNoopSigner(solanaAddress(account.address)),
   *       destination: solanaAddress("3KzDtddx4i53FBkvCzuDmRbaMozTZoJBb1TToWhz3JfE"),
   *       amount: 10000n,
   *     }),
   *   ], tx),
   * );
   *
   * // Base64 encode the compiled transaction
   * const transaction = getBase64EncodedWireTransaction(compileTransaction(txMsg));
   *
   * // Sign the transaction via the CDP API
   * const signature = await cdp.solana.signTransaction({
   *   address: account.address,
   *   transaction,
   * });
   * ```
   */
  async signTransaction(options) {
    Analytics.trackAction({
      action: "sign_transaction",
      accountType: "solana"
    });
    try {
      return signTransaction(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "signTransaction");
      throw error;
    }
  }
  /**
   * Updates a CDP Solana account.
   *
   * @param {UpdateSolanaAccountOptions} [options] - Optional parameters for creating the account.
   * @param {string} options.address - The address of the account to update
   * @param {UpdateSolanaAccountBody} options.update - An object containing account fields to update.
   * @param {string} [options.update.name] - The new name for the account.
   * @param {string} [options.update.accountPolicy] - The ID of a Policy to apply to the account.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the updated account.
   *
   * @example **With a name**
   *          ```ts
   *          const account = await cdp.sol.updateAccount({ address: "...", update: { name: "New Name" } });
   *          ```
   *
   * @example **With an account policy**
   *          ```ts
   *          const account = await cdp.sol.updateAccount({ address: "...", update: { accountPolicy: "73bcaeeb-d7af-4615-b064-42b5fe83a31e" } });
   *          ```
   *
   * @example **With an idempotency key**
   *          ```ts
   *          const idempotencyKey = uuidv4();
   *
   *          // First call
   *          await cdp.sol.updateAccount({
   *            address: "0x...",
   *            update: { accountPolicy: "73bcaeeb-d7af-4615-b064-42b5fe83a31e" },
   *            idempotencyKey,
   *          });
   *
   *          // Second call with the same idempotency key will not update
   *          await cdp.sol.updateAccount({
   *            address: '0x...',
   *            update: { name: "" },
   *            idempotencyKey,
   *          });
   *          ```
   */
  async updateAccount(options) {
    Analytics.trackAction({
      action: "update_account",
      accountType: "solana"
    });
    try {
      const openApiAccount = await CdpOpenApiClient.updateSolanaAccount(options.address, options.update, options.idempotencyKey);
      const account = toSolanaAccount(CdpOpenApiClient, {
        account: openApiAccount
      });
      return account;
    } catch (error) {
      Analytics.trackError(error, "updateAccount");
      throw error;
    }
  }
  /**
   * Sends a Solana transaction using the Coinbase API.
   *
   * @param {SendTransactionOptions} options - Parameters for sending the Solana transaction.
   * @param {string} options.network - The network to send the transaction to.
   * @param {string} options.transaction - The base64 encoded transaction to send.
   * @param {boolean} [options.useCdpSponsor] - Whether CDP should sponsor the transaction fees.
   * @param {string} [options.idempotencyKey] - An idempotency key.
   *
   * @returns A promise that resolves to the transaction result.
   *
   * @example
   * ```ts
   * const signature = await cdp.solana.sendTransaction({
   *   network: "solana-devnet",
   *   transaction: "...",
   *   useCdpSponsor: true,
   * });
   * ```
   */
  async sendTransaction(options) {
    Analytics.trackAction({
      action: "send_transaction",
      accountType: "solana",
      properties: {
        network: options.network
      }
    });
    try {
      return sendTransaction(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "sendTransaction");
      throw error;
    }
  }
  /**
   * Lists the token balances for a Solana account.
   *
   * @param {ListTokenBalancesOptions} options - Parameters for listing the Solana token balances.
   * @param {string} options.address - The address of the account to list token balances for.
   * @param {string} [options.network] - The network to list token balances for. Defaults to "solana".
   * @param {number} [options.pageSize] - The number of token balances to return.
   * @param {string} [options.pageToken] - The page token to begin listing from.
   * This is obtained by previous calls to this method.
   *
   * @returns A promise that resolves to an array of Solana token balance instances.
   *
   * @example
   * ```ts
   * const balances = await cdp.solana.listTokenBalances({ address: "...", network: "solana-devnet" });
   * ```
   */
  async listTokenBalances(options) {
    Analytics.trackAction({
      action: "list_token_balances",
      accountType: "solana",
      properties: {
        network: options.network
      }
    });
    try {
      const tokenBalances = await CdpOpenApiClient.listSolanaTokenBalances(options.network || "solana", options.address, {
        pageSize: options.pageSize,
        pageToken: options.pageToken
      });
      return {
        balances: tokenBalances.balances.map((balance) => {
          return {
            amount: {
              amount: BigInt(balance.amount.amount),
              decimals: balance.amount.decimals
            },
            token: {
              mintAddress: balance.token.mintAddress,
              name: balance.token.name,
              symbol: balance.token.symbol
            }
          };
        }),
        nextPageToken: tokenBalances.nextPageToken
      };
    } catch (error) {
      Analytics.trackError(error, "listTokenBalances");
      throw error;
    }
  }
  /**
   * Internal method to create a Solana account without tracking analytics.
   * Used internally by composite operations to avoid double-counting.
   *
   * @param {CreateAccountOptions} options - Parameters for creating the account.
   * @returns {Promise<SolanaAccount>} A promise that resolves to the newly created account.
   */
  async _createAccountInternal(options = {}) {
    const openApiAccount = await CdpOpenApiClient.createSolanaAccount({
      name: options.name,
      accountPolicy: options.accountPolicy
    }, options.idempotencyKey);
    const account = toSolanaAccount(CdpOpenApiClient, {
      account: openApiAccount
    });
    return account;
  }
  /**
   * Internal method to get a Solana account without tracking analytics.
   * Used internally by composite operations to avoid double-counting.
   *
   * @param {GetAccountOptions} options - Parameters for getting the account.
   * @returns {Promise<SolanaAccount>} A promise that resolves to the account.
   */
  async _getAccountInternal(options) {
    const openApiAccount = await (() => {
      if (options.address) {
        return CdpOpenApiClient.getSolanaAccount(options.address);
      }
      if (options.name) {
        return CdpOpenApiClient.getSolanaAccountByName(options.name);
      }
      throw new UserInputValidationError("Either address or name must be provided");
    })();
    const account = toSolanaAccount(CdpOpenApiClient, {
      account: openApiAccount
    });
    return account;
  }
}
async function createWebhookSubscription(client, options) {
  const response = await client.createWebhookSubscription({
    description: options.description,
    eventTypes: options.eventTypes,
    target: {
      url: options.targetUrl,
      headers: options.targetHeaders
    },
    isEnabled: options.isEnabled ?? true,
    metadata: options.metadata
  });
  return {
    subscriptionId: response.subscriptionId,
    description: response.description,
    eventTypes: response.eventTypes,
    targetUrl: response.target.url,
    targetHeaders: response.target.headers,
    isEnabled: response.isEnabled,
    secret: response.secret,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt
  };
}
class WebhooksClient {
  /**
   * Creates a webhook subscription for wallet transaction events.
   *
   * @param {CreateWebhookSubscriptionOptions} options - Parameters for creating the webhook subscription.
   * @param {string} [options.description] - A description of the webhook subscription.
   * @param {WebhookEventType[]} options.eventTypes - The event types to subscribe to.
   * @param {string} options.targetUrl - The URL to deliver webhook events to.
   * @param {Record<string, string>} [options.targetHeaders] - Additional headers to include in webhook requests.
   * @param {boolean} [options.isEnabled] - Whether the subscription is enabled. Defaults to `true`.
   * @param {Record<string, string>} [options.metadata] - Additional metadata for the subscription.
   *
   * @returns A promise that resolves to the created webhook subscription.
   *
   * @example
   * ```ts
   * const subscription = await cdp.webhooks.createSubscription({
   *   description: "Monitor wallet transactions",
   *   eventTypes: [
   *     "wallet.transaction.pending",
   *     "wallet.transaction.confirmed",
   *     "wallet.transaction.failed",
   *   ],
   *   targetUrl: "https://example.com/webhook",
   *   isEnabled: true,
   * });
   *
   * console.log("Subscription ID:", subscription.subscriptionId);
   * console.log("Secret:", subscription.secret);
   * ```
   */
  async createSubscription(options) {
    Analytics.trackAction({
      action: "create_webhook_subscription"
    });
    try {
      return await createWebhookSubscription(CdpOpenApiClient, options);
    } catch (error) {
      Analytics.trackError(error, "createWebhookSubscription");
      throw error;
    }
  }
}
class CdpClient {
  /** Namespace containing all EVM methods. */
  evm;
  /** Namespace containing all Solana methods. */
  solana;
  /** Namespace containing all Policies methods. */
  policies;
  /** Namespace containing all end user methods. */
  endUser;
  /** Namespace containing all webhook methods. */
  webhooks;
  /**
   * The CdpClient is the main class for interacting with the CDP API.
   *
   * There are a few required parameters that are configured in the [CDP Portal](https://portal.cdp.coinbase.com/projects/api-keys):
   * - **CDP Secret API Key** (`apiKeyId` & `apiKeySecret`): These are used to authenticate requests to the entire suite of
   *   APIs offered on Coinbase Developer Platform.
   *   [Read more about CDP API keys](https://docs.cdp.coinbase.com/get-started/docs/cdp-api-keys).
   * - **Wallet Secret** (`walletSecret`): This secret is used specifically to authenticate requests to `POST`, and `DELETE`
   *   endpoints in the EVM and Solana Account APIs.
   *
   * These parameters can be set as environment variables:
   * ```
   * CDP_API_KEY_ID=your-api-key-id
   * CDP_API_KEY_SECRET=your-api-key-secret
   * CDP_WALLET_SECRET=your-wallet-secret
   * ```
   *
   * Or passed as options to the constructor:
   *
   * ```typescript
   * const cdp = new CdpClient({
   *   apiKeyId: "your-api-key-id",
   *   apiKeySecret: "your-api-key-secret",
   *   walletSecret: "your-wallet-secret",
   * });
   * ```
   *
   * The CdpClient is namespaced by chain type: `evm` or `solana`.
   *
   * As an example, to create a new EVM account, use `cdp.evm.createAccount()`.
   *
   * To create a new Solana account, use `cdp.solana.createAccount()`.
   *
   * @param {CdpClientOptions} [options] - Configuration options for the CdpClient.
   */
  constructor(options = {}) {
    if (Number(process.versions.node.split(".")[0]) < 19) {
      throw new Error(`
Node.js version ${process.versions.node} is not supported. CDP SDK requires Node.js version 19 or higher. Please upgrade your Node.js version to use the CDP SDK.
We recommend using https://github.com/Schniz/fnm for managing your Node.js version.
        `);
    }
    const apiKeyId = options.apiKeyId ?? process.env.CDP_API_KEY_ID ?? process.env.CDP_API_KEY_NAME;
    const apiKeySecret = options.apiKeySecret ?? process.env.CDP_API_KEY_SECRET;
    const walletSecret = options.walletSecret ?? process.env.CDP_WALLET_SECRET;
    if (!apiKeyId || !apiKeySecret) {
      throw new Error(`

Missing required CDP Secret API Key configuration parameters.

You can set them as environment variables:

CDP_API_KEY_ID=your-api-key-id
CDP_API_KEY_SECRET=your-api-key-secret

You can also pass them as options to the constructor:

const cdp = new CdpClient({
  apiKeyId: "your-api-key-id",
  apiKeySecret: "your-api-key-secret",
});

If you're performing write operations, make sure to also set your wallet secret:

CDP_WALLET_SECRET=your-wallet-secret

This is also available as an option to the constructor:

const cdp = new CdpClient({
  apiKeyId: "your-api-key-id",
  apiKeySecret: "your-api-key-secret",
  walletSecret: "your-wallet-secret",
});

For more information, see: https://github.com/coinbase/cdp-sdk/blob/main/typescript/README.md#api-keys.
`);
    }
    CdpOpenApiClient.configure({
      ...options,
      apiKeyId,
      apiKeySecret,
      walletSecret,
      source: "sdk",
      sourceVersion: version
    });
    if (process.env.DISABLE_CDP_ERROR_REPORTING !== "true" || process.env.DISABLE_CDP_USAGE_TRACKING !== "true") {
      Analytics.identifier = apiKeyId;
    }
    this.evm = new EvmClient();
    this.solana = new SolanaClient();
    this.policies = new PoliciesClient();
    this.endUser = new EndUserClient();
    this.webhooks = new WebhooksClient();
  }
}
export {
  CdpClient as C
};
