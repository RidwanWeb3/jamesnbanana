var b = { exports: {} };
function se(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return '"[Circular]"';
  }
}
var ie = oe;
function oe(e, t, r) {
  var s = r && r.stringify || se, i = 1;
  if (typeof e == "object" && e !== null) {
    var f = t.length + i;
    if (f === 1) return e;
    var h = new Array(f);
    h[0] = s(e);
    for (var u = 1; u < f; u++) h[u] = s(t[u]);
    return h.join(" ");
  }
  if (typeof e != "string") return e;
  var c = t.length;
  if (c === 0) return e;
  for (var n = "", o = 1 - i, l = -1, L = e && e.length || 0, a = 0; a < L; ) {
    if (e.charCodeAt(a) === 37 && a + 1 < L) {
      switch (l = l > -1 ? l : 0, e.charCodeAt(a + 1)) {
        case 100:
        case 102:
          if (o >= c || t[o] == null) break;
          l < a && (n += e.slice(l, a)), n += Number(t[o]), l = a + 2, a++;
          break;
        case 105:
          if (o >= c || t[o] == null) break;
          l < a && (n += e.slice(l, a)), n += Math.floor(Number(t[o])), l = a + 2, a++;
          break;
        case 79:
        case 111:
        case 106:
          if (o >= c || t[o] === void 0) break;
          l < a && (n += e.slice(l, a));
          var _ = typeof t[o];
          if (_ === "string") {
            n += "'" + t[o] + "'", l = a + 2, a++;
            break;
          }
          if (_ === "function") {
            n += t[o].name || "<anonymous>", l = a + 2, a++;
            break;
          }
          n += s(t[o]), l = a + 2, a++;
          break;
        case 115:
          if (o >= c) break;
          l < a && (n += e.slice(l, a)), n += String(t[o]), l = a + 2, a++;
          break;
        case 37:
          l < a && (n += e.slice(l, a)), n += "%", l = a + 2, a++, o--;
          break;
      }
      ++o;
    }
    ++a;
  }
  return l === -1 ? e : (l < L && (n += e.slice(l)), n);
}
const G = ie;
b.exports = v;
const E = Le().console || {}, le = { mapHttpRequest: T, mapHttpResponse: T, wrapRequestSerializer: $, wrapResponseSerializer: $, wrapErrorSerializer: $, req: T, res: T, err: U, errWithCause: U };
function m(e, t) {
  return e === "silent" ? 1 / 0 : t.levels.values[e];
}
const A = /* @__PURE__ */ Symbol("pino.logFuncs"), P = /* @__PURE__ */ Symbol("pino.hierarchy"), ae = { error: "log", fatal: "error", warn: "error", info: "log", debug: "log", trace: "log" };
function R(e, t) {
  const r = { logger: t, parent: e[P] };
  t[P] = r;
}
function ue(e, t, r) {
  const s = {};
  t.forEach((i) => {
    s[i] = r[i] ? r[i] : E[i] || E[ae[i] || "log"] || z;
  }), e[A] = s;
}
function ce(e, t) {
  return Array.isArray(e) ? e.filter(function(s) {
    return s !== "!stdSerializers.err";
  }) : e === true ? Object.keys(t) : false;
}
function v(e) {
  e = e || {}, e.browser = e.browser || {};
  const t = e.browser.transmit;
  if (t && typeof t.send != "function") throw Error("pino: transmit option must have a send function");
  const r = e.browser.write || E;
  e.browser.write && (e.browser.asObject = true);
  const s = e.serializers || {}, i = ce(e.browser.serialize, s);
  let f = e.browser.serialize;
  Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf("!stdSerializers.err") > -1 && (f = false);
  const h = Object.keys(e.customLevels || {}), u = ["error", "fatal", "warn", "info", "debug", "trace"].concat(h);
  typeof r == "function" && u.forEach(function(g) {
    r[g] = r;
  }), (e.enabled === false || e.browser.disabled) && (e.level = "silent");
  const c = e.level || "info", n = Object.create(r);
  n.log || (n.log = z), ue(n, u, r), R({}, n), Object.defineProperty(n, "levelVal", { get: l }), Object.defineProperty(n, "level", { get: L, set: a });
  const o = { transmit: t, serialize: i, asObject: e.browser.asObject, asObjectBindingsOnly: e.browser.asObjectBindingsOnly, formatters: e.browser.formatters, levels: u, timestamp: ye(e), messageKey: e.messageKey || "msg", onChild: e.onChild || z };
  n.levels = fe(e), n.level = c, n.isLevelEnabled = function(g) {
    return this.levels.values[g] ? this.levels.values[g] >= this.levels.values[this.level] : false;
  }, n.setMaxListeners = n.getMaxListeners = n.emit = n.addListener = n.on = n.prependListener = n.once = n.prependOnceListener = n.removeListener = n.removeAllListeners = n.listeners = n.listenerCount = n.eventNames = n.write = n.flush = z, n.serializers = s, n._serialize = i, n._stdErrSerialize = f, n.child = function(...g) {
    return _.call(this, o, ...g);
  }, t && (n._logEvent = N());
  function l() {
    return m(this.level, this);
  }
  function L() {
    return this._level;
  }
  function a(g) {
    if (g !== "silent" && !this.levels.values[g]) throw Error("unknown level " + g);
    this._level = g, O(this, o, n, "error"), O(this, o, n, "fatal"), O(this, o, n, "warn"), O(this, o, n, "info"), O(this, o, n, "debug"), O(this, o, n, "trace"), h.forEach((d) => {
      O(this, o, n, d);
    });
  }
  function _(g, d, j) {
    if (!d) throw new Error("missing bindings for child Pino");
    j = j || {}, i && d.serializers && (j.serializers = d.serializers);
    const F = j.serializers;
    if (i && F) {
      var C = Object.assign({}, s, F), M = e.browser.serialize === true ? Object.keys(C) : i;
      delete d.serializers, V([d], M, C, this._stdErrSerialize);
    }
    function D(I) {
      this._childLevel = (I._childLevel | 0) + 1, this.bindings = d, C && (this.serializers = C, this._serialize = M), t && (this._logEvent = N([].concat(I._logEvent.bindings, d)));
    }
    D.prototype = this;
    const S = new D(this);
    return R(this, S), S.child = function(...I) {
      return _.call(this, g, ...I);
    }, S.level = j.level || this.level, g.onChild(S), S;
  }
  return n;
}
function fe(e) {
  const t = e.customLevels || {}, r = Object.assign({}, v.levels.values, t), s = Object.assign({}, v.levels.labels, he(t));
  return { values: r, labels: s };
}
function he(e) {
  const t = {};
  return Object.keys(e).forEach(function(r) {
    t[e[r]] = r;
  }), t;
}
v.levels = { values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 }, labels: { 10: "trace", 20: "debug", 30: "info", 40: "warn", 50: "error", 60: "fatal" } }, v.stdSerializers = le, v.stdTimeFunctions = Object.assign({}, { nullTime: X, epochTime: Y, unixTime: pe, isoTime: we });
function ge(e) {
  const t = [];
  e.bindings && t.push(e.bindings);
  let r = e[P];
  for (; r.parent; ) r = r.parent, r.logger.bindings && t.push(r.logger.bindings);
  return t.reverse();
}
function O(e, t, r, s) {
  if (Object.defineProperty(e, s, { value: m(e.level, r) > m(s, r) ? z : r[A][s], writable: true, enumerable: true, configurable: true }), e[s] === z) {
    if (!t.transmit) return;
    const f = t.transmit.level || e.level, h = m(f, r);
    if (m(s, r) < h) return;
  }
  e[s] = de(e, t, r, s);
  const i = ge(e);
  i.length !== 0 && (e[s] = be(i, e[s]));
}
function be(e, t) {
  return function() {
    return t.apply(this, [...e, ...arguments]);
  };
}
function de(e, t, r, s) {
  return /* @__PURE__ */ (function(i) {
    return function() {
      const h = t.timestamp(), u = new Array(arguments.length), c = Object.getPrototypeOf && Object.getPrototypeOf(this) === E ? E : this;
      for (var n = 0; n < u.length; n++) u[n] = arguments[n];
      var o = false;
      if (t.serialize && (V(u, this._serialize, this.serializers, this._stdErrSerialize), o = true), t.asObject || t.formatters ? i.call(c, ...ve(this, s, u, h, t)) : i.apply(c, u), t.transmit) {
        const l = t.transmit.level || e._level, L = m(l, r), a = m(s, r);
        if (a < L) return;
        me(this, { ts: h, methodLevel: s, methodValue: a, transmitValue: r.levels.values[t.transmit.level || e._level], send: t.transmit.send, val: m(e._level, r) }, u, o);
      }
    };
  })(e[A][s]);
}
function ve(e, t, r, s, i) {
  const { level: f, log: h = (l) => l } = i.formatters || {}, u = r.slice();
  let c = u[0];
  const n = {};
  let o = (e._childLevel | 0) + 1;
  if (o < 1 && (o = 1), s && (n.time = s), f) {
    const l = f(t, e.levels.values[t]);
    Object.assign(n, l);
  } else n.level = e.levels.values[t];
  if (i.asObjectBindingsOnly) {
    if (c !== null && typeof c == "object") for (; o-- && typeof u[0] == "object"; ) Object.assign(n, u.shift());
    return [h(n), ...u];
  } else {
    if (c !== null && typeof c == "object") {
      for (; o-- && typeof u[0] == "object"; ) Object.assign(n, u.shift());
      c = u.length ? G(u.shift(), u) : void 0;
    } else typeof c == "string" && (c = G(u.shift(), u));
    return c !== void 0 && (n[i.messageKey] = c), [h(n)];
  }
}
function V(e, t, r, s) {
  for (const i in e) if (s && e[i] instanceof Error) e[i] = v.stdSerializers.err(e[i]);
  else if (typeof e[i] == "object" && !Array.isArray(e[i]) && t) for (const f in e[i]) t.indexOf(f) > -1 && f in r && (e[i][f] = r[f](e[i][f]));
}
function me(e, t, r, s = false) {
  const i = t.send, f = t.ts, h = t.methodLevel, u = t.methodValue, c = t.val, n = e._logEvent.bindings;
  s || V(r, e._serialize || Object.keys(e.serializers), e.serializers, e._stdErrSerialize === void 0 ? true : e._stdErrSerialize), e._logEvent.ts = f, e._logEvent.messages = r.filter(function(o) {
    return n.indexOf(o) === -1;
  }), e._logEvent.level.label = h, e._logEvent.level.value = u, i(h, e._logEvent, c), e._logEvent = N(n);
}
function N(e) {
  return { ts: 0, messages: [], bindings: e || [], level: { label: "", value: 0 } };
}
function U(e) {
  const t = { type: e.constructor.name, msg: e.message, stack: e.stack };
  for (const r in e) t[r] === void 0 && (t[r] = e[r]);
  return t;
}
function ye(e) {
  return typeof e.timestamp == "function" ? e.timestamp : e.timestamp === false ? X : Y;
}
function T() {
  return {};
}
function $(e) {
  return e;
}
function z() {
}
function X() {
  return false;
}
function Y() {
  return Date.now();
}
function pe() {
  return Math.round(Date.now() / 1e3);
}
function we() {
  return new Date(Date.now()).toISOString();
}
function Le() {
  function e(t) {
    return typeof t < "u" && t;
  }
  try {
    return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", { get: function() {
      return delete Object.prototype.globalThis, this.globalThis = this;
    }, configurable: true }), globalThis;
  } catch {
    return e(self) || e(window) || e(this) || {};
  }
}
b.exports.default = v;
b.exports.pino = v;
const Z = { level: "info" }, k = "custom_context", x = 1e3 * 1024;
var ze = Object.defineProperty, _e = (e, t, r) => t in e ? ze(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, y = (e, t, r) => _e(e, typeof t != "symbol" ? t + "" : t, r);
class je {
  constructor(t) {
    y(this, "nodeValue"), y(this, "sizeInBytes"), y(this, "next"), this.nodeValue = t, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
}
class q {
  constructor(t) {
    y(this, "lengthInNodes"), y(this, "sizeInBytes"), y(this, "head"), y(this, "tail"), y(this, "maxSizeInBytes"), this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = t, this.sizeInBytes = 0;
  }
  append(t) {
    const r = new je(t);
    if (r.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${t} with size ${r.size}`);
    for (; this.size + r.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = r), this.tail = r) : (this.head = r, this.tail = r), this.lengthInNodes++, this.sizeInBytes += r.size;
  }
  shift() {
    if (!this.head) return;
    const t = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= t.size;
  }
  toArray() {
    const t = [];
    let r = this.head;
    for (; r !== null; ) t.push(r.value), r = r.next;
    return t;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let t = this.head;
    return { next: () => {
      if (!t) return { done: true, value: null };
      const r = t.value;
      return t = t.next, { done: false, value: r };
    } };
  }
}
const Se = (e) => JSON.stringify(e, (t, r) => typeof r == "bigint" ? r.toString() + "n" : r);
function K(e) {
  return typeof e == "string" ? e : Se(e) || "";
}
var Ee = Object.defineProperty, ke = (e, t, r) => t in e ? Ee(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, B = (e, t, r) => ke(e, typeof t != "symbol" ? t + "" : t, r);
class J {
  constructor(t, r = x) {
    B(this, "logs"), B(this, "level"), B(this, "levelValue"), B(this, "MAX_LOG_SIZE_IN_BYTES"), this.level = t ?? "error", this.levelValue = b.exports.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = r, this.logs = new q(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(t, r) {
    r === b.exports.levels.values.error ? console.error(t) : r === b.exports.levels.values.warn ? console.warn(t) : r === b.exports.levels.values.debug ? console.debug(t) : r === b.exports.levels.values.trace ? console.trace(t) : console.log(t);
  }
  appendToLogs(t) {
    this.logs.append(K({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: t }));
    const r = typeof t == "string" ? JSON.parse(t).level : t.level;
    r >= this.levelValue && this.forwardToConsole(t, r);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new q(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(t) {
    const r = this.getLogArray();
    return r.push(K({ extraMetadata: t })), new Blob(r, { type: "application/json" });
  }
}
var Ce = Object.defineProperty, Ie = (e, t, r) => t in e ? Ce(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, Te = (e, t, r) => Ie(e, t + "", r);
class xe {
  constructor(t, r = x) {
    Te(this, "baseChunkLogger"), this.baseChunkLogger = new J(t, r);
  }
  write(t) {
    this.baseChunkLogger.appendToLogs(t);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(t) {
    return this.baseChunkLogger.logsToBlob(t);
  }
  downloadLogsBlobInBrowser(t) {
    const r = URL.createObjectURL(this.logsToBlob(t)), s = document.createElement("a");
    s.href = r, s.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(r);
  }
}
var Be = Object.defineProperty, Ae = (e, t, r) => t in e ? Be(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, Pe = (e, t, r) => Ae(e, t + "", r);
class Ve {
  constructor(t, r = x) {
    Pe(this, "baseChunkLogger"), this.baseChunkLogger = new J(t, r);
  }
  write(t) {
    this.baseChunkLogger.appendToLogs(t);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(t) {
    return this.baseChunkLogger.logsToBlob(t);
  }
}
var Ne = Object.defineProperty, $e = Object.defineProperties, Fe = Object.getOwnPropertyDescriptors, H = Object.getOwnPropertySymbols, Me = Object.prototype.hasOwnProperty, De = Object.prototype.propertyIsEnumerable, W = (e, t, r) => t in e ? Ne(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, p = (e, t) => {
  for (var r in t || (t = {})) Me.call(t, r) && W(e, r, t[r]);
  if (H) for (var r of H(t)) De.call(t, r) && W(e, r, t[r]);
  return e;
}, w = (e, t) => $e(e, Fe(t));
function Ge(e) {
  return w(p({}, e), { level: e?.level || Z.level });
}
function Q(e, t, r = k) {
  return e[r] = t, e;
}
function ee(e, t = k) {
  return e[t] || "";
}
function te(e, t, r = k) {
  const s = ee(e, r);
  return s.trim() ? `${s}/${t}` : t;
}
function Re(e, t, r = k) {
  const s = te(e, t, r), i = e.child({ context: s });
  return Q(i, s, r);
}
function re(e) {
  var t, r;
  const s = new xe((t = e.opts) == null ? void 0 : t.level, e.maxSizeInBytes);
  return { logger: b.exports(w(p({}, e.opts), { level: "trace", browser: w(p({}, (r = e.opts) == null ? void 0 : r.browser), { write: (i) => s.write(i) }) })), chunkLoggerController: s };
}
function ne(e) {
  var t, r;
  const s = new Ve((t = e.opts) == null ? void 0 : t.level, e.maxSizeInBytes);
  return { logger: b.exports(w(p({}, e.opts), { level: "trace", browser: w(p({}, (r = e.opts) == null ? void 0 : r.browser), { write: (i) => s.write(i) }) }), s), chunkLoggerController: s };
}
function Ue(e) {
  var t;
  if (typeof e.loggerOverride < "u" && typeof e.loggerOverride != "string") return { logger: e.loggerOverride, chunkLoggerController: null };
  const r = w(p({}, e.opts), { level: typeof e.loggerOverride == "string" ? e.loggerOverride : (t = e.opts) == null ? void 0 : t.level });
  return typeof window < "u" ? re(w(p({}, e), { opts: r })) : ne(w(p({}, e), { opts: r }));
}
var index_cjs = {};
var hasRequiredIndex_cjs;
function requireIndex_cjs() {
  if (hasRequiredIndex_cjs) return index_cjs;
  hasRequiredIndex_cjs = 1;
  Object.defineProperty(index_cjs, "__esModule", { value: true });
  var b2 = { exports: {} };
  function se2(e) {
    try {
      return JSON.stringify(e);
    } catch {
      return '"[Circular]"';
    }
  }
  var ie2 = oe2;
  function oe2(e, t, r) {
    var s = r && r.stringify || se2, i = 1;
    if (typeof e == "object" && e !== null) {
      var f = t.length + i;
      if (f === 1) return e;
      var h = new Array(f);
      h[0] = s(e);
      for (var u = 1; u < f; u++) h[u] = s(t[u]);
      return h.join(" ");
    }
    if (typeof e != "string") return e;
    var c = t.length;
    if (c === 0) return e;
    for (var n = "", o = 1 - i, l = -1, O2 = e && e.length || 0, a = 0; a < O2; ) {
      if (e.charCodeAt(a) === 37 && a + 1 < O2) {
        switch (l = l > -1 ? l : 0, e.charCodeAt(a + 1)) {
          case 100:
          case 102:
            if (o >= c || t[o] == null) break;
            l < a && (n += e.slice(l, a)), n += Number(t[o]), l = a + 2, a++;
            break;
          case 105:
            if (o >= c || t[o] == null) break;
            l < a && (n += e.slice(l, a)), n += Math.floor(Number(t[o])), l = a + 2, a++;
            break;
          case 79:
          case 111:
          case 106:
            if (o >= c || t[o] === void 0) break;
            l < a && (n += e.slice(l, a));
            var S = typeof t[o];
            if (S === "string") {
              n += "'" + t[o] + "'", l = a + 2, a++;
              break;
            }
            if (S === "function") {
              n += t[o].name || "<anonymous>", l = a + 2, a++;
              break;
            }
            n += s(t[o]), l = a + 2, a++;
            break;
          case 115:
            if (o >= c) break;
            l < a && (n += e.slice(l, a)), n += String(t[o]), l = a + 2, a++;
            break;
          case 37:
            l < a && (n += e.slice(l, a)), n += "%", l = a + 2, a++, o--;
            break;
        }
        ++o;
      }
      ++a;
    }
    return l === -1 ? e : (l < O2 && (n += e.slice(l)), n);
  }
  const G2 = ie2;
  b2.exports = v2;
  const E2 = Oe().console || {}, le2 = { mapHttpRequest: I, mapHttpResponse: I, wrapRequestSerializer: F, wrapResponseSerializer: F, wrapErrorSerializer: F, req: I, res: I, err: R2, errWithCause: R2 };
  function m2(e, t) {
    return e === "silent" ? 1 / 0 : t.levels.values[e];
  }
  const A2 = /* @__PURE__ */ Symbol("pino.logFuncs"), P2 = /* @__PURE__ */ Symbol("pino.hierarchy"), ae2 = { error: "log", fatal: "error", warn: "error", info: "log", debug: "log", trace: "log" };
  function U2(e, t) {
    const r = { logger: t, parent: e[P2] };
    t[P2] = r;
  }
  function ue2(e, t, r) {
    const s = {};
    t.forEach((i) => {
      s[i] = r[i] ? r[i] : E2[i] || E2[ae2[i] || "log"] || _;
    }), e[A2] = s;
  }
  function ce2(e, t) {
    return Array.isArray(e) ? e.filter(function(s) {
      return s !== "!stdSerializers.err";
    }) : e === true ? Object.keys(t) : false;
  }
  function v2(e) {
    e = e || {}, e.browser = e.browser || {};
    const t = e.browser.transmit;
    if (t && typeof t.send != "function") throw Error("pino: transmit option must have a send function");
    const r = e.browser.write || E2;
    e.browser.write && (e.browser.asObject = true);
    const s = e.serializers || {}, i = ce2(e.browser.serialize, s);
    let f = e.browser.serialize;
    Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf("!stdSerializers.err") > -1 && (f = false);
    const h = Object.keys(e.customLevels || {}), u = ["error", "fatal", "warn", "info", "debug", "trace"].concat(h);
    typeof r == "function" && u.forEach(function(g) {
      r[g] = r;
    }), (e.enabled === false || e.browser.disabled) && (e.level = "silent");
    const c = e.level || "info", n = Object.create(r);
    n.log || (n.log = _), ue2(n, u, r), U2({}, n), Object.defineProperty(n, "levelVal", { get: l }), Object.defineProperty(n, "level", { get: O2, set: a });
    const o = { transmit: t, serialize: i, asObject: e.browser.asObject, asObjectBindingsOnly: e.browser.asObjectBindingsOnly, formatters: e.browser.formatters, levels: u, timestamp: ye2(e), messageKey: e.messageKey || "msg", onChild: e.onChild || _ };
    n.levels = fe2(e), n.level = c, n.isLevelEnabled = function(g) {
      return this.levels.values[g] ? this.levels.values[g] >= this.levels.values[this.level] : false;
    }, n.setMaxListeners = n.getMaxListeners = n.emit = n.addListener = n.on = n.prependListener = n.once = n.prependOnceListener = n.removeListener = n.removeAllListeners = n.listeners = n.listenerCount = n.eventNames = n.write = n.flush = _, n.serializers = s, n._serialize = i, n._stdErrSerialize = f, n.child = function(...g) {
      return S.call(this, o, ...g);
    }, t && (n._logEvent = V2());
    function l() {
      return m2(this.level, this);
    }
    function O2() {
      return this._level;
    }
    function a(g) {
      if (g !== "silent" && !this.levels.values[g]) throw Error("unknown level " + g);
      this._level = g, w2(this, o, n, "error"), w2(this, o, n, "fatal"), w2(this, o, n, "warn"), w2(this, o, n, "info"), w2(this, o, n, "debug"), w2(this, o, n, "trace"), h.forEach((d) => {
        w2(this, o, n, d);
      });
    }
    function S(g, d, z2) {
      if (!d) throw new Error("missing bindings for child Pino");
      z2 = z2 || {}, i && d.serializers && (z2.serializers = d.serializers);
      const $2 = z2.serializers;
      if (i && $2) {
        var k2 = Object.assign({}, s, $2), M = e.browser.serialize === true ? Object.keys(k2) : i;
        delete d.serializers, N2([d], M, k2, this._stdErrSerialize);
      }
      function D(T2) {
        this._childLevel = (T2._childLevel | 0) + 1, this.bindings = d, k2 && (this.serializers = k2, this._serialize = M), t && (this._logEvent = V2([].concat(T2._logEvent.bindings, d)));
      }
      D.prototype = this;
      const j = new D(this);
      return U2(this, j), j.child = function(...T2) {
        return S.call(this, g, ...T2);
      }, j.level = z2.level || this.level, g.onChild(j), j;
    }
    return n;
  }
  function fe2(e) {
    const t = e.customLevels || {}, r = Object.assign({}, v2.levels.values, t), s = Object.assign({}, v2.levels.labels, he2(t));
    return { values: r, labels: s };
  }
  function he2(e) {
    const t = {};
    return Object.keys(e).forEach(function(r) {
      t[e[r]] = r;
    }), t;
  }
  v2.levels = { values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 }, labels: { 10: "trace", 20: "debug", 30: "info", 40: "warn", 50: "error", 60: "fatal" } }, v2.stdSerializers = le2, v2.stdTimeFunctions = Object.assign({}, { nullTime: X2, epochTime: Y2, unixTime: pe2, isoTime: Le2 });
  function ge2(e) {
    const t = [];
    e.bindings && t.push(e.bindings);
    let r = e[P2];
    for (; r.parent; ) r = r.parent, r.logger.bindings && t.push(r.logger.bindings);
    return t.reverse();
  }
  function w2(e, t, r, s) {
    if (Object.defineProperty(e, s, { value: m2(e.level, r) > m2(s, r) ? _ : r[A2][s], writable: true, enumerable: true, configurable: true }), e[s] === _) {
      if (!t.transmit) return;
      const f = t.transmit.level || e.level, h = m2(f, r);
      if (m2(s, r) < h) return;
    }
    e[s] = de2(e, t, r, s);
    const i = ge2(e);
    i.length !== 0 && (e[s] = be2(i, e[s]));
  }
  function be2(e, t) {
    return function() {
      return t.apply(this, [...e, ...arguments]);
    };
  }
  function de2(e, t, r, s) {
    return /* @__PURE__ */ (function(i) {
      return function() {
        const h = t.timestamp(), u = new Array(arguments.length), c = Object.getPrototypeOf && Object.getPrototypeOf(this) === E2 ? E2 : this;
        for (var n = 0; n < u.length; n++) u[n] = arguments[n];
        var o = false;
        if (t.serialize && (N2(u, this._serialize, this.serializers, this._stdErrSerialize), o = true), t.asObject || t.formatters ? i.call(c, ...ve2(this, s, u, h, t)) : i.apply(c, u), t.transmit) {
          const l = t.transmit.level || e._level, O2 = m2(l, r), a = m2(s, r);
          if (a < O2) return;
          me2(this, { ts: h, methodLevel: s, methodValue: a, transmitValue: r.levels.values[t.transmit.level || e._level], send: t.transmit.send, val: m2(e._level, r) }, u, o);
        }
      };
    })(e[A2][s]);
  }
  function ve2(e, t, r, s, i) {
    const { level: f, log: h = (l) => l } = i.formatters || {}, u = r.slice();
    let c = u[0];
    const n = {};
    let o = (e._childLevel | 0) + 1;
    if (o < 1 && (o = 1), s && (n.time = s), f) {
      const l = f(t, e.levels.values[t]);
      Object.assign(n, l);
    } else n.level = e.levels.values[t];
    if (i.asObjectBindingsOnly) {
      if (c !== null && typeof c == "object") for (; o-- && typeof u[0] == "object"; ) Object.assign(n, u.shift());
      return [h(n), ...u];
    } else {
      if (c !== null && typeof c == "object") {
        for (; o-- && typeof u[0] == "object"; ) Object.assign(n, u.shift());
        c = u.length ? G2(u.shift(), u) : void 0;
      } else typeof c == "string" && (c = G2(u.shift(), u));
      return c !== void 0 && (n[i.messageKey] = c), [h(n)];
    }
  }
  function N2(e, t, r, s) {
    for (const i in e) if (s && e[i] instanceof Error) e[i] = v2.stdSerializers.err(e[i]);
    else if (typeof e[i] == "object" && !Array.isArray(e[i]) && t) for (const f in e[i]) t.indexOf(f) > -1 && f in r && (e[i][f] = r[f](e[i][f]));
  }
  function me2(e, t, r, s = false) {
    const i = t.send, f = t.ts, h = t.methodLevel, u = t.methodValue, c = t.val, n = e._logEvent.bindings;
    s || N2(r, e._serialize || Object.keys(e.serializers), e.serializers, e._stdErrSerialize === void 0 ? true : e._stdErrSerialize), e._logEvent.ts = f, e._logEvent.messages = r.filter(function(o) {
      return n.indexOf(o) === -1;
    }), e._logEvent.level.label = h, e._logEvent.level.value = u, i(h, e._logEvent, c), e._logEvent = V2(n);
  }
  function V2(e) {
    return { ts: 0, messages: [], bindings: e || [], level: { label: "", value: 0 } };
  }
  function R2(e) {
    const t = { type: e.constructor.name, msg: e.message, stack: e.stack };
    for (const r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  function ye2(e) {
    return typeof e.timestamp == "function" ? e.timestamp : e.timestamp === false ? X2 : Y2;
  }
  function I() {
    return {};
  }
  function F(e) {
    return e;
  }
  function _() {
  }
  function X2() {
    return false;
  }
  function Y2() {
    return Date.now();
  }
  function pe2() {
    return Math.round(Date.now() / 1e3);
  }
  function Le2() {
    return new Date(Date.now()).toISOString();
  }
  function Oe() {
    function e(t) {
      return typeof t < "u" && t;
    }
    try {
      return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", { get: function() {
        return delete Object.prototype.globalThis, this.globalThis = this;
      }, configurable: true }), globalThis;
    } catch {
      return e(self) || e(window) || e(this) || {};
    }
  }
  b2.exports.default = v2;
  var we2 = b2.exports.pino = v2;
  const Z2 = { level: "info" }, C = "custom_context", x2 = 1e3 * 1024;
  var _e2 = Object.defineProperty, Se2 = (e, t, r) => t in e ? _e2(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, y2 = (e, t, r) => Se2(e, typeof t != "symbol" ? t + "" : t, r);
  class ze2 {
    constructor(t) {
      y2(this, "nodeValue"), y2(this, "sizeInBytes"), y2(this, "next"), this.nodeValue = t, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
    }
    get value() {
      return this.nodeValue;
    }
    get size() {
      return this.sizeInBytes;
    }
  }
  class K2 {
    constructor(t) {
      y2(this, "lengthInNodes"), y2(this, "sizeInBytes"), y2(this, "head"), y2(this, "tail"), y2(this, "maxSizeInBytes"), this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = t, this.sizeInBytes = 0;
    }
    append(t) {
      const r = new ze2(t);
      if (r.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${t} with size ${r.size}`);
      for (; this.size + r.size > this.maxSizeInBytes; ) this.shift();
      this.head ? (this.tail && (this.tail.next = r), this.tail = r) : (this.head = r, this.tail = r), this.lengthInNodes++, this.sizeInBytes += r.size;
    }
    shift() {
      if (!this.head) return;
      const t = this.head;
      this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= t.size;
    }
    toArray() {
      const t = [];
      let r = this.head;
      for (; r !== null; ) t.push(r.value), r = r.next;
      return t;
    }
    get length() {
      return this.lengthInNodes;
    }
    get size() {
      return this.sizeInBytes;
    }
    toOrderedArray() {
      return Array.from(this);
    }
    [Symbol.iterator]() {
      let t = this.head;
      return { next: () => {
        if (!t) return { done: true, value: null };
        const r = t.value;
        return t = t.next, { done: false, value: r };
      } };
    }
  }
  const je2 = (e) => JSON.stringify(e, (t, r) => typeof r == "bigint" ? r.toString() + "n" : r);
  function q2(e) {
    return typeof e == "string" ? e : je2(e) || "";
  }
  var Ee2 = Object.defineProperty, Ce2 = (e, t, r) => t in e ? Ee2(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, B2 = (e, t, r) => Ce2(e, typeof t != "symbol" ? t + "" : t, r);
  class J2 {
    constructor(t, r = x2) {
      B2(this, "logs"), B2(this, "level"), B2(this, "levelValue"), B2(this, "MAX_LOG_SIZE_IN_BYTES"), this.level = t ?? "error", this.levelValue = b2.exports.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = r, this.logs = new K2(this.MAX_LOG_SIZE_IN_BYTES);
    }
    forwardToConsole(t, r) {
      r === b2.exports.levels.values.error ? console.error(t) : r === b2.exports.levels.values.warn ? console.warn(t) : r === b2.exports.levels.values.debug ? console.debug(t) : r === b2.exports.levels.values.trace ? console.trace(t) : console.log(t);
    }
    appendToLogs(t) {
      this.logs.append(q2({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: t }));
      const r = typeof t == "string" ? JSON.parse(t).level : t.level;
      r >= this.levelValue && this.forwardToConsole(t, r);
    }
    getLogs() {
      return this.logs;
    }
    clearLogs() {
      this.logs = new K2(this.MAX_LOG_SIZE_IN_BYTES);
    }
    getLogArray() {
      return Array.from(this.logs);
    }
    logsToBlob(t) {
      const r = this.getLogArray();
      return r.push(q2({ extraMetadata: t })), new Blob(r, { type: "application/json" });
    }
  }
  var ke2 = Object.defineProperty, Te2 = (e, t, r) => t in e ? ke2(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, Ie2 = (e, t, r) => Te2(e, t + "", r);
  class xe2 {
    constructor(t, r = x2) {
      Ie2(this, "baseChunkLogger"), this.baseChunkLogger = new J2(t, r);
    }
    write(t) {
      this.baseChunkLogger.appendToLogs(t);
    }
    getLogs() {
      return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
      this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
      return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(t) {
      return this.baseChunkLogger.logsToBlob(t);
    }
    downloadLogsBlobInBrowser(t) {
      const r = URL.createObjectURL(this.logsToBlob(t)), s = document.createElement("a");
      s.href = r, s.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(r);
    }
  }
  var Be2 = Object.defineProperty, Ae2 = (e, t, r) => t in e ? Be2(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, Pe2 = (e, t, r) => Ae2(e, t + "", r);
  class Ne2 {
    constructor(t, r = x2) {
      Pe2(this, "baseChunkLogger"), this.baseChunkLogger = new J2(t, r);
    }
    write(t) {
      this.baseChunkLogger.appendToLogs(t);
    }
    getLogs() {
      return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
      this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
      return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(t) {
      return this.baseChunkLogger.logsToBlob(t);
    }
  }
  var Ve2 = Object.defineProperty, Fe2 = Object.defineProperties, $e2 = Object.getOwnPropertyDescriptors, H2 = Object.getOwnPropertySymbols, Me2 = Object.prototype.hasOwnProperty, De2 = Object.prototype.propertyIsEnumerable, W2 = (e, t, r) => t in e ? Ve2(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, p2 = (e, t) => {
    for (var r in t || (t = {})) Me2.call(t, r) && W2(e, r, t[r]);
    if (H2) for (var r of H2(t)) De2.call(t, r) && W2(e, r, t[r]);
    return e;
  }, L = (e, t) => Fe2(e, $e2(t));
  function Ge2(e) {
    return L(p2({}, e), { level: e?.level || Z2.level });
  }
  function Q2(e, t, r = C) {
    return e[r] = t, e;
  }
  function ee2(e, t = C) {
    return e[t] || "";
  }
  function te2(e, t, r = C) {
    const s = ee2(e, r);
    return s.trim() ? `${s}/${t}` : t;
  }
  function Ue2(e, t, r = C) {
    const s = te2(e, t, r), i = e.child({ context: s });
    return Q2(i, s, r);
  }
  function re2(e) {
    var t, r;
    const s = new xe2((t = e.opts) == null ? void 0 : t.level, e.maxSizeInBytes);
    return { logger: b2.exports(L(p2({}, e.opts), { level: "trace", browser: L(p2({}, (r = e.opts) == null ? void 0 : r.browser), { write: (i) => s.write(i) }) })), chunkLoggerController: s };
  }
  function ne2(e) {
    var t, r;
    const s = new Ne2((t = e.opts) == null ? void 0 : t.level, e.maxSizeInBytes);
    return { logger: b2.exports(L(p2({}, e.opts), { level: "trace", browser: L(p2({}, (r = e.opts) == null ? void 0 : r.browser), { write: (i) => s.write(i) }) }), s), chunkLoggerController: s };
  }
  function Re2(e) {
    var t;
    if (typeof e.loggerOverride < "u" && typeof e.loggerOverride != "string") return { logger: e.loggerOverride, chunkLoggerController: null };
    const r = L(p2({}, e.opts), { level: typeof e.loggerOverride == "string" ? e.loggerOverride : (t = e.opts) == null ? void 0 : t.level });
    return typeof window < "u" ? re2(L(p2({}, e), { opts: r })) : ne2(L(p2({}, e), { opts: r }));
  }
  index_cjs.MAX_LOG_SIZE_IN_BYTES_DEFAULT = x2, index_cjs.PINO_CUSTOM_CONTEXT_KEY = C, index_cjs.PINO_LOGGER_DEFAULTS = Z2, index_cjs.formatChildLoggerContext = te2, index_cjs.generateChildLogger = Ue2, index_cjs.generateClientLogger = re2, index_cjs.generatePlatformLogger = Re2, index_cjs.generateServerLogger = ne2, index_cjs.getDefaultLoggerOptions = Ge2, index_cjs.getLoggerContext = ee2, index_cjs.pino = we2, index_cjs.setLoggerContext = Q2;
  return index_cjs;
}
export {
  Ge as G,
  Re as R,
  Ue as U,
  requireIndex_cjs as r
};
