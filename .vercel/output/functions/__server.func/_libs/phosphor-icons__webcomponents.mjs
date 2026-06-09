import { p, O, s as s$e } from "./lit__reactive-element.mjs";
import { Y, t as tt } from "./lit-html.mjs";
import { n as n$8 } from "./lit-element.mjs";
var w$8 = Object.defineProperty, A$2 = Object.getOwnPropertyDescriptor, l$6 = (a11, o2, p2, s2) => {
  for (var r2 = s2 > 1 ? void 0 : s2 ? A$2(o2, p2) : o2, m2 = a11.length - 1, h3; m2 >= 0; m2--)
    (h3 = a11[m2]) && (r2 = (s2 ? h3(o2, p2, r2) : h3(r2)) || r2);
  return s2 && r2 && w$8(o2, p2, r2), r2;
};
let t$D = class t extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$D.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$D.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm34.83-86.83a4,4,0,0,1,0,5.66l-32,32a4,4,0,0,1-5.66,0l-32-32a4,4,0,0,1,5.66-5.66L124,158.34V88a4,4,0,0,1,8,0v70.34l25.17-25.17A4,4,0,0,1,162.83,133.17Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm36.24-86.24a6,6,0,0,1,0,8.48l-32,32a6,6,0,0,1-8.48,0l-32-32a6,6,0,0,1,8.48-8.48L122,153.51V88a6,6,0,0,1,12,0v65.51l21.76-21.75A6,6,0,0,1,164.24,131.76Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-85.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,148.69V88a8,8,0,0,1,16,0v60.69l18.34-18.35A8,8,0,0,1,165.66,130.34Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm40.49-84.49a12,12,0,0,1,0,17l-32,32a12,12,0,0,1-17,0l-32-32a12,12,0,1,1,17-17L116,139V88a12,12,0,0,1,24,0v51l11.51-11.52A12,12,0,0,1,168.49,127.51Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,117.66-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,148.69V88a8,8,0,0,1,16,0v60.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-85.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,148.69V88a8,8,0,0,1,16,0v60.69l18.34-18.35A8,8,0,0,1,165.66,130.34Z"/>`
  ]
]);
t$D.styles = p`
    :host {
      display: contents;
    }
  `;
l$6([
  O({ type: String, reflect: true })
], t$D.prototype, "size", 2);
l$6([
  O({ type: String, reflect: true })
], t$D.prototype, "weight", 2);
l$6([
  O({ type: String, reflect: true })
], t$D.prototype, "color", 2);
l$6([
  O({ type: Boolean, reflect: true })
], t$D.prototype, "mirrored", 2);
t$D = l$6([
  s$e("ph-arrow-circle-down")
], t$D);
const PhArrowCircleDown = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowCircleDown() {
    return t$D;
  }
});
var w$7 = Object.defineProperty, u$j = Object.getOwnPropertyDescriptor, o$k = (a11, s2, h3, i) => {
  for (var r2 = i > 1 ? void 0 : i ? u$j(s2, h3) : s2, p2 = a11.length - 1, c2; p2 >= 0; p2--)
    (c2 = a11[p2]) && (r2 = (i ? c2(s2, h3, r2) : c2(r2)) || r2);
  return i && r2 && w$7(s2, h3, r2), r2;
};
let t$C = class t2 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$C.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$C.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M236,56v48a4,4,0,0,1-4,4H184a4,4,0,0,1,0-8h37.7L187.53,68.69l-.13-.12a84,84,0,1,0-1.75,120.51,4,4,0,0,1,5.5,5.82A91.43,91.43,0,0,1,128,220h-1.26A92,92,0,1,1,193,62.84l35,32.05V56a4,4,0,1,1,8,0Z"/>`
  ],
  [
    "light",
    tt`<path d="M238,56v48a6,6,0,0,1-6,6H184a6,6,0,0,1,0-12h32.55l-30.38-27.8c-.06-.06-.12-.13-.19-.19a82,82,0,1,0-1.7,117.65,6,6,0,0,1,8.24,8.73A93.46,93.46,0,0,1,128,222h-1.28A94,94,0,1,1,194.37,61.4L226,90.35V56a6,6,0,1,1,12,0Z"/>`
  ],
  [
    "regular",
    tt`<path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"/>`
  ],
  [
    "bold",
    tt`<path d="M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z"/>`
  ],
  [
    "fill",
    tt`<path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1-5.66-13.66l17-17-10.55-9.65-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,1,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60l10.93,10L226.34,50.3A8,8,0,0,1,240,56Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"/><path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"/>`
  ]
]);
t$C.styles = p`
    :host {
      display: contents;
    }
  `;
o$k([
  O({ type: String, reflect: true })
], t$C.prototype, "size", 2);
o$k([
  O({ type: String, reflect: true })
], t$C.prototype, "weight", 2);
o$k([
  O({ type: String, reflect: true })
], t$C.prototype, "color", 2);
o$k([
  O({ type: Boolean, reflect: true })
], t$C.prototype, "mirrored", 2);
t$C = o$k([
  s$e("ph-arrow-clockwise")
], t$C);
const PhArrowClockwise = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowClockwise() {
    return t$C;
  }
});
var w$6 = Object.defineProperty, u$i = Object.getOwnPropertyDescriptor, a$c = (o2, l2, p2, s2) => {
  for (var r2 = s2 > 1 ? void 0 : s2 ? u$i(l2, p2) : l2, h3 = o2.length - 1, n2; h3 >= 0; h3--)
    (n2 = o2[h3]) && (r2 = (s2 ? n2(l2, p2, r2) : n2(r2)) || r2);
  return s2 && r2 && w$6(l2, p2, r2), r2;
};
let t$B = class t3 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$B.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$B.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M202.83,146.83l-72,72a4,4,0,0,1-5.66,0l-72-72a4,4,0,0,1,5.66-5.66L124,206.34V40a4,4,0,0,1,8,0V206.34l65.17-65.17a4,4,0,0,1,5.66,5.66Z"/>`
  ],
  [
    "light",
    tt`<path d="M204.24,148.24l-72,72a6,6,0,0,1-8.48,0l-72-72a6,6,0,0,1,8.48-8.48L122,201.51V40a6,6,0,0,1,12,0V201.51l61.76-61.75a6,6,0,0,1,8.48,8.48Z"/>`
  ],
  [
    "regular",
    tt`<path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"/>`
  ],
  [
    "bold",
    tt`<path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,56,136h64V40a8,8,0,0,1,16,0v96h64a8,8,0,0,1,5.66,13.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M200,144l-72,72L56,144Z" opacity="0.2"/><path d="M207.39,140.94A8,8,0,0,0,200,136H136V40a8,8,0,0,0-16,0v96H56a8,8,0,0,0-5.66,13.66l72,72a8,8,0,0,0,11.32,0l72-72A8,8,0,0,0,207.39,140.94ZM128,204.69,75.31,152H180.69Z"/>`
  ]
]);
t$B.styles = p`
    :host {
      display: contents;
    }
  `;
a$c([
  O({ type: String, reflect: true })
], t$B.prototype, "size", 2);
a$c([
  O({ type: String, reflect: true })
], t$B.prototype, "weight", 2);
a$c([
  O({ type: String, reflect: true })
], t$B.prototype, "color", 2);
a$c([
  O({ type: Boolean, reflect: true })
], t$B.prototype, "mirrored", 2);
t$B = a$c([
  s$e("ph-arrow-down")
], t$B);
const PhArrowDown = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowDown() {
    return t$B;
  }
});
var u$h = Object.defineProperty, w$5 = Object.getOwnPropertyDescriptor, l$5 = (a11, o2, p2, s2) => {
  for (var r2 = s2 > 1 ? void 0 : s2 ? w$5(o2, p2) : o2, h3 = a11.length - 1, n2; h3 >= 0; h3--)
    (n2 = a11[h3]) && (r2 = (s2 ? n2(o2, p2, r2) : n2(r2)) || r2);
  return s2 && r2 && u$h(o2, p2, r2), r2;
};
let t$A = class t4 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$A.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$A.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M220,128a4,4,0,0,1-4,4H49.66l65.17,65.17a4,4,0,0,1-5.66,5.66l-72-72a4,4,0,0,1,0-5.66l72-72a4,4,0,0,1,5.66,5.66L49.66,124H216A4,4,0,0,1,220,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M222,128a6,6,0,0,1-6,6H54.49l61.75,61.76a6,6,0,1,1-8.48,8.48l-72-72a6,6,0,0,1,0-8.48l72-72a6,6,0,0,1,8.48,8.48L54.49,122H216A6,6,0,0,1,222,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M224,128a8,8,0,0,1-8,8H120v64a8,8,0,0,1-13.66,5.66l-72-72a8,8,0,0,1,0-11.32l72-72A8,8,0,0,1,120,56v64h96A8,8,0,0,1,224,128Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M112,56V200L40,128Z" opacity="0.2"/><path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z"/>`
  ]
]);
t$A.styles = p`
    :host {
      display: contents;
    }
  `;
l$5([
  O({ type: String, reflect: true })
], t$A.prototype, "size", 2);
l$5([
  O({ type: String, reflect: true })
], t$A.prototype, "weight", 2);
l$5([
  O({ type: String, reflect: true })
], t$A.prototype, "color", 2);
l$5([
  O({ type: Boolean, reflect: true })
], t$A.prototype, "mirrored", 2);
t$A = l$5([
  s$e("ph-arrow-left")
], t$A);
const PhArrowLeft = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowLeft() {
    return t$A;
  }
});
var u$g = Object.defineProperty, w$4 = Object.getOwnPropertyDescriptor, s$d = (o2, l2, p2, a11) => {
  for (var r2 = a11 > 1 ? void 0 : a11 ? w$4(l2, p2) : l2, h3 = o2.length - 1, n2; h3 >= 0; h3--)
    (n2 = o2[h3]) && (r2 = (a11 ? n2(l2, p2, r2) : n2(r2)) || r2);
  return a11 && r2 && u$g(l2, p2, r2), r2;
};
let t$z = class t5 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$z.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$z.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M218.83,130.83l-72,72a4,4,0,0,1-5.66-5.66L206.34,132H40a4,4,0,0,1,0-8H206.34L141.17,58.83a4,4,0,0,1,5.66-5.66l72,72A4,4,0,0,1,218.83,130.83Z"/>`
  ],
  [
    "light",
    tt`<path d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z"/>`
  ],
  [
    "regular",
    tt`<path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>`
  ],
  [
    "bold",
    tt`<path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"/>`
  ],
  [
    "fill",
    tt`<path d="M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,128l-72,72V56Z" opacity="0.2"/><path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z"/>`
  ]
]);
t$z.styles = p`
    :host {
      display: contents;
    }
  `;
s$d([
  O({ type: String, reflect: true })
], t$z.prototype, "size", 2);
s$d([
  O({ type: String, reflect: true })
], t$z.prototype, "weight", 2);
s$d([
  O({ type: String, reflect: true })
], t$z.prototype, "color", 2);
s$d([
  O({ type: Boolean, reflect: true })
], t$z.prototype, "mirrored", 2);
t$z = s$d([
  s$e("ph-arrow-right")
], t$z);
const PhArrowRight = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowRight() {
    return t$z;
  }
});
var g$d = Object.defineProperty, c$e = Object.getOwnPropertyDescriptor, o$j = (e2, s2, p2, h3) => {
  for (var t41 = h3 > 1 ? void 0 : h3 ? c$e(s2, p2) : s2, l2 = e2.length - 1, m2; l2 >= 0; l2--)
    (m2 = e2[l2]) && (t41 = (h3 ? m2(s2, p2, t41) : m2(t41)) || t41);
  return h3 && t41 && g$d(s2, p2, t41), t41;
};
let a$b = class a extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$b.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
a$b.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M220,104a4,4,0,0,1-8,0V49.66l-73.16,73.17a4,4,0,0,1-5.66-5.66L206.34,44H152a4,4,0,0,1,0-8h64a4,4,0,0,1,4,4Zm-36,28a4,4,0,0,0-4,4v72a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V80a4,4,0,0,1,4-4h72a4,4,0,0,0,0-8H48A12,12,0,0,0,36,80V208a12,12,0,0,0,12,12H176a12,12,0,0,0,12-12V136A4,4,0,0,0,184,132Z"/>`
  ],
  [
    "light",
    tt`<path d="M222,104a6,6,0,0,1-12,0V54.49l-69.75,69.75a6,6,0,0,1-8.48-8.48L201.51,46H152a6,6,0,0,1,0-12h64a6,6,0,0,1,6,6Zm-38,26a6,6,0,0,0-6,6v72a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V80a2,2,0,0,1,2-2h72a6,6,0,0,0,0-12H48A14,14,0,0,0,34,80V208a14,14,0,0,0,14,14H176a14,14,0,0,0,14-14V136A6,6,0,0,0,184,130Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M192,136v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64h72a8,8,0,0,1,0,16H48V208H176V136a8,8,0,0,1,16,0Zm32-96a8,8,0,0,0-8-8H152a8,8,0,0,0-5.66,13.66L172.69,72l-42.35,42.34a8,8,0,0,0,11.32,11.32L184,83.31l26.34,26.35A8,8,0,0,0,224,104Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M184,80V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H176A8,8,0,0,1,184,80Z" opacity="0.2"/><path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/>`
  ]
]);
a$b.styles = p`
    :host {
      display: contents;
    }
  `;
o$j([
  O({ type: String, reflect: true })
], a$b.prototype, "size", 2);
o$j([
  O({ type: String, reflect: true })
], a$b.prototype, "weight", 2);
o$j([
  O({ type: String, reflect: true })
], a$b.prototype, "color", 2);
o$j([
  O({ type: Boolean, reflect: true })
], a$b.prototype, "mirrored", 2);
a$b = o$j([
  s$e("ph-arrow-square-out")
], a$b);
const PhArrowSquareOut = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowSquareOut() {
    return a$b;
  }
});
var f$e = Object.defineProperty, u$f = Object.getOwnPropertyDescriptor, l$4 = (e2, o2, i, s2) => {
  for (var a11 = s2 > 1 ? void 0 : s2 ? u$f(o2, i) : o2, h3 = e2.length - 1, m2; h3 >= 0; h3--)
    (m2 = e2[h3]) && (a11 = (s2 ? m2(o2, i, a11) : m2(a11)) || a11);
  return s2 && a11 && f$e(o2, i, a11), a11;
};
let t$y = class t6 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$y.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
t$y.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M114.83,173.17a4,4,0,0,1,0,5.66l-32,32a4,4,0,0,1-5.66,0l-32-32a4,4,0,0,1,5.66-5.66L76,198.34V48a4,4,0,0,1,8,0V198.34l25.17-25.17A4,4,0,0,1,114.83,173.17Zm96-96-32-32a4,4,0,0,0-5.66,0l-32,32a4,4,0,0,0,5.66,5.66L172,57.66V208a4,4,0,0,0,8,0V57.66l25.17,25.17a4,4,0,1,0,5.66-5.66Z"/>`
  ],
  [
    "light",
    tt`<path d="M116.24,171.76a6,6,0,0,1,0,8.48l-32,32a6,6,0,0,1-8.48,0l-32-32a6,6,0,0,1,8.48-8.48L74,193.51V48a6,6,0,0,1,12,0V193.51l21.76-21.75A6,6,0,0,1,116.24,171.76Zm96-96-32-32a6,6,0,0,0-8.48,0l-32,32a6,6,0,0,0,8.48,8.48L170,62.49V208a6,6,0,0,0,12,0V62.49l21.76,21.75a6,6,0,0,0,8.48-8.48Z"/>`
  ],
  [
    "regular",
    tt`<path d="M117.66,170.34a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L72,188.69V48a8,8,0,0,1,16,0V188.69l18.34-18.35A8,8,0,0,1,117.66,170.34Zm96-96-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L168,67.31V208a8,8,0,0,0,16,0V67.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"/>`
  ],
  [
    "bold",
    tt`<path d="M120.49,167.51a12,12,0,0,1,0,17l-32,32a12,12,0,0,1-17,0l-32-32a12,12,0,1,1,17-17L68,179V48a12,12,0,0,1,24,0V179l11.51-11.52A12,12,0,0,1,120.49,167.51Zm96-96-32-32a12,12,0,0,0-17,0l-32,32a12,12,0,0,0,17,17L164,77V208a12,12,0,0,0,24,0V77l11.51,11.52a12,12,0,0,0,17-17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M119.39,172.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,48,168H72V48a8,8,0,0,1,16,0V168h24A8,8,0,0,1,119.39,172.94Zm94.27-98.6-32-32a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,144,88h24V208a8,8,0,0,0,16,0V88h24a8,8,0,0,0,5.66-13.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M176,48V208H80V48Z" opacity="0.2"/><path d="M117.66,170.34a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L72,188.69V48a8,8,0,0,1,16,0V188.69l18.34-18.35A8,8,0,0,1,117.66,170.34Zm96-96-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L168,67.31V208a8,8,0,0,0,16,0V67.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"/>`
  ]
]);
t$y.styles = p`
    :host {
      display: contents;
    }
  `;
l$4([
  O({ type: String, reflect: true })
], t$y.prototype, "size", 2);
l$4([
  O({ type: String, reflect: true })
], t$y.prototype, "weight", 2);
l$4([
  O({ type: String, reflect: true })
], t$y.prototype, "color", 2);
l$4([
  O({ type: Boolean, reflect: true })
], t$y.prototype, "mirrored", 2);
t$y = l$4([
  s$e("ph-arrows-down-up")
], t$y);
const PhArrowsDownUp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowsDownUp() {
    return t$y;
  }
});
var c$d = Object.defineProperty, u$e = Object.getOwnPropertyDescriptor, l$3 = (a11, o2, p2, s2) => {
  for (var r2 = s2 > 1 ? void 0 : s2 ? u$e(o2, p2) : o2, h3 = a11.length - 1, m2; h3 >= 0; h3--)
    (m2 = a11[h3]) && (r2 = (s2 ? m2(o2, p2, r2) : m2(r2)) || r2);
  return s2 && r2 && c$d(o2, p2, r2), r2;
};
let t$x = class t7 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$x.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$x.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M210.83,173.17a4,4,0,0,1,0,5.66l-32,32a4,4,0,0,1-5.66-5.66L198.34,180H48a4,4,0,0,1,0-8H198.34l-25.17-25.17a4,4,0,0,1,5.66-5.66ZM77.17,114.83a4,4,0,0,0,5.66-5.66L57.66,84H208a4,4,0,0,0,0-8H57.66L82.83,50.83a4,4,0,0,0-5.66-5.66l-32,32a4,4,0,0,0,0,5.66Z"/>`
  ],
  [
    "light",
    tt`<path d="M212.24,171.76a6,6,0,0,1,0,8.48l-32,32a6,6,0,0,1-8.48-8.48L193.51,182H48a6,6,0,0,1,0-12H193.51l-21.75-21.76a6,6,0,0,1,8.48-8.48ZM75.76,116.24a6,6,0,0,0,8.48-8.48L62.49,86H208a6,6,0,0,0,0-12H62.49L84.24,52.24a6,6,0,0,0-8.48-8.48l-32,32a6,6,0,0,0,0,8.48Z"/>`
  ],
  [
    "regular",
    tt`<path d="M213.66,181.66l-32,32a8,8,0,0,1-11.32-11.32L188.69,184H48a8,8,0,0,1,0-16H188.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,213.66,181.66Zm-139.32-64a8,8,0,0,0,11.32-11.32L67.31,88H208a8,8,0,0,0,0-16H67.31L85.66,53.66A8,8,0,0,0,74.34,42.34l-32,32a8,8,0,0,0,0,11.32Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216.49,184.49l-32,32a12,12,0,0,1-17-17L179,188H48a12,12,0,0,1,0-24H179l-11.52-11.51a12,12,0,0,1,17-17l32,32A12,12,0,0,1,216.49,184.49Zm-145-64a12,12,0,0,0,17-17L77,92H208a12,12,0,0,0,0-24H77L88.49,56.49a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M42.34,85.66a8,8,0,0,1,0-11.32l32-32A8,8,0,0,1,88,48V72H208a8,8,0,0,1,0,16H88v24a8,8,0,0,1-13.66,5.66Zm171.32,84.68-32-32A8,8,0,0,0,168,144v24H48a8,8,0,0,0,0,16H168v24a8,8,0,0,0,13.66,5.66l32-32A8,8,0,0,0,213.66,170.34Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M208,80v96H48V80Z" opacity="0.2"/><path d="M213.66,181.66l-32,32a8,8,0,0,1-11.32-11.32L188.69,184H48a8,8,0,0,1,0-16H188.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,213.66,181.66Zm-139.32-64a8,8,0,0,0,11.32-11.32L67.31,88H208a8,8,0,0,0,0-16H67.31L85.66,53.66A8,8,0,0,0,74.34,42.34l-32,32a8,8,0,0,0,0,11.32Z"/>`
  ]
]);
t$x.styles = p`
    :host {
      display: contents;
    }
  `;
