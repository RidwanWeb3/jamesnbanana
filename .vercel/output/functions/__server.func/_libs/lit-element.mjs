import { g, c } from "./lit__reactive-element.mjs";
import { B, E, c as et, N } from "./lit-html.mjs";
const s$1 = globalThis;
let i$1 = class i extends g {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = B(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i$1._$litElement$ = true, i$1["finalized"] = true, s$1.litElementHydrateSupport?.({ LitElement: i$1 });
const o$1 = s$1.litElementPolyfillSupport;
o$1?.({ LitElement: i$1 });
(s$1.litElementVersions ??= []).push("4.2.2");
class n extends c {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore != null || (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = et(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(true);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(false);
  }
  render() {
    return N;
  }
}
var o;
n._$litElement$ = true, n.finalized = true, (o = globalThis.litElementHydrateSupport) == null || o.call(globalThis, { LitElement: n });
const s = globalThis.litElementPolyfillSupport;
s == null || s({ LitElement: n });
var i2;
((i2 = globalThis.litElementVersions) != null ? i2 : globalThis.litElementVersions = []).push("4.0.6");
export {
  i$1 as i,
  n
};
