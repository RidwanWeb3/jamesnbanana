import { g as getUntracked, m as markToTrack } from "./proxy-compare.mjs";
import "./react.mjs";
const __vite_import_meta_env__ = {};
const isObject = (x) => typeof x === "object" && x !== null;
const canProxyDefault = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
const createSnapshotDefault = (target, version) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const { enumerable } = Reflect.getOwnPropertyDescriptor(
      target,
      key
    );
    const desc = {
      value,
      enumerable,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      markToTrack(value, false);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshotDefault(target2, ensureVersion());
    }
    Object.defineProperty(snap, key, desc);
  });
  return Object.preventExtensions(snap);
};
const createHandlerDefault = (isInitializing, addPropListener, removePropListener, notifyUpdate) => ({
  deleteProperty(target, prop) {
    const prevValue = Reflect.get(target, prop);
    removePropListener(prop);
    const deleted = Reflect.deleteProperty(target, prop);
    if (deleted) {
      notifyUpdate(["delete", [prop], prevValue]);
    }
    return deleted;
  },
  set(target, prop, value, receiver) {
    const hasPrevValue = !isInitializing() && Reflect.has(target, prop);
    const prevValue = Reflect.get(target, prop, receiver);
    if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
      return true;
    }
    removePropListener(prop);
    if (isObject(value)) {
      value = getUntracked(value) || value;
    }
    const nextValue = !proxyStateMap.has(value) && canProxy(value) ? proxy(value) : value;
    addPropListener(prop, nextValue);
    Reflect.set(target, prop, nextValue, receiver);
    notifyUpdate(["set", [prop], value, prevValue]);
    return true;
  }
});
const proxyStateMap = /* @__PURE__ */ new WeakMap();
const refSet = /* @__PURE__ */ new WeakSet();
const snapCache = /* @__PURE__ */ new WeakMap();
const versionHolder = [1];
const proxyCache = /* @__PURE__ */ new WeakMap();
let objectIs = Object.is;
let newProxy = (target, handler) => new Proxy(target, handler);
let canProxy = canProxyDefault;
let createSnapshot = createSnapshotDefault;
let createHandler = createHandlerDefault;
function proxy(baseObject = {}) {
  if (!isObject(baseObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(baseObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      checkVersion = version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = version;
  const ensureVersion = (nextCheckVersion = versionHolder[0]) => {
    if (checkVersion !== nextCheckVersion) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propValue) => {
    const propProxyState = !refSet.has(propValue) && proxyStateMap.get(propValue);
    if (propProxyState) {
      if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && propProxyStates.has(prop)) {
        throw new Error("prop listener already exists");
      }
      if (listeners.size) {
        const remove = propProxyState[2](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      } else {
        propProxyStates.set(prop, [propProxyState]);
      }
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[2](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  let initializing = true;
  const handler = createHandler(
    () => initializing,
    addPropListener,
    removePropListener,
    notifyUpdate
  );
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(baseObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, addListener];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(baseObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      baseObject,
      key
    );
    if ("value" in desc && desc.writable) {
      proxyObject[key] = baseObject[key];
    }
  });
  initializing = false;
  return proxyObject;
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[2];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion] = proxyState;
  return createSnapshot(target, ensureVersion());
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}
function unstable_getInternalStates() {
  return {
    proxyStateMap,
    refSet,
    snapCache,
    versionHolder,
    proxyCache
  };
}
function subscribeKey(proxyObject, key, callback, notifyInSync) {
  let prevValue = proxyObject[key];
  return subscribe(
    proxyObject,
    () => {
      const nextValue = proxyObject[key];
      if (!Object.is(prevValue, nextValue)) {
        callback(prevValue = nextValue);
      }
    }
  );
}
const { proxyStateMap: proxyStateMap$1, snapCache: snapCache$1 } = unstable_getInternalStates();
const isProxy$1 = (x) => proxyStateMap$1.has(x);
function proxyMap(entries) {
  const initialData = [];
  let initialIndex = 0;
  const indexMap = /* @__PURE__ */ new Map();
  const snapMapCache = /* @__PURE__ */ new WeakMap();
  const registerSnapMap = () => {
    const cache = snapCache$1.get(vObject);
    const latestSnap = cache == null ? void 0 : cache[1];
    if (latestSnap && !snapMapCache.has(latestSnap)) {
      const clonedMap = new Map(indexMap);
      snapMapCache.set(latestSnap, clonedMap);
    }
  };
  const getMapForThis = (x) => snapMapCache.get(x) || indexMap;
  const vObject = {
    data: initialData,
    index: initialIndex,
    epoch: 0,
    get size() {
      if (!isProxy$1(this)) {
        registerSnapMap();
      }
      const map = getMapForThis(this);
      return map.size;
    },
    get(key) {
      const map = getMapForThis(this);
      const index = map.get(key);
      if (index === void 0) {
        this.epoch;
        return void 0;
      }
      return this.data[index];
    },
    has(key) {
      const map = getMapForThis(this);
      this.epoch;
      return map.has(key);
    },
    set(key, value) {
      if (!isProxy$1(this)) {
        throw new Error("Cannot perform mutations on a snapshot");
      }
      const index = indexMap.get(key);
      if (index === void 0) {
        indexMap.set(key, this.index);
        this.data[this.index++] = value;
      } else {
        this.data[index] = value;
      }
      this.epoch++;
      return this;
    },
    delete(key) {
      if (!isProxy$1(this)) {
        throw new Error("Cannot perform mutations on a snapshot");
      }
      const index = indexMap.get(key);
      if (index === void 0) {
        return false;
      }
      delete this.data[index];
      indexMap.delete(key);
      this.epoch++;
      return true;
    },
    clear() {
      if (!isProxy$1(this)) {
        throw new Error("Cannot perform mutations on a snapshot");
      }
      this.data.length = 0;
      this.index = 0;
      this.epoch++;
      indexMap.clear();
    },
    forEach(cb) {
      this.epoch;
      const map = getMapForThis(this);
      map.forEach((index, key) => {
        cb(this.data[index], key, this);
      });
    },
    *entries() {
      this.epoch;
      const map = getMapForThis(this);
      for (const [key, index] of map) {
        yield [key, this.data[index]];
      }
    },
    *keys() {
      this.epoch;
      const map = getMapForThis(this);
      for (const key of map.keys()) {
        yield key;
      }
    },
    *values() {
      this.epoch;
      const map = getMapForThis(this);
      for (const index of map.values()) {
        yield this.data[index];
      }
    },
    [Symbol.iterator]() {
      return this.entries();
    },
    get [Symbol.toStringTag]() {
      return "Map";
    },
    toJSON() {
      return new Map(this.entries());
    }
  };
  const proxiedObject = proxy(vObject);
  Object.defineProperties(proxiedObject, {
    size: { enumerable: false },
    index: { enumerable: false },
    epoch: { enumerable: false },
    data: { enumerable: false },
    toJSON: { enumerable: false }
  });
  Object.seal(proxiedObject);
  return proxiedObject;
}
export {
  subscribeKey as a,
  subscribe as b,
  proxyMap as c,
  proxy as p,
  ref as r,
  snapshot as s
};