l$3([
  O({ type: String, reflect: true })
], t$x.prototype, "size", 2);
l$3([
  O({ type: String, reflect: true })
], t$x.prototype, "weight", 2);
l$3([
  O({ type: String, reflect: true })
], t$x.prototype, "color", 2);
l$3([
  O({ type: Boolean, reflect: true })
], t$x.prototype, "mirrored", 2);
t$x = l$3([
  s$e("ph-arrows-left-right")
], t$x);
const PhArrowsLeftRight = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowsLeftRight() {
    return t$x;
  }
});
var u$d = Object.defineProperty, w$3 = Object.getOwnPropertyDescriptor, o$i = (a11, s2, i, l2) => {
  for (var r2 = l2 > 1 ? void 0 : l2 ? w$3(s2, i) : s2, h3 = a11.length - 1, n2; h3 >= 0; h3--)
    (n2 = a11[h3]) && (r2 = (l2 ? n2(s2, i, r2) : n2(r2)) || r2);
  return l2 && r2 && u$d(s2, i, r2), r2;
};
let t$w = class t8 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$w.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$w.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M202.83,114.83a4,4,0,0,1-5.66,0L132,49.66V216a4,4,0,0,1-8,0V49.66L58.83,114.83a4,4,0,0,1-5.66-5.66l72-72a4,4,0,0,1,5.66,0l72,72A4,4,0,0,1,202.83,114.83Z"/>`
  ],
  [
    "light",
    tt`<path d="M204.24,116.24a6,6,0,0,1-8.48,0L134,54.49V216a6,6,0,0,1-12,0V54.49L60.24,116.24a6,6,0,0,1-8.48-8.48l72-72a6,6,0,0,1,8.48,0l72,72A6,6,0,0,1,204.24,116.24Z"/>`
  ],
  [
    "regular",
    tt`<path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"/>`
  ],
  [
    "bold",
    tt`<path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"/>`
  ],
  [
    "fill",
    tt`<path d="M207.39,115.06A8,8,0,0,1,200,120H136v96a8,8,0,0,1-16,0V120H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,207.39,115.06Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M200,112H56l72-72Z" opacity="0.2"/><path d="M205.66,106.34l-72-72a8,8,0,0,0-11.32,0l-72,72A8,8,0,0,0,56,120h64v96a8,8,0,0,0,16,0V120h64a8,8,0,0,0,5.66-13.66ZM75.31,104,128,51.31,180.69,104Z"/>`
  ]
]);
t$w.styles = p`
    :host {
      display: contents;
    }
  `;
o$i([
  O({ type: String, reflect: true })
], t$w.prototype, "size", 2);
o$i([
  O({ type: String, reflect: true })
], t$w.prototype, "weight", 2);
o$i([
  O({ type: String, reflect: true })
], t$w.prototype, "color", 2);
o$i([
  O({ type: Boolean, reflect: true })
], t$w.prototype, "mirrored", 2);
t$w = o$i([
  s$e("ph-arrow-up")
], t$w);
const PhArrowUp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowUp() {
    return t$w;
  }
});
var u$c = Object.defineProperty, w$2 = Object.getOwnPropertyDescriptor, s$c = (o2, a11, h3, i) => {
  for (var r2 = i > 1 ? void 0 : i ? w$2(a11, h3) : a11, l2 = o2.length - 1, m2; l2 >= 0; l2--)
    (m2 = o2[l2]) && (r2 = (i ? m2(a11, h3, r2) : m2(r2)) || r2);
  return i && r2 && u$c(a11, h3, r2), r2;
};
let t$v = class t9 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$v.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$v.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M196,64V168a4,4,0,0,1-8,0V73.66L66.83,194.83a4,4,0,0,1-5.66-5.66L182.34,68H88a4,4,0,0,1,0-8H192A4,4,0,0,1,196,64Z"/>`
  ],
  [
    "light",
    tt`<path d="M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z"/>`
  ],
  [
    "regular",
    tt`<path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/>`
  ],
  [
    "bold",
    tt`<path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"/>`
  ],
  [
    "fill",
    tt`<path d="M200,64V168a8,8,0,0,1-13.66,5.66L140,127.31,69.66,197.66a8,8,0,0,1-11.32-11.32L128.69,116,82.34,69.66A8,8,0,0,1,88,56H192A8,8,0,0,1,200,64Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M192,64V168L88,64Z" opacity="0.2"/><path d="M192,56H88a8,8,0,0,0-5.66,13.66L128.69,116,58.34,186.34a8,8,0,0,0,11.32,11.32L140,127.31l46.34,46.35A8,8,0,0,0,200,168V64A8,8,0,0,0,192,56Zm-8,92.69-38.34-38.34h0L107.31,72H184Z"/>`
  ]
]);
t$v.styles = p`
    :host {
      display: contents;
    }
  `;
s$c([
  O({ type: String, reflect: true })
], t$v.prototype, "size", 2);
s$c([
  O({ type: String, reflect: true })
], t$v.prototype, "weight", 2);
s$c([
  O({ type: String, reflect: true })
], t$v.prototype, "color", 2);
s$c([
  O({ type: Boolean, reflect: true })
], t$v.prototype, "mirrored", 2);
t$v = s$c([
  s$e("ph-arrow-up-right")
], t$v);
const PhArrowUpRight = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowUpRight() {
    return t$v;
  }
});
var f$d = Object.defineProperty, w$1 = Object.getOwnPropertyDescriptor, o$h = (e2, s2, i, h3) => {
  for (var t41 = h3 > 1 ? void 0 : h3 ? w$1(s2, i) : s2, p2 = e2.length - 1, n2; p2 >= 0; p2--)
    (n2 = e2[p2]) && (t41 = (h3 ? n2(s2, i, t41) : n2(t41)) || t41);
  return h3 && t41 && f$d(s2, i, t41), t41;
};
let a$a = class a2 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$a.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
a$a.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M220,48V96a4,4,0,0,1-4,4H168a4,4,0,0,1,0-8h38.34L184.89,70.54A84,84,0,0,0,66.8,69.85a4,4,0,1,1-5.6-5.72,92,92,0,0,1,129.34.76L212,86.34V48a4,4,0,0,1,8,0ZM189.2,186.15a83.44,83.44,0,0,1-58.68,23.91h-.47a83.52,83.52,0,0,1-58.94-24.6L49.66,164H88a4,4,0,0,0,0-8H40a4,4,0,0,0-4,4v48a4,4,0,0,0,8,0V169.66l21.46,21.45A91.43,91.43,0,0,0,130,218.06h.51a91.45,91.45,0,0,0,64.28-26.19,4,4,0,1,0-5.6-5.72Z"/>`
  ],
  [
    "light",
    tt`<path d="M222,48V96a6,6,0,0,1-6,6H168a6,6,0,0,1,0-12h33.52L183.47,72a81.51,81.51,0,0,0-57.53-24h-.46A81.5,81.5,0,0,0,68.19,71.28a6,6,0,1,1-8.38-8.58,93.38,93.38,0,0,1,65.67-26.76H126a93.45,93.45,0,0,1,66,27.53l18,18V48a6,6,0,0,1,12,0ZM187.81,184.72a81.5,81.5,0,0,1-57.29,23.34h-.46a81.51,81.51,0,0,1-57.53-24L54.48,166H88a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6v48a6,6,0,0,0,12,0V174.48l18,18.05a93.45,93.45,0,0,0,66,27.53h.52a93.38,93.38,0,0,0,65.67-26.76,6,6,0,1,0-8.38-8.58Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"/>`
  ],
  [
    "bold",
    tt`<path d="M228,48V96a12,12,0,0,1-12,12H168a12,12,0,0,1,0-24h19l-7.8-7.8a75.55,75.55,0,0,0-53.32-22.26h-.43A75.49,75.49,0,0,0,72.39,75.57,12,12,0,1,1,55.61,58.41a99.38,99.38,0,0,1,69.87-28.47H126A99.42,99.42,0,0,1,196.2,59.23L204,67V48a12,12,0,0,1,24,0ZM183.61,180.43a75.49,75.49,0,0,1-53.09,21.63h-.43A75.55,75.55,0,0,1,76.77,179.8L69,172H88a12,12,0,0,0,0-24H40a12,12,0,0,0-12,12v48a12,12,0,0,0,24,0V189l7.8,7.8A99.42,99.42,0,0,0,130,226.06h.56a99.38,99.38,0,0,0,69.87-28.47,12,12,0,0,0-16.78-17.16Z"/>`
  ],
  [
    "fill",
    tt`<path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L180.65,72a79.48,79.48,0,0,0-54.72-22.09h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27,96,96,0,0,1,192,60.7l18.36-18.36A8,8,0,0,1,224,48ZM186.41,183.29A80,80,0,0,1,75.35,184l18.31-18.31A8,8,0,0,0,88,152H40a8,8,0,0,0-8,8v48a8,8,0,0,0,13.66,5.66L64,195.3a95.42,95.42,0,0,0,66,26.76h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"/><path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"/>`
  ]
]);
a$a.styles = p`
    :host {
      display: contents;
    }
  `;
o$h([
  O({ type: String, reflect: true })
], a$a.prototype, "size", 2);
o$h([
  O({ type: String, reflect: true })
], a$a.prototype, "weight", 2);
o$h([
  O({ type: String, reflect: true })
], a$a.prototype, "color", 2);
o$h([
  O({ type: Boolean, reflect: true })
], a$a.prototype, "mirrored", 2);
a$a = o$h([
  s$e("ph-arrows-clockwise")
], a$a);
const PhArrowsClockwise = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhArrowsClockwise() {
    return a$a;
  }
});
var M$6 = Object.defineProperty, g$c = Object.getOwnPropertyDescriptor, H = (e2, o2, h3, s2) => {
  for (var a11 = s2 > 1 ? void 0 : s2 ? g$c(o2, h3) : o2, i = e2.length - 1, p2; i >= 0; i--)
    (p2 = e2[i]) && (a11 = (s2 ? p2(o2, h3, a11) : p2(a11)) || a11);
  return s2 && a11 && M$6(o2, h3, a11), a11;
};
let t$u = class t10 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$u.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
t$u.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M24,100H52v72H32a4,4,0,0,0,0,8H224a4,4,0,0,0,0-8H204V100h28a4,4,0,0,0,2.1-7.41l-104-64a4,4,0,0,0-4.2,0l-104,64A4,4,0,0,0,24,100Zm36,0h40v72H60Zm88,0v72H108V100Zm48,72H156V100h40ZM128,36.7,217.87,92H38.13ZM244,208a4,4,0,0,1-4,4H16a4,4,0,0,1,0-8H240A4,4,0,0,1,244,208Z"/>`
  ],
  [
    "light",
    tt`<path d="M24,102H50v68H32a6,6,0,0,0,0,12H224a6,6,0,0,0,0-12H206V102h26a6,6,0,0,0,3.14-11.11l-104-64a6,6,0,0,0-6.28,0l-104,64A6,6,0,0,0,24,102Zm38,0H98v68H62Zm84,0v68H110V102Zm48,68H158V102h36ZM128,39l82.8,51H45.2ZM246,208a6,6,0,0,1-6,6H16a6,6,0,0,1,0-12H240A6,6,0,0,1,246,208Z"/>`
  ],
  [
    "regular",
    tt`<path d="M24,104H48v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16H208V104h24a8,8,0,0,0,4.19-14.81l-104-64a8,8,0,0,0-8.38,0l-104,64A8,8,0,0,0,24,104Zm40,0H96v64H64Zm80,0v64H112V104Zm48,64H160V104h32ZM128,41.39,203.74,88H52.26ZM248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208Z"/>`
  ],
  [
    "bold",
    tt`<path d="M24,108H44v48H32a12,12,0,0,0,0,24H224a12,12,0,0,0,0-24H212V108h20a12,12,0,0,0,6.29-22.22l-104-64a12,12,0,0,0-12.58,0l-104,64A12,12,0,0,0,24,108Zm44,0H92v48H68Zm72,0v48H116V108Zm48,48H164V108h24ZM128,46.09,189.6,84H66.4ZM252,208a12,12,0,0,1-12,12H16a12,12,0,0,1,0-24H240A12,12,0,0,1,252,208Z"/>`
  ],
  [
    "fill",
    tt`<path d="M248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208ZM16.3,98.18a8,8,0,0,1,3.51-9l104-64a8,8,0,0,1,8.38,0l104,64A8,8,0,0,1,232,104H208v64h16a8,8,0,0,1,0,16H32a8,8,0,0,1,0-16H48V104H24A8,8,0,0,1,16.3,98.18ZM144,160a8,8,0,0,0,16,0V112a8,8,0,0,0-16,0Zm-48,0a8,8,0,0,0,16,0V112a8,8,0,0,0-16,0Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M232,96H24L128,32Z" opacity="0.2"/><path d="M24,104H48v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16H208V104h24a8,8,0,0,0,4.19-14.81l-104-64a8,8,0,0,0-8.38,0l-104,64A8,8,0,0,0,24,104Zm40,0H96v64H64Zm80,0v64H112V104Zm48,64H160V104h32ZM128,41.39,203.74,88H52.26ZM248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208Z"/>`
  ]
]);
t$u.styles = p`
    :host {
      display: contents;
    }
  `;
H([
  O({ type: String, reflect: true })
], t$u.prototype, "size", 2);
H([
  O({ type: String, reflect: true })
], t$u.prototype, "weight", 2);
H([
  O({ type: String, reflect: true })
], t$u.prototype, "color", 2);
H([
  O({ type: Boolean, reflect: true })
], t$u.prototype, "mirrored", 2);
t$u = H([
  s$e("ph-bank")
], t$u);
const PhBank = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhBank() {
    return t$u;
  }
});
var c$c = Object.defineProperty, f$c = Object.getOwnPropertyDescriptor, s$b = (o2, a11, l2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? f$c(a11, l2) : a11, h3 = o2.length - 1, V2; h3 >= 0; h3--)
    (V2 = o2[h3]) && (r2 = (i ? V2(a11, l2, r2) : V2(r2)) || r2);
  return i && r2 && c$c(a11, l2, r2), r2;
};
let t$t = class t11 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$t.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$t.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M216,44H40A12,12,0,0,0,28,56V200a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A12,12,0,0,0,216,44ZM40,52H216a4,4,0,0,1,4,4V92H36V56A4,4,0,0,1,40,52ZM216,204H40a4,4,0,0,1-4-4V100H220V200A4,4,0,0,1,216,204Z"/>`
  ],
  [
    "light",
    tt`<path d="M216,42H40A14,14,0,0,0,26,56V200a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A14,14,0,0,0,216,42ZM40,54H216a2,2,0,0,1,2,2V90H38V56A2,2,0,0,1,40,54ZM216,202H40a2,2,0,0,1-2-2V102H218v98A2,2,0,0,1,216,202Z"/>`
  ],
  [
    "regular",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Zm0,144H40V104H216v96Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216,36H40A20,20,0,0,0,20,56V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,24V84H44V60ZM44,196V108H212v88Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,56V96H32V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Zm0,144H40V104H216v96Z"/>`
  ]
]);
t$t.styles = p`
    :host {
      display: contents;
    }
  `;
s$b([
  O({ type: String, reflect: true })
], t$t.prototype, "size", 2);
s$b([
  O({ type: String, reflect: true })
], t$t.prototype, "weight", 2);
s$b([
  O({ type: String, reflect: true })
], t$t.prototype, "color", 2);
s$b([
  O({ type: Boolean, reflect: true })
], t$t.prototype, "mirrored", 2);
t$t = s$b([
  s$e("ph-browser")
], t$t);
const PhBrowser = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhBrowser() {
    return t$t;
  }
});
var u$b = Object.defineProperty, w = Object.getOwnPropertyDescriptor, o$g = (l2, s2, p2, a11) => {
  for (var r2 = a11 > 1 ? void 0 : a11 ? w(s2, p2) : s2, h3 = l2.length - 1, n2; h3 >= 0; h3--)
    (n2 = l2[h3]) && (r2 = (a11 ? n2(s2, p2, r2) : n2(r2)) || r2);
  return a11 && r2 && u$b(s2, p2, r2), r2;
};
let t$s = class t12 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var l2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$s.weightsMap.get((l2 = this.weight) != null ? l2 : "regular")}
    </svg>`;
  }
};
t$s.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z"/>`
  ],
  [
    "light",
    tt`<path d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"/>`
  ],
  [
    "regular",
    tt`<path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M208,96l-80,80L48,96Z" opacity="0.2"/><path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z"/>`
  ]
]);
t$s.styles = p`
    :host {
      display: contents;
    }
  `;
o$g([
  O({ type: String, reflect: true })
], t$s.prototype, "size", 2);
o$g([
  O({ type: String, reflect: true })
], t$s.prototype, "weight", 2);
o$g([
  O({ type: String, reflect: true })
], t$s.prototype, "color", 2);
o$g([
  O({ type: Boolean, reflect: true })
], t$s.prototype, "mirrored", 2);
t$s = o$g([
  s$e("ph-caret-down")
], t$s);
const PhCaretDown = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCaretDown() {
    return t$s;
  }
});
var u$a = Object.defineProperty, d$3 = Object.getOwnPropertyDescriptor, s$a = (o2, a11, p2, l2) => {
  for (var e2 = l2 > 1 ? void 0 : l2 ? d$3(a11, p2) : a11, h3 = o2.length - 1, n2; h3 >= 0; h3--)
    (n2 = o2[h3]) && (e2 = (l2 ? n2(a11, p2, e2) : n2(e2)) || e2);
  return l2 && e2 && u$a(a11, p2, e2), e2;
};
let t$r = class t13 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$r.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$r.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M162.83,205.17a4,4,0,0,1-5.66,5.66l-80-80a4,4,0,0,1,0-5.66l80-80a4,4,0,1,1,5.66,5.66L85.66,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M164.24,203.76a6,6,0,1,1-8.48,8.48l-80-80a6,6,0,0,1,0-8.48l80-80a6,6,0,0,1,8.48,8.48L88.49,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M168,48V208a8,8,0,0,1-13.66,5.66l-80-80a8,8,0,0,1,0-11.32l80-80A8,8,0,0,1,168,48Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M160,48V208L80,128Z" opacity="0.2"/><path d="M163.06,40.61a8,8,0,0,0-8.72,1.73l-80,80a8,8,0,0,0,0,11.32l80,80A8,8,0,0,0,168,208V48A8,8,0,0,0,163.06,40.61ZM152,188.69,91.31,128,152,67.31Z"/>`
  ]
]);
t$r.styles = p`
    :host {
      display: contents;
    }
  `;
s$a([
  O({ type: String, reflect: true })
], t$r.prototype, "size", 2);
s$a([
  O({ type: String, reflect: true })
], t$r.prototype, "weight", 2);
s$a([
  O({ type: String, reflect: true })
], t$r.prototype, "color", 2);
s$a([
  O({ type: Boolean, reflect: true })
], t$r.prototype, "mirrored", 2);
t$r = s$a([
  s$e("ph-caret-left")
], t$r);
const PhCaretLeft = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCaretLeft() {
    return t$r;
  }
});
var u$9 = Object.defineProperty, d$2 = Object.getOwnPropertyDescriptor, s$9 = (o2, l2, a11, i) => {
  for (var r2 = i > 1 ? void 0 : i ? d$2(l2, a11) : l2, h3 = o2.length - 1, n2; h3 >= 0; h3--)
    (n2 = o2[h3]) && (r2 = (i ? n2(l2, a11, r2) : n2(r2)) || r2);
  return i && r2 && u$9(l2, a11, r2), r2;
};
let t$q = class t14 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$q.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$q.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"/>`
  ],
  [
    "light",
    tt`<path d="M180.24,132.24l-80,80a6,6,0,0,1-8.48-8.48L167.51,128,91.76,52.24a6,6,0,0,1,8.48-8.48l80,80A6,6,0,0,1,180.24,132.24Z"/>`
  ],
  [
    "regular",
    tt`<path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>`
  ],
  [
    "bold",
    tt`<path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"/>`
  ],
  [
    "fill",
    tt`<path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M176,128,96,208V48Z" opacity="0.2"/><path d="M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34ZM104,188.69V67.31L164.69,128Z"/>`
  ]
]);
t$q.styles = p`
    :host {
      display: contents;
    }
  `;
