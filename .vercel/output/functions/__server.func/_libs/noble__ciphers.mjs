var aes = {};
var _polyval = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapCipher = exports.Hash = exports.nextTick = exports.isLE = void 0;
    exports.isBytes = isBytes;
    exports.abool = abool;
    exports.anumber = anumber;
    exports.abytes = abytes;
    exports.ahash = ahash;
    exports.aexists = aexists;
    exports.aoutput = aoutput;
    exports.u8 = u8;
    exports.u32 = u32;
    exports.clean = clean;
    exports.createView = createView;
    exports.bytesToHex = bytesToHex;
    exports.hexToBytes = hexToBytes;
    exports.hexToNumber = hexToNumber;
    exports.bytesToNumberBE = bytesToNumberBE;
    exports.numberToBytesBE = numberToBytesBE;
    exports.utf8ToBytes = utf8ToBytes;
    exports.bytesToUtf8 = bytesToUtf8;
    exports.toBytes = toBytes;
    exports.overlapBytes = overlapBytes;
    exports.complexOverlapBytes = complexOverlapBytes;
    exports.concatBytes = concatBytes;
    exports.checkOpts = checkOpts;
    exports.equalBytes = equalBytes;
    exports.getOutput = getOutput;
    exports.setBigUint64 = setBigUint64;
    exports.u64Lengths = u64Lengths;
    exports.isAligned32 = isAligned32;
    exports.copyBytes = copyBytes;
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function abool(b) {
      if (typeof b !== "boolean")
        throw new Error(`boolean expected, not ${b}`);
    }
    function anumber(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
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
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u32(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    const hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      abytes(bytes);
      if (hasHexBuiltin)
        return bytes.toHex();
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
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
    function hexToNumber(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      return BigInt(hex === "" ? "0" : "0x" + hex);
    }
    function bytesToNumberBE(bytes) {
      return hexToNumber(bytesToHex(bytes));
    }
    function numberToBytesBE(n, len) {
      return hexToBytes(n.toString(16).padStart(len * 2, "0"));
    }
    const nextTick = async () => {
    };
    exports.nextTick = nextTick;
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes) {
      return new TextDecoder().decode(bytes);
    }
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      else if (isBytes(data))
        data = copyBytes(data);
      else
        throw new Error("Uint8Array expected, got " + typeof data);
      return data;
    }
    function overlapBytes(a, b) {
      return a.buffer === b.buffer && // best we can do, may fail with an obscure Proxy
      a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
      b.byteOffset < a.byteOffset + a.byteLength;
    }
    function complexOverlapBytes(input, output) {
      if (overlapBytes(input, output) && input.byteOffset < output.byteOffset)
        throw new Error("complex overlap of input and output is not supported");
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
    function checkOpts(defaults, opts) {
      if (opts == null || typeof opts !== "object")
        throw new Error("options must be defined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    function equalBytes(a, b) {
      if (a.length !== b.length)
        return false;
      let diff = 0;
      for (let i = 0; i < a.length; i++)
        diff |= a[i] ^ b[i];
      return diff === 0;
    }
    class Hash {
    }
    exports.Hash = Hash;
    const wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
      function wrappedCipher(key, ...args) {
        abytes(key);
        if (!exports.isLE)
          throw new Error("Non little-endian hardware is not yet supported");
        if (params.nonceLength !== void 0) {
          const nonce = args[0];
          if (!nonce)
            throw new Error("nonce / iv required");
          if (params.varSizeNonce)
            abytes(nonce);
          else
            abytes(nonce, params.nonceLength);
        }
        const tagl = params.tagLength;
        if (tagl && args[1] !== void 0) {
          abytes(args[1]);
        }
        const cipher = constructor(key, ...args);
        const checkOutput = (fnLength, output) => {
          if (output !== void 0) {
            if (fnLength !== 2)
              throw new Error("cipher output not supported");
            abytes(output);
          }
        };
        let called = false;
        const wrCipher = {
          encrypt(data, output) {
            if (called)
              throw new Error("cannot encrypt() twice with same key + nonce");
            called = true;
            abytes(data);
            checkOutput(cipher.encrypt.length, output);
            return cipher.encrypt(data, output);
          },
          decrypt(data, output) {
            abytes(data);
            if (tagl && data.length < tagl)
              throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
            checkOutput(cipher.decrypt.length, output);
            return cipher.decrypt(data, output);
          }
        };
        return wrCipher;
      }
      Object.assign(wrappedCipher, params);
      return wrappedCipher;
    };
    exports.wrapCipher = wrapCipher;
    function getOutput(expectedLength, out, onlyAligned = true) {
      if (out === void 0)
        return new Uint8Array(expectedLength);
      if (out.length !== expectedLength)
        throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
      if (onlyAligned && !isAligned32(out))
        throw new Error("invalid output, must be aligned");
      return out;
    }
    function setBigUint64(view, byteOffset, value, isLE) {
      if (typeof view.setBigUint64 === "function")
        return view.setBigUint64(byteOffset, value, isLE);
      const _32n = BigInt(32);
      const _u32_max = BigInt(4294967295);
      const wh = Number(value >> _32n & _u32_max);
      const wl = Number(value & _u32_max);
      const h = isLE ? 4 : 0;
      const l = isLE ? 0 : 4;
      view.setUint32(byteOffset + h, wh, isLE);
      view.setUint32(byteOffset + l, wl, isLE);
    }
    function u64Lengths(dataLength, aadLength, isLE) {
      abool(isLE);
      const num = new Uint8Array(16);
      const view = createView(num);
      setBigUint64(view, 0, BigInt(aadLength), isLE);
      setBigUint64(view, 8, BigInt(dataLength), isLE);
      return num;
    }
    function isAligned32(bytes) {
      return bytes.byteOffset % 4 === 0;
    }
    function copyBytes(bytes) {
      return Uint8Array.from(bytes);
    }
  })(utils);
  return utils;
}
var hasRequired_polyval;
function require_polyval() {
  if (hasRequired_polyval) return _polyval;
  hasRequired_polyval = 1;
  Object.defineProperty(_polyval, "__esModule", { value: true });
  _polyval.polyval = _polyval.ghash = void 0;
  _polyval._toGHASHKey = _toGHASHKey;
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  const BLOCK_SIZE = 16;
  const ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
  const ZEROS32 = (0, utils_ts_1.u32)(ZEROS16);
  const POLY = 225;
  const mul2 = (s0, s1, s2, s3) => {
    const hiBit = s3 & 1;
    return {
      s3: s2 << 31 | s3 >>> 1,
      s2: s1 << 31 | s2 >>> 1,
      s1: s0 << 31 | s1 >>> 1,
      s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
      // reduce % poly
    };
  };
  const swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
  function _toGHASHKey(k) {
    k.reverse();
    const hiBit = k[15] & 1;
    let carry = 0;
    for (let i = 0; i < k.length; i++) {
      const t = k[i];
      k[i] = t >>> 1 | carry;
      carry = (t & 1) << 7;
    }
    k[0] ^= -hiBit & 225;
    return k;
  }
  const estimateWindow = (bytes) => {
    if (bytes > 64 * 1024)
      return 8;
    if (bytes > 1024)
      return 4;
    return 2;
  };
  class GHASH {
    // We select bits per window adaptively based on expectedLength
    constructor(key, expectedLength) {
      this.blockLen = BLOCK_SIZE;
      this.outputLen = BLOCK_SIZE;
      this.s0 = 0;
      this.s1 = 0;
      this.s2 = 0;
      this.s3 = 0;
      this.finished = false;
      key = (0, utils_ts_1.toBytes)(key);
      (0, utils_ts_1.abytes)(key, 16);
      const kView = (0, utils_ts_1.createView)(key);
      let k0 = kView.getUint32(0, false);
      let k1 = kView.getUint32(4, false);
      let k2 = kView.getUint32(8, false);
      let k3 = kView.getUint32(12, false);
      const doubles = [];
      for (let i = 0; i < 128; i++) {
        doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
        ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
      }
      const W = estimateWindow(expectedLength || 1024);
      if (![1, 2, 4, 8].includes(W))
        throw new Error("ghash: invalid window size, expected 2, 4 or 8");
      this.W = W;
      const bits = 128;
      const windows = bits / W;
      const windowSize = this.windowSize = 2 ** W;
      const items = [];
      for (let w = 0; w < windows; w++) {
        for (let byte = 0; byte < windowSize; byte++) {
          let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
          for (let j = 0; j < W; j++) {
            const bit = byte >>> W - j - 1 & 1;
            if (!bit)
              continue;
            const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
            s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
          }
          items.push({ s0, s1, s2, s3 });
        }
      }
      this.t = items;
    }
    _updateBlock(s0, s1, s2, s3) {
      s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
      const { W, t, windowSize } = this;
      let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
      const mask = (1 << W) - 1;
      let w = 0;
      for (const num of [s0, s1, s2, s3]) {
        for (let bytePos = 0; bytePos < 4; bytePos++) {
          const byte = num >>> 8 * bytePos & 255;
          for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
            const bit = byte >>> W * bitPos & mask;
            const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
            o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
            w += 1;
          }
        }
      }
      this.s0 = o0;
      this.s1 = o1;
      this.s2 = o2;
      this.s3 = o3;
    }
    update(data) {
      (0, utils_ts_1.aexists)(this);
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.abytes)(data);
      const b32 = (0, utils_ts_1.u32)(data);
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      const left = data.length % BLOCK_SIZE;
      for (let i = 0; i < blocks; i++) {
        this._updateBlock(b32[i * 4 + 0], b32[i * 4 + 1], b32[i * 4 + 2], b32[i * 4 + 3]);
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(ZEROS32[0], ZEROS32[1], ZEROS32[2], ZEROS32[3]);
        (0, utils_ts_1.clean)(ZEROS32);
      }
      return this;
    }
    destroy() {
      const { t } = this;
      for (const elm of t) {
        elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
      }
    }
    digestInto(out) {
      (0, utils_ts_1.aexists)(this);
      (0, utils_ts_1.aoutput)(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = (0, utils_ts_1.u32)(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out;
    }
    digest() {
      const res = new Uint8Array(BLOCK_SIZE);
      this.digestInto(res);
      this.destroy();
      return res;
    }
  }
  class Polyval extends GHASH {
    constructor(key, expectedLength) {
      key = (0, utils_ts_1.toBytes)(key);
      (0, utils_ts_1.abytes)(key);
      const ghKey = _toGHASHKey((0, utils_ts_1.copyBytes)(key));
      super(ghKey, expectedLength);
      (0, utils_ts_1.clean)(ghKey);
    }
    update(data) {
      data = (0, utils_ts_1.toBytes)(data);
      (0, utils_ts_1.aexists)(this);
      const b32 = (0, utils_ts_1.u32)(data);
      const left = data.length % BLOCK_SIZE;
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      for (let i = 0; i < blocks; i++) {
        this._updateBlock(swapLE(b32[i * 4 + 3]), swapLE(b32[i * 4 + 2]), swapLE(b32[i * 4 + 1]), swapLE(b32[i * 4 + 0]));
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(swapLE(ZEROS32[3]), swapLE(ZEROS32[2]), swapLE(ZEROS32[1]), swapLE(ZEROS32[0]));
        (0, utils_ts_1.clean)(ZEROS32);
      }
      return this;
    }
    digestInto(out) {
      (0, utils_ts_1.aexists)(this);
      (0, utils_ts_1.aoutput)(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = (0, utils_ts_1.u32)(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out.reverse();
    }
  }
  function wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key) => hashCons(key, msg.length).update((0, utils_ts_1.toBytes)(msg)).digest();
    const tmp = hashCons(new Uint8Array(16), 0);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key, expectedLength) => hashCons(key, expectedLength);
    return hashC;
  }
  _polyval.ghash = wrapConstructorWithKey((key, expectedLength) => new GHASH(key, expectedLength));
  _polyval.polyval = wrapConstructorWithKey((key, expectedLength) => new Polyval(key, expectedLength));
  return _polyval;
}
var hasRequiredAes;
function requireAes() {
  if (hasRequiredAes) return aes;
  hasRequiredAes = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unsafe = exports.aeskwp = exports.aeskw = exports.siv = exports.gcmsiv = exports.gcm = exports.cfb = exports.cbc = exports.ecb = exports.ctr = void 0;
    const _polyval_ts_1 = /* @__PURE__ */ require_polyval();
    const utils_ts_1 = /* @__PURE__ */ requireUtils();
    const BLOCK_SIZE = 16;
    const BLOCK_SIZE32 = 4;
    const EMPTY_BLOCK = /* @__PURE__ */ new Uint8Array(BLOCK_SIZE);
    const POLY = 283;
    function mul2(n) {
      return n << 1 ^ POLY & -(n >> 7);
    }
    function mul(a, b) {
      let res = 0;
      for (; b > 0; b >>= 1) {
        res ^= a & -(b & 1);
        a = mul2(a);
      }
      return res;
    }
    const sbox = /* @__PURE__ */ (() => {
      const t = new Uint8Array(256);
      for (let i = 0, x = 1; i < 256; i++, x ^= mul2(x))
        t[i] = x;
      const box = new Uint8Array(256);
      box[0] = 99;
      for (let i = 0; i < 255; i++) {
        let x = t[255 - i];
        x |= x << 8;
        box[t[i]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
      }
      (0, utils_ts_1.clean)(t);
      return box;
    })();
    const invSbox = /* @__PURE__ */ sbox.map((_, j) => sbox.indexOf(j));
    const rotr32_8 = (n) => n << 24 | n >>> 8;
    const rotl32_8 = (n) => n << 8 | n >>> 24;
    const byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    function genTtable(sbox2, fn) {
      if (sbox2.length !== 256)
        throw new Error("Wrong sbox length");
      const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
      const T1 = T0.map(rotl32_8);
      const T2 = T1.map(rotl32_8);
      const T3 = T2.map(rotl32_8);
      const T01 = new Uint32Array(256 * 256);
      const T23 = new Uint32Array(256 * 256);
      const sbox22 = new Uint16Array(256 * 256);
      for (let i = 0; i < 256; i++) {
        for (let j = 0; j < 256; j++) {
          const idx = i * 256 + j;
          T01[idx] = T0[i] ^ T1[j];
          T23[idx] = T2[i] ^ T3[j];
          sbox22[idx] = sbox2[i] << 8 | sbox2[j];
        }
      }
      return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
    }
    const tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
    const tableDecoding = /* @__PURE__ */ genTtable(invSbox, (s) => mul(s, 11) << 24 | mul(s, 13) << 16 | mul(s, 9) << 8 | mul(s, 14));
    const xPowers = /* @__PURE__ */ (() => {
      const p = new Uint8Array(16);
      for (let i = 0, x = 1; i < 16; i++, x = mul2(x))
        p[i] = x;
      return p;
    })();
    function expandKeyLE(key) {
      (0, utils_ts_1.abytes)(key);
      const len = key.length;
      if (![16, 24, 32].includes(len))
        throw new Error("aes: invalid key size, should be 16, 24 or 32, got " + len);
      const { sbox2 } = tableEncoding;
      const toClean = [];
      if (!(0, utils_ts_1.isAligned32)(key))
        toClean.push(key = (0, utils_ts_1.copyBytes)(key));
      const k32 = (0, utils_ts_1.u32)(key);
      const Nk = k32.length;
      const subByte = (n) => applySbox(sbox2, n, n, n, n);
      const xk = new Uint32Array(len + 28);
      xk.set(k32);
      for (let i = Nk; i < xk.length; i++) {
        let t = xk[i - 1];
        if (i % Nk === 0)
          t = subByte(rotr32_8(t)) ^ xPowers[i / Nk - 1];
        else if (Nk > 6 && i % Nk === 4)
          t = subByte(t);
        xk[i] = xk[i - Nk] ^ t;
      }
      (0, utils_ts_1.clean)(...toClean);
      return xk;
    }
    function expandKeyDecLE(key) {
      const encKey = expandKeyLE(key);
      const xk = encKey.slice();
      const Nk = encKey.length;
      const { sbox2 } = tableEncoding;
      const { T0, T1, T2, T3 } = tableDecoding;
      for (let i = 0; i < Nk; i += 4) {
        for (let j = 0; j < 4; j++)
          xk[i + j] = encKey[Nk - i - 4 + j];
      }
      (0, utils_ts_1.clean)(encKey);
      for (let i = 4; i < Nk - 4; i++) {
        const x = xk[i];
        const w = applySbox(sbox2, x, x, x, x);
        xk[i] = T0[w & 255] ^ T1[w >>> 8 & 255] ^ T2[w >>> 16 & 255] ^ T3[w >>> 24];
      }
      return xk;
    }
    function apply0123(T01, T23, s0, s1, s2, s3) {
      return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
    }
    function applySbox(sbox2, s0, s1, s2, s3) {
      return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
    }
    function encrypt(xk, s0, s1, s2, s3) {
      const { sbox2, T01, T23 } = tableEncoding;
      let k = 0;
      s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
      const rounds = xk.length / 4 - 2;
      for (let i = 0; i < rounds; i++) {
        const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
        const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
        const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
        const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
        s0 = t02, s1 = t12, s2 = t22, s3 = t32;
      }
      const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
      const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
      const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
      const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
      return { s0: t0, s1: t1, s2: t2, s3: t3 };
    }
    function decrypt(xk, s0, s1, s2, s3) {
      const { sbox2, T01, T23 } = tableDecoding;
      let k = 0;
      s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
      const rounds = xk.length / 4 - 2;
      for (let i = 0; i < rounds; i++) {
        const t02 = xk[k++] ^ apply0123(T01, T23, s0, s3, s2, s1);
        const t12 = xk[k++] ^ apply0123(T01, T23, s1, s0, s3, s2);
        const t22 = xk[k++] ^ apply0123(T01, T23, s2, s1, s0, s3);
        const t32 = xk[k++] ^ apply0123(T01, T23, s3, s2, s1, s0);
        s0 = t02, s1 = t12, s2 = t22, s3 = t32;
      }
      const t0 = xk[k++] ^ applySbox(sbox2, s0, s3, s2, s1);
      const t1 = xk[k++] ^ applySbox(sbox2, s1, s0, s3, s2);
      const t2 = xk[k++] ^ applySbox(sbox2, s2, s1, s0, s3);
      const t3 = xk[k++] ^ applySbox(sbox2, s3, s2, s1, s0);
      return { s0: t0, s1: t1, s2: t2, s3: t3 };
    }
    function ctrCounter(xk, nonce, src, dst) {
      (0, utils_ts_1.abytes)(nonce, BLOCK_SIZE);
      (0, utils_ts_1.abytes)(src);
      const srcLen = src.length;
      dst = (0, utils_ts_1.getOutput)(srcLen, dst);
      (0, utils_ts_1.complexOverlapBytes)(src, dst);
      const ctr = nonce;
      const c32 = (0, utils_ts_1.u32)(ctr);
      let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
      const src32 = (0, utils_ts_1.u32)(src);
      const dst32 = (0, utils_ts_1.u32)(dst);
      for (let i = 0; i + 4 <= src32.length; i += 4) {
        dst32[i + 0] = src32[i + 0] ^ s0;
        dst32[i + 1] = src32[i + 1] ^ s1;
        dst32[i + 2] = src32[i + 2] ^ s2;
        dst32[i + 3] = src32[i + 3] ^ s3;
        let carry = 1;
        for (let i2 = ctr.length - 1; i2 >= 0; i2--) {
          carry = carry + (ctr[i2] & 255) | 0;
          ctr[i2] = carry & 255;
          carry >>>= 8;
        }
        ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
      }
      const start = BLOCK_SIZE * Math.floor(src32.length / BLOCK_SIZE32);
      if (start < srcLen) {
        const b32 = new Uint32Array([s0, s1, s2, s3]);
        const buf = (0, utils_ts_1.u8)(b32);
        for (let i = start, pos = 0; i < srcLen; i++, pos++)
          dst[i] = src[i] ^ buf[pos];
        (0, utils_ts_1.clean)(b32);
      }
      return dst;
    }
    function ctr32(xk, isLE, nonce, src, dst) {
      (0, utils_ts_1.abytes)(nonce, BLOCK_SIZE);
      (0, utils_ts_1.abytes)(src);
      dst = (0, utils_ts_1.getOutput)(src.length, dst);
      const ctr = nonce;
      const c32 = (0, utils_ts_1.u32)(ctr);
      const view = (0, utils_ts_1.createView)(ctr);
      const src32 = (0, utils_ts_1.u32)(src);
      const dst32 = (0, utils_ts_1.u32)(dst);
      const ctrPos = isLE ? 0 : 12;
      const srcLen = src.length;
      let ctrNum = view.getUint32(ctrPos, isLE);
      let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
      for (let i = 0; i + 4 <= src32.length; i += 4) {
        dst32[i + 0] = src32[i + 0] ^ s0;
        dst32[i + 1] = src32[i + 1] ^ s1;
        dst32[i + 2] = src32[i + 2] ^ s2;
        dst32[i + 3] = src32[i + 3] ^ s3;
        ctrNum = ctrNum + 1 >>> 0;
        view.setUint32(ctrPos, ctrNum, isLE);
        ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
      }
      const start = BLOCK_SIZE * Math.floor(src32.length / BLOCK_SIZE32);
      if (start < srcLen) {
        const b32 = new Uint32Array([s0, s1, s2, s3]);
        const buf = (0, utils_ts_1.u8)(b32);
        for (let i = start, pos = 0; i < srcLen; i++, pos++)
          dst[i] = src[i] ^ buf[pos];
        (0, utils_ts_1.clean)(b32);
      }
      return dst;
    }
    exports.ctr = (0, utils_ts_1.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function aesctr(key, nonce) {
      function processCtr(buf, dst) {
        (0, utils_ts_1.abytes)(buf);
        if (dst !== void 0) {
          (0, utils_ts_1.abytes)(dst);
          if (!(0, utils_ts_1.isAligned32)(dst))
            throw new Error("unaligned destination");
        }
        const xk = expandKeyLE(key);
        const n = (0, utils_ts_1.copyBytes)(nonce);
        const toClean = [xk, n];
        if (!(0, utils_ts_1.isAligned32)(buf))
          toClean.push(buf = (0, utils_ts_1.copyBytes)(buf));
        const out = ctrCounter(xk, n, buf, dst);
        (0, utils_ts_1.clean)(...toClean);
        return out;
      }
      return {
        encrypt: (plaintext, dst) => processCtr(plaintext, dst),
        decrypt: (ciphertext, dst) => processCtr(ciphertext, dst)
      };
    });
    function validateBlockDecrypt(data) {
      (0, utils_ts_1.abytes)(data);
      if (data.length % BLOCK_SIZE !== 0) {
        throw new Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size " + BLOCK_SIZE);
      }
    }
    function validateBlockEncrypt(plaintext, pcks5, dst) {
      (0, utils_ts_1.abytes)(plaintext);
      let outLen = plaintext.length;
      const remaining = outLen % BLOCK_SIZE;
      if (!pcks5 && remaining !== 0)
        throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
      if (!(0, utils_ts_1.isAligned32)(plaintext))
        plaintext = (0, utils_ts_1.copyBytes)(plaintext);
      const b = (0, utils_ts_1.u32)(plaintext);
      if (pcks5) {
        let left = BLOCK_SIZE - remaining;
        if (!left)
          left = BLOCK_SIZE;
        outLen = outLen + left;
      }
      dst = (0, utils_ts_1.getOutput)(outLen, dst);
      (0, utils_ts_1.complexOverlapBytes)(plaintext, dst);
      const o = (0, utils_ts_1.u32)(dst);
      return { b, o, out: dst };
    }
    function validatePCKS(data, pcks5) {
      if (!pcks5)
        return data;
      const len = data.length;
      if (!len)
        throw new Error("aes/pcks5: empty ciphertext not allowed");
      const lastByte = data[len - 1];
      if (lastByte <= 0 || lastByte > 16)
        throw new Error("aes/pcks5: wrong padding");
      const out = data.subarray(0, -lastByte);
      for (let i = 0; i < lastByte; i++)
        if (data[len - i - 1] !== lastByte)
          throw new Error("aes/pcks5: wrong padding");
      return out;
    }
    function padPCKS(left) {
      const tmp = new Uint8Array(16);
      const tmp32 = (0, utils_ts_1.u32)(tmp);
      tmp.set(left);
      const paddingByte = BLOCK_SIZE - left.length;
      for (let i = BLOCK_SIZE - paddingByte; i < BLOCK_SIZE; i++)
        tmp[i] = paddingByte;
      return tmp32;
    }
    exports.ecb = (0, utils_ts_1.wrapCipher)({ blockSize: 16 }, function aesecb(key, opts = {}) {
      const pcks5 = !opts.disablePadding;
      return {
        encrypt(plaintext, dst) {
          const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
          const xk = expandKeyLE(key);
          let i = 0;
          for (; i + 4 <= b.length; ) {
            const { s0, s1, s2, s3 } = encrypt(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
            o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
          }
          if (pcks5) {
            const tmp32 = padPCKS(plaintext.subarray(i * 4));
            const { s0, s1, s2, s3 } = encrypt(xk, tmp32[0], tmp32[1], tmp32[2], tmp32[3]);
            o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
          }
          (0, utils_ts_1.clean)(xk);
          return _out;
        },
        decrypt(ciphertext, dst) {
          validateBlockDecrypt(ciphertext);
          const xk = expandKeyDecLE(key);
          dst = (0, utils_ts_1.getOutput)(ciphertext.length, dst);
          const toClean = [xk];
          if (!(0, utils_ts_1.isAligned32)(ciphertext))
            toClean.push(ciphertext = (0, utils_ts_1.copyBytes)(ciphertext));
          (0, utils_ts_1.complexOverlapBytes)(ciphertext, dst);
          const b = (0, utils_ts_1.u32)(ciphertext);
          const o = (0, utils_ts_1.u32)(dst);
          for (let i = 0; i + 4 <= b.length; ) {
            const { s0, s1, s2, s3 } = decrypt(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
            o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
          }
          (0, utils_ts_1.clean)(...toClean);
          return validatePCKS(dst, pcks5);
        }
      };
    });
    exports.cbc = (0, utils_ts_1.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function aescbc(key, iv, opts = {}) {
      const pcks5 = !opts.disablePadding;
      return {
        encrypt(plaintext, dst) {
          const xk = expandKeyLE(key);
          const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
          let _iv = iv;
          const toClean = [xk];
          if (!(0, utils_ts_1.isAligned32)(_iv))
            toClean.push(_iv = (0, utils_ts_1.copyBytes)(_iv));
          const n32 = (0, utils_ts_1.u32)(_iv);
          let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
          let i = 0;
          for (; i + 4 <= b.length; ) {
            s0 ^= b[i + 0], s1 ^= b[i + 1], s2 ^= b[i + 2], s3 ^= b[i + 3];
            ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
            o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
          }
          if (pcks5) {
            const tmp32 = padPCKS(plaintext.subarray(i * 4));
            s0 ^= tmp32[0], s1 ^= tmp32[1], s2 ^= tmp32[2], s3 ^= tmp32[3];
            ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
            o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
          }
          (0, utils_ts_1.clean)(...toClean);
          return _out;
        },
        decrypt(ciphertext, dst) {
          validateBlockDecrypt(ciphertext);
          const xk = expandKeyDecLE(key);
          let _iv = iv;
          const toClean = [xk];
          if (!(0, utils_ts_1.isAligned32)(_iv))
            toClean.push(_iv = (0, utils_ts_1.copyBytes)(_iv));
          const n32 = (0, utils_ts_1.u32)(_iv);
          dst = (0, utils_ts_1.getOutput)(ciphertext.length, dst);
          if (!(0, utils_ts_1.isAligned32)(ciphertext))
            toClean.push(ciphertext = (0, utils_ts_1.copyBytes)(ciphertext));
          (0, utils_ts_1.complexOverlapBytes)(ciphertext, dst);
          const b = (0, utils_ts_1.u32)(ciphertext);
          const o = (0, utils_ts_1.u32)(dst);
          let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
          for (let i = 0; i + 4 <= b.length; ) {
            const ps0 = s0, ps1 = s1, ps2 = s2, ps3 = s3;
            s0 = b[i + 0], s1 = b[i + 1], s2 = b[i + 2], s3 = b[i + 3];
            const { s0: o0, s1: o1, s2: o2, s3: o3 } = decrypt(xk, s0, s1, s2, s3);
            o[i++] = o0 ^ ps0, o[i++] = o1 ^ ps1, o[i++] = o2 ^ ps2, o[i++] = o3 ^ ps3;
          }
          (0, utils_ts_1.clean)(...toClean);
          return validatePCKS(dst, pcks5);
        }
      };
    });
    exports.cfb = (0, utils_ts_1.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function aescfb(key, iv) {
      function processCfb(src, isEncrypt, dst) {
        (0, utils_ts_1.abytes)(src);
        const srcLen = src.length;
        dst = (0, utils_ts_1.getOutput)(srcLen, dst);
        if ((0, utils_ts_1.overlapBytes)(src, dst))
          throw new Error("overlapping src and dst not supported.");
        const xk = expandKeyLE(key);
        let _iv = iv;
        const toClean = [xk];
        if (!(0, utils_ts_1.isAligned32)(_iv))
          toClean.push(_iv = (0, utils_ts_1.copyBytes)(_iv));
        if (!(0, utils_ts_1.isAligned32)(src))
          toClean.push(src = (0, utils_ts_1.copyBytes)(src));
        const src32 = (0, utils_ts_1.u32)(src);
        const dst32 = (0, utils_ts_1.u32)(dst);
        const next32 = isEncrypt ? dst32 : src32;
        const n32 = (0, utils_ts_1.u32)(_iv);
        let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
        for (let i = 0; i + 4 <= src32.length; ) {
          const { s0: e0, s1: e1, s2: e2, s3: e3 } = encrypt(xk, s0, s1, s2, s3);
          dst32[i + 0] = src32[i + 0] ^ e0;
          dst32[i + 1] = src32[i + 1] ^ e1;
          dst32[i + 2] = src32[i + 2] ^ e2;
          dst32[i + 3] = src32[i + 3] ^ e3;
          s0 = next32[i++], s1 = next32[i++], s2 = next32[i++], s3 = next32[i++];
        }
        const start = BLOCK_SIZE * Math.floor(src32.length / BLOCK_SIZE32);
        if (start < srcLen) {
          ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
          const buf = (0, utils_ts_1.u8)(new Uint32Array([s0, s1, s2, s3]));
          for (let i = start, pos = 0; i < srcLen; i++, pos++)
            dst[i] = src[i] ^ buf[pos];
          (0, utils_ts_1.clean)(buf);
        }
        (0, utils_ts_1.clean)(...toClean);
        return dst;
      }
      return {
        encrypt: (plaintext, dst) => processCfb(plaintext, true, dst),
        decrypt: (ciphertext, dst) => processCfb(ciphertext, false, dst)
      };
    });
    function computeTag(fn, isLE, key, data, AAD) {
      const aadLength = AAD ? AAD.length : 0;
      const h = fn.create(key, data.length + aadLength);
      if (AAD)
        h.update(AAD);
      const num = (0, utils_ts_1.u64Lengths)(8 * data.length, 8 * aadLength, isLE);
      h.update(data);
      h.update(num);
      const res = h.digest();
      (0, utils_ts_1.clean)(num);
      return res;
    }
    exports.gcm = (0, utils_ts_1.wrapCipher)({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, function aesgcm(key, nonce, AAD) {
      if (nonce.length < 8)
        throw new Error("aes/gcm: invalid nonce length");
      const tagLength = 16;
      function _computeTag(authKey, tagMask, data) {
        const tag = computeTag(_polyval_ts_1.ghash, false, authKey, data, AAD);
        for (let i = 0; i < tagMask.length; i++)
          tag[i] ^= tagMask[i];
        return tag;
      }
      function deriveKeys() {
        const xk = expandKeyLE(key);
        const authKey = EMPTY_BLOCK.slice();
        const counter = EMPTY_BLOCK.slice();
        ctr32(xk, false, counter, counter, authKey);
        if (nonce.length === 12) {
          counter.set(nonce);
        } else {
          const nonceLen = EMPTY_BLOCK.slice();
          const view = (0, utils_ts_1.createView)(nonceLen);
          (0, utils_ts_1.setBigUint64)(view, 8, BigInt(nonce.length * 8), false);
          const g = _polyval_ts_1.ghash.create(authKey).update(nonce).update(nonceLen);
          g.digestInto(counter);
          g.destroy();
        }
        const tagMask = ctr32(xk, false, counter, EMPTY_BLOCK);
        return { xk, authKey, counter, tagMask };
      }
      return {
        encrypt(plaintext) {
          const { xk, authKey, counter, tagMask } = deriveKeys();
          const out = new Uint8Array(plaintext.length + tagLength);
          const toClean = [xk, authKey, counter, tagMask];
          if (!(0, utils_ts_1.isAligned32)(plaintext))
            toClean.push(plaintext = (0, utils_ts_1.copyBytes)(plaintext));
          ctr32(xk, false, counter, plaintext, out.subarray(0, plaintext.length));
          const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
          toClean.push(tag);
          out.set(tag, plaintext.length);
          (0, utils_ts_1.clean)(...toClean);
          return out;
        },
        decrypt(ciphertext) {
          const { xk, authKey, counter, tagMask } = deriveKeys();
          const toClean = [xk, authKey, tagMask, counter];
          if (!(0, utils_ts_1.isAligned32)(ciphertext))
            toClean.push(ciphertext = (0, utils_ts_1.copyBytes)(ciphertext));
          const data = ciphertext.subarray(0, -tagLength);
          const passedTag = ciphertext.subarray(-tagLength);
          const tag = _computeTag(authKey, tagMask, data);
          toClean.push(tag);
          if (!(0, utils_ts_1.equalBytes)(tag, passedTag))
            throw new Error("aes/gcm: invalid ghash tag");
          const out = ctr32(xk, false, counter, data);
          (0, utils_ts_1.clean)(...toClean);
          return out;
        }
      };
    });
    const limit = (name, min, max) => (value) => {
      if (!Number.isSafeInteger(value) || min > value || value > max) {
        const minmax = "[" + min + ".." + max + "]";
        throw new Error("" + name + ": expected value in range " + minmax + ", got " + value);
      }
    };
    exports.gcmsiv = (0, utils_ts_1.wrapCipher)({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, function aessiv(key, nonce, AAD) {
      const tagLength = 16;
      const AAD_LIMIT = limit("AAD", 0, 2 ** 36);
      const PLAIN_LIMIT = limit("plaintext", 0, 2 ** 36);
      const NONCE_LIMIT = limit("nonce", 12, 12);
      const CIPHER_LIMIT = limit("ciphertext", 16, 2 ** 36 + 16);
      (0, utils_ts_1.abytes)(key, 16, 24, 32);
      NONCE_LIMIT(nonce.length);
      if (AAD !== void 0)
        AAD_LIMIT(AAD.length);
      function deriveKeys() {
        const xk = expandKeyLE(key);
        const encKey = new Uint8Array(key.length);
        const authKey = new Uint8Array(16);
        const toClean = [xk, encKey];
        let _nonce = nonce;
        if (!(0, utils_ts_1.isAligned32)(_nonce))
          toClean.push(_nonce = (0, utils_ts_1.copyBytes)(_nonce));
        const n32 = (0, utils_ts_1.u32)(_nonce);
        let s0 = 0, s1 = n32[0], s2 = n32[1], s3 = n32[2];
        let counter = 0;
        for (const derivedKey of [authKey, encKey].map(utils_ts_1.u32)) {
          const d32 = (0, utils_ts_1.u32)(derivedKey);
          for (let i = 0; i < d32.length; i += 2) {
            const { s0: o0, s1: o1 } = encrypt(xk, s0, s1, s2, s3);
            d32[i + 0] = o0;
            d32[i + 1] = o1;
            s0 = ++counter;
          }
        }
        const res = { authKey, encKey: expandKeyLE(encKey) };
        (0, utils_ts_1.clean)(...toClean);
        return res;
      }
      function _computeTag(encKey, authKey, data) {
        const tag = computeTag(_polyval_ts_1.polyval, true, authKey, data, AAD);
        for (let i = 0; i < 12; i++)
          tag[i] ^= nonce[i];
        tag[15] &= 127;
        const t32 = (0, utils_ts_1.u32)(tag);
        let s0 = t32[0], s1 = t32[1], s2 = t32[2], s3 = t32[3];
        ({ s0, s1, s2, s3 } = encrypt(encKey, s0, s1, s2, s3));
        t32[0] = s0, t32[1] = s1, t32[2] = s2, t32[3] = s3;
        return tag;
      }
      function processSiv(encKey, tag, input) {
        let block = (0, utils_ts_1.copyBytes)(tag);
        block[15] |= 128;
        const res = ctr32(encKey, true, block, input);
        (0, utils_ts_1.clean)(block);
        return res;
      }
      return {
        encrypt(plaintext) {
          PLAIN_LIMIT(plaintext.length);
          const { encKey, authKey } = deriveKeys();
          const tag = _computeTag(encKey, authKey, plaintext);
          const toClean = [encKey, authKey, tag];
          if (!(0, utils_ts_1.isAligned32)(plaintext))
            toClean.push(plaintext = (0, utils_ts_1.copyBytes)(plaintext));
          const out = new Uint8Array(plaintext.length + tagLength);
          out.set(tag, plaintext.length);
          out.set(processSiv(encKey, tag, plaintext));
          (0, utils_ts_1.clean)(...toClean);
          return out;
        },
        decrypt(ciphertext) {
          CIPHER_LIMIT(ciphertext.length);
          const tag = ciphertext.subarray(-tagLength);
          const { encKey, authKey } = deriveKeys();
          const toClean = [encKey, authKey];
          if (!(0, utils_ts_1.isAligned32)(ciphertext))
            toClean.push(ciphertext = (0, utils_ts_1.copyBytes)(ciphertext));
          const plaintext = processSiv(encKey, tag, ciphertext.subarray(0, -tagLength));
          const expectedTag = _computeTag(encKey, authKey, plaintext);
          toClean.push(expectedTag);
          if (!(0, utils_ts_1.equalBytes)(tag, expectedTag)) {
            (0, utils_ts_1.clean)(...toClean);
            throw new Error("invalid polyval tag");
          }
          (0, utils_ts_1.clean)(...toClean);
          return plaintext;
        }
      };
    });
    exports.siv = exports.gcmsiv;
    function isBytes32(a) {
      return a instanceof Uint32Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint32Array";
    }
    function encryptBlock(xk, block) {
      (0, utils_ts_1.abytes)(block, 16);
      if (!isBytes32(xk))
        throw new Error("_encryptBlock accepts result of expandKeyLE");
      const b32 = (0, utils_ts_1.u32)(block);
      let { s0, s1, s2, s3 } = encrypt(xk, b32[0], b32[1], b32[2], b32[3]);
      b32[0] = s0, b32[1] = s1, b32[2] = s2, b32[3] = s3;
      return block;
    }
    function decryptBlock(xk, block) {
      (0, utils_ts_1.abytes)(block, 16);
      if (!isBytes32(xk))
        throw new Error("_decryptBlock accepts result of expandKeyLE");
      const b32 = (0, utils_ts_1.u32)(block);
      let { s0, s1, s2, s3 } = decrypt(xk, b32[0], b32[1], b32[2], b32[3]);
      b32[0] = s0, b32[1] = s1, b32[2] = s2, b32[3] = s3;
      return block;
    }
    const AESW = {
      /*
      High-level pseudocode:
      ```
      A: u64 = IV
      out = []
      for (let i=0, ctr = 0; i<6; i++) {
        for (const chunk of chunks(plaintext, 8)) {
          A ^= swapEndianess(ctr++)
          [A, res] = chunks(encrypt(A || chunk), 8);
          out ||= res
        }
      }
      out = A || out
      ```
      Decrypt is the same, but reversed.
      */
      encrypt(kek, out) {
        if (out.length >= 2 ** 32)
          throw new Error("plaintext should be less than 4gb");
        const xk = expandKeyLE(kek);
        if (out.length === 16)
          encryptBlock(xk, out);
        else {
          const o32 = (0, utils_ts_1.u32)(out);
          let a0 = o32[0], a1 = o32[1];
          for (let j = 0, ctr = 1; j < 6; j++) {
            for (let pos = 2; pos < o32.length; pos += 2, ctr++) {
              const { s0, s1, s2, s3 } = encrypt(xk, a0, a1, o32[pos], o32[pos + 1]);
              a0 = s0, a1 = s1 ^ byteSwap(ctr), o32[pos] = s2, o32[pos + 1] = s3;
            }
          }
          o32[0] = a0, o32[1] = a1;
        }
        xk.fill(0);
      },
      decrypt(kek, out) {
        if (out.length - 8 >= 2 ** 32)
          throw new Error("ciphertext should be less than 4gb");
        const xk = expandKeyDecLE(kek);
        const chunks = out.length / 8 - 1;
        if (chunks === 1)
          decryptBlock(xk, out);
        else {
          const o32 = (0, utils_ts_1.u32)(out);
          let a0 = o32[0], a1 = o32[1];
          for (let j = 0, ctr = chunks * 6; j < 6; j++) {
            for (let pos = chunks * 2; pos >= 1; pos -= 2, ctr--) {
              a1 ^= byteSwap(ctr);
              const { s0, s1, s2, s3 } = decrypt(xk, a0, a1, o32[pos], o32[pos + 1]);
              a0 = s0, a1 = s1, o32[pos] = s2, o32[pos + 1] = s3;
            }
          }
          o32[0] = a0, o32[1] = a1;
        }
        xk.fill(0);
      }
    };
    const AESKW_IV = /* @__PURE__ */ new Uint8Array(8).fill(166);
    exports.aeskw = (0, utils_ts_1.wrapCipher)({ blockSize: 8 }, (kek) => ({
      encrypt(plaintext) {
        if (!plaintext.length || plaintext.length % 8 !== 0)
          throw new Error("invalid plaintext length");
        if (plaintext.length === 8)
          throw new Error("8-byte keys not allowed in AESKW, use AESKWP instead");
        const out = (0, utils_ts_1.concatBytes)(AESKW_IV, plaintext);
        AESW.encrypt(kek, out);
        return out;
      },
      decrypt(ciphertext) {
        if (ciphertext.length % 8 !== 0 || ciphertext.length < 3 * 8)
          throw new Error("invalid ciphertext length");
        const out = (0, utils_ts_1.copyBytes)(ciphertext);
        AESW.decrypt(kek, out);
        if (!(0, utils_ts_1.equalBytes)(out.subarray(0, 8), AESKW_IV))
          throw new Error("integrity check failed");
        out.subarray(0, 8).fill(0);
        return out.subarray(8);
      }
    }));
    const AESKWP_IV = 2790873510;
    exports.aeskwp = (0, utils_ts_1.wrapCipher)({ blockSize: 8 }, (kek) => ({
      encrypt(plaintext) {
        if (!plaintext.length)
          throw new Error("invalid plaintext length");
        const padded = Math.ceil(plaintext.length / 8) * 8;
        const out = new Uint8Array(8 + padded);
        out.set(plaintext, 8);
        const out32 = (0, utils_ts_1.u32)(out);
        out32[0] = AESKWP_IV;
        out32[1] = byteSwap(plaintext.length);
        AESW.encrypt(kek, out);
        return out;
      },
      decrypt(ciphertext) {
        if (ciphertext.length < 16)
          throw new Error("invalid ciphertext length");
        const out = (0, utils_ts_1.copyBytes)(ciphertext);
        const o32 = (0, utils_ts_1.u32)(out);
        AESW.decrypt(kek, out);
        const len = byteSwap(o32[1]) >>> 0;
        const padded = Math.ceil(len / 8) * 8;
        if (o32[0] !== AESKWP_IV || out.length - 8 !== padded)
          throw new Error("integrity check failed");
        for (let i = len; i < padded; i++)
          if (out[8 + i] !== 0)
            throw new Error("integrity check failed");
        out.subarray(0, 8).fill(0);
        return out.subarray(8, 8 + len);
      }
    }));
    exports.unsafe = {
      expandKeyLE,
      expandKeyDecLE,
      encrypt,
      decrypt,
      encryptBlock,
      decryptBlock,
      ctrCounter,
      ctr32
    };
  })(aes);
  return aes;
}
export {
  requireAes as r
};
