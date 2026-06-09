import { b as getAugmentedNamespace } from "../react.mjs";
import { EventEmitter } from "events";
import "../walletconnect__environment.mjs";
import { f as formatJsonRpcRequest, g as getBigIntRpcId, i as isJsonRpcError, a as isJsonRpcResponse } from "../walletconnect__jsonrpc-utils.mjs";
import { r } from "../walletconnect__jsonrpc-types.mjs";
class o extends r {
  constructor(t) {
    super(t), this.events = new EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
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
  async request(t, e) {
    return this.requestStrict(formatJsonRpcRequest(t.method, t.params || [], t.id || getBigIntRpcId().toString()), e);
  }
  async requestStrict(t, e) {
    return new Promise(async (i, s) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (n) {
        s(n);
      }
      this.events.on(`${t.id}`, (n) => {
        isJsonRpcError(n) ? s(n.error) : i(n.result);
      });
      try {
        await this.connection.send(t, e);
      } catch (n) {
        s(n);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), isJsonRpcResponse(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
}
const index_es = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  JsonRpcProvider: o,
  default: o
});
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(index_es);
export {
  require$$3 as r
};