s$9([
  O({ type: String, reflect: true })
], t$q.prototype, "size", 2);
s$9([
  O({ type: String, reflect: true })
], t$q.prototype, "weight", 2);
s$9([
  O({ type: String, reflect: true })
], t$q.prototype, "color", 2);
s$9([
  O({ type: Boolean, reflect: true })
], t$q.prototype, "mirrored", 2);
t$q = s$9([
  s$e("ph-caret-right")
], t$q);
const PhCaretRight = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCaretRight() {
    return t$q;
  }
});
var u$8 = Object.defineProperty, d$1 = Object.getOwnPropertyDescriptor, s$8 = (o2, a11, i, l2) => {
  for (var r2 = l2 > 1 ? void 0 : l2 ? d$1(a11, i) : a11, h3 = o2.length - 1, n2; h3 >= 0; h3--)
    (n2 = o2[h3]) && (r2 = (l2 ? n2(a11, i, r2) : n2(r2)) || r2);
  return l2 && r2 && u$8(a11, i, r2), r2;
};
let t$p = class t15 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$p.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$p.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M210.83,162.83a4,4,0,0,1-5.66,0L128,85.66,50.83,162.83a4,4,0,0,1-5.66-5.66l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,210.83,162.83Z"/>`
  ],
  [
    "light",
    tt`<path d="M212.24,164.24a6,6,0,0,1-8.48,0L128,88.49,52.24,164.24a6,6,0,0,1-8.48-8.48l80-80a6,6,0,0,1,8.48,0l80,80A6,6,0,0,1,212.24,164.24Z"/>`
  ],
  [
    "regular",
    tt`<path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"/>`
  ],
  [
    "fill",
    tt`<path d="M215.39,163.06A8,8,0,0,1,208,168H48a8,8,0,0,1-5.66-13.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,215.39,163.06Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M208,160H48l80-80Z" opacity="0.2"/><path d="M213.66,154.34l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,48,168H208a8,8,0,0,0,5.66-13.66ZM67.31,152,128,91.31,188.69,152Z"/>`
  ]
]);
t$p.styles = p`
    :host {
      display: contents;
    }
  `;
s$8([
  O({ type: String, reflect: true })
], t$p.prototype, "size", 2);
s$8([
  O({ type: String, reflect: true })
], t$p.prototype, "weight", 2);
s$8([
  O({ type: String, reflect: true })
], t$p.prototype, "color", 2);
s$8([
  O({ type: Boolean, reflect: true })
], t$p.prototype, "mirrored", 2);
t$p = s$8([
  s$e("ph-caret-up")
], t$p);
const PhCaretUp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCaretUp() {
    return t$p;
  }
});
var u$7 = Object.defineProperty, d = Object.getOwnPropertyDescriptor, o$f = (a11, s2, p2, l2) => {
  for (var e2 = l2 > 1 ? void 0 : l2 ? d(s2, p2) : s2, h3 = a11.length - 1, n2; h3 >= 0; h3--)
    (n2 = a11[h3]) && (e2 = (l2 ? n2(s2, p2, e2) : n2(e2)) || e2);
  return l2 && e2 && u$7(s2, p2, e2), e2;
};
let t$o = class t16 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$o.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$o.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z"/>`
  ],
  [
    "light",
    tt`<path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"/>`
  ],
  [
    "regular",
    tt`<path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>`
  ],
  [
    "bold",
    tt`<path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2"/><path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"/>`
  ]
]);
t$o.styles = p`
    :host {
      display: contents;
    }
  `;
o$f([
  O({ type: String, reflect: true })
], t$o.prototype, "size", 2);
o$f([
  O({ type: String, reflect: true })
], t$o.prototype, "weight", 2);
o$f([
  O({ type: String, reflect: true })
], t$o.prototype, "color", 2);
o$f([
  O({ type: Boolean, reflect: true })
], t$o.prototype, "mirrored", 2);
t$o = o$f([
  s$e("ph-check")
], t$o);
const PhCheck = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCheck() {
    return t$o;
  }
});
var g$b = Object.defineProperty, V$1 = Object.getOwnPropertyDescriptor, o$e = (a11, s2, l2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? V$1(s2, l2) : s2, m2 = a11.length - 1, h3; m2 >= 0; m2--)
    (h3 = a11[m2]) && (r2 = (i ? h3(s2, l2, r2) : h3(r2)) || r2);
  return i && r2 && g$b(s2, l2, r2), r2;
};
let t$n = class t17 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$n.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$n.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm4,8.09a91.58,91.58,0,0,1,24,4.27V215.64a91.58,91.58,0,0,1-24,4.27Zm32,7.25a92.21,92.21,0,0,1,24,15V197.69a92.21,92.21,0,0,1-24,15ZM36,128a92.11,92.11,0,0,1,88-91.91V219.91A92.11,92.11,0,0,1,36,128Zm160,61.9V66.1a91.83,91.83,0,0,1,0,123.8Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm6,12.2a89.86,89.86,0,0,1,20,3.63V214.17a89.86,89.86,0,0,1-20,3.63Zm32,8.23a90.48,90.48,0,0,1,20,12.81V196.76a90.48,90.48,0,0,1-20,12.81ZM38,128a90.12,90.12,0,0,1,84-89.8V217.8A90.12,90.12,0,0,1,38,128Zm160,56.5V71.5a89.81,89.81,0,0,1,0,113Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,16.37a86.4,86.4,0,0,1,16,3V212.67a86.4,86.4,0,0,1-16,3Zm32,9.26a87.81,87.81,0,0,1,16,10.54V195.83a87.81,87.81,0,0,1-16,10.54ZM40,128a88.11,88.11,0,0,1,80-87.63V215.63A88.11,88.11,0,0,1,40,128Zm160,50.54V77.46a87.82,87.82,0,0,1,0,101.08Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm12,24.87a83.53,83.53,0,0,1,24,7.25V203.88a83.53,83.53,0,0,1-24,7.25ZM44,128a84.12,84.12,0,0,1,72-83.13V211.13A84.12,84.12,0,0,1,44,128Zm144,58.71V69.29a83.81,83.81,0,0,1,0,117.42Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM40,128a88.1,88.1,0,0,1,88-88V216A88.1,88.1,0,0,1,40,128Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,0,1-96,96V32A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM40,128a88.11,88.11,0,0,1,80-87.63V215.63A88.11,88.11,0,0,1,40,128Zm96,87.63V40.37a88,88,0,0,1,0,175.26Z"/>`
  ]
]);
t$n.styles = p`
    :host {
      display: contents;
    }
  `;
o$e([
  O({ type: String, reflect: true })
], t$n.prototype, "size", 2);
o$e([
  O({ type: String, reflect: true })
], t$n.prototype, "weight", 2);
o$e([
  O({ type: String, reflect: true })
], t$n.prototype, "color", 2);
o$e([
  O({ type: Boolean, reflect: true })
], t$n.prototype, "mirrored", 2);
t$n = o$e([
  s$e("ph-circle-half")
], t$n);
const PhCircleHalf = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCircleHalf() {
    return t$n;
  }
});
var Z$4 = Object.defineProperty, u$6 = Object.getOwnPropertyDescriptor, o$d = (a11, s2, h3, i) => {
  for (var r2 = i > 1 ? void 0 : i ? u$6(s2, h3) : s2, l2 = a11.length - 1, m2; l2 >= 0; l2--)
    (m2 = a11[l2]) && (r2 = (i ? m2(s2, h3, r2) : m2(r2)) || r2);
  return i && r2 && Z$4(s2, h3, r2), r2;
};
let t$m = class t18 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$m.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$m.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm60-92a4,4,0,0,1-4,4H128a4,4,0,0,1-4-4V72a4,4,0,0,1,8,0v52h52A4,4,0,0,1,188,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm62-90a6,6,0,0,1-6,6H128a6,6,0,0,1-6-6V72a6,6,0,0,1,12,0v50h50A6,6,0,0,1,190,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V72a12,12,0,0,1,24,0v44h44A12,12,0,0,1,196,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>`
  ]
]);
t$m.styles = p`
    :host {
      display: contents;
    }
  `;
o$d([
  O({ type: String, reflect: true })
], t$m.prototype, "size", 2);
o$d([
  O({ type: String, reflect: true })
], t$m.prototype, "weight", 2);
o$d([
  O({ type: String, reflect: true })
], t$m.prototype, "color", 2);
o$d([
  O({ type: Boolean, reflect: true })
], t$m.prototype, "mirrored", 2);
t$m = o$d([
  s$e("ph-clock")
], t$m);
const PhClock = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhClock() {
    return t$m;
  }
});
var A$1 = Object.defineProperty, f$b = Object.getOwnPropertyDescriptor, a$9 = (l2, s2, i, o2) => {
  for (var r2 = o2 > 1 ? void 0 : o2 ? f$b(s2, i) : s2, m2 = l2.length - 1, h3; m2 >= 0; m2--)
    (h3 = l2[m2]) && (r2 = (o2 ? h3(s2, i, r2) : h3(r2)) || r2);
  return o2 && r2 && A$1(s2, i, r2), r2;
};
let t$l = class t19 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var l2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$l.weightsMap.get((l2 = this.weight) != null ? l2 : "regular")}
    </svg>`;
  }
};
t$l.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220ZM174.21,76.42l-64,32a4.08,4.08,0,0,0-1.79,1.79l-32,64A4,4,0,0,0,80,180a4.05,4.05,0,0,0,1.79-.42l64-32a4.08,4.08,0,0,0,1.79-1.79l32-64a4,4,0,0,0-5.37-5.37ZM141,141l-52.08,26L115,115l52.08-26Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218ZM173.32,74.63l-64,32a6,6,0,0,0-2.69,2.69l-32,64A6,6,0,0,0,80,182a6.06,6.06,0,0,0,2.68-.63l64-32a6,6,0,0,0,2.69-2.69l32-64a6,6,0,0,0-8.05-8.05Zm-33.79,64.9L93.42,162.58l23-46.11,46.11-23Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM163.27,77l-56,24a12,12,0,0,0-6.3,6.3l-24,56A12,12,0,0,0,92.73,179l56-24a12,12,0,0,0,6.3-6.3l24-56A12,12,0,0,0,163.27,77Zm-28.41,57.89-24,10.29,10.29-24,24-10.29Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm51.58,57.79-32,64a4.08,4.08,0,0,1-1.79,1.79l-64,32a4,4,0,0,1-5.37-5.37l32-64a4.08,4.08,0,0,1,1.79-1.79l64-32A4,4,0,0,1,179.58,81.79Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm16,112L80,176l32-64,64-32Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"/>`
  ]
]);
t$l.styles = p`
    :host {
      display: contents;
    }
  `;
a$9([
  O({ type: String, reflect: true })
], t$l.prototype, "size", 2);
a$9([
  O({ type: String, reflect: true })
], t$l.prototype, "weight", 2);
a$9([
  O({ type: String, reflect: true })
], t$l.prototype, "color", 2);
a$9([
  O({ type: Boolean, reflect: true })
], t$l.prototype, "mirrored", 2);
t$l = a$9([
  s$e("ph-compass")
], t$l);
const PhCompass = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCompass() {
    return t$l;
  }
});
var c$b = Object.defineProperty, f$a = Object.getOwnPropertyDescriptor, o$c = (a11, s2, p2, H2) => {
  for (var r2 = H2 > 1 ? void 0 : H2 ? f$a(s2, p2) : s2, i = a11.length - 1, h3; i >= 0; i--)
    (h3 = a11[i]) && (r2 = (H2 ? h3(s2, p2, r2) : h3(r2)) || r2);
  return H2 && r2 && c$b(s2, p2, r2), r2;
};
let t$k = class t20 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$k.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$k.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M216,36H88a4,4,0,0,0-4,4V84H40a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H168a4,4,0,0,0,4-4V172h44a4,4,0,0,0,4-4V40A4,4,0,0,0,216,36ZM164,212H44V92H164Zm48-48H172V88a4,4,0,0,0-4-4H92V44H212Z"/>`
  ],
  [
    "light",
    tt`<path d="M216,34H88a6,6,0,0,0-6,6V82H40a6,6,0,0,0-6,6V216a6,6,0,0,0,6,6H168a6,6,0,0,0,6-6V174h42a6,6,0,0,0,6-6V40A6,6,0,0,0,216,34ZM162,210H46V94H162Zm48-48H174V88a6,6,0,0,0-6-6H94V46H210Z"/>`
  ],
  [
    "regular",
    tt`<path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,40V168H168V88H88V40Z" opacity="0.2"/><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/>`
  ]
]);
t$k.styles = p`
    :host {
      display: contents;
    }
  `;
o$c([
  O({ type: String, reflect: true })
], t$k.prototype, "size", 2);
o$c([
  O({ type: String, reflect: true })
], t$k.prototype, "weight", 2);
o$c([
  O({ type: String, reflect: true })
], t$k.prototype, "color", 2);
o$c([
  O({ type: Boolean, reflect: true })
], t$k.prototype, "mirrored", 2);
t$k = o$c([
  s$e("ph-copy")
], t$k);
const PhCopy = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCopy() {
    return t$k;
  }
});
var n$7 = Object.defineProperty, c$a = Object.getOwnPropertyDescriptor, o$b = (e2, s2, H2, h3) => {
  for (var r2 = h3 > 1 ? void 0 : h3 ? c$a(s2, H2) : s2, p2 = e2.length - 1, m2; p2 >= 0; p2--)
    (m2 = e2[p2]) && (r2 = (h3 ? m2(s2, H2, r2) : m2(r2)) || r2);
  return h3 && r2 && n$7(s2, H2, r2), r2;
};
let t$j = class t21 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$j.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
t$j.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M224,52H32A12,12,0,0,0,20,64V192a12,12,0,0,0,12,12H224a12,12,0,0,0,12-12V64A12,12,0,0,0,224,52ZM32,60H224a4,4,0,0,1,4,4V92H28V64A4,4,0,0,1,32,60ZM224,196H32a4,4,0,0,1-4-4V100H228v92A4,4,0,0,1,224,196Zm-20-28a4,4,0,0,1-4,4H168a4,4,0,0,1,0-8h32A4,4,0,0,1,204,168Zm-64,0a4,4,0,0,1-4,4H120a4,4,0,0,1,0-8h16A4,4,0,0,1,140,168Z"/>`
  ],
  [
    "light",
    tt`<path d="M224,50H32A14,14,0,0,0,18,64V192a14,14,0,0,0,14,14H224a14,14,0,0,0,14-14V64A14,14,0,0,0,224,50ZM32,62H224a2,2,0,0,1,2,2V90H30V64A2,2,0,0,1,32,62ZM224,194H32a2,2,0,0,1-2-2V102H226v90A2,2,0,0,1,224,194Zm-18-26a6,6,0,0,1-6,6H168a6,6,0,0,1,0-12h32A6,6,0,0,1,206,168Zm-64,0a6,6,0,0,1-6,6H120a6,6,0,0,1,0-12h16A6,6,0,0,1,142,168Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"/>`
  ],
  [
    "bold",
    tt`<path d="M224,44H32A20,20,0,0,0,12,64V192a20,20,0,0,0,20,20H224a20,20,0,0,0,20-20V64A20,20,0,0,0,224,44Zm-4,24V88H36V68ZM36,188V112H220v76Zm172-24a12,12,0,0,1-12,12H164a12,12,0,0,1,0-24h32A12,12,0,0,1,208,164Zm-68,0a12,12,0,0,1-12,12H116a12,12,0,0,1,0-24h12A12,12,0,0,1,140,164Z"/>`
  ],
  [
    "fill",
    tt`<path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM136,176H120a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm64,0H168a8,8,0,0,1,0-16h32a8,8,0,0,1,0,16ZM32,88V64H224V88Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M232,96v96a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V96Z" opacity="0.2"/><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"/>`
  ]
]);
t$j.styles = p`
    :host {
      display: contents;
    }
  `;
o$b([
  O({ type: String, reflect: true })
], t$j.prototype, "size", 2);
o$b([
  O({ type: String, reflect: true })
], t$j.prototype, "weight", 2);
o$b([
  O({ type: String, reflect: true })
], t$j.prototype, "color", 2);
o$b([
  O({ type: Boolean, reflect: true })
], t$j.prototype, "mirrored", 2);
t$j = o$b([
  s$e("ph-credit-card")
], t$j);
const PhCreditCard = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCreditCard() {
    return t$j;
  }
});
var Z$3 = Object.defineProperty, g$a = Object.getOwnPropertyDescriptor, e$1 = (r2, o2, p2, s2) => {
  for (var t41 = s2 > 1 ? void 0 : s2 ? g$a(o2, p2) : o2, l2 = r2.length - 1, m2; l2 >= 0; l2--)
    (m2 = r2[l2]) && (t41 = (s2 ? m2(o2, p2, t41) : m2(t41)) || t41);
  return s2 && t41 && Z$3(o2, p2, t41), t41;
};
let h$4 = class h extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var r2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${h$4.weightsMap.get((r2 = this.weight) != null ? r2 : "regular")}
    </svg>`;
  }
};
h$4.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M152,124H132V52h12a36,36,0,0,1,36,36,4,4,0,0,0,8,0,44.05,44.05,0,0,0-44-44H132V24a4,4,0,0,0-8,0V44H112a44,44,0,0,0,0,88h12v72H104a36,36,0,0,1-36-36,4,4,0,0,0-8,0,44.05,44.05,0,0,0,44,44h20v20a4,4,0,0,0,8,0V212h20a44,44,0,0,0,0-88Zm-40,0a36,36,0,0,1,0-72h12v72Zm40,80H132V132h20a36,36,0,0,1,0,72Z"/>`
  ],
  [
    "light",
    tt`<path d="M152,122H134V54h10a34,34,0,0,1,34,34,6,6,0,0,0,12,0,46.06,46.06,0,0,0-46-46H134V24a6,6,0,0,0-12,0V42H112a46,46,0,0,0,0,92h10v68H104a34,34,0,0,1-34-34,6,6,0,0,0-12,0,46.06,46.06,0,0,0,46,46h18v18a6,6,0,0,0,12,0V214h18a46,46,0,0,0,0-92Zm-40,0a34,34,0,0,1,0-68h10v68Zm40,80H134V134h18a34,34,0,0,1,0,68Z"/>`
  ],
  [
    "regular",
    tt`<path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"/>`
  ],
  [
    "bold",
    tt`<path d="M152,116H140V60h4a28,28,0,0,1,28,28,12,12,0,0,0,24,0,52.06,52.06,0,0,0-52-52h-4V24a12,12,0,0,0-24,0V36h-4a52,52,0,0,0,0,104h4v56H104a28,28,0,0,1-28-28,12,12,0,0,0-24,0,52.06,52.06,0,0,0,52,52h12v12a12,12,0,0,0,24,0V220h12a52,52,0,0,0,0-104Zm-40,0a28,28,0,0,1,0-56h4v56Zm40,80H140V140h12a28,28,0,0,1,0,56Z"/>`
  ],
  [
    "fill",
    tt`<path d="M160,152a16,16,0,0,1-16,16h-8V136h8A16,16,0,0,1,160,152Zm72-24A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-56,24a32,32,0,0,0-32-32h-8V88h4a16,16,0,0,1,16,16,8,8,0,0,0,16,0,32,32,0,0,0-32-32h-4V64a8,8,0,0,0-16,0v8h-4a32,32,0,0,0,0,64h4v32h-8a16,16,0,0,1-16-16,8,8,0,0,0-16,0,32,32,0,0,0,32,32h8v8a8,8,0,0,0,16,0v-8h8A32,32,0,0,0,176,152Zm-76-48a16,16,0,0,0,16,16h4V88h-4A16,16,0,0,0,100,104Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M192,168a40,40,0,0,1-40,40H128V128h24A40,40,0,0,1,192,168ZM112,48a40,40,0,0,0,0,80h16V48Z" opacity="0.2"/><path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"/>`
  ]
]);
h$4.styles = p`
    :host {
      display: contents;
    }
  `;
