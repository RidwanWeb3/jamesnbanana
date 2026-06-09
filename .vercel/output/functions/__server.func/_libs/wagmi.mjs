import { h as hydrate, B as BaseError$1, a as hashFn, w as watchChainId, g as getChainId, b as getBalanceQueryOptions, d as deepEqual, c as getConnection, e as watchConnection, f as watchChains, i as getChains, r as readContractQueryOptions, j as readContractsQueryOptions, s as switchChainMutationOptions, k as waitForTransactionReceiptQueryOptions, l as writeContractMutationOptions } from "./wagmi__core.mjs";
import { r as reactExports } from "./react.mjs";
import { w as withSelectorExports } from "./use-sync-external-store.mjs";
import { u as useQuery$1, a as useMutation } from "./tanstack__react-query.mjs";
function Hydrate(parameters) {
  const { children, config, initialState, reconnectOnMount = true } = parameters;
  const { onMount } = hydrate(config, {
    initialState,
    reconnectOnMount
  });
  if (!config._internal.ssr)
    onMount();
  const active = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (!active.current)
      return;
    if (!config._internal.ssr)
      return;
    onMount();
    return () => {
      active.current = false;
    };
  }, []);
  return children;
}
const WagmiContext = reactExports.createContext(void 0);
function WagmiProvider(parameters) {
  const { children, config } = parameters;
  const props = { value: config };
  return reactExports.createElement(Hydrate, parameters, reactExports.createElement(WagmiContext.Provider, props, children));
}
const version = "3.6.16";
const getVersion = () => `wagmi@${version}`;
class BaseError extends BaseError$1 {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiError"
    });
  }
  get docsBaseUrl() {
    return "https://wagmi.sh/react";
  }
  get version() {
    return getVersion();
  }
}
class WagmiProviderNotFoundError extends BaseError {
  constructor() {
    super("`useConfig` must be used within `WagmiProvider`.", {
      docsPath: "/api/WagmiProvider"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiProviderNotFoundError"
    });
  }
}
function useQuery(parameters) {
  const result = useQuery$1({
    ...parameters,
    queryKeyHashFn: hashFn
    // for bigint support
  });
  result.queryKey = parameters.queryKey;
  return result;
}
function useConfig(parameters = {}) {
  const config = parameters.config ?? reactExports.useContext(WagmiContext);
  if (!config)
    throw new WagmiProviderNotFoundError();
  return config;
}
function useChainId(parameters = {}) {
  const config = useConfig(parameters);
  return reactExports.useSyncExternalStore((onChange) => watchChainId(config, { onChange }), () => getChainId(config), () => getChainId(config));
}
function useBalance(parameters = {}) {
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getBalanceQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery(options);
}
const isPlainObject = (obj) => typeof obj === "object" && !Array.isArray(obj);
function useSyncExternalStoreWithTracked(subscribe, getSnapshot, getServerSnapshot = getSnapshot, isEqual = deepEqual) {
  const trackedKeys = reactExports.useRef([]);
  const result = withSelectorExports.useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, (x) => x, (a, b) => {
    if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
      for (const key of trackedKeys.current) {
        const equal = isEqual(a[key], b[key]);
        if (!equal)
          return false;
      }
      return true;
    }
    return isEqual(a, b);
  });
  return reactExports.useMemo(() => {
    if (isPlainObject(result)) {
      const trackedResult = { ...result };
      let properties = {};
      for (const [key, value] of Object.entries(trackedResult)) {
        properties = {
          ...properties,
          [key]: {
            configurable: false,
            enumerable: true,
            get: () => {
              if (!trackedKeys.current.includes(key)) {
                trackedKeys.current.push(key);
              }
              return value;
            }
          }
        };
      }
      Object.defineProperties(trackedResult, properties);
      return trackedResult;
    }
    return result;
  }, [result]);
}
function useConnection(parameters = {}) {
  const config = useConfig(parameters);
  return useSyncExternalStoreWithTracked((onChange) => watchConnection(config, { onChange }), () => getConnection(config));
}
function useChains(parameters = {}) {
  const config = useConfig(parameters);
  return reactExports.useSyncExternalStore((onChange) => watchChains(config, { onChange }), () => getChains(config), () => getChains(config));
}
function useReadContract(parameters = {}) {
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = readContractQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery(options);
}
function useReadContracts(parameters = {}) {
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const contractsChainId = reactExports.useMemo(() => {
    const firstChainId = parameters.contracts?.[0]?.chainId;
    if ((parameters.contracts ?? []).every((contract) => contract.chainId === firstChainId))
      return firstChainId;
    return void 0;
  }, [parameters.contracts]);
  const options = readContractsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? contractsChainId ?? chainId
  });
  return useQuery(options);
}
function useSwitchChain(parameters = {}) {
  const config = useConfig(parameters);
  const options = switchChainMutationOptions(config, parameters);
  const mutation = useMutation(options);
  return {
    ...mutation,
    chains: useChains({ config }),
    switchChain: mutation.mutate,
    switchChainAsync: mutation.mutateAsync
  };
}
function useWaitForTransactionReceipt(parameters = {}) {
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = waitForTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery(options);
}
function useWriteContract(parameters = {}) {
  const config = useConfig(parameters);
  const options = writeContractMutationOptions(config, parameters);
  const mutation = useMutation(options);
  return {
    ...mutation,
    writeContract: mutation.mutate,
    writeContractAsync: mutation.mutateAsync
  };
}
export {
  WagmiProvider as W,
  useChainId as a,
  useSwitchChain as b,
  useBalance as c,
  useReadContracts as d,
  useWriteContract as e,
  useWaitForTransactionReceipt as f,
  useReadContract as g,
  useConnection as u
};
