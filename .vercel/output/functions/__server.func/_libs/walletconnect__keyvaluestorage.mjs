import { b as getAugmentedNamespace } from "./react.mjs";
import { c as createStorage } from "./unstorage.mjs";
import { c as createStore, a as clear, k as keys, d as del, s as set, g as get } from "./idb-keyval.mjs";
import { s as safeJsonParse, a as safeJsonStringify } from "./walletconnect__safe-json.mjs";
const x = "idb-keyval";
var z = (i = {}) => {
  const t = i.base && i.base.length > 0 ? `${i.base}:` : "", e = (s) => t + s;
  let n;
  return i.dbName && i.storeName && (n = createStore(i.dbName, i.storeName)), { name: x, options: i, async hasItem(s) {
    return !(typeof await get(e(s), n) > "u");
  }, async getItem(s) {
    return await get(e(s), n) ?? null;
  }, setItem(s, a) {
    return set(e(s), a, n);
  }, removeItem(s) {
    return del(e(s), n);
  }, getKeys() {
    return keys(n);
  }, clear() {
    return clear(n);
  } };
};
const D = "WALLET_CONNECT_V2_INDEXED_DB", E = "keyvaluestorage";
class _ {
  constructor() {
    this.indexedDb = createStorage({ driver: z({ dbName: D, storeName: E }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e = await this.indexedDb.getItem(t);
    if (e !== null) return e;
  }
  async setItem(t, e) {
    await this.indexedDb.setItem(t, safeJsonStringify(e));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
}
var l = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, c = { exports: {} };
(function() {
  let i;
  function t() {
  }
  i = t, i.prototype.getItem = function(e) {
    return this.hasOwnProperty(e) ? String(this[e]) : null;
  }, i.prototype.setItem = function(e, n) {
    this[e] = String(n);
  }, i.prototype.removeItem = function(e) {
    delete this[e];
  }, i.prototype.clear = function() {
    const e = this;
    Object.keys(e).forEach(function(n) {
      e[n] = void 0, delete e[n];
    });
  }, i.prototype.key = function(e) {
    return e = e || 0, Object.keys(this)[e];
  }, i.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l < "u" && l.localStorage ? c.exports = l.localStorage : typeof window < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t();
})();
function k(i) {
  var t;
  return [i[0], safeJsonParse((t = i[1]) != null ? t : "")];
}
class K {
  constructor() {
    this.localStorage = c.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k);
  }
  async getItem(t) {
    const e = this.localStorage.getItem(t);
    if (e !== null) return safeJsonParse(e);
  }
  async setItem(t, e) {
    this.localStorage.setItem(t, safeJsonStringify(e));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
}
const N = "wc_storage_version", y = 1, O = async (i, t, e) => {
  const n = N, s = await t.getItem(n);
  if (s && s >= y) {
    e(t);
    return;
  }
  const a = await i.getKeys();
  if (!a.length) {
    e(t);
    return;
  }
  const m = [];
  for (; a.length; ) {
    const r = a.shift();
    if (!r) continue;
    const o = r.toLowerCase();
    if (o.includes("wc@") || o.includes("walletconnect") || o.includes("wc_") || o.includes("wallet_connect")) {
      const f = await i.getItem(r);
      await t.setItem(r, f), m.push(r);
    }
  }
  await t.setItem(n, y), e(t), j(i, m);
}, j = async (i, t) => {
  t.length && t.forEach(async (e) => {
    await i.removeItem(e);
  });
};
class h {
  constructor() {
    this.initialized = false, this.setInitialized = (e) => {
      this.storage = e, this.initialized = true;
    };
    const t = new K();
    this.storage = t;
    try {
      const e = new _();
      O(t, e, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e) {
    return await this.initialize(), this.storage.setItem(t, e);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e = setInterval(() => {
        this.initialized && (clearInterval(e), t());
      }, 20);
    });
  }
}
const index_es = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  KeyValueStorage: h,
  default: h
});
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(index_es);
export {
  require$$2 as r
};