e$1([
  O({ type: String, reflect: true })
], h$4.prototype, "size", 2);
e$1([
  O({ type: String, reflect: true })
], h$4.prototype, "weight", 2);
e$1([
  O({ type: String, reflect: true })
], h$4.prototype, "color", 2);
e$1([
  O({ type: Boolean, reflect: true })
], h$4.prototype, "mirrored", 2);
h$4 = e$1([
  s$e("ph-currency-dollar")
], h$4);
const PhCurrencyDollar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhCurrencyDollar() {
    return h$4;
  }
});
var n$6 = Object.defineProperty, g$9 = Object.getOwnPropertyDescriptor, h$3 = (a11, o2, H2, s2) => {
  for (var e2 = s2 > 1 ? void 0 : s2 ? g$9(o2, H2) : o2, i = a11.length - 1, l2; i >= 0; i--)
    (l2 = a11[i]) && (e2 = (s2 ? l2(o2, H2, e2) : l2(e2)) || e2);
  return s2 && e2 && n$6(o2, H2, e2), e2;
};
let t$i = class t22 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$i.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$i.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M208,44H48A20,20,0,0,0,28,64V176a20,20,0,0,0,20,20h76v24H96a4,4,0,0,0,0,8h64a4,4,0,0,0,0-8H132V196h76a20,20,0,0,0,20-20V64A20,20,0,0,0,208,44ZM48,52H208a12,12,0,0,1,12,12v84H36V64A12,12,0,0,1,48,52ZM208,188H48a12,12,0,0,1-12-12V156H220v20A12,12,0,0,1,208,188Z"/>`
  ],
  [
    "light",
    tt`<path d="M208,42H48A22,22,0,0,0,26,64V176a22,22,0,0,0,22,22h74v20H96a6,6,0,0,0,0,12h64a6,6,0,0,0,0-12H134V198h74a22,22,0,0,0,22-22V64A22,22,0,0,0,208,42ZM48,54H208a10,10,0,0,1,10,10v82H38V64A10,10,0,0,1,48,54ZM208,186H48a10,10,0,0,1-10-10V158H218v18A10,10,0,0,1,208,186Z"/>`
  ],
  [
    "regular",
    tt`<path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"/>`
  ],
  [
    "bold",
    tt`<path d="M208,36H48A28,28,0,0,0,20,64V172a28,28,0,0,0,28,28h68v12H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24H140V200h68a28,28,0,0,0,28-28V64A28,28,0,0,0,208,36ZM48,60H208a4,4,0,0,1,4,4v72H44V64A4,4,0,0,1,48,60ZM208,176H48a4,4,0,0,1-4-4V160H212v12A4,4,0,0,1,208,176Z"/>`
  ],
  [
    "fill",
    tt`<path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm0,144H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,64v88H32V64A16,16,0,0,1,48,48H208A16,16,0,0,1,224,64Z" opacity="0.2"/><path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"/>`
  ]
]);
t$i.styles = p`
    :host {
      display: contents;
    }
  `;
h$3([
  O({ type: String, reflect: true })
], t$i.prototype, "size", 2);
h$3([
  O({ type: String, reflect: true })
], t$i.prototype, "weight", 2);
h$3([
  O({ type: String, reflect: true })
], t$i.prototype, "color", 2);
h$3([
  O({ type: Boolean, reflect: true })
], t$i.prototype, "mirrored", 2);
t$i = h$3([
  s$e("ph-desktop")
], t$i);
const PhDesktop = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhDesktop() {
    return t$i;
  }
});
var Z$2 = Object.defineProperty, n$5 = Object.getOwnPropertyDescriptor, o$a = (a11, s2, p2, i) => {
  for (var e2 = i > 1 ? void 0 : i ? n$5(s2, p2) : s2, l2 = a11.length - 1, H2; l2 >= 0; l2--)
    (H2 = a11[l2]) && (e2 = (i ? H2(s2, p2, e2) : H2(e2)) || e2);
  return i && e2 && Z$2(s2, p2, e2), e2;
};
let t$h = class t23 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$h.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$h.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M176,20H80A20,20,0,0,0,60,40V216a20,20,0,0,0,20,20h96a20,20,0,0,0,20-20V40A20,20,0,0,0,176,20ZM68,60H188V196H68ZM80,28h96a12,12,0,0,1,12,12V52H68V40A12,12,0,0,1,80,28Zm96,200H80a12,12,0,0,1-12-12V204H188v12A12,12,0,0,1,176,228Z"/>`
  ],
  [
    "light",
    tt`<path d="M176,18H80A22,22,0,0,0,58,40V216a22,22,0,0,0,22,22h96a22,22,0,0,0,22-22V40A22,22,0,0,0,176,18ZM70,62H186V194H70ZM80,30h96a10,10,0,0,1,10,10V50H70V40A10,10,0,0,1,80,30Zm96,196H80a10,10,0,0,1-10-10V206H186v10A10,10,0,0,1,176,226Z"/>`
  ],
  [
    "regular",
    tt`<path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM72,64H184V192H72Zm8-32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8v-8H184v8A8,8,0,0,1,176,224Z"/>`
  ],
  [
    "bold",
    tt`<path d="M176,12H80A28,28,0,0,0,52,40V216a28,28,0,0,0,28,28h96a28,28,0,0,0,28-28V40A28,28,0,0,0,176,12ZM76,76H180V180H76Zm4-40h96a4,4,0,0,1,4,4V52H76V40A4,4,0,0,1,80,36Zm96,184H80a4,4,0,0,1-4-4V204H180v12A4,4,0,0,1,176,220Z"/>`
  ],
  [
    "fill",
    tt`<path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM80,32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8v-8H184v8A8,8,0,0,1,176,224Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M192,56V200H64V56Z" opacity="0.2"/><path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM72,64H184V192H72Zm8-32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8v-8H184v8A8,8,0,0,1,176,224Z"/>`
  ]
]);
t$h.styles = p`
    :host {
      display: contents;
    }
  `;
o$a([
  O({ type: String, reflect: true })
], t$h.prototype, "size", 2);
o$a([
  O({ type: String, reflect: true })
], t$h.prototype, "weight", 2);
o$a([
  O({ type: String, reflect: true })
], t$h.prototype, "color", 2);
o$a([
  O({ type: Boolean, reflect: true })
], t$h.prototype, "mirrored", 2);
t$h = o$a([
  s$e("ph-device-mobile")
], t$h);
const PhDeviceMobile = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhDeviceMobile() {
    return t$h;
  }
});
var c$9 = Object.defineProperty, f$9 = Object.getOwnPropertyDescriptor, o$9 = (a11, s2, h3, i) => {
  for (var e2 = i > 1 ? void 0 : i ? f$9(s2, h3) : s2, l2 = a11.length - 1, m2; l2 >= 0; l2--)
    (m2 = a11[l2]) && (e2 = (i ? m2(s2, h3, e2) : m2(e2)) || e2);
  return i && e2 && c$9(s2, h3, e2), e2;
};
let t$g = class t24 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$g.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$g.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M136,128a8,8,0,1,1-8-8A8,8,0,0,1,136,128Zm-76-8a8,8,0,1,0,8,8A8,8,0,0,0,60,120Zm136,0a8,8,0,1,0,8,8A8,8,0,0,0,196,120Z"/>`
  ],
  [
    "light",
    tt`<path d="M138,128a10,10,0,1,1-10-10A10,10,0,0,1,138,128ZM60,118a10,10,0,1,0,10,10A10,10,0,0,0,60,118Zm136,0a10,10,0,1,0,10,10A10,10,0,0,0,196,118Z"/>`
  ],
  [
    "regular",
    tt`<path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"/>`
  ],
  [
    "bold",
    tt`<path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"/>`
  ],
  [
    "fill",
    tt`<path d="M224,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V96A16,16,0,0,0,224,80ZM60,140a12,12,0,1,1,12-12A12,12,0,0,1,60,140Zm68,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm68,0a12,12,0,1,1,12-12A12,12,0,0,1,196,140Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M240,96v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V96A16,16,0,0,1,32,80H224A16,16,0,0,1,240,96Z" opacity="0.2"/><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"/>`
  ]
]);
t$g.styles = p`
    :host {
      display: contents;
    }
  `;
o$9([
  O({ type: String, reflect: true })
], t$g.prototype, "size", 2);
o$9([
  O({ type: String, reflect: true })
], t$g.prototype, "weight", 2);
o$9([
  O({ type: String, reflect: true })
], t$g.prototype, "color", 2);
o$9([
  O({ type: Boolean, reflect: true })
], t$g.prototype, "mirrored", 2);
t$g = o$9([
  s$e("ph-dots-three")
], t$g);
const PhDotsThree = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhDotsThree() {
    return t$g;
  }
});
var g$8 = Object.defineProperty, Z$1 = Object.getOwnPropertyDescriptor, o$8 = (e2, s2, p2, H2) => {
  for (var a11 = H2 > 1 ? void 0 : H2 ? Z$1(s2, p2) : s2, h3 = e2.length - 1, l2; h3 >= 0; h3--)
    (l2 = e2[h3]) && (a11 = (H2 ? l2(s2, p2, a11) : l2(a11)) || a11);
  return H2 && a11 && g$8(s2, p2, a11), a11;
};
let t$f = class t25 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$f.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
t$f.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M216,44H40A12,12,0,0,0,28,56V192a12,12,0,0,0,12,12H60v20a4,4,0,0,0,8,0V204H188v20a4,4,0,0,0,8,0V204h20a12,12,0,0,0,12-12V56A12,12,0,0,0,216,44Zm0,152H40a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H216a4,4,0,0,1,4,4v68H195.81a44,44,0,1,0,0,8H220v60A4,4,0,0,1,216,196Zm-52.7-72a12,12,0,1,0,0,8h24.47a36,36,0,1,1,0-8Z"/>`
  ],
  [
    "light",
    tt`<path d="M216,42H40A14,14,0,0,0,26,56V192a14,14,0,0,0,14,14H58v18a6,6,0,0,0,12,0V206H186v18a6,6,0,0,0,12,0V206h18a14,14,0,0,0,14-14V56A14,14,0,0,0,216,42Zm0,152H40a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H216a2,2,0,0,1,2,2v66H197.6a46,46,0,1,0,0,12H218v58A2,2,0,0,1,216,194Zm-51.37-72a14,14,0,1,0,0,12h20.83a34,34,0,1,1,0-12Z"/>`
  ],
  [
    "regular",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V192a16,16,0,0,0,16,16H56v16a8,8,0,0,0,16,0V208H184v16a8,8,0,0,0,16,0V208h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,152H40V56H216v64H199.32a48,48,0,1,0,0,16H216v56Zm-50.16-72a16,16,0,1,0,0,16H183a32,32,0,1,1,0-16Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216,36H40A20,20,0,0,0,20,56V192a20,20,0,0,0,20,20H52v12a12,12,0,0,0,24,0V212H180v12a12,12,0,0,0,24,0V212h12a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36ZM44,188V60H212v52H190.32a44,44,0,1,0,0,24H212v52Zm124-64a20,20,0,1,1-20-20A20,20,0,0,1,168,124Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V192a16,16,0,0,0,16,16H56v16a8,8,0,0,0,16,0V208H184v16a8,8,0,0,0,16,0V208h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-8,96H179.09a36,36,0,1,1,0-16H208a8,8,0,0,1,0,16Zm-44-8a20,20,0,1,1-20-20A20,20,0,0,1,164,128Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,48H40a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48ZM152,168a40,40,0,1,1,40-40A40,40,0,0,1,152,168Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V192a16,16,0,0,0,16,16H56v16a8,8,0,0,0,16,0V208H184v16a8,8,0,0,0,16,0V208h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,152H40V56H216v64H199.32a48,48,0,1,0,0,16H216v56Zm-50.16-72a16,16,0,1,0,0,16H183a32,32,0,1,1,0-16Z"/>`
  ]
]);
t$f.styles = p`
    :host {
      display: contents;
    }
  `;
o$8([
  O({ type: String, reflect: true })
], t$f.prototype, "size", 2);
o$8([
  O({ type: String, reflect: true })
], t$f.prototype, "weight", 2);
o$8([
  O({ type: String, reflect: true })
], t$f.prototype, "color", 2);
o$8([
  O({ type: Boolean, reflect: true })
], t$f.prototype, "mirrored", 2);
t$f = o$8([
  s$e("ph-vault")
], t$f);
const PhVault = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhVault() {
    return t$f;
  }
});
var M$5 = Object.defineProperty, g$7 = Object.getOwnPropertyDescriptor, o$7 = (a11, s2, i, p2) => {
  for (var e2 = p2 > 1 ? void 0 : p2 ? g$7(s2, i) : s2, h3 = a11.length - 1, m2; h3 >= 0; h3--)
    (m2 = a11[h3]) && (e2 = (p2 ? m2(s2, i, e2) : m2(e2)) || e2);
  return p2 && e2 && M$5(s2, i, e2), e2;
};
let t$e = class t26 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$e.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$e.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M224,52H32a4,4,0,0,0-4,4V192a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A4,4,0,0,0,224,52Zm-96,86.57L42.28,60H213.72ZM104.63,128,36,190.91V65.09Zm5.92,5.43L125.3,147a4,4,0,0,0,5.4,0l14.75-13.52L213.72,196H42.28ZM151.37,128,220,65.09V190.91Z"/>`
  ],
  [
    "light",
    tt`<path d="M224,50H32a6,6,0,0,0-6,6V192a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A6,6,0,0,0,224,50Zm-96,85.86L47.42,62H208.58ZM101.67,128,38,186.36V69.64Zm8.88,8.14L124,148.42a6,6,0,0,0,8.1,0l13.4-12.28L208.58,194H47.43ZM154.33,128,218,69.64V186.36Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"/>`
  ],
  [
    "bold",
    tt`<path d="M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44Zm-96,83.72L62.85,68h130.3ZM92.79,128,44,172.72V83.28Zm17.76,16.28,9.34,8.57a12,12,0,0,0,16.22,0l9.34-8.57L193.15,188H62.85ZM163.21,128,212,83.28v89.44Z"/>`
  ],
  [
    "fill",
    tt`<path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,56l-96,88L32,56Z" opacity="0.2"/><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"/>`
  ]
]);
t$e.styles = p`
    :host {
      display: contents;
    }
  `;
o$7([
  O({ type: String, reflect: true })
], t$e.prototype, "size", 2);
o$7([
  O({ type: String, reflect: true })
], t$e.prototype, "weight", 2);
o$7([
  O({ type: String, reflect: true })
], t$e.prototype, "color", 2);
o$7([
  O({ type: Boolean, reflect: true })
], t$e.prototype, "mirrored", 2);
t$e = o$7([
  s$e("ph-envelope")
], t$e);
const PhEnvelope = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhEnvelope() {
    return t$e;
  }
});
var f$8 = Object.defineProperty, u$5 = Object.getOwnPropertyDescriptor, s$7 = (a11, o2, h3, i) => {
  for (var e2 = i > 1 ? void 0 : i ? u$5(o2, h3) : o2, l2 = a11.length - 1, m2; l2 >= 0; l2--)
    (m2 = a11[l2]) && (e2 = (i ? m2(o2, h3, e2) : m2(e2)) || e2);
  return i && e2 && f$8(o2, h3, e2), e2;
};
let t$d = class t27 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$d.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$d.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M196,136a4,4,0,0,1-4,4H64a4,4,0,0,1,0-8H192A4,4,0,0,1,196,136Zm36-52H24a4,4,0,0,0,0,8H232a4,4,0,0,0,0-8Zm-80,96H104a4,4,0,0,0,0,8h48a4,4,0,0,0,0-8Z"/>`
  ],
  [
    "light",
    tt`<path d="M198,136a6,6,0,0,1-6,6H64a6,6,0,0,1,0-12H192A6,6,0,0,1,198,136Zm34-54H24a6,6,0,0,0,0,12H232a6,6,0,0,0,0-12Zm-80,96H104a6,6,0,0,0,0,12h48a6,6,0,0,0,0-12Z"/>`
  ],
  [
    "regular",
    tt`<path d="M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"/>`
  ],
  [
    "bold",
    tt`<path d="M204,136a12,12,0,0,1-12,12H64a12,12,0,0,1,0-24H192A12,12,0,0,1,204,136Zm28-60H24a12,12,0,0,0,0,24H232a12,12,0,0,0,0-24Zm-80,96H104a12,12,0,0,0,0,24h48a12,12,0,0,0,0-24Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM144,176H112a8,8,0,0,1,0-16h32a8,8,0,0,1,0,16Zm32-40H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Zm32-40H48a8,8,0,0,1,0-16H208a8,8,0,0,1,0,16Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2"/><path d="M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"/>`
  ]
]);
t$d.styles = p`
    :host {
      display: contents;
    }
  `;
s$7([
  O({ type: String, reflect: true })
], t$d.prototype, "size", 2);
s$7([
  O({ type: String, reflect: true })
], t$d.prototype, "weight", 2);
s$7([
  O({ type: String, reflect: true })
], t$d.prototype, "color", 2);
s$7([
  O({ type: Boolean, reflect: true })
], t$d.prototype, "mirrored", 2);
t$d = s$7([
  s$e("ph-funnel-simple")
], t$d);
const PhFunnelSimple = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhFunnelSimple() {
    return t$d;
  }
});
var n$4 = Object.defineProperty, g$6 = Object.getOwnPropertyDescriptor, h$2 = (r2, Z2, m2, A2) => {
  for (var t41 = A2 > 1 ? void 0 : A2 ? g$6(Z2, m2) : Z2, s2 = r2.length - 1, i; s2 >= 0; s2--)
    (i = r2[s2]) && (t41 = (A2 ? i(Z2, m2, t41) : i(t41)) || t41);
  return A2 && t41 && n$4(Z2, m2, t41), t41;
};
let a$8 = class a3 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var r2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$8.weightsMap.get((r2 = this.weight) != null ? r2 : "regular")}
    </svg>`;
  }
};
a$8.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M128,28h0A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,190.61c-6.33-6.09-23-24.41-31.27-54.61h62.54C151,194.2,134.33,212.52,128,218.61ZM94.82,156a140.42,140.42,0,0,1,0-56h66.36a140.42,140.42,0,0,1,0,56ZM128,37.39c6.33,6.09,23,24.41,31.27,54.61H96.73C105,61.8,121.67,43.48,128,37.39ZM169.41,100h46.23a92.09,92.09,0,0,1,0,56H169.41a152.65,152.65,0,0,0,0-56Zm43.25-8h-45a129.39,129.39,0,0,0-29.19-55.4A92.25,92.25,0,0,1,212.66,92ZM117.54,36.6A129.39,129.39,0,0,0,88.35,92h-45A92.25,92.25,0,0,1,117.54,36.6ZM40.36,100H86.59a152.65,152.65,0,0,0,0,56H40.36a92.09,92.09,0,0,1,0-56Zm3,64h45a129.39,129.39,0,0,0,29.19,55.4A92.25,92.25,0,0,1,43.34,164Zm95.12,55.4A129.39,129.39,0,0,0,167.65,164h45A92.25,92.25,0,0,1,138.46,219.4Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm81.57,64H169.19a132.58,132.58,0,0,0-25.73-50.67A90.29,90.29,0,0,1,209.57,90ZM218,128a89.7,89.7,0,0,1-3.83,26H171.81a155.43,155.43,0,0,0,0-52h42.36A89.7,89.7,0,0,1,218,128Zm-90,87.83a110,110,0,0,1-15.19-19.45A124.24,124.24,0,0,1,99.35,166h57.3a124.24,124.24,0,0,1-13.46,30.38A110,110,0,0,1,128,215.83ZM96.45,154a139.18,139.18,0,0,1,0-52h63.1a139.18,139.18,0,0,1,0,52ZM38,128a89.7,89.7,0,0,1,3.83-26H84.19a155.43,155.43,0,0,0,0,52H41.83A89.7,89.7,0,0,1,38,128Zm90-87.83a110,110,0,0,1,15.19,19.45A124.24,124.24,0,0,1,156.65,90H99.35a124.24,124.24,0,0,1,13.46-30.38A110,110,0,0,1,128,40.17Zm-15.46-.84A132.58,132.58,0,0,0,86.81,90H46.43A90.29,90.29,0,0,1,112.54,39.33ZM46.43,166H86.81a132.58,132.58,0,0,0,25.73,50.67A90.29,90.29,0,0,1,46.43,166Zm97,50.67A132.58,132.58,0,0,0,169.19,166h40.38A90.29,90.29,0,0,1,143.46,216.67Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,187a113.4,113.4,0,0,1-20.39-35h40.82a116.94,116.94,0,0,1-10,20.77A108.61,108.61,0,0,1,128,207Zm-26.49-59a135.42,135.42,0,0,1,0-40h53a135.42,135.42,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.25a160.63,160.63,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128Zm84-79a113.4,113.4,0,0,1,20.39,35H107.59a116.94,116.94,0,0,1,10-20.77A108.61,108.61,0,0,1,128,49Zm50.73,59h30.82a83.52,83.52,0,0,1,0,40H178.75a160.63,160.63,0,0,0,0-40Zm20.77-24H173.71a140.82,140.82,0,0,0-15.5-34.36A84.51,84.51,0,0,1,199.52,84ZM97.79,49.64A140.82,140.82,0,0,0,82.29,84H56.48A84.51,84.51,0,0,1,97.79,49.64ZM56.48,172H82.29a140.82,140.82,0,0,0,15.5,34.36A84.51,84.51,0,0,1,56.48,172Zm101.73,34.36A140.82,140.82,0,0,0,173.71,172h25.81A84.51,84.51,0,0,1,158.21,206.36Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm78.36,64H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM216,128a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM128,43a115.27,115.27,0,0,1,26,45H102A115.11,115.11,0,0,1,128,43ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48Zm50.35,61.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"/>`
  ]
]);
a$8.styles = p`
    :host {
      display: contents;
    }
  `;
