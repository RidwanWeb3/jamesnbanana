import { c as createSolanaRpcApi } from "./solana__rpc-api.mjs";
import { a as createRpc, i as isJsonRpcPayload } from "./solana__rpc-spec.mjs";
import { S as SolanaError, I as SOLANA_ERROR__RPC__INTEGER_OVERFLOW, J as safeCaptureStackTrace } from "./solana__errors.mjs";
import { p as pipe } from "./solana__functional.mjs";
import { c as createHttpTransportForSolanaRpc } from "./solana__rpc-transport-http.mjs";
import { setMaxListeners } from "events";
import { i as index_default } from "./solana__fast-stable-stringify.mjs";
function createSolanaJsonRpcIntegerOverflowError(methodName, keyPath, value) {
  let argumentLabel = "";
  if (typeof keyPath[0] === "number") {
    const argPosition = keyPath[0] + 1;
    const lastDigit = argPosition % 10;
    const lastTwoDigits = argPosition % 100;
    if (lastDigit == 1 && lastTwoDigits != 11) {
      argumentLabel = argPosition + "st";
    } else if (lastDigit == 2 && lastTwoDigits != 12) {
      argumentLabel = argPosition + "nd";
    } else if (lastDigit == 3 && lastTwoDigits != 13) {
      argumentLabel = argPosition + "rd";
    } else {
      argumentLabel = argPosition + "th";
    }
  } else {
    argumentLabel = `\`${keyPath[0].toString()}\``;
  }
  const path = keyPath.length > 1 ? keyPath.slice(1).map((pathPart) => typeof pathPart === "number" ? `[${pathPart}]` : pathPart).join(".") : void 0;
  const error = new SolanaError(SOLANA_ERROR__RPC__INTEGER_OVERFLOW, {
    argumentLabel,
    keyPath,
    methodName,
    optionalPathLabel: path ? ` at path \`${path}\`` : "",
    value,
    ...path !== void 0 ? { path } : void 0
  });
  safeCaptureStackTrace(error, createSolanaJsonRpcIntegerOverflowError);
  return error;
}
var DEFAULT_RPC_CONFIG = {
  defaultCommitment: "confirmed",
  onIntegerOverflow(request, keyPath, value) {
    throw createSolanaJsonRpcIntegerOverflowError(request.methodName, keyPath, value);
  }
};
var e = class extends globalThis.AbortController {
  constructor(...t) {
    super(...t), setMaxListeners(Number.MAX_SAFE_INTEGER, this.signal);
  }
};
var EXPLICIT_ABORT_TOKEN;
function createExplicitAbortToken() {
  return {};
}
function getRpcTransportWithRequestCoalescing(transport, getDeduplicationKey) {
  let coalescedRequestsByDeduplicationKey;
  return async function makeCoalescedHttpRequest(request) {
    const { payload, signal } = request;
    const deduplicationKey = getDeduplicationKey(payload);
    if (deduplicationKey === void 0) {
      return await transport(request);
    }
    if (!coalescedRequestsByDeduplicationKey) {
      queueMicrotask(() => {
        coalescedRequestsByDeduplicationKey = void 0;
      });
      coalescedRequestsByDeduplicationKey = {};
    }
    if (coalescedRequestsByDeduplicationKey[deduplicationKey] == null) {
      const abortController = new e();
      const responsePromise = (async () => {
        try {
          return await transport({
            ...request,
            signal: abortController.signal
          });
        } catch (e2) {
          if (e2 === (EXPLICIT_ABORT_TOKEN ||= createExplicitAbortToken())) {
            return;
          }
          throw e2;
        }
      })();
      coalescedRequestsByDeduplicationKey[deduplicationKey] = {
        abortController,
        numConsumers: 0,
        responsePromise
      };
    }
    const coalescedRequest = coalescedRequestsByDeduplicationKey[deduplicationKey];
    coalescedRequest.numConsumers++;
    if (signal) {
      const responsePromise = coalescedRequest.responsePromise;
      return await new Promise((resolve, reject) => {
        const handleAbort = (e2) => {
          signal.removeEventListener("abort", handleAbort);
          coalescedRequest.numConsumers -= 1;
          queueMicrotask(() => {
            if (coalescedRequest.numConsumers === 0) {
              const abortController = coalescedRequest.abortController;
              abortController.abort(EXPLICIT_ABORT_TOKEN ||= createExplicitAbortToken());
            }
          });
          reject(e2.target.reason);
        };
        signal.addEventListener("abort", handleAbort);
        responsePromise.then(resolve).catch(reject).finally(() => {
          signal.removeEventListener("abort", handleAbort);
        });
      });
    } else {
      return await coalescedRequest.responsePromise;
    }
  };
}
function getSolanaRpcPayloadDeduplicationKey(payload) {
  return isJsonRpcPayload(payload) ? index_default([payload.method, payload.params]) : void 0;
}
function normalizeHeaders(headers) {
  const out = {};
  for (const headerName in headers) {
    out[headerName.toLowerCase()] = headers[headerName];
  }
  return out;
}
function createDefaultRpcTransport(config) {
  return pipe(
    createHttpTransportForSolanaRpc({
      ...config,
      headers: {
        ...{
          // Keep these headers lowercase so they will be overridden by any user-supplied headers below.
          "accept-encoding": (
            // Natively supported by Node LTS v20.18.0 and above.
            "br,gzip,deflate"
          )
          // Brotli, gzip, and Deflate, in that order.
        },
        ...config.headers ? normalizeHeaders(config.headers) : void 0,
        ...{
          // Keep these headers lowercase so they will override any user-supplied headers above.
          "solana-client": `js/${"5.5.1"}`
        }
      }
    }),
    (transport) => getRpcTransportWithRequestCoalescing(transport, getSolanaRpcPayloadDeduplicationKey)
  );
}
function createSolanaRpc(clusterUrl, config) {
  return createSolanaRpcFromTransport(createDefaultRpcTransport({ url: clusterUrl, ...config }));
}
function createSolanaRpcFromTransport(transport) {
  return createRpc({
    api: createSolanaRpcApi(DEFAULT_RPC_CONFIG),
    transport
  });
}
export {
  createSolanaRpc as c
};
