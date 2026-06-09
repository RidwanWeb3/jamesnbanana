const t$1 = globalThis, i$1 = (t2) => t2, s$2 = t$1.trustedTypes, e$3 = s$2 ? s$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h$2 = "$lit$", o$4 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$3 = "?" + o$4, r$2 = `<${n$3}>`, l$1 = void 0 === t$1.document ? { createTreeWalker: () => ({}) } : document, c$1 = () => l$1.createComment(""), a$1 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u$2 = Array.isArray, d = (t2) => u$2(t2) || "function" == typeof t2?.[Symbol.iterator], f$2 = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _$1 = /-->/g, m$1 = />/g, p$1 = RegExp(`>|${f$2}(?:([^\\s"'>=/]+)(${f$2}*=${f$2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g$1 = /'/g, $ = /"/g, y$1 = /^(?:script|style|textarea|title)$/i, x$1 = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), T$1 = x$1(1), b$1 = x$1(2), E$1 = /* @__PURE__ */ Symbol.for("lit-noChange"), A = /* @__PURE__ */ Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P$1 = l$1.createTreeWalker(l$1, 129);
function V$1(t2, i2) {
  if (!u$2(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$3 ? e$3.createHTML(i2) : i2;
}
const N$1 = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n2, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v$1;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f3 = 0;
    for (; f3 < s3.length && (c2.lastIndex = f3, u2 = c2.exec(s3), null !== u2); ) f3 = c2.lastIndex, c2 === v$1 ? "!--" === u2[1] ? c2 = _$1 : void 0 !== u2[1] ? c2 = m$1 : void 0 !== u2[2] ? (y$1.test(u2[2]) && (n2 = RegExp("</" + u2[2], "g")), c2 = p$1) : void 0 !== u2[3] && (c2 = p$1) : c2 === p$1 ? ">" === u2[0] ? (c2 = n2 ?? v$1, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$1 : '"' === u2[3] ? $ : g$1) : c2 === $ || c2 === g$1 ? c2 = p$1 : c2 === _$1 || c2 === m$1 ? c2 = v$1 : (c2 = p$1, n2 = void 0);
    const x2 = c2 === p$1 && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v$1 ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h$2 + s3.slice(d2) + o$4 + x2) : s3 + o$4 + (-2 === d2 ? i3 : x2);
  }
  return [V$1(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
let S$1 = class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f3, v2] = N$1(t2, i2);
    if (this.el = S.createElement(f3, e2), P$1.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P$1.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h$2)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$4), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I$1 : "?" === e3[1] ? L$1 : "@" === e3[1] ? z$1 : H$1 }), r2.removeAttribute(t3);
        } else t3.startsWith(o$4) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y$1.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$4), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$2 ? s$2.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c$1()), P$1.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$3) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$4, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$4.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function M$1(t2, i2, s2 = t2, e2) {
  if (i2 === E$1) return i2;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = a$1(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M$1(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
let k$1 = class k {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? l$1).importNode(i2, true);
    P$1.currentNode = e2;
    let h2 = P$1.nextNode(), o2 = 0, n2 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new R$1(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new W$1(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n2];
      }
      o2 !== r2?.index && (h2 = P$1.nextNode(), o2++);
    }
    return P$1.currentNode = l$1, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
};
let R$1 = class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M$1(this, t2, i2), a$1(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E$1 && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a$1(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l$1.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S$1.createElement(V$1(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i2);
    else {
      const t3 = new k$1(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S$1(t2)), i2;
  }
  k(t2) {
    u$2(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new R(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    for (this._$AP?.(false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
};
let H$1 = class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M$1(this, t2, i2, 0), o2 = !a$1(t2) || t2 !== this._$AH && t2 !== E$1, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n2, r2;
      for (t2 = h2[0], n2 = 0; n2 < h2.length - 1; n2++) r2 = M$1(this, e3[s2 + n2], i2, n2), r2 === E$1 && (r2 = this._$AH[n2]), o2 ||= !a$1(r2) || r2 !== this._$AH[n2], r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n2 + 1]), this._$AH[n2] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
let I$1 = class I extends H$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
};
let L$1 = class L extends H$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
};
let z$1 = class z extends H$1 {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = M$1(this, t2, i2, 0) ?? A) === E$1) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
};
let W$1 = class W {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M$1(this, t2);
  }
};
const j$1 = t$1.litHtmlPolyfillSupport;
j$1?.(S$1, R$1), (t$1.litHtmlVersions ??= []).push("3.3.3");
const B$1 = (t2, i2, s2) => {
  const e2 = s2?.renderBefore ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new R$1(i2.insertBefore(c$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
const o$3 = (o2) => o2 ?? A;
const a = /* @__PURE__ */ Symbol.for(""), o$2 = (t2) => {
  if (t2?.r === a) return t2?._$litStatic$;
}, s$1 = (t2) => ({ _$litStatic$: t2, r: a }), l = /* @__PURE__ */ new Map(), n$2 = (t2) => (r2, ...e2) => {
  const a2 = e2.length;
  let s2, i2;
  const n2 = [], u2 = [];
  let c2, $2 = 0, f3 = false;
  for (; $2 < a2; ) {
    for (c2 = r2[$2]; $2 < a2 && void 0 !== (i2 = e2[$2], s2 = o$2(i2)); ) c2 += s2 + r2[++$2], f3 = true;
    $2 !== a2 && u2.push(i2), n2.push(c2), $2++;
  }
  if ($2 === a2 && n2.push(r2[a2]), f3) {
    const t3 = n2.join("$$lit$$");
    void 0 === (r2 = l.get(t3)) && (n2.raw = n2, l.set(t3, r2 = n2)), e2 = u2;
  }
  return t2(r2, ...e2);
}, u$1 = n$2(T$1);
const t = { ATTRIBUTE: 1, CHILD: 2 }, e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
const e$1 = e$2(class extends i {
  constructor(t$12) {
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || t$12.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s2) => t2[s2]).join(" ") + " ";
  }
  update(s2, [i2]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i2) i2[t2] && !this.nt?.has(t2) && this.st.add(t2);
      return this.render(i2);
    }
    const r2 = s2.element.classList;
    for (const t2 of this.st) t2 in i2 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i2) {
      const s3 = !!i2[t2];
      s3 === this.st.has(t2) || this.nt?.has(t2) || (s3 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return E$1;
  }
});
const r$1 = (o2) => void 0 === o2.strings;
const s = (i2, t2) => {
  const e2 = i2._$AN;
  if (void 0 === e2) return false;
  for (const i3 of e2) i3._$AO?.(t2, false), s(i3, t2);
  return true;
}, o$1 = (i2) => {
  let t2, e2;
  do {
    if (void 0 === (t2 = i2._$AM)) break;
    e2 = t2._$AN, e2.delete(i2), i2 = t2;
  } while (0 === e2?.size);
}, r = (i2) => {
  for (let t2; t2 = i2._$AM; i2 = t2) {
    let e2 = t2._$AN;
    if (void 0 === e2) t2._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(i2)) break;
    e2.add(i2), c(t2);
  }
};
function h$1(i2) {
  void 0 !== this._$AN ? (o$1(this), this._$AM = i2, r(this)) : this._$AM = i2;
}
function n$1(i2, t2 = false, e2 = 0) {
  const r2 = this._$AH, h2 = this._$AN;
  if (void 0 !== h2 && 0 !== h2.size) if (t2) if (Array.isArray(r2)) for (let i3 = e2; i3 < r2.length; i3++) s(r2[i3], false), o$1(r2[i3]);
  else null != r2 && (s(r2, false), o$1(r2));
  else s(this, i2);
}
const c = (i2) => {
  i2.type == t.CHILD && (i2._$AP ??= n$1, i2._$AQ ??= h$1);
};
let f$1 = class f extends i {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i2, t2, e2) {
    super._$AT(i2, t2, e2), r(this), this.isConnected = i2._$AU;
  }
  _$AO(i2, t2 = true) {
    i2 !== this.isConnected && (this.isConnected = i2, i2 ? this.reconnected?.() : this.disconnected?.()), t2 && (s(this, i2), o$1(this));
  }
  setValue(t2) {
    if (r$1(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i2 = [...this._$Ct._$AH];
      i2[this._$Ci] = t2, this._$Ct._$AI(i2, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};
const e = () => new h();
class h {
}
const o = /* @__PURE__ */ new WeakMap(), n = e$2(class extends f$1 {
  render(i2) {
    return A;
  }
  update(i2, [s2]) {
    const e2 = s2 !== this.G;
    return e2 && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.G = s2, this.ht = i2.options?.host, this.rt(this.ct = i2.element)), A;
  }
  rt(t2) {
    if (void 0 !== this.G) if (this.isConnected || (t2 = void 0), "function" == typeof this.G) {
      const i2 = this.ht ?? globalThis;
      let s2 = o.get(i2);
      void 0 === s2 && (s2 = /* @__PURE__ */ new WeakMap(), o.set(i2, s2)), void 0 !== s2.get(this.G) && this.G.call(this.ht, void 0), s2.set(this.G, t2), void 0 !== t2 && this.G.call(this.ht, t2);
    } else this.G.value = t2;
  }
  get lt() {
    return "function" == typeof this.G ? o.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
const y = globalThis, S2 = y.trustedTypes, I2 = S2 ? S2.createPolicy("lit-html", { createHTML: (h2) => h2 }) : void 0, W2 = "$lit$", p = `lit$${Math.random().toFixed(9).slice(2)}$`, k2 = "?" + p, F = `<${k2}>`, v = document, x = () => v.createComment(""), H2 = (h2) => h2 === null || typeof h2 != "object" && typeof h2 != "function", D = Array.isArray, Z = (h2) => D(h2) || typeof (h2 == null ? void 0 : h2[Symbol.iterator]) == "function", w = `[ 	
\f\r]`, m = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, B = /-->/g, P = />/g, u = RegExp(`>|${w}(?:([^\\s"'>=/]+)(${w}*=${w}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), R2 = /'/g, U = /"/g, V = /^(?:script|style|textarea|title)$/i, O = (h2) => (t2, ...e2) => ({ _$litType$: h2, strings: t2, values: e2 }), Y = O(1), tt = O(2), N = /* @__PURE__ */ Symbol.for("lit-noChange"), _ = /* @__PURE__ */ Symbol.for("lit-nothing"), j = /* @__PURE__ */ new WeakMap(), g = v.createTreeWalker(v, 129);
function z2(h2, t2) {
  if (!Array.isArray(h2) || !h2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return I2 !== void 0 ? I2.createHTML(t2) : t2;
}
const q = (h2, t2) => {
  const e2 = h2.length - 1, s2 = [];
  let i2, o2 = t2 === 2 ? "<svg>" : "", n2 = m;
  for (let A2 = 0; A2 < e2; A2++) {
    const r2 = h2[A2];
    let a2, $2, l2 = -1, c2 = 0;
    for (; c2 < r2.length && (n2.lastIndex = c2, $2 = n2.exec(r2), $2 !== null); ) c2 = n2.lastIndex, n2 === m ? $2[1] === "!--" ? n2 = B : $2[1] !== void 0 ? n2 = P : $2[2] !== void 0 ? (V.test($2[2]) && (i2 = RegExp("</" + $2[2], "g")), n2 = u) : $2[3] !== void 0 && (n2 = u) : n2 === u ? $2[0] === ">" ? (n2 = i2 != null ? i2 : m, l2 = -1) : $2[1] === void 0 ? l2 = -2 : (l2 = n2.lastIndex - $2[2].length, a2 = $2[1], n2 = $2[3] === void 0 ? u : $2[3] === '"' ? U : R2) : n2 === U || n2 === R2 ? n2 = u : n2 === B || n2 === P ? n2 = m : (n2 = u, i2 = void 0);
    const d2 = n2 === u && h2[A2 + 1].startsWith("/>") ? " " : "";
    o2 += n2 === m ? r2 + F : l2 >= 0 ? (s2.push(a2), r2.slice(0, l2) + W2 + r2.slice(l2) + p + d2) : r2 + p + (l2 === -2 ? A2 : d2);
  }
  return [z2(h2, o2 + (h2[e2] || "<?>") + (t2 === 2 ? "</svg>" : "")), s2];
};
class T {
  constructor({ strings: t2, _$litType$: e2 }, s2) {
    let i2;
    this.parts = [];
    let o2 = 0, n2 = 0;
    const A2 = t2.length - 1, r2 = this.parts, [a2, $2] = q(t2, e2);
    if (this.el = T.createElement(a2, s2), g.currentNode = this.el.content, e2 === 2) {
      const l2 = this.el.content.firstChild;
      l2.replaceWith(...l2.childNodes);
    }
    for (; (i2 = g.nextNode()) !== null && r2.length < A2; ) {
      if (i2.nodeType === 1) {
        if (i2.hasAttributes()) for (const l2 of i2.getAttributeNames()) if (l2.endsWith(W2)) {
          const c2 = $2[n2++], d2 = i2.getAttribute(l2).split(p), C2 = /([.?@])?(.*)/.exec(c2);
          r2.push({ type: 1, index: o2, name: C2[2], strings: d2, ctor: C2[1] === "." ? J : C2[1] === "?" ? K : C2[1] === "@" ? Q : M }), i2.removeAttribute(l2);
        } else l2.startsWith(p) && (r2.push({ type: 6, index: o2 }), i2.removeAttribute(l2));
        if (V.test(i2.tagName)) {
          const l2 = i2.textContent.split(p), c2 = l2.length - 1;
          if (c2 > 0) {
            i2.textContent = S2 ? S2.emptyScript : "";
            for (let d2 = 0; d2 < c2; d2++) i2.append(l2[d2], x()), g.nextNode(), r2.push({ type: 2, index: ++o2 });
            i2.append(l2[c2], x());
          }
        }
      } else if (i2.nodeType === 8) if (i2.data === k2) r2.push({ type: 2, index: o2 });
      else {
        let l2 = -1;
        for (; (l2 = i2.data.indexOf(p, l2 + 1)) !== -1; ) r2.push({ type: 7, index: o2 }), l2 += p.length - 1;
      }
      o2++;
    }
  }
  static createElement(t2, e2) {
    const s2 = v.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function f2(h2, t2, e2 = h2, s2) {
  var n2, A2, r2;
  if (t2 === N) return t2;
  let i2 = s2 !== void 0 ? (n2 = e2._$Co) == null ? void 0 : n2[s2] : e2._$Cl;
  const o2 = H2(t2) ? void 0 : t2._$litDirective$;
  return (i2 == null ? void 0 : i2.constructor) !== o2 && ((A2 = i2 == null ? void 0 : i2._$AO) == null || A2.call(i2, false), o2 === void 0 ? i2 = void 0 : (i2 = new o2(h2), i2._$AT(h2, e2, s2)), s2 !== void 0 ? ((r2 = e2._$Co) != null ? r2 : e2._$Co = [])[s2] = i2 : e2._$Cl = i2), i2 !== void 0 && (t2 = f2(h2, i2._$AS(h2, t2.values), i2, s2)), t2;
}
class G {
  constructor(t2, e2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = e2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    var a2;
    const { el: { content: e2 }, parts: s2 } = this._$AD, i2 = ((a2 = t2 == null ? void 0 : t2.creationScope) != null ? a2 : v).importNode(e2, true);
    g.currentNode = i2;
    let o2 = g.nextNode(), n2 = 0, A2 = 0, r2 = s2[0];
    for (; r2 !== void 0; ) {
      if (n2 === r2.index) {
        let $2;
        r2.type === 2 ? $2 = new b(o2, o2.nextSibling, this, t2) : r2.type === 1 ? $2 = new r2.ctor(o2, r2.name, r2.strings, this, t2) : r2.type === 6 && ($2 = new X(o2, this, t2)), this._$AV.push($2), r2 = s2[++A2];
      }
      n2 !== (r2 == null ? void 0 : r2.index) && (o2 = g.nextNode(), n2++);
    }
    return g.currentNode = v, i2;
  }
  p(t2) {
    let e2 = 0;
    for (const s2 of this._$AV) s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, e2), e2 += s2.strings.length - 2) : s2._$AI(t2[e2])), e2++;
  }
}
class b {
  get _$AU() {
    var t2, e2;
    return (e2 = (t2 = this._$AM) == null ? void 0 : t2._$AU) != null ? e2 : this._$Cv;
  }
  constructor(t2, e2, s2, i2) {
    var o2;
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t2, this._$AB = e2, this._$AM = s2, this.options = i2, this._$Cv = (o2 = i2 == null ? void 0 : i2.isConnected) != null ? o2 : true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const e2 = this._$AM;
    return e2 !== void 0 && (t2 == null ? void 0 : t2.nodeType) === 11 && (t2 = e2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, e2 = this) {
    t2 = f2(this, t2, e2), H2(t2) ? t2 === _ || t2 == null || t2 === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t2 !== this._$AH && t2 !== N && this._(t2) : t2._$litType$ !== void 0 ? this.$(t2) : t2.nodeType !== void 0 ? this.T(t2) : Z(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== _ && H2(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(v.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var o2;
    const { values: e2, _$litType$: s2 } = t2, i2 = typeof s2 == "number" ? this._$AC(t2) : (s2.el === void 0 && (s2.el = T.createElement(z2(s2.h, s2.h[0]), this.options)), s2);
    if (((o2 = this._$AH) == null ? void 0 : o2._$AD) === i2) this._$AH.p(e2);
    else {
      const n2 = new G(i2, this), A2 = n2.u(this.options);
      n2.p(e2), this.T(A2), this._$AH = n2;
    }
  }
  _$AC(t2) {
    let e2 = j.get(t2.strings);
    return e2 === void 0 && j.set(t2.strings, e2 = new T(t2)), e2;
  }
  k(t2) {
    D(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let s2, i2 = 0;
    for (const o2 of t2) i2 === e2.length ? e2.push(s2 = new b(this.S(x()), this.S(x()), this, this.options)) : s2 = e2[i2], s2._$AI(o2), i2++;
    i2 < e2.length && (this._$AR(s2 && s2._$AB.nextSibling, i2), e2.length = i2);
  }
  _$AR(t2 = this._$AA.nextSibling, e2) {
    var s2;
    for ((s2 = this._$AP) == null ? void 0 : s2.call(this, false, true, e2); t2 && t2 !== this._$AB; ) {
      const i2 = t2.nextSibling;
      t2.remove(), t2 = i2;
    }
  }
  setConnected(t2) {
    var e2;
    this._$AM === void 0 && (this._$Cv = t2, (e2 = this._$AP) == null || e2.call(this, t2));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, e2, s2, i2, o2) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t2, this.name = e2, this._$AM = i2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = _;
  }
  _$AI(t2, e2 = this, s2, i2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0) t2 = f2(this, t2, e2, 0), n2 = !H2(t2) || t2 !== this._$AH && t2 !== N, n2 && (this._$AH = t2);
    else {
      const A2 = t2;
      let r2, a2;
      for (t2 = o2[0], r2 = 0; r2 < o2.length - 1; r2++) a2 = f2(this, A2[s2 + r2], e2, r2), a2 === N && (a2 = this._$AH[r2]), n2 || (n2 = !H2(a2) || a2 !== this._$AH[r2]), a2 === _ ? t2 = _ : t2 !== _ && (t2 += (a2 != null ? a2 : "") + o2[r2 + 1]), this._$AH[r2] = a2;
    }
    n2 && !i2 && this.j(t2);
  }
  j(t2) {
    t2 === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class J extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === _ ? void 0 : t2;
  }
}
class K extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== _);
  }
}
class Q extends M {
  constructor(t2, e2, s2, i2, o2) {
    super(t2, e2, s2, i2, o2), this.type = 5;
  }
  _$AI(t2, e2 = this) {
    var n2;
    if ((t2 = (n2 = f2(this, t2, e2, 0)) != null ? n2 : _) === N) return;
    const s2 = this._$AH, i2 = t2 === _ && s2 !== _ || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, o2 = t2 !== _ && (s2 === _ || i2);
    i2 && this.element.removeEventListener(this.name, this, s2), o2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var e2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (e2 = this.options) == null ? void 0 : e2.host) != null ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class X {
  constructor(t2, e2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    f2(this, t2);
  }
}
const E = y.litHtmlPolyfillSupport;
var L2;
E == null || E(T, b), ((L2 = y.litHtmlVersions) != null ? L2 : y.litHtmlVersions = []).push("3.1.4");
const et = (h2, t2, e2) => {
  var o2, n2;
  const s2 = (o2 = e2 == null ? void 0 : e2.renderBefore) != null ? o2 : t2;
  let i2 = s2._$litPart$;
  if (i2 === void 0) {
    const A2 = (n2 = e2 == null ? void 0 : e2.renderBefore) != null ? n2 : null;
    s2._$litPart$ = i2 = new b(t2.insertBefore(x(), A2), A2, void 0, e2 != null ? e2 : {});
  }
  return i2._$AI(h2), i2;
};
export {
  B$1 as B,
  E$1 as E,
  N,
  T$1 as T,
  Y,
  e as a,
  b$1 as b,
  et as c,
  e$1 as e,
  n,
  o$3 as o,
  s$1 as s,
  tt as t,
  u$1 as u
};