h$2([
  O({ type: String, reflect: true })
], a$8.prototype, "size", 2);
h$2([
  O({ type: String, reflect: true })
], a$8.prototype, "weight", 2);
h$2([
  O({ type: String, reflect: true })
], a$8.prototype, "color", 2);
h$2([
  O({ type: Boolean, reflect: true })
], a$8.prototype, "mirrored", 2);
a$8 = h$2([
  s$e("ph-globe")
], a$8);
const PhGlobe = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhGlobe() {
    return a$8;
  }
});
var c$8 = Object.defineProperty, M$4 = Object.getOwnPropertyDescriptor, s$6 = (e2, o2, p2, i) => {
  for (var t41 = i > 1 ? void 0 : i ? M$4(o2, p2) : o2, m2 = e2.length - 1, Z2; m2 >= 0; m2--)
    (Z2 = e2[m2]) && (t41 = (i ? Z2(o2, p2, t41) : Z2(t41)) || t41);
  return i && t41 && c$8(o2, p2, t41), t41;
};
let a$7 = class a4 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$7.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
a$7.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M196,112a4,4,0,0,1-4,4H152a4,4,0,0,1,0-8h40A4,4,0,0,1,196,112Zm-4,28H152a4,4,0,0,0,0,8h40a4,4,0,0,0,0-8Zm36-84V200a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V56A12,12,0,0,1,40,44H216A12,12,0,0,1,228,56Zm-8,0a4,4,0,0,0-4-4H40a4,4,0,0,0-4,4V200a4,4,0,0,0,4,4H216a4,4,0,0,0,4-4ZM131.87,167a4,4,0,1,1-7.74,2C121.06,157,109,148,96,148s-25,9-28.13,21A4,4,0,0,1,64,172a3.87,3.87,0,0,1-1-.13A4,4,0,0,1,60.13,167a36.28,36.28,0,0,1,20.43-23.66,28,28,0,1,1,30.88,0A36.2,36.2,0,0,1,131.87,167ZM96,140a20,20,0,1,0-20-20A20,20,0,0,0,96,140Z"/>`
  ],
  [
    "light",
    tt`<path d="M198,112a6,6,0,0,1-6,6H152a6,6,0,0,1,0-12h40A6,6,0,0,1,198,112Zm-6,26H152a6,6,0,0,0,0,12h40a6,6,0,0,0,0-12Zm38-82V200a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V56A14,14,0,0,1,40,42H216A14,14,0,0,1,230,56Zm-12,0a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2V200a2,2,0,0,0,2,2H216a2,2,0,0,0,2-2ZM133.81,166.51a6,6,0,0,1-11.62,3C119.34,158.38,108.08,150,96,150s-23.33,8.38-26.19,19.5a6,6,0,0,1-11.62-3A38,38,0,0,1,76.78,143a30,30,0,1,1,38.45,0A38,38,0,0,1,133.81,166.51ZM96,138a18,18,0,1,0-18-18A18,18,0,0,0,96,138Z"/>`
  ],
  [
    "regular",
    tt`<path d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z"/>`
  ],
  [
    "bold",
    tt`<path d="M148,108a12,12,0,0,1,12-12h28a12,12,0,0,1,0,24H160A12,12,0,0,1,148,108Zm40,28H168a12,12,0,0,0,0,24h20a12,12,0,0,0,0-24Zm48-80V200a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V56A20,20,0,0,1,40,36H216A20,20,0,0,1,236,56Zm-24,4H44V196H212ZM58.28,159.37A43.82,43.82,0,0,1,71.53,142a36,36,0,1,1,56.94,0,43.84,43.84,0,0,1,13.26,17.37,12,12,0,0,1-22.15,9.26C116.48,161.19,108.42,156,100,156s-16.47,5.2-19.59,12.63a12,12,0,1,1-22.13-9.26ZM88,120a12,12,0,1,0,12-12A12,12,0,0,0,88,120Z"/>`
  ],
  [
    "fill",
    tt`<path d="M112,120a16,16,0,1,1-16-16A16,16,0,0,1,112,120ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM135.75,166a39.76,39.76,0,0,0-17.19-23.34,32,32,0,1,0-45.12,0A39.84,39.84,0,0,0,56.25,166a8,8,0,0,0,15.5,4c2.64-10.25,13.06-18,24.25-18s21.62,7.73,24.25,18a8,8,0,1,0,15.5-4ZM200,144a8,8,0,0,0-8-8H152a8,8,0,0,0,0,16h40A8,8,0,0,0,200,144Zm0-32a8,8,0,0,0-8-8H152a8,8,0,0,0,0,16h40A8,8,0,0,0,200,112Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,48H40a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48ZM96,144a24,24,0,1,1,24-24A24,24,0,0,1,96,144Z" opacity="0.2"/><path d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z"/>`
  ]
]);
a$7.styles = p`
    :host {
      display: contents;
    }
  `;
s$6([
  O({ type: String, reflect: true })
], a$7.prototype, "size", 2);
s$6([
  O({ type: String, reflect: true })
], a$7.prototype, "weight", 2);
s$6([
  O({ type: String, reflect: true })
], a$7.prototype, "color", 2);
s$6([
  O({ type: Boolean, reflect: true })
], a$7.prototype, "mirrored", 2);
a$7 = s$6([
  s$e("ph-identification-card")
], a$7);
const PhIdentificationCard = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhIdentificationCard() {
    return a$7;
  }
});
var n$3 = Object.defineProperty, g$5 = Object.getOwnPropertyDescriptor, l$2 = (r2, o2, p2, s2) => {
  for (var e2 = s2 > 1 ? void 0 : s2 ? g$5(o2, p2) : o2, m2 = r2.length - 1, h3; m2 >= 0; m2--)
    (h3 = r2[m2]) && (e2 = (s2 ? h3(o2, p2, e2) : h3(e2)) || e2);
  return s2 && e2 && n$3(o2, p2, e2), e2;
};
let t$c = class t28 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var r2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$c.weightsMap.get((r2 = this.weight) != null ? r2 : "regular")}
    </svg>`;
  }
};
t$c.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M216,44H40A12,12,0,0,0,28,56V200a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A12,12,0,0,0,216,44ZM40,52H216a4,4,0,0,1,4,4V168.4l-32.89-32.89a12,12,0,0,0-17,0l-22.83,22.83-46.82-46.83a12,12,0,0,0-17,0L36,159V56A4,4,0,0,1,40,52ZM36,200V170.34l53.17-53.17a4,4,0,0,1,5.66,0L181.66,204H40A4,4,0,0,1,36,200Zm180,4H193l-40-40,22.83-22.83a4,4,0,0,1,5.66,0L220,179.71V200A4,4,0,0,1,216,204ZM148,100a8,8,0,1,1,8,8A8,8,0,0,1,148,100Z"/>`
  ],
  [
    "light",
    tt`<path d="M216,42H40A14,14,0,0,0,26,56V200a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A14,14,0,0,0,216,42ZM40,54H216a2,2,0,0,1,2,2V163.57L188.53,134.1a14,14,0,0,0-19.8,0l-21.42,21.42L101.9,110.1a14,14,0,0,0-19.8,0L38,154.2V56A2,2,0,0,1,40,54ZM38,200V171.17l52.58-52.58a2,2,0,0,1,2.84,0L176.83,202H40A2,2,0,0,1,38,200Zm178,2H193.8l-38-38,21.41-21.42a2,2,0,0,1,2.83,0l38,38V200A2,2,0,0,1,216,202ZM146,100a10,10,0,1,1,10,10A10,10,0,0,1,146,100Z"/>`
  ],
  [
    "regular",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"/>`
  ],
  [
    "bold",
    tt`<path d="M144,96a16,16,0,1,1,16,16A16,16,0,0,1,144,96Zm92-40V200a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V56A20,20,0,0,1,40,36H216A20,20,0,0,1,236,56ZM44,60v79.72l33.86-33.86a20,20,0,0,1,28.28,0L147.31,147l17.18-17.17a20,20,0,0,1,28.28,0L212,149.09V60Zm0,136H162.34L92,125.66l-48,48Zm168,0V183l-33.37-33.37L164.28,164l32,32Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,88a12,12,0,1,1-12,12A12,12,0,0,1,156,88Zm60,112H40V160.69l46.34-46.35a8,8,0,0,1,11.32,0h0L165,181.66a8,8,0,0,0,11.32-11.32l-17.66-17.65L173,138.34a8,8,0,0,1,11.31,0L216,170.07V200Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"/>`
  ]
]);
t$c.styles = p`
    :host {
      display: contents;
    }
  `;
l$2([
  O({ type: String, reflect: true })
], t$c.prototype, "size", 2);
l$2([
  O({ type: String, reflect: true })
], t$c.prototype, "weight", 2);
l$2([
  O({ type: String, reflect: true })
], t$c.prototype, "color", 2);
l$2([
  O({ type: Boolean, reflect: true })
], t$c.prototype, "mirrored", 2);
t$c = l$2([
  s$e("ph-image")
], t$c);
const PhImage = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhImage() {
    return t$c;
  }
});
var g$4 = Object.defineProperty, c$7 = Object.getOwnPropertyDescriptor, o$6 = (a11, s2, m2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? c$7(s2, m2) : s2, l2 = a11.length - 1, h3; l2 >= 0; l2--)
    (h3 = a11[l2]) && (r2 = (i ? h3(s2, m2, r2) : h3(r2)) || r2);
  return i && r2 && g$4(s2, m2, r2), r2;
};
let t$b = class t29 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$b.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$b.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M140,176a4,4,0,0,1-4,4,12,12,0,0,1-12-12V128a4,4,0,0,0-4-4,4,4,0,0,1,0-8,12,12,0,0,1,12,12v40a4,4,0,0,0,4,4A4,4,0,0,1,140,176ZM124,92a8,8,0,1,0-8-8A8,8,0,0,0,124,92Zm104,36A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M142,176a6,6,0,0,1-6,6,14,14,0,0,1-14-14V128a2,2,0,0,0-2-2,6,6,0,0,1,0-12,14,14,0,0,1,14,14v40a2,2,0,0,0,2,2A6,6,0,0,1,142,176ZM124,94a10,10,0,1,0-10-10A10,10,0,0,0,124,94Zm106,34A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/>`
  ],
  [
    "bold",
    tt`<path d="M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M144,176a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176Zm88-48A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128ZM124,96a12,12,0,1,0-12-12A12,12,0,0,0,124,96Z"/>`
  ]
]);
t$b.styles = p`
    :host {
      display: contents;
    }
  `;
o$6([
  O({ type: String, reflect: true })
], t$b.prototype, "size", 2);
o$6([
  O({ type: String, reflect: true })
], t$b.prototype, "weight", 2);
o$6([
  O({ type: String, reflect: true })
], t$b.prototype, "color", 2);
o$6([
  O({ type: Boolean, reflect: true })
], t$b.prototype, "mirrored", 2);
t$b = o$6([
  s$e("ph-info")
], t$b);
const PhInfo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhInfo() {
    return t$b;
  }
});
var n$2 = Object.defineProperty, g$3 = Object.getOwnPropertyDescriptor, o$5 = (e2, s2, i, h3) => {
  for (var t41 = h3 > 1 ? void 0 : h3 ? g$3(s2, i) : s2, p2 = e2.length - 1, m2; p2 >= 0; p2--)
    (m2 = e2[p2]) && (t41 = (h3 ? m2(s2, i, t41) : m2(t41)) || t41);
  return h3 && t41 && n$2(s2, i, t41), t41;
};
let a$6 = class a5 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$6.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
a$6.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M172,232a4,4,0,0,1-4,4H88a4,4,0,0,1,0-8h80A4,4,0,0,1,172,232Zm40-128a83.59,83.59,0,0,1-32.11,66.06A20.2,20.2,0,0,0,172,186v6a12,12,0,0,1-12,12H96a12,12,0,0,1-12-12v-6a20,20,0,0,0-7.76-15.81A83.58,83.58,0,0,1,44,104.47C43.75,59,80.52,21.09,126,20a84,84,0,0,1,86,84Zm-8,0a76,76,0,0,0-77.83-76C85,29,51.77,63.27,52,104.43a75.62,75.62,0,0,0,29.17,59.43A28,28,0,0,1,92,186v6a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4v-6a28.14,28.14,0,0,1,10.94-22.2A75.62,75.62,0,0,0,204,104ZM136.66,52.06a4,4,0,0,0-1.32,7.88C153.53,63,169,78.45,172.06,96.67A4,4,0,0,0,176,100a3.88,3.88,0,0,0,.67-.06,4,4,0,0,0,3.27-4.61A53.51,53.51,0,0,0,136.66,52.06Z"/>`
  ],
  [
    "light",
    tt`<path d="M174,232a6,6,0,0,1-6,6H88a6,6,0,0,1,0-12h80A6,6,0,0,1,174,232Zm40-128a85.56,85.56,0,0,1-32.88,67.64A18.23,18.23,0,0,0,174,186v6a14,14,0,0,1-14,14H96a14,14,0,0,1-14-14v-6a18,18,0,0,0-7-14.23h0a85.59,85.59,0,0,1-33-67.24C41.74,57.91,79.39,19.12,125.93,18A86,86,0,0,1,214,104Zm-12,0a74,74,0,0,0-75.79-74C86.17,31,53.78,64.34,54,104.42a73.67,73.67,0,0,0,28.4,57.87A29.92,29.92,0,0,1,94,186v6a2,2,0,0,0,2,2h64a2,2,0,0,0,2-2v-6a30.18,30.18,0,0,1,11.7-23.78A73.59,73.59,0,0,0,202,104Zm-20.08-9A55.58,55.58,0,0,0,137,50.08a6,6,0,1,0-2,11.84C152.38,64.84,167.13,79.6,170.08,97a6,6,0,0,0,5.91,5,6.87,6.87,0,0,0,1-.08A6,6,0,0,0,181.92,95Z"/>`
  ],
  [
    "regular",
    tt`<path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"/>`
  ],
  [
    "bold",
    tt`<path d="M180,232a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h80A12,12,0,0,1,180,232Zm40-128a91.51,91.51,0,0,1-35.17,72.35A12.26,12.26,0,0,0,180,186v2a20,20,0,0,1-20,20H96a20,20,0,0,1-20-20v-2a12,12,0,0,0-4.7-9.51A91.57,91.57,0,0,1,36,104.52C35.73,54.69,76,13.2,125.79,12A92,92,0,0,1,220,104Zm-24,0a68,68,0,0,0-69.65-68C89.56,36.88,59.8,67.55,60,104.38a67.71,67.71,0,0,0,26.1,53.19A35.87,35.87,0,0,1,100,184h56.1A36.13,36.13,0,0,1,170,157.49,67.68,67.68,0,0,0,196,104Zm-20.07-5.32a48.5,48.5,0,0,0-31.91-40,12,12,0,0,0-8,22.62,24.31,24.31,0,0,1,16.09,20,12,12,0,0,0,23.86-2.64Z"/>`
  ],
  [
    "fill",
    tt`<path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-32.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M208,104a79.86,79.86,0,0,1-30.59,62.92A24.29,24.29,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6a24.11,24.11,0,0,0-9.3-19A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24A80,80,0,0,1,208,104Z" opacity="0.2"/><path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"/>`
  ]
]);
a$6.styles = p`
    :host {
      display: contents;
    }
  `;
o$5([
  O({ type: String, reflect: true })
], a$6.prototype, "size", 2);
o$5([
  O({ type: String, reflect: true })
], a$6.prototype, "weight", 2);
o$5([
  O({ type: String, reflect: true })
], a$6.prototype, "color", 2);
o$5([
  O({ type: Boolean, reflect: true })
], a$6.prototype, "mirrored", 2);
a$6 = o$5([
  s$e("ph-lightbulb")
], a$6);
const PhLightbulb = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhLightbulb() {
    return a$6;
  }
});
var u$4 = Object.defineProperty, M$3 = Object.getOwnPropertyDescriptor, s$5 = (a11, o2, p2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? M$3(o2, p2) : o2, h3 = a11.length - 1, n2; h3 >= 0; h3--)
    (n2 = a11[h3]) && (r2 = (i ? n2(o2, p2, r2) : n2(r2)) || r2);
  return i && r2 && u$4(o2, p2, r2), r2;
};
let t$a = class t30 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$a.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$a.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M226.83,221.17l-52.7-52.7a84.1,84.1,0,1,0-5.66,5.66l52.7,52.7a4,4,0,0,0,5.66-5.66ZM36,112a76,76,0,1,1,76,76A76.08,76.08,0,0,1,36,112Z"/>`
  ],
  [
    "light",
    tt`<path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"/>`
  ],
  [
    "regular",
    tt`<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>`
  ],
  [
    "bold",
    tt`<path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"/>`
  ],
  [
    "fill",
    tt`<path d="M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z" opacity="0.2"/><path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>`
  ]
]);
t$a.styles = p`
    :host {
      display: contents;
    }
  `;
