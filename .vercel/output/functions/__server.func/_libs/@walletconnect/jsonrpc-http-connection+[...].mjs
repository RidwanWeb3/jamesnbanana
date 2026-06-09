import { b as getAugmentedNamespace } from "../react.mjs";
import { EventEmitter } from "events";
import { o } from "../cross-fetch.mjs";
import { a as safeJsonStringify, s as safeJsonParse } from "../walletconnect__safe-json.mjs";
import { e as isHttpUrl, d as formatJsonRpcError, p as parseConnectionError } from "../walletconnect__jsonrpc-utils.mjs";
import "../walletconnect__environment.mjs";
var P = Object.defineProperty, w = Object.defineProperties, E = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, L = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable, l = (r, t, e) => t in r ? P(r, t, { enumerable: true, configurable: true, writable: true, value: e }) : r[t] = e, p = (r, t) => {
  for (var e in t || (t = {})) L.call(t, e) && l(r, e, t[e]);
  if (c) for (var e of c(t)) O.call(t, e) && l(r, e, t[e]);
  return r;
}, v = (r, t) => w(r, E(t));
const j = { Accept: "application/json", "Content-Type": "application/json" }, T = "POST", d = { headers: j, method: T }, g = 10;
class f {
  constructor(t, e = false) {
    if (this.url = t, this.disableProviderPing = e, this.events = new EventEmitter(), this.isAvailable = false, this.registering = false, !isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    this.url = t, this.disableProviderPing = e;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(t, e) {
    this.events.on(t, e);
  }
  once(t, e) {
    this.events.once(t, e);
  }
  off(t, e) {
    this.events.off(t, e);
  }
  removeListener(t, e) {
    this.events.removeListener(t, e);
  }
  async open(t = this.url) {
    await this.register(t);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(t) {
    this.isAvailable || await this.register();
    try {
      const e = safeJsonStringify(t), s = await (await o(this.url, v(p({}, d), { body: e }))).json();
      this.onPayload({ data: s });
    } catch (e) {
      this.onError(t.id, e);
    }
  }
  async register(t = this.url) {
    if (!isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    if (this.registering) {
      const e = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= e || this.events.listenerCount("open") >= e) && this.events.setMaxListeners(e + 1), new Promise((s, i) => {
        this.events.once("register_error", (n) => {
          this.resetMaxListeners(), i(n);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.isAvailable > "u") return i(new Error("HTTP connection is missing or invalid"));
          s();
        });
      });
    }
    this.url = t, this.registering = true;
    try {
      if (!this.disableProviderPing) {
        const e = safeJsonStringify({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await o(t, v(p({}, d), { body: e }));
      }
      this.onOpen();
    } catch (e) {
      const s = this.parseError(e);
      throw this.events.emit("register_error", s), this.onClose(), s;
    }
  }
  onOpen() {
    this.isAvailable = true, this.registering = false, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = false, this.registering = false, this.events.emit("close");
  }
  onPayload(t) {
    if (typeof t.data > "u") return;
    const e = typeof t.data == "string" ? safeJsonParse(t.data) : t.data;
    this.events.emit("payload", e);
  }
  onError(t, e) {
    const s = this.parseError(e), i = s.message || s.toString(), n = formatJsonRpcError(t, i);
    this.events.emit("payload", n);
  }
  parseError(t, e = this.url) {
    return parseConnectionError(t, e, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > g && this.events.setMaxListeners(g);
  }
}
const index_es = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  HttpConnection: f,
  default: f
});
const require$$4 = /* @__PURE__ */ getAugmentedNamespace(index_es);
export {
  require$$4 as r
};
