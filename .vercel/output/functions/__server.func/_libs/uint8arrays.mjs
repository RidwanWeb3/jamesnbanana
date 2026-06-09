import { r as requireBasics } from "./multiformats.mjs";
var src = {};
var compare = {};
var hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare;
  hasRequiredCompare = 1;
  Object.defineProperty(compare, "__esModule", { value: true });
  function compare$1(a, b) {
    for (let i = 0; i < a.byteLength; i++) {
      if (a[i] < b[i]) {
        return -1;
      }
      if (a[i] > b[i]) {
        return 1;
      }
    }
    if (a.byteLength > b.byteLength) {
      return 1;
    }
    if (a.byteLength < b.byteLength) {
      return -1;
    }
    return 0;
  }
  compare.compare = compare$1;
  return compare;
}
var concat = {};
var alloc = {};
var asUint8array = {};
var hasRequiredAsUint8array;
function requireAsUint8array() {
  if (hasRequiredAsUint8array) return asUint8array;
  hasRequiredAsUint8array = 1;
  Object.defineProperty(asUint8array, "__esModule", { value: true });
  function asUint8Array(buf) {
    if (globalThis.Buffer != null) {
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    return buf;
  }
  asUint8array.asUint8Array = asUint8Array;
  return asUint8array;
}
var hasRequiredAlloc;
function requireAlloc() {
  if (hasRequiredAlloc) return alloc;
  hasRequiredAlloc = 1;
  Object.defineProperty(alloc, "__esModule", { value: true });
  var asUint8array2 = requireAsUint8array();
  function alloc$1(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.alloc != null) {
      return asUint8array2.asUint8Array(globalThis.Buffer.alloc(size));
    }
    return new Uint8Array(size);
  }
  function allocUnsafe(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
      return asUint8array2.asUint8Array(globalThis.Buffer.allocUnsafe(size));
    }
    return new Uint8Array(size);
  }
  alloc.alloc = alloc$1;
  alloc.allocUnsafe = allocUnsafe;
  return alloc;
}
var hasRequiredConcat;
function requireConcat() {
  if (hasRequiredConcat) return concat;
  hasRequiredConcat = 1;
  Object.defineProperty(concat, "__esModule", { value: true });
  var alloc2 = requireAlloc();
  var asUint8array2 = requireAsUint8array();
  function concat$1(arrays, length) {
    if (!length) {
      length = arrays.reduce((acc, curr) => acc + curr.length, 0);
    }
    const output = alloc2.allocUnsafe(length);
    let offset = 0;
    for (const arr of arrays) {
      output.set(arr, offset);
      offset += arr.length;
    }
    return asUint8array2.asUint8Array(output);
  }
  concat.concat = concat$1;
  return concat;
}
var equals = {};
var hasRequiredEquals;
function requireEquals() {
  if (hasRequiredEquals) return equals;
  hasRequiredEquals = 1;
  Object.defineProperty(equals, "__esModule", { value: true });
  function equals$1(a, b) {
    if (a === b) {
      return true;
    }
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    for (let i = 0; i < a.byteLength; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  equals.equals = equals$1;
  return equals;
}
var fromString = {};
var bases;
var hasRequiredBases;
function requireBases() {
  if (hasRequiredBases) return bases;
  hasRequiredBases = 1;
  var basics = requireBasics();
  var alloc2 = requireAlloc();
  function createCodec(name, prefix, encode, decode) {
    return {
      name,
      prefix,
      encoder: {
        name,
        prefix,
        encode
      },
      decoder: { decode }
    };
  }
  const string = createCodec("utf8", "u", (buf) => {
    const decoder = new TextDecoder("utf8");
    return "u" + decoder.decode(buf);
  }, (str) => {
    const encoder = new TextEncoder();
    return encoder.encode(str.substring(1));
  });
  const ascii = createCodec("ascii", "a", (buf) => {
    let string2 = "a";
    for (let i = 0; i < buf.length; i++) {
      string2 += String.fromCharCode(buf[i]);
    }
    return string2;
  }, (str) => {
    str = str.substring(1);
    const buf = alloc2.allocUnsafe(str.length);
    for (let i = 0; i < str.length; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf;
  });
  const BASES = {
    utf8: string,
    "utf-8": string,
    hex: basics.bases.base16,
    latin1: ascii,
    ascii,
    binary: ascii,
    ...basics.bases
  };
  bases = BASES;
  return bases;
}
var hasRequiredFromString;
function requireFromString() {
  if (hasRequiredFromString) return fromString;
  hasRequiredFromString = 1;
  Object.defineProperty(fromString, "__esModule", { value: true });
  var bases2 = requireBases();
  var asUint8array2 = requireAsUint8array();
  function fromString$1(string, encoding = "utf8") {
    const base = bases2[encoding];
    if (!base) {
      throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
      return asUint8array2.asUint8Array(globalThis.Buffer.from(string, "utf-8"));
    }
    return base.decoder.decode(`${base.prefix}${string}`);
  }
  fromString.fromString = fromString$1;
  return fromString;
}
var toString = {};
var hasRequiredToString;
function requireToString() {
  if (hasRequiredToString) return toString;
  hasRequiredToString = 1;
  Object.defineProperty(toString, "__esModule", { value: true });
  var bases2 = requireBases();
  function toString$1(array, encoding = "utf8") {
    const base = bases2[encoding];
    if (!base) {
      throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
      return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
    }
    return base.encoder.encode(array).substring(1);
  }
  toString.toString = toString$1;
  return toString;
}
var xor = {};
var hasRequiredXor;
function requireXor() {
  if (hasRequiredXor) return xor;
  hasRequiredXor = 1;
  Object.defineProperty(xor, "__esModule", { value: true });
  var alloc2 = requireAlloc();
  var asUint8array2 = requireAsUint8array();
  function xor$1(a, b) {
    if (a.length !== b.length) {
      throw new Error("Inputs should have the same length");
    }
    const result = alloc2.allocUnsafe(a.length);
    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] ^ b[i];
    }
    return asUint8array2.asUint8Array(result);
  }
  xor.xor = xor$1;
  return xor;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  Object.defineProperty(src, "__esModule", { value: true });
  var compare2 = requireCompare();
  var concat2 = requireConcat();
  var equals2 = requireEquals();
  var fromString2 = requireFromString();
  var toString2 = requireToString();
  var xor2 = requireXor();
  src.compare = compare2.compare;
  src.concat = concat2.concat;
  src.equals = equals2.equals;
  src.fromString = fromString2.fromString;
  src.toString = toString2.toString;
  src.xor = xor2.xor;
  return src;
}
export {
  requireSrc as r
};