s$5([
  O({ type: String, reflect: true })
], t$a.prototype, "size", 2);
s$5([
  O({ type: String, reflect: true })
], t$a.prototype, "weight", 2);
s$5([
  O({ type: String, reflect: true })
], t$a.prototype, "color", 2);
s$5([
  O({ type: Boolean, reflect: true })
], t$a.prototype, "mirrored", 2);
t$a = s$5([
  s$e("ph-magnifying-glass")
], t$a);
const PhMagnifyingGlass = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhMagnifyingGlass() {
    return t$a;
  }
});
var c$6 = Object.defineProperty, f$7 = Object.getOwnPropertyDescriptor, l$1 = (a11, o2, i, s2) => {
  for (var e2 = s2 > 1 ? void 0 : s2 ? f$7(o2, i) : o2, h3 = a11.length - 1, n2; h3 >= 0; h3--)
    (n2 = a11[h3]) && (e2 = (s2 ? n2(o2, i, e2) : n2(e2)) || e2);
  return s2 && e2 && c$6(o2, i, e2), e2;
};
let t$9 = class t31 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$9.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$9.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M229.89,117.43l-168-95.88A12,12,0,0,0,44.7,36l31.08,92L44.71,220A12,12,0,0,0,56,236a12.13,12.13,0,0,0,5.93-1.57l167.94-96.08a12,12,0,0,0,0-20.92Zm-4,14L58,227.47a4,4,0,0,1-5.72-4.83l0-.07L82.87,132H144a4,4,0,0,0,0-8H82.87L52.26,33.37A3.89,3.89,0,0,1,53.44,29,4.13,4.13,0,0,1,56,28a3.88,3.88,0,0,1,1.93.54l168,95.87a4,4,0,0,1,0,7Z"/>`
  ],
  [
    "light",
    tt`<path d="M230.88,115.69l-168-95.88a14,14,0,0,0-20,16.87L73.66,128,42.81,219.33A14,14,0,0,0,56,238a14.15,14.15,0,0,0,6.93-1.83L230.84,140.1a14,14,0,0,0,0-24.41Zm-5.95,14L57,225.73a2,2,0,0,1-2.86-2.42.42.42,0,0,0,0-.1L84.3,134H144a6,6,0,0,0,0-12H84.3L54.17,32.8a.3.3,0,0,0,0-.1,1.87,1.87,0,0,1,.6-2.2A1.85,1.85,0,0,1,57,30.25l168,95.89a1.93,1.93,0,0,1,1,1.74A2,2,0,0,1,224.93,129.66Z"/>`
  ],
  [
    "regular",
    tt`<path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"/>`
  ],
  [
    "bold",
    tt`<path d="M233.86,110.48,65.8,14.58A20,20,0,0,0,37.15,38.64L67.33,128,37.15,217.36A20,20,0,0,0,56,244a20.1,20.1,0,0,0,9.81-2.58l.09-.06,168-96.07a20,20,0,0,0,0-34.81ZM63.19,215.26,88.61,140H144a12,12,0,0,0,0-24H88.61L63.18,40.72l152.76,87.17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M240,127.89a16,16,0,0,1-8.18,14L63.9,237.9A16.15,16.15,0,0,1,56,240a16,16,0,0,1-15-21.33l27-79.95A4,4,0,0,1,71.72,136H144a8,8,0,0,0,8-8.53,8.19,8.19,0,0,0-8.26-7.47h-72a4,4,0,0,1-3.79-2.72l-27-79.94A16,16,0,0,1,63.84,18.07l168,95.89A16,16,0,0,1,240,127.89Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M227.91,134.86,59.93,231a8,8,0,0,1-11.44-9.67L80,128,48.49,34.72a8,8,0,0,1,11.44-9.67l168,95.85A8,8,0,0,1,227.91,134.86Z" opacity="0.2"/><path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"/>`
  ]
]);
t$9.styles = p`
    :host {
      display: contents;
    }
  `;
l$1([
  O({ type: String, reflect: true })
], t$9.prototype, "size", 2);
l$1([
  O({ type: String, reflect: true })
], t$9.prototype, "weight", 2);
l$1([
  O({ type: String, reflect: true })
], t$9.prototype, "color", 2);
l$1([
  O({ type: Boolean, reflect: true })
], t$9.prototype, "mirrored", 2);
t$9 = l$1([
  s$e("ph-paper-plane-right")
], t$9);
const PhPaperPlaneRight = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhPaperPlaneRight() {
    return t$9;
  }
});
var c$5 = Object.defineProperty, f$6 = Object.getOwnPropertyDescriptor, s$4 = (a11, o2, i, h3) => {
  for (var r2 = h3 > 1 ? void 0 : h3 ? f$6(o2, i) : o2, l2 = a11.length - 1, n2; l2 >= 0; l2--)
    (n2 = a11[l2]) && (r2 = (h3 ? n2(o2, i, r2) : n2(r2)) || r2);
  return h3 && r2 && c$5(o2, i, r2), r2;
};
let t$8 = class t32 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$8.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$8.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z" opacity="0.2"/><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>`
  ]
]);
t$8.styles = p`
    :host {
      display: contents;
    }
  `;
s$4([
  O({ type: String, reflect: true })
], t$8.prototype, "size", 2);
s$4([
  O({ type: String, reflect: true })
], t$8.prototype, "weight", 2);
s$4([
  O({ type: String, reflect: true })
], t$8.prototype, "color", 2);
s$4([
  O({ type: Boolean, reflect: true })
], t$8.prototype, "mirrored", 2);
t$8 = s$4([
  s$e("ph-plus")
], t$8);
const PhPlus = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhPlus() {
    return t$8;
  }
});
var u$3 = Object.defineProperty, v = Object.getOwnPropertyDescriptor, o$4 = (a11, s2, l2, p2) => {
  for (var r2 = p2 > 1 ? void 0 : p2 ? v(s2, l2) : s2, h3 = a11.length - 1, m2; h3 >= 0; h3--)
    (m2 = a11[h3]) && (r2 = (p2 ? m2(s2, l2, r2) : m2(r2)) || r2);
  return p2 && r2 && u$3(s2, l2, r2), r2;
};
let t$7 = class t33 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$7.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$7.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M124,128V48a4,4,0,0,1,8,0v80a4,4,0,0,1-8,0Zm54.18-75.35a4,4,0,1,0-4.36,6.7C198.08,75.17,212,100.2,212,128a84,84,0,0,1-168,0c0-27.8,13.92-52.83,38.18-68.65a4,4,0,0,0-4.36-6.7C51.24,70,36,97.44,36,128a92,92,0,0,0,184,0C220,97.44,204.76,70,178.18,52.65Z"/>`
  ],
  [
    "light",
    tt`<path d="M122,128V48a6,6,0,0,1,12,0v80a6,6,0,0,1-12,0Zm57.28-77A6,6,0,0,0,172.72,61C196.41,76.47,210,100.88,210,128a82,82,0,0,1-164,0c0-27.12,13.59-51.53,37.28-67A6,6,0,0,0,76.72,51C49.57,68.68,34,96.75,34,128a94,94,0,0,0,188,0C222,96.75,206.43,68.68,179.28,51Z"/>`
  ],
  [
    "regular",
    tt`<path d="M120,128V48a8,8,0,0,1,16,0v80a8,8,0,0,1-16,0Zm60.37-78.7a8,8,0,0,0-8.74,13.4C194.74,77.77,208,101.57,208,128a80,80,0,0,1-160,0c0-26.43,13.26-50.23,36.37-65.3a8,8,0,0,0-8.74-13.4C47.9,67.38,32,96.06,32,128a96,96,0,0,0,192,0C224,96.06,208.1,67.38,180.37,49.3Z"/>`
  ],
  [
    "bold",
    tt`<path d="M116,128V48a12,12,0,0,1,24,0v80a12,12,0,0,1-24,0Zm66.55-82a12,12,0,0,0-13.1,20.1C191.41,80.37,204,103,204,128a76,76,0,0,1-152,0c0-25,12.59-47.63,34.55-61.95A12,12,0,0,0,73.45,46C44.56,64.78,28,94.69,28,128a100,100,0,0,0,200,0C228,94.69,211.44,64.78,182.55,46Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104,104,0,0,0,128,24Zm-8,40a8,8,0,0,1,16,0v64a8,8,0,0,1-16,0Zm8,144A80,80,0,0,1,83.55,61.48a8,8,0,1,1,8.9,13.29,64,64,0,1,0,71.1,0,8,8,0,1,1,8.9-13.29A80,80,0,0,1,128,208Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"/><path d="M120,128V48a8,8,0,0,1,16,0v80a8,8,0,0,1-16,0Zm60.37-78.7a8,8,0,0,0-8.74,13.4C194.74,77.77,208,101.57,208,128a80,80,0,0,1-160,0c0-26.43,13.26-50.23,36.37-65.3a8,8,0,0,0-8.74-13.4C47.9,67.38,32,96.06,32,128a96,96,0,0,0,192,0C224,96.06,208.1,67.38,180.37,49.3Z"/>`
  ]
]);
t$7.styles = p`
    :host {
      display: contents;
    }
  `;
o$4([
  O({ type: String, reflect: true })
], t$7.prototype, "size", 2);
o$4([
  O({ type: String, reflect: true })
], t$7.prototype, "weight", 2);
o$4([
  O({ type: String, reflect: true })
], t$7.prototype, "color", 2);
o$4([
  O({ type: Boolean, reflect: true })
], t$7.prototype, "mirrored", 2);
t$7 = o$4([
  s$e("ph-power")
], t$7);
const PhPower = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhPower() {
    return t$7;
  }
});
var c$4 = Object.defineProperty, m = Object.getOwnPropertyDescriptor, s$3 = (r2, o2, A2, i) => {
  for (var t41 = i > 1 ? void 0 : i ? m(o2, A2) : o2, h3 = r2.length - 1, l2; h3 >= 0; h3--)
    (l2 = r2[h3]) && (t41 = (i ? l2(o2, A2, t41) : l2(t41)) || t41);
  return i && t41 && c$4(o2, A2, t41), t41;
};
let a$5 = class a6 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var r2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$5.weightsMap.get((r2 = this.weight) != null ? r2 : "regular")}
    </svg>`;
  }
};
a$5.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M218.14,161.93a4,4,0,0,0-3.86-.24,24,24,0,0,1-34.23-23.25,24,24,0,0,1,34.23-20.13A4,4,0,0,0,220,114.7V72a12,12,0,0,0-12-12H167a32,32,0,1,0-62.91-10.33A32.57,32.57,0,0,0,105,60H64A12,12,0,0,0,52,72v37a32,32,0,1,0-10.33,62.91A32.28,32.28,0,0,0,52,171v37a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V165.31A4,4,0,0,0,218.14,161.93ZM212,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V165.31a4,4,0,0,0-1.86-3.38,4,4,0,0,0-3.85-.24,24,24,0,0,1-34.24-20.13,24,24,0,0,1,34.24-23.25A4,4,0,0,0,60,114.7V72a4,4,0,0,1,4-4h46.69a4,4,0,0,0,3.62-5.71,24,24,0,0,1,20.13-34.24,24,24,0,0,1,23.25,34.24A4,4,0,0,0,161.31,68H208a4,4,0,0,1,4,4v37a32.57,32.57,0,0,0-10.33-.94A32,32,0,1,0,212,171Z"/>`
  ],
  [
    "light",
    tt`<path d="M219.21,160.24a6,6,0,0,0-5.78-.35,22,22,0,1,1-11.05-41.83,22.15,22.15,0,0,1,11.05,2.06A6,6,0,0,0,222,114.7V72a14,14,0,0,0-14-14H169.48a35,35,0,0,0,.52-6,34.1,34.1,0,0,0-10.73-24.78,33.64,33.64,0,0,0-25.45-9.15A34,34,0,0,0,102.54,58H64A14,14,0,0,0,50,72v34.53a34,34,0,0,0-30.79,10.2,34,34,0,0,0,22.31,57.18,34.34,34.34,0,0,0,8.48-.44V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V165.31A6,6,0,0,0,219.21,160.24ZM210,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V165.31a6,6,0,0,0-6-6,5.92,5.92,0,0,0-2.57.58,22,22,0,0,1-31.38-18.46,22,22,0,0,1,31.38-21.31A6,6,0,0,0,62,114.7V72a2,2,0,0,1,2-2h46.69a6,6,0,0,0,5.42-8.57,22.25,22.25,0,0,1-2-11,22,22,0,1,1,41.83,11A6,6,0,0,0,161.3,70H208a2,2,0,0,1,2,2v34.54a34,34,0,0,0-39.93,31.28,33.71,33.71,0,0,0,9.14,25.45A34.15,34.15,0,0,0,210,173.48Z"/>`
  ],
  [
    "regular",
    tt`<path d="M220.27,158.54a8,8,0,0,0-7.7-.46,20,20,0,1,1,0-36.16A8,8,0,0,0,224,114.69V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36.11,36.11,0,0,0-11.36-26.24,36,36,0,0,0-60.55,23.62,36.56,36.56,0,0,0,.14,6.62H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36.12,36.12,0,0,0-26.24,11.36,35.7,35.7,0,0,0-9.69,27,36.08,36.08,0,0,0,33.31,33.6,35.68,35.68,0,0,0,6.62-.14V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V165.31A8,8,0,0,0,220.27,158.54ZM208,208H64V165.31a8,8,0,0,0-11.43-7.23,20,20,0,1,1,0-36.16A8,8,0,0,0,64,114.69V72h46.69a8,8,0,0,0,7.23-11.43,20,20,0,1,1,36.16,0A8,8,0,0,0,161.31,72H208v32.23a35.68,35.68,0,0,0-6.62-.14A36,36,0,0,0,204,176a35.36,35.36,0,0,0,4-.22Z"/>`
  ],
  [
    "bold",
    tt`<path d="M222.41,155.16a12,12,0,0,0-11.56-.69A16,16,0,0,1,188,139,16.2,16.2,0,0,1,202.8,124a15.83,15.83,0,0,1,8,1.5A12,12,0,0,0,228,114.7V72a20,20,0,0,0-20-20H176a40.15,40.15,0,0,0-12.62-29.16,39.67,39.67,0,0,0-29.94-10.76,40.08,40.08,0,0,0-37.34,37C96,50.07,96,51,96,52H64A20,20,0,0,0,44,72v28a40.15,40.15,0,0,0-29.16,12.62A40,40,0,0,0,41.1,179.9a28.3,28.3,0,0,0,2.9.1v28a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V165.31A12,12,0,0,0,222.41,155.16ZM204,204H68V165.31a12,12,0,0,0-17.15-10.84A15.9,15.9,0,0,1,42.8,156,16.2,16.2,0,0,1,28,141.06a16,16,0,0,1,22.82-15.52A12,12,0,0,0,68,114.7V76h42.7a12,12,0,0,0,10.83-17.15A15.9,15.9,0,0,1,120,50.8,16.19,16.19,0,0,1,134.94,36a16,16,0,0,1,15.53,22.81A12,12,0,0,0,161.31,76H204v24c-1,0-1.93,0-2.9.11A40,40,0,0,0,204,180h0Z"/>`
  ],
  [
    "fill",
    tt`<path d="M165.78,224H208a16,16,0,0,0,16-16V170.35A8,8,0,0,0,212.94,163a23.37,23.37,0,0,1-8.94,1.77c-13.23,0-24-11.1-24-24.73s10.77-24.73,24-24.73a23.37,23.37,0,0,1,8.94,1.77A8,8,0,0,0,224,109.65V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36,36,0,0,0-72,0,35.36,35.36,0,0,0,.22,4H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36,36,0,0,0,0,72,35.36,35.36,0,0,0,4-.22V208a16,16,0,0,0,16,16h42.22"/>`
  ],
  [
    "duotone",
    tt`<path d="M204,168a28,28,0,0,0,12-2.69V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V165.31a28,28,0,1,1,0-50.62V72a8,8,0,0,1,8-8h46.69a28,28,0,1,1,50.61,0H208a8,8,0,0,1,8,8v42.69A28,28,0,1,0,204,168Z" opacity="0.2"/><path d="M220.27,158.54a8,8,0,0,0-7.7-.46,20,20,0,1,1,0-36.16A8,8,0,0,0,224,114.69V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36.15,36.15,0,0,0-11.36-26.25,36,36,0,0,0-60.55,23.63,36.56,36.56,0,0,0,.14,6.62H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36.12,36.12,0,0,0-26.24,11.36,35.7,35.7,0,0,0-9.69,27,36.08,36.08,0,0,0,33.31,33.6,36.56,36.56,0,0,0,6.62-.14V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V165.31A8,8,0,0,0,220.27,158.54ZM208,208H64V165.31a8,8,0,0,0-11.43-7.23,20,20,0,1,1,0-36.16A8,8,0,0,0,64,114.69V72h46.69a8,8,0,0,0,7.23-11.43,20,20,0,1,1,36.16,0A8,8,0,0,0,161.31,72H208v32.23a35.68,35.68,0,0,0-6.62-.14A36,36,0,0,0,204,176a35.36,35.36,0,0,0,4-.22Z"/>`
  ]
]);
a$5.styles = p`
    :host {
      display: contents;
    }
  `;
s$3([
  O({ type: String, reflect: true })
], a$5.prototype, "size", 2);
s$3([
  O({ type: String, reflect: true })
], a$5.prototype, "weight", 2);
s$3([
  O({ type: String, reflect: true })
], a$5.prototype, "color", 2);
s$3([
  O({ type: Boolean, reflect: true })
], a$5.prototype, "mirrored", 2);
a$5 = s$3([
  s$e("ph-puzzle-piece")
], a$5);
const PhPuzzlePiece = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhPuzzlePiece() {
    return a$5;
  }
});
var l = Object.defineProperty, n$1 = Object.getOwnPropertyDescriptor, e = (r2, m2, Z2, v2) => {
  for (var t41 = v2 > 1 ? void 0 : v2 ? n$1(m2, Z2) : m2, o2 = r2.length - 1, H2; o2 >= 0; o2--)
    (H2 = r2[o2]) && (t41 = (v2 ? H2(m2, Z2, t41) : H2(t41)) || t41);
  return v2 && t41 && l(m2, Z2, t41), t41;
};
let a$4 = class a7 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var r2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$4.weightsMap.get((r2 = this.weight) != null ? r2 : "regular")}
    </svg>`;
  }
};
a$4.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M104,44H56A12,12,0,0,0,44,56v48a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V56A12,12,0,0,0,104,44Zm4,60a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4Zm-4,36H56a12,12,0,0,0-12,12v48a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V152A12,12,0,0,0,104,140Zm4,60a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V152a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4ZM200,44H152a12,12,0,0,0-12,12v48a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,60a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4Zm-64,72V144a4,4,0,0,1,8,0v32a4,4,0,0,1-8,0Zm72-16a4,4,0,0,1-4,4H180v44a4,4,0,0,1-4,4H144a4,4,0,0,1,0-8h28V144a4,4,0,0,1,8,0v12h28A4,4,0,0,1,212,160Zm0,32v16a4,4,0,0,1-8,0V192a4,4,0,0,1,8,0Z"/>`
  ],
  [
    "light",
    tt`<path d="M104,42H56A14,14,0,0,0,42,56v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V56A14,14,0,0,0,104,42Zm2,62a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2Zm-2,34H56a14,14,0,0,0-14,14v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V152A14,14,0,0,0,104,138Zm2,62a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V152a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2ZM200,42H152a14,14,0,0,0-14,14v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,62a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2Zm-64,72V144a6,6,0,0,1,12,0v32a6,6,0,0,1-12,0Zm76-16a6,6,0,0,1-6,6H182v42a6,6,0,0,1-6,6H144a6,6,0,0,1,0-12h26V144a6,6,0,0,1,12,0v10h26A6,6,0,0,1,214,160Zm0,32v16a6,6,0,0,1-12,0V192a6,6,0,0,1,12,0Z"/>`
  ],
  [
    "regular",
    tt`<path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm0,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48ZM200,40H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-64,72V144a8,8,0,0,1,16,0v32a8,8,0,0,1-16,0Zm80-16a8,8,0,0,1-8,8H184v40a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,160Zm0,32v16a8,8,0,0,1-16,0V192a8,8,0,0,1,16,0Z"/>`
  ],
  [
    "bold",
    tt`<path d="M100,36H56A20,20,0,0,0,36,56v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,100,36ZM96,96H60V60H96Zm4,40H56a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,100,136Zm-4,60H60V160H96ZM200,36H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,60H160V60h36Zm-60,76V148a12,12,0,0,1,24,0v24a12,12,0,0,1-24,0Zm84-8a12,12,0,0,1-12,12H196v32a12,12,0,0,1-12,12H148a12,12,0,0,1,0-24h24V148a12,12,0,0,1,24,0v4h12A12,12,0,0,1,220,164Z"/>`
  ],
  [
    "fill",
    tt`<path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm-16,80H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96-96H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40ZM144,184a8,8,0,0,0,8-8V144a8,8,0,0,0-16,0v32A8,8,0,0,0,144,184Zm64-32H184v-8a8,8,0,0,0-16,0v56H144a8,8,0,0,0,0,16h32a8,8,0,0,0,8-8V168h24a8,8,0,0,0,0-16Zm0,32a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V192A8,8,0,0,0,208,184Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M112,56v48a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h48A8,8,0,0,1,112,56Zm-8,88H56a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,104,144Zm96-96H152a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V56A8,8,0,0,0,200,48Z" opacity="0.2"/><path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm0,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48ZM200,40H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-64,72V144a8,8,0,0,1,16,0v32a8,8,0,0,1-16,0Zm80-16a8,8,0,0,1-8,8H184v40a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,160Zm0,32v16a8,8,0,0,1-16,0V192a8,8,0,0,1,16,0Z"/>`
  ]
]);
a$4.styles = p`
    :host {
      display: contents;
    }
  `;
