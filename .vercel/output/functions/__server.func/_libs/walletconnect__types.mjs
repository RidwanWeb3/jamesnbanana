import { b as getAugmentedNamespace } from "./react.mjs";
import { I as IEvents } from "./walletconnect__events.mjs";
import require$$0, { EventEmitter } from "events";
var a = Object.defineProperty, u = (e, s, r) => s in e ? a(e, s, { enumerable: true, configurable: true, writable: true, value: r }) : e[s] = r, c = (e, s, r) => u(e, typeof s != "symbol" ? s + "" : s, r);
class h extends IEvents {
  constructor(s) {
    super(), this.opts = s, c(this, "protocol", "wc"), c(this, "version", 2);
  }
}
class g {
  constructor(s, r, t) {
    this.core = s, this.logger = r;
  }
}
var p = Object.defineProperty, b = (e, s, r) => s in e ? p(e, s, { enumerable: true, configurable: true, writable: true, value: r }) : e[s] = r, v = (e, s, r) => b(e, s + "", r);
class I extends IEvents {
  constructor(s, r) {
    super(), this.core = s, this.logger = r, v(this, "records", /* @__PURE__ */ new Map());
  }
}
class y {
  constructor(s, r) {
    this.logger = s, this.core = r;
  }
}
class m extends IEvents {
  constructor(s, r) {
    super(), this.relayer = s, this.logger = r;
  }
}
class d extends IEvents {
  constructor(s) {
    super();
  }
}
class f {
  constructor(s, r, t, q) {
    this.core = s, this.logger = r, this.name = t;
  }
}
var E = Object.defineProperty, x = (e, s, r) => s in e ? E(e, s, { enumerable: true, configurable: true, writable: true, value: r }) : e[s] = r, w = (e, s, r) => x(e, s + "", r);
class C {
  constructor() {
    w(this, "map", /* @__PURE__ */ new Map());
  }
}
class P extends IEvents {
  constructor(s, r) {
    super(), this.relayer = s, this.logger = r;
  }
}
class j {
  constructor(s, r) {
    this.core = s, this.logger = r;
  }
}
class S extends IEvents {
  constructor(s, r) {
    super(), this.core = s, this.logger = r;
  }
}
class $ {
  constructor(s, r) {
    this.logger = s, this.core = r;
  }
}
class M {
  constructor(s, r, t) {
    this.core = s, this.logger = r, this.store = t;
  }
}
class O {
  constructor(s, r) {
    this.projectId = s, this.logger = r;
  }
}
class R {
  constructor(s, r, t) {
    this.core = s, this.logger = r, this.telemetryEnabled = t;
  }
}
var T = Object.defineProperty, k = (e, s, r) => s in e ? T(e, s, { enumerable: true, configurable: true, writable: true, value: r }) : e[s] = r, i = (e, s, r) => k(e, typeof s != "symbol" ? s + "" : s, r);
class H extends require$$0 {
  constructor() {
    super();
  }
}
class J {
  constructor(s) {
    this.opts = s, i(this, "protocol", "wc"), i(this, "version", 2);
  }
}
class K extends EventEmitter {
  constructor() {
    super();
  }
}
class V {
  constructor(s) {
    this.client = s;
  }
}
const dist = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ICore: h,
  ICrypto: g,
  IEchoClient: O,
  IEngine: V,
  IEngineEvents: K,
  IEventClient: R,
  IExpirer: S,
  IJsonRpcHistory: I,
  IKeyChain: j,
  IMessageTracker: y,
  IPairing: $,
  IPublisher: m,
  IRelayer: d,
  ISignClient: J,
  ISignClientEvents: H,
  IStore: f,
  ISubscriber: P,
  ISubscriberTopicMap: C,
  IVerify: M
});
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(dist);
export {
  require$$2 as r
};
