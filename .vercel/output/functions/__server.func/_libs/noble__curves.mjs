import { c as anumber, d as randomBytes, h as hmac, e as concatBytes$2, f as sha256, g as requireUtils$3, i as requireHmac, j as requireSha2, l as requireUtils$4, m as requireHmac$1, n as requireSha2$1, o as sha384, p as sha512, q as randomBytes$1, t as hmac$1, u as concatBytes$3, v as sha256$1, w as requireUtils$5, x as requireHmac$2, y as requireSha2$2 } from "./@noble/hashes.mjs";
const _0n$8 = /* @__PURE__ */ BigInt(0);
const _1n$9 = /* @__PURE__ */ BigInt(1);
function isBytes$1(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes$1(item) {
  if (!isBytes$1(item))
    throw new Error("Uint8Array expected");
}
function abool$1(title, value) {
  if (typeof value !== "boolean")
    throw new Error(title + " boolean expected, got " + value);
}
function numberToHexUnpadded$1(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber$1(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$8 : BigInt("0x" + hex);
}
const hasHexBuiltin = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
);
const hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex$1(bytes) {
  abytes$1(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes$1[bytes[i]];
  }
  return hex;
}
const asciis$1 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16$1(ch) {
  if (ch >= asciis$1._0 && ch <= asciis$1._9)
    return ch - asciis$1._0;
  if (ch >= asciis$1.A && ch <= asciis$1.F)
    return ch - (asciis$1.A - 10);
  if (ch >= asciis$1.a && ch <= asciis$1.f)
    return ch - (asciis$1.a - 10);
  return;
}
function hexToBytes$1(hex) {
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
    const n1 = asciiToBase16$1(hex.charCodeAt(hi));
    const n2 = asciiToBase16$1(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function bytesToNumberBE$1(bytes) {
  return hexToNumber$1(bytesToHex$1(bytes));
}
function bytesToNumberLE$1(bytes) {
  abytes$1(bytes);
  return hexToNumber$1(bytesToHex$1(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE$1(n, len) {
  return hexToBytes$1(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE$1(n, len) {
  return numberToBytesBE$1(n, len).reverse();
}
function ensureBytes$1(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes$1(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes$1(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function concatBytes$1(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes$1(a);
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
function equalBytes(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
const isPosBig$1 = (n) => typeof n === "bigint" && _0n$8 <= n;
function inRange$1(n, min, max) {
  return isPosBig$1(n) && isPosBig$1(min) && isPosBig$1(max) && min <= n && n < max;
}
function aInRange$1(title, n, min, max) {
  if (!inRange$1(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen$1(n) {
  let len;
  for (len = 0; n > _0n$8; n >>= _1n$9, len += 1)
    ;
  return len;
}
const bitMask$1 = (n) => (_1n$9 << BigInt(n)) - _1n$9;
const u8n$1 = (len) => new Uint8Array(len);
const u8fr$1 = (arr) => Uint8Array.from(arr);
function createHmacDrbg$1(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n$1(hashLen);
  let k = u8n$1(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n$1(0)) => {
    k = h(u8fr$1([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr$1([1]), seed);
    v = h();
  };
  const gen = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes$1(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
const validatorFns$1 = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || isBytes$1(val),
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject$1(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns$1[type];
    if (typeof checkVal !== "function")
      throw new Error("invalid validator function");
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
function memoized$1(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
const _0n$7 = BigInt(0), _1n$8 = BigInt(1), _2n$4 = /* @__PURE__ */ BigInt(2), _3n$3 = /* @__PURE__ */ BigInt(3);
const _4n$2 = /* @__PURE__ */ BigInt(4), _5n$1 = /* @__PURE__ */ BigInt(5), _8n$1 = /* @__PURE__ */ BigInt(8);
function mod$1(a, b) {
  const result = a % b;
  return result >= _0n$7 ? result : b + result;
}
function pow2$1(x, power, modulo) {
  let res = x;
  while (power-- > _0n$7) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert$1(number, modulo) {
  if (number === _0n$7)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$7)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod$1(number, modulo);
  let b = modulo;
  let x = _0n$7, u = _1n$8;
  while (a !== _0n$7) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    b = a, a = r, x = u, u = m;
  }
  const gcd = b;
  if (gcd !== _1n$8)
    throw new Error("invert: does not exist");
  return mod$1(x, modulo);
}
function sqrt3mod4(Fp, n) {
  const p1div4 = (Fp.ORDER + _1n$8) / _4n$2;
  const root = Fp.pow(n, p1div4);
  if (!Fp.eql(Fp.sqr(root), n))
    throw new Error("Cannot find square root");
  return root;
}
function sqrt5mod8(Fp, n) {
  const p5div8 = (Fp.ORDER - _5n$1) / _8n$1;
  const n2 = Fp.mul(n, _2n$4);
  const v = Fp.pow(n2, p5div8);
  const nv = Fp.mul(n, v);
  const i = Fp.mul(Fp.mul(nv, _2n$4), v);
  const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
  if (!Fp.eql(Fp.sqr(root), n))
    throw new Error("Cannot find square root");
  return root;
}
function tonelliShanks$1(P) {
  if (P < BigInt(3))
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n$8;
  let S = 0;
  while (Q % _2n$4 === _0n$7) {
    Q /= _2n$4;
    S++;
  }
  let Z = _2n$4;
  const _Fp = Field$1(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n$8) / _2n$4;
  return function tonelliSlow(Fp, n) {
    if (Fp.is0(n))
      return n;
    if (FpLegendre(Fp, n) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c = Fp.mul(Fp.ONE, cc);
    let t = Fp.pow(n, Q);
    let R = Fp.pow(n, Q1div2);
    while (!Fp.eql(t, Fp.ONE)) {
      if (Fp.is0(t))
        return Fp.ZERO;
      let i = 1;
      let t_tmp = Fp.sqr(t);
      while (!Fp.eql(t_tmp, Fp.ONE)) {
        i++;
        t_tmp = Fp.sqr(t_tmp);
        if (i === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n$8 << BigInt(M - i - 1);
      const b = Fp.pow(c, exponent);
      M = i;
      c = Fp.sqr(b);
      t = Fp.mul(t, c);
      R = Fp.mul(R, b);
    }
    return R;
  };
}
function FpSqrt$1(P) {
  if (P % _4n$2 === _3n$3)
    return sqrt3mod4;
  if (P % _8n$1 === _5n$1)
    return sqrt5mod8;
  return tonelliShanks$1(P);
}
const FIELD_FIELDS$1 = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField$1(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS$1.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject$1(field, opts);
}
function FpPow$1(Fp, num, power) {
  if (power < _0n$7)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$7)
    return Fp.ONE;
  if (power === _1n$8)
    return num;
  let p = Fp.ONE;
  let d = num;
  while (power > _0n$7) {
    if (power & _1n$8)
      p = Fp.mul(p, d);
    d = Fp.sqr(d);
    power >>= _1n$8;
  }
  return p;
}
function FpInvertBatch$1(Fp, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp.is0(num))
      return acc;
    inverted[i] = acc;
    return Fp.mul(acc, num);
  }, Fp.ONE);
  const invertedAcc = Fp.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp.is0(num))
      return acc;
    inverted[i] = Fp.mul(acc, inverted[i]);
    return Fp.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp, n) {
  const p1mod2 = (Fp.ORDER - _1n$8) / _2n$4;
  const powered = Fp.pow(n, p1mod2);
  const yes = Fp.eql(powered, Fp.ONE);
  const zero = Fp.eql(powered, Fp.ZERO);
  const no = Fp.eql(powered, Fp.neg(Fp.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength$1(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field$1(ORDER, bitLen2, isLE = false, redef = {}) {
  if (ORDER <= _0n$7)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength$1(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE,
    BITS,
    BYTES,
    MASK: bitMask$1(BITS),
    ZERO: _0n$7,
    ONE: _1n$8,
    create: (num) => mod$1(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n$7 <= num && num < ORDER;
    },
    is0: (num) => num === _0n$7,
    isOdd: (num) => (num & _1n$8) === _1n$8,
    neg: (num) => mod$1(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod$1(num * num, ORDER),
    add: (lhs, rhs) => mod$1(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod$1(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod$1(lhs * rhs, ORDER),
    pow: (num, power) => FpPow$1(f, num, power),
    div: (lhs, rhs) => mod$1(lhs * invert$1(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert$1(num, ORDER),
    sqrt: redef.sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt$1(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE ? numberToBytesLE$1(num, BYTES) : numberToBytesBE$1(num, BYTES),
    fromBytes: (bytes) => {
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      return isLE ? bytesToNumberLE$1(bytes) : bytesToNumberBE$1(bytes);
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch$1(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a, b, c) => c ? b : a
  });
  return Object.freeze(f);
}
function getFieldBytesLength$1(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength$1(fieldOrder) {
  const length = getFieldBytesLength$1(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField$1(key, fieldOrder, isLE = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength$1(fieldOrder);
  const minLen = getMinHashLength$1(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE ? bytesToNumberLE$1(key) : bytesToNumberBE$1(key);
  const reduced = mod$1(num, fieldOrder - _1n$8) + _1n$8;
  return isLE ? numberToBytesLE$1(reduced, fieldLen) : numberToBytesBE$1(reduced, fieldLen);
}
const _0n$6 = BigInt(0);
const _1n$7 = BigInt(1);
function constTimeNegate$1(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function validateW$1(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts$1(W, scalarBits) {
  validateW$1(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask$1(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n$7;
  }
  const offsetStart = window * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints$1(points, c) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars$1(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field.isValid(s))
      throw new Error("invalid scalar at index " + i);
  });
}
const pointPrecomputes$1 = /* @__PURE__ */ new WeakMap();
const pointWindowSizes$1 = /* @__PURE__ */ new WeakMap();
function getW$1(P) {
  return pointWindowSizes$1.get(P) || 1;
}
function wNAF$1(c, bits) {
  return {
    constTimeNegate: constTimeNegate$1,
    hasPrecomputes(elm) {
      return getW$1(elm) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(elm, n, p = c.ZERO) {
      let d = elm;
      while (n > _0n$6) {
        if (n & _1n$7)
          p = p.add(d);
        d = d.double();
        n >>= _1n$7;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = calcWOpts$1(W, bits);
      const points = [];
      let p = elm;
      let base = p;
      for (let window = 0; window < windows; window++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      let p = c.ZERO;
      let f = c.BASE;
      const wo = calcWOpts$1(W, bits);
      for (let window = 0; window < wo.windows; window++) {
        const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window, wo);
        n = nextN;
        if (isZero) {
          f = f.add(constTimeNegate$1(isNegF, precomputes[offsetF]));
        } else {
          p = p.add(constTimeNegate$1(isNeg, precomputes[offset]));
        }
      }
      return { p, f };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
      const wo = calcWOpts$1(W, bits);
      for (let window = 0; window < wo.windows; window++) {
        if (n === _0n$6)
          break;
        const { nextN, offset, isZero, isNeg } = calcOffsets(n, window, wo);
        n = nextN;
        if (isZero) {
          continue;
        } else {
          const item = precomputes[offset];
          acc = acc.add(isNeg ? item.negate() : item);
        }
      }
      return acc;
    },
    getPrecomputes(W, P, transform) {
      let comp = pointPrecomputes$1.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1)
          pointPrecomputes$1.set(P, transform(comp));
      }
      return comp;
    },
    wNAFCached(P, n, transform) {
      const W = getW$1(P);
      return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
    },
    wNAFCachedUnsafe(P, n, transform, prev) {
      const W = getW$1(P);
      if (W === 1)
        return this.unsafeLadder(P, n, prev);
      return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P, W) {
      validateW$1(W, bits);
      pointWindowSizes$1.set(P, W);
      pointPrecomputes$1.delete(P);
    }
  };
}
function pippenger$1(c, fieldN, points, scalars) {
  validateMSMPoints$1(points, c);
  validateMSMScalars$1(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen$1(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask$1(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j = 0; j < slength; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero;
    for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
function validateBasic$1(curve2) {
  validateField$1(curve2.Fp);
  validateObject$1(curve2, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength$1(curve2.n, curve2.nBitLength),
    ...curve2,
    ...{ p: curve2.Fp.ORDER }
  });
}
function validateSigVerOpts$1(opts) {
  if (opts.lowS !== void 0)
    abool$1("lowS", opts.lowS);
  if (opts.prehash !== void 0)
    abool$1("prehash", opts.prehash);
}
function validatePointOpts$1(curve2) {
  const opts = validateBasic$1(curve2);
  validateObject$1(opts, {
    a: "field",
    b: "field"
  }, {
    allowInfinityPoint: "boolean",
    allowedPrivateKeyLengths: "array",
    clearCofactor: "function",
    fromBytes: "function",
    isTorsionFree: "function",
    toBytes: "function",
    wrapPrivateKey: "boolean"
  });
  const { endo, Fp, a } = opts;
  if (endo) {
    if (!Fp.eql(a, Fp.ZERO)) {
      throw new Error("invalid endo: CURVE.a must be 0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    }
  }
  return Object.freeze({ ...opts });
}
let DERErr$1 = class DERErr extends Error {
  constructor(m = "") {
    super(m);
  }
};
const DER$1 = {
  // asn.1 DER encoding utils
  Err: DERErr$1,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E } = DER$1;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded$1(dataLen);
      if (len.length / 2 & 128)
        throw new E("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded$1(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded$1(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E } = DER$1;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length = 0;
      if (!isLong)
        length = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E("tlv.decode(long): zero leftmost byte");
        for (const b of lengthBytes)
          length = length << 8 | b;
        pos += lenLen;
        if (length < 128)
          throw new E("tlv.decode(long): not minimal encoding");
      }
      const v = data.subarray(pos, pos + length);
      if (v.length !== length)
        throw new E("tlv.decode: wrong value length");
      return { v, l: data.subarray(pos + length) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E } = DER$1;
      if (num < _0n$5)
        throw new E("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded$1(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E } = DER$1;
      if (data[0] & 128)
        throw new E("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE$1(data);
    }
  },
  toSig(hex) {
    const { Err: E, _int: int, _tlv: tlv } = DER$1;
    const data = ensureBytes$1("signature", hex);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER$1;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
function numToSizedHex(num, size) {
  return bytesToHex$1(numberToBytesBE$1(num, size));
}
const _0n$5 = BigInt(0), _1n$6 = BigInt(1);
BigInt(2);
const _3n$2 = BigInt(3), _4n$1 = BigInt(4);
function weierstrassPoints$1(opts) {
  const CURVE = validatePointOpts$1(opts);
  const { Fp } = CURVE;
  const Fn = Field$1(CURVE.n, CURVE.nBitLength);
  const toBytes = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a = point.toAffine();
    return concatBytes$1(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
  });
  const fromBytes = CURVE.fromBytes || ((bytes) => {
    const tail = bytes.subarray(1);
    const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
    const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp.sqr(x);
    const x3 = Fp.mul(x2, x);
    return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
  }
  function isValidXY(x, y) {
    const left = Fp.sqr(y);
    const right = weierstrassEquation(x);
    return Fp.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n$2), _4n$1);
  const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
  if (Fp.is0(Fp.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function isWithinCurveOrder(num) {
    return inRange$1(num, _1n$6, CURVE.n);
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (isBytes$1(key))
        key = bytesToHex$1(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("invalid private key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE$1(ensureBytes$1("private key", key, nByteLength));
    } catch (error) {
      throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
    }
    if (wrapPrivateKey)
      num = mod$1(num, N);
    aInRange$1("private key", num, _1n$6, N);
    return num;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  const toAffineMemo = memoized$1((p, iz) => {
    const { px: x, py: y, pz: z } = p;
    if (Fp.eql(z, Fp.ONE))
      return { x, y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp.ONE : Fp.inv(z);
    const ax = Fp.mul(x, iz);
    const ay = Fp.mul(y, iz);
    const zz = Fp.mul(z, iz);
    if (is0)
      return { x: Fp.ZERO, y: Fp.ZERO };
    if (!Fp.eql(zz, Fp.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized$1((p) => {
    if (p.is0()) {
      if (CURVE.allowInfinityPoint && !Fp.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp.isValid(x) || !Fp.isValid(y))
      throw new Error("bad point: x or y not FE");
    if (!isValidXY(x, y))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class Point {
    constructor(px, py, pz) {
      if (px == null || !Fp.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp.isValid(py) || Fp.is0(py))
        throw new Error("y required");
      if (pz == null || !Fp.isValid(pz))
        throw new Error("z required");
      this.px = px;
      this.py = py;
      this.pz = pz;
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point)
        throw new Error("projective point not allowed");
      const is0 = (i) => Fp.eql(i, Fp.ZERO);
      if (is0(x) && is0(y))
        return Point.ZERO;
      return new Point(x, y, Fp.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = FpInvertBatch$1(Fp, points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P = Point.fromAffine(fromBytes(ensureBytes$1("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger$1(Point, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp.isOdd)
        return !Fp.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
      const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
      return U1 && U2;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point(this.px, Fp.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp.mul(b, _3n$2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X3 = Fp.mul(a, Z3);
      Y3 = Fp.mul(b3, t2);
      Y3 = Fp.add(X3, Y3);
      X3 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X3, Y3);
      X3 = Fp.mul(t3, X3);
      Z3 = Fp.mul(b3, Z3);
      t2 = Fp.mul(a, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X3 = Fp.sub(X3, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      const a = CURVE.a;
      const b3 = Fp.mul(CURVE.b, _3n$2);
      let t0 = Fp.mul(X1, X2);
      let t1 = Fp.mul(Y1, Y2);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X2, Y2);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X2, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X3 = Fp.add(Y2, Z2);
      t5 = Fp.mul(t5, X3);
      X3 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X3);
      Z3 = Fp.mul(a, t4);
      X3 = Fp.mul(b3, t2);
      Z3 = Fp.add(X3, Z3);
      X3 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X3, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a, t2);
      t4 = Fp.mul(b3, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X3 = Fp.mul(t3, X3);
      X3 = Fp.sub(X3, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, n, Point.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2, n: N } = CURVE;
      aInRange$1("scalar", sc, _0n$5, N);
      const I = Point.ZERO;
      if (sc === _0n$5)
        return I;
      if (this.is0() || sc === _1n$6)
        return this;
      if (!endo2 || wnaf.hasPrecomputes(this))
        return wnaf.wNAFCachedUnsafe(this, sc, Point.normalizeZ);
      let { k1neg, k1, k2neg, k2 } = endo2.splitScalar(sc);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n$5 || k2 > _0n$5) {
        if (k1 & _1n$6)
          k1p = k1p.add(d);
        if (k2 & _1n$6)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n$6;
        k2 >>= _1n$6;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2, n: N } = CURVE;
      aInRange$1("scalar", scalar, _1n$6, N);
      let point, fake;
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(scalar);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f } = this.wNAF(scalar);
        point = p;
        fake = f;
      }
      return Point.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point.BASE;
      const mul = (P, a2) => a2 === _0n$5 || a2 === _1n$6 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n$6)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n$6)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      abool$1("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      abool$1("isCompressed", isCompressed);
      return bytesToHex$1(this.toRawBytes(isCompressed));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
  Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
  const { endo, nBitLength } = CURVE;
  const wnaf = wNAF$1(Point, endo ? Math.ceil(nBitLength / 2) : nBitLength);
  return {
    CURVE,
    ProjectivePoint: Point,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts$1(curve2) {
  const opts = validateBasic$1(curve2);
  validateObject$1(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass$4(curveDef) {
  const CURVE = validateOpts$1(curveDef);
  const { Fp, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
  const compressedLen = Fp.BYTES + 1;
  const uncompressedLen = 2 * Fp.BYTES + 1;
  function modN(a) {
    return mod$1(a, CURVE_ORDER);
  }
  function invN(a) {
    return invert$1(a, CURVE_ORDER);
  }
  const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints$1({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a = point.toAffine();
      const x = Fp.toBytes(a.x);
      const cat = concatBytes$1;
      abool$1("isCompressed", isCompressed);
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
      }
    },
    fromBytes(bytes) {
      const len = bytes.length;
      const head = bytes[0];
      const tail = bytes.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE$1(tail);
        if (!inRange$1(x, _1n$6, Fp.ORDER))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y;
        try {
          y = Fp.sqrt(y2);
        } catch (sqrtError) {
          const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
          throw new Error("Point is not on curve" + suffix);
        }
        const isYOdd = (y & _1n$6) === _1n$6;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      } else {
        const cl = compressedLen;
        const ul = uncompressedLen;
        throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
      }
    }
  });
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n$6;
    return number > HALF;
  }
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN(-s) : s;
  }
  const slcNum = (b, from, to) => bytesToNumberBE$1(b.slice(from, to));
  class Signature {
    constructor(r, s, recovery) {
      aInRange$1("r", r, _1n$6, CURVE_ORDER);
      aInRange$1("s", s, _1n$6, CURVE_ORDER);
      this.r = r;
      this.s = s;
      if (recovery != null)
        this.recovery = recovery;
      Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l = nByteLength;
      hex = ensureBytes$1("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r, s } = DER$1.toSig(ensureBytes$1("DER", hex));
      return new Signature(r, s);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes$1("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point.fromHex(prefix + numToSizedHex(radj, Fp.BYTES));
      const ir = invN(radj);
      const u1 = modN(-h * ir);
      const u2 = modN(s * ir);
      const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes$1(this.toDERHex());
    }
    toDERHex() {
      return DER$1.hexFromSig(this);
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes$1(this.toCompactHex());
    }
    toCompactHex() {
      const l = nByteLength;
      return numToSizedHex(this.r, l) + numToSizedHex(this.s, l);
    }
  }
  const utils2 = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const length = getMinHashLength$1(CURVE.n);
      return mapHashToField$1(CURVE.randomBytes(length), CURVE.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey(privateKey, isCompressed = true) {
    return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    if (typeof item === "bigint")
      return false;
    if (item instanceof Point)
      return true;
    const arr = ensureBytes$1("key", item);
    const len = arr.length;
    const fpl = Fp.BYTES;
    const compLen = fpl + 1;
    const uncompLen = 2 * fpl + 1;
    if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
      return void 0;
    } else {
      return len === compLen || len === uncompLen;
    }
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicB) === false)
      throw new Error("second arg must be public key");
    const b = Point.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE$1(bytes);
    const delta = bytes.length * 8 - nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
    return modN(bits2int(bytes));
  };
  const ORDER_MASK = bitMask$1(nBitLength);
  function int2octets(num) {
    aInRange$1("num < 2^" + nBitLength, num, _0n$5, ORDER_MASK);
    return numberToBytesBE$1(num, nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { hash, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes$1("msgHash", msgHash);
    validateSigVerOpts$1(opts);
    if (prehash)
      msgHash = ensureBytes$1("prehashed msgHash", hash(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null && ent !== false) {
      const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
      seedArgs.push(ensureBytes$1("extraEntropy", e));
    }
    const seed = concatBytes$1(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point.BASE.multiply(k).toAffine();
      const r = modN(q.x);
      if (r === _0n$5)
        return;
      const s = modN(ik * modN(m + r * d));
      if (s === _0n$5)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n$6);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg$1(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  Point.BASE._setWindowSize(8);
  function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes$1("msgHash", msgHash);
    publicKey = ensureBytes$1("publicKey", publicKey);
    const { lowS, prehash, format } = opts;
    validateSigVerOpts$1(opts);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    if (format !== void 0 && format !== "compact" && format !== "der")
      throw new Error("format must be compact or der");
    const isHex = typeof sg === "string" || isBytes$1(sg);
    const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let _sig = void 0;
    let P;
    try {
      if (isObj)
        _sig = new Signature(sg.r, sg.s);
      if (isHex) {
        try {
          if (format !== "compact")
            _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER$1.Err))
            throw derError;
        }
        if (!_sig && format !== "der")
          _sig = Signature.fromCompact(sg);
      }
      P = Point.fromHex(publicKey);
    } catch (error) {
      return false;
    }
    if (!_sig)
      return false;
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is = invN(s);
    const u1 = modN(h * is);
    const u2 = modN(r * is);
    const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN(R.x);
    return v === r;
  }
  return {
    CURVE,
    getPublicKey,
    getSharedSecret,
    sign,
    verify,
    ProjectivePoint: Point,
    Signature,
    utils: utils2
  };
}
function getHash$1(hash) {
  return {
    hash,
    hmac: (key, ...msgs) => hmac(hash, key, concatBytes$2(...msgs)),
    randomBytes
  };
}
function createCurve$1(curveDef, defHash) {
  const create = (hash) => weierstrass$4({ ...curveDef, ...getHash$1(hash) });
  return { ...create(defHash), create };
}
const secp256k1P$1 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
const secp256k1N$1 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
const _0n$4 = BigInt(0);
const _1n$5 = BigInt(1);
const _2n$3 = BigInt(2);
const divNearest$1 = (a, b) => (a + b / _2n$3) / b;
function sqrtMod$1(y) {
  const P = secp256k1P$1;
  const _3n2 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2$1(b3, _3n2, P) * b3 % P;
  const b9 = pow2$1(b6, _3n2, P) * b3 % P;
  const b11 = pow2$1(b9, _2n$3, P) * b2 % P;
  const b22 = pow2$1(b11, _11n, P) * b11 % P;
  const b44 = pow2$1(b22, _22n, P) * b22 % P;
  const b88 = pow2$1(b44, _44n, P) * b44 % P;
  const b176 = pow2$1(b88, _88n, P) * b88 % P;
  const b220 = pow2$1(b176, _44n, P) * b44 % P;
  const b223 = pow2$1(b220, _3n2, P) * b3 % P;
  const t1 = pow2$1(b223, _23n, P) * b22 % P;
  const t2 = pow2$1(t1, _6n, P) * b2 % P;
  const root = pow2$1(t2, _2n$3, P);
  if (!Fpk1$1.eql(Fpk1$1.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
const Fpk1$1 = Field$1(secp256k1P$1, void 0, void 0, { sqrt: sqrtMod$1 });
const secp256k1$4 = createCurve$1({
  a: _0n$4,
  b: BigInt(7),
  Fp: Fpk1$1,
  n: secp256k1N$1,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: true,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k) => {
      const n = secp256k1N$1;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n$5 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b2 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest$1(b2 * k, n);
      const c2 = divNearest$1(-b1 * k, n);
      let k1 = mod$1(k - c1 * a1 - c2 * a2, n);
      let k2 = mod$1(-c1 * b1 - c2 * b2, n);
      const k1neg = k1 > POW_2_128;
      const k2neg = k2 > POW_2_128;
      if (k1neg)
        k1 = n - k1;
      if (k2neg)
        k2 = n - k2;
      if (k1 > POW_2_128 || k2 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k);
      }
      return { k1neg, k1, k2neg, k2 };
    }
  }
}, sha256);
const secp256k1$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  secp256k1: secp256k1$4
});
var utils$2 = {};
var hasRequiredUtils$2;
function requireUtils$2() {
  if (hasRequiredUtils$2) return utils$2;
  hasRequiredUtils$2 = 1;
  Object.defineProperty(utils$2, "__esModule", { value: true });
  utils$2.notImplemented = utils$2.bitMask = void 0;
  utils$2.isBytes = isBytes2;
  utils$2.abytes = abytes2;
  utils$2.abool = abool2;
  utils$2.numberToHexUnpadded = numberToHexUnpadded2;
  utils$2.hexToNumber = hexToNumber2;
  utils$2.bytesToHex = bytesToHex2;
  utils$2.hexToBytes = hexToBytes2;
  utils$2.bytesToNumberBE = bytesToNumberBE2;
  utils$2.bytesToNumberLE = bytesToNumberLE2;
  utils$2.numberToBytesBE = numberToBytesBE2;
  utils$2.numberToBytesLE = numberToBytesLE2;
  utils$2.numberToVarBytesBE = numberToVarBytesBE;
  utils$2.ensureBytes = ensureBytes2;
  utils$2.concatBytes = concatBytes2;
  utils$2.equalBytes = equalBytes2;
  utils$2.utf8ToBytes = utf8ToBytes;
  utils$2.inRange = inRange2;
  utils$2.aInRange = aInRange2;
  utils$2.bitLen = bitLen2;
  utils$2.bitGet = bitGet;
  utils$2.bitSet = bitSet;
  utils$2.createHmacDrbg = createHmacDrbg2;
  utils$2.validateObject = validateObject2;
  utils$2.memoized = memoized2;
  const _0n2 = /* @__PURE__ */ BigInt(0);
  const _1n2 = /* @__PURE__ */ BigInt(1);
  function isBytes2(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes2(item) {
    if (!isBytes2(item))
      throw new Error("Uint8Array expected");
  }
  function abool2(title, value) {
    if (typeof value !== "boolean")
      throw new Error(title + " boolean expected, got " + value);
  }
  function numberToHexUnpadded2(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? "0" + hex : hex;
  }
  function hexToNumber2(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return hex === "" ? _0n2 : BigInt("0x" + hex);
  }
  const hasHexBuiltin2 = (
    // @ts-ignore
    typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
  );
  const hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex2(bytes) {
    abytes2(bytes);
    if (hasHexBuiltin2)
      return bytes.toHex();
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += hexes2[bytes[i]];
    }
    return hex;
  }
  const asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function asciiToBase162(ch) {
    if (ch >= asciis2._0 && ch <= asciis2._9)
      return ch - asciis2._0;
    if (ch >= asciis2.A && ch <= asciis2.F)
      return ch - (asciis2.A - 10);
    if (ch >= asciis2.a && ch <= asciis2.f)
      return ch - (asciis2.a - 10);
    return;
  }
  function hexToBytes2(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    if (hasHexBuiltin2)
      return Uint8Array.fromHex(hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase162(hex.charCodeAt(hi));
      const n2 = asciiToBase162(hex.charCodeAt(hi + 1));
      if (n1 === void 0 || n2 === void 0) {
        const char = hex[hi] + hex[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n2;
    }
    return array;
  }
  function bytesToNumberBE2(bytes) {
    return hexToNumber2(bytesToHex2(bytes));
  }
  function bytesToNumberLE2(bytes) {
    abytes2(bytes);
    return hexToNumber2(bytesToHex2(Uint8Array.from(bytes).reverse()));
  }
  function numberToBytesBE2(n, len) {
    return hexToBytes2(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE2(n, len) {
    return numberToBytesBE2(n, len).reverse();
  }
  function numberToVarBytesBE(n) {
    return hexToBytes2(numberToHexUnpadded2(n));
  }
  function ensureBytes2(title, hex, expectedLength) {
    let res;
    if (typeof hex === "string") {
      try {
        res = hexToBytes2(hex);
      } catch (e) {
        throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
      }
    } else if (isBytes2(hex)) {
      res = Uint8Array.from(hex);
    } else {
      throw new Error(title + " must be hex string or Uint8Array");
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(title + " of length " + expectedLength + " expected, got " + len);
    return res;
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
  function equalBytes2(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
      diff |= a[i] ^ b[i];
    return diff === 0;
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  const isPosBig2 = (n) => typeof n === "bigint" && _0n2 <= n;
  function inRange2(n, min, max) {
    return isPosBig2(n) && isPosBig2(min) && isPosBig2(max) && min <= n && n < max;
  }
  function aInRange2(title, n, min, max) {
    if (!inRange2(n, min, max))
      throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
  }
  function bitLen2(n) {
    let len;
    for (len = 0; n > _0n2; n >>= _1n2, len += 1)
      ;
    return len;
  }
  function bitGet(n, pos) {
    return n >> BigInt(pos) & _1n2;
  }
  function bitSet(n, pos, value) {
    return n | (value ? _1n2 : _0n2) << BigInt(pos);
  }
  const bitMask2 = (n) => (_1n2 << BigInt(n)) - _1n2;
  utils$2.bitMask = bitMask2;
  const u8n2 = (len) => new Uint8Array(len);
  const u8fr2 = (arr) => Uint8Array.from(arr);
  function createHmacDrbg2(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n2(hashLen);
    let k = u8n2(hashLen);
    let i = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n2(0)) => {
      k = h(u8fr2([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr2([1]), seed);
      v = h();
    };
    const gen = () => {
      if (i++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes2(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  const validatorFns2 = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject2(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns2[type];
      if (typeof checkVal !== "function")
        throw new Error("invalid validator function");
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }
  const notImplemented = () => {
    throw new Error("not implemented");
  };
  utils$2.notImplemented = notImplemented;
  function memoized2(fn) {
    const map = /* @__PURE__ */ new WeakMap();
    return (arg, ...args) => {
      const val = map.get(arg);
      if (val !== void 0)
        return val;
      const computed = fn(arg, ...args);
      map.set(arg, computed);
      return computed;
    };
  }
  return utils$2;
}
var secp256k1$3 = {};
var _shortw_utils$2 = {};
var weierstrass$3 = {};
var curve$2 = {};
var modular$2 = {};
var hasRequiredModular$2;
function requireModular$2() {
  if (hasRequiredModular$2) return modular$2;
  hasRequiredModular$2 = 1;
  Object.defineProperty(modular$2, "__esModule", { value: true });
  modular$2.isNegativeLE = void 0;
  modular$2.mod = mod2;
  modular$2.pow = pow3;
  modular$2.pow2 = pow22;
  modular$2.invert = invert2;
  modular$2.tonelliShanks = tonelliShanks2;
  modular$2.FpSqrt = FpSqrt2;
  modular$2.validateField = validateField2;
  modular$2.FpPow = FpPow2;
  modular$2.FpInvertBatch = FpInvertBatch2;
  modular$2.FpDiv = FpDiv;
  modular$2.FpLegendre = FpLegendre2;
  modular$2.FpIsSquare = FpIsSquare;
  modular$2.nLength = nLength2;
  modular$2.Field = Field2;
  modular$2.FpSqrtOdd = FpSqrtOdd;
  modular$2.FpSqrtEven = FpSqrtEven;
  modular$2.hashToPrivateScalar = hashToPrivateScalar;
  modular$2.getFieldBytesLength = getFieldBytesLength2;
  modular$2.getMinHashLength = getMinHashLength2;
  modular$2.mapHashToField = mapHashToField2;
  const utils_1 = /* @__PURE__ */ requireUtils$3();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = /* @__PURE__ */ BigInt(2), _3n2 = /* @__PURE__ */ BigInt(3);
  const _4n2 = /* @__PURE__ */ BigInt(4), _5n2 = /* @__PURE__ */ BigInt(5), _8n2 = /* @__PURE__ */ BigInt(8);
  function mod2(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow3(num, power, modulo) {
    return FpPow2(Field2(modulo), num, power);
  }
  function pow22(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert2(number, modulo) {
    if (number === _0n2)
      throw new Error("invert: expected non-zero number");
    if (modulo <= _0n2)
      throw new Error("invert: expected positive modulus, got " + modulo);
    let a = mod2(number, modulo);
    let b = modulo;
    let x = _0n2, u = _1n2;
    while (a !== _0n2) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      b = a, a = r, x = u, u = m;
    }
    const gcd = b;
    if (gcd !== _1n2)
      throw new Error("invert: does not exist");
    return mod2(x, modulo);
  }
  function sqrt3mod42(Fp, n) {
    const p1div4 = (Fp.ORDER + _1n2) / _4n2;
    const root = Fp.pow(n, p1div4);
    if (!Fp.eql(Fp.sqr(root), n))
      throw new Error("Cannot find square root");
    return root;
  }
  function sqrt5mod82(Fp, n) {
    const p5div8 = (Fp.ORDER - _5n2) / _8n2;
    const n2 = Fp.mul(n, _2n2);
    const v = Fp.pow(n2, p5div8);
    const nv = Fp.mul(n, v);
    const i = Fp.mul(Fp.mul(nv, _2n2), v);
    const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
    if (!Fp.eql(Fp.sqr(root), n))
      throw new Error("Cannot find square root");
    return root;
  }
  function tonelliShanks2(P) {
    if (P < BigInt(3))
      throw new Error("sqrt is not defined for small field");
    let Q = P - _1n2;
    let S = 0;
    while (Q % _2n2 === _0n2) {
      Q /= _2n2;
      S++;
    }
    let Z = _2n2;
    const _Fp = Field2(P);
    while (FpLegendre2(_Fp, Z) === 1) {
      if (Z++ > 1e3)
        throw new Error("Cannot find square root: probably non-prime P");
    }
    if (S === 1)
      return sqrt3mod42;
    let cc = _Fp.pow(Z, Q);
    const Q1div2 = (Q + _1n2) / _2n2;
    return function tonelliSlow(Fp, n) {
      if (Fp.is0(n))
        return n;
      if (FpLegendre2(Fp, n) !== 1)
        throw new Error("Cannot find square root");
      let M = S;
      let c = Fp.mul(Fp.ONE, cc);
      let t = Fp.pow(n, Q);
      let R = Fp.pow(n, Q1div2);
      while (!Fp.eql(t, Fp.ONE)) {
        if (Fp.is0(t))
          return Fp.ZERO;
        let i = 1;
        let t_tmp = Fp.sqr(t);
        while (!Fp.eql(t_tmp, Fp.ONE)) {
          i++;
          t_tmp = Fp.sqr(t_tmp);
          if (i === M)
            throw new Error("Cannot find square root");
        }
        const exponent = _1n2 << BigInt(M - i - 1);
        const b = Fp.pow(c, exponent);
        M = i;
        c = Fp.sqr(b);
        t = Fp.mul(t, c);
        R = Fp.mul(R, b);
      }
      return R;
    };
  }
  function FpSqrt2(P) {
    if (P % _4n2 === _3n2)
      return sqrt3mod42;
    if (P % _8n2 === _5n2)
      return sqrt5mod82;
    return tonelliShanks2(P);
  }
  const isNegativeLE = (num, modulo) => (mod2(num, modulo) & _1n2) === _1n2;
  modular$2.isNegativeLE = isNegativeLE;
  const FIELD_FIELDS2 = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField2(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS2.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return (0, utils_ts_1.validateObject)(field, opts);
  }
  function FpPow2(Fp, num, power) {
    if (power < _0n2)
      throw new Error("invalid exponent, negatives unsupported");
    if (power === _0n2)
      return Fp.ONE;
    if (power === _1n2)
      return num;
    let p = Fp.ONE;
    let d = num;
    while (power > _0n2) {
      if (power & _1n2)
        p = Fp.mul(p, d);
      d = Fp.sqr(d);
      power >>= _1n2;
    }
    return p;
  }
  function FpInvertBatch2(Fp, nums, passZero = false) {
    const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
    const multipliedAcc = nums.reduce((acc, num, i) => {
      if (Fp.is0(num))
        return acc;
      inverted[i] = acc;
      return Fp.mul(acc, num);
    }, Fp.ONE);
    const invertedAcc = Fp.inv(multipliedAcc);
    nums.reduceRight((acc, num, i) => {
      if (Fp.is0(num))
        return acc;
      inverted[i] = Fp.mul(acc, inverted[i]);
      return Fp.mul(acc, num);
    }, invertedAcc);
    return inverted;
  }
  function FpDiv(Fp, lhs, rhs) {
    return Fp.mul(lhs, typeof rhs === "bigint" ? invert2(rhs, Fp.ORDER) : Fp.inv(rhs));
  }
  function FpLegendre2(Fp, n) {
    const p1mod2 = (Fp.ORDER - _1n2) / _2n2;
    const powered = Fp.pow(n, p1mod2);
    const yes = Fp.eql(powered, Fp.ONE);
    const zero = Fp.eql(powered, Fp.ZERO);
    const no = Fp.eql(powered, Fp.neg(Fp.ONE));
    if (!yes && !zero && !no)
      throw new Error("invalid Legendre symbol result");
    return yes ? 1 : zero ? 0 : -1;
  }
  function FpIsSquare(Fp, n) {
    const l = FpLegendre2(Fp, n);
    return l === 1;
  }
  function nLength2(n, nBitLength) {
    if (nBitLength !== void 0)
      (0, utils_1.anumber)(nBitLength);
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field2(ORDER, bitLen2, isLE = false, redef = {}) {
    if (ORDER <= _0n2)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength2(ORDER, bitLen2);
    if (BYTES > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let sqrtP;
    const f = Object.freeze({
      ORDER,
      isLE,
      BITS,
      BYTES,
      MASK: (0, utils_ts_1.bitMask)(BITS),
      ZERO: _0n2,
      ONE: _1n2,
      create: (num) => mod2(num, ORDER),
      isValid: (num) => {
        if (typeof num !== "bigint")
          throw new Error("invalid field element: expected bigint, got " + typeof num);
        return _0n2 <= num && num < ORDER;
      },
      is0: (num) => num === _0n2,
      isOdd: (num) => (num & _1n2) === _1n2,
      neg: (num) => mod2(-num, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num) => mod2(num * num, ORDER),
      add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
      pow: (num, power) => FpPow2(f, num, power),
      div: (lhs, rhs) => mod2(lhs * invert2(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num) => num * num,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num) => invert2(num, ORDER),
      sqrt: redef.sqrt || ((n) => {
        if (!sqrtP)
          sqrtP = FpSqrt2(ORDER);
        return sqrtP(f, n);
      }),
      toBytes: (num) => isLE ? (0, utils_ts_1.numberToBytesLE)(num, BYTES) : (0, utils_ts_1.numberToBytesBE)(num, BYTES),
      fromBytes: (bytes) => {
        if (bytes.length !== BYTES)
          throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
        return isLE ? (0, utils_ts_1.bytesToNumberLE)(bytes) : (0, utils_ts_1.bytesToNumberBE)(bytes);
      },
      // TODO: we don't need it here, move out to separate fn
      invertBatch: (lst) => FpInvertBatch2(f, lst),
      // We can't move this out because Fp6, Fp12 implement it
      // and it's unclear what to return in there.
      cmov: (a, b, c) => c ? b : a
    });
    return Object.freeze(f);
  }
  function FpSqrtOdd(Fp, elm) {
    if (!Fp.isOdd)
      throw new Error("Field doesn't have isOdd");
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? root : Fp.neg(root);
  }
  function FpSqrtEven(Fp, elm) {
    if (!Fp.isOdd)
      throw new Error("Field doesn't have isOdd");
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? Fp.neg(root) : root;
  }
  function hashToPrivateScalar(hash, groupOrder, isLE = false) {
    hash = (0, utils_ts_1.ensureBytes)("privateHash", hash);
    const hashLen = hash.length;
    const minLen = nLength2(groupOrder).nByteLength + 8;
    if (minLen < 24 || hashLen < minLen || hashLen > 1024)
      throw new Error("hashToPrivateScalar: expected " + minLen + "-1024 bytes of input, got " + hashLen);
    const num = isLE ? (0, utils_ts_1.bytesToNumberLE)(hash) : (0, utils_ts_1.bytesToNumberBE)(hash);
    return mod2(num, groupOrder - _1n2) + _1n2;
  }
  function getFieldBytesLength2(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength2(fieldOrder) {
    const length = getFieldBytesLength2(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField2(key, fieldOrder, isLE = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength2(fieldOrder);
    const minLen = getMinHashLength2(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
    const num = isLE ? (0, utils_ts_1.bytesToNumberLE)(key) : (0, utils_ts_1.bytesToNumberBE)(key);
    const reduced = mod2(num, fieldOrder - _1n2) + _1n2;
    return isLE ? (0, utils_ts_1.numberToBytesLE)(reduced, fieldLen) : (0, utils_ts_1.numberToBytesBE)(reduced, fieldLen);
  }
  return modular$2;
}
var hasRequiredCurve$2;
function requireCurve$2() {
  if (hasRequiredCurve$2) return curve$2;
  hasRequiredCurve$2 = 1;
  Object.defineProperty(curve$2, "__esModule", { value: true });
  curve$2.wNAF = wNAF2;
  curve$2.pippenger = pippenger2;
  curve$2.precomputeMSMUnsafe = precomputeMSMUnsafe;
  curve$2.validateBasic = validateBasic2;
  const modular_ts_1 = /* @__PURE__ */ requireModular$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const _0n2 = BigInt(0);
  const _1n2 = BigInt(1);
  function constTimeNegate2(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
  }
  function validateW2(W, bits) {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
      throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
  }
  function calcWOpts2(W, scalarBits) {
    validateW2(W, scalarBits);
    const windows = Math.ceil(scalarBits / W) + 1;
    const windowSize = 2 ** (W - 1);
    const maxNumber = 2 ** W;
    const mask = (0, utils_ts_1.bitMask)(W);
    const shiftBy = BigInt(W);
    return { windows, windowSize, mask, maxNumber, shiftBy };
  }
  function calcOffsets2(n, window, wOpts) {
    const { windowSize, mask, maxNumber, shiftBy } = wOpts;
    let wbits = Number(n & mask);
    let nextN = n >> shiftBy;
    if (wbits > windowSize) {
      wbits -= maxNumber;
      nextN += _1n2;
    }
    const offsetStart = window * windowSize;
    const offset = offsetStart + Math.abs(wbits) - 1;
    const isZero = wbits === 0;
    const isNeg = wbits < 0;
    const isNegF = window % 2 !== 0;
    const offsetF = offsetStart;
    return { nextN, offset, isZero, isNeg, isNegF, offsetF };
  }
  function validateMSMPoints2(points, c) {
    if (!Array.isArray(points))
      throw new Error("array expected");
    points.forEach((p, i) => {
      if (!(p instanceof c))
        throw new Error("invalid point at index " + i);
    });
  }
  function validateMSMScalars2(scalars, field) {
    if (!Array.isArray(scalars))
      throw new Error("array of scalars expected");
    scalars.forEach((s, i) => {
      if (!field.isValid(s))
        throw new Error("invalid scalar at index " + i);
    });
  }
  const pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
  const pointWindowSizes2 = /* @__PURE__ */ new WeakMap();
  function getW2(P) {
    return pointWindowSizes2.get(P) || 1;
  }
  function wNAF2(c, bits) {
    return {
      constTimeNegate: constTimeNegate2,
      hasPrecomputes(elm) {
        return getW2(elm) !== 1;
      },
      // non-const time multiplication ladder
      unsafeLadder(elm, n, p = c.ZERO) {
        let d = elm;
        while (n > _0n2) {
          if (n & _1n2)
            p = p.add(d);
          d = d.double();
          n >>= _1n2;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @param elm Point instance
       * @param W window size
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = calcWOpts2(W, bits);
        const points = [];
        let p = elm;
        let base = p;
        for (let window = 0; window < windows; window++) {
          base = p;
          points.push(base);
          for (let i = 1; i < windowSize; i++) {
            base = base.add(p);
            points.push(base);
          }
          p = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        let p = c.ZERO;
        let f = c.BASE;
        const wo = calcWOpts2(W, bits);
        for (let window = 0; window < wo.windows; window++) {
          const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets2(n, window, wo);
          n = nextN;
          if (isZero) {
            f = f.add(constTimeNegate2(isNegF, precomputes[offsetF]));
          } else {
            p = p.add(constTimeNegate2(isNeg, precomputes[offset]));
          }
        }
        return { p, f };
      },
      /**
       * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @param acc accumulator point to add result of multiplication
       * @returns point
       */
      wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
        const wo = calcWOpts2(W, bits);
        for (let window = 0; window < wo.windows; window++) {
          if (n === _0n2)
            break;
          const { nextN, offset, isZero, isNeg } = calcOffsets2(n, window, wo);
          n = nextN;
          if (isZero) {
            continue;
          } else {
            const item = precomputes[offset];
            acc = acc.add(isNeg ? item.negate() : item);
          }
        }
        return acc;
      },
      getPrecomputes(W, P, transform) {
        let comp = pointPrecomputes2.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1)
            pointPrecomputes2.set(P, transform(comp));
        }
        return comp;
      },
      wNAFCached(P, n, transform) {
        const W = getW2(P);
        return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
      },
      wNAFCachedUnsafe(P, n, transform, prev) {
        const W = getW2(P);
        if (W === 1)
          return this.unsafeLadder(P, n, prev);
        return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
      },
      // We calculate precomputes for elliptic curve point multiplication
      // using windowed method. This specifies window size and
      // stores precomputed values. Usually only base point would be precomputed.
      setWindowSize(P, W) {
        validateW2(W, bits);
        pointWindowSizes2.set(P, W);
        pointPrecomputes2.delete(P);
      }
    };
  }
  function pippenger2(c, fieldN, points, scalars) {
    validateMSMPoints2(points, c);
    validateMSMScalars2(scalars, fieldN);
    const plength = points.length;
    const slength = scalars.length;
    if (plength !== slength)
      throw new Error("arrays of points and scalars must have equal length");
    const zero = c.ZERO;
    const wbits = (0, utils_ts_1.bitLen)(BigInt(plength));
    let windowSize = 1;
    if (wbits > 12)
      windowSize = wbits - 3;
    else if (wbits > 4)
      windowSize = wbits - 2;
    else if (wbits > 0)
      windowSize = 2;
    const MASK = (0, utils_ts_1.bitMask)(windowSize);
    const buckets = new Array(Number(MASK) + 1).fill(zero);
    const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
    let sum = zero;
    for (let i = lastBits; i >= 0; i -= windowSize) {
      buckets.fill(zero);
      for (let j = 0; j < slength; j++) {
        const scalar = scalars[j];
        const wbits2 = Number(scalar >> BigInt(i) & MASK);
        buckets[wbits2] = buckets[wbits2].add(points[j]);
      }
      let resI = zero;
      for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
        sumI = sumI.add(buckets[j]);
        resI = resI.add(sumI);
      }
      sum = sum.add(resI);
      if (i !== 0)
        for (let j = 0; j < windowSize; j++)
          sum = sum.double();
    }
    return sum;
  }
  function precomputeMSMUnsafe(c, fieldN, points, windowSize) {
    validateW2(windowSize, fieldN.BITS);
    validateMSMPoints2(points, c);
    const zero = c.ZERO;
    const tableSize = 2 ** windowSize - 1;
    const chunks = Math.ceil(fieldN.BITS / windowSize);
    const MASK = (0, utils_ts_1.bitMask)(windowSize);
    const tables = points.map((p) => {
      const res = [];
      for (let i = 0, acc = p; i < tableSize; i++) {
        res.push(acc);
        acc = acc.add(p);
      }
      return res;
    });
    return (scalars) => {
      validateMSMScalars2(scalars, fieldN);
      if (scalars.length > points.length)
        throw new Error("array of scalars must be smaller than array of points");
      let res = zero;
      for (let i = 0; i < chunks; i++) {
        if (res !== zero)
          for (let j = 0; j < windowSize; j++)
            res = res.double();
        const shiftBy = BigInt(chunks * windowSize - (i + 1) * windowSize);
        for (let j = 0; j < scalars.length; j++) {
          const n = scalars[j];
          const curr = Number(n >> shiftBy & MASK);
          if (!curr)
            continue;
          res = res.add(tables[j][curr - 1]);
        }
      }
      return res;
    };
  }
  function validateBasic2(curve2) {
    (0, modular_ts_1.validateField)(curve2.Fp);
    (0, utils_ts_1.validateObject)(curve2, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...(0, modular_ts_1.nLength)(curve2.n, curve2.nBitLength),
      ...curve2,
      ...{ p: curve2.Fp.ORDER }
    });
  }
  return curve$2;
}
var hasRequiredWeierstrass$2;
function requireWeierstrass$2() {
  if (hasRequiredWeierstrass$2) return weierstrass$3;
  hasRequiredWeierstrass$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DER = exports.DERErr = void 0;
    exports.weierstrassPoints = weierstrassPoints2;
    exports.weierstrass = weierstrass2;
    exports.SWUFpSqrtRatio = SWUFpSqrtRatio;
    exports.mapToCurveSimpleSWU = mapToCurveSimpleSWU;
    const curve_ts_1 = /* @__PURE__ */ requireCurve$2();
    const modular_ts_1 = /* @__PURE__ */ requireModular$2();
    const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
    function validateSigVerOpts2(opts) {
      if (opts.lowS !== void 0)
        (0, utils_ts_1.abool)("lowS", opts.lowS);
      if (opts.prehash !== void 0)
        (0, utils_ts_1.abool)("prehash", opts.prehash);
    }
    function validatePointOpts2(curve2) {
      const opts = (0, curve_ts_1.validateBasic)(curve2);
      (0, utils_ts_1.validateObject)(opts, {
        a: "field",
        b: "field"
      }, {
        allowInfinityPoint: "boolean",
        allowedPrivateKeyLengths: "array",
        clearCofactor: "function",
        fromBytes: "function",
        isTorsionFree: "function",
        toBytes: "function",
        wrapPrivateKey: "boolean"
      });
      const { endo, Fp, a } = opts;
      if (endo) {
        if (!Fp.eql(a, Fp.ZERO)) {
          throw new Error("invalid endo: CURVE.a must be 0");
        }
        if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
          throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
        }
      }
      return Object.freeze({ ...opts });
    }
    class DERErr3 extends Error {
      constructor(m = "") {
        super(m);
      }
    }
    exports.DERErr = DERErr3;
    exports.DER = {
      // asn.1 DER encoding utils
      Err: DERErr3,
      // Basic building block is TLV (Tag-Length-Value)
      _tlv: {
        encode: (tag, data) => {
          const { Err: E } = exports.DER;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length & 1)
            throw new E("tlv.encode: unpadded data");
          const dataLen = data.length / 2;
          const len = (0, utils_ts_1.numberToHexUnpadded)(dataLen);
          if (len.length / 2 & 128)
            throw new E("tlv.encode: long form length too big");
          const lenLen = dataLen > 127 ? (0, utils_ts_1.numberToHexUnpadded)(len.length / 2 | 128) : "";
          const t = (0, utils_ts_1.numberToHexUnpadded)(tag);
          return t + lenLen + len + data;
        },
        // v - value, l - left bytes (unparsed)
        decode(tag, data) {
          const { Err: E } = exports.DER;
          let pos = 0;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length < 2 || data[pos++] !== tag)
            throw new E("tlv.decode: wrong tlv");
          const first = data[pos++];
          const isLong = !!(first & 128);
          let length = 0;
          if (!isLong)
            length = first;
          else {
            const lenLen = first & 127;
            if (!lenLen)
              throw new E("tlv.decode(long): indefinite length not supported");
            if (lenLen > 4)
              throw new E("tlv.decode(long): byte length is too big");
            const lengthBytes = data.subarray(pos, pos + lenLen);
            if (lengthBytes.length !== lenLen)
              throw new E("tlv.decode: length bytes not complete");
            if (lengthBytes[0] === 0)
              throw new E("tlv.decode(long): zero leftmost byte");
            for (const b of lengthBytes)
              length = length << 8 | b;
            pos += lenLen;
            if (length < 128)
              throw new E("tlv.decode(long): not minimal encoding");
          }
          const v = data.subarray(pos, pos + length);
          if (v.length !== length)
            throw new E("tlv.decode: wrong value length");
          return { v, l: data.subarray(pos + length) };
        }
      },
      // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
      // since we always use positive integers here. It must always be empty:
      // - add zero byte if exists
      // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
      _int: {
        encode(num) {
          const { Err: E } = exports.DER;
          if (num < _0n2)
            throw new E("integer: negative integers are not allowed");
          let hex = (0, utils_ts_1.numberToHexUnpadded)(num);
          if (Number.parseInt(hex[0], 16) & 8)
            hex = "00" + hex;
          if (hex.length & 1)
            throw new E("unexpected DER parsing assertion: unpadded hex");
          return hex;
        },
        decode(data) {
          const { Err: E } = exports.DER;
          if (data[0] & 128)
            throw new E("invalid signature integer: negative");
          if (data[0] === 0 && !(data[1] & 128))
            throw new E("invalid signature integer: unnecessary leading zero");
          return (0, utils_ts_1.bytesToNumberBE)(data);
        }
      },
      toSig(hex) {
        const { Err: E, _int: int, _tlv: tlv } = exports.DER;
        const data = (0, utils_ts_1.ensureBytes)("signature", hex);
        const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
        if (seqLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
        const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
        if (sLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        return { r: int.decode(rBytes), s: int.decode(sBytes) };
      },
      hexFromSig(sig) {
        const { _tlv: tlv, _int: int } = exports.DER;
        const rs = tlv.encode(2, int.encode(sig.r));
        const ss = tlv.encode(2, int.encode(sig.s));
        const seq = rs + ss;
        return tlv.encode(48, seq);
      }
    };
    function numToSizedHex2(num, size) {
      return (0, utils_ts_1.bytesToHex)((0, utils_ts_1.numberToBytesBE)(num, size));
    }
    const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _3n2 = BigInt(3), _4n2 = BigInt(4);
    function weierstrassPoints2(opts) {
      const CURVE = validatePointOpts2(opts);
      const { Fp } = CURVE;
      const Fn = (0, modular_ts_1.Field)(CURVE.n, CURVE.nBitLength);
      const toBytes = CURVE.toBytes || ((_c, point, _isCompressed) => {
        const a = point.toAffine();
        return (0, utils_ts_1.concatBytes)(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
      });
      const fromBytes = CURVE.fromBytes || ((bytes) => {
        const tail = bytes.subarray(1);
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      });
      function weierstrassEquation(x) {
        const { a, b } = CURVE;
        const x2 = Fp.sqr(x);
        const x3 = Fp.mul(x2, x);
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
      }
      function isValidXY(x, y) {
        const left = Fp.sqr(y);
        const right = weierstrassEquation(x);
        return Fp.eql(left, right);
      }
      if (!isValidXY(CURVE.Gx, CURVE.Gy))
        throw new Error("bad curve params: generator point");
      const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n2), _4n2);
      const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
      if (Fp.is0(Fp.add(_4a3, _27b2)))
        throw new Error("bad curve params: a or b");
      function isWithinCurveOrder(num) {
        return (0, utils_ts_1.inRange)(num, _1n2, CURVE.n);
      }
      function normPrivateKeyToScalar(key) {
        const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
        if (lengths && typeof key !== "bigint") {
          if ((0, utils_ts_1.isBytes)(key))
            key = (0, utils_ts_1.bytesToHex)(key);
          if (typeof key !== "string" || !lengths.includes(key.length))
            throw new Error("invalid private key");
          key = key.padStart(nByteLength * 2, "0");
        }
        let num;
        try {
          num = typeof key === "bigint" ? key : (0, utils_ts_1.bytesToNumberBE)((0, utils_ts_1.ensureBytes)("private key", key, nByteLength));
        } catch (error) {
          throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
        }
        if (wrapPrivateKey)
          num = (0, modular_ts_1.mod)(num, N);
        (0, utils_ts_1.aInRange)("private key", num, _1n2, N);
        return num;
      }
      function aprjpoint(other) {
        if (!(other instanceof Point))
          throw new Error("ProjectivePoint expected");
      }
      const toAffineMemo = (0, utils_ts_1.memoized)((p, iz) => {
        const { px: x, py: y, pz: z } = p;
        if (Fp.eql(z, Fp.ONE))
          return { x, y };
        const is0 = p.is0();
        if (iz == null)
          iz = is0 ? Fp.ONE : Fp.inv(z);
        const ax = Fp.mul(x, iz);
        const ay = Fp.mul(y, iz);
        const zz = Fp.mul(z, iz);
        if (is0)
          return { x: Fp.ZERO, y: Fp.ZERO };
        if (!Fp.eql(zz, Fp.ONE))
          throw new Error("invZ was invalid");
        return { x: ax, y: ay };
      });
      const assertValidMemo = (0, utils_ts_1.memoized)((p) => {
        if (p.is0()) {
          if (CURVE.allowInfinityPoint && !Fp.is0(p.py))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x, y } = p.toAffine();
        if (!Fp.isValid(x) || !Fp.isValid(y))
          throw new Error("bad point: x or y not FE");
        if (!isValidXY(x, y))
          throw new Error("bad point: equation left != right");
        if (!p.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
        return true;
      });
      class Point {
        constructor(px, py, pz) {
          if (px == null || !Fp.isValid(px))
            throw new Error("x required");
          if (py == null || !Fp.isValid(py) || Fp.is0(py))
            throw new Error("y required");
          if (pz == null || !Fp.isValid(pz))
            throw new Error("z required");
          this.px = px;
          this.py = py;
          this.pz = pz;
          Object.freeze(this);
        }
        // Does not validate if the point is on-curve.
        // Use fromHex instead, or call assertValidity() later.
        static fromAffine(p) {
          const { x, y } = p || {};
          if (!p || !Fp.isValid(x) || !Fp.isValid(y))
            throw new Error("invalid affine point");
          if (p instanceof Point)
            throw new Error("projective point not allowed");
          const is0 = (i) => Fp.eql(i, Fp.ZERO);
          if (is0(x) && is0(y))
            return Point.ZERO;
          return new Point(x, y, Fp.ONE);
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        /**
         * Takes a bunch of Projective Points but executes only one
         * inversion on all of them. Inversion is very slow operation,
         * so this improves performance massively.
         * Optimization: converts a list of projective points to a list of identical points with Z=1.
         */
        static normalizeZ(points) {
          const toInv = (0, modular_ts_1.FpInvertBatch)(Fp, points.map((p) => p.pz));
          return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        /**
         * Converts hash string or Uint8Array to Point.
         * @param hex short/long ECDSA hex
         */
        static fromHex(hex) {
          const P = Point.fromAffine(fromBytes((0, utils_ts_1.ensureBytes)("pointHex", hex)));
          P.assertValidity();
          return P;
        }
        // Multiplies generator point by privateKey.
        static fromPrivateKey(privateKey) {
          return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
        }
        // Multiscalar Multiplication
        static msm(points, scalars) {
          return (0, curve_ts_1.pippenger)(Point, Fn, points, scalars);
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
          wnaf.setWindowSize(this, windowSize);
        }
        // A point on curve is valid if it conforms to equation.
        assertValidity() {
          assertValidMemo(this);
        }
        hasEvenY() {
          const { y } = this.toAffine();
          if (Fp.isOdd)
            return !Fp.isOdd(y);
          throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */
        equals(other) {
          aprjpoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
          const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
          return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */
        negate() {
          return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
          const { a, b } = CURVE;
          const b3 = Fp.mul(b, _3n2);
          const { px: X1, py: Y1, pz: Z1 } = this;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          let t0 = Fp.mul(X1, X1);
          let t1 = Fp.mul(Y1, Y1);
          let t2 = Fp.mul(Z1, Z1);
          let t3 = Fp.mul(X1, Y1);
          t3 = Fp.add(t3, t3);
          Z3 = Fp.mul(X1, Z1);
          Z3 = Fp.add(Z3, Z3);
          X3 = Fp.mul(a, Z3);
          Y3 = Fp.mul(b3, t2);
          Y3 = Fp.add(X3, Y3);
          X3 = Fp.sub(t1, Y3);
          Y3 = Fp.add(t1, Y3);
          Y3 = Fp.mul(X3, Y3);
          X3 = Fp.mul(t3, X3);
          Z3 = Fp.mul(b3, Z3);
          t2 = Fp.mul(a, t2);
          t3 = Fp.sub(t0, t2);
          t3 = Fp.mul(a, t3);
          t3 = Fp.add(t3, Z3);
          Z3 = Fp.add(t0, t0);
          t0 = Fp.add(Z3, t0);
          t0 = Fp.add(t0, t2);
          t0 = Fp.mul(t0, t3);
          Y3 = Fp.add(Y3, t0);
          t2 = Fp.mul(Y1, Z1);
          t2 = Fp.add(t2, t2);
          t0 = Fp.mul(t2, t3);
          X3 = Fp.sub(X3, t0);
          Z3 = Fp.mul(t2, t1);
          Z3 = Fp.add(Z3, Z3);
          Z3 = Fp.add(Z3, Z3);
          return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
          aprjpoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          const a = CURVE.a;
          const b3 = Fp.mul(CURVE.b, _3n2);
          let t0 = Fp.mul(X1, X2);
          let t1 = Fp.mul(Y1, Y2);
          let t2 = Fp.mul(Z1, Z2);
          let t3 = Fp.add(X1, Y1);
          let t4 = Fp.add(X2, Y2);
          t3 = Fp.mul(t3, t4);
          t4 = Fp.add(t0, t1);
          t3 = Fp.sub(t3, t4);
          t4 = Fp.add(X1, Z1);
          let t5 = Fp.add(X2, Z2);
          t4 = Fp.mul(t4, t5);
          t5 = Fp.add(t0, t2);
          t4 = Fp.sub(t4, t5);
          t5 = Fp.add(Y1, Z1);
          X3 = Fp.add(Y2, Z2);
          t5 = Fp.mul(t5, X3);
          X3 = Fp.add(t1, t2);
          t5 = Fp.sub(t5, X3);
          Z3 = Fp.mul(a, t4);
          X3 = Fp.mul(b3, t2);
          Z3 = Fp.add(X3, Z3);
          X3 = Fp.sub(t1, Z3);
          Z3 = Fp.add(t1, Z3);
          Y3 = Fp.mul(X3, Z3);
          t1 = Fp.add(t0, t0);
          t1 = Fp.add(t1, t0);
          t2 = Fp.mul(a, t2);
          t4 = Fp.mul(b3, t4);
          t1 = Fp.add(t1, t2);
          t2 = Fp.sub(t0, t2);
          t2 = Fp.mul(a, t2);
          t4 = Fp.add(t4, t2);
          t0 = Fp.mul(t1, t4);
          Y3 = Fp.add(Y3, t0);
          t0 = Fp.mul(t5, t4);
          X3 = Fp.mul(t3, X3);
          X3 = Fp.sub(X3, t0);
          t0 = Fp.mul(t3, t1);
          Z3 = Fp.mul(t5, Z3);
          Z3 = Fp.add(Z3, t0);
          return new Point(X3, Y3, Z3);
        }
        subtract(other) {
          return this.add(other.negate());
        }
        is0() {
          return this.equals(Point.ZERO);
        }
        wNAF(n) {
          return wnaf.wNAFCached(this, n, Point.normalizeZ);
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(sc) {
          const { endo: endo2, n: N } = CURVE;
          (0, utils_ts_1.aInRange)("scalar", sc, _0n2, N);
          const I = Point.ZERO;
          if (sc === _0n2)
            return I;
          if (this.is0() || sc === _1n2)
            return this;
          if (!endo2 || wnaf.hasPrecomputes(this))
            return wnaf.wNAFCachedUnsafe(this, sc, Point.normalizeZ);
          let { k1neg, k1, k2neg, k2 } = endo2.splitScalar(sc);
          let k1p = I;
          let k2p = I;
          let d = this;
          while (k1 > _0n2 || k2 > _0n2) {
            if (k1 & _1n2)
              k1p = k1p.add(d);
            if (k2 & _1n2)
              k2p = k2p.add(d);
            d = d.double();
            k1 >>= _1n2;
            k2 >>= _1n2;
          }
          if (k1neg)
            k1p = k1p.negate();
          if (k2neg)
            k2p = k2p.negate();
          k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
          return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(scalar) {
          const { endo: endo2, n: N } = CURVE;
          (0, utils_ts_1.aInRange)("scalar", scalar, _1n2, N);
          let point, fake;
          if (endo2) {
            const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(scalar);
            let { p: k1p, f: f1p } = this.wNAF(k1);
            let { p: k2p, f: f2p } = this.wNAF(k2);
            k1p = wnaf.constTimeNegate(k1neg, k1p);
            k2p = wnaf.constTimeNegate(k2neg, k2p);
            k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
            point = k1p.add(k2p);
            fake = f1p.add(f2p);
          } else {
            const { p, f } = this.wNAF(scalar);
            point = p;
            fake = f;
          }
          return Point.normalizeZ([point, fake])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */
        multiplyAndAddUnsafe(Q, a, b) {
          const G = Point.BASE;
          const mul = (P, a2) => a2 === _0n2 || a2 === _1n2 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
          const sum = mul(this, a).add(mul(Q, b));
          return sum.is0() ? void 0 : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
          return toAffineMemo(this, iz);
        }
        isTorsionFree() {
          const { h: cofactor, isTorsionFree } = CURVE;
          if (cofactor === _1n2)
            return true;
          if (isTorsionFree)
            return isTorsionFree(Point, this);
          throw new Error("isTorsionFree() has not been declared for the elliptic curve");
        }
        clearCofactor() {
          const { h: cofactor, clearCofactor } = CURVE;
          if (cofactor === _1n2)
            return this;
          if (clearCofactor)
            return clearCofactor(Point, this);
          return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
          (0, utils_ts_1.abool)("isCompressed", isCompressed);
          this.assertValidity();
          return toBytes(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
          (0, utils_ts_1.abool)("isCompressed", isCompressed);
          return (0, utils_ts_1.bytesToHex)(this.toRawBytes(isCompressed));
        }
      }
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
      Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
      const { endo, nBitLength } = CURVE;
      const wnaf = (0, curve_ts_1.wNAF)(Point, endo ? Math.ceil(nBitLength / 2) : nBitLength);
      return {
        CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar,
        weierstrassEquation,
        isWithinCurveOrder
      };
    }
    function validateOpts2(curve2) {
      const opts = (0, curve_ts_1.validateBasic)(curve2);
      (0, utils_ts_1.validateObject)(opts, {
        hash: "hash",
        hmac: "function",
        randomBytes: "function"
      }, {
        bits2int: "function",
        bits2int_modN: "function",
        lowS: "boolean"
      });
      return Object.freeze({ lowS: true, ...opts });
    }
    function weierstrass2(curveDef) {
      const CURVE = validateOpts2(curveDef);
      const { Fp, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
      const compressedLen = Fp.BYTES + 1;
      const uncompressedLen = 2 * Fp.BYTES + 1;
      function modN(a) {
        return (0, modular_ts_1.mod)(a, CURVE_ORDER);
      }
      function invN(a) {
        return (0, modular_ts_1.invert)(a, CURVE_ORDER);
      }
      const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints2({
        ...CURVE,
        toBytes(_c, point, isCompressed) {
          const a = point.toAffine();
          const x = Fp.toBytes(a.x);
          const cat = utils_ts_1.concatBytes;
          (0, utils_ts_1.abool)("isCompressed", isCompressed);
          if (isCompressed) {
            return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
          } else {
            return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
          }
        },
        fromBytes(bytes) {
          const len = bytes.length;
          const head = bytes[0];
          const tail = bytes.subarray(1);
          if (len === compressedLen && (head === 2 || head === 3)) {
            const x = (0, utils_ts_1.bytesToNumberBE)(tail);
            if (!(0, utils_ts_1.inRange)(x, _1n2, Fp.ORDER))
              throw new Error("Point is not on curve");
            const y2 = weierstrassEquation(x);
            let y;
            try {
              y = Fp.sqrt(y2);
            } catch (sqrtError) {
              const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
              throw new Error("Point is not on curve" + suffix);
            }
            const isYOdd = (y & _1n2) === _1n2;
            const isHeadOdd = (head & 1) === 1;
            if (isHeadOdd !== isYOdd)
              y = Fp.neg(y);
            return { x, y };
          } else if (len === uncompressedLen && head === 4) {
            const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
            const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
            return { x, y };
          } else {
            const cl = compressedLen;
            const ul = uncompressedLen;
            throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
          }
        }
      });
      function isBiggerThanHalfOrder(number) {
        const HALF = CURVE_ORDER >> _1n2;
        return number > HALF;
      }
      function normalizeS(s) {
        return isBiggerThanHalfOrder(s) ? modN(-s) : s;
      }
      const slcNum = (b, from, to) => (0, utils_ts_1.bytesToNumberBE)(b.slice(from, to));
      class Signature {
        constructor(r, s, recovery) {
          (0, utils_ts_1.aInRange)("r", r, _1n2, CURVE_ORDER);
          (0, utils_ts_1.aInRange)("s", s, _1n2, CURVE_ORDER);
          this.r = r;
          this.s = s;
          if (recovery != null)
            this.recovery = recovery;
          Object.freeze(this);
        }
        // pair (bytes of r, bytes of s)
        static fromCompact(hex) {
          const l = nByteLength;
          hex = (0, utils_ts_1.ensureBytes)("compactSignature", hex, l * 2);
          return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
        }
        // DER encoded ECDSA signature
        // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
        static fromDER(hex) {
          const { r, s } = exports.DER.toSig((0, utils_ts_1.ensureBytes)("DER", hex));
          return new Signature(r, s);
        }
        /**
         * @todo remove
         * @deprecated
         */
        assertValidity() {
        }
        addRecoveryBit(recovery) {
          return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(msgHash) {
          const { r, s, recovery: rec } = this;
          const h = bits2int_modN((0, utils_ts_1.ensureBytes)("msgHash", msgHash));
          if (rec == null || ![0, 1, 2, 3].includes(rec))
            throw new Error("recovery id invalid");
          const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
          if (radj >= Fp.ORDER)
            throw new Error("recovery id 2 or 3 invalid");
          const prefix = (rec & 1) === 0 ? "02" : "03";
          const R = Point.fromHex(prefix + numToSizedHex2(radj, Fp.BYTES));
          const ir = invN(radj);
          const u1 = modN(-h * ir);
          const u2 = modN(s * ir);
          const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
          if (!Q)
            throw new Error("point at infinify");
          Q.assertValidity();
          return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
          return isBiggerThanHalfOrder(this.s);
        }
        normalizeS() {
          return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
        }
        // DER-encoded
        toDERRawBytes() {
          return (0, utils_ts_1.hexToBytes)(this.toDERHex());
        }
        toDERHex() {
          return exports.DER.hexFromSig(this);
        }
        // padded bytes of r, then padded bytes of s
        toCompactRawBytes() {
          return (0, utils_ts_1.hexToBytes)(this.toCompactHex());
        }
        toCompactHex() {
          const l = nByteLength;
          return numToSizedHex2(this.r, l) + numToSizedHex2(this.s, l);
        }
      }
      const utils2 = {
        isValidPrivateKey(privateKey) {
          try {
            normPrivateKeyToScalar(privateKey);
            return true;
          } catch (error) {
            return false;
          }
        },
        normPrivateKeyToScalar,
        /**
         * Produces cryptographically secure private key from random of size
         * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
         */
        randomPrivateKey: () => {
          const length = (0, modular_ts_1.getMinHashLength)(CURVE.n);
          return (0, modular_ts_1.mapHashToField)(CURVE.randomBytes(length), CURVE.n);
        },
        /**
         * Creates precompute table for an arbitrary EC point. Makes point "cached".
         * Allows to massively speed-up `point.multiply(scalar)`.
         * @returns cached point
         * @example
         * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
         * fast.multiply(privKey); // much faster ECDH now
         */
        precompute(windowSize = 8, point = Point.BASE) {
          point._setWindowSize(windowSize);
          point.multiply(BigInt(3));
          return point;
        }
      };
      function getPublicKey(privateKey, isCompressed = true) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
      }
      function isProbPub(item) {
        if (typeof item === "bigint")
          return false;
        if (item instanceof Point)
          return true;
        const arr = (0, utils_ts_1.ensureBytes)("key", item);
        const len = arr.length;
        const fpl = Fp.BYTES;
        const compLen = fpl + 1;
        const uncompLen = 2 * fpl + 1;
        if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
          return void 0;
        } else {
          return len === compLen || len === uncompLen;
        }
      }
      function getSharedSecret(privateA, publicB, isCompressed = true) {
        if (isProbPub(privateA) === true)
          throw new Error("first arg must be private key");
        if (isProbPub(publicB) === false)
          throw new Error("second arg must be public key");
        const b = Point.fromHex(publicB);
        return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
      }
      const bits2int = CURVE.bits2int || function(bytes) {
        if (bytes.length > 8192)
          throw new Error("input is too large");
        const num = (0, utils_ts_1.bytesToNumberBE)(bytes);
        const delta = bytes.length * 8 - nBitLength;
        return delta > 0 ? num >> BigInt(delta) : num;
      };
      const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
        return modN(bits2int(bytes));
      };
      const ORDER_MASK = (0, utils_ts_1.bitMask)(nBitLength);
      function int2octets(num) {
        (0, utils_ts_1.aInRange)("num < 2^" + nBitLength, num, _0n2, ORDER_MASK);
        return (0, utils_ts_1.numberToBytesBE)(num, nByteLength);
      }
      function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
        if (["recovered", "canonical"].some((k) => k in opts))
          throw new Error("sign() legacy options not supported");
        const { hash, randomBytes: randomBytes2 } = CURVE;
        let { lowS, prehash, extraEntropy: ent } = opts;
        if (lowS == null)
          lowS = true;
        msgHash = (0, utils_ts_1.ensureBytes)("msgHash", msgHash);
        validateSigVerOpts2(opts);
        if (prehash)
          msgHash = (0, utils_ts_1.ensureBytes)("prehashed msgHash", hash(msgHash));
        const h1int = bits2int_modN(msgHash);
        const d = normPrivateKeyToScalar(privateKey);
        const seedArgs = [int2octets(d), int2octets(h1int)];
        if (ent != null && ent !== false) {
          const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
          seedArgs.push((0, utils_ts_1.ensureBytes)("extraEntropy", e));
        }
        const seed = (0, utils_ts_1.concatBytes)(...seedArgs);
        const m = h1int;
        function k2sig(kBytes) {
          const k = bits2int(kBytes);
          if (!isWithinCurveOrder(k))
            return;
          const ik = invN(k);
          const q = Point.BASE.multiply(k).toAffine();
          const r = modN(q.x);
          if (r === _0n2)
            return;
          const s = modN(ik * modN(m + r * d));
          if (s === _0n2)
            return;
          let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n2);
          let normS = s;
          if (lowS && isBiggerThanHalfOrder(s)) {
            normS = normalizeS(s);
            recovery ^= 1;
          }
          return new Signature(r, normS, recovery);
        }
        return { seed, k2sig };
      }
      const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
      const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
      function sign(msgHash, privKey, opts = defaultSigOpts) {
        const { seed, k2sig } = prepSig(msgHash, privKey, opts);
        const C = CURVE;
        const drbg = (0, utils_ts_1.createHmacDrbg)(C.hash.outputLen, C.nByteLength, C.hmac);
        return drbg(seed, k2sig);
      }
      Point.BASE._setWindowSize(8);
      function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
        const sg = signature;
        msgHash = (0, utils_ts_1.ensureBytes)("msgHash", msgHash);
        publicKey = (0, utils_ts_1.ensureBytes)("publicKey", publicKey);
        const { lowS, prehash, format } = opts;
        validateSigVerOpts2(opts);
        if ("strict" in opts)
          throw new Error("options.strict was renamed to lowS");
        if (format !== void 0 && format !== "compact" && format !== "der")
          throw new Error("format must be compact or der");
        const isHex = typeof sg === "string" || (0, utils_ts_1.isBytes)(sg);
        const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
        if (!isHex && !isObj)
          throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        let _sig = void 0;
        let P;
        try {
          if (isObj)
            _sig = new Signature(sg.r, sg.s);
          if (isHex) {
            try {
              if (format !== "compact")
                _sig = Signature.fromDER(sg);
            } catch (derError) {
              if (!(derError instanceof exports.DER.Err))
                throw derError;
            }
            if (!_sig && format !== "der")
              _sig = Signature.fromCompact(sg);
          }
          P = Point.fromHex(publicKey);
        } catch (error) {
          return false;
        }
        if (!_sig)
          return false;
        if (lowS && _sig.hasHighS())
          return false;
        if (prehash)
          msgHash = CURVE.hash(msgHash);
        const { r, s } = _sig;
        const h = bits2int_modN(msgHash);
        const is = invN(s);
        const u1 = modN(h * is);
        const u2 = modN(r * is);
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
        if (!R)
          return false;
        const v = modN(R.x);
        return v === r;
      }
      return {
        CURVE,
        getPublicKey,
        getSharedSecret,
        sign,
        verify,
        ProjectivePoint: Point,
        Signature,
        utils: utils2
      };
    }
    function SWUFpSqrtRatio(Fp, Z) {
      const q = Fp.ORDER;
      let l = _0n2;
      for (let o = q - _1n2; o % _2n2 === _0n2; o /= _2n2)
        l += _1n2;
      const c1 = l;
      const _2n_pow_c1_1 = _2n2 << c1 - _1n2 - _1n2;
      const _2n_pow_c1 = _2n_pow_c1_1 * _2n2;
      const c2 = (q - _1n2) / _2n_pow_c1;
      const c3 = (c2 - _1n2) / _2n2;
      const c4 = _2n_pow_c1 - _1n2;
      const c5 = _2n_pow_c1_1;
      const c6 = Fp.pow(Z, c2);
      const c7 = Fp.pow(Z, (c2 + _1n2) / _2n2);
      let sqrtRatio = (u, v) => {
        let tv1 = c6;
        let tv2 = Fp.pow(v, c4);
        let tv3 = Fp.sqr(tv2);
        tv3 = Fp.mul(tv3, v);
        let tv5 = Fp.mul(u, tv3);
        tv5 = Fp.pow(tv5, c3);
        tv5 = Fp.mul(tv5, tv2);
        tv2 = Fp.mul(tv5, v);
        tv3 = Fp.mul(tv5, u);
        let tv4 = Fp.mul(tv3, tv2);
        tv5 = Fp.pow(tv4, c5);
        let isQR = Fp.eql(tv5, Fp.ONE);
        tv2 = Fp.mul(tv3, c7);
        tv5 = Fp.mul(tv4, tv1);
        tv3 = Fp.cmov(tv2, tv3, isQR);
        tv4 = Fp.cmov(tv5, tv4, isQR);
        for (let i = c1; i > _1n2; i--) {
          let tv52 = i - _2n2;
          tv52 = _2n2 << tv52 - _1n2;
          let tvv5 = Fp.pow(tv4, tv52);
          const e1 = Fp.eql(tvv5, Fp.ONE);
          tv2 = Fp.mul(tv3, tv1);
          tv1 = Fp.mul(tv1, tv1);
          tvv5 = Fp.mul(tv4, tv1);
          tv3 = Fp.cmov(tv2, tv3, e1);
          tv4 = Fp.cmov(tvv5, tv4, e1);
        }
        return { isValid: isQR, value: tv3 };
      };
      if (Fp.ORDER % _4n2 === _3n2) {
        const c12 = (Fp.ORDER - _3n2) / _4n2;
        const c22 = Fp.sqrt(Fp.neg(Z));
        sqrtRatio = (u, v) => {
          let tv1 = Fp.sqr(v);
          const tv2 = Fp.mul(u, v);
          tv1 = Fp.mul(tv1, tv2);
          let y1 = Fp.pow(tv1, c12);
          y1 = Fp.mul(y1, tv2);
          const y2 = Fp.mul(y1, c22);
          const tv3 = Fp.mul(Fp.sqr(y1), v);
          const isQR = Fp.eql(tv3, u);
          let y = Fp.cmov(y2, y1, isQR);
          return { isValid: isQR, value: y };
        };
      }
      return sqrtRatio;
    }
    function mapToCurveSimpleSWU(Fp, opts) {
      (0, modular_ts_1.validateField)(Fp);
      if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z))
        throw new Error("mapToCurveSimpleSWU: invalid opts");
      const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
      if (!Fp.isOdd)
        throw new Error("Fp.isOdd is not implemented!");
      return (u) => {
        let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
        tv1 = Fp.sqr(u);
        tv1 = Fp.mul(tv1, opts.Z);
        tv2 = Fp.sqr(tv1);
        tv2 = Fp.add(tv2, tv1);
        tv3 = Fp.add(tv2, Fp.ONE);
        tv3 = Fp.mul(tv3, opts.B);
        tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
        tv4 = Fp.mul(tv4, opts.A);
        tv2 = Fp.sqr(tv3);
        tv6 = Fp.sqr(tv4);
        tv5 = Fp.mul(tv6, opts.A);
        tv2 = Fp.add(tv2, tv5);
        tv2 = Fp.mul(tv2, tv3);
        tv6 = Fp.mul(tv6, tv4);
        tv5 = Fp.mul(tv6, opts.B);
        tv2 = Fp.add(tv2, tv5);
        x = Fp.mul(tv1, tv3);
        const { isValid, value } = sqrtRatio(tv2, tv6);
        y = Fp.mul(tv1, u);
        y = Fp.mul(y, value);
        x = Fp.cmov(x, tv3, isValid);
        y = Fp.cmov(y, value, isValid);
        const e1 = Fp.isOdd(u) === Fp.isOdd(y);
        y = Fp.cmov(Fp.neg(y), y, e1);
        const tv4_inv = (0, modular_ts_1.FpInvertBatch)(Fp, [tv4], true)[0];
        x = Fp.mul(x, tv4_inv);
        return { x, y };
      };
    }
  })(weierstrass$3);
  return weierstrass$3;
}
var hasRequired_shortw_utils$2;
function require_shortw_utils$2() {
  if (hasRequired_shortw_utils$2) return _shortw_utils$2;
  hasRequired_shortw_utils$2 = 1;
  Object.defineProperty(_shortw_utils$2, "__esModule", { value: true });
  _shortw_utils$2.getHash = getHash2;
  _shortw_utils$2.createCurve = createCurve2;
  const hmac_1 = /* @__PURE__ */ requireHmac();
  const utils_1 = /* @__PURE__ */ requireUtils$3();
  const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass$2();
  function getHash2(hash) {
    return {
      hash,
      hmac: (key, ...msgs) => (0, hmac_1.hmac)(hash, key, (0, utils_1.concatBytes)(...msgs)),
      randomBytes: utils_1.randomBytes
    };
  }
  function createCurve2(curveDef, defHash) {
    const create = (hash) => (0, weierstrass_ts_1.weierstrass)({ ...curveDef, ...getHash2(hash) });
    return { ...create(defHash), create };
  }
  return _shortw_utils$2;
}
var hashToCurve$2 = {};
var hasRequiredHashToCurve$2;
function requireHashToCurve$2() {
  if (hasRequiredHashToCurve$2) return hashToCurve$2;
  hasRequiredHashToCurve$2 = 1;
  Object.defineProperty(hashToCurve$2, "__esModule", { value: true });
  hashToCurve$2.expand_message_xmd = expand_message_xmd;
  hashToCurve$2.expand_message_xof = expand_message_xof;
  hashToCurve$2.hash_to_field = hash_to_field;
  hashToCurve$2.isogenyMap = isogenyMap;
  hashToCurve$2.createHasher = createHasher;
  const modular_ts_1 = /* @__PURE__ */ requireModular$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const os2ip = utils_ts_1.bytesToNumberBE;
  function i2osp(value, length) {
    anum(value);
    anum(length);
    if (value < 0 || value >= 1 << 8 * length)
      throw new Error("invalid I2OSP input: " + value);
    const res = Array.from({ length }).fill(0);
    for (let i = length - 1; i >= 0; i--) {
      res[i] = value & 255;
      value >>>= 8;
    }
    return new Uint8Array(res);
  }
  function strxor(a, b) {
    const arr = new Uint8Array(a.length);
    for (let i = 0; i < a.length; i++) {
      arr[i] = a[i] ^ b[i];
    }
    return arr;
  }
  function anum(item) {
    if (!Number.isSafeInteger(item))
      throw new Error("number expected");
  }
  function expand_message_xmd(msg, DST, lenInBytes, H) {
    (0, utils_ts_1.abytes)(msg);
    (0, utils_ts_1.abytes)(DST);
    anum(lenInBytes);
    if (DST.length > 255)
      DST = H((0, utils_ts_1.concatBytes)((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-"), DST));
    const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
    const ell = Math.ceil(lenInBytes / b_in_bytes);
    if (lenInBytes > 65535 || ell > 255)
      throw new Error("expand_message_xmd: invalid lenInBytes");
    const DST_prime = (0, utils_ts_1.concatBytes)(DST, i2osp(DST.length, 1));
    const Z_pad = i2osp(0, r_in_bytes);
    const l_i_b_str = i2osp(lenInBytes, 2);
    const b = new Array(ell);
    const b_0 = H((0, utils_ts_1.concatBytes)(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
    b[0] = H((0, utils_ts_1.concatBytes)(b_0, i2osp(1, 1), DST_prime));
    for (let i = 1; i <= ell; i++) {
      const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
      b[i] = H((0, utils_ts_1.concatBytes)(...args));
    }
    const pseudo_random_bytes = (0, utils_ts_1.concatBytes)(...b);
    return pseudo_random_bytes.slice(0, lenInBytes);
  }
  function expand_message_xof(msg, DST, lenInBytes, k, H) {
    (0, utils_ts_1.abytes)(msg);
    (0, utils_ts_1.abytes)(DST);
    anum(lenInBytes);
    if (DST.length > 255) {
      const dkLen = Math.ceil(2 * k / 8);
      DST = H.create({ dkLen }).update((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(DST).digest();
    }
    if (lenInBytes > 65535 || DST.length > 255)
      throw new Error("expand_message_xof: invalid lenInBytes");
    return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
  }
  function hash_to_field(msg, count, options) {
    (0, utils_ts_1.validateObject)(options, {
      DST: "stringOrUint8Array",
      p: "bigint",
      m: "isSafeInteger",
      k: "isSafeInteger",
      hash: "hash"
    });
    const { p, k, m, hash, expand, DST: _DST } = options;
    (0, utils_ts_1.abytes)(msg);
    anum(count);
    const DST = typeof _DST === "string" ? (0, utils_ts_1.utf8ToBytes)(_DST) : _DST;
    const log2p = p.toString(2).length;
    const L = Math.ceil((log2p + k) / 8);
    const len_in_bytes = count * m * L;
    let prb;
    if (expand === "xmd") {
      prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
    } else if (expand === "xof") {
      prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
    } else if (expand === "_internal_pass") {
      prb = msg;
    } else {
      throw new Error('expand must be "xmd" or "xof"');
    }
    const u = new Array(count);
    for (let i = 0; i < count; i++) {
      const e = new Array(m);
      for (let j = 0; j < m; j++) {
        const elm_offset = L * (j + i * m);
        const tv = prb.subarray(elm_offset, elm_offset + L);
        e[j] = (0, modular_ts_1.mod)(os2ip(tv), p);
      }
      u[i] = e;
    }
    return u;
  }
  function isogenyMap(field, map) {
    const coeff = map.map((i) => Array.from(i).reverse());
    return (x, y) => {
      const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
      const [xd_inv, yd_inv] = (0, modular_ts_1.FpInvertBatch)(field, [xd, yd], true);
      x = field.mul(xn, xd_inv);
      y = field.mul(y, field.mul(yn, yd_inv));
      return { x, y };
    };
  }
  function createHasher(Point, mapToCurve, defaults) {
    if (typeof mapToCurve !== "function")
      throw new Error("mapToCurve() must be defined");
    function map(num) {
      return Point.fromAffine(mapToCurve(num));
    }
    function clear(initial) {
      const P = initial.clearCofactor();
      if (P.equals(Point.ZERO))
        return Point.ZERO;
      P.assertValidity();
      return P;
    }
    return {
      defaults,
      // Encodes byte string to elliptic curve.
      // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      hashToCurve(msg, options) {
        const u = hash_to_field(msg, 2, { ...defaults, DST: defaults.DST, ...options });
        const u0 = map(u[0]);
        const u1 = map(u[1]);
        return clear(u0.add(u1));
      },
      // Encodes byte string to elliptic curve.
      // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      encodeToCurve(msg, options) {
        const u = hash_to_field(msg, 1, { ...defaults, DST: defaults.encodeDST, ...options });
        return clear(map(u[0]));
      },
      // Same as encodeToCurve, but without hash
      mapToCurve(scalars) {
        if (!Array.isArray(scalars))
          throw new Error("expected array of bigints");
        for (const i of scalars)
          if (typeof i !== "bigint")
            throw new Error("expected array of bigints");
        return clear(map(scalars));
      }
    };
  }
  return hashToCurve$2;
}
var hasRequiredSecp256k1$2;
function requireSecp256k1$2() {
  if (hasRequiredSecp256k1$2) return secp256k1$3;
  hasRequiredSecp256k1$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encodeToCurve = exports.hashToCurve = exports.secp256k1_hasher = exports.schnorr = exports.secp256k1 = void 0;
    const sha2_1 = /* @__PURE__ */ requireSha2();
    const utils_1 = /* @__PURE__ */ requireUtils$3();
    const _shortw_utils_ts_1 = /* @__PURE__ */ require_shortw_utils$2();
    const hash_to_curve_ts_1 = /* @__PURE__ */ requireHashToCurve$2();
    const modular_ts_1 = /* @__PURE__ */ requireModular$2();
    const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
    const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass$2();
    const secp256k1P2 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
    const secp256k1N2 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
    const _0n2 = BigInt(0);
    const _1n2 = BigInt(1);
    const _2n2 = BigInt(2);
    const divNearest2 = (a, b) => (a + b / _2n2) / b;
    function sqrtMod2(y) {
      const P = secp256k1P2;
      const _3n2 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
      const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
      const b2 = y * y * y % P;
      const b3 = b2 * b2 * y % P;
      const b6 = (0, modular_ts_1.pow2)(b3, _3n2, P) * b3 % P;
      const b9 = (0, modular_ts_1.pow2)(b6, _3n2, P) * b3 % P;
      const b11 = (0, modular_ts_1.pow2)(b9, _2n2, P) * b2 % P;
      const b22 = (0, modular_ts_1.pow2)(b11, _11n, P) * b11 % P;
      const b44 = (0, modular_ts_1.pow2)(b22, _22n, P) * b22 % P;
      const b88 = (0, modular_ts_1.pow2)(b44, _44n, P) * b44 % P;
      const b176 = (0, modular_ts_1.pow2)(b88, _88n, P) * b88 % P;
      const b220 = (0, modular_ts_1.pow2)(b176, _44n, P) * b44 % P;
      const b223 = (0, modular_ts_1.pow2)(b220, _3n2, P) * b3 % P;
      const t1 = (0, modular_ts_1.pow2)(b223, _23n, P) * b22 % P;
      const t2 = (0, modular_ts_1.pow2)(t1, _6n, P) * b2 % P;
      const root = (0, modular_ts_1.pow2)(t2, _2n2, P);
      if (!Fpk12.eql(Fpk12.sqr(root), y))
        throw new Error("Cannot find square root");
      return root;
    }
    const Fpk12 = (0, modular_ts_1.Field)(secp256k1P2, void 0, void 0, { sqrt: sqrtMod2 });
    exports.secp256k1 = (0, _shortw_utils_ts_1.createCurve)({
      a: _0n2,
      b: BigInt(7),
      Fp: Fpk12,
      n: secp256k1N2,
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      h: BigInt(1),
      lowS: true,
      // Allow only low-S signatures by default in sign() and verify()
      endo: {
        // Endomorphism, see above
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
        splitScalar: (k) => {
          const n = secp256k1N2;
          const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
          const b1 = -_1n2 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
          const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
          const b2 = a1;
          const POW_2_128 = BigInt("0x100000000000000000000000000000000");
          const c1 = divNearest2(b2 * k, n);
          const c2 = divNearest2(-b1 * k, n);
          let k1 = (0, modular_ts_1.mod)(k - c1 * a1 - c2 * a2, n);
          let k2 = (0, modular_ts_1.mod)(-c1 * b1 - c2 * b2, n);
          const k1neg = k1 > POW_2_128;
          const k2neg = k2 > POW_2_128;
          if (k1neg)
            k1 = n - k1;
          if (k2neg)
            k2 = n - k2;
          if (k1 > POW_2_128 || k2 > POW_2_128) {
            throw new Error("splitScalar: Endomorphism failed, k=" + k);
          }
          return { k1neg, k1, k2neg, k2 };
        }
      }
    }, sha2_1.sha256);
    const TAGGED_HASH_PREFIXES = {};
    function taggedHash(tag, ...messages) {
      let tagP = TAGGED_HASH_PREFIXES[tag];
      if (tagP === void 0) {
        const tagH = (0, sha2_1.sha256)(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
        tagP = (0, utils_ts_1.concatBytes)(tagH, tagH);
        TAGGED_HASH_PREFIXES[tag] = tagP;
      }
      return (0, sha2_1.sha256)((0, utils_ts_1.concatBytes)(tagP, ...messages));
    }
    const pointToBytes = (point) => point.toRawBytes(true).slice(1);
    const numTo32b = (n) => (0, utils_ts_1.numberToBytesBE)(n, 32);
    const modP = (x) => (0, modular_ts_1.mod)(x, secp256k1P2);
    const modN = (x) => (0, modular_ts_1.mod)(x, secp256k1N2);
    const Point = /* @__PURE__ */ (() => exports.secp256k1.ProjectivePoint)();
    const GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
    function schnorrGetExtPubKey(priv) {
      let d_ = exports.secp256k1.utils.normPrivateKeyToScalar(priv);
      let p = Point.fromPrivateKey(d_);
      const scalar = p.hasEvenY() ? d_ : modN(-d_);
      return { scalar, bytes: pointToBytes(p) };
    }
    function lift_x(x) {
      (0, utils_ts_1.aInRange)("x", x, _1n2, secp256k1P2);
      const xx = modP(x * x);
      const c = modP(xx * x + BigInt(7));
      let y = sqrtMod2(c);
      if (y % _2n2 !== _0n2)
        y = modP(-y);
      const p = new Point(x, y, _1n2);
      p.assertValidity();
      return p;
    }
    const num = utils_ts_1.bytesToNumberBE;
    function challenge(...args) {
      return modN(num(taggedHash("BIP0340/challenge", ...args)));
    }
    function schnorrGetPublicKey(privateKey) {
      return schnorrGetExtPubKey(privateKey).bytes;
    }
    function schnorrSign(message, privateKey, auxRand = (0, utils_1.randomBytes)(32)) {
      const m = (0, utils_ts_1.ensureBytes)("message", message);
      const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
      const a = (0, utils_ts_1.ensureBytes)("auxRand", auxRand, 32);
      const t = numTo32b(d ^ num(taggedHash("BIP0340/aux", a)));
      const rand = taggedHash("BIP0340/nonce", t, px, m);
      const k_ = modN(num(rand));
      if (k_ === _0n2)
        throw new Error("sign failed: k is zero");
      const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
      const e = challenge(rx, px, m);
      const sig = new Uint8Array(64);
      sig.set(rx, 0);
      sig.set(numTo32b(modN(k + e * d)), 32);
      if (!schnorrVerify(sig, m, px))
        throw new Error("sign: Invalid signature produced");
      return sig;
    }
    function schnorrVerify(signature, message, publicKey) {
      const sig = (0, utils_ts_1.ensureBytes)("signature", signature, 64);
      const m = (0, utils_ts_1.ensureBytes)("message", message);
      const pub = (0, utils_ts_1.ensureBytes)("publicKey", publicKey, 32);
      try {
        const P = lift_x(num(pub));
        const r = num(sig.subarray(0, 32));
        if (!(0, utils_ts_1.inRange)(r, _1n2, secp256k1P2))
          return false;
        const s = num(sig.subarray(32, 64));
        if (!(0, utils_ts_1.inRange)(s, _1n2, secp256k1N2))
          return false;
        const e = challenge(numTo32b(r), pointToBytes(P), m);
        const R = GmulAdd(P, s, modN(-e));
        if (!R || !R.hasEvenY() || R.toAffine().x !== r)
          return false;
        return true;
      } catch (error) {
        return false;
      }
    }
    exports.schnorr = (() => ({
      getPublicKey: schnorrGetPublicKey,
      sign: schnorrSign,
      verify: schnorrVerify,
      utils: {
        randomPrivateKey: exports.secp256k1.utils.randomPrivateKey,
        lift_x,
        pointToBytes,
        numberToBytesBE: utils_ts_1.numberToBytesBE,
        bytesToNumberBE: utils_ts_1.bytesToNumberBE,
        taggedHash,
        mod: modular_ts_1.mod
      }
    }))();
    const isoMap = /* @__PURE__ */ (() => (0, hash_to_curve_ts_1.isogenyMap)(Fpk12, [
      // xNum
      [
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
        "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
        "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
      ],
      // xDen
      [
        "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
        "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ],
      // yNum
      [
        "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
        "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
        "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
        "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
      ],
      // yDen
      [
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
        "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
        "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ]
    ].map((i) => i.map((j) => BigInt(j)))))();
    const mapSWU = /* @__PURE__ */ (() => (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fpk12, {
      A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
      B: BigInt("1771"),
      Z: Fpk12.create(BigInt("-11"))
    }))();
    exports.secp256k1_hasher = (() => (0, hash_to_curve_ts_1.createHasher)(exports.secp256k1.ProjectivePoint, (scalars) => {
      const { x, y } = mapSWU(Fpk12.create(scalars[0]));
      return isoMap(x, y);
    }, {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: Fpk12.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha2_1.sha256
    }))();
    exports.hashToCurve = (() => exports.secp256k1_hasher.hashToCurve)();
    exports.encodeToCurve = (() => exports.secp256k1_hasher.encodeToCurve)();
  })(secp256k1$3);
  return secp256k1$3;
}
var bls12381 = {};
var bls = {};
var hasRequiredBls;
function requireBls() {
  if (hasRequiredBls) return bls;
  hasRequiredBls = 1;
  Object.defineProperty(bls, "__esModule", { value: true });
  bls.bls = bls$1;
  const hash_to_curve_ts_1 = /* @__PURE__ */ requireHashToCurve$2();
  const modular_ts_1 = /* @__PURE__ */ requireModular$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass$2();
  const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _3n2 = BigInt(3);
  function NAfDecomposition(a) {
    const res = [];
    for (; a > _1n2; a >>= _1n2) {
      if ((a & _1n2) === _0n2)
        res.unshift(0);
      else if ((a & _3n2) === _3n2) {
        res.unshift(-1);
        a += _1n2;
      } else
        res.unshift(1);
    }
    return res;
  }
  function bls$1(CURVE) {
    const { Fp, Fr, Fp2, Fp6, Fp12 } = CURVE.fields;
    const BLS_X_IS_NEGATIVE = CURVE.params.xNegative;
    const TWIST = CURVE.params.twistType;
    const G1_ = (0, weierstrass_ts_1.weierstrassPoints)({ n: Fr.ORDER, ...CURVE.G1 });
    const G1 = Object.assign(G1_, (0, hash_to_curve_ts_1.createHasher)(G1_.ProjectivePoint, CURVE.G1.mapToCurve, {
      ...CURVE.htfDefaults,
      ...CURVE.G1.htfDefaults
    }));
    const G2_ = (0, weierstrass_ts_1.weierstrassPoints)({ n: Fr.ORDER, ...CURVE.G2 });
    const G2 = Object.assign(G2_, (0, hash_to_curve_ts_1.createHasher)(G2_.ProjectivePoint, CURVE.G2.mapToCurve, {
      ...CURVE.htfDefaults,
      ...CURVE.G2.htfDefaults
    }));
    let lineFunction;
    if (TWIST === "multiplicative") {
      lineFunction = (c0, c1, c2, f, Px, Py) => Fp12.mul014(f, c0, Fp2.mul(c1, Px), Fp2.mul(c2, Py));
    } else if (TWIST === "divisive") {
      lineFunction = (c0, c1, c2, f, Px, Py) => Fp12.mul034(f, Fp2.mul(c2, Py), Fp2.mul(c1, Px), c0);
    } else
      throw new Error("bls: unknown twist type");
    const Fp2div2 = Fp2.div(Fp2.ONE, Fp2.mul(Fp2.ONE, _2n2));
    function pointDouble(ell, Rx, Ry, Rz) {
      const t0 = Fp2.sqr(Ry);
      const t1 = Fp2.sqr(Rz);
      const t2 = Fp2.mulByB(Fp2.mul(t1, _3n2));
      const t3 = Fp2.mul(t2, _3n2);
      const t4 = Fp2.sub(Fp2.sub(Fp2.sqr(Fp2.add(Ry, Rz)), t1), t0);
      const c0 = Fp2.sub(t2, t0);
      const c1 = Fp2.mul(Fp2.sqr(Rx), _3n2);
      const c2 = Fp2.neg(t4);
      ell.push([c0, c1, c2]);
      Rx = Fp2.mul(Fp2.mul(Fp2.mul(Fp2.sub(t0, t3), Rx), Ry), Fp2div2);
      Ry = Fp2.sub(Fp2.sqr(Fp2.mul(Fp2.add(t0, t3), Fp2div2)), Fp2.mul(Fp2.sqr(t2), _3n2));
      Rz = Fp2.mul(t0, t4);
      return { Rx, Ry, Rz };
    }
    function pointAdd(ell, Rx, Ry, Rz, Qx, Qy) {
      const t0 = Fp2.sub(Ry, Fp2.mul(Qy, Rz));
      const t1 = Fp2.sub(Rx, Fp2.mul(Qx, Rz));
      const c0 = Fp2.sub(Fp2.mul(t0, Qx), Fp2.mul(t1, Qy));
      const c1 = Fp2.neg(t0);
      const c2 = t1;
      ell.push([c0, c1, c2]);
      const t2 = Fp2.sqr(t1);
      const t3 = Fp2.mul(t2, t1);
      const t4 = Fp2.mul(t2, Rx);
      const t5 = Fp2.add(Fp2.sub(t3, Fp2.mul(t4, _2n2)), Fp2.mul(Fp2.sqr(t0), Rz));
      Rx = Fp2.mul(t1, t5);
      Ry = Fp2.sub(Fp2.mul(Fp2.sub(t4, t5), t0), Fp2.mul(t3, Ry));
      Rz = Fp2.mul(Rz, t3);
      return { Rx, Ry, Rz };
    }
    const ATE_NAF = NAfDecomposition(CURVE.params.ateLoopSize);
    const calcPairingPrecomputes = (0, utils_ts_1.memoized)((point) => {
      const p = point;
      const { x, y } = p.toAffine();
      const Qx = x, Qy = y, negQy = Fp2.neg(y);
      let Rx = Qx, Ry = Qy, Rz = Fp2.ONE;
      const ell = [];
      for (const bit of ATE_NAF) {
        const cur = [];
        ({ Rx, Ry, Rz } = pointDouble(cur, Rx, Ry, Rz));
        if (bit)
          ({ Rx, Ry, Rz } = pointAdd(cur, Rx, Ry, Rz, Qx, bit === -1 ? negQy : Qy));
        ell.push(cur);
      }
      if (CURVE.postPrecompute) {
        const last = ell[ell.length - 1];
        CURVE.postPrecompute(Rx, Ry, Rz, Qx, Qy, pointAdd.bind(null, last));
      }
      return ell;
    });
    function millerLoopBatch(pairs, withFinalExponent = false) {
      let f12 = Fp12.ONE;
      if (pairs.length) {
        const ellLen = pairs[0][0].length;
        for (let i = 0; i < ellLen; i++) {
          f12 = Fp12.sqr(f12);
          for (const [ell, Px, Py] of pairs) {
            for (const [c0, c1, c2] of ell[i])
              f12 = lineFunction(c0, c1, c2, f12, Px, Py);
          }
        }
      }
      if (BLS_X_IS_NEGATIVE)
        f12 = Fp12.conjugate(f12);
      return withFinalExponent ? Fp12.finalExponentiate(f12) : f12;
    }
    function pairingBatch(pairs, withFinalExponent = true) {
      const res = [];
      G1.ProjectivePoint.normalizeZ(pairs.map(({ g1 }) => g1));
      G2.ProjectivePoint.normalizeZ(pairs.map(({ g2 }) => g2));
      for (const { g1, g2 } of pairs) {
        if (g1.equals(G1.ProjectivePoint.ZERO) || g2.equals(G2.ProjectivePoint.ZERO))
          throw new Error("pairing is not available for ZERO point");
        g1.assertValidity();
        g2.assertValidity();
        const Qa = g1.toAffine();
        res.push([calcPairingPrecomputes(g2), Qa.x, Qa.y]);
      }
      return millerLoopBatch(res, withFinalExponent);
    }
    function pairing(Q, P, withFinalExponent = true) {
      return pairingBatch([{ g1: Q, g2: P }], withFinalExponent);
    }
    const utils2 = {
      randomPrivateKey: () => {
        const length = (0, modular_ts_1.getMinHashLength)(Fr.ORDER);
        return (0, modular_ts_1.mapHashToField)(CURVE.randomBytes(length), Fr.ORDER);
      },
      calcPairingPrecomputes
    };
    const { ShortSignature } = CURVE.G1;
    const { Signature } = CURVE.G2;
    function normP1(point) {
      return point instanceof G1.ProjectivePoint ? point : G1.ProjectivePoint.fromHex(point);
    }
    function normP1Hash(point, htfOpts) {
      return point instanceof G1.ProjectivePoint ? point : G1.hashToCurve((0, utils_ts_1.ensureBytes)("point", point), htfOpts);
    }
    function normP2(point) {
      return point instanceof G2.ProjectivePoint ? point : Signature.fromHex(point);
    }
    function normP2Hash(point, htfOpts) {
      return point instanceof G2.ProjectivePoint ? point : G2.hashToCurve((0, utils_ts_1.ensureBytes)("point", point), htfOpts);
    }
    function getPublicKey(privateKey) {
      return G1.ProjectivePoint.fromPrivateKey(privateKey).toRawBytes(true);
    }
    function getPublicKeyForShortSignatures(privateKey) {
      return G2.ProjectivePoint.fromPrivateKey(privateKey).toRawBytes(true);
    }
    function sign(message, privateKey, htfOpts) {
      const msgPoint = normP2Hash(message, htfOpts);
      msgPoint.assertValidity();
      const sigPoint = msgPoint.multiply(G1.normPrivateKeyToScalar(privateKey));
      if (message instanceof G2.ProjectivePoint)
        return sigPoint;
      return Signature.toRawBytes(sigPoint);
    }
    function signShortSignature(message, privateKey, htfOpts) {
      const msgPoint = normP1Hash(message, htfOpts);
      msgPoint.assertValidity();
      const sigPoint = msgPoint.multiply(G1.normPrivateKeyToScalar(privateKey));
      if (message instanceof G1.ProjectivePoint)
        return sigPoint;
      return ShortSignature.toRawBytes(sigPoint);
    }
    function verify(signature, message, publicKey, htfOpts) {
      const P = normP1(publicKey);
      const Hm = normP2Hash(message, htfOpts);
      const G = G1.ProjectivePoint.BASE;
      const S = normP2(signature);
      const exp = pairingBatch([
        { g1: P.negate(), g2: Hm },
        // ePHM = pairing(P.negate(), Hm, false);
        { g1: G, g2: S }
        // eGS = pairing(G, S, false);
      ]);
      return Fp12.eql(exp, Fp12.ONE);
    }
    function verifyShortSignature(signature, message, publicKey, htfOpts) {
      const P = normP2(publicKey);
      const Hm = normP1Hash(message, htfOpts);
      const G = G2.ProjectivePoint.BASE;
      const S = normP1(signature);
      const exp = pairingBatch([
        { g1: Hm, g2: P },
        // eHmP = pairing(Hm, P, false);
        { g1: S, g2: G.negate() }
        // eSG = pairing(S, G.negate(), false);
      ]);
      return Fp12.eql(exp, Fp12.ONE);
    }
    function aNonEmpty(arr) {
      if (!Array.isArray(arr) || arr.length === 0)
        throw new Error("expected non-empty array");
    }
    function aggregatePublicKeys(publicKeys) {
      aNonEmpty(publicKeys);
      const agg = publicKeys.map(normP1).reduce((sum, p) => sum.add(p), G1.ProjectivePoint.ZERO);
      const aggAffine = agg;
      if (publicKeys[0] instanceof G1.ProjectivePoint) {
        aggAffine.assertValidity();
        return aggAffine;
      }
      return aggAffine.toRawBytes(true);
    }
    function aggregateSignatures(signatures) {
      aNonEmpty(signatures);
      const agg = signatures.map(normP2).reduce((sum, s) => sum.add(s), G2.ProjectivePoint.ZERO);
      const aggAffine = agg;
      if (signatures[0] instanceof G2.ProjectivePoint) {
        aggAffine.assertValidity();
        return aggAffine;
      }
      return Signature.toRawBytes(aggAffine);
    }
    function aggregateShortSignatures(signatures) {
      aNonEmpty(signatures);
      const agg = signatures.map(normP1).reduce((sum, s) => sum.add(s), G1.ProjectivePoint.ZERO);
      const aggAffine = agg;
      if (signatures[0] instanceof G1.ProjectivePoint) {
        aggAffine.assertValidity();
        return aggAffine;
      }
      return ShortSignature.toRawBytes(aggAffine);
    }
    function verifyBatch(signature, messages, publicKeys, htfOpts) {
      aNonEmpty(messages);
      if (publicKeys.length !== messages.length)
        throw new Error("amount of public keys and messages should be equal");
      const sig = normP2(signature);
      const nMessages = messages.map((i) => normP2Hash(i, htfOpts));
      const nPublicKeys = publicKeys.map(normP1);
      const messagePubKeyMap = /* @__PURE__ */ new Map();
      for (let i = 0; i < nPublicKeys.length; i++) {
        const pub = nPublicKeys[i];
        const msg = nMessages[i];
        let keys = messagePubKeyMap.get(msg);
        if (keys === void 0) {
          keys = [];
          messagePubKeyMap.set(msg, keys);
        }
        keys.push(pub);
      }
      const paired = [];
      try {
        for (const [msg, keys] of messagePubKeyMap) {
          const groupPublicKey = keys.reduce((acc, msg2) => acc.add(msg2));
          paired.push({ g1: groupPublicKey, g2: msg });
        }
        paired.push({ g1: G1.ProjectivePoint.BASE.negate(), g2: sig });
        return Fp12.eql(pairingBatch(paired), Fp12.ONE);
      } catch {
        return false;
      }
    }
    G1.ProjectivePoint.BASE._setWindowSize(4);
    return {
      getPublicKey,
      getPublicKeyForShortSignatures,
      sign,
      signShortSignature,
      verify,
      verifyBatch,
      verifyShortSignature,
      aggregatePublicKeys,
      aggregateSignatures,
      aggregateShortSignatures,
      millerLoopBatch,
      pairing,
      pairingBatch,
      G1,
      G2,
      Signature,
      ShortSignature,
      fields: {
        Fr,
        Fp,
        Fp2,
        Fp6,
        Fp12
      },
      params: {
        ateLoopSize: CURVE.params.ateLoopSize,
        r: CURVE.params.r,
        G1b: CURVE.G1.b,
        G2b: CURVE.G2.b
      },
      utils: utils2
    };
  }
  return bls;
}
var tower = {};
var hasRequiredTower;
function requireTower() {
  if (hasRequiredTower) return tower;
  hasRequiredTower = 1;
  Object.defineProperty(tower, "__esModule", { value: true });
  tower.psiFrobenius = psiFrobenius;
  tower.tower12 = tower12;
  const mod2 = /* @__PURE__ */ requireModular$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _3n2 = BigInt(3);
  function calcFrobeniusCoefficients(Fp, nonResidue, modulus, degree, num = 1, divisor) {
    const _divisor = BigInt(divisor === void 0 ? degree : divisor);
    const towerModulus = modulus ** BigInt(degree);
    const res = [];
    for (let i = 0; i < num; i++) {
      const a = BigInt(i + 1);
      const powers = [];
      for (let j = 0, qPower = _1n2; j < degree; j++) {
        const power = (a * qPower - a) / _divisor % towerModulus;
        powers.push(Fp.pow(nonResidue, power));
        qPower *= modulus;
      }
      res.push(powers);
    }
    return res;
  }
  function psiFrobenius(Fp, Fp2, base) {
    const PSI_X = Fp2.pow(base, (Fp.ORDER - _1n2) / _3n2);
    const PSI_Y = Fp2.pow(base, (Fp.ORDER - _1n2) / _2n2);
    function psi(x, y) {
      const x2 = Fp2.mul(Fp2.frobeniusMap(x, 1), PSI_X);
      const y2 = Fp2.mul(Fp2.frobeniusMap(y, 1), PSI_Y);
      return [x2, y2];
    }
    const PSI2_X = Fp2.pow(base, (Fp.ORDER ** _2n2 - _1n2) / _3n2);
    const PSI2_Y = Fp2.pow(base, (Fp.ORDER ** _2n2 - _1n2) / _2n2);
    if (!Fp2.eql(PSI2_Y, Fp2.neg(Fp2.ONE)))
      throw new Error("psiFrobenius: PSI2_Y!==-1");
    function psi2(x, y) {
      return [Fp2.mul(x, PSI2_X), Fp2.neg(y)];
    }
    const mapAffine = (fn) => (c, P) => {
      const affine = P.toAffine();
      const p = fn(affine.x, affine.y);
      return c.fromAffine({ x: p[0], y: p[1] });
    };
    const G2psi = mapAffine(psi);
    const G2psi2 = mapAffine(psi2);
    return { psi, psi2, G2psi, G2psi2, PSI_X, PSI_Y, PSI2_X, PSI2_Y };
  }
  function tower12(opts) {
    const { ORDER } = opts;
    const Fp = mod2.Field(ORDER);
    const FpNONRESIDUE = Fp.create(opts.NONRESIDUE || BigInt(-1));
    const Fpdiv2 = Fp.div(Fp.ONE, _2n2);
    const FP2_FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp, FpNONRESIDUE, Fp.ORDER, 2)[0];
    const Fp2Add = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
      c0: Fp.add(c0, r0),
      c1: Fp.add(c1, r1)
    });
    const Fp2Subtract = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
      c0: Fp.sub(c0, r0),
      c1: Fp.sub(c1, r1)
    });
    const Fp2Multiply = ({ c0, c1 }, rhs) => {
      if (typeof rhs === "bigint")
        return { c0: Fp.mul(c0, rhs), c1: Fp.mul(c1, rhs) };
      const { c0: r0, c1: r1 } = rhs;
      let t1 = Fp.mul(c0, r0);
      let t2 = Fp.mul(c1, r1);
      const o0 = Fp.sub(t1, t2);
      const o1 = Fp.sub(Fp.mul(Fp.add(c0, c1), Fp.add(r0, r1)), Fp.add(t1, t2));
      return { c0: o0, c1: o1 };
    };
    const Fp2Square = ({ c0, c1 }) => {
      const a = Fp.add(c0, c1);
      const b = Fp.sub(c0, c1);
      const c = Fp.add(c0, c0);
      return { c0: Fp.mul(a, b), c1: Fp.mul(c, c1) };
    };
    const Fp2fromBigTuple = (tuple) => {
      if (tuple.length !== 2)
        throw new Error("invalid tuple");
      const fps = tuple.map((n) => Fp.create(n));
      return { c0: fps[0], c1: fps[1] };
    };
    const FP2_ORDER = ORDER * ORDER;
    const Fp2Nonresidue = Fp2fromBigTuple(opts.FP2_NONRESIDUE);
    const Fp2 = {
      ORDER: FP2_ORDER,
      isLE: Fp.isLE,
      NONRESIDUE: Fp2Nonresidue,
      BITS: (0, utils_ts_1.bitLen)(FP2_ORDER),
      BYTES: Math.ceil((0, utils_ts_1.bitLen)(FP2_ORDER) / 8),
      MASK: (0, utils_ts_1.bitMask)((0, utils_ts_1.bitLen)(FP2_ORDER)),
      ZERO: { c0: Fp.ZERO, c1: Fp.ZERO },
      ONE: { c0: Fp.ONE, c1: Fp.ZERO },
      create: (num) => num,
      isValid: ({ c0, c1 }) => typeof c0 === "bigint" && typeof c1 === "bigint",
      is0: ({ c0, c1 }) => Fp.is0(c0) && Fp.is0(c1),
      eql: ({ c0, c1 }, { c0: r0, c1: r1 }) => Fp.eql(c0, r0) && Fp.eql(c1, r1),
      neg: ({ c0, c1 }) => ({ c0: Fp.neg(c0), c1: Fp.neg(c1) }),
      pow: (num, power) => mod2.FpPow(Fp2, num, power),
      invertBatch: (nums) => mod2.FpInvertBatch(Fp2, nums),
      // Normalized
      add: Fp2Add,
      sub: Fp2Subtract,
      mul: Fp2Multiply,
      sqr: Fp2Square,
      // NonNormalized stuff
      addN: Fp2Add,
      subN: Fp2Subtract,
      mulN: Fp2Multiply,
      sqrN: Fp2Square,
      // Why inversion for bigint inside Fp instead of Fp2? it is even used in that context?
      div: (lhs, rhs) => Fp2.mul(lhs, typeof rhs === "bigint" ? Fp.inv(Fp.create(rhs)) : Fp2.inv(rhs)),
      inv: ({ c0: a, c1: b }) => {
        const factor = Fp.inv(Fp.create(a * a + b * b));
        return { c0: Fp.mul(factor, Fp.create(a)), c1: Fp.mul(factor, Fp.create(-b)) };
      },
      sqrt: (num) => {
        if (opts.Fp2sqrt)
          return opts.Fp2sqrt(num);
        const { c0, c1 } = num;
        if (Fp.is0(c1)) {
          if (mod2.FpLegendre(Fp, c0) === 1)
            return Fp2.create({ c0: Fp.sqrt(c0), c1: Fp.ZERO });
          else
            return Fp2.create({ c0: Fp.ZERO, c1: Fp.sqrt(Fp.div(c0, FpNONRESIDUE)) });
        }
        const a = Fp.sqrt(Fp.sub(Fp.sqr(c0), Fp.mul(Fp.sqr(c1), FpNONRESIDUE)));
        let d = Fp.mul(Fp.add(a, c0), Fpdiv2);
        const legendre = mod2.FpLegendre(Fp, d);
        if (legendre === -1)
          d = Fp.sub(d, a);
        const a0 = Fp.sqrt(d);
        const candidateSqrt = Fp2.create({ c0: a0, c1: Fp.div(Fp.mul(c1, Fpdiv2), a0) });
        if (!Fp2.eql(Fp2.sqr(candidateSqrt), num))
          throw new Error("Cannot find square root");
        const x1 = candidateSqrt;
        const x2 = Fp2.neg(x1);
        const { re: re1, im: im1 } = Fp2.reim(x1);
        const { re: re2, im: im2 } = Fp2.reim(x2);
        if (im1 > im2 || im1 === im2 && re1 > re2)
          return x1;
        return x2;
      },
      // Same as sgn0_m_eq_2 in RFC 9380
      isOdd: (x) => {
        const { re: x0, im: x1 } = Fp2.reim(x);
        const sign_0 = x0 % _2n2;
        const zero_0 = x0 === _0n2;
        const sign_1 = x1 % _2n2;
        return BigInt(sign_0 || zero_0 && sign_1) == _1n2;
      },
      // Bytes util
      fromBytes(b) {
        if (b.length !== Fp2.BYTES)
          throw new Error("fromBytes invalid length=" + b.length);
        return { c0: Fp.fromBytes(b.subarray(0, Fp.BYTES)), c1: Fp.fromBytes(b.subarray(Fp.BYTES)) };
      },
      toBytes: ({ c0, c1 }) => (0, utils_ts_1.concatBytes)(Fp.toBytes(c0), Fp.toBytes(c1)),
      cmov: ({ c0, c1 }, { c0: r0, c1: r1 }, c) => ({
        c0: Fp.cmov(c0, r0, c),
        c1: Fp.cmov(c1, r1, c)
      }),
      reim: ({ c0, c1 }) => ({ re: c0, im: c1 }),
      // multiply by u + 1
      mulByNonresidue: ({ c0, c1 }) => Fp2.mul({ c0, c1 }, Fp2Nonresidue),
      mulByB: opts.Fp2mulByB,
      fromBigTuple: Fp2fromBigTuple,
      frobeniusMap: ({ c0, c1 }, power) => ({
        c0,
        c1: Fp.mul(c1, FP2_FROBENIUS_COEFFICIENTS[power % 2])
      })
    };
    const Fp6Add = ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => ({
      c0: Fp2.add(c0, r0),
      c1: Fp2.add(c1, r1),
      c2: Fp2.add(c2, r2)
    });
    const Fp6Subtract = ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => ({
      c0: Fp2.sub(c0, r0),
      c1: Fp2.sub(c1, r1),
      c2: Fp2.sub(c2, r2)
    });
    const Fp6Multiply = ({ c0, c1, c2 }, rhs) => {
      if (typeof rhs === "bigint") {
        return {
          c0: Fp2.mul(c0, rhs),
          c1: Fp2.mul(c1, rhs),
          c2: Fp2.mul(c2, rhs)
        };
      }
      const { c0: r0, c1: r1, c2: r2 } = rhs;
      const t0 = Fp2.mul(c0, r0);
      const t1 = Fp2.mul(c1, r1);
      const t2 = Fp2.mul(c2, r2);
      return {
        // t0 + (c1 + c2) * (r1 * r2) - (T1 + T2) * (u + 1)
        c0: Fp2.add(t0, Fp2.mulByNonresidue(Fp2.sub(Fp2.mul(Fp2.add(c1, c2), Fp2.add(r1, r2)), Fp2.add(t1, t2)))),
        // (c0 + c1) * (r0 + r1) - (T0 + T1) + T2 * (u + 1)
        c1: Fp2.add(Fp2.sub(Fp2.mul(Fp2.add(c0, c1), Fp2.add(r0, r1)), Fp2.add(t0, t1)), Fp2.mulByNonresidue(t2)),
        // T1 + (c0 + c2) * (r0 + r2) - T0 + T2
        c2: Fp2.sub(Fp2.add(t1, Fp2.mul(Fp2.add(c0, c2), Fp2.add(r0, r2))), Fp2.add(t0, t2))
      };
    };
    const Fp6Square = ({ c0, c1, c2 }) => {
      let t0 = Fp2.sqr(c0);
      let t1 = Fp2.mul(Fp2.mul(c0, c1), _2n2);
      let t3 = Fp2.mul(Fp2.mul(c1, c2), _2n2);
      let t4 = Fp2.sqr(c2);
      return {
        c0: Fp2.add(Fp2.mulByNonresidue(t3), t0),
        // T3 * (u + 1) + T0
        c1: Fp2.add(Fp2.mulByNonresidue(t4), t1),
        // T4 * (u + 1) + T1
        // T1 + (c0 - c1 + c2)² + T3 - T0 - T4
        c2: Fp2.sub(Fp2.sub(Fp2.add(Fp2.add(t1, Fp2.sqr(Fp2.add(Fp2.sub(c0, c1), c2))), t3), t0), t4)
      };
    };
    const [FP6_FROBENIUS_COEFFICIENTS_1, FP6_FROBENIUS_COEFFICIENTS_2] = calcFrobeniusCoefficients(Fp2, Fp2Nonresidue, Fp.ORDER, 6, 2, 3);
    const Fp6 = {
      ORDER: Fp2.ORDER,
      // TODO: unused, but need to verify
      isLE: Fp2.isLE,
      BITS: 3 * Fp2.BITS,
      BYTES: 3 * Fp2.BYTES,
      MASK: (0, utils_ts_1.bitMask)(3 * Fp2.BITS),
      ZERO: { c0: Fp2.ZERO, c1: Fp2.ZERO, c2: Fp2.ZERO },
      ONE: { c0: Fp2.ONE, c1: Fp2.ZERO, c2: Fp2.ZERO },
      create: (num) => num,
      isValid: ({ c0, c1, c2 }) => Fp2.isValid(c0) && Fp2.isValid(c1) && Fp2.isValid(c2),
      is0: ({ c0, c1, c2 }) => Fp2.is0(c0) && Fp2.is0(c1) && Fp2.is0(c2),
      neg: ({ c0, c1, c2 }) => ({ c0: Fp2.neg(c0), c1: Fp2.neg(c1), c2: Fp2.neg(c2) }),
      eql: ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => Fp2.eql(c0, r0) && Fp2.eql(c1, r1) && Fp2.eql(c2, r2),
      sqrt: utils_ts_1.notImplemented,
      // Do we need division by bigint at all? Should be done via order:
      div: (lhs, rhs) => Fp6.mul(lhs, typeof rhs === "bigint" ? Fp.inv(Fp.create(rhs)) : Fp6.inv(rhs)),
      pow: (num, power) => mod2.FpPow(Fp6, num, power),
      invertBatch: (nums) => mod2.FpInvertBatch(Fp6, nums),
      // Normalized
      add: Fp6Add,
      sub: Fp6Subtract,
      mul: Fp6Multiply,
      sqr: Fp6Square,
      // NonNormalized stuff
      addN: Fp6Add,
      subN: Fp6Subtract,
      mulN: Fp6Multiply,
      sqrN: Fp6Square,
      inv: ({ c0, c1, c2 }) => {
        let t0 = Fp2.sub(Fp2.sqr(c0), Fp2.mulByNonresidue(Fp2.mul(c2, c1)));
        let t1 = Fp2.sub(Fp2.mulByNonresidue(Fp2.sqr(c2)), Fp2.mul(c0, c1));
        let t2 = Fp2.sub(Fp2.sqr(c1), Fp2.mul(c0, c2));
        let t4 = Fp2.inv(Fp2.add(Fp2.mulByNonresidue(Fp2.add(Fp2.mul(c2, t1), Fp2.mul(c1, t2))), Fp2.mul(c0, t0)));
        return { c0: Fp2.mul(t4, t0), c1: Fp2.mul(t4, t1), c2: Fp2.mul(t4, t2) };
      },
      // Bytes utils
      fromBytes: (b) => {
        if (b.length !== Fp6.BYTES)
          throw new Error("fromBytes invalid length=" + b.length);
        return {
          c0: Fp2.fromBytes(b.subarray(0, Fp2.BYTES)),
          c1: Fp2.fromBytes(b.subarray(Fp2.BYTES, 2 * Fp2.BYTES)),
          c2: Fp2.fromBytes(b.subarray(2 * Fp2.BYTES))
        };
      },
      toBytes: ({ c0, c1, c2 }) => (0, utils_ts_1.concatBytes)(Fp2.toBytes(c0), Fp2.toBytes(c1), Fp2.toBytes(c2)),
      cmov: ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c) => ({
        c0: Fp2.cmov(c0, r0, c),
        c1: Fp2.cmov(c1, r1, c),
        c2: Fp2.cmov(c2, r2, c)
      }),
      fromBigSix: (t) => {
        if (!Array.isArray(t) || t.length !== 6)
          throw new Error("invalid Fp6 usage");
        return {
          c0: Fp2.fromBigTuple(t.slice(0, 2)),
          c1: Fp2.fromBigTuple(t.slice(2, 4)),
          c2: Fp2.fromBigTuple(t.slice(4, 6))
        };
      },
      frobeniusMap: ({ c0, c1, c2 }, power) => ({
        c0: Fp2.frobeniusMap(c0, power),
        c1: Fp2.mul(Fp2.frobeniusMap(c1, power), FP6_FROBENIUS_COEFFICIENTS_1[power % 6]),
        c2: Fp2.mul(Fp2.frobeniusMap(c2, power), FP6_FROBENIUS_COEFFICIENTS_2[power % 6])
      }),
      mulByFp2: ({ c0, c1, c2 }, rhs) => ({
        c0: Fp2.mul(c0, rhs),
        c1: Fp2.mul(c1, rhs),
        c2: Fp2.mul(c2, rhs)
      }),
      mulByNonresidue: ({ c0, c1, c2 }) => ({ c0: Fp2.mulByNonresidue(c2), c1: c0, c2: c1 }),
      // Sparse multiplication
      mul1: ({ c0, c1, c2 }, b1) => ({
        c0: Fp2.mulByNonresidue(Fp2.mul(c2, b1)),
        c1: Fp2.mul(c0, b1),
        c2: Fp2.mul(c1, b1)
      }),
      // Sparse multiplication
      mul01({ c0, c1, c2 }, b0, b1) {
        let t0 = Fp2.mul(c0, b0);
        let t1 = Fp2.mul(c1, b1);
        return {
          // ((c1 + c2) * b1 - T1) * (u + 1) + T0
          c0: Fp2.add(Fp2.mulByNonresidue(Fp2.sub(Fp2.mul(Fp2.add(c1, c2), b1), t1)), t0),
          // (b0 + b1) * (c0 + c1) - T0 - T1
          c1: Fp2.sub(Fp2.sub(Fp2.mul(Fp2.add(b0, b1), Fp2.add(c0, c1)), t0), t1),
          // (c0 + c2) * b0 - T0 + T1
          c2: Fp2.add(Fp2.sub(Fp2.mul(Fp2.add(c0, c2), b0), t0), t1)
        };
      }
    };
    const FP12_FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp2, Fp2Nonresidue, Fp.ORDER, 12, 1, 6)[0];
    const Fp12Add = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
      c0: Fp6.add(c0, r0),
      c1: Fp6.add(c1, r1)
    });
    const Fp12Subtract = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
      c0: Fp6.sub(c0, r0),
      c1: Fp6.sub(c1, r1)
    });
    const Fp12Multiply = ({ c0, c1 }, rhs) => {
      if (typeof rhs === "bigint")
        return { c0: Fp6.mul(c0, rhs), c1: Fp6.mul(c1, rhs) };
      let { c0: r0, c1: r1 } = rhs;
      let t1 = Fp6.mul(c0, r0);
      let t2 = Fp6.mul(c1, r1);
      return {
        c0: Fp6.add(t1, Fp6.mulByNonresidue(t2)),
        // T1 + T2 * v
        // (c0 + c1) * (r0 + r1) - (T1 + T2)
        c1: Fp6.sub(Fp6.mul(Fp6.add(c0, c1), Fp6.add(r0, r1)), Fp6.add(t1, t2))
      };
    };
    const Fp12Square = ({ c0, c1 }) => {
      let ab = Fp6.mul(c0, c1);
      return {
        // (c1 * v + c0) * (c0 + c1) - AB - AB * v
        c0: Fp6.sub(Fp6.sub(Fp6.mul(Fp6.add(Fp6.mulByNonresidue(c1), c0), Fp6.add(c0, c1)), ab), Fp6.mulByNonresidue(ab)),
        c1: Fp6.add(ab, ab)
      };
    };
    function Fp4Square(a, b) {
      const a2 = Fp2.sqr(a);
      const b2 = Fp2.sqr(b);
      return {
        first: Fp2.add(Fp2.mulByNonresidue(b2), a2),
        // b² * Nonresidue + a²
        second: Fp2.sub(Fp2.sub(Fp2.sqr(Fp2.add(a, b)), a2), b2)
        // (a + b)² - a² - b²
      };
    }
    const Fp12 = {
      ORDER: Fp2.ORDER,
      // TODO: unused, but need to verify
      isLE: Fp6.isLE,
      BITS: 2 * Fp6.BITS,
      BYTES: 2 * Fp6.BYTES,
      MASK: (0, utils_ts_1.bitMask)(2 * Fp6.BITS),
      ZERO: { c0: Fp6.ZERO, c1: Fp6.ZERO },
      ONE: { c0: Fp6.ONE, c1: Fp6.ZERO },
      create: (num) => num,
      isValid: ({ c0, c1 }) => Fp6.isValid(c0) && Fp6.isValid(c1),
      is0: ({ c0, c1 }) => Fp6.is0(c0) && Fp6.is0(c1),
      neg: ({ c0, c1 }) => ({ c0: Fp6.neg(c0), c1: Fp6.neg(c1) }),
      eql: ({ c0, c1 }, { c0: r0, c1: r1 }) => Fp6.eql(c0, r0) && Fp6.eql(c1, r1),
      sqrt: utils_ts_1.notImplemented,
      inv: ({ c0, c1 }) => {
        let t = Fp6.inv(Fp6.sub(Fp6.sqr(c0), Fp6.mulByNonresidue(Fp6.sqr(c1))));
        return { c0: Fp6.mul(c0, t), c1: Fp6.neg(Fp6.mul(c1, t)) };
      },
      div: (lhs, rhs) => Fp12.mul(lhs, typeof rhs === "bigint" ? Fp.inv(Fp.create(rhs)) : Fp12.inv(rhs)),
      pow: (num, power) => mod2.FpPow(Fp12, num, power),
      invertBatch: (nums) => mod2.FpInvertBatch(Fp12, nums),
      // Normalized
      add: Fp12Add,
      sub: Fp12Subtract,
      mul: Fp12Multiply,
      sqr: Fp12Square,
      // NonNormalized stuff
      addN: Fp12Add,
      subN: Fp12Subtract,
      mulN: Fp12Multiply,
      sqrN: Fp12Square,
      // Bytes utils
      fromBytes: (b) => {
        if (b.length !== Fp12.BYTES)
          throw new Error("fromBytes invalid length=" + b.length);
        return {
          c0: Fp6.fromBytes(b.subarray(0, Fp6.BYTES)),
          c1: Fp6.fromBytes(b.subarray(Fp6.BYTES))
        };
      },
      toBytes: ({ c0, c1 }) => (0, utils_ts_1.concatBytes)(Fp6.toBytes(c0), Fp6.toBytes(c1)),
      cmov: ({ c0, c1 }, { c0: r0, c1: r1 }, c) => ({
        c0: Fp6.cmov(c0, r0, c),
        c1: Fp6.cmov(c1, r1, c)
      }),
      // Utils
      // toString() {
      //   return '' + 'Fp12(' + this.c0 + this.c1 + '* w');
      // },
      // fromTuple(c: [Fp6, Fp6]) {
      //   return new Fp12(...c);
      // }
      fromBigTwelve: (t) => ({
        c0: Fp6.fromBigSix(t.slice(0, 6)),
        c1: Fp6.fromBigSix(t.slice(6, 12))
      }),
      // Raises to q**i -th power
      frobeniusMap(lhs, power) {
        const { c0, c1, c2 } = Fp6.frobeniusMap(lhs.c1, power);
        const coeff = FP12_FROBENIUS_COEFFICIENTS[power % 12];
        return {
          c0: Fp6.frobeniusMap(lhs.c0, power),
          c1: Fp6.create({
            c0: Fp2.mul(c0, coeff),
            c1: Fp2.mul(c1, coeff),
            c2: Fp2.mul(c2, coeff)
          })
        };
      },
      mulByFp2: ({ c0, c1 }, rhs) => ({
        c0: Fp6.mulByFp2(c0, rhs),
        c1: Fp6.mulByFp2(c1, rhs)
      }),
      conjugate: ({ c0, c1 }) => ({ c0, c1: Fp6.neg(c1) }),
      // Sparse multiplication
      mul014: ({ c0, c1 }, o0, o1, o4) => {
        let t0 = Fp6.mul01(c0, o0, o1);
        let t1 = Fp6.mul1(c1, o4);
        return {
          c0: Fp6.add(Fp6.mulByNonresidue(t1), t0),
          // T1 * v + T0
          // (c1 + c0) * [o0, o1+o4] - T0 - T1
          c1: Fp6.sub(Fp6.sub(Fp6.mul01(Fp6.add(c1, c0), o0, Fp2.add(o1, o4)), t0), t1)
        };
      },
      mul034: ({ c0, c1 }, o0, o3, o4) => {
        const a = Fp6.create({
          c0: Fp2.mul(c0.c0, o0),
          c1: Fp2.mul(c0.c1, o0),
          c2: Fp2.mul(c0.c2, o0)
        });
        const b = Fp6.mul01(c1, o3, o4);
        const e = Fp6.mul01(Fp6.add(c0, c1), Fp2.add(o0, o3), o4);
        return {
          c0: Fp6.add(Fp6.mulByNonresidue(b), a),
          c1: Fp6.sub(e, Fp6.add(a, b))
        };
      },
      // A cyclotomic group is a subgroup of Fp^n defined by
      //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
      // The result of any pairing is in a cyclotomic subgroup
      // https://eprint.iacr.org/2009/565.pdf
      _cyclotomicSquare: opts.Fp12cyclotomicSquare,
      _cyclotomicExp: opts.Fp12cyclotomicExp,
      // https://eprint.iacr.org/2010/354.pdf
      // https://eprint.iacr.org/2009/565.pdf
      finalExponentiate: opts.Fp12finalExponentiate
    };
    return { Fp, Fp2, Fp6, Fp4Square, Fp12 };
  }
  return tower;
}
var hasRequiredBls12381;
function requireBls12381() {
  if (hasRequiredBls12381) return bls12381;
  hasRequiredBls12381 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bls12_381 = void 0;
    const sha2_1 = /* @__PURE__ */ requireSha2();
    const utils_1 = /* @__PURE__ */ requireUtils$3();
    const bls_ts_1 = /* @__PURE__ */ requireBls();
    const modular_ts_1 = /* @__PURE__ */ requireModular$2();
    const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
    const hash_to_curve_ts_1 = /* @__PURE__ */ requireHashToCurve$2();
    const tower_ts_1 = /* @__PURE__ */ requireTower();
    const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass$2();
    const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _3n2 = BigInt(3), _4n2 = BigInt(4);
    const BLS_X = BigInt("0xd201000000010000");
    const BLS_X_LEN = (0, utils_ts_1.bitLen)(BLS_X);
    const { Fp, Fp2, Fp6, Fp4Square, Fp12 } = (0, tower_ts_1.tower12)({
      // Order of Fp
      ORDER: BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"),
      // Finite extension field over irreducible polynominal.
      // Fp(u) / (u² - β) where β = -1
      FP2_NONRESIDUE: [_1n2, _1n2],
      Fp2mulByB: ({ c0, c1 }) => {
        const t0 = Fp.mul(c0, _4n2);
        const t1 = Fp.mul(c1, _4n2);
        return { c0: Fp.sub(t0, t1), c1: Fp.add(t0, t1) };
      },
      // Fp12
      // A cyclotomic group is a subgroup of Fp^n defined by
      //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
      // The result of any pairing is in a cyclotomic subgroup
      // https://eprint.iacr.org/2009/565.pdf
      Fp12cyclotomicSquare: ({ c0, c1 }) => {
        const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
        const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
        const { first: t3, second: t4 } = Fp4Square(c0c0, c1c1);
        const { first: t5, second: t6 } = Fp4Square(c1c0, c0c2);
        const { first: t7, second: t8 } = Fp4Square(c0c1, c1c2);
        const t9 = Fp2.mulByNonresidue(t8);
        return {
          c0: Fp6.create({
            c0: Fp2.add(Fp2.mul(Fp2.sub(t3, c0c0), _2n2), t3),
            // 2 * (T3 - c0c0)  + T3
            c1: Fp2.add(Fp2.mul(Fp2.sub(t5, c0c1), _2n2), t5),
            // 2 * (T5 - c0c1)  + T5
            c2: Fp2.add(Fp2.mul(Fp2.sub(t7, c0c2), _2n2), t7)
          }),
          // 2 * (T7 - c0c2)  + T7
          c1: Fp6.create({
            c0: Fp2.add(Fp2.mul(Fp2.add(t9, c1c0), _2n2), t9),
            // 2 * (T9 + c1c0) + T9
            c1: Fp2.add(Fp2.mul(Fp2.add(t4, c1c1), _2n2), t4),
            // 2 * (T4 + c1c1) + T4
            c2: Fp2.add(Fp2.mul(Fp2.add(t6, c1c2), _2n2), t6)
          })
        };
      },
      Fp12cyclotomicExp(num, n) {
        let z = Fp12.ONE;
        for (let i = BLS_X_LEN - 1; i >= 0; i--) {
          z = Fp12._cyclotomicSquare(z);
          if ((0, utils_ts_1.bitGet)(n, i))
            z = Fp12.mul(z, num);
        }
        return z;
      },
      // https://eprint.iacr.org/2010/354.pdf
      // https://eprint.iacr.org/2009/565.pdf
      Fp12finalExponentiate: (num) => {
        const x = BLS_X;
        const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
        const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
        const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x));
        const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
        const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x));
        const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x));
        const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x)), Fp12._cyclotomicSquare(t2));
        const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x));
        const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
        const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
        const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
        const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
        return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
      }
    });
    const Fr = (0, modular_ts_1.Field)(BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"));
    const isogenyMapG2 = (0, hash_to_curve_ts_1.isogenyMap)(Fp2, [
      // xNum
      [
        [
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"
        ],
        [
          "0x0",
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"
        ],
        [
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
          "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"
        ],
        [
          "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
          "0x0"
        ]
      ],
      // xDen
      [
        [
          "0x0",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"
        ],
        [
          "0xc",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"
        ],
        ["0x1", "0x0"]
        // LAST 1
      ],
      // yNum
      [
        [
          "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
          "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"
        ],
        [
          "0x0",
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"
        ],
        [
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
          "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"
        ],
        [
          "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
          "0x0"
        ]
      ],
      // yDen
      [
        [
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"
        ],
        [
          "0x0",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"
        ],
        [
          "0x12",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"
        ],
        ["0x1", "0x0"]
        // LAST 1
      ]
    ].map((i) => i.map((pair) => Fp2.fromBigTuple(pair.map(BigInt)))));
    const isogenyMapG1 = (0, hash_to_curve_ts_1.isogenyMap)(Fp, [
      // xNum
      [
        "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
        "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
        "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
        "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
        "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
        "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
        "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
        "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
        "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
        "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
        "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
        "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
      ],
      // xDen
      [
        "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
        "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
        "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
        "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
        "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
        "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
        "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
        "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
        "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
        "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
        "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ],
      // yNum
      [
        "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
        "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
        "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
        "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
        "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
        "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
        "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
        "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
        "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
        "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
        "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
        "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
        "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
        "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
        "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
        "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
      ],
      // yDen
      [
        "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
        "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
        "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
        "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
        "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
        "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
        "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
        "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
        "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
        "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
        "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
        "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
        "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
        "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
        "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
        "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ]
    ].map((i) => i.map((j) => BigInt(j))));
    const G2_SWU = (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fp2, {
      A: Fp2.create({ c0: Fp.create(_0n2), c1: Fp.create(BigInt(240)) }),
      // A' = 240 * I
      B: Fp2.create({ c0: Fp.create(BigInt(1012)), c1: Fp.create(BigInt(1012)) }),
      // B' = 1012 * (1 + I)
      Z: Fp2.create({ c0: Fp.create(BigInt(-2)), c1: Fp.create(BigInt(-1)) })
      // Z: -(2 + I)
    });
    const G1_SWU = (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fp, {
      A: Fp.create(BigInt("0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d")),
      B: Fp.create(BigInt("0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0")),
      Z: Fp.create(BigInt(11))
    });
    const { G2psi, G2psi2 } = (0, tower_ts_1.psiFrobenius)(Fp, Fp2, Fp2.div(Fp2.ONE, Fp2.NONRESIDUE));
    const htfDefaults = Object.freeze({
      // DST: a domain separation tag
      // defined in section 2.2.5
      // Use utils.getDSTLabel(), utils.setDSTLabel(value)
      DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
      encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
      // p: the characteristic of F
      //    where F is a finite field of characteristic p and order q = p^m
      p: Fp.ORDER,
      // m: the extension degree of F, m >= 1
      //     where F is a finite field of characteristic p and order q = p^m
      m: 2,
      // k: the target security level for the suite in bits
      // defined in section 5.1
      k: 128,
      // option to use a message that has already been processed by
      // expand_message_xmd
      expand: "xmd",
      // Hash functions for: expand_message_xmd is appropriate for use with a
      // wide range of hash functions, including SHA-2, SHA-3, BLAKE2, and others.
      // BBS+ uses blake2: https://github.com/hyperledger/aries-framework-go/issues/2247
      hash: sha2_1.sha256
    });
    const COMPRESSED_ZERO = setMask(Fp.toBytes(_0n2), { infinity: true, compressed: true });
    function parseMask(bytes) {
      bytes = bytes.slice();
      const mask = bytes[0] & 224;
      const compressed = !!(mask >> 7 & 1);
      const infinity = !!(mask >> 6 & 1);
      const sort = !!(mask >> 5 & 1);
      bytes[0] &= 31;
      return { compressed, infinity, sort, value: bytes };
    }
    function setMask(bytes, mask) {
      if (bytes[0] & 224)
        throw new Error("setMask: non-empty mask");
      if (mask.compressed)
        bytes[0] |= 128;
      if (mask.infinity)
        bytes[0] |= 64;
      if (mask.sort)
        bytes[0] |= 32;
      return bytes;
    }
    function signatureG1ToRawBytes(point) {
      point.assertValidity();
      const isZero = point.equals(exports.bls12_381.G1.ProjectivePoint.ZERO);
      const { x, y } = point.toAffine();
      if (isZero)
        return COMPRESSED_ZERO.slice();
      const P = Fp.ORDER;
      const sort = Boolean(y * _2n2 / P);
      return setMask((0, utils_ts_1.numberToBytesBE)(x, Fp.BYTES), { compressed: true, sort });
    }
    function signatureG2ToRawBytes(point) {
      point.assertValidity();
      const len = Fp.BYTES;
      if (point.equals(exports.bls12_381.G2.ProjectivePoint.ZERO))
        return (0, utils_ts_1.concatBytes)(COMPRESSED_ZERO, (0, utils_ts_1.numberToBytesBE)(_0n2, len));
      const { x, y } = point.toAffine();
      const { re: x0, im: x1 } = Fp2.reim(x);
      const { re: y0, im: y1 } = Fp2.reim(y);
      const tmp = y1 > _0n2 ? y1 * _2n2 : y0 * _2n2;
      const sort = Boolean(tmp / Fp.ORDER & _1n2);
      const z2 = x0;
      return (0, utils_ts_1.concatBytes)(setMask((0, utils_ts_1.numberToBytesBE)(x1, len), { sort, compressed: true }), (0, utils_ts_1.numberToBytesBE)(z2, len));
    }
    exports.bls12_381 = (0, bls_ts_1.bls)({
      // Fields
      fields: {
        Fp,
        Fp2,
        Fp6,
        Fp12,
        Fr
      },
      // G1 is the order-q subgroup of E1(Fp) : y² = x³ + 4, #E1(Fp) = h1q, where
      // characteristic; z + (z⁴ - z² + 1)(z - 1)²/3
      G1: {
        Fp,
        // cofactor; (z - 1)²/3
        h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
        // generator's coordinates
        // x = 3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507
        // y = 1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569
        Gx: BigInt("0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"),
        Gy: BigInt("0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1"),
        a: Fp.ZERO,
        b: _4n2,
        htfDefaults: { ...htfDefaults, m: 1, DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_" },
        wrapPrivateKey: true,
        allowInfinityPoint: true,
        // Checks is the point resides in prime-order subgroup.
        // point.isTorsionFree() should return true for valid points
        // It returns false for shitty points.
        // https://eprint.iacr.org/2021/1130.pdf
        isTorsionFree: (c, point) => {
          const beta = BigInt("0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe");
          const phi = new c(Fp.mul(point.px, beta), point.py, point.pz);
          const xP = point.multiplyUnsafe(BLS_X).negate();
          const u2P = xP.multiplyUnsafe(BLS_X);
          return u2P.equals(phi);
        },
        // Clear cofactor of G1
        // https://eprint.iacr.org/2019/403
        clearCofactor: (_c, point) => {
          return point.multiplyUnsafe(BLS_X).add(point);
        },
        mapToCurve: (scalars) => {
          const { x, y } = G1_SWU(Fp.create(scalars[0]));
          return isogenyMapG1(x, y);
        },
        fromBytes: (bytes) => {
          const { compressed, infinity, sort, value } = parseMask(bytes);
          if (value.length === 48 && compressed) {
            const P = Fp.ORDER;
            const compressedValue = (0, utils_ts_1.bytesToNumberBE)(value);
            const x = Fp.create(compressedValue & Fp.MASK);
            if (infinity) {
              if (x !== _0n2)
                throw new Error("G1: non-empty compressed point at infinity");
              return { x: _0n2, y: _0n2 };
            }
            const right = Fp.add(Fp.pow(x, _3n2), Fp.create(exports.bls12_381.params.G1b));
            let y = Fp.sqrt(right);
            if (!y)
              throw new Error("invalid compressed G1 point");
            if (y * _2n2 / P !== BigInt(sort))
              y = Fp.neg(y);
            return { x: Fp.create(x), y: Fp.create(y) };
          } else if (value.length === 96 && !compressed) {
            const x = (0, utils_ts_1.bytesToNumberBE)(value.subarray(0, Fp.BYTES));
            const y = (0, utils_ts_1.bytesToNumberBE)(value.subarray(Fp.BYTES));
            if (infinity) {
              if (x !== _0n2 || y !== _0n2)
                throw new Error("G1: non-empty point at infinity");
              return exports.bls12_381.G1.ProjectivePoint.ZERO.toAffine();
            }
            return { x: Fp.create(x), y: Fp.create(y) };
          } else {
            throw new Error("invalid point G1, expected 48/96 bytes");
          }
        },
        toBytes: (c, point, isCompressed) => {
          const isZero = point.equals(c.ZERO);
          const { x, y } = point.toAffine();
          if (isCompressed) {
            if (isZero)
              return COMPRESSED_ZERO.slice();
            const P = Fp.ORDER;
            const sort = Boolean(y * _2n2 / P);
            return setMask((0, utils_ts_1.numberToBytesBE)(x, Fp.BYTES), { compressed: true, sort });
          } else {
            if (isZero) {
              const x2 = (0, utils_ts_1.concatBytes)(new Uint8Array([64]), new Uint8Array(2 * Fp.BYTES - 1));
              return x2;
            } else {
              return (0, utils_ts_1.concatBytes)((0, utils_ts_1.numberToBytesBE)(x, Fp.BYTES), (0, utils_ts_1.numberToBytesBE)(y, Fp.BYTES));
            }
          }
        },
        ShortSignature: {
          fromHex(hex) {
            const { infinity, sort, value } = parseMask((0, utils_ts_1.ensureBytes)("signatureHex", hex, 48));
            const P = Fp.ORDER;
            const compressedValue = (0, utils_ts_1.bytesToNumberBE)(value);
            if (infinity)
              return exports.bls12_381.G1.ProjectivePoint.ZERO;
            const x = Fp.create(compressedValue & Fp.MASK);
            const right = Fp.add(Fp.pow(x, _3n2), Fp.create(exports.bls12_381.params.G1b));
            let y = Fp.sqrt(right);
            if (!y)
              throw new Error("invalid compressed G1 point");
            const aflag = BigInt(sort);
            if (y * _2n2 / P !== aflag)
              y = Fp.neg(y);
            const point = exports.bls12_381.G1.ProjectivePoint.fromAffine({ x, y });
            point.assertValidity();
            return point;
          },
          toRawBytes(point) {
            return signatureG1ToRawBytes(point);
          },
          toHex(point) {
            return (0, utils_ts_1.bytesToHex)(signatureG1ToRawBytes(point));
          }
        }
      },
      // G2 is the order-q subgroup of E2(Fp²) : y² = x³+4(1+√−1),
      // where Fp2 is Fp[√−1]/(x2+1). #E2(Fp2 ) = h2q, where
      // G² - 1
      // h2q
      G2: {
        Fp: Fp2,
        // cofactor
        h: BigInt("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"),
        Gx: Fp2.fromBigTuple([
          BigInt("0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"),
          BigInt("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e")
        ]),
        // y =
        // 927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582,
        // 1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905
        Gy: Fp2.fromBigTuple([
          BigInt("0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"),
          BigInt("0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be")
        ]),
        a: Fp2.ZERO,
        b: Fp2.fromBigTuple([_4n2, _4n2]),
        hEff: BigInt("0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"),
        htfDefaults: { ...htfDefaults },
        wrapPrivateKey: true,
        allowInfinityPoint: true,
        mapToCurve: (scalars) => {
          const { x, y } = G2_SWU(Fp2.fromBigTuple(scalars));
          return isogenyMapG2(x, y);
        },
        // Checks is the point resides in prime-order subgroup.
        // point.isTorsionFree() should return true for valid points
        // It returns false for shitty points.
        // https://eprint.iacr.org/2021/1130.pdf
        // Older version: https://eprint.iacr.org/2019/814.pdf
        isTorsionFree: (c, P) => {
          return P.multiplyUnsafe(BLS_X).negate().equals(G2psi(c, P));
        },
        // Maps the point into the prime-order subgroup G2.
        // clear_cofactor_bls12381_g2 from RFC 9380.
        // https://eprint.iacr.org/2017/419.pdf
        // prettier-ignore
        clearCofactor: (c, P) => {
          const x = BLS_X;
          let t1 = P.multiplyUnsafe(x).negate();
          let t2 = G2psi(c, P);
          let t3 = P.double();
          t3 = G2psi2(c, t3);
          t3 = t3.subtract(t2);
          t2 = t1.add(t2);
          t2 = t2.multiplyUnsafe(x).negate();
          t3 = t3.add(t2);
          t3 = t3.subtract(t1);
          const Q = t3.subtract(P);
          return Q;
        },
        fromBytes: (bytes) => {
          const { compressed, infinity, sort, value } = parseMask(bytes);
          if (!compressed && !infinity && sort || // 00100000
          !compressed && infinity && sort || // 01100000
          sort && infinity && compressed) {
            throw new Error("invalid encoding flag: " + (bytes[0] & 224));
          }
          const L = Fp.BYTES;
          const slc = (b, from, to) => (0, utils_ts_1.bytesToNumberBE)(b.slice(from, to));
          if (value.length === 96 && compressed) {
            const b = exports.bls12_381.params.G2b;
            const P = Fp.ORDER;
            if (infinity) {
              if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
                throw new Error("invalid compressed G2 point");
              }
              return { x: Fp2.ZERO, y: Fp2.ZERO };
            }
            const x_1 = slc(value, 0, L);
            const x_0 = slc(value, L, 2 * L);
            const x = Fp2.create({ c0: Fp.create(x_0), c1: Fp.create(x_1) });
            const right = Fp2.add(Fp2.pow(x, _3n2), b);
            let y = Fp2.sqrt(right);
            const Y_bit = y.c1 === _0n2 ? y.c0 * _2n2 / P : y.c1 * _2n2 / P ? _1n2 : _0n2;
            y = sort && Y_bit > 0 ? y : Fp2.neg(y);
            return { x, y };
          } else if (value.length === 192 && !compressed) {
            if (infinity) {
              if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
                throw new Error("invalid uncompressed G2 point");
              }
              return { x: Fp2.ZERO, y: Fp2.ZERO };
            }
            const x1 = slc(value, 0, L);
            const x0 = slc(value, L, 2 * L);
            const y1 = slc(value, 2 * L, 3 * L);
            const y0 = slc(value, 3 * L, 4 * L);
            return { x: Fp2.fromBigTuple([x0, x1]), y: Fp2.fromBigTuple([y0, y1]) };
          } else {
            throw new Error("invalid point G2, expected 96/192 bytes");
          }
        },
        toBytes: (c, point, isCompressed) => {
          const { BYTES: len, ORDER: P } = Fp;
          const isZero = point.equals(c.ZERO);
          const { x, y } = point.toAffine();
          if (isCompressed) {
            if (isZero)
              return (0, utils_ts_1.concatBytes)(COMPRESSED_ZERO, (0, utils_ts_1.numberToBytesBE)(_0n2, len));
            const flag = Boolean(y.c1 === _0n2 ? y.c0 * _2n2 / P : y.c1 * _2n2 / P);
            return (0, utils_ts_1.concatBytes)(setMask((0, utils_ts_1.numberToBytesBE)(x.c1, len), { compressed: true, sort: flag }), (0, utils_ts_1.numberToBytesBE)(x.c0, len));
          } else {
            if (isZero)
              return (0, utils_ts_1.concatBytes)(new Uint8Array([64]), new Uint8Array(4 * len - 1));
            const { re: x0, im: x1 } = Fp2.reim(x);
            const { re: y0, im: y1 } = Fp2.reim(y);
            return (0, utils_ts_1.concatBytes)((0, utils_ts_1.numberToBytesBE)(x1, len), (0, utils_ts_1.numberToBytesBE)(x0, len), (0, utils_ts_1.numberToBytesBE)(y1, len), (0, utils_ts_1.numberToBytesBE)(y0, len));
          }
        },
        Signature: {
          // TODO: Optimize, it's very slow because of sqrt.
          fromHex(hex) {
            const { infinity, sort, value } = parseMask((0, utils_ts_1.ensureBytes)("signatureHex", hex));
            const P = Fp.ORDER;
            const half = value.length / 2;
            if (half !== 48 && half !== 96)
              throw new Error("invalid compressed signature length, must be 96 or 192");
            const z1 = (0, utils_ts_1.bytesToNumberBE)(value.slice(0, half));
            const z2 = (0, utils_ts_1.bytesToNumberBE)(value.slice(half));
            if (infinity)
              return exports.bls12_381.G2.ProjectivePoint.ZERO;
            const x1 = Fp.create(z1 & Fp.MASK);
            const x2 = Fp.create(z2);
            const x = Fp2.create({ c0: x2, c1: x1 });
            const y2 = Fp2.add(Fp2.pow(x, _3n2), exports.bls12_381.params.G2b);
            let y = Fp2.sqrt(y2);
            if (!y)
              throw new Error("Failed to find a square root");
            const { re: y0, im: y1 } = Fp2.reim(y);
            const aflag1 = BigInt(sort);
            const isGreater = y1 > _0n2 && y1 * _2n2 / P !== aflag1;
            const isZero = y1 === _0n2 && y0 * _2n2 / P !== aflag1;
            if (isGreater || isZero)
              y = Fp2.neg(y);
            const point = exports.bls12_381.G2.ProjectivePoint.fromAffine({ x, y });
            point.assertValidity();
            return point;
          },
          toRawBytes(point) {
            return signatureG2ToRawBytes(point);
          },
          toHex(point) {
            return (0, utils_ts_1.bytesToHex)(signatureG2ToRawBytes(point));
          }
        }
      },
      params: {
        ateLoopSize: BLS_X,
        // The BLS parameter x for BLS12-381
        r: Fr.ORDER,
        // order; z⁴ − z² + 1; CURVE.n from other curves
        xNegative: true,
        twistType: "multiplicative"
      },
      htfDefaults,
      hash: sha2_1.sha256,
      randomBytes: utils_1.randomBytes
    });
  })(bls12381);
  return bls12381;
}
var ed25519 = {};
var edwards = {};
var hasRequiredEdwards;
function requireEdwards() {
  if (hasRequiredEdwards) return edwards;
  hasRequiredEdwards = 1;
  Object.defineProperty(edwards, "__esModule", { value: true });
  edwards.twistedEdwards = twistedEdwards;
  const curve_ts_1 = /* @__PURE__ */ requireCurve$2();
  const modular_ts_1 = /* @__PURE__ */ requireModular$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _8n2 = BigInt(8);
  const VERIFY_DEFAULT = { zip215: true };
  function validateOpts2(curve2) {
    const opts = (0, curve_ts_1.validateBasic)(curve2);
    (0, utils_ts_1.validateObject)(curve2, {
      hash: "function",
      a: "bigint",
      d: "bigint",
      randomBytes: "function"
    }, {
      adjustScalarBytes: "function",
      domain: "function",
      uvRatio: "function",
      mapToCurve: "function"
    });
    return Object.freeze({ ...opts });
  }
  function twistedEdwards(curveDef) {
    const CURVE = validateOpts2(curveDef);
    const { Fp, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE;
    const MASK = _2n2 << BigInt(nByteLength * 8) - _1n2;
    const modP = Fp.create;
    const Fn = (0, modular_ts_1.Field)(CURVE.n, CURVE.nBitLength);
    function isEdValidXY(x, y) {
      const x2 = Fp.sqr(x);
      const y2 = Fp.sqr(y);
      const left = Fp.add(Fp.mul(CURVE.a, x2), y2);
      const right = Fp.add(Fp.ONE, Fp.mul(CURVE.d, Fp.mul(x2, y2)));
      return Fp.eql(left, right);
    }
    if (!isEdValidXY(CURVE.Gx, CURVE.Gy))
      throw new Error("bad curve params: generator point");
    const uvRatio = CURVE.uvRatio || ((u, v) => {
      try {
        return { isValid: true, value: Fp.sqrt(u * Fp.inv(v)) };
      } catch (e) {
        return { isValid: false, value: _0n2 };
      }
    });
    const adjustScalarBytes = CURVE.adjustScalarBytes || ((bytes) => bytes);
    const domain = CURVE.domain || ((data, ctx, phflag) => {
      (0, utils_ts_1.abool)("phflag", phflag);
      if (ctx.length || phflag)
        throw new Error("Contexts/pre-hash are not supported");
      return data;
    });
    function aCoordinate(title, n, banZero = false) {
      const min = banZero ? _1n2 : _0n2;
      (0, utils_ts_1.aInRange)("coordinate " + title, n, min, MASK);
    }
    function aextpoint(other) {
      if (!(other instanceof Point))
        throw new Error("ExtendedPoint expected");
    }
    const toAffineMemo = (0, utils_ts_1.memoized)((p, iz) => {
      const { ex: x, ey: y, ez: z } = p;
      const is0 = p.is0();
      if (iz == null)
        iz = is0 ? _8n2 : Fp.inv(z);
      const ax = modP(x * iz);
      const ay = modP(y * iz);
      const zz = modP(z * iz);
      if (is0)
        return { x: _0n2, y: _1n2 };
      if (zz !== _1n2)
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    });
    const assertValidMemo = (0, utils_ts_1.memoized)((p) => {
      const { a, d } = CURVE;
      if (p.is0())
        throw new Error("bad point: ZERO");
      const { ex: X, ey: Y, ez: Z, et: T } = p;
      const X2 = modP(X * X);
      const Y2 = modP(Y * Y);
      const Z2 = modP(Z * Z);
      const Z4 = modP(Z2 * Z2);
      const aX2 = modP(X2 * a);
      const left = modP(Z2 * modP(aX2 + Y2));
      const right = modP(Z4 + modP(d * modP(X2 * Y2)));
      if (left !== right)
        throw new Error("bad point: equation left != right (1)");
      const XY = modP(X * Y);
      const ZT = modP(Z * T);
      if (XY !== ZT)
        throw new Error("bad point: equation left != right (2)");
      return true;
    });
    class Point {
      constructor(ex, ey, ez, et) {
        aCoordinate("x", ex);
        aCoordinate("y", ey);
        aCoordinate("z", ez, true);
        aCoordinate("t", et);
        this.ex = ex;
        this.ey = ey;
        this.ez = ez;
        this.et = et;
        Object.freeze(this);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      static fromAffine(p) {
        if (p instanceof Point)
          throw new Error("extended point not allowed");
        const { x, y } = p || {};
        aCoordinate("x", x);
        aCoordinate("y", y);
        return new Point(x, y, _1n2, modP(x * y));
      }
      static normalizeZ(points) {
        const toInv = (0, modular_ts_1.FpInvertBatch)(Fp, points.map((p) => p.ez));
        return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
      }
      // Multiscalar Multiplication
      static msm(points, scalars) {
        return (0, curve_ts_1.pippenger)(Point, Fn, points, scalars);
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        wnaf.setWindowSize(this, windowSize);
      }
      // Not required for fromHex(), which always creates valid points.
      // Could be useful for fromAffine().
      assertValidity() {
        assertValidMemo(this);
      }
      // Compare one point to another.
      equals(other) {
        aextpoint(other);
        const { ex: X1, ey: Y1, ez: Z1 } = this;
        const { ex: X2, ey: Y2, ez: Z2 } = other;
        const X1Z2 = modP(X1 * Z2);
        const X2Z1 = modP(X2 * Z1);
        const Y1Z2 = modP(Y1 * Z2);
        const Y2Z1 = modP(Y2 * Z1);
        return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
      }
      is0() {
        return this.equals(Point.ZERO);
      }
      negate() {
        return new Point(modP(-this.ex), this.ey, this.ez, modP(-this.et));
      }
      // Fast algo for doubling Extended Point.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
      // Cost: 4M + 4S + 1*a + 6add + 1*2.
      double() {
        const { a } = CURVE;
        const { ex: X1, ey: Y1, ez: Z1 } = this;
        const A = modP(X1 * X1);
        const B = modP(Y1 * Y1);
        const C = modP(_2n2 * modP(Z1 * Z1));
        const D = modP(a * A);
        const x1y1 = X1 + Y1;
        const E = modP(modP(x1y1 * x1y1) - A - B);
        const G2 = D + B;
        const F = G2 - C;
        const H = D - B;
        const X3 = modP(E * F);
        const Y3 = modP(G2 * H);
        const T3 = modP(E * H);
        const Z3 = modP(F * G2);
        return new Point(X3, Y3, Z3, T3);
      }
      // Fast algo for adding 2 Extended Points.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
      // Cost: 9M + 1*a + 1*d + 7add.
      add(other) {
        aextpoint(other);
        const { a, d } = CURVE;
        const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
        const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
        const A = modP(X1 * X2);
        const B = modP(Y1 * Y2);
        const C = modP(T1 * d * T2);
        const D = modP(Z1 * Z2);
        const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
        const F = D - C;
        const G2 = D + C;
        const H = modP(B - a * A);
        const X3 = modP(E * F);
        const Y3 = modP(G2 * H);
        const T3 = modP(E * H);
        const Z3 = modP(F * G2);
        return new Point(X3, Y3, Z3, T3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, n, Point.normalizeZ);
      }
      // Constant-time multiplication.
      multiply(scalar) {
        const n = scalar;
        (0, utils_ts_1.aInRange)("scalar", n, _1n2, CURVE_ORDER);
        const { p, f } = this.wNAF(n);
        return Point.normalizeZ([p, f])[0];
      }
      // Non-constant-time multiplication. Uses double-and-add algorithm.
      // It's faster, but should only be used when you don't care about
      // an exposed private key e.g. sig verification.
      // Does NOT allow scalars higher than CURVE.n.
      // Accepts optional accumulator to merge with multiply (important for sparse scalars)
      multiplyUnsafe(scalar, acc = Point.ZERO) {
        const n = scalar;
        (0, utils_ts_1.aInRange)("scalar", n, _0n2, CURVE_ORDER);
        if (n === _0n2)
          return I;
        if (this.is0() || n === _1n2)
          return this;
        return wnaf.wNAFCachedUnsafe(this, n, Point.normalizeZ, acc);
      }
      // Checks if point is of small order.
      // If you add something to small order point, you will have "dirty"
      // point with torsion component.
      // Multiplies point by cofactor and checks if the result is 0.
      isSmallOrder() {
        return this.multiplyUnsafe(cofactor).is0();
      }
      // Multiplies point by curve order and checks if the result is 0.
      // Returns `false` is the point is dirty.
      isTorsionFree() {
        return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
      }
      // Converts Extended point to default (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      toAffine(iz) {
        return toAffineMemo(this, iz);
      }
      clearCofactor() {
        const { h: cofactor2 } = CURVE;
        if (cofactor2 === _1n2)
          return this;
        return this.multiplyUnsafe(cofactor2);
      }
      // Converts hash string or Uint8Array to Point.
      // Uses algo from RFC8032 5.1.3.
      static fromHex(hex, zip215 = false) {
        const { d, a } = CURVE;
        const len = Fp.BYTES;
        hex = (0, utils_ts_1.ensureBytes)("pointHex", hex, len);
        (0, utils_ts_1.abool)("zip215", zip215);
        const normed = hex.slice();
        const lastByte = hex[len - 1];
        normed[len - 1] = lastByte & -129;
        const y = (0, utils_ts_1.bytesToNumberLE)(normed);
        const max = zip215 ? MASK : Fp.ORDER;
        (0, utils_ts_1.aInRange)("pointHex.y", y, _0n2, max);
        const y2 = modP(y * y);
        const u = modP(y2 - _1n2);
        const v = modP(d * y2 - a);
        let { isValid, value: x } = uvRatio(u, v);
        if (!isValid)
          throw new Error("Point.fromHex: invalid y coordinate");
        const isXOdd = (x & _1n2) === _1n2;
        const isLastByteOdd = (lastByte & 128) !== 0;
        if (!zip215 && x === _0n2 && isLastByteOdd)
          throw new Error("Point.fromHex: x=0 and x_0=1");
        if (isLastByteOdd !== isXOdd)
          x = modP(-x);
        return Point.fromAffine({ x, y });
      }
      static fromPrivateKey(privKey) {
        const { scalar } = getPrivateScalar(privKey);
        return G.multiply(scalar);
      }
      toRawBytes() {
        const { x, y } = this.toAffine();
        const bytes = (0, utils_ts_1.numberToBytesLE)(y, Fp.BYTES);
        bytes[bytes.length - 1] |= x & _1n2 ? 128 : 0;
        return bytes;
      }
      toHex() {
        return (0, utils_ts_1.bytesToHex)(this.toRawBytes());
      }
    }
    Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n2, modP(CURVE.Gx * CURVE.Gy));
    Point.ZERO = new Point(_0n2, _1n2, _1n2, _0n2);
    const { BASE: G, ZERO: I } = Point;
    const wnaf = (0, curve_ts_1.wNAF)(Point, nByteLength * 8);
    function modN(a) {
      return (0, modular_ts_1.mod)(a, CURVE_ORDER);
    }
    function modN_LE(hash) {
      return modN((0, utils_ts_1.bytesToNumberLE)(hash));
    }
    function getPrivateScalar(key) {
      const len = Fp.BYTES;
      key = (0, utils_ts_1.ensureBytes)("private key", key, len);
      const hashed = (0, utils_ts_1.ensureBytes)("hashed private key", cHash(key), 2 * len);
      const head = adjustScalarBytes(hashed.slice(0, len));
      const prefix = hashed.slice(len, 2 * len);
      const scalar = modN_LE(head);
      return { head, prefix, scalar };
    }
    function getExtendedPublicKey(key) {
      const { head, prefix, scalar } = getPrivateScalar(key);
      const point = G.multiply(scalar);
      const pointBytes = point.toRawBytes();
      return { head, prefix, scalar, point, pointBytes };
    }
    function getPublicKey(privKey) {
      return getExtendedPublicKey(privKey).pointBytes;
    }
    function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
      const msg = (0, utils_ts_1.concatBytes)(...msgs);
      return modN_LE(cHash(domain(msg, (0, utils_ts_1.ensureBytes)("context", context), !!prehash)));
    }
    function sign(msg, privKey, options = {}) {
      msg = (0, utils_ts_1.ensureBytes)("message", msg);
      if (prehash)
        msg = prehash(msg);
      const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
      const r = hashDomainToScalar(options.context, prefix, msg);
      const R = G.multiply(r).toRawBytes();
      const k = hashDomainToScalar(options.context, R, pointBytes, msg);
      const s = modN(r + k * scalar);
      (0, utils_ts_1.aInRange)("signature.s", s, _0n2, CURVE_ORDER);
      const res = (0, utils_ts_1.concatBytes)(R, (0, utils_ts_1.numberToBytesLE)(s, Fp.BYTES));
      return (0, utils_ts_1.ensureBytes)("result", res, Fp.BYTES * 2);
    }
    const verifyOpts = VERIFY_DEFAULT;
    function verify(sig, msg, publicKey, options = verifyOpts) {
      const { context, zip215 } = options;
      const len = Fp.BYTES;
      sig = (0, utils_ts_1.ensureBytes)("signature", sig, 2 * len);
      msg = (0, utils_ts_1.ensureBytes)("message", msg);
      publicKey = (0, utils_ts_1.ensureBytes)("publicKey", publicKey, len);
      if (zip215 !== void 0)
        (0, utils_ts_1.abool)("zip215", zip215);
      if (prehash)
        msg = prehash(msg);
      const s = (0, utils_ts_1.bytesToNumberLE)(sig.slice(len, 2 * len));
      let A, R, SB;
      try {
        A = Point.fromHex(publicKey, zip215);
        R = Point.fromHex(sig.slice(0, len), zip215);
        SB = G.multiplyUnsafe(s);
      } catch (error) {
        return false;
      }
      if (!zip215 && A.isSmallOrder())
        return false;
      const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
      const RkA = R.add(A.multiplyUnsafe(k));
      return RkA.subtract(SB).clearCofactor().equals(Point.ZERO);
    }
    G._setWindowSize(8);
    const utils2 = {
      getExtendedPublicKey,
      /** ed25519 priv keys are uniform 32b. No need to check for modulo bias, like in secp256k1. */
      randomPrivateKey: () => randomBytes2(Fp.BYTES),
      /**
       * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
       * values. This slows down first getPublicKey() by milliseconds (see Speed section),
       * but allows to speed-up subsequent getPublicKey() calls up to 20x.
       * @param windowSize 2, 4, 8, 16
       */
      precompute(windowSize = 8, point = Point.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    return {
      CURVE,
      getPublicKey,
      sign,
      verify,
      ExtendedPoint: Point,
      utils: utils2
    };
  }
  return edwards;
}
var montgomery = {};
var hasRequiredMontgomery;
function requireMontgomery() {
  if (hasRequiredMontgomery) return montgomery;
  hasRequiredMontgomery = 1;
  Object.defineProperty(montgomery, "__esModule", { value: true });
  montgomery.montgomery = montgomery$1;
  const modular_ts_1 = /* @__PURE__ */ requireModular$2();
  const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
  const _0n2 = BigInt(0);
  const _1n2 = BigInt(1);
  const _2n2 = BigInt(2);
  function validateOpts2(curve2) {
    (0, utils_ts_1.validateObject)(curve2, {
      adjustScalarBytes: "function",
      powPminus2: "function"
    });
    return Object.freeze({ ...curve2 });
  }
  function montgomery$1(curveDef) {
    const CURVE = validateOpts2(curveDef);
    const { P, type, adjustScalarBytes, powPminus2 } = CURVE;
    const is25519 = type === "x25519";
    if (!is25519 && type !== "x448")
      throw new Error("invalid type");
    const montgomeryBits = is25519 ? 255 : 448;
    const fieldLen = is25519 ? 32 : 56;
    const Gu = is25519 ? BigInt(9) : BigInt(5);
    const a24 = is25519 ? BigInt(121665) : BigInt(39081);
    const minScalar = is25519 ? _2n2 ** BigInt(254) : _2n2 ** BigInt(447);
    const maxAdded = is25519 ? BigInt(8) * _2n2 ** BigInt(251) - _1n2 : BigInt(4) * _2n2 ** BigInt(445) - _1n2;
    const maxScalar = minScalar + maxAdded + _1n2;
    const modP = (n) => (0, modular_ts_1.mod)(n, P);
    const GuBytes = encodeU(Gu);
    function encodeU(u) {
      return (0, utils_ts_1.numberToBytesLE)(modP(u), fieldLen);
    }
    function decodeU(u) {
      const _u = (0, utils_ts_1.ensureBytes)("u coordinate", u, fieldLen);
      if (is25519)
        _u[31] &= 127;
      return modP((0, utils_ts_1.bytesToNumberLE)(_u));
    }
    function decodeScalar(scalar) {
      return (0, utils_ts_1.bytesToNumberLE)(adjustScalarBytes((0, utils_ts_1.ensureBytes)("scalar", scalar, fieldLen)));
    }
    function scalarMult(scalar, u) {
      const pu = montgomeryLadder(decodeU(u), decodeScalar(scalar));
      if (pu === _0n2)
        throw new Error("invalid private or public key received");
      return encodeU(pu);
    }
    function scalarMultBase(scalar) {
      return scalarMult(scalar, GuBytes);
    }
    function cswap(swap, x_2, x_3) {
      const dummy = modP(swap * (x_2 - x_3));
      x_2 = modP(x_2 - dummy);
      x_3 = modP(x_3 + dummy);
      return { x_2, x_3 };
    }
    function montgomeryLadder(u, scalar) {
      (0, utils_ts_1.aInRange)("u", u, _0n2, P);
      (0, utils_ts_1.aInRange)("scalar", scalar, minScalar, maxScalar);
      const k = scalar;
      const x_1 = u;
      let x_2 = _1n2;
      let z_2 = _0n2;
      let x_3 = u;
      let z_3 = _1n2;
      let swap = _0n2;
      for (let t = BigInt(montgomeryBits - 1); t >= _0n2; t--) {
        const k_t = k >> t & _1n2;
        swap ^= k_t;
        ({ x_2, x_3 } = cswap(swap, x_2, x_3));
        ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
        swap = k_t;
        const A = x_2 + z_2;
        const AA = modP(A * A);
        const B = x_2 - z_2;
        const BB = modP(B * B);
        const E = AA - BB;
        const C = x_3 + z_3;
        const D = x_3 - z_3;
        const DA = modP(D * A);
        const CB = modP(C * B);
        const dacb = DA + CB;
        const da_cb = DA - CB;
        x_3 = modP(dacb * dacb);
        z_3 = modP(x_1 * modP(da_cb * da_cb));
        x_2 = modP(AA * BB);
        z_2 = modP(E * (AA + modP(a24 * E)));
      }
      ({ x_2, x_3 } = cswap(swap, x_2, x_3));
      ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
      const z2 = powPminus2(z_2);
      return modP(x_2 * z2);
    }
    return {
      scalarMult,
      scalarMultBase,
      getSharedSecret: (privateKey, publicKey) => scalarMult(privateKey, publicKey),
      getPublicKey: (privateKey) => scalarMultBase(privateKey),
      utils: { randomPrivateKey: () => CURVE.randomBytes(fieldLen) },
      GuBytes: GuBytes.slice()
    };
  }
  return montgomery;
}
var hasRequiredEd25519;
function requireEd25519() {
  if (hasRequiredEd25519) return ed25519;
  hasRequiredEd25519 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hash_to_ristretto255 = exports.hashToRistretto255 = exports.RistrettoPoint = exports.encodeToCurve = exports.hashToCurve = exports.ed25519_hasher = exports.edwardsToMontgomery = exports.x25519 = exports.ed25519ph = exports.ed25519ctx = exports.ed25519 = exports.ED25519_TORSION_SUBGROUP = void 0;
    exports.edwardsToMontgomeryPub = edwardsToMontgomeryPub;
    exports.edwardsToMontgomeryPriv = edwardsToMontgomeryPriv;
    const sha2_1 = /* @__PURE__ */ requireSha2();
    const utils_1 = /* @__PURE__ */ requireUtils$3();
    const curve_ts_1 = /* @__PURE__ */ requireCurve$2();
    const edwards_ts_1 = /* @__PURE__ */ requireEdwards();
    const hash_to_curve_ts_1 = /* @__PURE__ */ requireHashToCurve$2();
    const modular_ts_1 = /* @__PURE__ */ requireModular$2();
    const montgomery_ts_1 = /* @__PURE__ */ requireMontgomery();
    const utils_ts_1 = /* @__PURE__ */ requireUtils$2();
    const ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
    const ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
    const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _3n2 = BigInt(3);
    const _5n2 = BigInt(5), _8n2 = BigInt(8);
    function ed25519_pow_2_252_3(x) {
      const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
      const P = ED25519_P;
      const x2 = x * x % P;
      const b2 = x2 * x % P;
      const b4 = (0, modular_ts_1.pow2)(b2, _2n2, P) * b2 % P;
      const b5 = (0, modular_ts_1.pow2)(b4, _1n2, P) * x % P;
      const b10 = (0, modular_ts_1.pow2)(b5, _5n2, P) * b5 % P;
      const b20 = (0, modular_ts_1.pow2)(b10, _10n, P) * b10 % P;
      const b40 = (0, modular_ts_1.pow2)(b20, _20n, P) * b20 % P;
      const b80 = (0, modular_ts_1.pow2)(b40, _40n, P) * b40 % P;
      const b160 = (0, modular_ts_1.pow2)(b80, _80n, P) * b80 % P;
      const b240 = (0, modular_ts_1.pow2)(b160, _80n, P) * b80 % P;
      const b250 = (0, modular_ts_1.pow2)(b240, _10n, P) * b10 % P;
      const pow_p_5_8 = (0, modular_ts_1.pow2)(b250, _2n2, P) * x % P;
      return { pow_p_5_8, b2 };
    }
    function adjustScalarBytes(bytes) {
      bytes[0] &= 248;
      bytes[31] &= 127;
      bytes[31] |= 64;
      return bytes;
    }
    function uvRatio(u, v) {
      const P = ED25519_P;
      const v3 = (0, modular_ts_1.mod)(v * v * v, P);
      const v7 = (0, modular_ts_1.mod)(v3 * v3 * v, P);
      const pow3 = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
      let x = (0, modular_ts_1.mod)(u * v3 * pow3, P);
      const vx2 = (0, modular_ts_1.mod)(v * x * x, P);
      const root1 = x;
      const root2 = (0, modular_ts_1.mod)(x * ED25519_SQRT_M1, P);
      const useRoot1 = vx2 === u;
      const useRoot2 = vx2 === (0, modular_ts_1.mod)(-u, P);
      const noRoot = vx2 === (0, modular_ts_1.mod)(-u * ED25519_SQRT_M1, P);
      if (useRoot1)
        x = root1;
      if (useRoot2 || noRoot)
        x = root2;
      if ((0, modular_ts_1.isNegativeLE)(x, P))
        x = (0, modular_ts_1.mod)(-x, P);
      return { isValid: useRoot1 || useRoot2, value: x };
    }
    exports.ED25519_TORSION_SUBGROUP = [
      "0100000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
      "0000000000000000000000000000000000000000000000000000000000000080",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
      "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"
    ];
    const Fp = /* @__PURE__ */ (() => (0, modular_ts_1.Field)(ED25519_P, void 0, true))();
    const ed25519Defaults = /* @__PURE__ */ (() => ({
      // Removing Fp.create() will still work, and is 10% faster on sign
      a: Fp.create(BigInt(-1)),
      // d is -121665/121666 a.k.a. Fp.neg(121665 * Fp.inv(121666))
      d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
      // Finite field 2n**255n - 19n
      Fp,
      // Subgroup order 2n**252n + 27742317777372353535851937790883648493n;
      n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
      h: _8n2,
      Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
      Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
      hash: sha2_1.sha512,
      randomBytes: utils_1.randomBytes,
      adjustScalarBytes,
      // dom2
      // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
      // Constant-time, u/√v
      uvRatio
    }))();
    exports.ed25519 = (() => (0, edwards_ts_1.twistedEdwards)(ed25519Defaults))();
    function ed25519_domain(data, ctx, phflag) {
      if (ctx.length > 255)
        throw new Error("Context is too big");
      return (0, utils_1.concatBytes)((0, utils_1.utf8ToBytes)("SigEd25519 no Ed25519 collisions"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
    }
    exports.ed25519ctx = (() => (0, edwards_ts_1.twistedEdwards)({
      ...ed25519Defaults,
      domain: ed25519_domain
    }))();
    exports.ed25519ph = (() => (0, edwards_ts_1.twistedEdwards)(Object.assign({}, ed25519Defaults, {
      domain: ed25519_domain,
      prehash: sha2_1.sha512
    })))();
    exports.x25519 = (() => (0, montgomery_ts_1.montgomery)({
      P: ED25519_P,
      type: "x25519",
      powPminus2: (x) => {
        const P = ED25519_P;
        const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
        return (0, modular_ts_1.mod)((0, modular_ts_1.pow2)(pow_p_5_8, _3n2, P) * b2, P);
      },
      adjustScalarBytes,
      randomBytes: utils_1.randomBytes
    }))();
    function edwardsToMontgomeryPub(edwardsPub) {
      const { y } = exports.ed25519.ExtendedPoint.fromHex(edwardsPub);
      const _1n3 = BigInt(1);
      return Fp.toBytes(Fp.create((_1n3 + y) * Fp.inv(_1n3 - y)));
    }
    exports.edwardsToMontgomery = edwardsToMontgomeryPub;
    function edwardsToMontgomeryPriv(edwardsPriv) {
      const hashed = ed25519Defaults.hash(edwardsPriv.subarray(0, 32));
      return ed25519Defaults.adjustScalarBytes(hashed).subarray(0, 32);
    }
    const ELL2_C1 = /* @__PURE__ */ (() => (Fp.ORDER + _3n2) / _8n2)();
    const ELL2_C2 = /* @__PURE__ */ (() => Fp.pow(_2n2, ELL2_C1))();
    const ELL2_C3 = /* @__PURE__ */ (() => Fp.sqrt(Fp.neg(Fp.ONE)))();
    function map_to_curve_elligator2_curve25519(u) {
      const ELL2_C4 = (Fp.ORDER - _5n2) / _8n2;
      const ELL2_J = BigInt(486662);
      let tv1 = Fp.sqr(u);
      tv1 = Fp.mul(tv1, _2n2);
      let xd = Fp.add(tv1, Fp.ONE);
      let x1n = Fp.neg(ELL2_J);
      let tv2 = Fp.sqr(xd);
      let gxd = Fp.mul(tv2, xd);
      let gx1 = Fp.mul(tv1, ELL2_J);
      gx1 = Fp.mul(gx1, x1n);
      gx1 = Fp.add(gx1, tv2);
      gx1 = Fp.mul(gx1, x1n);
      let tv3 = Fp.sqr(gxd);
      tv2 = Fp.sqr(tv3);
      tv3 = Fp.mul(tv3, gxd);
      tv3 = Fp.mul(tv3, gx1);
      tv2 = Fp.mul(tv2, tv3);
      let y11 = Fp.pow(tv2, ELL2_C4);
      y11 = Fp.mul(y11, tv3);
      let y12 = Fp.mul(y11, ELL2_C3);
      tv2 = Fp.sqr(y11);
      tv2 = Fp.mul(tv2, gxd);
      let e1 = Fp.eql(tv2, gx1);
      let y1 = Fp.cmov(y12, y11, e1);
      let x2n = Fp.mul(x1n, tv1);
      let y21 = Fp.mul(y11, u);
      y21 = Fp.mul(y21, ELL2_C2);
      let y22 = Fp.mul(y21, ELL2_C3);
      let gx2 = Fp.mul(gx1, tv1);
      tv2 = Fp.sqr(y21);
      tv2 = Fp.mul(tv2, gxd);
      let e2 = Fp.eql(tv2, gx2);
      let y2 = Fp.cmov(y22, y21, e2);
      tv2 = Fp.sqr(y1);
      tv2 = Fp.mul(tv2, gxd);
      let e3 = Fp.eql(tv2, gx1);
      let xn = Fp.cmov(x2n, x1n, e3);
      let y = Fp.cmov(y2, y1, e3);
      let e4 = Fp.isOdd(y);
      y = Fp.cmov(y, Fp.neg(y), e3 !== e4);
      return { xMn: xn, xMd: xd, yMn: y, yMd: _1n2 };
    }
    const ELL2_C1_EDWARDS = /* @__PURE__ */ (() => (0, modular_ts_1.FpSqrtEven)(Fp, Fp.neg(BigInt(486664))))();
    function map_to_curve_elligator2_edwards25519(u) {
      const { xMn, xMd, yMn, yMd } = map_to_curve_elligator2_curve25519(u);
      let xn = Fp.mul(xMn, yMd);
      xn = Fp.mul(xn, ELL2_C1_EDWARDS);
      let xd = Fp.mul(xMd, yMn);
      let yn = Fp.sub(xMn, xMd);
      let yd = Fp.add(xMn, xMd);
      let tv1 = Fp.mul(xd, yd);
      let e = Fp.eql(tv1, Fp.ZERO);
      xn = Fp.cmov(xn, Fp.ZERO, e);
      xd = Fp.cmov(xd, Fp.ONE, e);
      yn = Fp.cmov(yn, Fp.ONE, e);
      yd = Fp.cmov(yd, Fp.ONE, e);
      const [xd_inv, yd_inv] = (0, modular_ts_1.FpInvertBatch)(Fp, [xd, yd], true);
      return { x: Fp.mul(xn, xd_inv), y: Fp.mul(yn, yd_inv) };
    }
    exports.ed25519_hasher = (() => (0, hash_to_curve_ts_1.createHasher)(exports.ed25519.ExtendedPoint, (scalars) => map_to_curve_elligator2_edwards25519(scalars[0]), {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: Fp.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha2_1.sha512
    }))();
    exports.hashToCurve = (() => exports.ed25519_hasher.hashToCurve)();
    exports.encodeToCurve = (() => exports.ed25519_hasher.encodeToCurve)();
    function aristp(other) {
      if (!(other instanceof RistPoint))
        throw new Error("RistrettoPoint expected");
    }
    const SQRT_M1 = ED25519_SQRT_M1;
    const SQRT_AD_MINUS_ONE = /* @__PURE__ */ BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
    const INVSQRT_A_MINUS_D = /* @__PURE__ */ BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
    const ONE_MINUS_D_SQ = /* @__PURE__ */ BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
    const D_MINUS_ONE_SQ = /* @__PURE__ */ BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
    const invertSqrt = (number) => uvRatio(_1n2, number);
    const MAX_255B = /* @__PURE__ */ BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    const bytes255ToNumberLE = (bytes) => exports.ed25519.CURVE.Fp.create((0, utils_ts_1.bytesToNumberLE)(bytes) & MAX_255B);
    function calcElligatorRistrettoMap(r0) {
      const { d } = exports.ed25519.CURVE;
      const P = exports.ed25519.CURVE.Fp.ORDER;
      const mod2 = exports.ed25519.CURVE.Fp.create;
      const r = mod2(SQRT_M1 * r0 * r0);
      const Ns = mod2((r + _1n2) * ONE_MINUS_D_SQ);
      let c = BigInt(-1);
      const D = mod2((c - d * r) * mod2(r + d));
      let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
      let s_ = mod2(s * r0);
      if (!(0, modular_ts_1.isNegativeLE)(s_, P))
        s_ = mod2(-s_);
      if (!Ns_D_is_sq)
        s = s_;
      if (!Ns_D_is_sq)
        c = r;
      const Nt = mod2(c * (r - _1n2) * D_MINUS_ONE_SQ - D);
      const s2 = s * s;
      const W0 = mod2((s + s) * D);
      const W1 = mod2(Nt * SQRT_AD_MINUS_ONE);
      const W2 = mod2(_1n2 - s2);
      const W3 = mod2(_1n2 + s2);
      return new exports.ed25519.ExtendedPoint(mod2(W0 * W3), mod2(W2 * W1), mod2(W1 * W3), mod2(W0 * W2));
    }
    class RistPoint {
      // Private property to discourage combining ExtendedPoint + RistrettoPoint
      // Always use Ristretto encoding/decoding instead.
      constructor(ep) {
        this.ep = ep;
      }
      static fromAffine(ap) {
        return new RistPoint(exports.ed25519.ExtendedPoint.fromAffine(ap));
      }
      /**
       * Takes uniform output of 64-byte hash function like sha512 and converts it to `RistrettoPoint`.
       * The hash-to-group operation applies Elligator twice and adds the results.
       * **Note:** this is one-way map, there is no conversion from point to hash.
       * Described in [RFC9380](https://www.rfc-editor.org/rfc/rfc9380#appendix-B) and on
       * the [website](https://ristretto.group/formulas/elligator.html).
       * @param hex 64-byte output of a hash function
       */
      static hashToCurve(hex) {
        hex = (0, utils_ts_1.ensureBytes)("ristrettoHash", hex, 64);
        const r1 = bytes255ToNumberLE(hex.slice(0, 32));
        const R1 = calcElligatorRistrettoMap(r1);
        const r2 = bytes255ToNumberLE(hex.slice(32, 64));
        const R2 = calcElligatorRistrettoMap(r2);
        return new RistPoint(R1.add(R2));
      }
      /**
       * Converts ristretto-encoded string to ristretto point.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
       * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
       */
      static fromHex(hex) {
        hex = (0, utils_ts_1.ensureBytes)("ristrettoHex", hex, 32);
        const { a, d } = exports.ed25519.CURVE;
        const P = exports.ed25519.CURVE.Fp.ORDER;
        const mod2 = exports.ed25519.CURVE.Fp.create;
        const emsg = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint";
        const s = bytes255ToNumberLE(hex);
        if (!(0, utils_ts_1.equalBytes)((0, utils_ts_1.numberToBytesLE)(s, 32), hex) || (0, modular_ts_1.isNegativeLE)(s, P))
          throw new Error(emsg);
        const s2 = mod2(s * s);
        const u1 = mod2(_1n2 + a * s2);
        const u2 = mod2(_1n2 - a * s2);
        const u1_2 = mod2(u1 * u1);
        const u2_2 = mod2(u2 * u2);
        const v = mod2(a * d * u1_2 - u2_2);
        const { isValid, value: I } = invertSqrt(mod2(v * u2_2));
        const Dx = mod2(I * u2);
        const Dy = mod2(I * Dx * v);
        let x = mod2((s + s) * Dx);
        if ((0, modular_ts_1.isNegativeLE)(x, P))
          x = mod2(-x);
        const y = mod2(u1 * Dy);
        const t = mod2(x * y);
        if (!isValid || (0, modular_ts_1.isNegativeLE)(t, P) || y === _0n2)
          throw new Error(emsg);
        return new RistPoint(new exports.ed25519.ExtendedPoint(x, y, _1n2, t));
      }
      static msm(points, scalars) {
        const Fn = (0, modular_ts_1.Field)(exports.ed25519.CURVE.n, exports.ed25519.CURVE.nBitLength);
        return (0, curve_ts_1.pippenger)(RistPoint, Fn, points, scalars);
      }
      /**
       * Encodes ristretto point to Uint8Array.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
       */
      toRawBytes() {
        let { ex: x, ey: y, ez: z, et: t } = this.ep;
        const P = exports.ed25519.CURVE.Fp.ORDER;
        const mod2 = exports.ed25519.CURVE.Fp.create;
        const u1 = mod2(mod2(z + y) * mod2(z - y));
        const u2 = mod2(x * y);
        const u2sq = mod2(u2 * u2);
        const { value: invsqrt } = invertSqrt(mod2(u1 * u2sq));
        const D1 = mod2(invsqrt * u1);
        const D2 = mod2(invsqrt * u2);
        const zInv = mod2(D1 * D2 * t);
        let D;
        if ((0, modular_ts_1.isNegativeLE)(t * zInv, P)) {
          let _x = mod2(y * SQRT_M1);
          let _y = mod2(x * SQRT_M1);
          x = _x;
          y = _y;
          D = mod2(D1 * INVSQRT_A_MINUS_D);
        } else {
          D = D2;
        }
        if ((0, modular_ts_1.isNegativeLE)(x * zInv, P))
          y = mod2(-y);
        let s = mod2((z - y) * D);
        if ((0, modular_ts_1.isNegativeLE)(s, P))
          s = mod2(-s);
        return (0, utils_ts_1.numberToBytesLE)(s, 32);
      }
      toHex() {
        return (0, utils_ts_1.bytesToHex)(this.toRawBytes());
      }
      toString() {
        return this.toHex();
      }
      /**
       * Compares two Ristretto points.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
       */
      equals(other) {
        aristp(other);
        const { ex: X1, ey: Y1 } = this.ep;
        const { ex: X2, ey: Y2 } = other.ep;
        const mod2 = exports.ed25519.CURVE.Fp.create;
        const one = mod2(X1 * Y2) === mod2(Y1 * X2);
        const two = mod2(Y1 * Y2) === mod2(X1 * X2);
        return one || two;
      }
      add(other) {
        aristp(other);
        return new RistPoint(this.ep.add(other.ep));
      }
      subtract(other) {
        aristp(other);
        return new RistPoint(this.ep.subtract(other.ep));
      }
      multiply(scalar) {
        return new RistPoint(this.ep.multiply(scalar));
      }
      multiplyUnsafe(scalar) {
        return new RistPoint(this.ep.multiplyUnsafe(scalar));
      }
      double() {
        return new RistPoint(this.ep.double());
      }
      negate() {
        return new RistPoint(this.ep.negate());
      }
    }
    exports.RistrettoPoint = (() => {
      if (!RistPoint.BASE)
        RistPoint.BASE = new RistPoint(exports.ed25519.ExtendedPoint.BASE);
      if (!RistPoint.ZERO)
        RistPoint.ZERO = new RistPoint(exports.ed25519.ExtendedPoint.ZERO);
      return RistPoint;
    })();
    const hashToRistretto255 = (msg, options) => {
      const d = options.DST;
      const DST = typeof d === "string" ? (0, utils_1.utf8ToBytes)(d) : d;
      const uniform_bytes = (0, hash_to_curve_ts_1.expand_message_xmd)(msg, DST, 64, sha2_1.sha512);
      const P = RistPoint.hashToCurve(uniform_bytes);
      return P;
    };
    exports.hashToRistretto255 = hashToRistretto255;
    exports.hash_to_ristretto255 = exports.hashToRistretto255;
  })(ed25519);
  return ed25519;
}
var modular$1 = {};
var utils$1 = {};
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.notImplemented = exports.bitMask = exports.utf8ToBytes = exports.randomBytes = exports.isBytes = exports.hexToBytes = exports.concatBytes = exports.bytesToUtf8 = exports.bytesToHex = exports.anumber = exports.abytes = void 0;
    exports.abool = abool2;
    exports._abool2 = _abool2;
    exports._abytes2 = _abytes2;
    exports.numberToHexUnpadded = numberToHexUnpadded2;
    exports.hexToNumber = hexToNumber2;
    exports.bytesToNumberBE = bytesToNumberBE2;
    exports.bytesToNumberLE = bytesToNumberLE2;
    exports.numberToBytesBE = numberToBytesBE2;
    exports.numberToBytesLE = numberToBytesLE2;
    exports.numberToVarBytesBE = numberToVarBytesBE;
    exports.ensureBytes = ensureBytes2;
    exports.equalBytes = equalBytes2;
    exports.copyBytes = copyBytes;
    exports.asciiToBytes = asciiToBytes;
    exports.inRange = inRange2;
    exports.aInRange = aInRange2;
    exports.bitLen = bitLen2;
    exports.bitGet = bitGet;
    exports.bitSet = bitSet;
    exports.createHmacDrbg = createHmacDrbg2;
    exports.validateObject = validateObject2;
    exports.isHash = isHash;
    exports._validateObject = _validateObject;
    exports.memoized = memoized2;
    const utils_js_1 = /* @__PURE__ */ requireUtils$4();
    var utils_js_2 = /* @__PURE__ */ requireUtils$4();
    Object.defineProperty(exports, "abytes", { enumerable: true, get: function() {
      return utils_js_2.abytes;
    } });
    Object.defineProperty(exports, "anumber", { enumerable: true, get: function() {
      return utils_js_2.anumber;
    } });
    Object.defineProperty(exports, "bytesToHex", { enumerable: true, get: function() {
      return utils_js_2.bytesToHex;
    } });
    Object.defineProperty(exports, "bytesToUtf8", { enumerable: true, get: function() {
      return utils_js_2.bytesToUtf8;
    } });
    Object.defineProperty(exports, "concatBytes", { enumerable: true, get: function() {
      return utils_js_2.concatBytes;
    } });
    Object.defineProperty(exports, "hexToBytes", { enumerable: true, get: function() {
      return utils_js_2.hexToBytes;
    } });
    Object.defineProperty(exports, "isBytes", { enumerable: true, get: function() {
      return utils_js_2.isBytes;
    } });
    Object.defineProperty(exports, "randomBytes", { enumerable: true, get: function() {
      return utils_js_2.randomBytes;
    } });
    Object.defineProperty(exports, "utf8ToBytes", { enumerable: true, get: function() {
      return utils_js_2.utf8ToBytes;
    } });
    const _0n2 = /* @__PURE__ */ BigInt(0);
    const _1n2 = /* @__PURE__ */ BigInt(1);
    function abool2(title, value) {
      if (typeof value !== "boolean")
        throw new Error(title + " boolean expected, got " + value);
    }
    function _abool2(value, title = "") {
      if (typeof value !== "boolean") {
        const prefix = title && `"${title}"`;
        throw new Error(prefix + "expected boolean, got type=" + typeof value);
      }
      return value;
    }
    function _abytes2(value, length, title = "") {
      const bytes = (0, utils_js_1.isBytes)(value);
      const len = value?.length;
      const needsLen = length !== void 0;
      if (!bytes || needsLen && len !== length) {
        const prefix = title && `"${title}" `;
        const ofLen = needsLen ? ` of length ${length}` : "";
        const got = bytes ? `length=${len}` : `type=${typeof value}`;
        throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
      }
      return value;
    }
    function numberToHexUnpadded2(num) {
      const hex = num.toString(16);
      return hex.length & 1 ? "0" + hex : hex;
    }
    function hexToNumber2(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      return hex === "" ? _0n2 : BigInt("0x" + hex);
    }
    function bytesToNumberBE2(bytes) {
      return hexToNumber2((0, utils_js_1.bytesToHex)(bytes));
    }
    function bytesToNumberLE2(bytes) {
      (0, utils_js_1.abytes)(bytes);
      return hexToNumber2((0, utils_js_1.bytesToHex)(Uint8Array.from(bytes).reverse()));
    }
    function numberToBytesBE2(n, len) {
      return (0, utils_js_1.hexToBytes)(n.toString(16).padStart(len * 2, "0"));
    }
    function numberToBytesLE2(n, len) {
      return numberToBytesBE2(n, len).reverse();
    }
    function numberToVarBytesBE(n) {
      return (0, utils_js_1.hexToBytes)(numberToHexUnpadded2(n));
    }
    function ensureBytes2(title, hex, expectedLength) {
      let res;
      if (typeof hex === "string") {
        try {
          res = (0, utils_js_1.hexToBytes)(hex);
        } catch (e) {
          throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
        }
      } else if ((0, utils_js_1.isBytes)(hex)) {
        res = Uint8Array.from(hex);
      } else {
        throw new Error(title + " must be hex string or Uint8Array");
      }
      const len = res.length;
      if (typeof expectedLength === "number" && len !== expectedLength)
        throw new Error(title + " of length " + expectedLength + " expected, got " + len);
      return res;
    }
    function equalBytes2(a, b) {
      if (a.length !== b.length)
        return false;
      let diff = 0;
      for (let i = 0; i < a.length; i++)
        diff |= a[i] ^ b[i];
      return diff === 0;
    }
    function copyBytes(bytes) {
      return Uint8Array.from(bytes);
    }
    function asciiToBytes(ascii) {
      return Uint8Array.from(ascii, (c, i) => {
        const charCode = c.charCodeAt(0);
        if (c.length !== 1 || charCode > 127) {
          throw new Error(`string contains non-ASCII character "${ascii[i]}" with code ${charCode} at position ${i}`);
        }
        return charCode;
      });
    }
    const isPosBig2 = (n) => typeof n === "bigint" && _0n2 <= n;
    function inRange2(n, min, max) {
      return isPosBig2(n) && isPosBig2(min) && isPosBig2(max) && min <= n && n < max;
    }
    function aInRange2(title, n, min, max) {
      if (!inRange2(n, min, max))
        throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
    }
    function bitLen2(n) {
      let len;
      for (len = 0; n > _0n2; n >>= _1n2, len += 1)
        ;
      return len;
    }
    function bitGet(n, pos) {
      return n >> BigInt(pos) & _1n2;
    }
    function bitSet(n, pos, value) {
      return n | (value ? _1n2 : _0n2) << BigInt(pos);
    }
    const bitMask2 = (n) => (_1n2 << BigInt(n)) - _1n2;
    exports.bitMask = bitMask2;
    function createHmacDrbg2(hashLen, qByteLen, hmacFn) {
      if (typeof hashLen !== "number" || hashLen < 2)
        throw new Error("hashLen must be a number");
      if (typeof qByteLen !== "number" || qByteLen < 2)
        throw new Error("qByteLen must be a number");
      if (typeof hmacFn !== "function")
        throw new Error("hmacFn must be a function");
      const u8n2 = (len) => new Uint8Array(len);
      const u8of = (byte) => Uint8Array.of(byte);
      let v = u8n2(hashLen);
      let k = u8n2(hashLen);
      let i = 0;
      const reset = () => {
        v.fill(1);
        k.fill(0);
        i = 0;
      };
      const h = (...b) => hmacFn(k, v, ...b);
      const reseed = (seed = u8n2(0)) => {
        k = h(u8of(0), seed);
        v = h();
        if (seed.length === 0)
          return;
        k = h(u8of(1), seed);
        v = h();
      };
      const gen = () => {
        if (i++ >= 1e3)
          throw new Error("drbg: tried 1000 values");
        let len = 0;
        const out = [];
        while (len < qByteLen) {
          v = h();
          const sl = v.slice();
          out.push(sl);
          len += v.length;
        }
        return (0, utils_js_1.concatBytes)(...out);
      };
      const genUntil = (seed, pred) => {
        reset();
        reseed(seed);
        let res = void 0;
        while (!(res = pred(gen())))
          reseed();
        reset();
        return res;
      };
      return genUntil;
    }
    const validatorFns2 = {
      bigint: (val) => typeof val === "bigint",
      function: (val) => typeof val === "function",
      boolean: (val) => typeof val === "boolean",
      string: (val) => typeof val === "string",
      stringOrUint8Array: (val) => typeof val === "string" || (0, utils_js_1.isBytes)(val),
      isSafeInteger: (val) => Number.isSafeInteger(val),
      array: (val) => Array.isArray(val),
      field: (val, object) => object.Fp.isValid(val),
      hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
    };
    function validateObject2(object, validators, optValidators = {}) {
      const checkField = (fieldName, type, isOptional) => {
        const checkVal = validatorFns2[type];
        if (typeof checkVal !== "function")
          throw new Error("invalid validator function");
        const val = object[fieldName];
        if (isOptional && val === void 0)
          return;
        if (!checkVal(val, object)) {
          throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
        }
      };
      for (const [fieldName, type] of Object.entries(validators))
        checkField(fieldName, type, false);
      for (const [fieldName, type] of Object.entries(optValidators))
        checkField(fieldName, type, true);
      return object;
    }
    function isHash(val) {
      return typeof val === "function" && Number.isSafeInteger(val.outputLen);
    }
    function _validateObject(object, fields, optFields = {}) {
      if (!object || typeof object !== "object")
        throw new Error("expected valid options object");
      function checkField(fieldName, expectedType, isOpt) {
        const val = object[fieldName];
        if (isOpt && val === void 0)
          return;
        const current = typeof val;
        if (current !== expectedType || val === null)
          throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
      }
      Object.entries(fields).forEach(([k, v]) => checkField(k, v, false));
      Object.entries(optFields).forEach(([k, v]) => checkField(k, v, true));
    }
    const notImplemented = () => {
      throw new Error("not implemented");
    };
    exports.notImplemented = notImplemented;
    function memoized2(fn) {
      const map = /* @__PURE__ */ new WeakMap();
      return (arg, ...args) => {
        const val = map.get(arg);
        if (val !== void 0)
          return val;
        const computed = fn(arg, ...args);
        map.set(arg, computed);
        return computed;
      };
    }
  })(utils$1);
  return utils$1;
}
var hasRequiredModular$1;
function requireModular$1() {
  if (hasRequiredModular$1) return modular$1;
  hasRequiredModular$1 = 1;
  Object.defineProperty(modular$1, "__esModule", { value: true });
  modular$1.isNegativeLE = void 0;
  modular$1.mod = mod2;
  modular$1.pow = pow3;
  modular$1.pow2 = pow22;
  modular$1.invert = invert2;
  modular$1.tonelliShanks = tonelliShanks2;
  modular$1.FpSqrt = FpSqrt2;
  modular$1.validateField = validateField2;
  modular$1.FpPow = FpPow2;
  modular$1.FpInvertBatch = FpInvertBatch2;
  modular$1.FpDiv = FpDiv;
  modular$1.FpLegendre = FpLegendre2;
  modular$1.FpIsSquare = FpIsSquare;
  modular$1.nLength = nLength2;
  modular$1.Field = Field2;
  modular$1.FpSqrtOdd = FpSqrtOdd;
  modular$1.FpSqrtEven = FpSqrtEven;
  modular$1.hashToPrivateScalar = hashToPrivateScalar;
  modular$1.getFieldBytesLength = getFieldBytesLength2;
  modular$1.getMinHashLength = getMinHashLength2;
  modular$1.mapHashToField = mapHashToField2;
  const utils_ts_1 = /* @__PURE__ */ requireUtils$1();
  const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = /* @__PURE__ */ BigInt(2), _3n2 = /* @__PURE__ */ BigInt(3);
  const _4n2 = /* @__PURE__ */ BigInt(4), _5n2 = /* @__PURE__ */ BigInt(5), _7n = /* @__PURE__ */ BigInt(7);
  const _8n2 = /* @__PURE__ */ BigInt(8), _9n = /* @__PURE__ */ BigInt(9), _16n = /* @__PURE__ */ BigInt(16);
  function mod2(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow3(num, power, modulo) {
    return FpPow2(Field2(modulo), num, power);
  }
  function pow22(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert2(number, modulo) {
    if (number === _0n2)
      throw new Error("invert: expected non-zero number");
    if (modulo <= _0n2)
      throw new Error("invert: expected positive modulus, got " + modulo);
    let a = mod2(number, modulo);
    let b = modulo;
    let x = _0n2, u = _1n2;
    while (a !== _0n2) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      b = a, a = r, x = u, u = m;
    }
    const gcd = b;
    if (gcd !== _1n2)
      throw new Error("invert: does not exist");
    return mod2(x, modulo);
  }
  function assertIsSquare(Fp, root, n) {
    if (!Fp.eql(Fp.sqr(root), n))
      throw new Error("Cannot find square root");
  }
  function sqrt3mod42(Fp, n) {
    const p1div4 = (Fp.ORDER + _1n2) / _4n2;
    const root = Fp.pow(n, p1div4);
    assertIsSquare(Fp, root, n);
    return root;
  }
  function sqrt5mod82(Fp, n) {
    const p5div8 = (Fp.ORDER - _5n2) / _8n2;
    const n2 = Fp.mul(n, _2n2);
    const v = Fp.pow(n2, p5div8);
    const nv = Fp.mul(n, v);
    const i = Fp.mul(Fp.mul(nv, _2n2), v);
    const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
    assertIsSquare(Fp, root, n);
    return root;
  }
  function sqrt9mod16(P) {
    const Fp_ = Field2(P);
    const tn = tonelliShanks2(P);
    const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
    const c2 = tn(Fp_, c1);
    const c3 = tn(Fp_, Fp_.neg(c1));
    const c4 = (P + _7n) / _16n;
    return (Fp, n) => {
      let tv1 = Fp.pow(n, c4);
      let tv2 = Fp.mul(tv1, c1);
      const tv3 = Fp.mul(tv1, c2);
      const tv4 = Fp.mul(tv1, c3);
      const e1 = Fp.eql(Fp.sqr(tv2), n);
      const e2 = Fp.eql(Fp.sqr(tv3), n);
      tv1 = Fp.cmov(tv1, tv2, e1);
      tv2 = Fp.cmov(tv4, tv3, e2);
      const e3 = Fp.eql(Fp.sqr(tv2), n);
      const root = Fp.cmov(tv1, tv2, e3);
      assertIsSquare(Fp, root, n);
      return root;
    };
  }
  function tonelliShanks2(P) {
    if (P < _3n2)
      throw new Error("sqrt is not defined for small field");
    let Q = P - _1n2;
    let S = 0;
    while (Q % _2n2 === _0n2) {
      Q /= _2n2;
      S++;
    }
    let Z = _2n2;
    const _Fp = Field2(P);
    while (FpLegendre2(_Fp, Z) === 1) {
      if (Z++ > 1e3)
        throw new Error("Cannot find square root: probably non-prime P");
    }
    if (S === 1)
      return sqrt3mod42;
    let cc = _Fp.pow(Z, Q);
    const Q1div2 = (Q + _1n2) / _2n2;
    return function tonelliSlow(Fp, n) {
      if (Fp.is0(n))
        return n;
      if (FpLegendre2(Fp, n) !== 1)
        throw new Error("Cannot find square root");
      let M = S;
      let c = Fp.mul(Fp.ONE, cc);
      let t = Fp.pow(n, Q);
      let R = Fp.pow(n, Q1div2);
      while (!Fp.eql(t, Fp.ONE)) {
        if (Fp.is0(t))
          return Fp.ZERO;
        let i = 1;
        let t_tmp = Fp.sqr(t);
        while (!Fp.eql(t_tmp, Fp.ONE)) {
          i++;
          t_tmp = Fp.sqr(t_tmp);
          if (i === M)
            throw new Error("Cannot find square root");
        }
        const exponent = _1n2 << BigInt(M - i - 1);
        const b = Fp.pow(c, exponent);
        M = i;
        c = Fp.sqr(b);
        t = Fp.mul(t, c);
        R = Fp.mul(R, b);
      }
      return R;
    };
  }
  function FpSqrt2(P) {
    if (P % _4n2 === _3n2)
      return sqrt3mod42;
    if (P % _8n2 === _5n2)
      return sqrt5mod82;
    if (P % _16n === _9n)
      return sqrt9mod16(P);
    return tonelliShanks2(P);
  }
  const isNegativeLE = (num, modulo) => (mod2(num, modulo) & _1n2) === _1n2;
  modular$1.isNegativeLE = isNegativeLE;
  const FIELD_FIELDS2 = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField2(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "number",
      BITS: "number"
    };
    const opts = FIELD_FIELDS2.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    (0, utils_ts_1._validateObject)(field, opts);
    return field;
  }
  function FpPow2(Fp, num, power) {
    if (power < _0n2)
      throw new Error("invalid exponent, negatives unsupported");
    if (power === _0n2)
      return Fp.ONE;
    if (power === _1n2)
      return num;
    let p = Fp.ONE;
    let d = num;
    while (power > _0n2) {
      if (power & _1n2)
        p = Fp.mul(p, d);
      d = Fp.sqr(d);
      power >>= _1n2;
    }
    return p;
  }
  function FpInvertBatch2(Fp, nums, passZero = false) {
    const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
    const multipliedAcc = nums.reduce((acc, num, i) => {
      if (Fp.is0(num))
        return acc;
      inverted[i] = acc;
      return Fp.mul(acc, num);
    }, Fp.ONE);
    const invertedAcc = Fp.inv(multipliedAcc);
    nums.reduceRight((acc, num, i) => {
      if (Fp.is0(num))
        return acc;
      inverted[i] = Fp.mul(acc, inverted[i]);
      return Fp.mul(acc, num);
    }, invertedAcc);
    return inverted;
  }
  function FpDiv(Fp, lhs, rhs) {
    return Fp.mul(lhs, typeof rhs === "bigint" ? invert2(rhs, Fp.ORDER) : Fp.inv(rhs));
  }
  function FpLegendre2(Fp, n) {
    const p1mod2 = (Fp.ORDER - _1n2) / _2n2;
    const powered = Fp.pow(n, p1mod2);
    const yes = Fp.eql(powered, Fp.ONE);
    const zero = Fp.eql(powered, Fp.ZERO);
    const no = Fp.eql(powered, Fp.neg(Fp.ONE));
    if (!yes && !zero && !no)
      throw new Error("invalid Legendre symbol result");
    return yes ? 1 : zero ? 0 : -1;
  }
  function FpIsSquare(Fp, n) {
    const l = FpLegendre2(Fp, n);
    return l === 1;
  }
  function nLength2(n, nBitLength) {
    if (nBitLength !== void 0)
      (0, utils_ts_1.anumber)(nBitLength);
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field2(ORDER, bitLenOrOpts, isLE = false, opts = {}) {
    if (ORDER <= _0n2)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    let _nbitLength = void 0;
    let _sqrt = void 0;
    let modFromBytes = false;
    let allowedLengths = void 0;
    if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
      if (opts.sqrt || isLE)
        throw new Error("cannot specify opts in two arguments");
      const _opts = bitLenOrOpts;
      if (_opts.BITS)
        _nbitLength = _opts.BITS;
      if (_opts.sqrt)
        _sqrt = _opts.sqrt;
      if (typeof _opts.isLE === "boolean")
        isLE = _opts.isLE;
      if (typeof _opts.modFromBytes === "boolean")
        modFromBytes = _opts.modFromBytes;
      allowedLengths = _opts.allowedLengths;
    } else {
      if (typeof bitLenOrOpts === "number")
        _nbitLength = bitLenOrOpts;
      if (opts.sqrt)
        _sqrt = opts.sqrt;
    }
    const { nBitLength: BITS, nByteLength: BYTES } = nLength2(ORDER, _nbitLength);
    if (BYTES > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let sqrtP;
    const f = Object.freeze({
      ORDER,
      isLE,
      BITS,
      BYTES,
      MASK: (0, utils_ts_1.bitMask)(BITS),
      ZERO: _0n2,
      ONE: _1n2,
      allowedLengths,
      create: (num) => mod2(num, ORDER),
      isValid: (num) => {
        if (typeof num !== "bigint")
          throw new Error("invalid field element: expected bigint, got " + typeof num);
        return _0n2 <= num && num < ORDER;
      },
      is0: (num) => num === _0n2,
      // is valid and invertible
      isValidNot0: (num) => !f.is0(num) && f.isValid(num),
      isOdd: (num) => (num & _1n2) === _1n2,
      neg: (num) => mod2(-num, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num) => mod2(num * num, ORDER),
      add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
      pow: (num, power) => FpPow2(f, num, power),
      div: (lhs, rhs) => mod2(lhs * invert2(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num) => num * num,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num) => invert2(num, ORDER),
      sqrt: _sqrt || ((n) => {
        if (!sqrtP)
          sqrtP = FpSqrt2(ORDER);
        return sqrtP(f, n);
      }),
      toBytes: (num) => isLE ? (0, utils_ts_1.numberToBytesLE)(num, BYTES) : (0, utils_ts_1.numberToBytesBE)(num, BYTES),
      fromBytes: (bytes, skipValidation = true) => {
        if (allowedLengths) {
          if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
            throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
          }
          const padded = new Uint8Array(BYTES);
          padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
          bytes = padded;
        }
        if (bytes.length !== BYTES)
          throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
        let scalar = isLE ? (0, utils_ts_1.bytesToNumberLE)(bytes) : (0, utils_ts_1.bytesToNumberBE)(bytes);
        if (modFromBytes)
          scalar = mod2(scalar, ORDER);
        if (!skipValidation) {
          if (!f.isValid(scalar))
            throw new Error("invalid field element: outside of range 0..ORDER");
        }
        return scalar;
      },
      // TODO: we don't need it here, move out to separate fn
      invertBatch: (lst) => FpInvertBatch2(f, lst),
      // We can't move this out because Fp6, Fp12 implement it
      // and it's unclear what to return in there.
      cmov: (a, b, c) => c ? b : a
    });
    return Object.freeze(f);
  }
  function FpSqrtOdd(Fp, elm) {
    if (!Fp.isOdd)
      throw new Error("Field doesn't have isOdd");
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? root : Fp.neg(root);
  }
  function FpSqrtEven(Fp, elm) {
    if (!Fp.isOdd)
      throw new Error("Field doesn't have isOdd");
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? Fp.neg(root) : root;
  }
  function hashToPrivateScalar(hash, groupOrder, isLE = false) {
    hash = (0, utils_ts_1.ensureBytes)("privateHash", hash);
    const hashLen = hash.length;
    const minLen = nLength2(groupOrder).nByteLength + 8;
    if (minLen < 24 || hashLen < minLen || hashLen > 1024)
      throw new Error("hashToPrivateScalar: expected " + minLen + "-1024 bytes of input, got " + hashLen);
    const num = isLE ? (0, utils_ts_1.bytesToNumberLE)(hash) : (0, utils_ts_1.bytesToNumberBE)(hash);
    return mod2(num, groupOrder - _1n2) + _1n2;
  }
  function getFieldBytesLength2(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength2(fieldOrder) {
    const length = getFieldBytesLength2(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField2(key, fieldOrder, isLE = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength2(fieldOrder);
    const minLen = getMinHashLength2(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
    const num = isLE ? (0, utils_ts_1.bytesToNumberLE)(key) : (0, utils_ts_1.bytesToNumberBE)(key);
    const reduced = mod2(num, fieldOrder - _1n2) + _1n2;
    return isLE ? (0, utils_ts_1.numberToBytesLE)(reduced, fieldLen) : (0, utils_ts_1.numberToBytesBE)(reduced, fieldLen);
  }
  return modular$1;
}
var secp256k1$2 = {};
var _shortw_utils$1 = {};
var weierstrass$2 = {};
var curve$1 = {};
var hasRequiredCurve$1;
function requireCurve$1() {
  if (hasRequiredCurve$1) return curve$1;
  hasRequiredCurve$1 = 1;
  Object.defineProperty(curve$1, "__esModule", { value: true });
  curve$1.wNAF = void 0;
  curve$1.negateCt = negateCt;
  curve$1.normalizeZ = normalizeZ;
  curve$1.mulEndoUnsafe = mulEndoUnsafe;
  curve$1.pippenger = pippenger2;
  curve$1.precomputeMSMUnsafe = precomputeMSMUnsafe;
  curve$1.validateBasic = validateBasic2;
  curve$1._createCurveFields = _createCurveFields;
  const utils_ts_1 = /* @__PURE__ */ requireUtils$1();
  const modular_ts_1 = /* @__PURE__ */ requireModular$1();
  const _0n2 = BigInt(0);
  const _1n2 = BigInt(1);
  function negateCt(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
  }
  function normalizeZ(c, points) {
    const invertedZs = (0, modular_ts_1.FpInvertBatch)(c.Fp, points.map((p) => p.Z));
    return points.map((p, i) => c.fromAffine(p.toAffine(invertedZs[i])));
  }
  function validateW2(W, bits) {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
      throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
  }
  function calcWOpts2(W, scalarBits) {
    validateW2(W, scalarBits);
    const windows = Math.ceil(scalarBits / W) + 1;
    const windowSize = 2 ** (W - 1);
    const maxNumber = 2 ** W;
    const mask = (0, utils_ts_1.bitMask)(W);
    const shiftBy = BigInt(W);
    return { windows, windowSize, mask, maxNumber, shiftBy };
  }
  function calcOffsets2(n, window, wOpts) {
    const { windowSize, mask, maxNumber, shiftBy } = wOpts;
    let wbits = Number(n & mask);
    let nextN = n >> shiftBy;
    if (wbits > windowSize) {
      wbits -= maxNumber;
      nextN += _1n2;
    }
    const offsetStart = window * windowSize;
    const offset = offsetStart + Math.abs(wbits) - 1;
    const isZero = wbits === 0;
    const isNeg = wbits < 0;
    const isNegF = window % 2 !== 0;
    const offsetF = offsetStart;
    return { nextN, offset, isZero, isNeg, isNegF, offsetF };
  }
  function validateMSMPoints2(points, c) {
    if (!Array.isArray(points))
      throw new Error("array expected");
    points.forEach((p, i) => {
      if (!(p instanceof c))
        throw new Error("invalid point at index " + i);
    });
  }
  function validateMSMScalars2(scalars, field) {
    if (!Array.isArray(scalars))
      throw new Error("array of scalars expected");
    scalars.forEach((s, i) => {
      if (!field.isValid(s))
        throw new Error("invalid scalar at index " + i);
    });
  }
  const pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
  const pointWindowSizes2 = /* @__PURE__ */ new WeakMap();
  function getW2(P) {
    return pointWindowSizes2.get(P) || 1;
  }
  function assert0(n) {
    if (n !== _0n2)
      throw new Error("invalid wNAF");
  }
  class wNAF2 {
    // Parametrized with a given Point class (not individual point)
    constructor(Point, bits) {
      this.BASE = Point.BASE;
      this.ZERO = Point.ZERO;
      this.Fn = Point.Fn;
      this.bits = bits;
    }
    // non-const time multiplication ladder
    _unsafeLadder(elm, n, p = this.ZERO) {
      let d = elm;
      while (n > _0n2) {
        if (n & _1n2)
          p = p.add(d);
        d = d.double();
        n >>= _1n2;
      }
      return p;
    }
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param point Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(point, W) {
      const { windows, windowSize } = calcWOpts2(W, this.bits);
      const points = [];
      let p = point;
      let base = p;
      for (let window = 0; window < windows; window++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    }
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * More compact implementation:
     * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      if (!this.Fn.isValid(n))
        throw new Error("invalid scalar");
      let p = this.ZERO;
      let f = this.BASE;
      const wo = calcWOpts2(W, this.bits);
      for (let window = 0; window < wo.windows; window++) {
        const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets2(n, window, wo);
        n = nextN;
        if (isZero) {
          f = f.add(negateCt(isNegF, precomputes[offsetF]));
        } else {
          p = p.add(negateCt(isNeg, precomputes[offset]));
        }
      }
      assert0(n);
      return { p, f };
    }
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W, precomputes, n, acc = this.ZERO) {
      const wo = calcWOpts2(W, this.bits);
      for (let window = 0; window < wo.windows; window++) {
        if (n === _0n2)
          break;
        const { nextN, offset, isZero, isNeg } = calcOffsets2(n, window, wo);
        n = nextN;
        if (isZero) {
          continue;
        } else {
          const item = precomputes[offset];
          acc = acc.add(isNeg ? item.negate() : item);
        }
      }
      assert0(n);
      return acc;
    }
    getPrecomputes(W, point, transform) {
      let comp = pointPrecomputes2.get(point);
      if (!comp) {
        comp = this.precomputeWindow(point, W);
        if (W !== 1) {
          if (typeof transform === "function")
            comp = transform(comp);
          pointPrecomputes2.set(point, comp);
        }
      }
      return comp;
    }
    cached(point, scalar, transform) {
      const W = getW2(point);
      return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
    }
    unsafe(point, scalar, transform, prev) {
      const W = getW2(point);
      if (W === 1)
        return this._unsafeLadder(point, scalar, prev);
      return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
    }
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    createCache(P, W) {
      validateW2(W, this.bits);
      pointWindowSizes2.set(P, W);
      pointPrecomputes2.delete(P);
    }
    hasCache(elm) {
      return getW2(elm) !== 1;
    }
  }
  curve$1.wNAF = wNAF2;
  function mulEndoUnsafe(Point, point, k1, k2) {
    let acc = point;
    let p1 = Point.ZERO;
    let p2 = Point.ZERO;
    while (k1 > _0n2 || k2 > _0n2) {
      if (k1 & _1n2)
        p1 = p1.add(acc);
      if (k2 & _1n2)
        p2 = p2.add(acc);
      acc = acc.double();
      k1 >>= _1n2;
      k2 >>= _1n2;
    }
    return { p1, p2 };
  }
  function pippenger2(c, fieldN, points, scalars) {
    validateMSMPoints2(points, c);
    validateMSMScalars2(scalars, fieldN);
    const plength = points.length;
    const slength = scalars.length;
    if (plength !== slength)
      throw new Error("arrays of points and scalars must have equal length");
    const zero = c.ZERO;
    const wbits = (0, utils_ts_1.bitLen)(BigInt(plength));
    let windowSize = 1;
    if (wbits > 12)
      windowSize = wbits - 3;
    else if (wbits > 4)
      windowSize = wbits - 2;
    else if (wbits > 0)
      windowSize = 2;
    const MASK = (0, utils_ts_1.bitMask)(windowSize);
    const buckets = new Array(Number(MASK) + 1).fill(zero);
    const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
    let sum = zero;
    for (let i = lastBits; i >= 0; i -= windowSize) {
      buckets.fill(zero);
      for (let j = 0; j < slength; j++) {
        const scalar = scalars[j];
        const wbits2 = Number(scalar >> BigInt(i) & MASK);
        buckets[wbits2] = buckets[wbits2].add(points[j]);
      }
      let resI = zero;
      for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
        sumI = sumI.add(buckets[j]);
        resI = resI.add(sumI);
      }
      sum = sum.add(resI);
      if (i !== 0)
        for (let j = 0; j < windowSize; j++)
          sum = sum.double();
    }
    return sum;
  }
  function precomputeMSMUnsafe(c, fieldN, points, windowSize) {
    validateW2(windowSize, fieldN.BITS);
    validateMSMPoints2(points, c);
    const zero = c.ZERO;
    const tableSize = 2 ** windowSize - 1;
    const chunks = Math.ceil(fieldN.BITS / windowSize);
    const MASK = (0, utils_ts_1.bitMask)(windowSize);
    const tables = points.map((p) => {
      const res = [];
      for (let i = 0, acc = p; i < tableSize; i++) {
        res.push(acc);
        acc = acc.add(p);
      }
      return res;
    });
    return (scalars) => {
      validateMSMScalars2(scalars, fieldN);
      if (scalars.length > points.length)
        throw new Error("array of scalars must be smaller than array of points");
      let res = zero;
      for (let i = 0; i < chunks; i++) {
        if (res !== zero)
          for (let j = 0; j < windowSize; j++)
            res = res.double();
        const shiftBy = BigInt(chunks * windowSize - (i + 1) * windowSize);
        for (let j = 0; j < scalars.length; j++) {
          const n = scalars[j];
          const curr = Number(n >> shiftBy & MASK);
          if (!curr)
            continue;
          res = res.add(tables[j][curr - 1]);
        }
      }
      return res;
    };
  }
  function validateBasic2(curve2) {
    (0, modular_ts_1.validateField)(curve2.Fp);
    (0, utils_ts_1.validateObject)(curve2, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...(0, modular_ts_1.nLength)(curve2.n, curve2.nBitLength),
      ...curve2,
      ...{ p: curve2.Fp.ORDER }
    });
  }
  function createField(order, field, isLE) {
    if (field) {
      if (field.ORDER !== order)
        throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
      (0, modular_ts_1.validateField)(field);
      return field;
    } else {
      return (0, modular_ts_1.Field)(order, { isLE });
    }
  }
  function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
    if (FpFnLE === void 0)
      FpFnLE = type === "edwards";
    if (!CURVE || typeof CURVE !== "object")
      throw new Error(`expected valid ${type} CURVE object`);
    for (const p of ["p", "n", "h"]) {
      const val = CURVE[p];
      if (!(typeof val === "bigint" && val > _0n2))
        throw new Error(`CURVE.${p} must be positive bigint`);
    }
    const Fp = createField(CURVE.p, curveOpts.Fp, FpFnLE);
    const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
    const _b = type === "weierstrass" ? "b" : "d";
    const params = ["Gx", "Gy", "a", _b];
    for (const p of params) {
      if (!Fp.isValid(CURVE[p]))
        throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
    }
    CURVE = Object.freeze(Object.assign({}, CURVE));
    return { CURVE, Fp, Fn };
  }
  return curve$1;
}
var hasRequiredWeierstrass$1;
function requireWeierstrass$1() {
  if (hasRequiredWeierstrass$1) return weierstrass$2;
  hasRequiredWeierstrass$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DER = exports.DERErr = void 0;
    exports._splitEndoScalar = _splitEndoScalar;
    exports._normFnElement = _normFnElement;
    exports.weierstrassN = weierstrassN;
    exports.SWUFpSqrtRatio = SWUFpSqrtRatio;
    exports.mapToCurveSimpleSWU = mapToCurveSimpleSWU;
    exports.ecdh = ecdh;
    exports.ecdsa = ecdsa;
    exports.weierstrassPoints = weierstrassPoints2;
    exports._legacyHelperEquat = _legacyHelperEquat;
    exports.weierstrass = weierstrass2;
    const hmac_js_1 = /* @__PURE__ */ requireHmac$1();
    const utils_1 = /* @__PURE__ */ requireUtils$4();
    const utils_ts_1 = /* @__PURE__ */ requireUtils$1();
    const curve_ts_1 = /* @__PURE__ */ requireCurve$1();
    const modular_ts_1 = /* @__PURE__ */ requireModular$1();
    const divNearest2 = (num, den) => (num + (num >= 0 ? den : -den) / _2n2) / den;
    function _splitEndoScalar(k, basis, n) {
      const [[a1, b1], [a2, b2]] = basis;
      const c1 = divNearest2(b2 * k, n);
      const c2 = divNearest2(-b1 * k, n);
      let k1 = k - c1 * a1 - c2 * a2;
      let k2 = -c1 * b1 - c2 * b2;
      const k1neg = k1 < _0n2;
      const k2neg = k2 < _0n2;
      if (k1neg)
        k1 = -k1;
      if (k2neg)
        k2 = -k2;
      const MAX_NUM = (0, utils_ts_1.bitMask)(Math.ceil((0, utils_ts_1.bitLen)(n) / 2)) + _1n2;
      if (k1 < _0n2 || k1 >= MAX_NUM || k2 < _0n2 || k2 >= MAX_NUM) {
        throw new Error("splitScalar (endomorphism): failed, k=" + k);
      }
      return { k1neg, k1, k2neg, k2 };
    }
    function validateSigFormat(format) {
      if (!["compact", "recovered", "der"].includes(format))
        throw new Error('Signature format must be "compact", "recovered", or "der"');
      return format;
    }
    function validateSigOpts(opts, def) {
      const optsn = {};
      for (let optName of Object.keys(def)) {
        optsn[optName] = opts[optName] === void 0 ? def[optName] : opts[optName];
      }
      (0, utils_ts_1._abool2)(optsn.lowS, "lowS");
      (0, utils_ts_1._abool2)(optsn.prehash, "prehash");
      if (optsn.format !== void 0)
        validateSigFormat(optsn.format);
      return optsn;
    }
    class DERErr3 extends Error {
      constructor(m = "") {
        super(m);
      }
    }
    exports.DERErr = DERErr3;
    exports.DER = {
      // asn.1 DER encoding utils
      Err: DERErr3,
      // Basic building block is TLV (Tag-Length-Value)
      _tlv: {
        encode: (tag, data) => {
          const { Err: E } = exports.DER;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length & 1)
            throw new E("tlv.encode: unpadded data");
          const dataLen = data.length / 2;
          const len = (0, utils_ts_1.numberToHexUnpadded)(dataLen);
          if (len.length / 2 & 128)
            throw new E("tlv.encode: long form length too big");
          const lenLen = dataLen > 127 ? (0, utils_ts_1.numberToHexUnpadded)(len.length / 2 | 128) : "";
          const t = (0, utils_ts_1.numberToHexUnpadded)(tag);
          return t + lenLen + len + data;
        },
        // v - value, l - left bytes (unparsed)
        decode(tag, data) {
          const { Err: E } = exports.DER;
          let pos = 0;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length < 2 || data[pos++] !== tag)
            throw new E("tlv.decode: wrong tlv");
          const first = data[pos++];
          const isLong = !!(first & 128);
          let length = 0;
          if (!isLong)
            length = first;
          else {
            const lenLen = first & 127;
            if (!lenLen)
              throw new E("tlv.decode(long): indefinite length not supported");
            if (lenLen > 4)
              throw new E("tlv.decode(long): byte length is too big");
            const lengthBytes = data.subarray(pos, pos + lenLen);
            if (lengthBytes.length !== lenLen)
              throw new E("tlv.decode: length bytes not complete");
            if (lengthBytes[0] === 0)
              throw new E("tlv.decode(long): zero leftmost byte");
            for (const b of lengthBytes)
              length = length << 8 | b;
            pos += lenLen;
            if (length < 128)
              throw new E("tlv.decode(long): not minimal encoding");
          }
          const v = data.subarray(pos, pos + length);
          if (v.length !== length)
            throw new E("tlv.decode: wrong value length");
          return { v, l: data.subarray(pos + length) };
        }
      },
      // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
      // since we always use positive integers here. It must always be empty:
      // - add zero byte if exists
      // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
      _int: {
        encode(num) {
          const { Err: E } = exports.DER;
          if (num < _0n2)
            throw new E("integer: negative integers are not allowed");
          let hex = (0, utils_ts_1.numberToHexUnpadded)(num);
          if (Number.parseInt(hex[0], 16) & 8)
            hex = "00" + hex;
          if (hex.length & 1)
            throw new E("unexpected DER parsing assertion: unpadded hex");
          return hex;
        },
        decode(data) {
          const { Err: E } = exports.DER;
          if (data[0] & 128)
            throw new E("invalid signature integer: negative");
          if (data[0] === 0 && !(data[1] & 128))
            throw new E("invalid signature integer: unnecessary leading zero");
          return (0, utils_ts_1.bytesToNumberBE)(data);
        }
      },
      toSig(hex) {
        const { Err: E, _int: int, _tlv: tlv } = exports.DER;
        const data = (0, utils_ts_1.ensureBytes)("signature", hex);
        const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
        if (seqLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
        const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
        if (sLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        return { r: int.decode(rBytes), s: int.decode(sBytes) };
      },
      hexFromSig(sig) {
        const { _tlv: tlv, _int: int } = exports.DER;
        const rs = tlv.encode(2, int.encode(sig.r));
        const ss = tlv.encode(2, int.encode(sig.s));
        const seq = rs + ss;
        return tlv.encode(48, seq);
      }
    };
    const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _3n2 = BigInt(3), _4n2 = BigInt(4);
    function _normFnElement(Fn, key) {
      const { BYTES: expected } = Fn;
      let num;
      if (typeof key === "bigint") {
        num = key;
      } else {
        let bytes = (0, utils_ts_1.ensureBytes)("private key", key);
        try {
          num = Fn.fromBytes(bytes);
        } catch (error) {
          throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
        }
      }
      if (!Fn.isValidNot0(num))
        throw new Error("invalid private key: out of range [1..N-1]");
      return num;
    }
    function weierstrassN(params, extraOpts = {}) {
      const validated = (0, curve_ts_1._createCurveFields)("weierstrass", params, extraOpts);
      const { Fp, Fn } = validated;
      let CURVE = validated.CURVE;
      const { h: cofactor, n: CURVE_ORDER } = CURVE;
      (0, utils_ts_1._validateObject)(extraOpts, {}, {
        allowInfinityPoint: "boolean",
        clearCofactor: "function",
        isTorsionFree: "function",
        fromBytes: "function",
        toBytes: "function",
        endo: "object",
        wrapPrivateKey: "boolean"
      });
      const { endo } = extraOpts;
      if (endo) {
        if (!Fp.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
          throw new Error('invalid endo: expected "beta": bigint and "basises": array');
        }
      }
      const lengths = getWLengths(Fp, Fn);
      function assertCompressionIsSupported() {
        if (!Fp.isOdd)
          throw new Error("compression is not supported: Field does not have .isOdd()");
      }
      function pointToBytes(_c, point, isCompressed) {
        const { x, y } = point.toAffine();
        const bx = Fp.toBytes(x);
        (0, utils_ts_1._abool2)(isCompressed, "isCompressed");
        if (isCompressed) {
          assertCompressionIsSupported();
          const hasEvenY = !Fp.isOdd(y);
          return (0, utils_ts_1.concatBytes)(pprefix(hasEvenY), bx);
        } else {
          return (0, utils_ts_1.concatBytes)(Uint8Array.of(4), bx, Fp.toBytes(y));
        }
      }
      function pointFromBytes(bytes) {
        (0, utils_ts_1._abytes2)(bytes, void 0, "Point");
        const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
        const length = bytes.length;
        const head = bytes[0];
        const tail = bytes.subarray(1);
        if (length === comp && (head === 2 || head === 3)) {
          const x = Fp.fromBytes(tail);
          if (!Fp.isValid(x))
            throw new Error("bad point: is not on curve, wrong x");
          const y2 = weierstrassEquation(x);
          let y;
          try {
            y = Fp.sqrt(y2);
          } catch (sqrtError) {
            const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
            throw new Error("bad point: is not on curve, sqrt error" + err);
          }
          assertCompressionIsSupported();
          const isYOdd = Fp.isOdd(y);
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y = Fp.neg(y);
          return { x, y };
        } else if (length === uncomp && head === 4) {
          const L = Fp.BYTES;
          const x = Fp.fromBytes(tail.subarray(0, L));
          const y = Fp.fromBytes(tail.subarray(L, L * 2));
          if (!isValidXY(x, y))
            throw new Error("bad point: is not on curve");
          return { x, y };
        } else {
          throw new Error(`bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`);
        }
      }
      const encodePoint = extraOpts.toBytes || pointToBytes;
      const decodePoint = extraOpts.fromBytes || pointFromBytes;
      function weierstrassEquation(x) {
        const x2 = Fp.sqr(x);
        const x3 = Fp.mul(x2, x);
        return Fp.add(Fp.add(x3, Fp.mul(x, CURVE.a)), CURVE.b);
      }
      function isValidXY(x, y) {
        const left = Fp.sqr(y);
        const right = weierstrassEquation(x);
        return Fp.eql(left, right);
      }
      if (!isValidXY(CURVE.Gx, CURVE.Gy))
        throw new Error("bad curve params: generator point");
      const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n2), _4n2);
      const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
      if (Fp.is0(Fp.add(_4a3, _27b2)))
        throw new Error("bad curve params: a or b");
      function acoord(title, n, banZero = false) {
        if (!Fp.isValid(n) || banZero && Fp.is0(n))
          throw new Error(`bad point coordinate ${title}`);
        return n;
      }
      function aprjpoint(other) {
        if (!(other instanceof Point))
          throw new Error("ProjectivePoint expected");
      }
      function splitEndoScalarN(k) {
        if (!endo || !endo.basises)
          throw new Error("no endo");
        return _splitEndoScalar(k, endo.basises, Fn.ORDER);
      }
      const toAffineMemo = (0, utils_ts_1.memoized)((p, iz) => {
        const { X, Y, Z } = p;
        if (Fp.eql(Z, Fp.ONE))
          return { x: X, y: Y };
        const is0 = p.is0();
        if (iz == null)
          iz = is0 ? Fp.ONE : Fp.inv(Z);
        const x = Fp.mul(X, iz);
        const y = Fp.mul(Y, iz);
        const zz = Fp.mul(Z, iz);
        if (is0)
          return { x: Fp.ZERO, y: Fp.ZERO };
        if (!Fp.eql(zz, Fp.ONE))
          throw new Error("invZ was invalid");
        return { x, y };
      });
      const assertValidMemo = (0, utils_ts_1.memoized)((p) => {
        if (p.is0()) {
          if (extraOpts.allowInfinityPoint && !Fp.is0(p.Y))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x, y } = p.toAffine();
        if (!Fp.isValid(x) || !Fp.isValid(y))
          throw new Error("bad point: x or y not field elements");
        if (!isValidXY(x, y))
          throw new Error("bad point: equation left != right");
        if (!p.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
        return true;
      });
      function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
        k2p = new Point(Fp.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
        k1p = (0, curve_ts_1.negateCt)(k1neg, k1p);
        k2p = (0, curve_ts_1.negateCt)(k2neg, k2p);
        return k1p.add(k2p);
      }
      class Point {
        /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
        constructor(X, Y, Z) {
          this.X = acoord("x", X);
          this.Y = acoord("y", Y, true);
          this.Z = acoord("z", Z);
          Object.freeze(this);
        }
        static CURVE() {
          return CURVE;
        }
        /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
        static fromAffine(p) {
          const { x, y } = p || {};
          if (!p || !Fp.isValid(x) || !Fp.isValid(y))
            throw new Error("invalid affine point");
          if (p instanceof Point)
            throw new Error("projective point not allowed");
          if (Fp.is0(x) && Fp.is0(y))
            return Point.ZERO;
          return new Point(x, y, Fp.ONE);
        }
        static fromBytes(bytes) {
          const P = Point.fromAffine(decodePoint((0, utils_ts_1._abytes2)(bytes, void 0, "point")));
          P.assertValidity();
          return P;
        }
        static fromHex(hex) {
          return Point.fromBytes((0, utils_ts_1.ensureBytes)("pointHex", hex));
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        /**
         *
         * @param windowSize
         * @param isLazy true will defer table computation until the first multiplication
         * @returns
         */
        precompute(windowSize = 8, isLazy = true) {
          wnaf.createCache(this, windowSize);
          if (!isLazy)
            this.multiply(_3n2);
          return this;
        }
        // TODO: return `this`
        /** A point on curve is valid if it conforms to equation. */
        assertValidity() {
          assertValidMemo(this);
        }
        hasEvenY() {
          const { y } = this.toAffine();
          if (!Fp.isOdd)
            throw new Error("Field doesn't support isOdd");
          return !Fp.isOdd(y);
        }
        /** Compare one point to another. */
        equals(other) {
          aprjpoint(other);
          const { X: X1, Y: Y1, Z: Z1 } = this;
          const { X: X2, Y: Y2, Z: Z2 } = other;
          const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
          const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
          return U1 && U2;
        }
        /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
        negate() {
          return new Point(this.X, Fp.neg(this.Y), this.Z);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
          const { a, b } = CURVE;
          const b3 = Fp.mul(b, _3n2);
          const { X: X1, Y: Y1, Z: Z1 } = this;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          let t0 = Fp.mul(X1, X1);
          let t1 = Fp.mul(Y1, Y1);
          let t2 = Fp.mul(Z1, Z1);
          let t3 = Fp.mul(X1, Y1);
          t3 = Fp.add(t3, t3);
          Z3 = Fp.mul(X1, Z1);
          Z3 = Fp.add(Z3, Z3);
          X3 = Fp.mul(a, Z3);
          Y3 = Fp.mul(b3, t2);
          Y3 = Fp.add(X3, Y3);
          X3 = Fp.sub(t1, Y3);
          Y3 = Fp.add(t1, Y3);
          Y3 = Fp.mul(X3, Y3);
          X3 = Fp.mul(t3, X3);
          Z3 = Fp.mul(b3, Z3);
          t2 = Fp.mul(a, t2);
          t3 = Fp.sub(t0, t2);
          t3 = Fp.mul(a, t3);
          t3 = Fp.add(t3, Z3);
          Z3 = Fp.add(t0, t0);
          t0 = Fp.add(Z3, t0);
          t0 = Fp.add(t0, t2);
          t0 = Fp.mul(t0, t3);
          Y3 = Fp.add(Y3, t0);
          t2 = Fp.mul(Y1, Z1);
          t2 = Fp.add(t2, t2);
          t0 = Fp.mul(t2, t3);
          X3 = Fp.sub(X3, t0);
          Z3 = Fp.mul(t2, t1);
          Z3 = Fp.add(Z3, Z3);
          Z3 = Fp.add(Z3, Z3);
          return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
          aprjpoint(other);
          const { X: X1, Y: Y1, Z: Z1 } = this;
          const { X: X2, Y: Y2, Z: Z2 } = other;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          const a = CURVE.a;
          const b3 = Fp.mul(CURVE.b, _3n2);
          let t0 = Fp.mul(X1, X2);
          let t1 = Fp.mul(Y1, Y2);
          let t2 = Fp.mul(Z1, Z2);
          let t3 = Fp.add(X1, Y1);
          let t4 = Fp.add(X2, Y2);
          t3 = Fp.mul(t3, t4);
          t4 = Fp.add(t0, t1);
          t3 = Fp.sub(t3, t4);
          t4 = Fp.add(X1, Z1);
          let t5 = Fp.add(X2, Z2);
          t4 = Fp.mul(t4, t5);
          t5 = Fp.add(t0, t2);
          t4 = Fp.sub(t4, t5);
          t5 = Fp.add(Y1, Z1);
          X3 = Fp.add(Y2, Z2);
          t5 = Fp.mul(t5, X3);
          X3 = Fp.add(t1, t2);
          t5 = Fp.sub(t5, X3);
          Z3 = Fp.mul(a, t4);
          X3 = Fp.mul(b3, t2);
          Z3 = Fp.add(X3, Z3);
          X3 = Fp.sub(t1, Z3);
          Z3 = Fp.add(t1, Z3);
          Y3 = Fp.mul(X3, Z3);
          t1 = Fp.add(t0, t0);
          t1 = Fp.add(t1, t0);
          t2 = Fp.mul(a, t2);
          t4 = Fp.mul(b3, t4);
          t1 = Fp.add(t1, t2);
          t2 = Fp.sub(t0, t2);
          t2 = Fp.mul(a, t2);
          t4 = Fp.add(t4, t2);
          t0 = Fp.mul(t1, t4);
          Y3 = Fp.add(Y3, t0);
          t0 = Fp.mul(t5, t4);
          X3 = Fp.mul(t3, X3);
          X3 = Fp.sub(X3, t0);
          t0 = Fp.mul(t3, t1);
          Z3 = Fp.mul(t5, Z3);
          Z3 = Fp.add(Z3, t0);
          return new Point(X3, Y3, Z3);
        }
        subtract(other) {
          return this.add(other.negate());
        }
        is0() {
          return this.equals(Point.ZERO);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(scalar) {
          const { endo: endo2 } = extraOpts;
          if (!Fn.isValidNot0(scalar))
            throw new Error("invalid scalar: out of range");
          let point, fake;
          const mul = (n) => wnaf.cached(this, n, (p) => (0, curve_ts_1.normalizeZ)(Point, p));
          if (endo2) {
            const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
            const { p: k1p, f: k1f } = mul(k1);
            const { p: k2p, f: k2f } = mul(k2);
            fake = k1f.add(k2f);
            point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
          } else {
            const { p, f } = mul(scalar);
            point = p;
            fake = f;
          }
          return (0, curve_ts_1.normalizeZ)(Point, [point, fake])[0];
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed secret key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(sc) {
          const { endo: endo2 } = extraOpts;
          const p = this;
          if (!Fn.isValid(sc))
            throw new Error("invalid scalar: out of range");
          if (sc === _0n2 || p.is0())
            return Point.ZERO;
          if (sc === _1n2)
            return p;
          if (wnaf.hasCache(this))
            return this.multiply(sc);
          if (endo2) {
            const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
            const { p1, p2 } = (0, curve_ts_1.mulEndoUnsafe)(Point, p, k1, k2);
            return finishEndo(endo2.beta, p1, p2, k1neg, k2neg);
          } else {
            return wnaf.unsafe(p, sc);
          }
        }
        multiplyAndAddUnsafe(Q, a, b) {
          const sum = this.multiplyUnsafe(a).add(Q.multiplyUnsafe(b));
          return sum.is0() ? void 0 : sum;
        }
        /**
         * Converts Projective point to affine (x, y) coordinates.
         * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
         */
        toAffine(invertedZ) {
          return toAffineMemo(this, invertedZ);
        }
        /**
         * Checks whether Point is free of torsion elements (is in prime subgroup).
         * Always torsion-free for cofactor=1 curves.
         */
        isTorsionFree() {
          const { isTorsionFree } = extraOpts;
          if (cofactor === _1n2)
            return true;
          if (isTorsionFree)
            return isTorsionFree(Point, this);
          return wnaf.unsafe(this, CURVE_ORDER).is0();
        }
        clearCofactor() {
          const { clearCofactor } = extraOpts;
          if (cofactor === _1n2)
            return this;
          if (clearCofactor)
            return clearCofactor(Point, this);
          return this.multiplyUnsafe(cofactor);
        }
        isSmallOrder() {
          return this.multiplyUnsafe(cofactor).is0();
        }
        toBytes(isCompressed = true) {
          (0, utils_ts_1._abool2)(isCompressed, "isCompressed");
          this.assertValidity();
          return encodePoint(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
          return (0, utils_ts_1.bytesToHex)(this.toBytes(isCompressed));
        }
        toString() {
          return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
        }
        // TODO: remove
        get px() {
          return this.X;
        }
        get py() {
          return this.X;
        }
        get pz() {
          return this.Z;
        }
        toRawBytes(isCompressed = true) {
          return this.toBytes(isCompressed);
        }
        _setWindowSize(windowSize) {
          this.precompute(windowSize);
        }
        static normalizeZ(points) {
          return (0, curve_ts_1.normalizeZ)(Point, points);
        }
        static msm(points, scalars) {
          return (0, curve_ts_1.pippenger)(Point, Fn, points, scalars);
        }
        static fromPrivateKey(privateKey) {
          return Point.BASE.multiply(_normFnElement(Fn, privateKey));
        }
      }
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
      Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
      Point.Fp = Fp;
      Point.Fn = Fn;
      const bits = Fn.BITS;
      const wnaf = new curve_ts_1.wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
      Point.BASE.precompute(8);
      return Point;
    }
    function pprefix(hasEvenY) {
      return Uint8Array.of(hasEvenY ? 2 : 3);
    }
    function SWUFpSqrtRatio(Fp, Z) {
      const q = Fp.ORDER;
      let l = _0n2;
      for (let o = q - _1n2; o % _2n2 === _0n2; o /= _2n2)
        l += _1n2;
      const c1 = l;
      const _2n_pow_c1_1 = _2n2 << c1 - _1n2 - _1n2;
      const _2n_pow_c1 = _2n_pow_c1_1 * _2n2;
      const c2 = (q - _1n2) / _2n_pow_c1;
      const c3 = (c2 - _1n2) / _2n2;
      const c4 = _2n_pow_c1 - _1n2;
      const c5 = _2n_pow_c1_1;
      const c6 = Fp.pow(Z, c2);
      const c7 = Fp.pow(Z, (c2 + _1n2) / _2n2);
      let sqrtRatio = (u, v) => {
        let tv1 = c6;
        let tv2 = Fp.pow(v, c4);
        let tv3 = Fp.sqr(tv2);
        tv3 = Fp.mul(tv3, v);
        let tv5 = Fp.mul(u, tv3);
        tv5 = Fp.pow(tv5, c3);
        tv5 = Fp.mul(tv5, tv2);
        tv2 = Fp.mul(tv5, v);
        tv3 = Fp.mul(tv5, u);
        let tv4 = Fp.mul(tv3, tv2);
        tv5 = Fp.pow(tv4, c5);
        let isQR = Fp.eql(tv5, Fp.ONE);
        tv2 = Fp.mul(tv3, c7);
        tv5 = Fp.mul(tv4, tv1);
        tv3 = Fp.cmov(tv2, tv3, isQR);
        tv4 = Fp.cmov(tv5, tv4, isQR);
        for (let i = c1; i > _1n2; i--) {
          let tv52 = i - _2n2;
          tv52 = _2n2 << tv52 - _1n2;
          let tvv5 = Fp.pow(tv4, tv52);
          const e1 = Fp.eql(tvv5, Fp.ONE);
          tv2 = Fp.mul(tv3, tv1);
          tv1 = Fp.mul(tv1, tv1);
          tvv5 = Fp.mul(tv4, tv1);
          tv3 = Fp.cmov(tv2, tv3, e1);
          tv4 = Fp.cmov(tvv5, tv4, e1);
        }
        return { isValid: isQR, value: tv3 };
      };
      if (Fp.ORDER % _4n2 === _3n2) {
        const c12 = (Fp.ORDER - _3n2) / _4n2;
        const c22 = Fp.sqrt(Fp.neg(Z));
        sqrtRatio = (u, v) => {
          let tv1 = Fp.sqr(v);
          const tv2 = Fp.mul(u, v);
          tv1 = Fp.mul(tv1, tv2);
          let y1 = Fp.pow(tv1, c12);
          y1 = Fp.mul(y1, tv2);
          const y2 = Fp.mul(y1, c22);
          const tv3 = Fp.mul(Fp.sqr(y1), v);
          const isQR = Fp.eql(tv3, u);
          let y = Fp.cmov(y2, y1, isQR);
          return { isValid: isQR, value: y };
        };
      }
      return sqrtRatio;
    }
    function mapToCurveSimpleSWU(Fp, opts) {
      (0, modular_ts_1.validateField)(Fp);
      const { A, B, Z } = opts;
      if (!Fp.isValid(A) || !Fp.isValid(B) || !Fp.isValid(Z))
        throw new Error("mapToCurveSimpleSWU: invalid opts");
      const sqrtRatio = SWUFpSqrtRatio(Fp, Z);
      if (!Fp.isOdd)
        throw new Error("Field does not have .isOdd()");
      return (u) => {
        let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
        tv1 = Fp.sqr(u);
        tv1 = Fp.mul(tv1, Z);
        tv2 = Fp.sqr(tv1);
        tv2 = Fp.add(tv2, tv1);
        tv3 = Fp.add(tv2, Fp.ONE);
        tv3 = Fp.mul(tv3, B);
        tv4 = Fp.cmov(Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
        tv4 = Fp.mul(tv4, A);
        tv2 = Fp.sqr(tv3);
        tv6 = Fp.sqr(tv4);
        tv5 = Fp.mul(tv6, A);
        tv2 = Fp.add(tv2, tv5);
        tv2 = Fp.mul(tv2, tv3);
        tv6 = Fp.mul(tv6, tv4);
        tv5 = Fp.mul(tv6, B);
        tv2 = Fp.add(tv2, tv5);
        x = Fp.mul(tv1, tv3);
        const { isValid, value } = sqrtRatio(tv2, tv6);
        y = Fp.mul(tv1, u);
        y = Fp.mul(y, value);
        x = Fp.cmov(x, tv3, isValid);
        y = Fp.cmov(y, value, isValid);
        const e1 = Fp.isOdd(u) === Fp.isOdd(y);
        y = Fp.cmov(Fp.neg(y), y, e1);
        const tv4_inv = (0, modular_ts_1.FpInvertBatch)(Fp, [tv4], true)[0];
        x = Fp.mul(x, tv4_inv);
        return { x, y };
      };
    }
    function getWLengths(Fp, Fn) {
      return {
        secretKey: Fn.BYTES,
        publicKey: 1 + Fp.BYTES,
        publicKeyUncompressed: 1 + 2 * Fp.BYTES,
        publicKeyHasPrefix: true,
        signature: 2 * Fn.BYTES
      };
    }
    function ecdh(Point, ecdhOpts = {}) {
      const { Fn } = Point;
      const randomBytes_ = ecdhOpts.randomBytes || utils_ts_1.randomBytes;
      const lengths = Object.assign(getWLengths(Point.Fp, Fn), { seed: (0, modular_ts_1.getMinHashLength)(Fn.ORDER) });
      function isValidSecretKey(secretKey) {
        try {
          return !!_normFnElement(Fn, secretKey);
        } catch (error) {
          return false;
        }
      }
      function isValidPublicKey(publicKey, isCompressed) {
        const { publicKey: comp, publicKeyUncompressed } = lengths;
        try {
          const l = publicKey.length;
          if (isCompressed === true && l !== comp)
            return false;
          if (isCompressed === false && l !== publicKeyUncompressed)
            return false;
          return !!Point.fromBytes(publicKey);
        } catch (error) {
          return false;
        }
      }
      function randomSecretKey(seed = randomBytes_(lengths.seed)) {
        return (0, modular_ts_1.mapHashToField)((0, utils_ts_1._abytes2)(seed, lengths.seed, "seed"), Fn.ORDER);
      }
      function getPublicKey(secretKey, isCompressed = true) {
        return Point.BASE.multiply(_normFnElement(Fn, secretKey)).toBytes(isCompressed);
      }
      function keygen(seed) {
        const secretKey = randomSecretKey(seed);
        return { secretKey, publicKey: getPublicKey(secretKey) };
      }
      function isProbPub(item) {
        if (typeof item === "bigint")
          return false;
        if (item instanceof Point)
          return true;
        const { secretKey, publicKey, publicKeyUncompressed } = lengths;
        if (Fn.allowedLengths || secretKey === publicKey)
          return void 0;
        const l = (0, utils_ts_1.ensureBytes)("key", item).length;
        return l === publicKey || l === publicKeyUncompressed;
      }
      function getSharedSecret(secretKeyA, publicKeyB, isCompressed = true) {
        if (isProbPub(secretKeyA) === true)
          throw new Error("first arg must be private key");
        if (isProbPub(publicKeyB) === false)
          throw new Error("second arg must be public key");
        const s = _normFnElement(Fn, secretKeyA);
        const b = Point.fromHex(publicKeyB);
        return b.multiply(s).toBytes(isCompressed);
      }
      const utils2 = {
        isValidSecretKey,
        isValidPublicKey,
        randomSecretKey,
        // TODO: remove
        isValidPrivateKey: isValidSecretKey,
        randomPrivateKey: randomSecretKey,
        normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
        precompute(windowSize = 8, point = Point.BASE) {
          return point.precompute(windowSize, false);
        }
      };
      return Object.freeze({ getPublicKey, getSharedSecret, keygen, Point, utils: utils2, lengths });
    }
    function ecdsa(Point, hash, ecdsaOpts = {}) {
      (0, utils_1.ahash)(hash);
      (0, utils_ts_1._validateObject)(ecdsaOpts, {}, {
        hmac: "function",
        lowS: "boolean",
        randomBytes: "function",
        bits2int: "function",
        bits2int_modN: "function"
      });
      const randomBytes2 = ecdsaOpts.randomBytes || utils_ts_1.randomBytes;
      const hmac2 = ecdsaOpts.hmac || ((key, ...msgs) => (0, hmac_js_1.hmac)(hash, key, (0, utils_ts_1.concatBytes)(...msgs)));
      const { Fp, Fn } = Point;
      const { ORDER: CURVE_ORDER, BITS: fnBits } = Fn;
      const { keygen, getPublicKey, getSharedSecret, utils: utils2, lengths } = ecdh(Point, ecdsaOpts);
      const defaultSigOpts = {
        prehash: false,
        lowS: typeof ecdsaOpts.lowS === "boolean" ? ecdsaOpts.lowS : false,
        format: void 0,
        //'compact' as ECDSASigFormat,
        extraEntropy: false
      };
      const defaultSigOpts_format = "compact";
      function isBiggerThanHalfOrder(number) {
        const HALF = CURVE_ORDER >> _1n2;
        return number > HALF;
      }
      function validateRS(title, num) {
        if (!Fn.isValidNot0(num))
          throw new Error(`invalid signature ${title}: out of range 1..Point.Fn.ORDER`);
        return num;
      }
      function validateSigLength(bytes, format) {
        validateSigFormat(format);
        const size = lengths.signature;
        const sizer = format === "compact" ? size : format === "recovered" ? size + 1 : void 0;
        return (0, utils_ts_1._abytes2)(bytes, sizer, `${format} signature`);
      }
      class Signature {
        constructor(r, s, recovery) {
          this.r = validateRS("r", r);
          this.s = validateRS("s", s);
          if (recovery != null)
            this.recovery = recovery;
          Object.freeze(this);
        }
        static fromBytes(bytes, format = defaultSigOpts_format) {
          validateSigLength(bytes, format);
          let recid;
          if (format === "der") {
            const { r: r2, s: s2 } = exports.DER.toSig((0, utils_ts_1._abytes2)(bytes));
            return new Signature(r2, s2);
          }
          if (format === "recovered") {
            recid = bytes[0];
            format = "compact";
            bytes = bytes.subarray(1);
          }
          const L = Fn.BYTES;
          const r = bytes.subarray(0, L);
          const s = bytes.subarray(L, L * 2);
          return new Signature(Fn.fromBytes(r), Fn.fromBytes(s), recid);
        }
        static fromHex(hex, format) {
          return this.fromBytes((0, utils_ts_1.hexToBytes)(hex), format);
        }
        addRecoveryBit(recovery) {
          return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(messageHash) {
          const FIELD_ORDER = Fp.ORDER;
          const { r, s, recovery: rec } = this;
          if (rec == null || ![0, 1, 2, 3].includes(rec))
            throw new Error("recovery id invalid");
          const hasCofactor = CURVE_ORDER * _2n2 < FIELD_ORDER;
          if (hasCofactor && rec > 1)
            throw new Error("recovery id is ambiguous for h>1 curve");
          const radj = rec === 2 || rec === 3 ? r + CURVE_ORDER : r;
          if (!Fp.isValid(radj))
            throw new Error("recovery id 2 or 3 invalid");
          const x = Fp.toBytes(radj);
          const R = Point.fromBytes((0, utils_ts_1.concatBytes)(pprefix((rec & 1) === 0), x));
          const ir = Fn.inv(radj);
          const h = bits2int_modN((0, utils_ts_1.ensureBytes)("msgHash", messageHash));
          const u1 = Fn.create(-h * ir);
          const u2 = Fn.create(s * ir);
          const Q = Point.BASE.multiplyUnsafe(u1).add(R.multiplyUnsafe(u2));
          if (Q.is0())
            throw new Error("point at infinify");
          Q.assertValidity();
          return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
          return isBiggerThanHalfOrder(this.s);
        }
        toBytes(format = defaultSigOpts_format) {
          validateSigFormat(format);
          if (format === "der")
            return (0, utils_ts_1.hexToBytes)(exports.DER.hexFromSig(this));
          const r = Fn.toBytes(this.r);
          const s = Fn.toBytes(this.s);
          if (format === "recovered") {
            if (this.recovery == null)
              throw new Error("recovery bit must be present");
            return (0, utils_ts_1.concatBytes)(Uint8Array.of(this.recovery), r, s);
          }
          return (0, utils_ts_1.concatBytes)(r, s);
        }
        toHex(format) {
          return (0, utils_ts_1.bytesToHex)(this.toBytes(format));
        }
        // TODO: remove
        assertValidity() {
        }
        static fromCompact(hex) {
          return Signature.fromBytes((0, utils_ts_1.ensureBytes)("sig", hex), "compact");
        }
        static fromDER(hex) {
          return Signature.fromBytes((0, utils_ts_1.ensureBytes)("sig", hex), "der");
        }
        normalizeS() {
          return this.hasHighS() ? new Signature(this.r, Fn.neg(this.s), this.recovery) : this;
        }
        toDERRawBytes() {
          return this.toBytes("der");
        }
        toDERHex() {
          return (0, utils_ts_1.bytesToHex)(this.toBytes("der"));
        }
        toCompactRawBytes() {
          return this.toBytes("compact");
        }
        toCompactHex() {
          return (0, utils_ts_1.bytesToHex)(this.toBytes("compact"));
        }
      }
      const bits2int = ecdsaOpts.bits2int || function bits2int_def(bytes) {
        if (bytes.length > 8192)
          throw new Error("input is too large");
        const num = (0, utils_ts_1.bytesToNumberBE)(bytes);
        const delta = bytes.length * 8 - fnBits;
        return delta > 0 ? num >> BigInt(delta) : num;
      };
      const bits2int_modN = ecdsaOpts.bits2int_modN || function bits2int_modN_def(bytes) {
        return Fn.create(bits2int(bytes));
      };
      const ORDER_MASK = (0, utils_ts_1.bitMask)(fnBits);
      function int2octets(num) {
        (0, utils_ts_1.aInRange)("num < 2^" + fnBits, num, _0n2, ORDER_MASK);
        return Fn.toBytes(num);
      }
      function validateMsgAndHash(message, prehash) {
        (0, utils_ts_1._abytes2)(message, void 0, "message");
        return prehash ? (0, utils_ts_1._abytes2)(hash(message), void 0, "prehashed message") : message;
      }
      function prepSig(message, privateKey, opts) {
        if (["recovered", "canonical"].some((k) => k in opts))
          throw new Error("sign() legacy options not supported");
        const { lowS, prehash, extraEntropy } = validateSigOpts(opts, defaultSigOpts);
        message = validateMsgAndHash(message, prehash);
        const h1int = bits2int_modN(message);
        const d = _normFnElement(Fn, privateKey);
        const seedArgs = [int2octets(d), int2octets(h1int)];
        if (extraEntropy != null && extraEntropy !== false) {
          const e = extraEntropy === true ? randomBytes2(lengths.secretKey) : extraEntropy;
          seedArgs.push((0, utils_ts_1.ensureBytes)("extraEntropy", e));
        }
        const seed = (0, utils_ts_1.concatBytes)(...seedArgs);
        const m = h1int;
        function k2sig(kBytes) {
          const k = bits2int(kBytes);
          if (!Fn.isValidNot0(k))
            return;
          const ik = Fn.inv(k);
          const q = Point.BASE.multiply(k).toAffine();
          const r = Fn.create(q.x);
          if (r === _0n2)
            return;
          const s = Fn.create(ik * Fn.create(m + r * d));
          if (s === _0n2)
            return;
          let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n2);
          let normS = s;
          if (lowS && isBiggerThanHalfOrder(s)) {
            normS = Fn.neg(s);
            recovery ^= 1;
          }
          return new Signature(r, normS, recovery);
        }
        return { seed, k2sig };
      }
      function sign(message, secretKey, opts = {}) {
        message = (0, utils_ts_1.ensureBytes)("message", message);
        const { seed, k2sig } = prepSig(message, secretKey, opts);
        const drbg = (0, utils_ts_1.createHmacDrbg)(hash.outputLen, Fn.BYTES, hmac2);
        const sig = drbg(seed, k2sig);
        return sig;
      }
      function tryParsingSig(sg) {
        let sig = void 0;
        const isHex = typeof sg === "string" || (0, utils_ts_1.isBytes)(sg);
        const isObj = !isHex && sg !== null && typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint";
        if (!isHex && !isObj)
          throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        if (isObj) {
          sig = new Signature(sg.r, sg.s);
        } else if (isHex) {
          try {
            sig = Signature.fromBytes((0, utils_ts_1.ensureBytes)("sig", sg), "der");
          } catch (derError) {
            if (!(derError instanceof exports.DER.Err))
              throw derError;
          }
          if (!sig) {
            try {
              sig = Signature.fromBytes((0, utils_ts_1.ensureBytes)("sig", sg), "compact");
            } catch (error) {
              return false;
            }
          }
        }
        if (!sig)
          return false;
        return sig;
      }
      function verify(signature, message, publicKey, opts = {}) {
        const { lowS, prehash, format } = validateSigOpts(opts, defaultSigOpts);
        publicKey = (0, utils_ts_1.ensureBytes)("publicKey", publicKey);
        message = validateMsgAndHash((0, utils_ts_1.ensureBytes)("message", message), prehash);
        if ("strict" in opts)
          throw new Error("options.strict was renamed to lowS");
        const sig = format === void 0 ? tryParsingSig(signature) : Signature.fromBytes((0, utils_ts_1.ensureBytes)("sig", signature), format);
        if (sig === false)
          return false;
        try {
          const P = Point.fromBytes(publicKey);
          if (lowS && sig.hasHighS())
            return false;
          const { r, s } = sig;
          const h = bits2int_modN(message);
          const is = Fn.inv(s);
          const u1 = Fn.create(h * is);
          const u2 = Fn.create(r * is);
          const R = Point.BASE.multiplyUnsafe(u1).add(P.multiplyUnsafe(u2));
          if (R.is0())
            return false;
          const v = Fn.create(R.x);
          return v === r;
        } catch (e) {
          return false;
        }
      }
      function recoverPublicKey(signature, message, opts = {}) {
        const { prehash } = validateSigOpts(opts, defaultSigOpts);
        message = validateMsgAndHash(message, prehash);
        return Signature.fromBytes(signature, "recovered").recoverPublicKey(message).toBytes();
      }
      return Object.freeze({
        keygen,
        getPublicKey,
        getSharedSecret,
        utils: utils2,
        lengths,
        Point,
        sign,
        verify,
        recoverPublicKey,
        Signature,
        hash
      });
    }
    function weierstrassPoints2(c) {
      const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c);
      const Point = weierstrassN(CURVE, curveOpts);
      return _weierstrass_new_output_to_legacy(c, Point);
    }
    function _weierstrass_legacy_opts_to_new(c) {
      const CURVE = {
        a: c.a,
        b: c.b,
        p: c.Fp.ORDER,
        n: c.n,
        h: c.h,
        Gx: c.Gx,
        Gy: c.Gy
      };
      const Fp = c.Fp;
      let allowedLengths = c.allowedPrivateKeyLengths ? Array.from(new Set(c.allowedPrivateKeyLengths.map((l) => Math.ceil(l / 2)))) : void 0;
      const Fn = (0, modular_ts_1.Field)(CURVE.n, {
        BITS: c.nBitLength,
        allowedLengths,
        modFromBytes: c.wrapPrivateKey
      });
      const curveOpts = {
        Fp,
        Fn,
        allowInfinityPoint: c.allowInfinityPoint,
        endo: c.endo,
        isTorsionFree: c.isTorsionFree,
        clearCofactor: c.clearCofactor,
        fromBytes: c.fromBytes,
        toBytes: c.toBytes
      };
      return { CURVE, curveOpts };
    }
    function _ecdsa_legacy_opts_to_new(c) {
      const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c);
      const ecdsaOpts = {
        hmac: c.hmac,
        randomBytes: c.randomBytes,
        lowS: c.lowS,
        bits2int: c.bits2int,
        bits2int_modN: c.bits2int_modN
      };
      return { CURVE, curveOpts, hash: c.hash, ecdsaOpts };
    }
    function _legacyHelperEquat(Fp, a, b) {
      function weierstrassEquation(x) {
        const x2 = Fp.sqr(x);
        const x3 = Fp.mul(x2, x);
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
      }
      return weierstrassEquation;
    }
    function _weierstrass_new_output_to_legacy(c, Point) {
      const { Fp, Fn } = Point;
      function isWithinCurveOrder(num) {
        return (0, utils_ts_1.inRange)(num, _1n2, Fn.ORDER);
      }
      const weierstrassEquation = _legacyHelperEquat(Fp, c.a, c.b);
      return Object.assign({}, {
        CURVE: c,
        Point,
        ProjectivePoint: Point,
        normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
        weierstrassEquation,
        isWithinCurveOrder
      });
    }
    function _ecdsa_new_output_to_legacy(c, _ecdsa) {
      const Point = _ecdsa.Point;
      return Object.assign({}, _ecdsa, {
        ProjectivePoint: Point,
        CURVE: Object.assign({}, c, (0, modular_ts_1.nLength)(Point.Fn.ORDER, Point.Fn.BITS))
      });
    }
    function weierstrass2(c) {
      const { CURVE, curveOpts, hash, ecdsaOpts } = _ecdsa_legacy_opts_to_new(c);
      const Point = weierstrassN(CURVE, curveOpts);
      const signs = ecdsa(Point, hash, ecdsaOpts);
      return _ecdsa_new_output_to_legacy(c, signs);
    }
  })(weierstrass$2);
  return weierstrass$2;
}
var hasRequired_shortw_utils$1;
function require_shortw_utils$1() {
  if (hasRequired_shortw_utils$1) return _shortw_utils$1;
  hasRequired_shortw_utils$1 = 1;
  Object.defineProperty(_shortw_utils$1, "__esModule", { value: true });
  _shortw_utils$1.getHash = getHash2;
  _shortw_utils$1.createCurve = createCurve2;
  const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass$1();
  function getHash2(hash) {
    return { hash };
  }
  function createCurve2(curveDef, defHash) {
    const create = (hash) => (0, weierstrass_ts_1.weierstrass)({ ...curveDef, hash });
    return { ...create(defHash), create };
  }
  return _shortw_utils$1;
}
var hashToCurve$1 = {};
var hasRequiredHashToCurve$1;
function requireHashToCurve$1() {
  if (hasRequiredHashToCurve$1) return hashToCurve$1;
  hasRequiredHashToCurve$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._DST_scalar = void 0;
    exports.expand_message_xmd = expand_message_xmd;
    exports.expand_message_xof = expand_message_xof;
    exports.hash_to_field = hash_to_field;
    exports.isogenyMap = isogenyMap;
    exports.createHasher = createHasher;
    const utils_ts_1 = /* @__PURE__ */ requireUtils$1();
    const modular_ts_1 = /* @__PURE__ */ requireModular$1();
    const os2ip = utils_ts_1.bytesToNumberBE;
    function i2osp(value, length) {
      anum(value);
      anum(length);
      if (value < 0 || value >= 1 << 8 * length)
        throw new Error("invalid I2OSP input: " + value);
      const res = Array.from({ length }).fill(0);
      for (let i = length - 1; i >= 0; i--) {
        res[i] = value & 255;
        value >>>= 8;
      }
      return new Uint8Array(res);
    }
    function strxor(a, b) {
      const arr = new Uint8Array(a.length);
      for (let i = 0; i < a.length; i++) {
        arr[i] = a[i] ^ b[i];
      }
      return arr;
    }
    function anum(item) {
      if (!Number.isSafeInteger(item))
        throw new Error("number expected");
    }
    function normDST(DST) {
      if (!(0, utils_ts_1.isBytes)(DST) && typeof DST !== "string")
        throw new Error("DST must be Uint8Array or string");
      return typeof DST === "string" ? (0, utils_ts_1.utf8ToBytes)(DST) : DST;
    }
    function expand_message_xmd(msg, DST, lenInBytes, H) {
      (0, utils_ts_1.abytes)(msg);
      anum(lenInBytes);
      DST = normDST(DST);
      if (DST.length > 255)
        DST = H((0, utils_ts_1.concatBytes)((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-"), DST));
      const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
      const ell = Math.ceil(lenInBytes / b_in_bytes);
      if (lenInBytes > 65535 || ell > 255)
        throw new Error("expand_message_xmd: invalid lenInBytes");
      const DST_prime = (0, utils_ts_1.concatBytes)(DST, i2osp(DST.length, 1));
      const Z_pad = i2osp(0, r_in_bytes);
      const l_i_b_str = i2osp(lenInBytes, 2);
      const b = new Array(ell);
      const b_0 = H((0, utils_ts_1.concatBytes)(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
      b[0] = H((0, utils_ts_1.concatBytes)(b_0, i2osp(1, 1), DST_prime));
      for (let i = 1; i <= ell; i++) {
        const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
        b[i] = H((0, utils_ts_1.concatBytes)(...args));
      }
      const pseudo_random_bytes = (0, utils_ts_1.concatBytes)(...b);
      return pseudo_random_bytes.slice(0, lenInBytes);
    }
    function expand_message_xof(msg, DST, lenInBytes, k, H) {
      (0, utils_ts_1.abytes)(msg);
      anum(lenInBytes);
      DST = normDST(DST);
      if (DST.length > 255) {
        const dkLen = Math.ceil(2 * k / 8);
        DST = H.create({ dkLen }).update((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(DST).digest();
      }
      if (lenInBytes > 65535 || DST.length > 255)
        throw new Error("expand_message_xof: invalid lenInBytes");
      return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
    }
    function hash_to_field(msg, count, options) {
      (0, utils_ts_1._validateObject)(options, {
        p: "bigint",
        m: "number",
        k: "number",
        hash: "function"
      });
      const { p, k, m, hash, expand, DST } = options;
      if (!(0, utils_ts_1.isHash)(options.hash))
        throw new Error("expected valid hash");
      (0, utils_ts_1.abytes)(msg);
      anum(count);
      const log2p = p.toString(2).length;
      const L = Math.ceil((log2p + k) / 8);
      const len_in_bytes = count * m * L;
      let prb;
      if (expand === "xmd") {
        prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
      } else if (expand === "xof") {
        prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
      } else if (expand === "_internal_pass") {
        prb = msg;
      } else {
        throw new Error('expand must be "xmd" or "xof"');
      }
      const u = new Array(count);
      for (let i = 0; i < count; i++) {
        const e = new Array(m);
        for (let j = 0; j < m; j++) {
          const elm_offset = L * (j + i * m);
          const tv = prb.subarray(elm_offset, elm_offset + L);
          e[j] = (0, modular_ts_1.mod)(os2ip(tv), p);
        }
        u[i] = e;
      }
      return u;
    }
    function isogenyMap(field, map) {
      const coeff = map.map((i) => Array.from(i).reverse());
      return (x, y) => {
        const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
        const [xd_inv, yd_inv] = (0, modular_ts_1.FpInvertBatch)(field, [xd, yd], true);
        x = field.mul(xn, xd_inv);
        y = field.mul(y, field.mul(yn, yd_inv));
        return { x, y };
      };
    }
    exports._DST_scalar = (0, utils_ts_1.utf8ToBytes)("HashToScalar-");
    function createHasher(Point, mapToCurve, defaults) {
      if (typeof mapToCurve !== "function")
        throw new Error("mapToCurve() must be defined");
      function map(num) {
        return Point.fromAffine(mapToCurve(num));
      }
      function clear(initial) {
        const P = initial.clearCofactor();
        if (P.equals(Point.ZERO))
          return Point.ZERO;
        P.assertValidity();
        return P;
      }
      return {
        defaults,
        hashToCurve(msg, options) {
          const opts = Object.assign({}, defaults, options);
          const u = hash_to_field(msg, 2, opts);
          const u0 = map(u[0]);
          const u1 = map(u[1]);
          return clear(u0.add(u1));
        },
        encodeToCurve(msg, options) {
          const optsDst = defaults.encodeDST ? { DST: defaults.encodeDST } : {};
          const opts = Object.assign({}, defaults, optsDst, options);
          const u = hash_to_field(msg, 1, opts);
          const u0 = map(u[0]);
          return clear(u0);
        },
        /** See {@link H2CHasher} */
        mapToCurve(scalars) {
          if (!Array.isArray(scalars))
            throw new Error("expected array of bigints");
          for (const i of scalars)
            if (typeof i !== "bigint")
              throw new Error("expected array of bigints");
          return clear(map(scalars));
        },
        // hash_to_scalar can produce 0: https://www.rfc-editor.org/errata/eid8393
        // RFC 9380, draft-irtf-cfrg-bbs-signatures-08
        hashToScalar(msg, options) {
          const N = Point.Fn.ORDER;
          const opts = Object.assign({}, defaults, { p: N, m: 1, DST: exports._DST_scalar }, options);
          return hash_to_field(msg, 1, opts)[0][0];
        }
      };
    }
  })(hashToCurve$1);
  return hashToCurve$1;
}
var hasRequiredSecp256k1$1;
function requireSecp256k1$1() {
  if (hasRequiredSecp256k1$1) return secp256k1$2;
  hasRequiredSecp256k1$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encodeToCurve = exports.hashToCurve = exports.secp256k1_hasher = exports.schnorr = exports.secp256k1 = void 0;
    const sha2_js_1 = /* @__PURE__ */ requireSha2$1();
    const utils_js_1 = /* @__PURE__ */ requireUtils$4();
    const _shortw_utils_ts_1 = /* @__PURE__ */ require_shortw_utils$1();
    const hash_to_curve_ts_1 = /* @__PURE__ */ requireHashToCurve$1();
    const modular_ts_1 = /* @__PURE__ */ requireModular$1();
    const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass$1();
    const utils_ts_1 = /* @__PURE__ */ requireUtils$1();
    const secp256k1_CURVE = {
      p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
      n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
      h: BigInt(1),
      a: BigInt(0),
      b: BigInt(7),
      Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
      Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
    };
    const secp256k1_ENDO = {
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
      basises: [
        [BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],
        [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]
      ]
    };
    const _0n2 = /* @__PURE__ */ BigInt(0);
    const _1n2 = /* @__PURE__ */ BigInt(1);
    const _2n2 = /* @__PURE__ */ BigInt(2);
    function sqrtMod2(y) {
      const P = secp256k1_CURVE.p;
      const _3n2 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
      const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
      const b2 = y * y * y % P;
      const b3 = b2 * b2 * y % P;
      const b6 = (0, modular_ts_1.pow2)(b3, _3n2, P) * b3 % P;
      const b9 = (0, modular_ts_1.pow2)(b6, _3n2, P) * b3 % P;
      const b11 = (0, modular_ts_1.pow2)(b9, _2n2, P) * b2 % P;
      const b22 = (0, modular_ts_1.pow2)(b11, _11n, P) * b11 % P;
      const b44 = (0, modular_ts_1.pow2)(b22, _22n, P) * b22 % P;
      const b88 = (0, modular_ts_1.pow2)(b44, _44n, P) * b44 % P;
      const b176 = (0, modular_ts_1.pow2)(b88, _88n, P) * b88 % P;
      const b220 = (0, modular_ts_1.pow2)(b176, _44n, P) * b44 % P;
      const b223 = (0, modular_ts_1.pow2)(b220, _3n2, P) * b3 % P;
      const t1 = (0, modular_ts_1.pow2)(b223, _23n, P) * b22 % P;
      const t2 = (0, modular_ts_1.pow2)(t1, _6n, P) * b2 % P;
      const root = (0, modular_ts_1.pow2)(t2, _2n2, P);
      if (!Fpk12.eql(Fpk12.sqr(root), y))
        throw new Error("Cannot find square root");
      return root;
    }
    const Fpk12 = (0, modular_ts_1.Field)(secp256k1_CURVE.p, { sqrt: sqrtMod2 });
    exports.secp256k1 = (0, _shortw_utils_ts_1.createCurve)({ ...secp256k1_CURVE, Fp: Fpk12, lowS: true, endo: secp256k1_ENDO }, sha2_js_1.sha256);
    const TAGGED_HASH_PREFIXES = {};
    function taggedHash(tag, ...messages) {
      let tagP = TAGGED_HASH_PREFIXES[tag];
      if (tagP === void 0) {
        const tagH = (0, sha2_js_1.sha256)((0, utils_ts_1.utf8ToBytes)(tag));
        tagP = (0, utils_ts_1.concatBytes)(tagH, tagH);
        TAGGED_HASH_PREFIXES[tag] = tagP;
      }
      return (0, sha2_js_1.sha256)((0, utils_ts_1.concatBytes)(tagP, ...messages));
    }
    const pointToBytes = (point) => point.toBytes(true).slice(1);
    const Pointk1 = /* @__PURE__ */ (() => exports.secp256k1.Point)();
    const hasEven = (y) => y % _2n2 === _0n2;
    function schnorrGetExtPubKey(priv) {
      const { Fn, BASE } = Pointk1;
      const d_ = (0, weierstrass_ts_1._normFnElement)(Fn, priv);
      const p = BASE.multiply(d_);
      const scalar = hasEven(p.y) ? d_ : Fn.neg(d_);
      return { scalar, bytes: pointToBytes(p) };
    }
    function lift_x(x) {
      const Fp = Fpk12;
      if (!Fp.isValidNot0(x))
        throw new Error("invalid x: Fail if x ≥ p");
      const xx = Fp.create(x * x);
      const c = Fp.create(xx * x + BigInt(7));
      let y = Fp.sqrt(c);
      if (!hasEven(y))
        y = Fp.neg(y);
      const p = Pointk1.fromAffine({ x, y });
      p.assertValidity();
      return p;
    }
    const num = utils_ts_1.bytesToNumberBE;
    function challenge(...args) {
      return Pointk1.Fn.create(num(taggedHash("BIP0340/challenge", ...args)));
    }
    function schnorrGetPublicKey(secretKey) {
      return schnorrGetExtPubKey(secretKey).bytes;
    }
    function schnorrSign(message, secretKey, auxRand = (0, utils_js_1.randomBytes)(32)) {
      const { Fn } = Pointk1;
      const m = (0, utils_ts_1.ensureBytes)("message", message);
      const { bytes: px, scalar: d } = schnorrGetExtPubKey(secretKey);
      const a = (0, utils_ts_1.ensureBytes)("auxRand", auxRand, 32);
      const t = Fn.toBytes(d ^ num(taggedHash("BIP0340/aux", a)));
      const rand = taggedHash("BIP0340/nonce", t, px, m);
      const { bytes: rx, scalar: k } = schnorrGetExtPubKey(rand);
      const e = challenge(rx, px, m);
      const sig = new Uint8Array(64);
      sig.set(rx, 0);
      sig.set(Fn.toBytes(Fn.create(k + e * d)), 32);
      if (!schnorrVerify(sig, m, px))
        throw new Error("sign: Invalid signature produced");
      return sig;
    }
    function schnorrVerify(signature, message, publicKey) {
      const { Fn, BASE } = Pointk1;
      const sig = (0, utils_ts_1.ensureBytes)("signature", signature, 64);
      const m = (0, utils_ts_1.ensureBytes)("message", message);
      const pub = (0, utils_ts_1.ensureBytes)("publicKey", publicKey, 32);
      try {
        const P = lift_x(num(pub));
        const r = num(sig.subarray(0, 32));
        if (!(0, utils_ts_1.inRange)(r, _1n2, secp256k1_CURVE.p))
          return false;
        const s = num(sig.subarray(32, 64));
        if (!(0, utils_ts_1.inRange)(s, _1n2, secp256k1_CURVE.n))
          return false;
        const e = challenge(Fn.toBytes(r), pointToBytes(P), m);
        const R = BASE.multiplyUnsafe(s).add(P.multiplyUnsafe(Fn.neg(e)));
        const { x, y } = R.toAffine();
        if (R.is0() || !hasEven(y) || x !== r)
          return false;
        return true;
      } catch (error) {
        return false;
      }
    }
    exports.schnorr = (() => {
      const size = 32;
      const seedLength = 48;
      const randomSecretKey = (seed = (0, utils_js_1.randomBytes)(seedLength)) => {
        return (0, modular_ts_1.mapHashToField)(seed, secp256k1_CURVE.n);
      };
      exports.secp256k1.utils.randomSecretKey;
      function keygen(seed) {
        const secretKey = randomSecretKey(seed);
        return { secretKey, publicKey: schnorrGetPublicKey(secretKey) };
      }
      return {
        keygen,
        getPublicKey: schnorrGetPublicKey,
        sign: schnorrSign,
        verify: schnorrVerify,
        Point: Pointk1,
        utils: {
          randomSecretKey,
          randomPrivateKey: randomSecretKey,
          taggedHash,
          // TODO: remove
          lift_x,
          pointToBytes,
          numberToBytesBE: utils_ts_1.numberToBytesBE,
          bytesToNumberBE: utils_ts_1.bytesToNumberBE,
          mod: modular_ts_1.mod
        },
        lengths: {
          secretKey: size,
          publicKey: size,
          publicKeyHasPrefix: false,
          signature: size * 2,
          seed: seedLength
        }
      };
    })();
    const isoMap = /* @__PURE__ */ (() => (0, hash_to_curve_ts_1.isogenyMap)(Fpk12, [
      // xNum
      [
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
        "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
        "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
      ],
      // xDen
      [
        "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
        "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ],
      // yNum
      [
        "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
        "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
        "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
        "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
      ],
      // yDen
      [
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
        "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
        "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ]
    ].map((i) => i.map((j) => BigInt(j)))))();
    const mapSWU = /* @__PURE__ */ (() => (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fpk12, {
      A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
      B: BigInt("1771"),
      Z: Fpk12.create(BigInt("-11"))
    }))();
    exports.secp256k1_hasher = (() => (0, hash_to_curve_ts_1.createHasher)(exports.secp256k1.Point, (scalars) => {
      const { x, y } = mapSWU(Fpk12.create(scalars[0]));
      return isoMap(x, y);
    }, {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: Fpk12.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha2_js_1.sha256
    }))();
    exports.hashToCurve = (() => exports.secp256k1_hasher.hashToCurve)();
    exports.encodeToCurve = (() => exports.secp256k1_hasher.encodeToCurve)();
  })(secp256k1$2);
  return secp256k1$2;
}
var p256$2 = {};
var nist = {};
var hasRequiredNist;
function requireNist() {
  if (hasRequiredNist) return nist;
  hasRequiredNist = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.p521_hasher = exports.secp521r1 = exports.p521 = exports.p384_hasher = exports.secp384r1 = exports.p384 = exports.p256_hasher = exports.secp256r1 = exports.p256 = void 0;
    const sha2_1 = /* @__PURE__ */ requireSha2();
    const _shortw_utils_ts_1 = /* @__PURE__ */ require_shortw_utils$2();
    const hash_to_curve_ts_1 = /* @__PURE__ */ requireHashToCurve$2();
    const modular_ts_1 = /* @__PURE__ */ requireModular$2();
    const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass$2();
    const Fp2562 = (0, modular_ts_1.Field)(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"));
    const p256_a2 = Fp2562.create(BigInt("-3"));
    const p256_b2 = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");
    exports.p256 = (0, _shortw_utils_ts_1.createCurve)({
      a: p256_a2,
      b: p256_b2,
      Fp: Fp2562,
      n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
      Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
      Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
      h: BigInt(1),
      lowS: false
    }, sha2_1.sha256);
    exports.secp256r1 = exports.p256;
    const p256_mapSWU = /* @__PURE__ */ (() => (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fp2562, {
      A: p256_a2,
      B: p256_b2,
      Z: Fp2562.create(BigInt("-10"))
    }))();
    exports.p256_hasher = (() => (0, hash_to_curve_ts_1.createHasher)(exports.secp256r1.ProjectivePoint, (scalars) => p256_mapSWU(scalars[0]), {
      DST: "P256_XMD:SHA-256_SSWU_RO_",
      encodeDST: "P256_XMD:SHA-256_SSWU_NU_",
      p: Fp2562.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha2_1.sha256
    }))();
    const Fp3842 = (0, modular_ts_1.Field)(BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"));
    const p384_a2 = Fp3842.create(BigInt("-3"));
    const p384_b2 = BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef");
    exports.p384 = (0, _shortw_utils_ts_1.createCurve)({
      a: p384_a2,
      b: p384_b2,
      Fp: Fp3842,
      n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
      Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
      Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f"),
      h: BigInt(1),
      lowS: false
    }, sha2_1.sha384);
    exports.secp384r1 = exports.p384;
    const p384_mapSWU = /* @__PURE__ */ (() => (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fp3842, {
      A: p384_a2,
      B: p384_b2,
      Z: Fp3842.create(BigInt("-12"))
    }))();
    exports.p384_hasher = (() => (0, hash_to_curve_ts_1.createHasher)(exports.secp384r1.ProjectivePoint, (scalars) => p384_mapSWU(scalars[0]), {
      DST: "P384_XMD:SHA-384_SSWU_RO_",
      encodeDST: "P384_XMD:SHA-384_SSWU_NU_",
      p: Fp3842.ORDER,
      m: 1,
      k: 192,
      expand: "xmd",
      hash: sha2_1.sha384
    }))();
    const Fp5212 = (0, modular_ts_1.Field)(BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
    const p521_a2 = Fp5212.create(BigInt("-3"));
    const p521_b2 = BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00");
    exports.p521 = (0, _shortw_utils_ts_1.createCurve)({
      a: p521_a2,
      b: p521_b2,
      Fp: Fp5212,
      n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
      Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
      Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650"),
      h: BigInt(1),
      lowS: false,
      allowedPrivateKeyLengths: [130, 131, 132]
      // P521 keys are variable-length. Normalize to 132b
    }, sha2_1.sha512);
    exports.secp521r1 = exports.p521;
    const p521_mapSWU = /* @__PURE__ */ (() => (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fp5212, {
      A: p521_a2,
      B: p521_b2,
      Z: Fp5212.create(BigInt("-4"))
    }))();
    exports.p521_hasher = (() => (0, hash_to_curve_ts_1.createHasher)(exports.secp521r1.ProjectivePoint, (scalars) => p521_mapSWU(scalars[0]), {
      DST: "P521_XMD:SHA-512_SSWU_RO_",
      encodeDST: "P521_XMD:SHA-512_SSWU_NU_",
      p: Fp5212.ORDER,
      m: 1,
      k: 256,
      expand: "xmd",
      hash: sha2_1.sha512
    }))();
  })(nist);
  return nist;
}
var hasRequiredP256;
function requireP256() {
  if (hasRequiredP256) return p256$2;
  hasRequiredP256 = 1;
  Object.defineProperty(p256$2, "__esModule", { value: true });
  p256$2.encodeToCurve = p256$2.hashToCurve = p256$2.secp256r1 = p256$2.p256 = void 0;
  const nist_ts_1 = /* @__PURE__ */ requireNist();
  p256$2.p256 = nist_ts_1.p256;
  p256$2.secp256r1 = nist_ts_1.p256;
  p256$2.hashToCurve = (() => nist_ts_1.p256_hasher.hashToCurve)();
  p256$2.encodeToCurve = (() => nist_ts_1.p256_hasher.encodeToCurve)();
  return p256$2;
}
const Fp256$1 = Field$1(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"));
const p256_a = Fp256$1.create(BigInt("-3"));
const p256_b = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");
const p256$1 = createCurve$1({
  a: p256_a,
  b: p256_b,
  Fp: Fp256$1,
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: false
}, sha256);
const Fp384 = Field$1(BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"));
const p384_a = Fp384.create(BigInt("-3"));
const p384_b = BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef");
createCurve$1({
  a: p384_a,
  b: p384_b,
  Fp: Fp384,
  n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
  Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
  Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f"),
  h: BigInt(1),
  lowS: false
}, sha384);
const Fp521 = Field$1(BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
const p521_a = Fp521.create(BigInt("-3"));
const p521_b = BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00");
createCurve$1({
  a: p521_a,
  b: p521_b,
  Fp: Fp521,
  n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
  Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
  Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650"),
  h: BigInt(1),
  lowS: false,
  allowedPrivateKeyLengths: [130, 131, 132]
  // P521 keys are variable-length. Normalize to 132b
}, sha512);
const secp256r1 = p256$1;
const _0n$3 = /* @__PURE__ */ BigInt(0);
const _1n$4 = /* @__PURE__ */ BigInt(1);
const _2n$2 = /* @__PURE__ */ BigInt(2);
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(item) {
  if (!isBytes(item))
    throw new Error("Uint8Array expected");
}
function abool(title, value) {
  if (typeof value !== "boolean")
    throw new Error(title + " boolean expected, got " + value);
}
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$3 : BigInt("0x" + hex);
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
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
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
const isPosBig = (n) => typeof n === "bigint" && _0n$3 <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n$3; n >>= _1n$4, len += 1)
    ;
  return len;
}
const bitMask = (n) => (_2n$2 << BigInt(n - 1)) - _1n$4;
const u8n = (data) => new Uint8Array(data);
const u8fr = (arr) => Uint8Array.from(arr);
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n()) => {
    k = h(u8fr([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr([1]), seed);
    v = h();
  };
  const gen = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
const validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || isBytes(val),
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error("invalid validator function");
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
const ut = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  aInRange,
  abool,
  abytes,
  bitLen,
  bitMask,
  bytesToHex,
  bytesToNumberBE,
  bytesToNumberLE,
  concatBytes,
  createHmacDrbg,
  ensureBytes,
  hexToBytes,
  hexToNumber,
  inRange,
  isBytes,
  memoized,
  numberToBytesBE,
  numberToBytesLE,
  numberToHexUnpadded,
  validateObject
});
const _0n$2 = BigInt(0), _1n$3 = BigInt(1), _2n$1 = /* @__PURE__ */ BigInt(2), _3n$1 = /* @__PURE__ */ BigInt(3);
const _4n = /* @__PURE__ */ BigInt(4), _5n = /* @__PURE__ */ BigInt(5), _8n = /* @__PURE__ */ BigInt(8);
function mod(a, b) {
  const result = a % b;
  return result >= _0n$2 ? result : b + result;
}
function pow(num, power, modulo) {
  if (power < _0n$2)
    throw new Error("invalid exponent, negatives unsupported");
  if (modulo <= _0n$2)
    throw new Error("invalid modulus");
  if (modulo === _1n$3)
    return _0n$2;
  let res = _1n$3;
  while (power > _0n$2) {
    if (power & _1n$3)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n$3;
  }
  return res;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n$2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n$2)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$2)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n$2, u = _1n$3;
  while (a !== _0n$2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    b = a, a = r, x = u, u = m;
  }
  const gcd = b;
  if (gcd !== _1n$3)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function tonelliShanks(P) {
  const legendreC = (P - _1n$3) / _2n$1;
  let Q, S, Z;
  for (Q = P - _1n$3, S = 0; Q % _2n$1 === _0n$2; Q /= _2n$1, S++)
    ;
  for (Z = _2n$1; Z < P && pow(Z, legendreC, P) !== P - _1n$3; Z++) {
    if (Z > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  }
  if (S === 1) {
    const p1div4 = (P + _1n$3) / _4n;
    return function tonelliFast(Fp, n) {
      const root = Fp.pow(n, p1div4);
      if (!Fp.eql(Fp.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  const Q1div2 = (Q + _1n$3) / _2n$1;
  return function tonelliSlow(Fp, n) {
    if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
      throw new Error("Cannot find square root");
    let r = S;
    let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q);
    let x = Fp.pow(n, Q1div2);
    let b = Fp.pow(n, Q);
    while (!Fp.eql(b, Fp.ONE)) {
      if (Fp.eql(b, Fp.ZERO))
        return Fp.ZERO;
      let m = 1;
      for (let t2 = Fp.sqr(b); m < r; m++) {
        if (Fp.eql(t2, Fp.ONE))
          break;
        t2 = Fp.sqr(t2);
      }
      const ge = Fp.pow(g, _1n$3 << BigInt(r - m - 1));
      g = Fp.sqr(ge);
      x = Fp.mul(x, ge);
      b = Fp.mul(b, g);
      r = m;
    }
    return x;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n$1) {
    const p1div4 = (P + _1n$3) / _4n;
    return function sqrt3mod42(Fp, n) {
      const root = Fp.pow(n, p1div4);
      if (!Fp.eql(Fp.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P % _8n === _5n) {
    const c1 = (P - _5n) / _8n;
    return function sqrt5mod82(Fp, n) {
      const n2 = Fp.mul(n, _2n$1);
      const v = Fp.pow(n2, c1);
      const nv = Fp.mul(n, v);
      const i = Fp.mul(Fp.mul(nv, _2n$1), v);
      const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
      if (!Fp.eql(Fp.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  return tonelliShanks(P);
}
const FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(f, num, power) {
  if (power < _0n$2)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$2)
    return f.ONE;
  if (power === _1n$3)
    return num;
  let p = f.ONE;
  let d = num;
  while (power > _0n$2) {
    if (power & _1n$3)
      p = f.mul(p, d);
    d = f.sqr(d);
    power >>= _1n$3;
  }
  return p;
}
function FpInvertBatch(f, nums) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = acc;
    return f.mul(acc, num);
  }, f.ONE);
  const inverted = f.inv(lastMultiplied);
  nums.reduceRight((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = f.mul(acc, tmp[i]);
    return f.mul(acc, num);
  }, inverted);
  return tmp;
}
function nLength(n, nBitLength) {
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE = false, redef = {}) {
  if (ORDER <= _0n$2)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n$2,
    ONE: _1n$3,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n$2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n$2,
    isOdd: (num) => (num & _1n$3) === _1n$3,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, b, c) => c ? b : a,
    toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes) => {
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      return isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    }
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n$3) + _1n$3;
  return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
const _0n$1 = BigInt(0);
const _1n$2 = BigInt(1);
function constTimeNegate(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, bits) {
  validateW(W, bits);
  const windows = Math.ceil(bits / W) + 1;
  const windowSize = 2 ** (W - 1);
  return { windows, windowSize };
}
function validateMSMPoints(points, c) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field.isValid(s))
      throw new Error("invalid scalar at index " + i);
  });
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap();
const pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function wNAF(c, bits) {
  return {
    constTimeNegate,
    hasPrecomputes(elm) {
      return getW(elm) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(elm, n, p = c.ZERO) {
      let d = elm;
      while (n > _0n$1) {
        if (n & _1n$2)
          p = p.add(d);
        d = d.double();
        n >>= _1n$2;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = calcWOpts(W, bits);
      const points = [];
      let p = elm;
      let base = p;
      for (let window = 0; window < windows; window++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      const { windows, windowSize } = calcWOpts(W, bits);
      let p = c.ZERO;
      let f = c.BASE;
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window = 0; window < windows; window++) {
        const offset = window * windowSize;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n$2;
        }
        const offset1 = offset;
        const offset2 = offset + Math.abs(wbits) - 1;
        const cond1 = window % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f = f.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p = p.add(constTimeNegate(cond2, precomputes[offset2]));
        }
      }
      return { p, f };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
      const { windows, windowSize } = calcWOpts(W, bits);
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window = 0; window < windows; window++) {
        const offset = window * windowSize;
        if (n === _0n$1)
          break;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n$2;
        }
        if (wbits === 0)
          continue;
        let curr = precomputes[offset + Math.abs(wbits) - 1];
        if (wbits < 0)
          curr = curr.negate();
        acc = acc.add(curr);
      }
      return acc;
    },
    getPrecomputes(W, P, transform) {
      let comp = pointPrecomputes.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1)
          pointPrecomputes.set(P, transform(comp));
      }
      return comp;
    },
    wNAFCached(P, n, transform) {
      const W = getW(P);
      return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
    },
    wNAFCachedUnsafe(P, n, transform, prev) {
      const W = getW(P);
      if (W === 1)
        return this.unsafeLadder(P, n, prev);
      return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P, W) {
      validateW(W, bits);
      pointWindowSizes.set(P, W);
      pointPrecomputes.delete(P);
    }
  };
}
function pippenger(c, fieldN, points, scalars) {
  validateMSMPoints(points, c);
  validateMSMScalars(scalars, fieldN);
  if (points.length !== scalars.length)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen(BigInt(points.length));
  const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1;
  const MASK = (1 << windowSize) - 1;
  const buckets = new Array(MASK + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j = 0; j < scalars.length; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & BigInt(MASK));
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero;
    for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
function validateBasic(curve2) {
  validateField(curve2.Fp);
  validateObject(curve2, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve2.n, curve2.nBitLength),
    ...curve2,
    ...{ p: curve2.Fp.ORDER }
  });
}
function validateSigVerOpts(opts) {
  if (opts.lowS !== void 0)
    abool("lowS", opts.lowS);
  if (opts.prehash !== void 0)
    abool("prehash", opts.prehash);
}
function validatePointOpts(curve2) {
  const opts = validateBasic(curve2);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo, Fp, a } = opts;
  if (endo) {
    if (!Fp.eql(a, Fp.ZERO)) {
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
    }
  }
  return Object.freeze({ ...opts });
}
const { bytesToNumberBE: b2n, hexToBytes: h2b } = ut;
class DERErr2 extends Error {
  constructor(m = "") {
    super(m);
  }
}
const DER = {
  // asn.1 DER encoding utils
  Err: DERErr2,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E } = DER;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded(dataLen);
      if (len.length / 2 & 128)
        throw new E("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length = 0;
      if (!isLong)
        length = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E("tlv.decode(long): zero leftmost byte");
        for (const b of lengthBytes)
          length = length << 8 | b;
        pos += lenLen;
        if (length < 128)
          throw new E("tlv.decode(long): not minimal encoding");
      }
      const v = data.subarray(pos, pos + length);
      if (v.length !== length)
        throw new E("tlv.decode: wrong value length");
      return { v, l: data.subarray(pos + length) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E } = DER;
      if (num < _0n)
        throw new E("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E } = DER;
      if (data[0] & 128)
        throw new E("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E("invalid signature integer: unnecessary leading zero");
      return b2n(data);
    }
  },
  toSig(hex) {
    const { Err: E, _int: int, _tlv: tlv } = DER;
    const data = typeof hex === "string" ? h2b(hex) : hex;
    abytes(data);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
const _0n = BigInt(0), _1n$1 = BigInt(1);
BigInt(2);
const _3n = BigInt(3);
BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp } = CURVE;
  const Fn = Field(CURVE.n, CURVE.nBitLength);
  const toBytes = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a = point.toAffine();
    return concatBytes(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
  });
  const fromBytes = CURVE.fromBytes || ((bytes) => {
    const tail = bytes.subarray(1);
    const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
    const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp.sqr(x);
    const x3 = Fp.mul(x2, x);
    return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
  }
  if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
    throw new Error("bad generator point: equation left != right");
  function isWithinCurveOrder(num) {
    return inRange(num, _1n$1, CURVE.n);
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (isBytes(key))
        key = bytesToHex(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("invalid private key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
    }
    if (wrapPrivateKey)
      num = mod(num, N);
    aInRange("private key", num, _1n$1, N);
    return num;
  }
  function assertPrjPoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  const toAffineMemo = memoized((p, iz) => {
    const { px: x, py: y, pz: z } = p;
    if (Fp.eql(z, Fp.ONE))
      return { x, y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp.ONE : Fp.inv(z);
    const ax = Fp.mul(x, iz);
    const ay = Fp.mul(y, iz);
    const zz = Fp.mul(z, iz);
    if (is0)
      return { x: Fp.ZERO, y: Fp.ZERO };
    if (!Fp.eql(zz, Fp.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (CURVE.allowInfinityPoint && !Fp.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp.isValid(x) || !Fp.isValid(y))
      throw new Error("bad point: x or y not FE");
    const left = Fp.sqr(y);
    const right = weierstrassEquation(x);
    if (!Fp.eql(left, right))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class Point {
    constructor(px, py, pz) {
      this.px = px;
      this.py = py;
      this.pz = pz;
      if (px == null || !Fp.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp.isValid(py))
        throw new Error("y required");
      if (pz == null || !Fp.isValid(pz))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point)
        throw new Error("projective point not allowed");
      const is0 = (i) => Fp.eql(i, Fp.ZERO);
      if (is0(x) && is0(y))
        return Point.ZERO;
      return new Point(x, y, Fp.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = Fp.invertBatch(points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P = Point.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp.isOdd)
        return !Fp.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
      const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
      return U1 && U2;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point(this.px, Fp.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp.mul(b, _3n);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X3 = Fp.mul(a, Z3);
      Y3 = Fp.mul(b3, t2);
      Y3 = Fp.add(X3, Y3);
      X3 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X3, Y3);
      X3 = Fp.mul(t3, X3);
      Z3 = Fp.mul(b3, Z3);
      t2 = Fp.mul(a, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X3 = Fp.sub(X3, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      const a = CURVE.a;
      const b3 = Fp.mul(CURVE.b, _3n);
      let t0 = Fp.mul(X1, X2);
      let t1 = Fp.mul(Y1, Y2);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X2, Y2);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X2, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X3 = Fp.add(Y2, Z2);
      t5 = Fp.mul(t5, X3);
      X3 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X3);
      Z3 = Fp.mul(a, t4);
      X3 = Fp.mul(b3, t2);
      Z3 = Fp.add(X3, Z3);
      X3 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X3, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a, t2);
      t4 = Fp.mul(b3, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X3 = Fp.mul(t3, X3);
      X3 = Fp.sub(X3, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, n, Point.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo, n: N } = CURVE;
      aInRange("scalar", sc, _0n, N);
      const I = Point.ZERO;
      if (sc === _0n)
        return I;
      if (this.is0() || sc === _1n$1)
        return this;
      if (!endo || wnaf.hasPrecomputes(this))
        return wnaf.wNAFCachedUnsafe(this, sc, Point.normalizeZ);
      let { k1neg, k1, k2neg, k2 } = endo.splitScalar(sc);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n || k2 > _0n) {
        if (k1 & _1n$1)
          k1p = k1p.add(d);
        if (k2 & _1n$1)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n$1;
        k2 >>= _1n$1;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo, n: N } = CURVE;
      aInRange("scalar", scalar, _1n$1, N);
      let point, fake;
      if (endo) {
        const { k1neg, k1, k2neg, k2 } = endo.splitScalar(scalar);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f } = this.wNAF(scalar);
        point = p;
        fake = f;
      }
      return Point.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point.BASE;
      const mul = (P, a2) => a2 === _0n || a2 === _1n$1 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n$1)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n$1)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      abool("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      abool("isCompressed", isCompressed);
      return bytesToHex(this.toRawBytes(isCompressed));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
  Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
  const _bits = CURVE.nBitLength;
  const wnaf = wNAF(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
  return {
    CURVE,
    ProjectivePoint: Point,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts(curve2) {
  const opts = validateBasic(curve2);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass$1(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp, n: CURVE_ORDER } = CURVE;
  const compressedLen = Fp.BYTES + 1;
  const uncompressedLen = 2 * Fp.BYTES + 1;
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  function invN(a) {
    return invert(a, CURVE_ORDER);
  }
  const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a = point.toAffine();
      const x = Fp.toBytes(a.x);
      const cat = concatBytes;
      abool("isCompressed", isCompressed);
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
      }
    },
    fromBytes(bytes) {
      const len = bytes.length;
      const head = bytes[0];
      const tail = bytes.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE(tail);
        if (!inRange(x, _1n$1, Fp.ORDER))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y;
        try {
          y = Fp.sqrt(y2);
        } catch (sqrtError) {
          const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
          throw new Error("Point is not on curve" + suffix);
        }
        const isYOdd = (y & _1n$1) === _1n$1;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      } else {
        const cl = compressedLen;
        const ul = uncompressedLen;
        throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
      }
    }
  });
  const numToNByteStr = (num) => bytesToHex(numberToBytesBE(num, CURVE.nByteLength));
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n$1;
    return number > HALF;
  }
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN(-s) : s;
  }
  const slcNum = (b, from, to) => bytesToNumberBE(b.slice(from, to));
  class Signature {
    constructor(r, s, recovery) {
      this.r = r;
      this.s = s;
      this.recovery = recovery;
      this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l = CURVE.nByteLength;
      hex = ensureBytes("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r, s } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r, s);
    }
    assertValidity() {
      aInRange("r", this.r, _1n$1, CURVE_ORDER);
      aInRange("s", this.s, _1n$1, CURVE_ORDER);
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point.fromHex(prefix + numToNByteStr(radj));
      const ir = invN(radj);
      const u1 = modN(-h * ir);
      const u2 = modN(s * ir);
      const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes(this.toCompactHex());
    }
    toCompactHex() {
      return numToNByteStr(this.r) + numToNByteStr(this.s);
    }
  }
  const utils2 = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const length = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length), CURVE.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey(privateKey, isCompressed = true) {
    return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    const arr = isBytes(item);
    const str = typeof item === "string";
    const len = (arr || str) && item.length;
    if (arr)
      return len === compressedLen || len === uncompressedLen;
    if (str)
      return len === 2 * compressedLen || len === 2 * uncompressedLen;
    if (item instanceof Point)
      return true;
    return false;
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA))
      throw new Error("first arg must be private key");
    if (!isProbPub(publicB))
      throw new Error("second arg must be public key");
    const b = Point.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - CURVE.nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
    return modN(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(CURVE.nBitLength);
  function int2octets(num) {
    aInRange("num < 2^" + CURVE.nBitLength, num, _0n, ORDER_MASK);
    return numberToBytesBE(num, CURVE.nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { hash, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    validateSigVerOpts(opts);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null && ent !== false) {
      const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point.BASE.multiply(k).toAffine();
      const r = modN(q.x);
      if (r === _0n)
        return;
      const s = modN(ik * modN(m + r * d));
      if (s === _0n)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n$1);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  Point.BASE._setWindowSize(8);
  function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    const { lowS, prehash, format } = opts;
    validateSigVerOpts(opts);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    if (format !== void 0 && format !== "compact" && format !== "der")
      throw new Error("format must be compact or der");
    const isHex = typeof sg === "string" || isBytes(sg);
    const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let _sig = void 0;
    let P;
    try {
      if (isObj)
        _sig = new Signature(sg.r, sg.s);
      if (isHex) {
        try {
          if (format !== "compact")
            _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
        }
        if (!_sig && format !== "der")
          _sig = Signature.fromCompact(sg);
      }
      P = Point.fromHex(publicKey);
    } catch (error) {
      return false;
    }
    if (!_sig)
      return false;
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is = invN(s);
    const u1 = modN(h * is);
    const u2 = modN(r * is);
    const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN(R.x);
    return v === r;
  }
  return {
    CURVE,
    getPublicKey,
    getSharedSecret,
    sign,
    verify,
    ProjectivePoint: Point,
    Signature,
    utils: utils2
  };
}
function getHash(hash) {
  return {
    hash,
    hmac: (key, ...msgs) => hmac$1(hash, key, concatBytes$3(...msgs)),
    randomBytes: randomBytes$1
  };
}
function createCurve(curveDef, defHash) {
  const create = (hash) => weierstrass$1({ ...curveDef, ...getHash(hash) });
  return { ...create(defHash), create };
}
const secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
const secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
const _1n = BigInt(1);
const _2n = BigInt(2);
const divNearest = (a, b) => (a + b / _2n) / b;
function sqrtMod(y) {
  const P = secp256k1P;
  const _3n2 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n2, P) * b3 % P;
  const b9 = pow2(b6, _3n2, P) * b3 % P;
  const b11 = pow2(b9, _2n, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n2, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n, P);
  if (!Fpk1.eql(Fpk1.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
const Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
const secp256k1$1 = createCurve({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  Fp: Fpk1,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: secp256k1N,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: true,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k) => {
      const n = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b2 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b2 * k, n);
      const c2 = divNearest(-b1 * k, n);
      let k1 = mod(k - c1 * a1 - c2 * a2, n);
      let k2 = mod(-c1 * b1 - c2 * b2, n);
      const k1neg = k1 > POW_2_128;
      const k2neg = k2 > POW_2_128;
      if (k1neg)
        k1 = n - k1;
      if (k2neg)
        k2 = n - k2;
      if (k1 > POW_2_128 || k2 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k);
      }
      return { k1neg, k1, k2neg, k2 };
    }
  }
}, sha256$1);
BigInt(0);
const Fp256 = Field(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"));
const CURVE_A = Fp256.create(BigInt("-3"));
const CURVE_B = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");
const p256 = createCurve({
  a: CURVE_A,
  // Equation params: a, b
  b: CURVE_B,
  Fp: Fp256,
  // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
  // Curve order, total count of valid points in the field
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  // Base (generator) point (x, y)
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: false
}, sha256$1);
var secp256k1 = {};
var _shortw_utils = {};
var weierstrass = {};
var curve = {};
var modular = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.notImplemented = utils.bitMask = void 0;
  utils.isBytes = isBytes2;
  utils.abytes = abytes2;
  utils.abool = abool2;
  utils.numberToHexUnpadded = numberToHexUnpadded2;
  utils.hexToNumber = hexToNumber2;
  utils.bytesToHex = bytesToHex2;
  utils.hexToBytes = hexToBytes2;
  utils.bytesToNumberBE = bytesToNumberBE2;
  utils.bytesToNumberLE = bytesToNumberLE2;
  utils.numberToBytesBE = numberToBytesBE2;
  utils.numberToBytesLE = numberToBytesLE2;
  utils.numberToVarBytesBE = numberToVarBytesBE;
  utils.ensureBytes = ensureBytes2;
  utils.concatBytes = concatBytes2;
  utils.equalBytes = equalBytes2;
  utils.utf8ToBytes = utf8ToBytes;
  utils.inRange = inRange2;
  utils.aInRange = aInRange2;
  utils.bitLen = bitLen2;
  utils.bitGet = bitGet;
  utils.bitSet = bitSet;
  utils.createHmacDrbg = createHmacDrbg2;
  utils.validateObject = validateObject2;
  utils.memoized = memoized2;
  const _0n2 = /* @__PURE__ */ BigInt(0);
  const _1n2 = /* @__PURE__ */ BigInt(1);
  function isBytes2(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes2(item) {
    if (!isBytes2(item))
      throw new Error("Uint8Array expected");
  }
  function abool2(title, value) {
    if (typeof value !== "boolean")
      throw new Error(title + " boolean expected, got " + value);
  }
  function numberToHexUnpadded2(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? "0" + hex : hex;
  }
  function hexToNumber2(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return hex === "" ? _0n2 : BigInt("0x" + hex);
  }
  const hasHexBuiltin2 = (
    // @ts-ignore
    typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
  );
  const hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex2(bytes) {
    abytes2(bytes);
    if (hasHexBuiltin2)
      return bytes.toHex();
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += hexes2[bytes[i]];
    }
    return hex;
  }
  const asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function asciiToBase162(ch) {
    if (ch >= asciis2._0 && ch <= asciis2._9)
      return ch - asciis2._0;
    if (ch >= asciis2.A && ch <= asciis2.F)
      return ch - (asciis2.A - 10);
    if (ch >= asciis2.a && ch <= asciis2.f)
      return ch - (asciis2.a - 10);
    return;
  }
  function hexToBytes2(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    if (hasHexBuiltin2)
      return Uint8Array.fromHex(hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase162(hex.charCodeAt(hi));
      const n2 = asciiToBase162(hex.charCodeAt(hi + 1));
      if (n1 === void 0 || n2 === void 0) {
        const char = hex[hi] + hex[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n2;
    }
    return array;
  }
  function bytesToNumberBE2(bytes) {
    return hexToNumber2(bytesToHex2(bytes));
  }
  function bytesToNumberLE2(bytes) {
    abytes2(bytes);
    return hexToNumber2(bytesToHex2(Uint8Array.from(bytes).reverse()));
  }
  function numberToBytesBE2(n, len) {
    return hexToBytes2(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE2(n, len) {
    return numberToBytesBE2(n, len).reverse();
  }
  function numberToVarBytesBE(n) {
    return hexToBytes2(numberToHexUnpadded2(n));
  }
  function ensureBytes2(title, hex, expectedLength) {
    let res;
    if (typeof hex === "string") {
      try {
        res = hexToBytes2(hex);
      } catch (e) {
        throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
      }
    } else if (isBytes2(hex)) {
      res = Uint8Array.from(hex);
    } else {
      throw new Error(title + " must be hex string or Uint8Array");
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(title + " of length " + expectedLength + " expected, got " + len);
    return res;
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
  function equalBytes2(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
      diff |= a[i] ^ b[i];
    return diff === 0;
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  const isPosBig2 = (n) => typeof n === "bigint" && _0n2 <= n;
  function inRange2(n, min, max) {
    return isPosBig2(n) && isPosBig2(min) && isPosBig2(max) && min <= n && n < max;
  }
  function aInRange2(title, n, min, max) {
    if (!inRange2(n, min, max))
      throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
  }
  function bitLen2(n) {
    let len;
    for (len = 0; n > _0n2; n >>= _1n2, len += 1)
      ;
    return len;
  }
  function bitGet(n, pos) {
    return n >> BigInt(pos) & _1n2;
  }
  function bitSet(n, pos, value) {
    return n | (value ? _1n2 : _0n2) << BigInt(pos);
  }
  const bitMask2 = (n) => (_1n2 << BigInt(n)) - _1n2;
  utils.bitMask = bitMask2;
  const u8n2 = (len) => new Uint8Array(len);
  const u8fr2 = (arr) => Uint8Array.from(arr);
  function createHmacDrbg2(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n2(hashLen);
    let k = u8n2(hashLen);
    let i = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n2(0)) => {
      k = h(u8fr2([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr2([1]), seed);
      v = h();
    };
    const gen = () => {
      if (i++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes2(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  const validatorFns2 = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject2(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns2[type];
      if (typeof checkVal !== "function")
        throw new Error("invalid validator function");
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }
  const notImplemented = () => {
    throw new Error("not implemented");
  };
  utils.notImplemented = notImplemented;
  function memoized2(fn) {
    const map = /* @__PURE__ */ new WeakMap();
    return (arg, ...args) => {
      const val = map.get(arg);
      if (val !== void 0)
        return val;
      const computed = fn(arg, ...args);
      map.set(arg, computed);
      return computed;
    };
  }
  return utils;
}
var hasRequiredModular;
function requireModular() {
  if (hasRequiredModular) return modular;
  hasRequiredModular = 1;
  Object.defineProperty(modular, "__esModule", { value: true });
  modular.isNegativeLE = void 0;
  modular.mod = mod2;
  modular.pow = pow3;
  modular.pow2 = pow22;
  modular.invert = invert2;
  modular.tonelliShanks = tonelliShanks2;
  modular.FpSqrt = FpSqrt2;
  modular.validateField = validateField2;
  modular.FpPow = FpPow2;
  modular.FpInvertBatch = FpInvertBatch2;
  modular.FpDiv = FpDiv;
  modular.FpLegendre = FpLegendre2;
  modular.FpIsSquare = FpIsSquare;
  modular.nLength = nLength2;
  modular.Field = Field2;
  modular.FpSqrtOdd = FpSqrtOdd;
  modular.FpSqrtEven = FpSqrtEven;
  modular.hashToPrivateScalar = hashToPrivateScalar;
  modular.getFieldBytesLength = getFieldBytesLength2;
  modular.getMinHashLength = getMinHashLength2;
  modular.mapHashToField = mapHashToField2;
  const utils_1 = /* @__PURE__ */ requireUtils$5();
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = /* @__PURE__ */ BigInt(2), _3n2 = /* @__PURE__ */ BigInt(3);
  const _4n2 = /* @__PURE__ */ BigInt(4), _5n2 = /* @__PURE__ */ BigInt(5), _8n2 = /* @__PURE__ */ BigInt(8);
  function mod2(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow3(num, power, modulo) {
    return FpPow2(Field2(modulo), num, power);
  }
  function pow22(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert2(number, modulo) {
    if (number === _0n2)
      throw new Error("invert: expected non-zero number");
    if (modulo <= _0n2)
      throw new Error("invert: expected positive modulus, got " + modulo);
    let a = mod2(number, modulo);
    let b = modulo;
    let x = _0n2, u = _1n2;
    while (a !== _0n2) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      b = a, a = r, x = u, u = m;
    }
    const gcd = b;
    if (gcd !== _1n2)
      throw new Error("invert: does not exist");
    return mod2(x, modulo);
  }
  function sqrt3mod42(Fp, n) {
    const p1div4 = (Fp.ORDER + _1n2) / _4n2;
    const root = Fp.pow(n, p1div4);
    if (!Fp.eql(Fp.sqr(root), n))
      throw new Error("Cannot find square root");
    return root;
  }
  function sqrt5mod82(Fp, n) {
    const p5div8 = (Fp.ORDER - _5n2) / _8n2;
    const n2 = Fp.mul(n, _2n2);
    const v = Fp.pow(n2, p5div8);
    const nv = Fp.mul(n, v);
    const i = Fp.mul(Fp.mul(nv, _2n2), v);
    const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
    if (!Fp.eql(Fp.sqr(root), n))
      throw new Error("Cannot find square root");
    return root;
  }
  function tonelliShanks2(P) {
    if (P < BigInt(3))
      throw new Error("sqrt is not defined for small field");
    let Q = P - _1n2;
    let S = 0;
    while (Q % _2n2 === _0n2) {
      Q /= _2n2;
      S++;
    }
    let Z = _2n2;
    const _Fp = Field2(P);
    while (FpLegendre2(_Fp, Z) === 1) {
      if (Z++ > 1e3)
        throw new Error("Cannot find square root: probably non-prime P");
    }
    if (S === 1)
      return sqrt3mod42;
    let cc = _Fp.pow(Z, Q);
    const Q1div2 = (Q + _1n2) / _2n2;
    return function tonelliSlow(Fp, n) {
      if (Fp.is0(n))
        return n;
      if (FpLegendre2(Fp, n) !== 1)
        throw new Error("Cannot find square root");
      let M = S;
      let c = Fp.mul(Fp.ONE, cc);
      let t = Fp.pow(n, Q);
      let R = Fp.pow(n, Q1div2);
      while (!Fp.eql(t, Fp.ONE)) {
        if (Fp.is0(t))
          return Fp.ZERO;
        let i = 1;
        let t_tmp = Fp.sqr(t);
        while (!Fp.eql(t_tmp, Fp.ONE)) {
          i++;
          t_tmp = Fp.sqr(t_tmp);
          if (i === M)
            throw new Error("Cannot find square root");
        }
        const exponent = _1n2 << BigInt(M - i - 1);
        const b = Fp.pow(c, exponent);
        M = i;
        c = Fp.sqr(b);
        t = Fp.mul(t, c);
        R = Fp.mul(R, b);
      }
      return R;
    };
  }
  function FpSqrt2(P) {
    if (P % _4n2 === _3n2)
      return sqrt3mod42;
    if (P % _8n2 === _5n2)
      return sqrt5mod82;
    return tonelliShanks2(P);
  }
  const isNegativeLE = (num, modulo) => (mod2(num, modulo) & _1n2) === _1n2;
  modular.isNegativeLE = isNegativeLE;
  const FIELD_FIELDS2 = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField2(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS2.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return (0, utils_ts_1.validateObject)(field, opts);
  }
  function FpPow2(Fp, num, power) {
    if (power < _0n2)
      throw new Error("invalid exponent, negatives unsupported");
    if (power === _0n2)
      return Fp.ONE;
    if (power === _1n2)
      return num;
    let p = Fp.ONE;
    let d = num;
    while (power > _0n2) {
      if (power & _1n2)
        p = Fp.mul(p, d);
      d = Fp.sqr(d);
      power >>= _1n2;
    }
    return p;
  }
  function FpInvertBatch2(Fp, nums, passZero = false) {
    const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
    const multipliedAcc = nums.reduce((acc, num, i) => {
      if (Fp.is0(num))
        return acc;
      inverted[i] = acc;
      return Fp.mul(acc, num);
    }, Fp.ONE);
    const invertedAcc = Fp.inv(multipliedAcc);
    nums.reduceRight((acc, num, i) => {
      if (Fp.is0(num))
        return acc;
      inverted[i] = Fp.mul(acc, inverted[i]);
      return Fp.mul(acc, num);
    }, invertedAcc);
    return inverted;
  }
  function FpDiv(Fp, lhs, rhs) {
    return Fp.mul(lhs, typeof rhs === "bigint" ? invert2(rhs, Fp.ORDER) : Fp.inv(rhs));
  }
  function FpLegendre2(Fp, n) {
    const p1mod2 = (Fp.ORDER - _1n2) / _2n2;
    const powered = Fp.pow(n, p1mod2);
    const yes = Fp.eql(powered, Fp.ONE);
    const zero = Fp.eql(powered, Fp.ZERO);
    const no = Fp.eql(powered, Fp.neg(Fp.ONE));
    if (!yes && !zero && !no)
      throw new Error("invalid Legendre symbol result");
    return yes ? 1 : zero ? 0 : -1;
  }
  function FpIsSquare(Fp, n) {
    const l = FpLegendre2(Fp, n);
    return l === 1;
  }
  function nLength2(n, nBitLength) {
    if (nBitLength !== void 0)
      (0, utils_1.anumber)(nBitLength);
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field2(ORDER, bitLen2, isLE = false, redef = {}) {
    if (ORDER <= _0n2)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength2(ORDER, bitLen2);
    if (BYTES > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let sqrtP;
    const f = Object.freeze({
      ORDER,
      isLE,
      BITS,
      BYTES,
      MASK: (0, utils_ts_1.bitMask)(BITS),
      ZERO: _0n2,
      ONE: _1n2,
      create: (num) => mod2(num, ORDER),
      isValid: (num) => {
        if (typeof num !== "bigint")
          throw new Error("invalid field element: expected bigint, got " + typeof num);
        return _0n2 <= num && num < ORDER;
      },
      is0: (num) => num === _0n2,
      isOdd: (num) => (num & _1n2) === _1n2,
      neg: (num) => mod2(-num, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num) => mod2(num * num, ORDER),
      add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
      pow: (num, power) => FpPow2(f, num, power),
      div: (lhs, rhs) => mod2(lhs * invert2(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num) => num * num,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num) => invert2(num, ORDER),
      sqrt: redef.sqrt || ((n) => {
        if (!sqrtP)
          sqrtP = FpSqrt2(ORDER);
        return sqrtP(f, n);
      }),
      toBytes: (num) => isLE ? (0, utils_ts_1.numberToBytesLE)(num, BYTES) : (0, utils_ts_1.numberToBytesBE)(num, BYTES),
      fromBytes: (bytes) => {
        if (bytes.length !== BYTES)
          throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
        return isLE ? (0, utils_ts_1.bytesToNumberLE)(bytes) : (0, utils_ts_1.bytesToNumberBE)(bytes);
      },
      // TODO: we don't need it here, move out to separate fn
      invertBatch: (lst) => FpInvertBatch2(f, lst),
      // We can't move this out because Fp6, Fp12 implement it
      // and it's unclear what to return in there.
      cmov: (a, b, c) => c ? b : a
    });
    return Object.freeze(f);
  }
  function FpSqrtOdd(Fp, elm) {
    if (!Fp.isOdd)
      throw new Error("Field doesn't have isOdd");
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? root : Fp.neg(root);
  }
  function FpSqrtEven(Fp, elm) {
    if (!Fp.isOdd)
      throw new Error("Field doesn't have isOdd");
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? Fp.neg(root) : root;
  }
  function hashToPrivateScalar(hash, groupOrder, isLE = false) {
    hash = (0, utils_ts_1.ensureBytes)("privateHash", hash);
    const hashLen = hash.length;
    const minLen = nLength2(groupOrder).nByteLength + 8;
    if (minLen < 24 || hashLen < minLen || hashLen > 1024)
      throw new Error("hashToPrivateScalar: expected " + minLen + "-1024 bytes of input, got " + hashLen);
    const num = isLE ? (0, utils_ts_1.bytesToNumberLE)(hash) : (0, utils_ts_1.bytesToNumberBE)(hash);
    return mod2(num, groupOrder - _1n2) + _1n2;
  }
  function getFieldBytesLength2(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength2(fieldOrder) {
    const length = getFieldBytesLength2(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField2(key, fieldOrder, isLE = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength2(fieldOrder);
    const minLen = getMinHashLength2(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
    const num = isLE ? (0, utils_ts_1.bytesToNumberLE)(key) : (0, utils_ts_1.bytesToNumberBE)(key);
    const reduced = mod2(num, fieldOrder - _1n2) + _1n2;
    return isLE ? (0, utils_ts_1.numberToBytesLE)(reduced, fieldLen) : (0, utils_ts_1.numberToBytesBE)(reduced, fieldLen);
  }
  return modular;
}
var hasRequiredCurve;
function requireCurve() {
  if (hasRequiredCurve) return curve;
  hasRequiredCurve = 1;
  Object.defineProperty(curve, "__esModule", { value: true });
  curve.wNAF = wNAF2;
  curve.pippenger = pippenger2;
  curve.precomputeMSMUnsafe = precomputeMSMUnsafe;
  curve.validateBasic = validateBasic2;
  const modular_ts_1 = /* @__PURE__ */ requireModular();
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  const _0n2 = BigInt(0);
  const _1n2 = BigInt(1);
  function constTimeNegate2(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
  }
  function validateW2(W, bits) {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
      throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
  }
  function calcWOpts2(W, scalarBits) {
    validateW2(W, scalarBits);
    const windows = Math.ceil(scalarBits / W) + 1;
    const windowSize = 2 ** (W - 1);
    const maxNumber = 2 ** W;
    const mask = (0, utils_ts_1.bitMask)(W);
    const shiftBy = BigInt(W);
    return { windows, windowSize, mask, maxNumber, shiftBy };
  }
  function calcOffsets2(n, window, wOpts) {
    const { windowSize, mask, maxNumber, shiftBy } = wOpts;
    let wbits = Number(n & mask);
    let nextN = n >> shiftBy;
    if (wbits > windowSize) {
      wbits -= maxNumber;
      nextN += _1n2;
    }
    const offsetStart = window * windowSize;
    const offset = offsetStart + Math.abs(wbits) - 1;
    const isZero = wbits === 0;
    const isNeg = wbits < 0;
    const isNegF = window % 2 !== 0;
    const offsetF = offsetStart;
    return { nextN, offset, isZero, isNeg, isNegF, offsetF };
  }
  function validateMSMPoints2(points, c) {
    if (!Array.isArray(points))
      throw new Error("array expected");
    points.forEach((p, i) => {
      if (!(p instanceof c))
        throw new Error("invalid point at index " + i);
    });
  }
  function validateMSMScalars2(scalars, field) {
    if (!Array.isArray(scalars))
      throw new Error("array of scalars expected");
    scalars.forEach((s, i) => {
      if (!field.isValid(s))
        throw new Error("invalid scalar at index " + i);
    });
  }
  const pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
  const pointWindowSizes2 = /* @__PURE__ */ new WeakMap();
  function getW2(P) {
    return pointWindowSizes2.get(P) || 1;
  }
  function wNAF2(c, bits) {
    return {
      constTimeNegate: constTimeNegate2,
      hasPrecomputes(elm) {
        return getW2(elm) !== 1;
      },
      // non-const time multiplication ladder
      unsafeLadder(elm, n, p = c.ZERO) {
        let d = elm;
        while (n > _0n2) {
          if (n & _1n2)
            p = p.add(d);
          d = d.double();
          n >>= _1n2;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @param elm Point instance
       * @param W window size
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = calcWOpts2(W, bits);
        const points = [];
        let p = elm;
        let base = p;
        for (let window = 0; window < windows; window++) {
          base = p;
          points.push(base);
          for (let i = 1; i < windowSize; i++) {
            base = base.add(p);
            points.push(base);
          }
          p = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        let p = c.ZERO;
        let f = c.BASE;
        const wo = calcWOpts2(W, bits);
        for (let window = 0; window < wo.windows; window++) {
          const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets2(n, window, wo);
          n = nextN;
          if (isZero) {
            f = f.add(constTimeNegate2(isNegF, precomputes[offsetF]));
          } else {
            p = p.add(constTimeNegate2(isNeg, precomputes[offset]));
          }
        }
        return { p, f };
      },
      /**
       * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @param acc accumulator point to add result of multiplication
       * @returns point
       */
      wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
        const wo = calcWOpts2(W, bits);
        for (let window = 0; window < wo.windows; window++) {
          if (n === _0n2)
            break;
          const { nextN, offset, isZero, isNeg } = calcOffsets2(n, window, wo);
          n = nextN;
          if (isZero) {
            continue;
          } else {
            const item = precomputes[offset];
            acc = acc.add(isNeg ? item.negate() : item);
          }
        }
        return acc;
      },
      getPrecomputes(W, P, transform) {
        let comp = pointPrecomputes2.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1)
            pointPrecomputes2.set(P, transform(comp));
        }
        return comp;
      },
      wNAFCached(P, n, transform) {
        const W = getW2(P);
        return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
      },
      wNAFCachedUnsafe(P, n, transform, prev) {
        const W = getW2(P);
        if (W === 1)
          return this.unsafeLadder(P, n, prev);
        return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
      },
      // We calculate precomputes for elliptic curve point multiplication
      // using windowed method. This specifies window size and
      // stores precomputed values. Usually only base point would be precomputed.
      setWindowSize(P, W) {
        validateW2(W, bits);
        pointWindowSizes2.set(P, W);
        pointPrecomputes2.delete(P);
      }
    };
  }
  function pippenger2(c, fieldN, points, scalars) {
    validateMSMPoints2(points, c);
    validateMSMScalars2(scalars, fieldN);
    const plength = points.length;
    const slength = scalars.length;
    if (plength !== slength)
      throw new Error("arrays of points and scalars must have equal length");
    const zero = c.ZERO;
    const wbits = (0, utils_ts_1.bitLen)(BigInt(plength));
    let windowSize = 1;
    if (wbits > 12)
      windowSize = wbits - 3;
    else if (wbits > 4)
      windowSize = wbits - 2;
    else if (wbits > 0)
      windowSize = 2;
    const MASK = (0, utils_ts_1.bitMask)(windowSize);
    const buckets = new Array(Number(MASK) + 1).fill(zero);
    const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
    let sum = zero;
    for (let i = lastBits; i >= 0; i -= windowSize) {
      buckets.fill(zero);
      for (let j = 0; j < slength; j++) {
        const scalar = scalars[j];
        const wbits2 = Number(scalar >> BigInt(i) & MASK);
        buckets[wbits2] = buckets[wbits2].add(points[j]);
      }
      let resI = zero;
      for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
        sumI = sumI.add(buckets[j]);
        resI = resI.add(sumI);
      }
      sum = sum.add(resI);
      if (i !== 0)
        for (let j = 0; j < windowSize; j++)
          sum = sum.double();
    }
    return sum;
  }
  function precomputeMSMUnsafe(c, fieldN, points, windowSize) {
    validateW2(windowSize, fieldN.BITS);
    validateMSMPoints2(points, c);
    const zero = c.ZERO;
    const tableSize = 2 ** windowSize - 1;
    const chunks = Math.ceil(fieldN.BITS / windowSize);
    const MASK = (0, utils_ts_1.bitMask)(windowSize);
    const tables = points.map((p) => {
      const res = [];
      for (let i = 0, acc = p; i < tableSize; i++) {
        res.push(acc);
        acc = acc.add(p);
      }
      return res;
    });
    return (scalars) => {
      validateMSMScalars2(scalars, fieldN);
      if (scalars.length > points.length)
        throw new Error("array of scalars must be smaller than array of points");
      let res = zero;
      for (let i = 0; i < chunks; i++) {
        if (res !== zero)
          for (let j = 0; j < windowSize; j++)
            res = res.double();
        const shiftBy = BigInt(chunks * windowSize - (i + 1) * windowSize);
        for (let j = 0; j < scalars.length; j++) {
          const n = scalars[j];
          const curr = Number(n >> shiftBy & MASK);
          if (!curr)
            continue;
          res = res.add(tables[j][curr - 1]);
        }
      }
      return res;
    };
  }
  function validateBasic2(curve2) {
    (0, modular_ts_1.validateField)(curve2.Fp);
    (0, utils_ts_1.validateObject)(curve2, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...(0, modular_ts_1.nLength)(curve2.n, curve2.nBitLength),
      ...curve2,
      ...{ p: curve2.Fp.ORDER }
    });
  }
  return curve;
}
var hasRequiredWeierstrass;
function requireWeierstrass() {
  if (hasRequiredWeierstrass) return weierstrass;
  hasRequiredWeierstrass = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DER = exports.DERErr = void 0;
    exports.weierstrassPoints = weierstrassPoints2;
    exports.weierstrass = weierstrass2;
    exports.SWUFpSqrtRatio = SWUFpSqrtRatio;
    exports.mapToCurveSimpleSWU = mapToCurveSimpleSWU;
    const curve_ts_1 = /* @__PURE__ */ requireCurve();
    const modular_ts_1 = /* @__PURE__ */ requireModular();
    const utils_ts_1 = /* @__PURE__ */ requireUtils();
    function validateSigVerOpts2(opts) {
      if (opts.lowS !== void 0)
        (0, utils_ts_1.abool)("lowS", opts.lowS);
      if (opts.prehash !== void 0)
        (0, utils_ts_1.abool)("prehash", opts.prehash);
    }
    function validatePointOpts2(curve2) {
      const opts = (0, curve_ts_1.validateBasic)(curve2);
      (0, utils_ts_1.validateObject)(opts, {
        a: "field",
        b: "field"
      }, {
        allowInfinityPoint: "boolean",
        allowedPrivateKeyLengths: "array",
        clearCofactor: "function",
        fromBytes: "function",
        isTorsionFree: "function",
        toBytes: "function",
        wrapPrivateKey: "boolean"
      });
      const { endo, Fp, a } = opts;
      if (endo) {
        if (!Fp.eql(a, Fp.ZERO)) {
          throw new Error("invalid endo: CURVE.a must be 0");
        }
        if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
          throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
        }
      }
      return Object.freeze({ ...opts });
    }
    class DERErr3 extends Error {
      constructor(m = "") {
        super(m);
      }
    }
    exports.DERErr = DERErr3;
    exports.DER = {
      // asn.1 DER encoding utils
      Err: DERErr3,
      // Basic building block is TLV (Tag-Length-Value)
      _tlv: {
        encode: (tag, data) => {
          const { Err: E } = exports.DER;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length & 1)
            throw new E("tlv.encode: unpadded data");
          const dataLen = data.length / 2;
          const len = (0, utils_ts_1.numberToHexUnpadded)(dataLen);
          if (len.length / 2 & 128)
            throw new E("tlv.encode: long form length too big");
          const lenLen = dataLen > 127 ? (0, utils_ts_1.numberToHexUnpadded)(len.length / 2 | 128) : "";
          const t = (0, utils_ts_1.numberToHexUnpadded)(tag);
          return t + lenLen + len + data;
        },
        // v - value, l - left bytes (unparsed)
        decode(tag, data) {
          const { Err: E } = exports.DER;
          let pos = 0;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length < 2 || data[pos++] !== tag)
            throw new E("tlv.decode: wrong tlv");
          const first = data[pos++];
          const isLong = !!(first & 128);
          let length = 0;
          if (!isLong)
            length = first;
          else {
            const lenLen = first & 127;
            if (!lenLen)
              throw new E("tlv.decode(long): indefinite length not supported");
            if (lenLen > 4)
              throw new E("tlv.decode(long): byte length is too big");
            const lengthBytes = data.subarray(pos, pos + lenLen);
            if (lengthBytes.length !== lenLen)
              throw new E("tlv.decode: length bytes not complete");
            if (lengthBytes[0] === 0)
              throw new E("tlv.decode(long): zero leftmost byte");
            for (const b of lengthBytes)
              length = length << 8 | b;
            pos += lenLen;
            if (length < 128)
              throw new E("tlv.decode(long): not minimal encoding");
          }
          const v = data.subarray(pos, pos + length);
          if (v.length !== length)
            throw new E("tlv.decode: wrong value length");
          return { v, l: data.subarray(pos + length) };
        }
      },
      // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
      // since we always use positive integers here. It must always be empty:
      // - add zero byte if exists
      // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
      _int: {
        encode(num) {
          const { Err: E } = exports.DER;
          if (num < _0n2)
            throw new E("integer: negative integers are not allowed");
          let hex = (0, utils_ts_1.numberToHexUnpadded)(num);
          if (Number.parseInt(hex[0], 16) & 8)
            hex = "00" + hex;
          if (hex.length & 1)
            throw new E("unexpected DER parsing assertion: unpadded hex");
          return hex;
        },
        decode(data) {
          const { Err: E } = exports.DER;
          if (data[0] & 128)
            throw new E("invalid signature integer: negative");
          if (data[0] === 0 && !(data[1] & 128))
            throw new E("invalid signature integer: unnecessary leading zero");
          return (0, utils_ts_1.bytesToNumberBE)(data);
        }
      },
      toSig(hex) {
        const { Err: E, _int: int, _tlv: tlv } = exports.DER;
        const data = (0, utils_ts_1.ensureBytes)("signature", hex);
        const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
        if (seqLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
        const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
        if (sLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        return { r: int.decode(rBytes), s: int.decode(sBytes) };
      },
      hexFromSig(sig) {
        const { _tlv: tlv, _int: int } = exports.DER;
        const rs = tlv.encode(2, int.encode(sig.r));
        const ss = tlv.encode(2, int.encode(sig.s));
        const seq = rs + ss;
        return tlv.encode(48, seq);
      }
    };
    function numToSizedHex2(num, size) {
      return (0, utils_ts_1.bytesToHex)((0, utils_ts_1.numberToBytesBE)(num, size));
    }
    const _0n2 = BigInt(0), _1n2 = BigInt(1), _2n2 = BigInt(2), _3n2 = BigInt(3), _4n2 = BigInt(4);
    function weierstrassPoints2(opts) {
      const CURVE = validatePointOpts2(opts);
      const { Fp } = CURVE;
      const Fn = (0, modular_ts_1.Field)(CURVE.n, CURVE.nBitLength);
      const toBytes = CURVE.toBytes || ((_c, point, _isCompressed) => {
        const a = point.toAffine();
        return (0, utils_ts_1.concatBytes)(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
      });
      const fromBytes = CURVE.fromBytes || ((bytes) => {
        const tail = bytes.subarray(1);
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      });
      function weierstrassEquation(x) {
        const { a, b } = CURVE;
        const x2 = Fp.sqr(x);
        const x3 = Fp.mul(x2, x);
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
      }
      function isValidXY(x, y) {
        const left = Fp.sqr(y);
        const right = weierstrassEquation(x);
        return Fp.eql(left, right);
      }
      if (!isValidXY(CURVE.Gx, CURVE.Gy))
        throw new Error("bad curve params: generator point");
      const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n2), _4n2);
      const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
      if (Fp.is0(Fp.add(_4a3, _27b2)))
        throw new Error("bad curve params: a or b");
      function isWithinCurveOrder(num) {
        return (0, utils_ts_1.inRange)(num, _1n2, CURVE.n);
      }
      function normPrivateKeyToScalar(key) {
        const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
        if (lengths && typeof key !== "bigint") {
          if ((0, utils_ts_1.isBytes)(key))
            key = (0, utils_ts_1.bytesToHex)(key);
          if (typeof key !== "string" || !lengths.includes(key.length))
            throw new Error("invalid private key");
          key = key.padStart(nByteLength * 2, "0");
        }
        let num;
        try {
          num = typeof key === "bigint" ? key : (0, utils_ts_1.bytesToNumberBE)((0, utils_ts_1.ensureBytes)("private key", key, nByteLength));
        } catch (error) {
          throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
        }
        if (wrapPrivateKey)
          num = (0, modular_ts_1.mod)(num, N);
        (0, utils_ts_1.aInRange)("private key", num, _1n2, N);
        return num;
      }
      function aprjpoint(other) {
        if (!(other instanceof Point))
          throw new Error("ProjectivePoint expected");
      }
      const toAffineMemo = (0, utils_ts_1.memoized)((p, iz) => {
        const { px: x, py: y, pz: z } = p;
        if (Fp.eql(z, Fp.ONE))
          return { x, y };
        const is0 = p.is0();
        if (iz == null)
          iz = is0 ? Fp.ONE : Fp.inv(z);
        const ax = Fp.mul(x, iz);
        const ay = Fp.mul(y, iz);
        const zz = Fp.mul(z, iz);
        if (is0)
          return { x: Fp.ZERO, y: Fp.ZERO };
        if (!Fp.eql(zz, Fp.ONE))
          throw new Error("invZ was invalid");
        return { x: ax, y: ay };
      });
      const assertValidMemo = (0, utils_ts_1.memoized)((p) => {
        if (p.is0()) {
          if (CURVE.allowInfinityPoint && !Fp.is0(p.py))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x, y } = p.toAffine();
        if (!Fp.isValid(x) || !Fp.isValid(y))
          throw new Error("bad point: x or y not FE");
        if (!isValidXY(x, y))
          throw new Error("bad point: equation left != right");
        if (!p.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
        return true;
      });
      class Point {
        constructor(px, py, pz) {
          if (px == null || !Fp.isValid(px))
            throw new Error("x required");
          if (py == null || !Fp.isValid(py) || Fp.is0(py))
            throw new Error("y required");
          if (pz == null || !Fp.isValid(pz))
            throw new Error("z required");
          this.px = px;
          this.py = py;
          this.pz = pz;
          Object.freeze(this);
        }
        // Does not validate if the point is on-curve.
        // Use fromHex instead, or call assertValidity() later.
        static fromAffine(p) {
          const { x, y } = p || {};
          if (!p || !Fp.isValid(x) || !Fp.isValid(y))
            throw new Error("invalid affine point");
          if (p instanceof Point)
            throw new Error("projective point not allowed");
          const is0 = (i) => Fp.eql(i, Fp.ZERO);
          if (is0(x) && is0(y))
            return Point.ZERO;
          return new Point(x, y, Fp.ONE);
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        /**
         * Takes a bunch of Projective Points but executes only one
         * inversion on all of them. Inversion is very slow operation,
         * so this improves performance massively.
         * Optimization: converts a list of projective points to a list of identical points with Z=1.
         */
        static normalizeZ(points) {
          const toInv = (0, modular_ts_1.FpInvertBatch)(Fp, points.map((p) => p.pz));
          return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        /**
         * Converts hash string or Uint8Array to Point.
         * @param hex short/long ECDSA hex
         */
        static fromHex(hex) {
          const P = Point.fromAffine(fromBytes((0, utils_ts_1.ensureBytes)("pointHex", hex)));
          P.assertValidity();
          return P;
        }
        // Multiplies generator point by privateKey.
        static fromPrivateKey(privateKey) {
          return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
        }
        // Multiscalar Multiplication
        static msm(points, scalars) {
          return (0, curve_ts_1.pippenger)(Point, Fn, points, scalars);
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
          wnaf.setWindowSize(this, windowSize);
        }
        // A point on curve is valid if it conforms to equation.
        assertValidity() {
          assertValidMemo(this);
        }
        hasEvenY() {
          const { y } = this.toAffine();
          if (Fp.isOdd)
            return !Fp.isOdd(y);
          throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */
        equals(other) {
          aprjpoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
          const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
          return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */
        negate() {
          return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
          const { a, b } = CURVE;
          const b3 = Fp.mul(b, _3n2);
          const { px: X1, py: Y1, pz: Z1 } = this;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          let t0 = Fp.mul(X1, X1);
          let t1 = Fp.mul(Y1, Y1);
          let t2 = Fp.mul(Z1, Z1);
          let t3 = Fp.mul(X1, Y1);
          t3 = Fp.add(t3, t3);
          Z3 = Fp.mul(X1, Z1);
          Z3 = Fp.add(Z3, Z3);
          X3 = Fp.mul(a, Z3);
          Y3 = Fp.mul(b3, t2);
          Y3 = Fp.add(X3, Y3);
          X3 = Fp.sub(t1, Y3);
          Y3 = Fp.add(t1, Y3);
          Y3 = Fp.mul(X3, Y3);
          X3 = Fp.mul(t3, X3);
          Z3 = Fp.mul(b3, Z3);
          t2 = Fp.mul(a, t2);
          t3 = Fp.sub(t0, t2);
          t3 = Fp.mul(a, t3);
          t3 = Fp.add(t3, Z3);
          Z3 = Fp.add(t0, t0);
          t0 = Fp.add(Z3, t0);
          t0 = Fp.add(t0, t2);
          t0 = Fp.mul(t0, t3);
          Y3 = Fp.add(Y3, t0);
          t2 = Fp.mul(Y1, Z1);
          t2 = Fp.add(t2, t2);
          t0 = Fp.mul(t2, t3);
          X3 = Fp.sub(X3, t0);
          Z3 = Fp.mul(t2, t1);
          Z3 = Fp.add(Z3, Z3);
          Z3 = Fp.add(Z3, Z3);
          return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
          aprjpoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          const a = CURVE.a;
          const b3 = Fp.mul(CURVE.b, _3n2);
          let t0 = Fp.mul(X1, X2);
          let t1 = Fp.mul(Y1, Y2);
          let t2 = Fp.mul(Z1, Z2);
          let t3 = Fp.add(X1, Y1);
          let t4 = Fp.add(X2, Y2);
          t3 = Fp.mul(t3, t4);
          t4 = Fp.add(t0, t1);
          t3 = Fp.sub(t3, t4);
          t4 = Fp.add(X1, Z1);
          let t5 = Fp.add(X2, Z2);
          t4 = Fp.mul(t4, t5);
          t5 = Fp.add(t0, t2);
          t4 = Fp.sub(t4, t5);
          t5 = Fp.add(Y1, Z1);
          X3 = Fp.add(Y2, Z2);
          t5 = Fp.mul(t5, X3);
          X3 = Fp.add(t1, t2);
          t5 = Fp.sub(t5, X3);
          Z3 = Fp.mul(a, t4);
          X3 = Fp.mul(b3, t2);
          Z3 = Fp.add(X3, Z3);
          X3 = Fp.sub(t1, Z3);
          Z3 = Fp.add(t1, Z3);
          Y3 = Fp.mul(X3, Z3);
          t1 = Fp.add(t0, t0);
          t1 = Fp.add(t1, t0);
          t2 = Fp.mul(a, t2);
          t4 = Fp.mul(b3, t4);
          t1 = Fp.add(t1, t2);
          t2 = Fp.sub(t0, t2);
          t2 = Fp.mul(a, t2);
          t4 = Fp.add(t4, t2);
          t0 = Fp.mul(t1, t4);
          Y3 = Fp.add(Y3, t0);
          t0 = Fp.mul(t5, t4);
          X3 = Fp.mul(t3, X3);
          X3 = Fp.sub(X3, t0);
          t0 = Fp.mul(t3, t1);
          Z3 = Fp.mul(t5, Z3);
          Z3 = Fp.add(Z3, t0);
          return new Point(X3, Y3, Z3);
        }
        subtract(other) {
          return this.add(other.negate());
        }
        is0() {
          return this.equals(Point.ZERO);
        }
        wNAF(n) {
          return wnaf.wNAFCached(this, n, Point.normalizeZ);
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(sc) {
          const { endo: endo2, n: N } = CURVE;
          (0, utils_ts_1.aInRange)("scalar", sc, _0n2, N);
          const I = Point.ZERO;
          if (sc === _0n2)
            return I;
          if (this.is0() || sc === _1n2)
            return this;
          if (!endo2 || wnaf.hasPrecomputes(this))
            return wnaf.wNAFCachedUnsafe(this, sc, Point.normalizeZ);
          let { k1neg, k1, k2neg, k2 } = endo2.splitScalar(sc);
          let k1p = I;
          let k2p = I;
          let d = this;
          while (k1 > _0n2 || k2 > _0n2) {
            if (k1 & _1n2)
              k1p = k1p.add(d);
            if (k2 & _1n2)
              k2p = k2p.add(d);
            d = d.double();
            k1 >>= _1n2;
            k2 >>= _1n2;
          }
          if (k1neg)
            k1p = k1p.negate();
          if (k2neg)
            k2p = k2p.negate();
          k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
          return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(scalar) {
          const { endo: endo2, n: N } = CURVE;
          (0, utils_ts_1.aInRange)("scalar", scalar, _1n2, N);
          let point, fake;
          if (endo2) {
            const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(scalar);
            let { p: k1p, f: f1p } = this.wNAF(k1);
            let { p: k2p, f: f2p } = this.wNAF(k2);
            k1p = wnaf.constTimeNegate(k1neg, k1p);
            k2p = wnaf.constTimeNegate(k2neg, k2p);
            k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
            point = k1p.add(k2p);
            fake = f1p.add(f2p);
          } else {
            const { p, f } = this.wNAF(scalar);
            point = p;
            fake = f;
          }
          return Point.normalizeZ([point, fake])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */
        multiplyAndAddUnsafe(Q, a, b) {
          const G = Point.BASE;
          const mul = (P, a2) => a2 === _0n2 || a2 === _1n2 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
          const sum = mul(this, a).add(mul(Q, b));
          return sum.is0() ? void 0 : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
          return toAffineMemo(this, iz);
        }
        isTorsionFree() {
          const { h: cofactor, isTorsionFree } = CURVE;
          if (cofactor === _1n2)
            return true;
          if (isTorsionFree)
            return isTorsionFree(Point, this);
          throw new Error("isTorsionFree() has not been declared for the elliptic curve");
        }
        clearCofactor() {
          const { h: cofactor, clearCofactor } = CURVE;
          if (cofactor === _1n2)
            return this;
          if (clearCofactor)
            return clearCofactor(Point, this);
          return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
          (0, utils_ts_1.abool)("isCompressed", isCompressed);
          this.assertValidity();
          return toBytes(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
          (0, utils_ts_1.abool)("isCompressed", isCompressed);
          return (0, utils_ts_1.bytesToHex)(this.toRawBytes(isCompressed));
        }
      }
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
      Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
      const { endo, nBitLength } = CURVE;
      const wnaf = (0, curve_ts_1.wNAF)(Point, endo ? Math.ceil(nBitLength / 2) : nBitLength);
      return {
        CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar,
        weierstrassEquation,
        isWithinCurveOrder
      };
    }
    function validateOpts2(curve2) {
      const opts = (0, curve_ts_1.validateBasic)(curve2);
      (0, utils_ts_1.validateObject)(opts, {
        hash: "hash",
        hmac: "function",
        randomBytes: "function"
      }, {
        bits2int: "function",
        bits2int_modN: "function",
        lowS: "boolean"
      });
      return Object.freeze({ lowS: true, ...opts });
    }
    function weierstrass2(curveDef) {
      const CURVE = validateOpts2(curveDef);
      const { Fp, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
      const compressedLen = Fp.BYTES + 1;
      const uncompressedLen = 2 * Fp.BYTES + 1;
      function modN(a) {
        return (0, modular_ts_1.mod)(a, CURVE_ORDER);
      }
      function invN(a) {
        return (0, modular_ts_1.invert)(a, CURVE_ORDER);
      }
      const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints2({
        ...CURVE,
        toBytes(_c, point, isCompressed) {
          const a = point.toAffine();
          const x = Fp.toBytes(a.x);
          const cat = utils_ts_1.concatBytes;
          (0, utils_ts_1.abool)("isCompressed", isCompressed);
          if (isCompressed) {
            return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
          } else {
            return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
          }
        },
        fromBytes(bytes) {
          const len = bytes.length;
          const head = bytes[0];
          const tail = bytes.subarray(1);
          if (len === compressedLen && (head === 2 || head === 3)) {
            const x = (0, utils_ts_1.bytesToNumberBE)(tail);
            if (!(0, utils_ts_1.inRange)(x, _1n2, Fp.ORDER))
              throw new Error("Point is not on curve");
            const y2 = weierstrassEquation(x);
            let y;
            try {
              y = Fp.sqrt(y2);
            } catch (sqrtError) {
              const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
              throw new Error("Point is not on curve" + suffix);
            }
            const isYOdd = (y & _1n2) === _1n2;
            const isHeadOdd = (head & 1) === 1;
            if (isHeadOdd !== isYOdd)
              y = Fp.neg(y);
            return { x, y };
          } else if (len === uncompressedLen && head === 4) {
            const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
            const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
            return { x, y };
          } else {
            const cl = compressedLen;
            const ul = uncompressedLen;
            throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
          }
        }
      });
      function isBiggerThanHalfOrder(number) {
        const HALF = CURVE_ORDER >> _1n2;
        return number > HALF;
      }
      function normalizeS(s) {
        return isBiggerThanHalfOrder(s) ? modN(-s) : s;
      }
      const slcNum = (b, from, to) => (0, utils_ts_1.bytesToNumberBE)(b.slice(from, to));
      class Signature {
        constructor(r, s, recovery) {
          (0, utils_ts_1.aInRange)("r", r, _1n2, CURVE_ORDER);
          (0, utils_ts_1.aInRange)("s", s, _1n2, CURVE_ORDER);
          this.r = r;
          this.s = s;
          if (recovery != null)
            this.recovery = recovery;
          Object.freeze(this);
        }
        // pair (bytes of r, bytes of s)
        static fromCompact(hex) {
          const l = nByteLength;
          hex = (0, utils_ts_1.ensureBytes)("compactSignature", hex, l * 2);
          return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
        }
        // DER encoded ECDSA signature
        // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
        static fromDER(hex) {
          const { r, s } = exports.DER.toSig((0, utils_ts_1.ensureBytes)("DER", hex));
          return new Signature(r, s);
        }
        /**
         * @todo remove
         * @deprecated
         */
        assertValidity() {
        }
        addRecoveryBit(recovery) {
          return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(msgHash) {
          const { r, s, recovery: rec } = this;
          const h = bits2int_modN((0, utils_ts_1.ensureBytes)("msgHash", msgHash));
          if (rec == null || ![0, 1, 2, 3].includes(rec))
            throw new Error("recovery id invalid");
          const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
          if (radj >= Fp.ORDER)
            throw new Error("recovery id 2 or 3 invalid");
          const prefix = (rec & 1) === 0 ? "02" : "03";
          const R = Point.fromHex(prefix + numToSizedHex2(radj, Fp.BYTES));
          const ir = invN(radj);
          const u1 = modN(-h * ir);
          const u2 = modN(s * ir);
          const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
          if (!Q)
            throw new Error("point at infinify");
          Q.assertValidity();
          return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
          return isBiggerThanHalfOrder(this.s);
        }
        normalizeS() {
          return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
        }
        // DER-encoded
        toDERRawBytes() {
          return (0, utils_ts_1.hexToBytes)(this.toDERHex());
        }
        toDERHex() {
          return exports.DER.hexFromSig(this);
        }
        // padded bytes of r, then padded bytes of s
        toCompactRawBytes() {
          return (0, utils_ts_1.hexToBytes)(this.toCompactHex());
        }
        toCompactHex() {
          const l = nByteLength;
          return numToSizedHex2(this.r, l) + numToSizedHex2(this.s, l);
        }
      }
      const utils2 = {
        isValidPrivateKey(privateKey) {
          try {
            normPrivateKeyToScalar(privateKey);
            return true;
          } catch (error) {
            return false;
          }
        },
        normPrivateKeyToScalar,
        /**
         * Produces cryptographically secure private key from random of size
         * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
         */
        randomPrivateKey: () => {
          const length = (0, modular_ts_1.getMinHashLength)(CURVE.n);
          return (0, modular_ts_1.mapHashToField)(CURVE.randomBytes(length), CURVE.n);
        },
        /**
         * Creates precompute table for an arbitrary EC point. Makes point "cached".
         * Allows to massively speed-up `point.multiply(scalar)`.
         * @returns cached point
         * @example
         * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
         * fast.multiply(privKey); // much faster ECDH now
         */
        precompute(windowSize = 8, point = Point.BASE) {
          point._setWindowSize(windowSize);
          point.multiply(BigInt(3));
          return point;
        }
      };
      function getPublicKey(privateKey, isCompressed = true) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
      }
      function isProbPub(item) {
        if (typeof item === "bigint")
          return false;
        if (item instanceof Point)
          return true;
        const arr = (0, utils_ts_1.ensureBytes)("key", item);
        const len = arr.length;
        const fpl = Fp.BYTES;
        const compLen = fpl + 1;
        const uncompLen = 2 * fpl + 1;
        if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
          return void 0;
        } else {
          return len === compLen || len === uncompLen;
        }
      }
      function getSharedSecret(privateA, publicB, isCompressed = true) {
        if (isProbPub(privateA) === true)
          throw new Error("first arg must be private key");
        if (isProbPub(publicB) === false)
          throw new Error("second arg must be public key");
        const b = Point.fromHex(publicB);
        return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
      }
      const bits2int = CURVE.bits2int || function(bytes) {
        if (bytes.length > 8192)
          throw new Error("input is too large");
        const num = (0, utils_ts_1.bytesToNumberBE)(bytes);
        const delta = bytes.length * 8 - nBitLength;
        return delta > 0 ? num >> BigInt(delta) : num;
      };
      const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
        return modN(bits2int(bytes));
      };
      const ORDER_MASK = (0, utils_ts_1.bitMask)(nBitLength);
      function int2octets(num) {
        (0, utils_ts_1.aInRange)("num < 2^" + nBitLength, num, _0n2, ORDER_MASK);
        return (0, utils_ts_1.numberToBytesBE)(num, nByteLength);
      }
      function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
        if (["recovered", "canonical"].some((k) => k in opts))
          throw new Error("sign() legacy options not supported");
        const { hash, randomBytes: randomBytes2 } = CURVE;
        let { lowS, prehash, extraEntropy: ent } = opts;
        if (lowS == null)
          lowS = true;
        msgHash = (0, utils_ts_1.ensureBytes)("msgHash", msgHash);
        validateSigVerOpts2(opts);
        if (prehash)
          msgHash = (0, utils_ts_1.ensureBytes)("prehashed msgHash", hash(msgHash));
        const h1int = bits2int_modN(msgHash);
        const d = normPrivateKeyToScalar(privateKey);
        const seedArgs = [int2octets(d), int2octets(h1int)];
        if (ent != null && ent !== false) {
          const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
          seedArgs.push((0, utils_ts_1.ensureBytes)("extraEntropy", e));
        }
        const seed = (0, utils_ts_1.concatBytes)(...seedArgs);
        const m = h1int;
        function k2sig(kBytes) {
          const k = bits2int(kBytes);
          if (!isWithinCurveOrder(k))
            return;
          const ik = invN(k);
          const q = Point.BASE.multiply(k).toAffine();
          const r = modN(q.x);
          if (r === _0n2)
            return;
          const s = modN(ik * modN(m + r * d));
          if (s === _0n2)
            return;
          let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n2);
          let normS = s;
          if (lowS && isBiggerThanHalfOrder(s)) {
            normS = normalizeS(s);
            recovery ^= 1;
          }
          return new Signature(r, normS, recovery);
        }
        return { seed, k2sig };
      }
      const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
      const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
      function sign(msgHash, privKey, opts = defaultSigOpts) {
        const { seed, k2sig } = prepSig(msgHash, privKey, opts);
        const C = CURVE;
        const drbg = (0, utils_ts_1.createHmacDrbg)(C.hash.outputLen, C.nByteLength, C.hmac);
        return drbg(seed, k2sig);
      }
      Point.BASE._setWindowSize(8);
      function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
        const sg = signature;
        msgHash = (0, utils_ts_1.ensureBytes)("msgHash", msgHash);
        publicKey = (0, utils_ts_1.ensureBytes)("publicKey", publicKey);
        const { lowS, prehash, format } = opts;
        validateSigVerOpts2(opts);
        if ("strict" in opts)
          throw new Error("options.strict was renamed to lowS");
        if (format !== void 0 && format !== "compact" && format !== "der")
          throw new Error("format must be compact or der");
        const isHex = typeof sg === "string" || (0, utils_ts_1.isBytes)(sg);
        const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
        if (!isHex && !isObj)
          throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        let _sig = void 0;
        let P;
        try {
          if (isObj)
            _sig = new Signature(sg.r, sg.s);
          if (isHex) {
            try {
              if (format !== "compact")
                _sig = Signature.fromDER(sg);
            } catch (derError) {
              if (!(derError instanceof exports.DER.Err))
                throw derError;
            }
            if (!_sig && format !== "der")
              _sig = Signature.fromCompact(sg);
          }
          P = Point.fromHex(publicKey);
        } catch (error) {
          return false;
        }
        if (!_sig)
          return false;
        if (lowS && _sig.hasHighS())
          return false;
        if (prehash)
          msgHash = CURVE.hash(msgHash);
        const { r, s } = _sig;
        const h = bits2int_modN(msgHash);
        const is = invN(s);
        const u1 = modN(h * is);
        const u2 = modN(r * is);
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
        if (!R)
          return false;
        const v = modN(R.x);
        return v === r;
      }
      return {
        CURVE,
        getPublicKey,
        getSharedSecret,
        sign,
        verify,
        ProjectivePoint: Point,
        Signature,
        utils: utils2
      };
    }
    function SWUFpSqrtRatio(Fp, Z) {
      const q = Fp.ORDER;
      let l = _0n2;
      for (let o = q - _1n2; o % _2n2 === _0n2; o /= _2n2)
        l += _1n2;
      const c1 = l;
      const _2n_pow_c1_1 = _2n2 << c1 - _1n2 - _1n2;
      const _2n_pow_c1 = _2n_pow_c1_1 * _2n2;
      const c2 = (q - _1n2) / _2n_pow_c1;
      const c3 = (c2 - _1n2) / _2n2;
      const c4 = _2n_pow_c1 - _1n2;
      const c5 = _2n_pow_c1_1;
      const c6 = Fp.pow(Z, c2);
      const c7 = Fp.pow(Z, (c2 + _1n2) / _2n2);
      let sqrtRatio = (u, v) => {
        let tv1 = c6;
        let tv2 = Fp.pow(v, c4);
        let tv3 = Fp.sqr(tv2);
        tv3 = Fp.mul(tv3, v);
        let tv5 = Fp.mul(u, tv3);
        tv5 = Fp.pow(tv5, c3);
        tv5 = Fp.mul(tv5, tv2);
        tv2 = Fp.mul(tv5, v);
        tv3 = Fp.mul(tv5, u);
        let tv4 = Fp.mul(tv3, tv2);
        tv5 = Fp.pow(tv4, c5);
        let isQR = Fp.eql(tv5, Fp.ONE);
        tv2 = Fp.mul(tv3, c7);
        tv5 = Fp.mul(tv4, tv1);
        tv3 = Fp.cmov(tv2, tv3, isQR);
        tv4 = Fp.cmov(tv5, tv4, isQR);
        for (let i = c1; i > _1n2; i--) {
          let tv52 = i - _2n2;
          tv52 = _2n2 << tv52 - _1n2;
          let tvv5 = Fp.pow(tv4, tv52);
          const e1 = Fp.eql(tvv5, Fp.ONE);
          tv2 = Fp.mul(tv3, tv1);
          tv1 = Fp.mul(tv1, tv1);
          tvv5 = Fp.mul(tv4, tv1);
          tv3 = Fp.cmov(tv2, tv3, e1);
          tv4 = Fp.cmov(tvv5, tv4, e1);
        }
        return { isValid: isQR, value: tv3 };
      };
      if (Fp.ORDER % _4n2 === _3n2) {
        const c12 = (Fp.ORDER - _3n2) / _4n2;
        const c22 = Fp.sqrt(Fp.neg(Z));
        sqrtRatio = (u, v) => {
          let tv1 = Fp.sqr(v);
          const tv2 = Fp.mul(u, v);
          tv1 = Fp.mul(tv1, tv2);
          let y1 = Fp.pow(tv1, c12);
          y1 = Fp.mul(y1, tv2);
          const y2 = Fp.mul(y1, c22);
          const tv3 = Fp.mul(Fp.sqr(y1), v);
          const isQR = Fp.eql(tv3, u);
          let y = Fp.cmov(y2, y1, isQR);
          return { isValid: isQR, value: y };
        };
      }
      return sqrtRatio;
    }
    function mapToCurveSimpleSWU(Fp, opts) {
      (0, modular_ts_1.validateField)(Fp);
      if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z))
        throw new Error("mapToCurveSimpleSWU: invalid opts");
      const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
      if (!Fp.isOdd)
        throw new Error("Fp.isOdd is not implemented!");
      return (u) => {
        let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
        tv1 = Fp.sqr(u);
        tv1 = Fp.mul(tv1, opts.Z);
        tv2 = Fp.sqr(tv1);
        tv2 = Fp.add(tv2, tv1);
        tv3 = Fp.add(tv2, Fp.ONE);
        tv3 = Fp.mul(tv3, opts.B);
        tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
        tv4 = Fp.mul(tv4, opts.A);
        tv2 = Fp.sqr(tv3);
        tv6 = Fp.sqr(tv4);
        tv5 = Fp.mul(tv6, opts.A);
        tv2 = Fp.add(tv2, tv5);
        tv2 = Fp.mul(tv2, tv3);
        tv6 = Fp.mul(tv6, tv4);
        tv5 = Fp.mul(tv6, opts.B);
        tv2 = Fp.add(tv2, tv5);
        x = Fp.mul(tv1, tv3);
        const { isValid, value } = sqrtRatio(tv2, tv6);
        y = Fp.mul(tv1, u);
        y = Fp.mul(y, value);
        x = Fp.cmov(x, tv3, isValid);
        y = Fp.cmov(y, value, isValid);
        const e1 = Fp.isOdd(u) === Fp.isOdd(y);
        y = Fp.cmov(Fp.neg(y), y, e1);
        const tv4_inv = (0, modular_ts_1.FpInvertBatch)(Fp, [tv4], true)[0];
        x = Fp.mul(x, tv4_inv);
        return { x, y };
      };
    }
  })(weierstrass);
  return weierstrass;
}
var hasRequired_shortw_utils;
function require_shortw_utils() {
  if (hasRequired_shortw_utils) return _shortw_utils;
  hasRequired_shortw_utils = 1;
  Object.defineProperty(_shortw_utils, "__esModule", { value: true });
  _shortw_utils.getHash = getHash2;
  _shortw_utils.createCurve = createCurve2;
  const hmac_1 = /* @__PURE__ */ requireHmac$2();
  const utils_1 = /* @__PURE__ */ requireUtils$5();
  const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass();
  function getHash2(hash) {
    return {
      hash,
      hmac: (key, ...msgs) => (0, hmac_1.hmac)(hash, key, (0, utils_1.concatBytes)(...msgs)),
      randomBytes: utils_1.randomBytes
    };
  }
  function createCurve2(curveDef, defHash) {
    const create = (hash) => (0, weierstrass_ts_1.weierstrass)({ ...curveDef, ...getHash2(hash) });
    return { ...create(defHash), create };
  }
  return _shortw_utils;
}
var hashToCurve = {};
var hasRequiredHashToCurve;
function requireHashToCurve() {
  if (hasRequiredHashToCurve) return hashToCurve;
  hasRequiredHashToCurve = 1;
  Object.defineProperty(hashToCurve, "__esModule", { value: true });
  hashToCurve.expand_message_xmd = expand_message_xmd;
  hashToCurve.expand_message_xof = expand_message_xof;
  hashToCurve.hash_to_field = hash_to_field;
  hashToCurve.isogenyMap = isogenyMap;
  hashToCurve.createHasher = createHasher;
  const modular_ts_1 = /* @__PURE__ */ requireModular();
  const utils_ts_1 = /* @__PURE__ */ requireUtils();
  const os2ip = utils_ts_1.bytesToNumberBE;
  function i2osp(value, length) {
    anum(value);
    anum(length);
    if (value < 0 || value >= 1 << 8 * length)
      throw new Error("invalid I2OSP input: " + value);
    const res = Array.from({ length }).fill(0);
    for (let i = length - 1; i >= 0; i--) {
      res[i] = value & 255;
      value >>>= 8;
    }
    return new Uint8Array(res);
  }
  function strxor(a, b) {
    const arr = new Uint8Array(a.length);
    for (let i = 0; i < a.length; i++) {
      arr[i] = a[i] ^ b[i];
    }
    return arr;
  }
  function anum(item) {
    if (!Number.isSafeInteger(item))
      throw new Error("number expected");
  }
  function expand_message_xmd(msg, DST, lenInBytes, H) {
    (0, utils_ts_1.abytes)(msg);
    (0, utils_ts_1.abytes)(DST);
    anum(lenInBytes);
    if (DST.length > 255)
      DST = H((0, utils_ts_1.concatBytes)((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-"), DST));
    const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
    const ell = Math.ceil(lenInBytes / b_in_bytes);
    if (lenInBytes > 65535 || ell > 255)
      throw new Error("expand_message_xmd: invalid lenInBytes");
    const DST_prime = (0, utils_ts_1.concatBytes)(DST, i2osp(DST.length, 1));
    const Z_pad = i2osp(0, r_in_bytes);
    const l_i_b_str = i2osp(lenInBytes, 2);
    const b = new Array(ell);
    const b_0 = H((0, utils_ts_1.concatBytes)(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
    b[0] = H((0, utils_ts_1.concatBytes)(b_0, i2osp(1, 1), DST_prime));
    for (let i = 1; i <= ell; i++) {
      const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
      b[i] = H((0, utils_ts_1.concatBytes)(...args));
    }
    const pseudo_random_bytes = (0, utils_ts_1.concatBytes)(...b);
    return pseudo_random_bytes.slice(0, lenInBytes);
  }
  function expand_message_xof(msg, DST, lenInBytes, k, H) {
    (0, utils_ts_1.abytes)(msg);
    (0, utils_ts_1.abytes)(DST);
    anum(lenInBytes);
    if (DST.length > 255) {
      const dkLen = Math.ceil(2 * k / 8);
      DST = H.create({ dkLen }).update((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(DST).digest();
    }
    if (lenInBytes > 65535 || DST.length > 255)
      throw new Error("expand_message_xof: invalid lenInBytes");
    return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
  }
  function hash_to_field(msg, count, options) {
    (0, utils_ts_1.validateObject)(options, {
      DST: "stringOrUint8Array",
      p: "bigint",
      m: "isSafeInteger",
      k: "isSafeInteger",
      hash: "hash"
    });
    const { p, k, m, hash, expand, DST: _DST } = options;
    (0, utils_ts_1.abytes)(msg);
    anum(count);
    const DST = typeof _DST === "string" ? (0, utils_ts_1.utf8ToBytes)(_DST) : _DST;
    const log2p = p.toString(2).length;
    const L = Math.ceil((log2p + k) / 8);
    const len_in_bytes = count * m * L;
    let prb;
    if (expand === "xmd") {
      prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
    } else if (expand === "xof") {
      prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
    } else if (expand === "_internal_pass") {
      prb = msg;
    } else {
      throw new Error('expand must be "xmd" or "xof"');
    }
    const u = new Array(count);
    for (let i = 0; i < count; i++) {
      const e = new Array(m);
      for (let j = 0; j < m; j++) {
        const elm_offset = L * (j + i * m);
        const tv = prb.subarray(elm_offset, elm_offset + L);
        e[j] = (0, modular_ts_1.mod)(os2ip(tv), p);
      }
      u[i] = e;
    }
    return u;
  }
  function isogenyMap(field, map) {
    const coeff = map.map((i) => Array.from(i).reverse());
    return (x, y) => {
      const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
      const [xd_inv, yd_inv] = (0, modular_ts_1.FpInvertBatch)(field, [xd, yd], true);
      x = field.mul(xn, xd_inv);
      y = field.mul(y, field.mul(yn, yd_inv));
      return { x, y };
    };
  }
  function createHasher(Point, mapToCurve, defaults) {
    if (typeof mapToCurve !== "function")
      throw new Error("mapToCurve() must be defined");
    function map(num) {
      return Point.fromAffine(mapToCurve(num));
    }
    function clear(initial) {
      const P = initial.clearCofactor();
      if (P.equals(Point.ZERO))
        return Point.ZERO;
      P.assertValidity();
      return P;
    }
    return {
      defaults,
      // Encodes byte string to elliptic curve.
      // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      hashToCurve(msg, options) {
        const u = hash_to_field(msg, 2, { ...defaults, DST: defaults.DST, ...options });
        const u0 = map(u[0]);
        const u1 = map(u[1]);
        return clear(u0.add(u1));
      },
      // Encodes byte string to elliptic curve.
      // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      encodeToCurve(msg, options) {
        const u = hash_to_field(msg, 1, { ...defaults, DST: defaults.encodeDST, ...options });
        return clear(map(u[0]));
      },
      // Same as encodeToCurve, but without hash
      mapToCurve(scalars) {
        if (!Array.isArray(scalars))
          throw new Error("expected array of bigints");
        for (const i of scalars)
          if (typeof i !== "bigint")
            throw new Error("expected array of bigints");
        return clear(map(scalars));
      }
    };
  }
  return hashToCurve;
}
var hasRequiredSecp256k1;
function requireSecp256k1() {
  if (hasRequiredSecp256k1) return secp256k1;
  hasRequiredSecp256k1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encodeToCurve = exports.hashToCurve = exports.secp256k1_hasher = exports.schnorr = exports.secp256k1 = void 0;
    const sha2_1 = /* @__PURE__ */ requireSha2$2();
    const utils_1 = /* @__PURE__ */ requireUtils$5();
    const _shortw_utils_ts_1 = /* @__PURE__ */ require_shortw_utils();
    const hash_to_curve_ts_1 = /* @__PURE__ */ requireHashToCurve();
    const modular_ts_1 = /* @__PURE__ */ requireModular();
    const utils_ts_1 = /* @__PURE__ */ requireUtils();
    const weierstrass_ts_1 = /* @__PURE__ */ requireWeierstrass();
    const secp256k1P2 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
    const secp256k1N2 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
    const _0n2 = BigInt(0);
    const _1n2 = BigInt(1);
    const _2n2 = BigInt(2);
    const divNearest2 = (a, b) => (a + b / _2n2) / b;
    function sqrtMod2(y) {
      const P = secp256k1P2;
      const _3n2 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
      const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
      const b2 = y * y * y % P;
      const b3 = b2 * b2 * y % P;
      const b6 = (0, modular_ts_1.pow2)(b3, _3n2, P) * b3 % P;
      const b9 = (0, modular_ts_1.pow2)(b6, _3n2, P) * b3 % P;
      const b11 = (0, modular_ts_1.pow2)(b9, _2n2, P) * b2 % P;
      const b22 = (0, modular_ts_1.pow2)(b11, _11n, P) * b11 % P;
      const b44 = (0, modular_ts_1.pow2)(b22, _22n, P) * b22 % P;
      const b88 = (0, modular_ts_1.pow2)(b44, _44n, P) * b44 % P;
      const b176 = (0, modular_ts_1.pow2)(b88, _88n, P) * b88 % P;
      const b220 = (0, modular_ts_1.pow2)(b176, _44n, P) * b44 % P;
      const b223 = (0, modular_ts_1.pow2)(b220, _3n2, P) * b3 % P;
      const t1 = (0, modular_ts_1.pow2)(b223, _23n, P) * b22 % P;
      const t2 = (0, modular_ts_1.pow2)(t1, _6n, P) * b2 % P;
      const root = (0, modular_ts_1.pow2)(t2, _2n2, P);
      if (!Fpk12.eql(Fpk12.sqr(root), y))
        throw new Error("Cannot find square root");
      return root;
    }
    const Fpk12 = (0, modular_ts_1.Field)(secp256k1P2, void 0, void 0, { sqrt: sqrtMod2 });
    exports.secp256k1 = (0, _shortw_utils_ts_1.createCurve)({
      a: _0n2,
      b: BigInt(7),
      Fp: Fpk12,
      n: secp256k1N2,
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      h: BigInt(1),
      lowS: true,
      // Allow only low-S signatures by default in sign() and verify()
      endo: {
        // Endomorphism, see above
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
        splitScalar: (k) => {
          const n = secp256k1N2;
          const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
          const b1 = -_1n2 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
          const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
          const b2 = a1;
          const POW_2_128 = BigInt("0x100000000000000000000000000000000");
          const c1 = divNearest2(b2 * k, n);
          const c2 = divNearest2(-b1 * k, n);
          let k1 = (0, modular_ts_1.mod)(k - c1 * a1 - c2 * a2, n);
          let k2 = (0, modular_ts_1.mod)(-c1 * b1 - c2 * b2, n);
          const k1neg = k1 > POW_2_128;
          const k2neg = k2 > POW_2_128;
          if (k1neg)
            k1 = n - k1;
          if (k2neg)
            k2 = n - k2;
          if (k1 > POW_2_128 || k2 > POW_2_128) {
            throw new Error("splitScalar: Endomorphism failed, k=" + k);
          }
          return { k1neg, k1, k2neg, k2 };
        }
      }
    }, sha2_1.sha256);
    const TAGGED_HASH_PREFIXES = {};
    function taggedHash(tag, ...messages) {
      let tagP = TAGGED_HASH_PREFIXES[tag];
      if (tagP === void 0) {
        const tagH = (0, sha2_1.sha256)(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
        tagP = (0, utils_ts_1.concatBytes)(tagH, tagH);
        TAGGED_HASH_PREFIXES[tag] = tagP;
      }
      return (0, sha2_1.sha256)((0, utils_ts_1.concatBytes)(tagP, ...messages));
    }
    const pointToBytes = (point) => point.toRawBytes(true).slice(1);
    const numTo32b = (n) => (0, utils_ts_1.numberToBytesBE)(n, 32);
    const modP = (x) => (0, modular_ts_1.mod)(x, secp256k1P2);
    const modN = (x) => (0, modular_ts_1.mod)(x, secp256k1N2);
    const Point = /* @__PURE__ */ (() => exports.secp256k1.ProjectivePoint)();
    const GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
    function schnorrGetExtPubKey(priv) {
      let d_ = exports.secp256k1.utils.normPrivateKeyToScalar(priv);
      let p = Point.fromPrivateKey(d_);
      const scalar = p.hasEvenY() ? d_ : modN(-d_);
      return { scalar, bytes: pointToBytes(p) };
    }
    function lift_x(x) {
      (0, utils_ts_1.aInRange)("x", x, _1n2, secp256k1P2);
      const xx = modP(x * x);
      const c = modP(xx * x + BigInt(7));
      let y = sqrtMod2(c);
      if (y % _2n2 !== _0n2)
        y = modP(-y);
      const p = new Point(x, y, _1n2);
      p.assertValidity();
      return p;
    }
    const num = utils_ts_1.bytesToNumberBE;
    function challenge(...args) {
      return modN(num(taggedHash("BIP0340/challenge", ...args)));
    }
    function schnorrGetPublicKey(privateKey) {
      return schnorrGetExtPubKey(privateKey).bytes;
    }
    function schnorrSign(message, privateKey, auxRand = (0, utils_1.randomBytes)(32)) {
      const m = (0, utils_ts_1.ensureBytes)("message", message);
      const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
      const a = (0, utils_ts_1.ensureBytes)("auxRand", auxRand, 32);
      const t = numTo32b(d ^ num(taggedHash("BIP0340/aux", a)));
      const rand = taggedHash("BIP0340/nonce", t, px, m);
      const k_ = modN(num(rand));
      if (k_ === _0n2)
        throw new Error("sign failed: k is zero");
      const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
      const e = challenge(rx, px, m);
      const sig = new Uint8Array(64);
      sig.set(rx, 0);
      sig.set(numTo32b(modN(k + e * d)), 32);
      if (!schnorrVerify(sig, m, px))
        throw new Error("sign: Invalid signature produced");
      return sig;
    }
    function schnorrVerify(signature, message, publicKey) {
      const sig = (0, utils_ts_1.ensureBytes)("signature", signature, 64);
      const m = (0, utils_ts_1.ensureBytes)("message", message);
      const pub = (0, utils_ts_1.ensureBytes)("publicKey", publicKey, 32);
      try {
        const P = lift_x(num(pub));
        const r = num(sig.subarray(0, 32));
        if (!(0, utils_ts_1.inRange)(r, _1n2, secp256k1P2))
          return false;
        const s = num(sig.subarray(32, 64));
        if (!(0, utils_ts_1.inRange)(s, _1n2, secp256k1N2))
          return false;
        const e = challenge(numTo32b(r), pointToBytes(P), m);
        const R = GmulAdd(P, s, modN(-e));
        if (!R || !R.hasEvenY() || R.toAffine().x !== r)
          return false;
        return true;
      } catch (error) {
        return false;
      }
    }
    exports.schnorr = (() => ({
      getPublicKey: schnorrGetPublicKey,
      sign: schnorrSign,
      verify: schnorrVerify,
      utils: {
        randomPrivateKey: exports.secp256k1.utils.randomPrivateKey,
        lift_x,
        pointToBytes,
        numberToBytesBE: utils_ts_1.numberToBytesBE,
        bytesToNumberBE: utils_ts_1.bytesToNumberBE,
        taggedHash,
        mod: modular_ts_1.mod
      }
    }))();
    const isoMap = /* @__PURE__ */ (() => (0, hash_to_curve_ts_1.isogenyMap)(Fpk12, [
      // xNum
      [
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
        "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
        "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
      ],
      // xDen
      [
        "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
        "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ],
      // yNum
      [
        "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
        "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
        "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
        "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
      ],
      // yDen
      [
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
        "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
        "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ]
    ].map((i) => i.map((j) => BigInt(j)))))();
    const mapSWU = /* @__PURE__ */ (() => (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fpk12, {
      A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
      B: BigInt("1771"),
      Z: Fpk12.create(BigInt("-11"))
    }))();
    exports.secp256k1_hasher = (() => (0, hash_to_curve_ts_1.createHasher)(exports.secp256k1.ProjectivePoint, (scalars) => {
      const { x, y } = mapSWU(Fpk12.create(scalars[0]));
      return isoMap(x, y);
    }, {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: Fpk12.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha2_1.sha256
    }))();
    exports.hashToCurve = (() => exports.secp256k1_hasher.hashToCurve)();
    exports.encodeToCurve = (() => exports.secp256k1_hasher.encodeToCurve)();
  })(secp256k1);
  return secp256k1;
}
export {
  requireUtils$2 as a,
  requireSecp256k1$2 as b,
  requireBls12381 as c,
  requireEd25519 as d,
  equalBytes as e,
  requireP256 as f,
  secp256r1 as g,
  secp256k1$1 as h,
  requireUtils as i,
  requireSecp256k1$1 as j,
  requireModular$1 as k,
  secp256k1$5 as l,
  p256 as p,
  requireSecp256k1 as r,
  secp256k1$4 as s
};