e([
  O({ type: String, reflect: true })
], a$4.prototype, "size", 2);
e([
  O({ type: String, reflect: true })
], a$4.prototype, "weight", 2);
e([
  O({ type: String, reflect: true })
], a$4.prototype, "color", 2);
e([
  O({ type: Boolean, reflect: true })
], a$4.prototype, "mirrored", 2);
a$4 = e([
  s$e("ph-qr-code")
], a$4);
const PhQrCode = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhQrCode() {
    return a$4;
  }
});
var g$2 = Object.defineProperty, u$2 = Object.getOwnPropertyDescriptor, s$2 = (a11, o2, c2, i) => {
  for (var e2 = i > 1 ? void 0 : i ? u$2(o2, c2) : o2, m2 = a11.length - 1, l2; m2 >= 0; m2--)
    (l2 = a11[m2]) && (e2 = (i ? l2(o2, c2, e2) : l2(e2)) || e2);
  return i && e2 && g$2(o2, c2, e2), e2;
};
let t$6 = class t34 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$6.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$6.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M136,180a8,8,0,1,1-8-8A8,8,0,0,1,136,180ZM128,76c-19.85,0-36,14.36-36,32v4a4,4,0,0,0,8,0v-4c0-13.23,12.56-24,28-24s28,10.77,28,24-12.56,24-28,24a4,4,0,0,0-4,4v8a4,4,0,0,0,8,0v-4.2c18-1.77,32-15.36,32-31.8C164,90.36,147.85,76,128,76Zm100,52A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M138,180a10,10,0,1,1-10-10A10,10,0,0,1,138,180ZM128,74c-21,0-38,15.25-38,34v4a6,6,0,0,0,12,0v-4c0-12.13,11.66-22,26-22s26,9.87,26,22-11.66,22-26,22a6,6,0,0,0-6,6v8a6,6,0,0,0,12,0v-2.42c18.11-2.58,32-16.66,32-33.58C166,89.25,149,74,128,74Zm102,54A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>`
  ]
]);
t$6.styles = p`
    :host {
      display: contents;
    }
  `;
s$2([
  O({ type: String, reflect: true })
], t$6.prototype, "size", 2);
s$2([
  O({ type: String, reflect: true })
], t$6.prototype, "weight", 2);
s$2([
  O({ type: String, reflect: true })
], t$6.prototype, "color", 2);
s$2([
  O({ type: Boolean, reflect: true })
], t$6.prototype, "mirrored", 2);
t$6 = s$2([
  s$e("ph-question")
], t$6);
const PhQuestion = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhQuestion() {
    return t$6;
  }
});
var f$5 = Object.defineProperty, V = Object.getOwnPropertyDescriptor, s$1 = (a11, o2, c2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? V(o2, c2) : o2, l2 = a11.length - 1, h3; l2 >= 0; l2--)
    (h3 = a11[l2]) && (r2 = (i ? h3(o2, c2, r2) : h3(r2)) || r2);
  return i && r2 && f$5(o2, c2, r2), r2;
};
let t$5 = class t35 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$5.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$5.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M188,96c0,27.51-24.77,50.09-56,51.89V160a4,4,0,0,1-8,0V144a4,4,0,0,1,4-4c28.67,0,52-19.74,52-44s-23.33-44-52-44S76,71.74,76,96a4,4,0,0,1-8,0c0-28.67,26.92-52,60-52S188,67.33,188,96ZM128,196a12,12,0,1,0,12,12A12,12,0,0,0,128,196Z"/>`
  ],
  [
    "light",
    tt`<path d="M190,96c0,28-24.62,51.11-56,53.75V160a6,6,0,0,1-12,0V144a6,6,0,0,1,6-6c27.57,0,50-18.84,50-42s-22.43-42-50-42S78,72.84,78,96a6,6,0,0,1-12,0c0-29.78,27.81-54,62-54S190,66.22,190,96Zm-62,98a14,14,0,1,0,14,14A14,14,0,0,0,128,194Z"/>`
  ],
  [
    "regular",
    tt`<path d="M192,96c0,28.51-24.47,52.11-56,55.56V160a8,8,0,0,1-16,0V144a8,8,0,0,1,8-8c26.47,0,48-17.94,48-40s-21.53-40-48-40S80,73.94,80,96a8,8,0,0,1-16,0c0-30.88,28.71-56,64-56S192,65.12,192,96Zm-64,96a16,16,0,1,0,16,16A16,16,0,0,0,128,192Z"/>`
  ],
  [
    "bold",
    tt`<path d="M196,96c0,29.47-24.21,54.05-56,59.06V156a12,12,0,0,1-24,0V144a12,12,0,0,1,12-12c24.26,0,44-16.15,44-36s-19.74-36-44-36S84,76.15,84,96a12,12,0,0,1-24,0c0-33.08,30.5-60,68-60S196,62.92,196,96Zm-68,92a20,20,0,1,0,20,20A20,20,0,0,0,128,188Z"/>`
  ],
  [
    "fill",
    tt`<path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM136,143.28V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.23,139.93,136,143.28ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,40V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24H200A16,16,0,0,1,216,40Z" opacity="0.2"/><path d="M192,96c0,28.51-24.47,52.11-56,55.56V160a8,8,0,0,1-16,0V144a8,8,0,0,1,8-8c26.47,0,48-17.94,48-40s-21.53-40-48-40S80,73.94,80,96a8,8,0,0,1-16,0c0-30.88,28.71-56,64-56S192,65.12,192,96Zm-64,96a16,16,0,1,0,16,16A16,16,0,0,0,128,192Z"/>`
  ]
]);
t$5.styles = p`
    :host {
      display: contents;
    }
  `;
s$1([
  O({ type: String, reflect: true })
], t$5.prototype, "size", 2);
s$1([
  O({ type: String, reflect: true })
], t$5.prototype, "weight", 2);
s$1([
  O({ type: String, reflect: true })
], t$5.prototype, "color", 2);
s$1([
  O({ type: Boolean, reflect: true })
], t$5.prototype, "mirrored", 2);
t$5 = s$1([
  s$e("ph-question-mark")
], t$5);
const PhQuestionMark = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhQuestionMark() {
    return t$5;
  }
});
var g$1 = Object.defineProperty, f$4 = Object.getOwnPropertyDescriptor, r = (e2, l2, i, a11) => {
  for (var c2 = a11 > 1 ? void 0 : a11 ? f$4(l2, i) : l2, p2 = e2.length - 1, C; p2 >= 0; p2--)
    (C = e2[p2]) && (c2 = (a11 ? C(l2, i, c2) : C(c2)) || c2);
  return a11 && c2 && g$1(l2, i, c2), c2;
};
let s = class extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${s.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
s.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M223,105.58c-4-4.2-8.2-8.54-10-12.8-1.65-4-1.73-9.53-1.82-15.41-.14-9-.29-19.19-6.83-25.74s-16.74-6.69-25.74-6.83c-5.88-.09-11.43-.17-15.41-1.82-4.26-1.76-8.6-5.93-12.8-9.95-6.68-6.41-13.59-13-22.42-13s-15.74,6.62-22.42,13c-4.2,4-8.54,8.2-12.8,10-4,1.65-9.53,1.73-15.41,1.82-9,.14-19.19.29-25.74,6.83S44.94,68.37,44.8,77.37c-.09,5.88-.17,11.43-1.82,15.41-1.76,4.26-5.93,8.6-9.95,12.8-6.41,6.68-13,13.59-13,22.42s6.62,15.74,13,22.42c4,4.2,8.2,8.54,10,12.8,1.65,4,1.73,9.53,1.82,15.41.14,9,.29,19.19,6.83,25.74s16.74,6.69,25.74,6.83c5.88.09,11.43.17,15.41,1.82,4.26,1.76,8.6,5.93,12.8,9.95,6.68,6.41,13.59,13,22.42,13s15.74-6.62,22.42-13c4.2-4,8.54-8.2,12.8-10,4-1.65,9.53-1.73,15.41-1.82,9-.14,19.19-.29,25.74-6.83s6.69-16.74,6.83-25.74c.09-5.88.17-11.43,1.82-15.41,1.76-4.26,5.93-8.6,9.95-12.8,6.41-6.68,13-13.59,13-22.42S229.38,112.26,223,105.58Zm-5.78,39.3c-4.54,4.73-9.24,9.63-11.57,15.28-2.23,5.39-2.33,12-2.43,18.35-.12,8.2-.24,16-4.49,20.2s-12,4.37-20.2,4.49c-6.37.1-13,.2-18.35,2.43-5.65,2.33-10.55,7-15.28,11.57C139.09,222.75,133.62,228,128,228s-11.09-5.25-16.88-10.8c-4.73-4.54-9.63-9.24-15.28-11.57-5.39-2.23-12-2.33-18.35-2.43-8.2-.12-15.95-.24-20.2-4.49s-4.37-12-4.49-20.2c-.1-6.37-.2-13-2.43-18.35-2.33-5.65-7-10.55-11.57-15.28C33.25,139.09,28,133.62,28,128s5.25-11.09,10.8-16.88c4.54-4.73,9.24-9.63,11.57-15.28,2.23-5.39,2.33-12,2.43-18.35.12-8.2.24-15.95,4.49-20.2s12-4.37,20.2-4.49c6.37-.1,13-.2,18.35-2.43,5.65-2.33,10.55-7,15.28-11.57C116.91,33.25,122.38,28,128,28s11.09,5.25,16.88,10.8c4.73,4.54,9.63,9.24,15.28,11.57,5.39,2.23,12,2.33,18.35,2.43,8.2.12,16,.24,20.2,4.49s4.37,12,4.49,20.2c.1,6.37.2,13,2.43,18.35,2.33,5.65,7,10.55,11.57,15.28,5.55,5.79,10.8,11.26,10.8,16.88S222.75,139.09,217.2,144.88Zm-46.37-43.71a4,4,0,0,1,0,5.66l-56,56a4,4,0,0,1-5.66,0l-24-24a4,4,0,0,1,5.66-5.66L112,154.34l53.17-53.17A4,4,0,0,1,170.83,101.17Z"/>`
  ],
  [
    "light",
    tt`<path d="M224.42,104.2c-3.9-4.07-7.93-8.27-9.55-12.18-1.5-3.63-1.58-9-1.67-14.68-.14-9.38-.3-20-7.42-27.12S188,42.94,178.66,42.8c-5.68-.09-11-.17-14.68-1.67-3.91-1.62-8.11-5.65-12.18-9.55C145.16,25.22,137.64,18,128,18s-17.16,7.22-23.8,13.58c-4.07,3.9-8.27,7.93-12.18,9.55-3.63,1.5-9,1.58-14.68,1.67-9.38.14-20,.3-27.12,7.42S42.94,68,42.8,77.34c-.09,5.68-.17,11-1.67,14.68-1.62,3.91-5.65,8.11-9.55,12.18C25.22,110.84,18,118.36,18,128s7.22,17.16,13.58,23.8c3.9,4.07,7.93,8.27,9.55,12.18,1.5,3.63,1.58,9,1.67,14.68.14,9.38.3,20,7.42,27.12S68,213.06,77.34,213.2c5.68.09,11,.17,14.68,1.67,3.91,1.62,8.11,5.65,12.18,9.55C110.84,230.78,118.36,238,128,238s17.16-7.22,23.8-13.58c4.07-3.9,8.27-7.93,12.18-9.55,3.63-1.5,9-1.58,14.68-1.67,9.38-.14,20-.3,27.12-7.42s7.28-17.74,7.42-27.12c.09-5.68.17-11,1.67-14.68,1.62-3.91,5.65-8.11,9.55-12.18C230.78,145.16,238,137.64,238,128S230.78,110.84,224.42,104.2Zm-8.66,39.3c-4.67,4.86-9.5,9.9-12,15.9-2.38,5.74-2.48,12.52-2.58,19.08-.11,7.44-.23,15.14-3.9,18.82s-11.38,3.79-18.82,3.9c-6.56.1-13.34.2-19.08,2.58-6,2.48-11,7.31-15.91,12-5.25,5-10.68,10.24-15.49,10.24s-10.24-5.21-15.5-10.24c-4.86-4.67-9.9-9.5-15.9-12-5.74-2.38-12.52-2.48-19.08-2.58-7.44-.11-15.14-.23-18.82-3.9s-3.79-11.38-3.9-18.82c-.1-6.56-.2-13.34-2.58-19.08-2.48-6-7.31-11-12-15.91C35.21,138.24,30,132.81,30,128s5.21-10.24,10.24-15.5c4.67-4.86,9.5-9.9,12-15.9,2.38-5.74,2.48-12.52,2.58-19.08.11-7.44.23-15.14,3.9-18.82s11.38-3.79,18.82-3.9c6.56-.1,13.34-.2,19.08-2.58,6-2.48,11-7.31,15.91-12C117.76,35.21,123.19,30,128,30s10.24,5.21,15.5,10.24c4.86,4.67,9.9,9.5,15.9,12,5.74,2.38,12.52,2.48,19.08,2.58,7.44.11,15.14.23,18.82,3.9s3.79,11.38,3.9,18.82c.1,6.56.2,13.34,2.58,19.08,2.48,6,7.31,11,12,15.91,5,5.25,10.24,10.68,10.24,15.49S220.79,138.24,215.76,143.5ZM172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76Z"/>`
  ],
  [
    "regular",
    tt`<path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"/>`
  ],
  [
    "bold",
    tt`<path d="M228.75,100.05c-3.52-3.67-7.15-7.46-8.34-10.33-1.06-2.56-1.14-7.83-1.21-12.47-.15-10-.34-22.44-9.18-31.27s-21.27-9-31.27-9.18c-4.64-.07-9.91-.15-12.47-1.21-2.87-1.19-6.66-4.82-10.33-8.34C148.87,20.46,140.05,12,128,12s-20.87,8.46-27.95,15.25c-3.67,3.52-7.46,7.15-10.33,8.34-2.56,1.06-7.83,1.14-12.47,1.21C67.25,37,54.81,37.14,46,46S37,67.25,36.8,77.25c-.07,4.64-.15,9.91-1.21,12.47-1.19,2.87-4.82,6.66-8.34,10.33C20.46,107.13,12,116,12,128S20.46,148.87,27.25,156c3.52,3.67,7.15,7.46,8.34,10.33,1.06,2.56,1.14,7.83,1.21,12.47.15,10,.34,22.44,9.18,31.27s21.27,9,31.27,9.18c4.64.07,9.91.15,12.47,1.21,2.87,1.19,6.66,4.82,10.33,8.34C107.13,235.54,116,244,128,244s20.87-8.46,27.95-15.25c3.67-3.52,7.46-7.15,10.33-8.34,2.56-1.06,7.83-1.14,12.47-1.21,10-.15,22.44-.34,31.27-9.18s9-21.27,9.18-31.27c.07-4.64.15-9.91,1.21-12.47,1.19-2.87,4.82-6.66,8.34-10.33C235.54,148.87,244,140.05,244,128S235.54,107.13,228.75,100.05Zm-17.32,39.29c-4.82,5-10.28,10.72-13.19,17.76-2.82,6.8-2.93,14.16-3,21.29-.08,5.36-.19,12.71-2.15,14.66s-9.3,2.07-14.66,2.15c-7.13.11-14.49.22-21.29,3-7,2.91-12.73,8.37-17.76,13.19C135.78,214.84,130.4,220,128,220s-7.78-5.16-11.34-8.57c-5-4.82-10.72-10.28-17.76-13.19-6.8-2.82-14.16-2.93-21.29-3-5.36-.08-12.71-.19-14.66-2.15s-2.07-9.3-2.15-14.66c-.11-7.13-.22-14.49-3-21.29-2.91-7-8.37-12.73-13.19-17.76C41.16,135.78,36,130.4,36,128s5.16-7.78,8.57-11.34c4.82-5,10.28-10.72,13.19-17.76,2.82-6.8,2.93-14.16,3-21.29C60.88,72.25,61,64.9,63,63s9.3-2.07,14.66-2.15c7.13-.11,14.49-.22,21.29-3,7-2.91,12.73-8.37,17.76-13.19C120.22,41.16,125.6,36,128,36s7.78,5.16,11.34,8.57c5,4.82,10.72,10.28,17.76,13.19,6.8,2.82,14.16,2.93,21.29,3,5.36.08,12.71.19,14.66,2.15s2.07,9.3,2.15,14.66c.11,7.13.22,14.49,3,21.29,2.91,7,8.37,12.73,13.19,17.76,3.41,3.56,8.57,8.94,8.57,11.34S214.84,135.78,211.43,139.34ZM176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51Z"/>`
  ],
  [
    "fill",
    tt`<path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M232,128c0,12.51-17.82,21.95-22.68,33.69-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68c-11.32-4.68-30.65,1.42-39.85-7.78s-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128Z" opacity="0.2"/><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"/>`
  ]
]);
s.styles = p`
    :host {
      display: contents;
    }
  `;
r([
  O({ type: String, reflect: true })
], s.prototype, "size", 2);
r([
  O({ type: String, reflect: true })
], s.prototype, "weight", 2);
r([
  O({ type: String, reflect: true })
], s.prototype, "color", 2);
r([
  O({ type: Boolean, reflect: true })
], s.prototype, "mirrored", 2);
s = r([
  s$e("ph-seal-check")
], s);
const PhSealCheck = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhSealCheck() {
    return s;
  }
});
var c$3 = Object.defineProperty, f$3 = Object.getOwnPropertyDescriptor, h$1 = (e2, o2, i, s2) => {
  for (var r2 = s2 > 1 ? void 0 : s2 ? f$3(o2, i) : o2, p2 = e2.length - 1, m2; p2 >= 0; p2--)
    (m2 = e2[p2]) && (r2 = (s2 ? m2(o2, i, r2) : m2(r2)) || r2);
  return s2 && r2 && c$3(o2, i, r2), r2;
};
let t$4 = class t36 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$4.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
t$4.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M116,216a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h64a4,4,0,0,1,0,8H52V212h60A4,4,0,0,1,116,216Zm110.83-90.83-40-40a4,4,0,0,0-5.66,5.66L214.34,124H112a4,4,0,0,0,0,8H214.34l-33.17,33.17a4,4,0,0,0,5.66,5.66l40-40A4,4,0,0,0,226.83,125.17Z"/>`
  ],
  [
    "light",
    tt`<path d="M118,216a6,6,0,0,1-6,6H48a6,6,0,0,1-6-6V40a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H54V210h58A6,6,0,0,1,118,216Zm110.24-92.24-40-40a6,6,0,0,0-8.48,8.48L209.51,122H112a6,6,0,0,0,0,12h97.51l-29.75,29.76a6,6,0,1,0,8.48,8.48l40-40A6,6,0,0,0,228.24,123.76Z"/>`
  ],
  [
    "regular",
    tt`<path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"/>`
  ],
  [
    "bold",
    tt`<path d="M124,216a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V40A12,12,0,0,1,48,28h64a12,12,0,0,1,0,24H60V204h52A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"/>`
  ],
  [
    "fill",
    tt`<path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40A8,8,0,0,0,176,88v32H112a8,8,0,0,0,0,16h64v32a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,229.66,122.34Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,56V200a16,16,0,0,1-16,16H48V40H208A16,16,0,0,1,224,56Z" opacity="0.2"/><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"/>`
  ]
]);
t$4.styles = p`
    :host {
      display: contents;
    }
  `;
