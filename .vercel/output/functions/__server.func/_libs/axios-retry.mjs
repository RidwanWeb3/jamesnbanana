import { i as isRetryAllowed } from "./is-retry-allowed.mjs";
const namespace = "axios-retry";
function isNetworkError(error) {
  const CODE_EXCLUDE_LIST = ["ERR_CANCELED", "ECONNABORTED"];
  if (error.response) {
    return false;
  }
  if (!error.code) {
    return false;
  }
  if (CODE_EXCLUDE_LIST.includes(error.code)) {
    return false;
  }
  return isRetryAllowed(error);
}
const SAFE_HTTP_METHODS = ["get", "head", "options"];
const IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(["put", "delete"]);
function isRetryableError(error) {
  return error.code !== "ECONNABORTED" && (!error.response || error.response.status === 429 || error.response.status >= 500 && error.response.status <= 599);
}
function isSafeRequestError(error) {
  if (!error.config?.method) {
    return false;
  }
  return isRetryableError(error) && SAFE_HTTP_METHODS.indexOf(error.config.method) !== -1;
}
function isIdempotentRequestError(error) {
  if (!error.config?.method) {
    return false;
  }
  return isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method) !== -1;
}
function isNetworkOrIdempotentRequestError(error) {
  return isNetworkError(error) || isIdempotentRequestError(error);
}
function retryAfter(error = void 0) {
  const retryAfterHeader = error?.response?.headers["retry-after"];
  if (!retryAfterHeader) {
    return 0;
  }
  let retryAfterMs = (Number(retryAfterHeader) || 0) * 1e3;
  if (retryAfterMs === 0) {
    retryAfterMs = (new Date(retryAfterHeader).valueOf() || 0) - Date.now();
  }
  return Math.max(0, retryAfterMs);
}
function noDelay(_retryNumber = 0, error = void 0) {
  return Math.max(0, retryAfter(error));
}
function exponentialDelay(retryNumber = 0, error = void 0, delayFactor = 100) {
  const calculatedDelay = 2 ** retryNumber * delayFactor;
  const delay = Math.max(calculatedDelay, retryAfter(error));
  const randomSum = delay * 0.2 * Math.random();
  return delay + randomSum;
}
function linearDelay(delayFactor = 100) {
  return (retryNumber = 0, error = void 0) => {
    const delay = retryNumber * delayFactor;
    return Math.max(delay, retryAfter(error));
  };
}
const DEFAULT_OPTIONS = {
  retries: 3,
  retryCondition: isNetworkOrIdempotentRequestError,
  retryDelay: noDelay,
  shouldResetTimeout: false,
  onRetry: () => {
  },
  onMaxRetryTimesExceeded: () => {
  },
  validateResponse: null
};
function getRequestOptions(config, defaultOptions) {
  return { ...DEFAULT_OPTIONS, ...defaultOptions, ...config[namespace] };
}
function setCurrentState(config, defaultOptions, resetLastRequestTime = false) {
  const currentState = getRequestOptions(config, defaultOptions || {});
  currentState.retryCount = currentState.retryCount || 0;
  if (!currentState.lastRequestTime || resetLastRequestTime) {
    currentState.lastRequestTime = Date.now();
  }
  config[namespace] = currentState;
  return currentState;
}
function fixConfig(axiosInstance, config) {
  if (axiosInstance.defaults.agent === config.agent) {
    delete config.agent;
  }
  if (axiosInstance.defaults.httpAgent === config.httpAgent) {
    delete config.httpAgent;
  }
  if (axiosInstance.defaults.httpsAgent === config.httpsAgent) {
    delete config.httpsAgent;
  }
}
async function shouldRetry(currentState, error) {
  const { retries, retryCondition } = currentState;
  const shouldRetryOrPromise = (currentState.retryCount || 0) < retries && retryCondition(error);
  if (typeof shouldRetryOrPromise === "object") {
    try {
      const shouldRetryPromiseResult = await shouldRetryOrPromise;
      return shouldRetryPromiseResult !== false;
    } catch (_err) {
      return false;
    }
  }
  return shouldRetryOrPromise;
}
async function handleRetry(axiosInstance, currentState, error, config) {
  currentState.retryCount += 1;
  const { retryDelay, shouldResetTimeout, onRetry } = currentState;
  const delay = retryDelay(currentState.retryCount, error);
  fixConfig(axiosInstance, config);
  if (!shouldResetTimeout && config.timeout && currentState.lastRequestTime) {
    const lastRequestDuration = Date.now() - currentState.lastRequestTime;
    const timeout = config.timeout - lastRequestDuration - delay;
    if (timeout <= 0) {
      return Promise.reject(error);
    }
    config.timeout = timeout;
  }
  config.transformRequest = [(data) => data];
  await onRetry(currentState.retryCount, error, config);
  if (config.signal?.aborted) {
    return Promise.resolve(axiosInstance(config));
  }
  return new Promise((resolve) => {
    const abortListener = () => {
      clearTimeout(timeout);
      resolve(axiosInstance(config));
    };
    const timeout = setTimeout(() => {
      resolve(axiosInstance(config));
      if (config.signal?.removeEventListener) {
        config.signal.removeEventListener("abort", abortListener);
      }
    }, delay);
    if (config.signal?.addEventListener) {
      config.signal.addEventListener("abort", abortListener, { once: true });
    }
  });
}
async function handleMaxRetryTimesExceeded(currentState, error) {
  if (currentState.retryCount >= currentState.retries)
    await currentState.onMaxRetryTimesExceeded(error, currentState.retryCount);
}
const axiosRetry = (axiosInstance, defaultOptions) => {
  const requestInterceptorId = axiosInstance.interceptors.request.use((config) => {
    setCurrentState(config, defaultOptions, true);
    if (config[namespace]?.validateResponse) {
      config.validateStatus = () => false;
    }
    return config;
  });
  const responseInterceptorId = axiosInstance.interceptors.response.use(null, async (error) => {
    const { config } = error;
    if (!config) {
      return Promise.reject(error);
    }
    const currentState = setCurrentState(config, defaultOptions);
    if (error.response && currentState.validateResponse?.(error.response)) {
      return error.response;
    }
    if (await shouldRetry(currentState, error)) {
      return handleRetry(axiosInstance, currentState, error, config);
    }
    await handleMaxRetryTimesExceeded(currentState, error);
    return Promise.reject(error);
  });
  return { requestInterceptorId, responseInterceptorId };
};
axiosRetry.isNetworkError = isNetworkError;
axiosRetry.isSafeRequestError = isSafeRequestError;
axiosRetry.isIdempotentRequestError = isIdempotentRequestError;
axiosRetry.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
axiosRetry.exponentialDelay = exponentialDelay;
axiosRetry.linearDelay = linearDelay;
axiosRetry.isRetryableError = isRetryableError;
export {
  axiosRetry as a,
  exponentialDelay as e
};
