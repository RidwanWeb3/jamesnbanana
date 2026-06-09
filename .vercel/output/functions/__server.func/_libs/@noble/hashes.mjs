import * as nc from "node:crypto";
import nc__default from "node:crypto";
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
const shrSH = (h, _l, s) => h >>> s;
const shrSL = (h, l, s) => h << 32 - s | l >>> s;
const rotrSH = (h, l, s) => h >>> s | l << 32 - s;
const rotrSL = (h, l, s) => h << 32 - s | l >>> s;
const rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
const rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
const crypto$1 = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
function isBytes$3(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber$1(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes$2(b, ...lengths) {
  if (!isBytes$3(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash$1(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber$1(h.outputLen);
  anumber$1(h.blockLen);
}
function aexists$2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput$2(out, instance) {
  abytes$2(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean$1(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView$3(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr$3(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
const swap32IfBE = isLE ? (u) => u : byteSwap32;
function utf8ToBytes$3(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes$3(data) {
  if (typeof data === "string")
    data = utf8ToBytes$3(data);
  abytes$2(data);
  return data;
}
function concatBytes$1(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes$2(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
let Hash$3 = class Hash {
};
function createHasher$1(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes$3(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes$1(bytesLength = 32) {
  if (crypto$1 && typeof crypto$1.getRandomValues === "function") {
    return crypto$1.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto$1 && typeof crypto$1.randomBytes === "function") {
    return Uint8Array.from(crypto$1.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _7n = BigInt(7);
const _256n = BigInt(256);
const _0x71n = BigInt(113);
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
const IOTAS = split(_SHA3_IOTA, true);
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
const rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
const rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean$1(B);
}
class Keccak extends Hash$3 {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber$1(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists$2(this);
    data = toBytes$3(data);
    abytes$2(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists$2(this, false);
    abytes$2(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    anumber$1(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    aoutput$2(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean$1(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
}
const gen = (suffix, blockLen, outputLen) => createHasher$1(() => new Keccak(blockLen, suffix, outputLen));
const keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
function setBigUint64$3(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function Chi$3(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj$3(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
let HashMD$3 = class HashMD extends Hash$3 {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView$3(this.buffer);
  }
  update(data) {
    aexists$2(this);
    data = toBytes$3(data);
    abytes$2(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView$3(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists$2(this);
    aoutput$2(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean$1(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64$3(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView$3(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
const SHA256_IV$3 = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA384_IV = /* @__PURE__ */ Uint32Array.from([
  3418070365,
  3238371032,
  1654270250,
  914150663,
  2438529370,
  812702999,
  355462360,
  4144912697,
  1731405415,
  4290775857,
  2394180231,
  1750603025,
  3675008525,
  1694076839,
  1203062813,
  3204075428
]);
const SHA512_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);
const SHA256_K$3 = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_W$3 = /* @__PURE__ */ new Uint32Array(64);
let SHA256$3 = class SHA256 extends HashMD$3 {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV$3[0] | 0;
    this.B = SHA256_IV$3[1] | 0;
    this.C = SHA256_IV$3[2] | 0;
    this.D = SHA256_IV$3[3] | 0;
    this.E = SHA256_IV$3[4] | 0;
    this.F = SHA256_IV$3[5] | 0;
    this.G = SHA256_IV$3[6] | 0;
    this.H = SHA256_IV$3[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W$3[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W$3[i - 15];
      const W2 = SHA256_W$3[i - 2];
      const s0 = rotr$3(W15, 7) ^ rotr$3(W15, 18) ^ W15 >>> 3;
      const s1 = rotr$3(W2, 17) ^ rotr$3(W2, 19) ^ W2 >>> 10;
      SHA256_W$3[i] = s1 + SHA256_W$3[i - 7] + s0 + SHA256_W$3[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr$3(E, 6) ^ rotr$3(E, 11) ^ rotr$3(E, 25);
      const T1 = H + sigma1 + Chi$3(E, F, G) + SHA256_K$3[i] + SHA256_W$3[i] | 0;
      const sigma0 = rotr$3(A, 2) ^ rotr$3(A, 13) ^ rotr$3(A, 22);
      const T2 = sigma0 + Maj$3(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean$1(SHA256_W$3);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean$1(this.buffer);
  }
};
const K512 = /* @__PURE__ */ (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
const SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
const SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
class SHA512 extends HashMD$3 {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV[0] | 0;
    this.Al = SHA512_IV[1] | 0;
    this.Bh = SHA512_IV[2] | 0;
    this.Bl = SHA512_IV[3] | 0;
    this.Ch = SHA512_IV[4] | 0;
    this.Cl = SHA512_IV[5] | 0;
    this.Dh = SHA512_IV[6] | 0;
    this.Dl = SHA512_IV[7] | 0;
    this.Eh = SHA512_IV[8] | 0;
    this.El = SHA512_IV[9] | 0;
    this.Fh = SHA512_IV[10] | 0;
    this.Fl = SHA512_IV[11] | 0;
    this.Gh = SHA512_IV[12] | 0;
    this.Gl = SHA512_IV[13] | 0;
    this.Hh = SHA512_IV[14] | 0;
    this.Hl = SHA512_IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean$1(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean$1(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class SHA384 extends SHA512 {
  constructor() {
    super(48);
    this.Ah = SHA384_IV[0] | 0;
    this.Al = SHA384_IV[1] | 0;
    this.Bh = SHA384_IV[2] | 0;
    this.Bl = SHA384_IV[3] | 0;
    this.Ch = SHA384_IV[4] | 0;
    this.Cl = SHA384_IV[5] | 0;
    this.Dh = SHA384_IV[6] | 0;
    this.Dl = SHA384_IV[7] | 0;
    this.Eh = SHA384_IV[8] | 0;
    this.El = SHA384_IV[9] | 0;
    this.Fh = SHA384_IV[10] | 0;
    this.Fl = SHA384_IV[11] | 0;
    this.Gh = SHA384_IV[12] | 0;
    this.Gl = SHA384_IV[13] | 0;
    this.Hh = SHA384_IV[14] | 0;
    this.Hl = SHA384_IV[15] | 0;
  }
}
const sha256$7 = /* @__PURE__ */ createHasher$1(() => new SHA256$3());
const sha512 = /* @__PURE__ */ createHasher$1(() => new SHA512());
const sha384 = /* @__PURE__ */ createHasher$1(() => new SHA384());
const sha256$6 = sha256$7;
let HMAC$1 = class HMAC extends Hash$3 {
  constructor(hash, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash$1(hash);
    const key = toBytes$3(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean$1(pad);
  }
  update(buf) {
    aexists$2(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists$2(this);
    abytes$2(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
const hmac$5 = (hash, key, message) => new HMAC$1(hash, key).update(message).digest();
hmac$5.create = (hash, key) => new HMAC$1(hash, key);
var ripemd160$1 = {};
var legacy$2 = {};
var _md$3 = {};
var utils$4 = {};
var cryptoNode$4 = {};
var hasRequiredCryptoNode$4;
function requireCryptoNode$4() {
  if (hasRequiredCryptoNode$4) return cryptoNode$4;
  hasRequiredCryptoNode$4 = 1;
  Object.defineProperty(cryptoNode$4, "__esModule", { value: true });
  cryptoNode$4.crypto = void 0;
  const nc2 = nc__default;
  cryptoNode$4.crypto = nc2 && typeof nc2 === "object" && "webcrypto" in nc2 ? nc2.webcrypto : nc2 && typeof nc2 === "object" && "randomBytes" in nc2 ? nc2 : void 0;
  return cryptoNode$4;
}
var hasRequiredUtils$4;
function requireUtils$4() {
  if (hasRequiredUtils$4) return utils$4;
  hasRequiredUtils$4 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
    exports.isBytes = isBytes2;
    exports.anumber = anumber2;
    exports.abytes = abytes2;
    exports.ahash = ahash2;
    exports.aexists = aexists2;
    exports.aoutput = aoutput2;
    exports.u8 = u8;
    exports.u32 = u322;
    exports.clean = clean2;
    exports.createView = createView2;
    exports.rotr = rotr2;
    exports.rotl = rotl;
    exports.byteSwap = byteSwap2;
    exports.byteSwap32 = byteSwap322;
    exports.bytesToHex = bytesToHex2;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes2;
    exports.bytesToUtf8 = bytesToUtf8;
    exports.toBytes = toBytes2;
    exports.kdfInputToBytes = kdfInputToBytes;
    exports.concatBytes = concatBytes2;
    exports.checkOpts = checkOpts;
    exports.createHasher = createHasher2;
    exports.createOptHasher = createOptHasher;
    exports.createXOFer = createXOFer;
    exports.randomBytes = randomBytes2;
    const crypto_1 = /* @__PURE__ */ requireCryptoNode$4();
    function isBytes2(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function anumber2(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes2(b, ...lengths) {
      if (!isBytes2(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash2(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      anumber2(h.outputLen);
      anumber2(h.blockLen);
    }
    function aexists2(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput2(out, instance) {
      abytes2(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u322(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean2(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView2(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function rotr2(word, shift) {
      return word << 32 - shift | word >>> shift;
    }
    function rotl(word, shift) {
      return word << shift | word >>> 32 - shift >>> 0;
    }
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    function byteSwap2(word) {
      return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    }
    exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap2(n);
    exports.byteSwapIfBE = exports.swap8IfBE;
    function byteSwap322(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap2(arr[i]);
      }
      return arr;
    }
    exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap322;
    const hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    const hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(bytes2) {
      abytes2(bytes2);
      if (hasHexBuiltin)
        return bytes2.toHex();
      let hex = "";
      for (let i = 0; i < bytes2.length; i++) {
        hex += hexes2[bytes2[i]];
      }
      return hex;
    }
    const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      if (hasHexBuiltin)
        return Uint8Array.fromHex(hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    const nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes2(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes2) {
      return new TextDecoder().decode(bytes2);
    }
    function toBytes2(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function kdfInputToBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function concatBytes2(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes2(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    class Hash5 {
    }
    exports.Hash = Hash5;
    function createHasher2(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function createOptHasher(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function createXOFer(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructor = createHasher2;
    exports.wrapConstructorWithOpts = createOptHasher;
    exports.wrapXOFConstructorWithOpts = createXOFer;
    function randomBytes2(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(utils$4);
  return utils$4;
}
var hasRequired_md$3;
function require_md$3() {
  if (hasRequired_md$3) return _md$3;
  hasRequired_md$3 = 1;
  Object.defineProperty(_md$3, "__esModule", { value: true });
  _md$3.SHA512_IV = _md$3.SHA384_IV = _md$3.SHA224_IV = _md$3.SHA256_IV = _md$3.HashMD = void 0;
  _md$3.setBigUint64 = setBigUint642;
  _md$3.Chi = Chi2;
  _md$3.Maj = Maj2;
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  function setBigUint642(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function Chi2(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj2(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  class HashMD5 extends utils_ts_1.Hash {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.buffer = new Uint8Array(blockLen);
      this.view = (0, utils_ts_1.createView)(this.buffer);
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const { view, buffer, blockLen } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = (0, utils_ts_1.createView)(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      (0, utils_ts_1.aexists)(this);
      (0, utils_ts_1.aoutput)(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      (0, utils_ts_1.clean)(this.buffer.subarray(pos));
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = (0, utils_ts_1.createView)(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.destroyed = destroyed;
      to.finished = finished;
      to.length = length;
      to.pos = pos;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
    clone() {
      return this._cloneInto();
    }
  }
  _md$3.HashMD = HashMD5;
  _md$3.SHA256_IV = Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  _md$3.SHA224_IV = Uint32Array.from([
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ]);
  _md$3.SHA384_IV = Uint32Array.from([
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ]);
  _md$3.SHA512_IV = Uint32Array.from([
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ]);
  return _md$3;
}
var hasRequiredLegacy$2;
function requireLegacy$2() {
  if (hasRequiredLegacy$2) return legacy$2;
  hasRequiredLegacy$2 = 1;
  Object.defineProperty(legacy$2, "__esModule", { value: true });
  legacy$2.ripemd160 = legacy$2.RIPEMD160 = legacy$2.md5 = legacy$2.MD5 = legacy$2.sha1 = legacy$2.SHA1 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md$3();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  const SHA1_IV = /* @__PURE__ */ Uint32Array.from([
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ]);
  const SHA1_W = /* @__PURE__ */ new Uint32Array(80);
  class SHA1 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 20, 8, false);
      this.A = SHA1_IV[0] | 0;
      this.B = SHA1_IV[1] | 0;
      this.C = SHA1_IV[2] | 0;
      this.D = SHA1_IV[3] | 0;
      this.E = SHA1_IV[4] | 0;
    }
    get() {
      const { A, B, C, D, E } = this;
      return [A, B, C, D, E];
    }
    set(A, B, C, D, E) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA1_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 80; i++)
        SHA1_W[i] = (0, utils_ts_1.rotl)(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
      let { A, B, C, D, E } = this;
      for (let i = 0; i < 80; i++) {
        let F, K2;
        if (i < 20) {
          F = (0, _md_ts_1.Chi)(B, C, D);
          K2 = 1518500249;
        } else if (i < 40) {
          F = B ^ C ^ D;
          K2 = 1859775393;
        } else if (i < 60) {
          F = (0, _md_ts_1.Maj)(B, C, D);
          K2 = 2400959708;
        } else {
          F = B ^ C ^ D;
          K2 = 3395469782;
        }
        const T = (0, utils_ts_1.rotl)(A, 5) + F + E + K2 + SHA1_W[i] | 0;
        E = D;
        D = C;
        C = (0, utils_ts_1.rotl)(B, 30);
        B = A;
        A = T;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      this.set(A, B, C, D, E);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA1_W);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  legacy$2.SHA1 = SHA1;
  legacy$2.sha1 = (0, utils_ts_1.createHasher)(() => new SHA1());
  const p32 = /* @__PURE__ */ Math.pow(2, 32);
  const K = /* @__PURE__ */ Array.from({ length: 64 }, (_, i) => Math.floor(p32 * Math.abs(Math.sin(i + 1))));
  const MD5_IV = /* @__PURE__ */ SHA1_IV.slice(0, 4);
  const MD5_W = /* @__PURE__ */ new Uint32Array(16);
  class MD5 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 16, 8, true);
      this.A = MD5_IV[0] | 0;
      this.B = MD5_IV[1] | 0;
      this.C = MD5_IV[2] | 0;
      this.D = MD5_IV[3] | 0;
    }
    get() {
      const { A, B, C, D } = this;
      return [A, B, C, D];
    }
    set(A, B, C, D) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        MD5_W[i] = view.getUint32(offset, true);
      let { A, B, C, D } = this;
      for (let i = 0; i < 64; i++) {
        let F, g, s;
        if (i < 16) {
          F = (0, _md_ts_1.Chi)(B, C, D);
          g = i;
          s = [7, 12, 17, 22];
        } else if (i < 32) {
          F = (0, _md_ts_1.Chi)(D, B, C);
          g = (5 * i + 1) % 16;
          s = [5, 9, 14, 20];
        } else if (i < 48) {
          F = B ^ C ^ D;
          g = (3 * i + 5) % 16;
          s = [4, 11, 16, 23];
        } else {
          F = C ^ (B | ~D);
          g = 7 * i % 16;
          s = [6, 10, 15, 21];
        }
        F = F + A + K[i] + MD5_W[g];
        A = D;
        D = C;
        C = B;
        B = B + (0, utils_ts_1.rotl)(F, s[i % 4]);
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      this.set(A, B, C, D);
    }
    roundClean() {
      (0, utils_ts_1.clean)(MD5_W);
    }
    destroy() {
      this.set(0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  legacy$2.MD5 = MD5;
  legacy$2.md5 = (0, utils_ts_1.createHasher)(() => new MD5());
  const Rho160 = /* @__PURE__ */ Uint8Array.from([
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8
  ]);
  const Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
  const Pi160 = /* @__PURE__ */ (() => Id160.map((i) => (9 * i + 5) % 16))();
  const idxLR = /* @__PURE__ */ (() => {
    const L = [Id160];
    const R = [Pi160];
    const res = [L, R];
    for (let i = 0; i < 4; i++)
      for (let j of res)
        j.push(j[i].map((k) => Rho160[k]));
    return res;
  })();
  const idxL = /* @__PURE__ */ (() => idxLR[0])();
  const idxR = /* @__PURE__ */ (() => idxLR[1])();
  const shifts160 = /* @__PURE__ */ [
    [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
    [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
    [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
    [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
    [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
  ].map((i) => Uint8Array.from(i));
  const shiftsL160 = /* @__PURE__ */ idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
  const shiftsR160 = /* @__PURE__ */ idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
  const Kl160 = /* @__PURE__ */ Uint32Array.from([
    0,
    1518500249,
    1859775393,
    2400959708,
    2840853838
  ]);
  const Kr160 = /* @__PURE__ */ Uint32Array.from([
    1352829926,
    1548603684,
    1836072691,
    2053994217,
    0
  ]);
  function ripemd_f(group, x, y, z) {
    if (group === 0)
      return x ^ y ^ z;
    if (group === 1)
      return x & y | ~x & z;
    if (group === 2)
      return (x | ~y) ^ z;
    if (group === 3)
      return x & z | y & ~z;
    return x ^ (y | ~z);
  }
  const BUF_160 = /* @__PURE__ */ new Uint32Array(16);
  class RIPEMD160 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 20, 8, true);
      this.h0 = 1732584193 | 0;
      this.h1 = 4023233417 | 0;
      this.h2 = 2562383102 | 0;
      this.h3 = 271733878 | 0;
      this.h4 = 3285377520 | 0;
    }
    get() {
      const { h0, h1, h2, h3, h4 } = this;
      return [h0, h1, h2, h3, h4];
    }
    set(h0, h1, h2, h3, h4) {
      this.h0 = h0 | 0;
      this.h1 = h1 | 0;
      this.h2 = h2 | 0;
      this.h3 = h3 | 0;
      this.h4 = h4 | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        BUF_160[i] = view.getUint32(offset, true);
      let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
      for (let group = 0; group < 5; group++) {
        const rGroup = 4 - group;
        const hbl = Kl160[group], hbr = Kr160[group];
        const rl = idxL[group], rr = idxR[group];
        const sl = shiftsL160[group], sr = shiftsR160[group];
        for (let i = 0; i < 16; i++) {
          const tl = (0, utils_ts_1.rotl)(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
          al = el, el = dl, dl = (0, utils_ts_1.rotl)(cl, 10) | 0, cl = bl, bl = tl;
        }
        for (let i = 0; i < 16; i++) {
          const tr = (0, utils_ts_1.rotl)(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
          ar = er, er = dr, dr = (0, utils_ts_1.rotl)(cr, 10) | 0, cr = br, br = tr;
        }
      }
      this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
    }
    roundClean() {
      (0, utils_ts_1.clean)(BUF_160);
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.buffer);
      this.set(0, 0, 0, 0, 0);
    }
  }
  legacy$2.RIPEMD160 = RIPEMD160;
  legacy$2.ripemd160 = (0, utils_ts_1.createHasher)(() => new RIPEMD160());
  return legacy$2;
}
var hasRequiredRipemd160$1;
function requireRipemd160$1() {
  if (hasRequiredRipemd160$1) return ripemd160$1;
  hasRequiredRipemd160$1 = 1;
  Object.defineProperty(ripemd160$1, "__esModule", { value: true });
  ripemd160$1.ripemd160 = ripemd160$1.RIPEMD160 = void 0;
  const legacy_ts_1 = /* @__PURE__ */ requireLegacy$2();
  ripemd160$1.RIPEMD160 = legacy_ts_1.RIPEMD160;
  ripemd160$1.ripemd160 = legacy_ts_1.ripemd160;
  return ripemd160$1;
}
var sha3$2 = {};
var _u64$4 = {};
var hasRequired_u64$4;
function require_u64$4() {
  if (hasRequired_u64$4) return _u64$4;
  hasRequired_u64$4 = 1;
  Object.defineProperty(_u64$4, "__esModule", { value: true });
  _u64$4.toBig = _u64$4.shrSL = _u64$4.shrSH = _u64$4.rotrSL = _u64$4.rotrSH = _u64$4.rotrBL = _u64$4.rotrBH = _u64$4.rotr32L = _u64$4.rotr32H = _u64$4.rotlSL = _u64$4.rotlSH = _u64$4.rotlBL = _u64$4.rotlBH = _u64$4.add5L = _u64$4.add5H = _u64$4.add4L = _u64$4.add4H = _u64$4.add3L = _u64$4.add3H = void 0;
  _u64$4.add = add2;
  _u64$4.fromBig = fromBig2;
  _u64$4.split = split2;
  const U32_MASK642 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  const _32n2 = /* @__PURE__ */ BigInt(32);
  function fromBig2(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
    return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
  }
  function split2(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for (let i = 0; i < len; i++) {
      const { h, l } = fromBig2(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  const toBig = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
  _u64$4.toBig = toBig;
  const shrSH2 = (h, _l, s) => h >>> s;
  _u64$4.shrSH = shrSH2;
  const shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$4.shrSL = shrSL2;
  const rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
  _u64$4.rotrSH = rotrSH2;
  const rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$4.rotrSL = rotrSL2;
  const rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
  _u64$4.rotrBH = rotrBH2;
  const rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
  _u64$4.rotrBL = rotrBL2;
  const rotr32H = (_h, l) => l;
  _u64$4.rotr32H = rotr32H;
  const rotr32L = (h, _l) => h;
  _u64$4.rotr32L = rotr32L;
  const rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
  _u64$4.rotlSH = rotlSH2;
  const rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
  _u64$4.rotlSL = rotlSL2;
  const rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
  _u64$4.rotlBH = rotlBH2;
  const rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
  _u64$4.rotlBL = rotlBL2;
  function add2(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  const add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  _u64$4.add3L = add3L2;
  const add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  _u64$4.add3H = add3H2;
  const add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  _u64$4.add4L = add4L2;
  const add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  _u64$4.add4H = add4H2;
  const add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  _u64$4.add5L = add5L2;
  const add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  _u64$4.add5H = add5H2;
  const u64 = {
    fromBig: fromBig2,
    split: split2,
    toBig,
    shrSH: shrSH2,
    shrSL: shrSL2,
    rotrSH: rotrSH2,
    rotrSL: rotrSL2,
    rotrBH: rotrBH2,
    rotrBL: rotrBL2,
    rotr32H,
    rotr32L,
    rotlSH: rotlSH2,
    rotlSL: rotlSL2,
    rotlBH: rotlBH2,
    rotlBL: rotlBL2,
    add: add2,
    add3L: add3L2,
    add3H: add3H2,
    add4L: add4L2,
    add4H: add4H2,
    add5H: add5H2,
    add5L: add5L2
  };
  _u64$4.default = u64;
  return _u64$4;
}
var hasRequiredSha3$2;
function requireSha3$2() {
  if (hasRequiredSha3$2) return sha3$2;
  hasRequiredSha3$2 = 1;
  Object.defineProperty(sha3$2, "__esModule", { value: true });
  sha3$2.shake256 = sha3$2.shake128 = sha3$2.keccak_512 = sha3$2.keccak_384 = sha3$2.keccak_256 = sha3$2.keccak_224 = sha3$2.sha3_512 = sha3$2.sha3_384 = sha3$2.sha3_256 = sha3$2.sha3_224 = sha3$2.Keccak = void 0;
  sha3$2.keccakP = keccakP2;
  const _u64_ts_1 = /* @__PURE__ */ require_u64$4();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  const _0n2 = BigInt(0);
  const _1n2 = BigInt(1);
  const _2n2 = BigInt(2);
  const _7n2 = BigInt(7);
  const _256n2 = BigInt(256);
  const _0x71n2 = BigInt(113);
  const SHA3_PI2 = [];
  const SHA3_ROTL2 = [];
  const _SHA3_IOTA2 = [];
  for (let round = 0, R = _1n2, x = 1, y = 0; round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI2.push(2 * (5 * y + x));
    SHA3_ROTL2.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n2;
    for (let j = 0; j < 7; j++) {
      R = (R << _1n2 ^ (R >> _7n2) * _0x71n2) % _256n2;
      if (R & _2n2)
        t ^= _1n2 << (_1n2 << /* @__PURE__ */ BigInt(j)) - _1n2;
    }
    _SHA3_IOTA2.push(t);
  }
  const IOTAS2 = (0, _u64_ts_1.split)(_SHA3_IOTA2, true);
  const SHA3_IOTA_H2 = IOTAS2[0];
  const SHA3_IOTA_L2 = IOTAS2[1];
  const rotlH2 = (h, l, s) => s > 32 ? (0, _u64_ts_1.rotlBH)(h, l, s) : (0, _u64_ts_1.rotlSH)(h, l, s);
  const rotlL2 = (h, l, s) => s > 32 ? (0, _u64_ts_1.rotlBL)(h, l, s) : (0, _u64_ts_1.rotlSL)(h, l, s);
  function keccakP2(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH2(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL2(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL2[t];
        const Th = rotlH2(curH, curL, shift);
        const Tl = rotlL2(curH, curL, shift);
        const PI = SHA3_PI2[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H2[round];
      s[1] ^= SHA3_IOTA_L2[round];
    }
    (0, utils_ts_1.clean)(B);
  }
  class Keccak2 extends utils_ts_1.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
      super();
      this.pos = 0;
      this.posOut = 0;
      this.finished = false;
      this.destroyed = false;
      this.enableXOF = false;
      this.blockLen = blockLen;
      this.suffix = suffix;
      this.outputLen = outputLen;
      this.enableXOF = enableXOF;
      this.rounds = rounds;
      (0, utils_ts_1.anumber)(outputLen);
      if (!(0 < blockLen && blockLen < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200);
      this.state32 = (0, utils_ts_1.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, utils_ts_1.swap32IfBE)(this.state32);
      keccakP2(this.state32, this.rounds);
      (0, utils_ts_1.swap32IfBE)(this.state32);
      this.posOut = 0;
      this.pos = 0;
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const { blockLen, state } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        for (let i = 0; i < take; i++)
          state[this.pos++] ^= data[pos++];
        if (this.pos === blockLen)
          this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      const { state, suffix, pos, blockLen } = this;
      state[pos] ^= suffix;
      if ((suffix & 128) !== 0 && pos === blockLen - 1)
        this.keccak();
      state[blockLen - 1] ^= 128;
      this.keccak();
    }
    writeInto(out) {
      (0, utils_ts_1.aexists)(this, false);
      (0, utils_ts_1.abytes)(out);
      this.finish();
      const bufferOut = this.state;
      const { blockLen } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.keccak();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(out);
    }
    xof(bytes2) {
      (0, utils_ts_1.anumber)(bytes2);
      return this.xofInto(new Uint8Array(bytes2));
    }
    digestInto(out) {
      (0, utils_ts_1.aoutput)(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.state);
    }
    _cloneInto(to) {
      const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
      to || (to = new Keccak2(blockLen, suffix, outputLen, enableXOF, rounds));
      to.state32.set(this.state32);
      to.pos = this.pos;
      to.posOut = this.posOut;
      to.finished = this.finished;
      to.rounds = rounds;
      to.suffix = suffix;
      to.outputLen = outputLen;
      to.enableXOF = enableXOF;
      to.destroyed = this.destroyed;
      return to;
    }
  }
  sha3$2.Keccak = Keccak2;
  const gen2 = (suffix, blockLen, outputLen) => (0, utils_ts_1.createHasher)(() => new Keccak2(blockLen, suffix, outputLen));
  sha3$2.sha3_224 = (() => gen2(6, 144, 224 / 8))();
  sha3$2.sha3_256 = (() => gen2(6, 136, 256 / 8))();
  sha3$2.sha3_384 = (() => gen2(6, 104, 384 / 8))();
  sha3$2.sha3_512 = (() => gen2(6, 72, 512 / 8))();
  sha3$2.keccak_224 = (() => gen2(1, 144, 224 / 8))();
  sha3$2.keccak_256 = (() => gen2(1, 136, 256 / 8))();
  sha3$2.keccak_384 = (() => gen2(1, 104, 384 / 8))();
  sha3$2.keccak_512 = (() => gen2(1, 72, 512 / 8))();
  const genShake = (suffix, blockLen, outputLen) => (0, utils_ts_1.createXOFer)((opts = {}) => new Keccak2(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
  sha3$2.shake128 = (() => genShake(31, 168, 128 / 8))();
  sha3$2.shake256 = (() => genShake(31, 136, 256 / 8))();
  return sha3$2;
}
var sha256$5 = {};
var sha2$3 = {};
var hasRequiredSha2$3;
function requireSha2$3() {
  if (hasRequiredSha2$3) return sha2$3;
  hasRequiredSha2$3 = 1;
  Object.defineProperty(sha2$3, "__esModule", { value: true });
  sha2$3.sha512_224 = sha2$3.sha512_256 = sha2$3.sha384 = sha2$3.sha512 = sha2$3.sha224 = sha2$3.sha256 = sha2$3.SHA512_256 = sha2$3.SHA512_224 = sha2$3.SHA384 = sha2$3.SHA512 = sha2$3.SHA224 = sha2$3.SHA256 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md$3();
  const u64 = /* @__PURE__ */ require_u64$4();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  const SHA256_K2 = /* @__PURE__ */ Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  const SHA256_W2 = /* @__PURE__ */ new Uint32Array(64);
  class SHA2565 extends _md_ts_1.HashMD {
    constructor(outputLen = 32) {
      super(64, outputLen, 8, false);
      this.A = _md_ts_1.SHA256_IV[0] | 0;
      this.B = _md_ts_1.SHA256_IV[1] | 0;
      this.C = _md_ts_1.SHA256_IV[2] | 0;
      this.D = _md_ts_1.SHA256_IV[3] | 0;
      this.E = _md_ts_1.SHA256_IV[4] | 0;
      this.F = _md_ts_1.SHA256_IV[5] | 0;
      this.G = _md_ts_1.SHA256_IV[6] | 0;
      this.H = _md_ts_1.SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W2[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W2[i - 15];
        const W2 = SHA256_W2[i - 2];
        const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
        const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
        SHA256_W2[i] = s1 + SHA256_W2[i - 7] + s0 + SHA256_W2[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
        const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K2[i] + SHA256_W2[i] | 0;
        const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
        const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA256_W2);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  sha2$3.SHA256 = SHA2565;
  class SHA224 extends SHA2565 {
    constructor() {
      super(28);
      this.A = _md_ts_1.SHA224_IV[0] | 0;
      this.B = _md_ts_1.SHA224_IV[1] | 0;
      this.C = _md_ts_1.SHA224_IV[2] | 0;
      this.D = _md_ts_1.SHA224_IV[3] | 0;
      this.E = _md_ts_1.SHA224_IV[4] | 0;
      this.F = _md_ts_1.SHA224_IV[5] | 0;
      this.G = _md_ts_1.SHA224_IV[6] | 0;
      this.H = _md_ts_1.SHA224_IV[7] | 0;
    }
  }
  sha2$3.SHA224 = SHA224;
  const K5122 = /* @__PURE__ */ (() => u64.split([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
  ].map((n) => BigInt(n))))();
  const SHA512_Kh2 = /* @__PURE__ */ (() => K5122[0])();
  const SHA512_Kl2 = /* @__PURE__ */ (() => K5122[1])();
  const SHA512_W_H2 = /* @__PURE__ */ new Uint32Array(80);
  const SHA512_W_L2 = /* @__PURE__ */ new Uint32Array(80);
  class SHA5122 extends _md_ts_1.HashMD {
    constructor(outputLen = 64) {
      super(128, outputLen, 16, false);
      this.Ah = _md_ts_1.SHA512_IV[0] | 0;
      this.Al = _md_ts_1.SHA512_IV[1] | 0;
      this.Bh = _md_ts_1.SHA512_IV[2] | 0;
      this.Bl = _md_ts_1.SHA512_IV[3] | 0;
      this.Ch = _md_ts_1.SHA512_IV[4] | 0;
      this.Cl = _md_ts_1.SHA512_IV[5] | 0;
      this.Dh = _md_ts_1.SHA512_IV[6] | 0;
      this.Dl = _md_ts_1.SHA512_IV[7] | 0;
      this.Eh = _md_ts_1.SHA512_IV[8] | 0;
      this.El = _md_ts_1.SHA512_IV[9] | 0;
      this.Fh = _md_ts_1.SHA512_IV[10] | 0;
      this.Fl = _md_ts_1.SHA512_IV[11] | 0;
      this.Gh = _md_ts_1.SHA512_IV[12] | 0;
      this.Gl = _md_ts_1.SHA512_IV[13] | 0;
      this.Hh = _md_ts_1.SHA512_IV[14] | 0;
      this.Hl = _md_ts_1.SHA512_IV[15] | 0;
    }
    // prettier-ignore
    get() {
      const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
      this.Ah = Ah | 0;
      this.Al = Al | 0;
      this.Bh = Bh | 0;
      this.Bl = Bl | 0;
      this.Ch = Ch | 0;
      this.Cl = Cl | 0;
      this.Dh = Dh | 0;
      this.Dl = Dl | 0;
      this.Eh = Eh | 0;
      this.El = El | 0;
      this.Fh = Fh | 0;
      this.Fl = Fl | 0;
      this.Gh = Gh | 0;
      this.Gl = Gl | 0;
      this.Hh = Hh | 0;
      this.Hl = Hl | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4) {
        SHA512_W_H2[i] = view.getUint32(offset);
        SHA512_W_L2[i] = view.getUint32(offset += 4);
      }
      for (let i = 16; i < 80; i++) {
        const W15h = SHA512_W_H2[i - 15] | 0;
        const W15l = SHA512_W_L2[i - 15] | 0;
        const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
        const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
        const W2h = SHA512_W_H2[i - 2] | 0;
        const W2l = SHA512_W_L2[i - 2] | 0;
        const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
        const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
        const SUMl = u64.add4L(s0l, s1l, SHA512_W_L2[i - 7], SHA512_W_L2[i - 16]);
        const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H2[i - 7], SHA512_W_H2[i - 16]);
        SHA512_W_H2[i] = SUMh | 0;
        SHA512_W_L2[i] = SUMl | 0;
      }
      let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      for (let i = 0; i < 80; i++) {
        const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
        const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
        const CHIh = Eh & Fh ^ ~Eh & Gh;
        const CHIl = El & Fl ^ ~El & Gl;
        const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl2[i], SHA512_W_L2[i]);
        const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh2[i], SHA512_W_H2[i]);
        const T1l = T1ll | 0;
        const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
        const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
        const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
        const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
        Hh = Gh | 0;
        Hl = Gl | 0;
        Gh = Fh | 0;
        Gl = Fl | 0;
        Fh = Eh | 0;
        Fl = El | 0;
        ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
        Dh = Ch | 0;
        Dl = Cl | 0;
        Ch = Bh | 0;
        Cl = Bl | 0;
        Bh = Ah | 0;
        Bl = Al | 0;
        const All = u64.add3L(T1l, sigma0l, MAJl);
        Ah = u64.add3H(All, T1h, sigma0h, MAJh);
        Al = All | 0;
      }
      ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
      ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
      ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
      ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
      ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
      ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
      ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
      ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
      this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA512_W_H2, SHA512_W_L2);
    }
    destroy() {
      (0, utils_ts_1.clean)(this.buffer);
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  sha2$3.SHA512 = SHA5122;
  class SHA3842 extends SHA5122 {
    constructor() {
      super(48);
      this.Ah = _md_ts_1.SHA384_IV[0] | 0;
      this.Al = _md_ts_1.SHA384_IV[1] | 0;
      this.Bh = _md_ts_1.SHA384_IV[2] | 0;
      this.Bl = _md_ts_1.SHA384_IV[3] | 0;
      this.Ch = _md_ts_1.SHA384_IV[4] | 0;
      this.Cl = _md_ts_1.SHA384_IV[5] | 0;
      this.Dh = _md_ts_1.SHA384_IV[6] | 0;
      this.Dl = _md_ts_1.SHA384_IV[7] | 0;
      this.Eh = _md_ts_1.SHA384_IV[8] | 0;
      this.El = _md_ts_1.SHA384_IV[9] | 0;
      this.Fh = _md_ts_1.SHA384_IV[10] | 0;
      this.Fl = _md_ts_1.SHA384_IV[11] | 0;
      this.Gh = _md_ts_1.SHA384_IV[12] | 0;
      this.Gl = _md_ts_1.SHA384_IV[13] | 0;
      this.Hh = _md_ts_1.SHA384_IV[14] | 0;
      this.Hl = _md_ts_1.SHA384_IV[15] | 0;
    }
  }
  sha2$3.SHA384 = SHA3842;
  const T224_IV = /* @__PURE__ */ Uint32Array.from([
    2352822216,
    424955298,
    1944164710,
    2312950998,
    502970286,
    855612546,
    1738396948,
    1479516111,
    258812777,
    2077511080,
    2011393907,
    79989058,
    1067287976,
    1780299464,
    286451373,
    2446758561
  ]);
  const T256_IV = /* @__PURE__ */ Uint32Array.from([
    573645204,
    4230739756,
    2673172387,
    3360449730,
    596883563,
    1867755857,
    2520282905,
    1497426621,
    2519219938,
    2827943907,
    3193839141,
    1401305490,
    721525244,
    746961066,
    246885852,
    2177182882
  ]);
  class SHA512_224 extends SHA5122 {
    constructor() {
      super(28);
      this.Ah = T224_IV[0] | 0;
      this.Al = T224_IV[1] | 0;
      this.Bh = T224_IV[2] | 0;
      this.Bl = T224_IV[3] | 0;
      this.Ch = T224_IV[4] | 0;
      this.Cl = T224_IV[5] | 0;
      this.Dh = T224_IV[6] | 0;
      this.Dl = T224_IV[7] | 0;
      this.Eh = T224_IV[8] | 0;
      this.El = T224_IV[9] | 0;
      this.Fh = T224_IV[10] | 0;
      this.Fl = T224_IV[11] | 0;
      this.Gh = T224_IV[12] | 0;
      this.Gl = T224_IV[13] | 0;
      this.Hh = T224_IV[14] | 0;
      this.Hl = T224_IV[15] | 0;
    }
  }
  sha2$3.SHA512_224 = SHA512_224;
  class SHA512_256 extends SHA5122 {
    constructor() {
      super(32);
      this.Ah = T256_IV[0] | 0;
      this.Al = T256_IV[1] | 0;
      this.Bh = T256_IV[2] | 0;
      this.Bl = T256_IV[3] | 0;
      this.Ch = T256_IV[4] | 0;
      this.Cl = T256_IV[5] | 0;
      this.Dh = T256_IV[6] | 0;
      this.Dl = T256_IV[7] | 0;
      this.Eh = T256_IV[8] | 0;
      this.El = T256_IV[9] | 0;
      this.Fh = T256_IV[10] | 0;
      this.Fl = T256_IV[11] | 0;
      this.Gh = T256_IV[12] | 0;
      this.Gl = T256_IV[13] | 0;
      this.Hh = T256_IV[14] | 0;
      this.Hl = T256_IV[15] | 0;
    }
  }
  sha2$3.SHA512_256 = SHA512_256;
  sha2$3.sha256 = (0, utils_ts_1.createHasher)(() => new SHA2565());
  sha2$3.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
  sha2$3.sha512 = (0, utils_ts_1.createHasher)(() => new SHA5122());
  sha2$3.sha384 = (0, utils_ts_1.createHasher)(() => new SHA3842());
  sha2$3.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
  sha2$3.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
  return sha2$3;
}
var hasRequiredSha256$1;
function requireSha256$1() {
  if (hasRequiredSha256$1) return sha256$5;
  hasRequiredSha256$1 = 1;
  Object.defineProperty(sha256$5, "__esModule", { value: true });
  sha256$5.sha224 = sha256$5.SHA224 = sha256$5.sha256 = sha256$5.SHA256 = void 0;
  const sha2_ts_1 = /* @__PURE__ */ requireSha2$3();
  sha256$5.SHA256 = sha2_ts_1.SHA256;
  sha256$5.sha256 = sha2_ts_1.sha256;
  sha256$5.SHA224 = sha2_ts_1.SHA224;
  sha256$5.sha224 = sha2_ts_1.sha224;
  return sha256$5;
}
var hmac$4 = {};
var hasRequiredHmac$3;
function requireHmac$3() {
  if (hasRequiredHmac$3) return hmac$4;
  hasRequiredHmac$3 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac = exports.HMAC = void 0;
    const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
    class HMAC3 extends utils_ts_1.Hash {
      constructor(hash, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        (0, utils_ts_1.ahash)(hash);
        const key = (0, utils_ts_1.toBytes)(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54;
        this.iHash.update(pad);
        this.oHash = hash.create();
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54 ^ 92;
        this.oHash.update(pad);
        (0, utils_ts_1.clean)(pad);
      }
      update(buf) {
        (0, utils_ts_1.aexists)(this);
        this.iHash.update(buf);
        return this;
      }
      digestInto(out) {
        (0, utils_ts_1.aexists)(this);
        (0, utils_ts_1.abytes)(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
      }
      digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
      }
      _cloneInto(to) {
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
      }
    }
    exports.HMAC = HMAC3;
    const hmac2 = (hash, key, message) => new HMAC3(hash, key).update(message).digest();
    exports.hmac = hmac2;
    exports.hmac.create = (hash, key) => new HMAC3(hash, key);
  })(hmac$4);
  return hmac$4;
}
var blake3 = {};
var blake2 = {};
var _blake = {};
var hasRequired_blake;
function require_blake() {
  if (hasRequired_blake) return _blake;
  hasRequired_blake = 1;
  Object.defineProperty(_blake, "__esModule", { value: true });
  _blake.BSIGMA = void 0;
  _blake.G1s = G1s;
  _blake.G2s = G2s;
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  _blake.BSIGMA = Uint8Array.from([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9,
    12,
    5,
    1,
    15,
    14,
    13,
    4,
    10,
    0,
    7,
    6,
    3,
    9,
    2,
    8,
    11,
    13,
    11,
    7,
    14,
    12,
    1,
    3,
    9,
    5,
    0,
    15,
    4,
    8,
    6,
    2,
    10,
    6,
    15,
    14,
    9,
    11,
    3,
    0,
    8,
    12,
    2,
    13,
    7,
    1,
    4,
    10,
    5,
    10,
    2,
    8,
    4,
    7,
    6,
    1,
    5,
    15,
    11,
    9,
    14,
    3,
    12,
    13,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    // Blake1, unused in others
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9
  ]);
  function G1s(a, b, c, d, x) {
    a = a + b + x | 0;
    d = (0, utils_ts_1.rotr)(d ^ a, 16);
    c = c + d | 0;
    b = (0, utils_ts_1.rotr)(b ^ c, 12);
    return { a, b, c, d };
  }
  function G2s(a, b, c, d, x) {
    a = a + b + x | 0;
    d = (0, utils_ts_1.rotr)(d ^ a, 8);
    c = c + d | 0;
    b = (0, utils_ts_1.rotr)(b ^ c, 7);
    return { a, b, c, d };
  }
  return _blake;
}
var hasRequiredBlake2;
function requireBlake2() {
  if (hasRequiredBlake2) return blake2;
  hasRequiredBlake2 = 1;
  Object.defineProperty(blake2, "__esModule", { value: true });
  blake2.blake2s = blake2.BLAKE2s = blake2.blake2b = blake2.BLAKE2b = blake2.BLAKE2 = void 0;
  blake2.compress = compress;
  const _blake_ts_1 = /* @__PURE__ */ require_blake();
  const _md_ts_1 = /* @__PURE__ */ require_md$3();
  const u64 = /* @__PURE__ */ require_u64$4();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  const B2B_IV = /* @__PURE__ */ Uint32Array.from([
    4089235720,
    1779033703,
    2227873595,
    3144134277,
    4271175723,
    1013904242,
    1595750129,
    2773480762,
    2917565137,
    1359893119,
    725511199,
    2600822924,
    4215389547,
    528734635,
    327033209,
    1541459225
  ]);
  const BBUF = /* @__PURE__ */ new Uint32Array(32);
  function G1b(a, b, c, d, msg, x) {
    const Xl = msg[x], Xh = msg[x + 1];
    let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
    let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
    let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
    let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
    let ll = u64.add3L(Al, Bl, Xl);
    Ah = u64.add3H(ll, Ah, Bh, Xh);
    Al = ll | 0;
    ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
    ({ Dh, Dl } = { Dh: u64.rotr32H(Dh, Dl), Dl: u64.rotr32L(Dh, Dl) });
    ({ h: Ch, l: Cl } = u64.add(Ch, Cl, Dh, Dl));
    ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
    ({ Bh, Bl } = { Bh: u64.rotrSH(Bh, Bl, 24), Bl: u64.rotrSL(Bh, Bl, 24) });
    BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
    BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
    BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
    BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
  }
  function G2b(a, b, c, d, msg, x) {
    const Xl = msg[x], Xh = msg[x + 1];
    let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
    let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
    let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
    let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
    let ll = u64.add3L(Al, Bl, Xl);
    Ah = u64.add3H(ll, Ah, Bh, Xh);
    Al = ll | 0;
    ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
    ({ Dh, Dl } = { Dh: u64.rotrSH(Dh, Dl, 16), Dl: u64.rotrSL(Dh, Dl, 16) });
    ({ h: Ch, l: Cl } = u64.add(Ch, Cl, Dh, Dl));
    ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
    ({ Bh, Bl } = { Bh: u64.rotrBH(Bh, Bl, 63), Bl: u64.rotrBL(Bh, Bl, 63) });
    BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
    BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
    BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
    BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
  }
  function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
    (0, utils_ts_1.anumber)(keyLen);
    if (outputLen < 0 || outputLen > keyLen)
      throw new Error("outputLen bigger than keyLen");
    const { key, salt, personalization } = opts;
    if (key !== void 0 && (key.length < 1 || key.length > keyLen))
      throw new Error("key length must be undefined or 1.." + keyLen);
    if (salt !== void 0 && salt.length !== saltLen)
      throw new Error("salt must be undefined or " + saltLen);
    if (personalization !== void 0 && personalization.length !== persLen)
      throw new Error("personalization must be undefined or " + persLen);
  }
  class BLAKE2 extends utils_ts_1.Hash {
    constructor(blockLen, outputLen) {
      super();
      this.finished = false;
      this.destroyed = false;
      this.length = 0;
      this.pos = 0;
      (0, utils_ts_1.anumber)(blockLen);
      (0, utils_ts_1.anumber)(outputLen);
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.buffer = new Uint8Array(blockLen);
      this.buffer32 = (0, utils_ts_1.u32)(this.buffer);
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const { blockLen, buffer, buffer32 } = this;
      const len = data.length;
      const offset = data.byteOffset;
      const buf = data.buffer;
      for (let pos = 0; pos < len; ) {
        if (this.pos === blockLen) {
          (0, utils_ts_1.swap32IfBE)(buffer32);
          this.compress(buffer32, 0, false);
          (0, utils_ts_1.swap32IfBE)(buffer32);
          this.pos = 0;
        }
        const take = Math.min(blockLen - this.pos, len - pos);
        const dataOffset = offset + pos;
        if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
          const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
          (0, utils_ts_1.swap32IfBE)(data32);
          for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
            this.length += blockLen;
            this.compress(data32, pos32, false);
          }
          (0, utils_ts_1.swap32IfBE)(data32);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        this.length += take;
        pos += take;
      }
      return this;
    }
    digestInto(out) {
      (0, utils_ts_1.aexists)(this);
      (0, utils_ts_1.aoutput)(out, this);
      const { pos, buffer32 } = this;
      this.finished = true;
      (0, utils_ts_1.clean)(this.buffer.subarray(pos));
      (0, utils_ts_1.swap32IfBE)(buffer32);
      this.compress(buffer32, 0, true);
      (0, utils_ts_1.swap32IfBE)(buffer32);
      const out32 = (0, utils_ts_1.u32)(out);
      this.get().forEach((v, i) => out32[i] = (0, utils_ts_1.swap8IfBE)(v));
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      const { buffer, length, finished, destroyed, outputLen, pos } = this;
      to || (to = new this.constructor({ dkLen: outputLen }));
      to.set(...this.get());
      to.buffer.set(buffer);
      to.destroyed = destroyed;
      to.finished = finished;
      to.length = length;
      to.pos = pos;
      to.outputLen = outputLen;
      return to;
    }
    clone() {
      return this._cloneInto();
    }
  }
  blake2.BLAKE2 = BLAKE2;
  class BLAKE2b extends BLAKE2 {
    constructor(opts = {}) {
      const olen = opts.dkLen === void 0 ? 64 : opts.dkLen;
      super(128, olen);
      this.v0l = B2B_IV[0] | 0;
      this.v0h = B2B_IV[1] | 0;
      this.v1l = B2B_IV[2] | 0;
      this.v1h = B2B_IV[3] | 0;
      this.v2l = B2B_IV[4] | 0;
      this.v2h = B2B_IV[5] | 0;
      this.v3l = B2B_IV[6] | 0;
      this.v3h = B2B_IV[7] | 0;
      this.v4l = B2B_IV[8] | 0;
      this.v4h = B2B_IV[9] | 0;
      this.v5l = B2B_IV[10] | 0;
      this.v5h = B2B_IV[11] | 0;
      this.v6l = B2B_IV[12] | 0;
      this.v6h = B2B_IV[13] | 0;
      this.v7l = B2B_IV[14] | 0;
      this.v7h = B2B_IV[15] | 0;
      checkBlake2Opts(olen, opts, 64, 16, 16);
      let { key, personalization, salt } = opts;
      let keyLength = 0;
      if (key !== void 0) {
        key = (0, utils_ts_1.toBytes)(key);
        keyLength = key.length;
      }
      this.v0l ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
      if (salt !== void 0) {
        salt = (0, utils_ts_1.toBytes)(salt);
        const slt = (0, utils_ts_1.u32)(salt);
        this.v4l ^= (0, utils_ts_1.swap8IfBE)(slt[0]);
        this.v4h ^= (0, utils_ts_1.swap8IfBE)(slt[1]);
        this.v5l ^= (0, utils_ts_1.swap8IfBE)(slt[2]);
        this.v5h ^= (0, utils_ts_1.swap8IfBE)(slt[3]);
      }
      if (personalization !== void 0) {
        personalization = (0, utils_ts_1.toBytes)(personalization);
        const pers = (0, utils_ts_1.u32)(personalization);
        this.v6l ^= (0, utils_ts_1.swap8IfBE)(pers[0]);
        this.v6h ^= (0, utils_ts_1.swap8IfBE)(pers[1]);
        this.v7l ^= (0, utils_ts_1.swap8IfBE)(pers[2]);
        this.v7h ^= (0, utils_ts_1.swap8IfBE)(pers[3]);
      }
      if (key !== void 0) {
        const tmp = new Uint8Array(this.blockLen);
        tmp.set(key);
        this.update(tmp);
      }
    }
    // prettier-ignore
    get() {
      let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
      return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
    }
    // prettier-ignore
    set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
      this.v0l = v0l | 0;
      this.v0h = v0h | 0;
      this.v1l = v1l | 0;
      this.v1h = v1h | 0;
      this.v2l = v2l | 0;
      this.v2h = v2h | 0;
      this.v3l = v3l | 0;
      this.v3h = v3h | 0;
      this.v4l = v4l | 0;
      this.v4h = v4h | 0;
      this.v5l = v5l | 0;
      this.v5h = v5h | 0;
      this.v6l = v6l | 0;
      this.v6h = v6h | 0;
      this.v7l = v7l | 0;
      this.v7h = v7h | 0;
    }
    compress(msg, offset, isLast) {
      this.get().forEach((v, i) => BBUF[i] = v);
      BBUF.set(B2B_IV, 16);
      let { h, l } = u64.fromBig(BigInt(this.length));
      BBUF[24] = B2B_IV[8] ^ l;
      BBUF[25] = B2B_IV[9] ^ h;
      if (isLast) {
        BBUF[28] = ~BBUF[28];
        BBUF[29] = ~BBUF[29];
      }
      let j = 0;
      const s = _blake_ts_1.BSIGMA;
      for (let i = 0; i < 12; i++) {
        G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
        G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
        G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
        G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
        G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
        G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
        G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
        G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
        G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
        G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
        G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
        G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
        G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
        G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
        G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
        G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
      }
      this.v0l ^= BBUF[0] ^ BBUF[16];
      this.v0h ^= BBUF[1] ^ BBUF[17];
      this.v1l ^= BBUF[2] ^ BBUF[18];
      this.v1h ^= BBUF[3] ^ BBUF[19];
      this.v2l ^= BBUF[4] ^ BBUF[20];
      this.v2h ^= BBUF[5] ^ BBUF[21];
      this.v3l ^= BBUF[6] ^ BBUF[22];
      this.v3h ^= BBUF[7] ^ BBUF[23];
      this.v4l ^= BBUF[8] ^ BBUF[24];
      this.v4h ^= BBUF[9] ^ BBUF[25];
      this.v5l ^= BBUF[10] ^ BBUF[26];
      this.v5h ^= BBUF[11] ^ BBUF[27];
      this.v6l ^= BBUF[12] ^ BBUF[28];
      this.v6h ^= BBUF[13] ^ BBUF[29];
      this.v7l ^= BBUF[14] ^ BBUF[30];
      this.v7h ^= BBUF[15] ^ BBUF[31];
      (0, utils_ts_1.clean)(BBUF);
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.buffer32);
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  blake2.BLAKE2b = BLAKE2b;
  blake2.blake2b = (0, utils_ts_1.createOptHasher)((opts) => new BLAKE2b(opts));
  function compress(s, offset, msg, rounds, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
    let j = 0;
    for (let i = 0; i < rounds; i++) {
      ({ a: v0, b: v4, c: v8, d: v12 } = (0, _blake_ts_1.G1s)(v0, v4, v8, v12, msg[offset + s[j++]]));
      ({ a: v0, b: v4, c: v8, d: v12 } = (0, _blake_ts_1.G2s)(v0, v4, v8, v12, msg[offset + s[j++]]));
      ({ a: v1, b: v5, c: v9, d: v13 } = (0, _blake_ts_1.G1s)(v1, v5, v9, v13, msg[offset + s[j++]]));
      ({ a: v1, b: v5, c: v9, d: v13 } = (0, _blake_ts_1.G2s)(v1, v5, v9, v13, msg[offset + s[j++]]));
      ({ a: v2, b: v6, c: v10, d: v14 } = (0, _blake_ts_1.G1s)(v2, v6, v10, v14, msg[offset + s[j++]]));
      ({ a: v2, b: v6, c: v10, d: v14 } = (0, _blake_ts_1.G2s)(v2, v6, v10, v14, msg[offset + s[j++]]));
      ({ a: v3, b: v7, c: v11, d: v15 } = (0, _blake_ts_1.G1s)(v3, v7, v11, v15, msg[offset + s[j++]]));
      ({ a: v3, b: v7, c: v11, d: v15 } = (0, _blake_ts_1.G2s)(v3, v7, v11, v15, msg[offset + s[j++]]));
      ({ a: v0, b: v5, c: v10, d: v15 } = (0, _blake_ts_1.G1s)(v0, v5, v10, v15, msg[offset + s[j++]]));
      ({ a: v0, b: v5, c: v10, d: v15 } = (0, _blake_ts_1.G2s)(v0, v5, v10, v15, msg[offset + s[j++]]));
      ({ a: v1, b: v6, c: v11, d: v12 } = (0, _blake_ts_1.G1s)(v1, v6, v11, v12, msg[offset + s[j++]]));
      ({ a: v1, b: v6, c: v11, d: v12 } = (0, _blake_ts_1.G2s)(v1, v6, v11, v12, msg[offset + s[j++]]));
      ({ a: v2, b: v7, c: v8, d: v13 } = (0, _blake_ts_1.G1s)(v2, v7, v8, v13, msg[offset + s[j++]]));
      ({ a: v2, b: v7, c: v8, d: v13 } = (0, _blake_ts_1.G2s)(v2, v7, v8, v13, msg[offset + s[j++]]));
      ({ a: v3, b: v4, c: v9, d: v14 } = (0, _blake_ts_1.G1s)(v3, v4, v9, v14, msg[offset + s[j++]]));
      ({ a: v3, b: v4, c: v9, d: v14 } = (0, _blake_ts_1.G2s)(v3, v4, v9, v14, msg[offset + s[j++]]));
    }
    return { v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15 };
  }
  const B2S_IV = _md_ts_1.SHA256_IV;
  class BLAKE2s extends BLAKE2 {
    constructor(opts = {}) {
      const olen = opts.dkLen === void 0 ? 32 : opts.dkLen;
      super(64, olen);
      this.v0 = B2S_IV[0] | 0;
      this.v1 = B2S_IV[1] | 0;
      this.v2 = B2S_IV[2] | 0;
      this.v3 = B2S_IV[3] | 0;
      this.v4 = B2S_IV[4] | 0;
      this.v5 = B2S_IV[5] | 0;
      this.v6 = B2S_IV[6] | 0;
      this.v7 = B2S_IV[7] | 0;
      checkBlake2Opts(olen, opts, 32, 8, 8);
      let { key, personalization, salt } = opts;
      let keyLength = 0;
      if (key !== void 0) {
        key = (0, utils_ts_1.toBytes)(key);
        keyLength = key.length;
      }
      this.v0 ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
      if (salt !== void 0) {
        salt = (0, utils_ts_1.toBytes)(salt);
        const slt = (0, utils_ts_1.u32)(salt);
        this.v4 ^= (0, utils_ts_1.swap8IfBE)(slt[0]);
        this.v5 ^= (0, utils_ts_1.swap8IfBE)(slt[1]);
      }
      if (personalization !== void 0) {
        personalization = (0, utils_ts_1.toBytes)(personalization);
        const pers = (0, utils_ts_1.u32)(personalization);
        this.v6 ^= (0, utils_ts_1.swap8IfBE)(pers[0]);
        this.v7 ^= (0, utils_ts_1.swap8IfBE)(pers[1]);
      }
      if (key !== void 0) {
        (0, utils_ts_1.abytes)(key);
        const tmp = new Uint8Array(this.blockLen);
        tmp.set(key);
        this.update(tmp);
      }
    }
    get() {
      const { v0, v1, v2, v3, v4, v5, v6, v7 } = this;
      return [v0, v1, v2, v3, v4, v5, v6, v7];
    }
    // prettier-ignore
    set(v0, v1, v2, v3, v4, v5, v6, v7) {
      this.v0 = v0 | 0;
      this.v1 = v1 | 0;
      this.v2 = v2 | 0;
      this.v3 = v3 | 0;
      this.v4 = v4 | 0;
      this.v5 = v5 | 0;
      this.v6 = v6 | 0;
      this.v7 = v7 | 0;
    }
    compress(msg, offset, isLast) {
      const { h, l } = u64.fromBig(BigInt(this.length));
      const { v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15 } = compress(_blake_ts_1.BSIGMA, offset, msg, 10, this.v0, this.v1, this.v2, this.v3, this.v4, this.v5, this.v6, this.v7, B2S_IV[0], B2S_IV[1], B2S_IV[2], B2S_IV[3], l ^ B2S_IV[4], h ^ B2S_IV[5], isLast ? ~B2S_IV[6] : B2S_IV[6], B2S_IV[7]);
      this.v0 ^= v0 ^ v8;
      this.v1 ^= v1 ^ v9;
      this.v2 ^= v2 ^ v10;
      this.v3 ^= v3 ^ v11;
      this.v4 ^= v4 ^ v12;
      this.v5 ^= v5 ^ v13;
      this.v6 ^= v6 ^ v14;
      this.v7 ^= v7 ^ v15;
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.buffer32);
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  blake2.BLAKE2s = BLAKE2s;
  blake2.blake2s = (0, utils_ts_1.createOptHasher)((opts) => new BLAKE2s(opts));
  return blake2;
}
var hasRequiredBlake3;
function requireBlake3() {
  if (hasRequiredBlake3) return blake3;
  hasRequiredBlake3 = 1;
  Object.defineProperty(blake3, "__esModule", { value: true });
  blake3.blake3 = blake3.BLAKE3 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md$3();
  const _u64_ts_1 = /* @__PURE__ */ require_u64$4();
  const blake2_ts_1 = /* @__PURE__ */ requireBlake2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  const B3_Flags = {
    CHUNK_START: 1,
    CHUNK_END: 2,
    PARENT: 4,
    ROOT: 8,
    KEYED_HASH: 16,
    DERIVE_KEY_CONTEXT: 32,
    DERIVE_KEY_MATERIAL: 64
  };
  const B3_IV = _md_ts_1.SHA256_IV.slice();
  const B3_SIGMA = /* @__PURE__ */ (() => {
    const Id = Array.from({ length: 16 }, (_, i) => i);
    const permute = (arr) => [2, 6, 3, 10, 7, 0, 4, 13, 1, 11, 12, 5, 9, 14, 15, 8].map((i) => arr[i]);
    const res = [];
    for (let i = 0, v = Id; i < 7; i++, v = permute(v))
      res.push(...v);
    return Uint8Array.from(res);
  })();
  class BLAKE3 extends blake2_ts_1.BLAKE2 {
    constructor(opts = {}, flags = 0) {
      super(64, opts.dkLen === void 0 ? 32 : opts.dkLen);
      this.chunkPos = 0;
      this.chunksDone = 0;
      this.flags = 0 | 0;
      this.stack = [];
      this.posOut = 0;
      this.bufferOut32 = new Uint32Array(16);
      this.chunkOut = 0;
      this.enableXOF = true;
      const { key, context } = opts;
      const hasContext = context !== void 0;
      if (key !== void 0) {
        if (hasContext)
          throw new Error('Only "key" or "context" can be specified at same time');
        const k = (0, utils_ts_1.toBytes)(key).slice();
        (0, utils_ts_1.abytes)(k, 32);
        this.IV = (0, utils_ts_1.u32)(k);
        (0, utils_ts_1.swap32IfBE)(this.IV);
        this.flags = flags | B3_Flags.KEYED_HASH;
      } else if (hasContext) {
        const ctx = (0, utils_ts_1.toBytes)(context);
        const contextKey = new BLAKE3({ dkLen: 32 }, B3_Flags.DERIVE_KEY_CONTEXT).update(ctx).digest();
        this.IV = (0, utils_ts_1.u32)(contextKey);
        (0, utils_ts_1.swap32IfBE)(this.IV);
        this.flags = flags | B3_Flags.DERIVE_KEY_MATERIAL;
      } else {
        this.IV = B3_IV.slice();
        this.flags = flags;
      }
      this.state = this.IV.slice();
      this.bufferOut = (0, utils_ts_1.u8)(this.bufferOut32);
    }
    // Unused
    get() {
      return [];
    }
    set() {
    }
    b2Compress(counter, flags, buf, bufPos = 0) {
      const { state: s, pos } = this;
      const { h, l } = (0, _u64_ts_1.fromBig)(BigInt(counter), true);
      const { v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15 } = (0, blake2_ts_1.compress)(B3_SIGMA, bufPos, buf, 7, s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], B3_IV[0], B3_IV[1], B3_IV[2], B3_IV[3], h, l, pos, flags);
      s[0] = v0 ^ v8;
      s[1] = v1 ^ v9;
      s[2] = v2 ^ v10;
      s[3] = v3 ^ v11;
      s[4] = v4 ^ v12;
      s[5] = v5 ^ v13;
      s[6] = v6 ^ v14;
      s[7] = v7 ^ v15;
    }
    compress(buf, bufPos = 0, isLast = false) {
      let flags = this.flags;
      if (!this.chunkPos)
        flags |= B3_Flags.CHUNK_START;
      if (this.chunkPos === 15 || isLast)
        flags |= B3_Flags.CHUNK_END;
      if (!isLast)
        this.pos = this.blockLen;
      this.b2Compress(this.chunksDone, flags, buf, bufPos);
      this.chunkPos += 1;
      if (this.chunkPos === 16 || isLast) {
        let chunk = this.state;
        this.state = this.IV.slice();
        for (let last, chunks = this.chunksDone + 1; isLast || !(chunks & 1); chunks >>= 1) {
          if (!(last = this.stack.pop()))
            break;
          this.buffer32.set(last, 0);
          this.buffer32.set(chunk, 8);
          this.pos = this.blockLen;
          this.b2Compress(0, this.flags | B3_Flags.PARENT, this.buffer32, 0);
          chunk = this.state;
          this.state = this.IV.slice();
        }
        this.chunksDone++;
        this.chunkPos = 0;
        this.stack.push(chunk);
      }
      this.pos = 0;
    }
    _cloneInto(to) {
      to = super._cloneInto(to);
      const { IV, flags, state, chunkPos, posOut, chunkOut, stack, chunksDone } = this;
      to.state.set(state.slice());
      to.stack = stack.map((i) => Uint32Array.from(i));
      to.IV.set(IV);
      to.flags = flags;
      to.chunkPos = chunkPos;
      to.chunksDone = chunksDone;
      to.posOut = posOut;
      to.chunkOut = chunkOut;
      to.enableXOF = this.enableXOF;
      to.bufferOut32.set(this.bufferOut32);
      return to;
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.state, this.buffer32, this.IV, this.bufferOut32);
      (0, utils_ts_1.clean)(...this.stack);
    }
    // Same as b2Compress, but doesn't modify state and returns 16 u32 array (instead of 8)
    b2CompressOut() {
      const { state: s, pos, flags, buffer32, bufferOut32: out32 } = this;
      const { h, l } = (0, _u64_ts_1.fromBig)(BigInt(this.chunkOut++));
      (0, utils_ts_1.swap32IfBE)(buffer32);
      const { v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15 } = (0, blake2_ts_1.compress)(B3_SIGMA, 0, buffer32, 7, s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], B3_IV[0], B3_IV[1], B3_IV[2], B3_IV[3], l, h, pos, flags);
      out32[0] = v0 ^ v8;
      out32[1] = v1 ^ v9;
      out32[2] = v2 ^ v10;
      out32[3] = v3 ^ v11;
      out32[4] = v4 ^ v12;
      out32[5] = v5 ^ v13;
      out32[6] = v6 ^ v14;
      out32[7] = v7 ^ v15;
      out32[8] = s[0] ^ v8;
      out32[9] = s[1] ^ v9;
      out32[10] = s[2] ^ v10;
      out32[11] = s[3] ^ v11;
      out32[12] = s[4] ^ v12;
      out32[13] = s[5] ^ v13;
      out32[14] = s[6] ^ v14;
      out32[15] = s[7] ^ v15;
      (0, utils_ts_1.swap32IfBE)(buffer32);
      (0, utils_ts_1.swap32IfBE)(out32);
      this.posOut = 0;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      (0, utils_ts_1.clean)(this.buffer.subarray(this.pos));
      let flags = this.flags | B3_Flags.ROOT;
      if (this.stack.length) {
        flags |= B3_Flags.PARENT;
        (0, utils_ts_1.swap32IfBE)(this.buffer32);
        this.compress(this.buffer32, 0, true);
        (0, utils_ts_1.swap32IfBE)(this.buffer32);
        this.chunksDone = 0;
        this.pos = this.blockLen;
      } else {
        flags |= (!this.chunkPos ? B3_Flags.CHUNK_START : 0) | B3_Flags.CHUNK_END;
      }
      this.flags = flags;
      this.b2CompressOut();
    }
    writeInto(out) {
      (0, utils_ts_1.aexists)(this, false);
      (0, utils_ts_1.abytes)(out);
      this.finish();
      const { blockLen, bufferOut } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.b2CompressOut();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible after digest call");
      return this.writeInto(out);
    }
    xof(bytes2) {
      (0, utils_ts_1.anumber)(bytes2);
      return this.xofInto(new Uint8Array(bytes2));
    }
    digestInto(out) {
      (0, utils_ts_1.aoutput)(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.enableXOF = false;
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
  }
  blake3.BLAKE3 = BLAKE3;
  blake3.blake3 = (0, utils_ts_1.createXOFer)((opts) => new BLAKE3(opts));
  return blake3;
}
var utils$3 = {};
var cryptoNode$3 = {};
var hasRequiredCryptoNode$3;
function requireCryptoNode$3() {
  if (hasRequiredCryptoNode$3) return cryptoNode$3;
  hasRequiredCryptoNode$3 = 1;
  Object.defineProperty(cryptoNode$3, "__esModule", { value: true });
  cryptoNode$3.crypto = void 0;
  const nc2 = nc__default;
  cryptoNode$3.crypto = nc2 && typeof nc2 === "object" && "webcrypto" in nc2 ? nc2.webcrypto : nc2 && typeof nc2 === "object" && "randomBytes" in nc2 ? nc2 : void 0;
  return cryptoNode$3;
}
var hasRequiredUtils$3;
function requireUtils$3() {
  if (hasRequiredUtils$3) return utils$3;
  hasRequiredUtils$3 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
    exports.isBytes = isBytes2;
    exports.anumber = anumber2;
    exports.abytes = abytes2;
    exports.ahash = ahash2;
    exports.aexists = aexists2;
    exports.aoutput = aoutput2;
    exports.u8 = u8;
    exports.u32 = u322;
    exports.clean = clean2;
    exports.createView = createView2;
    exports.rotr = rotr2;
    exports.rotl = rotl;
    exports.byteSwap = byteSwap2;
    exports.byteSwap32 = byteSwap322;
    exports.bytesToHex = bytesToHex2;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes2;
    exports.bytesToUtf8 = bytesToUtf8;
    exports.toBytes = toBytes2;
    exports.kdfInputToBytes = kdfInputToBytes;
    exports.concatBytes = concatBytes2;
    exports.checkOpts = checkOpts;
    exports.createHasher = createHasher2;
    exports.createOptHasher = createOptHasher;
    exports.createXOFer = createXOFer;
    exports.randomBytes = randomBytes2;
    const crypto_1 = /* @__PURE__ */ requireCryptoNode$3();
    function isBytes2(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function anumber2(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes2(b, ...lengths) {
      if (!isBytes2(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash2(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      anumber2(h.outputLen);
      anumber2(h.blockLen);
    }
    function aexists2(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput2(out, instance) {
      abytes2(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u322(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean2(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView2(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function rotr2(word, shift) {
      return word << 32 - shift | word >>> shift;
    }
    function rotl(word, shift) {
      return word << shift | word >>> 32 - shift >>> 0;
    }
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    function byteSwap2(word) {
      return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    }
    exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap2(n);
    exports.byteSwapIfBE = exports.swap8IfBE;
    function byteSwap322(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap2(arr[i]);
      }
      return arr;
    }
    exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap322;
    const hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    const hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(bytes2) {
      abytes2(bytes2);
      if (hasHexBuiltin)
        return bytes2.toHex();
      let hex = "";
      for (let i = 0; i < bytes2.length; i++) {
        hex += hexes2[bytes2[i]];
      }
      return hex;
    }
    const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      if (hasHexBuiltin)
        return Uint8Array.fromHex(hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    const nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes2(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes2) {
      return new TextDecoder().decode(bytes2);
    }
    function toBytes2(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function kdfInputToBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function concatBytes2(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes2(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    class Hash5 {
    }
    exports.Hash = Hash5;
    function createHasher2(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function createOptHasher(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function createXOFer(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructor = createHasher2;
    exports.wrapConstructorWithOpts = createOptHasher;
    exports.wrapXOFConstructorWithOpts = createXOFer;
    function randomBytes2(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(utils$3);
  return utils$3;
}
var sha2$2 = {};
var _md$2 = {};
var hasRequired_md$2;
function require_md$2() {
  if (hasRequired_md$2) return _md$2;
  hasRequired_md$2 = 1;
  Object.defineProperty(_md$2, "__esModule", { value: true });
  _md$2.SHA512_IV = _md$2.SHA384_IV = _md$2.SHA224_IV = _md$2.SHA256_IV = _md$2.HashMD = void 0;
  _md$2.setBigUint64 = setBigUint642;
  _md$2.Chi = Chi2;
  _md$2.Maj = Maj2;
  const utils_ts_1 = /* @__PURE__ */ requireUtils$3();
  function setBigUint642(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function Chi2(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj2(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  class HashMD5 extends utils_ts_1.Hash {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.buffer = new Uint8Array(blockLen);
      this.view = (0, utils_ts_1.createView)(this.buffer);
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const { view, buffer, blockLen } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = (0, utils_ts_1.createView)(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      (0, utils_ts_1.aexists)(this);
      (0, utils_ts_1.aoutput)(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      (0, utils_ts_1.clean)(this.buffer.subarray(pos));
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = (0, utils_ts_1.createView)(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.destroyed = destroyed;
      to.finished = finished;
      to.length = length;
      to.pos = pos;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
    clone() {
      return this._cloneInto();
    }
  }
  _md$2.HashMD = HashMD5;
  _md$2.SHA256_IV = Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  _md$2.SHA224_IV = Uint32Array.from([
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ]);
  _md$2.SHA384_IV = Uint32Array.from([
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ]);
  _md$2.SHA512_IV = Uint32Array.from([
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ]);
  return _md$2;
}
var _u64$3 = {};
var hasRequired_u64$3;
function require_u64$3() {
  if (hasRequired_u64$3) return _u64$3;
  hasRequired_u64$3 = 1;
  Object.defineProperty(_u64$3, "__esModule", { value: true });
  _u64$3.toBig = _u64$3.shrSL = _u64$3.shrSH = _u64$3.rotrSL = _u64$3.rotrSH = _u64$3.rotrBL = _u64$3.rotrBH = _u64$3.rotr32L = _u64$3.rotr32H = _u64$3.rotlSL = _u64$3.rotlSH = _u64$3.rotlBL = _u64$3.rotlBH = _u64$3.add5L = _u64$3.add5H = _u64$3.add4L = _u64$3.add4H = _u64$3.add3L = _u64$3.add3H = void 0;
  _u64$3.add = add2;
  _u64$3.fromBig = fromBig2;
  _u64$3.split = split2;
  const U32_MASK642 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  const _32n2 = /* @__PURE__ */ BigInt(32);
  function fromBig2(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
    return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
  }
  function split2(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for (let i = 0; i < len; i++) {
      const { h, l } = fromBig2(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  const toBig = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
  _u64$3.toBig = toBig;
  const shrSH2 = (h, _l, s) => h >>> s;
  _u64$3.shrSH = shrSH2;
  const shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$3.shrSL = shrSL2;
  const rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
  _u64$3.rotrSH = rotrSH2;
  const rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$3.rotrSL = rotrSL2;
  const rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
  _u64$3.rotrBH = rotrBH2;
  const rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
  _u64$3.rotrBL = rotrBL2;
  const rotr32H = (_h, l) => l;
  _u64$3.rotr32H = rotr32H;
  const rotr32L = (h, _l) => h;
  _u64$3.rotr32L = rotr32L;
  const rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
  _u64$3.rotlSH = rotlSH2;
  const rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
  _u64$3.rotlSL = rotlSL2;
  const rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
  _u64$3.rotlBH = rotlBH2;
  const rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
  _u64$3.rotlBL = rotlBL2;
  function add2(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  const add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  _u64$3.add3L = add3L2;
  const add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  _u64$3.add3H = add3H2;
  const add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  _u64$3.add4L = add4L2;
  const add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  _u64$3.add4H = add4H2;
  const add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  _u64$3.add5L = add5L2;
  const add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  _u64$3.add5H = add5H2;
  const u64 = {
    fromBig: fromBig2,
    split: split2,
    toBig,
    shrSH: shrSH2,
    shrSL: shrSL2,
    rotrSH: rotrSH2,
    rotrSL: rotrSL2,
    rotrBH: rotrBH2,
    rotrBL: rotrBL2,
    rotr32H,
    rotr32L,
    rotlSH: rotlSH2,
    rotlSL: rotlSL2,
    rotlBH: rotlBH2,
    rotlBL: rotlBL2,
    add: add2,
    add3L: add3L2,
    add3H: add3H2,
    add4L: add4L2,
    add4H: add4H2,
    add5H: add5H2,
    add5L: add5L2
  };
  _u64$3.default = u64;
  return _u64$3;
}
var hasRequiredSha2$2;
function requireSha2$2() {
  if (hasRequiredSha2$2) return sha2$2;
  hasRequiredSha2$2 = 1;
  Object.defineProperty(sha2$2, "__esModule", { value: true });
  sha2$2.sha512_224 = sha2$2.sha512_256 = sha2$2.sha384 = sha2$2.sha512 = sha2$2.sha224 = sha2$2.sha256 = sha2$2.SHA512_256 = sha2$2.SHA512_224 = sha2$2.SHA384 = sha2$2.SHA512 = sha2$2.SHA224 = sha2$2.SHA256 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md$2();
  const u64 = /* @__PURE__ */ require_u64$3();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$3();
  const SHA256_K2 = /* @__PURE__ */ Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  const SHA256_W2 = /* @__PURE__ */ new Uint32Array(64);
  class SHA2565 extends _md_ts_1.HashMD {
    constructor(outputLen = 32) {
      super(64, outputLen, 8, false);
      this.A = _md_ts_1.SHA256_IV[0] | 0;
      this.B = _md_ts_1.SHA256_IV[1] | 0;
      this.C = _md_ts_1.SHA256_IV[2] | 0;
      this.D = _md_ts_1.SHA256_IV[3] | 0;
      this.E = _md_ts_1.SHA256_IV[4] | 0;
      this.F = _md_ts_1.SHA256_IV[5] | 0;
      this.G = _md_ts_1.SHA256_IV[6] | 0;
      this.H = _md_ts_1.SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W2[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W2[i - 15];
        const W2 = SHA256_W2[i - 2];
        const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
        const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
        SHA256_W2[i] = s1 + SHA256_W2[i - 7] + s0 + SHA256_W2[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
        const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K2[i] + SHA256_W2[i] | 0;
        const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
        const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA256_W2);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  sha2$2.SHA256 = SHA2565;
  class SHA224 extends SHA2565 {
    constructor() {
      super(28);
      this.A = _md_ts_1.SHA224_IV[0] | 0;
      this.B = _md_ts_1.SHA224_IV[1] | 0;
      this.C = _md_ts_1.SHA224_IV[2] | 0;
      this.D = _md_ts_1.SHA224_IV[3] | 0;
      this.E = _md_ts_1.SHA224_IV[4] | 0;
      this.F = _md_ts_1.SHA224_IV[5] | 0;
      this.G = _md_ts_1.SHA224_IV[6] | 0;
      this.H = _md_ts_1.SHA224_IV[7] | 0;
    }
  }
  sha2$2.SHA224 = SHA224;
  const K5122 = /* @__PURE__ */ (() => u64.split([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
  ].map((n) => BigInt(n))))();
  const SHA512_Kh2 = /* @__PURE__ */ (() => K5122[0])();
  const SHA512_Kl2 = /* @__PURE__ */ (() => K5122[1])();
  const SHA512_W_H2 = /* @__PURE__ */ new Uint32Array(80);
  const SHA512_W_L2 = /* @__PURE__ */ new Uint32Array(80);
  class SHA5122 extends _md_ts_1.HashMD {
    constructor(outputLen = 64) {
      super(128, outputLen, 16, false);
      this.Ah = _md_ts_1.SHA512_IV[0] | 0;
      this.Al = _md_ts_1.SHA512_IV[1] | 0;
      this.Bh = _md_ts_1.SHA512_IV[2] | 0;
      this.Bl = _md_ts_1.SHA512_IV[3] | 0;
      this.Ch = _md_ts_1.SHA512_IV[4] | 0;
      this.Cl = _md_ts_1.SHA512_IV[5] | 0;
      this.Dh = _md_ts_1.SHA512_IV[6] | 0;
      this.Dl = _md_ts_1.SHA512_IV[7] | 0;
      this.Eh = _md_ts_1.SHA512_IV[8] | 0;
      this.El = _md_ts_1.SHA512_IV[9] | 0;
      this.Fh = _md_ts_1.SHA512_IV[10] | 0;
      this.Fl = _md_ts_1.SHA512_IV[11] | 0;
      this.Gh = _md_ts_1.SHA512_IV[12] | 0;
      this.Gl = _md_ts_1.SHA512_IV[13] | 0;
      this.Hh = _md_ts_1.SHA512_IV[14] | 0;
      this.Hl = _md_ts_1.SHA512_IV[15] | 0;
    }
    // prettier-ignore
    get() {
      const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
      this.Ah = Ah | 0;
      this.Al = Al | 0;
      this.Bh = Bh | 0;
      this.Bl = Bl | 0;
      this.Ch = Ch | 0;
      this.Cl = Cl | 0;
      this.Dh = Dh | 0;
      this.Dl = Dl | 0;
      this.Eh = Eh | 0;
      this.El = El | 0;
      this.Fh = Fh | 0;
      this.Fl = Fl | 0;
      this.Gh = Gh | 0;
      this.Gl = Gl | 0;
      this.Hh = Hh | 0;
      this.Hl = Hl | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4) {
        SHA512_W_H2[i] = view.getUint32(offset);
        SHA512_W_L2[i] = view.getUint32(offset += 4);
      }
      for (let i = 16; i < 80; i++) {
        const W15h = SHA512_W_H2[i - 15] | 0;
        const W15l = SHA512_W_L2[i - 15] | 0;
        const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
        const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
        const W2h = SHA512_W_H2[i - 2] | 0;
        const W2l = SHA512_W_L2[i - 2] | 0;
        const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
        const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
        const SUMl = u64.add4L(s0l, s1l, SHA512_W_L2[i - 7], SHA512_W_L2[i - 16]);
        const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H2[i - 7], SHA512_W_H2[i - 16]);
        SHA512_W_H2[i] = SUMh | 0;
        SHA512_W_L2[i] = SUMl | 0;
      }
      let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      for (let i = 0; i < 80; i++) {
        const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
        const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
        const CHIh = Eh & Fh ^ ~Eh & Gh;
        const CHIl = El & Fl ^ ~El & Gl;
        const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl2[i], SHA512_W_L2[i]);
        const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh2[i], SHA512_W_H2[i]);
        const T1l = T1ll | 0;
        const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
        const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
        const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
        const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
        Hh = Gh | 0;
        Hl = Gl | 0;
        Gh = Fh | 0;
        Gl = Fl | 0;
        Fh = Eh | 0;
        Fl = El | 0;
        ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
        Dh = Ch | 0;
        Dl = Cl | 0;
        Ch = Bh | 0;
        Cl = Bl | 0;
        Bh = Ah | 0;
        Bl = Al | 0;
        const All = u64.add3L(T1l, sigma0l, MAJl);
        Ah = u64.add3H(All, T1h, sigma0h, MAJh);
        Al = All | 0;
      }
      ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
      ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
      ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
      ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
      ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
      ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
      ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
      ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
      this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA512_W_H2, SHA512_W_L2);
    }
    destroy() {
      (0, utils_ts_1.clean)(this.buffer);
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  sha2$2.SHA512 = SHA5122;
  class SHA3842 extends SHA5122 {
    constructor() {
      super(48);
      this.Ah = _md_ts_1.SHA384_IV[0] | 0;
      this.Al = _md_ts_1.SHA384_IV[1] | 0;
      this.Bh = _md_ts_1.SHA384_IV[2] | 0;
      this.Bl = _md_ts_1.SHA384_IV[3] | 0;
      this.Ch = _md_ts_1.SHA384_IV[4] | 0;
      this.Cl = _md_ts_1.SHA384_IV[5] | 0;
      this.Dh = _md_ts_1.SHA384_IV[6] | 0;
      this.Dl = _md_ts_1.SHA384_IV[7] | 0;
      this.Eh = _md_ts_1.SHA384_IV[8] | 0;
      this.El = _md_ts_1.SHA384_IV[9] | 0;
      this.Fh = _md_ts_1.SHA384_IV[10] | 0;
      this.Fl = _md_ts_1.SHA384_IV[11] | 0;
      this.Gh = _md_ts_1.SHA384_IV[12] | 0;
      this.Gl = _md_ts_1.SHA384_IV[13] | 0;
      this.Hh = _md_ts_1.SHA384_IV[14] | 0;
      this.Hl = _md_ts_1.SHA384_IV[15] | 0;
    }
  }
  sha2$2.SHA384 = SHA3842;
  const T224_IV = /* @__PURE__ */ Uint32Array.from([
    2352822216,
    424955298,
    1944164710,
    2312950998,
    502970286,
    855612546,
    1738396948,
    1479516111,
    258812777,
    2077511080,
    2011393907,
    79989058,
    1067287976,
    1780299464,
    286451373,
    2446758561
  ]);
  const T256_IV = /* @__PURE__ */ Uint32Array.from([
    573645204,
    4230739756,
    2673172387,
    3360449730,
    596883563,
    1867755857,
    2520282905,
    1497426621,
    2519219938,
    2827943907,
    3193839141,
    1401305490,
    721525244,
    746961066,
    246885852,
    2177182882
  ]);
  class SHA512_224 extends SHA5122 {
    constructor() {
      super(28);
      this.Ah = T224_IV[0] | 0;
      this.Al = T224_IV[1] | 0;
      this.Bh = T224_IV[2] | 0;
      this.Bl = T224_IV[3] | 0;
      this.Ch = T224_IV[4] | 0;
      this.Cl = T224_IV[5] | 0;
      this.Dh = T224_IV[6] | 0;
      this.Dl = T224_IV[7] | 0;
      this.Eh = T224_IV[8] | 0;
      this.El = T224_IV[9] | 0;
      this.Fh = T224_IV[10] | 0;
      this.Fl = T224_IV[11] | 0;
      this.Gh = T224_IV[12] | 0;
      this.Gl = T224_IV[13] | 0;
      this.Hh = T224_IV[14] | 0;
      this.Hl = T224_IV[15] | 0;
    }
  }
  sha2$2.SHA512_224 = SHA512_224;
  class SHA512_256 extends SHA5122 {
    constructor() {
      super(32);
      this.Ah = T256_IV[0] | 0;
      this.Al = T256_IV[1] | 0;
      this.Bh = T256_IV[2] | 0;
      this.Bl = T256_IV[3] | 0;
      this.Ch = T256_IV[4] | 0;
      this.Cl = T256_IV[5] | 0;
      this.Dh = T256_IV[6] | 0;
      this.Dl = T256_IV[7] | 0;
      this.Eh = T256_IV[8] | 0;
      this.El = T256_IV[9] | 0;
      this.Fh = T256_IV[10] | 0;
      this.Fl = T256_IV[11] | 0;
      this.Gh = T256_IV[12] | 0;
      this.Gl = T256_IV[13] | 0;
      this.Hh = T256_IV[14] | 0;
      this.Hl = T256_IV[15] | 0;
    }
  }
  sha2$2.SHA512_256 = SHA512_256;
  sha2$2.sha256 = (0, utils_ts_1.createHasher)(() => new SHA2565());
  sha2$2.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
  sha2$2.sha512 = (0, utils_ts_1.createHasher)(() => new SHA5122());
  sha2$2.sha384 = (0, utils_ts_1.createHasher)(() => new SHA3842());
  sha2$2.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
  sha2$2.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
  return sha2$2;
}
var hmac$3 = {};
var hasRequiredHmac$2;
function requireHmac$2() {
  if (hasRequiredHmac$2) return hmac$3;
  hasRequiredHmac$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac = exports.HMAC = void 0;
    const utils_ts_1 = /* @__PURE__ */ requireUtils$3();
    class HMAC3 extends utils_ts_1.Hash {
      constructor(hash, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        (0, utils_ts_1.ahash)(hash);
        const key = (0, utils_ts_1.toBytes)(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54;
        this.iHash.update(pad);
        this.oHash = hash.create();
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54 ^ 92;
        this.oHash.update(pad);
        (0, utils_ts_1.clean)(pad);
      }
      update(buf) {
        (0, utils_ts_1.aexists)(this);
        this.iHash.update(buf);
        return this;
      }
      digestInto(out) {
        (0, utils_ts_1.aexists)(this);
        (0, utils_ts_1.abytes)(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
      }
      digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
      }
      _cloneInto(to) {
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
      }
    }
    exports.HMAC = HMAC3;
    const hmac2 = (hash, key, message) => new HMAC3(hash, key).update(message).digest();
    exports.hmac = hmac2;
    exports.hmac.create = (hash, key) => new HMAC3(hash, key);
  })(hmac$3);
  return hmac$3;
}
var legacy$1 = {};
var hasRequiredLegacy$1;
function requireLegacy$1() {
  if (hasRequiredLegacy$1) return legacy$1;
  hasRequiredLegacy$1 = 1;
  Object.defineProperty(legacy$1, "__esModule", { value: true });
  legacy$1.ripemd160 = legacy$1.RIPEMD160 = legacy$1.md5 = legacy$1.MD5 = legacy$1.sha1 = legacy$1.SHA1 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$3();
  const SHA1_IV = /* @__PURE__ */ Uint32Array.from([
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ]);
  const SHA1_W = /* @__PURE__ */ new Uint32Array(80);
  class SHA1 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 20, 8, false);
      this.A = SHA1_IV[0] | 0;
      this.B = SHA1_IV[1] | 0;
      this.C = SHA1_IV[2] | 0;
      this.D = SHA1_IV[3] | 0;
      this.E = SHA1_IV[4] | 0;
    }
    get() {
      const { A, B, C, D, E } = this;
      return [A, B, C, D, E];
    }
    set(A, B, C, D, E) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA1_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 80; i++)
        SHA1_W[i] = (0, utils_ts_1.rotl)(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
      let { A, B, C, D, E } = this;
      for (let i = 0; i < 80; i++) {
        let F, K2;
        if (i < 20) {
          F = (0, _md_ts_1.Chi)(B, C, D);
          K2 = 1518500249;
        } else if (i < 40) {
          F = B ^ C ^ D;
          K2 = 1859775393;
        } else if (i < 60) {
          F = (0, _md_ts_1.Maj)(B, C, D);
          K2 = 2400959708;
        } else {
          F = B ^ C ^ D;
          K2 = 3395469782;
        }
        const T = (0, utils_ts_1.rotl)(A, 5) + F + E + K2 + SHA1_W[i] | 0;
        E = D;
        D = C;
        C = (0, utils_ts_1.rotl)(B, 30);
        B = A;
        A = T;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      this.set(A, B, C, D, E);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA1_W);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  legacy$1.SHA1 = SHA1;
  legacy$1.sha1 = (0, utils_ts_1.createHasher)(() => new SHA1());
  const p32 = /* @__PURE__ */ Math.pow(2, 32);
  const K = /* @__PURE__ */ Array.from({ length: 64 }, (_, i) => Math.floor(p32 * Math.abs(Math.sin(i + 1))));
  const MD5_IV = /* @__PURE__ */ SHA1_IV.slice(0, 4);
  const MD5_W = /* @__PURE__ */ new Uint32Array(16);
  class MD5 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 16, 8, true);
      this.A = MD5_IV[0] | 0;
      this.B = MD5_IV[1] | 0;
      this.C = MD5_IV[2] | 0;
      this.D = MD5_IV[3] | 0;
    }
    get() {
      const { A, B, C, D } = this;
      return [A, B, C, D];
    }
    set(A, B, C, D) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        MD5_W[i] = view.getUint32(offset, true);
      let { A, B, C, D } = this;
      for (let i = 0; i < 64; i++) {
        let F, g, s;
        if (i < 16) {
          F = (0, _md_ts_1.Chi)(B, C, D);
          g = i;
          s = [7, 12, 17, 22];
        } else if (i < 32) {
          F = (0, _md_ts_1.Chi)(D, B, C);
          g = (5 * i + 1) % 16;
          s = [5, 9, 14, 20];
        } else if (i < 48) {
          F = B ^ C ^ D;
          g = (3 * i + 5) % 16;
          s = [4, 11, 16, 23];
        } else {
          F = C ^ (B | ~D);
          g = 7 * i % 16;
          s = [6, 10, 15, 21];
        }
        F = F + A + K[i] + MD5_W[g];
        A = D;
        D = C;
        C = B;
        B = B + (0, utils_ts_1.rotl)(F, s[i % 4]);
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      this.set(A, B, C, D);
    }
    roundClean() {
      (0, utils_ts_1.clean)(MD5_W);
    }
    destroy() {
      this.set(0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  legacy$1.MD5 = MD5;
  legacy$1.md5 = (0, utils_ts_1.createHasher)(() => new MD5());
  const Rho160 = /* @__PURE__ */ Uint8Array.from([
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8
  ]);
  const Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
  const Pi160 = /* @__PURE__ */ (() => Id160.map((i) => (9 * i + 5) % 16))();
  const idxLR = /* @__PURE__ */ (() => {
    const L = [Id160];
    const R = [Pi160];
    const res = [L, R];
    for (let i = 0; i < 4; i++)
      for (let j of res)
        j.push(j[i].map((k) => Rho160[k]));
    return res;
  })();
  const idxL = /* @__PURE__ */ (() => idxLR[0])();
  const idxR = /* @__PURE__ */ (() => idxLR[1])();
  const shifts160 = /* @__PURE__ */ [
    [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
    [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
    [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
    [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
    [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
  ].map((i) => Uint8Array.from(i));
  const shiftsL160 = /* @__PURE__ */ idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
  const shiftsR160 = /* @__PURE__ */ idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
  const Kl160 = /* @__PURE__ */ Uint32Array.from([
    0,
    1518500249,
    1859775393,
    2400959708,
    2840853838
  ]);
  const Kr160 = /* @__PURE__ */ Uint32Array.from([
    1352829926,
    1548603684,
    1836072691,
    2053994217,
    0
  ]);
  function ripemd_f(group, x, y, z) {
    if (group === 0)
      return x ^ y ^ z;
    if (group === 1)
      return x & y | ~x & z;
    if (group === 2)
      return (x | ~y) ^ z;
    if (group === 3)
      return x & z | y & ~z;
    return x ^ (y | ~z);
  }
  const BUF_160 = /* @__PURE__ */ new Uint32Array(16);
  class RIPEMD160 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 20, 8, true);
      this.h0 = 1732584193 | 0;
      this.h1 = 4023233417 | 0;
      this.h2 = 2562383102 | 0;
      this.h3 = 271733878 | 0;
      this.h4 = 3285377520 | 0;
    }
    get() {
      const { h0, h1, h2, h3, h4 } = this;
      return [h0, h1, h2, h3, h4];
    }
    set(h0, h1, h2, h3, h4) {
      this.h0 = h0 | 0;
      this.h1 = h1 | 0;
      this.h2 = h2 | 0;
      this.h3 = h3 | 0;
      this.h4 = h4 | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        BUF_160[i] = view.getUint32(offset, true);
      let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
      for (let group = 0; group < 5; group++) {
        const rGroup = 4 - group;
        const hbl = Kl160[group], hbr = Kr160[group];
        const rl = idxL[group], rr = idxR[group];
        const sl = shiftsL160[group], sr = shiftsR160[group];
        for (let i = 0; i < 16; i++) {
          const tl = (0, utils_ts_1.rotl)(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
          al = el, el = dl, dl = (0, utils_ts_1.rotl)(cl, 10) | 0, cl = bl, bl = tl;
        }
        for (let i = 0; i < 16; i++) {
          const tr = (0, utils_ts_1.rotl)(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
          ar = er, er = dr, dr = (0, utils_ts_1.rotl)(cr, 10) | 0, cr = br, br = tr;
        }
      }
      this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
    }
    roundClean() {
      (0, utils_ts_1.clean)(BUF_160);
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.buffer);
      this.set(0, 0, 0, 0, 0);
    }
  }
  legacy$1.RIPEMD160 = RIPEMD160;
  legacy$1.ripemd160 = (0, utils_ts_1.createHasher)(() => new RIPEMD160());
  return legacy$1;
}
var pbkdf2$1 = {};
var hasRequiredPbkdf2$1;
function requirePbkdf2$1() {
  if (hasRequiredPbkdf2$1) return pbkdf2$1;
  hasRequiredPbkdf2$1 = 1;
  Object.defineProperty(pbkdf2$1, "__esModule", { value: true });
  pbkdf2$1.pbkdf2 = pbkdf22;
  pbkdf2$1.pbkdf2Async = pbkdf2Async;
  const hmac_ts_1 = /* @__PURE__ */ requireHmac$3();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  function pbkdf2Init(hash, _password, _salt, _opts) {
    (0, utils_ts_1.ahash)(hash);
    const opts = (0, utils_ts_1.checkOpts)({ dkLen: 32, asyncTick: 10 }, _opts);
    const { c, dkLen, asyncTick } = opts;
    (0, utils_ts_1.anumber)(c);
    (0, utils_ts_1.anumber)(dkLen);
    (0, utils_ts_1.anumber)(asyncTick);
    if (c < 1)
      throw new Error("iterations (c) should be >= 1");
    const password = (0, utils_ts_1.kdfInputToBytes)(_password);
    const salt = (0, utils_ts_1.kdfInputToBytes)(_salt);
    const DK = new Uint8Array(dkLen);
    const PRF = hmac_ts_1.hmac.create(hash, password);
    const PRFSalt = PRF._cloneInto().update(salt);
    return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
  }
  function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
    PRF.destroy();
    PRFSalt.destroy();
    if (prfW)
      prfW.destroy();
    (0, utils_ts_1.clean)(u);
    return DK;
  }
  function pbkdf22(hash, password, salt, opts) {
    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW;
    const arr = new Uint8Array(4);
    const view = (0, utils_ts_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
      const Ti = DK.subarray(pos, pos + PRF.outputLen);
      view.setInt32(0, ti, false);
      (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
      Ti.set(u.subarray(0, Ti.length));
      for (let ui = 1; ui < c; ui++) {
        PRF._cloneInto(prfW).update(u).digestInto(u);
        for (let i = 0; i < Ti.length; i++)
          Ti[i] ^= u[i];
      }
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
  }
  async function pbkdf2Async(hash, password, salt, opts) {
    const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW;
    const arr = new Uint8Array(4);
    const view = (0, utils_ts_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
      const Ti = DK.subarray(pos, pos + PRF.outputLen);
      view.setInt32(0, ti, false);
      (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
      Ti.set(u.subarray(0, Ti.length));
      await (0, utils_ts_1.asyncLoop)(c - 1, asyncTick, () => {
        PRF._cloneInto(prfW).update(u).digestInto(u);
        for (let i = 0; i < Ti.length; i++)
          Ti[i] ^= u[i];
      });
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
  }
  return pbkdf2$1;
}
var scrypt = {};
var hasRequiredScrypt;
function requireScrypt() {
  if (hasRequiredScrypt) return scrypt;
  hasRequiredScrypt = 1;
  Object.defineProperty(scrypt, "__esModule", { value: true });
  scrypt.scrypt = scrypt$1;
  scrypt.scryptAsync = scryptAsync;
  const pbkdf2_ts_1 = /* @__PURE__ */ requirePbkdf2$1();
  const sha2_ts_1 = /* @__PURE__ */ requireSha2$3();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$4();
  function XorAndSalsa(prev, pi, input, ii, out, oi) {
    let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
    let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
    let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
    let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
    let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
    let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
    let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
    let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for (let i = 0; i < 8; i += 2) {
      x04 ^= (0, utils_ts_1.rotl)(x00 + x12 | 0, 7);
      x08 ^= (0, utils_ts_1.rotl)(x04 + x00 | 0, 9);
      x12 ^= (0, utils_ts_1.rotl)(x08 + x04 | 0, 13);
      x00 ^= (0, utils_ts_1.rotl)(x12 + x08 | 0, 18);
      x09 ^= (0, utils_ts_1.rotl)(x05 + x01 | 0, 7);
      x13 ^= (0, utils_ts_1.rotl)(x09 + x05 | 0, 9);
      x01 ^= (0, utils_ts_1.rotl)(x13 + x09 | 0, 13);
      x05 ^= (0, utils_ts_1.rotl)(x01 + x13 | 0, 18);
      x14 ^= (0, utils_ts_1.rotl)(x10 + x06 | 0, 7);
      x02 ^= (0, utils_ts_1.rotl)(x14 + x10 | 0, 9);
      x06 ^= (0, utils_ts_1.rotl)(x02 + x14 | 0, 13);
      x10 ^= (0, utils_ts_1.rotl)(x06 + x02 | 0, 18);
      x03 ^= (0, utils_ts_1.rotl)(x15 + x11 | 0, 7);
      x07 ^= (0, utils_ts_1.rotl)(x03 + x15 | 0, 9);
      x11 ^= (0, utils_ts_1.rotl)(x07 + x03 | 0, 13);
      x15 ^= (0, utils_ts_1.rotl)(x11 + x07 | 0, 18);
      x01 ^= (0, utils_ts_1.rotl)(x00 + x03 | 0, 7);
      x02 ^= (0, utils_ts_1.rotl)(x01 + x00 | 0, 9);
      x03 ^= (0, utils_ts_1.rotl)(x02 + x01 | 0, 13);
      x00 ^= (0, utils_ts_1.rotl)(x03 + x02 | 0, 18);
      x06 ^= (0, utils_ts_1.rotl)(x05 + x04 | 0, 7);
      x07 ^= (0, utils_ts_1.rotl)(x06 + x05 | 0, 9);
      x04 ^= (0, utils_ts_1.rotl)(x07 + x06 | 0, 13);
      x05 ^= (0, utils_ts_1.rotl)(x04 + x07 | 0, 18);
      x11 ^= (0, utils_ts_1.rotl)(x10 + x09 | 0, 7);
      x08 ^= (0, utils_ts_1.rotl)(x11 + x10 | 0, 9);
      x09 ^= (0, utils_ts_1.rotl)(x08 + x11 | 0, 13);
      x10 ^= (0, utils_ts_1.rotl)(x09 + x08 | 0, 18);
      x12 ^= (0, utils_ts_1.rotl)(x15 + x14 | 0, 7);
      x13 ^= (0, utils_ts_1.rotl)(x12 + x15 | 0, 9);
      x14 ^= (0, utils_ts_1.rotl)(x13 + x12 | 0, 13);
      x15 ^= (0, utils_ts_1.rotl)(x14 + x13 | 0, 18);
    }
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
  }
  function BlockMix(input, ii, out, oi, r) {
    let head = oi + 0;
    let tail = oi + 16 * r;
    for (let i = 0; i < 16; i++)
      out[tail + i] = input[ii + (2 * r - 1) * 16 + i];
    for (let i = 0; i < r; i++, head += 16, ii += 16) {
      XorAndSalsa(out, tail, input, ii, out, head);
      if (i > 0)
        tail += 16;
      XorAndSalsa(out, head, input, ii += 16, out, tail);
    }
  }
  function scryptInit(password, salt, _opts) {
    const opts = (0, utils_ts_1.checkOpts)({
      dkLen: 32,
      asyncTick: 10,
      maxmem: 1024 ** 3 + 1024
    }, _opts);
    const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
    (0, utils_ts_1.anumber)(N);
    (0, utils_ts_1.anumber)(r);
    (0, utils_ts_1.anumber)(p);
    (0, utils_ts_1.anumber)(dkLen);
    (0, utils_ts_1.anumber)(asyncTick);
    (0, utils_ts_1.anumber)(maxmem);
    if (onProgress !== void 0 && typeof onProgress !== "function")
      throw new Error("progressCb should be function");
    const blockSize = 128 * r;
    const blockSize32 = blockSize / 4;
    const pow32 = Math.pow(2, 32);
    if (N <= 1 || (N & N - 1) !== 0 || N > pow32) {
      throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
    }
    if (p < 0 || p > (pow32 - 1) * 32 / blockSize) {
      throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
    }
    if (dkLen < 0 || dkLen > (pow32 - 1) * 32) {
      throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
    }
    const memUsed = blockSize * (N + p);
    if (memUsed > maxmem) {
      throw new Error("Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of " + maxmem);
    }
    const B = (0, pbkdf2_ts_1.pbkdf2)(sha2_ts_1.sha256, password, salt, { c: 1, dkLen: blockSize * p });
    const B32 = (0, utils_ts_1.u32)(B);
    const V = (0, utils_ts_1.u32)(new Uint8Array(blockSize * N));
    const tmp = (0, utils_ts_1.u32)(new Uint8Array(blockSize));
    let blockMixCb = () => {
    };
    if (onProgress) {
      const totalBlockMix = 2 * N * p;
      const callbackPer = Math.max(Math.floor(totalBlockMix / 1e4), 1);
      let blockMixCnt = 0;
      blockMixCb = () => {
        blockMixCnt++;
        if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix))
          onProgress(blockMixCnt / totalBlockMix);
      };
    }
    return { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick };
  }
  function scryptOutput(password, dkLen, B, V, tmp) {
    const res = (0, pbkdf2_ts_1.pbkdf2)(sha2_ts_1.sha256, password, B, { c: 1, dkLen });
    (0, utils_ts_1.clean)(B, V, tmp);
    return res;
  }
  function scrypt$1(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb } = scryptInit(password, salt, opts);
    (0, utils_ts_1.swap32IfBE)(B32);
    for (let pi = 0; pi < p; pi++) {
      const Pi = blockSize32 * pi;
      for (let i = 0; i < blockSize32; i++)
        V[i] = B32[Pi + i];
      for (let i = 0, pos = 0; i < N - 1; i++) {
        BlockMix(V, pos, V, pos += blockSize32, r);
        blockMixCb();
      }
      BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
      blockMixCb();
      for (let i = 0; i < N; i++) {
        const j = B32[Pi + blockSize32 - 16] % N;
        for (let k = 0; k < blockSize32; k++)
          tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
        BlockMix(tmp, 0, B32, Pi, r);
        blockMixCb();
      }
    }
    (0, utils_ts_1.swap32IfBE)(B32);
    return scryptOutput(password, dkLen, B, V, tmp);
  }
  async function scryptAsync(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick } = scryptInit(password, salt, opts);
    (0, utils_ts_1.swap32IfBE)(B32);
    for (let pi = 0; pi < p; pi++) {
      const Pi = blockSize32 * pi;
      for (let i = 0; i < blockSize32; i++)
        V[i] = B32[Pi + i];
      let pos = 0;
      await (0, utils_ts_1.asyncLoop)(N - 1, asyncTick, () => {
        BlockMix(V, pos, V, pos += blockSize32, r);
        blockMixCb();
      });
      BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
      blockMixCb();
      await (0, utils_ts_1.asyncLoop)(N, asyncTick, () => {
        const j = B32[Pi + blockSize32 - 16] % N;
        for (let k = 0; k < blockSize32; k++)
          tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
        BlockMix(tmp, 0, B32, Pi, r);
        blockMixCb();
      });
    }
    (0, utils_ts_1.swap32IfBE)(B32);
    return scryptOutput(password, dkLen, B, V, tmp);
  }
  return scrypt;
}
var pbkdf2 = {};
var hmac$2 = {};
var utils$2 = {};
var cryptoNode$2 = {};
var hasRequiredCryptoNode$2;
function requireCryptoNode$2() {
  if (hasRequiredCryptoNode$2) return cryptoNode$2;
  hasRequiredCryptoNode$2 = 1;
  Object.defineProperty(cryptoNode$2, "__esModule", { value: true });
  cryptoNode$2.crypto = void 0;
  const nc2 = nc__default;
  cryptoNode$2.crypto = nc2 && typeof nc2 === "object" && "webcrypto" in nc2 ? nc2.webcrypto : nc2 && typeof nc2 === "object" && "randomBytes" in nc2 ? nc2 : void 0;
  return cryptoNode$2;
}
var hasRequiredUtils$2;
function requireUtils$2() {
  if (hasRequiredUtils$2) return utils$2;
  hasRequiredUtils$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
    exports.isBytes = isBytes2;
    exports.anumber = anumber2;
    exports.abytes = abytes2;
    exports.ahash = ahash2;
    exports.aexists = aexists2;
    exports.aoutput = aoutput2;
    exports.u8 = u8;
    exports.u32 = u322;
    exports.clean = clean2;
    exports.createView = createView2;
    exports.rotr = rotr2;
    exports.rotl = rotl;
    exports.byteSwap = byteSwap2;
    exports.byteSwap32 = byteSwap322;
    exports.bytesToHex = bytesToHex2;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes2;
    exports.bytesToUtf8 = bytesToUtf8;
    exports.toBytes = toBytes2;
    exports.kdfInputToBytes = kdfInputToBytes;
    exports.concatBytes = concatBytes2;
    exports.checkOpts = checkOpts;
    exports.createHasher = createHasher2;
    exports.createOptHasher = createOptHasher;
    exports.createXOFer = createXOFer;
    exports.randomBytes = randomBytes2;
    const crypto_1 = /* @__PURE__ */ requireCryptoNode$2();
    function isBytes2(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function anumber2(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes2(b, ...lengths) {
      if (!isBytes2(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash2(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      anumber2(h.outputLen);
      anumber2(h.blockLen);
    }
    function aexists2(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput2(out, instance) {
      abytes2(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u322(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean2(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView2(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function rotr2(word, shift) {
      return word << 32 - shift | word >>> shift;
    }
    function rotl(word, shift) {
      return word << shift | word >>> 32 - shift >>> 0;
    }
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    function byteSwap2(word) {
      return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    }
    exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap2(n);
    exports.byteSwapIfBE = exports.swap8IfBE;
    function byteSwap322(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap2(arr[i]);
      }
      return arr;
    }
    exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap322;
    const hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    const hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(bytes2) {
      abytes2(bytes2);
      if (hasHexBuiltin)
        return bytes2.toHex();
      let hex = "";
      for (let i = 0; i < bytes2.length; i++) {
        hex += hexes2[bytes2[i]];
      }
      return hex;
    }
    const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      if (hasHexBuiltin)
        return Uint8Array.fromHex(hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    const nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes2(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes2) {
      return new TextDecoder().decode(bytes2);
    }
    function toBytes2(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function kdfInputToBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function concatBytes2(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes2(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    class Hash5 {
    }
    exports.Hash = Hash5;
    function createHasher2(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function createOptHasher(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function createXOFer(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructor = createHasher2;
    exports.wrapConstructorWithOpts = createOptHasher;
    exports.wrapXOFConstructorWithOpts = createXOFer;
    function randomBytes2(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(utils$2);
  return utils$2;
}
var hasRequiredHmac$1;
function requireHmac$1() {
  if (hasRequiredHmac$1) return hmac$2;
  hasRequiredHmac$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac = exports.HMAC = void 0;
    const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
    class HMAC3 extends utils_ts_1.Hash {
      constructor(hash, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        (0, utils_ts_1.ahash)(hash);
        const key = (0, utils_ts_1.toBytes)(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54;
        this.iHash.update(pad);
        this.oHash = hash.create();
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54 ^ 92;
        this.oHash.update(pad);
        (0, utils_ts_1.clean)(pad);
      }
      update(buf) {
        (0, utils_ts_1.aexists)(this);
        this.iHash.update(buf);
        return this;
      }
      digestInto(out) {
        (0, utils_ts_1.aexists)(this);
        (0, utils_ts_1.abytes)(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
      }
      digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
      }
      _cloneInto(to) {
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
      }
    }
    exports.HMAC = HMAC3;
    const hmac2 = (hash, key, message) => new HMAC3(hash, key).update(message).digest();
    exports.hmac = hmac2;
    exports.hmac.create = (hash, key) => new HMAC3(hash, key);
  })(hmac$2);
  return hmac$2;
}
var hasRequiredPbkdf2;
function requirePbkdf2() {
  if (hasRequiredPbkdf2) return pbkdf2;
  hasRequiredPbkdf2 = 1;
  Object.defineProperty(pbkdf2, "__esModule", { value: true });
  pbkdf2.pbkdf2 = pbkdf2$12;
  pbkdf2.pbkdf2Async = pbkdf2Async;
  const hmac_ts_1 = /* @__PURE__ */ requireHmac$1();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  function pbkdf2Init(hash, _password, _salt, _opts) {
    (0, utils_ts_1.ahash)(hash);
    const opts = (0, utils_ts_1.checkOpts)({ dkLen: 32, asyncTick: 10 }, _opts);
    const { c, dkLen, asyncTick } = opts;
    (0, utils_ts_1.anumber)(c);
    (0, utils_ts_1.anumber)(dkLen);
    (0, utils_ts_1.anumber)(asyncTick);
    if (c < 1)
      throw new Error("iterations (c) should be >= 1");
    const password = (0, utils_ts_1.kdfInputToBytes)(_password);
    const salt = (0, utils_ts_1.kdfInputToBytes)(_salt);
    const DK = new Uint8Array(dkLen);
    const PRF = hmac_ts_1.hmac.create(hash, password);
    const PRFSalt = PRF._cloneInto().update(salt);
    return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
  }
  function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
    PRF.destroy();
    PRFSalt.destroy();
    if (prfW)
      prfW.destroy();
    (0, utils_ts_1.clean)(u);
    return DK;
  }
  function pbkdf2$12(hash, password, salt, opts) {
    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW;
    const arr = new Uint8Array(4);
    const view = (0, utils_ts_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
      const Ti = DK.subarray(pos, pos + PRF.outputLen);
      view.setInt32(0, ti, false);
      (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
      Ti.set(u.subarray(0, Ti.length));
      for (let ui = 1; ui < c; ui++) {
        PRF._cloneInto(prfW).update(u).digestInto(u);
        for (let i = 0; i < Ti.length; i++)
          Ti[i] ^= u[i];
      }
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
  }
  async function pbkdf2Async(hash, password, salt, opts) {
    const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW;
    const arr = new Uint8Array(4);
    const view = (0, utils_ts_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
      const Ti = DK.subarray(pos, pos + PRF.outputLen);
      view.setInt32(0, ti, false);
      (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
      Ti.set(u.subarray(0, Ti.length));
      await (0, utils_ts_1.asyncLoop)(c - 1, asyncTick, () => {
        PRF._cloneInto(prfW).update(u).digestInto(u);
        for (let i = 0; i < Ti.length; i++)
          Ti[i] ^= u[i];
      });
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
  }
  return pbkdf2;
}
var sha2$1 = {};
var _md$1 = {};
var hasRequired_md$1;
function require_md$1() {
  if (hasRequired_md$1) return _md$1;
  hasRequired_md$1 = 1;
  Object.defineProperty(_md$1, "__esModule", { value: true });
  _md$1.SHA512_IV = _md$1.SHA384_IV = _md$1.SHA224_IV = _md$1.SHA256_IV = _md$1.HashMD = void 0;
  _md$1.setBigUint64 = setBigUint642;
  _md$1.Chi = Chi2;
  _md$1.Maj = Maj2;
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  function setBigUint642(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function Chi2(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj2(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  class HashMD5 extends utils_ts_1.Hash {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.buffer = new Uint8Array(blockLen);
      this.view = (0, utils_ts_1.createView)(this.buffer);
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const { view, buffer, blockLen } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = (0, utils_ts_1.createView)(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      (0, utils_ts_1.aexists)(this);
      (0, utils_ts_1.aoutput)(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      (0, utils_ts_1.clean)(this.buffer.subarray(pos));
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = (0, utils_ts_1.createView)(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.destroyed = destroyed;
      to.finished = finished;
      to.length = length;
      to.pos = pos;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
    clone() {
      return this._cloneInto();
    }
  }
  _md$1.HashMD = HashMD5;
  _md$1.SHA256_IV = Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  _md$1.SHA224_IV = Uint32Array.from([
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ]);
  _md$1.SHA384_IV = Uint32Array.from([
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ]);
  _md$1.SHA512_IV = Uint32Array.from([
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ]);
  return _md$1;
}
var _u64$2 = {};
var hasRequired_u64$2;
function require_u64$2() {
  if (hasRequired_u64$2) return _u64$2;
  hasRequired_u64$2 = 1;
  Object.defineProperty(_u64$2, "__esModule", { value: true });
  _u64$2.toBig = _u64$2.shrSL = _u64$2.shrSH = _u64$2.rotrSL = _u64$2.rotrSH = _u64$2.rotrBL = _u64$2.rotrBH = _u64$2.rotr32L = _u64$2.rotr32H = _u64$2.rotlSL = _u64$2.rotlSH = _u64$2.rotlBL = _u64$2.rotlBH = _u64$2.add5L = _u64$2.add5H = _u64$2.add4L = _u64$2.add4H = _u64$2.add3L = _u64$2.add3H = void 0;
  _u64$2.add = add2;
  _u64$2.fromBig = fromBig2;
  _u64$2.split = split2;
  const U32_MASK642 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  const _32n2 = /* @__PURE__ */ BigInt(32);
  function fromBig2(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
    return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
  }
  function split2(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for (let i = 0; i < len; i++) {
      const { h, l } = fromBig2(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  const toBig = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
  _u64$2.toBig = toBig;
  const shrSH2 = (h, _l, s) => h >>> s;
  _u64$2.shrSH = shrSH2;
  const shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$2.shrSL = shrSL2;
  const rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
  _u64$2.rotrSH = rotrSH2;
  const rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$2.rotrSL = rotrSL2;
  const rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
  _u64$2.rotrBH = rotrBH2;
  const rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
  _u64$2.rotrBL = rotrBL2;
  const rotr32H = (_h, l) => l;
  _u64$2.rotr32H = rotr32H;
  const rotr32L = (h, _l) => h;
  _u64$2.rotr32L = rotr32L;
  const rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
  _u64$2.rotlSH = rotlSH2;
  const rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
  _u64$2.rotlSL = rotlSL2;
  const rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
  _u64$2.rotlBH = rotlBH2;
  const rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
  _u64$2.rotlBL = rotlBL2;
  function add2(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  const add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  _u64$2.add3L = add3L2;
  const add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  _u64$2.add3H = add3H2;
  const add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  _u64$2.add4L = add4L2;
  const add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  _u64$2.add4H = add4H2;
  const add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  _u64$2.add5L = add5L2;
  const add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  _u64$2.add5H = add5H2;
  const u64 = {
    fromBig: fromBig2,
    split: split2,
    toBig,
    shrSH: shrSH2,
    shrSL: shrSL2,
    rotrSH: rotrSH2,
    rotrSL: rotrSL2,
    rotrBH: rotrBH2,
    rotrBL: rotrBL2,
    rotr32H,
    rotr32L,
    rotlSH: rotlSH2,
    rotlSL: rotlSL2,
    rotlBH: rotlBH2,
    rotlBL: rotlBL2,
    add: add2,
    add3L: add3L2,
    add3H: add3H2,
    add4L: add4L2,
    add4H: add4H2,
    add5H: add5H2,
    add5L: add5L2
  };
  _u64$2.default = u64;
  return _u64$2;
}
var hasRequiredSha2$1;
function requireSha2$1() {
  if (hasRequiredSha2$1) return sha2$1;
  hasRequiredSha2$1 = 1;
  Object.defineProperty(sha2$1, "__esModule", { value: true });
  sha2$1.sha512_224 = sha2$1.sha512_256 = sha2$1.sha384 = sha2$1.sha512 = sha2$1.sha224 = sha2$1.sha256 = sha2$1.SHA512_256 = sha2$1.SHA512_224 = sha2$1.SHA384 = sha2$1.SHA512 = sha2$1.SHA224 = sha2$1.SHA256 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md$1();
  const u64 = /* @__PURE__ */ require_u64$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const SHA256_K2 = /* @__PURE__ */ Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  const SHA256_W2 = /* @__PURE__ */ new Uint32Array(64);
  class SHA2565 extends _md_ts_1.HashMD {
    constructor(outputLen = 32) {
      super(64, outputLen, 8, false);
      this.A = _md_ts_1.SHA256_IV[0] | 0;
      this.B = _md_ts_1.SHA256_IV[1] | 0;
      this.C = _md_ts_1.SHA256_IV[2] | 0;
      this.D = _md_ts_1.SHA256_IV[3] | 0;
      this.E = _md_ts_1.SHA256_IV[4] | 0;
      this.F = _md_ts_1.SHA256_IV[5] | 0;
      this.G = _md_ts_1.SHA256_IV[6] | 0;
      this.H = _md_ts_1.SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W2[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W2[i - 15];
        const W2 = SHA256_W2[i - 2];
        const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
        const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
        SHA256_W2[i] = s1 + SHA256_W2[i - 7] + s0 + SHA256_W2[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
        const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K2[i] + SHA256_W2[i] | 0;
        const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
        const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA256_W2);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  sha2$1.SHA256 = SHA2565;
  class SHA224 extends SHA2565 {
    constructor() {
      super(28);
      this.A = _md_ts_1.SHA224_IV[0] | 0;
      this.B = _md_ts_1.SHA224_IV[1] | 0;
      this.C = _md_ts_1.SHA224_IV[2] | 0;
      this.D = _md_ts_1.SHA224_IV[3] | 0;
      this.E = _md_ts_1.SHA224_IV[4] | 0;
      this.F = _md_ts_1.SHA224_IV[5] | 0;
      this.G = _md_ts_1.SHA224_IV[6] | 0;
      this.H = _md_ts_1.SHA224_IV[7] | 0;
    }
  }
  sha2$1.SHA224 = SHA224;
  const K5122 = /* @__PURE__ */ (() => u64.split([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
  ].map((n) => BigInt(n))))();
  const SHA512_Kh2 = /* @__PURE__ */ (() => K5122[0])();
  const SHA512_Kl2 = /* @__PURE__ */ (() => K5122[1])();
  const SHA512_W_H2 = /* @__PURE__ */ new Uint32Array(80);
  const SHA512_W_L2 = /* @__PURE__ */ new Uint32Array(80);
  class SHA5122 extends _md_ts_1.HashMD {
    constructor(outputLen = 64) {
      super(128, outputLen, 16, false);
      this.Ah = _md_ts_1.SHA512_IV[0] | 0;
      this.Al = _md_ts_1.SHA512_IV[1] | 0;
      this.Bh = _md_ts_1.SHA512_IV[2] | 0;
      this.Bl = _md_ts_1.SHA512_IV[3] | 0;
      this.Ch = _md_ts_1.SHA512_IV[4] | 0;
      this.Cl = _md_ts_1.SHA512_IV[5] | 0;
      this.Dh = _md_ts_1.SHA512_IV[6] | 0;
      this.Dl = _md_ts_1.SHA512_IV[7] | 0;
      this.Eh = _md_ts_1.SHA512_IV[8] | 0;
      this.El = _md_ts_1.SHA512_IV[9] | 0;
      this.Fh = _md_ts_1.SHA512_IV[10] | 0;
      this.Fl = _md_ts_1.SHA512_IV[11] | 0;
      this.Gh = _md_ts_1.SHA512_IV[12] | 0;
      this.Gl = _md_ts_1.SHA512_IV[13] | 0;
      this.Hh = _md_ts_1.SHA512_IV[14] | 0;
      this.Hl = _md_ts_1.SHA512_IV[15] | 0;
    }
    // prettier-ignore
    get() {
      const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
      this.Ah = Ah | 0;
      this.Al = Al | 0;
      this.Bh = Bh | 0;
      this.Bl = Bl | 0;
      this.Ch = Ch | 0;
      this.Cl = Cl | 0;
      this.Dh = Dh | 0;
      this.Dl = Dl | 0;
      this.Eh = Eh | 0;
      this.El = El | 0;
      this.Fh = Fh | 0;
      this.Fl = Fl | 0;
      this.Gh = Gh | 0;
      this.Gl = Gl | 0;
      this.Hh = Hh | 0;
      this.Hl = Hl | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4) {
        SHA512_W_H2[i] = view.getUint32(offset);
        SHA512_W_L2[i] = view.getUint32(offset += 4);
      }
      for (let i = 16; i < 80; i++) {
        const W15h = SHA512_W_H2[i - 15] | 0;
        const W15l = SHA512_W_L2[i - 15] | 0;
        const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
        const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
        const W2h = SHA512_W_H2[i - 2] | 0;
        const W2l = SHA512_W_L2[i - 2] | 0;
        const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
        const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
        const SUMl = u64.add4L(s0l, s1l, SHA512_W_L2[i - 7], SHA512_W_L2[i - 16]);
        const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H2[i - 7], SHA512_W_H2[i - 16]);
        SHA512_W_H2[i] = SUMh | 0;
        SHA512_W_L2[i] = SUMl | 0;
      }
      let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      for (let i = 0; i < 80; i++) {
        const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
        const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
        const CHIh = Eh & Fh ^ ~Eh & Gh;
        const CHIl = El & Fl ^ ~El & Gl;
        const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl2[i], SHA512_W_L2[i]);
        const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh2[i], SHA512_W_H2[i]);
        const T1l = T1ll | 0;
        const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
        const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
        const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
        const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
        Hh = Gh | 0;
        Hl = Gl | 0;
        Gh = Fh | 0;
        Gl = Fl | 0;
        Fh = Eh | 0;
        Fl = El | 0;
        ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
        Dh = Ch | 0;
        Dl = Cl | 0;
        Ch = Bh | 0;
        Cl = Bl | 0;
        Bh = Ah | 0;
        Bl = Al | 0;
        const All = u64.add3L(T1l, sigma0l, MAJl);
        Ah = u64.add3H(All, T1h, sigma0h, MAJh);
        Al = All | 0;
      }
      ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
      ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
      ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
      ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
      ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
      ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
      ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
      ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
      this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA512_W_H2, SHA512_W_L2);
    }
    destroy() {
      (0, utils_ts_1.clean)(this.buffer);
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  sha2$1.SHA512 = SHA5122;
  class SHA3842 extends SHA5122 {
    constructor() {
      super(48);
      this.Ah = _md_ts_1.SHA384_IV[0] | 0;
      this.Al = _md_ts_1.SHA384_IV[1] | 0;
      this.Bh = _md_ts_1.SHA384_IV[2] | 0;
      this.Bl = _md_ts_1.SHA384_IV[3] | 0;
      this.Ch = _md_ts_1.SHA384_IV[4] | 0;
      this.Cl = _md_ts_1.SHA384_IV[5] | 0;
      this.Dh = _md_ts_1.SHA384_IV[6] | 0;
      this.Dl = _md_ts_1.SHA384_IV[7] | 0;
      this.Eh = _md_ts_1.SHA384_IV[8] | 0;
      this.El = _md_ts_1.SHA384_IV[9] | 0;
      this.Fh = _md_ts_1.SHA384_IV[10] | 0;
      this.Fl = _md_ts_1.SHA384_IV[11] | 0;
      this.Gh = _md_ts_1.SHA384_IV[12] | 0;
      this.Gl = _md_ts_1.SHA384_IV[13] | 0;
      this.Hh = _md_ts_1.SHA384_IV[14] | 0;
      this.Hl = _md_ts_1.SHA384_IV[15] | 0;
    }
  }
  sha2$1.SHA384 = SHA3842;
  const T224_IV = /* @__PURE__ */ Uint32Array.from([
    2352822216,
    424955298,
    1944164710,
    2312950998,
    502970286,
    855612546,
    1738396948,
    1479516111,
    258812777,
    2077511080,
    2011393907,
    79989058,
    1067287976,
    1780299464,
    286451373,
    2446758561
  ]);
  const T256_IV = /* @__PURE__ */ Uint32Array.from([
    573645204,
    4230739756,
    2673172387,
    3360449730,
    596883563,
    1867755857,
    2520282905,
    1497426621,
    2519219938,
    2827943907,
    3193839141,
    1401305490,
    721525244,
    746961066,
    246885852,
    2177182882
  ]);
  class SHA512_224 extends SHA5122 {
    constructor() {
      super(28);
      this.Ah = T224_IV[0] | 0;
      this.Al = T224_IV[1] | 0;
      this.Bh = T224_IV[2] | 0;
      this.Bl = T224_IV[3] | 0;
      this.Ch = T224_IV[4] | 0;
      this.Cl = T224_IV[5] | 0;
      this.Dh = T224_IV[6] | 0;
      this.Dl = T224_IV[7] | 0;
      this.Eh = T224_IV[8] | 0;
      this.El = T224_IV[9] | 0;
      this.Fh = T224_IV[10] | 0;
      this.Fl = T224_IV[11] | 0;
      this.Gh = T224_IV[12] | 0;
      this.Gl = T224_IV[13] | 0;
      this.Hh = T224_IV[14] | 0;
      this.Hl = T224_IV[15] | 0;
    }
  }
  sha2$1.SHA512_224 = SHA512_224;
  class SHA512_256 extends SHA5122 {
    constructor() {
      super(32);
      this.Ah = T256_IV[0] | 0;
      this.Al = T256_IV[1] | 0;
      this.Bh = T256_IV[2] | 0;
      this.Bl = T256_IV[3] | 0;
      this.Ch = T256_IV[4] | 0;
      this.Cl = T256_IV[5] | 0;
      this.Dh = T256_IV[6] | 0;
      this.Dl = T256_IV[7] | 0;
      this.Eh = T256_IV[8] | 0;
      this.El = T256_IV[9] | 0;
      this.Fh = T256_IV[10] | 0;
      this.Fl = T256_IV[11] | 0;
      this.Gh = T256_IV[12] | 0;
      this.Gl = T256_IV[13] | 0;
      this.Hh = T256_IV[14] | 0;
      this.Hl = T256_IV[15] | 0;
    }
  }
  sha2$1.SHA512_256 = SHA512_256;
  sha2$1.sha256 = (0, utils_ts_1.createHasher)(() => new SHA2565());
  sha2$1.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
  sha2$1.sha512 = (0, utils_ts_1.createHasher)(() => new SHA5122());
  sha2$1.sha384 = (0, utils_ts_1.createHasher)(() => new SHA3842());
  sha2$1.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
  sha2$1.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
  return sha2$1;
}
function isBytes$2(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes$1(b, ...lengths) {
  if (!isBytes$2(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists$1(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput$1(out, instance) {
  abytes$1(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView$2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr$2(word, shift) {
  return word << 32 - shift | word >>> shift;
}
function utf8ToBytes$2(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes$2(data) {
  if (typeof data === "string")
    data = utf8ToBytes$2(data);
  abytes$1(data);
  return data;
}
let Hash$2 = class Hash2 {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes$2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function setBigUint64$2(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function Chi$2(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj$2(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
let HashMD$2 = class HashMD2 extends Hash$2 {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView$2(this.buffer);
  }
  update(data) {
    aexists$1(this);
    data = toBytes$2(data);
    abytes$1(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView$2(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists$1(this);
    aoutput$1(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64$2(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView$2(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
const SHA256_IV$2 = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA256_K$2 = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_W$2 = /* @__PURE__ */ new Uint32Array(64);
let SHA256$2 = class SHA2562 extends HashMD$2 {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV$2[0] | 0;
    this.B = SHA256_IV$2[1] | 0;
    this.C = SHA256_IV$2[2] | 0;
    this.D = SHA256_IV$2[3] | 0;
    this.E = SHA256_IV$2[4] | 0;
    this.F = SHA256_IV$2[5] | 0;
    this.G = SHA256_IV$2[6] | 0;
    this.H = SHA256_IV$2[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W$2[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W$2[i - 15];
      const W2 = SHA256_W$2[i - 2];
      const s0 = rotr$2(W15, 7) ^ rotr$2(W15, 18) ^ W15 >>> 3;
      const s1 = rotr$2(W2, 17) ^ rotr$2(W2, 19) ^ W2 >>> 10;
      SHA256_W$2[i] = s1 + SHA256_W$2[i - 7] + s0 + SHA256_W$2[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr$2(E, 6) ^ rotr$2(E, 11) ^ rotr$2(E, 25);
      const T1 = H + sigma1 + Chi$2(E, F, G) + SHA256_K$2[i] + SHA256_W$2[i] | 0;
      const sigma0 = rotr$2(A, 2) ^ rotr$2(A, 13) ^ rotr$2(A, 22);
      const T2 = sigma0 + Maj$2(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W$2);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
const sha256$4 = /* @__PURE__ */ createHasher(() => new SHA256$2());
const sha256$3 = sha256$4;
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function isBytes$1(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(b, ...lengths) {
  if (!isBytes$1(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
const crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
const createView$1 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
const rotr$1 = (word, shift) => word << 32 - shift | word >>> shift;
function utf8ToBytes$1(str) {
  if (typeof str !== "string")
    throw new Error("utf8ToBytes expected string, got " + typeof str);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes$1(data) {
  if (typeof data === "string")
    data = utf8ToBytes$1(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
let Hash$1 = class Hash3 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor$1(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes$1(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto && typeof crypto.randomBytes === "function") {
    return crypto.randomBytes(bytesLength);
  }
  throw new Error("crypto.getRandomValues must be defined");
}
function setBigUint64$1(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
const Chi$1 = (a, b, c) => a & b ^ ~a & c;
const Maj$1 = (a, b, c) => a & b ^ a & c ^ b & c;
let HashMD$1 = class HashMD3 extends Hash$1 {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView$1(this.buffer);
  }
  update(data) {
    aexists(this);
    const { view, buffer, blockLen } = this;
    data = toBytes$1(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView$1(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64$1(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView$1(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.length = length;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
};
const SHA256_K$1 = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_IV$1 = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA256_W$1 = /* @__PURE__ */ new Uint32Array(64);
let SHA256$1 = class SHA2563 extends HashMD$1 {
  constructor() {
    super(64, 32, 8, false);
    this.A = SHA256_IV$1[0] | 0;
    this.B = SHA256_IV$1[1] | 0;
    this.C = SHA256_IV$1[2] | 0;
    this.D = SHA256_IV$1[3] | 0;
    this.E = SHA256_IV$1[4] | 0;
    this.F = SHA256_IV$1[5] | 0;
    this.G = SHA256_IV$1[6] | 0;
    this.H = SHA256_IV$1[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W$1[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W$1[i - 15];
      const W2 = SHA256_W$1[i - 2];
      const s0 = rotr$1(W15, 7) ^ rotr$1(W15, 18) ^ W15 >>> 3;
      const s1 = rotr$1(W2, 17) ^ rotr$1(W2, 19) ^ W2 >>> 10;
      SHA256_W$1[i] = s1 + SHA256_W$1[i - 7] + s0 + SHA256_W$1[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr$1(E, 6) ^ rotr$1(E, 11) ^ rotr$1(E, 25);
      const T1 = H + sigma1 + Chi$1(E, F, G) + SHA256_K$1[i] + SHA256_W$1[i] | 0;
      const sigma0 = rotr$1(A, 2) ^ rotr$1(A, 13) ^ rotr$1(A, 22);
      const T2 = sigma0 + Maj$1(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SHA256_W$1.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
const sha256$2 = /* @__PURE__ */ wrapConstructor$1(() => new SHA256$1());
class HMAC2 extends Hash$1 {
  constructor(hash, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash(hash);
    const key = toBytes$1(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
}
const hmac$1 = (hash, key, message) => new HMAC2(hash, key).update(message).digest();
hmac$1.create = (hash, key) => new HMAC2(hash, key);
var sha3$1 = {};
var _assert = {};
var hasRequired_assert;
function require_assert() {
  if (hasRequired_assert) return _assert;
  hasRequired_assert = 1;
  Object.defineProperty(_assert, "__esModule", { value: true });
  _assert.output = _assert.exists = _assert.hash = _assert.bytes = _assert.bool = _assert.number = _assert.isBytes = void 0;
  function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`positive integer expected, not ${n}`);
  }
  _assert.number = number;
  function bool(b) {
    if (typeof b !== "boolean")
      throw new Error(`boolean expected, not ${b}`);
  }
  _assert.bool = bool;
  function isBytes2(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  _assert.isBytes = isBytes2;
  function bytes2(b, ...lengths) {
    if (!isBytes2(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
  }
  _assert.bytes = bytes2;
  function hash(h) {
    if (typeof h !== "function" || typeof h.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number(h.outputLen);
    number(h.blockLen);
  }
  _assert.hash = hash;
  function exists2(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  _assert.exists = exists2;
  function output2(out, instance) {
    bytes2(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }
  _assert.output = output2;
  const assert = { number, bool, bytes: bytes2, hash, exists: exists2, output: output2 };
  _assert.default = assert;
  return _assert;
}
var _u64$1 = {};
var hasRequired_u64$1;
function require_u64$1() {
  if (hasRequired_u64$1) return _u64$1;
  hasRequired_u64$1 = 1;
  Object.defineProperty(_u64$1, "__esModule", { value: true });
  _u64$1.add5L = _u64$1.add5H = _u64$1.add4H = _u64$1.add4L = _u64$1.add3H = _u64$1.add3L = _u64$1.add = _u64$1.rotlBL = _u64$1.rotlBH = _u64$1.rotlSL = _u64$1.rotlSH = _u64$1.rotr32L = _u64$1.rotr32H = _u64$1.rotrBL = _u64$1.rotrBH = _u64$1.rotrSL = _u64$1.rotrSH = _u64$1.shrSL = _u64$1.shrSH = _u64$1.toBig = _u64$1.split = _u64$1.fromBig = void 0;
  const U32_MASK642 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  const _32n2 = /* @__PURE__ */ BigInt(32);
  function fromBig2(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
    return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
  }
  _u64$1.fromBig = fromBig2;
  function split2(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
      const { h, l } = fromBig2(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  _u64$1.split = split2;
  const toBig = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
  _u64$1.toBig = toBig;
  const shrSH2 = (h, _l, s) => h >>> s;
  _u64$1.shrSH = shrSH2;
  const shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$1.shrSL = shrSL2;
  const rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
  _u64$1.rotrSH = rotrSH2;
  const rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64$1.rotrSL = rotrSL2;
  const rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
  _u64$1.rotrBH = rotrBH2;
  const rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
  _u64$1.rotrBL = rotrBL2;
  const rotr32H = (_h, l) => l;
  _u64$1.rotr32H = rotr32H;
  const rotr32L = (h, _l) => h;
  _u64$1.rotr32L = rotr32L;
  const rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
  _u64$1.rotlSH = rotlSH2;
  const rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
  _u64$1.rotlSL = rotlSL2;
  const rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
  _u64$1.rotlBH = rotlBH2;
  const rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
  _u64$1.rotlBL = rotlBL2;
  function add2(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  _u64$1.add = add2;
  const add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  _u64$1.add3L = add3L2;
  const add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  _u64$1.add3H = add3H2;
  const add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  _u64$1.add4L = add4L2;
  const add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  _u64$1.add4H = add4H2;
  const add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  _u64$1.add5L = add5L2;
  const add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  _u64$1.add5H = add5H2;
  const u64 = {
    fromBig: fromBig2,
    split: split2,
    toBig,
    shrSH: shrSH2,
    shrSL: shrSL2,
    rotrSH: rotrSH2,
    rotrSL: rotrSL2,
    rotrBH: rotrBH2,
    rotrBL: rotrBL2,
    rotr32H,
    rotr32L,
    rotlSH: rotlSH2,
    rotlSL: rotlSL2,
    rotlBH: rotlBH2,
    rotlBL: rotlBL2,
    add: add2,
    add3L: add3L2,
    add3H: add3H2,
    add4L: add4L2,
    add4H: add4H2,
    add5H: add5H2,
    add5L: add5L2
  };
  _u64$1.default = u64;
  return _u64$1;
}
var utils$1 = {};
var cryptoNode$1 = {};
var hasRequiredCryptoNode$1;
function requireCryptoNode$1() {
  if (hasRequiredCryptoNode$1) return cryptoNode$1;
  hasRequiredCryptoNode$1 = 1;
  Object.defineProperty(cryptoNode$1, "__esModule", { value: true });
  cryptoNode$1.crypto = void 0;
  const nc2 = nc__default;
  cryptoNode$1.crypto = nc2 && typeof nc2 === "object" && "webcrypto" in nc2 ? nc2.webcrypto : void 0;
  return cryptoNode$1;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.byteSwap32 = exports.byteSwapIfBE = exports.byteSwap = exports.isLE = exports.rotl = exports.rotr = exports.createView = exports.u32 = exports.u8 = exports.isBytes = void 0;
    const crypto_1 = /* @__PURE__ */ requireCryptoNode$1();
    const _assert_js_1 = /* @__PURE__ */ require_assert();
    function isBytes2(a) {
      return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
    }
    exports.isBytes = isBytes2;
    const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    const u322 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u322;
    const createView2 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView2;
    const rotr2 = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr2;
    const rotl = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
    exports.rotl = rotl;
    exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const byteSwap2 = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    exports.byteSwap = byteSwap2;
    exports.byteSwapIfBE = exports.isLE ? (n) => n : (n) => (0, exports.byteSwap)(n);
    function byteSwap322(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = (0, exports.byteSwap)(arr[i]);
      }
    }
    exports.byteSwap32 = byteSwap322;
    const hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(bytes2) {
      (0, _assert_js_1.bytes)(bytes2);
      let hex = "";
      for (let i = 0; i < bytes2.length; i++) {
        hex += hexes2[bytes2[i]];
      }
      return hex;
    }
    exports.bytesToHex = bytesToHex2;
    const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
    function asciiToBase16(char) {
      if (char >= asciis._0 && char <= asciis._9)
        return char - asciis._0;
      if (char >= asciis._A && char <= asciis._F)
        return char - (asciis._A - 10);
      if (char >= asciis._a && char <= asciis._f)
        return char - (asciis._a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    exports.hexToBytes = hexToBytes;
    const nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    exports.asyncLoop = asyncLoop;
    function utf8ToBytes2(str) {
      if (typeof str !== "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    exports.utf8ToBytes = utf8ToBytes2;
    function toBytes2(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      (0, _assert_js_1.bytes)(data);
      return data;
    }
    exports.toBytes = toBytes2;
    function concatBytes2(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0, _assert_js_1.bytes)(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    exports.concatBytes = concatBytes2;
    class Hash5 {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    }
    exports.Hash = Hash5;
    const toStr = {}.toString;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && toStr.call(opts) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    exports.checkOpts = checkOpts;
    function wrapConstructor2(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    exports.wrapConstructor = wrapConstructor2;
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    function wrapXOFConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
    function randomBytes2(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
    exports.randomBytes = randomBytes2;
  })(utils$1);
  return utils$1;
}
var hasRequiredSha3$1;
function requireSha3$1() {
  if (hasRequiredSha3$1) return sha3$1;
  hasRequiredSha3$1 = 1;
  Object.defineProperty(sha3$1, "__esModule", { value: true });
  sha3$1.shake256 = sha3$1.shake128 = sha3$1.keccak_512 = sha3$1.keccak_384 = sha3$1.keccak_256 = sha3$1.keccak_224 = sha3$1.sha3_512 = sha3$1.sha3_384 = sha3$1.sha3_256 = sha3$1.sha3_224 = sha3$1.Keccak = sha3$1.keccakP = void 0;
  const _assert_js_1 = /* @__PURE__ */ require_assert();
  const _u64_js_1 = /* @__PURE__ */ require_u64$1();
  const utils_js_1 = /* @__PURE__ */ requireUtils$1();
  const SHA3_PI2 = [];
  const SHA3_ROTL2 = [];
  const _SHA3_IOTA2 = [];
  const _0n2 = /* @__PURE__ */ BigInt(0);
  const _1n2 = /* @__PURE__ */ BigInt(1);
  const _2n2 = /* @__PURE__ */ BigInt(2);
  const _7n2 = /* @__PURE__ */ BigInt(7);
  const _256n2 = /* @__PURE__ */ BigInt(256);
  const _0x71n2 = /* @__PURE__ */ BigInt(113);
  for (let round = 0, R = _1n2, x = 1, y = 0; round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI2.push(2 * (5 * y + x));
    SHA3_ROTL2.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n2;
    for (let j = 0; j < 7; j++) {
      R = (R << _1n2 ^ (R >> _7n2) * _0x71n2) % _256n2;
      if (R & _2n2)
        t ^= _1n2 << (_1n2 << /* @__PURE__ */ BigInt(j)) - _1n2;
    }
    _SHA3_IOTA2.push(t);
  }
  const [SHA3_IOTA_H2, SHA3_IOTA_L2] = /* @__PURE__ */ (0, _u64_js_1.split)(_SHA3_IOTA2, true);
  const rotlH2 = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBH)(h, l, s) : (0, _u64_js_1.rotlSH)(h, l, s);
  const rotlL2 = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBL)(h, l, s) : (0, _u64_js_1.rotlSL)(h, l, s);
  function keccakP2(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH2(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL2(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL2[t];
        const Th = rotlH2(curH, curL, shift);
        const Tl = rotlL2(curH, curL, shift);
        const PI = SHA3_PI2[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H2[round];
      s[1] ^= SHA3_IOTA_L2[round];
    }
    B.fill(0);
  }
  sha3$1.keccakP = keccakP2;
  class Keccak2 extends utils_js_1.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
      super();
      this.blockLen = blockLen;
      this.suffix = suffix;
      this.outputLen = outputLen;
      this.enableXOF = enableXOF;
      this.rounds = rounds;
      this.pos = 0;
      this.posOut = 0;
      this.finished = false;
      this.destroyed = false;
      (0, _assert_js_1.number)(outputLen);
      if (0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200);
      this.state32 = (0, utils_js_1.u32)(this.state);
    }
    keccak() {
      if (!utils_js_1.isLE)
        (0, utils_js_1.byteSwap32)(this.state32);
      keccakP2(this.state32, this.rounds);
      if (!utils_js_1.isLE)
        (0, utils_js_1.byteSwap32)(this.state32);
      this.posOut = 0;
      this.pos = 0;
    }
    update(data) {
      (0, _assert_js_1.exists)(this);
      const { blockLen, state } = this;
      data = (0, utils_js_1.toBytes)(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        for (let i = 0; i < take; i++)
          state[this.pos++] ^= data[pos++];
        if (this.pos === blockLen)
          this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      const { state, suffix, pos, blockLen } = this;
      state[pos] ^= suffix;
      if ((suffix & 128) !== 0 && pos === blockLen - 1)
        this.keccak();
      state[blockLen - 1] ^= 128;
      this.keccak();
    }
    writeInto(out) {
      (0, _assert_js_1.exists)(this, false);
      (0, _assert_js_1.bytes)(out);
      this.finish();
      const bufferOut = this.state;
      const { blockLen } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.keccak();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(out);
    }
    xof(bytes2) {
      (0, _assert_js_1.number)(bytes2);
      return this.xofInto(new Uint8Array(bytes2));
    }
    digestInto(out) {
      (0, _assert_js_1.output)(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true;
      this.state.fill(0);
    }
    _cloneInto(to) {
      const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
      to || (to = new Keccak2(blockLen, suffix, outputLen, enableXOF, rounds));
      to.state32.set(this.state32);
      to.pos = this.pos;
      to.posOut = this.posOut;
      to.finished = this.finished;
      to.rounds = rounds;
      to.suffix = suffix;
      to.outputLen = outputLen;
      to.enableXOF = enableXOF;
      to.destroyed = this.destroyed;
      return to;
    }
  }
  sha3$1.Keccak = Keccak2;
  const gen2 = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak2(blockLen, suffix, outputLen));
  sha3$1.sha3_224 = gen2(6, 144, 224 / 8);
  sha3$1.sha3_256 = gen2(6, 136, 256 / 8);
  sha3$1.sha3_384 = gen2(6, 104, 384 / 8);
  sha3$1.sha3_512 = gen2(6, 72, 512 / 8);
  sha3$1.keccak_224 = gen2(1, 144, 224 / 8);
  sha3$1.keccak_256 = gen2(1, 136, 256 / 8);
  sha3$1.keccak_384 = gen2(1, 104, 384 / 8);
  sha3$1.keccak_512 = gen2(1, 72, 512 / 8);
  const genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak2(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
  sha3$1.shake128 = genShake(31, 168, 128 / 8);
  sha3$1.shake256 = genShake(31, 136, 256 / 8);
  return sha3$1;
}
function isBytes(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
function bytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
const rotr = (word, shift) => word << 32 - shift | word >>> shift;
new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes$1) {
  bytes(bytes$1);
  let hex = "";
  for (let i = 0; i < bytes$1.length; i++) {
    hex += hexes[bytes$1[i]];
  }
  return hex;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  bytes(data);
  return data;
}
class Hash4 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
const Chi = (a, b, c) => a & b ^ ~a & c;
const Maj = (a, b, c) => a & b ^ a & c ^ b & c;
class HashMD4 extends Hash4 {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    exists(this);
    const { view, buffer, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    exists(this);
    output(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.length = length;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
}
const SHA256_K = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_IV = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA2564 extends HashMD4 {
  constructor() {
    super(64, 32, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
}
const sha256$1 = /* @__PURE__ */ wrapConstructor(() => new SHA2564());
var sha3 = {};
var _u64 = {};
var hasRequired_u64;
function require_u64() {
  if (hasRequired_u64) return _u64;
  hasRequired_u64 = 1;
  Object.defineProperty(_u64, "__esModule", { value: true });
  _u64.toBig = _u64.shrSL = _u64.shrSH = _u64.rotrSL = _u64.rotrSH = _u64.rotrBL = _u64.rotrBH = _u64.rotr32L = _u64.rotr32H = _u64.rotlSL = _u64.rotlSH = _u64.rotlBL = _u64.rotlBH = _u64.add5L = _u64.add5H = _u64.add4L = _u64.add4H = _u64.add3L = _u64.add3H = void 0;
  _u64.add = add2;
  _u64.fromBig = fromBig2;
  _u64.split = split2;
  const U32_MASK642 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  const _32n2 = /* @__PURE__ */ BigInt(32);
  function fromBig2(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
    return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
  }
  function split2(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for (let i = 0; i < len; i++) {
      const { h, l } = fromBig2(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  const toBig = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
  _u64.toBig = toBig;
  const shrSH2 = (h, _l, s) => h >>> s;
  _u64.shrSH = shrSH2;
  const shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64.shrSL = shrSL2;
  const rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
  _u64.rotrSH = rotrSH2;
  const rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
  _u64.rotrSL = rotrSL2;
  const rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
  _u64.rotrBH = rotrBH2;
  const rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
  _u64.rotrBL = rotrBL2;
  const rotr32H = (_h, l) => l;
  _u64.rotr32H = rotr32H;
  const rotr32L = (h, _l) => h;
  _u64.rotr32L = rotr32L;
  const rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
  _u64.rotlSH = rotlSH2;
  const rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
  _u64.rotlSL = rotlSL2;
  const rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
  _u64.rotlBH = rotlBH2;
  const rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
  _u64.rotlBL = rotlBL2;
  function add2(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  const add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  _u64.add3L = add3L2;
  const add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  _u64.add3H = add3H2;
  const add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  _u64.add4L = add4L2;
  const add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  _u64.add4H = add4H2;
  const add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  _u64.add5L = add5L2;
  const add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  _u64.add5H = add5H2;
  const u64 = {
    fromBig: fromBig2,
    split: split2,
    toBig,
    shrSH: shrSH2,
    shrSL: shrSL2,
    rotrSH: rotrSH2,
    rotrSL: rotrSL2,
    rotrBH: rotrBH2,
    rotrBL: rotrBL2,
    rotr32H,
    rotr32L,
    rotlSH: rotlSH2,
    rotlSL: rotlSL2,
    rotlBH: rotlBH2,
    rotlBL: rotlBL2,
    add: add2,
    add3L: add3L2,
    add3H: add3H2,
    add4L: add4L2,
    add4H: add4H2,
    add5H: add5H2,
    add5L: add5L2
  };
  _u64.default = u64;
  return _u64;
}
var utils = {};
var cryptoNode = {};
var hasRequiredCryptoNode;
function requireCryptoNode() {
  if (hasRequiredCryptoNode) return cryptoNode;
  hasRequiredCryptoNode = 1;
  Object.defineProperty(cryptoNode, "__esModule", { value: true });
  cryptoNode.crypto = void 0;
  const nc2 = nc__default;
  cryptoNode.crypto = nc2 && typeof nc2 === "object" && "webcrypto" in nc2 ? nc2.webcrypto : nc2 && typeof nc2 === "object" && "randomBytes" in nc2 ? nc2 : void 0;
  return cryptoNode;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
    exports.isBytes = isBytes2;
    exports.anumber = anumber2;
    exports.abytes = abytes2;
    exports.ahash = ahash2;
    exports.aexists = aexists2;
    exports.aoutput = aoutput2;
    exports.u8 = u8;
    exports.u32 = u322;
    exports.clean = clean2;
    exports.createView = createView2;
    exports.rotr = rotr2;
    exports.rotl = rotl;
    exports.byteSwap = byteSwap2;
    exports.byteSwap32 = byteSwap322;
    exports.bytesToHex = bytesToHex2;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes2;
    exports.bytesToUtf8 = bytesToUtf8;
    exports.toBytes = toBytes2;
    exports.kdfInputToBytes = kdfInputToBytes;
    exports.concatBytes = concatBytes2;
    exports.checkOpts = checkOpts;
    exports.createHasher = createHasher2;
    exports.createOptHasher = createOptHasher;
    exports.createXOFer = createXOFer;
    exports.randomBytes = randomBytes2;
    const crypto_1 = /* @__PURE__ */ requireCryptoNode();
    function isBytes2(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function anumber2(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes2(b, ...lengths) {
      if (!isBytes2(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash2(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      anumber2(h.outputLen);
      anumber2(h.blockLen);
    }
    function aexists2(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput2(out, instance) {
      abytes2(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u322(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean2(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView2(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function rotr2(word, shift) {
      return word << 32 - shift | word >>> shift;
    }
    function rotl(word, shift) {
      return word << shift | word >>> 32 - shift >>> 0;
    }
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    function byteSwap2(word) {
      return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    }
    exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap2(n);
    exports.byteSwapIfBE = exports.swap8IfBE;
    function byteSwap322(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap2(arr[i]);
      }
      return arr;
    }
    exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap322;
    const hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    const hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(bytes2) {
      abytes2(bytes2);
      if (hasHexBuiltin)
        return bytes2.toHex();
      let hex = "";
      for (let i = 0; i < bytes2.length; i++) {
        hex += hexes2[bytes2[i]];
      }
      return hex;
    }
    const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      if (hasHexBuiltin)
        return Uint8Array.fromHex(hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    const nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes2(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes2) {
      return new TextDecoder().decode(bytes2);
    }
    function toBytes2(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function kdfInputToBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      abytes2(data);
      return data;
    }
    function concatBytes2(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes2(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    class Hash5 {
    }
    exports.Hash = Hash5;
    function createHasher2(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function createOptHasher(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function createXOFer(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructor = createHasher2;
    exports.wrapConstructorWithOpts = createOptHasher;
    exports.wrapXOFConstructorWithOpts = createXOFer;
    function randomBytes2(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(utils);
  return utils;
}
var hasRequiredSha3;
function requireSha3() {
  if (hasRequiredSha3) return sha3;
  hasRequiredSha3 = 1;
  Object.defineProperty(sha3, "__esModule", { value: true });
  sha3.shake256 = sha3.shake128 = sha3.keccak_512 = sha3.keccak_384 = sha3.keccak_256 = sha3.keccak_224 = sha3.sha3_512 = sha3.sha3_384 = sha3.sha3_256 = sha3.sha3_224 = sha3.Keccak = void 0;
  sha3.keccakP = keccakP2;
  const _u64_ts_1 = /* @__PURE__ */ require_u64();
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  const _0n2 = BigInt(0);
  const _1n2 = BigInt(1);
  const _2n2 = BigInt(2);
  const _7n2 = BigInt(7);
  const _256n2 = BigInt(256);
  const _0x71n2 = BigInt(113);
  const SHA3_PI2 = [];
  const SHA3_ROTL2 = [];
  const _SHA3_IOTA2 = [];
  for (let round = 0, R = _1n2, x = 1, y = 0; round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI2.push(2 * (5 * y + x));
    SHA3_ROTL2.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n2;
    for (let j = 0; j < 7; j++) {
      R = (R << _1n2 ^ (R >> _7n2) * _0x71n2) % _256n2;
      if (R & _2n2)
        t ^= _1n2 << (_1n2 << /* @__PURE__ */ BigInt(j)) - _1n2;
    }
    _SHA3_IOTA2.push(t);
  }
  const IOTAS2 = (0, _u64_ts_1.split)(_SHA3_IOTA2, true);
  const SHA3_IOTA_H2 = IOTAS2[0];
  const SHA3_IOTA_L2 = IOTAS2[1];
  const rotlH2 = (h, l, s) => s > 32 ? (0, _u64_ts_1.rotlBH)(h, l, s) : (0, _u64_ts_1.rotlSH)(h, l, s);
  const rotlL2 = (h, l, s) => s > 32 ? (0, _u64_ts_1.rotlBL)(h, l, s) : (0, _u64_ts_1.rotlSL)(h, l, s);
  function keccakP2(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH2(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL2(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL2[t];
        const Th = rotlH2(curH, curL, shift);
        const Tl = rotlL2(curH, curL, shift);
        const PI = SHA3_PI2[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H2[round];
      s[1] ^= SHA3_IOTA_L2[round];
    }
    (0, utils_ts_1.clean)(B);
  }
  class Keccak2 extends utils_ts_1.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
      super();
      this.pos = 0;
      this.posOut = 0;
      this.finished = false;
      this.destroyed = false;
      this.enableXOF = false;
      this.blockLen = blockLen;
      this.suffix = suffix;
      this.outputLen = outputLen;
      this.enableXOF = enableXOF;
      this.rounds = rounds;
      (0, utils_ts_1.anumber)(outputLen);
      if (!(0 < blockLen && blockLen < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200);
      this.state32 = (0, utils_ts_1.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, utils_ts_1.swap32IfBE)(this.state32);
      keccakP2(this.state32, this.rounds);
      (0, utils_ts_1.swap32IfBE)(this.state32);
      this.posOut = 0;
      this.pos = 0;
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const { blockLen, state } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        for (let i = 0; i < take; i++)
          state[this.pos++] ^= data[pos++];
        if (this.pos === blockLen)
          this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      const { state, suffix, pos, blockLen } = this;
      state[pos] ^= suffix;
      if ((suffix & 128) !== 0 && pos === blockLen - 1)
        this.keccak();
      state[blockLen - 1] ^= 128;
      this.keccak();
    }
    writeInto(out) {
      (0, utils_ts_1.aexists)(this, false);
      (0, utils_ts_1.abytes)(out);
      this.finish();
      const bufferOut = this.state;
      const { blockLen } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.keccak();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(out);
    }
    xof(bytes2) {
      (0, utils_ts_1.anumber)(bytes2);
      return this.xofInto(new Uint8Array(bytes2));
    }
    digestInto(out) {
      (0, utils_ts_1.aoutput)(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.state);
    }
    _cloneInto(to) {
      const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
      to || (to = new Keccak2(blockLen, suffix, outputLen, enableXOF, rounds));
      to.state32.set(this.state32);
      to.pos = this.pos;
      to.posOut = this.posOut;
      to.finished = this.finished;
      to.rounds = rounds;
      to.suffix = suffix;
      to.outputLen = outputLen;
      to.enableXOF = enableXOF;
      to.destroyed = this.destroyed;
      return to;
    }
  }
  sha3.Keccak = Keccak2;
  const gen2 = (suffix, blockLen, outputLen) => (0, utils_ts_1.createHasher)(() => new Keccak2(blockLen, suffix, outputLen));
  sha3.sha3_224 = (() => gen2(6, 144, 224 / 8))();
  sha3.sha3_256 = (() => gen2(6, 136, 256 / 8))();
  sha3.sha3_384 = (() => gen2(6, 104, 384 / 8))();
  sha3.sha3_512 = (() => gen2(6, 72, 512 / 8))();
  sha3.keccak_224 = (() => gen2(1, 144, 224 / 8))();
  sha3.keccak_256 = (() => gen2(1, 136, 256 / 8))();
  sha3.keccak_384 = (() => gen2(1, 104, 384 / 8))();
  sha3.keccak_512 = (() => gen2(1, 72, 512 / 8))();
  const genShake = (suffix, blockLen, outputLen) => (0, utils_ts_1.createXOFer)((opts = {}) => new Keccak2(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
  sha3.shake128 = (() => genShake(31, 168, 128 / 8))();
  sha3.shake256 = (() => genShake(31, 136, 256 / 8))();
  return sha3;
}
var sha2 = {};
var _md = {};
var hasRequired_md;
function require_md() {
  if (hasRequired_md) return _md;
  hasRequired_md = 1;
  Object.defineProperty(_md, "__esModule", { value: true });
  _md.SHA512_IV = _md.SHA384_IV = _md.SHA224_IV = _md.SHA256_IV = _md.HashMD = void 0;
  _md.setBigUint64 = setBigUint642;
  _md.Chi = Chi2;
  _md.Maj = Maj2;
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  function setBigUint642(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function Chi2(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj2(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  class HashMD5 extends utils_ts_1.Hash {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.buffer = new Uint8Array(blockLen);
      this.view = (0, utils_ts_1.createView)(this.buffer);
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const { view, buffer, blockLen } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = (0, utils_ts_1.createView)(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      (0, utils_ts_1.aexists)(this);
      (0, utils_ts_1.aoutput)(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      (0, utils_ts_1.clean)(this.buffer.subarray(pos));
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = (0, utils_ts_1.createView)(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.destroyed = destroyed;
      to.finished = finished;
      to.length = length;
      to.pos = pos;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
    clone() {
      return this._cloneInto();
    }
  }
  _md.HashMD = HashMD5;
  _md.SHA256_IV = Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  _md.SHA224_IV = Uint32Array.from([
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ]);
  _md.SHA384_IV = Uint32Array.from([
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ]);
  _md.SHA512_IV = Uint32Array.from([
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ]);
  return _md;
}
var hasRequiredSha2;
function requireSha2() {
  if (hasRequiredSha2) return sha2;
  hasRequiredSha2 = 1;
  Object.defineProperty(sha2, "__esModule", { value: true });
  sha2.sha512_224 = sha2.sha512_256 = sha2.sha384 = sha2.sha512 = sha2.sha224 = sha2.sha256 = sha2.SHA512_256 = sha2.SHA512_224 = sha2.SHA384 = sha2.SHA512 = sha2.SHA224 = sha2.SHA256 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md();
  const u64 = /* @__PURE__ */ require_u64();
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  const SHA256_K2 = /* @__PURE__ */ Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  const SHA256_W2 = /* @__PURE__ */ new Uint32Array(64);
  class SHA2565 extends _md_ts_1.HashMD {
    constructor(outputLen = 32) {
      super(64, outputLen, 8, false);
      this.A = _md_ts_1.SHA256_IV[0] | 0;
      this.B = _md_ts_1.SHA256_IV[1] | 0;
      this.C = _md_ts_1.SHA256_IV[2] | 0;
      this.D = _md_ts_1.SHA256_IV[3] | 0;
      this.E = _md_ts_1.SHA256_IV[4] | 0;
      this.F = _md_ts_1.SHA256_IV[5] | 0;
      this.G = _md_ts_1.SHA256_IV[6] | 0;
      this.H = _md_ts_1.SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W2[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W2[i - 15];
        const W2 = SHA256_W2[i - 2];
        const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
        const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
        SHA256_W2[i] = s1 + SHA256_W2[i - 7] + s0 + SHA256_W2[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
        const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K2[i] + SHA256_W2[i] | 0;
        const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
        const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA256_W2);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  sha2.SHA256 = SHA2565;
  class SHA224 extends SHA2565 {
    constructor() {
      super(28);
      this.A = _md_ts_1.SHA224_IV[0] | 0;
      this.B = _md_ts_1.SHA224_IV[1] | 0;
      this.C = _md_ts_1.SHA224_IV[2] | 0;
      this.D = _md_ts_1.SHA224_IV[3] | 0;
      this.E = _md_ts_1.SHA224_IV[4] | 0;
      this.F = _md_ts_1.SHA224_IV[5] | 0;
      this.G = _md_ts_1.SHA224_IV[6] | 0;
      this.H = _md_ts_1.SHA224_IV[7] | 0;
    }
  }
  sha2.SHA224 = SHA224;
  const K5122 = /* @__PURE__ */ (() => u64.split([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
  ].map((n) => BigInt(n))))();
  const SHA512_Kh2 = /* @__PURE__ */ (() => K5122[0])();
  const SHA512_Kl2 = /* @__PURE__ */ (() => K5122[1])();
  const SHA512_W_H2 = /* @__PURE__ */ new Uint32Array(80);
  const SHA512_W_L2 = /* @__PURE__ */ new Uint32Array(80);
  class SHA5122 extends _md_ts_1.HashMD {
    constructor(outputLen = 64) {
      super(128, outputLen, 16, false);
      this.Ah = _md_ts_1.SHA512_IV[0] | 0;
      this.Al = _md_ts_1.SHA512_IV[1] | 0;
      this.Bh = _md_ts_1.SHA512_IV[2] | 0;
      this.Bl = _md_ts_1.SHA512_IV[3] | 0;
      this.Ch = _md_ts_1.SHA512_IV[4] | 0;
      this.Cl = _md_ts_1.SHA512_IV[5] | 0;
      this.Dh = _md_ts_1.SHA512_IV[6] | 0;
      this.Dl = _md_ts_1.SHA512_IV[7] | 0;
      this.Eh = _md_ts_1.SHA512_IV[8] | 0;
      this.El = _md_ts_1.SHA512_IV[9] | 0;
      this.Fh = _md_ts_1.SHA512_IV[10] | 0;
      this.Fl = _md_ts_1.SHA512_IV[11] | 0;
      this.Gh = _md_ts_1.SHA512_IV[12] | 0;
      this.Gl = _md_ts_1.SHA512_IV[13] | 0;
      this.Hh = _md_ts_1.SHA512_IV[14] | 0;
      this.Hl = _md_ts_1.SHA512_IV[15] | 0;
    }
    // prettier-ignore
    get() {
      const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
      this.Ah = Ah | 0;
      this.Al = Al | 0;
      this.Bh = Bh | 0;
      this.Bl = Bl | 0;
      this.Ch = Ch | 0;
      this.Cl = Cl | 0;
      this.Dh = Dh | 0;
      this.Dl = Dl | 0;
      this.Eh = Eh | 0;
      this.El = El | 0;
      this.Fh = Fh | 0;
      this.Fl = Fl | 0;
      this.Gh = Gh | 0;
      this.Gl = Gl | 0;
      this.Hh = Hh | 0;
      this.Hl = Hl | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4) {
        SHA512_W_H2[i] = view.getUint32(offset);
        SHA512_W_L2[i] = view.getUint32(offset += 4);
      }
      for (let i = 16; i < 80; i++) {
        const W15h = SHA512_W_H2[i - 15] | 0;
        const W15l = SHA512_W_L2[i - 15] | 0;
        const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
        const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
        const W2h = SHA512_W_H2[i - 2] | 0;
        const W2l = SHA512_W_L2[i - 2] | 0;
        const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
        const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
        const SUMl = u64.add4L(s0l, s1l, SHA512_W_L2[i - 7], SHA512_W_L2[i - 16]);
        const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H2[i - 7], SHA512_W_H2[i - 16]);
        SHA512_W_H2[i] = SUMh | 0;
        SHA512_W_L2[i] = SUMl | 0;
      }
      let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      for (let i = 0; i < 80; i++) {
        const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
        const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
        const CHIh = Eh & Fh ^ ~Eh & Gh;
        const CHIl = El & Fl ^ ~El & Gl;
        const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl2[i], SHA512_W_L2[i]);
        const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh2[i], SHA512_W_H2[i]);
        const T1l = T1ll | 0;
        const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
        const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
        const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
        const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
        Hh = Gh | 0;
        Hl = Gl | 0;
        Gh = Fh | 0;
        Gl = Fl | 0;
        Fh = Eh | 0;
        Fl = El | 0;
        ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
        Dh = Ch | 0;
        Dl = Cl | 0;
        Ch = Bh | 0;
        Cl = Bl | 0;
        Bh = Ah | 0;
        Bl = Al | 0;
        const All = u64.add3L(T1l, sigma0l, MAJl);
        Ah = u64.add3H(All, T1h, sigma0h, MAJh);
        Al = All | 0;
      }
      ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
      ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
      ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
      ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
      ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
      ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
      ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
      ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
      this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA512_W_H2, SHA512_W_L2);
    }
    destroy() {
      (0, utils_ts_1.clean)(this.buffer);
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  sha2.SHA512 = SHA5122;
  class SHA3842 extends SHA5122 {
    constructor() {
      super(48);
      this.Ah = _md_ts_1.SHA384_IV[0] | 0;
      this.Al = _md_ts_1.SHA384_IV[1] | 0;
      this.Bh = _md_ts_1.SHA384_IV[2] | 0;
      this.Bl = _md_ts_1.SHA384_IV[3] | 0;
      this.Ch = _md_ts_1.SHA384_IV[4] | 0;
      this.Cl = _md_ts_1.SHA384_IV[5] | 0;
      this.Dh = _md_ts_1.SHA384_IV[6] | 0;
      this.Dl = _md_ts_1.SHA384_IV[7] | 0;
      this.Eh = _md_ts_1.SHA384_IV[8] | 0;
      this.El = _md_ts_1.SHA384_IV[9] | 0;
      this.Fh = _md_ts_1.SHA384_IV[10] | 0;
      this.Fl = _md_ts_1.SHA384_IV[11] | 0;
      this.Gh = _md_ts_1.SHA384_IV[12] | 0;
      this.Gl = _md_ts_1.SHA384_IV[13] | 0;
      this.Hh = _md_ts_1.SHA384_IV[14] | 0;
      this.Hl = _md_ts_1.SHA384_IV[15] | 0;
    }
  }
  sha2.SHA384 = SHA3842;
  const T224_IV = /* @__PURE__ */ Uint32Array.from([
    2352822216,
    424955298,
    1944164710,
    2312950998,
    502970286,
    855612546,
    1738396948,
    1479516111,
    258812777,
    2077511080,
    2011393907,
    79989058,
    1067287976,
    1780299464,
    286451373,
    2446758561
  ]);
  const T256_IV = /* @__PURE__ */ Uint32Array.from([
    573645204,
    4230739756,
    2673172387,
    3360449730,
    596883563,
    1867755857,
    2520282905,
    1497426621,
    2519219938,
    2827943907,
    3193839141,
    1401305490,
    721525244,
    746961066,
    246885852,
    2177182882
  ]);
  class SHA512_224 extends SHA5122 {
    constructor() {
      super(28);
      this.Ah = T224_IV[0] | 0;
      this.Al = T224_IV[1] | 0;
      this.Bh = T224_IV[2] | 0;
      this.Bl = T224_IV[3] | 0;
      this.Ch = T224_IV[4] | 0;
      this.Cl = T224_IV[5] | 0;
      this.Dh = T224_IV[6] | 0;
      this.Dl = T224_IV[7] | 0;
      this.Eh = T224_IV[8] | 0;
      this.El = T224_IV[9] | 0;
      this.Fh = T224_IV[10] | 0;
      this.Fl = T224_IV[11] | 0;
      this.Gh = T224_IV[12] | 0;
      this.Gl = T224_IV[13] | 0;
      this.Hh = T224_IV[14] | 0;
      this.Hl = T224_IV[15] | 0;
    }
  }
  sha2.SHA512_224 = SHA512_224;
  class SHA512_256 extends SHA5122 {
    constructor() {
      super(32);
      this.Ah = T256_IV[0] | 0;
      this.Al = T256_IV[1] | 0;
      this.Bh = T256_IV[2] | 0;
      this.Bl = T256_IV[3] | 0;
      this.Ch = T256_IV[4] | 0;
      this.Cl = T256_IV[5] | 0;
      this.Dh = T256_IV[6] | 0;
      this.Dl = T256_IV[7] | 0;
      this.Eh = T256_IV[8] | 0;
      this.El = T256_IV[9] | 0;
      this.Fh = T256_IV[10] | 0;
      this.Fl = T256_IV[11] | 0;
      this.Gh = T256_IV[12] | 0;
      this.Gl = T256_IV[13] | 0;
      this.Hh = T256_IV[14] | 0;
      this.Hl = T256_IV[15] | 0;
    }
  }
  sha2.SHA512_256 = SHA512_256;
  sha2.sha256 = (0, utils_ts_1.createHasher)(() => new SHA2565());
  sha2.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
  sha2.sha512 = (0, utils_ts_1.createHasher)(() => new SHA5122());
  sha2.sha384 = (0, utils_ts_1.createHasher)(() => new SHA3842());
  sha2.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
  sha2.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
  return sha2;
}
var hmac = {};
var hasRequiredHmac;
function requireHmac() {
  if (hasRequiredHmac) return hmac;
  hasRequiredHmac = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac = exports.HMAC = void 0;
    const utils_ts_1 = /* @__PURE__ */ requireUtils();
    class HMAC3 extends utils_ts_1.Hash {
      constructor(hash, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        (0, utils_ts_1.ahash)(hash);
        const key = (0, utils_ts_1.toBytes)(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54;
        this.iHash.update(pad);
        this.oHash = hash.create();
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54 ^ 92;
        this.oHash.update(pad);
        (0, utils_ts_1.clean)(pad);
      }
      update(buf) {
        (0, utils_ts_1.aexists)(this);
        this.iHash.update(buf);
        return this;
      }
      digestInto(out) {
        (0, utils_ts_1.aexists)(this);
        (0, utils_ts_1.abytes)(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
      }
      digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
      }
      _cloneInto(to) {
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
      }
    }
    exports.HMAC = HMAC3;
    const hmac2 = (hash, key, message) => new HMAC3(hash, key).update(message).digest();
    exports.hmac = hmac2;
    exports.hmac.create = (hash, key) => new HMAC3(hash, key);
  })(hmac);
  return hmac;
}
var sha256 = {};
var hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256) return sha256;
  hasRequiredSha256 = 1;
  Object.defineProperty(sha256, "__esModule", { value: true });
  sha256.sha224 = sha256.SHA224 = sha256.sha256 = sha256.SHA256 = void 0;
  const sha2_ts_1 = /* @__PURE__ */ requireSha2();
  sha256.SHA256 = sha2_ts_1.SHA256;
  sha256.sha256 = sha2_ts_1.sha256;
  sha256.SHA224 = sha2_ts_1.SHA224;
  sha256.sha224 = sha2_ts_1.sha224;
  return sha256;
}
var ripemd160 = {};
var legacy = {};
var hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy) return legacy;
  hasRequiredLegacy = 1;
  Object.defineProperty(legacy, "__esModule", { value: true });
  legacy.ripemd160 = legacy.RIPEMD160 = legacy.md5 = legacy.MD5 = legacy.sha1 = legacy.SHA1 = void 0;
  const _md_ts_1 = /* @__PURE__ */ require_md();
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  const SHA1_IV = /* @__PURE__ */ Uint32Array.from([
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ]);
  const SHA1_W = /* @__PURE__ */ new Uint32Array(80);
  class SHA1 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 20, 8, false);
      this.A = SHA1_IV[0] | 0;
      this.B = SHA1_IV[1] | 0;
      this.C = SHA1_IV[2] | 0;
      this.D = SHA1_IV[3] | 0;
      this.E = SHA1_IV[4] | 0;
    }
    get() {
      const { A, B, C, D, E } = this;
      return [A, B, C, D, E];
    }
    set(A, B, C, D, E) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA1_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 80; i++)
        SHA1_W[i] = (0, utils_ts_1.rotl)(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
      let { A, B, C, D, E } = this;
      for (let i = 0; i < 80; i++) {
        let F, K2;
        if (i < 20) {
          F = (0, _md_ts_1.Chi)(B, C, D);
          K2 = 1518500249;
        } else if (i < 40) {
          F = B ^ C ^ D;
          K2 = 1859775393;
        } else if (i < 60) {
          F = (0, _md_ts_1.Maj)(B, C, D);
          K2 = 2400959708;
        } else {
          F = B ^ C ^ D;
          K2 = 3395469782;
        }
        const T = (0, utils_ts_1.rotl)(A, 5) + F + E + K2 + SHA1_W[i] | 0;
        E = D;
        D = C;
        C = (0, utils_ts_1.rotl)(B, 30);
        B = A;
        A = T;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      this.set(A, B, C, D, E);
    }
    roundClean() {
      (0, utils_ts_1.clean)(SHA1_W);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  legacy.SHA1 = SHA1;
  legacy.sha1 = (0, utils_ts_1.createHasher)(() => new SHA1());
  const p32 = /* @__PURE__ */ Math.pow(2, 32);
  const K = /* @__PURE__ */ Array.from({ length: 64 }, (_, i) => Math.floor(p32 * Math.abs(Math.sin(i + 1))));
  const MD5_IV = /* @__PURE__ */ SHA1_IV.slice(0, 4);
  const MD5_W = /* @__PURE__ */ new Uint32Array(16);
  class MD5 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 16, 8, true);
      this.A = MD5_IV[0] | 0;
      this.B = MD5_IV[1] | 0;
      this.C = MD5_IV[2] | 0;
      this.D = MD5_IV[3] | 0;
    }
    get() {
      const { A, B, C, D } = this;
      return [A, B, C, D];
    }
    set(A, B, C, D) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        MD5_W[i] = view.getUint32(offset, true);
      let { A, B, C, D } = this;
      for (let i = 0; i < 64; i++) {
        let F, g, s;
        if (i < 16) {
          F = (0, _md_ts_1.Chi)(B, C, D);
          g = i;
          s = [7, 12, 17, 22];
        } else if (i < 32) {
          F = (0, _md_ts_1.Chi)(D, B, C);
          g = (5 * i + 1) % 16;
          s = [5, 9, 14, 20];
        } else if (i < 48) {
          F = B ^ C ^ D;
          g = (3 * i + 5) % 16;
          s = [4, 11, 16, 23];
        } else {
          F = C ^ (B | ~D);
          g = 7 * i % 16;
          s = [6, 10, 15, 21];
        }
        F = F + A + K[i] + MD5_W[g];
        A = D;
        D = C;
        C = B;
        B = B + (0, utils_ts_1.rotl)(F, s[i % 4]);
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      this.set(A, B, C, D);
    }
    roundClean() {
      (0, utils_ts_1.clean)(MD5_W);
    }
    destroy() {
      this.set(0, 0, 0, 0);
      (0, utils_ts_1.clean)(this.buffer);
    }
  }
  legacy.MD5 = MD5;
  legacy.md5 = (0, utils_ts_1.createHasher)(() => new MD5());
  const Rho160 = /* @__PURE__ */ Uint8Array.from([
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8
  ]);
  const Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
  const Pi160 = /* @__PURE__ */ (() => Id160.map((i) => (9 * i + 5) % 16))();
  const idxLR = /* @__PURE__ */ (() => {
    const L = [Id160];
    const R = [Pi160];
    const res = [L, R];
    for (let i = 0; i < 4; i++)
      for (let j of res)
        j.push(j[i].map((k) => Rho160[k]));
    return res;
  })();
  const idxL = /* @__PURE__ */ (() => idxLR[0])();
  const idxR = /* @__PURE__ */ (() => idxLR[1])();
  const shifts160 = /* @__PURE__ */ [
    [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
    [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
    [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
    [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
    [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
  ].map((i) => Uint8Array.from(i));
  const shiftsL160 = /* @__PURE__ */ idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
  const shiftsR160 = /* @__PURE__ */ idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
  const Kl160 = /* @__PURE__ */ Uint32Array.from([
    0,
    1518500249,
    1859775393,
    2400959708,
    2840853838
  ]);
  const Kr160 = /* @__PURE__ */ Uint32Array.from([
    1352829926,
    1548603684,
    1836072691,
    2053994217,
    0
  ]);
  function ripemd_f(group, x, y, z) {
    if (group === 0)
      return x ^ y ^ z;
    if (group === 1)
      return x & y | ~x & z;
    if (group === 2)
      return (x | ~y) ^ z;
    if (group === 3)
      return x & z | y & ~z;
    return x ^ (y | ~z);
  }
  const BUF_160 = /* @__PURE__ */ new Uint32Array(16);
  class RIPEMD160 extends _md_ts_1.HashMD {
    constructor() {
      super(64, 20, 8, true);
      this.h0 = 1732584193 | 0;
      this.h1 = 4023233417 | 0;
      this.h2 = 2562383102 | 0;
      this.h3 = 271733878 | 0;
      this.h4 = 3285377520 | 0;
    }
    get() {
      const { h0, h1, h2, h3, h4 } = this;
      return [h0, h1, h2, h3, h4];
    }
    set(h0, h1, h2, h3, h4) {
      this.h0 = h0 | 0;
      this.h1 = h1 | 0;
      this.h2 = h2 | 0;
      this.h3 = h3 | 0;
      this.h4 = h4 | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        BUF_160[i] = view.getUint32(offset, true);
      let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
      for (let group = 0; group < 5; group++) {
        const rGroup = 4 - group;
        const hbl = Kl160[group], hbr = Kr160[group];
        const rl = idxL[group], rr = idxR[group];
        const sl = shiftsL160[group], sr = shiftsR160[group];
        for (let i = 0; i < 16; i++) {
          const tl = (0, utils_ts_1.rotl)(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
          al = el, el = dl, dl = (0, utils_ts_1.rotl)(cl, 10) | 0, cl = bl, bl = tl;
        }
        for (let i = 0; i < 16; i++) {
          const tr = (0, utils_ts_1.rotl)(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
          ar = er, er = dr, dr = (0, utils_ts_1.rotl)(cr, 10) | 0, cr = br, br = tr;
        }
      }
      this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
    }
    roundClean() {
      (0, utils_ts_1.clean)(BUF_160);
    }
    destroy() {
      this.destroyed = true;
      (0, utils_ts_1.clean)(this.buffer);
      this.set(0, 0, 0, 0, 0);
    }
  }
  legacy.RIPEMD160 = RIPEMD160;
  legacy.ripemd160 = (0, utils_ts_1.createHasher)(() => new RIPEMD160());
  return legacy;
}
var hasRequiredRipemd160;
function requireRipemd160() {
  if (hasRequiredRipemd160) return ripemd160;
  hasRequiredRipemd160 = 1;
  Object.defineProperty(ripemd160, "__esModule", { value: true });
  ripemd160.ripemd160 = ripemd160.RIPEMD160 = void 0;
  const legacy_ts_1 = /* @__PURE__ */ requireLegacy();
  ripemd160.RIPEMD160 = legacy_ts_1.RIPEMD160;
  ripemd160.ripemd160 = legacy_ts_1.ripemd160;
  return ripemd160;
}
export {
  requireRipemd160$1 as A,
  requireSha256$1 as B,
  requireBlake3 as C,
  requirePbkdf2$1 as D,
  requireScrypt as E,
  sha256$3 as F,
  requireLegacy$1 as G,
  requireUtils$2 as H,
  requirePbkdf2 as I,
  requireSha2$1 as J,
  requireSha3$1 as K,
  bytesToHex as L,
  sha256$1 as M,
  requireSha256 as a,
  requireRipemd160 as b,
  anumber$1 as c,
  randomBytes$1 as d,
  concatBytes$1 as e,
  sha256$7 as f,
  requireUtils$4 as g,
  hmac$5 as h,
  requireHmac$3 as i,
  requireSha2$3 as j,
  keccak_256 as k,
  requireUtils$3 as l,
  requireHmac$2 as m,
  requireSha2$2 as n,
  sha384 as o,
  sha512 as p,
  randomBytes as q,
  requireSha3 as r,
  sha256$6 as s,
  hmac$1 as t,
  concatBytes as u,
  sha256$2 as v,
  requireUtils as w,
  requireHmac as x,
  requireSha2 as y,
  requireSha3$2 as z
};