h$1([
  O({ type: String, reflect: true })
], t$4.prototype, "size", 2);
h$1([
  O({ type: String, reflect: true })
], t$4.prototype, "weight", 2);
h$1([
  O({ type: String, reflect: true })
], t$4.prototype, "color", 2);
h$1([
  O({ type: Boolean, reflect: true })
], t$4.prototype, "mirrored", 2);
t$4 = h$1([
  s$e("ph-sign-out")
], t$4);
const PhSignOut = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhSignOut() {
    return t$4;
  }
});
var g = Object.defineProperty, c$2 = Object.getOwnPropertyDescriptor, Z = (e2, l2, i, s2) => {
  for (var t41 = s2 > 1 ? void 0 : s2 ? c$2(l2, i) : l2, p2 = e2.length - 1, h3; p2 >= 0; p2--)
    (h3 = e2[p2]) && (t41 = (s2 ? h3(l2, i, t41) : h3(t41)) || t41);
  return s2 && t41 && g(l2, i, t41), t41;
};
let a$3 = class a8 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$3.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
a$3.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M132,32V64a4,4,0,0,1-8,0V32a4,4,0,0,1,8,0Zm41.25,54.75a4,4,0,0,0,2.83-1.18L198.71,63a4,4,0,0,0-5.66-5.66L170.43,79.92a4,4,0,0,0,2.82,6.83ZM224,124H192a4,4,0,0,0,0,8h32a4,4,0,0,0,0-8Zm-47.92,46.43a4,4,0,1,0-5.65,5.65l22.62,22.63a4,4,0,0,0,5.66-5.66ZM128,188a4,4,0,0,0-4,4v32a4,4,0,0,0,8,0V192A4,4,0,0,0,128,188ZM79.92,170.43,57.29,193.05A4,4,0,0,0,63,198.71l22.62-22.63a4,4,0,1,0-5.65-5.65ZM68,128a4,4,0,0,0-4-4H32a4,4,0,0,0,0,8H64A4,4,0,0,0,68,128ZM63,57.29A4,4,0,0,0,57.29,63L79.92,85.57a4,4,0,1,0,5.65-5.65Z"/>`
  ],
  [
    "light",
    tt`<path d="M134,32V64a6,6,0,0,1-12,0V32a6,6,0,0,1,12,0Zm39.25,56.75A6,6,0,0,0,177.5,87l22.62-22.63a6,6,0,0,0-8.48-8.48L169,78.5a6,6,0,0,0,4.24,10.25ZM224,122H192a6,6,0,0,0,0,12h32a6,6,0,0,0,0-12Zm-46.5,47A6,6,0,0,0,169,177.5l22.63,22.62a6,6,0,0,0,8.48-8.48ZM128,186a6,6,0,0,0-6,6v32a6,6,0,0,0,12,0V192A6,6,0,0,0,128,186ZM78.5,169,55.88,191.64a6,6,0,1,0,8.48,8.48L87,177.5A6,6,0,1,0,78.5,169ZM70,128a6,6,0,0,0-6-6H32a6,6,0,0,0,0,12H64A6,6,0,0,0,70,128ZM64.36,55.88a6,6,0,0,0-8.48,8.48L78.5,87A6,6,0,1,0,87,78.5Z"/>`
  ],
  [
    "regular",
    tt`<path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm37.25,58.75a8,8,0,0,0,5.66-2.35l22.63-22.62a8,8,0,0,0-11.32-11.32L167.6,77.09a8,8,0,0,0,5.65,13.66ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"/>`
  ],
  [
    "bold",
    tt`<path d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm33.25,62.75a12,12,0,0,0,8.49-3.52L204.37,68.6a12,12,0,0,0-17-17L164.77,74.26a12,12,0,0,0,8.48,20.49ZM224,116H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.26,48.77a12,12,0,1,0-17,17l22.63,22.63a12,12,0,0,0,17-17ZM128,180a12,12,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12,12,0,0,0,128,180ZM74.26,164.77,51.63,187.4a12,12,0,0,0,17,17l22.63-22.63a12,12,0,1,0-17-17ZM76,128a12,12,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12,12,0,0,0,76,128ZM68.6,51.63a12,12,0,1,0-17,17L74.26,91.23a12,12,0,0,0,17-17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm33.94,58.75,17-17a8,8,0,0,1,11.32,11.32l-17,17a8,8,0,0,1-11.31-11.31ZM48,136a8,8,0,0,1,0-16H72a8,8,0,0,1,0,16Zm46.06,37.25-17,17a8,8,0,0,1-11.32-11.32l17-17a8,8,0,0,1,11.31,11.31Zm0-79.19a8,8,0,0,1-11.31,0l-17-17A8,8,0,0,1,77.09,65.77l17,17A8,8,0,0,1,94.06,94.06ZM136,208a8,8,0,0,1-16,0V184a8,8,0,0,1,16,0Zm0-136a8,8,0,0,1-16,0V48a8,8,0,0,1,16,0Zm54.23,118.23a8,8,0,0,1-11.32,0l-17-17a8,8,0,0,1,11.31-11.31l17,17A8,8,0,0,1,190.23,190.23ZM208,136H184a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm37.25,58.75a8,8,0,0,0,5.66-2.35l22.63-22.62a8,8,0,0,0-11.32-11.32L167.6,77.09a8,8,0,0,0,5.65,13.66ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"/>`
  ]
]);
a$3.styles = p`
    :host {
      display: contents;
    }
  `;
Z([
  O({ type: String, reflect: true })
], a$3.prototype, "size", 2);
Z([
  O({ type: String, reflect: true })
], a$3.prototype, "weight", 2);
Z([
  O({ type: String, reflect: true })
], a$3.prototype, "color", 2);
Z([
  O({ type: Boolean, reflect: true })
], a$3.prototype, "mirrored", 2);
a$3 = Z([
  s$e("ph-spinner")
], a$3);
const PhSpinner = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhSpinner() {
    return a$3;
  }
});
var n = Object.defineProperty, M$2 = Object.getOwnPropertyDescriptor, h2 = (e2, s2, H2, o2) => {
  for (var t41 = o2 > 1 ? void 0 : o2 ? M$2(s2, H2) : s2, i = e2.length - 1, p2; i >= 0; i--)
    (p2 = e2[i]) && (t41 = (o2 ? p2(s2, H2, t41) : p2(t41)) || t41);
  return o2 && t41 && n(s2, H2, t41), t41;
};
let a$2 = class a9 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$2.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
a$2.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M216,52H172V40a20,20,0,0,0-20-20H104A20,20,0,0,0,84,40V52H40a4,4,0,0,0,0,8H52V208a12,12,0,0,0,12,12H192a12,12,0,0,0,12-12V60h12a4,4,0,0,0,0-8ZM92,40a12,12,0,0,1,12-12h48a12,12,0,0,1,12,12V52H92ZM196,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V60H196ZM108,104v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Zm48,0v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Z"/>`
  ],
  [
    "light",
    tt`<path d="M216,50H174V40a22,22,0,0,0-22-22H104A22,22,0,0,0,82,40V50H40a6,6,0,0,0,0,12H50V208a14,14,0,0,0,14,14H192a14,14,0,0,0,14-14V62h10a6,6,0,0,0,0-12ZM94,40a10,10,0,0,1,10-10h48a10,10,0,0,1,10,10V50H94ZM194,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V62H194ZM110,104v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Zm48,0v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Z"/>`
  ],
  [
    "regular",
    tt`<path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z" opacity="0.2"/><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>`
  ]
]);
a$2.styles = p`
    :host {
      display: contents;
    }
  `;
h2([
  O({ type: String, reflect: true })
], a$2.prototype, "size", 2);
h2([
  O({ type: String, reflect: true })
], a$2.prototype, "weight", 2);
h2([
  O({ type: String, reflect: true })
], a$2.prototype, "color", 2);
h2([
  O({ type: Boolean, reflect: true })
], a$2.prototype, "mirrored", 2);
a$2 = h2([
  s$e("ph-trash")
], a$2);
const PhTrash = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhTrash() {
    return a$2;
  }
});
var u$1 = Object.defineProperty, M$1 = Object.getOwnPropertyDescriptor, a$1 = (s2, o2, l2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? M$1(o2, l2) : o2, h3 = s2.length - 1, c2; h3 >= 0; h3--)
    (c2 = s2[h3]) && (r2 = (i ? c2(o2, l2, r2) : c2(r2)) || r2);
  return i && r2 && u$1(o2, l2, r2), r2;
};
let t$3 = class t37 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var s2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$3.weightsMap.get((s2 = this.weight) != null ? s2 : "regular")}
    </svg>`;
  }
};
t$3.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M227.46,214c-16.52-28.56-43-48.06-73.68-55.09a68,68,0,1,0-51.56,0c-30.64,7-57.16,26.53-73.68,55.09a4,4,0,0,0,6.92,4C55,184.19,89.62,164,128,164s73,20.19,92.54,54a4,4,0,0,0,3.46,2,3.93,3.93,0,0,0,2-.54A4,4,0,0,0,227.46,214ZM68,96a60,60,0,1,1,60,60A60.07,60.07,0,0,1,68,96Z"/>`
  ],
  [
    "light",
    tt`<path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"/>`
  ],
  [
    "regular",
    tt`<path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>`
  ],
  [
    "bold",
    tt`<path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z"/>`
  ],
  [
    "fill",
    tt`<path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M192,96a64,64,0,1,1-64-64A64,64,0,0,1,192,96Z" opacity="0.2"/><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>`
  ]
]);
t$3.styles = p`
    :host {
      display: contents;
    }
  `;
a$1([
  O({ type: String, reflect: true })
], t$3.prototype, "size", 2);
a$1([
  O({ type: String, reflect: true })
], t$3.prototype, "weight", 2);
a$1([
  O({ type: String, reflect: true })
], t$3.prototype, "color", 2);
a$1([
  O({ type: Boolean, reflect: true })
], t$3.prototype, "mirrored", 2);
t$3 = a$1([
  s$e("ph-user")
], t$3);
const PhUser = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhUser() {
    return t$3;
  }
});
var c$1 = Object.defineProperty, f$2 = Object.getOwnPropertyDescriptor, o$3 = (r2, s2, l2, i) => {
  for (var a11 = i > 1 ? void 0 : i ? f$2(s2, l2) : s2, H2 = r2.length - 1, m2; H2 >= 0; H2--)
    (m2 = r2[H2]) && (a11 = (i ? m2(s2, l2, a11) : m2(a11)) || a11);
  return i && a11 && c$1(s2, l2, a11), a11;
};
let t$2 = class t38 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var r2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$2.weightsMap.get((r2 = this.weight) != null ? r2 : "regular")}
    </svg>`;
  }
};
t$2.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M216,68H56a12,12,0,0,1,0-24H192a4,4,0,0,0,0-8H56A20,20,0,0,0,36,56V184a20,20,0,0,0,20,20H216a12,12,0,0,0,12-12V80A12,12,0,0,0,216,68Zm4,124a4,4,0,0,1-4,4H56a12,12,0,0,1-12-12V72a19.86,19.86,0,0,0,12,4H216a4,4,0,0,1,4,4Zm-32-60a8,8,0,1,1-8-8A8,8,0,0,1,188,132Z"/>`
  ],
  [
    "light",
    tt`<path d="M216,66H56a10,10,0,0,1,0-20H192a6,6,0,0,0,0-12H56A22,22,0,0,0,34,56V184a22,22,0,0,0,22,22H216a14,14,0,0,0,14-14V80A14,14,0,0,0,216,66Zm2,126a2,2,0,0,1-2,2H56a10,10,0,0,1-10-10V75.59A21.84,21.84,0,0,0,56,78H216a2,2,0,0,1,2,2Zm-28-60a10,10,0,1,1-10-10A10,10,0,0,1,190,132Z"/>`
  ],
  [
    "regular",
    tt`<path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,128H56a8,8,0,0,1-8-8V78.63A23.84,23.84,0,0,0,56,80H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,132Z"/>`
  ],
  [
    "bold",
    tt`<path d="M196,136a16,16,0,1,1-16-16A16,16,0,0,1,196,136Zm40-36v80a32,32,0,0,1-32,32H60a32,32,0,0,1-32-32V60.92A32,32,0,0,1,60,28H192a12,12,0,0,1,0,24H60a8,8,0,0,0-8,8.26v.08A8.32,8.32,0,0,0,60.48,68H204A32,32,0,0,1,236,100Zm-24,0a8,8,0,0,0-8-8H60.48A33.72,33.72,0,0,1,52,90.92V180a8,8,0,0,0,8,8H204a8,8,0,0,0,8-8Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm-36,80a12,12,0,1,1,12-12A12,12,0,0,1,180,144Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,80V192a8,8,0,0,1-8,8H56a16,16,0,0,1-16-16V56A16,16,0,0,0,56,72H216A8,8,0,0,1,224,80Z" opacity="0.2"/><path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,128H56a8,8,0,0,1-8-8V78.63A23.84,23.84,0,0,0,56,80H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,132Z"/>`
  ]
]);
t$2.styles = p`
    :host {
      display: contents;
    }
  `;
o$3([
  O({ type: String, reflect: true })
], t$2.prototype, "size", 2);
o$3([
  O({ type: String, reflect: true })
], t$2.prototype, "weight", 2);
o$3([
  O({ type: String, reflect: true })
], t$2.prototype, "color", 2);
o$3([
  O({ type: Boolean, reflect: true })
], t$2.prototype, "mirrored", 2);
t$2 = o$3([
  s$e("ph-wallet")
], t$2);
const PhWallet = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhWallet() {
    return t$2;
  }
});
var M = Object.defineProperty, c = Object.getOwnPropertyDescriptor, o$2 = (e2, s2, p2, h3) => {
  for (var t41 = h3 > 1 ? void 0 : h3 ? c(s2, p2) : s2, l2 = e2.length - 1, m2; l2 >= 0; l2--)
    (m2 = e2[l2]) && (t41 = (h3 ? m2(s2, p2, t41) : m2(t41)) || t41);
  return h3 && t41 && M(s2, p2, t41), t41;
};
let a10 = class extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a10.weightsMap.get((e2 = this.weight) != null ? e2 : "regular")}
    </svg>`;
  }
};
a10.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M233.34,190.09,145.88,38.22h0a20.75,20.75,0,0,0-35.76,0L22.66,190.09a19.52,19.52,0,0,0,0,19.71A20.36,20.36,0,0,0,40.54,220H215.46a20.36,20.36,0,0,0,17.86-10.2A19.52,19.52,0,0,0,233.34,190.09ZM226.4,205.8a12.47,12.47,0,0,1-10.94,6.2H40.54a12.47,12.47,0,0,1-10.94-6.2,11.45,11.45,0,0,1,0-11.72L117.05,42.21a12.76,12.76,0,0,1,21.9,0L226.4,194.08A11.45,11.45,0,0,1,226.4,205.8ZM124,144V104a4,4,0,0,1,8,0v40a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,180Z"/>`
  ],
  [
    "light",
    tt`<path d="M235.07,189.09,147.61,37.22h0a22.75,22.75,0,0,0-39.22,0L20.93,189.09a21.53,21.53,0,0,0,0,21.72A22.35,22.35,0,0,0,40.55,222h174.9a22.35,22.35,0,0,0,19.6-11.19A21.53,21.53,0,0,0,235.07,189.09ZM224.66,204.8a10.46,10.46,0,0,1-9.21,5.2H40.55a10.46,10.46,0,0,1-9.21-5.2,9.51,9.51,0,0,1,0-9.72L118.79,43.21a10.75,10.75,0,0,1,18.42,0l87.46,151.87A9.51,9.51,0,0,1,224.66,204.8ZM122,144V104a6,6,0,0,1,12,0v40a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,180Z"/>`
  ],
  [
    "regular",
    tt`<path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"/>`
  ],
  [
    "bold",
    tt`<path d="M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z"/>`
  ],
  [
    "fill",
    tt`<path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22c6.3-11,22.52-11,28.82,0l87.46,151.87C236,202.79,228.08,216,215.46,216Z" opacity="0.2"/><path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"/>`
  ]
]);
a10.styles = p`
    :host {
      display: contents;
    }
  `;
o$2([
  O({ type: String, reflect: true })
], a10.prototype, "size", 2);
o$2([
  O({ type: String, reflect: true })
], a10.prototype, "weight", 2);
o$2([
  O({ type: String, reflect: true })
], a10.prototype, "color", 2);
o$2([
  O({ type: Boolean, reflect: true })
], a10.prototype, "mirrored", 2);
a10 = o$2([
  s$e("ph-warning")
], a10);
const PhWarning = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhWarning() {
    return a10;
  }
});
var f$1 = Object.defineProperty, A = Object.getOwnPropertyDescriptor, o$1 = (a11, s2, m2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? A(s2, m2) : s2, l2 = a11.length - 1, h3; l2 >= 0; l2--)
    (h3 = a11[l2]) && (r2 = (i ? h3(s2, m2, r2) : h3(r2)) || r2);
  return i && r2 && f$1(s2, m2, r2), r2;
};
let t$1 = class t39 extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$1.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t$1.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm-4-84V80a4,4,0,0,1,8,0v56a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,172Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm-6-82V80a6,6,0,0,1,12,0v56a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,172Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"/>`
  ]
]);
t$1.styles = p`
    :host {
      display: contents;
    }
  `;
o$1([
  O({ type: String, reflect: true })
], t$1.prototype, "size", 2);
o$1([
  O({ type: String, reflect: true })
], t$1.prototype, "weight", 2);
o$1([
  O({ type: String, reflect: true })
], t$1.prototype, "color", 2);
o$1([
  O({ type: Boolean, reflect: true })
], t$1.prototype, "mirrored", 2);
t$1 = o$1([
  s$e("ph-warning-circle")
], t$1);
const PhWarningCircle = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhWarningCircle() {
    return t$1;
  }
});
var f = Object.defineProperty, u = Object.getOwnPropertyDescriptor, o = (a11, s2, l2, i) => {
  for (var r2 = i > 1 ? void 0 : i ? u(s2, l2) : s2, h3 = a11.length - 1, L; h3 >= 0; h3--)
    (L = a11[h3]) && (r2 = (i ? L(s2, l2, r2) : L(r2)) || r2);
  return i && r2 && f(s2, l2, r2), r2;
};
let t40 = class extends n$8 {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a11;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t40.weightsMap.get((a11 = this.weight) != null ? a11 : "regular")}
    </svg>`;
  }
};
t40.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z" opacity="0.2"/><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>`
  ]
]);
t40.styles = p`
    :host {
      display: contents;
    }
  `;
o([
  O({ type: String, reflect: true })
], t40.prototype, "size", 2);
o([
  O({ type: String, reflect: true })
], t40.prototype, "weight", 2);
o([
  O({ type: String, reflect: true })
], t40.prototype, "color", 2);
o([
  O({ type: Boolean, reflect: true })
], t40.prototype, "mirrored", 2);
t40 = o([
  s$e("ph-x")
], t40);
const PhX = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get PhX() {
    return t40;
  }
});
export {
  PhVault as A,
  PhEnvelope as B,
  PhFunnelSimple as C,
  PhGlobe as D,
  PhIdentificationCard as E,
  PhImage as F,
  PhInfo as G,
  PhLightbulb as H,
  PhMagnifyingGlass as I,
  PhPaperPlaneRight as J,
  PhPlus as K,
  PhPower as L,
  PhPuzzlePiece as M,
  PhQrCode as N,
  PhQuestion as O,
  PhArrowCircleDown as P,
  PhQuestionMark as Q,
  PhSealCheck as R,
  PhSignOut as S,
  PhSpinner as T,
  PhTrash as U,
  PhUser as V,
  PhWallet as W,
  PhWarning as X,
  PhWarningCircle as Y,
  PhX as Z,
  PhArrowClockwise as a,
  PhArrowDown as b,
  PhArrowLeft as c,
  PhArrowRight as d,
  PhArrowSquareOut as e,
  PhArrowsDownUp as f,
  PhArrowsLeftRight as g,
  PhArrowUp as h,
  PhArrowUpRight as i,
  PhArrowsClockwise as j,
  PhBank as k,
  PhBrowser as l,
  PhCaretDown as m,
  PhCaretLeft as n,
  PhCaretRight as o,
  PhCaretUp as p,
  PhCheck as q,
  PhCircleHalf as r,
  PhClock as s,
  PhCompass as t,
  PhCopy as u,
  PhCreditCard as v,
  PhCurrencyDollar as w,
  PhDesktop as x,
  PhDeviceMobile as y,
  PhDotsThree as z
};
