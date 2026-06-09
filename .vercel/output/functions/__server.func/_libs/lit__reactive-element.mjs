import { H as HTMLElementShimWithRealType, c as customElements$1 } from "./lit-labs__ssr-dom-shim.mjs";
const t = globalThis, e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$1 = /* @__PURE__ */ Symbol(), o$2 = /* @__PURE__ */ new WeakMap();
let n$2 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$2.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$2.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$2("string" == typeof t2 ? t2 : t2 + "", void 0, s$1), i$1 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$2(o2, t2, s$1);
}, S$1 = (s2, o2) => {
  if (e) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$3 = e || void 0 === t.CSSStyleSheet ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
const { is: h$2, defineProperty: r$3, getOwnPropertyDescriptor: o$1, getOwnPropertyNames: n$1, getOwnPropertySymbols: a$2, getPrototypeOf: c$2 } = Object, l$3 = globalThis;
l$3.customElements ??= customElements$1;
const p$3 = l$3.trustedTypes, d$3 = p$3 ? p$3.emptyScript : "", u$1 = l$3.reactiveElementPolyfillSupport, f$2 = (t2, s2) => t2, b$2 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? d$3 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, m$1 = (t2, s2) => !h$2(t2, s2), y$3 = { attribute: true, type: String, converter: b$2, reflect: false, useDefault: false, hasChanged: m$1 };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), l$3.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let g$1 = class g extends (globalThis.HTMLElement ?? HTMLElementShimWithRealType) {
  static addInitializer(t2) {
    this._$Ei(), (this.l ??= []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y$3) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = /* @__PURE__ */ Symbol(), e2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== e2 && r$3(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: h2 } = o$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const r2 = e2?.call(this);
      h2?.call(this, s3), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y$3;
  }
  static _$Ei() {
    if (this.hasOwnProperty(f$2("elementProperties"))) return;
    const t2 = c$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(f$2("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(f$2("properties"))) {
      const t3 = this.properties, s2 = [...n$1(t3), ...a$2(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t2) {
    const s2 = [];
    if (Array.isArray(t2)) {
      const e2 = new Set(t2.flat(1 / 0).reverse());
      for (const t3 of e2) s2.unshift(c$3(t3));
    } else void 0 !== t2 && s2.push(c$3(t2));
    return s2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== i2.converter?.toAttribute ? i2.converter : b$2).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : b$2;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? this._$Ej?.get(e2) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 ??= r2.getPropertyOptions(t2), !((i2.hasChanged ?? m$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq &&= this._$Eq.forEach((t3) => this._$ET(t3, this[t3])), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
g$1.elementStyles = [], g$1.shadowRootOptions = { mode: "open" }, g$1[f$2("elementProperties")] = /* @__PURE__ */ new Map(), g$1[f$2("finalized")] = /* @__PURE__ */ new Map(), u$1?.({ ReactiveElement: g$1 }), (l$3.reactiveElementVersions ??= []).push("2.1.2");
const o = { attribute: true, type: String, converter: b$2, reflect: false, hasChanged: m$1 }, r$2 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$2(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
function r$1(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
const r = globalThis, c$1 = r.ShadowRoot && (r.ShadyCSS === void 0 || r.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, a$1 = /* @__PURE__ */ Symbol(), i = /* @__PURE__ */ new WeakMap();
let l$2 = class l {
  constructor(s2, t2, o2) {
    if (this._$cssResult$ = true, o2 !== a$1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s2, this.t = t2;
  }
  get styleSheet() {
    let s2 = this.o;
    const t2 = this.t;
    if (c$1 && s2 === void 0) {
      const o2 = t2 !== void 0 && t2.length === 1;
      o2 && (s2 = i.get(t2)), s2 === void 0 && ((this.o = s2 = new CSSStyleSheet()).replaceSync(this.cssText), o2 && i.set(t2, s2));
    }
    return s2;
  }
  toString() {
    return this.cssText;
  }
};
const h$1 = (e2) => new l$2(typeof e2 == "string" ? e2 : e2 + "", void 0, a$1), p$2 = (e2, ...s2) => {
  const t2 = e2.length === 1 ? e2[0] : s2.reduce((o2, S2, u2) => o2 + ((n3) => {
    if (n3._$cssResult$ === true) return n3.cssText;
    if (typeof n3 == "number") return n3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(S2) + e2[u2 + 1], e2[0]);
  return new l$2(t2, e2, a$1);
}, d$2 = (e2, s2) => {
  if (c$1) e2.adoptedStyleSheets = s2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const t2 of s2) {
    const o2 = document.createElement("style"), S2 = r.litNonce;
    S2 !== void 0 && o2.setAttribute("nonce", S2), o2.textContent = t2.cssText, e2.appendChild(o2);
  }
}, y$2 = c$1 ? (e2) => e2 : (e2) => e2 instanceof CSSStyleSheet ? ((s2) => {
  let t2 = "";
  for (const o2 of s2.cssRules) t2 += o2.cssText;
  return h$1(t2);
})(e2) : e2;
const { is: b$1, defineProperty: v, getOwnPropertyDescriptor: S, getOwnPropertyNames: U, getOwnPropertySymbols: w$1, getPrototypeOf: A } = Object, a = globalThis, f$1 = a.trustedTypes, O$1 = f$1 ? f$1.emptyScript : "", p$1 = a.reactiveElementPolyfillSupport, l$1 = (o2, t2) => o2, d$1 = { toAttribute(o2, t2) {
  switch (t2) {
    case Boolean:
      o2 = o2 ? O$1 : null;
      break;
    case Object:
    case Array:
      o2 = o2 == null ? o2 : JSON.stringify(o2);
  }
  return o2;
}, fromAttribute(o2, t2) {
  let e2 = o2;
  switch (t2) {
    case Boolean:
      e2 = o2 !== null;
      break;
    case Number:
      e2 = o2 === null ? null : Number(o2);
      break;
    case Object:
    case Array:
      try {
        e2 = JSON.parse(o2);
      } catch (s2) {
        e2 = null;
      }
  }
  return e2;
} }, y$1 = (o2, t2) => !b$1(o2, t2), E = { attribute: true, type: String, converter: d$1, reflect: false, hasChanged: y$1 };
Symbol.metadata != null || (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata != null || (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class c extends HTMLElement {
  static addInitializer(t2) {
    var e2;
    this._$Ei(), ((e2 = this.l) != null ? e2 : this.l = []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, e2 = E) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.elementProperties.set(t2, e2), !e2.noAccessor) {
      const s2 = /* @__PURE__ */ Symbol(), i2 = this.getPropertyDescriptor(t2, s2, e2);
      i2 !== void 0 && v(this.prototype, t2, i2);
    }
  }
  static getPropertyDescriptor(t2, e2, s2) {
    var r2;
    const { get: i2, set: n3 } = (r2 = S(this.prototype, t2)) != null ? r2 : { get() {
      return this[e2];
    }, set(h2) {
      this[e2] = h2;
    } };
    return { get() {
      return i2 == null ? void 0 : i2.call(this);
    }, set(h2) {
      const g3 = i2 == null ? void 0 : i2.call(this);
      n3.call(this, h2), this.requestUpdate(t2, g3, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    var e2;
    return (e2 = this.elementProperties.get(t2)) != null ? e2 : E;
  }
  static _$Ei() {
    if (this.hasOwnProperty(l$1("elementProperties"))) return;
    const t2 = A(this);
    t2.finalize(), t2.l !== void 0 && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(l$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(l$1("properties"))) {
      const e2 = this.properties, s2 = [...U(e2), ...w$1(e2)];
      for (const i2 of s2) this.createProperty(i2, e2[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (t2 !== null) {
      const e2 = litPropertyMetadata.get(t2);
      if (e2 !== void 0) for (const [s2, i2] of e2) this.elementProperties.set(s2, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e2, s2] of this.elementProperties) {
      const i2 = this._$Eu(e2, s2);
      i2 !== void 0 && this._$Eh.set(i2, e2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t2) {
    const e2 = [];
    if (Array.isArray(t2)) {
      const s2 = new Set(t2.flat(1 / 0).reverse());
      for (const i2 of s2) e2.unshift(y$2(i2));
    } else t2 !== void 0 && e2.push(y$2(t2));
    return e2;
  }
  static _$Eu(t2, e2) {
    const s2 = e2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t2;
    this._$ES = new Promise((e2) => this.enableUpdating = e2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t2 = this.constructor.l) == null || t2.forEach((e2) => e2(this));
  }
  addController(t2) {
    var e2, s2;
    ((e2 = this._$EO) != null ? e2 : this._$EO = /* @__PURE__ */ new Set()).add(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) == null || s2.call(t2));
  }
  removeController(t2) {
    var e2;
    (e2 = this._$EO) == null || e2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), e2 = this.constructor.elementProperties;
    for (const s2 of e2.keys()) this.hasOwnProperty(s2) && (t2.set(s2, this[s2]), delete this[s2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    var e2;
    const t2 = (e2 = this.shadowRoot) != null ? e2 : this.attachShadow(this.constructor.shadowRootOptions);
    return d$2(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var e2;
    this.renderRoot != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (e2 = this._$EO) == null || e2.forEach((s2) => {
      var i2;
      return (i2 = s2.hostConnected) == null ? void 0 : i2.call(s2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$EO) == null || t2.forEach((e2) => {
      var s2;
      return (s2 = e2.hostDisconnected) == null ? void 0 : s2.call(e2);
    });
  }
  attributeChangedCallback(t2, e2, s2) {
    this._$AK(t2, s2);
  }
  _$EC(t2, e2) {
    var n3;
    const s2 = this.constructor.elementProperties.get(t2), i2 = this.constructor._$Eu(t2, s2);
    if (i2 !== void 0 && s2.reflect === true) {
      const r2 = (((n3 = s2.converter) == null ? void 0 : n3.toAttribute) !== void 0 ? s2.converter : d$1).toAttribute(e2, s2.type);
      this._$Em = t2, r2 == null ? this.removeAttribute(i2) : this.setAttribute(i2, r2), this._$Em = null;
    }
  }
  _$AK(t2, e2) {
    var n3;
    const s2 = this.constructor, i2 = s2._$Eh.get(t2);
    if (i2 !== void 0 && this._$Em !== i2) {
      const r2 = s2.getPropertyOptions(i2), h2 = typeof r2.converter == "function" ? { fromAttribute: r2.converter } : ((n3 = r2.converter) == null ? void 0 : n3.fromAttribute) !== void 0 ? r2.converter : d$1;
      this._$Em = i2, this[i2] = h2.fromAttribute(e2, r2.type), this._$Em = null;
    }
  }
  requestUpdate(t2, e2, s2) {
    var i2;
    if (t2 !== void 0) {
      if (s2 != null || (s2 = this.constructor.getPropertyOptions(t2)), !((i2 = s2.hasChanged) != null ? i2 : y$1)(this[t2], e2)) return;
      this.P(t2, e2, s2);
    }
    this.isUpdatePending === false && (this._$ES = this._$ET());
  }
  P(t2, e2, s2) {
    var i2;
    this._$AL.has(t2) || this._$AL.set(t2, e2), s2.reflect === true && this._$Em !== t2 && ((i2 = this._$Ej) != null ? i2 : this._$Ej = /* @__PURE__ */ new Set()).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (e2) {
      Promise.reject(e2);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r2, h2] of this._$Ep) this[r2] = h2;
        this._$Ep = void 0;
      }
      const n3 = this.constructor.elementProperties;
      if (n3.size > 0) for (const [r2, h2] of n3) h2.wrapped !== true || this._$AL.has(r2) || this[r2] === void 0 || this.P(r2, this[r2], h2);
    }
    let t2 = false;
    const e2 = this._$AL;
    try {
      t2 = this.shouldUpdate(e2), t2 ? (this.willUpdate(e2), (i2 = this._$EO) == null || i2.forEach((n3) => {
        var r2;
        return (r2 = n3.hostUpdate) == null ? void 0 : r2.call(n3);
      }), this.update(e2)) : this._$EU();
    } catch (n3) {
      throw t2 = false, this._$EU(), n3;
    }
    t2 && this._$AE(e2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var e2;
    (e2 = this._$EO) == null || e2.forEach((s2) => {
      var i2;
      return (i2 = s2.hostUpdated) == null ? void 0 : i2.call(s2);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e2) => this._$EC(e2, this[e2]))), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
var m;
c.elementStyles = [], c.shadowRootOptions = { mode: "open" }, c[l$1("elementProperties")] = /* @__PURE__ */ new Map(), c[l$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null || p$1({ ReactiveElement: c }), ((m = a.reactiveElementVersions) != null ? m : a.reactiveElementVersions = []).push("2.0.4");
const s = (e2) => (t2, n3) => {
  n3 !== void 0 ? n3.addInitializer(() => {
    customElements.define(e2, t2);
  }) : customElements.define(e2, t2);
};
var h = Object.defineProperty, f = Object.defineProperties;
var y = Object.getOwnPropertyDescriptors;
var p = Object.getOwnPropertySymbols;
var g2 = Object.prototype.hasOwnProperty, P = Object.prototype.propertyIsEnumerable;
var d = (e2, t2, r2) => t2 in e2 ? h(e2, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[t2] = r2, l2 = (e2, t2) => {
  for (var r2 in t2 || (t2 = {}))
    g2.call(t2, r2) && d(e2, r2, t2[r2]);
  if (p)
    for (var r2 of p(t2))
      P.call(t2, r2) && d(e2, r2, t2[r2]);
  return e2;
}, u = (e2, t2) => f(e2, y(t2));
const b = { attribute: true, type: String, converter: d$1, reflect: false, hasChanged: y$1 }, w = (e2 = b, t2, r2) => {
  const { kind: n3, metadata: s2 } = r2;
  let a2 = globalThis.litPropertyMetadata.get(s2);
  if (a2 === void 0 && globalThis.litPropertyMetadata.set(s2, a2 = /* @__PURE__ */ new Map()), a2.set(r2.name, e2), n3 === "accessor") {
    const { name: o2 } = r2;
    return { set(i2) {
      const c2 = t2.get.call(this);
      t2.set.call(this, i2), this.requestUpdate(o2, c2, e2);
    }, init(i2) {
      return i2 !== void 0 && this.P(o2, void 0, e2), i2;
    } };
  }
  if (n3 === "setter") {
    const { name: o2 } = r2;
    return function(i2) {
      const c2 = this[o2];
      t2.call(this, i2), this.requestUpdate(o2, c2, e2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function O(e2) {
  return (t2, r2) => typeof r2 == "object" ? w(e2, t2, r2) : ((n3, s2, a2) => {
    const o2 = s2.hasOwnProperty(a2);
    return s2.constructor.createProperty(a2, o2 ? u(l2({}, n3), { wrapped: true }) : n3), o2 ? Object.getOwnPropertyDescriptor(s2, a2) : void 0;
  })(e2, t2, r2);
}
export {
  O,
  r$1 as a,
  c,
  g$1 as g,
  i$1 as i,
  n2 as n,
  p$2 as p,
  r$4 as r,
  s
};
