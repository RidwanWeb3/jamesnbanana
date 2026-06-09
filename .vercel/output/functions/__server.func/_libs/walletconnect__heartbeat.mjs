import { b as getAugmentedNamespace } from "./react.mjs";
import { EventEmitter } from "events";
import { c as cjsExports } from "./walletconnect__time.mjs";
import { I as IEvents } from "./walletconnect__events.mjs";
class n extends IEvents {
  constructor(e) {
    super();
  }
}
const s = cjsExports.FIVE_SECONDS, r = { pulse: "heartbeat_pulse" };
class i extends n {
  constructor(e) {
    super(e), this.events = new EventEmitter(), this.interval = s, this.interval = e?.interval || s;
  }
  static async init(e) {
    const t = new i(e);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), cjsExports.toMiliseconds(this.interval));
  }
  pulse() {
    this.events.emit(r.pulse);
  }
}
const index_es = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  HEARTBEAT_EVENTS: r,
  HEARTBEAT_INTERVAL: s,
  HeartBeat: i,
  IHeartBeat: n
});
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(index_es);
export {
  require$$1 as r
};
