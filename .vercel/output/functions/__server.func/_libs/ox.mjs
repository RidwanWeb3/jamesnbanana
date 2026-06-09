import { l as parseAbiParameters, m as formatAbiParameters, k as parseAbiItem, f as formatAbiItem, n as requireExports, r as requireExports$1 } from "./abitype.mjs";
import { k as keccak_256, s as sha256$2, z as requireSha3, A as requireRipemd160, B as requireSha256, C as requireBlake3, D as requirePbkdf2, j as requireSha2, E as requireScrypt, F as sha256$3, r as requireSha3$1, x as requireHmac, a as requireSha256$1, b as requireRipemd160$1 } from "./@noble/hashes.mjs";
import { e as equalBytes, s as secp256k1, a as requireUtils, b as requireSecp256k1$2, c as requireBls12381, d as requireEd25519$1, f as requireP256$1, g as secp256r1, h as secp256k1$1, p as p256, i as requireUtils$1, r as requireSecp256k1$3 } from "./noble__curves.mjs";
import { r as requireDist } from "./adraffy__ens-normalize.mjs";
import { r as requireLib } from "./scure__bip32.mjs";
import { r as requireAes } from "./noble__ciphers.mjs";
import { r as requireCzech, a as requireEnglish, b as requireFrench, c as requireItalian, d as requireJapanese, e as requireKorean, f as requirePortuguese, g as requireSimplifiedChinese, h as requireSpanish, i as requireTraditionalChinese, j as requireBip39 } from "./scure__bip39.mjs";
import { r as requireEventemitter3 } from "./eventemitter3.mjs";
const version$3 = "0.1.1";
function getVersion$1() {
  return version$3;
}
let BaseError$1 = class BaseError extends Error {
  static setStaticOptions(options) {
    BaseError.prototype.docsOrigin = options.docsOrigin;
    BaseError.prototype.showVersion = options.showVersion;
    BaseError.prototype.version = options.version;
  }
  constructor(shortMessage, options = {}) {
    const details = (() => {
      if (options.cause instanceof BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
        return options.cause.details;
      if (options.cause?.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = options.docsOrigin ?? BaseError.prototype.docsOrigin;
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const showVersion = Boolean(options.version ?? BaseError.prototype.showVersion);
    const version2 = options.version ?? BaseError.prototype.version;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath || showVersion ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0,
        showVersion ? `Version: ${version2}` : void 0
      ] : []
    ].filter((x) => typeof x === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsOrigin", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "showVersion", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsOrigin = docsBaseUrl;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
    this.showVersion = showVersion;
    this.version = version2;
  }
  walk(fn) {
    return walk$1(this, fn);
  }
};
Object.defineProperty(BaseError$1, "defaultStaticOptions", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: {
    docsOrigin: "https://oxlib.sh",
    showVersion: false,
    version: `ox@${getVersion$1()}`
  }
});
(() => {
  BaseError$1.setStaticOptions(BaseError$1.defaultStaticOptions);
})();
function walk$1(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk$1(err.cause, fn);
  return fn ? null : err;
}
function assertSize$3(bytes2, size_) {
  if (size$3(bytes2) > size_)
    throw new SizeOverflowError$3({
      givenSize: size$3(bytes2),
      maxSize: size_
    });
}
const charCodeMap$1 = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16$1(char) {
  if (char >= charCodeMap$1.zero && char <= charCodeMap$1.nine)
    return char - charCodeMap$1.zero;
  if (char >= charCodeMap$1.A && char <= charCodeMap$1.F)
    return char - (charCodeMap$1.A - 10);
  if (char >= charCodeMap$1.a && char <= charCodeMap$1.f)
    return char - (charCodeMap$1.a - 10);
  return void 0;
}
function pad$2(bytes2, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return bytes2;
  if (bytes2.length > size2)
    throw new SizeExceedsPaddingSizeError$2({
      size: bytes2.length,
      targetSize: size2,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes2[padEnd ? i : bytes2.length - i - 1];
  }
  return paddedBytes;
}
function trim$1(value, options = {}) {
  const { dir = "left" } = options;
  let data = value;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  return data;
}
function assertSize$2(hex2, size_) {
  if (size$2(hex2) > size_)
    throw new SizeOverflowError$2({
      givenSize: size$2(hex2),
      maxSize: size_
    });
}
function assertStartOffset$2(value, start) {
  if (typeof start === "number" && start > 0 && start > size$2(value) - 1)
    throw new SliceOffsetOutOfBoundsError$2({
      offset: start,
      position: "start",
      size: size$2(value)
    });
}
function assertEndOffset$2(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size$2(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError$2({
      offset: end,
      position: "end",
      size: size$2(value)
    });
  }
}
function pad$1(hex_, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return hex_;
  const hex2 = hex_.replace("0x", "");
  if (hex2.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError$1({
      size: Math.ceil(hex2.length / 2),
      targetSize: size2,
      type: "Hex"
    });
  return `0x${hex2[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function trim(value, options = {}) {
  const { dir = "left" } = options;
  let data = value.replace("0x", "");
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (data === "0")
    return "0x";
  if (dir === "right" && data.length % 2 === 1)
    return `0x${data}0`;
  return `0x${data}`;
}
const bigIntSuffix$1 = "#__bigint";
function stringify$1(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix$1;
    return value2;
  }, space);
}
const decoder$1 = /* @__PURE__ */ new TextDecoder();
const encoder$3 = /* @__PURE__ */ new TextEncoder();
function assert$c(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError$1(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError$1(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError$1(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError$1(value);
}
function concat$2(...values) {
  let length = 0;
  for (const arr of values) {
    length += arr.length;
  }
  const result = new Uint8Array(length);
  for (let i = 0, index = 0; i < values.length; i++) {
    const arr = values[i];
    result.set(arr, index);
    index += arr.length;
  }
  return result;
}
function from$i(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex$7(value);
  return fromArray$1(value);
}
function fromArray$1(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex$7(value, options = {}) {
  const { size: size2 } = options;
  let hex2 = value;
  if (size2) {
    assertSize$2(value, size2);
    hex2 = padRight$1(value, size2);
  }
  let hexString = hex2.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes2 = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16$1(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16$1(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError$1(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes2[index] = nibbleLeft << 4 | nibbleRight;
  }
  return bytes2;
}
function fromString$2(value, options = {}) {
  const { size: size2 } = options;
  const bytes2 = encoder$3.encode(value);
  if (typeof size2 === "number") {
    assertSize$3(bytes2, size2);
    return padRight$2(bytes2, size2);
  }
  return bytes2;
}
function isEqual$1(bytesA, bytesB) {
  return equalBytes(bytesA, bytesB);
}
function padRight$2(value, size2) {
  return pad$2(value, { dir: "right", size: size2 });
}
function random$1(length) {
  return crypto.getRandomValues(new Uint8Array(length));
}
function size$3(value) {
  return value.length;
}
function slice$3(value, start, end, options = {}) {
  const { strict } = options;
  const value_ = value.slice(start, end);
  return value_;
}
function toBigInt$3(bytes2, options = {}) {
  const { size: size2 } = options;
  if (typeof size2 !== "undefined")
    assertSize$3(bytes2, size2);
  const hex2 = fromBytes$5(bytes2, options);
  return toBigInt$2(hex2, options);
}
function toBoolean(bytes2, options = {}) {
  const { size: size2 } = options;
  let bytes_ = bytes2;
  if (typeof size2 !== "undefined") {
    assertSize$3(bytes_, size2);
    bytes_ = trimLeft$1(bytes_);
  }
  if (bytes_.length > 1 || bytes_[0] > 1)
    throw new InvalidBytesBooleanError(bytes_);
  return Boolean(bytes_[0]);
}
function toNumber$1(bytes2, options = {}) {
  const { size: size2 } = options;
  if (typeof size2 !== "undefined")
    assertSize$3(bytes2, size2);
  const hex2 = fromBytes$5(bytes2, options);
  return toNumber(hex2, options);
}
function toString$1(bytes2, options = {}) {
  const { size: size2 } = options;
  let bytes_ = bytes2;
  if (typeof size2 !== "undefined") {
    assertSize$3(bytes_, size2);
    bytes_ = trimRight(bytes_);
  }
  return decoder$1.decode(bytes_);
}
function trimLeft$1(value) {
  return trim$1(value, { dir: "left" });
}
function trimRight(value) {
  return trim$1(value, { dir: "right" });
}
function validate$7(value) {
  try {
    assert$c(value);
    return true;
  } catch {
    return false;
  }
}
class InvalidBytesBooleanError extends BaseError$1 {
  constructor(bytes2) {
    super(`Bytes value \`${bytes2}\` is not a valid boolean.`, {
      metaMessages: [
        "The bytes array must contain a single byte of either a `0` or `1` value."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesBooleanError"
    });
  }
}
let InvalidBytesTypeError$1 = class InvalidBytesTypeError extends BaseError$1 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify$1(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
};
let SizeOverflowError$3 = class SizeOverflowError extends BaseError$1 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
let SizeExceedsPaddingSizeError$2 = class SizeExceedsPaddingSizeError extends BaseError$1 {
  constructor({ size: size2, targetSize, type: type2 }) {
    super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};
const encoder$2 = /* @__PURE__ */ new TextEncoder();
const hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
function assert$b(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError$1(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError$1(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError$1(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError$1(value);
}
function concat$1(...values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
function from$h(value) {
  if (value instanceof Uint8Array)
    return fromBytes$5(value);
  if (Array.isArray(value))
    return fromBytes$5(new Uint8Array(value));
  return value;
}
function fromBoolean(value, options = {}) {
  const hex2 = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize$2(hex2, options.size);
    return padLeft$1(hex2, options.size);
  }
  return hex2;
}
function fromBytes$5(value, options = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++)
    string += hexes$1[value[i]];
  const hex2 = `0x${string}`;
  if (typeof options.size === "number") {
    assertSize$2(hex2, options.size);
    return padRight$1(hex2, options.size);
  }
  return hex2;
}
function fromNumber$1(value, options = {}) {
  const { signed, size: size2 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError$1({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? BigInt.asUintN(size2 * 8, BigInt(value_)) : value_).toString(16);
  const hex2 = `0x${stringValue}`;
  if (size2)
    return padLeft$1(hex2, size2);
  return hex2;
}
function fromString$1(value, options = {}) {
  return fromBytes$5(encoder$2.encode(value), options);
}
function padLeft$1(value, size2) {
  return pad$1(value, { dir: "left", size: size2 });
}
function padRight$1(value, size2) {
  return pad$1(value, { dir: "right", size: size2 });
}
function random(length) {
  return fromBytes$5(random$1(length));
}
function slice$2(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset$2(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset$2(value_, start, end);
  return value_;
}
function size$2(value) {
  return Math.ceil((value.length - 2) / 2);
}
function trimLeft(value) {
  return trim(value, { dir: "left" });
}
function toBigInt$2(hex2, options = {}) {
  const { signed } = options;
  if (options.size)
    assertSize$2(hex2, options.size);
  const value = BigInt(hex2);
  if (!signed)
    return value;
  const size2 = (hex2.length - 2) / 2;
  const max_unsigned = (1n << BigInt(size2) * 8n) - 1n;
  const max_signed = max_unsigned >> 1n;
  if (value <= max_signed)
    return value;
  return value - max_unsigned - 1n;
}
function toNumber(hex2, options = {}) {
  const { signed, size: size2 } = options;
  if (!signed && !size2)
    return Number(hex2);
  return Number(toBigInt$2(hex2, options));
}
function toString(hex2, options = {}) {
  const { size: size2 } = options;
  let bytes2 = fromHex$7(hex2);
  if (size2) {
    assertSize$3(bytes2, size2);
    bytes2 = trimRight(bytes2);
  }
  return new TextDecoder().decode(bytes2);
}
function validate$6(value, options = {}) {
  const { strict = false } = options;
  try {
    assert$b(value, { strict });
    return true;
  } catch {
    return false;
  }
}
let IntegerOutOfRangeError$1 = class IntegerOutOfRangeError extends BaseError$1 {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number \`${value}\` is not in safe${size2 ? ` ${size2 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
};
let InvalidHexTypeError$1 = class InvalidHexTypeError extends BaseError$1 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify$1(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
};
let InvalidHexValueError$1 = class InvalidHexValueError extends BaseError$1 {
  constructor(value) {
    super(`Value \`${value}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
};
class InvalidLengthError extends BaseError$1 {
  constructor(value) {
    super(`Hex value \`"${value}"\` is an odd length (${value.length - 2} nibbles).`, {
      metaMessages: ["It must be an even length."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidLengthError"
    });
  }
}
let SizeOverflowError$2 = class SizeOverflowError2 extends BaseError$1 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
let SliceOffsetOutOfBoundsError$2 = class SliceOffsetOutOfBoundsError extends BaseError$1 {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
};
let SizeExceedsPaddingSizeError$1 = class SizeExceedsPaddingSizeError2 extends BaseError$1 {
  constructor({ size: size2, targetSize, type: type2 }) {
    super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};
function toRpc$8(withdrawal) {
  return {
    address: withdrawal.address,
    amount: fromNumber$1(withdrawal.amount),
    index: fromNumber$1(withdrawal.index),
    validatorIndex: fromNumber$1(withdrawal.validatorIndex)
  };
}
function toRpc$7(blockOverrides) {
  return {
    ...typeof blockOverrides.baseFeePerGas === "bigint" && {
      baseFeePerGas: fromNumber$1(blockOverrides.baseFeePerGas)
    },
    ...typeof blockOverrides.blobBaseFee === "bigint" && {
      blobBaseFee: fromNumber$1(blockOverrides.blobBaseFee)
    },
    ...typeof blockOverrides.feeRecipient === "string" && {
      feeRecipient: blockOverrides.feeRecipient
    },
    ...typeof blockOverrides.gasLimit === "bigint" && {
      gasLimit: fromNumber$1(blockOverrides.gasLimit)
    },
    ...typeof blockOverrides.number === "bigint" && {
      number: fromNumber$1(blockOverrides.number)
    },
    ...typeof blockOverrides.prevRandao === "bigint" && {
      prevRandao: fromNumber$1(blockOverrides.prevRandao)
    },
    ...typeof blockOverrides.time === "bigint" && {
      time: fromNumber$1(blockOverrides.time)
    },
    ...blockOverrides.withdrawals && {
      withdrawals: blockOverrides.withdrawals.map(toRpc$8)
    }
  };
}
class LruMap extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
}
const caches = {
  checksum: /* @__PURE__ */ new LruMap(8192)
};
const checksum$1 = caches.checksum;
function keccak256(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes2 = keccak_256(from$i(value));
  if (as === "Bytes")
    return bytes2;
  return fromBytes$5(bytes2);
}
function sha256$1(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes2 = sha256$2(from$i(value));
  if (as === "Bytes")
    return bytes2;
  return fromBytes$5(bytes2);
}
function validate$5(value) {
  return validate$6(value) && size$2(value) === 32;
}
function assert$a(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x, y } = publicKey;
  if (compressed === false || typeof x === "bigint" && typeof y === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError$2({
        prefix,
        cause: new InvalidUncompressedPrefixError$1()
      });
    return;
  }
  if (compressed === true || typeof x === "bigint" && typeof y === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError$2({
        prefix,
        cause: new InvalidCompressedPrefixError$1()
      });
    return;
  }
  throw new InvalidError$1({ publicKey });
}
function from$g(value) {
  const publicKey = (() => {
    if (validate$6(value))
      return fromHex$6(value);
    if (validate$7(value))
      return fromBytes$4(value);
    const { prefix, x, y } = value;
    if (typeof x === "bigint" && typeof y === "bigint")
      return { prefix: prefix ?? 4, x, y };
    return { prefix, x };
  })();
  assert$a(publicKey);
  return publicKey;
}
function fromBytes$4(publicKey) {
  return fromHex$6(fromBytes$5(publicKey));
}
function fromHex$6(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError$3({ publicKey });
  if (publicKey.length === 130) {
    const x2 = BigInt(slice$2(publicKey, 0, 32));
    const y = BigInt(slice$2(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x2,
      y
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice$2(publicKey, 0, 1));
    const x2 = BigInt(slice$2(publicKey, 1, 33));
    const y = BigInt(slice$2(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x2,
      y
    };
  }
  const prefix = Number(slice$2(publicKey, 0, 1));
  const x = BigInt(slice$2(publicKey, 1, 33));
  return {
    prefix,
    x
  };
}
function toBytes$1(publicKey, options = {}) {
  return fromHex$7(toHex$4(publicKey, options));
}
function toHex$4(publicKey, options = {}) {
  assert$a(publicKey);
  const { prefix, x, y } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat$1(
    includePrefix ? fromNumber$1(prefix, { size: 1 }) : "0x",
    fromNumber$1(x, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y === "bigint" ? fromNumber$1(y, { size: 32 }) : "0x"
  );
  return publicKey_;
}
let InvalidError$1 = class InvalidError extends BaseError$1 {
  constructor({ publicKey }) {
    super(`Value \`${stringify$1(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
};
let InvalidPrefixError$2 = class InvalidPrefixError extends BaseError$1 {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
};
let InvalidCompressedPrefixError$1 = class InvalidCompressedPrefixError extends BaseError$1 {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
};
let InvalidUncompressedPrefixError$1 = class InvalidUncompressedPrefixError extends BaseError$1 {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
};
let InvalidSerializedSizeError$3 = class InvalidSerializedSizeError extends BaseError$1 {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size$2(from$h(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert$9(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum(value) !== value)
      throw new InvalidAddressError({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum(address) {
  if (checksum$1.has(address))
    return checksum$1.get(address);
  assert$9(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash2 = keccak256(fromString$2(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash2[i >> 1] >> 4 >= 8 && characters[i]) {
      characters[i] = characters[i].toUpperCase();
    }
    if ((hash2[i >> 1] & 15) >= 8 && characters[i + 1]) {
      characters[i + 1] = characters[i + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum$1.set(address, result);
  return result;
}
function from$f(address, options = {}) {
  const { checksum: checksumVal = false } = options;
  assert$9(address);
  if (checksumVal)
    return checksum(address);
  return address;
}
function fromPublicKey(publicKey, options = {}) {
  const address = keccak256(`0x${toHex$4(publicKey).slice(4)}`).substring(26);
  return from$f(`0x${address}`, options);
}
function isEqual(addressA, addressB) {
  assert$9(addressA, { strict: false });
  assert$9(addressB, { strict: false });
  return addressA.toLowerCase() === addressB.toLowerCase();
}
function validate$4(address, options = {}) {
  const { strict = true } = options ?? {};
  try {
    assert$9(address, { strict });
    return true;
  } catch {
    return false;
  }
}
class InvalidAddressError extends BaseError$1 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
}
class InvalidInputError extends BaseError$1 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
}
class InvalidChecksumError extends BaseError$1 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
}
const arrayRegex = /^(.*)\[([0-9]*)\]$/;
const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
const maxUint256$1 = 2n ** 256n - 1n;
function decodeParameter(cursor2, param, options) {
  const { checksumAddress, staticPosition } = options;
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents) {
    const [length, type2] = arrayComponents;
    return decodeArray(cursor2, { ...param, type: type2 }, { checksumAddress, length, staticPosition });
  }
  if (param.type === "tuple")
    return decodeTuple(cursor2, param, {
      checksumAddress,
      staticPosition
    });
  if (param.type === "address")
    return decodeAddress(cursor2, { checksum: checksumAddress });
  if (param.type === "bool")
    return decodeBool(cursor2);
  if (param.type.startsWith("bytes"))
    return decodeBytes(cursor2, param, { staticPosition });
  if (param.type.startsWith("uint") || param.type.startsWith("int"))
    return decodeNumber(cursor2, param);
  if (param.type === "string")
    return decodeString(cursor2, { staticPosition });
  throw new InvalidTypeError(param.type);
}
const sizeOfLength = 32;
const sizeOfOffset = 32;
function decodeAddress(cursor2, options = {}) {
  const { checksum: checksum$12 = false } = options;
  const value = cursor2.readBytes(32);
  const wrap2 = (address) => checksum$12 ? checksum(address) : address;
  return [wrap2(fromBytes$5(slice$3(value, -20))), 32];
}
function decodeArray(cursor2, param, options) {
  const { checksumAddress, length, staticPosition } = options;
  if (!length) {
    const offset = toNumber$1(cursor2.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const startOfData = start + sizeOfLength;
    cursor2.setPosition(start);
    const length2 = toNumber$1(cursor2.readBytes(sizeOfLength));
    const dynamicChild = hasDynamicChild(param);
    let consumed2 = 0;
    const value2 = [];
    for (let i = 0; i < length2; ++i) {
      cursor2.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
      const [data, consumed_] = decodeParameter(cursor2, param, {
        checksumAddress,
        staticPosition: startOfData
      });
      consumed2 += consumed_;
      value2.push(data);
    }
    cursor2.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  if (hasDynamicChild(param)) {
    const offset = toNumber$1(cursor2.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const value2 = [];
    for (let i = 0; i < length; ++i) {
      cursor2.setPosition(start + i * 32);
      const [data] = decodeParameter(cursor2, param, {
        checksumAddress,
        staticPosition: start
      });
      value2.push(data);
    }
    cursor2.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  let consumed = 0;
  const value = [];
  for (let i = 0; i < length; ++i) {
    const [data, consumed_] = decodeParameter(cursor2, param, {
      checksumAddress,
      staticPosition: staticPosition + consumed
    });
    consumed += consumed_;
    value.push(data);
  }
  return [value, consumed];
}
function decodeBool(cursor2) {
  return [toBoolean(cursor2.readBytes(32), { size: 32 }), 32];
}
function decodeBytes(cursor2, param, { staticPosition }) {
  const [_, size2] = param.type.split("bytes");
  if (!size2) {
    const offset = toNumber$1(cursor2.readBytes(32));
    cursor2.setPosition(staticPosition + offset);
    const length = toNumber$1(cursor2.readBytes(32));
    if (length === 0) {
      cursor2.setPosition(staticPosition + 32);
      return ["0x", 32];
    }
    const data = cursor2.readBytes(length);
    cursor2.setPosition(staticPosition + 32);
    return [fromBytes$5(data), 32];
  }
  const value = fromBytes$5(cursor2.readBytes(Number.parseInt(size2, 10), 32));
  return [value, 32];
}
function decodeNumber(cursor2, param) {
  const signed = param.type.startsWith("int");
  const size2 = Number.parseInt(param.type.split("int")[1] || "256", 10);
  const value = cursor2.readBytes(32);
  return [
    size2 > 48 ? toBigInt$3(value, { signed }) : toNumber$1(value, { signed }),
    32
  ];
}
function decodeTuple(cursor2, param, options) {
  const { checksumAddress, staticPosition } = options;
  const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
  const value = hasUnnamedChild ? [] : {};
  let consumed = 0;
  if (hasDynamicChild(param)) {
    const offset = toNumber$1(cursor2.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      cursor2.setPosition(start + consumed);
      const [data, consumed_] = decodeParameter(cursor2, component, {
        checksumAddress,
        staticPosition: start
      });
      consumed += consumed_;
      value[hasUnnamedChild ? i : component?.name] = data;
    }
    cursor2.setPosition(staticPosition + 32);
    return [value, 32];
  }
  for (let i = 0; i < param.components.length; ++i) {
    const component = param.components[i];
    const [data, consumed_] = decodeParameter(cursor2, component, {
      checksumAddress,
      staticPosition
    });
    value[hasUnnamedChild ? i : component?.name] = data;
    consumed += consumed_;
  }
  return [value, consumed];
}
function decodeString(cursor2, { staticPosition }) {
  const offset = toNumber$1(cursor2.readBytes(32));
  const start = staticPosition + offset;
  cursor2.setPosition(start);
  const length = toNumber$1(cursor2.readBytes(32));
  if (length === 0) {
    cursor2.setPosition(staticPosition + 32);
    return ["", 32];
  }
  const data = cursor2.readBytes(length, 32);
  const value = toString$1(trimLeft$1(data));
  cursor2.setPosition(staticPosition + 32);
  return [value, 32];
}
function prepareParameters({ checksumAddress, parameters, values }) {
  const preparedParameters = [];
  for (let i = 0; i < parameters.length; i++) {
    preparedParameters.push(prepareParameter({
      checksumAddress,
      parameter: parameters[i],
      value: values[i]
    }));
  }
  return preparedParameters;
}
function prepareParameter({ checksumAddress = false, parameter: parameter_, value }) {
  const parameter = parameter_;
  const arrayComponents = getArrayComponents(parameter.type);
  if (arrayComponents) {
    const [length, type2] = arrayComponents;
    return encodeArray(value, {
      checksumAddress,
      length,
      parameter: {
        ...parameter,
        type: type2
      }
    });
  }
  if (parameter.type === "tuple") {
    return encodeTuple(value, {
      checksumAddress,
      parameter
    });
  }
  if (parameter.type === "address") {
    return encodeAddress(value, {
      checksum: checksumAddress
    });
  }
  if (parameter.type === "bool") {
    return encodeBoolean(value);
  }
  if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
    const signed = parameter.type.startsWith("int");
    const [, , size2 = "256"] = integerRegex.exec(parameter.type) ?? [];
    return encodeNumber(value, {
      signed,
      size: Number(size2)
    });
  }
  if (parameter.type.startsWith("bytes")) {
    return encodeBytes(value, { type: parameter.type });
  }
  if (parameter.type === "string") {
    return encodeString(value);
  }
  throw new InvalidTypeError(parameter.type);
}
function encode$2(preparedParameters) {
  let staticSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic)
      staticSize += 32;
    else
      staticSize += size$2(encoded);
  }
  const staticParameters = [];
  const dynamicParameters = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic) {
      staticParameters.push(fromNumber$1(staticSize + dynamicSize, { size: 32 }));
      dynamicParameters.push(encoded);
      dynamicSize += size$2(encoded);
    } else {
      staticParameters.push(encoded);
    }
  }
  return concat$1(...staticParameters, ...dynamicParameters);
}
function encodeAddress(value, options) {
  const { checksum: checksum2 = false } = options;
  assert$9(value, { strict: checksum2 });
  return {
    dynamic: false,
    encoded: padLeft$1(value.toLowerCase())
  };
}
function encodeArray(value, options) {
  const { checksumAddress, length, parameter } = options;
  const dynamic = length === null;
  if (!Array.isArray(value))
    throw new InvalidArrayError(value);
  if (!dynamic && value.length !== length)
    throw new ArrayLengthMismatchError({
      expectedLength: length,
      givenLength: value.length,
      type: `${parameter.type}[${length}]`
    });
  let dynamicChild = false;
  const preparedParameters = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParameter({
      checksumAddress,
      parameter,
      value: value[i]
    });
    if (preparedParam.dynamic)
      dynamicChild = true;
    preparedParameters.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encode$2(preparedParameters);
    if (dynamic) {
      const length2 = fromNumber$1(preparedParameters.length, { size: 32 });
      return {
        dynamic: true,
        encoded: preparedParameters.length > 0 ? concat$1(length2, data) : length2
      };
    }
    if (dynamicChild)
      return { dynamic: true, encoded: data };
  }
  return {
    dynamic: false,
    encoded: concat$1(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function encodeBytes(value, { type: type2 }) {
  const [, parametersize] = type2.split("bytes");
  const bytesSize = size$2(value);
  if (!parametersize) {
    let value_ = value;
    if (bytesSize % 32 !== 0)
      value_ = padRight$1(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
    return {
      dynamic: true,
      encoded: concat$1(padLeft$1(fromNumber$1(bytesSize, { size: 32 })), value_)
    };
  }
  if (bytesSize !== Number.parseInt(parametersize, 10))
    throw new BytesSizeMismatchError({
      expectedSize: Number.parseInt(parametersize, 10),
      value
    });
  return { dynamic: false, encoded: padRight$1(value) };
}
function encodeBoolean(value) {
  if (typeof value !== "boolean")
    throw new BaseError$1(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
  return { dynamic: false, encoded: padLeft$1(fromBoolean(value)) };
}
function encodeNumber(value, { signed, size: size2 }) {
  if (typeof size2 === "number") {
    const max = 2n ** (BigInt(size2) - (signed ? 1n : 0n)) - 1n;
    const min = signed ? -max - 1n : 0n;
    if (value > max || value < min)
      throw new IntegerOutOfRangeError$1({
        max: max.toString(),
        min: min.toString(),
        signed,
        size: size2 / 8,
        value: value.toString()
      });
  }
  return {
    dynamic: false,
    encoded: fromNumber$1(value, {
      size: 32,
      signed
    })
  };
}
function encodeString(value) {
  const hexValue = fromString$1(value);
  const partsLength = Math.ceil(size$2(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padRight$1(slice$2(hexValue, i * 32, (i + 1) * 32)));
  }
  return {
    dynamic: true,
    encoded: concat$1(padRight$1(fromNumber$1(size$2(hexValue), { size: 32 })), ...parts)
  };
}
function encodeTuple(value, options) {
  const { checksumAddress, parameter } = options;
  let dynamic = false;
  const preparedParameters = [];
  for (let i = 0; i < parameter.components.length; i++) {
    const param_ = parameter.components[i];
    const index = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParameter({
      checksumAddress,
      parameter: param_,
      value: value[index]
    });
    preparedParameters.push(preparedParam);
    if (preparedParam.dynamic)
      dynamic = true;
  }
  return {
    dynamic,
    encoded: dynamic ? encode$2(preparedParameters) : concat$1(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function getArrayComponents(type2) {
  const matches = type2.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
}
function hasDynamicChild(param) {
  const { type: type2 } = param;
  if (type2 === "string")
    return true;
  if (type2 === "bytes")
    return true;
  if (type2.endsWith("[]"))
    return true;
  if (type2 === "tuple")
    return param.components?.some(hasDynamicChild);
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents && hasDynamicChild({
    ...param,
    type: arrayComponents[1]
  }))
    return true;
  return false;
}
const staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes2) {
    this.assertPosition(this.position + bytes2.length - 1);
    this.bytes.set(bytes2, this.position);
    this.position += bytes2.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & 255);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size2) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size2 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
function create(bytes2, { recursiveReadLimit = 8192 } = {}) {
  const cursor2 = Object.create(staticCursor);
  cursor2.bytes = bytes2;
  cursor2.dataView = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
  cursor2.positionReadCount = /* @__PURE__ */ new Map();
  cursor2.recursiveReadLimit = recursiveReadLimit;
  return cursor2;
}
class NegativeOffsetError extends BaseError$1 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
}
class PositionOutOfBoundsError extends BaseError$1 {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
}
class RecursiveReadLimitExceededError extends BaseError$1 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
}
function decode(parameters, data, options = {}) {
  const { as = "Array", checksumAddress = false } = options;
  const bytes2 = typeof data === "string" ? fromHex$7(data) : data;
  const cursor2 = create(bytes2);
  if (size$3(bytes2) === 0 && parameters.length > 0)
    throw new ZeroDataError();
  if (size$3(bytes2) && size$3(bytes2) < 32)
    throw new DataSizeTooSmallError({
      data: typeof data === "string" ? data : fromBytes$5(data),
      parameters,
      size: size$3(bytes2)
    });
  let consumed = 0;
  const values = as === "Array" ? [] : {};
  for (let i = 0; i < parameters.length; ++i) {
    const param = parameters[i];
    cursor2.setPosition(consumed);
    const [data2, consumed_] = decodeParameter(cursor2, param, {
      checksumAddress,
      staticPosition: 0
    });
    consumed += consumed_;
    if (as === "Array")
      values.push(data2);
    else
      values[param.name ?? i] = data2;
  }
  return values;
}
function encode$1(parameters, values, options) {
  const { checksumAddress = false } = {};
  if (parameters.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: parameters.length,
      givenLength: values.length
    });
  const preparedParameters = prepareParameters({
    checksumAddress,
    parameters,
    values
  });
  const data = encode$2(preparedParameters);
  if (data.length === 0)
    return "0x";
  return data;
}
function encodePacked(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i = 0; i < types.length; i++) {
    const type2 = types[i];
    const value = values[i];
    data.push(encodePacked.encode(type2, value));
  }
  return concat$1(...data);
}
(function(encodePacked2) {
  function encode2(type2, value, isArray = false) {
    if (type2 === "address") {
      const address = value;
      assert$9(address);
      return padLeft$1(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type2 === "string")
      return fromString$1(value);
    if (type2 === "bytes")
      return value;
    if (type2 === "bool")
      return padLeft$1(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type2.match(integerRegex);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size2 = Number.parseInt(bits, 10) / 8;
      return fromNumber$1(value, {
        size: isArray ? 32 : size2,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type2.match(bytesRegex);
    if (bytesMatch) {
      const [_type, size2] = bytesMatch;
      if (Number.parseInt(size2, 10) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError({
          expectedSize: Number.parseInt(size2, 10),
          value
        });
      return padRight$1(value, isArray ? 32 : 0);
    }
    const arrayMatch = type2.match(arrayRegex);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i = 0; i < value.length; i++) {
        data.push(encode2(childType, value[i], true));
      }
      if (data.length === 0)
        return "0x";
      return concat$1(...data);
    }
    throw new InvalidTypeError(type2);
  }
  encodePacked2.encode = encode2;
})(encodePacked || (encodePacked = {}));
function from$e(parameters) {
  if (Array.isArray(parameters) && typeof parameters[0] === "string")
    return parseAbiParameters(parameters);
  if (typeof parameters === "string")
    return parseAbiParameters(parameters);
  return parameters;
}
class DataSizeTooSmallError extends BaseError$1 {
  constructor({ data, parameters, size: size2 }) {
    super(`Data size of ${size2} bytes is too small for given parameters.`, {
      metaMessages: [
        `Params: (${formatAbiParameters(parameters)})`,
        `Data:   ${data} (${size2} bytes)`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.DataSizeTooSmallError"
    });
  }
}
class ZeroDataError extends BaseError$1 {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.');
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ZeroDataError"
    });
  }
}
class ArrayLengthMismatchError extends BaseError$1 {
  constructor({ expectedLength, givenLength, type: type2 }) {
    super(`Array length mismatch for type \`${type2}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ArrayLengthMismatchError"
    });
  }
}
class BytesSizeMismatchError extends BaseError$1 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size$2(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
}
class LengthMismatchError extends BaseError$1 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
}
class InvalidArrayError extends BaseError$1 {
  constructor(value) {
    super(`Value \`${value}\` is not a valid array.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidArrayError"
    });
  }
}
class InvalidTypeError extends BaseError$1 {
  constructor(type2) {
    super(`Type \`${type2}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
}
function toHex$3(value) {
  return to(value, "Hex");
}
function to(value, to2) {
  const to_ = to2;
  const bytes2 = (() => {
    if (typeof value === "string") {
      if (value.length > 3 && value.length % 2 !== 0)
        throw new InvalidLengthError(value);
      return fromHex$7(value);
    }
    return value;
  })();
  const cursor2 = create(bytes2, {
    recursiveReadLimit: Number.POSITIVE_INFINITY
  });
  const result = decodeRlpCursor(cursor2, to_);
  return result;
}
function decodeRlpCursor(cursor2, to2 = "Hex") {
  if (cursor2.bytes.length === 0)
    return to2 === "Hex" ? fromBytes$5(cursor2.bytes) : cursor2.bytes;
  const prefix = cursor2.readByte();
  if (prefix < 128)
    cursor2.decrementPosition(1);
  if (prefix < 192) {
    const length2 = readLength(cursor2, prefix, 128);
    const bytes2 = cursor2.readBytes(length2);
    return to2 === "Hex" ? fromBytes$5(bytes2) : bytes2;
  }
  const length = readLength(cursor2, prefix, 192);
  return readList(cursor2, length, to2);
}
function readLength(cursor2, prefix, offset) {
  if (offset === 128 && prefix < 128)
    return 1;
  if (prefix <= offset + 55)
    return prefix - offset;
  if (prefix === offset + 55 + 1)
    return cursor2.readUint8();
  if (prefix === offset + 55 + 2)
    return cursor2.readUint16();
  if (prefix === offset + 55 + 3)
    return cursor2.readUint24();
  if (prefix === offset + 55 + 4)
    return cursor2.readUint32();
  throw new BaseError$1("Invalid RLP prefix");
}
function readList(cursor2, length, to2) {
  const position = cursor2.position;
  const value = [];
  while (cursor2.position - position < length)
    value.push(decodeRlpCursor(cursor2, to2));
  return value;
}
function from$d(value, options) {
  const { as } = options;
  const encodable = getEncodable(value);
  const cursor2 = create(new Uint8Array(encodable.length));
  encodable.encode(cursor2);
  if (as === "Hex")
    return fromBytes$5(cursor2.bytes);
  return cursor2.bytes;
}
function fromHex$5(hex2, options = {}) {
  const { as = "Hex" } = options;
  return from$d(hex2, { as });
}
function getEncodable(bytes2) {
  if (Array.isArray(bytes2))
    return getEncodableList(bytes2.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes2);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor2) {
      if (bodyLength <= 55) {
        cursor2.pushByte(192 + bodyLength);
      } else {
        cursor2.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor2.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor2.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor2.pushUint24(bodyLength);
        else
          cursor2.pushUint32(bodyLength);
      }
      for (const { encode: encode2 } of list) {
        encode2(cursor2);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes2 = typeof bytesOrHex === "string" ? fromHex$7(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes2.length);
  const length = (() => {
    if (bytes2.length === 1 && bytes2[0] < 128)
      return 1;
    if (bytes2.length <= 55)
      return 1 + bytes2.length;
    return 1 + sizeOfBytesLength + bytes2.length;
  })();
  return {
    length,
    encode(cursor2) {
      if (bytes2.length === 1 && bytes2[0] < 128) {
        cursor2.pushBytes(bytes2);
      } else if (bytes2.length <= 55) {
        cursor2.pushByte(128 + bytes2.length);
        cursor2.pushBytes(bytes2);
      } else {
        cursor2.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor2.pushUint8(bytes2.length);
        else if (sizeOfBytesLength === 2)
          cursor2.pushUint16(bytes2.length);
        else if (sizeOfBytesLength === 3)
          cursor2.pushUint24(bytes2.length);
        else
          cursor2.pushUint32(bytes2.length);
        cursor2.pushBytes(bytes2);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length <= 255)
    return 1;
  if (length <= 65535)
    return 2;
  if (length <= 16777215)
    return 3;
  if (length <= 4294967295)
    return 4;
  throw new BaseError$1("Length is too large.");
}
function assert$8(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError$1({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError$1({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError$1({ signature });
  if (signature.r < 0n || signature.r > maxUint256$1)
    throw new InvalidRError$1({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint256$1)
    throw new InvalidSError$1({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError$1({ value: signature.yParity });
}
function fromBytes$3(signature) {
  return fromHex$4(fromBytes$5(signature));
}
function fromHex$4(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError$2({ signature });
  const r = BigInt(slice$2(signature, 0, 32));
  const s = BigInt(slice$2(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity$1(yParity2);
    } catch {
      throw new InvalidYParityError$1({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r,
      s
    };
  return {
    r,
    s,
    yParity
  };
}
function extract(value) {
  if (typeof value.r === "undefined")
    return void 0;
  if (typeof value.s === "undefined")
    return void 0;
  return from$c(value);
}
function from$c(signature) {
  const signature_ = (() => {
    if (typeof signature === "string")
      return fromHex$4(signature);
    if (signature instanceof Uint8Array)
      return fromBytes$3(signature);
    if (typeof signature.r === "string")
      return fromRpc$6(signature);
    if (signature.v)
      return fromLegacy(signature);
    return {
      r: signature.r,
      s: signature.s,
      ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
    };
  })();
  assert$8(signature_);
  return signature_;
}
function fromLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    yParity: vToYParity$1(signature.v)
  };
}
function fromRpc$6(signature) {
  const yParity = (() => {
    const v = signature.v ? Number(signature.v) : void 0;
    let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
    if (typeof v === "number" && typeof yParity2 !== "number")
      yParity2 = vToYParity$1(v);
    if (typeof yParity2 !== "number")
      throw new InvalidYParityError$1({ value: signature.yParity });
    return yParity2;
  })();
  return {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    yParity
  };
}
function fromTuple$3(tuple) {
  const [yParity, r, s] = tuple;
  return from$c({
    r: r === "0x" ? 0n : BigInt(r),
    s: s === "0x" ? 0n : BigInt(s),
    yParity: yParity === "0x" ? 0 : Number(yParity)
  });
}
function toHex$2(signature) {
  assert$8(signature);
  const r = signature.r;
  const s = signature.s;
  const signature_ = concat$1(
    fromNumber$1(r, { size: 32 }),
    fromNumber$1(s, { size: 32 }),
    // If the signature is recovered, add the recovery byte to the signature.
    typeof signature.yParity === "number" ? fromNumber$1(yParityToV$1(signature.yParity), { size: 1 }) : "0x"
  );
  return signature_;
}
function toRpc$6(signature) {
  const { r, s, yParity } = signature;
  return {
    r: fromNumber$1(r, { size: 32 }),
    s: fromNumber$1(s, { size: 32 }),
    yParity: yParity === 0 ? "0x0" : "0x1"
  };
}
function toTuple$3(signature) {
  const { r, s, yParity } = signature;
  return [
    yParity ? "0x01" : "0x",
    r === 0n ? "0x" : trimLeft(fromNumber$1(r)),
    s === 0n ? "0x" : trimLeft(fromNumber$1(s))
  ];
}
function vToYParity$1(v) {
  if (v === 0 || v === 27)
    return 0;
  if (v === 1 || v === 28)
    return 1;
  if (v >= 35)
    return v % 2 === 0 ? 1 : 0;
  throw new InvalidVError$1({ value: v });
}
function yParityToV$1(yParity) {
  if (yParity === 0)
    return 27;
  if (yParity === 1)
    return 28;
  throw new InvalidYParityError$1({ value: yParity });
}
let InvalidSerializedSizeError$2 = class InvalidSerializedSizeError2 extends BaseError$1 {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size$2(from$h(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
};
let MissingPropertiesError$1 = class MissingPropertiesError extends BaseError$1 {
  constructor({ signature }) {
    super(`Signature \`${stringify$1(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
};
let InvalidRError$1 = class InvalidRError extends BaseError$1 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
};
let InvalidSError$1 = class InvalidSError extends BaseError$1 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
};
let InvalidYParityError$1 = class InvalidYParityError extends BaseError$1 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
};
let InvalidVError$1 = class InvalidVError extends BaseError$1 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
};
function from$b(authorization, options = {}) {
  if (typeof authorization.chainId === "string")
    return fromRpc$5(authorization);
  return { ...authorization, ...options.signature };
}
function fromRpc$5(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = extract(authorization);
  return {
    address,
    chainId: Number(chainId),
    nonce: BigInt(nonce),
    ...signature
  };
}
function fromRpcList$1(authorizationList) {
  return authorizationList.map(fromRpc$5);
}
function toRpc$5(authorization) {
  const { address, chainId, nonce, ...signature } = authorization;
  return {
    address,
    chainId: fromNumber$1(chainId),
    nonce: fromNumber$1(nonce),
    ...toRpc$6(signature)
  };
}
function toRpcList$1(authorizationList) {
  return authorizationList.map(toRpc$5);
}
function recoverAddress(options) {
  return fromPublicKey(recoverPublicKey(options));
}
function recoverPublicKey(options) {
  const { payload, signature } = options;
  const { r, s, yParity } = signature;
  const signature_ = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(yParity);
  const point = signature_.recoverPublicKey(from$h(payload).substring(2));
  return from$g(point);
}
function verify$4(options) {
  const { hash: hash2, payload } = options;
  if (options.address)
    return isEqual(options.address, recoverAddress({ payload, signature: options.signature }));
  return secp256k1.verify(options.signature, from$i(payload), toBytes$1(options.publicKey), ...hash2 ? [{ prehash: true, lowS: true }] : []);
}
const magicBytes$2 = "0x8010801080108010801080108010801080108010801080108010801080108010";
const suffixParameters = from$e("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
function assert$7(value) {
  if (typeof value === "string") {
    if (slice$2(value, -32) !== magicBytes$2)
      throw new InvalidWrappedSignatureError$1(value);
  } else
    assert$8(value.authorization);
}
function unwrap(wrapped) {
  assert$7(wrapped);
  const suffixLength = toNumber(slice$2(wrapped, -64, -32));
  const suffix = slice$2(wrapped, -suffixLength - 64, -64);
  const signature = slice$2(wrapped, 0, -suffixLength - 64);
  const [auth, to2, data] = decode(suffixParameters, suffix);
  const authorization = from$b({
    address: auth.delegation,
    chainId: Number(auth.chainId),
    nonce: auth.nonce,
    yParity: auth.yParity,
    r: auth.r,
    s: auth.s
  });
  return {
    authorization,
    signature,
    ...data && data !== "0x" ? { data, to: to2 } : {}
  };
}
function validate$3(value) {
  try {
    assert$7(value);
    return true;
  } catch {
    return false;
  }
}
let InvalidWrappedSignatureError$1 = class InvalidWrappedSignatureError extends BaseError$1 {
  constructor(wrapped) {
    super(`Value \`${wrapped}\` is an invalid ERC-8010 wrapped signature.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureErc8010.InvalidWrappedSignatureError"
    });
  }
};
function normalizeSignature(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0; i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", "error", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError$1("Unable to normalize signature.");
  return result;
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return validate$4(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index) => {
          return isArgOfType(Object.values(arg)[index], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
          ...abiParameter,
          // Pop off `[]` or `[M]` from end of type
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex];
    const targetParameter = targetParameters[parameterIndex];
    if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
      return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
    const types = [sourceParameter.type, targetParameter.type];
    const ambiguous = (() => {
      if (types.includes("address") && types.includes("bytes20"))
        return true;
      if (types.includes("address") && types.includes("string"))
        return validate$4(args[parameterIndex], {
          strict: false
        });
      if (types.includes("address") && types.includes("bytes"))
        return validate$4(args[parameterIndex], {
          strict: false
        });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}
function from$a(abiItem2, options = {}) {
  const { prepare = true } = options;
  const item = (() => {
    if (Array.isArray(abiItem2))
      return parseAbiItem(abiItem2);
    if (typeof abiItem2 === "string")
      return parseAbiItem(abiItem2);
    return abiItem2;
  })();
  return {
    ...item,
    ...prepare ? { hash: getSignatureHash(item) } : {}
  };
}
function fromAbi$2(abi2, name, options) {
  const { args = [], prepare = true } = options ?? {};
  const isSelector = validate$6(name, { strict: false });
  const abiItems = abi2.filter((abiItem3) => {
    if (isSelector) {
      if (abiItem3.type === "function" || abiItem3.type === "error")
        return getSelector$1(abiItem3) === slice$2(name, 0, 4);
      if (abiItem3.type === "event")
        return getSignatureHash(abiItem3) === name;
      return false;
    }
    return "name" in abiItem3 && abiItem3.name === name;
  });
  if (abiItems.length === 0)
    throw new NotFoundError({ name });
  if (abiItems.length === 1)
    return {
      ...abiItems[0],
      ...prepare ? { hash: getSignatureHash(abiItems[0]) } : {}
    };
  let matchedAbiItem;
  for (const abiItem3 of abiItems) {
    if (!("inputs" in abiItem3))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem3.inputs || abiItem3.inputs.length === 0)
        return {
          ...abiItem3,
          ...prepare ? { hash: getSignatureHash(abiItem3) } : {}
        };
      continue;
    }
    if (!abiItem3.inputs)
      continue;
    if (abiItem3.inputs.length === 0)
      continue;
    if (abiItem3.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index) => {
      const abiParameter = "inputs" in abiItem3 && abiItem3.inputs[index];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes(abiItem3.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AmbiguityError({
            abiItem: abiItem3,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem3;
    }
  }
  const abiItem2 = (() => {
    if (matchedAbiItem)
      return matchedAbiItem;
    const [abiItem3, ...overloads] = abiItems;
    return { ...abiItem3, overloads };
  })();
  if (!abiItem2)
    throw new NotFoundError({ name });
  return {
    ...abiItem2,
    ...prepare ? { hash: getSignatureHash(abiItem2) } : {}
  };
}
function getSelector$1(...parameters) {
  const abiItem2 = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi$2(abi2, name);
    }
    return parameters[0];
  })();
  return slice$2(getSignatureHash(abiItem2), 0, 4);
}
function getSignature(...parameters) {
  const abiItem2 = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi$2(abi2, name);
    }
    return parameters[0];
  })();
  const signature = (() => {
    if (typeof abiItem2 === "string")
      return abiItem2;
    return formatAbiItem(abiItem2);
  })();
  return normalizeSignature(signature);
}
function getSignatureHash(...parameters) {
  const abiItem2 = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi$2(abi2, name);
    }
    return parameters[0];
  })();
  if (typeof abiItem2 !== "string" && "hash" in abiItem2 && abiItem2.hash)
    return abiItem2.hash;
  return keccak256(fromString$1(getSignature(abiItem2)));
}
class AmbiguityError extends BaseError$1 {
  constructor(x, y) {
    super("Found ambiguous types in overloaded ABI Items.", {
      metaMessages: [
        // TODO: abitype to add support for signature-formatted ABI items.
        `\`${x.type}\` in \`${normalizeSignature(formatAbiItem(x.abiItem))}\`, and`,
        `\`${y.type}\` in \`${normalizeSignature(formatAbiItem(y.abiItem))}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.AmbiguityError"
    });
  }
}
class NotFoundError extends BaseError$1 {
  constructor({ name, data, type: type2 = "item" }) {
    const selector = (() => {
      if (name)
        return ` with name "${name}"`;
      if (data)
        return ` with data "${data}"`;
      return "";
    })();
    super(`ABI ${type2}${selector} not found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.NotFoundError"
    });
  }
}
function encode(...parameters) {
  const [abiConstructor, options] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, options2] = parameters;
      return [fromAbi$1(abi2), options2];
    }
    return parameters;
  })();
  const { bytecode, args } = options;
  return concat$1(bytecode, abiConstructor.inputs?.length && args?.length ? encode$1(abiConstructor.inputs, args) : "0x");
}
function from$9(abiConstructor) {
  return from$a(abiConstructor);
}
function fromAbi$1(abi2) {
  const item = abi2.find((item2) => item2.type === "constructor");
  if (!item)
    throw new NotFoundError({ name: "constructor" });
  return item;
}
function encodeData(...parameters) {
  const [abiFunction, args = []] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name, args3] = parameters;
      return [fromAbi(abi2, name, { args: args3 }), args3];
    }
    const [abiFunction2, args2] = parameters;
    return [abiFunction2, args2];
  })();
  const { overloads } = abiFunction;
  const item = overloads ? fromAbi([abiFunction, ...overloads], abiFunction.name, {
    args
  }) : abiFunction;
  const selector = getSelector(item);
  const data = args.length > 0 ? encode$1(item.inputs, args) : void 0;
  return data ? concat$1(selector, data) : selector;
}
function from$8(abiFunction, options = {}) {
  return from$a(abiFunction, options);
}
function fromAbi(abi2, name, options) {
  const item = fromAbi$2(abi2, name, options);
  if (item.type !== "function")
    throw new NotFoundError({ name, type: "function" });
  return item;
}
function getSelector(abiItem2) {
  return getSelector$1(abiItem2);
}
const magicBytes$1 = "0x6492649264926492649264926492649264926492649264926492649264926492";
function assert$6(wrapped) {
  if (slice$2(wrapped, -32) !== magicBytes$1)
    throw new InvalidWrappedSignatureError2(wrapped);
}
function wrap(value) {
  const { data, signature, to: to2 } = value;
  return concat$1(encode$1(from$e("address, bytes, bytes"), [
    to2,
    data,
    signature
  ]), magicBytes$1);
}
function validate$2(wrapped) {
  try {
    assert$6(wrapped);
    return true;
  } catch {
    return false;
  }
}
class InvalidWrappedSignatureError2 extends BaseError$1 {
  constructor(wrapped) {
    super(`Value \`${wrapped}\` is an invalid ERC-6492 wrapped signature.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureErc6492.InvalidWrappedSignatureError"
    });
  }
}
var _cjs = {};
var Abi = {};
var abi = {};
var hasRequiredAbi$1;
function requireAbi$1() {
  if (hasRequiredAbi$1) return abi;
  hasRequiredAbi$1 = 1;
  Object.defineProperty(abi, "__esModule", { value: true });
  abi.isSignatures = isSignatures;
  function isSignatures(value) {
    for (const item of value) {
      if (typeof item !== "string")
        return false;
    }
    return true;
  }
  return abi;
}
var hasRequiredAbi;
function requireAbi() {
  if (hasRequiredAbi) return Abi;
  hasRequiredAbi = 1;
  Object.defineProperty(Abi, "__esModule", { value: true });
  Abi.format = format2;
  Abi.from = from2;
  const abitype = /* @__PURE__ */ requireExports();
  const internal = requireAbi$1();
  function format2(abi2) {
    return abitype.formatAbi(abi2);
  }
  function from2(abi2) {
    if (internal.isSignatures(abi2))
      return abitype.parseAbi(abi2);
    return abi2;
  }
  return Abi;
}
var AbiConstructor$1 = {};
var AbiItem$1 = {};
var Errors$1 = {};
var errors$1 = {};
var version$2 = {};
var hasRequiredVersion$1;
function requireVersion$1() {
  if (hasRequiredVersion$1) return version$2;
  hasRequiredVersion$1 = 1;
  Object.defineProperty(version$2, "__esModule", { value: true });
  version$2.version = void 0;
  version$2.version = "0.1.1";
  return version$2;
}
var hasRequiredErrors$3;
function requireErrors$3() {
  if (hasRequiredErrors$3) return errors$1;
  hasRequiredErrors$3 = 1;
  Object.defineProperty(errors$1, "__esModule", { value: true });
  errors$1.getUrl = getUrl;
  errors$1.getVersion = getVersion2;
  errors$1.prettyPrint = prettyPrint;
  const version_js_1 = requireVersion$1();
  function getUrl(url) {
    return url;
  }
  function getVersion2() {
    return version_js_1.version;
  }
  function prettyPrint(args) {
    if (!args)
      return "";
    const entries = Object.entries(args).map(([key, value]) => {
      if (value === void 0 || value === false)
        return null;
      return [key, value];
    }).filter(Boolean);
    const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
    return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
  }
  return errors$1;
}
var hasRequiredErrors$2;
function requireErrors$2() {
  if (hasRequiredErrors$2) return Errors$1;
  hasRequiredErrors$2 = 1;
  Object.defineProperty(Errors$1, "__esModule", { value: true });
  Errors$1.BaseError = void 0;
  const errors_js_1 = requireErrors$3();
  class BaseError3 extends Error {
    constructor(shortMessage, options = {}) {
      const details = (() => {
        if (options.cause instanceof BaseError3) {
          if (options.cause.details)
            return options.cause.details;
          if (options.cause.shortMessage)
            return options.cause.shortMessage;
        }
        if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
          return options.cause.details;
        if (options.cause?.message)
          return options.cause.message;
        return options.details;
      })();
      const docsPath = (() => {
        if (options.cause instanceof BaseError3)
          return options.cause.docsPath || options.docsPath;
        return options.docsPath;
      })();
      const docsBaseUrl = "https://oxlib.sh";
      const docs = `${docsBaseUrl}${docsPath ?? ""}`;
      const message = [
        shortMessage || "An error occurred.",
        ...options.metaMessages ? ["", ...options.metaMessages] : [],
        ...details || docsPath ? [
          "",
          details ? `Details: ${details}` : void 0,
          docsPath ? `See: ${docs}` : void 0
        ] : []
      ].filter((x) => typeof x === "string").join("\n");
      super(message, options.cause ? { cause: options.cause } : void 0);
      Object.defineProperty(this, "details", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "docs", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "docsPath", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "shortMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "cause", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "BaseError"
      });
      Object.defineProperty(this, "version", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: `ox@${(0, errors_js_1.getVersion)()}`
      });
      this.cause = options.cause;
      this.details = details;
      this.docs = docs;
      this.docsPath = docsPath;
      this.shortMessage = shortMessage;
    }
    walk(fn) {
      return walk2(this, fn);
    }
  }
  Errors$1.BaseError = BaseError3;
  function walk2(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && "cause" in err && err.cause)
      return walk2(err.cause, fn);
    return fn ? null : err;
  }
  return Errors$1;
}
var Hash$1 = {};
var Bytes$1 = {};
var Hex$1 = {};
var bytes$1 = {};
var hasRequiredBytes$3;
function requireBytes$3() {
  if (hasRequiredBytes$3) return bytes$1;
  hasRequiredBytes$3 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.charCodeMap = void 0;
    exports.assertSize = assertSize2;
    exports.assertStartOffset = assertStartOffset2;
    exports.assertEndOffset = assertEndOffset2;
    exports.charCodeToBase16 = charCodeToBase162;
    exports.pad = pad2;
    exports.trim = trim2;
    const Bytes2 = requireBytes$2();
    function assertSize2(bytes2, size_) {
      if (Bytes2.size(bytes2) > size_)
        throw new Bytes2.SizeOverflowError({
          givenSize: Bytes2.size(bytes2),
          maxSize: size_
        });
    }
    function assertStartOffset2(value, start) {
      if (typeof start === "number" && start > 0 && start > Bytes2.size(value) - 1)
        throw new Bytes2.SliceOffsetOutOfBoundsError({
          offset: start,
          position: "start",
          size: Bytes2.size(value)
        });
    }
    function assertEndOffset2(value, start, end) {
      if (typeof start === "number" && typeof end === "number" && Bytes2.size(value) !== end - start) {
        throw new Bytes2.SliceOffsetOutOfBoundsError({
          offset: end,
          position: "end",
          size: Bytes2.size(value)
        });
      }
    }
    exports.charCodeMap = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
    function charCodeToBase162(char) {
      if (char >= exports.charCodeMap.zero && char <= exports.charCodeMap.nine)
        return char - exports.charCodeMap.zero;
      if (char >= exports.charCodeMap.A && char <= exports.charCodeMap.F)
        return char - (exports.charCodeMap.A - 10);
      if (char >= exports.charCodeMap.a && char <= exports.charCodeMap.f)
        return char - (exports.charCodeMap.a - 10);
      return void 0;
    }
    function pad2(bytes2, options = {}) {
      const { dir, size: size2 = 32 } = options;
      if (size2 === 0)
        return bytes2;
      if (bytes2.length > size2)
        throw new Bytes2.SizeExceedsPaddingSizeError({
          size: bytes2.length,
          targetSize: size2,
          type: "Bytes"
        });
      const paddedBytes = new Uint8Array(size2);
      for (let i = 0; i < size2; i++) {
        const padEnd = dir === "right";
        paddedBytes[padEnd ? i : size2 - i - 1] = bytes2[padEnd ? i : bytes2.length - i - 1];
      }
      return paddedBytes;
    }
    function trim2(value, options = {}) {
      const { dir = "left" } = options;
      let data = value;
      let sliceLength = 0;
      for (let i = 0; i < data.length - 1; i++) {
        if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
          sliceLength++;
        else
          break;
      }
      data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
      return data;
    }
  })(bytes$1);
  return bytes$1;
}
var hex$1 = {};
var hasRequiredHex$3;
function requireHex$3() {
  if (hasRequiredHex$3) return hex$1;
  hasRequiredHex$3 = 1;
  Object.defineProperty(hex$1, "__esModule", { value: true });
  hex$1.assertSize = assertSize2;
  hex$1.assertStartOffset = assertStartOffset2;
  hex$1.assertEndOffset = assertEndOffset2;
  hex$1.pad = pad2;
  hex$1.trim = trim2;
  const Hex2 = requireHex$2();
  function assertSize2(hex2, size_) {
    if (Hex2.size(hex2) > size_)
      throw new Hex2.SizeOverflowError({
        givenSize: Hex2.size(hex2),
        maxSize: size_
      });
  }
  function assertStartOffset2(value, start) {
    if (typeof start === "number" && start > 0 && start > Hex2.size(value) - 1)
      throw new Hex2.SliceOffsetOutOfBoundsError({
        offset: start,
        position: "start",
        size: Hex2.size(value)
      });
  }
  function assertEndOffset2(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && Hex2.size(value) !== end - start) {
      throw new Hex2.SliceOffsetOutOfBoundsError({
        offset: end,
        position: "end",
        size: Hex2.size(value)
      });
    }
  }
  function pad2(hex_, options = {}) {
    const { dir, size: size2 = 32 } = options;
    if (size2 === 0)
      return hex_;
    const hex2 = hex_.replace("0x", "");
    if (hex2.length > size2 * 2)
      throw new Hex2.SizeExceedsPaddingSizeError({
        size: Math.ceil(hex2.length / 2),
        targetSize: size2,
        type: "Hex"
      });
    return `0x${hex2[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
  }
  function trim2(value, options = {}) {
    const { dir = "left" } = options;
    let data = value.replace("0x", "");
    let sliceLength = 0;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
        sliceLength++;
      else
        break;
    }
    data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (data === "0")
      return "0x";
    if (dir === "right" && data.length % 2 === 1)
      return `0x${data}0`;
    return `0x${data}`;
  }
  return hex$1;
}
var Json$1 = {};
var hasRequiredJson$1;
function requireJson$1() {
  if (hasRequiredJson$1) return Json$1;
  hasRequiredJson$1 = 1;
  Object.defineProperty(Json$1, "__esModule", { value: true });
  Json$1.parse = parse2;
  Json$1.stringify = stringify2;
  const bigIntSuffix2 = "#__bigint";
  function parse2(string, reviver) {
    return JSON.parse(string, (key, value_) => {
      const value = value_;
      if (typeof value === "string" && value.endsWith(bigIntSuffix2))
        return BigInt(value.slice(0, -bigIntSuffix2.length));
      return typeof reviver === "function" ? reviver(key, value) : value;
    });
  }
  function stringify2(value, replacer, space) {
    return JSON.stringify(value, (key, value2) => {
      if (typeof replacer === "function")
        return replacer(key, value2);
      if (typeof value2 === "bigint")
        return value2.toString() + bigIntSuffix2;
      return value2;
    }, space);
  }
  return Json$1;
}
var hasRequiredHex$2;
function requireHex$2() {
  if (hasRequiredHex$2) return Hex$1;
  hasRequiredHex$2 = 1;
  Object.defineProperty(Hex$1, "__esModule", { value: true });
  Hex$1.SizeExceedsPaddingSizeError = Hex$1.SliceOffsetOutOfBoundsError = Hex$1.SizeOverflowError = Hex$1.InvalidLengthError = Hex$1.InvalidHexValueError = Hex$1.InvalidHexTypeError = Hex$1.InvalidHexBooleanError = Hex$1.IntegerOutOfRangeError = void 0;
  Hex$1.assert = assert2;
  Hex$1.concat = concat2;
  Hex$1.from = from2;
  Hex$1.fromBoolean = fromBoolean2;
  Hex$1.fromBytes = fromBytes2;
  Hex$1.fromNumber = fromNumber2;
  Hex$1.fromString = fromString2;
  Hex$1.isEqual = isEqual2;
  Hex$1.padLeft = padLeft2;
  Hex$1.padRight = padRight2;
  Hex$1.random = random2;
  Hex$1.slice = slice2;
  Hex$1.size = size2;
  Hex$1.trimLeft = trimLeft2;
  Hex$1.trimRight = trimRight2;
  Hex$1.toBigInt = toBigInt2;
  Hex$1.toBoolean = toBoolean2;
  Hex$1.toBytes = toBytes2;
  Hex$1.toNumber = toNumber2;
  Hex$1.toString = toString2;
  Hex$1.validate = validate2;
  const utils_1 = /* @__PURE__ */ requireUtils();
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const internal_bytes = requireBytes$3();
  const internal = requireHex$3();
  const Json2 = requireJson$1();
  const encoder2 = new TextEncoder();
  const hexes2 = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
  function assert2(value, options = {}) {
    const { strict = false } = options;
    if (!value)
      throw new InvalidHexTypeError3(value);
    if (typeof value !== "string")
      throw new InvalidHexTypeError3(value);
    if (strict) {
      if (!/^0x[0-9a-fA-F]*$/.test(value))
        throw new InvalidHexValueError3(value);
    }
    if (!value.startsWith("0x"))
      throw new InvalidHexValueError3(value);
  }
  function concat2(...values) {
    return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
  }
  function from2(value) {
    if (value instanceof Uint8Array)
      return fromBytes2(value);
    if (Array.isArray(value))
      return fromBytes2(new Uint8Array(value));
    return value;
  }
  function fromBoolean2(value, options = {}) {
    const hex2 = `0x${Number(value)}`;
    if (typeof options.size === "number") {
      internal.assertSize(hex2, options.size);
      return padLeft2(hex2, options.size);
    }
    return hex2;
  }
  function fromBytes2(value, options = {}) {
    let string = "";
    for (let i = 0; i < value.length; i++)
      string += hexes2[value[i]];
    const hex2 = `0x${string}`;
    if (typeof options.size === "number") {
      internal.assertSize(hex2, options.size);
      return padRight2(hex2, options.size);
    }
    return hex2;
  }
  function fromNumber2(value, options = {}) {
    const { signed, size: size3 } = options;
    const value_ = BigInt(value);
    let maxValue;
    if (size3) {
      if (signed)
        maxValue = (1n << BigInt(size3) * 8n - 1n) - 1n;
      else
        maxValue = 2n ** (BigInt(size3) * 8n) - 1n;
    } else if (typeof value === "number") {
      maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
    if (maxValue && value_ > maxValue || value_ < minValue) {
      const suffix = typeof value === "bigint" ? "n" : "";
      throw new IntegerOutOfRangeError3({
        max: maxValue ? `${maxValue}${suffix}` : void 0,
        min: `${minValue}${suffix}`,
        signed,
        size: size3,
        value: `${value}${suffix}`
      });
    }
    const stringValue = (signed && value_ < 0 ? (1n << BigInt(size3 * 8)) + BigInt(value_) : value_).toString(16);
    const hex2 = `0x${stringValue}`;
    if (size3)
      return padLeft2(hex2, size3);
    return hex2;
  }
  function fromString2(value, options = {}) {
    return fromBytes2(encoder2.encode(value), options);
  }
  function isEqual2(hexA, hexB) {
    return (0, utils_1.equalBytes)(Bytes2.fromHex(hexA), Bytes2.fromHex(hexB));
  }
  function padLeft2(value, size3) {
    return internal.pad(value, { dir: "left", size: size3 });
  }
  function padRight2(value, size3) {
    return internal.pad(value, { dir: "right", size: size3 });
  }
  function random2(length) {
    return fromBytes2(Bytes2.random(length));
  }
  function slice2(value, start, end, options = {}) {
    const { strict } = options;
    internal.assertStartOffset(value, start);
    const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
    if (strict)
      internal.assertEndOffset(value_, start, end);
    return value_;
  }
  function size2(value) {
    return Math.ceil((value.length - 2) / 2);
  }
  function trimLeft2(value) {
    return internal.trim(value, { dir: "left" });
  }
  function trimRight2(value) {
    return internal.trim(value, { dir: "right" });
  }
  function toBigInt2(hex2, options = {}) {
    const { signed } = options;
    if (options.size)
      internal.assertSize(hex2, options.size);
    const value = BigInt(hex2);
    if (!signed)
      return value;
    const size3 = (hex2.length - 2) / 2;
    const max_unsigned = (1n << BigInt(size3) * 8n) - 1n;
    const max_signed = max_unsigned >> 1n;
    if (value <= max_signed)
      return value;
    return value - max_unsigned - 1n;
  }
  function toBoolean2(hex2, options = {}) {
    if (options.size)
      internal.assertSize(hex2, options.size);
    const hex_ = trimLeft2(hex2);
    if (hex_ === "0x")
      return false;
    if (hex_ === "0x1")
      return true;
    throw new InvalidHexBooleanError(hex2);
  }
  function toBytes2(hex2, options = {}) {
    return Bytes2.fromHex(hex2, options);
  }
  function toNumber2(hex2, options = {}) {
    const { signed, size: size3 } = options;
    if (!signed && !size3)
      return Number(hex2);
    return Number(toBigInt2(hex2, options));
  }
  function toString2(hex2, options = {}) {
    const { size: size3 } = options;
    let bytes2 = Bytes2.fromHex(hex2);
    if (size3) {
      internal_bytes.assertSize(bytes2, size3);
      bytes2 = Bytes2.trimRight(bytes2);
    }
    return new TextDecoder().decode(bytes2);
  }
  function validate2(value, options = {}) {
    const { strict = false } = options;
    try {
      assert2(value, { strict });
      return true;
    } catch {
      return false;
    }
  }
  class IntegerOutOfRangeError3 extends Errors2.BaseError {
    constructor({ max, min, signed, size: size3, value }) {
      super(`Number \`${value}\` is not in safe${size3 ? ` ${size3 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.IntegerOutOfRangeError"
      });
    }
  }
  Hex$1.IntegerOutOfRangeError = IntegerOutOfRangeError3;
  class InvalidHexBooleanError extends Errors2.BaseError {
    constructor(hex2) {
      super(`Hex value \`"${hex2}"\` is not a valid boolean.`, {
        metaMessages: [
          'The hex value must be `"0x0"` (false) or `"0x1"` (true).'
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidHexBooleanError"
      });
    }
  }
  Hex$1.InvalidHexBooleanError = InvalidHexBooleanError;
  class InvalidHexTypeError3 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${typeof value === "object" ? Json2.stringify(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
        metaMessages: ['Hex types must be represented as `"0x${string}"`.']
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidHexTypeError"
      });
    }
  }
  Hex$1.InvalidHexTypeError = InvalidHexTypeError3;
  class InvalidHexValueError3 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${value}\` is an invalid hex value.`, {
        metaMessages: [
          'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidHexValueError"
      });
    }
  }
  Hex$1.InvalidHexValueError = InvalidHexValueError3;
  class InvalidLengthError2 extends Errors2.BaseError {
    constructor(value) {
      super(`Hex value \`"${value}"\` is an odd length (${value.length - 2} nibbles).`, {
        metaMessages: ["It must be an even length."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidLengthError"
      });
    }
  }
  Hex$1.InvalidLengthError = InvalidLengthError2;
  class SizeOverflowError5 extends Errors2.BaseError {
    constructor({ givenSize, maxSize }) {
      super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.SizeOverflowError"
      });
    }
  }
  Hex$1.SizeOverflowError = SizeOverflowError5;
  class SliceOffsetOutOfBoundsError4 extends Errors2.BaseError {
    constructor({ offset, position, size: size3 }) {
      super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size3}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.SliceOffsetOutOfBoundsError"
      });
    }
  }
  Hex$1.SliceOffsetOutOfBoundsError = SliceOffsetOutOfBoundsError4;
  class SizeExceedsPaddingSizeError4 extends Errors2.BaseError {
    constructor({ size: size3, targetSize, type: type2 }) {
      super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.SizeExceedsPaddingSizeError"
      });
    }
  }
  Hex$1.SizeExceedsPaddingSizeError = SizeExceedsPaddingSizeError4;
  return Hex$1;
}
var hasRequiredBytes$2;
function requireBytes$2() {
  if (hasRequiredBytes$2) return Bytes$1;
  hasRequiredBytes$2 = 1;
  Object.defineProperty(Bytes$1, "__esModule", { value: true });
  Bytes$1.SizeExceedsPaddingSizeError = Bytes$1.SliceOffsetOutOfBoundsError = Bytes$1.SizeOverflowError = Bytes$1.InvalidBytesTypeError = Bytes$1.InvalidBytesBooleanError = void 0;
  Bytes$1.assert = assert2;
  Bytes$1.concat = concat2;
  Bytes$1.from = from2;
  Bytes$1.fromArray = fromArray2;
  Bytes$1.fromBoolean = fromBoolean2;
  Bytes$1.fromHex = fromHex2;
  Bytes$1.fromNumber = fromNumber2;
  Bytes$1.fromString = fromString2;
  Bytes$1.isEqual = isEqual2;
  Bytes$1.padLeft = padLeft2;
  Bytes$1.padRight = padRight2;
  Bytes$1.random = random2;
  Bytes$1.size = size2;
  Bytes$1.slice = slice2;
  Bytes$1.toBigInt = toBigInt2;
  Bytes$1.toBoolean = toBoolean2;
  Bytes$1.toHex = toHex2;
  Bytes$1.toNumber = toNumber2;
  Bytes$1.toString = toString2;
  Bytes$1.trimLeft = trimLeft2;
  Bytes$1.trimRight = trimRight2;
  Bytes$1.validate = validate2;
  const utils_1 = /* @__PURE__ */ requireUtils();
  const Errors2 = requireErrors$2();
  const Hex2 = requireHex$2();
  const internal = requireBytes$3();
  const internal_hex = requireHex$3();
  const Json2 = requireJson$1();
  const decoder2 = new TextDecoder();
  const encoder2 = new TextEncoder();
  function assert2(value) {
    if (value instanceof Uint8Array)
      return;
    if (!value)
      throw new InvalidBytesTypeError3(value);
    if (typeof value !== "object")
      throw new InvalidBytesTypeError3(value);
    if (!("BYTES_PER_ELEMENT" in value))
      throw new InvalidBytesTypeError3(value);
    if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
      throw new InvalidBytesTypeError3(value);
  }
  function concat2(...values) {
    let length = 0;
    for (const arr of values) {
      length += arr.length;
    }
    const result = new Uint8Array(length);
    for (let i = 0, index = 0; i < values.length; i++) {
      const arr = values[i];
      result.set(arr, index);
      index += arr.length;
    }
    return result;
  }
  function from2(value) {
    if (value instanceof Uint8Array)
      return value;
    if (typeof value === "string")
      return fromHex2(value);
    return fromArray2(value);
  }
  function fromArray2(value) {
    return value instanceof Uint8Array ? value : new Uint8Array(value);
  }
  function fromBoolean2(value, options = {}) {
    const { size: size3 } = options;
    const bytes2 = new Uint8Array(1);
    bytes2[0] = Number(value);
    if (typeof size3 === "number") {
      internal.assertSize(bytes2, size3);
      return padLeft2(bytes2, size3);
    }
    return bytes2;
  }
  function fromHex2(value, options = {}) {
    const { size: size3 } = options;
    let hex2 = value;
    if (size3) {
      internal_hex.assertSize(value, size3);
      hex2 = Hex2.padRight(value, size3);
    }
    let hexString = hex2.slice(2);
    if (hexString.length % 2)
      hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes2 = new Uint8Array(length);
    for (let index = 0, j = 0; index < length; index++) {
      const nibbleLeft = internal.charCodeToBase16(hexString.charCodeAt(j++));
      const nibbleRight = internal.charCodeToBase16(hexString.charCodeAt(j++));
      if (nibbleLeft === void 0 || nibbleRight === void 0) {
        throw new Errors2.BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
      }
      bytes2[index] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes2;
  }
  function fromNumber2(value, options) {
    const hex2 = Hex2.fromNumber(value, options);
    return fromHex2(hex2);
  }
  function fromString2(value, options = {}) {
    const { size: size3 } = options;
    const bytes2 = encoder2.encode(value);
    if (typeof size3 === "number") {
      internal.assertSize(bytes2, size3);
      return padRight2(bytes2, size3);
    }
    return bytes2;
  }
  function isEqual2(bytesA, bytesB) {
    return (0, utils_1.equalBytes)(bytesA, bytesB);
  }
  function padLeft2(value, size3) {
    return internal.pad(value, { dir: "left", size: size3 });
  }
  function padRight2(value, size3) {
    return internal.pad(value, { dir: "right", size: size3 });
  }
  function random2(length) {
    return crypto.getRandomValues(new Uint8Array(length));
  }
  function size2(value) {
    return value.length;
  }
  function slice2(value, start, end, options = {}) {
    const { strict } = options;
    internal.assertStartOffset(value, start);
    const value_ = value.slice(start, end);
    if (strict)
      internal.assertEndOffset(value_, start, end);
    return value_;
  }
  function toBigInt2(bytes2, options = {}) {
    const { size: size3 } = options;
    if (typeof size3 !== "undefined")
      internal.assertSize(bytes2, size3);
    const hex2 = Hex2.fromBytes(bytes2, options);
    return Hex2.toBigInt(hex2, options);
  }
  function toBoolean2(bytes2, options = {}) {
    const { size: size3 } = options;
    let bytes_ = bytes2;
    if (typeof size3 !== "undefined") {
      internal.assertSize(bytes_, size3);
      bytes_ = trimLeft2(bytes_);
    }
    if (bytes_.length > 1 || bytes_[0] > 1)
      throw new InvalidBytesBooleanError2(bytes_);
    return Boolean(bytes_[0]);
  }
  function toHex2(value, options = {}) {
    return Hex2.fromBytes(value, options);
  }
  function toNumber2(bytes2, options = {}) {
    const { size: size3 } = options;
    if (typeof size3 !== "undefined")
      internal.assertSize(bytes2, size3);
    const hex2 = Hex2.fromBytes(bytes2, options);
    return Hex2.toNumber(hex2, options);
  }
  function toString2(bytes2, options = {}) {
    const { size: size3 } = options;
    let bytes_ = bytes2;
    if (typeof size3 !== "undefined") {
      internal.assertSize(bytes_, size3);
      bytes_ = trimRight2(bytes_);
    }
    return decoder2.decode(bytes_);
  }
  function trimLeft2(value) {
    return internal.trim(value, { dir: "left" });
  }
  function trimRight2(value) {
    return internal.trim(value, { dir: "right" });
  }
  function validate2(value) {
    try {
      assert2(value);
      return true;
    } catch {
      return false;
    }
  }
  class InvalidBytesBooleanError2 extends Errors2.BaseError {
    constructor(bytes2) {
      super(`Bytes value \`${bytes2}\` is not a valid boolean.`, {
        metaMessages: [
          "The bytes array must contain a single byte of either a `0` or `1` value."
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.InvalidBytesBooleanError"
      });
    }
  }
  Bytes$1.InvalidBytesBooleanError = InvalidBytesBooleanError2;
  class InvalidBytesTypeError3 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${typeof value === "object" ? Json2.stringify(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
        metaMessages: ["Bytes values must be of type `Bytes`."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.InvalidBytesTypeError"
      });
    }
  }
  Bytes$1.InvalidBytesTypeError = InvalidBytesTypeError3;
  class SizeOverflowError5 extends Errors2.BaseError {
    constructor({ givenSize, maxSize }) {
      super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.SizeOverflowError"
      });
    }
  }
  Bytes$1.SizeOverflowError = SizeOverflowError5;
  class SliceOffsetOutOfBoundsError4 extends Errors2.BaseError {
    constructor({ offset, position, size: size3 }) {
      super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size3}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.SliceOffsetOutOfBoundsError"
      });
    }
  }
  Bytes$1.SliceOffsetOutOfBoundsError = SliceOffsetOutOfBoundsError4;
  class SizeExceedsPaddingSizeError4 extends Errors2.BaseError {
    constructor({ size: size3, targetSize, type: type2 }) {
      super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.SizeExceedsPaddingSizeError"
      });
    }
  }
  Bytes$1.SizeExceedsPaddingSizeError = SizeExceedsPaddingSizeError4;
  return Bytes$1;
}
var hasRequiredHash$1;
function requireHash$1() {
  if (hasRequiredHash$1) return Hash$1;
  hasRequiredHash$1 = 1;
  Object.defineProperty(Hash$1, "__esModule", { value: true });
  Hash$1.keccak256 = keccak2562;
  Hash$1.ripemd160 = ripemd160;
  Hash$1.sha256 = sha2562;
  Hash$1.validate = validate2;
  const ripemd160_1 = /* @__PURE__ */ requireRipemd160();
  const sha3_1 = /* @__PURE__ */ requireSha3();
  const sha256_1 = /* @__PURE__ */ requireSha256();
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  function keccak2562(value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes2 = (0, sha3_1.keccak_256)(Bytes2.from(value));
    if (as === "Bytes")
      return bytes2;
    return Hex2.fromBytes(bytes2);
  }
  function ripemd160(value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes2 = (0, ripemd160_1.ripemd160)(Bytes2.from(value));
    if (as === "Bytes")
      return bytes2;
    return Hex2.fromBytes(bytes2);
  }
  function sha2562(value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes2 = (0, sha256_1.sha256)(Bytes2.from(value));
    if (as === "Bytes")
      return bytes2;
    return Hex2.fromBytes(bytes2);
  }
  function validate2(value) {
    return Hex2.validate(value) && Hex2.size(value) === 32;
  }
  return Hash$1;
}
var abiItem$1 = {};
var Address$1 = {};
var Caches$1 = {};
var lru$1 = {};
var hasRequiredLru$1;
function requireLru$1() {
  if (hasRequiredLru$1) return lru$1;
  hasRequiredLru$1 = 1;
  Object.defineProperty(lru$1, "__esModule", { value: true });
  lru$1.LruMap = void 0;
  class LruMap2 extends Map {
    constructor(size2) {
      super();
      Object.defineProperty(this, "maxSize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.maxSize = size2;
    }
    get(key) {
      const value = super.get(key);
      if (super.has(key) && value !== void 0) {
        this.delete(key);
        super.set(key, value);
      }
      return value;
    }
    set(key, value) {
      super.set(key, value);
      if (this.maxSize && this.size > this.maxSize) {
        const firstKey = this.keys().next().value;
        if (firstKey)
          this.delete(firstKey);
      }
      return this;
    }
  }
  lru$1.LruMap = LruMap2;
  return lru$1;
}
var hasRequiredCaches$1;
function requireCaches$1() {
  if (hasRequiredCaches$1) return Caches$1;
  hasRequiredCaches$1 = 1;
  Object.defineProperty(Caches$1, "__esModule", { value: true });
  Caches$1.checksum = void 0;
  Caches$1.clear = clear;
  const lru_js_1 = requireLru$1();
  const caches2 = {
    checksum: new lru_js_1.LruMap(8192)
  };
  Caches$1.checksum = caches2.checksum;
  function clear() {
    for (const cache of Object.values(caches2))
      cache.clear();
  }
  return Caches$1;
}
var PublicKey$1 = {};
var hasRequiredPublicKey$1;
function requirePublicKey$1() {
  if (hasRequiredPublicKey$1) return PublicKey$1;
  hasRequiredPublicKey$1 = 1;
  Object.defineProperty(PublicKey$1, "__esModule", { value: true });
  PublicKey$1.InvalidSerializedSizeError = PublicKey$1.InvalidUncompressedPrefixError = PublicKey$1.InvalidCompressedPrefixError = PublicKey$1.InvalidPrefixError = PublicKey$1.InvalidError = void 0;
  PublicKey$1.assert = assert2;
  PublicKey$1.compress = compress;
  PublicKey$1.from = from2;
  PublicKey$1.fromBytes = fromBytes2;
  PublicKey$1.fromHex = fromHex2;
  PublicKey$1.toBytes = toBytes2;
  PublicKey$1.toHex = toHex2;
  PublicKey$1.validate = validate2;
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const Hex2 = requireHex$2();
  const Json2 = requireJson$1();
  function assert2(publicKey, options = {}) {
    const { compressed } = options;
    const { prefix, x, y } = publicKey;
    if (compressed === false || typeof x === "bigint" && typeof y === "bigint") {
      if (prefix !== 4)
        throw new InvalidPrefixError4({
          prefix,
          cause: new InvalidUncompressedPrefixError3()
        });
      return;
    }
    if (compressed === true || typeof x === "bigint" && typeof y === "undefined") {
      if (prefix !== 3 && prefix !== 2)
        throw new InvalidPrefixError4({
          prefix,
          cause: new InvalidCompressedPrefixError3()
        });
      return;
    }
    throw new InvalidError3({ publicKey });
  }
  function compress(publicKey) {
    const { x, y } = publicKey;
    return {
      prefix: y % 2n === 0n ? 2 : 3,
      x
    };
  }
  function from2(value) {
    const publicKey = (() => {
      if (Hex2.validate(value))
        return fromHex2(value);
      if (Bytes2.validate(value))
        return fromBytes2(value);
      const { prefix, x, y } = value;
      if (typeof x === "bigint" && typeof y === "bigint")
        return { prefix: prefix ?? 4, x, y };
      return { prefix, x };
    })();
    assert2(publicKey);
    return publicKey;
  }
  function fromBytes2(publicKey) {
    return fromHex2(Hex2.fromBytes(publicKey));
  }
  function fromHex2(publicKey) {
    if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
      throw new InvalidSerializedSizeError5({ publicKey });
    if (publicKey.length === 130) {
      const x2 = BigInt(Hex2.slice(publicKey, 0, 32));
      const y = BigInt(Hex2.slice(publicKey, 32, 64));
      return {
        prefix: 4,
        x: x2,
        y
      };
    }
    if (publicKey.length === 132) {
      const prefix2 = Number(Hex2.slice(publicKey, 0, 1));
      const x2 = BigInt(Hex2.slice(publicKey, 1, 33));
      const y = BigInt(Hex2.slice(publicKey, 33, 65));
      return {
        prefix: prefix2,
        x: x2,
        y
      };
    }
    const prefix = Number(Hex2.slice(publicKey, 0, 1));
    const x = BigInt(Hex2.slice(publicKey, 1, 33));
    return {
      prefix,
      x
    };
  }
  function toBytes2(publicKey, options = {}) {
    return Bytes2.fromHex(toHex2(publicKey, options));
  }
  function toHex2(publicKey, options = {}) {
    assert2(publicKey);
    const { prefix, x, y } = publicKey;
    const { includePrefix = true } = options;
    const publicKey_ = Hex2.concat(includePrefix ? Hex2.fromNumber(prefix, { size: 1 }) : "0x", Hex2.fromNumber(x, { size: 32 }), typeof y === "bigint" ? Hex2.fromNumber(y, { size: 32 }) : "0x");
    return publicKey_;
  }
  function validate2(publicKey, options = {}) {
    try {
      assert2(publicKey, options);
      return true;
    } catch (_error) {
      return false;
    }
  }
  class InvalidError3 extends Errors2.BaseError {
    constructor({ publicKey }) {
      super(`Value \`${Json2.stringify(publicKey)}\` is not a valid public key.`, {
        metaMessages: [
          "Public key must contain:",
          "- an `x` and `prefix` value (compressed)",
          "- an `x`, `y`, and `prefix` value (uncompressed)"
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidError"
      });
    }
  }
  PublicKey$1.InvalidError = InvalidError3;
  class InvalidPrefixError4 extends Errors2.BaseError {
    constructor({ prefix, cause }) {
      super(`Prefix "${prefix}" is invalid.`, {
        cause
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidPrefixError"
      });
    }
  }
  PublicKey$1.InvalidPrefixError = InvalidPrefixError4;
  class InvalidCompressedPrefixError3 extends Errors2.BaseError {
    constructor() {
      super("Prefix must be 2 or 3 for compressed public keys.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidCompressedPrefixError"
      });
    }
  }
  PublicKey$1.InvalidCompressedPrefixError = InvalidCompressedPrefixError3;
  class InvalidUncompressedPrefixError3 extends Errors2.BaseError {
    constructor() {
      super("Prefix must be 4 for uncompressed public keys.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidUncompressedPrefixError"
      });
    }
  }
  PublicKey$1.InvalidUncompressedPrefixError = InvalidUncompressedPrefixError3;
  class InvalidSerializedSizeError5 extends Errors2.BaseError {
    constructor({ publicKey }) {
      super(`Value \`${publicKey}\` is an invalid public key size.`, {
        metaMessages: [
          "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
          `Received ${Hex2.size(Hex2.from(publicKey))} bytes.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidSerializedSizeError"
      });
    }
  }
  PublicKey$1.InvalidSerializedSizeError = InvalidSerializedSizeError5;
  return PublicKey$1;
}
var hasRequiredAddress$1;
function requireAddress$1() {
  if (hasRequiredAddress$1) return Address$1;
  hasRequiredAddress$1 = 1;
  Object.defineProperty(Address$1, "__esModule", { value: true });
  Address$1.InvalidChecksumError = Address$1.InvalidInputError = Address$1.InvalidAddressError = void 0;
  Address$1.assert = assert2;
  Address$1.checksum = checksum2;
  Address$1.from = from2;
  Address$1.fromPublicKey = fromPublicKey2;
  Address$1.isEqual = isEqual2;
  Address$1.validate = validate2;
  const Bytes2 = requireBytes$2();
  const Caches2 = requireCaches$1();
  const Errors2 = requireErrors$2();
  const Hash2 = requireHash$1();
  const PublicKey2 = requirePublicKey$1();
  const addressRegex2 = /^0x[a-fA-F0-9]{40}$/;
  function assert2(value, options = {}) {
    const { strict = true } = options;
    if (!addressRegex2.test(value))
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidInputError2()
      });
    if (strict) {
      if (value.toLowerCase() === value)
        return;
      if (checksum2(value) !== value)
        throw new InvalidAddressError2({
          address: value,
          cause: new InvalidChecksumError2()
        });
    }
  }
  function checksum2(address) {
    if (Caches2.checksum.has(address))
      return Caches2.checksum.get(address);
    assert2(address, { strict: false });
    const hexAddress = address.substring(2).toLowerCase();
    const hash2 = Hash2.keccak256(Bytes2.fromString(hexAddress), { as: "Bytes" });
    const characters = hexAddress.split("");
    for (let i = 0; i < 40; i += 2) {
      if (hash2[i >> 1] >> 4 >= 8 && characters[i]) {
        characters[i] = characters[i].toUpperCase();
      }
      if ((hash2[i >> 1] & 15) >= 8 && characters[i + 1]) {
        characters[i + 1] = characters[i + 1].toUpperCase();
      }
    }
    const result = `0x${characters.join("")}`;
    Caches2.checksum.set(address, result);
    return result;
  }
  function from2(address, options = {}) {
    const { checksum: checksumVal = false } = options;
    assert2(address);
    if (checksumVal)
      return checksum2(address);
    return address;
  }
  function fromPublicKey2(publicKey, options = {}) {
    const address = Hash2.keccak256(`0x${PublicKey2.toHex(publicKey).slice(4)}`).substring(26);
    return from2(`0x${address}`, options);
  }
  function isEqual2(addressA, addressB) {
    assert2(addressA, { strict: false });
    assert2(addressB, { strict: false });
    return addressA.toLowerCase() === addressB.toLowerCase();
  }
  function validate2(address, options = {}) {
    const { strict = true } = options ?? {};
    try {
      assert2(address, { strict });
      return true;
    } catch {
      return false;
    }
  }
  class InvalidAddressError2 extends Errors2.BaseError {
    constructor({ address, cause }) {
      super(`Address "${address}" is invalid.`, {
        cause
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidAddressError"
      });
    }
  }
  Address$1.InvalidAddressError = InvalidAddressError2;
  class InvalidInputError2 extends Errors2.BaseError {
    constructor() {
      super("Address is not a 20 byte (40 hexadecimal character) value.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidInputError"
      });
    }
  }
  Address$1.InvalidInputError = InvalidInputError2;
  class InvalidChecksumError2 extends Errors2.BaseError {
    constructor() {
      super("Address does not match its checksum counterpart.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidChecksumError"
      });
    }
  }
  Address$1.InvalidChecksumError = InvalidChecksumError2;
  return Address$1;
}
var hasRequiredAbiItem$3;
function requireAbiItem$3() {
  if (hasRequiredAbiItem$3) return abiItem$1;
  hasRequiredAbiItem$3 = 1;
  Object.defineProperty(abiItem$1, "__esModule", { value: true });
  abiItem$1.normalizeSignature = normalizeSignature2;
  abiItem$1.isArgOfType = isArgOfType2;
  abiItem$1.getAmbiguousTypes = getAmbiguousTypes2;
  const Address2 = requireAddress$1();
  const Errors2 = requireErrors$2();
  function normalizeSignature2(signature) {
    let active = true;
    let current = "";
    let level = 0;
    let result = "";
    let valid = false;
    for (let i = 0; i < signature.length; i++) {
      const char = signature[i];
      if (["(", ")", ","].includes(char))
        active = true;
      if (char === "(")
        level++;
      if (char === ")")
        level--;
      if (!active)
        continue;
      if (level === 0) {
        if (char === " " && ["event", "function", "error", ""].includes(result))
          result = "";
        else {
          result += char;
          if (char === ")") {
            valid = true;
            break;
          }
        }
        continue;
      }
      if (char === " ") {
        if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
          current = "";
          active = false;
        }
        continue;
      }
      result += char;
      current += char;
    }
    if (!valid)
      throw new Errors2.BaseError("Unable to normalize signature.");
    return result;
  }
  function isArgOfType2(arg, abiParameter) {
    const argType = typeof arg;
    const abiParameterType = abiParameter.type;
    switch (abiParameterType) {
      case "address":
        return Address2.validate(arg, { strict: false });
      case "bool":
        return argType === "boolean";
      case "function":
        return argType === "string";
      case "string":
        return argType === "string";
      default: {
        if (abiParameterType === "tuple" && "components" in abiParameter)
          return Object.values(abiParameter.components).every((component, index) => {
            return isArgOfType2(Object.values(arg)[index], component);
          });
        if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
          return argType === "number" || argType === "bigint";
        if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
          return argType === "string" || arg instanceof Uint8Array;
        if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
          return Array.isArray(arg) && arg.every((x) => isArgOfType2(x, {
            ...abiParameter,
            type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
          }));
        }
        return false;
      }
    }
  }
  function getAmbiguousTypes2(sourceParameters, targetParameters, args) {
    for (const parameterIndex in sourceParameters) {
      const sourceParameter = sourceParameters[parameterIndex];
      const targetParameter = targetParameters[parameterIndex];
      if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
        return getAmbiguousTypes2(sourceParameter.components, targetParameter.components, args[parameterIndex]);
      const types = [sourceParameter.type, targetParameter.type];
      const ambiguous = (() => {
        if (types.includes("address") && types.includes("bytes20"))
          return true;
        if (types.includes("address") && types.includes("string"))
          return Address2.validate(args[parameterIndex], {
            strict: false
          });
        if (types.includes("address") && types.includes("bytes"))
          return Address2.validate(args[parameterIndex], {
            strict: false
          });
        return false;
      })();
      if (ambiguous)
        return types;
    }
    return;
  }
  return abiItem$1;
}
var hasRequiredAbiItem$2;
function requireAbiItem$2() {
  if (hasRequiredAbiItem$2) return AbiItem$1;
  hasRequiredAbiItem$2 = 1;
  Object.defineProperty(AbiItem$1, "__esModule", { value: true });
  AbiItem$1.InvalidSelectorSizeError = AbiItem$1.NotFoundError = AbiItem$1.AmbiguityError = void 0;
  AbiItem$1.format = format2;
  AbiItem$1.from = from2;
  AbiItem$1.fromAbi = fromAbi2;
  AbiItem$1.getSelector = getSelector2;
  AbiItem$1.getSignature = getSignature2;
  AbiItem$1.getSignatureHash = getSignatureHash2;
  const abitype = /* @__PURE__ */ requireExports();
  const Errors2 = requireErrors$2();
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  const internal = requireAbiItem$3();
  function format2(abiItem2) {
    return abitype.formatAbiItem(abiItem2);
  }
  function from2(abiItem2, options = {}) {
    const { prepare = true } = options;
    const item = (() => {
      if (Array.isArray(abiItem2))
        return abitype.parseAbiItem(abiItem2);
      if (typeof abiItem2 === "string")
        return abitype.parseAbiItem(abiItem2);
      return abiItem2;
    })();
    return {
      ...item,
      ...prepare ? { hash: getSignatureHash2(item) } : {}
    };
  }
  function fromAbi2(abi2, name, options) {
    const { args = [], prepare = true } = options ?? {};
    const isSelector = Hex2.validate(name, { strict: false });
    const abiItems = abi2.filter((abiItem3) => {
      if (isSelector) {
        if (abiItem3.type === "function" || abiItem3.type === "error")
          return getSelector2(abiItem3) === Hex2.slice(name, 0, 4);
        if (abiItem3.type === "event")
          return getSignatureHash2(abiItem3) === name;
        return false;
      }
      return "name" in abiItem3 && abiItem3.name === name;
    });
    if (abiItems.length === 0)
      throw new NotFoundError2({ name });
    if (abiItems.length === 1)
      return {
        ...abiItems[0],
        ...prepare ? { hash: getSignatureHash2(abiItems[0]) } : {}
      };
    let matchedAbiItem;
    for (const abiItem3 of abiItems) {
      if (!("inputs" in abiItem3))
        continue;
      if (!args || args.length === 0) {
        if (!abiItem3.inputs || abiItem3.inputs.length === 0)
          return {
            ...abiItem3,
            ...prepare ? { hash: getSignatureHash2(abiItem3) } : {}
          };
        continue;
      }
      if (!abiItem3.inputs)
        continue;
      if (abiItem3.inputs.length === 0)
        continue;
      if (abiItem3.inputs.length !== args.length)
        continue;
      const matched = args.every((arg, index) => {
        const abiParameter = "inputs" in abiItem3 && abiItem3.inputs[index];
        if (!abiParameter)
          return false;
        return internal.isArgOfType(arg, abiParameter);
      });
      if (matched) {
        if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
          const ambiguousTypes = internal.getAmbiguousTypes(abiItem3.inputs, matchedAbiItem.inputs, args);
          if (ambiguousTypes)
            throw new AmbiguityError2({
              abiItem: abiItem3,
              type: ambiguousTypes[0]
            }, {
              abiItem: matchedAbiItem,
              type: ambiguousTypes[1]
            });
        }
        matchedAbiItem = abiItem3;
      }
    }
    const abiItem2 = (() => {
      if (matchedAbiItem)
        return matchedAbiItem;
      const [abiItem3, ...overloads] = abiItems;
      return { ...abiItem3, overloads };
    })();
    if (!abiItem2)
      throw new NotFoundError2({ name });
    return {
      ...abiItem2,
      ...prepare ? { hash: getSignatureHash2(abiItem2) } : {}
    };
  }
  function getSelector2(abiItem2) {
    return Hex2.slice(getSignatureHash2(abiItem2), 0, 4);
  }
  function getSignature2(abiItem2) {
    const signature = (() => {
      if (typeof abiItem2 === "string")
        return abiItem2;
      return abitype.formatAbiItem(abiItem2);
    })();
    return internal.normalizeSignature(signature);
  }
  function getSignatureHash2(abiItem2) {
    if (typeof abiItem2 !== "string" && "hash" in abiItem2 && abiItem2.hash)
      return abiItem2.hash;
    return Hash2.keccak256(Hex2.fromString(getSignature2(abiItem2)));
  }
  class AmbiguityError2 extends Errors2.BaseError {
    constructor(x, y) {
      super("Found ambiguous types in overloaded ABI Items.", {
        metaMessages: [
          `\`${x.type}\` in \`${internal.normalizeSignature(abitype.formatAbiItem(x.abiItem))}\`, and`,
          `\`${y.type}\` in \`${internal.normalizeSignature(abitype.formatAbiItem(y.abiItem))}\``,
          "",
          "These types encode differently and cannot be distinguished at runtime.",
          "Remove one of the ambiguous items in the ABI."
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.AmbiguityError"
      });
    }
  }
  AbiItem$1.AmbiguityError = AmbiguityError2;
  class NotFoundError2 extends Errors2.BaseError {
    constructor({ name, data, type: type2 = "item" }) {
      const selector = (() => {
        if (name)
          return ` with name "${name}"`;
        if (data)
          return ` with data "${data}"`;
        return "";
      })();
      super(`ABI ${type2}${selector} not found.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.NotFoundError"
      });
    }
  }
  AbiItem$1.NotFoundError = NotFoundError2;
  class InvalidSelectorSizeError extends Errors2.BaseError {
    constructor({ data }) {
      super(`Selector size is invalid. Expected 4 bytes. Received ${Hex2.size(data)} bytes ("${data}").`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.InvalidSelectorSizeError"
      });
    }
  }
  AbiItem$1.InvalidSelectorSizeError = InvalidSelectorSizeError;
  return AbiItem$1;
}
var AbiParameters$1 = {};
var abiParameters$1 = {};
var Solidity$1 = {};
var hasRequiredSolidity$1;
function requireSolidity$1() {
  if (hasRequiredSolidity$1) return Solidity$1;
  hasRequiredSolidity$1 = 1;
  Object.defineProperty(Solidity$1, "__esModule", { value: true });
  Solidity$1.minInt120 = Solidity$1.minInt112 = Solidity$1.minInt104 = Solidity$1.minInt96 = Solidity$1.minInt88 = Solidity$1.minInt80 = Solidity$1.minInt72 = Solidity$1.minInt64 = Solidity$1.minInt56 = Solidity$1.minInt48 = Solidity$1.minInt40 = Solidity$1.minInt32 = Solidity$1.minInt24 = Solidity$1.minInt16 = Solidity$1.minInt8 = Solidity$1.maxInt256 = Solidity$1.maxInt248 = Solidity$1.maxInt240 = Solidity$1.maxInt232 = Solidity$1.maxInt224 = Solidity$1.maxInt216 = Solidity$1.maxInt208 = Solidity$1.maxInt200 = Solidity$1.maxInt192 = Solidity$1.maxInt184 = Solidity$1.maxInt176 = Solidity$1.maxInt168 = Solidity$1.maxInt160 = Solidity$1.maxInt152 = Solidity$1.maxInt144 = Solidity$1.maxInt136 = Solidity$1.maxInt128 = Solidity$1.maxInt120 = Solidity$1.maxInt112 = Solidity$1.maxInt104 = Solidity$1.maxInt96 = Solidity$1.maxInt88 = Solidity$1.maxInt80 = Solidity$1.maxInt72 = Solidity$1.maxInt64 = Solidity$1.maxInt56 = Solidity$1.maxInt48 = Solidity$1.maxInt40 = Solidity$1.maxInt32 = Solidity$1.maxInt24 = Solidity$1.maxInt16 = Solidity$1.maxInt8 = Solidity$1.integerRegex = Solidity$1.bytesRegex = Solidity$1.arrayRegex = void 0;
  Solidity$1.maxUint256 = Solidity$1.maxUint248 = Solidity$1.maxUint240 = Solidity$1.maxUint232 = Solidity$1.maxUint224 = Solidity$1.maxUint216 = Solidity$1.maxUint208 = Solidity$1.maxUint200 = Solidity$1.maxUint192 = Solidity$1.maxUint184 = Solidity$1.maxUint176 = Solidity$1.maxUint168 = Solidity$1.maxUint160 = Solidity$1.maxUint152 = Solidity$1.maxUint144 = Solidity$1.maxUint136 = Solidity$1.maxUint128 = Solidity$1.maxUint120 = Solidity$1.maxUint112 = Solidity$1.maxUint104 = Solidity$1.maxUint96 = Solidity$1.maxUint88 = Solidity$1.maxUint80 = Solidity$1.maxUint72 = Solidity$1.maxUint64 = Solidity$1.maxUint56 = Solidity$1.maxUint48 = Solidity$1.maxUint40 = Solidity$1.maxUint32 = Solidity$1.maxUint24 = Solidity$1.maxUint16 = Solidity$1.maxUint8 = Solidity$1.minInt256 = Solidity$1.minInt248 = Solidity$1.minInt240 = Solidity$1.minInt232 = Solidity$1.minInt224 = Solidity$1.minInt216 = Solidity$1.minInt208 = Solidity$1.minInt200 = Solidity$1.minInt192 = Solidity$1.minInt184 = Solidity$1.minInt176 = Solidity$1.minInt168 = Solidity$1.minInt160 = Solidity$1.minInt152 = Solidity$1.minInt144 = Solidity$1.minInt136 = Solidity$1.minInt128 = void 0;
  Solidity$1.arrayRegex = /^(.*)\[([0-9]*)\]$/;
  Solidity$1.bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
  Solidity$1.integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  Solidity$1.maxInt8 = 2n ** (8n - 1n) - 1n;
  Solidity$1.maxInt16 = 2n ** (16n - 1n) - 1n;
  Solidity$1.maxInt24 = 2n ** (24n - 1n) - 1n;
  Solidity$1.maxInt32 = 2n ** (32n - 1n) - 1n;
  Solidity$1.maxInt40 = 2n ** (40n - 1n) - 1n;
  Solidity$1.maxInt48 = 2n ** (48n - 1n) - 1n;
  Solidity$1.maxInt56 = 2n ** (56n - 1n) - 1n;
  Solidity$1.maxInt64 = 2n ** (64n - 1n) - 1n;
  Solidity$1.maxInt72 = 2n ** (72n - 1n) - 1n;
  Solidity$1.maxInt80 = 2n ** (80n - 1n) - 1n;
  Solidity$1.maxInt88 = 2n ** (88n - 1n) - 1n;
  Solidity$1.maxInt96 = 2n ** (96n - 1n) - 1n;
  Solidity$1.maxInt104 = 2n ** (104n - 1n) - 1n;
  Solidity$1.maxInt112 = 2n ** (112n - 1n) - 1n;
  Solidity$1.maxInt120 = 2n ** (120n - 1n) - 1n;
  Solidity$1.maxInt128 = 2n ** (128n - 1n) - 1n;
  Solidity$1.maxInt136 = 2n ** (136n - 1n) - 1n;
  Solidity$1.maxInt144 = 2n ** (144n - 1n) - 1n;
  Solidity$1.maxInt152 = 2n ** (152n - 1n) - 1n;
  Solidity$1.maxInt160 = 2n ** (160n - 1n) - 1n;
  Solidity$1.maxInt168 = 2n ** (168n - 1n) - 1n;
  Solidity$1.maxInt176 = 2n ** (176n - 1n) - 1n;
  Solidity$1.maxInt184 = 2n ** (184n - 1n) - 1n;
  Solidity$1.maxInt192 = 2n ** (192n - 1n) - 1n;
  Solidity$1.maxInt200 = 2n ** (200n - 1n) - 1n;
  Solidity$1.maxInt208 = 2n ** (208n - 1n) - 1n;
  Solidity$1.maxInt216 = 2n ** (216n - 1n) - 1n;
  Solidity$1.maxInt224 = 2n ** (224n - 1n) - 1n;
  Solidity$1.maxInt232 = 2n ** (232n - 1n) - 1n;
  Solidity$1.maxInt240 = 2n ** (240n - 1n) - 1n;
  Solidity$1.maxInt248 = 2n ** (248n - 1n) - 1n;
  Solidity$1.maxInt256 = 2n ** (256n - 1n) - 1n;
  Solidity$1.minInt8 = -(2n ** (8n - 1n));
  Solidity$1.minInt16 = -(2n ** (16n - 1n));
  Solidity$1.minInt24 = -(2n ** (24n - 1n));
  Solidity$1.minInt32 = -(2n ** (32n - 1n));
  Solidity$1.minInt40 = -(2n ** (40n - 1n));
  Solidity$1.minInt48 = -(2n ** (48n - 1n));
  Solidity$1.minInt56 = -(2n ** (56n - 1n));
  Solidity$1.minInt64 = -(2n ** (64n - 1n));
  Solidity$1.minInt72 = -(2n ** (72n - 1n));
  Solidity$1.minInt80 = -(2n ** (80n - 1n));
  Solidity$1.minInt88 = -(2n ** (88n - 1n));
  Solidity$1.minInt96 = -(2n ** (96n - 1n));
  Solidity$1.minInt104 = -(2n ** (104n - 1n));
  Solidity$1.minInt112 = -(2n ** (112n - 1n));
  Solidity$1.minInt120 = -(2n ** (120n - 1n));
  Solidity$1.minInt128 = -(2n ** (128n - 1n));
  Solidity$1.minInt136 = -(2n ** (136n - 1n));
  Solidity$1.minInt144 = -(2n ** (144n - 1n));
  Solidity$1.minInt152 = -(2n ** (152n - 1n));
  Solidity$1.minInt160 = -(2n ** (160n - 1n));
  Solidity$1.minInt168 = -(2n ** (168n - 1n));
  Solidity$1.minInt176 = -(2n ** (176n - 1n));
  Solidity$1.minInt184 = -(2n ** (184n - 1n));
  Solidity$1.minInt192 = -(2n ** (192n - 1n));
  Solidity$1.minInt200 = -(2n ** (200n - 1n));
  Solidity$1.minInt208 = -(2n ** (208n - 1n));
  Solidity$1.minInt216 = -(2n ** (216n - 1n));
  Solidity$1.minInt224 = -(2n ** (224n - 1n));
  Solidity$1.minInt232 = -(2n ** (232n - 1n));
  Solidity$1.minInt240 = -(2n ** (240n - 1n));
  Solidity$1.minInt248 = -(2n ** (248n - 1n));
  Solidity$1.minInt256 = -(2n ** (256n - 1n));
  Solidity$1.maxUint8 = 2n ** 8n - 1n;
  Solidity$1.maxUint16 = 2n ** 16n - 1n;
  Solidity$1.maxUint24 = 2n ** 24n - 1n;
  Solidity$1.maxUint32 = 2n ** 32n - 1n;
  Solidity$1.maxUint40 = 2n ** 40n - 1n;
  Solidity$1.maxUint48 = 2n ** 48n - 1n;
  Solidity$1.maxUint56 = 2n ** 56n - 1n;
  Solidity$1.maxUint64 = 2n ** 64n - 1n;
  Solidity$1.maxUint72 = 2n ** 72n - 1n;
  Solidity$1.maxUint80 = 2n ** 80n - 1n;
  Solidity$1.maxUint88 = 2n ** 88n - 1n;
  Solidity$1.maxUint96 = 2n ** 96n - 1n;
  Solidity$1.maxUint104 = 2n ** 104n - 1n;
  Solidity$1.maxUint112 = 2n ** 112n - 1n;
  Solidity$1.maxUint120 = 2n ** 120n - 1n;
  Solidity$1.maxUint128 = 2n ** 128n - 1n;
  Solidity$1.maxUint136 = 2n ** 136n - 1n;
  Solidity$1.maxUint144 = 2n ** 144n - 1n;
  Solidity$1.maxUint152 = 2n ** 152n - 1n;
  Solidity$1.maxUint160 = 2n ** 160n - 1n;
  Solidity$1.maxUint168 = 2n ** 168n - 1n;
  Solidity$1.maxUint176 = 2n ** 176n - 1n;
  Solidity$1.maxUint184 = 2n ** 184n - 1n;
  Solidity$1.maxUint192 = 2n ** 192n - 1n;
  Solidity$1.maxUint200 = 2n ** 200n - 1n;
  Solidity$1.maxUint208 = 2n ** 208n - 1n;
  Solidity$1.maxUint216 = 2n ** 216n - 1n;
  Solidity$1.maxUint224 = 2n ** 224n - 1n;
  Solidity$1.maxUint232 = 2n ** 232n - 1n;
  Solidity$1.maxUint240 = 2n ** 240n - 1n;
  Solidity$1.maxUint248 = 2n ** 248n - 1n;
  Solidity$1.maxUint256 = 2n ** 256n - 1n;
  return Solidity$1;
}
var hasRequiredAbiParameters$3;
function requireAbiParameters$3() {
  if (hasRequiredAbiParameters$3) return abiParameters$1;
  hasRequiredAbiParameters$3 = 1;
  Object.defineProperty(abiParameters$1, "__esModule", { value: true });
  abiParameters$1.decodeParameter = decodeParameter2;
  abiParameters$1.decodeAddress = decodeAddress2;
  abiParameters$1.decodeArray = decodeArray2;
  abiParameters$1.decodeBool = decodeBool2;
  abiParameters$1.decodeBytes = decodeBytes2;
  abiParameters$1.decodeNumber = decodeNumber2;
  abiParameters$1.decodeTuple = decodeTuple2;
  abiParameters$1.decodeString = decodeString2;
  abiParameters$1.prepareParameters = prepareParameters2;
  abiParameters$1.prepareParameter = prepareParameter2;
  abiParameters$1.encode = encode2;
  abiParameters$1.encodeAddress = encodeAddress2;
  abiParameters$1.encodeArray = encodeArray2;
  abiParameters$1.encodeBytes = encodeBytes2;
  abiParameters$1.encodeBoolean = encodeBoolean2;
  abiParameters$1.encodeNumber = encodeNumber2;
  abiParameters$1.encodeString = encodeString2;
  abiParameters$1.encodeTuple = encodeTuple2;
  abiParameters$1.getArrayComponents = getArrayComponents2;
  abiParameters$1.hasDynamicChild = hasDynamicChild2;
  const AbiParameters2 = requireAbiParameters$2();
  const Address2 = requireAddress$1();
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const Hex2 = requireHex$2();
  const Solidity_js_1 = requireSolidity$1();
  function decodeParameter2(cursor2, param, options) {
    const { checksumAddress, staticPosition } = options;
    const arrayComponents = getArrayComponents2(param.type);
    if (arrayComponents) {
      const [length, type2] = arrayComponents;
      return decodeArray2(cursor2, { ...param, type: type2 }, { checksumAddress, length, staticPosition });
    }
    if (param.type === "tuple")
      return decodeTuple2(cursor2, param, {
        checksumAddress,
        staticPosition
      });
    if (param.type === "address")
      return decodeAddress2(cursor2, { checksum: checksumAddress });
    if (param.type === "bool")
      return decodeBool2(cursor2);
    if (param.type.startsWith("bytes"))
      return decodeBytes2(cursor2, param, { staticPosition });
    if (param.type.startsWith("uint") || param.type.startsWith("int"))
      return decodeNumber2(cursor2, param);
    if (param.type === "string")
      return decodeString2(cursor2, { staticPosition });
    throw new AbiParameters2.InvalidTypeError(param.type);
  }
  const sizeOfLength2 = 32;
  const sizeOfOffset2 = 32;
  function decodeAddress2(cursor2, options = {}) {
    const { checksum: checksum2 = false } = options;
    const value = cursor2.readBytes(32);
    const wrap2 = (address) => checksum2 ? Address2.checksum(address) : address;
    return [wrap2(Hex2.fromBytes(Bytes2.slice(value, -20))), 32];
  }
  function decodeArray2(cursor2, param, options) {
    const { checksumAddress, length, staticPosition } = options;
    if (!length) {
      const offset = Bytes2.toNumber(cursor2.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      const startOfData = start + sizeOfLength2;
      cursor2.setPosition(start);
      const length2 = Bytes2.toNumber(cursor2.readBytes(sizeOfLength2));
      const dynamicChild = hasDynamicChild2(param);
      let consumed2 = 0;
      const value2 = [];
      for (let i = 0; i < length2; ++i) {
        cursor2.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
        const [data, consumed_] = decodeParameter2(cursor2, param, {
          checksumAddress,
          staticPosition: startOfData
        });
        consumed2 += consumed_;
        value2.push(data);
      }
      cursor2.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    if (hasDynamicChild2(param)) {
      const offset = Bytes2.toNumber(cursor2.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      const value2 = [];
      for (let i = 0; i < length; ++i) {
        cursor2.setPosition(start + i * 32);
        const [data] = decodeParameter2(cursor2, param, {
          checksumAddress,
          staticPosition: start
        });
        value2.push(data);
      }
      cursor2.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    let consumed = 0;
    const value = [];
    for (let i = 0; i < length; ++i) {
      const [data, consumed_] = decodeParameter2(cursor2, param, {
        checksumAddress,
        staticPosition: staticPosition + consumed
      });
      consumed += consumed_;
      value.push(data);
    }
    return [value, consumed];
  }
  function decodeBool2(cursor2) {
    return [Bytes2.toBoolean(cursor2.readBytes(32), { size: 32 }), 32];
  }
  function decodeBytes2(cursor2, param, { staticPosition }) {
    const [_, size2] = param.type.split("bytes");
    if (!size2) {
      const offset = Bytes2.toNumber(cursor2.readBytes(32));
      cursor2.setPosition(staticPosition + offset);
      const length = Bytes2.toNumber(cursor2.readBytes(32));
      if (length === 0) {
        cursor2.setPosition(staticPosition + 32);
        return ["0x", 32];
      }
      const data = cursor2.readBytes(length);
      cursor2.setPosition(staticPosition + 32);
      return [Hex2.fromBytes(data), 32];
    }
    const value = Hex2.fromBytes(cursor2.readBytes(Number.parseInt(size2, 10), 32));
    return [value, 32];
  }
  function decodeNumber2(cursor2, param) {
    const signed = param.type.startsWith("int");
    const size2 = Number.parseInt(param.type.split("int")[1] || "256", 10);
    const value = cursor2.readBytes(32);
    return [
      size2 > 48 ? Bytes2.toBigInt(value, { signed }) : Bytes2.toNumber(value, { signed }),
      32
    ];
  }
  function decodeTuple2(cursor2, param, options) {
    const { checksumAddress, staticPosition } = options;
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild2(param)) {
      const offset = Bytes2.toNumber(cursor2.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      for (let i = 0; i < param.components.length; ++i) {
        const component = param.components[i];
        cursor2.setPosition(start + consumed);
        const [data, consumed_] = decodeParameter2(cursor2, component, {
          checksumAddress,
          staticPosition: start
        });
        consumed += consumed_;
        value[hasUnnamedChild ? i : component?.name] = data;
      }
      cursor2.setPosition(staticPosition + 32);
      return [value, 32];
    }
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      const [data, consumed_] = decodeParameter2(cursor2, component, {
        checksumAddress,
        staticPosition
      });
      value[hasUnnamedChild ? i : component?.name] = data;
      consumed += consumed_;
    }
    return [value, consumed];
  }
  function decodeString2(cursor2, { staticPosition }) {
    const offset = Bytes2.toNumber(cursor2.readBytes(32));
    const start = staticPosition + offset;
    cursor2.setPosition(start);
    const length = Bytes2.toNumber(cursor2.readBytes(32));
    if (length === 0) {
      cursor2.setPosition(staticPosition + 32);
      return ["", 32];
    }
    const data = cursor2.readBytes(length, 32);
    const value = Bytes2.toString(Bytes2.trimLeft(data));
    cursor2.setPosition(staticPosition + 32);
    return [value, 32];
  }
  function prepareParameters2({ checksumAddress, parameters, values }) {
    const preparedParameters = [];
    for (let i = 0; i < parameters.length; i++) {
      preparedParameters.push(prepareParameter2({
        checksumAddress,
        parameter: parameters[i],
        value: values[i]
      }));
    }
    return preparedParameters;
  }
  function prepareParameter2({ checksumAddress = false, parameter: parameter_, value }) {
    const parameter = parameter_;
    const arrayComponents = getArrayComponents2(parameter.type);
    if (arrayComponents) {
      const [length, type2] = arrayComponents;
      return encodeArray2(value, {
        checksumAddress,
        length,
        parameter: {
          ...parameter,
          type: type2
        }
      });
    }
    if (parameter.type === "tuple") {
      return encodeTuple2(value, {
        checksumAddress,
        parameter
      });
    }
    if (parameter.type === "address") {
      return encodeAddress2(value, {
        checksum: checksumAddress
      });
    }
    if (parameter.type === "bool") {
      return encodeBoolean2(value);
    }
    if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
      const signed = parameter.type.startsWith("int");
      const [, , size2 = "256"] = Solidity_js_1.integerRegex.exec(parameter.type) ?? [];
      return encodeNumber2(value, {
        signed,
        size: Number(size2)
      });
    }
    if (parameter.type.startsWith("bytes")) {
      return encodeBytes2(value, { type: parameter.type });
    }
    if (parameter.type === "string") {
      return encodeString2(value);
    }
    throw new AbiParameters2.InvalidTypeError(parameter.type);
  }
  function encode2(preparedParameters) {
    let staticSize = 0;
    for (let i = 0; i < preparedParameters.length; i++) {
      const { dynamic, encoded } = preparedParameters[i];
      if (dynamic)
        staticSize += 32;
      else
        staticSize += Hex2.size(encoded);
    }
    const staticParameters = [];
    const dynamicParameters = [];
    let dynamicSize = 0;
    for (let i = 0; i < preparedParameters.length; i++) {
      const { dynamic, encoded } = preparedParameters[i];
      if (dynamic) {
        staticParameters.push(Hex2.fromNumber(staticSize + dynamicSize, { size: 32 }));
        dynamicParameters.push(encoded);
        dynamicSize += Hex2.size(encoded);
      } else {
        staticParameters.push(encoded);
      }
    }
    return Hex2.concat(...staticParameters, ...dynamicParameters);
  }
  function encodeAddress2(value, options) {
    const { checksum: checksum2 = false } = options;
    Address2.assert(value, { strict: checksum2 });
    return {
      dynamic: false,
      encoded: Hex2.padLeft(value.toLowerCase())
    };
  }
  function encodeArray2(value, options) {
    const { checksumAddress, length, parameter } = options;
    const dynamic = length === null;
    if (!Array.isArray(value))
      throw new AbiParameters2.InvalidArrayError(value);
    if (!dynamic && value.length !== length)
      throw new AbiParameters2.ArrayLengthMismatchError({
        expectedLength: length,
        givenLength: value.length,
        type: `${parameter.type}[${length}]`
      });
    let dynamicChild = false;
    const preparedParameters = [];
    for (let i = 0; i < value.length; i++) {
      const preparedParam = prepareParameter2({
        checksumAddress,
        parameter,
        value: value[i]
      });
      if (preparedParam.dynamic)
        dynamicChild = true;
      preparedParameters.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
      const data = encode2(preparedParameters);
      if (dynamic) {
        const length2 = Hex2.fromNumber(preparedParameters.length, { size: 32 });
        return {
          dynamic: true,
          encoded: preparedParameters.length > 0 ? Hex2.concat(length2, data) : length2
        };
      }
      if (dynamicChild)
        return { dynamic: true, encoded: data };
    }
    return {
      dynamic: false,
      encoded: Hex2.concat(...preparedParameters.map(({ encoded }) => encoded))
    };
  }
  function encodeBytes2(value, { type: type2 }) {
    const [, parametersize] = type2.split("bytes");
    const bytesSize = Hex2.size(value);
    if (!parametersize) {
      let value_ = value;
      if (bytesSize % 32 !== 0)
        value_ = Hex2.padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
      return {
        dynamic: true,
        encoded: Hex2.concat(Hex2.padLeft(Hex2.fromNumber(bytesSize, { size: 32 })), value_)
      };
    }
    if (bytesSize !== Number.parseInt(parametersize, 10))
      throw new AbiParameters2.BytesSizeMismatchError({
        expectedSize: Number.parseInt(parametersize, 10),
        value
      });
    return { dynamic: false, encoded: Hex2.padRight(value) };
  }
  function encodeBoolean2(value) {
    if (typeof value !== "boolean")
      throw new Errors2.BaseError(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return { dynamic: false, encoded: Hex2.padLeft(Hex2.fromBoolean(value)) };
  }
  function encodeNumber2(value, { signed, size: size2 }) {
    if (typeof size2 === "number") {
      const max = 2n ** (BigInt(size2) - (signed ? 1n : 0n)) - 1n;
      const min = signed ? -max - 1n : 0n;
      if (value > max || value < min)
        throw new Hex2.IntegerOutOfRangeError({
          max: max.toString(),
          min: min.toString(),
          signed,
          size: size2 / 8,
          value: value.toString()
        });
    }
    return {
      dynamic: false,
      encoded: Hex2.fromNumber(value, {
        size: 32,
        signed
      })
    };
  }
  function encodeString2(value) {
    const hexValue = Hex2.fromString(value);
    const partsLength = Math.ceil(Hex2.size(hexValue) / 32);
    const parts = [];
    for (let i = 0; i < partsLength; i++) {
      parts.push(Hex2.padRight(Hex2.slice(hexValue, i * 32, (i + 1) * 32)));
    }
    return {
      dynamic: true,
      encoded: Hex2.concat(Hex2.padRight(Hex2.fromNumber(Hex2.size(hexValue), { size: 32 })), ...parts)
    };
  }
  function encodeTuple2(value, options) {
    const { checksumAddress, parameter } = options;
    let dynamic = false;
    const preparedParameters = [];
    for (let i = 0; i < parameter.components.length; i++) {
      const param_ = parameter.components[i];
      const index = Array.isArray(value) ? i : param_.name;
      const preparedParam = prepareParameter2({
        checksumAddress,
        parameter: param_,
        value: value[index]
      });
      preparedParameters.push(preparedParam);
      if (preparedParam.dynamic)
        dynamic = true;
    }
    return {
      dynamic,
      encoded: dynamic ? encode2(preparedParameters) : Hex2.concat(...preparedParameters.map(({ encoded }) => encoded))
    };
  }
  function getArrayComponents2(type2) {
    const matches = type2.match(/^(.*)\[(\d+)?\]$/);
    return matches ? [matches[2] ? Number(matches[2]) : null, matches[1]] : void 0;
  }
  function hasDynamicChild2(param) {
    const { type: type2 } = param;
    if (type2 === "string")
      return true;
    if (type2 === "bytes")
      return true;
    if (type2.endsWith("[]"))
      return true;
    if (type2 === "tuple")
      return param.components?.some(hasDynamicChild2);
    const arrayComponents = getArrayComponents2(param.type);
    if (arrayComponents && hasDynamicChild2({
      ...param,
      type: arrayComponents[1]
    }))
      return true;
    return false;
  }
  return abiParameters$1;
}
var cursor$1 = {};
var hasRequiredCursor$1;
function requireCursor$1() {
  if (hasRequiredCursor$1) return cursor$1;
  hasRequiredCursor$1 = 1;
  Object.defineProperty(cursor$1, "__esModule", { value: true });
  cursor$1.RecursiveReadLimitExceededError = cursor$1.PositionOutOfBoundsError = cursor$1.NegativeOffsetError = void 0;
  cursor$1.create = create2;
  const Errors2 = requireErrors$2();
  const staticCursor2 = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: /* @__PURE__ */ new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: Number.POSITIVE_INFINITY,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new RecursiveReadLimitExceededError2({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit
        });
    },
    assertPosition(position) {
      if (position < 0 || position > this.bytes.length - 1)
        throw new PositionOutOfBoundsError2({
          length: this.bytes.length,
          position
        });
    },
    decrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError2({ offset });
      const position = this.position - offset;
      this.assertPosition(position);
      this.position = position;
    },
    getReadCount(position) {
      return this.positionReadCount.get(position || this.position) || 0;
    },
    incrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError2({ offset });
      const position = this.position + offset;
      this.assertPosition(position);
      this.position = position;
    },
    inspectByte(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectBytes(length, position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + length - 1);
      return this.bytes.subarray(position, position + length);
    },
    inspectUint8(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectUint16(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 1);
      return this.dataView.getUint16(position);
    },
    inspectUint24(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 2);
      return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
    },
    inspectUint32(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 3);
      return this.dataView.getUint32(position);
    },
    pushByte(byte) {
      this.assertPosition(this.position);
      this.bytes[this.position] = byte;
      this.position++;
    },
    pushBytes(bytes2) {
      this.assertPosition(this.position + bytes2.length - 1);
      this.bytes.set(bytes2, this.position);
      this.position += bytes2.length;
    },
    pushUint8(value) {
      this.assertPosition(this.position);
      this.bytes[this.position] = value;
      this.position++;
    },
    pushUint16(value) {
      this.assertPosition(this.position + 1);
      this.dataView.setUint16(this.position, value);
      this.position += 2;
    },
    pushUint24(value) {
      this.assertPosition(this.position + 2);
      this.dataView.setUint16(this.position, value >> 8);
      this.dataView.setUint8(this.position + 2, value & 255);
      this.position += 3;
    },
    pushUint32(value) {
      this.assertPosition(this.position + 3);
      this.dataView.setUint32(this.position, value);
      this.position += 4;
    },
    readByte() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectByte();
      this.position++;
      return value;
    },
    readBytes(length, size2) {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectBytes(length);
      this.position += size2 ?? length;
      return value;
    },
    readUint8() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint8();
      this.position += 1;
      return value;
    },
    readUint16() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint16();
      this.position += 2;
      return value;
    },
    readUint24() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint24();
      this.position += 3;
      return value;
    },
    readUint32() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint32();
      this.position += 4;
      return value;
    },
    get remaining() {
      return this.bytes.length - this.position;
    },
    setPosition(position) {
      const oldPosition = this.position;
      this.assertPosition(position);
      this.position = position;
      return () => this.position = oldPosition;
    },
    _touch() {
      if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
        return;
      const count = this.getReadCount();
      this.positionReadCount.set(this.position, count + 1);
      if (count > 0)
        this.recursiveReadCount++;
    }
  };
  function create2(bytes2, { recursiveReadLimit = 8192 } = {}) {
    const cursor2 = Object.create(staticCursor2);
    cursor2.bytes = bytes2;
    cursor2.dataView = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
    cursor2.positionReadCount = /* @__PURE__ */ new Map();
    cursor2.recursiveReadLimit = recursiveReadLimit;
    return cursor2;
  }
  class NegativeOffsetError2 extends Errors2.BaseError {
    constructor({ offset }) {
      super(`Offset \`${offset}\` cannot be negative.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.NegativeOffsetError"
      });
    }
  }
  cursor$1.NegativeOffsetError = NegativeOffsetError2;
  class PositionOutOfBoundsError2 extends Errors2.BaseError {
    constructor({ length, position }) {
      super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.PositionOutOfBoundsError"
      });
    }
  }
  cursor$1.PositionOutOfBoundsError = PositionOutOfBoundsError2;
  class RecursiveReadLimitExceededError2 extends Errors2.BaseError {
    constructor({ count, limit }) {
      super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.RecursiveReadLimitExceededError"
      });
    }
  }
  cursor$1.RecursiveReadLimitExceededError = RecursiveReadLimitExceededError2;
  return cursor$1;
}
var hasRequiredAbiParameters$2;
function requireAbiParameters$2() {
  if (hasRequiredAbiParameters$2) return AbiParameters$1;
  hasRequiredAbiParameters$2 = 1;
  Object.defineProperty(AbiParameters$1, "__esModule", { value: true });
  AbiParameters$1.InvalidTypeError = AbiParameters$1.InvalidArrayError = AbiParameters$1.LengthMismatchError = AbiParameters$1.BytesSizeMismatchError = AbiParameters$1.ArrayLengthMismatchError = AbiParameters$1.ZeroDataError = AbiParameters$1.DataSizeTooSmallError = void 0;
  AbiParameters$1.decode = decode2;
  AbiParameters$1.encode = encode2;
  AbiParameters$1.encodePacked = encodePacked2;
  AbiParameters$1.format = format2;
  AbiParameters$1.from = from2;
  const abitype = /* @__PURE__ */ requireExports();
  const Address2 = requireAddress$1();
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const Hex2 = requireHex$2();
  const internal = requireAbiParameters$3();
  const Cursor = requireCursor$1();
  const Solidity2 = requireSolidity$1();
  function decode2(parameters, data, options = {}) {
    const { as = "Array", checksumAddress = false } = options;
    const bytes2 = typeof data === "string" ? Bytes2.fromHex(data) : data;
    const cursor2 = Cursor.create(bytes2);
    if (Bytes2.size(bytes2) === 0 && parameters.length > 0)
      throw new ZeroDataError2();
    if (Bytes2.size(bytes2) && Bytes2.size(bytes2) < 32)
      throw new DataSizeTooSmallError2({
        data: typeof data === "string" ? data : Hex2.fromBytes(data),
        parameters,
        size: Bytes2.size(bytes2)
      });
    let consumed = 0;
    const values = as === "Array" ? [] : {};
    for (let i = 0; i < parameters.length; ++i) {
      const param = parameters[i];
      cursor2.setPosition(consumed);
      const [data2, consumed_] = internal.decodeParameter(cursor2, param, {
        checksumAddress,
        staticPosition: 0
      });
      consumed += consumed_;
      if (as === "Array")
        values.push(data2);
      else
        values[param.name ?? i] = data2;
    }
    return values;
  }
  function encode2(parameters, values, options) {
    const { checksumAddress = false } = options ?? {};
    if (parameters.length !== values.length)
      throw new LengthMismatchError2({
        expectedLength: parameters.length,
        givenLength: values.length
      });
    const preparedParameters = internal.prepareParameters({
      checksumAddress,
      parameters,
      values
    });
    const data = internal.encode(preparedParameters);
    if (data.length === 0)
      return "0x";
    return data;
  }
  function encodePacked2(types, values) {
    if (types.length !== values.length)
      throw new LengthMismatchError2({
        expectedLength: types.length,
        givenLength: values.length
      });
    const data = [];
    for (let i = 0; i < types.length; i++) {
      const type2 = types[i];
      const value = values[i];
      data.push(encodePacked2.encode(type2, value));
    }
    return Hex2.concat(...data);
  }
  (function(encodePacked3) {
    function encode3(type2, value, isArray = false) {
      if (type2 === "address") {
        const address = value;
        Address2.assert(address);
        return Hex2.padLeft(address.toLowerCase(), isArray ? 32 : 0);
      }
      if (type2 === "string")
        return Hex2.fromString(value);
      if (type2 === "bytes")
        return value;
      if (type2 === "bool")
        return Hex2.padLeft(Hex2.fromBoolean(value), isArray ? 32 : 1);
      const intMatch = type2.match(Solidity2.integerRegex);
      if (intMatch) {
        const [_type, baseType, bits = "256"] = intMatch;
        const size2 = Number.parseInt(bits, 10) / 8;
        return Hex2.fromNumber(value, {
          size: isArray ? 32 : size2,
          signed: baseType === "int"
        });
      }
      const bytesMatch = type2.match(Solidity2.bytesRegex);
      if (bytesMatch) {
        const [_type, size2] = bytesMatch;
        if (Number.parseInt(size2, 10) !== (value.length - 2) / 2)
          throw new BytesSizeMismatchError2({
            expectedSize: Number.parseInt(size2, 10),
            value
          });
        return Hex2.padRight(value, isArray ? 32 : 0);
      }
      const arrayMatch = type2.match(Solidity2.arrayRegex);
      if (arrayMatch && Array.isArray(value)) {
        const [_type, childType] = arrayMatch;
        const data = [];
        for (let i = 0; i < value.length; i++) {
          data.push(encode3(childType, value[i], true));
        }
        if (data.length === 0)
          return "0x";
        return Hex2.concat(...data);
      }
      throw new InvalidTypeError2(type2);
    }
    encodePacked3.encode = encode3;
  })(encodePacked2 || (AbiParameters$1.encodePacked = encodePacked2 = {}));
  function format2(parameters) {
    return abitype.formatAbiParameters(parameters);
  }
  function from2(parameters) {
    if (Array.isArray(parameters) && typeof parameters[0] === "string")
      return abitype.parseAbiParameters(parameters);
    if (typeof parameters === "string")
      return abitype.parseAbiParameters(parameters);
    return parameters;
  }
  class DataSizeTooSmallError2 extends Errors2.BaseError {
    constructor({ data, parameters, size: size2 }) {
      super(`Data size of ${size2} bytes is too small for given parameters.`, {
        metaMessages: [
          `Params: (${abitype.formatAbiParameters(parameters)})`,
          `Data:   ${data} (${size2} bytes)`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.DataSizeTooSmallError"
      });
    }
  }
  AbiParameters$1.DataSizeTooSmallError = DataSizeTooSmallError2;
  class ZeroDataError2 extends Errors2.BaseError {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.');
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.ZeroDataError"
      });
    }
  }
  AbiParameters$1.ZeroDataError = ZeroDataError2;
  class ArrayLengthMismatchError2 extends Errors2.BaseError {
    constructor({ expectedLength, givenLength, type: type2 }) {
      super(`Array length mismatch for type \`${type2}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.ArrayLengthMismatchError"
      });
    }
  }
  AbiParameters$1.ArrayLengthMismatchError = ArrayLengthMismatchError2;
  class BytesSizeMismatchError2 extends Errors2.BaseError {
    constructor({ expectedSize, value }) {
      super(`Size of bytes "${value}" (bytes${Hex2.size(value)}) does not match expected size (bytes${expectedSize}).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.BytesSizeMismatchError"
      });
    }
  }
  AbiParameters$1.BytesSizeMismatchError = BytesSizeMismatchError2;
  class LengthMismatchError2 extends Errors2.BaseError {
    constructor({ expectedLength, givenLength }) {
      super([
        "ABI encoding parameters/values length mismatch.",
        `Expected length (parameters): ${expectedLength}`,
        `Given length (values): ${givenLength}`
      ].join("\n"));
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.LengthMismatchError"
      });
    }
  }
  AbiParameters$1.LengthMismatchError = LengthMismatchError2;
  class InvalidArrayError2 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${value}\` is not a valid array.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.InvalidArrayError"
      });
    }
  }
  AbiParameters$1.InvalidArrayError = InvalidArrayError2;
  class InvalidTypeError2 extends Errors2.BaseError {
    constructor(type2) {
      super(`Type \`${type2}\` is not a valid ABI Type.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.InvalidTypeError"
      });
    }
  }
  AbiParameters$1.InvalidTypeError = InvalidTypeError2;
  return AbiParameters$1;
}
var hasRequiredAbiConstructor$1;
function requireAbiConstructor$1() {
  if (hasRequiredAbiConstructor$1) return AbiConstructor$1;
  hasRequiredAbiConstructor$1 = 1;
  Object.defineProperty(AbiConstructor$1, "__esModule", { value: true });
  AbiConstructor$1.decode = decode2;
  AbiConstructor$1.encode = encode2;
  AbiConstructor$1.format = format2;
  AbiConstructor$1.from = from2;
  AbiConstructor$1.fromAbi = fromAbi2;
  const abitype = /* @__PURE__ */ requireExports();
  const AbiItem2 = requireAbiItem$2();
  const AbiParameters2 = requireAbiParameters$2();
  const Hex2 = requireHex$2();
  function decode2(abiConstructor, options) {
    const { bytecode } = options;
    if (abiConstructor.inputs.length === 0)
      return void 0;
    const data = options.data.replace(bytecode, "0x");
    return AbiParameters2.decode(abiConstructor.inputs, data);
  }
  function encode2(abiConstructor, options) {
    const { bytecode, args } = options;
    return Hex2.concat(bytecode, abiConstructor.inputs?.length && args?.length ? AbiParameters2.encode(abiConstructor.inputs, args) : "0x");
  }
  function format2(abiConstructor) {
    return abitype.formatAbiItem(abiConstructor);
  }
  function from2(abiConstructor) {
    return AbiItem2.from(abiConstructor);
  }
  function fromAbi2(abi2) {
    const item = abi2.find((item2) => item2.type === "constructor");
    if (!item)
      throw new AbiItem2.NotFoundError({ name: "constructor" });
    return item;
  }
  return AbiConstructor$1;
}
var AbiError = {};
var hasRequiredAbiError;
function requireAbiError() {
  if (hasRequiredAbiError) return AbiError;
  hasRequiredAbiError = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.solidityPanicSelector = exports.solidityPanic = exports.solidityErrorSelector = exports.solidityError = exports.panicReasons = void 0;
    exports.decode = decode2;
    exports.encode = encode2;
    exports.format = format2;
    exports.from = from2;
    exports.fromAbi = fromAbi2;
    exports.getSelector = getSelector2;
    const abitype = /* @__PURE__ */ requireExports();
    const AbiItem2 = requireAbiItem$2();
    const AbiParameters2 = requireAbiParameters$2();
    const Hex2 = requireHex$2();
    function decode2(abiError, data, options = {}) {
      if (Hex2.size(data) < 4)
        throw new AbiItem2.InvalidSelectorSizeError({ data });
      if (abiError.inputs.length === 0)
        return void 0;
      const values = AbiParameters2.decode(abiError.inputs, Hex2.slice(data, 4), options);
      if (values && Object.keys(values).length === 1) {
        if (Array.isArray(values))
          return values[0];
        return Object.values(values)[0];
      }
      return values;
    }
    function encode2(abiError, ...args) {
      const selector = getSelector2(abiError);
      const data = args.length > 0 ? AbiParameters2.encode(abiError.inputs, args[0]) : void 0;
      return data ? Hex2.concat(selector, data) : selector;
    }
    function format2(abiError) {
      return abitype.formatAbiItem(abiError);
    }
    function from2(abiError, options = {}) {
      return AbiItem2.from(abiError, options);
    }
    function fromAbi2(abi2, name, options) {
      if (name === "Error")
        return exports.solidityError;
      if (name === "Panic")
        return exports.solidityPanic;
      if (Hex2.validate(name, { strict: false })) {
        const selector = Hex2.slice(name, 0, 4);
        if (selector === exports.solidityErrorSelector)
          return exports.solidityError;
        if (selector === exports.solidityPanicSelector)
          return exports.solidityPanic;
      }
      const item = AbiItem2.fromAbi(abi2, name, options);
      if (item.type !== "error")
        throw new AbiItem2.NotFoundError({ name, type: "error" });
      return item;
    }
    function getSelector2(abiItem2) {
      return AbiItem2.getSelector(abiItem2);
    }
    exports.panicReasons = {
      1: "An `assert` condition failed.",
      17: "Arithmetic operation resulted in underflow or overflow.",
      18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
      33: "Attempted to convert to an invalid type.",
      34: "Attempted to access a storage byte array that is incorrectly encoded.",
      49: "Performed `.pop()` on an empty array",
      50: "Array index is out of bounds.",
      65: "Allocated too much memory or created an array which is too large.",
      81: "Attempted to call a zero-initialized variable of internal function type."
    };
    exports.solidityError = from2({
      inputs: [
        {
          name: "message",
          type: "string"
        }
      ],
      name: "Error",
      type: "error"
    });
    exports.solidityErrorSelector = "0x08c379a0";
    exports.solidityPanic = from2({
      inputs: [
        {
          name: "reason",
          type: "uint8"
        }
      ],
      name: "Panic",
      type: "error"
    });
    exports.solidityPanicSelector = "0x4e487b71";
  })(AbiError);
  return AbiError;
}
var AbiEvent = {};
var hasRequiredAbiEvent;
function requireAbiEvent() {
  if (hasRequiredAbiEvent) return AbiEvent;
  hasRequiredAbiEvent = 1;
  Object.defineProperty(AbiEvent, "__esModule", { value: true });
  AbiEvent.FilterTypeNotSupportedError = AbiEvent.SelectorTopicMismatchError = AbiEvent.TopicsMismatchError = AbiEvent.DataMismatchError = AbiEvent.InputNotFoundError = AbiEvent.ArgsMismatchError = void 0;
  AbiEvent.assertArgs = assertArgs;
  AbiEvent.decode = decode2;
  AbiEvent.encode = encode2;
  AbiEvent.format = format2;
  AbiEvent.from = from2;
  AbiEvent.fromAbi = fromAbi2;
  AbiEvent.getSelector = getSelector2;
  const abitype = /* @__PURE__ */ requireExports();
  const AbiItem2 = requireAbiItem$2();
  const AbiParameters2 = requireAbiParameters$2();
  const Address2 = requireAddress$1();
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  const Cursor = requireCursor$1();
  const errors_js_1 = requireErrors$3();
  function assertArgs(abiEvent, args, matchArgs) {
    if (!args || !matchArgs)
      throw new ArgsMismatchError({
        abiEvent,
        expected: args,
        given: matchArgs
      });
    function isEqual2(input, value, arg) {
      if (input.type === "address")
        return Address2.isEqual(value, arg);
      if (input.type === "string")
        return Hash2.keccak256(Bytes2.fromString(value)) === arg;
      if (input.type === "bytes")
        return Hash2.keccak256(value) === arg;
      return value === arg;
    }
    if (Array.isArray(args) && Array.isArray(matchArgs)) {
      for (const [index, value] of matchArgs.entries()) {
        if (value === null || value === void 0)
          continue;
        const input = abiEvent.inputs[index];
        if (!input)
          throw new InputNotFoundError({
            abiEvent,
            name: `${index}`
          });
        const value_ = Array.isArray(value) ? value : [value];
        let equal = false;
        for (const value2 of value_) {
          if (isEqual2(input, value2, args[index]))
            equal = true;
        }
        if (!equal)
          throw new ArgsMismatchError({
            abiEvent,
            expected: args,
            given: matchArgs
          });
      }
    }
    if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs))
      for (const [key, value] of Object.entries(matchArgs)) {
        if (value === null || value === void 0)
          continue;
        const input = abiEvent.inputs.find((input2) => input2.name === key);
        if (!input)
          throw new InputNotFoundError({ abiEvent, name: key });
        const value_ = Array.isArray(value) ? value : [value];
        let equal = false;
        for (const value2 of value_) {
          if (isEqual2(input, value2, args[key]))
            equal = true;
        }
        if (!equal)
          throw new ArgsMismatchError({
            abiEvent,
            expected: args,
            given: matchArgs
          });
      }
  }
  function decode2(abiEvent, log) {
    const { data, topics } = log;
    const [selector_, ...argTopics] = topics;
    const selector = getSelector2(abiEvent);
    if (selector_ !== selector)
      throw new SelectorTopicMismatchError({
        abiEvent,
        actual: selector_,
        expected: selector
      });
    const { inputs } = abiEvent;
    const isUnnamed = inputs?.every((x) => !("name" in x && x.name));
    let args = isUnnamed ? [] : {};
    const indexedInputs = inputs.filter((x) => "indexed" in x && x.indexed);
    for (let i = 0; i < indexedInputs.length; i++) {
      const param = indexedInputs[i];
      const topic = argTopics[i];
      if (!topic)
        throw new TopicsMismatchError({
          abiEvent,
          param
        });
      args[isUnnamed ? i : param.name || i] = (() => {
        if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
          return topic;
        const decoded = AbiParameters2.decode([param], topic) || [];
        return decoded[0];
      })();
    }
    const nonIndexedInputs = inputs.filter((x) => !("indexed" in x && x.indexed));
    if (nonIndexedInputs.length > 0) {
      if (data && data !== "0x") {
        try {
          const decodedData = AbiParameters2.decode(nonIndexedInputs, data);
          if (decodedData) {
            if (isUnnamed)
              args = [...args, ...decodedData];
            else {
              for (let i = 0; i < nonIndexedInputs.length; i++) {
                const index = inputs.indexOf(nonIndexedInputs[i]);
                args[nonIndexedInputs[i].name || index] = decodedData[i];
              }
            }
          }
        } catch (err) {
          if (err instanceof AbiParameters2.DataSizeTooSmallError || err instanceof Cursor.PositionOutOfBoundsError)
            throw new DataMismatchError({
              abiEvent,
              data,
              parameters: nonIndexedInputs,
              size: Hex2.size(data)
            });
          throw err;
        }
      } else {
        throw new DataMismatchError({
          abiEvent,
          data: "0x",
          parameters: nonIndexedInputs,
          size: 0
        });
      }
    }
    return Object.values(args).length > 0 ? args : void 0;
  }
  function encode2(abiEvent, ...[args]) {
    let topics = [];
    if (args && abiEvent.inputs) {
      const indexedInputs = abiEvent.inputs.filter((param) => "indexed" in param && param.indexed);
      const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x, i) => args[x.name ?? i]) ?? [] : [];
      if (args_.length > 0) {
        const encode3 = (param, value) => {
          if (param.type === "string")
            return Hash2.keccak256(Hex2.fromString(value));
          if (param.type === "bytes")
            return Hash2.keccak256(value);
          if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
            throw new FilterTypeNotSupportedError(param.type);
          return AbiParameters2.encode([param], [value]);
        };
        topics = indexedInputs?.map((param, i) => {
          if (Array.isArray(args_[i]))
            return args_[i].map((_, j) => encode3(param, args_[i][j]));
          return typeof args_[i] !== "undefined" && args_[i] !== null ? encode3(param, args_[i]) : null;
        }) ?? [];
      }
    }
    const selector = (() => {
      if (abiEvent.hash)
        return abiEvent.hash;
      return getSelector2(abiEvent);
    })();
    return { topics: [selector, ...topics] };
  }
  function format2(abiEvent) {
    return abitype.formatAbiItem(abiEvent);
  }
  function from2(abiEvent, options = {}) {
    return AbiItem2.from(abiEvent, options);
  }
  function fromAbi2(abi2, name, options) {
    const item = AbiItem2.fromAbi(abi2, name, options);
    if (item.type !== "event")
      throw new AbiItem2.NotFoundError({ name, type: "event" });
    return item;
  }
  function getSelector2(abiItem2) {
    return AbiItem2.getSignatureHash(abiItem2);
  }
  class ArgsMismatchError extends Errors2.BaseError {
    constructor({ abiEvent, expected, given }) {
      super("Given arguments do not match the expected arguments.", {
        metaMessages: [
          `Event: ${format2(abiEvent)}`,
          `Expected Arguments: ${!expected ? "None" : ""}`,
          expected ? (0, errors_js_1.prettyPrint)(expected) : void 0,
          `Given Arguments: ${!given ? "None" : ""}`,
          given ? (0, errors_js_1.prettyPrint)(given) : void 0
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiEvent.ArgsMismatchError"
      });
    }
  }
  AbiEvent.ArgsMismatchError = ArgsMismatchError;
  class InputNotFoundError extends Errors2.BaseError {
    constructor({ abiEvent, name }) {
      super(`Parameter "${name}" not found on \`${format2(abiEvent)}\`.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiEvent.InputNotFoundError"
      });
    }
  }
  AbiEvent.InputNotFoundError = InputNotFoundError;
  class DataMismatchError extends Errors2.BaseError {
    constructor({ abiEvent, data, parameters, size: size2 }) {
      super([
        `Data size of ${size2} bytes is too small for non-indexed event parameters.`
      ].join("\n"), {
        metaMessages: [
          `Non-indexed Parameters: (${AbiParameters2.format(parameters)})`,
          `Data:   ${data} (${size2} bytes)`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiEvent.DataMismatchError"
      });
      Object.defineProperty(this, "abiEvent", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "data", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "parameters", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "size", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.abiEvent = abiEvent;
      this.data = data;
      this.parameters = parameters;
      this.size = size2;
    }
  }
  AbiEvent.DataMismatchError = DataMismatchError;
  class TopicsMismatchError extends Errors2.BaseError {
    constructor({ abiEvent, param }) {
      super([
        `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} for "${format2(abiEvent)}".`
      ].join("\n"));
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiEvent.TopicsMismatchError"
      });
      Object.defineProperty(this, "abiEvent", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.abiEvent = abiEvent;
    }
  }
  AbiEvent.TopicsMismatchError = TopicsMismatchError;
  class SelectorTopicMismatchError extends Errors2.BaseError {
    constructor({ abiEvent, actual, expected }) {
      super(`topics[0]="${actual}" does not match the expected topics[0]="${expected}".`, {
        metaMessages: [`Event: ${format2(abiEvent)}`, `Selector: ${expected}`]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiEvent.SelectorTopicMismatchError"
      });
    }
  }
  AbiEvent.SelectorTopicMismatchError = SelectorTopicMismatchError;
  class FilterTypeNotSupportedError extends Errors2.BaseError {
    constructor(type2) {
      super(`Filter type "${type2}" is not supported.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiEvent.FilterTypeNotSupportedError"
      });
    }
  }
  AbiEvent.FilterTypeNotSupportedError = FilterTypeNotSupportedError;
  return AbiEvent;
}
var AbiFunction$1 = {};
var hasRequiredAbiFunction$1;
function requireAbiFunction$1() {
  if (hasRequiredAbiFunction$1) return AbiFunction$1;
  hasRequiredAbiFunction$1 = 1;
  Object.defineProperty(AbiFunction$1, "__esModule", { value: true });
  AbiFunction$1.decodeData = decodeData;
  AbiFunction$1.decodeResult = decodeResult;
  AbiFunction$1.encodeData = encodeData2;
  AbiFunction$1.encodeResult = encodeResult;
  AbiFunction$1.format = format2;
  AbiFunction$1.from = from2;
  AbiFunction$1.fromAbi = fromAbi2;
  AbiFunction$1.getSelector = getSelector2;
  const abitype = /* @__PURE__ */ requireExports();
  const AbiItem2 = requireAbiItem$2();
  const AbiParameters2 = requireAbiParameters$2();
  const Hex2 = requireHex$2();
  function decodeData(abiFunction, data) {
    const { overloads } = abiFunction;
    if (Hex2.size(data) < 4)
      throw new AbiItem2.InvalidSelectorSizeError({ data });
    if (abiFunction.inputs.length === 0)
      return void 0;
    const item = overloads ? fromAbi2([abiFunction, ...overloads], data) : abiFunction;
    if (Hex2.size(data) <= 4)
      return void 0;
    return AbiParameters2.decode(item.inputs, Hex2.slice(data, 4));
  }
  function decodeResult(abiFunction, data, options = {}) {
    const values = AbiParameters2.decode(abiFunction.outputs, data, options);
    if (values && Object.keys(values).length === 0)
      return void 0;
    if (values && Object.keys(values).length === 1) {
      if (Array.isArray(values))
        return values[0];
      return Object.values(values)[0];
    }
    return values;
  }
  function encodeData2(abiFunction, ...args) {
    const { overloads } = abiFunction;
    const item = overloads ? fromAbi2([abiFunction, ...overloads], abiFunction.name, {
      args: args[0]
    }) : abiFunction;
    const selector = getSelector2(item);
    const data = args.length > 0 ? AbiParameters2.encode(item.inputs, args[0]) : void 0;
    return data ? Hex2.concat(selector, data) : selector;
  }
  function encodeResult(abiFunction, output, options = {}) {
    const { as = "Array" } = options;
    const values = (() => {
      if (abiFunction.outputs.length === 1)
        return [output];
      if (Array.isArray(output))
        return output;
      if (as === "Object")
        return Object.values(output);
      return [output];
    })();
    return AbiParameters2.encode(abiFunction.outputs, values);
  }
  function format2(abiFunction) {
    return abitype.formatAbiItem(abiFunction);
  }
  function from2(abiFunction, options = {}) {
    return AbiItem2.from(abiFunction, options);
  }
  function fromAbi2(abi2, name, options) {
    const item = AbiItem2.fromAbi(abi2, name, options);
    if (item.type !== "function")
      throw new AbiItem2.NotFoundError({ name, type: "function" });
    return item;
  }
  function getSelector2(abiItem2) {
    return AbiItem2.getSelector(abiItem2);
  }
  return AbiFunction$1;
}
var AccessList = {};
var hasRequiredAccessList;
function requireAccessList() {
  if (hasRequiredAccessList) return AccessList;
  hasRequiredAccessList = 1;
  Object.defineProperty(AccessList, "__esModule", { value: true });
  AccessList.InvalidStorageKeySizeError = void 0;
  AccessList.fromTupleList = fromTupleList2;
  AccessList.toTupleList = toTupleList2;
  const Address2 = requireAddress$1();
  const Errors2 = requireErrors$2();
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  function fromTupleList2(accessList) {
    const list = [];
    for (let i = 0; i < accessList.length; i++) {
      const [address, storageKeys] = accessList[i];
      if (address)
        Address2.assert(address, { strict: false });
      list.push({
        address,
        storageKeys: storageKeys.map((key) => Hash2.validate(key) ? key : Hex2.trimLeft(key))
      });
    }
    return list;
  }
  function toTupleList2(accessList) {
    if (!accessList || accessList.length === 0)
      return [];
    const tuple = [];
    for (const { address, storageKeys } of accessList) {
      for (let j = 0; j < storageKeys.length; j++)
        if (Hex2.size(storageKeys[j]) !== 32)
          throw new InvalidStorageKeySizeError2({
            storageKey: storageKeys[j]
          });
      if (address)
        Address2.assert(address, { strict: false });
      tuple.push([address, storageKeys]);
    }
    return tuple;
  }
  class InvalidStorageKeySizeError2 extends Errors2.BaseError {
    constructor({ storageKey }) {
      super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Hex2.size(storageKey)} bytes.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AccessList.InvalidStorageKeySizeError"
      });
    }
  }
  AccessList.InvalidStorageKeySizeError = InvalidStorageKeySizeError2;
  return AccessList;
}
var AccountProof = {};
var hasRequiredAccountProof;
function requireAccountProof() {
  if (hasRequiredAccountProof) return AccountProof;
  hasRequiredAccountProof = 1;
  Object.defineProperty(AccountProof, "__esModule", { value: true });
  return AccountProof;
}
var AesGcm = {};
var hasRequiredAesGcm;
function requireAesGcm() {
  if (hasRequiredAesGcm) return AesGcm;
  hasRequiredAesGcm = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ivLength = void 0;
    exports.decrypt = decrypt;
    exports.encrypt = encrypt;
    exports.getKey = getKey;
    exports.randomSalt = randomSalt;
    const Bytes2 = requireBytes$2();
    const Hex2 = requireHex$2();
    exports.ivLength = 16;
    async function decrypt(value, key, options = {}) {
      const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
      const encrypted = Bytes2.from(value);
      const iv = encrypted.slice(0, exports.ivLength);
      const data = encrypted.slice(exports.ivLength);
      const decrypted = await globalThis.crypto.subtle.decrypt({
        name: "AES-GCM",
        iv
      }, key, Bytes2.from(data));
      const result = new Uint8Array(decrypted);
      if (as === "Bytes")
        return result;
      return Hex2.from(result);
    }
    async function encrypt(value, key, options = {}) {
      const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
      const iv = Bytes2.random(exports.ivLength);
      const encrypted = await globalThis.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv
      }, key, Bytes2.from(value));
      const result = Bytes2.concat(iv, new Uint8Array(encrypted));
      if (as === "Bytes")
        return result;
      return Hex2.from(result);
    }
    async function getKey(options) {
      const { iterations = 9e5, password, salt = randomSalt(32) } = options;
      const baseKey = await globalThis.crypto.subtle.importKey("raw", Bytes2.fromString(password), { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);
      const key = await globalThis.crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt,
        iterations,
        hash: "SHA-256"
      }, baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
      return key;
    }
    function randomSalt(size2 = 32) {
      return Bytes2.random(size2);
    }
  })(AesGcm);
  return AesGcm;
}
var Authorization$1 = {};
var Rlp$1 = {};
var hasRequiredRlp$1;
function requireRlp$1() {
  if (hasRequiredRlp$1) return Rlp$1;
  hasRequiredRlp$1 = 1;
  Object.defineProperty(Rlp$1, "__esModule", { value: true });
  Rlp$1.toBytes = toBytes2;
  Rlp$1.toHex = toHex2;
  Rlp$1.to = to2;
  Rlp$1.decodeRlpCursor = decodeRlpCursor2;
  Rlp$1.readLength = readLength2;
  Rlp$1.readList = readList2;
  Rlp$1.from = from2;
  Rlp$1.fromBytes = fromBytes2;
  Rlp$1.fromHex = fromHex2;
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const Hex2 = requireHex$2();
  const Cursor = requireCursor$1();
  function toBytes2(value) {
    return to2(value, "Bytes");
  }
  function toHex2(value) {
    return to2(value, "Hex");
  }
  function to2(value, to3) {
    const to_ = to3 ?? (typeof value === "string" ? "Hex" : "Bytes");
    const bytes2 = (() => {
      if (typeof value === "string") {
        if (value.length > 3 && value.length % 2 !== 0)
          throw new Hex2.InvalidLengthError(value);
        return Bytes2.fromHex(value);
      }
      return value;
    })();
    const cursor2 = Cursor.create(bytes2, {
      recursiveReadLimit: Number.POSITIVE_INFINITY
    });
    const result = decodeRlpCursor2(cursor2, to_);
    return result;
  }
  function decodeRlpCursor2(cursor2, to3 = "Hex") {
    if (cursor2.bytes.length === 0)
      return to3 === "Hex" ? Hex2.fromBytes(cursor2.bytes) : cursor2.bytes;
    const prefix = cursor2.readByte();
    if (prefix < 128)
      cursor2.decrementPosition(1);
    if (prefix < 192) {
      const length2 = readLength2(cursor2, prefix, 128);
      const bytes2 = cursor2.readBytes(length2);
      return to3 === "Hex" ? Hex2.fromBytes(bytes2) : bytes2;
    }
    const length = readLength2(cursor2, prefix, 192);
    return readList2(cursor2, length, to3);
  }
  function readLength2(cursor2, prefix, offset) {
    if (offset === 128 && prefix < 128)
      return 1;
    if (prefix <= offset + 55)
      return prefix - offset;
    if (prefix === offset + 55 + 1)
      return cursor2.readUint8();
    if (prefix === offset + 55 + 2)
      return cursor2.readUint16();
    if (prefix === offset + 55 + 3)
      return cursor2.readUint24();
    if (prefix === offset + 55 + 4)
      return cursor2.readUint32();
    throw new Errors2.BaseError("Invalid RLP prefix");
  }
  function readList2(cursor2, length, to3) {
    const position = cursor2.position;
    const value = [];
    while (cursor2.position - position < length)
      value.push(decodeRlpCursor2(cursor2, to3));
    return value;
  }
  function from2(value, options) {
    const { as } = options;
    const encodable = getEncodable2(value);
    const cursor2 = Cursor.create(new Uint8Array(encodable.length));
    encodable.encode(cursor2);
    if (as === "Hex")
      return Hex2.fromBytes(cursor2.bytes);
    return cursor2.bytes;
  }
  function fromBytes2(bytes2, options = {}) {
    const { as = "Bytes" } = options;
    return from2(bytes2, { as });
  }
  function fromHex2(hex2, options = {}) {
    const { as = "Hex" } = options;
    return from2(hex2, { as });
  }
  function getEncodable2(bytes2) {
    if (Array.isArray(bytes2))
      return getEncodableList2(bytes2.map((x) => getEncodable2(x)));
    return getEncodableBytes2(bytes2);
  }
  function getEncodableList2(list) {
    const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
    const sizeOfBodyLength = getSizeOfLength2(bodyLength);
    const length = (() => {
      if (bodyLength <= 55)
        return 1 + bodyLength;
      return 1 + sizeOfBodyLength + bodyLength;
    })();
    return {
      length,
      encode(cursor2) {
        if (bodyLength <= 55) {
          cursor2.pushByte(192 + bodyLength);
        } else {
          cursor2.pushByte(192 + 55 + sizeOfBodyLength);
          if (sizeOfBodyLength === 1)
            cursor2.pushUint8(bodyLength);
          else if (sizeOfBodyLength === 2)
            cursor2.pushUint16(bodyLength);
          else if (sizeOfBodyLength === 3)
            cursor2.pushUint24(bodyLength);
          else
            cursor2.pushUint32(bodyLength);
        }
        for (const { encode: encode2 } of list) {
          encode2(cursor2);
        }
      }
    };
  }
  function getEncodableBytes2(bytesOrHex) {
    const bytes2 = typeof bytesOrHex === "string" ? Bytes2.fromHex(bytesOrHex) : bytesOrHex;
    const sizeOfBytesLength = getSizeOfLength2(bytes2.length);
    const length = (() => {
      if (bytes2.length === 1 && bytes2[0] < 128)
        return 1;
      if (bytes2.length <= 55)
        return 1 + bytes2.length;
      return 1 + sizeOfBytesLength + bytes2.length;
    })();
    return {
      length,
      encode(cursor2) {
        if (bytes2.length === 1 && bytes2[0] < 128) {
          cursor2.pushBytes(bytes2);
        } else if (bytes2.length <= 55) {
          cursor2.pushByte(128 + bytes2.length);
          cursor2.pushBytes(bytes2);
        } else {
          cursor2.pushByte(128 + 55 + sizeOfBytesLength);
          if (sizeOfBytesLength === 1)
            cursor2.pushUint8(bytes2.length);
          else if (sizeOfBytesLength === 2)
            cursor2.pushUint16(bytes2.length);
          else if (sizeOfBytesLength === 3)
            cursor2.pushUint24(bytes2.length);
          else
            cursor2.pushUint32(bytes2.length);
          cursor2.pushBytes(bytes2);
        }
      }
    };
  }
  function getSizeOfLength2(length) {
    if (length < 2 ** 8)
      return 1;
    if (length < 2 ** 16)
      return 2;
    if (length < 2 ** 24)
      return 3;
    if (length < 2 ** 32)
      return 4;
    throw new Errors2.BaseError("Length is too large.");
  }
  return Rlp$1;
}
var Signature$1 = {};
var hasRequiredSignature$1;
function requireSignature$1() {
  if (hasRequiredSignature$1) return Signature$1;
  hasRequiredSignature$1 = 1;
  Object.defineProperty(Signature$1, "__esModule", { value: true });
  Signature$1.InvalidVError = Signature$1.InvalidYParityError = Signature$1.InvalidSError = Signature$1.InvalidRError = Signature$1.MissingPropertiesError = Signature$1.InvalidSerializedSizeError = void 0;
  Signature$1.assert = assert2;
  Signature$1.fromBytes = fromBytes2;
  Signature$1.fromHex = fromHex2;
  Signature$1.extract = extract2;
  Signature$1.from = from2;
  Signature$1.fromDerBytes = fromDerBytes;
  Signature$1.fromDerHex = fromDerHex;
  Signature$1.fromLegacy = fromLegacy2;
  Signature$1.fromRpc = fromRpc2;
  Signature$1.fromTuple = fromTuple2;
  Signature$1.toBytes = toBytes2;
  Signature$1.toHex = toHex2;
  Signature$1.toDerBytes = toDerBytes2;
  Signature$1.toDerHex = toDerHex;
  Signature$1.toLegacy = toLegacy;
  Signature$1.toRpc = toRpc2;
  Signature$1.toTuple = toTuple2;
  Signature$1.validate = validate2;
  Signature$1.vToYParity = vToYParity2;
  Signature$1.yParityToV = yParityToV2;
  const secp256k1_1 = /* @__PURE__ */ requireSecp256k1$2();
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const Hex2 = requireHex$2();
  const Json2 = requireJson$1();
  const Solidity2 = requireSolidity$1();
  function assert2(signature, options = {}) {
    const { recovered } = options;
    if (typeof signature.r === "undefined")
      throw new MissingPropertiesError3({ signature });
    if (typeof signature.s === "undefined")
      throw new MissingPropertiesError3({ signature });
    if (recovered && typeof signature.yParity === "undefined")
      throw new MissingPropertiesError3({ signature });
    if (signature.r < 0n || signature.r > Solidity2.maxUint256)
      throw new InvalidRError3({ value: signature.r });
    if (signature.s < 0n || signature.s > Solidity2.maxUint256)
      throw new InvalidSError3({ value: signature.s });
    if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
      throw new InvalidYParityError3({ value: signature.yParity });
  }
  function fromBytes2(signature) {
    return fromHex2(Hex2.fromBytes(signature));
  }
  function fromHex2(signature) {
    if (signature.length !== 130 && signature.length !== 132)
      throw new InvalidSerializedSizeError5({ signature });
    const r = BigInt(Hex2.slice(signature, 0, 32));
    const s = BigInt(Hex2.slice(signature, 32, 64));
    const yParity = (() => {
      const yParity2 = Number(`0x${signature.slice(130)}`);
      if (Number.isNaN(yParity2))
        return void 0;
      try {
        return vToYParity2(yParity2);
      } catch {
        throw new InvalidYParityError3({ value: yParity2 });
      }
    })();
    if (typeof yParity === "undefined")
      return {
        r,
        s
      };
    return {
      r,
      s,
      yParity
    };
  }
  function extract2(value) {
    if (typeof value.r === "undefined")
      return void 0;
    if (typeof value.s === "undefined")
      return void 0;
    return from2(value);
  }
  function from2(signature) {
    const signature_ = (() => {
      if (typeof signature === "string")
        return fromHex2(signature);
      if (signature instanceof Uint8Array)
        return fromBytes2(signature);
      if (typeof signature.r === "string")
        return fromRpc2(signature);
      if (signature.v)
        return fromLegacy2(signature);
      return {
        r: signature.r,
        s: signature.s,
        ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
      };
    })();
    assert2(signature_);
    return signature_;
  }
  function fromDerBytes(signature) {
    return fromDerHex(Hex2.fromBytes(signature));
  }
  function fromDerHex(signature) {
    const { r, s } = secp256k1_1.secp256k1.Signature.fromDER(Hex2.from(signature).slice(2));
    return { r, s };
  }
  function fromLegacy2(signature) {
    return {
      r: signature.r,
      s: signature.s,
      yParity: vToYParity2(signature.v)
    };
  }
  function fromRpc2(signature) {
    const yParity = (() => {
      const v = signature.v ? Number(signature.v) : void 0;
      let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
      if (typeof v === "number" && typeof yParity2 !== "number")
        yParity2 = vToYParity2(v);
      if (typeof yParity2 !== "number")
        throw new InvalidYParityError3({ value: signature.yParity });
      return yParity2;
    })();
    return {
      r: BigInt(signature.r),
      s: BigInt(signature.s),
      yParity
    };
  }
  function fromTuple2(tuple) {
    const [yParity, r, s] = tuple;
    return from2({
      r: r === "0x" ? 0n : BigInt(r),
      s: s === "0x" ? 0n : BigInt(s),
      yParity: yParity === "0x" ? 0 : Number(yParity)
    });
  }
  function toBytes2(signature) {
    return Bytes2.fromHex(toHex2(signature));
  }
  function toHex2(signature) {
    assert2(signature);
    const r = signature.r;
    const s = signature.s;
    const signature_ = Hex2.concat(Hex2.fromNumber(r, { size: 32 }), Hex2.fromNumber(s, { size: 32 }), typeof signature.yParity === "number" ? Hex2.fromNumber(yParityToV2(signature.yParity), { size: 1 }) : "0x");
    return signature_;
  }
  function toDerBytes2(signature) {
    const sig = new secp256k1_1.secp256k1.Signature(signature.r, signature.s);
    return sig.toDERRawBytes();
  }
  function toDerHex(signature) {
    const sig = new secp256k1_1.secp256k1.Signature(signature.r, signature.s);
    return `0x${sig.toDERHex()}`;
  }
  function toLegacy(signature) {
    return {
      r: signature.r,
      s: signature.s,
      v: yParityToV2(signature.yParity)
    };
  }
  function toRpc2(signature) {
    const { r, s, yParity } = signature;
    return {
      r: Hex2.fromNumber(r, { size: 32 }),
      s: Hex2.fromNumber(s, { size: 32 }),
      yParity: yParity === 0 ? "0x0" : "0x1"
    };
  }
  function toTuple2(signature) {
    const { r, s, yParity } = signature;
    return [
      yParity ? "0x01" : "0x",
      r === 0n ? "0x" : Hex2.trimLeft(Hex2.fromNumber(r)),
      s === 0n ? "0x" : Hex2.trimLeft(Hex2.fromNumber(s))
    ];
  }
  function validate2(signature, options = {}) {
    try {
      assert2(signature, options);
      return true;
    } catch {
      return false;
    }
  }
  function vToYParity2(v) {
    if (v === 0 || v === 27)
      return 0;
    if (v === 1 || v === 28)
      return 1;
    if (v >= 35)
      return v % 2 === 0 ? 1 : 0;
    throw new InvalidVError3({ value: v });
  }
  function yParityToV2(yParity) {
    if (yParity === 0)
      return 27;
    if (yParity === 1)
      return 28;
    throw new InvalidYParityError3({ value: yParity });
  }
  class InvalidSerializedSizeError5 extends Errors2.BaseError {
    constructor({ signature }) {
      super(`Value \`${signature}\` is an invalid signature size.`, {
        metaMessages: [
          "Expected: 64 bytes or 65 bytes.",
          `Received ${Hex2.size(Hex2.from(signature))} bytes.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidSerializedSizeError"
      });
    }
  }
  Signature$1.InvalidSerializedSizeError = InvalidSerializedSizeError5;
  class MissingPropertiesError3 extends Errors2.BaseError {
    constructor({ signature }) {
      super(`Signature \`${Json2.stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.MissingPropertiesError"
      });
    }
  }
  Signature$1.MissingPropertiesError = MissingPropertiesError3;
  class InvalidRError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidRError"
      });
    }
  }
  Signature$1.InvalidRError = InvalidRError3;
  class InvalidSError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidSError"
      });
    }
  }
  Signature$1.InvalidSError = InvalidSError3;
  class InvalidYParityError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidYParityError"
      });
    }
  }
  Signature$1.InvalidYParityError = InvalidYParityError3;
  class InvalidVError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidVError"
      });
    }
  }
  Signature$1.InvalidVError = InvalidVError3;
  return Signature$1;
}
var hasRequiredAuthorization$1;
function requireAuthorization$1() {
  if (hasRequiredAuthorization$1) return Authorization$1;
  hasRequiredAuthorization$1 = 1;
  Object.defineProperty(Authorization$1, "__esModule", { value: true });
  Authorization$1.from = from2;
  Authorization$1.fromRpc = fromRpc2;
  Authorization$1.fromRpcList = fromRpcList2;
  Authorization$1.fromTuple = fromTuple2;
  Authorization$1.fromTupleList = fromTupleList2;
  Authorization$1.getSignPayload = getSignPayload2;
  Authorization$1.hash = hash2;
  Authorization$1.toRpc = toRpc2;
  Authorization$1.toRpcList = toRpcList2;
  Authorization$1.toTuple = toTuple2;
  Authorization$1.toTupleList = toTupleList2;
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  const Rlp2 = requireRlp$1();
  const Signature2 = requireSignature$1();
  function from2(authorization, options = {}) {
    if (typeof authorization.chainId === "string")
      return fromRpc2(authorization);
    return { ...authorization, ...options.signature };
  }
  function fromRpc2(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = Signature2.extract(authorization);
    return {
      address,
      chainId: Number(chainId),
      nonce: BigInt(nonce),
      ...signature
    };
  }
  function fromRpcList2(authorizationList) {
    return authorizationList.map(fromRpc2);
  }
  function fromTuple2(tuple) {
    const [chainId, address, nonce, yParity, r, s] = tuple;
    let args = {
      address,
      chainId: chainId === "0x" ? 0 : Number(chainId),
      nonce: nonce === "0x" ? 0n : BigInt(nonce)
    };
    if (yParity && r && s)
      args = { ...args, ...Signature2.fromTuple([yParity, r, s]) };
    return from2(args);
  }
  function fromTupleList2(tupleList) {
    const list = [];
    for (const tuple of tupleList)
      list.push(fromTuple2(tuple));
    return list;
  }
  function getSignPayload2(authorization) {
    return hash2(authorization, { presign: true });
  }
  function hash2(authorization, options = {}) {
    const { presign } = options;
    return Hash2.keccak256(Hex2.concat("0x05", Rlp2.fromHex(toTuple2(presign ? {
      address: authorization.address,
      chainId: authorization.chainId,
      nonce: authorization.nonce
    } : authorization))));
  }
  function toRpc2(authorization) {
    const { address, chainId, nonce, ...signature } = authorization;
    return {
      address,
      chainId: Hex2.fromNumber(chainId),
      nonce: Hex2.fromNumber(nonce),
      ...Signature2.toRpc(signature)
    };
  }
  function toRpcList2(authorizationList) {
    return authorizationList.map(toRpc2);
  }
  function toTuple2(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = Signature2.extract(authorization);
    return [
      chainId ? Hex2.fromNumber(chainId) : "0x",
      address,
      nonce ? Hex2.fromNumber(nonce) : "0x",
      ...signature ? Signature2.toTuple(signature) : []
    ];
  }
  function toTupleList2(list) {
    if (!list || list.length === 0)
      return [];
    const tupleList = [];
    for (const authorization of list)
      tupleList.push(toTuple2(authorization));
    return tupleList;
  }
  return Authorization$1;
}
var Base58 = {};
var base58 = {};
var hasRequiredBase58$1;
function requireBase58$1() {
  if (hasRequiredBase58$1) return base58;
  hasRequiredBase58$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.alphabetToInteger = exports.integerToAlphabet = void 0;
    exports.from = from2;
    const Bytes2 = requireBytes$2();
    const Hex2 = requireHex$2();
    exports.integerToAlphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    exports.alphabetToInteger = Object.freeze({
      1: 0n,
      2: 1n,
      3: 2n,
      4: 3n,
      5: 4n,
      6: 5n,
      7: 6n,
      8: 7n,
      9: 8n,
      A: 9n,
      B: 10n,
      C: 11n,
      D: 12n,
      E: 13n,
      F: 14n,
      G: 15n,
      H: 16n,
      J: 17n,
      K: 18n,
      L: 19n,
      M: 20n,
      N: 21n,
      P: 22n,
      Q: 23n,
      R: 24n,
      S: 25n,
      T: 26n,
      U: 27n,
      V: 28n,
      W: 29n,
      X: 30n,
      Y: 31n,
      Z: 32n,
      a: 33n,
      b: 34n,
      c: 35n,
      d: 36n,
      e: 37n,
      f: 38n,
      g: 39n,
      h: 40n,
      i: 41n,
      j: 42n,
      k: 43n,
      m: 44n,
      n: 45n,
      o: 46n,
      p: 47n,
      q: 48n,
      r: 49n,
      s: 50n,
      t: 51n,
      u: 52n,
      v: 53n,
      w: 54n,
      x: 55n,
      y: 56n,
      z: 57n
    });
    function from2(value) {
      let bytes2 = Bytes2.from(value);
      let integer = (() => {
        let hex2 = value;
        if (value instanceof Uint8Array)
          hex2 = Hex2.fromBytes(bytes2);
        return BigInt(hex2);
      })();
      let result = "";
      while (integer > 0n) {
        const remainder = Number(integer % 58n);
        integer = integer / 58n;
        result = exports.integerToAlphabet[remainder] + result;
      }
      while (bytes2.length > 1 && bytes2[0] === 0) {
        result = "1" + result;
        bytes2 = bytes2.slice(1);
      }
      return result;
    }
  })(base58);
  return base58;
}
var hasRequiredBase58;
function requireBase58() {
  if (hasRequiredBase58) return Base58;
  hasRequiredBase58 = 1;
  Object.defineProperty(Base58, "__esModule", { value: true });
  Base58.fromBytes = fromBytes2;
  Base58.fromHex = fromHex2;
  Base58.fromString = fromString2;
  Base58.toBytes = toBytes2;
  Base58.toHex = toHex2;
  Base58.toString = toString2;
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  const internal = requireBase58$1();
  function fromBytes2(value) {
    return internal.from(value);
  }
  function fromHex2(value) {
    return internal.from(value);
  }
  function fromString2(value) {
    return internal.from(Bytes2.fromString(value));
  }
  function toBytes2(value) {
    return Bytes2.fromHex(toHex2(value));
  }
  function toHex2(value) {
    let integer = BigInt(0);
    let pad2 = 0;
    let checkPad = true;
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (checkPad && char === "1")
        pad2++;
      else
        checkPad = false;
      if (typeof internal.alphabetToInteger[char] !== "bigint")
        throw new Error("invalid base58 character: " + char);
      integer = integer * 58n;
      integer = integer + internal.alphabetToInteger[char];
    }
    if (!pad2)
      return `0x${integer.toString(16)}`;
    return `0x${"0".repeat(pad2 * 2)}${integer.toString(16)}`;
  }
  function toString2(value) {
    return Hex2.toString(toHex2(value));
  }
  return Base58;
}
var Base64 = {};
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64) return Base64;
  hasRequiredBase64 = 1;
  Object.defineProperty(Base64, "__esModule", { value: true });
  Base64.fromBytes = fromBytes2;
  Base64.fromHex = fromHex2;
  Base64.fromString = fromString2;
  Base64.toBytes = toBytes2;
  Base64.toHex = toHex2;
  Base64.toString = toString2;
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  const encoder2 = new TextEncoder();
  const decoder2 = new TextDecoder();
  const integerToCharacter2 = Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [i, a.charCodeAt(0)]));
  const characterToInteger2 = {
    ...Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [a.charCodeAt(0), i])),
    ["=".charCodeAt(0)]: 0,
    ["-".charCodeAt(0)]: 62,
    ["_".charCodeAt(0)]: 63
  };
  function fromBytes2(value, options = {}) {
    const { pad: pad2 = true, url = false } = options;
    const encoded = new Uint8Array(Math.ceil(value.length / 3) * 4);
    for (let i = 0, j = 0; j < value.length; i += 4, j += 3) {
      const y = (value[j] << 16) + (value[j + 1] << 8) + (value[j + 2] | 0);
      encoded[i] = integerToCharacter2[y >> 18];
      encoded[i + 1] = integerToCharacter2[y >> 12 & 63];
      encoded[i + 2] = integerToCharacter2[y >> 6 & 63];
      encoded[i + 3] = integerToCharacter2[y & 63];
    }
    const k = value.length % 3;
    const end = Math.floor(value.length / 3) * 4 + (k && k + 1);
    let base64 = decoder2.decode(new Uint8Array(encoded.buffer, 0, end));
    if (pad2 && k === 1)
      base64 += "==";
    if (pad2 && k === 2)
      base64 += "=";
    if (url)
      base64 = base64.replaceAll("+", "-").replaceAll("/", "_");
    return base64;
  }
  function fromHex2(value, options = {}) {
    return fromBytes2(Bytes2.fromHex(value), options);
  }
  function fromString2(value, options = {}) {
    return fromBytes2(Bytes2.fromString(value), options);
  }
  function toBytes2(value) {
    const base64 = value.replace(/=+$/, "");
    const size2 = base64.length;
    const decoded = new Uint8Array(size2 + 3);
    encoder2.encodeInto(base64 + "===", decoded);
    for (let i = 0, j = 0; i < base64.length; i += 4, j += 3) {
      const x = (characterToInteger2[decoded[i]] << 18) + (characterToInteger2[decoded[i + 1]] << 12) + (characterToInteger2[decoded[i + 2]] << 6) + characterToInteger2[decoded[i + 3]];
      decoded[j] = x >> 16;
      decoded[j + 1] = x >> 8 & 255;
      decoded[j + 2] = x & 255;
    }
    const decodedSize = (size2 >> 2) * 3 + (size2 % 4 && size2 % 4 - 1);
    return new Uint8Array(decoded.buffer, 0, decodedSize);
  }
  function toHex2(value) {
    return Hex2.fromBytes(toBytes2(value));
  }
  function toString2(value) {
    return Bytes2.toString(toBytes2(value));
  }
  return Base64;
}
var BinaryStateTree = {};
var hasRequiredBinaryStateTree;
function requireBinaryStateTree() {
  if (hasRequiredBinaryStateTree) return BinaryStateTree;
  hasRequiredBinaryStateTree = 1;
  Object.defineProperty(BinaryStateTree, "__esModule", { value: true });
  BinaryStateTree.create = create2;
  BinaryStateTree.insert = insert;
  BinaryStateTree.merkelize = merkelize;
  const blake3_1 = /* @__PURE__ */ requireBlake3();
  const Bytes2 = requireBytes$2();
  function create2() {
    return {
      root: emptyNode()
    };
  }
  function insert(tree, key, value) {
    const stem = Bytes2.slice(key, 0, 31);
    const subIndex = Bytes2.slice(key, 31)[0];
    if (tree.root.type === "empty") {
      tree.root = stemNode(stem);
      tree.root.values[subIndex] = value;
      return;
    }
    function inner(node_, stem2, subIndex2, value2, depth) {
      let node = node_;
      if (node.type === "empty") {
        node = stemNode(stem2);
        node.values[subIndex2] = value2;
        return node;
      }
      const stemBits = bytesToBits(stem2);
      if (node.type === "stem") {
        if (Bytes2.isEqual(node.stem, stem2)) {
          node.values[subIndex2] = value2;
          return node;
        }
        const existingStemBits = bytesToBits(node.stem);
        return splitLeaf(node, stemBits, existingStemBits, subIndex2, value2, depth);
      }
      if (node.type === "internal") {
        const bit = stemBits[depth];
        if (bit === 0) {
          node.left = inner(node.left, stem2, subIndex2, value2, depth + 1);
        } else {
          node.right = inner(node.right, stem2, subIndex2, value2, depth + 1);
        }
        return node;
      }
      return emptyNode();
    }
    tree.root = inner(tree.root, stem, subIndex, value, 0);
  }
  function merkelize(tree) {
    function inner(node) {
      if (node.type === "empty")
        return new Uint8Array(32).fill(0);
      if (node.type === "internal") {
        const hash_left = inner(node.left);
        const hash_right = inner(node.right);
        return hash2(Bytes2.concat(hash_left, hash_right));
      }
      let level = node.values.map(hash2);
      while (level.length > 1) {
        const level_ = [];
        for (let i = 0; i < level.length; i += 2)
          level_.push(hash2(Bytes2.concat(level[i], level[i + 1])));
        level = level_;
      }
      return hash2(Bytes2.concat(node.stem, new Uint8Array(1).fill(0), level[0]));
    }
    return inner(tree.root);
  }
  function splitLeaf(leaf, stemBits, existingStemBits, subIndex, value, depth) {
    if (stemBits[depth] === existingStemBits[depth]) {
      const internal2 = internalNode();
      const bit2 = stemBits[depth];
      if (bit2 === 0) {
        internal2.left = splitLeaf(leaf, stemBits, existingStemBits, subIndex, value, depth + 1);
      } else {
        internal2.right = splitLeaf(leaf, stemBits, existingStemBits, subIndex, value, depth + 1);
      }
      return internal2;
    }
    const internal = internalNode();
    const bit = stemBits[depth];
    const stem = bitsToBytes(stemBits);
    if (bit === 0) {
      internal.left = stemNode(stem);
      internal.left.values[subIndex] = value;
      internal.right = leaf;
    } else {
      internal.right = stemNode(stem);
      internal.right.values[subIndex] = value;
      internal.left = leaf;
    }
    return internal;
  }
  function emptyNode() {
    return {
      type: "empty"
    };
  }
  function internalNode() {
    return {
      left: emptyNode(),
      right: emptyNode(),
      type: "internal"
    };
  }
  function stemNode(stem) {
    return {
      stem,
      values: Array.from({ length: 256 }, () => void 0),
      type: "stem"
    };
  }
  function bytesToBits(bytes2) {
    const bits = [];
    for (const byte of bytes2)
      for (let i = 0; i < 8; i++)
        bits.push(byte >> 7 - i & 1);
    return bits;
  }
  function bitsToBytes(bits) {
    const byte_data = new Uint8Array(bits.length / 8);
    for (let i = 0; i < bits.length; i += 8) {
      let byte = 0;
      for (let j = 0; j < 8; j++)
        byte |= bits[i + j] << 7 - j;
      byte_data[i / 8] = byte;
    }
    return byte_data;
  }
  function hash2(bytes2) {
    if (!bytes2)
      return new Uint8Array(32).fill(0);
    if (!bytes2.some((byte) => byte !== 0))
      return new Uint8Array(32).fill(0);
    return (0, blake3_1.blake3)(bytes2);
  }
  return BinaryStateTree;
}
var Blobs = {};
var Kzg = {};
var hasRequiredKzg;
function requireKzg() {
  if (hasRequiredKzg) return Kzg;
  hasRequiredKzg = 1;
  Object.defineProperty(Kzg, "__esModule", { value: true });
  Kzg.versionedHashVersion = void 0;
  Kzg.from = from2;
  Kzg.versionedHashVersion = 1;
  function from2(value) {
    const { blobToKzgCommitment, computeBlobKzgProof } = value;
    return {
      blobToKzgCommitment,
      computeBlobKzgProof
    };
  }
  return Kzg;
}
var hasRequiredBlobs;
function requireBlobs() {
  if (hasRequiredBlobs) return Blobs;
  hasRequiredBlobs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidVersionedHashVersionError = exports.InvalidVersionedHashSizeError = exports.EmptyBlobVersionedHashesError = exports.EmptyBlobError = exports.BlobSizeTooLargeError = exports.maxBytesPerTransaction = exports.bytesPerBlob = exports.fieldElementsPerBlob = exports.bytesPerFieldElement = void 0;
    exports.commitmentsToVersionedHashes = commitmentsToVersionedHashes;
    exports.commitmentToVersionedHash = commitmentToVersionedHash;
    exports.from = from2;
    exports.sidecarsToVersionedHashes = sidecarsToVersionedHashes;
    exports.to = to2;
    exports.toHex = toHex2;
    exports.toBytes = toBytes2;
    exports.toCommitments = toCommitments;
    exports.toProofs = toProofs;
    exports.toSidecars = toSidecars;
    exports.toVersionedHashes = toVersionedHashes;
    const Bytes2 = requireBytes$2();
    const Errors2 = requireErrors$2();
    const Hash2 = requireHash$1();
    const Hex2 = requireHex$2();
    const Cursor = requireCursor$1();
    const Kzg2 = requireKzg();
    const blobsPerTransaction = 6;
    exports.bytesPerFieldElement = 32;
    exports.fieldElementsPerBlob = 4096;
    exports.bytesPerBlob = exports.bytesPerFieldElement * exports.fieldElementsPerBlob;
    exports.maxBytesPerTransaction = exports.bytesPerBlob * blobsPerTransaction - 1 - 1 * exports.fieldElementsPerBlob * blobsPerTransaction;
    function commitmentsToVersionedHashes(commitments, options = {}) {
      const { version: version2 } = options;
      const as = options.as ?? (typeof commitments[0] === "string" ? "Hex" : "Bytes");
      const hashes = [];
      for (const commitment of commitments) {
        hashes.push(commitmentToVersionedHash(commitment, {
          as,
          version: version2
        }));
      }
      return hashes;
    }
    function commitmentToVersionedHash(commitment, options = {}) {
      const { version: version2 = 1 } = options;
      const as = options.as ?? (typeof commitment === "string" ? "Hex" : "Bytes");
      const versionedHash = Hash2.sha256(commitment, { as: "Bytes" });
      versionedHash.set([version2], 0);
      return as === "Bytes" ? versionedHash : Hex2.fromBytes(versionedHash);
    }
    function from2(data, options = {}) {
      const as = options.as ?? (typeof data === "string" ? "Hex" : "Bytes");
      const data_ = typeof data === "string" ? Bytes2.fromHex(data) : data;
      const size_ = Bytes2.size(data_);
      if (!size_)
        throw new EmptyBlobError();
      if (size_ > exports.maxBytesPerTransaction)
        throw new BlobSizeTooLargeError({
          maxSize: exports.maxBytesPerTransaction,
          size: size_
        });
      const blobs = [];
      let active = true;
      let position = 0;
      while (active) {
        const blob = Cursor.create(new Uint8Array(exports.bytesPerBlob));
        let size2 = 0;
        while (size2 < exports.fieldElementsPerBlob) {
          const bytes2 = data_.slice(position, position + (exports.bytesPerFieldElement - 1));
          blob.pushByte(0);
          blob.pushBytes(bytes2);
          if (bytes2.length < 31) {
            blob.pushByte(128);
            active = false;
            break;
          }
          size2++;
          position += 31;
        }
        blobs.push(blob);
      }
      return as === "Bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => Hex2.fromBytes(x.bytes));
    }
    function sidecarsToVersionedHashes(sidecars, options = {}) {
      const { version: version2 } = options;
      const as = options.as ?? (typeof sidecars[0].blob === "string" ? "Hex" : "Bytes");
      const hashes = [];
      for (const { commitment } of sidecars) {
        hashes.push(commitmentToVersionedHash(commitment, {
          as,
          version: version2
        }));
      }
      return hashes;
    }
    function to2(blobs, to3) {
      const to_ = to3 ?? (typeof blobs[0] === "string" ? "Hex" : "Bytes");
      const blobs_ = typeof blobs[0] === "string" ? blobs.map((x) => Bytes2.fromHex(x)) : blobs;
      const length = blobs_.reduce((length2, blob) => length2 + blob.length, 0);
      const data = Cursor.create(new Uint8Array(length));
      let active = true;
      for (const blob of blobs_) {
        const cursor2 = Cursor.create(blob);
        while (active && cursor2.position < blob.length) {
          cursor2.incrementPosition(1);
          let consume = 31;
          if (blob.length - cursor2.position < 31)
            consume = blob.length - cursor2.position;
          for (const _ in Array.from({ length: consume })) {
            const byte = cursor2.readByte();
            const isTerminator = byte === 128 && !cursor2.inspectBytes(cursor2.remaining).includes(128);
            if (isTerminator) {
              active = false;
              break;
            }
            data.pushByte(byte);
          }
        }
      }
      const trimmedData = data.bytes.slice(0, data.position);
      return to_ === "Hex" ? Hex2.fromBytes(trimmedData) : trimmedData;
    }
    function toHex2(blobs) {
      return to2(blobs, "Hex");
    }
    function toBytes2(blobs) {
      return to2(blobs, "Bytes");
    }
    function toCommitments(blobs, options) {
      const { kzg } = options;
      const as = options.as ?? (typeof blobs[0] === "string" ? "Hex" : "Bytes");
      const blobs_ = typeof blobs[0] === "string" ? blobs.map((x) => Bytes2.fromHex(x)) : blobs;
      const commitments = [];
      for (const blob of blobs_)
        commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
      return as === "Bytes" ? commitments : commitments.map((x) => Hex2.fromBytes(x));
    }
    function toProofs(blobs, options) {
      const { kzg } = options;
      const as = options.as ?? (typeof blobs[0] === "string" ? "Hex" : "Bytes");
      const blobs_ = typeof blobs[0] === "string" ? blobs.map((x) => Bytes2.fromHex(x)) : blobs;
      const commitments = typeof options.commitments[0] === "string" ? options.commitments.map((x) => Bytes2.fromHex(x)) : options.commitments;
      const proofs = [];
      for (let i = 0; i < blobs_.length; i++) {
        const blob = blobs_[i];
        const commitment = commitments[i];
        proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
      }
      return as === "Bytes" ? proofs : proofs.map((x) => Hex2.fromBytes(x));
    }
    function toSidecars(blobs, options) {
      const { kzg } = options;
      const commitments = options.commitments ?? toCommitments(blobs, { kzg });
      const proofs = options.proofs ?? toProofs(blobs, { commitments, kzg });
      const sidecars = [];
      for (let i = 0; i < blobs.length; i++)
        sidecars.push({
          blob: blobs[i],
          commitment: commitments[i],
          proof: proofs[i]
        });
      return sidecars;
    }
    function toVersionedHashes(blobs, options) {
      const commitments = toCommitments(blobs, options);
      return commitmentsToVersionedHashes(commitments, options);
    }
    class BlobSizeTooLargeError extends Errors2.BaseError {
      constructor({ maxSize, size: size2 }) {
        super("Blob size is too large.", {
          metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size2} bytes`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Blobs.BlobSizeTooLargeError"
        });
      }
    }
    exports.BlobSizeTooLargeError = BlobSizeTooLargeError;
    class EmptyBlobError extends Errors2.BaseError {
      constructor() {
        super("Blob data must not be empty.");
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Blobs.EmptyBlobError"
        });
      }
    }
    exports.EmptyBlobError = EmptyBlobError;
    class EmptyBlobVersionedHashesError extends Errors2.BaseError {
      constructor() {
        super("Blob versioned hashes must not be empty.");
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Blobs.EmptyBlobVersionedHashesError"
        });
      }
    }
    exports.EmptyBlobVersionedHashesError = EmptyBlobVersionedHashesError;
    class InvalidVersionedHashSizeError extends Errors2.BaseError {
      constructor({ hash: hash2, size: size2 }) {
        super(`Versioned hash "${hash2}" size is invalid.`, {
          metaMessages: ["Expected: 32", `Received: ${size2}`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Blobs.InvalidVersionedHashSizeError"
        });
      }
    }
    exports.InvalidVersionedHashSizeError = InvalidVersionedHashSizeError;
    class InvalidVersionedHashVersionError extends Errors2.BaseError {
      constructor({ hash: hash2, version: version2 }) {
        super(`Versioned hash "${hash2}" version is invalid.`, {
          metaMessages: [
            `Expected: ${Kzg2.versionedHashVersion}`,
            `Received: ${version2}`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Blobs.InvalidVersionedHashVersionError"
        });
      }
    }
    exports.InvalidVersionedHashVersionError = InvalidVersionedHashVersionError;
  })(Blobs);
  return Blobs;
}
var Block = {};
var Transaction = {};
var hasRequiredTransaction;
function requireTransaction() {
  if (hasRequiredTransaction) return Transaction;
  hasRequiredTransaction = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromRpcType = exports.toRpcType = void 0;
    exports.fromRpc = fromRpc2;
    exports.toRpc = toRpc2;
    const Authorization2 = requireAuthorization$1();
    const Hex2 = requireHex$2();
    const Signature2 = requireSignature$1();
    exports.toRpcType = {
      legacy: "0x0",
      eip2930: "0x1",
      eip1559: "0x2",
      eip4844: "0x3",
      eip7702: "0x4"
    };
    exports.fromRpcType = {
      "0x0": "legacy",
      "0x1": "eip2930",
      "0x2": "eip1559",
      "0x3": "eip4844",
      "0x4": "eip7702"
    };
    function fromRpc2(transaction, _options = {}) {
      if (!transaction)
        return null;
      const signature = Signature2.extract(transaction);
      const transaction_ = {
        ...transaction,
        ...signature
      };
      transaction_.blockNumber = transaction.blockNumber ? BigInt(transaction.blockNumber) : null;
      transaction_.data = transaction.input;
      transaction_.gas = BigInt(transaction.gas ?? 0n);
      transaction_.nonce = BigInt(transaction.nonce ?? 0n);
      transaction_.transactionIndex = transaction.transactionIndex ? Number(transaction.transactionIndex) : null;
      transaction_.value = BigInt(transaction.value ?? 0n);
      if (transaction.authorizationList)
        transaction_.authorizationList = Authorization2.fromRpcList(transaction.authorizationList);
      if (transaction.chainId)
        transaction_.chainId = Number(transaction.chainId);
      if (transaction.gasPrice)
        transaction_.gasPrice = BigInt(transaction.gasPrice);
      if (transaction.maxFeePerBlobGas)
        transaction_.maxFeePerBlobGas = BigInt(transaction.maxFeePerBlobGas);
      if (transaction.maxFeePerGas)
        transaction_.maxFeePerGas = BigInt(transaction.maxFeePerGas);
      if (transaction.maxPriorityFeePerGas)
        transaction_.maxPriorityFeePerGas = BigInt(transaction.maxPriorityFeePerGas);
      if (transaction.type)
        transaction_.type = exports.fromRpcType[transaction.type] ?? transaction.type;
      if (signature)
        transaction_.v = Signature2.yParityToV(signature.yParity);
      return transaction_;
    }
    function toRpc2(transaction, _options) {
      const rpc = {};
      rpc.blockHash = transaction.blockHash;
      rpc.blockNumber = typeof transaction.blockNumber === "bigint" ? Hex2.fromNumber(transaction.blockNumber) : null;
      rpc.from = transaction.from;
      rpc.gas = Hex2.fromNumber(transaction.gas ?? 0n);
      rpc.hash = transaction.hash;
      rpc.input = transaction.input;
      rpc.nonce = Hex2.fromNumber(transaction.nonce ?? 0n);
      rpc.to = transaction.to;
      rpc.transactionIndex = transaction.transactionIndex ? Hex2.fromNumber(transaction.transactionIndex) : null;
      rpc.type = exports.toRpcType[transaction.type] ?? transaction.type;
      rpc.value = Hex2.fromNumber(transaction.value ?? 0n);
      if (transaction.accessList)
        rpc.accessList = transaction.accessList;
      if (transaction.authorizationList)
        rpc.authorizationList = Authorization2.toRpcList(transaction.authorizationList);
      if (transaction.blobVersionedHashes)
        rpc.blobVersionedHashes = transaction.blobVersionedHashes;
      if (transaction.chainId)
        rpc.chainId = Hex2.fromNumber(transaction.chainId);
      if (typeof transaction.gasPrice === "bigint")
        rpc.gasPrice = Hex2.fromNumber(transaction.gasPrice);
      if (typeof transaction.maxFeePerBlobGas === "bigint")
        rpc.maxFeePerBlobGas = Hex2.fromNumber(transaction.maxFeePerBlobGas);
      if (typeof transaction.maxFeePerGas === "bigint")
        rpc.maxFeePerGas = Hex2.fromNumber(transaction.maxFeePerGas);
      if (typeof transaction.maxPriorityFeePerGas === "bigint")
        rpc.maxPriorityFeePerGas = Hex2.fromNumber(transaction.maxPriorityFeePerGas);
      if (typeof transaction.r === "bigint")
        rpc.r = Hex2.fromNumber(transaction.r, { size: 32 });
      if (typeof transaction.s === "bigint")
        rpc.s = Hex2.fromNumber(transaction.s, { size: 32 });
      if (typeof transaction.v === "number")
        rpc.v = Hex2.fromNumber(transaction.v, { size: 1 });
      if (typeof transaction.yParity === "number")
        rpc.yParity = transaction.yParity === 0 ? "0x0" : "0x1";
      return rpc;
    }
  })(Transaction);
  return Transaction;
}
var Withdrawal$1 = {};
var hasRequiredWithdrawal$1;
function requireWithdrawal$1() {
  if (hasRequiredWithdrawal$1) return Withdrawal$1;
  hasRequiredWithdrawal$1 = 1;
  Object.defineProperty(Withdrawal$1, "__esModule", { value: true });
  Withdrawal$1.fromRpc = fromRpc2;
  Withdrawal$1.toRpc = toRpc2;
  const Hex2 = requireHex$2();
  function fromRpc2(withdrawal) {
    return {
      ...withdrawal,
      amount: BigInt(withdrawal.amount),
      index: Number(withdrawal.index),
      validatorIndex: Number(withdrawal.validatorIndex)
    };
  }
  function toRpc2(withdrawal) {
    return {
      address: withdrawal.address,
      amount: Hex2.fromNumber(withdrawal.amount),
      index: Hex2.fromNumber(withdrawal.index),
      validatorIndex: Hex2.fromNumber(withdrawal.validatorIndex)
    };
  }
  return Withdrawal$1;
}
var hasRequiredBlock;
function requireBlock() {
  if (hasRequiredBlock) return Block;
  hasRequiredBlock = 1;
  Object.defineProperty(Block, "__esModule", { value: true });
  Block.toRpc = toRpc2;
  Block.fromRpc = fromRpc2;
  const Hex2 = requireHex$2();
  const Transaction2 = requireTransaction();
  const Withdrawal2 = requireWithdrawal$1();
  function toRpc2(block, _options = {}) {
    const transactions = block.transactions.map((transaction) => {
      if (typeof transaction === "string")
        return transaction;
      return Transaction2.toRpc(transaction);
    });
    return {
      baseFeePerGas: typeof block.baseFeePerGas === "bigint" ? Hex2.fromNumber(block.baseFeePerGas) : void 0,
      blobGasUsed: typeof block.blobGasUsed === "bigint" ? Hex2.fromNumber(block.blobGasUsed) : void 0,
      excessBlobGas: typeof block.excessBlobGas === "bigint" ? Hex2.fromNumber(block.excessBlobGas) : void 0,
      extraData: block.extraData,
      difficulty: typeof block.difficulty === "bigint" ? Hex2.fromNumber(block.difficulty) : void 0,
      gasLimit: Hex2.fromNumber(block.gasLimit),
      gasUsed: Hex2.fromNumber(block.gasUsed),
      hash: block.hash,
      logsBloom: block.logsBloom,
      miner: block.miner,
      mixHash: block.mixHash,
      nonce: block.nonce,
      number: typeof block.number === "bigint" ? Hex2.fromNumber(block.number) : null,
      parentBeaconBlockRoot: block.parentBeaconBlockRoot,
      parentHash: block.parentHash,
      receiptsRoot: block.receiptsRoot,
      sealFields: block.sealFields,
      sha3Uncles: block.sha3Uncles,
      size: Hex2.fromNumber(block.size),
      stateRoot: block.stateRoot,
      timestamp: Hex2.fromNumber(block.timestamp),
      totalDifficulty: typeof block.totalDifficulty === "bigint" ? Hex2.fromNumber(block.totalDifficulty) : void 0,
      transactions,
      transactionsRoot: block.transactionsRoot,
      uncles: block.uncles,
      withdrawals: block.withdrawals?.map(Withdrawal2.toRpc),
      withdrawalsRoot: block.withdrawalsRoot
    };
  }
  function fromRpc2(block, _options = {}) {
    if (!block)
      return null;
    const transactions = block.transactions.map((transaction) => {
      if (typeof transaction === "string")
        return transaction;
      return Transaction2.fromRpc(transaction);
    });
    return {
      ...block,
      baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : void 0,
      blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
      difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
      excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
      gasLimit: BigInt(block.gasLimit ?? 0n),
      gasUsed: BigInt(block.gasUsed ?? 0n),
      number: block.number ? BigInt(block.number) : null,
      size: BigInt(block.size ?? 0n),
      stateRoot: block.stateRoot,
      timestamp: BigInt(block.timestamp ?? 0n),
      totalDifficulty: BigInt(block.totalDifficulty ?? 0n),
      transactions,
      withdrawals: block.withdrawals?.map(Withdrawal2.fromRpc)
    };
  }
  return Block;
}
var BlockOverrides$1 = {};
var hasRequiredBlockOverrides$1;
function requireBlockOverrides$1() {
  if (hasRequiredBlockOverrides$1) return BlockOverrides$1;
  hasRequiredBlockOverrides$1 = 1;
  Object.defineProperty(BlockOverrides$1, "__esModule", { value: true });
  BlockOverrides$1.fromRpc = fromRpc2;
  BlockOverrides$1.toRpc = toRpc2;
  const Hex2 = requireHex$2();
  const Withdrawal2 = requireWithdrawal$1();
  function fromRpc2(rpcBlockOverrides) {
    return {
      ...rpcBlockOverrides.baseFeePerGas && {
        baseFeePerGas: BigInt(rpcBlockOverrides.baseFeePerGas)
      },
      ...rpcBlockOverrides.blobBaseFee && {
        blobBaseFee: BigInt(rpcBlockOverrides.blobBaseFee)
      },
      ...rpcBlockOverrides.feeRecipient && {
        feeRecipient: rpcBlockOverrides.feeRecipient
      },
      ...rpcBlockOverrides.gasLimit && {
        gasLimit: BigInt(rpcBlockOverrides.gasLimit)
      },
      ...rpcBlockOverrides.number && {
        number: BigInt(rpcBlockOverrides.number)
      },
      ...rpcBlockOverrides.prevRandao && {
        prevRandao: BigInt(rpcBlockOverrides.prevRandao)
      },
      ...rpcBlockOverrides.time && {
        time: BigInt(rpcBlockOverrides.time)
      },
      ...rpcBlockOverrides.withdrawals && {
        withdrawals: rpcBlockOverrides.withdrawals.map(Withdrawal2.fromRpc)
      }
    };
  }
  function toRpc2(blockOverrides) {
    return {
      ...typeof blockOverrides.baseFeePerGas === "bigint" && {
        baseFeePerGas: Hex2.fromNumber(blockOverrides.baseFeePerGas)
      },
      ...typeof blockOverrides.blobBaseFee === "bigint" && {
        blobBaseFee: Hex2.fromNumber(blockOverrides.blobBaseFee)
      },
      ...typeof blockOverrides.feeRecipient === "string" && {
        feeRecipient: blockOverrides.feeRecipient
      },
      ...typeof blockOverrides.gasLimit === "bigint" && {
        gasLimit: Hex2.fromNumber(blockOverrides.gasLimit)
      },
      ...typeof blockOverrides.number === "bigint" && {
        number: Hex2.fromNumber(blockOverrides.number)
      },
      ...typeof blockOverrides.prevRandao === "bigint" && {
        prevRandao: Hex2.fromNumber(blockOverrides.prevRandao)
      },
      ...typeof blockOverrides.time === "bigint" && {
        time: Hex2.fromNumber(blockOverrides.time)
      },
      ...blockOverrides.withdrawals && {
        withdrawals: blockOverrides.withdrawals.map(Withdrawal2.toRpc)
      }
    };
  }
  return BlockOverrides$1;
}
var Bloom = {};
var hasRequiredBloom;
function requireBloom() {
  if (hasRequiredBloom) return Bloom;
  hasRequiredBloom = 1;
  Object.defineProperty(Bloom, "__esModule", { value: true });
  Bloom.contains = contains;
  Bloom.validate = validate2;
  const Bytes2 = requireBytes$2();
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  function contains(bloom, input) {
    const filter = Bytes2.fromHex(bloom);
    const hash2 = Hash2.keccak256(input, { as: "Bytes" });
    for (const i of [0, 2, 4]) {
      const bit = hash2[i + 1] + (hash2[i] << 8) & 2047;
      if ((filter[256 - 1 - Math.floor(bit / 8)] & 1 << bit % 8) === 0)
        return false;
    }
    return true;
  }
  function validate2(value) {
    return Hex2.validate(value) && Hex2.size(value) === 256;
  }
  return Bloom;
}
var Bls = {};
var hasRequiredBls;
function requireBls() {
  if (hasRequiredBls) return Bls;
  hasRequiredBls = 1;
  Object.defineProperty(Bls, "__esModule", { value: true });
  Bls.noble = void 0;
  Bls.aggregate = aggregate;
  Bls.createKeyPair = createKeyPair2;
  Bls.getPublicKey = getPublicKey;
  Bls.randomPrivateKey = randomPrivateKey;
  Bls.sign = sign2;
  Bls.verify = verify2;
  const bls12_381_1 = /* @__PURE__ */ requireBls12381();
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  Bls.noble = bls12_381_1.bls12_381;
  function aggregate(points) {
    const group = typeof points[0]?.x === "bigint" ? bls12_381_1.bls12_381.G1 : bls12_381_1.bls12_381.G2;
    const point = points.reduce((acc, point2) => acc.add(new group.ProjectivePoint(point2.x, point2.y, point2.z)), group.ProjectivePoint.ZERO);
    return {
      x: point.px,
      y: point.py,
      z: point.pz
    };
  }
  function createKeyPair2(options = {}) {
    const { as = "Hex", size: size2 = "short-key:long-sig" } = options;
    const privateKey = randomPrivateKey({ as });
    const publicKey = getPublicKey({ privateKey, size: size2 });
    return {
      privateKey,
      publicKey
    };
  }
  function getPublicKey(options) {
    const { privateKey, size: size2 = "short-key:long-sig" } = options;
    const group = size2 === "short-key:long-sig" ? bls12_381_1.bls12_381.G1 : bls12_381_1.bls12_381.G2;
    const { px, py, pz } = group.ProjectivePoint.fromPrivateKey(Hex2.from(privateKey).slice(2));
    return { x: px, y: py, z: pz };
  }
  function randomPrivateKey(options = {}) {
    const { as = "Hex" } = options;
    const bytes2 = bls12_381_1.bls12_381.utils.randomPrivateKey();
    if (as === "Hex")
      return Hex2.fromBytes(bytes2);
    return bytes2;
  }
  function sign2(options) {
    const { payload, privateKey, suite, size: size2 = "short-key:long-sig" } = options;
    const payloadGroup = size2 === "short-key:long-sig" ? bls12_381_1.bls12_381.G2 : bls12_381_1.bls12_381.G1;
    const payloadPoint = payloadGroup.hashToCurve(Bytes2.from(payload), suite ? { DST: Bytes2.fromString(suite) } : void 0);
    const privateKeyGroup = size2 === "short-key:long-sig" ? bls12_381_1.bls12_381.G1 : bls12_381_1.bls12_381.G2;
    const signature = payloadPoint.multiply(privateKeyGroup.normPrivateKeyToScalar(privateKey.slice(2)));
    return {
      x: signature.px,
      y: signature.py,
      z: signature.pz
    };
  }
  function verify2(options) {
    const { payload, suite } = options;
    const publicKey = options.publicKey;
    const signature = options.signature;
    const isShortSig = typeof signature.x === "bigint";
    const group = isShortSig ? bls12_381_1.bls12_381.G1 : bls12_381_1.bls12_381.G2;
    const payloadPoint = group.hashToCurve(Bytes2.from(payload), suite ? { DST: Bytes2.fromString(suite) } : void 0);
    const shortSigPairing = () => bls12_381_1.bls12_381.pairingBatch([
      {
        g1: payloadPoint,
        g2: new bls12_381_1.bls12_381.G2.ProjectivePoint(publicKey.x, publicKey.y, publicKey.z)
      },
      {
        g1: new bls12_381_1.bls12_381.G1.ProjectivePoint(signature.x, signature.y, signature.z),
        g2: bls12_381_1.bls12_381.G2.ProjectivePoint.BASE.negate()
      }
    ]);
    const longSigPairing = () => bls12_381_1.bls12_381.pairingBatch([
      {
        g1: new bls12_381_1.bls12_381.G1.ProjectivePoint(publicKey.x, publicKey.y, publicKey.z).negate(),
        g2: payloadPoint
      },
      {
        g1: bls12_381_1.bls12_381.G1.ProjectivePoint.BASE,
        g2: new bls12_381_1.bls12_381.G2.ProjectivePoint(signature.x, signature.y, signature.z)
      }
    ]);
    return bls12_381_1.bls12_381.fields.Fp12.eql(isShortSig ? shortSigPairing() : longSigPairing(), bls12_381_1.bls12_381.fields.Fp12.ONE);
  }
  return Bls;
}
var BlsPoint = {};
var hasRequiredBlsPoint;
function requireBlsPoint() {
  if (hasRequiredBlsPoint) return BlsPoint;
  hasRequiredBlsPoint = 1;
  Object.defineProperty(BlsPoint, "__esModule", { value: true });
  BlsPoint.toBytes = toBytes2;
  BlsPoint.toHex = toHex2;
  BlsPoint.fromBytes = fromBytes2;
  BlsPoint.fromHex = fromHex2;
  const bls12_381_1 = /* @__PURE__ */ requireBls12381();
  const Hex2 = requireHex$2();
  function toBytes2(point) {
    const group = typeof point.z === "bigint" ? bls12_381_1.bls12_381.G1 : bls12_381_1.bls12_381.G2;
    return new group.ProjectivePoint(point.x, point.y, point.z).toRawBytes();
  }
  function toHex2(point) {
    return Hex2.fromBytes(toBytes2(point));
  }
  function fromBytes2(bytes2) {
    const group = bytes2.length === 48 ? bls12_381_1.bls12_381.G1 : bls12_381_1.bls12_381.G2;
    const point = group.ProjectivePoint.fromHex(bytes2);
    return {
      x: point.px,
      y: point.py,
      z: point.pz
    };
  }
  function fromHex2(hex2, group) {
    return fromBytes2(Hex2.toBytes(hex2));
  }
  return BlsPoint;
}
var ContractAddress = {};
var hasRequiredContractAddress;
function requireContractAddress() {
  if (hasRequiredContractAddress) return ContractAddress;
  hasRequiredContractAddress = 1;
  Object.defineProperty(ContractAddress, "__esModule", { value: true });
  ContractAddress.from = from2;
  ContractAddress.fromCreate = fromCreate;
  ContractAddress.fromCreate2 = fromCreate2;
  const Address2 = requireAddress$1();
  const Bytes2 = requireBytes$2();
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  const Rlp2 = requireRlp$1();
  function from2(options) {
    if (options.salt)
      return fromCreate2(options);
    return fromCreate(options);
  }
  function fromCreate(options) {
    const from3 = Bytes2.fromHex(Address2.from(options.from));
    let nonce = Bytes2.fromNumber(options.nonce);
    if (nonce[0] === 0)
      nonce = new Uint8Array([]);
    return Address2.from(`0x${Hash2.keccak256(Rlp2.fromBytes([from3, nonce], { as: "Hex" })).slice(26)}`);
  }
  function fromCreate2(options) {
    const from3 = Bytes2.fromHex(Address2.from(options.from));
    const salt = Bytes2.padLeft(Bytes2.validate(options.salt) ? options.salt : Bytes2.fromHex(options.salt), 32);
    const bytecodeHash = (() => {
      if ("bytecodeHash" in options) {
        if (Bytes2.validate(options.bytecodeHash))
          return options.bytecodeHash;
        return Bytes2.fromHex(options.bytecodeHash);
      }
      return Hash2.keccak256(options.bytecode, { as: "Bytes" });
    })();
    return Address2.from(Hex2.slice(Hash2.keccak256(Bytes2.concat(Bytes2.fromHex("0xff"), from3, salt, bytecodeHash), { as: "Hex" }), 12));
  }
  return ContractAddress;
}
var Ed25519 = {};
var hasRequiredEd25519;
function requireEd25519() {
  if (hasRequiredEd25519) return Ed25519;
  hasRequiredEd25519 = 1;
  Object.defineProperty(Ed25519, "__esModule", { value: true });
  Ed25519.noble = void 0;
  Ed25519.createKeyPair = createKeyPair2;
  Ed25519.getPublicKey = getPublicKey;
  Ed25519.randomPrivateKey = randomPrivateKey;
  Ed25519.sign = sign2;
  Ed25519.verify = verify2;
  const ed25519_1 = /* @__PURE__ */ requireEd25519$1();
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  Ed25519.noble = ed25519_1.ed25519;
  function createKeyPair2(options = {}) {
    const { as = "Hex" } = options;
    const privateKey = randomPrivateKey({ as });
    const publicKey = getPublicKey({ privateKey, as });
    return {
      privateKey,
      publicKey
    };
  }
  function getPublicKey(options) {
    const { as = "Hex", privateKey } = options;
    const privateKeyBytes = Bytes2.from(privateKey);
    const publicKeyBytes = ed25519_1.ed25519.getPublicKey(privateKeyBytes);
    if (as === "Hex")
      return Hex2.fromBytes(publicKeyBytes);
    return publicKeyBytes;
  }
  function randomPrivateKey(options = {}) {
    const { as = "Hex" } = options;
    const bytes2 = ed25519_1.ed25519.utils.randomPrivateKey();
    if (as === "Hex")
      return Hex2.fromBytes(bytes2);
    return bytes2;
  }
  function sign2(options) {
    const { as = "Hex", payload, privateKey } = options;
    const payloadBytes = Bytes2.from(payload);
    const privateKeyBytes = Bytes2.from(privateKey);
    const signatureBytes = ed25519_1.ed25519.sign(payloadBytes, privateKeyBytes);
    if (as === "Hex")
      return Hex2.fromBytes(signatureBytes);
    return signatureBytes;
  }
  function verify2(options) {
    const { payload, publicKey, signature } = options;
    const payloadBytes = Bytes2.from(payload);
    const publicKeyBytes = Bytes2.from(publicKey);
    const signatureBytes = Bytes2.from(signature);
    return ed25519_1.ed25519.verify(signatureBytes, payloadBytes, publicKeyBytes);
  }
  return Ed25519;
}
var Ens = {};
var ens = {};
var hasRequiredEns$1;
function requireEns$1() {
  if (hasRequiredEns$1) return ens;
  hasRequiredEns$1 = 1;
  Object.defineProperty(ens, "__esModule", { value: true });
  ens.packetToBytes = packetToBytes;
  ens.wrapLabelhash = wrapLabelhash;
  ens.unwrapLabelhash = unwrapLabelhash;
  const index_js_1 = /* @__PURE__ */ require_cjs();
  const Ens2 = requireEns();
  const Hex2 = requireHex$2();
  function packetToBytes(packet) {
    const value = packet.replace(/^\.|\.$/gm, "");
    if (value.length === 0)
      return new Uint8Array(1);
    const bytes2 = new Uint8Array(index_js_1.Bytes.fromString(value).byteLength + 2);
    let offset = 0;
    const list = value.split(".");
    for (let i = 0; i < list.length; i++) {
      let encoded = index_js_1.Bytes.fromString(list[i]);
      if (encoded.byteLength > 255)
        encoded = index_js_1.Bytes.fromString(wrapLabelhash(Ens2.labelhash(list[i])));
      bytes2[offset] = encoded.length;
      bytes2.set(encoded, offset + 1);
      offset += encoded.length + 1;
    }
    if (bytes2.byteLength !== offset + 1)
      return bytes2.slice(0, offset + 1);
    return bytes2;
  }
  function wrapLabelhash(hash2) {
    return `[${hash2.slice(2)}]`;
  }
  function unwrapLabelhash(label) {
    if (label.length !== 66)
      return null;
    if (label.indexOf("[") !== 0)
      return null;
    if (label.indexOf("]") !== 65)
      return null;
    const hash2 = `0x${label.slice(1, 65)}`;
    if (!Hex2.validate(hash2, { strict: true }))
      return null;
    return hash2;
  }
  return ens;
}
var hasRequiredEns;
function requireEns() {
  if (hasRequiredEns) return Ens;
  hasRequiredEns = 1;
  Object.defineProperty(Ens, "__esModule", { value: true });
  Ens.labelhash = labelhash;
  Ens.namehash = namehash;
  Ens.normalize = normalize;
  const ens_normalize_1 = requireDist();
  const Bytes2 = requireBytes$2();
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  const internal = requireEns$1();
  function labelhash(label) {
    const result = new Uint8Array(32).fill(0);
    if (!label)
      return Hex2.fromBytes(result);
    return internal.unwrapLabelhash(label) || Hash2.keccak256(Hex2.fromString(label));
  }
  function namehash(name) {
    let result = new Uint8Array(32).fill(0);
    if (!name)
      return Hex2.fromBytes(result);
    const labels = name.split(".");
    for (let i = labels.length - 1; i >= 0; i -= 1) {
      const hashFromEncodedLabel = internal.unwrapLabelhash(labels[i]);
      const hashed = hashFromEncodedLabel ? Bytes2.fromHex(hashFromEncodedLabel) : Hash2.keccak256(Bytes2.fromString(labels[i]), { as: "Bytes" });
      result = Hash2.keccak256(Bytes2.concat(result, hashed), { as: "Bytes" });
    }
    return Hex2.fromBytes(result);
  }
  function normalize(name) {
    return (0, ens_normalize_1.ens_normalize)(name);
  }
  return Ens;
}
var Fee = {};
var hasRequiredFee;
function requireFee() {
  if (hasRequiredFee) return Fee;
  hasRequiredFee = 1;
  Object.defineProperty(Fee, "__esModule", { value: true });
  return Fee;
}
var Filter = {};
var hasRequiredFilter;
function requireFilter() {
  if (hasRequiredFilter) return Filter;
  hasRequiredFilter = 1;
  Object.defineProperty(Filter, "__esModule", { value: true });
  Filter.fromRpc = fromRpc2;
  Filter.toRpc = toRpc2;
  const Hex2 = requireHex$2();
  function fromRpc2(filter) {
    const { fromBlock, toBlock } = filter;
    return {
      ...filter,
      ...fromBlock && {
        fromBlock: Hex2.validate(fromBlock, { strict: false }) ? BigInt(fromBlock) : fromBlock
      },
      ...toBlock && {
        toBlock: Hex2.validate(toBlock, { strict: false }) ? BigInt(toBlock) : toBlock
      }
    };
  }
  function toRpc2(filter) {
    const { address, topics, fromBlock, toBlock } = filter;
    return {
      ...address && { address },
      ...topics && { topics },
      ...typeof fromBlock !== "undefined" ? {
        fromBlock: typeof fromBlock === "bigint" ? Hex2.fromNumber(fromBlock) : fromBlock
      } : {},
      ...typeof toBlock !== "undefined" ? {
        toBlock: typeof toBlock === "bigint" ? Hex2.fromNumber(toBlock) : toBlock
      } : {}
    };
  }
  return Filter;
}
var HdKey = {};
var hdKey = {};
var Secp256k1$1 = {};
var entropy$1 = {};
var hasRequiredEntropy$1;
function requireEntropy$1() {
  if (hasRequiredEntropy$1) return entropy$1;
  hasRequiredEntropy$1 = 1;
  Object.defineProperty(entropy$1, "__esModule", { value: true });
  entropy$1.extraEntropy = void 0;
  entropy$1.setExtraEntropy = setExtraEntropy;
  entropy$1.extraEntropy = false;
  function setExtraEntropy(entropy2) {
    entropy$1.extraEntropy = entropy2;
  }
  return entropy$1;
}
var hasRequiredSecp256k1$1;
function requireSecp256k1$1() {
  if (hasRequiredSecp256k1$1) return Secp256k1$1;
  hasRequiredSecp256k1$1 = 1;
  Object.defineProperty(Secp256k1$1, "__esModule", { value: true });
  Secp256k1$1.noble = void 0;
  Secp256k1$1.createKeyPair = createKeyPair2;
  Secp256k1$1.getPublicKey = getPublicKey;
  Secp256k1$1.getSharedSecret = getSharedSecret;
  Secp256k1$1.randomPrivateKey = randomPrivateKey;
  Secp256k1$1.recoverAddress = recoverAddress2;
  Secp256k1$1.recoverPublicKey = recoverPublicKey2;
  Secp256k1$1.sign = sign2;
  Secp256k1$1.verify = verify2;
  const secp256k1_1 = /* @__PURE__ */ requireSecp256k1$2();
  const Address2 = requireAddress$1();
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  const Entropy = requireEntropy$1();
  const PublicKey2 = requirePublicKey$1();
  Secp256k1$1.noble = secp256k1_1.secp256k1;
  function createKeyPair2(options = {}) {
    const { as = "Hex" } = options;
    const privateKey = randomPrivateKey({ as });
    const publicKey = getPublicKey({ privateKey });
    return {
      privateKey,
      publicKey
    };
  }
  function getPublicKey(options) {
    const { privateKey } = options;
    const point = secp256k1_1.secp256k1.ProjectivePoint.fromPrivateKey(Hex2.from(privateKey).slice(2));
    return PublicKey2.from(point);
  }
  function getSharedSecret(options) {
    const { as = "Hex", privateKey, publicKey } = options;
    const point = secp256k1_1.secp256k1.ProjectivePoint.fromHex(PublicKey2.toHex(publicKey).slice(2));
    const sharedPoint = point.multiply(secp256k1_1.secp256k1.utils.normPrivateKeyToScalar(Hex2.from(privateKey).slice(2)));
    const sharedSecret = sharedPoint.toRawBytes(true);
    if (as === "Hex")
      return Hex2.fromBytes(sharedSecret);
    return sharedSecret;
  }
  function randomPrivateKey(options = {}) {
    const { as = "Hex" } = options;
    const bytes2 = secp256k1_1.secp256k1.utils.randomPrivateKey();
    if (as === "Hex")
      return Hex2.fromBytes(bytes2);
    return bytes2;
  }
  function recoverAddress2(options) {
    return Address2.fromPublicKey(recoverPublicKey2(options));
  }
  function recoverPublicKey2(options) {
    const { payload, signature } = options;
    const { r, s, yParity } = signature;
    const signature_ = new secp256k1_1.secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(yParity);
    const point = signature_.recoverPublicKey(Hex2.from(payload).substring(2));
    return PublicKey2.from(point);
  }
  function sign2(options) {
    const { extraEntropy = Entropy.extraEntropy, hash: hash2, payload, privateKey } = options;
    const { r, s, recovery } = secp256k1_1.secp256k1.sign(Bytes2.from(payload), Bytes2.from(privateKey), {
      extraEntropy: typeof extraEntropy === "boolean" ? extraEntropy : Hex2.from(extraEntropy).slice(2),
      lowS: true,
      ...hash2 ? { prehash: true } : {}
    });
    return {
      r,
      s,
      yParity: recovery
    };
  }
  function verify2(options) {
    const { address, hash: hash2, payload, publicKey, signature } = options;
    if (address)
      return Address2.isEqual(address, recoverAddress2({ payload, signature }));
    return secp256k1_1.secp256k1.verify(signature, Bytes2.from(payload), PublicKey2.toBytes(publicKey), ...hash2 ? [{ prehash: true, lowS: true }] : []);
  }
  return Secp256k1$1;
}
var hasRequiredHdKey$1;
function requireHdKey$1() {
  if (hasRequiredHdKey$1) return hdKey;
  hasRequiredHdKey$1 = 1;
  Object.defineProperty(hdKey, "__esModule", { value: true });
  hdKey.fromScure = fromScure;
  const Hex2 = requireHex$2();
  const Secp256k12 = requireSecp256k1$1();
  function fromScure(key) {
    return {
      derive: (path) => fromScure(key.derive(path)),
      depth: key.depth,
      identifier: Hex2.fromBytes(key.identifier),
      index: key.index,
      privateKey: Hex2.fromBytes(key.privateKey),
      privateExtendedKey: key.privateExtendedKey,
      publicKey: Secp256k12.getPublicKey({ privateKey: key.privateKey }),
      publicExtendedKey: key.publicExtendedKey,
      versions: key.versions
    };
  }
  return hdKey;
}
var hasRequiredHdKey;
function requireHdKey() {
  if (hasRequiredHdKey) return HdKey;
  hasRequiredHdKey = 1;
  Object.defineProperty(HdKey, "__esModule", { value: true });
  HdKey.fromExtendedKey = fromExtendedKey;
  HdKey.fromJson = fromJson;
  HdKey.fromSeed = fromSeed;
  HdKey.path = path;
  const bip32_1 = /* @__PURE__ */ requireLib();
  const Bytes2 = requireBytes$2();
  const internal = requireHdKey$1();
  function fromExtendedKey(extendedKey) {
    const key = bip32_1.HDKey.fromExtendedKey(extendedKey);
    return internal.fromScure(key);
  }
  function fromJson(json) {
    return internal.fromScure(bip32_1.HDKey.fromJSON(json));
  }
  function fromSeed(seed, options = {}) {
    const { versions } = options;
    const key = bip32_1.HDKey.fromMasterSeed(Bytes2.from(seed), versions);
    return internal.fromScure(key);
  }
  function path(options = {}) {
    const { account = 0, change = 0, index = 0 } = options;
    return `m/44'/60'/${account}'/${change}/${index}`;
  }
  return HdKey;
}
var Keystore = {};
var hasRequiredKeystore;
function requireKeystore() {
  if (hasRequiredKeystore) return Keystore;
  hasRequiredKeystore = 1;
  Object.defineProperty(Keystore, "__esModule", { value: true });
  Keystore.decrypt = decrypt;
  Keystore.encrypt = encrypt;
  Keystore.pbkdf2 = pbkdf2;
  Keystore.pbkdf2Async = pbkdf2Async;
  Keystore.scrypt = scrypt;
  Keystore.scryptAsync = scryptAsync;
  Keystore.toKey = toKey;
  Keystore.toKeyAsync = toKeyAsync;
  const aes_1 = /* @__PURE__ */ requireAes();
  const pbkdf2_1 = /* @__PURE__ */ requirePbkdf2();
  const scrypt_1 = /* @__PURE__ */ requireScrypt();
  const sha2_1 = /* @__PURE__ */ requireSha2();
  const Bytes2 = requireBytes$2();
  const Hash2 = requireHash$1();
  function decrypt(keystore, key, options = {}) {
    const { as = "Hex" } = options;
    const key_ = Bytes2.from(typeof key === "function" ? key() : key);
    const encKey = Bytes2.slice(key_, 0, 16);
    const macKey = Bytes2.slice(key_, 16, 32);
    const ciphertext = Bytes2.from(`0x${keystore.crypto.ciphertext}`);
    const mac = Hash2.keccak256(Bytes2.concat(macKey, ciphertext));
    if (!Bytes2.isEqual(mac, Bytes2.from(`0x${keystore.crypto.mac}`)))
      throw new Error("corrupt keystore");
    const data = (0, aes_1.ctr)(encKey, Bytes2.from(`0x${keystore.crypto.cipherparams.iv}`)).decrypt(ciphertext);
    if (as === "Hex")
      return Bytes2.toHex(data);
    return data;
  }
  function encrypt(privateKey, key, options) {
    const { id = crypto.randomUUID(), kdf, kdfparams, iv } = options;
    const key_ = Bytes2.from(typeof key === "function" ? key() : key);
    const value_ = Bytes2.from(privateKey);
    const encKey = Bytes2.slice(key_, 0, 16);
    const macKey = Bytes2.slice(key_, 16, 32);
    const ciphertext = (0, aes_1.ctr)(encKey, iv).encrypt(value_);
    const mac = Hash2.keccak256(Bytes2.concat(macKey, ciphertext));
    return {
      crypto: {
        cipher: "aes-128-ctr",
        ciphertext: Bytes2.toHex(ciphertext).slice(2),
        cipherparams: { iv: Bytes2.toHex(iv).slice(2) },
        kdf,
        kdfparams,
        mac: Bytes2.toHex(mac).slice(2)
      },
      id,
      version: 3
    };
  }
  function pbkdf2(options) {
    const { iv, iterations = 262144, password } = options;
    const salt = options.salt ? Bytes2.from(options.salt) : Bytes2.random(32);
    const key = Bytes2.toHex((0, pbkdf2_1.pbkdf2)(sha2_1.sha256, password, salt, { c: iterations, dkLen: 32 }));
    return defineKey(() => key, {
      iv,
      kdfparams: {
        c: iterations,
        dklen: 32,
        prf: "hmac-sha256",
        salt: Bytes2.toHex(salt).slice(2)
      },
      kdf: "pbkdf2"
    });
  }
  async function pbkdf2Async(options) {
    const { iv, iterations = 262144, password } = options;
    const salt = options.salt ? Bytes2.from(options.salt) : Bytes2.random(32);
    const key = Bytes2.toHex(await (0, pbkdf2_1.pbkdf2Async)(sha2_1.sha256, password, salt, {
      c: iterations,
      dkLen: 32
    }));
    return defineKey(() => key, {
      iv,
      kdfparams: {
        c: iterations,
        dklen: 32,
        prf: "hmac-sha256",
        salt: Bytes2.toHex(salt).slice(2)
      },
      kdf: "pbkdf2"
    });
  }
  function scrypt(options) {
    const { iv, n = 262144, password, p = 8, r = 1 } = options;
    const salt = options.salt ? Bytes2.from(options.salt) : Bytes2.random(32);
    const key = Bytes2.toHex((0, scrypt_1.scrypt)(password, salt, { N: n, dkLen: 32, r, p }));
    return defineKey(() => key, {
      iv,
      kdfparams: {
        dklen: 32,
        n,
        p,
        r,
        salt: Bytes2.toHex(salt).slice(2)
      },
      kdf: "scrypt"
    });
  }
  async function scryptAsync(options) {
    const { iv, n = 262144, password } = options;
    const p = 8;
    const r = 1;
    const salt = options.salt ? Bytes2.from(options.salt) : Bytes2.random(32);
    const key = Bytes2.toHex(await (0, scrypt_1.scryptAsync)(password, salt, { N: n, dkLen: 32, r, p }));
    return defineKey(() => key, {
      iv,
      kdfparams: {
        dklen: 32,
        n,
        p,
        r,
        salt: Bytes2.toHex(salt).slice(2)
      },
      kdf: "scrypt"
    });
  }
  function toKey(keystore, options) {
    const { crypto: crypto2 } = keystore;
    const { password } = options;
    const { cipherparams, kdf, kdfparams } = crypto2;
    const { iv } = cipherparams;
    const { c, n, p, r, salt } = kdfparams;
    const [key] = (() => {
      switch (kdf) {
        case "scrypt":
          return scrypt({
            iv: Bytes2.from(`0x${iv}`),
            n,
            p,
            r,
            salt: Bytes2.from(`0x${salt}`),
            password
          });
        case "pbkdf2":
          return pbkdf2({
            iv: Bytes2.from(`0x${iv}`),
            iterations: c,
            password,
            salt: Bytes2.from(`0x${salt}`)
          });
        default:
          throw new Error("unsupported kdf");
      }
    })();
    return key;
  }
  async function toKeyAsync(keystore, options) {
    const { crypto: crypto2 } = keystore;
    const { password } = options;
    const { cipherparams, kdf, kdfparams } = crypto2;
    const { iv } = cipherparams;
    const { c, n, p, r, salt } = kdfparams;
    const [key] = await (async () => {
      switch (kdf) {
        case "scrypt":
          return await scryptAsync({
            iv: Bytes2.from(`0x${iv}`),
            n,
            salt: Bytes2.from(`0x${salt}`),
            password
          });
        case "pbkdf2":
          return await pbkdf2({
            iv: Bytes2.from(`0x${iv}`),
            iterations: c,
            password,
            salt: Bytes2.from(`0x${salt}`)
          });
        default:
          throw new Error("unsupported kdf");
      }
    })();
    return key;
  }
  function defineKey(key, options) {
    const iv = options.iv ? Bytes2.from(options.iv) : Bytes2.random(16);
    return [key, { ...options, iv }];
  }
  return Keystore;
}
var Log = {};
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog) return Log;
  hasRequiredLog = 1;
  Object.defineProperty(Log, "__esModule", { value: true });
  Log.fromRpc = fromRpc2;
  Log.toRpc = toRpc2;
  const Hex2 = requireHex$2();
  function fromRpc2(log, _options = {}) {
    return {
      ...log,
      blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
      logIndex: log.logIndex ? Number(log.logIndex) : null,
      transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null
    };
  }
  function toRpc2(log, _options = {}) {
    return {
      address: log.address,
      blockHash: log.blockHash,
      blockNumber: typeof log.blockNumber === "bigint" ? Hex2.fromNumber(log.blockNumber) : null,
      data: log.data,
      logIndex: typeof log.logIndex === "number" ? Hex2.fromNumber(log.logIndex) : null,
      topics: log.topics,
      transactionHash: log.transactionHash,
      transactionIndex: typeof log.transactionIndex === "number" ? Hex2.fromNumber(log.transactionIndex) : null,
      removed: log.removed
    };
  }
  return Log;
}
var Mnemonic = {};
var wordlists = {};
var hasRequiredWordlists;
function requireWordlists() {
  if (hasRequiredWordlists) return wordlists;
  hasRequiredWordlists = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.traditionalChinese = exports.spanish = exports.simplifiedChinese = exports.portuguese = exports.korean = exports.japanese = exports.italian = exports.french = exports.english = exports.czech = void 0;
    var czech_1 = /* @__PURE__ */ requireCzech();
    Object.defineProperty(exports, "czech", { enumerable: true, get: function() {
      return czech_1.wordlist;
    } });
    var english_1 = /* @__PURE__ */ requireEnglish();
    Object.defineProperty(exports, "english", { enumerable: true, get: function() {
      return english_1.wordlist;
    } });
    var french_1 = /* @__PURE__ */ requireFrench();
    Object.defineProperty(exports, "french", { enumerable: true, get: function() {
      return french_1.wordlist;
    } });
    var italian_1 = /* @__PURE__ */ requireItalian();
    Object.defineProperty(exports, "italian", { enumerable: true, get: function() {
      return italian_1.wordlist;
    } });
    var japanese_1 = /* @__PURE__ */ requireJapanese();
    Object.defineProperty(exports, "japanese", { enumerable: true, get: function() {
      return japanese_1.wordlist;
    } });
    var korean_1 = /* @__PURE__ */ requireKorean();
    Object.defineProperty(exports, "korean", { enumerable: true, get: function() {
      return korean_1.wordlist;
    } });
    var portuguese_1 = /* @__PURE__ */ requirePortuguese();
    Object.defineProperty(exports, "portuguese", { enumerable: true, get: function() {
      return portuguese_1.wordlist;
    } });
    var simplified_chinese_1 = /* @__PURE__ */ requireSimplifiedChinese();
    Object.defineProperty(exports, "simplifiedChinese", { enumerable: true, get: function() {
      return simplified_chinese_1.wordlist;
    } });
    var spanish_1 = /* @__PURE__ */ requireSpanish();
    Object.defineProperty(exports, "spanish", { enumerable: true, get: function() {
      return spanish_1.wordlist;
    } });
    var traditional_chinese_1 = /* @__PURE__ */ requireTraditionalChinese();
    Object.defineProperty(exports, "traditionalChinese", { enumerable: true, get: function() {
      return traditional_chinese_1.wordlist;
    } });
  })(wordlists);
  return wordlists;
}
var hasRequiredMnemonic;
function requireMnemonic() {
  if (hasRequiredMnemonic) return Mnemonic;
  hasRequiredMnemonic = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.traditionalChinese = exports.spanish = exports.simplifiedChinese = exports.portuguese = exports.korean = exports.japanese = exports.italian = exports.french = exports.english = exports.czech = exports.path = void 0;
    exports.random = random2;
    exports.toHdKey = toHdKey;
    exports.toPrivateKey = toPrivateKey;
    exports.toSeed = toSeed;
    exports.validate = validate2;
    const bip39_1 = /* @__PURE__ */ requireBip39();
    const Bytes2 = requireBytes$2();
    const HdKey2 = requireHdKey();
    var HdKey_js_1 = requireHdKey();
    Object.defineProperty(exports, "path", { enumerable: true, get: function() {
      return HdKey_js_1.path;
    } });
    var wordlists_js_1 = requireWordlists();
    Object.defineProperty(exports, "czech", { enumerable: true, get: function() {
      return wordlists_js_1.czech;
    } });
    Object.defineProperty(exports, "english", { enumerable: true, get: function() {
      return wordlists_js_1.english;
    } });
    Object.defineProperty(exports, "french", { enumerable: true, get: function() {
      return wordlists_js_1.french;
    } });
    Object.defineProperty(exports, "italian", { enumerable: true, get: function() {
      return wordlists_js_1.italian;
    } });
    Object.defineProperty(exports, "japanese", { enumerable: true, get: function() {
      return wordlists_js_1.japanese;
    } });
    Object.defineProperty(exports, "korean", { enumerable: true, get: function() {
      return wordlists_js_1.korean;
    } });
    Object.defineProperty(exports, "portuguese", { enumerable: true, get: function() {
      return wordlists_js_1.portuguese;
    } });
    Object.defineProperty(exports, "simplifiedChinese", { enumerable: true, get: function() {
      return wordlists_js_1.simplifiedChinese;
    } });
    Object.defineProperty(exports, "spanish", { enumerable: true, get: function() {
      return wordlists_js_1.spanish;
    } });
    Object.defineProperty(exports, "traditionalChinese", { enumerable: true, get: function() {
      return wordlists_js_1.traditionalChinese;
    } });
    function random2(wordlist, options = {}) {
      const { strength = 128 } = options;
      return (0, bip39_1.generateMnemonic)(wordlist, strength);
    }
    function toHdKey(mnemonic, options = {}) {
      const { passphrase } = options;
      const seed = toSeed(mnemonic, { passphrase });
      return HdKey2.fromSeed(seed);
    }
    function toPrivateKey(mnemonic, options = {}) {
      const { path = HdKey2.path(), passphrase } = options;
      const hdKey2 = toHdKey(mnemonic, { passphrase }).derive(path);
      if (options.as === "Bytes")
        return Bytes2.from(hdKey2.privateKey);
      return hdKey2.privateKey;
    }
    function toSeed(mnemonic, options = {}) {
      const { passphrase } = options;
      const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic, passphrase);
      if (options.as === "Hex")
        return Bytes2.toHex(seed);
      return seed;
    }
    function validate2(mnemonic, wordlist) {
      return (0, bip39_1.validateMnemonic)(mnemonic, wordlist);
    }
  })(Mnemonic);
  return Mnemonic;
}
var P256 = {};
var hasRequiredP256;
function requireP256() {
  if (hasRequiredP256) return P256;
  hasRequiredP256 = 1;
  Object.defineProperty(P256, "__esModule", { value: true });
  P256.noble = void 0;
  P256.createKeyPair = createKeyPair2;
  P256.getPublicKey = getPublicKey;
  P256.getSharedSecret = getSharedSecret;
  P256.randomPrivateKey = randomPrivateKey;
  P256.recoverPublicKey = recoverPublicKey2;
  P256.sign = sign2;
  P256.verify = verify2;
  const p256_1 = /* @__PURE__ */ requireP256$1();
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  const Entropy = requireEntropy$1();
  const PublicKey2 = requirePublicKey$1();
  P256.noble = p256_1.secp256r1;
  function createKeyPair2(options = {}) {
    const { as = "Hex" } = options;
    const privateKey = randomPrivateKey({ as });
    const publicKey = getPublicKey({ privateKey });
    return {
      privateKey,
      publicKey
    };
  }
  function getPublicKey(options) {
    const { privateKey } = options;
    const point = p256_1.secp256r1.ProjectivePoint.fromPrivateKey(typeof privateKey === "string" ? privateKey.slice(2) : Hex2.fromBytes(privateKey).slice(2));
    return PublicKey2.from(point);
  }
  function getSharedSecret(options) {
    const { as = "Hex", privateKey, publicKey } = options;
    const point = p256_1.secp256r1.ProjectivePoint.fromHex(PublicKey2.toHex(publicKey).slice(2));
    const privateKeyHex = typeof privateKey === "string" ? privateKey.slice(2) : Hex2.fromBytes(privateKey).slice(2);
    const sharedPoint = point.multiply(p256_1.secp256r1.utils.normPrivateKeyToScalar(privateKeyHex));
    const sharedSecret = sharedPoint.toRawBytes(true);
    if (as === "Hex")
      return Hex2.fromBytes(sharedSecret);
    return sharedSecret;
  }
  function randomPrivateKey(options = {}) {
    const { as = "Hex" } = options;
    const bytes2 = p256_1.secp256r1.utils.randomPrivateKey();
    if (as === "Hex")
      return Hex2.fromBytes(bytes2);
    return bytes2;
  }
  function recoverPublicKey2(options) {
    const { payload, signature } = options;
    const { r, s, yParity } = signature;
    const signature_ = new p256_1.secp256r1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(yParity);
    const payload_ = payload instanceof Uint8Array ? Hex2.fromBytes(payload) : payload;
    const point = signature_.recoverPublicKey(payload_.substring(2));
    return PublicKey2.from(point);
  }
  function sign2(options) {
    const { extraEntropy = Entropy.extraEntropy, hash: hash2, payload, privateKey } = options;
    const { r, s, recovery } = p256_1.secp256r1.sign(payload instanceof Uint8Array ? payload : Bytes2.fromHex(payload), privateKey instanceof Uint8Array ? privateKey : Bytes2.fromHex(privateKey), {
      extraEntropy: typeof extraEntropy === "boolean" ? extraEntropy : Hex2.from(extraEntropy).slice(2),
      lowS: true,
      ...hash2 ? { prehash: true } : {}
    });
    return {
      r,
      s,
      yParity: recovery
    };
  }
  function verify2(options) {
    const { hash: hash2, payload, publicKey, signature } = options;
    return p256_1.secp256r1.verify(signature, payload instanceof Uint8Array ? payload : Bytes2.fromHex(payload), PublicKey2.toHex(publicKey).substring(2), ...hash2 ? [{ prehash: true, lowS: true }] : []);
  }
  return P256;
}
var PersonalMessage = {};
var hasRequiredPersonalMessage;
function requirePersonalMessage() {
  if (hasRequiredPersonalMessage) return PersonalMessage;
  hasRequiredPersonalMessage = 1;
  Object.defineProperty(PersonalMessage, "__esModule", { value: true });
  PersonalMessage.encode = encode2;
  PersonalMessage.getSignPayload = getSignPayload2;
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  function encode2(data) {
    const message = Hex2.from(data);
    return Hex2.concat("0x19", Hex2.fromString("Ethereum Signed Message:\n" + Hex2.size(message)), message);
  }
  function getSignPayload2(data) {
    return Hash2.keccak256(encode2(data));
  }
  return PersonalMessage;
}
var Provider = {};
var RpcResponse = {};
var hasRequiredRpcResponse;
function requireRpcResponse() {
  if (hasRequiredRpcResponse) return RpcResponse;
  hasRequiredRpcResponse = 1;
  Object.defineProperty(RpcResponse, "__esModule", { value: true });
  RpcResponse.ParseError = RpcResponse.InternalError = RpcResponse.InvalidParamsError = RpcResponse.MethodNotFoundError = RpcResponse.InvalidRequestError = RpcResponse.VersionNotSupportedError = RpcResponse.LimitExceededError = RpcResponse.MethodNotSupportedError = RpcResponse.TransactionRejectedError = RpcResponse.ResourceUnavailableError = RpcResponse.ResourceNotFoundError = RpcResponse.InvalidInputError = RpcResponse.BaseError = void 0;
  RpcResponse.from = from2;
  RpcResponse.parse = parse2;
  RpcResponse.parseError = parseError;
  function from2(response, options = {}) {
    const { request } = options;
    return {
      ...response,
      id: response.id ?? request?.id,
      jsonrpc: response.jsonrpc ?? request.jsonrpc
    };
  }
  function parse2(response, options = {}) {
    const { raw = false } = options;
    const response_ = response;
    if (raw)
      return response;
    if (response_.error)
      throw parseError(response_.error);
    return response_.result;
  }
  function parseError(error) {
    const error_ = error;
    if (error_ instanceof Error && !("code" in error_))
      return new InternalError({
        cause: error_,
        data: error_,
        message: error_.message,
        stack: error_.stack
      });
    const { code } = error_;
    if (code === InternalError.code)
      return new InternalError(error_);
    if (code === InvalidInputError2.code)
      return new InvalidInputError2(error_);
    if (code === InvalidParamsError.code)
      return new InvalidParamsError(error_);
    if (code === InvalidRequestError.code)
      return new InvalidRequestError(error_);
    if (code === LimitExceededError.code)
      return new LimitExceededError(error_);
    if (code === MethodNotFoundError.code)
      return new MethodNotFoundError(error_);
    if (code === MethodNotSupportedError.code)
      return new MethodNotSupportedError(error_);
    if (code === ParseError.code)
      return new ParseError(error_);
    if (code === ResourceNotFoundError.code)
      return new ResourceNotFoundError(error_);
    if (code === ResourceUnavailableError.code)
      return new ResourceUnavailableError(error_);
    if (code === TransactionRejectedError.code)
      return new TransactionRejectedError(error_);
    if (code === VersionNotSupportedError.code)
      return new VersionNotSupportedError(error_);
    return new InternalError({
      cause: error_ instanceof Error ? error_ : void 0,
      data: error_,
      message: error_.message,
      stack: error_ instanceof Error ? error_.stack : void 0
    });
  }
  class BaseError3 extends Error {
    constructor(errorObject) {
      const { cause, code, message, data, stack } = errorObject;
      super(message, { cause });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.BaseError"
      });
      Object.defineProperty(this, "cause", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "stack", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "data", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.cause = cause;
      this.code = code;
      this.data = data;
      this.stack = stack ?? "";
    }
  }
  RpcResponse.BaseError = BaseError3;
  class InvalidInputError2 extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: InvalidInputError2.code,
        data: parameters.data,
        message: parameters.message ?? "Missing or invalid parameters."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32e3
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.InvalidInputError"
      });
    }
  }
  RpcResponse.InvalidInputError = InvalidInputError2;
  Object.defineProperty(InvalidInputError2, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32e3
  });
  class ResourceNotFoundError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: ResourceNotFoundError.code,
        data: parameters.data,
        message: parameters.message ?? "Requested resource not found."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32001
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.ResourceNotFoundError"
      });
    }
  }
  RpcResponse.ResourceNotFoundError = ResourceNotFoundError;
  Object.defineProperty(ResourceNotFoundError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32001
  });
  class ResourceUnavailableError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: ResourceUnavailableError.code,
        data: parameters.data,
        message: parameters.message ?? "Requested resource not available."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32002
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.ResourceUnavailableError"
      });
    }
  }
  RpcResponse.ResourceUnavailableError = ResourceUnavailableError;
  Object.defineProperty(ResourceUnavailableError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32002
  });
  class TransactionRejectedError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: TransactionRejectedError.code,
        data: parameters.data,
        message: parameters.message ?? "Transaction creation failed."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32003
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.TransactionRejectedError"
      });
    }
  }
  RpcResponse.TransactionRejectedError = TransactionRejectedError;
  Object.defineProperty(TransactionRejectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32003
  });
  class MethodNotSupportedError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: MethodNotSupportedError.code,
        data: parameters.data,
        message: parameters.message ?? "Method is not implemented."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32004
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.MethodNotSupportedError"
      });
    }
  }
  RpcResponse.MethodNotSupportedError = MethodNotSupportedError;
  Object.defineProperty(MethodNotSupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32004
  });
  class LimitExceededError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: LimitExceededError.code,
        data: parameters.data,
        message: parameters.message ?? "Rate limit exceeded."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32005
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.LimitExceededError"
      });
    }
  }
  RpcResponse.LimitExceededError = LimitExceededError;
  Object.defineProperty(LimitExceededError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32005
  });
  class VersionNotSupportedError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: VersionNotSupportedError.code,
        data: parameters.data,
        message: parameters.message ?? "JSON-RPC version not supported."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32006
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.VersionNotSupportedError"
      });
    }
  }
  RpcResponse.VersionNotSupportedError = VersionNotSupportedError;
  Object.defineProperty(VersionNotSupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32006
  });
  class InvalidRequestError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: InvalidRequestError.code,
        data: parameters.data,
        message: parameters.message ?? "Input is not a valid JSON-RPC request."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32600
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.InvalidRequestError"
      });
    }
  }
  RpcResponse.InvalidRequestError = InvalidRequestError;
  Object.defineProperty(InvalidRequestError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32600
  });
  class MethodNotFoundError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: MethodNotFoundError.code,
        data: parameters.data,
        message: parameters.message ?? "Method does not exist."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32601
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.MethodNotFoundError"
      });
    }
  }
  RpcResponse.MethodNotFoundError = MethodNotFoundError;
  Object.defineProperty(MethodNotFoundError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32601
  });
  class InvalidParamsError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: InvalidParamsError.code,
        data: parameters.data,
        message: parameters.message ?? "Invalid method parameters."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32602
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.InvalidParamsError"
      });
    }
  }
  RpcResponse.InvalidParamsError = InvalidParamsError;
  Object.defineProperty(InvalidParamsError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
  });
  class InternalError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        cause: parameters.cause,
        code: InternalError.code,
        data: parameters.data,
        message: parameters.message ?? "Internal JSON-RPC error.",
        stack: parameters.stack
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32603
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.InternalError"
      });
    }
  }
  RpcResponse.InternalError = InternalError;
  Object.defineProperty(InternalError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32603
  });
  class ParseError extends BaseError3 {
    constructor(parameters = {}) {
      super({
        code: ParseError.code,
        data: parameters.data,
        message: parameters.message ?? "Failed to parse JSON-RPC response."
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32700
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcResponse.ParseError"
      });
    }
  }
  RpcResponse.ParseError = ParseError;
  Object.defineProperty(ParseError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32700
  });
  return RpcResponse;
}
var hasRequiredProvider;
function requireProvider() {
  if (hasRequiredProvider) return Provider;
  hasRequiredProvider = 1;
  Object.defineProperty(Provider, "__esModule", { value: true });
  Provider.IsUndefinedError = Provider.AtomicityNotSupportedError = Provider.AtomicReadyWalletRejectedUpgradeError = Provider.BundleTooLargeError = Provider.UnknownBundleIdError = Provider.DuplicateIdError = Provider.UnsupportedChainIdError = Provider.UnsupportedNonOptionalCapabilityError = Provider.SwitchChainError = Provider.ChainDisconnectedError = Provider.DisconnectedError = Provider.UnsupportedMethodError = Provider.UnauthorizedError = Provider.UserRejectedRequestError = Provider.ProviderRpcError = void 0;
  Provider.createEmitter = createEmitter;
  Provider.from = from2;
  Provider.parseError = parseError;
  const eventemitter3_1 = requireEventemitter3();
  const Errors2 = requireErrors$2();
  const RpcResponse2 = requireRpcResponse();
  class ProviderRpcError extends Error {
    constructor(code, message) {
      super(message);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "ProviderRpcError"
      });
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "details", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.code = code;
      this.details = message;
    }
  }
  Provider.ProviderRpcError = ProviderRpcError;
  class UserRejectedRequestError extends ProviderRpcError {
    constructor({ message = "The user rejected the request." } = {}) {
      super(4001, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4001
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.UserRejectedRequestError"
      });
    }
  }
  Provider.UserRejectedRequestError = UserRejectedRequestError;
  Object.defineProperty(UserRejectedRequestError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4001
  });
  class UnauthorizedError extends ProviderRpcError {
    constructor({ message = "The requested method and/or account has not been authorized by the user." } = {}) {
      super(4100, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4100
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.UnauthorizedError"
      });
    }
  }
  Provider.UnauthorizedError = UnauthorizedError;
  Object.defineProperty(UnauthorizedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4100
  });
  class UnsupportedMethodError extends ProviderRpcError {
    constructor({ message = "The provider does not support the requested method." } = {}) {
      super(4200, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4200
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.UnsupportedMethodError"
      });
    }
  }
  Provider.UnsupportedMethodError = UnsupportedMethodError;
  Object.defineProperty(UnsupportedMethodError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4200
  });
  class DisconnectedError extends ProviderRpcError {
    constructor({ message = "The provider is disconnected from all chains." } = {}) {
      super(4900, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4900
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.DisconnectedError"
      });
    }
  }
  Provider.DisconnectedError = DisconnectedError;
  Object.defineProperty(DisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4900
  });
  class ChainDisconnectedError extends ProviderRpcError {
    constructor({ message = "The provider is not connected to the requested chain." } = {}) {
      super(4901, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4901
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.ChainDisconnectedError"
      });
    }
  }
  Provider.ChainDisconnectedError = ChainDisconnectedError;
  Object.defineProperty(ChainDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4901
  });
  class SwitchChainError extends ProviderRpcError {
    constructor({ message = "An error occurred when attempting to switch chain." } = {}) {
      super(4902, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4902
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.SwitchChainError"
      });
    }
  }
  Provider.SwitchChainError = SwitchChainError;
  Object.defineProperty(SwitchChainError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4902
  });
  class UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
    constructor({ message = "This Wallet does not support a capability that was not marked as optional." } = {}) {
      super(5700, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5700
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.UnsupportedNonOptionalCapabilityError"
      });
    }
  }
  Provider.UnsupportedNonOptionalCapabilityError = UnsupportedNonOptionalCapabilityError;
  Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5700
  });
  class UnsupportedChainIdError extends ProviderRpcError {
    constructor({ message = "This Wallet does not support the requested chain ID." } = {}) {
      super(5710, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5710
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.UnsupportedChainIdError"
      });
    }
  }
  Provider.UnsupportedChainIdError = UnsupportedChainIdError;
  Object.defineProperty(UnsupportedChainIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5710
  });
  class DuplicateIdError extends ProviderRpcError {
    constructor({ message = "There is already a bundle submitted with this ID." } = {}) {
      super(5720, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5720
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.DuplicateIdError"
      });
    }
  }
  Provider.DuplicateIdError = DuplicateIdError;
  Object.defineProperty(DuplicateIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5720
  });
  class UnknownBundleIdError extends ProviderRpcError {
    constructor({ message = "This bundle id is unknown / has not been submitted." } = {}) {
      super(5730, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5730
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.UnknownBundleIdError"
      });
    }
  }
  Provider.UnknownBundleIdError = UnknownBundleIdError;
  Object.defineProperty(UnknownBundleIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5730
  });
  class BundleTooLargeError extends ProviderRpcError {
    constructor({ message = "The call bundle is too large for the Wallet to process." } = {}) {
      super(5740, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5740
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.BundleTooLargeError"
      });
    }
  }
  Provider.BundleTooLargeError = BundleTooLargeError;
  Object.defineProperty(BundleTooLargeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5740
  });
  class AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
    constructor({ message = "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade." } = {}) {
      super(5750, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5750
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.AtomicReadyWalletRejectedUpgradeError"
      });
    }
  }
  Provider.AtomicReadyWalletRejectedUpgradeError = AtomicReadyWalletRejectedUpgradeError;
  Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5750
  });
  class AtomicityNotSupportedError extends ProviderRpcError {
    constructor({ message = "The wallet does not support atomic execution but the request requires it." } = {}) {
      super(5760, message);
      Object.defineProperty(this, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5760
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.AtomicityNotSupportedError"
      });
    }
  }
  Provider.AtomicityNotSupportedError = AtomicityNotSupportedError;
  Object.defineProperty(AtomicityNotSupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5760
  });
  function createEmitter() {
    const emitter = new eventemitter3_1.EventEmitter();
    return {
      get eventNames() {
        return emitter.eventNames.bind(emitter);
      },
      get listenerCount() {
        return emitter.listenerCount.bind(emitter);
      },
      get listeners() {
        return emitter.listeners.bind(emitter);
      },
      addListener: emitter.addListener.bind(emitter),
      emit: emitter.emit.bind(emitter),
      off: emitter.off.bind(emitter),
      on: emitter.on.bind(emitter),
      once: emitter.once.bind(emitter),
      removeAllListeners: emitter.removeAllListeners.bind(emitter),
      removeListener: emitter.removeListener.bind(emitter)
    };
  }
  function from2(provider, options = {}) {
    const { includeEvents = true } = options;
    if (!provider)
      throw new IsUndefinedError();
    return {
      ...includeEvents ? {
        on: provider.on?.bind(provider),
        removeListener: provider.removeListener?.bind(provider)
      } : {},
      async request(args) {
        try {
          const result = await provider.request(args);
          if (result && typeof result === "object" && "jsonrpc" in result)
            return RpcResponse2.parse(result);
          return result;
        } catch (error) {
          throw parseError(error);
        }
      }
    };
  }
  function parseError(error) {
    const error_ = RpcResponse2.parseError(error);
    if (error_ instanceof RpcResponse2.InternalError) {
      if (!error_.data)
        return error_;
      const { code } = error_.data;
      if (code === DisconnectedError.code)
        return new DisconnectedError(error_);
      if (code === ChainDisconnectedError.code)
        return new ChainDisconnectedError(error_);
      if (code === UserRejectedRequestError.code)
        return new UserRejectedRequestError(error_);
      if (code === UnauthorizedError.code)
        return new UnauthorizedError(error_);
      if (code === UnsupportedMethodError.code)
        return new UnsupportedMethodError(error_);
      if (code === SwitchChainError.code)
        return new SwitchChainError(error_);
      if (code === AtomicReadyWalletRejectedUpgradeError.code)
        return new AtomicReadyWalletRejectedUpgradeError(error_);
      if (code === AtomicityNotSupportedError.code)
        return new AtomicityNotSupportedError(error_);
      if (code === BundleTooLargeError.code)
        return new BundleTooLargeError(error_);
      if (code === UnknownBundleIdError.code)
        return new UnknownBundleIdError(error_);
      if (code === DuplicateIdError.code)
        return new DuplicateIdError(error_);
      if (code === UnsupportedChainIdError.code)
        return new UnsupportedChainIdError(error_);
      if (code === UnsupportedNonOptionalCapabilityError.code)
        return new UnsupportedNonOptionalCapabilityError(error_);
    }
    return error_;
  }
  class IsUndefinedError extends Errors2.BaseError {
    constructor() {
      super("`provider` is undefined.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Provider.IsUndefinedError"
      });
    }
  }
  Provider.IsUndefinedError = IsUndefinedError;
  return Provider;
}
var RpcRequest = {};
var hasRequiredRpcRequest;
function requireRpcRequest() {
  if (hasRequiredRpcRequest) return RpcRequest;
  hasRequiredRpcRequest = 1;
  Object.defineProperty(RpcRequest, "__esModule", { value: true });
  RpcRequest.createStore = createStore;
  RpcRequest.from = from2;
  function createStore(options = {}) {
    let id = options.id ?? 0;
    return {
      prepare(options2) {
        return from2({
          id: id++,
          ...options2
        });
      },
      get id() {
        return id;
      }
    };
  }
  function from2(options) {
    return {
      ...options,
      jsonrpc: "2.0"
    };
  }
  return RpcRequest;
}
var RpcSchema = {};
var hasRequiredRpcSchema;
function requireRpcSchema() {
  if (hasRequiredRpcSchema) return RpcSchema;
  hasRequiredRpcSchema = 1;
  Object.defineProperty(RpcSchema, "__esModule", { value: true });
  RpcSchema.from = from2;
  function from2() {
    return null;
  }
  return RpcSchema;
}
var RpcTransport = {};
var promise = {};
var hasRequiredPromise;
function requirePromise() {
  if (hasRequiredPromise) return promise;
  hasRequiredPromise = 1;
  Object.defineProperty(promise, "__esModule", { value: true });
  promise.TimeoutError = void 0;
  promise.withTimeout = withTimeout;
  const Errors2 = requireErrors$2();
  function withTimeout(fn, options) {
    const { errorInstance = new TimeoutError(), timeout, signal } = options;
    return new Promise((resolve2, reject) => {
      (async () => {
        let timeoutId;
        try {
          const controller = new AbortController();
          if (timeout > 0)
            timeoutId = setTimeout(() => {
              if (signal) {
                controller.abort();
              } else {
                reject(errorInstance);
              }
            }, timeout);
          resolve2(await fn({ signal: controller.signal }));
        } catch (err) {
          if (err?.name === "AbortError")
            reject(errorInstance);
          reject(err);
        } finally {
          clearTimeout(timeoutId);
        }
      })();
    });
  }
  class TimeoutError extends Errors2.BaseError {
    constructor() {
      super("Operation timed out.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Promise.TimeoutError"
      });
    }
  }
  promise.TimeoutError = TimeoutError;
  return promise;
}
var rpcTransport = {};
var hasRequiredRpcTransport$1;
function requireRpcTransport$1() {
  if (hasRequiredRpcTransport$1) return rpcTransport;
  hasRequiredRpcTransport$1 = 1;
  Object.defineProperty(rpcTransport, "__esModule", { value: true });
  rpcTransport.create = create2;
  const RpcRequest2 = requireRpcRequest();
  const RpcResponse2 = requireRpcResponse();
  function create2(transport, options_root) {
    const requestStore = RpcRequest2.createStore();
    return {
      request: async ({ method, params }, options = {}) => {
        const body = requestStore.prepare({ method, params });
        const data = await transport.request(body, options);
        return RpcResponse2.parse(data, {
          raw: options.raw ?? options_root?.raw
        });
      }
    };
  }
  return rpcTransport;
}
var hasRequiredRpcTransport;
function requireRpcTransport() {
  if (hasRequiredRpcTransport) return RpcTransport;
  hasRequiredRpcTransport = 1;
  Object.defineProperty(RpcTransport, "__esModule", { value: true });
  RpcTransport.MalformedResponseError = RpcTransport.HttpError = void 0;
  RpcTransport.fromHttp = fromHttp;
  const Errors2 = requireErrors$2();
  const errors_js_1 = requireErrors$3();
  const promise2 = requirePromise();
  const internal = requireRpcTransport$1();
  function fromHttp(url, options = {}) {
    return internal.create({
      async request(body_, options_) {
        const { fetchFn = options.fetchFn ?? fetch, fetchOptions: fetchOptions_ = options.fetchOptions, timeout = options.timeout ?? 1e4 } = options_;
        const body = JSON.stringify(body_);
        const fetchOptions = typeof fetchOptions_ === "function" ? await fetchOptions_(body_) : fetchOptions_;
        const response = await promise2.withTimeout(({ signal }) => {
          const init = {
            ...fetchOptions,
            body,
            headers: {
              "Content-Type": "application/json",
              ...fetchOptions?.headers
            },
            method: fetchOptions?.method ?? "POST",
            signal: fetchOptions?.signal ?? (timeout > 0 ? signal : null)
          };
          const request = new Request(url, init);
          return fetchFn(request);
        }, {
          timeout,
          signal: true
        });
        const data = await (async () => {
          if (response.headers.get("Content-Type")?.startsWith("application/json"))
            return response.json();
          return response.text().then((data2) => {
            try {
              return JSON.parse(data2 || "{}");
            } catch (_err) {
              if (response.ok)
                throw new MalformedResponseError({
                  response: data2
                });
              return { error: data2 };
            }
          });
        })();
        if (!response.ok)
          throw new HttpError({
            body,
            details: JSON.stringify(data.error) ?? response.statusText,
            response,
            url
          });
        return data;
      }
    }, { raw: options.raw });
  }
  class HttpError extends Errors2.BaseError {
    constructor({ body, details, response, url }) {
      super("HTTP request failed.", {
        details,
        metaMessages: [
          `Status: ${response.status}`,
          `URL: ${(0, errors_js_1.getUrl)(url)}`,
          body ? `Body: ${JSON.stringify(body)}` : void 0
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcTransport.HttpError"
      });
    }
  }
  RpcTransport.HttpError = HttpError;
  class MalformedResponseError extends Errors2.BaseError {
    constructor({ response }) {
      super("HTTP Response could not be parsed as JSON.", {
        metaMessages: [`Response: ${response}`]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "RpcTransport.MalformedResponseError"
      });
    }
  }
  RpcTransport.MalformedResponseError = MalformedResponseError;
  return RpcTransport;
}
var Siwe = {};
var uid = {};
var hasRequiredUid;
function requireUid() {
  if (hasRequiredUid) return uid;
  hasRequiredUid = 1;
  Object.defineProperty(uid, "__esModule", { value: true });
  uid.uid = uid$1;
  const size2 = 256;
  let index = size2;
  let buffer;
  function uid$1(length = 11) {
    if (!buffer || index + length > size2 * 2) {
      buffer = "";
      index = 0;
      for (let i = 0; i < size2; i++) {
        buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
      }
    }
    return buffer.substring(index, index++ + length);
  }
  return uid;
}
var hasRequiredSiwe;
function requireSiwe() {
  if (hasRequiredSiwe) return Siwe;
  hasRequiredSiwe = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidMessageFieldError = exports.suffixRegex = exports.prefixRegex = exports.schemeRegex = exports.nonceRegex = exports.localhostRegex = exports.ipRegex = exports.domainRegex = void 0;
    exports.createMessage = createMessage;
    exports.generateNonce = generateNonce;
    exports.isUri = isUri;
    exports.parseMessage = parseMessage;
    exports.validateMessage = validateMessage;
    const Address2 = requireAddress$1();
    const Errors2 = requireErrors$2();
    const uid_js_1 = requireUid();
    exports.domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?$/;
    exports.ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]{1,5})?$/;
    exports.localhostRegex = /^localhost(:[0-9]{1,5})?$/;
    exports.nonceRegex = /^[a-zA-Z0-9]{8,}$/;
    exports.schemeRegex = /^([a-zA-Z][a-zA-Z0-9+-.]*)$/;
    exports.prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
    exports.suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
    function createMessage(value) {
      const { chainId, domain, expirationTime, issuedAt = /* @__PURE__ */ new Date(), nonce, notBefore, requestId, resources, scheme, uri, version: version2 } = value;
      {
        if (chainId !== Math.floor(chainId))
          throw new InvalidMessageFieldError({
            field: "chainId",
            metaMessages: [
              "- Chain ID must be a EIP-155 chain ID.",
              "- See https://eips.ethereum.org/EIPS/eip-155",
              "",
              `Provided value: ${chainId}`
            ]
          });
        if (!(exports.domainRegex.test(domain) || exports.ipRegex.test(domain) || exports.localhostRegex.test(domain)))
          throw new InvalidMessageFieldError({
            field: "domain",
            metaMessages: [
              "- Domain must be an RFC 3986 authority.",
              "- See https://www.rfc-editor.org/rfc/rfc3986",
              "",
              `Provided value: ${domain}`
            ]
          });
        if (!exports.nonceRegex.test(nonce))
          throw new InvalidMessageFieldError({
            field: "nonce",
            metaMessages: [
              "- Nonce must be at least 8 characters.",
              "- Nonce must be alphanumeric.",
              "",
              `Provided value: ${nonce}`
            ]
          });
        if (!isUri(uri))
          throw new InvalidMessageFieldError({
            field: "uri",
            metaMessages: [
              "- URI must be a RFC 3986 URI referring to the resource that is the subject of the signing.",
              "- See https://www.rfc-editor.org/rfc/rfc3986",
              "",
              `Provided value: ${uri}`
            ]
          });
        if (version2 !== "1")
          throw new InvalidMessageFieldError({
            field: "version",
            metaMessages: [
              "- Version must be '1'.",
              "",
              `Provided value: ${version2}`
            ]
          });
        if (scheme && !exports.schemeRegex.test(scheme))
          throw new InvalidMessageFieldError({
            field: "scheme",
            metaMessages: [
              "- Scheme must be an RFC 3986 URI scheme.",
              "- See https://www.rfc-editor.org/rfc/rfc3986#section-3.1",
              "",
              `Provided value: ${scheme}`
            ]
          });
        const statement2 = value.statement;
        if (statement2?.includes("\n"))
          throw new InvalidMessageFieldError({
            field: "statement",
            metaMessages: [
              "- Statement must not include '\\n'.",
              "",
              `Provided value: ${statement2}`
            ]
          });
      }
      const address = Address2.from(value.address, { checksum: true });
      const origin = (() => {
        if (scheme)
          return `${scheme}://${domain}`;
        return domain;
      })();
      const statement = (() => {
        if (!value.statement)
          return "";
        return `${value.statement}
`;
      })();
      const prefix = `${origin} wants you to sign in with your Ethereum account:
${address}

${statement}`;
      let suffix = `URI: ${uri}
Version: ${version2}
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt.toISOString()}`;
      if (expirationTime)
        suffix += `
Expiration Time: ${expirationTime.toISOString()}`;
      if (notBefore)
        suffix += `
Not Before: ${notBefore.toISOString()}`;
      if (requestId)
        suffix += `
Request ID: ${requestId}`;
      if (resources) {
        let content = "\nResources:";
        for (const resource of resources) {
          if (!isUri(resource))
            throw new InvalidMessageFieldError({
              field: "resources",
              metaMessages: [
                "- Every resource must be a RFC 3986 URI.",
                "- See https://www.rfc-editor.org/rfc/rfc3986",
                "",
                `Provided value: ${resource}`
              ]
            });
          content += `
- ${resource}`;
        }
        suffix += content;
      }
      return `${prefix}
${suffix}`;
    }
    function generateNonce() {
      return (0, uid_js_1.uid)(96);
    }
    function isUri(value) {
      if (/[^a-z0-9:/?#[\]@!$&'()*+,;=.\-_~%]/i.test(value))
        return false;
      if (/%[^0-9a-f]/i.test(value))
        return false;
      if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value))
        return false;
      const splitted = splitUri(value);
      const scheme = splitted[1];
      const authority = splitted[2];
      const path = splitted[3];
      const query = splitted[4];
      const fragment = splitted[5];
      if (!(scheme?.length && path && path.length >= 0))
        return false;
      if (authority?.length) {
        if (!(path.length === 0 || /^\//.test(path)))
          return false;
      } else {
        if (/^\/\//.test(path))
          return false;
      }
      if (!/^[a-z][a-z0-9+\-.]*$/.test(scheme.toLowerCase()))
        return false;
      let out = "";
      out += `${scheme}:`;
      if (authority?.length)
        out += `//${authority}`;
      out += path;
      if (query?.length)
        out += `?${query}`;
      if (fragment?.length)
        out += `#${fragment}`;
      return out;
    }
    function splitUri(value) {
      return value.match(/(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
    }
    function parseMessage(message) {
      const { scheme, statement, ...prefix } = message.match(exports.prefixRegex)?.groups ?? {};
      const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = message.match(exports.suffixRegex)?.groups ?? {};
      const resources = message.split("Resources:")[1]?.split("\n- ").slice(1);
      return {
        ...prefix,
        ...suffix,
        ...chainId ? { chainId: Number(chainId) } : {},
        ...expirationTime ? { expirationTime: new Date(expirationTime) } : {},
        ...issuedAt ? { issuedAt: new Date(issuedAt) } : {},
        ...notBefore ? { notBefore: new Date(notBefore) } : {},
        ...requestId ? { requestId } : {},
        ...resources ? { resources } : {},
        ...scheme ? { scheme } : {},
        ...statement ? { statement } : {}
      };
    }
    function validateMessage(value) {
      const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = value;
      if (domain && message.domain !== domain)
        return false;
      if (nonce && message.nonce !== nonce)
        return false;
      if (scheme && message.scheme !== scheme)
        return false;
      if (message.expirationTime && time >= message.expirationTime)
        return false;
      if (message.notBefore && time < message.notBefore)
        return false;
      try {
        if (!message.address)
          return false;
        if (address && !Address2.isEqual(message.address, address))
          return false;
      } catch {
        return false;
      }
      return true;
    }
    class InvalidMessageFieldError extends Errors2.BaseError {
      constructor(parameters) {
        const { field, metaMessages } = parameters;
        super(`Invalid Sign-In with Ethereum message field "${field}".`, {
          metaMessages
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Siwe.InvalidMessageFieldError"
        });
      }
    }
    exports.InvalidMessageFieldError = InvalidMessageFieldError;
  })(Siwe);
  return Siwe;
}
var StateOverrides = {};
var hasRequiredStateOverrides;
function requireStateOverrides() {
  if (hasRequiredStateOverrides) return StateOverrides;
  hasRequiredStateOverrides = 1;
  Object.defineProperty(StateOverrides, "__esModule", { value: true });
  StateOverrides.fromRpc = fromRpc2;
  StateOverrides.toRpc = toRpc2;
  const Hex2 = requireHex$2();
  function fromRpc2(rpcStateOverrides) {
    const stateOverrides = {};
    for (const [address, accountOverridesRpc] of Object.entries(rpcStateOverrides)) {
      const accountOverrides = {};
      if (accountOverridesRpc.balance)
        accountOverrides.balance = BigInt(accountOverridesRpc.balance);
      if (accountOverridesRpc.code)
        accountOverrides.code = accountOverridesRpc.code;
      if (accountOverridesRpc.movePrecompileToAddress)
        accountOverrides.movePrecompileToAddress = accountOverridesRpc.movePrecompileToAddress;
      if (accountOverridesRpc.nonce)
        accountOverrides.nonce = BigInt(accountOverridesRpc.nonce);
      if (accountOverridesRpc.state)
        accountOverrides.state = accountOverridesRpc.state;
      if (accountOverridesRpc.stateDiff)
        accountOverrides.stateDiff = accountOverridesRpc.stateDiff;
      stateOverrides[address] = accountOverrides;
    }
    return stateOverrides;
  }
  function toRpc2(stateOverrides) {
    const rpcStateOverrides = {};
    for (const [address, accountOverrides] of Object.entries(stateOverrides)) {
      const accountOverridesRpc = {};
      if (typeof accountOverrides.balance === "bigint")
        accountOverridesRpc.balance = Hex2.fromNumber(accountOverrides.balance);
      if (accountOverrides.code)
        accountOverridesRpc.code = accountOverrides.code;
      if (accountOverrides.movePrecompileToAddress)
        accountOverridesRpc.movePrecompileToAddress = accountOverrides.movePrecompileToAddress;
      if (typeof accountOverrides.nonce === "bigint")
        accountOverridesRpc.nonce = Hex2.fromNumber(accountOverrides.nonce);
      if (accountOverrides.state)
        accountOverridesRpc.state = accountOverrides.state;
      if (accountOverrides.stateDiff)
        accountOverridesRpc.stateDiff = accountOverrides.stateDiff;
      rpcStateOverrides[address] = accountOverridesRpc;
    }
    return rpcStateOverrides;
  }
  return StateOverrides;
}
var TransactionEnvelope = {};
var Value = {};
var hasRequiredValue;
function requireValue() {
  if (hasRequiredValue) return Value;
  hasRequiredValue = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidDecimalNumberError = exports.exponents = void 0;
    exports.format = format2;
    exports.formatEther = formatEther;
    exports.formatGwei = formatGwei2;
    exports.from = from2;
    exports.fromEther = fromEther;
    exports.fromGwei = fromGwei;
    const Errors2 = requireErrors$2();
    exports.exponents = {
      wei: 0,
      gwei: 9,
      szabo: 12,
      finney: 15,
      ether: 18
    };
    function format2(value, decimals = 0) {
      let display = value.toString();
      const negative = display.startsWith("-");
      if (negative)
        display = display.slice(1);
      display = display.padStart(decimals, "0");
      let [integer, fraction] = [
        display.slice(0, display.length - decimals),
        display.slice(display.length - decimals)
      ];
      fraction = fraction.replace(/(0+)$/, "");
      return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
    }
    function formatEther(wei, unit = "wei") {
      return format2(wei, exports.exponents.ether - exports.exponents[unit]);
    }
    function formatGwei2(wei, unit = "wei") {
      return format2(wei, exports.exponents.gwei - exports.exponents[unit]);
    }
    function from2(value, decimals = 0) {
      if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value))
        throw new InvalidDecimalNumberError({ value });
      let [integer = "", fraction = "0"] = value.split(".");
      const negative = integer.startsWith("-");
      if (negative)
        integer = integer.slice(1);
      fraction = fraction.replace(/(0+)$/, "");
      if (decimals === 0) {
        if (Math.round(Number(`.${fraction}`)) === 1)
          integer = `${BigInt(integer) + 1n}`;
        fraction = "";
      } else if (fraction.length > decimals) {
        const [left, unit, right] = [
          fraction.slice(0, decimals - 1),
          fraction.slice(decimals - 1, decimals),
          fraction.slice(decimals)
        ];
        const rounded = Math.round(Number(`${unit}.${right}`));
        if (rounded > 9)
          fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
        else
          fraction = `${left}${rounded}`;
        if (fraction.length > decimals) {
          fraction = fraction.slice(1);
          integer = `${BigInt(integer) + 1n}`;
        }
        fraction = fraction.slice(0, decimals);
      } else {
        fraction = fraction.padEnd(decimals, "0");
      }
      return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
    }
    function fromEther(ether, unit = "wei") {
      return from2(ether, exports.exponents.ether - exports.exponents[unit]);
    }
    function fromGwei(gwei, unit = "wei") {
      return from2(gwei, exports.exponents.gwei - exports.exponents[unit]);
    }
    class InvalidDecimalNumberError extends Errors2.BaseError {
      constructor({ value }) {
        super(`Value \`${value}\` is not a valid decimal number.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Value.InvalidDecimalNumberError"
        });
      }
    }
    exports.InvalidDecimalNumberError = InvalidDecimalNumberError;
  })(Value);
  return Value;
}
var hasRequiredTransactionEnvelope;
function requireTransactionEnvelope() {
  if (hasRequiredTransactionEnvelope) return TransactionEnvelope;
  hasRequiredTransactionEnvelope = 1;
  Object.defineProperty(TransactionEnvelope, "__esModule", { value: true });
  TransactionEnvelope.TipAboveFeeCapError = TransactionEnvelope.InvalidSerializedError = TransactionEnvelope.InvalidChainIdError = TransactionEnvelope.GasPriceTooHighError = TransactionEnvelope.FeeCapTooHighError = void 0;
  const Errors2 = requireErrors$2();
  const Value2 = requireValue();
  class FeeCapTooHighError2 extends Errors2.BaseError {
    constructor({ feeCap } = {}) {
      super(`The fee cap (\`maxFeePerGas\`/\`maxPriorityFeePerGas\`${feeCap ? ` = ${Value2.formatGwei(feeCap)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TransactionEnvelope.FeeCapTooHighError"
      });
    }
  }
  TransactionEnvelope.FeeCapTooHighError = FeeCapTooHighError2;
  class GasPriceTooHighError extends Errors2.BaseError {
    constructor({ gasPrice } = {}) {
      super(`The gas price (\`gasPrice\`${gasPrice ? ` = ${Value2.formatGwei(gasPrice)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TransactionEnvelope.GasPriceTooHighError"
      });
    }
  }
  TransactionEnvelope.GasPriceTooHighError = GasPriceTooHighError;
  class InvalidChainIdError2 extends Errors2.BaseError {
    constructor({ chainId }) {
      super(typeof chainId !== "undefined" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TransactionEnvelope.InvalidChainIdError"
      });
    }
  }
  TransactionEnvelope.InvalidChainIdError = InvalidChainIdError2;
  class InvalidSerializedError3 extends Errors2.BaseError {
    constructor({ attributes, serialized, type: type2 }) {
      const missing = Object.entries(attributes).map(([key, value]) => typeof value === "undefined" ? key : void 0).filter(Boolean);
      super(`Invalid serialized transaction of type "${type2}" was provided.`, {
        metaMessages: [
          `Serialized Transaction: "${serialized}"`,
          missing.length > 0 ? `Missing Attributes: ${missing.join(", ")}` : ""
        ].filter(Boolean)
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TransactionEnvelope.InvalidSerializedError"
      });
    }
  }
  TransactionEnvelope.InvalidSerializedError = InvalidSerializedError3;
  class TipAboveFeeCapError2 extends Errors2.BaseError {
    constructor({ maxPriorityFeePerGas, maxFeePerGas } = {}) {
      super([
        `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${Value2.formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${Value2.formatGwei(maxFeePerGas)} gwei` : ""}).`
      ].join("\n"));
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TransactionEnvelope.TipAboveFeeCapError"
      });
    }
  }
  TransactionEnvelope.TipAboveFeeCapError = TipAboveFeeCapError2;
  return TransactionEnvelope;
}
var TransactionEnvelopeEip1559 = {};
var hasRequiredTransactionEnvelopeEip1559;
function requireTransactionEnvelopeEip1559() {
  if (hasRequiredTransactionEnvelopeEip1559) return TransactionEnvelopeEip1559;
  hasRequiredTransactionEnvelopeEip1559 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.type = exports.serializedType = void 0;
    exports.assert = assert2;
    exports.deserialize = deserialize2;
    exports.from = from2;
    exports.getSignPayload = getSignPayload2;
    exports.hash = hash2;
    exports.serialize = serialize2;
    exports.toRpc = toRpc2;
    exports.validate = validate2;
    const AccessList2 = requireAccessList();
    const Address2 = requireAddress$1();
    const Hash2 = requireHash$1();
    const Hex2 = requireHex$2();
    const Rlp2 = requireRlp$1();
    const Signature2 = requireSignature$1();
    const TransactionEnvelope2 = requireTransactionEnvelope();
    exports.serializedType = "0x02";
    exports.type = "eip1559";
    function assert2(envelope) {
      const { chainId, maxPriorityFeePerGas, maxFeePerGas, to: to2 } = envelope;
      if (chainId <= 0)
        throw new TransactionEnvelope2.InvalidChainIdError({ chainId });
      if (to2)
        Address2.assert(to2, { strict: false });
      if (maxFeePerGas && BigInt(maxFeePerGas) > 2n ** 256n - 1n)
        throw new TransactionEnvelope2.FeeCapTooHighError({ feeCap: maxFeePerGas });
      if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
        throw new TransactionEnvelope2.TipAboveFeeCapError({
          maxFeePerGas,
          maxPriorityFeePerGas
        });
    }
    function deserialize2(serialized) {
      const transactionArray = Rlp2.toHex(Hex2.slice(serialized, 1));
      const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to2, value, data, accessList, yParity, r, s] = transactionArray;
      if (!(transactionArray.length === 9 || transactionArray.length === 12))
        throw new TransactionEnvelope2.InvalidSerializedError({
          attributes: {
            chainId,
            nonce,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gas,
            to: to2,
            value,
            data,
            accessList,
            ...transactionArray.length > 9 ? {
              yParity,
              r,
              s
            } : {}
          },
          serialized,
          type: exports.type
        });
      let transaction = {
        chainId: Number(chainId),
        type: exports.type
      };
      if (Hex2.validate(to2) && to2 !== "0x")
        transaction.to = to2;
      if (Hex2.validate(gas) && gas !== "0x")
        transaction.gas = BigInt(gas);
      if (Hex2.validate(data) && data !== "0x")
        transaction.data = data;
      if (Hex2.validate(nonce))
        transaction.nonce = nonce === "0x" ? 0n : BigInt(nonce);
      if (Hex2.validate(value) && value !== "0x")
        transaction.value = BigInt(value);
      if (Hex2.validate(maxFeePerGas) && maxFeePerGas !== "0x")
        transaction.maxFeePerGas = BigInt(maxFeePerGas);
      if (Hex2.validate(maxPriorityFeePerGas) && maxPriorityFeePerGas !== "0x")
        transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
      if (accessList.length !== 0 && accessList !== "0x")
        transaction.accessList = AccessList2.fromTupleList(accessList);
      const signature = r && s && yParity ? Signature2.fromTuple([yParity, r, s]) : void 0;
      if (signature)
        transaction = {
          ...transaction,
          ...signature
        };
      assert2(transaction);
      return transaction;
    }
    function from2(envelope, options = {}) {
      const { signature } = options;
      const envelope_ = typeof envelope === "string" ? deserialize2(envelope) : envelope;
      assert2(envelope_);
      return {
        ...envelope_,
        ...signature ? Signature2.from(signature) : {},
        type: "eip1559"
      };
    }
    function getSignPayload2(envelope) {
      return hash2(envelope, { presign: true });
    }
    function hash2(envelope, options = {}) {
      const { presign } = options;
      return Hash2.keccak256(serialize2({
        ...envelope,
        ...presign ? {
          r: void 0,
          s: void 0,
          yParity: void 0,
          v: void 0
        } : {}
      }));
    }
    function serialize2(envelope, options = {}) {
      const { chainId, gas, nonce, to: to2, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, input } = envelope;
      assert2(envelope);
      const accessTupleList = AccessList2.toTupleList(accessList);
      const signature = Signature2.extract(options.signature || envelope);
      const serialized = [
        Hex2.fromNumber(chainId),
        nonce ? Hex2.fromNumber(nonce) : "0x",
        maxPriorityFeePerGas ? Hex2.fromNumber(maxPriorityFeePerGas) : "0x",
        maxFeePerGas ? Hex2.fromNumber(maxFeePerGas) : "0x",
        gas ? Hex2.fromNumber(gas) : "0x",
        to2 ?? "0x",
        value ? Hex2.fromNumber(value) : "0x",
        data ?? input ?? "0x",
        accessTupleList,
        ...signature ? Signature2.toTuple(signature) : []
      ];
      return Hex2.concat(exports.serializedType, Rlp2.fromHex(serialized));
    }
    function toRpc2(envelope) {
      const signature = Signature2.extract(envelope);
      return {
        ...envelope,
        chainId: Hex2.fromNumber(envelope.chainId),
        data: envelope.data ?? envelope.input,
        type: "0x2",
        ...typeof envelope.gas === "bigint" ? { gas: Hex2.fromNumber(envelope.gas) } : {},
        ...typeof envelope.nonce === "bigint" ? { nonce: Hex2.fromNumber(envelope.nonce) } : {},
        ...typeof envelope.value === "bigint" ? { value: Hex2.fromNumber(envelope.value) } : {},
        ...typeof envelope.maxFeePerGas === "bigint" ? { maxFeePerGas: Hex2.fromNumber(envelope.maxFeePerGas) } : {},
        ...typeof envelope.maxPriorityFeePerGas === "bigint" ? {
          maxPriorityFeePerGas: Hex2.fromNumber(envelope.maxPriorityFeePerGas)
        } : {},
        ...signature ? Signature2.toRpc(signature) : {}
      };
    }
    function validate2(envelope) {
      try {
        assert2(envelope);
        return true;
      } catch {
        return false;
      }
    }
  })(TransactionEnvelopeEip1559);
  return TransactionEnvelopeEip1559;
}
var TransactionEnvelopeEip2930 = {};
var hasRequiredTransactionEnvelopeEip2930;
function requireTransactionEnvelopeEip2930() {
  if (hasRequiredTransactionEnvelopeEip2930) return TransactionEnvelopeEip2930;
  hasRequiredTransactionEnvelopeEip2930 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.type = exports.serializedType = void 0;
    exports.assert = assert2;
    exports.deserialize = deserialize2;
    exports.from = from2;
    exports.getSignPayload = getSignPayload2;
    exports.hash = hash2;
    exports.serialize = serialize2;
    exports.toRpc = toRpc2;
    exports.validate = validate2;
    const AccessList2 = requireAccessList();
    const Address2 = requireAddress$1();
    const Hash2 = requireHash$1();
    const Hex2 = requireHex$2();
    const Rlp2 = requireRlp$1();
    const Signature2 = requireSignature$1();
    const TransactionEnvelope2 = requireTransactionEnvelope();
    exports.serializedType = "0x01";
    exports.type = "eip2930";
    function assert2(envelope) {
      const { chainId, gasPrice, to: to2 } = envelope;
      if (chainId <= 0)
        throw new TransactionEnvelope2.InvalidChainIdError({ chainId });
      if (to2)
        Address2.assert(to2, { strict: false });
      if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n)
        throw new TransactionEnvelope2.GasPriceTooHighError({ gasPrice });
    }
    function deserialize2(serialized) {
      const transactionArray = Rlp2.toHex(Hex2.slice(serialized, 1));
      const [chainId, nonce, gasPrice, gas, to2, value, data, accessList, yParity, r, s] = transactionArray;
      if (!(transactionArray.length === 8 || transactionArray.length === 11))
        throw new TransactionEnvelope2.InvalidSerializedError({
          attributes: {
            chainId,
            nonce,
            gasPrice,
            gas,
            to: to2,
            value,
            data,
            accessList,
            ...transactionArray.length > 8 ? {
              yParity,
              r,
              s
            } : {}
          },
          serialized,
          type: exports.type
        });
      let transaction = {
        chainId: Number(chainId),
        type: exports.type
      };
      if (Hex2.validate(to2) && to2 !== "0x")
        transaction.to = to2;
      if (Hex2.validate(gas) && gas !== "0x")
        transaction.gas = BigInt(gas);
      if (Hex2.validate(data) && data !== "0x")
        transaction.data = data;
      if (Hex2.validate(nonce))
        transaction.nonce = nonce === "0x" ? 0n : BigInt(nonce);
      if (Hex2.validate(value) && value !== "0x")
        transaction.value = BigInt(value);
      if (Hex2.validate(gasPrice) && gasPrice !== "0x")
        transaction.gasPrice = BigInt(gasPrice);
      if (accessList.length !== 0 && accessList !== "0x")
        transaction.accessList = AccessList2.fromTupleList(accessList);
      const signature = r && s && yParity ? Signature2.fromTuple([yParity, r, s]) : void 0;
      if (signature)
        transaction = {
          ...transaction,
          ...signature
        };
      assert2(transaction);
      return transaction;
    }
    function from2(envelope, options = {}) {
      const { signature } = options;
      const envelope_ = typeof envelope === "string" ? deserialize2(envelope) : envelope;
      assert2(envelope_);
      return {
        ...envelope_,
        ...signature ? Signature2.from(signature) : {},
        type: "eip2930"
      };
    }
    function getSignPayload2(envelope) {
      return hash2(envelope, { presign: true });
    }
    function hash2(envelope, options = {}) {
      const { presign } = options;
      return Hash2.keccak256(serialize2({
        ...envelope,
        ...presign ? {
          r: void 0,
          s: void 0,
          yParity: void 0,
          v: void 0
        } : {}
      }));
    }
    function serialize2(envelope, options = {}) {
      const { chainId, gas, data, input, nonce, to: to2, value, accessList, gasPrice } = envelope;
      assert2(envelope);
      const accessTupleList = AccessList2.toTupleList(accessList);
      const signature = Signature2.extract(options.signature || envelope);
      const serialized = [
        Hex2.fromNumber(chainId),
        nonce ? Hex2.fromNumber(nonce) : "0x",
        gasPrice ? Hex2.fromNumber(gasPrice) : "0x",
        gas ? Hex2.fromNumber(gas) : "0x",
        to2 ?? "0x",
        value ? Hex2.fromNumber(value) : "0x",
        data ?? input ?? "0x",
        accessTupleList,
        ...signature ? Signature2.toTuple(signature) : []
      ];
      return Hex2.concat("0x01", Rlp2.fromHex(serialized));
    }
    function toRpc2(envelope) {
      const signature = Signature2.extract(envelope);
      return {
        ...envelope,
        chainId: Hex2.fromNumber(envelope.chainId),
        data: envelope.data ?? envelope.input,
        ...typeof envelope.gas === "bigint" ? { gas: Hex2.fromNumber(envelope.gas) } : {},
        ...typeof envelope.nonce === "bigint" ? { nonce: Hex2.fromNumber(envelope.nonce) } : {},
        ...typeof envelope.value === "bigint" ? { value: Hex2.fromNumber(envelope.value) } : {},
        ...typeof envelope.gasPrice === "bigint" ? { gasPrice: Hex2.fromNumber(envelope.gasPrice) } : {},
        type: "0x1",
        ...signature ? Signature2.toRpc(signature) : {}
      };
    }
    function validate2(envelope) {
      try {
        assert2(envelope);
        return true;
      } catch {
        return false;
      }
    }
  })(TransactionEnvelopeEip2930);
  return TransactionEnvelopeEip2930;
}
var TransactionEnvelopeEip4844 = {};
var hasRequiredTransactionEnvelopeEip4844;
function requireTransactionEnvelopeEip4844() {
  if (hasRequiredTransactionEnvelopeEip4844) return TransactionEnvelopeEip4844;
  hasRequiredTransactionEnvelopeEip4844 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.type = exports.serializedType = void 0;
    exports.assert = assert2;
    exports.deserialize = deserialize2;
    exports.from = from2;
    exports.getSignPayload = getSignPayload2;
    exports.hash = hash2;
    exports.serialize = serialize2;
    exports.toRpc = toRpc2;
    exports.validate = validate2;
    const AccessList2 = requireAccessList();
    const Blobs2 = requireBlobs();
    const Hash2 = requireHash$1();
    const Hex2 = requireHex$2();
    const Kzg2 = requireKzg();
    const Rlp2 = requireRlp$1();
    const Signature2 = requireSignature$1();
    const TransactionEnvelope2 = requireTransactionEnvelope();
    const TransactionEnvelopeEip15592 = requireTransactionEnvelopeEip1559();
    exports.serializedType = "0x03";
    exports.type = "eip4844";
    function assert2(envelope) {
      const { blobVersionedHashes } = envelope;
      if (blobVersionedHashes) {
        if (blobVersionedHashes.length === 0)
          throw new Blobs2.EmptyBlobVersionedHashesError();
        for (const hash3 of blobVersionedHashes) {
          const size2 = Hex2.size(hash3);
          const version2 = Hex2.toNumber(Hex2.slice(hash3, 0, 1));
          if (size2 !== 32)
            throw new Blobs2.InvalidVersionedHashSizeError({ hash: hash3, size: size2 });
          if (version2 !== Kzg2.versionedHashVersion)
            throw new Blobs2.InvalidVersionedHashVersionError({
              hash: hash3,
              version: version2
            });
        }
      }
      TransactionEnvelopeEip15592.assert(envelope);
    }
    function deserialize2(serialized) {
      const transactionOrWrapperArray = Rlp2.toHex(Hex2.slice(serialized, 1));
      const hasNetworkWrapper = transactionOrWrapperArray.length === 4;
      const transactionArray = hasNetworkWrapper ? transactionOrWrapperArray[0] : transactionOrWrapperArray;
      const wrapperArray = hasNetworkWrapper ? transactionOrWrapperArray.slice(1) : [];
      const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to2, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, yParity, r, s] = transactionArray;
      const [blobs, commitments, proofs] = wrapperArray;
      if (!(transactionArray.length === 11 || transactionArray.length === 14))
        throw new TransactionEnvelope2.InvalidSerializedError({
          attributes: {
            chainId,
            nonce,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gas,
            to: to2,
            value,
            data,
            accessList,
            ...transactionArray.length > 9 ? {
              yParity,
              r,
              s
            } : {}
          },
          serialized,
          type: exports.type
        });
      let transaction = {
        blobVersionedHashes,
        chainId: Number(chainId),
        type: exports.type
      };
      if (Hex2.validate(to2) && to2 !== "0x")
        transaction.to = to2;
      if (Hex2.validate(gas) && gas !== "0x")
        transaction.gas = BigInt(gas);
      if (Hex2.validate(data) && data !== "0x")
        transaction.data = data;
      if (Hex2.validate(nonce))
        transaction.nonce = nonce === "0x" ? 0n : BigInt(nonce);
      if (Hex2.validate(value) && value !== "0x")
        transaction.value = BigInt(value);
      if (Hex2.validate(maxFeePerBlobGas) && maxFeePerBlobGas !== "0x")
        transaction.maxFeePerBlobGas = BigInt(maxFeePerBlobGas);
      if (Hex2.validate(maxFeePerGas) && maxFeePerGas !== "0x")
        transaction.maxFeePerGas = BigInt(maxFeePerGas);
      if (Hex2.validate(maxPriorityFeePerGas) && maxPriorityFeePerGas !== "0x")
        transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
      if (accessList?.length !== 0 && accessList !== "0x")
        transaction.accessList = AccessList2.fromTupleList(accessList);
      if (blobs && commitments && proofs)
        transaction.sidecars = Blobs2.toSidecars(blobs, {
          commitments,
          proofs
        });
      const signature = r && s && yParity ? Signature2.fromTuple([yParity, r, s]) : void 0;
      if (signature)
        transaction = {
          ...transaction,
          ...signature
        };
      assert2(transaction);
      return transaction;
    }
    function from2(envelope, options = {}) {
      const { signature } = options;
      const envelope_ = typeof envelope === "string" ? deserialize2(envelope) : envelope;
      assert2(envelope_);
      return {
        ...envelope_,
        ...signature ? Signature2.from(signature) : {},
        type: "eip4844"
      };
    }
    function getSignPayload2(envelope) {
      return hash2(envelope, { presign: true });
    }
    function hash2(envelope, options = {}) {
      const { presign } = options;
      return Hash2.keccak256(serialize2({
        ...envelope,
        ...presign ? {
          sidecars: void 0,
          r: void 0,
          s: void 0,
          yParity: void 0,
          v: void 0
        } : {}
      }));
    }
    function serialize2(envelope, options = {}) {
      const { blobVersionedHashes, chainId, gas, nonce, to: to2, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = envelope;
      assert2(envelope);
      const accessTupleList = AccessList2.toTupleList(accessList);
      const signature = Signature2.extract(options.signature || envelope);
      const serialized = [
        Hex2.fromNumber(chainId),
        nonce ? Hex2.fromNumber(nonce) : "0x",
        maxPriorityFeePerGas ? Hex2.fromNumber(maxPriorityFeePerGas) : "0x",
        maxFeePerGas ? Hex2.fromNumber(maxFeePerGas) : "0x",
        gas ? Hex2.fromNumber(gas) : "0x",
        to2 ?? "0x",
        value ? Hex2.fromNumber(value) : "0x",
        data ?? "0x",
        accessTupleList,
        maxFeePerBlobGas ? Hex2.fromNumber(maxFeePerBlobGas) : "0x",
        blobVersionedHashes ?? [],
        ...signature ? Signature2.toTuple(signature) : []
      ];
      const sidecars = options.sidecars || envelope.sidecars;
      const blobs = [];
      const commitments = [];
      const proofs = [];
      if (sidecars)
        for (let i = 0; i < sidecars.length; i++) {
          const { blob, commitment, proof } = sidecars[i];
          blobs.push(blob);
          commitments.push(commitment);
          proofs.push(proof);
        }
      return Hex2.concat("0x03", sidecars ? Rlp2.fromHex([serialized, blobs, commitments, proofs]) : Rlp2.fromHex(serialized));
    }
    function toRpc2(envelope) {
      const signature = Signature2.extract(envelope);
      return {
        ...envelope,
        chainId: Hex2.fromNumber(envelope.chainId),
        data: envelope.data ?? envelope.input,
        ...typeof envelope.gas === "bigint" ? { gas: Hex2.fromNumber(envelope.gas) } : {},
        ...typeof envelope.nonce === "bigint" ? { nonce: Hex2.fromNumber(envelope.nonce) } : {},
        ...typeof envelope.value === "bigint" ? { value: Hex2.fromNumber(envelope.value) } : {},
        ...typeof envelope.maxFeePerBlobGas === "bigint" ? { maxFeePerBlobGas: Hex2.fromNumber(envelope.maxFeePerBlobGas) } : {},
        ...typeof envelope.maxFeePerGas === "bigint" ? { maxFeePerGas: Hex2.fromNumber(envelope.maxFeePerGas) } : {},
        ...typeof envelope.maxPriorityFeePerGas === "bigint" ? { maxPriorityFeePerGas: Hex2.fromNumber(envelope.maxPriorityFeePerGas) } : {},
        type: "0x3",
        ...signature ? Signature2.toRpc(signature) : {}
      };
    }
    function validate2(envelope) {
      try {
        assert2(envelope);
        return true;
      } catch {
        return false;
      }
    }
  })(TransactionEnvelopeEip4844);
  return TransactionEnvelopeEip4844;
}
var TransactionEnvelopeEip7702 = {};
var hasRequiredTransactionEnvelopeEip7702;
function requireTransactionEnvelopeEip7702() {
  if (hasRequiredTransactionEnvelopeEip7702) return TransactionEnvelopeEip7702;
  hasRequiredTransactionEnvelopeEip7702 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.type = exports.serializedType = void 0;
    exports.assert = assert2;
    exports.deserialize = deserialize2;
    exports.from = from2;
    exports.getSignPayload = getSignPayload2;
    exports.hash = hash2;
    exports.serialize = serialize2;
    exports.validate = validate2;
    const AccessList2 = requireAccessList();
    const Address2 = requireAddress$1();
    const Authorization2 = requireAuthorization$1();
    const Hash2 = requireHash$1();
    const Hex2 = requireHex$2();
    const Rlp2 = requireRlp$1();
    const Signature2 = requireSignature$1();
    const TransactionEnvelope2 = requireTransactionEnvelope();
    const TransactionEnvelopeEip15592 = requireTransactionEnvelopeEip1559();
    exports.serializedType = "0x04";
    exports.type = "eip7702";
    function assert2(envelope) {
      const { authorizationList } = envelope;
      if (authorizationList) {
        for (const authorization of authorizationList) {
          const { address, chainId } = authorization;
          if (address)
            Address2.assert(address, { strict: false });
          if (Number(chainId) < 0)
            throw new TransactionEnvelope2.InvalidChainIdError({ chainId });
        }
      }
      TransactionEnvelopeEip15592.assert(envelope);
    }
    function deserialize2(serialized) {
      const transactionArray = Rlp2.toHex(Hex2.slice(serialized, 1));
      const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to2, value, data, accessList, authorizationList, yParity, r, s] = transactionArray;
      if (!(transactionArray.length === 10 || transactionArray.length === 13))
        throw new TransactionEnvelope2.InvalidSerializedError({
          attributes: {
            chainId,
            nonce,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gas,
            to: to2,
            value,
            data,
            accessList,
            authorizationList,
            ...transactionArray.length > 9 ? {
              yParity,
              r,
              s
            } : {}
          },
          serialized,
          type: exports.type
        });
      let transaction = {
        chainId: Number(chainId),
        type: exports.type
      };
      if (Hex2.validate(to2) && to2 !== "0x")
        transaction.to = to2;
      if (Hex2.validate(gas) && gas !== "0x")
        transaction.gas = BigInt(gas);
      if (Hex2.validate(data) && data !== "0x")
        transaction.data = data;
      if (Hex2.validate(nonce))
        transaction.nonce = nonce === "0x" ? 0n : BigInt(nonce);
      if (Hex2.validate(value) && value !== "0x")
        transaction.value = BigInt(value);
      if (Hex2.validate(maxFeePerGas) && maxFeePerGas !== "0x")
        transaction.maxFeePerGas = BigInt(maxFeePerGas);
      if (Hex2.validate(maxPriorityFeePerGas) && maxPriorityFeePerGas !== "0x")
        transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
      if (accessList.length !== 0 && accessList !== "0x")
        transaction.accessList = AccessList2.fromTupleList(accessList);
      if (authorizationList !== "0x")
        transaction.authorizationList = Authorization2.fromTupleList(authorizationList);
      const signature = r && s && yParity ? Signature2.fromTuple([yParity, r, s]) : void 0;
      if (signature)
        transaction = {
          ...transaction,
          ...signature
        };
      assert2(transaction);
      return transaction;
    }
    function from2(envelope, options = {}) {
      const { signature } = options;
      const envelope_ = typeof envelope === "string" ? deserialize2(envelope) : envelope;
      assert2(envelope_);
      return {
        ...envelope_,
        ...signature ? Signature2.from(signature) : {},
        type: "eip7702"
      };
    }
    function getSignPayload2(envelope) {
      return hash2(envelope, { presign: true });
    }
    function hash2(envelope, options = {}) {
      const { presign } = options;
      return Hash2.keccak256(serialize2({
        ...envelope,
        ...presign ? {
          r: void 0,
          s: void 0,
          yParity: void 0
        } : {}
      }));
    }
    function serialize2(envelope, options = {}) {
      const { authorizationList, chainId, gas, nonce, to: to2, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, input } = envelope;
      assert2(envelope);
      const accessTupleList = AccessList2.toTupleList(accessList);
      const authorizationTupleList = Authorization2.toTupleList(authorizationList);
      const signature = Signature2.extract(options.signature || envelope);
      const serialized = [
        Hex2.fromNumber(chainId),
        nonce ? Hex2.fromNumber(nonce) : "0x",
        maxPriorityFeePerGas ? Hex2.fromNumber(maxPriorityFeePerGas) : "0x",
        maxFeePerGas ? Hex2.fromNumber(maxFeePerGas) : "0x",
        gas ? Hex2.fromNumber(gas) : "0x",
        to2 ?? "0x",
        value ? Hex2.fromNumber(value) : "0x",
        data ?? input ?? "0x",
        accessTupleList,
        authorizationTupleList,
        ...signature ? Signature2.toTuple(signature) : []
      ];
      return Hex2.concat(exports.serializedType, Rlp2.fromHex(serialized));
    }
    function validate2(envelope) {
      try {
        assert2(envelope);
        return true;
      } catch {
        return false;
      }
    }
  })(TransactionEnvelopeEip7702);
  return TransactionEnvelopeEip7702;
}
var TransactionEnvelopeLegacy = {};
var hasRequiredTransactionEnvelopeLegacy;
function requireTransactionEnvelopeLegacy() {
  if (hasRequiredTransactionEnvelopeLegacy) return TransactionEnvelopeLegacy;
  hasRequiredTransactionEnvelopeLegacy = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.type = void 0;
    exports.assert = assert2;
    exports.deserialize = deserialize2;
    exports.from = from2;
    exports.getSignPayload = getSignPayload2;
    exports.hash = hash2;
    exports.serialize = serialize2;
    exports.toRpc = toRpc2;
    exports.validate = validate2;
    const Address2 = requireAddress$1();
    const Hash2 = requireHash$1();
    const Hex2 = requireHex$2();
    const Rlp2 = requireRlp$1();
    const Signature2 = requireSignature$1();
    const TransactionEnvelope2 = requireTransactionEnvelope();
    exports.type = "legacy";
    function assert2(envelope) {
      const { chainId, gasPrice, to: to2 } = envelope;
      if (to2)
        Address2.assert(to2, { strict: false });
      if (typeof chainId !== "undefined" && chainId <= 0)
        throw new TransactionEnvelope2.InvalidChainIdError({ chainId });
      if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n)
        throw new TransactionEnvelope2.GasPriceTooHighError({ gasPrice });
    }
    function deserialize2(serialized) {
      const tuple = Rlp2.toHex(serialized);
      const [nonce, gasPrice, gas, to2, value, data, chainIdOrV_, r, s] = tuple;
      if (!(tuple.length === 6 || tuple.length === 9))
        throw new TransactionEnvelope2.InvalidSerializedError({
          attributes: {
            nonce,
            gasPrice,
            gas,
            to: to2,
            value,
            data,
            ...tuple.length > 6 ? {
              v: chainIdOrV_,
              r,
              s
            } : {}
          },
          serialized,
          type: exports.type
        });
      const transaction = {
        type: exports.type
      };
      if (Hex2.validate(to2) && to2 !== "0x")
        transaction.to = to2;
      if (Hex2.validate(gas) && gas !== "0x")
        transaction.gas = BigInt(gas);
      if (Hex2.validate(data) && data !== "0x")
        transaction.data = data;
      if (Hex2.validate(nonce))
        transaction.nonce = nonce === "0x" ? 0n : BigInt(nonce);
      if (Hex2.validate(value) && value !== "0x")
        transaction.value = BigInt(value);
      if (Hex2.validate(gasPrice) && gasPrice !== "0x")
        transaction.gasPrice = BigInt(gasPrice);
      if (tuple.length === 6)
        return transaction;
      const chainIdOrV = Hex2.validate(chainIdOrV_) && chainIdOrV_ !== "0x" ? Number(chainIdOrV_) : 0;
      if (s === "0x" && r === "0x") {
        if (chainIdOrV > 0)
          transaction.chainId = Number(chainIdOrV);
        return transaction;
      }
      const v = chainIdOrV;
      const chainId = Math.floor((v - 35) / 2);
      if (chainId > 0)
        transaction.chainId = chainId;
      else if (v !== 27 && v !== 28)
        throw new Signature2.InvalidVError({ value: v });
      transaction.yParity = Signature2.vToYParity(v);
      transaction.v = v;
      transaction.s = s === "0x" ? 0n : BigInt(s);
      transaction.r = r === "0x" ? 0n : BigInt(r);
      assert2(transaction);
      return transaction;
    }
    function from2(envelope, options = {}) {
      const { signature } = options;
      const envelope_ = typeof envelope === "string" ? deserialize2(envelope) : envelope;
      assert2(envelope_);
      const signature_ = (() => {
        if (!signature)
          return {};
        const s = Signature2.from(signature);
        s.v = Signature2.yParityToV(s.yParity);
        return s;
      })();
      return {
        ...envelope_,
        ...signature_,
        type: "legacy"
      };
    }
    function getSignPayload2(envelope) {
      return hash2(envelope, { presign: true });
    }
    function hash2(envelope, options = {}) {
      const { presign } = options;
      return Hash2.keccak256(serialize2({
        ...envelope,
        ...presign ? {
          r: void 0,
          s: void 0,
          yParity: void 0,
          v: void 0
        } : {}
      }));
    }
    function serialize2(envelope, options = {}) {
      const { chainId = 0, gas, data, input, nonce, to: to2, value, gasPrice } = envelope;
      assert2(envelope);
      let serialized = [
        nonce ? Hex2.fromNumber(nonce) : "0x",
        gasPrice ? Hex2.fromNumber(gasPrice) : "0x",
        gas ? Hex2.fromNumber(gas) : "0x",
        to2 ?? "0x",
        value ? Hex2.fromNumber(value) : "0x",
        data ?? input ?? "0x"
      ];
      const signature = (() => {
        if (options.signature)
          return {
            r: options.signature.r,
            s: options.signature.s,
            v: Signature2.yParityToV(options.signature.yParity)
          };
        if (typeof envelope.r === "undefined" || typeof envelope.s === "undefined")
          return void 0;
        return {
          r: envelope.r,
          s: envelope.s,
          v: envelope.v
        };
      })();
      if (signature) {
        const v = (() => {
          if (signature.v >= 35) {
            const inferredChainId = Math.floor((signature.v - 35) / 2);
            if (inferredChainId > 0)
              return signature.v;
            return 27 + (signature.v === 35 ? 0 : 1);
          }
          if (chainId > 0)
            return chainId * 2 + 35 + signature.v - 27;
          const v2 = 27 + (signature.v === 27 ? 0 : 1);
          if (signature.v !== v2)
            throw new Signature2.InvalidVError({ value: signature.v });
          return v2;
        })();
        serialized = [
          ...serialized,
          Hex2.fromNumber(v),
          signature.r === 0n ? "0x" : Hex2.trimLeft(Hex2.fromNumber(signature.r)),
          signature.s === 0n ? "0x" : Hex2.trimLeft(Hex2.fromNumber(signature.s))
        ];
      } else if (chainId > 0)
        serialized = [...serialized, Hex2.fromNumber(chainId), "0x", "0x"];
      return Rlp2.fromHex(serialized);
    }
    function toRpc2(envelope) {
      const signature = Signature2.extract(envelope);
      return {
        ...envelope,
        chainId: typeof envelope.chainId === "number" ? Hex2.fromNumber(envelope.chainId) : void 0,
        data: envelope.data ?? envelope.input,
        type: "0x0",
        ...typeof envelope.gas === "bigint" ? { gas: Hex2.fromNumber(envelope.gas) } : {},
        ...typeof envelope.nonce === "bigint" ? { nonce: Hex2.fromNumber(envelope.nonce) } : {},
        ...typeof envelope.value === "bigint" ? { value: Hex2.fromNumber(envelope.value) } : {},
        ...typeof envelope.gasPrice === "bigint" ? { gasPrice: Hex2.fromNumber(envelope.gasPrice) } : {},
        ...signature ? {
          ...Signature2.toRpc(signature),
          v: signature.yParity === 0 ? "0x1b" : "0x1c"
        } : {}
      };
    }
    function validate2(envelope) {
      try {
        assert2(envelope);
        return true;
      } catch {
        return false;
      }
    }
  })(TransactionEnvelopeLegacy);
  return TransactionEnvelopeLegacy;
}
var TransactionReceipt = {};
var hasRequiredTransactionReceipt;
function requireTransactionReceipt() {
  if (hasRequiredTransactionReceipt) return TransactionReceipt;
  hasRequiredTransactionReceipt = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toRpcType = exports.fromRpcType = exports.toRpcStatus = exports.fromRpcStatus = void 0;
    exports.fromRpc = fromRpc2;
    exports.toRpc = toRpc2;
    const Hex2 = requireHex$2();
    const Log2 = requireLog();
    exports.fromRpcStatus = {
      "0x0": "reverted",
      "0x1": "success"
    };
    exports.toRpcStatus = {
      reverted: "0x0",
      success: "0x1"
    };
    exports.fromRpcType = {
      "0x0": "legacy",
      "0x1": "eip2930",
      "0x2": "eip1559",
      "0x3": "eip4844",
      "0x4": "eip7702"
    };
    exports.toRpcType = {
      legacy: "0x0",
      eip2930: "0x1",
      eip1559: "0x2",
      eip4844: "0x3",
      eip7702: "0x4"
    };
    function fromRpc2(receipt) {
      if (!receipt)
        return null;
      return {
        ...receipt,
        blobGasPrice: receipt.blobGasPrice ? BigInt(receipt.blobGasPrice) : void 0,
        blobGasUsed: receipt.blobGasUsed ? BigInt(receipt.blobGasUsed) : void 0,
        blockNumber: BigInt(receipt.blockNumber ?? 0n),
        cumulativeGasUsed: BigInt(receipt.cumulativeGasUsed ?? 0n),
        effectiveGasPrice: BigInt(receipt.effectiveGasPrice ?? 0n),
        gasUsed: BigInt(receipt.gasUsed ?? 0n),
        logs: receipt.logs.map((log) => Log2.fromRpc(log, { pending: false })),
        status: exports.fromRpcStatus[receipt.status],
        transactionIndex: Number(receipt.transactionIndex ?? 0),
        type: exports.fromRpcType[receipt.type] || receipt.type
      };
    }
    function toRpc2(receipt) {
      return {
        blobGasPrice: receipt.blobGasPrice ? Hex2.fromNumber(receipt.blobGasPrice) : void 0,
        blobGasUsed: receipt.blobGasUsed ? Hex2.fromNumber(receipt.blobGasUsed) : void 0,
        blockHash: receipt.blockHash,
        blockNumber: Hex2.fromNumber(receipt.blockNumber),
        contractAddress: receipt.contractAddress,
        cumulativeGasUsed: Hex2.fromNumber(receipt.cumulativeGasUsed),
        effectiveGasPrice: Hex2.fromNumber(receipt.effectiveGasPrice),
        from: receipt.from,
        gasUsed: Hex2.fromNumber(receipt.gasUsed),
        logs: receipt.logs.map(Log2.toRpc),
        logsBloom: receipt.logsBloom,
        root: receipt.root,
        status: exports.toRpcStatus[receipt.status],
        to: receipt.to,
        transactionHash: receipt.transactionHash,
        transactionIndex: Hex2.fromNumber(receipt.transactionIndex),
        type: exports.toRpcType[receipt.type] ?? receipt.type
      };
    }
  })(TransactionReceipt);
  return TransactionReceipt;
}
var TransactionRequest = {};
var hasRequiredTransactionRequest;
function requireTransactionRequest() {
  if (hasRequiredTransactionRequest) return TransactionRequest;
  hasRequiredTransactionRequest = 1;
  Object.defineProperty(TransactionRequest, "__esModule", { value: true });
  TransactionRequest.toRpc = toRpc2;
  const Authorization2 = requireAuthorization$1();
  const Hex2 = requireHex$2();
  function toRpc2(request) {
    const request_rpc = {};
    if (typeof request.accessList !== "undefined")
      request_rpc.accessList = request.accessList;
    if (typeof request.authorizationList !== "undefined")
      request_rpc.authorizationList = Authorization2.toRpcList(request.authorizationList);
    if (typeof request.blobVersionedHashes !== "undefined")
      request_rpc.blobVersionedHashes = request.blobVersionedHashes;
    if (typeof request.blobs !== "undefined")
      request_rpc.blobs = request.blobs;
    if (typeof request.chainId !== "undefined")
      request_rpc.chainId = Hex2.fromNumber(request.chainId);
    if (typeof request.data !== "undefined") {
      request_rpc.data = request.data;
      request_rpc.input = request.data;
    } else if (typeof request.input !== "undefined") {
      request_rpc.data = request.input;
      request_rpc.input = request.input;
    }
    if (typeof request.from !== "undefined")
      request_rpc.from = request.from;
    if (typeof request.gas !== "undefined")
      request_rpc.gas = Hex2.fromNumber(request.gas);
    if (typeof request.gasPrice !== "undefined")
      request_rpc.gasPrice = Hex2.fromNumber(request.gasPrice);
    if (typeof request.maxFeePerBlobGas !== "undefined")
      request_rpc.maxFeePerBlobGas = Hex2.fromNumber(request.maxFeePerBlobGas);
    if (typeof request.maxFeePerGas !== "undefined")
      request_rpc.maxFeePerGas = Hex2.fromNumber(request.maxFeePerGas);
    if (typeof request.maxPriorityFeePerGas !== "undefined")
      request_rpc.maxPriorityFeePerGas = Hex2.fromNumber(request.maxPriorityFeePerGas);
    if (typeof request.maxPriorityFeePerGas !== "undefined")
      request_rpc.maxPriorityFeePerGas = Hex2.fromNumber(request.maxPriorityFeePerGas);
    if (typeof request.nonce !== "undefined")
      request_rpc.nonce = Hex2.fromNumber(request.nonce);
    if (typeof request.to !== "undefined")
      request_rpc.to = request.to;
    if (typeof request.type !== "undefined")
      request_rpc.type = request.type;
    if (typeof request.value !== "undefined")
      request_rpc.value = Hex2.fromNumber(request.value);
    return request_rpc;
  }
  return TransactionRequest;
}
var TypedData = {};
var hasRequiredTypedData;
function requireTypedData() {
  if (hasRequiredTypedData) return TypedData;
  hasRequiredTypedData = 1;
  Object.defineProperty(TypedData, "__esModule", { value: true });
  TypedData.InvalidStructTypeError = TypedData.InvalidPrimaryTypeError = TypedData.InvalidDomainError = TypedData.BytesSizeMismatchError = void 0;
  TypedData.assert = assert2;
  TypedData.domainSeparator = domainSeparator;
  TypedData.encode = encode2;
  TypedData.encodeType = encodeType;
  TypedData.extractEip712DomainTypes = extractEip712DomainTypes;
  TypedData.getSignPayload = getSignPayload2;
  TypedData.hashDomain = hashDomain;
  TypedData.hashStruct = hashStruct;
  TypedData.serialize = serialize2;
  TypedData.validate = validate2;
  TypedData.encodeData = encodeData2;
  TypedData.hashType = hashType;
  TypedData.encodeField = encodeField;
  TypedData.findTypeDependencies = findTypeDependencies;
  const AbiParameters2 = requireAbiParameters$2();
  const Address2 = requireAddress$1();
  const Bytes2 = requireBytes$2();
  const Errors2 = requireErrors$2();
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  const Json2 = requireJson$1();
  const Solidity2 = requireSolidity$1();
  function assert2(value) {
    const { domain, message, primaryType, types } = value;
    const validateData = (struct, data) => {
      for (const param of struct) {
        const { name, type: type2 } = param;
        const value2 = data[name];
        const integerMatch = type2.match(Solidity2.integerRegex);
        if (integerMatch && (typeof value2 === "number" || typeof value2 === "bigint")) {
          const [, base, size_] = integerMatch;
          Hex2.fromNumber(value2, {
            signed: base === "int",
            size: Number.parseInt(size_ ?? "", 10) / 8
          });
        }
        if (type2 === "address" && typeof value2 === "string" && !Address2.validate(value2))
          throw new Address2.InvalidAddressError({
            address: value2,
            cause: new Address2.InvalidInputError()
          });
        const bytesMatch = type2.match(Solidity2.bytesRegex);
        if (bytesMatch) {
          const [, size2] = bytesMatch;
          if (size2 && Hex2.size(value2) !== Number.parseInt(size2, 10))
            throw new BytesSizeMismatchError2({
              expectedSize: Number.parseInt(size2, 10),
              givenSize: Hex2.size(value2)
            });
        }
        const struct2 = types[type2];
        if (struct2) {
          validateReference(type2);
          validateData(struct2, value2);
        }
      }
    };
    if (types.EIP712Domain && domain) {
      if (typeof domain !== "object")
        throw new InvalidDomainError({ domain });
      validateData(types.EIP712Domain, domain);
    }
    if (primaryType !== "EIP712Domain") {
      if (types[primaryType])
        validateData(types[primaryType], message);
      else
        throw new InvalidPrimaryTypeError({ primaryType, types });
    }
  }
  function domainSeparator(domain) {
    return hashDomain({
      domain
    });
  }
  function encode2(value) {
    const { domain = {}, message, primaryType } = value;
    const types = {
      EIP712Domain: extractEip712DomainTypes(domain),
      ...value.types
    };
    assert2({
      domain,
      message,
      primaryType,
      types
    });
    const parts = ["0x19", "0x01"];
    if (domain)
      parts.push(hashDomain({
        domain,
        types
      }));
    if (primaryType !== "EIP712Domain")
      parts.push(hashStruct({
        data: message,
        primaryType,
        types
      }));
    return Hex2.concat(...parts);
  }
  function encodeType(value) {
    const { primaryType, types } = value;
    let result = "";
    const unsortedDeps = findTypeDependencies({ primaryType, types });
    unsortedDeps.delete(primaryType);
    const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
    for (const type2 of deps) {
      result += `${type2}(${(types[type2] ?? []).map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
    }
    return result;
  }
  function extractEip712DomainTypes(domain) {
    return [
      typeof domain?.name === "string" && { name: "name", type: "string" },
      domain?.version && { name: "version", type: "string" },
      (typeof domain?.chainId === "number" || typeof domain?.chainId === "bigint") && {
        name: "chainId",
        type: "uint256"
      },
      domain?.verifyingContract && {
        name: "verifyingContract",
        type: "address"
      },
      domain?.salt && { name: "salt", type: "bytes32" }
    ].filter(Boolean);
  }
  function getSignPayload2(value) {
    return Hash2.keccak256(encode2(value));
  }
  function hashDomain(value) {
    const { domain, types } = value;
    return hashStruct({
      data: domain,
      primaryType: "EIP712Domain",
      types: {
        ...types,
        EIP712Domain: types?.EIP712Domain || extractEip712DomainTypes(domain)
      }
    });
  }
  function hashStruct(value) {
    const { data, primaryType, types } = value;
    const encoded = encodeData2({
      data,
      primaryType,
      types
    });
    return Hash2.keccak256(encoded);
  }
  function serialize2(value) {
    const { domain: domain_, message: message_, primaryType, types } = value;
    const normalizeData = (struct, value2) => {
      const data = { ...value2 };
      for (const param of struct) {
        const { name, type: type2 } = param;
        if (type2 === "address")
          data[name] = data[name].toLowerCase();
      }
      return data;
    };
    const domain = (() => {
      if (!domain_)
        return {};
      const type2 = types.EIP712Domain ?? extractEip712DomainTypes(domain_);
      return normalizeData(type2, domain_);
    })();
    const message = (() => {
      if (primaryType === "EIP712Domain")
        return void 0;
      if (!types[primaryType])
        return {};
      return normalizeData(types[primaryType], message_);
    })();
    return Json2.stringify({ domain, message, primaryType, types }, (_, value2) => {
      if (typeof value2 === "bigint")
        return value2.toString();
      return value2;
    });
  }
  function validate2(value) {
    try {
      assert2(value);
      return true;
    } catch {
      return false;
    }
  }
  class BytesSizeMismatchError2 extends Errors2.BaseError {
    constructor({ expectedSize, givenSize }) {
      super(`Expected bytes${expectedSize}, got bytes${givenSize}.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TypedData.BytesSizeMismatchError"
      });
    }
  }
  TypedData.BytesSizeMismatchError = BytesSizeMismatchError2;
  class InvalidDomainError extends Errors2.BaseError {
    constructor({ domain }) {
      super(`Invalid domain "${Json2.stringify(domain)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TypedData.InvalidDomainError"
      });
    }
  }
  TypedData.InvalidDomainError = InvalidDomainError;
  class InvalidPrimaryTypeError extends Errors2.BaseError {
    constructor({ primaryType, types }) {
      super(`Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`, {
        metaMessages: ["Check that the primary type is a key in `types`."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TypedData.InvalidPrimaryTypeError"
      });
    }
  }
  TypedData.InvalidPrimaryTypeError = InvalidPrimaryTypeError;
  class InvalidStructTypeError extends Errors2.BaseError {
    constructor({ type: type2 }) {
      super(`Struct type "${type2}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "TypedData.InvalidStructTypeError"
      });
    }
  }
  TypedData.InvalidStructTypeError = InvalidStructTypeError;
  function encodeData2(value) {
    const { data, primaryType, types } = value;
    const encodedTypes = [{ type: "bytes32" }];
    const encodedValues = [hashType({ primaryType, types })];
    for (const field of types[primaryType] ?? []) {
      const [type2, value2] = encodeField({
        types,
        name: field.name,
        type: field.type,
        value: data[field.name]
      });
      encodedTypes.push(type2);
      encodedValues.push(value2);
    }
    return AbiParameters2.encode(encodedTypes, encodedValues);
  }
  function hashType(value) {
    const { primaryType, types } = value;
    const encodedHashType = Hex2.fromString(encodeType({ primaryType, types }));
    return Hash2.keccak256(encodedHashType);
  }
  function encodeField(properties) {
    let { types, name, type: type2, value } = properties;
    if (types[type2] !== void 0)
      return [
        { type: "bytes32" },
        Hash2.keccak256(encodeData2({ data: value, primaryType: type2, types }))
      ];
    if (type2 === "bytes") {
      const prepend = value.length % 2 ? "0" : "";
      value = `0x${prepend + value.slice(2)}`;
      return [{ type: "bytes32" }, Hash2.keccak256(value, { as: "Hex" })];
    }
    if (type2 === "string")
      return [
        { type: "bytes32" },
        Hash2.keccak256(Bytes2.fromString(value), { as: "Hex" })
      ];
    if (type2.lastIndexOf("]") === type2.length - 1) {
      const parsedType = type2.slice(0, type2.lastIndexOf("["));
      const typeValuePairs = value.map((item) => encodeField({
        name,
        type: parsedType,
        types,
        value: item
      }));
      return [
        { type: "bytes32" },
        Hash2.keccak256(AbiParameters2.encode(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
      ];
    }
    return [{ type: type2 }, value];
  }
  function findTypeDependencies(value, results = /* @__PURE__ */ new Set()) {
    const { primaryType: primaryType_, types } = value;
    const match = primaryType_.match(/^\w*/u);
    const primaryType = match?.[0];
    if (results.has(primaryType) || types[primaryType] === void 0)
      return results;
    results.add(primaryType);
    for (const field of types[primaryType])
      findTypeDependencies({ primaryType: field.type, types }, results);
    return results;
  }
  function validateReference(type2) {
    if (type2 === "address" || type2 === "bool" || type2 === "string" || type2.startsWith("bytes") || type2.startsWith("uint") || type2.startsWith("int"))
      throw new InvalidStructTypeError({ type: type2 });
  }
  return TypedData;
}
var ValidatorData = {};
var hasRequiredValidatorData;
function requireValidatorData() {
  if (hasRequiredValidatorData) return ValidatorData;
  hasRequiredValidatorData = 1;
  Object.defineProperty(ValidatorData, "__esModule", { value: true });
  ValidatorData.encode = encode2;
  ValidatorData.getSignPayload = getSignPayload2;
  const Hash2 = requireHash$1();
  const Hex2 = requireHex$2();
  function encode2(value) {
    const { data, validator } = value;
    return Hex2.concat("0x19", "0x00", validator, Hex2.from(data));
  }
  function getSignPayload2(value) {
    return Hash2.keccak256(encode2(value));
  }
  return ValidatorData;
}
var WebAuthnP256 = {};
var webauthn = {};
var hasRequiredWebauthn;
function requireWebauthn() {
  if (hasRequiredWebauthn) return webauthn;
  hasRequiredWebauthn = 1;
  Object.defineProperty(webauthn, "__esModule", { value: true });
  webauthn.parseAsn1Signature = parseAsn1Signature;
  webauthn.parseCredentialPublicKey = parseCredentialPublicKey;
  const p256_1 = /* @__PURE__ */ requireP256$1();
  const Hex2 = requireHex$2();
  const PublicKey2 = requirePublicKey$1();
  const WebAuthnP256_js_1 = requireWebAuthnP256();
  function parseAsn1Signature(bytes2) {
    const r_start = bytes2[4] === 0 ? 5 : 4;
    const r_end = r_start + 32;
    const s_start = bytes2[r_end + 2] === 0 ? r_end + 3 : r_end + 2;
    const r = BigInt(Hex2.fromBytes(bytes2.slice(r_start, r_end)));
    const s = BigInt(Hex2.fromBytes(bytes2.slice(s_start)));
    return {
      r,
      s: s > p256_1.p256.CURVE.n / 2n ? p256_1.p256.CURVE.n - s : s
    };
  }
  async function parseCredentialPublicKey(response) {
    try {
      const publicKeyBuffer = response.getPublicKey();
      if (!publicKeyBuffer)
        throw new WebAuthnP256_js_1.CredentialCreationFailedError();
      const publicKeyBytes = new Uint8Array(publicKeyBuffer);
      const cryptoKey = await crypto.subtle.importKey("spki", new Uint8Array(publicKeyBytes), {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: "SHA-256"
      }, true, ["verify"]);
      const publicKey = new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKey));
      return PublicKey2.from(publicKey);
    } catch (error) {
      if (error.message !== "Permission denied to access object")
        throw error;
      const data = new Uint8Array(response.attestationObject);
      const coordinateLength = 32;
      const cborPrefix = 88;
      const findStart = (key) => {
        const coordinate = new Uint8Array([key, cborPrefix, coordinateLength]);
        for (let i = 0; i < data.length - coordinate.length; i++)
          if (coordinate.every((byte, j) => data[i + j] === byte))
            return i + coordinate.length;
        throw new WebAuthnP256_js_1.CredentialCreationFailedError();
      };
      const xStart = findStart(33);
      const yStart = findStart(34);
      return PublicKey2.from(new Uint8Array([
        4,
        ...data.slice(xStart, xStart + coordinateLength),
        ...data.slice(yStart, yStart + coordinateLength)
      ]));
    }
  }
  return webauthn;
}
var hasRequiredWebAuthnP256;
function requireWebAuthnP256() {
  if (hasRequiredWebAuthnP256) return WebAuthnP256;
  hasRequiredWebAuthnP256 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CredentialRequestFailedError = exports.CredentialCreationFailedError = exports.createChallenge = void 0;
    exports.createCredential = createCredential;
    exports.getAuthenticatorData = getAuthenticatorData2;
    exports.getClientDataJSON = getClientDataJSON2;
    exports.getCredentialCreationOptions = getCredentialCreationOptions;
    exports.getCredentialRequestOptions = getCredentialRequestOptions;
    exports.getSignPayload = getSignPayload2;
    exports.sign = sign2;
    exports.verify = verify2;
    const Base642 = requireBase64();
    const Bytes2 = requireBytes$2();
    const Errors2 = requireErrors$2();
    const Hash2 = requireHash$1();
    const Hex2 = requireHex$2();
    const internal = requireWebauthn();
    const P2562 = requireP256();
    exports.createChallenge = Uint8Array.from([
      105,
      171,
      180,
      181,
      160,
      222,
      75,
      198,
      42,
      42,
      32,
      31,
      141,
      37,
      186,
      233
    ]);
    async function createCredential(options) {
      const { createFn = window.navigator.credentials.create.bind(window.navigator.credentials), ...rest } = options;
      const creationOptions = getCredentialCreationOptions(rest);
      try {
        const credential = await createFn(creationOptions);
        if (!credential)
          throw new CredentialCreationFailedError();
        const response = credential.response;
        const publicKey = await internal.parseCredentialPublicKey(response);
        return {
          id: credential.id,
          publicKey,
          raw: credential
        };
      } catch (error) {
        throw new CredentialCreationFailedError({
          cause: error
        });
      }
    }
    function getAuthenticatorData2(options = {}) {
      const { flag = 5, rpId = window.location.hostname, signCount = 0 } = options;
      const rpIdHash = Hash2.sha256(Hex2.fromString(rpId));
      const flag_bytes = Hex2.fromNumber(flag, { size: 1 });
      const signCount_bytes = Hex2.fromNumber(signCount, { size: 4 });
      return Hex2.concat(rpIdHash, flag_bytes, signCount_bytes);
    }
    function getClientDataJSON2(options) {
      const { challenge, crossOrigin = false, extraClientData, origin = window.location.origin } = options;
      return JSON.stringify({
        type: "webauthn.get",
        challenge: Base642.fromHex(challenge, { url: true, pad: false }),
        origin,
        crossOrigin,
        ...extraClientData
      });
    }
    function getCredentialCreationOptions(options) {
      const { attestation = "none", authenticatorSelection = {
        residentKey: "preferred",
        requireResidentKey: false,
        userVerification: "required"
      }, challenge = exports.createChallenge, excludeCredentialIds, extensions, name: name_, rp = {
        id: window.location.hostname,
        name: window.document.title
      }, user } = options;
      const name = user?.name ?? name_;
      return {
        publicKey: {
          attestation,
          authenticatorSelection,
          challenge,
          ...excludeCredentialIds ? {
            excludeCredentials: excludeCredentialIds?.map((id) => ({
              id: Base642.toBytes(id),
              type: "public-key"
            }))
          } : {},
          pubKeyCredParams: [
            {
              type: "public-key",
              alg: -7
            }
          ],
          ...extensions && { extensions },
          rp,
          user: {
            id: user?.id ?? Hash2.keccak256(Bytes2.fromString(name), { as: "Bytes" }),
            name,
            displayName: user?.displayName ?? name
          }
        }
      };
    }
    function getCredentialRequestOptions(options) {
      const { credentialId, challenge, extensions, rpId = window.location.hostname, userVerification = "required" } = options;
      return {
        publicKey: {
          ...credentialId ? {
            allowCredentials: Array.isArray(credentialId) ? credentialId.map((id) => ({
              id: Base642.toBytes(id),
              type: "public-key"
            })) : [
              {
                id: Base642.toBytes(credentialId),
                type: "public-key"
              }
            ]
          } : {},
          challenge: Bytes2.fromHex(challenge),
          ...extensions && { extensions },
          rpId,
          userVerification
        }
      };
    }
    function getSignPayload2(options) {
      const { challenge, crossOrigin, extraClientData, flag, origin, rpId, signCount, userVerification = "required" } = options;
      const authenticatorData = getAuthenticatorData2({
        flag,
        rpId,
        signCount
      });
      const clientDataJSON = getClientDataJSON2({
        challenge,
        crossOrigin,
        extraClientData,
        origin
      });
      const clientDataJSONHash = Hash2.sha256(Hex2.fromString(clientDataJSON));
      const challengeIndex = clientDataJSON.indexOf('"challenge"');
      const typeIndex = clientDataJSON.indexOf('"type"');
      const metadata = {
        authenticatorData,
        clientDataJSON,
        challengeIndex,
        typeIndex,
        userVerificationRequired: userVerification === "required"
      };
      const payload = Hex2.concat(authenticatorData, clientDataJSONHash);
      return { metadata, payload };
    }
    async function sign2(options) {
      const { getFn = window.navigator.credentials.get.bind(window.navigator.credentials), ...rest } = options;
      const requestOptions = getCredentialRequestOptions(rest);
      try {
        const credential = await getFn(requestOptions);
        if (!credential)
          throw new CredentialRequestFailedError();
        const response = credential.response;
        const clientDataJSON = String.fromCharCode(...new Uint8Array(response.clientDataJSON));
        const challengeIndex = clientDataJSON.indexOf('"challenge"');
        const typeIndex = clientDataJSON.indexOf('"type"');
        const signature = internal.parseAsn1Signature(new Uint8Array(response.signature));
        return {
          metadata: {
            authenticatorData: Hex2.fromBytes(new Uint8Array(response.authenticatorData)),
            clientDataJSON,
            challengeIndex,
            typeIndex,
            userVerificationRequired: requestOptions.publicKey.userVerification === "required"
          },
          signature,
          raw: credential
        };
      } catch (error) {
        throw new CredentialRequestFailedError({
          cause: error
        });
      }
    }
    function verify2(options) {
      const { challenge, hash: hash2 = true, metadata, publicKey, signature } = options;
      const { authenticatorData, challengeIndex, clientDataJSON, typeIndex, userVerificationRequired } = metadata;
      const authenticatorDataBytes = Bytes2.fromHex(authenticatorData);
      if (authenticatorDataBytes.length < 37)
        return false;
      const flag = authenticatorDataBytes[32];
      if ((flag & 1) !== 1)
        return false;
      if (userVerificationRequired && (flag & 4) !== 4)
        return false;
      if ((flag & 8) !== 8 && (flag & 16) === 16)
        return false;
      const type2 = '"type":"webauthn.get"';
      if (type2 !== clientDataJSON.slice(Number(typeIndex), type2.length + 1))
        return false;
      const match = clientDataJSON.slice(Number(challengeIndex)).match(/^"challenge":"(.*?)"/);
      if (!match)
        return false;
      const [_, challenge_extracted] = match;
      if (Hex2.fromBytes(Base642.toBytes(challenge_extracted)) !== challenge)
        return false;
      const clientDataJSONHash = Hash2.sha256(Bytes2.fromString(clientDataJSON), {
        as: "Bytes"
      });
      const payload = Bytes2.concat(authenticatorDataBytes, clientDataJSONHash);
      return P2562.verify({
        hash: hash2,
        payload,
        publicKey,
        signature
      });
    }
    class CredentialCreationFailedError extends Errors2.BaseError {
      constructor({ cause } = {}) {
        super("Failed to create credential.", {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "WebAuthnP256.CredentialCreationFailedError"
        });
      }
    }
    exports.CredentialCreationFailedError = CredentialCreationFailedError;
    class CredentialRequestFailedError extends Errors2.BaseError {
      constructor({ cause } = {}) {
        super("Failed to request credential.", {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "WebAuthnP256.CredentialRequestFailedError"
        });
      }
    }
    exports.CredentialRequestFailedError = CredentialRequestFailedError;
  })(WebAuthnP256);
  return WebAuthnP256;
}
var WebCryptoP256 = {};
var hasRequiredWebCryptoP256;
function requireWebCryptoP256() {
  if (hasRequiredWebCryptoP256) return WebCryptoP256;
  hasRequiredWebCryptoP256 = 1;
  Object.defineProperty(WebCryptoP256, "__esModule", { value: true });
  WebCryptoP256.createKeyPair = createKeyPair2;
  WebCryptoP256.createKeyPairECDH = createKeyPairECDH;
  WebCryptoP256.getSharedSecret = getSharedSecret;
  WebCryptoP256.sign = sign2;
  WebCryptoP256.verify = verify2;
  const p256_1 = /* @__PURE__ */ requireP256$1();
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  const PublicKey2 = requirePublicKey$1();
  async function createKeyPair2(options = {}) {
    const { extractable = false } = options;
    const keypair = await globalThis.crypto.subtle.generateKey({
      name: "ECDSA",
      namedCurve: "P-256"
    }, extractable, ["sign", "verify"]);
    const publicKey_raw = await globalThis.crypto.subtle.exportKey("raw", keypair.publicKey);
    const publicKey = PublicKey2.from(new Uint8Array(publicKey_raw));
    return {
      privateKey: keypair.privateKey,
      publicKey
    };
  }
  async function createKeyPairECDH(options = {}) {
    const { extractable = false } = options;
    const keypair = await globalThis.crypto.subtle.generateKey({
      name: "ECDH",
      namedCurve: "P-256"
    }, extractable, ["deriveKey", "deriveBits"]);
    const publicKey_raw = await globalThis.crypto.subtle.exportKey("raw", keypair.publicKey);
    const publicKey = PublicKey2.from(new Uint8Array(publicKey_raw));
    return {
      privateKey: keypair.privateKey,
      publicKey
    };
  }
  async function getSharedSecret(options) {
    const { as = "Hex", privateKey, publicKey } = options;
    if (privateKey.algorithm.name === "ECDSA") {
      throw new Error("privateKey is not compatible with ECDH. please use `createKeyPairECDH` to create an ECDH key.");
    }
    const publicKeyCrypto = await globalThis.crypto.subtle.importKey("raw", PublicKey2.toBytes(publicKey), { name: "ECDH", namedCurve: "P-256" }, false, []);
    const sharedSecretBuffer = await globalThis.crypto.subtle.deriveBits({
      name: "ECDH",
      public: publicKeyCrypto
    }, privateKey, 256);
    const sharedSecret = new Uint8Array(sharedSecretBuffer);
    if (as === "Hex")
      return Hex2.fromBytes(sharedSecret);
    return sharedSecret;
  }
  async function sign2(options) {
    const { payload, privateKey } = options;
    const signature = await globalThis.crypto.subtle.sign({
      name: "ECDSA",
      hash: "SHA-256"
    }, privateKey, Bytes2.from(payload));
    const signature_bytes = Bytes2.fromArray(new Uint8Array(signature));
    const r = Bytes2.toBigInt(Bytes2.slice(signature_bytes, 0, 32));
    let s = Bytes2.toBigInt(Bytes2.slice(signature_bytes, 32, 64));
    if (s > p256_1.p256.CURVE.n / 2n)
      s = p256_1.p256.CURVE.n - s;
    return { r, s };
  }
  async function verify2(options) {
    const { payload, signature } = options;
    const publicKey = await globalThis.crypto.subtle.importKey("raw", PublicKey2.toBytes(options.publicKey), { name: "ECDSA", namedCurve: "P-256" }, true, ["verify"]);
    return await globalThis.crypto.subtle.verify({
      name: "ECDSA",
      hash: "SHA-256"
    }, publicKey, Bytes2.concat(Bytes2.fromNumber(signature.r), Bytes2.fromNumber(signature.s)), Bytes2.from(payload));
  }
  return WebCryptoP256;
}
var X25519 = {};
var hasRequiredX25519;
function requireX25519() {
  if (hasRequiredX25519) return X25519;
  hasRequiredX25519 = 1;
  Object.defineProperty(X25519, "__esModule", { value: true });
  X25519.noble = void 0;
  X25519.createKeyPair = createKeyPair2;
  X25519.getPublicKey = getPublicKey;
  X25519.getSharedSecret = getSharedSecret;
  X25519.randomPrivateKey = randomPrivateKey;
  const ed25519_1 = /* @__PURE__ */ requireEd25519$1();
  const Bytes2 = requireBytes$2();
  const Hex2 = requireHex$2();
  X25519.noble = ed25519_1.x25519;
  function createKeyPair2(options = {}) {
    const { as = "Hex" } = options;
    const privateKey = randomPrivateKey({ as });
    const publicKey = getPublicKey({ privateKey, as });
    return {
      privateKey,
      publicKey
    };
  }
  function getPublicKey(options) {
    const { as = "Hex", privateKey } = options;
    const privateKeyBytes = Bytes2.from(privateKey);
    const publicKeyBytes = ed25519_1.x25519.getPublicKey(privateKeyBytes);
    if (as === "Hex")
      return Hex2.fromBytes(publicKeyBytes);
    return publicKeyBytes;
  }
  function getSharedSecret(options) {
    const { as = "Hex", privateKey, publicKey } = options;
    const privateKeyBytes = Bytes2.from(privateKey);
    const publicKeyBytes = Bytes2.from(publicKey);
    const sharedSecretBytes = ed25519_1.x25519.getSharedSecret(privateKeyBytes, publicKeyBytes);
    if (as === "Hex")
      return Hex2.fromBytes(sharedSecretBytes);
    return sharedSecretBytes;
  }
  function randomPrivateKey(options = {}) {
    const { as = "Hex" } = options;
    const bytes2 = ed25519_1.x25519.utils.randomPrivateKey();
    if (as === "Hex")
      return Hex2.fromBytes(bytes2);
    return bytes2;
  }
  return X25519;
}
var hasRequired_cjs;
function require_cjs() {
  if (hasRequired_cjs) return _cjs;
  hasRequired_cjs = 1;
  Object.defineProperty(_cjs, "__esModule", { value: true });
  _cjs.Solidity = _cjs.Siwe = _cjs.Signature = _cjs.Secp256k1 = _cjs.RpcTransport = _cjs.RpcSchema = _cjs.RpcResponse = _cjs.RpcRequest = _cjs.Rlp = _cjs.PublicKey = _cjs.Provider = _cjs.PersonalMessage = _cjs.P256 = _cjs.Mnemonic = _cjs.Log = _cjs.Kzg = _cjs.Keystore = _cjs.Json = _cjs.Hex = _cjs.HdKey = _cjs.Hash = _cjs.Filter = _cjs.Fee = _cjs.Errors = _cjs.Ens = _cjs.Ed25519 = _cjs.ContractAddress = _cjs.Caches = _cjs.Bytes = _cjs.BlsPoint = _cjs.Bls = _cjs.Bloom = _cjs.BlockOverrides = _cjs.Block = _cjs.Blobs = _cjs.BinaryStateTree = _cjs.Base64 = _cjs.Base58 = _cjs.Authorization = _cjs.AesGcm = _cjs.Address = _cjs.AccountProof = _cjs.AccessList = _cjs.AbiParameters = _cjs.AbiItem = _cjs.AbiFunction = _cjs.AbiEvent = _cjs.AbiError = _cjs.AbiConstructor = _cjs.Abi = void 0;
  _cjs.X25519 = _cjs.Withdrawal = _cjs.WebCryptoP256 = _cjs.WebAuthnP256 = _cjs.Value = _cjs.ValidatorData = _cjs.TypedData = _cjs.TransactionRequest = _cjs.TransactionReceipt = _cjs.TransactionEnvelopeLegacy = _cjs.TransactionEnvelopeEip7702 = _cjs.TransactionEnvelopeEip4844 = _cjs.TransactionEnvelopeEip2930 = _cjs.TransactionEnvelopeEip1559 = _cjs.TransactionEnvelope = _cjs.Transaction = _cjs.StateOverrides = void 0;
  _cjs.Abi = requireAbi();
  _cjs.AbiConstructor = requireAbiConstructor$1();
  _cjs.AbiError = requireAbiError();
  _cjs.AbiEvent = requireAbiEvent();
  _cjs.AbiFunction = requireAbiFunction$1();
  _cjs.AbiItem = requireAbiItem$2();
  _cjs.AbiParameters = requireAbiParameters$2();
  _cjs.AccessList = requireAccessList();
  _cjs.AccountProof = requireAccountProof();
  _cjs.Address = requireAddress$1();
  _cjs.AesGcm = requireAesGcm();
  _cjs.Authorization = requireAuthorization$1();
  _cjs.Base58 = requireBase58();
  _cjs.Base64 = requireBase64();
  _cjs.BinaryStateTree = requireBinaryStateTree();
  _cjs.Blobs = requireBlobs();
  _cjs.Block = requireBlock();
  _cjs.BlockOverrides = requireBlockOverrides$1();
  _cjs.Bloom = requireBloom();
  _cjs.Bls = requireBls();
  _cjs.BlsPoint = requireBlsPoint();
  _cjs.Bytes = requireBytes$2();
  _cjs.Caches = requireCaches$1();
  _cjs.ContractAddress = requireContractAddress();
  _cjs.Ed25519 = requireEd25519();
  _cjs.Ens = requireEns();
  _cjs.Errors = requireErrors$2();
  _cjs.Fee = requireFee();
  _cjs.Filter = requireFilter();
  _cjs.Hash = requireHash$1();
  _cjs.HdKey = requireHdKey();
  _cjs.Hex = requireHex$2();
  _cjs.Json = requireJson$1();
  _cjs.Keystore = requireKeystore();
  _cjs.Kzg = requireKzg();
  _cjs.Log = requireLog();
  _cjs.Mnemonic = requireMnemonic();
  _cjs.P256 = requireP256();
  _cjs.PersonalMessage = requirePersonalMessage();
  _cjs.Provider = requireProvider();
  _cjs.PublicKey = requirePublicKey$1();
  _cjs.Rlp = requireRlp$1();
  _cjs.RpcRequest = requireRpcRequest();
  _cjs.RpcResponse = requireRpcResponse();
  _cjs.RpcSchema = requireRpcSchema();
  _cjs.RpcTransport = requireRpcTransport();
  _cjs.Secp256k1 = requireSecp256k1$1();
  _cjs.Signature = requireSignature$1();
  _cjs.Siwe = requireSiwe();
  _cjs.Solidity = requireSolidity$1();
  _cjs.StateOverrides = requireStateOverrides();
  _cjs.Transaction = requireTransaction();
  _cjs.TransactionEnvelope = requireTransactionEnvelope();
  _cjs.TransactionEnvelopeEip1559 = requireTransactionEnvelopeEip1559();
  _cjs.TransactionEnvelopeEip2930 = requireTransactionEnvelopeEip2930();
  _cjs.TransactionEnvelopeEip4844 = requireTransactionEnvelopeEip4844();
  _cjs.TransactionEnvelopeEip7702 = requireTransactionEnvelopeEip7702();
  _cjs.TransactionEnvelopeLegacy = requireTransactionEnvelopeLegacy();
  _cjs.TransactionReceipt = requireTransactionReceipt();
  _cjs.TransactionRequest = requireTransactionRequest();
  _cjs.TypedData = requireTypedData();
  _cjs.ValidatorData = requireValidatorData();
  _cjs.Value = requireValue();
  _cjs.WebAuthnP256 = requireWebAuthnP256();
  _cjs.WebCryptoP256 = requireWebCryptoP256();
  _cjs.Withdrawal = requireWithdrawal$1();
  _cjs.X25519 = requireX25519();
  return _cjs;
}
function verify$3(options) {
  const { hash: hash2, payload, publicKey, signature } = options;
  return secp256r1.verify(signature, payload instanceof Uint8Array ? payload : fromHex$7(payload), toHex$4(publicKey).substring(2), { lowS: true, ...hash2 ? { prehash: true } : {} });
}
const encoder$1 = /* @__PURE__ */ new TextEncoder();
/* @__PURE__ */ Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [i, a.charCodeAt(0)]));
const characterToInteger = {
  ...Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [a.charCodeAt(0), i])),
  ["=".charCodeAt(0)]: 0,
  ["-".charCodeAt(0)]: 62,
  ["_".charCodeAt(0)]: 63
};
function toBytes(value) {
  const base64 = value.replace(/=+$/, "");
  const size2 = base64.length;
  const decoded = new Uint8Array(size2 + 3);
  encoder$1.encodeInto(base64 + "===", decoded);
  for (let i = 0, j = 0; i < base64.length; i += 4, j += 3) {
    const x = (characterToInteger[decoded[i]] << 18) + (characterToInteger[decoded[i + 1]] << 12) + (characterToInteger[decoded[i + 2]] << 6) + characterToInteger[decoded[i + 3]];
    decoded[j] = x >> 16;
    decoded[j + 1] = x >> 8 & 255;
    decoded[j + 2] = x & 255;
  }
  const decodedSize = (size2 >> 2) * 3 + (size2 % 4 && size2 % 4 - 1);
  return new Uint8Array(decoded.buffer, 0, decodedSize);
}
function verify$2(options) {
  const { challenge, metadata, origin, publicKey, rpId, signature } = options;
  const { authenticatorData, clientDataJSON, userVerificationRequired } = metadata;
  const authenticatorDataBytes = fromHex$7(authenticatorData);
  if (authenticatorDataBytes.length < 37)
    return false;
  if (rpId !== void 0) {
    const rpIdHash = authenticatorDataBytes.slice(0, 32);
    const expectedRpIdHash = sha256$1(fromString$1(rpId), { as: "Bytes" });
    if (!isEqual$1(rpIdHash, expectedRpIdHash))
      return false;
  }
  const flag = authenticatorDataBytes[32];
  if ((flag & 1) !== 1)
    return false;
  if (userVerificationRequired && (flag & 4) !== 4)
    return false;
  if ((flag & 8) !== 8 && (flag & 16) === 16)
    return false;
  const clientData = JSON.parse(clientDataJSON);
  if (clientData.type !== "webauthn.get")
    return false;
  if (!clientData.challenge || fromBytes$5(toBytes(clientData.challenge)) !== challenge)
    return false;
  if (origin !== void 0) {
    const origins = Array.isArray(origin) ? origin : [origin];
    if (!origins.includes(clientData.origin))
      return false;
  }
  const clientDataJSONHash = sha256$1(fromString$2(clientDataJSON), {
    as: "Bytes"
  });
  const payload = concat$2(authenticatorDataBytes, clientDataJSONHash);
  return verify$3({
    hash: true,
    payload,
    publicKey,
    signature
  });
}
function verify$1(options) {
  return verify$2(options);
}
const maxOwners = 10;
const zeroSalt = `0x${"00".repeat(32)}`;
const accountDomain = "tempo:multisig:account";
const configDomain = "tempo:multisig:config";
const signatureDomain = "tempo:multisig:signature";
function assert$5(config) {
  const { salt, threshold, owners } = config;
  if (typeof salt !== "undefined" && size$2(salt) !== 32)
    throw new InvalidConfigError({ reason: "salt must be 32 bytes" });
  if (owners.length === 0)
    throw new InvalidConfigError({ reason: "owners cannot be empty" });
  if (owners.length > maxOwners)
    throw new InvalidConfigError({ reason: "too many owners" });
  if (Number(threshold) < 1)
    throw new InvalidConfigError({ reason: "threshold cannot be zero" });
  let totalWeight = 0;
  let previous;
  for (const owner of owners) {
    if (!validate$4(owner.owner) || toBigInt$2(owner.owner) === 0n)
      throw new InvalidConfigError({ reason: "owner cannot be zero" });
    if (Number(owner.weight) < 1)
      throw new InvalidConfigError({ reason: "owner weight cannot be zero" });
    const current = toBigInt$2(owner.owner);
    if (typeof previous !== "undefined" && previous >= current)
      throw new InvalidConfigError({
        reason: "owners must be strictly ascending"
      });
    previous = current;
    totalWeight += Number(owner.weight);
  }
  if (totalWeight > 4294967295)
    throw new InvalidConfigError({
      reason: "total owner weight exceeds u32 max"
    });
  if (Number(threshold) > totalWeight)
    throw new InvalidConfigError({
      reason: "threshold exceeds total owner weight"
    });
}
function from$7(config) {
  const owners = [...config.owners].sort((a, b) => toBigInt$2(a.owner) < toBigInt$2(b.owner) ? -1 : 1);
  const normalized = {
    salt: config.salt ? padLeft$1(config.salt, 32) : zeroSalt,
    threshold: config.threshold,
    owners
  };
  assert$5(normalized);
  return normalized;
}
function fromTuple$2(tuple) {
  const [salt, threshold, owners] = tuple;
  return {
    salt: salt && salt !== "0x" ? padLeft$1(salt, 32) : zeroSalt,
    threshold: threshold === "0x" ? 0 : toNumber(threshold),
    owners: owners.map((owner) => {
      const [ownerAddress, weight] = owner;
      return {
        owner: ownerAddress,
        weight: !weight || weight === "0x" ? 0 : toNumber(weight)
      };
    })
  };
}
function getAddress(value) {
  const id = typeof value === "object" && "genesisConfigId" in value ? value.genesisConfigId : toId(value);
  const hash2 = keccak256(concat$1(fromString$1(accountDomain), id));
  return from$f(slice$2(hash2, 12, 32));
}
function getSignPayload$3(value) {
  const { payload } = value;
  const account = "account" in value && value.account ? value.account : getAddress(value.genesisConfig);
  const genesisConfigId = "genesisConfigId" in value && value.genesisConfigId ? value.genesisConfigId : toId(value.genesisConfig);
  return keccak256(concat$1(fromString$1(signatureDomain), from$h(payload), account, genesisConfigId));
}
function toId(config) {
  assert$5(config);
  const id = keccak256(concat$1(fromString$1(configDomain), padLeft$1(config.salt ?? zeroSalt, 32), fromNumber$1(config.threshold, { size: 4 }), fromNumber$1(config.owners.length, { size: 4 }), ...config.owners.flatMap((owner) => [
    owner.owner,
    fromNumber$1(owner.weight, { size: 4 })
  ])));
  if (toBigInt$2(id) === 0n)
    throw new InvalidConfigError({ reason: "config ID cannot be zero" });
  return id;
}
function toTuple$2(config) {
  assert$5(config);
  const owners = config.owners.map((owner) => [owner.owner, fromNumber$1(owner.weight)]);
  const salt = config.salt ? padLeft$1(config.salt, 32) : zeroSalt;
  return [salt, fromNumber$1(config.threshold), owners];
}
class InvalidConfigError extends BaseError$1 {
  constructor({ reason }) {
    super(`Invalid native multisig config: ${reason}.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "MultisigConfig.InvalidConfigError"
    });
  }
}
const serializedP256Type = "0x01";
const serializedWebAuthnType = "0x02";
const serializedKeychainType = "0x03";
const serializedKeychainV2Type = "0x04";
const serializedMultisigType = "0x05";
const magicBytes = "0x7777777777777777777777777777777777777777777777777777777777777777";
function extractAddress(options) {
  const { signature, root } = options;
  if (signature.type === "keychain") {
    if (root)
      return signature.userAddress;
    return extractAddress({ ...options, signature: signature.inner });
  }
  if (signature.type === "multisig")
    return signature.account;
  return fromPublicKey(extractPublicKey(options));
}
function extractPublicKey(options) {
  const { payload, signature } = options;
  switch (signature.type) {
    case "secp256k1":
      return recoverPublicKey({
        payload,
        signature: signature.signature
      });
    case "p256":
    case "webAuthn":
      return signature.publicKey;
    case "keychain":
      return extractPublicKey({ payload, signature: signature.inner });
    case "multisig":
      throw new CoercionError({ envelope: signature });
  }
}
function deserialize$1(value) {
  const serialized = value.endsWith(magicBytes.slice(2)) ? slice$2(value, 0, -size$2(magicBytes)) : value;
  const size2 = size$2(serialized);
  if (size2 === 65) {
    const signature = fromHex$4(serialized);
    assert$8(signature);
    return { signature, type: "secp256k1" };
  }
  const typeId = slice$2(serialized, 0, 1);
  const data = slice$2(serialized, 1);
  const dataSize = size$2(data);
  if (typeId === serializedP256Type) {
    if (dataSize !== 129)
      throw new InvalidSerializedError$1({
        reason: `Invalid P256 signature envelope size: expected 129 bytes, got ${dataSize} bytes`,
        serialized
      });
    return {
      publicKey: {
        prefix: 4,
        x: toBigInt$2(slice$2(data, 64, 96)),
        y: toBigInt$2(slice$2(data, 96, 128))
      },
      prehash: toNumber(slice$2(data, 128, 129)) !== 0,
      signature: {
        r: toBigInt$2(slice$2(data, 0, 32)),
        s: toBigInt$2(slice$2(data, 32, 64))
      },
      type: "p256"
    };
  }
  if (typeId === serializedWebAuthnType) {
    if (dataSize < 128)
      throw new InvalidSerializedError$1({
        reason: `Invalid WebAuthn signature envelope size: expected at least 128 bytes, got ${dataSize} bytes`,
        serialized
      });
    const webauthnDataSize = dataSize - 128;
    const webauthnData = slice$2(data, 0, webauthnDataSize);
    let authenticatorData;
    let clientDataJSON;
    for (let split = 37; split < webauthnDataSize; split++) {
      const potentialJson = toString(slice$2(webauthnData, split));
      if (potentialJson.startsWith("{") && potentialJson.endsWith("}")) {
        try {
          JSON.parse(potentialJson);
          authenticatorData = slice$2(webauthnData, 0, split);
          clientDataJSON = potentialJson;
          break;
        } catch {
        }
      }
    }
    if (!authenticatorData || !clientDataJSON)
      throw new InvalidSerializedError$1({
        reason: "Unable to parse WebAuthn metadata: could not extract valid authenticatorData and clientDataJSON",
        serialized
      });
    return {
      publicKey: {
        prefix: 4,
        x: toBigInt$2(slice$2(data, webauthnDataSize + 64, webauthnDataSize + 96)),
        y: toBigInt$2(slice$2(data, webauthnDataSize + 96, webauthnDataSize + 128))
      },
      metadata: {
        authenticatorData,
        clientDataJSON
      },
      signature: {
        r: toBigInt$2(slice$2(data, webauthnDataSize, webauthnDataSize + 32)),
        s: toBigInt$2(slice$2(data, webauthnDataSize + 32, webauthnDataSize + 64))
      },
      type: "webAuthn"
    };
  }
  if (typeId === serializedKeychainType || typeId === serializedKeychainV2Type) {
    const userAddress = slice$2(data, 0, 20);
    const inner = deserialize$1(slice$2(data, 20));
    return {
      userAddress,
      inner,
      type: "keychain",
      version: typeId === serializedKeychainV2Type ? "v2" : "v1"
    };
  }
  if (typeId === serializedMultisigType) {
    const [account, genesisConfigId, signatures, init] = toHex$3(data);
    return {
      type: "multisig",
      account,
      genesisConfigId,
      signatures: signatures.map((signature) => deserialize$1(signature)),
      ...init && init !== "0x" ? {
        init: fromTuple$2(init)
      } : {}
    };
  }
  throw new InvalidSerializedError$1({
    reason: `Unknown signature type identifier: ${typeId}. Expected ${serializedP256Type} (P256), ${serializedWebAuthnType} (WebAuthn), ${serializedKeychainType} (Keychain V1), ${serializedKeychainV2Type} (Keychain V2), or ${serializedMultisigType} (Multisig)`,
    serialized
  });
}
function from$6(value, options) {
  if (typeof value === "string")
    return deserialize$1(value);
  if (typeof value === "object" && value !== null && "r" in value && "s" in value && "yParity" in value)
    return { signature: value, type: "secp256k1" };
  const type2 = getType(value);
  if (type2 === "multisig") {
    const multisig = value;
    const { genesisConfig, init, ...rest } = multisig;
    const account = (() => {
      if (rest.account)
        return rest.account;
      if (genesisConfig)
        return getAddress(genesisConfig);
      return rest.account;
    })();
    const genesisConfigId = (() => {
      if (rest.genesisConfigId)
        return rest.genesisConfigId;
      if (genesisConfig)
        return toId(genesisConfig);
      return rest.genesisConfigId;
    })();
    const initSource = init === true ? genesisConfig : init || void 0;
    return {
      ...rest,
      account,
      genesisConfigId,
      signatures: rest.signatures.map((signature) => from$6(signature)),
      // Normalize the bootstrap config (sorts owners, defaults the salt) so the
      // in-memory envelope matches what `deserialize` reconstructs.
      ...initSource ? { init: from$7(initSource) } : {},
      type: type2
    };
  }
  return {
    ...value,
    ...type2 === "p256" ? { prehash: value.prehash } : {},
    ...type2 === "keychain" ? {
      ...!(typeof value === "object" && value !== null && "version" in value && value.version) ? { version: "v2" } : {},
      ...!(typeof value === "object" && "keyId" in value && value.keyId) ? (() => {
        const inner = value.inner;
        if (inner.type === "p256" || inner.type === "webAuthn")
          return { keyId: fromPublicKey(inner.publicKey) };
        if (inner.type === "secp256k1" && options?.payload)
          ;
        return {};
      })() : {}
    } : {},
    type: type2
  };
}
function fromRpc$4(envelope) {
  if (envelope.type === "secp256k1")
    return {
      signature: fromRpc$6(envelope),
      type: "secp256k1"
    };
  if (envelope.type === "p256") {
    return {
      prehash: envelope.preHash,
      publicKey: {
        prefix: 4,
        x: toBigInt$2(envelope.pubKeyX),
        y: toBigInt$2(envelope.pubKeyY)
      },
      signature: {
        r: toBigInt$2(envelope.r),
        s: toBigInt$2(envelope.s)
      },
      type: "p256"
    };
  }
  if (envelope.type === "webAuthn") {
    const webauthnData = envelope.webauthnData;
    const webauthnDataSize = size$2(webauthnData);
    let authenticatorData;
    let clientDataJSON;
    for (let split = 37; split < webauthnDataSize; split++) {
      const potentialJson = toString(slice$2(webauthnData, split));
      if (potentialJson.startsWith("{") && potentialJson.endsWith("}")) {
        try {
          JSON.parse(potentialJson);
          authenticatorData = slice$2(webauthnData, 0, split);
          clientDataJSON = potentialJson;
          break;
        } catch {
        }
      }
    }
    if (!authenticatorData || !clientDataJSON)
      throw new InvalidSerializedError$1({
        reason: "Unable to parse WebAuthn metadata: could not extract valid authenticatorData and clientDataJSON",
        serialized: webauthnData
      });
    return {
      metadata: {
        authenticatorData,
        clientDataJSON
      },
      publicKey: {
        prefix: 4,
        x: toBigInt$2(envelope.pubKeyX),
        y: toBigInt$2(envelope.pubKeyY)
      },
      signature: {
        r: toBigInt$2(envelope.r),
        s: toBigInt$2(envelope.s)
      },
      type: "webAuthn"
    };
  }
  if (envelope.type === "keychain" || "userAddress" in envelope && "signature" in envelope) {
    const keychain = envelope;
    return {
      type: "keychain",
      userAddress: keychain.userAddress,
      inner: fromRpc$4(keychain.signature),
      ...keychain.keyId ? { keyId: keychain.keyId } : {},
      ...keychain.version ? { version: keychain.version } : {}
    };
  }
  if (envelope.type === "multisig" || "account" in envelope && "configId" in envelope && "signatures" in envelope) {
    const multisig = envelope;
    return {
      type: "multisig",
      account: multisig.account,
      // Map RPC wire field `configId` (TIP-1061 spec name) to the typed
      // envelope's `genesisConfigId`.
      genesisConfigId: multisig.configId,
      // Owner approvals are raw serialized signatures (node `Vec<Bytes>`).
      signatures: multisig.signatures.map((signature) => deserialize$1(signature)),
      ...multisig.init ? { init: from$7(multisig.init) } : {}
    };
  }
  throw new CoercionError({ envelope });
}
function getType(envelope) {
  if (typeof envelope !== "object" || envelope === null)
    throw new CoercionError({ envelope });
  if ("type" in envelope && envelope.type)
    return envelope.type;
  if ("signature" in envelope && !("publicKey" in envelope) && typeof envelope.signature === "object" && envelope.signature !== null && "r" in envelope.signature && "s" in envelope.signature && "yParity" in envelope.signature)
    return "secp256k1";
  if ("r" in envelope && "s" in envelope && "yParity" in envelope)
    return "secp256k1";
  if ("signature" in envelope && "prehash" in envelope && "publicKey" in envelope && typeof envelope.prehash === "boolean")
    return "p256";
  if ("signature" in envelope && "metadata" in envelope && "publicKey" in envelope)
    return "webAuthn";
  if ("userAddress" in envelope && "inner" in envelope)
    return "keychain";
  if (("account" in envelope && "genesisConfigId" in envelope || "genesisConfig" in envelope) && "signatures" in envelope)
    return "multisig";
  throw new CoercionError({
    envelope
  });
}
function serialize$1(envelope, options = {}) {
  const type2 = getType(envelope);
  if (type2 === "secp256k1") {
    const secp256k12 = envelope;
    return concat$1(toHex$2(secp256k12.signature), options.magic ? magicBytes : "0x");
  }
  if (type2 === "p256") {
    const p2562 = envelope;
    return concat$1(serializedP256Type, fromNumber$1(p2562.signature.r, { size: 32 }), fromNumber$1(p2562.signature.s, { size: 32 }), fromNumber$1(p2562.publicKey.x, { size: 32 }), fromNumber$1(p2562.publicKey.y, { size: 32 }), fromNumber$1(p2562.prehash ? 1 : 0, { size: 1 }), options.magic ? magicBytes : "0x");
  }
  if (type2 === "webAuthn") {
    const webauthn2 = envelope;
    const webauthnData = concat$1(webauthn2.metadata.authenticatorData, fromString$1(webauthn2.metadata.clientDataJSON));
    return concat$1(serializedWebAuthnType, webauthnData, fromNumber$1(webauthn2.signature.r, { size: 32 }), fromNumber$1(webauthn2.signature.s, { size: 32 }), fromNumber$1(webauthn2.publicKey.x, { size: 32 }), fromNumber$1(webauthn2.publicKey.y, { size: 32 }), options.magic ? magicBytes : "0x");
  }
  if (type2 === "keychain") {
    const keychain = envelope;
    const keychainTypeId = keychain.version === "v1" ? serializedKeychainType : serializedKeychainV2Type;
    return concat$1(keychainTypeId, keychain.userAddress, serialize$1(keychain.inner), options.magic ? magicBytes : "0x");
  }
  if (type2 === "multisig") {
    const multisig = envelope;
    return concat$1(serializedMultisigType, fromHex$5([
      multisig.account,
      multisig.genesisConfigId,
      multisig.signatures.map((signature) => serialize$1(signature)),
      multisig.init ? toTuple$2(multisig.init) : "0x"
    ]), options.magic ? magicBytes : "0x");
  }
  throw new CoercionError({ envelope });
}
function sortMultisigApprovals(value) {
  const { payload, signatures } = value;
  const digest = getSignPayload$3("genesisConfig" in value && value.genesisConfig ? { payload, genesisConfig: value.genesisConfig } : {
    payload,
    account: value.account,
    genesisConfigId: value.genesisConfigId
  });
  return signatures.map((signature) => ({
    key: toBigInt$2(extractAddress({ payload: digest, signature })),
    signature
  })).sort((a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0).map((entry) => entry.signature);
}
function toRpc$4(envelope) {
  const type2 = getType(envelope);
  if (type2 === "secp256k1") {
    const secp256k12 = envelope;
    return {
      ...toRpc$6(secp256k12.signature),
      type: "secp256k1"
    };
  }
  if (type2 === "p256") {
    const p2562 = envelope;
    return {
      preHash: p2562.prehash,
      pubKeyX: fromNumber$1(p2562.publicKey.x, { size: 32 }),
      pubKeyY: fromNumber$1(p2562.publicKey.y, { size: 32 }),
      r: fromNumber$1(p2562.signature.r, { size: 32 }),
      s: fromNumber$1(p2562.signature.s, { size: 32 }),
      type: "p256"
    };
  }
  if (type2 === "webAuthn") {
    const webauthn2 = envelope;
    const webauthnData = concat$1(webauthn2.metadata.authenticatorData, fromString$1(webauthn2.metadata.clientDataJSON));
    return {
      pubKeyX: fromNumber$1(webauthn2.publicKey.x, { size: 32 }),
      pubKeyY: fromNumber$1(webauthn2.publicKey.y, { size: 32 }),
      r: fromNumber$1(webauthn2.signature.r, { size: 32 }),
      s: fromNumber$1(webauthn2.signature.s, { size: 32 }),
      type: "webAuthn",
      webauthnData
    };
  }
  if (type2 === "keychain") {
    const keychain = envelope;
    return {
      type: "keychain",
      userAddress: keychain.userAddress,
      signature: toRpc$4(keychain.inner),
      ...keychain.keyId ? { keyId: keychain.keyId } : {},
      ...keychain.version ? { version: keychain.version } : {}
    };
  }
  if (type2 === "multisig") {
    const multisig = envelope;
    return {
      type: "multisig",
      account: multisig.account,
      // Map the typed envelope's `genesisConfigId` to the RPC wire field
      // `configId` (TIP-1061 spec name).
      configId: multisig.genesisConfigId,
      // Owner approvals are raw serialized signatures (node `Vec<Bytes>`).
      signatures: multisig.signatures.map((signature) => serialize$1(signature)),
      ...multisig.init ? { init: multisig.init } : {}
    };
  }
  throw new CoercionError({ envelope });
}
function verify(signature, parameters) {
  const { payload } = parameters;
  const address = (() => {
    if (parameters.address)
      return parameters.address;
    if (parameters.publicKey)
      return fromPublicKey(parameters.publicKey);
    return void 0;
  })();
  if (!address)
    return false;
  const envelope = from$6(signature);
  if (envelope.type === "secp256k1") {
    if (!address)
      return false;
    return verify$4({
      address,
      payload,
      signature: envelope.signature
    });
  }
  if (envelope.type === "p256") {
    const envelopeAddress = fromPublicKey(envelope.publicKey);
    if (!isEqual(envelopeAddress, address))
      return false;
    return verify$3({
      hash: envelope.prehash,
      publicKey: envelope.publicKey,
      payload,
      signature: envelope.signature
    });
  }
  if (envelope.type === "webAuthn") {
    const envelopeAddress = fromPublicKey(envelope.publicKey);
    if (!isEqual(envelopeAddress, address))
      return false;
    return verify$1({
      challenge: from$h(payload),
      metadata: envelope.metadata,
      publicKey: envelope.publicKey,
      signature: envelope.signature
    });
  }
  throw new VerificationError(`Unable to verify signature envelope of type "${envelope.type}".`);
}
class CoercionError extends BaseError$1 {
  constructor({ envelope }) {
    super(`Unable to coerce value (\`${stringify$1(envelope)}\`) to a valid signature envelope.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureEnvelope.CoercionError"
    });
  }
}
let InvalidSerializedError$1 = class InvalidSerializedError extends BaseError$1 {
  constructor({ reason, serialized }) {
    super(`Unable to deserialize signature envelope: ${reason}`, {
      metaMessages: [`Serialized: ${serialized}`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureEnvelope.InvalidSerializedError"
    });
  }
};
class VerificationError extends BaseError$1 {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureEnvelope.VerificationError"
    });
  }
}
function resolve(address) {
  if (address.startsWith("tempo"))
    return parse(address).address;
  return address;
}
function parse(tempoAddress) {
  if (!tempoAddress.startsWith("tempox"))
    throw new InvalidPrefixError$1({ address: tempoAddress });
  const hex2 = tempoAddress.slice("tempox".length);
  assert$b(hex2, { strict: true });
  const address = checksum(hex2);
  return { address };
}
let InvalidPrefixError$1 = class InvalidPrefixError2 extends BaseError$1 {
  constructor({ address }) {
    super(`Tempo address "${address}" has an invalid prefix. Expected "tempox".`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TempoAddress.InvalidPrefixError"
    });
  }
};
function from$5(authorization, options = {}) {
  if (typeof authorization.chainId === "string")
    return fromRpc$3(authorization);
  const resolved = {
    ...authorization,
    address: resolve(authorization.address)
  };
  if (options.signature) {
    return { ...resolved, signature: options.signature };
  }
  return resolved;
}
function fromRpc$3(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = fromRpc$4(authorization.signature);
  return {
    address,
    chainId: Number(chainId),
    nonce: BigInt(nonce),
    signature
  };
}
function fromRpcList(authorizationList) {
  return authorizationList.map((x) => fromRpc$3(x));
}
function fromTuple$1(tuple) {
  const [chainId, address, nonce, signatureSerialized] = tuple;
  const args = {
    address,
    chainId: chainId === "0x" ? 0 : Number(chainId),
    nonce: nonce === "0x" ? 0n : BigInt(nonce)
  };
  if (signatureSerialized)
    args.signature = deserialize$1(signatureSerialized);
  return from$5(args);
}
function fromTupleList$1(tupleList) {
  const list = [];
  for (const tuple of tupleList)
    list.push(fromTuple$1(tuple));
  return list;
}
function toRpc$3(authorization) {
  const { address, chainId, nonce, signature } = authorization;
  return {
    address,
    chainId: fromNumber$1(chainId),
    nonce: fromNumber$1(nonce),
    signature: toRpc$4(signature)
  };
}
function toRpcList(authorizationList) {
  return authorizationList.map((x) => toRpc$3(x));
}
function toTuple$1(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = authorization.signature ? serialize$1(authorization.signature) : void 0;
  return [
    chainId ? fromNumber$1(chainId) : "0x",
    address,
    nonce ? fromNumber$1(nonce) : "0x",
    ...signature ? [signature] : []
  ];
}
function toTupleList$1(list) {
  if (!list || list.length === 0)
    return [];
  const tupleList = [];
  for (const authorization of list)
    tupleList.push(toTuple$1(authorization));
  return tupleList;
}
const tip20Prefix = "0x20c0";
function toAddress(tokenId) {
  if (typeof tokenId === "string") {
    const resolved = resolve(tokenId);
    assert$9(resolved);
    return resolved;
  }
  const tokenIdHex = fromNumber$1(tokenId, { size: 18 });
  return concat$1(tip20Prefix, tokenIdHex);
}
function from$4(authorization, options = {}) {
  if ("keyId" in authorization)
    return fromRpc$2(authorization);
  const auth = authorization;
  if (auth.witness !== void 0)
    assertWitness(auth.witness);
  const resolved = {
    ...auth,
    address: resolve(auth.address),
    ...auth.limits ? {
      limits: auth.limits.map((l) => ({
        ...l,
        token: resolve(l.token)
      }))
    } : {},
    ...auth.scopes ? {
      scopes: auth.scopes.map((scope) => ({
        ...scope,
        address: resolve(scope.address),
        selector: resolveSelector(scope.selector),
        ...scope.recipients ? {
          recipients: scope.recipients.map((r) => resolve(r))
        } : {}
      }))
    } : {}
  };
  if (options.signature)
    return {
      ...resolved,
      signature: from$6(options.signature)
    };
  return resolved;
}
function fromRpc$2(authorization) {
  const { allowedCalls, chainId, keyId, expiry, limits, keyType } = authorization;
  const witness = authorization.witness ?? void 0;
  const isAdmin = authorization.isAdmin ?? void 0;
  const account = authorization.account ?? void 0;
  const signature = fromRpc$4(authorization.signature);
  if (witness !== void 0)
    assertWitness(witness);
  const scopes = allowedCalls ? allowedCalls.flatMap((callScope) => {
    if (!callScope.selectorRules || callScope.selectorRules.length === 0)
      return [{ address: callScope.target }];
    return callScope.selectorRules.map((rule) => ({
      address: callScope.target,
      selector: normalizeSelector(rule.selector),
      ...rule.recipients && rule.recipients.length > 0 ? { recipients: rule.recipients } : {}
    }));
  }) : void 0;
  return {
    address: keyId,
    chainId: chainId === "0x" ? 0n : toBigInt$2(chainId),
    ...expiry != null ? { expiry: Number(expiry) } : {},
    limits: limits?.map((limit) => ({
      token: limit.token,
      limit: BigInt(limit.limit),
      ...limit.period && hexToNumber(limit.period) > 0 ? { period: hexToNumber(limit.period) } : {}
    })),
    ...scopes ? { scopes } : {},
    signature,
    type: keyType,
    ...witness !== void 0 ? { witness } : {},
    ...isAdmin ? { isAdmin: true } : {},
    ...account !== void 0 ? { account } : {}
  };
}
function fromTuple(tuple) {
  const [authorization, signatureSerialized] = tuple;
  const [chainId, keyType_hex, keyId, ...trailing] = authorization;
  const keyType = (() => {
    switch (keyType_hex) {
      case "0x":
      case "0x00":
        return "secp256k1";
      case "0x01":
        return "p256";
      case "0x02":
        return "webAuthn";
      default:
        throw new Error(`Invalid key type: ${keyType_hex}`);
    }
  })();
  const [rawExpiry, rawLimits, rawScopes, rawWitness, rawIsAdmin, rawAccount] = trailing;
  const expiry = isAbsent(rawExpiry) ? void 0 : hexToNumber(rawExpiry) || void 0;
  const limits = Array.isArray(rawLimits) && rawLimits.length > 0 ? rawLimits.map((limitTuple) => {
    const [token, limit, period] = limitTuple;
    return {
      token,
      limit: hexToBigint(limit),
      ...period !== void 0 ? { period: hexToNumber(period) } : {}
    };
  }) : void 0;
  const scopes = Array.isArray(rawScopes) ? rawScopes.flatMap((scopeTuple) => {
    const [address, selectorRules] = scopeTuple;
    if (!Array.isArray(selectorRules) || selectorRules.length === 0)
      return [{ address }];
    return selectorRules.map((ruleTuple) => {
      const [selector, recipients] = ruleTuple;
      return {
        address,
        selector,
        ...Array.isArray(recipients) && recipients.length > 0 ? { recipients } : {}
      };
    });
  }) : void 0;
  const witness = isAbsent(rawWitness) ? void 0 : rawWitness;
  if (witness !== void 0)
    assertWitness(witness);
  const isAdmin = (() => {
    if (isAbsent(rawIsAdmin))
      return void 0;
    if (rawIsAdmin !== "0x01")
      throw new InvalidAdminMarkerError(rawIsAdmin);
    return true;
  })();
  const account = isAbsent(rawAccount) ? void 0 : rawAccount;
  const adminPair = account !== void 0 && isAdmin ? { account, isAdmin: true } : {};
  const args = {
    address: keyId,
    chainId: chainId === "0x" ? 0n : toBigInt$2(chainId),
    type: keyType,
    ...expiry !== void 0 ? { expiry } : {},
    ...limits !== void 0 ? { limits } : {},
    ...scopes !== void 0 ? { scopes } : {},
    ...witness !== void 0 ? { witness } : {},
    ...adminPair
  };
  if (signatureSerialized)
    args.signature = deserialize$1(signatureSerialized);
  return from$4(args);
}
function getSignPayload$2(authorization) {
  return hash$1(authorization);
}
function hash$1(authorization) {
  const [authorizationTuple] = toTuple(authorization);
  const serialized = fromHex$5(authorizationTuple);
  return keccak256(serialized);
}
function toRpc$2(authorization) {
  const { address, scopes, chainId, expiry, limits, type: type2, signature, witness, isAdmin, account } = authorization;
  if (witness !== void 0)
    assertWitness(witness);
  const allowedCalls = (() => {
    if (!scopes)
      return void 0;
    const grouped = /* @__PURE__ */ new Map();
    for (const scope of scopes) {
      const key = scope.address;
      if (!grouped.has(key))
        grouped.set(key, []);
      if (scope.selector) {
        grouped.get(key).push({
          selector: resolveSelector(scope.selector),
          ...scope.recipients && scope.recipients.length > 0 ? { recipients: scope.recipients } : {}
        });
      }
    }
    return [...grouped.entries()].map(([target, selectorRules]) => ({
      target,
      ...selectorRules.length > 0 ? { selectorRules } : {}
    }));
  })();
  return {
    chainId: chainId === 0n ? "0x" : fromNumber$1(chainId),
    expiry: typeof expiry === "number" ? fromNumber$1(expiry) : null,
    keyId: resolve(address),
    keyType: type2,
    limits: limits?.map(({ token, limit, period }) => ({
      token,
      limit: fromNumber$1(limit),
      ...period ? { period: numberToHex(period) } : {}
    })),
    signature: toRpc$4(signature),
    ...allowedCalls ? { allowedCalls } : {},
    ...witness !== void 0 ? { witness } : {},
    ...isAdmin ? { isAdmin: true } : {},
    ...account !== void 0 ? { account } : {}
  };
}
function toTuple(authorization) {
  const { address, chainId, scopes, expiry, limits, witness, isAdmin, account } = authorization;
  if (witness !== void 0)
    assertWitness(witness);
  const signature = authorization.signature ? serialize$1(authorization.signature) : void 0;
  const type2 = (() => {
    switch (authorization.type) {
      case "secp256k1":
        return "0x";
      case "p256":
        return "0x01";
      case "webAuthn":
        return "0x02";
      default:
        throw new Error(`Invalid key type: ${authorization.type}`);
    }
  })();
  const limitsValue = limits?.map((limit) => {
    const tuple = [limit.token, bigintToHex(limit.limit)];
    if (limit.period && limit.period > 0)
      tuple.push(numberToHex(limit.period));
    return tuple;
  });
  const callsValue = (() => {
    if (!scopes)
      return void 0;
    const grouped = /* @__PURE__ */ new Map();
    for (const scope of scopes) {
      const key = scope.address;
      if (!grouped.has(key))
        grouped.set(key, []);
      if (scope.selector) {
        grouped.get(key).push([
          resolveSelector(scope.selector),
          scope.recipients ?? []
        ]);
      }
    }
    return [...grouped.entries()].map(([address2, selectorRules]) => [
      address2,
      selectorRules.map(([selector, recipients]) => [selector, recipients])
    ]);
  })();
  const hasTip1053Plus = witness !== void 0 || isAdmin || account !== void 0;
  const optionals = [
    {
      value: expiry !== null && expiry !== void 0 && expiry !== 0 ? numberToHex(expiry) : void 0,
      placeholder: "0x"
    },
    {
      value: limitsValue,
      placeholder: hasTip1053Plus ? "0x" : []
    },
    { value: callsValue, placeholder: "0x" },
    { value: witness, placeholder: "0x" },
    // TIP-1049: admin marker. Present = `0x01` (RLP integer 1); absent
    // skipped or omitted. Any other value is a hard decode error on the node.
    { value: isAdmin ? "0x01" : void 0, placeholder: "0x" },
    // TIP-1049: optional account binding. Last field — never a placeholder.
    { value: account, placeholder: "0x" }
  ];
  let lastPresent = -1;
  for (let i = optionals.length - 1; i >= 0; i--)
    if (optionals[i].value !== void 0) {
      lastPresent = i;
      break;
    }
  const trailing = optionals.slice(0, lastPresent + 1).map(({ value, placeholder }) => value ?? placeholder);
  const authorizationTuple = [bigintToHex(chainId), type2, address, ...trailing];
  return [authorizationTuple, ...signature ? [signature] : []];
}
function bigintToHex(value) {
  return value === 0n ? "0x" : fromNumber$1(value);
}
function numberToHex(value) {
  return value === 0 ? "0x" : fromNumber$1(value);
}
function hexToBigint(hex2) {
  return hex2 === "0x" ? 0n : BigInt(hex2);
}
function hexToNumber(hex2) {
  return hex2 === "0x" ? 0 : toNumber(hex2);
}
function normalizeSelector(selector) {
  if (typeof selector === "string")
    return selector;
  if (Array.isArray(selector))
    return fromBytes$5(new Uint8Array(selector));
  return selector;
}
function resolveSelector(selector) {
  if (!selector)
    return void 0;
  if (selector.startsWith("0x"))
    return selector;
  return getSelector$1(selector);
}
function assertWitness(witness) {
  if (size$2(witness) !== 32)
    throw new InvalidWitnessSizeError(witness);
}
function isAbsent(value) {
  return value === void 0 || value === "0x";
}
class InvalidWitnessSizeError extends Error {
  constructor(witness) {
    super(`Witness \`${witness}\` must be exactly 32 bytes (got ${size$2(witness)} bytes).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "KeyAuthorization.InvalidWitnessSizeError"
    });
  }
}
class InvalidAdminMarkerError extends Error {
  constructor(marker) {
    super(`Admin marker \`${marker}\` is invalid; expected \`0x01\` (TIP-1049).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "KeyAuthorization.InvalidAdminMarkerError"
    });
  }
}
const toRpcType$1 = {
  legacy: "0x0",
  eip2930: "0x1",
  eip1559: "0x2",
  eip4844: "0x3",
  eip7702: "0x4"
};
const fromRpcType$1 = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function fromRpc$1(transaction, _options = {}) {
  if (!transaction)
    return null;
  const signature = extract(transaction);
  const transaction_ = {
    ...transaction,
    ...signature
  };
  transaction_.blockNumber = transaction.blockNumber ? BigInt(transaction.blockNumber) : null;
  if ("blockTimestamp" in transaction)
    transaction_.blockTimestamp = transaction.blockTimestamp ? BigInt(transaction.blockTimestamp) : transaction.blockTimestamp === null ? null : void 0;
  transaction_.data = transaction.input;
  transaction_.gas = BigInt(transaction.gas ?? 0n);
  transaction_.nonce = BigInt(transaction.nonce ?? 0n);
  transaction_.transactionIndex = transaction.transactionIndex ? Number(transaction.transactionIndex) : null;
  transaction_.value = BigInt(transaction.value ?? 0n);
  if (transaction.authorizationList)
    transaction_.authorizationList = fromRpcList$1(transaction.authorizationList);
  if (transaction.chainId)
    transaction_.chainId = Number(transaction.chainId);
  if (transaction.gasPrice)
    transaction_.gasPrice = BigInt(transaction.gasPrice);
  if (transaction.maxFeePerBlobGas)
    transaction_.maxFeePerBlobGas = BigInt(transaction.maxFeePerBlobGas);
  if (transaction.maxFeePerGas)
    transaction_.maxFeePerGas = BigInt(transaction.maxFeePerGas);
  if (transaction.maxPriorityFeePerGas)
    transaction_.maxPriorityFeePerGas = BigInt(transaction.maxPriorityFeePerGas);
  if (transaction.type)
    transaction_.type = fromRpcType$1[transaction.type] ?? transaction.type;
  if (signature)
    transaction_.v = yParityToV$1(signature.yParity);
  return transaction_;
}
const toRpcType = {
  ...toRpcType$1,
  tempo: "0x76"
};
const fromRpcType = {
  ...fromRpcType$1,
  "0x76": "tempo"
};
function fromRpc(transaction, _options = {}) {
  if (!transaction)
    return null;
  const transaction_ = fromRpc$1(transaction);
  transaction_.type = fromRpcType[transaction.type];
  if (transaction.aaAuthorizationList) {
    transaction_.authorizationList = fromRpcList(transaction.aaAuthorizationList);
    delete transaction_.aaAuthorizationList;
  }
  if (transaction.calls)
    transaction_.calls = transaction.calls.map((call) => ({
      to: call.to,
      value: call.value && call.value !== "0x" ? BigInt(call.value) : void 0,
      // @ts-expect-error
      data: call.input || call.data || "0x"
    }));
  if (transaction.feeToken)
    transaction_.feeToken = transaction.feeToken;
  if (transaction.nonceKey)
    transaction_.nonceKey = BigInt(transaction.nonceKey);
  if (transaction.signature)
    transaction_.signature = fromRpc$4(transaction.signature);
  if (transaction.validAfter)
    transaction_.validAfter = Number(transaction.validAfter);
  if (transaction.validBefore)
    transaction_.validBefore = Number(transaction.validBefore);
  if (transaction.keyAuthorization)
    transaction_.keyAuthorization = fromRpc$2(transaction.keyAuthorization);
  if (transaction.feePayerSignature) {
    transaction_.feePayerSignature = fromRpc$6(transaction.feePayerSignature);
    transaction_.feePayerSignature.v = yParityToV$1(transaction_.feePayerSignature.yParity);
  }
  return transaction_;
}
function toRpc$1(request) {
  const request_rpc = {};
  if (typeof request.accessList !== "undefined")
    request_rpc.accessList = request.accessList;
  if (typeof request.authorizationList !== "undefined")
    request_rpc.authorizationList = toRpcList$1(request.authorizationList);
  if (typeof request.blobVersionedHashes !== "undefined")
    request_rpc.blobVersionedHashes = request.blobVersionedHashes;
  if (typeof request.blobs !== "undefined")
    request_rpc.blobs = request.blobs;
  if (typeof request.chainId !== "undefined")
    request_rpc.chainId = fromNumber$1(request.chainId);
  if (typeof request.data !== "undefined") {
    request_rpc.data = request.data;
    request_rpc.input = request.data;
  } else if (typeof request.input !== "undefined") {
    request_rpc.data = request.input;
    request_rpc.input = request.input;
  }
  if (typeof request.from !== "undefined")
    request_rpc.from = request.from;
  if (typeof request.gas !== "undefined")
    request_rpc.gas = fromNumber$1(request.gas);
  if (typeof request.gasPrice !== "undefined")
    request_rpc.gasPrice = fromNumber$1(request.gasPrice);
  if (typeof request.maxFeePerBlobGas !== "undefined")
    request_rpc.maxFeePerBlobGas = fromNumber$1(request.maxFeePerBlobGas);
  if (typeof request.maxFeePerGas !== "undefined")
    request_rpc.maxFeePerGas = fromNumber$1(request.maxFeePerGas);
  if (typeof request.maxPriorityFeePerGas !== "undefined")
    request_rpc.maxPriorityFeePerGas = fromNumber$1(request.maxPriorityFeePerGas);
  if (typeof request.maxPriorityFeePerGas !== "undefined")
    request_rpc.maxPriorityFeePerGas = fromNumber$1(request.maxPriorityFeePerGas);
  if (typeof request.nonce !== "undefined")
    request_rpc.nonce = fromNumber$1(request.nonce);
  if (typeof request.to !== "undefined")
    request_rpc.to = request.to;
  if (typeof request.type !== "undefined")
    request_rpc.type = toRpcType$1[request.type] || request.type;
  if (typeof request.value !== "undefined")
    request_rpc.value = fromNumber$1(request.value);
  return request_rpc;
}
function toRpc(request) {
  const request_rpc = toRpc$1({
    ...request,
    authorizationList: void 0
  });
  if (request.authorizationList)
    request_rpc.authorizationList = toRpcList(request.authorizationList);
  if (request.calls)
    request_rpc.calls = request.calls.map((call) => ({
      to: call.to ? resolve(call.to) : call.to,
      value: call.value ? fromNumber$1(call.value) : "0x",
      data: call.data ?? "0x"
    }));
  else if (request.to || request.data || request.value)
    request_rpc.calls = [
      {
        to: request.to ? resolve(request.to) : void 0,
        value: request.value ? fromNumber$1(request.value) : "0x",
        data: request.data ?? "0x"
      }
    ];
  if (typeof request.feeToken !== "undefined")
    request_rpc.feeToken = toAddress(request.feeToken);
  if (request.keyAuthorization)
    request_rpc.keyAuthorization = toRpc$2(request.keyAuthorization);
  if (typeof request.validBefore !== "undefined")
    request_rpc.validBefore = fromNumber$1(request.validBefore);
  if (typeof request.validAfter !== "undefined")
    request_rpc.validAfter = fromNumber$1(request.validAfter);
  const nonceKey = (() => {
    if (request.nonceKey === "random")
      return random(6);
    if (typeof request.nonceKey === "bigint")
      return fromNumber$1(request.nonceKey);
    return void 0;
  })();
  if (nonceKey)
    request_rpc.nonceKey = nonceKey;
  if (typeof request.calls !== "undefined" || typeof request.feePayer !== "undefined" || typeof request.feeToken !== "undefined" || typeof request.keyAuthorization !== "undefined" || typeof request.nonceKey !== "undefined" || typeof request.validBefore !== "undefined" || typeof request.validAfter !== "undefined" || request.type === "tempo") {
    request_rpc.type = toRpcType.tempo;
    delete request_rpc.data;
    delete request_rpc.input;
    delete request_rpc.to;
    delete request_rpc.value;
  }
  return request_rpc;
}
function fromTupleList(accessList) {
  const list = [];
  for (let i = 0; i < accessList.length; i++) {
    const [address, storageKeys] = accessList[i];
    if (address)
      assert$9(address, { strict: false });
    list.push({
      address,
      storageKeys: storageKeys.map((key) => validate$5(key) ? key : trimLeft(key))
    });
  }
  return list;
}
function toTupleList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const tuple = [];
  for (const { address, storageKeys } of accessList) {
    for (let j = 0; j < storageKeys.length; j++)
      if (size$2(storageKeys[j]) !== 32)
        throw new InvalidStorageKeySizeError({
          storageKey: storageKeys[j]
        });
    if (address)
      assert$9(address, { strict: false });
    tuple.push([address, storageKeys]);
  }
  return tuple;
}
class InvalidStorageKeySizeError extends BaseError$1 {
  constructor({ storageKey }) {
    super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${size$2(storageKey)} bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AccessList.InvalidStorageKeySizeError"
    });
  }
}
const exponents = {
  wei: 0,
  gwei: 9,
  szabo: 12,
  finney: 15,
  ether: 18
};
function format(value, decimals = 0) {
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
function formatGwei(wei, unit = "wei") {
  return format(wei, exponents.gwei - exponents[unit]);
}
class FeeCapTooHighError extends BaseError$1 {
  constructor({ feeCap } = {}) {
    super(`The fee cap (\`maxFeePerGas\`/\`maxPriorityFeePerGas\`${feeCap ? ` = ${formatGwei(feeCap)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.FeeCapTooHighError"
    });
  }
}
class InvalidChainIdError extends BaseError$1 {
  constructor({ chainId }) {
    super(typeof chainId !== "undefined" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.InvalidChainIdError"
    });
  }
}
class InvalidSerializedError2 extends BaseError$1 {
  constructor({ attributes, serialized, type: type2 }) {
    const missing = Object.entries(attributes).map(([key, value]) => typeof value === "undefined" ? key : void 0).filter(Boolean);
    super(`Invalid serialized transaction of type "${type2}" was provided.`, {
      metaMessages: [
        `Serialized Transaction: "${serialized}"`,
        missing.length > 0 ? `Missing Attributes: ${missing.join(", ")}` : ""
      ].filter(Boolean)
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.InvalidSerializedError"
    });
  }
}
class TipAboveFeeCapError extends BaseError$1 {
  constructor({ maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionEnvelope.TipAboveFeeCapError"
    });
  }
}
const feePayerMagic = "0x78";
const serializedType = "0x76";
const type = "tempo";
function assert$4(envelope) {
  const { calls, chainId, maxFeePerGas, maxPriorityFeePerGas, validBefore, validAfter } = envelope;
  if (!calls || calls.length === 0)
    throw new CallsEmptyError();
  if (typeof validBefore === "number" && typeof validAfter === "number" && validBefore <= validAfter) {
    throw new InvalidValidityWindowError({
      validBefore,
      validAfter
    });
  }
  if (calls) {
    for (const call of calls)
      if (call.to)
        assert$9(call.to, { strict: false });
  }
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxFeePerGas && BigInt(maxFeePerGas) > 2n ** 256n - 1n)
    throw new FeeCapTooHighError({
      feeCap: maxFeePerGas
    });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({
      maxFeePerGas,
      maxPriorityFeePerGas
    });
}
function deserialize(serialized) {
  const transactionArray = toHex$3(slice$2(serialized, 1));
  const [chainId, maxPriorityFeePerGas, maxFeePerGas, gas, calls, accessList, nonceKey, nonce, validBefore, validAfter, feeToken, feePayerSignatureOrSender, authorizationList, keyAuthorizationOrSignature, maybeSignature] = transactionArray;
  const keyAuthorization = Array.isArray(keyAuthorizationOrSignature) ? keyAuthorizationOrSignature : void 0;
  const signature = keyAuthorization ? maybeSignature : keyAuthorizationOrSignature;
  if (!(transactionArray.length === 13 || transactionArray.length === 14 || transactionArray.length === 15))
    throw new InvalidSerializedError2({
      attributes: {
        authorizationList,
        chainId,
        maxPriorityFeePerGas,
        maxFeePerGas,
        gas,
        calls,
        accessList,
        keyAuthorization,
        nonceKey,
        nonce,
        validBefore,
        validAfter,
        feeToken,
        feePayerSignatureOrSender,
        ...transactionArray.length > 12 ? {
          signature
        } : {}
      },
      serialized,
      type
    });
  let transaction = {
    chainId: Number(chainId),
    type
  };
  if (validate$6(gas) && gas !== "0x")
    transaction.gas = BigInt(gas);
  if (validate$6(nonce))
    transaction.nonce = nonce === "0x" ? 0n : BigInt(nonce);
  if (validate$6(maxFeePerGas) && maxFeePerGas !== "0x")
    transaction.maxFeePerGas = BigInt(maxFeePerGas);
  if (validate$6(maxPriorityFeePerGas) && maxPriorityFeePerGas !== "0x")
    transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
  if (validate$6(nonceKey))
    transaction.nonceKey = nonceKey === "0x" ? 0n : BigInt(nonceKey);
  if (validate$6(validBefore) && validBefore !== "0x")
    transaction.validBefore = Number(validBefore);
  if (validate$6(validAfter) && validAfter !== "0x")
    transaction.validAfter = Number(validAfter);
  if (validate$6(feeToken) && feeToken !== "0x")
    transaction.feeToken = feeToken;
  if (calls && calls !== "0x") {
    const callsArray = calls;
    transaction.calls = callsArray.map((callTuple) => {
      const [to2, value, data] = callTuple;
      const call = {};
      if (to2 && to2 !== "0x")
        call.to = to2;
      if (value && value !== "0x")
        call.value = BigInt(value);
      if (data && data !== "0x")
        call.data = data;
      return call;
    });
  }
  if (accessList?.length !== 0 && accessList !== "0x")
    transaction.accessList = fromTupleList(accessList);
  if (authorizationList?.length !== 0 && authorizationList !== "0x")
    transaction.authorizationList = fromTupleList$1(authorizationList);
  if (feePayerSignatureOrSender !== "0x" && feePayerSignatureOrSender !== void 0) {
    if (feePayerSignatureOrSender === "0x00" || validate$4(feePayerSignatureOrSender)) {
      transaction.feePayerSignature = null;
      if (validate$4(feePayerSignatureOrSender))
        transaction.from = feePayerSignatureOrSender;
    } else
      transaction.feePayerSignature = fromTuple$3(feePayerSignatureOrSender);
  }
  if (keyAuthorization)
    transaction.keyAuthorization = fromTuple(keyAuthorization);
  const signatureEnvelope = signature ? deserialize$1(signature) : void 0;
  if (signatureEnvelope)
    transaction = {
      ...transaction,
      signature: signatureEnvelope
    };
  if (!transaction.from && signatureEnvelope) {
    try {
      transaction.from = extractAddress({
        payload: getSignPayload$1(from$3(transaction)),
        signature: signatureEnvelope,
        root: true
      });
    } catch {
    }
  }
  assert$4(transaction);
  return transaction;
}
function from$3(envelope, options = {}) {
  const { feePayerSignature, signature } = options;
  const envelope_ = typeof envelope === "string" ? deserialize(envelope) : envelope;
  if (envelope_.from)
    envelope_.from = resolve(envelope_.from);
  if (envelope_.calls)
    envelope_.calls = envelope_.calls.map((call) => ({
      ...call,
      ...call.to ? { to: resolve(call.to) } : {}
    }));
  assert$4(envelope_);
  return {
    ...envelope_,
    ...signature ? { signature: from$6(signature) } : {},
    ...feePayerSignature ? { feePayerSignature: from$c(feePayerSignature) } : {},
    type: "tempo"
  };
}
function serialize(envelope, options = {}) {
  const { accessList, authorizationList, calls, chainId, feeToken, gas, keyAuthorization, nonce, nonceKey, maxFeePerGas, maxPriorityFeePerGas, validBefore, validAfter } = envelope;
  assert$4(envelope);
  const accessTupleList = toTupleList(accessList);
  const signature = options.signature || envelope.signature;
  const authorizationTupleList = toTupleList$1(authorizationList);
  const callsTupleList = calls.map((call) => [
    call.to ? resolve(call.to) : "0x",
    call.value ? fromNumber$1(call.value) : "0x",
    call.data ?? "0x"
  ]);
  let skipFeeToken = false;
  const feePayerSignatureOrSender = (() => {
    if (options.sender)
      return options.sender;
    if (options.format === "feePayer" && signature) {
      const sig = from$6(signature);
      if (sig.type === "keychain")
        return sig.userAddress;
      if (sig.type === "p256" || sig.type === "webAuthn")
        return fromPublicKey(sig.publicKey);
      if (sig.type === "secp256k1")
        return recoverAddress({
          payload: getSignPayload$1(from$3(envelope)),
          signature: sig.signature
        });
    }
    const feePayerSignature = typeof options.feePayerSignature !== "undefined" ? options.feePayerSignature : envelope.feePayerSignature;
    if (feePayerSignature === null) {
      skipFeeToken = true;
      return "0x00";
    }
    if (!feePayerSignature)
      return "0x";
    return toTuple$3(feePayerSignature);
  })();
  const serialized = [
    fromNumber$1(chainId),
    maxPriorityFeePerGas ? fromNumber$1(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? fromNumber$1(maxFeePerGas) : "0x",
    gas ? fromNumber$1(gas) : "0x",
    callsTupleList,
    accessTupleList,
    nonceKey ? fromNumber$1(nonceKey) : "0x",
    nonce ? fromNumber$1(nonce) : "0x",
    typeof validBefore === "number" ? fromNumber$1(validBefore) : "0x",
    typeof validAfter === "number" ? fromNumber$1(validAfter) : "0x",
    !skipFeeToken && (typeof feeToken === "bigint" || typeof feeToken === "string") ? toAddress(feeToken) : "0x",
    feePayerSignatureOrSender,
    authorizationTupleList,
    ...keyAuthorization ? [toTuple(keyAuthorization)] : [],
    ...signature ? [serialize$1(from$6(signature))] : []
  ];
  return concat$1(options.format === "feePayer" ? feePayerMagic : serializedType, fromHex$5(serialized));
}
function encodeForSigning(envelope) {
  return serialize({
    ...envelope,
    signature: void 0,
    // When a fee payer signature is present, normalize to `null`
    // (the presign marker).
    ...envelope.feePayerSignature !== void 0 ? { feePayerSignature: null } : {}
  });
}
function getSignPayload$1(envelope, options = {}) {
  const sigHash = hash(envelope, { presign: true });
  if (options.from)
    return keccak256(concat$1("0x04", sigHash, resolve(options.from)));
  return sigHash;
}
function hash(envelope, options = {}) {
  const serialized = options.presign ? encodeForSigning(envelope) : serialize(envelope);
  return keccak256(serialized);
}
function getFeePayerSignPayload(envelope, options) {
  const sender = resolve(options.sender);
  const serialized = serialize({ ...envelope, signature: void 0 }, {
    sender,
    format: "feePayer"
  });
  return keccak256(serialized);
}
class CallsEmptyError extends BaseError$1 {
  constructor() {
    super("Calls list cannot be empty.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TxEnvelopeTempo.CallsEmptyError"
    });
  }
}
class InvalidValidityWindowError extends BaseError$1 {
  constructor({ validBefore, validAfter }) {
    super(`validBefore (${validBefore}) must be greater than validAfter (${validAfter}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TxEnvelopeTempo.InvalidValidityWindowError"
    });
  }
}
const version$1 = "0.1.1";
function getVersion() {
  return version$1;
}
class BaseError2 extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      if (options.cause instanceof BaseError2) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if (options.cause?.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof BaseError2)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x) => typeof x === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn);
  return fn ? null : err;
}
const bigIntSuffix = "#__bigint";
function stringify(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix;
    return value2;
  }, space);
}
function assertSize$1(bytes2, size_) {
  if (size(bytes2) > size_)
    throw new SizeOverflowError4({
      givenSize: size(bytes2),
      maxSize: size_
    });
}
function assertStartOffset$1(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError3({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset$1(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError3({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function assertSize(hex2, size_) {
  if (size$1(hex2) > size_)
    throw new SizeOverflowError$1({
      givenSize: size$1(hex2),
      maxSize: size_
    });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size$1(value) - 1)
    throw new SliceOffsetOutOfBoundsError$1({
      offset: start,
      position: "start",
      size: size$1(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size$1(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError$1({
      offset: end,
      position: "end",
      size: size$1(value)
    });
  }
}
function pad(hex_, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return hex_;
  const hex2 = hex_.replace("0x", "");
  if (hex2.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError3({
      size: Math.ceil(hex2.length / 2),
      targetSize: size2,
      type: "Hex"
    });
  return `0x${hex2[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
const encoder = /* @__PURE__ */ new TextEncoder();
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
function assert$3(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError2(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError2(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError2(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError2(value);
}
function concat(...values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
function from$2(value) {
  if (value instanceof Uint8Array)
    return fromBytes$2(value);
  if (Array.isArray(value))
    return fromBytes$2(new Uint8Array(value));
  return value;
}
function fromBytes$2(value, options = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++)
    string += hexes[value[i]];
  const hex2 = `0x${string}`;
  if (typeof options.size === "number") {
    assertSize(hex2, options.size);
    return padRight(hex2, options.size);
  }
  return hex2;
}
function fromNumber(value, options = {}) {
  const { signed, size: size2 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError2({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value_) : value_).toString(16);
  const hex2 = `0x${stringValue}`;
  if (size2)
    return padLeft(hex2, size2);
  return hex2;
}
function fromString(value, options = {}) {
  return fromBytes$2(encoder.encode(value), options);
}
function padLeft(value, size2) {
  return pad(value, { dir: "left", size: size2 });
}
function padRight(value, size2) {
  return pad(value, { dir: "right", size: size2 });
}
function slice$1(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset(value_, start, end);
  return value_;
}
function size$1(value) {
  return Math.ceil((value.length - 2) / 2);
}
function toBigInt$1(hex2, options = {}) {
  const { signed } = options;
  if (options.size)
    assertSize(hex2, options.size);
  const value = BigInt(hex2);
  if (!signed)
    return value;
  const size2 = (hex2.length - 2) / 2;
  const max_unsigned = (1n << BigInt(size2) * 8n) - 1n;
  const max_signed = max_unsigned >> 1n;
  if (value <= max_signed)
    return value;
  return value - max_unsigned - 1n;
}
function validate$1(value, options = {}) {
  const { strict = false } = options;
  try {
    assert$3(value, { strict });
    return true;
  } catch {
    return false;
  }
}
class IntegerOutOfRangeError2 extends BaseError2 {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number \`${value}\` is not in safe${size2 ? ` ${size2 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
}
class InvalidHexTypeError2 extends BaseError2 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
}
class InvalidHexValueError2 extends BaseError2 {
  constructor(value) {
    super(`Value \`${value}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
}
let SizeOverflowError$1 = class SizeOverflowError3 extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
let SliceOffsetOutOfBoundsError$1 = class SliceOffsetOutOfBoundsError2 extends BaseError2 {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
};
class SizeExceedsPaddingSizeError3 extends BaseError2 {
  constructor({ size: size2, targetSize, type: type2 }) {
    super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
}
function assert$2(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError2(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError2(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError2(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError2(value);
}
function from$1(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex$3(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex$3(value, options = {}) {
  const { size: size2 } = options;
  let hex2 = value;
  if (size2) {
    assertSize(value, size2);
    hex2 = padRight(value, size2);
  }
  let hexString = hex2.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes2 = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes2[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes2;
}
function size(value) {
  return value.length;
}
function slice(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset$1(value, start);
  const value_ = value.slice(start, end);
  if (strict)
    assertEndOffset$1(value_, start, end);
  return value_;
}
function toBigInt(bytes2, options = {}) {
  const { size: size2 } = options;
  if (typeof size2 !== "undefined")
    assertSize$1(bytes2, size2);
  const hex2 = fromBytes$2(bytes2, options);
  return toBigInt$1(hex2, options);
}
function validate(value) {
  try {
    assert$2(value);
    return true;
  } catch {
    return false;
  }
}
class InvalidBytesTypeError2 extends BaseError2 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
}
class SizeOverflowError4 extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
}
class SliceOffsetOutOfBoundsError3 extends BaseError2 {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SliceOffsetOutOfBoundsError"
    });
  }
}
function sha256(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes2 = sha256$3(from$1(value));
  if (as === "Bytes")
    return bytes2;
  return fromBytes$2(bytes2);
}
function assert$1(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x, y } = publicKey;
  if (compressed === false || typeof x === "bigint" && typeof y === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError3({
        prefix,
        cause: new InvalidUncompressedPrefixError2()
      });
    return;
  }
  if (compressed === true || typeof x === "bigint" && typeof y === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError3({
        prefix,
        cause: new InvalidCompressedPrefixError2()
      });
    return;
  }
  throw new InvalidError2({ publicKey });
}
function from(value) {
  const publicKey = (() => {
    if (validate$1(value))
      return fromHex$2(value);
    if (validate(value))
      return fromBytes$1(value);
    const { prefix, x, y } = value;
    if (typeof x === "bigint" && typeof y === "bigint")
      return { prefix: prefix ?? 4, x, y };
    return { prefix, x };
  })();
  assert$1(publicKey);
  return publicKey;
}
function fromBytes$1(publicKey) {
  return fromHex$2(fromBytes$2(publicKey));
}
function fromHex$2(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError$1({ publicKey });
  if (publicKey.length === 130) {
    const x2 = BigInt(slice$1(publicKey, 0, 32));
    const y = BigInt(slice$1(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x2,
      y
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice$1(publicKey, 0, 1));
    const x2 = BigInt(slice$1(publicKey, 1, 33));
    const y = BigInt(slice$1(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x2,
      y
    };
  }
  const prefix = Number(slice$1(publicKey, 0, 1));
  const x = BigInt(slice$1(publicKey, 1, 33));
  return {
    prefix,
    x
  };
}
function toHex$1(publicKey, options = {}) {
  assert$1(publicKey);
  const { prefix, x, y } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat(
    includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
    fromNumber(x, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y === "bigint" ? fromNumber(y, { size: 32 }) : "0x"
  );
  return publicKey_;
}
class InvalidError2 extends BaseError2 {
  constructor({ publicKey }) {
    super(`Value \`${stringify(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
}
class InvalidPrefixError3 extends BaseError2 {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
}
class InvalidCompressedPrefixError2 extends BaseError2 {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
}
class InvalidUncompressedPrefixError2 extends BaseError2 {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
}
let InvalidSerializedSizeError$1 = class InvalidSerializedSizeError3 extends BaseError2 {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size$1(from$2(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};
const maxUint256 = 2n ** 256n - 1n;
function assert(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError2({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError2({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError2({ signature });
  if (signature.r < 0n || signature.r > maxUint256)
    throw new InvalidRError2({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint256)
    throw new InvalidSError2({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError2({ value: signature.yParity });
}
function fromHex$1(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError4({ signature });
  const r = BigInt(slice$1(signature, 0, 32));
  const s = BigInt(slice$1(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity(yParity2);
    } catch {
      throw new InvalidYParityError2({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r,
      s
    };
  return {
    r,
    s,
    yParity
  };
}
function toHex(signature) {
  assert(signature);
  const r = signature.r;
  const s = signature.s;
  const signature_ = concat(
    fromNumber(r, { size: 32 }),
    fromNumber(s, { size: 32 }),
    // If the signature is recovered, add the recovery byte to the signature.
    typeof signature.yParity === "number" ? fromNumber(yParityToV(signature.yParity), { size: 1 }) : "0x"
  );
  return signature_;
}
function toDerBytes(signature) {
  const sig = new secp256k1$1.Signature(signature.r, signature.s);
  return sig.toDERRawBytes();
}
function vToYParity(v) {
  if (v === 0 || v === 27)
    return 0;
  if (v === 1 || v === 28)
    return 1;
  if (v >= 35)
    return v % 2 === 0 ? 1 : 0;
  throw new InvalidVError2({ value: v });
}
function yParityToV(yParity) {
  if (yParity === 0)
    return 27;
  if (yParity === 1)
    return 28;
  throw new InvalidYParityError2({ value: yParity });
}
class InvalidSerializedSizeError4 extends BaseError2 {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size$1(from$2(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
}
class MissingPropertiesError2 extends BaseError2 {
  constructor({ signature }) {
    super(`Signature \`${stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
}
class InvalidRError2 extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
}
class InvalidSError2 extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
}
class InvalidYParityError2 extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
}
class InvalidVError2 extends BaseError2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
}
const decoder = /* @__PURE__ */ new TextDecoder();
const integerToCharacter = /* @__PURE__ */ Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [i, a.charCodeAt(0)]));
({
  ...Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [a.charCodeAt(0), i]))
});
function fromBytes(value, options = {}) {
  const { pad: pad2 = true, url = false } = options;
  const encoded = new Uint8Array(Math.ceil(value.length / 3) * 4);
  for (let i = 0, j = 0; j < value.length; i += 4, j += 3) {
    const y = (value[j] << 16) + (value[j + 1] << 8) + (value[j + 2] | 0);
    encoded[i] = integerToCharacter[y >> 18];
    encoded[i + 1] = integerToCharacter[y >> 12 & 63];
    encoded[i + 2] = integerToCharacter[y >> 6 & 63];
    encoded[i + 3] = integerToCharacter[y & 63];
  }
  const k = value.length % 3;
  const end = Math.floor(value.length / 3) * 4 + (k && k + 1);
  let base64 = decoder.decode(new Uint8Array(encoded.buffer, 0, end));
  if (pad2 && k === 1)
    base64 += "==";
  if (pad2 && k === 2)
    base64 += "=";
  if (url)
    base64 = base64.replaceAll("+", "-").replaceAll("/", "_");
  return base64;
}
function fromHex(value, options = {}) {
  return fromBytes(fromHex$3(value), options);
}
Uint8Array.from([
  105,
  171,
  180,
  181,
  160,
  222,
  75,
  198,
  42,
  42,
  32,
  31,
  141,
  37,
  186,
  233
]);
function getAuthenticatorData(options = {}) {
  const { flag = 5, rpId = window.location.hostname, signCount = 0 } = options;
  const rpIdHash = sha256(fromString(rpId));
  const flag_bytes = fromNumber(flag, { size: 1 });
  const signCount_bytes = fromNumber(signCount, { size: 4 });
  return concat(rpIdHash, flag_bytes, signCount_bytes);
}
function getClientDataJSON(options) {
  const { challenge, crossOrigin = false, extraClientData, origin = window.location.origin } = options;
  return JSON.stringify({
    type: "webauthn.get",
    challenge: fromHex(challenge, { url: true, pad: false }),
    origin,
    crossOrigin,
    ...extraClientData
  });
}
function getSignPayload(options) {
  const { challenge, crossOrigin, extraClientData, flag, origin, rpId, signCount, userVerification = "required" } = options;
  const authenticatorData = getAuthenticatorData({
    flag,
    rpId,
    signCount
  });
  const clientDataJSON = getClientDataJSON({
    challenge,
    crossOrigin,
    extraClientData,
    origin
  });
  const clientDataJSONHash = sha256(fromString(clientDataJSON));
  const challengeIndex = clientDataJSON.indexOf('"challenge"');
  const typeIndex = clientDataJSON.indexOf('"type"');
  const metadata = {
    authenticatorData,
    clientDataJSON,
    challengeIndex,
    typeIndex,
    userVerificationRequired: userVerification === "required"
  };
  const payload = concat(authenticatorData, clientDataJSONHash);
  return { metadata, payload };
}
async function createKeyPair(options = {}) {
  const { extractable = false } = options;
  const keypair = await globalThis.crypto.subtle.generateKey({
    name: "ECDSA",
    namedCurve: "P-256"
  }, extractable, ["sign", "verify"]);
  const publicKey_raw = await globalThis.crypto.subtle.exportKey("raw", keypair.publicKey);
  const publicKey = from(new Uint8Array(publicKey_raw));
  return {
    privateKey: keypair.privateKey,
    publicKey
  };
}
async function sign(options) {
  const { payload, privateKey } = options;
  const signature = await globalThis.crypto.subtle.sign({
    name: "ECDSA",
    hash: "SHA-256"
  }, privateKey, from$1(payload));
  const signature_bytes = fromArray(new Uint8Array(signature));
  const r = toBigInt(slice(signature_bytes, 0, 32));
  let s = toBigInt(slice(signature_bytes, 32, 64));
  if (s > p256.CURVE.n / 2n)
    s = p256.CURVE.n - s;
  return { r, s };
}
var BlockOverrides = {};
var Hex = {};
var Bytes = {};
var Errors = {};
var errors = {};
var version = {};
var hasRequiredVersion;
function requireVersion() {
  if (hasRequiredVersion) return version;
  hasRequiredVersion = 1;
  Object.defineProperty(version, "__esModule", { value: true });
  version.version = void 0;
  version.version = "0.1.1";
  return version;
}
var hasRequiredErrors$1;
function requireErrors$1() {
  if (hasRequiredErrors$1) return errors;
  hasRequiredErrors$1 = 1;
  Object.defineProperty(errors, "__esModule", { value: true });
  errors.getUrl = getUrl;
  errors.getVersion = getVersion2;
  errors.prettyPrint = prettyPrint;
  const version_js_1 = requireVersion();
  function getUrl(url) {
    return url;
  }
  function getVersion2() {
    return version_js_1.version;
  }
  function prettyPrint(args) {
    if (!args)
      return "";
    const entries = Object.entries(args).map(([key, value]) => {
      if (value === void 0 || value === false)
        return null;
      return [key, value];
    }).filter(Boolean);
    const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
    return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
  }
  return errors;
}
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return Errors;
  hasRequiredErrors = 1;
  Object.defineProperty(Errors, "__esModule", { value: true });
  Errors.BaseError = void 0;
  const errors_js_1 = requireErrors$1();
  class BaseError3 extends Error {
    static setStaticOptions(options) {
      BaseError3.prototype.docsOrigin = options.docsOrigin;
      BaseError3.prototype.showVersion = options.showVersion;
      BaseError3.prototype.version = options.version;
    }
    constructor(shortMessage, options = {}) {
      const details = (() => {
        if (options.cause instanceof BaseError3) {
          if (options.cause.details)
            return options.cause.details;
          if (options.cause.shortMessage)
            return options.cause.shortMessage;
        }
        if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
          return options.cause.details;
        if (options.cause?.message)
          return options.cause.message;
        return options.details;
      })();
      const docsPath = (() => {
        if (options.cause instanceof BaseError3)
          return options.cause.docsPath || options.docsPath;
        return options.docsPath;
      })();
      const docsBaseUrl = options.docsOrigin ?? BaseError3.prototype.docsOrigin;
      const docs = `${docsBaseUrl}${docsPath ?? ""}`;
      const showVersion = Boolean(options.version ?? BaseError3.prototype.showVersion);
      const version2 = options.version ?? BaseError3.prototype.version;
      const message = [
        shortMessage || "An error occurred.",
        ...options.metaMessages ? ["", ...options.metaMessages] : [],
        ...details || docsPath || showVersion ? [
          "",
          details ? `Details: ${details}` : void 0,
          docsPath ? `See: ${docs}` : void 0,
          showVersion ? `Version: ${version2}` : void 0
        ] : []
      ].filter((x) => typeof x === "string").join("\n");
      super(message, options.cause ? { cause: options.cause } : void 0);
      Object.defineProperty(this, "details", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "docs", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "docsOrigin", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "docsPath", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "shortMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "showVersion", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "version", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "cause", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "BaseError"
      });
      this.cause = options.cause;
      this.details = details;
      this.docs = docs;
      this.docsOrigin = docsBaseUrl;
      this.docsPath = docsPath;
      this.shortMessage = shortMessage;
      this.showVersion = showVersion;
      this.version = version2;
    }
    walk(fn) {
      return walk2(this, fn);
    }
  }
  Errors.BaseError = BaseError3;
  Object.defineProperty(BaseError3, "defaultStaticOptions", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
      docsOrigin: "https://oxlib.sh",
      showVersion: false,
      version: `ox@${(0, errors_js_1.getVersion)()}`
    }
  });
  (() => {
    BaseError3.setStaticOptions(BaseError3.defaultStaticOptions);
  })();
  function walk2(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && "cause" in err && err.cause)
      return walk2(err.cause, fn);
    return fn ? null : err;
  }
  return Errors;
}
var bytes = {};
var hasRequiredBytes$1;
function requireBytes$1() {
  if (hasRequiredBytes$1) return bytes;
  hasRequiredBytes$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.charCodeMap = void 0;
    exports.assertSize = assertSize2;
    exports.assertStartOffset = assertStartOffset2;
    exports.assertEndOffset = assertEndOffset2;
    exports.charCodeToBase16 = charCodeToBase162;
    exports.pad = pad2;
    exports.trim = trim2;
    const Bytes2 = requireBytes();
    function assertSize2(bytes2, size_) {
      if (Bytes2.size(bytes2) > size_)
        throw new Bytes2.SizeOverflowError({
          givenSize: Bytes2.size(bytes2),
          maxSize: size_
        });
    }
    function assertStartOffset2(value, start) {
      if (typeof start === "number" && start > 0 && start > Bytes2.size(value) - 1)
        throw new Bytes2.SliceOffsetOutOfBoundsError({
          offset: start,
          position: "start",
          size: Bytes2.size(value)
        });
    }
    function assertEndOffset2(value, start, end) {
      if (typeof start === "number" && typeof end === "number" && Bytes2.size(value) !== end - start) {
        throw new Bytes2.SliceOffsetOutOfBoundsError({
          offset: end,
          position: "end",
          size: Bytes2.size(value)
        });
      }
    }
    exports.charCodeMap = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
    function charCodeToBase162(char) {
      if (char >= exports.charCodeMap.zero && char <= exports.charCodeMap.nine)
        return char - exports.charCodeMap.zero;
      if (char >= exports.charCodeMap.A && char <= exports.charCodeMap.F)
        return char - (exports.charCodeMap.A - 10);
      if (char >= exports.charCodeMap.a && char <= exports.charCodeMap.f)
        return char - (exports.charCodeMap.a - 10);
      return void 0;
    }
    function pad2(bytes2, options = {}) {
      const { dir, size: size2 = 32 } = options;
      if (size2 === 0)
        return bytes2;
      if (bytes2.length > size2)
        throw new Bytes2.SizeExceedsPaddingSizeError({
          size: bytes2.length,
          targetSize: size2,
          type: "Bytes"
        });
      const paddedBytes = new Uint8Array(size2);
      for (let i = 0; i < size2; i++) {
        const padEnd = dir === "right";
        paddedBytes[padEnd ? i : size2 - i - 1] = bytes2[padEnd ? i : bytes2.length - i - 1];
      }
      return paddedBytes;
    }
    function trim2(value, options = {}) {
      const { dir = "left" } = options;
      let data = value;
      let sliceLength = 0;
      for (let i = 0; i < data.length - 1; i++) {
        if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
          sliceLength++;
        else
          break;
      }
      data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
      return data;
    }
  })(bytes);
  return bytes;
}
var hex = {};
var hasRequiredHex$1;
function requireHex$1() {
  if (hasRequiredHex$1) return hex;
  hasRequiredHex$1 = 1;
  Object.defineProperty(hex, "__esModule", { value: true });
  hex.assertSize = assertSize2;
  hex.assertStartOffset = assertStartOffset2;
  hex.assertEndOffset = assertEndOffset2;
  hex.pad = pad2;
  hex.trim = trim2;
  const Hex2 = requireHex();
  function assertSize2(hex2, size_) {
    if (Hex2.size(hex2) > size_)
      throw new Hex2.SizeOverflowError({
        givenSize: Hex2.size(hex2),
        maxSize: size_
      });
  }
  function assertStartOffset2(value, start) {
    if (typeof start === "number" && start > 0 && start > Hex2.size(value) - 1)
      throw new Hex2.SliceOffsetOutOfBoundsError({
        offset: start,
        position: "start",
        size: Hex2.size(value)
      });
  }
  function assertEndOffset2(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && Hex2.size(value) !== end - start) {
      throw new Hex2.SliceOffsetOutOfBoundsError({
        offset: end,
        position: "end",
        size: Hex2.size(value)
      });
    }
  }
  function pad2(hex_, options = {}) {
    const { dir, size: size2 = 32 } = options;
    if (size2 === 0)
      return hex_;
    const hex2 = hex_.replace("0x", "");
    if (hex2.length > size2 * 2)
      throw new Hex2.SizeExceedsPaddingSizeError({
        size: Math.ceil(hex2.length / 2),
        targetSize: size2,
        type: "Hex"
      });
    return `0x${hex2[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
  }
  function trim2(value, options = {}) {
    const { dir = "left" } = options;
    let data = value.replace("0x", "");
    let sliceLength = 0;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
        sliceLength++;
      else
        break;
    }
    data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (data === "0")
      return "0x";
    if (dir === "right" && data.length % 2 === 1)
      return `0x${data}0`;
    return `0x${data}`;
  }
  return hex;
}
var Json = {};
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return Json;
  hasRequiredJson = 1;
  Object.defineProperty(Json, "__esModule", { value: true });
  Json.canonicalize = canonicalize;
  Json.parse = parse2;
  Json.stringify = stringify2;
  const bigIntSuffix2 = "#__bigint";
  function canonicalize(value) {
    if (value === null || typeof value === "boolean" || typeof value === "string")
      return JSON.stringify(value);
    if (typeof value === "number") {
      if (!Number.isFinite(value))
        throw new TypeError("Cannot canonicalize non-finite number");
      return Object.is(value, -0) ? "0" : JSON.stringify(value);
    }
    if (typeof value === "bigint")
      throw new TypeError("Cannot canonicalize bigint");
    if (Array.isArray(value))
      return `[${value.map((item) => canonicalize(item)).join(",")}]`;
    if (typeof value === "object") {
      const entries = Object.keys(value).sort().reduce((acc, key) => {
        const v = value[key];
        if (v !== void 0)
          acc.push(`${JSON.stringify(key)}:${canonicalize(v)}`);
        return acc;
      }, []);
      return `{${entries.join(",")}}`;
    }
    return void 0;
  }
  function parse2(string, reviver) {
    return JSON.parse(string, (key, value_) => {
      const value = value_;
      if (typeof value === "string" && value.endsWith(bigIntSuffix2))
        return BigInt(value.slice(0, -bigIntSuffix2.length));
      return typeof reviver === "function" ? reviver(key, value) : value;
    });
  }
  function stringify2(value, replacer, space) {
    return JSON.stringify(value, (key, value2) => {
      if (typeof replacer === "function")
        return replacer(key, value2);
      if (typeof value2 === "bigint")
        return value2.toString() + bigIntSuffix2;
      return value2;
    }, space);
  }
  return Json;
}
var hasRequiredBytes;
function requireBytes() {
  if (hasRequiredBytes) return Bytes;
  hasRequiredBytes = 1;
  Object.defineProperty(Bytes, "__esModule", { value: true });
  Bytes.SizeExceedsPaddingSizeError = Bytes.SliceOffsetOutOfBoundsError = Bytes.SizeOverflowError = Bytes.InvalidBytesTypeError = Bytes.InvalidBytesBooleanError = void 0;
  Bytes.assert = assert2;
  Bytes.concat = concat2;
  Bytes.from = from2;
  Bytes.fromArray = fromArray2;
  Bytes.fromBoolean = fromBoolean2;
  Bytes.fromHex = fromHex2;
  Bytes.fromNumber = fromNumber2;
  Bytes.fromString = fromString2;
  Bytes.isEqual = isEqual2;
  Bytes.padLeft = padLeft2;
  Bytes.padRight = padRight2;
  Bytes.random = random2;
  Bytes.size = size2;
  Bytes.slice = slice2;
  Bytes.toBigInt = toBigInt2;
  Bytes.toBoolean = toBoolean2;
  Bytes.toHex = toHex2;
  Bytes.toNumber = toNumber2;
  Bytes.toString = toString2;
  Bytes.trimLeft = trimLeft2;
  Bytes.trimRight = trimRight2;
  Bytes.validate = validate2;
  const utils_1 = /* @__PURE__ */ requireUtils$1();
  const Errors2 = requireErrors();
  const Hex2 = requireHex();
  const internal = requireBytes$1();
  const internal_hex = requireHex$1();
  const Json2 = requireJson();
  const decoder2 = new TextDecoder();
  const encoder2 = new TextEncoder();
  function assert2(value) {
    if (value instanceof Uint8Array)
      return;
    if (!value)
      throw new InvalidBytesTypeError3(value);
    if (typeof value !== "object")
      throw new InvalidBytesTypeError3(value);
    if (!("BYTES_PER_ELEMENT" in value))
      throw new InvalidBytesTypeError3(value);
    if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
      throw new InvalidBytesTypeError3(value);
  }
  function concat2(...values) {
    let length = 0;
    for (const arr of values) {
      length += arr.length;
    }
    const result = new Uint8Array(length);
    for (let i = 0, index = 0; i < values.length; i++) {
      const arr = values[i];
      result.set(arr, index);
      index += arr.length;
    }
    return result;
  }
  function from2(value) {
    if (value instanceof Uint8Array)
      return value;
    if (typeof value === "string")
      return fromHex2(value);
    return fromArray2(value);
  }
  function fromArray2(value) {
    return value instanceof Uint8Array ? value : new Uint8Array(value);
  }
  function fromBoolean2(value, options = {}) {
    const { size: size3 } = options;
    const bytes2 = new Uint8Array(1);
    bytes2[0] = Number(value);
    if (typeof size3 === "number") {
      internal.assertSize(bytes2, size3);
      return padLeft2(bytes2, size3);
    }
    return bytes2;
  }
  function fromHex2(value, options = {}) {
    const { size: size3 } = options;
    let hex2 = value;
    if (size3) {
      internal_hex.assertSize(value, size3);
      hex2 = Hex2.padRight(value, size3);
    }
    let hexString = hex2.slice(2);
    if (hexString.length % 2)
      hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes2 = new Uint8Array(length);
    for (let index = 0, j = 0; index < length; index++) {
      const nibbleLeft = internal.charCodeToBase16(hexString.charCodeAt(j++));
      const nibbleRight = internal.charCodeToBase16(hexString.charCodeAt(j++));
      if (nibbleLeft === void 0 || nibbleRight === void 0) {
        throw new Errors2.BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
      }
      bytes2[index] = nibbleLeft << 4 | nibbleRight;
    }
    return bytes2;
  }
  function fromNumber2(value, options) {
    const hex2 = Hex2.fromNumber(value, options);
    return fromHex2(hex2);
  }
  function fromString2(value, options = {}) {
    const { size: size3 } = options;
    const bytes2 = encoder2.encode(value);
    if (typeof size3 === "number") {
      internal.assertSize(bytes2, size3);
      return padRight2(bytes2, size3);
    }
    return bytes2;
  }
  function isEqual2(bytesA, bytesB) {
    return (0, utils_1.equalBytes)(bytesA, bytesB);
  }
  function padLeft2(value, size3) {
    return internal.pad(value, { dir: "left", size: size3 });
  }
  function padRight2(value, size3) {
    return internal.pad(value, { dir: "right", size: size3 });
  }
  function random2(length) {
    return crypto.getRandomValues(new Uint8Array(length));
  }
  function size2(value) {
    return value.length;
  }
  function slice2(value, start, end, options = {}) {
    const { strict } = options;
    internal.assertStartOffset(value, start);
    const value_ = value.slice(start, end);
    if (strict)
      internal.assertEndOffset(value_, start, end);
    return value_;
  }
  function toBigInt2(bytes2, options = {}) {
    const { size: size3 } = options;
    if (typeof size3 !== "undefined")
      internal.assertSize(bytes2, size3);
    const hex2 = Hex2.fromBytes(bytes2, options);
    return Hex2.toBigInt(hex2, options);
  }
  function toBoolean2(bytes2, options = {}) {
    const { size: size3 } = options;
    let bytes_ = bytes2;
    if (typeof size3 !== "undefined") {
      internal.assertSize(bytes_, size3);
      bytes_ = trimLeft2(bytes_);
    }
    if (bytes_.length > 1 || bytes_[0] > 1)
      throw new InvalidBytesBooleanError2(bytes_);
    return Boolean(bytes_[0]);
  }
  function toHex2(value, options = {}) {
    return Hex2.fromBytes(value, options);
  }
  function toNumber2(bytes2, options = {}) {
    const { size: size3 } = options;
    if (typeof size3 !== "undefined")
      internal.assertSize(bytes2, size3);
    const hex2 = Hex2.fromBytes(bytes2, options);
    return Hex2.toNumber(hex2, options);
  }
  function toString2(bytes2, options = {}) {
    const { size: size3 } = options;
    let bytes_ = bytes2;
    if (typeof size3 !== "undefined") {
      internal.assertSize(bytes_, size3);
      bytes_ = trimRight2(bytes_);
    }
    return decoder2.decode(bytes_);
  }
  function trimLeft2(value) {
    return internal.trim(value, { dir: "left" });
  }
  function trimRight2(value) {
    return internal.trim(value, { dir: "right" });
  }
  function validate2(value) {
    try {
      assert2(value);
      return true;
    } catch {
      return false;
    }
  }
  class InvalidBytesBooleanError2 extends Errors2.BaseError {
    constructor(bytes2) {
      super(`Bytes value \`${bytes2}\` is not a valid boolean.`, {
        metaMessages: [
          "The bytes array must contain a single byte of either a `0` or `1` value."
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.InvalidBytesBooleanError"
      });
    }
  }
  Bytes.InvalidBytesBooleanError = InvalidBytesBooleanError2;
  class InvalidBytesTypeError3 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${typeof value === "object" ? Json2.stringify(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
        metaMessages: ["Bytes values must be of type `Bytes`."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.InvalidBytesTypeError"
      });
    }
  }
  Bytes.InvalidBytesTypeError = InvalidBytesTypeError3;
  class SizeOverflowError5 extends Errors2.BaseError {
    constructor({ givenSize, maxSize }) {
      super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.SizeOverflowError"
      });
    }
  }
  Bytes.SizeOverflowError = SizeOverflowError5;
  class SliceOffsetOutOfBoundsError4 extends Errors2.BaseError {
    constructor({ offset, position, size: size3 }) {
      super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size3}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.SliceOffsetOutOfBoundsError"
      });
    }
  }
  Bytes.SliceOffsetOutOfBoundsError = SliceOffsetOutOfBoundsError4;
  class SizeExceedsPaddingSizeError4 extends Errors2.BaseError {
    constructor({ size: size3, targetSize, type: type2 }) {
      super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Bytes.SizeExceedsPaddingSizeError"
      });
    }
  }
  Bytes.SizeExceedsPaddingSizeError = SizeExceedsPaddingSizeError4;
  return Bytes;
}
var hasRequiredHex;
function requireHex() {
  if (hasRequiredHex) return Hex;
  hasRequiredHex = 1;
  Object.defineProperty(Hex, "__esModule", { value: true });
  Hex.SizeExceedsPaddingSizeError = Hex.SliceOffsetOutOfBoundsError = Hex.SizeOverflowError = Hex.InvalidLengthError = Hex.InvalidHexValueError = Hex.InvalidHexTypeError = Hex.InvalidHexBooleanError = Hex.IntegerOutOfRangeError = void 0;
  Hex.assert = assert2;
  Hex.concat = concat2;
  Hex.from = from2;
  Hex.fromBoolean = fromBoolean2;
  Hex.fromBytes = fromBytes2;
  Hex.fromNumber = fromNumber2;
  Hex.fromString = fromString2;
  Hex.isEqual = isEqual2;
  Hex.padLeft = padLeft2;
  Hex.padRight = padRight2;
  Hex.random = random2;
  Hex.slice = slice2;
  Hex.size = size2;
  Hex.trimLeft = trimLeft2;
  Hex.trimRight = trimRight2;
  Hex.toBigInt = toBigInt2;
  Hex.toBoolean = toBoolean2;
  Hex.toBytes = toBytes2;
  Hex.toNumber = toNumber2;
  Hex.toString = toString2;
  Hex.validate = validate2;
  const utils_1 = /* @__PURE__ */ requireUtils$1();
  const Bytes2 = requireBytes();
  const Errors2 = requireErrors();
  const internal_bytes = requireBytes$1();
  const internal = requireHex$1();
  const Json2 = requireJson();
  const encoder2 = new TextEncoder();
  const hexes2 = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
  function assert2(value, options = {}) {
    const { strict = false } = options;
    if (!value)
      throw new InvalidHexTypeError3(value);
    if (typeof value !== "string")
      throw new InvalidHexTypeError3(value);
    if (strict) {
      if (!/^0x[0-9a-fA-F]*$/.test(value))
        throw new InvalidHexValueError3(value);
    }
    if (!value.startsWith("0x"))
      throw new InvalidHexValueError3(value);
  }
  function concat2(...values) {
    return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
  }
  function from2(value) {
    if (value instanceof Uint8Array)
      return fromBytes2(value);
    if (Array.isArray(value))
      return fromBytes2(new Uint8Array(value));
    return value;
  }
  function fromBoolean2(value, options = {}) {
    const hex2 = `0x${Number(value)}`;
    if (typeof options.size === "number") {
      internal.assertSize(hex2, options.size);
      return padLeft2(hex2, options.size);
    }
    return hex2;
  }
  function fromBytes2(value, options = {}) {
    let string = "";
    for (let i = 0; i < value.length; i++)
      string += hexes2[value[i]];
    const hex2 = `0x${string}`;
    if (typeof options.size === "number") {
      internal.assertSize(hex2, options.size);
      return padRight2(hex2, options.size);
    }
    return hex2;
  }
  function fromNumber2(value, options = {}) {
    const { signed, size: size3 } = options;
    const value_ = BigInt(value);
    let maxValue;
    if (size3) {
      if (signed)
        maxValue = (1n << BigInt(size3) * 8n - 1n) - 1n;
      else
        maxValue = 2n ** (BigInt(size3) * 8n) - 1n;
    } else if (typeof value === "number") {
      maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
    if (maxValue && value_ > maxValue || value_ < minValue) {
      const suffix = typeof value === "bigint" ? "n" : "";
      throw new IntegerOutOfRangeError3({
        max: maxValue ? `${maxValue}${suffix}` : void 0,
        min: `${minValue}${suffix}`,
        signed,
        size: size3,
        value: `${value}${suffix}`
      });
    }
    const stringValue = (signed && value_ < 0 ? BigInt.asUintN(size3 * 8, BigInt(value_)) : value_).toString(16);
    const hex2 = `0x${stringValue}`;
    if (size3)
      return padLeft2(hex2, size3);
    return hex2;
  }
  function fromString2(value, options = {}) {
    return fromBytes2(encoder2.encode(value), options);
  }
  function isEqual2(hexA, hexB) {
    return (0, utils_1.equalBytes)(Bytes2.fromHex(hexA), Bytes2.fromHex(hexB));
  }
  function padLeft2(value, size3) {
    return internal.pad(value, { dir: "left", size: size3 });
  }
  function padRight2(value, size3) {
    return internal.pad(value, { dir: "right", size: size3 });
  }
  function random2(length) {
    return fromBytes2(Bytes2.random(length));
  }
  function slice2(value, start, end, options = {}) {
    const { strict } = options;
    internal.assertStartOffset(value, start);
    const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
    if (strict)
      internal.assertEndOffset(value_, start, end);
    return value_;
  }
  function size2(value) {
    return Math.ceil((value.length - 2) / 2);
  }
  function trimLeft2(value) {
    return internal.trim(value, { dir: "left" });
  }
  function trimRight2(value) {
    return internal.trim(value, { dir: "right" });
  }
  function toBigInt2(hex2, options = {}) {
    const { signed } = options;
    if (options.size)
      internal.assertSize(hex2, options.size);
    const value = BigInt(hex2);
    if (!signed)
      return value;
    const size3 = (hex2.length - 2) / 2;
    const max_unsigned = (1n << BigInt(size3) * 8n) - 1n;
    const max_signed = max_unsigned >> 1n;
    if (value <= max_signed)
      return value;
    return value - max_unsigned - 1n;
  }
  function toBoolean2(hex2, options = {}) {
    if (options.size)
      internal.assertSize(hex2, options.size);
    const hex_ = trimLeft2(hex2);
    if (hex_ === "0x")
      return false;
    if (hex_ === "0x1")
      return true;
    throw new InvalidHexBooleanError(hex2);
  }
  function toBytes2(hex2, options = {}) {
    return Bytes2.fromHex(hex2, options);
  }
  function toNumber2(hex2, options = {}) {
    const { signed, size: size3 } = options;
    if (!signed && !size3)
      return Number(hex2);
    return Number(toBigInt2(hex2, options));
  }
  function toString2(hex2, options = {}) {
    const { size: size3 } = options;
    let bytes2 = Bytes2.fromHex(hex2);
    if (size3) {
      internal_bytes.assertSize(bytes2, size3);
      bytes2 = Bytes2.trimRight(bytes2);
    }
    return new TextDecoder().decode(bytes2);
  }
  function validate2(value, options = {}) {
    const { strict = false } = options;
    try {
      assert2(value, { strict });
      return true;
    } catch {
      return false;
    }
  }
  class IntegerOutOfRangeError3 extends Errors2.BaseError {
    constructor({ max, min, signed, size: size3, value }) {
      super(`Number \`${value}\` is not in safe${size3 ? ` ${size3 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.IntegerOutOfRangeError"
      });
    }
  }
  Hex.IntegerOutOfRangeError = IntegerOutOfRangeError3;
  class InvalidHexBooleanError extends Errors2.BaseError {
    constructor(hex2) {
      super(`Hex value \`"${hex2}"\` is not a valid boolean.`, {
        metaMessages: [
          'The hex value must be `"0x0"` (false) or `"0x1"` (true).'
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidHexBooleanError"
      });
    }
  }
  Hex.InvalidHexBooleanError = InvalidHexBooleanError;
  class InvalidHexTypeError3 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${typeof value === "object" ? Json2.stringify(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
        metaMessages: ['Hex types must be represented as `"0x${string}"`.']
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidHexTypeError"
      });
    }
  }
  Hex.InvalidHexTypeError = InvalidHexTypeError3;
  class InvalidHexValueError3 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${value}\` is an invalid hex value.`, {
        metaMessages: [
          'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidHexValueError"
      });
    }
  }
  Hex.InvalidHexValueError = InvalidHexValueError3;
  class InvalidLengthError2 extends Errors2.BaseError {
    constructor(value) {
      super(`Hex value \`"${value}"\` is an odd length (${value.length - 2} nibbles).`, {
        metaMessages: ["It must be an even length."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.InvalidLengthError"
      });
    }
  }
  Hex.InvalidLengthError = InvalidLengthError2;
  class SizeOverflowError5 extends Errors2.BaseError {
    constructor({ givenSize, maxSize }) {
      super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.SizeOverflowError"
      });
    }
  }
  Hex.SizeOverflowError = SizeOverflowError5;
  class SliceOffsetOutOfBoundsError4 extends Errors2.BaseError {
    constructor({ offset, position, size: size3 }) {
      super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size3}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.SliceOffsetOutOfBoundsError"
      });
    }
  }
  Hex.SliceOffsetOutOfBoundsError = SliceOffsetOutOfBoundsError4;
  class SizeExceedsPaddingSizeError4 extends Errors2.BaseError {
    constructor({ size: size3, targetSize, type: type2 }) {
      super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Hex.SizeExceedsPaddingSizeError"
      });
    }
  }
  Hex.SizeExceedsPaddingSizeError = SizeExceedsPaddingSizeError4;
  return Hex;
}
var Withdrawal = {};
var hasRequiredWithdrawal;
function requireWithdrawal() {
  if (hasRequiredWithdrawal) return Withdrawal;
  hasRequiredWithdrawal = 1;
  Object.defineProperty(Withdrawal, "__esModule", { value: true });
  Withdrawal.fromRpc = fromRpc2;
  Withdrawal.toRpc = toRpc2;
  const Hex2 = requireHex();
  function fromRpc2(withdrawal) {
    return {
      ...withdrawal,
      amount: BigInt(withdrawal.amount),
      index: Number(withdrawal.index),
      validatorIndex: Number(withdrawal.validatorIndex)
    };
  }
  function toRpc2(withdrawal) {
    return {
      address: withdrawal.address,
      amount: Hex2.fromNumber(withdrawal.amount),
      index: Hex2.fromNumber(withdrawal.index),
      validatorIndex: Hex2.fromNumber(withdrawal.validatorIndex)
    };
  }
  return Withdrawal;
}
var hasRequiredBlockOverrides;
function requireBlockOverrides() {
  if (hasRequiredBlockOverrides) return BlockOverrides;
  hasRequiredBlockOverrides = 1;
  Object.defineProperty(BlockOverrides, "__esModule", { value: true });
  BlockOverrides.fromRpc = fromRpc2;
  BlockOverrides.toRpc = toRpc2;
  const Hex2 = requireHex();
  const Withdrawal2 = requireWithdrawal();
  function fromRpc2(rpcBlockOverrides) {
    return {
      ...rpcBlockOverrides.baseFeePerGas && {
        baseFeePerGas: BigInt(rpcBlockOverrides.baseFeePerGas)
      },
      ...rpcBlockOverrides.blobBaseFee && {
        blobBaseFee: BigInt(rpcBlockOverrides.blobBaseFee)
      },
      ...rpcBlockOverrides.feeRecipient && {
        feeRecipient: rpcBlockOverrides.feeRecipient
      },
      ...rpcBlockOverrides.gasLimit && {
        gasLimit: BigInt(rpcBlockOverrides.gasLimit)
      },
      ...rpcBlockOverrides.number && {
        number: BigInt(rpcBlockOverrides.number)
      },
      ...rpcBlockOverrides.prevRandao && {
        prevRandao: BigInt(rpcBlockOverrides.prevRandao)
      },
      ...rpcBlockOverrides.time && {
        time: BigInt(rpcBlockOverrides.time)
      },
      ...rpcBlockOverrides.withdrawals && {
        withdrawals: rpcBlockOverrides.withdrawals.map(Withdrawal2.fromRpc)
      }
    };
  }
  function toRpc2(blockOverrides) {
    return {
      ...typeof blockOverrides.baseFeePerGas === "bigint" && {
        baseFeePerGas: Hex2.fromNumber(blockOverrides.baseFeePerGas)
      },
      ...typeof blockOverrides.blobBaseFee === "bigint" && {
        blobBaseFee: Hex2.fromNumber(blockOverrides.blobBaseFee)
      },
      ...typeof blockOverrides.feeRecipient === "string" && {
        feeRecipient: blockOverrides.feeRecipient
      },
      ...typeof blockOverrides.gasLimit === "bigint" && {
        gasLimit: Hex2.fromNumber(blockOverrides.gasLimit)
      },
      ...typeof blockOverrides.number === "bigint" && {
        number: Hex2.fromNumber(blockOverrides.number)
      },
      ...typeof blockOverrides.prevRandao === "bigint" && {
        prevRandao: Hex2.fromNumber(blockOverrides.prevRandao)
      },
      ...typeof blockOverrides.time === "bigint" && {
        time: Hex2.fromNumber(blockOverrides.time)
      },
      ...blockOverrides.withdrawals && {
        withdrawals: blockOverrides.withdrawals.map(Withdrawal2.toRpc)
      }
    };
  }
  return BlockOverrides;
}
var erc8010 = {};
var SignatureErc8010 = {};
var AbiParameters = {};
var Address = {};
var Caches = {};
var lru = {};
var hasRequiredLru;
function requireLru() {
  if (hasRequiredLru) return lru;
  hasRequiredLru = 1;
  Object.defineProperty(lru, "__esModule", { value: true });
  lru.LruMap = void 0;
  class LruMap2 extends Map {
    constructor(size2) {
      super();
      Object.defineProperty(this, "maxSize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.maxSize = size2;
    }
    get(key) {
      const value = super.get(key);
      if (super.has(key) && value !== void 0) {
        this.delete(key);
        super.set(key, value);
      }
      return value;
    }
    set(key, value) {
      super.set(key, value);
      if (this.maxSize && this.size > this.maxSize) {
        const firstKey = this.keys().next().value;
        if (firstKey)
          this.delete(firstKey);
      }
      return this;
    }
  }
  lru.LruMap = LruMap2;
  return lru;
}
var hasRequiredCaches;
function requireCaches() {
  if (hasRequiredCaches) return Caches;
  hasRequiredCaches = 1;
  Object.defineProperty(Caches, "__esModule", { value: true });
  Caches.checksum = void 0;
  Caches.clear = clear;
  const lru_js_1 = requireLru();
  const caches2 = {
    checksum: new lru_js_1.LruMap(8192)
  };
  Caches.checksum = caches2.checksum;
  function clear() {
    for (const cache of Object.values(caches2))
      cache.clear();
  }
  return Caches;
}
var Hash = {};
var hasRequiredHash;
function requireHash() {
  if (hasRequiredHash) return Hash;
  hasRequiredHash = 1;
  Object.defineProperty(Hash, "__esModule", { value: true });
  Hash.keccak256 = keccak2562;
  Hash.hmac256 = hmac256;
  Hash.ripemd160 = ripemd160;
  Hash.sha256 = sha2562;
  Hash.validate = validate2;
  const hmac_1 = /* @__PURE__ */ requireHmac();
  const ripemd160_1 = /* @__PURE__ */ requireRipemd160$1();
  const sha3_1 = /* @__PURE__ */ requireSha3$1();
  const sha256_1 = /* @__PURE__ */ requireSha256$1();
  const Bytes2 = requireBytes();
  const Hex2 = requireHex();
  function keccak2562(value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes2 = (0, sha3_1.keccak_256)(Bytes2.from(value));
    if (as === "Bytes")
      return bytes2;
    return Hex2.fromBytes(bytes2);
  }
  function hmac256(key, value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes2 = (0, hmac_1.hmac)(sha256_1.sha256, Bytes2.from(key), Bytes2.from(value));
    if (as === "Bytes")
      return bytes2;
    return Hex2.fromBytes(bytes2);
  }
  function ripemd160(value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes2 = (0, ripemd160_1.ripemd160)(Bytes2.from(value));
    if (as === "Bytes")
      return bytes2;
    return Hex2.fromBytes(bytes2);
  }
  function sha2562(value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes2 = (0, sha256_1.sha256)(Bytes2.from(value));
    if (as === "Bytes")
      return bytes2;
    return Hex2.fromBytes(bytes2);
  }
  function validate2(value) {
    return Hex2.validate(value) && Hex2.size(value) === 32;
  }
  return Hash;
}
var PublicKey = {};
var hasRequiredPublicKey;
function requirePublicKey() {
  if (hasRequiredPublicKey) return PublicKey;
  hasRequiredPublicKey = 1;
  Object.defineProperty(PublicKey, "__esModule", { value: true });
  PublicKey.InvalidSerializedSizeError = PublicKey.InvalidUncompressedPrefixError = PublicKey.InvalidCompressedPrefixError = PublicKey.InvalidPrefixError = PublicKey.InvalidError = void 0;
  PublicKey.assert = assert2;
  PublicKey.compress = compress;
  PublicKey.from = from2;
  PublicKey.fromBytes = fromBytes2;
  PublicKey.fromHex = fromHex2;
  PublicKey.toBytes = toBytes2;
  PublicKey.toHex = toHex2;
  PublicKey.validate = validate2;
  const Bytes2 = requireBytes();
  const Errors2 = requireErrors();
  const Hex2 = requireHex();
  const Json2 = requireJson();
  function assert2(publicKey, options = {}) {
    const { compressed } = options;
    const { prefix, x, y } = publicKey;
    if (compressed === false || typeof x === "bigint" && typeof y === "bigint") {
      if (prefix !== 4)
        throw new InvalidPrefixError4({
          prefix,
          cause: new InvalidUncompressedPrefixError3()
        });
      return;
    }
    if (compressed === true || typeof x === "bigint" && typeof y === "undefined") {
      if (prefix !== 3 && prefix !== 2)
        throw new InvalidPrefixError4({
          prefix,
          cause: new InvalidCompressedPrefixError3()
        });
      return;
    }
    throw new InvalidError3({ publicKey });
  }
  function compress(publicKey) {
    const { x, y } = publicKey;
    return {
      prefix: y % 2n === 0n ? 2 : 3,
      x
    };
  }
  function from2(value) {
    const publicKey = (() => {
      if (Hex2.validate(value))
        return fromHex2(value);
      if (Bytes2.validate(value))
        return fromBytes2(value);
      const { prefix, x, y } = value;
      if (typeof x === "bigint" && typeof y === "bigint")
        return { prefix: prefix ?? 4, x, y };
      return { prefix, x };
    })();
    assert2(publicKey);
    return publicKey;
  }
  function fromBytes2(publicKey) {
    return fromHex2(Hex2.fromBytes(publicKey));
  }
  function fromHex2(publicKey) {
    if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
      throw new InvalidSerializedSizeError5({ publicKey });
    if (publicKey.length === 130) {
      const x2 = BigInt(Hex2.slice(publicKey, 0, 32));
      const y = BigInt(Hex2.slice(publicKey, 32, 64));
      return {
        prefix: 4,
        x: x2,
        y
      };
    }
    if (publicKey.length === 132) {
      const prefix2 = Number(Hex2.slice(publicKey, 0, 1));
      const x2 = BigInt(Hex2.slice(publicKey, 1, 33));
      const y = BigInt(Hex2.slice(publicKey, 33, 65));
      return {
        prefix: prefix2,
        x: x2,
        y
      };
    }
    const prefix = Number(Hex2.slice(publicKey, 0, 1));
    const x = BigInt(Hex2.slice(publicKey, 1, 33));
    return {
      prefix,
      x
    };
  }
  function toBytes2(publicKey, options = {}) {
    return Bytes2.fromHex(toHex2(publicKey, options));
  }
  function toHex2(publicKey, options = {}) {
    assert2(publicKey);
    const { prefix, x, y } = publicKey;
    const { includePrefix = true } = options;
    const publicKey_ = Hex2.concat(includePrefix ? Hex2.fromNumber(prefix, { size: 1 }) : "0x", Hex2.fromNumber(x, { size: 32 }), typeof y === "bigint" ? Hex2.fromNumber(y, { size: 32 }) : "0x");
    return publicKey_;
  }
  function validate2(publicKey, options = {}) {
    try {
      assert2(publicKey, options);
      return true;
    } catch (_error) {
      return false;
    }
  }
  class InvalidError3 extends Errors2.BaseError {
    constructor({ publicKey }) {
      super(`Value \`${Json2.stringify(publicKey)}\` is not a valid public key.`, {
        metaMessages: [
          "Public key must contain:",
          "- an `x` and `prefix` value (compressed)",
          "- an `x`, `y`, and `prefix` value (uncompressed)"
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidError"
      });
    }
  }
  PublicKey.InvalidError = InvalidError3;
  class InvalidPrefixError4 extends Errors2.BaseError {
    constructor({ prefix, cause }) {
      super(`Prefix "${prefix}" is invalid.`, {
        cause
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidPrefixError"
      });
    }
  }
  PublicKey.InvalidPrefixError = InvalidPrefixError4;
  class InvalidCompressedPrefixError3 extends Errors2.BaseError {
    constructor() {
      super("Prefix must be 2 or 3 for compressed public keys.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidCompressedPrefixError"
      });
    }
  }
  PublicKey.InvalidCompressedPrefixError = InvalidCompressedPrefixError3;
  class InvalidUncompressedPrefixError3 extends Errors2.BaseError {
    constructor() {
      super("Prefix must be 4 for uncompressed public keys.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidUncompressedPrefixError"
      });
    }
  }
  PublicKey.InvalidUncompressedPrefixError = InvalidUncompressedPrefixError3;
  class InvalidSerializedSizeError5 extends Errors2.BaseError {
    constructor({ publicKey }) {
      super(`Value \`${publicKey}\` is an invalid public key size.`, {
        metaMessages: [
          "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
          `Received ${Hex2.size(Hex2.from(publicKey))} bytes.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidSerializedSizeError"
      });
    }
  }
  PublicKey.InvalidSerializedSizeError = InvalidSerializedSizeError5;
  return PublicKey;
}
var hasRequiredAddress;
function requireAddress() {
  if (hasRequiredAddress) return Address;
  hasRequiredAddress = 1;
  Object.defineProperty(Address, "__esModule", { value: true });
  Address.InvalidChecksumError = Address.InvalidInputError = Address.InvalidAddressError = void 0;
  Address.assert = assert2;
  Address.checksum = checksum2;
  Address.from = from2;
  Address.fromPublicKey = fromPublicKey2;
  Address.isEqual = isEqual2;
  Address.validate = validate2;
  const Bytes2 = requireBytes();
  const Caches2 = requireCaches();
  const Errors2 = requireErrors();
  const Hash2 = requireHash();
  const PublicKey2 = requirePublicKey();
  const addressRegex2 = /^0x[a-fA-F0-9]{40}$/;
  function assert2(value, options = {}) {
    const { strict = true } = options;
    if (!addressRegex2.test(value))
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidInputError2()
      });
    if (strict) {
      if (value.toLowerCase() === value)
        return;
      if (checksum2(value) !== value)
        throw new InvalidAddressError2({
          address: value,
          cause: new InvalidChecksumError2()
        });
    }
  }
  function checksum2(address) {
    if (Caches2.checksum.has(address))
      return Caches2.checksum.get(address);
    assert2(address, { strict: false });
    const hexAddress = address.substring(2).toLowerCase();
    const hash2 = Hash2.keccak256(Bytes2.fromString(hexAddress), { as: "Bytes" });
    const characters = hexAddress.split("");
    for (let i = 0; i < 40; i += 2) {
      if (hash2[i >> 1] >> 4 >= 8 && characters[i]) {
        characters[i] = characters[i].toUpperCase();
      }
      if ((hash2[i >> 1] & 15) >= 8 && characters[i + 1]) {
        characters[i + 1] = characters[i + 1].toUpperCase();
      }
    }
    const result = `0x${characters.join("")}`;
    Caches2.checksum.set(address, result);
    return result;
  }
  function from2(address, options = {}) {
    const { checksum: checksumVal = false } = options;
    assert2(address);
    if (checksumVal)
      return checksum2(address);
    return address;
  }
  function fromPublicKey2(publicKey, options = {}) {
    const address = Hash2.keccak256(`0x${PublicKey2.toHex(publicKey).slice(4)}`).substring(26);
    return from2(`0x${address}`, options);
  }
  function isEqual2(addressA, addressB) {
    assert2(addressA, { strict: false });
    assert2(addressB, { strict: false });
    return addressA.toLowerCase() === addressB.toLowerCase();
  }
  function validate2(address, options = {}) {
    const { strict = true } = options ?? {};
    try {
      assert2(address, { strict });
      return true;
    } catch {
      return false;
    }
  }
  class InvalidAddressError2 extends Errors2.BaseError {
    constructor({ address, cause }) {
      super(`Address "${address}" is invalid.`, {
        cause
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidAddressError"
      });
    }
  }
  Address.InvalidAddressError = InvalidAddressError2;
  class InvalidInputError2 extends Errors2.BaseError {
    constructor() {
      super("Address is not a 20 byte (40 hexadecimal character) value.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidInputError"
      });
    }
  }
  Address.InvalidInputError = InvalidInputError2;
  class InvalidChecksumError2 extends Errors2.BaseError {
    constructor() {
      super("Address does not match its checksum counterpart.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidChecksumError"
      });
    }
  }
  Address.InvalidChecksumError = InvalidChecksumError2;
  return Address;
}
var abiParameters = {};
var Solidity = {};
var hasRequiredSolidity;
function requireSolidity() {
  if (hasRequiredSolidity) return Solidity;
  hasRequiredSolidity = 1;
  Object.defineProperty(Solidity, "__esModule", { value: true });
  Solidity.minInt120 = Solidity.minInt112 = Solidity.minInt104 = Solidity.minInt96 = Solidity.minInt88 = Solidity.minInt80 = Solidity.minInt72 = Solidity.minInt64 = Solidity.minInt56 = Solidity.minInt48 = Solidity.minInt40 = Solidity.minInt32 = Solidity.minInt24 = Solidity.minInt16 = Solidity.minInt8 = Solidity.maxInt256 = Solidity.maxInt248 = Solidity.maxInt240 = Solidity.maxInt232 = Solidity.maxInt224 = Solidity.maxInt216 = Solidity.maxInt208 = Solidity.maxInt200 = Solidity.maxInt192 = Solidity.maxInt184 = Solidity.maxInt176 = Solidity.maxInt168 = Solidity.maxInt160 = Solidity.maxInt152 = Solidity.maxInt144 = Solidity.maxInt136 = Solidity.maxInt128 = Solidity.maxInt120 = Solidity.maxInt112 = Solidity.maxInt104 = Solidity.maxInt96 = Solidity.maxInt88 = Solidity.maxInt80 = Solidity.maxInt72 = Solidity.maxInt64 = Solidity.maxInt56 = Solidity.maxInt48 = Solidity.maxInt40 = Solidity.maxInt32 = Solidity.maxInt24 = Solidity.maxInt16 = Solidity.maxInt8 = Solidity.integerRegex = Solidity.bytesRegex = Solidity.arrayRegex = void 0;
  Solidity.maxUint256 = Solidity.maxUint248 = Solidity.maxUint240 = Solidity.maxUint232 = Solidity.maxUint224 = Solidity.maxUint216 = Solidity.maxUint208 = Solidity.maxUint200 = Solidity.maxUint192 = Solidity.maxUint184 = Solidity.maxUint176 = Solidity.maxUint168 = Solidity.maxUint160 = Solidity.maxUint152 = Solidity.maxUint144 = Solidity.maxUint136 = Solidity.maxUint128 = Solidity.maxUint120 = Solidity.maxUint112 = Solidity.maxUint104 = Solidity.maxUint96 = Solidity.maxUint88 = Solidity.maxUint80 = Solidity.maxUint72 = Solidity.maxUint64 = Solidity.maxUint56 = Solidity.maxUint48 = Solidity.maxUint40 = Solidity.maxUint32 = Solidity.maxUint24 = Solidity.maxUint16 = Solidity.maxUint8 = Solidity.minInt256 = Solidity.minInt248 = Solidity.minInt240 = Solidity.minInt232 = Solidity.minInt224 = Solidity.minInt216 = Solidity.minInt208 = Solidity.minInt200 = Solidity.minInt192 = Solidity.minInt184 = Solidity.minInt176 = Solidity.minInt168 = Solidity.minInt160 = Solidity.minInt152 = Solidity.minInt144 = Solidity.minInt136 = Solidity.minInt128 = void 0;
  Solidity.arrayRegex = /^(.*)\[([0-9]*)\]$/;
  Solidity.bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
  Solidity.integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  Solidity.maxInt8 = 2n ** (8n - 1n) - 1n;
  Solidity.maxInt16 = 2n ** (16n - 1n) - 1n;
  Solidity.maxInt24 = 2n ** (24n - 1n) - 1n;
  Solidity.maxInt32 = 2n ** (32n - 1n) - 1n;
  Solidity.maxInt40 = 2n ** (40n - 1n) - 1n;
  Solidity.maxInt48 = 2n ** (48n - 1n) - 1n;
  Solidity.maxInt56 = 2n ** (56n - 1n) - 1n;
  Solidity.maxInt64 = 2n ** (64n - 1n) - 1n;
  Solidity.maxInt72 = 2n ** (72n - 1n) - 1n;
  Solidity.maxInt80 = 2n ** (80n - 1n) - 1n;
  Solidity.maxInt88 = 2n ** (88n - 1n) - 1n;
  Solidity.maxInt96 = 2n ** (96n - 1n) - 1n;
  Solidity.maxInt104 = 2n ** (104n - 1n) - 1n;
  Solidity.maxInt112 = 2n ** (112n - 1n) - 1n;
  Solidity.maxInt120 = 2n ** (120n - 1n) - 1n;
  Solidity.maxInt128 = 2n ** (128n - 1n) - 1n;
  Solidity.maxInt136 = 2n ** (136n - 1n) - 1n;
  Solidity.maxInt144 = 2n ** (144n - 1n) - 1n;
  Solidity.maxInt152 = 2n ** (152n - 1n) - 1n;
  Solidity.maxInt160 = 2n ** (160n - 1n) - 1n;
  Solidity.maxInt168 = 2n ** (168n - 1n) - 1n;
  Solidity.maxInt176 = 2n ** (176n - 1n) - 1n;
  Solidity.maxInt184 = 2n ** (184n - 1n) - 1n;
  Solidity.maxInt192 = 2n ** (192n - 1n) - 1n;
  Solidity.maxInt200 = 2n ** (200n - 1n) - 1n;
  Solidity.maxInt208 = 2n ** (208n - 1n) - 1n;
  Solidity.maxInt216 = 2n ** (216n - 1n) - 1n;
  Solidity.maxInt224 = 2n ** (224n - 1n) - 1n;
  Solidity.maxInt232 = 2n ** (232n - 1n) - 1n;
  Solidity.maxInt240 = 2n ** (240n - 1n) - 1n;
  Solidity.maxInt248 = 2n ** (248n - 1n) - 1n;
  Solidity.maxInt256 = 2n ** (256n - 1n) - 1n;
  Solidity.minInt8 = -(2n ** (8n - 1n));
  Solidity.minInt16 = -(2n ** (16n - 1n));
  Solidity.minInt24 = -(2n ** (24n - 1n));
  Solidity.minInt32 = -(2n ** (32n - 1n));
  Solidity.minInt40 = -(2n ** (40n - 1n));
  Solidity.minInt48 = -(2n ** (48n - 1n));
  Solidity.minInt56 = -(2n ** (56n - 1n));
  Solidity.minInt64 = -(2n ** (64n - 1n));
  Solidity.minInt72 = -(2n ** (72n - 1n));
  Solidity.minInt80 = -(2n ** (80n - 1n));
  Solidity.minInt88 = -(2n ** (88n - 1n));
  Solidity.minInt96 = -(2n ** (96n - 1n));
  Solidity.minInt104 = -(2n ** (104n - 1n));
  Solidity.minInt112 = -(2n ** (112n - 1n));
  Solidity.minInt120 = -(2n ** (120n - 1n));
  Solidity.minInt128 = -(2n ** (128n - 1n));
  Solidity.minInt136 = -(2n ** (136n - 1n));
  Solidity.minInt144 = -(2n ** (144n - 1n));
  Solidity.minInt152 = -(2n ** (152n - 1n));
  Solidity.minInt160 = -(2n ** (160n - 1n));
  Solidity.minInt168 = -(2n ** (168n - 1n));
  Solidity.minInt176 = -(2n ** (176n - 1n));
  Solidity.minInt184 = -(2n ** (184n - 1n));
  Solidity.minInt192 = -(2n ** (192n - 1n));
  Solidity.minInt200 = -(2n ** (200n - 1n));
  Solidity.minInt208 = -(2n ** (208n - 1n));
  Solidity.minInt216 = -(2n ** (216n - 1n));
  Solidity.minInt224 = -(2n ** (224n - 1n));
  Solidity.minInt232 = -(2n ** (232n - 1n));
  Solidity.minInt240 = -(2n ** (240n - 1n));
  Solidity.minInt248 = -(2n ** (248n - 1n));
  Solidity.minInt256 = -(2n ** (256n - 1n));
  Solidity.maxUint8 = 2n ** 8n - 1n;
  Solidity.maxUint16 = 2n ** 16n - 1n;
  Solidity.maxUint24 = 2n ** 24n - 1n;
  Solidity.maxUint32 = 2n ** 32n - 1n;
  Solidity.maxUint40 = 2n ** 40n - 1n;
  Solidity.maxUint48 = 2n ** 48n - 1n;
  Solidity.maxUint56 = 2n ** 56n - 1n;
  Solidity.maxUint64 = 2n ** 64n - 1n;
  Solidity.maxUint72 = 2n ** 72n - 1n;
  Solidity.maxUint80 = 2n ** 80n - 1n;
  Solidity.maxUint88 = 2n ** 88n - 1n;
  Solidity.maxUint96 = 2n ** 96n - 1n;
  Solidity.maxUint104 = 2n ** 104n - 1n;
  Solidity.maxUint112 = 2n ** 112n - 1n;
  Solidity.maxUint120 = 2n ** 120n - 1n;
  Solidity.maxUint128 = 2n ** 128n - 1n;
  Solidity.maxUint136 = 2n ** 136n - 1n;
  Solidity.maxUint144 = 2n ** 144n - 1n;
  Solidity.maxUint152 = 2n ** 152n - 1n;
  Solidity.maxUint160 = 2n ** 160n - 1n;
  Solidity.maxUint168 = 2n ** 168n - 1n;
  Solidity.maxUint176 = 2n ** 176n - 1n;
  Solidity.maxUint184 = 2n ** 184n - 1n;
  Solidity.maxUint192 = 2n ** 192n - 1n;
  Solidity.maxUint200 = 2n ** 200n - 1n;
  Solidity.maxUint208 = 2n ** 208n - 1n;
  Solidity.maxUint216 = 2n ** 216n - 1n;
  Solidity.maxUint224 = 2n ** 224n - 1n;
  Solidity.maxUint232 = 2n ** 232n - 1n;
  Solidity.maxUint240 = 2n ** 240n - 1n;
  Solidity.maxUint248 = 2n ** 248n - 1n;
  Solidity.maxUint256 = 2n ** 256n - 1n;
  return Solidity;
}
var hasRequiredAbiParameters$1;
function requireAbiParameters$1() {
  if (hasRequiredAbiParameters$1) return abiParameters;
  hasRequiredAbiParameters$1 = 1;
  Object.defineProperty(abiParameters, "__esModule", { value: true });
  abiParameters.decodeParameter = decodeParameter2;
  abiParameters.decodeAddress = decodeAddress2;
  abiParameters.decodeArray = decodeArray2;
  abiParameters.decodeBool = decodeBool2;
  abiParameters.decodeBytes = decodeBytes2;
  abiParameters.decodeNumber = decodeNumber2;
  abiParameters.decodeTuple = decodeTuple2;
  abiParameters.decodeString = decodeString2;
  abiParameters.prepareParameters = prepareParameters2;
  abiParameters.prepareParameter = prepareParameter2;
  abiParameters.encode = encode2;
  abiParameters.encodeAddress = encodeAddress2;
  abiParameters.encodeArray = encodeArray2;
  abiParameters.encodeBytes = encodeBytes2;
  abiParameters.encodeBoolean = encodeBoolean2;
  abiParameters.encodeNumber = encodeNumber2;
  abiParameters.encodeString = encodeString2;
  abiParameters.encodeTuple = encodeTuple2;
  abiParameters.getArrayComponents = getArrayComponents2;
  abiParameters.hasDynamicChild = hasDynamicChild2;
  const AbiParameters2 = requireAbiParameters();
  const Address2 = requireAddress();
  const Bytes2 = requireBytes();
  const Errors2 = requireErrors();
  const Hex2 = requireHex();
  const Solidity_js_1 = requireSolidity();
  function decodeParameter2(cursor2, param, options) {
    const { checksumAddress, staticPosition } = options;
    const arrayComponents = getArrayComponents2(param.type);
    if (arrayComponents) {
      const [length, type2] = arrayComponents;
      return decodeArray2(cursor2, { ...param, type: type2 }, { checksumAddress, length, staticPosition });
    }
    if (param.type === "tuple")
      return decodeTuple2(cursor2, param, {
        checksumAddress,
        staticPosition
      });
    if (param.type === "address")
      return decodeAddress2(cursor2, { checksum: checksumAddress });
    if (param.type === "bool")
      return decodeBool2(cursor2);
    if (param.type.startsWith("bytes"))
      return decodeBytes2(cursor2, param, { staticPosition });
    if (param.type.startsWith("uint") || param.type.startsWith("int"))
      return decodeNumber2(cursor2, param);
    if (param.type === "string")
      return decodeString2(cursor2, { staticPosition });
    throw new AbiParameters2.InvalidTypeError(param.type);
  }
  const sizeOfLength2 = 32;
  const sizeOfOffset2 = 32;
  function decodeAddress2(cursor2, options = {}) {
    const { checksum: checksum2 = false } = options;
    const value = cursor2.readBytes(32);
    const wrap2 = (address) => checksum2 ? Address2.checksum(address) : address;
    return [wrap2(Hex2.fromBytes(Bytes2.slice(value, -20))), 32];
  }
  function decodeArray2(cursor2, param, options) {
    const { checksumAddress, length, staticPosition } = options;
    if (!length) {
      const offset = Bytes2.toNumber(cursor2.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      const startOfData = start + sizeOfLength2;
      cursor2.setPosition(start);
      const length2 = Bytes2.toNumber(cursor2.readBytes(sizeOfLength2));
      const dynamicChild = hasDynamicChild2(param);
      let consumed2 = 0;
      const value2 = [];
      for (let i = 0; i < length2; ++i) {
        cursor2.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
        const [data, consumed_] = decodeParameter2(cursor2, param, {
          checksumAddress,
          staticPosition: startOfData
        });
        consumed2 += consumed_;
        value2.push(data);
      }
      cursor2.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    if (hasDynamicChild2(param)) {
      const offset = Bytes2.toNumber(cursor2.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      const value2 = [];
      for (let i = 0; i < length; ++i) {
        cursor2.setPosition(start + i * 32);
        const [data] = decodeParameter2(cursor2, param, {
          checksumAddress,
          staticPosition: start
        });
        value2.push(data);
      }
      cursor2.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    let consumed = 0;
    const value = [];
    for (let i = 0; i < length; ++i) {
      const [data, consumed_] = decodeParameter2(cursor2, param, {
        checksumAddress,
        staticPosition: staticPosition + consumed
      });
      consumed += consumed_;
      value.push(data);
    }
    return [value, consumed];
  }
  function decodeBool2(cursor2) {
    return [Bytes2.toBoolean(cursor2.readBytes(32), { size: 32 }), 32];
  }
  function decodeBytes2(cursor2, param, { staticPosition }) {
    const [_, size2] = param.type.split("bytes");
    if (!size2) {
      const offset = Bytes2.toNumber(cursor2.readBytes(32));
      cursor2.setPosition(staticPosition + offset);
      const length = Bytes2.toNumber(cursor2.readBytes(32));
      if (length === 0) {
        cursor2.setPosition(staticPosition + 32);
        return ["0x", 32];
      }
      const data = cursor2.readBytes(length);
      cursor2.setPosition(staticPosition + 32);
      return [Hex2.fromBytes(data), 32];
    }
    const value = Hex2.fromBytes(cursor2.readBytes(Number.parseInt(size2, 10), 32));
    return [value, 32];
  }
  function decodeNumber2(cursor2, param) {
    const signed = param.type.startsWith("int");
    const size2 = Number.parseInt(param.type.split("int")[1] || "256", 10);
    const value = cursor2.readBytes(32);
    return [
      size2 > 48 ? Bytes2.toBigInt(value, { signed }) : Bytes2.toNumber(value, { signed }),
      32
    ];
  }
  function decodeTuple2(cursor2, param, options) {
    const { checksumAddress, staticPosition } = options;
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild2(param)) {
      const offset = Bytes2.toNumber(cursor2.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      for (let i = 0; i < param.components.length; ++i) {
        const component = param.components[i];
        cursor2.setPosition(start + consumed);
        const [data, consumed_] = decodeParameter2(cursor2, component, {
          checksumAddress,
          staticPosition: start
        });
        consumed += consumed_;
        value[hasUnnamedChild ? i : component?.name] = data;
      }
      cursor2.setPosition(staticPosition + 32);
      return [value, 32];
    }
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      const [data, consumed_] = decodeParameter2(cursor2, component, {
        checksumAddress,
        staticPosition
      });
      value[hasUnnamedChild ? i : component?.name] = data;
      consumed += consumed_;
    }
    return [value, consumed];
  }
  function decodeString2(cursor2, { staticPosition }) {
    const offset = Bytes2.toNumber(cursor2.readBytes(32));
    const start = staticPosition + offset;
    cursor2.setPosition(start);
    const length = Bytes2.toNumber(cursor2.readBytes(32));
    if (length === 0) {
      cursor2.setPosition(staticPosition + 32);
      return ["", 32];
    }
    const data = cursor2.readBytes(length, 32);
    const value = Bytes2.toString(Bytes2.trimLeft(data));
    cursor2.setPosition(staticPosition + 32);
    return [value, 32];
  }
  function prepareParameters2({ checksumAddress, parameters, values }) {
    const preparedParameters = [];
    for (let i = 0; i < parameters.length; i++) {
      preparedParameters.push(prepareParameter2({
        checksumAddress,
        parameter: parameters[i],
        value: values[i]
      }));
    }
    return preparedParameters;
  }
  function prepareParameter2({ checksumAddress = false, parameter: parameter_, value }) {
    const parameter = parameter_;
    const arrayComponents = getArrayComponents2(parameter.type);
    if (arrayComponents) {
      const [length, type2] = arrayComponents;
      return encodeArray2(value, {
        checksumAddress,
        length,
        parameter: {
          ...parameter,
          type: type2
        }
      });
    }
    if (parameter.type === "tuple") {
      return encodeTuple2(value, {
        checksumAddress,
        parameter
      });
    }
    if (parameter.type === "address") {
      return encodeAddress2(value, {
        checksum: checksumAddress
      });
    }
    if (parameter.type === "bool") {
      return encodeBoolean2(value);
    }
    if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
      const signed = parameter.type.startsWith("int");
      const [, , size2 = "256"] = Solidity_js_1.integerRegex.exec(parameter.type) ?? [];
      return encodeNumber2(value, {
        signed,
        size: Number(size2)
      });
    }
    if (parameter.type.startsWith("bytes")) {
      return encodeBytes2(value, { type: parameter.type });
    }
    if (parameter.type === "string") {
      return encodeString2(value);
    }
    throw new AbiParameters2.InvalidTypeError(parameter.type);
  }
  function encode2(preparedParameters) {
    let staticSize = 0;
    for (let i = 0; i < preparedParameters.length; i++) {
      const { dynamic, encoded } = preparedParameters[i];
      if (dynamic)
        staticSize += 32;
      else
        staticSize += Hex2.size(encoded);
    }
    const staticParameters = [];
    const dynamicParameters = [];
    let dynamicSize = 0;
    for (let i = 0; i < preparedParameters.length; i++) {
      const { dynamic, encoded } = preparedParameters[i];
      if (dynamic) {
        staticParameters.push(Hex2.fromNumber(staticSize + dynamicSize, { size: 32 }));
        dynamicParameters.push(encoded);
        dynamicSize += Hex2.size(encoded);
      } else {
        staticParameters.push(encoded);
      }
    }
    return Hex2.concat(...staticParameters, ...dynamicParameters);
  }
  function encodeAddress2(value, options) {
    const { checksum: checksum2 = false } = options;
    Address2.assert(value, { strict: checksum2 });
    return {
      dynamic: false,
      encoded: Hex2.padLeft(value.toLowerCase())
    };
  }
  function encodeArray2(value, options) {
    const { checksumAddress, length, parameter } = options;
    const dynamic = length === null;
    if (!Array.isArray(value))
      throw new AbiParameters2.InvalidArrayError(value);
    if (!dynamic && value.length !== length)
      throw new AbiParameters2.ArrayLengthMismatchError({
        expectedLength: length,
        givenLength: value.length,
        type: `${parameter.type}[${length}]`
      });
    let dynamicChild = false;
    const preparedParameters = [];
    for (let i = 0; i < value.length; i++) {
      const preparedParam = prepareParameter2({
        checksumAddress,
        parameter,
        value: value[i]
      });
      if (preparedParam.dynamic)
        dynamicChild = true;
      preparedParameters.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
      const data = encode2(preparedParameters);
      if (dynamic) {
        const length2 = Hex2.fromNumber(preparedParameters.length, { size: 32 });
        return {
          dynamic: true,
          encoded: preparedParameters.length > 0 ? Hex2.concat(length2, data) : length2
        };
      }
      if (dynamicChild)
        return { dynamic: true, encoded: data };
    }
    return {
      dynamic: false,
      encoded: Hex2.concat(...preparedParameters.map(({ encoded }) => encoded))
    };
  }
  function encodeBytes2(value, { type: type2 }) {
    const [, parametersize] = type2.split("bytes");
    const bytesSize = Hex2.size(value);
    if (!parametersize) {
      let value_ = value;
      if (bytesSize % 32 !== 0)
        value_ = Hex2.padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
      return {
        dynamic: true,
        encoded: Hex2.concat(Hex2.padLeft(Hex2.fromNumber(bytesSize, { size: 32 })), value_)
      };
    }
    if (bytesSize !== Number.parseInt(parametersize, 10))
      throw new AbiParameters2.BytesSizeMismatchError({
        expectedSize: Number.parseInt(parametersize, 10),
        value
      });
    return { dynamic: false, encoded: Hex2.padRight(value) };
  }
  function encodeBoolean2(value) {
    if (typeof value !== "boolean")
      throw new Errors2.BaseError(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return { dynamic: false, encoded: Hex2.padLeft(Hex2.fromBoolean(value)) };
  }
  function encodeNumber2(value, { signed, size: size2 }) {
    if (typeof size2 === "number") {
      const max = 2n ** (BigInt(size2) - (signed ? 1n : 0n)) - 1n;
      const min = signed ? -max - 1n : 0n;
      if (value > max || value < min)
        throw new Hex2.IntegerOutOfRangeError({
          max: max.toString(),
          min: min.toString(),
          signed,
          size: size2 / 8,
          value: value.toString()
        });
    }
    return {
      dynamic: false,
      encoded: Hex2.fromNumber(value, {
        size: 32,
        signed
      })
    };
  }
  function encodeString2(value) {
    const hexValue = Hex2.fromString(value);
    const partsLength = Math.ceil(Hex2.size(hexValue) / 32);
    const parts = [];
    for (let i = 0; i < partsLength; i++) {
      parts.push(Hex2.padRight(Hex2.slice(hexValue, i * 32, (i + 1) * 32)));
    }
    return {
      dynamic: true,
      encoded: Hex2.concat(Hex2.padRight(Hex2.fromNumber(Hex2.size(hexValue), { size: 32 })), ...parts)
    };
  }
  function encodeTuple2(value, options) {
    const { checksumAddress, parameter } = options;
    let dynamic = false;
    const preparedParameters = [];
    for (let i = 0; i < parameter.components.length; i++) {
      const param_ = parameter.components[i];
      const index = Array.isArray(value) ? i : param_.name;
      const preparedParam = prepareParameter2({
        checksumAddress,
        parameter: param_,
        value: value[index]
      });
      preparedParameters.push(preparedParam);
      if (preparedParam.dynamic)
        dynamic = true;
    }
    return {
      dynamic,
      encoded: dynamic ? encode2(preparedParameters) : Hex2.concat(...preparedParameters.map(({ encoded }) => encoded))
    };
  }
  function getArrayComponents2(type2) {
    const matches = type2.match(/^(.*)\[(\d+)?\]$/);
    return matches ? [matches[2] ? Number(matches[2]) : null, matches[1]] : void 0;
  }
  function hasDynamicChild2(param) {
    const { type: type2 } = param;
    if (type2 === "string")
      return true;
    if (type2 === "bytes")
      return true;
    if (type2.endsWith("[]"))
      return true;
    if (type2 === "tuple")
      return param.components?.some(hasDynamicChild2);
    const arrayComponents = getArrayComponents2(param.type);
    if (arrayComponents && hasDynamicChild2({
      ...param,
      type: arrayComponents[1]
    }))
      return true;
    return false;
  }
  return abiParameters;
}
var cursor = {};
var hasRequiredCursor;
function requireCursor() {
  if (hasRequiredCursor) return cursor;
  hasRequiredCursor = 1;
  Object.defineProperty(cursor, "__esModule", { value: true });
  cursor.RecursiveReadLimitExceededError = cursor.PositionOutOfBoundsError = cursor.NegativeOffsetError = void 0;
  cursor.create = create2;
  const Errors2 = requireErrors();
  const staticCursor2 = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: /* @__PURE__ */ new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: Number.POSITIVE_INFINITY,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new RecursiveReadLimitExceededError2({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit
        });
    },
    assertPosition(position) {
      if (position < 0 || position > this.bytes.length - 1)
        throw new PositionOutOfBoundsError2({
          length: this.bytes.length,
          position
        });
    },
    decrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError2({ offset });
      const position = this.position - offset;
      this.assertPosition(position);
      this.position = position;
    },
    getReadCount(position) {
      return this.positionReadCount.get(position || this.position) || 0;
    },
    incrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError2({ offset });
      const position = this.position + offset;
      this.assertPosition(position);
      this.position = position;
    },
    inspectByte(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectBytes(length, position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + length - 1);
      return this.bytes.subarray(position, position + length);
    },
    inspectUint8(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectUint16(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 1);
      return this.dataView.getUint16(position);
    },
    inspectUint24(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 2);
      return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
    },
    inspectUint32(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 3);
      return this.dataView.getUint32(position);
    },
    pushByte(byte) {
      this.assertPosition(this.position);
      this.bytes[this.position] = byte;
      this.position++;
    },
    pushBytes(bytes2) {
      this.assertPosition(this.position + bytes2.length - 1);
      this.bytes.set(bytes2, this.position);
      this.position += bytes2.length;
    },
    pushUint8(value) {
      this.assertPosition(this.position);
      this.bytes[this.position] = value;
      this.position++;
    },
    pushUint16(value) {
      this.assertPosition(this.position + 1);
      this.dataView.setUint16(this.position, value);
      this.position += 2;
    },
    pushUint24(value) {
      this.assertPosition(this.position + 2);
      this.dataView.setUint16(this.position, value >> 8);
      this.dataView.setUint8(this.position + 2, value & 255);
      this.position += 3;
    },
    pushUint32(value) {
      this.assertPosition(this.position + 3);
      this.dataView.setUint32(this.position, value);
      this.position += 4;
    },
    readByte() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectByte();
      this.position++;
      return value;
    },
    readBytes(length, size2) {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectBytes(length);
      this.position += size2 ?? length;
      return value;
    },
    readUint8() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint8();
      this.position += 1;
      return value;
    },
    readUint16() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint16();
      this.position += 2;
      return value;
    },
    readUint24() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint24();
      this.position += 3;
      return value;
    },
    readUint32() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint32();
      this.position += 4;
      return value;
    },
    get remaining() {
      return this.bytes.length - this.position;
    },
    setPosition(position) {
      const oldPosition = this.position;
      this.assertPosition(position);
      this.position = position;
      return () => this.position = oldPosition;
    },
    _touch() {
      if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
        return;
      const count = this.getReadCount();
      this.positionReadCount.set(this.position, count + 1);
      if (count > 0)
        this.recursiveReadCount++;
    }
  };
  function create2(bytes2, { recursiveReadLimit = 8192 } = {}) {
    const cursor2 = Object.create(staticCursor2);
    cursor2.bytes = bytes2;
    cursor2.dataView = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
    cursor2.positionReadCount = /* @__PURE__ */ new Map();
    cursor2.recursiveReadLimit = recursiveReadLimit;
    return cursor2;
  }
  class NegativeOffsetError2 extends Errors2.BaseError {
    constructor({ offset }) {
      super(`Offset \`${offset}\` cannot be negative.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.NegativeOffsetError"
      });
    }
  }
  cursor.NegativeOffsetError = NegativeOffsetError2;
  class PositionOutOfBoundsError2 extends Errors2.BaseError {
    constructor({ length, position }) {
      super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.PositionOutOfBoundsError"
      });
    }
  }
  cursor.PositionOutOfBoundsError = PositionOutOfBoundsError2;
  class RecursiveReadLimitExceededError2 extends Errors2.BaseError {
    constructor({ count, limit }) {
      super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.RecursiveReadLimitExceededError"
      });
    }
  }
  cursor.RecursiveReadLimitExceededError = RecursiveReadLimitExceededError2;
  return cursor;
}
var hasRequiredAbiParameters;
function requireAbiParameters() {
  if (hasRequiredAbiParameters) return AbiParameters;
  hasRequiredAbiParameters = 1;
  Object.defineProperty(AbiParameters, "__esModule", { value: true });
  AbiParameters.InvalidTypeError = AbiParameters.InvalidArrayError = AbiParameters.LengthMismatchError = AbiParameters.BytesSizeMismatchError = AbiParameters.ArrayLengthMismatchError = AbiParameters.ZeroDataError = AbiParameters.DataSizeTooSmallError = void 0;
  AbiParameters.decode = decode2;
  AbiParameters.encode = encode2;
  AbiParameters.encodePacked = encodePacked2;
  AbiParameters.format = format2;
  AbiParameters.from = from2;
  const abitype = /* @__PURE__ */ requireExports$1();
  const Address2 = requireAddress();
  const Bytes2 = requireBytes();
  const Errors2 = requireErrors();
  const Hex2 = requireHex();
  const internal = requireAbiParameters$1();
  const Cursor = requireCursor();
  const Solidity2 = requireSolidity();
  function decode2(parameters, data, options = {}) {
    const { as = "Array", checksumAddress = false } = options;
    const bytes2 = typeof data === "string" ? Bytes2.fromHex(data) : data;
    const cursor2 = Cursor.create(bytes2);
    if (Bytes2.size(bytes2) === 0 && parameters.length > 0)
      throw new ZeroDataError2();
    if (Bytes2.size(bytes2) && Bytes2.size(bytes2) < 32)
      throw new DataSizeTooSmallError2({
        data: typeof data === "string" ? data : Hex2.fromBytes(data),
        parameters,
        size: Bytes2.size(bytes2)
      });
    let consumed = 0;
    const values = as === "Array" ? [] : {};
    for (let i = 0; i < parameters.length; ++i) {
      const param = parameters[i];
      cursor2.setPosition(consumed);
      const [data2, consumed_] = internal.decodeParameter(cursor2, param, {
        checksumAddress,
        staticPosition: 0
      });
      consumed += consumed_;
      if (as === "Array")
        values.push(data2);
      else
        values[param.name ?? i] = data2;
    }
    return values;
  }
  function encode2(parameters, values, options) {
    const { checksumAddress = false } = options ?? {};
    if (parameters.length !== values.length)
      throw new LengthMismatchError2({
        expectedLength: parameters.length,
        givenLength: values.length
      });
    const preparedParameters = internal.prepareParameters({
      checksumAddress,
      parameters,
      values
    });
    const data = internal.encode(preparedParameters);
    if (data.length === 0)
      return "0x";
    return data;
  }
  function encodePacked2(types, values) {
    if (types.length !== values.length)
      throw new LengthMismatchError2({
        expectedLength: types.length,
        givenLength: values.length
      });
    const data = [];
    for (let i = 0; i < types.length; i++) {
      const type2 = types[i];
      const value = values[i];
      data.push(encodePacked2.encode(type2, value));
    }
    return Hex2.concat(...data);
  }
  (function(encodePacked3) {
    function encode3(type2, value, isArray = false) {
      if (type2 === "address") {
        const address = value;
        Address2.assert(address);
        return Hex2.padLeft(address.toLowerCase(), isArray ? 32 : 0);
      }
      if (type2 === "string")
        return Hex2.fromString(value);
      if (type2 === "bytes")
        return value;
      if (type2 === "bool")
        return Hex2.padLeft(Hex2.fromBoolean(value), isArray ? 32 : 1);
      const intMatch = type2.match(Solidity2.integerRegex);
      if (intMatch) {
        const [_type, baseType, bits = "256"] = intMatch;
        const size2 = Number.parseInt(bits, 10) / 8;
        return Hex2.fromNumber(value, {
          size: isArray ? 32 : size2,
          signed: baseType === "int"
        });
      }
      const bytesMatch = type2.match(Solidity2.bytesRegex);
      if (bytesMatch) {
        const [_type, size2] = bytesMatch;
        if (Number.parseInt(size2, 10) !== (value.length - 2) / 2)
          throw new BytesSizeMismatchError2({
            expectedSize: Number.parseInt(size2, 10),
            value
          });
        return Hex2.padRight(value, isArray ? 32 : 0);
      }
      const arrayMatch = type2.match(Solidity2.arrayRegex);
      if (arrayMatch && Array.isArray(value)) {
        const [_type, childType] = arrayMatch;
        const data = [];
        for (let i = 0; i < value.length; i++) {
          data.push(encode3(childType, value[i], true));
        }
        if (data.length === 0)
          return "0x";
        return Hex2.concat(...data);
      }
      throw new InvalidTypeError2(type2);
    }
    encodePacked3.encode = encode3;
  })(encodePacked2 || (AbiParameters.encodePacked = encodePacked2 = {}));
  function format2(parameters) {
    return abitype.formatAbiParameters(parameters);
  }
  function from2(parameters) {
    if (Array.isArray(parameters) && typeof parameters[0] === "string")
      return abitype.parseAbiParameters(parameters);
    if (typeof parameters === "string")
      return abitype.parseAbiParameters(parameters);
    return parameters;
  }
  class DataSizeTooSmallError2 extends Errors2.BaseError {
    constructor({ data, parameters, size: size2 }) {
      super(`Data size of ${size2} bytes is too small for given parameters.`, {
        metaMessages: [
          `Params: (${abitype.formatAbiParameters(parameters)})`,
          `Data:   ${data} (${size2} bytes)`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.DataSizeTooSmallError"
      });
    }
  }
  AbiParameters.DataSizeTooSmallError = DataSizeTooSmallError2;
  class ZeroDataError2 extends Errors2.BaseError {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.');
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.ZeroDataError"
      });
    }
  }
  AbiParameters.ZeroDataError = ZeroDataError2;
  class ArrayLengthMismatchError2 extends Errors2.BaseError {
    constructor({ expectedLength, givenLength, type: type2 }) {
      super(`Array length mismatch for type \`${type2}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.ArrayLengthMismatchError"
      });
    }
  }
  AbiParameters.ArrayLengthMismatchError = ArrayLengthMismatchError2;
  class BytesSizeMismatchError2 extends Errors2.BaseError {
    constructor({ expectedSize, value }) {
      super(`Size of bytes "${value}" (bytes${Hex2.size(value)}) does not match expected size (bytes${expectedSize}).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.BytesSizeMismatchError"
      });
    }
  }
  AbiParameters.BytesSizeMismatchError = BytesSizeMismatchError2;
  class LengthMismatchError2 extends Errors2.BaseError {
    constructor({ expectedLength, givenLength }) {
      super([
        "ABI encoding parameters/values length mismatch.",
        `Expected length (parameters): ${expectedLength}`,
        `Given length (values): ${givenLength}`
      ].join("\n"));
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.LengthMismatchError"
      });
    }
  }
  AbiParameters.LengthMismatchError = LengthMismatchError2;
  class InvalidArrayError2 extends Errors2.BaseError {
    constructor(value) {
      super(`Value \`${value}\` is not a valid array.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.InvalidArrayError"
      });
    }
  }
  AbiParameters.InvalidArrayError = InvalidArrayError2;
  class InvalidTypeError2 extends Errors2.BaseError {
    constructor(type2) {
      super(`Type \`${type2}\` is not a valid ABI Type.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.InvalidTypeError"
      });
    }
  }
  AbiParameters.InvalidTypeError = InvalidTypeError2;
  return AbiParameters;
}
var Authorization = {};
var Rlp = {};
var hasRequiredRlp;
function requireRlp() {
  if (hasRequiredRlp) return Rlp;
  hasRequiredRlp = 1;
  Object.defineProperty(Rlp, "__esModule", { value: true });
  Rlp.toBytes = toBytes2;
  Rlp.toHex = toHex2;
  Rlp.to = to2;
  Rlp.decodeRlpCursor = decodeRlpCursor2;
  Rlp.readLength = readLength2;
  Rlp.readList = readList2;
  Rlp.from = from2;
  Rlp.fromBytes = fromBytes2;
  Rlp.fromHex = fromHex2;
  const Bytes2 = requireBytes();
  const Errors2 = requireErrors();
  const Hex2 = requireHex();
  const Cursor = requireCursor();
  function toBytes2(value) {
    return to2(value, "Bytes");
  }
  function toHex2(value) {
    return to2(value, "Hex");
  }
  function to2(value, to3) {
    const to_ = to3 ?? (typeof value === "string" ? "Hex" : "Bytes");
    const bytes2 = (() => {
      if (typeof value === "string") {
        if (value.length > 3 && value.length % 2 !== 0)
          throw new Hex2.InvalidLengthError(value);
        return Bytes2.fromHex(value);
      }
      return value;
    })();
    const cursor2 = Cursor.create(bytes2, {
      recursiveReadLimit: Number.POSITIVE_INFINITY
    });
    const result = decodeRlpCursor2(cursor2, to_);
    return result;
  }
  function decodeRlpCursor2(cursor2, to3 = "Hex") {
    if (cursor2.bytes.length === 0)
      return to3 === "Hex" ? Hex2.fromBytes(cursor2.bytes) : cursor2.bytes;
    const prefix = cursor2.readByte();
    if (prefix < 128)
      cursor2.decrementPosition(1);
    if (prefix < 192) {
      const length2 = readLength2(cursor2, prefix, 128);
      const bytes2 = cursor2.readBytes(length2);
      return to3 === "Hex" ? Hex2.fromBytes(bytes2) : bytes2;
    }
    const length = readLength2(cursor2, prefix, 192);
    return readList2(cursor2, length, to3);
  }
  function readLength2(cursor2, prefix, offset) {
    if (offset === 128 && prefix < 128)
      return 1;
    if (prefix <= offset + 55)
      return prefix - offset;
    if (prefix === offset + 55 + 1)
      return cursor2.readUint8();
    if (prefix === offset + 55 + 2)
      return cursor2.readUint16();
    if (prefix === offset + 55 + 3)
      return cursor2.readUint24();
    if (prefix === offset + 55 + 4)
      return cursor2.readUint32();
    throw new Errors2.BaseError("Invalid RLP prefix");
  }
  function readList2(cursor2, length, to3) {
    const position = cursor2.position;
    const value = [];
    while (cursor2.position - position < length)
      value.push(decodeRlpCursor2(cursor2, to3));
    return value;
  }
  function from2(value, options) {
    const { as } = options;
    const encodable = getEncodable2(value);
    const cursor2 = Cursor.create(new Uint8Array(encodable.length));
    encodable.encode(cursor2);
    if (as === "Hex")
      return Hex2.fromBytes(cursor2.bytes);
    return cursor2.bytes;
  }
  function fromBytes2(bytes2, options = {}) {
    const { as = "Bytes" } = options;
    return from2(bytes2, { as });
  }
  function fromHex2(hex2, options = {}) {
    const { as = "Hex" } = options;
    return from2(hex2, { as });
  }
  function getEncodable2(bytes2) {
    if (Array.isArray(bytes2))
      return getEncodableList2(bytes2.map((x) => getEncodable2(x)));
    return getEncodableBytes2(bytes2);
  }
  function getEncodableList2(list) {
    const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
    const sizeOfBodyLength = getSizeOfLength2(bodyLength);
    const length = (() => {
      if (bodyLength <= 55)
        return 1 + bodyLength;
      return 1 + sizeOfBodyLength + bodyLength;
    })();
    return {
      length,
      encode(cursor2) {
        if (bodyLength <= 55) {
          cursor2.pushByte(192 + bodyLength);
        } else {
          cursor2.pushByte(192 + 55 + sizeOfBodyLength);
          if (sizeOfBodyLength === 1)
            cursor2.pushUint8(bodyLength);
          else if (sizeOfBodyLength === 2)
            cursor2.pushUint16(bodyLength);
          else if (sizeOfBodyLength === 3)
            cursor2.pushUint24(bodyLength);
          else
            cursor2.pushUint32(bodyLength);
        }
        for (const { encode: encode2 } of list) {
          encode2(cursor2);
        }
      }
    };
  }
  function getEncodableBytes2(bytesOrHex) {
    const bytes2 = typeof bytesOrHex === "string" ? Bytes2.fromHex(bytesOrHex) : bytesOrHex;
    const sizeOfBytesLength = getSizeOfLength2(bytes2.length);
    const length = (() => {
      if (bytes2.length === 1 && bytes2[0] < 128)
        return 1;
      if (bytes2.length <= 55)
        return 1 + bytes2.length;
      return 1 + sizeOfBytesLength + bytes2.length;
    })();
    return {
      length,
      encode(cursor2) {
        if (bytes2.length === 1 && bytes2[0] < 128) {
          cursor2.pushBytes(bytes2);
        } else if (bytes2.length <= 55) {
          cursor2.pushByte(128 + bytes2.length);
          cursor2.pushBytes(bytes2);
        } else {
          cursor2.pushByte(128 + 55 + sizeOfBytesLength);
          if (sizeOfBytesLength === 1)
            cursor2.pushUint8(bytes2.length);
          else if (sizeOfBytesLength === 2)
            cursor2.pushUint16(bytes2.length);
          else if (sizeOfBytesLength === 3)
            cursor2.pushUint24(bytes2.length);
          else
            cursor2.pushUint32(bytes2.length);
          cursor2.pushBytes(bytes2);
        }
      }
    };
  }
  function getSizeOfLength2(length) {
    if (length <= 255)
      return 1;
    if (length <= 65535)
      return 2;
    if (length <= 16777215)
      return 3;
    if (length <= 4294967295)
      return 4;
    throw new Errors2.BaseError("Length is too large.");
  }
  return Rlp;
}
var Signature = {};
var hasRequiredSignature;
function requireSignature() {
  if (hasRequiredSignature) return Signature;
  hasRequiredSignature = 1;
  Object.defineProperty(Signature, "__esModule", { value: true });
  Signature.InvalidVError = Signature.InvalidYParityError = Signature.InvalidSError = Signature.InvalidRError = Signature.MissingPropertiesError = Signature.InvalidSerializedSizeError = void 0;
  Signature.assert = assert2;
  Signature.fromBytes = fromBytes2;
  Signature.fromHex = fromHex2;
  Signature.extract = extract2;
  Signature.from = from2;
  Signature.fromDerBytes = fromDerBytes;
  Signature.fromDerHex = fromDerHex;
  Signature.fromLegacy = fromLegacy2;
  Signature.fromRpc = fromRpc2;
  Signature.fromTuple = fromTuple2;
  Signature.toBytes = toBytes2;
  Signature.toHex = toHex2;
  Signature.toDerBytes = toDerBytes2;
  Signature.toDerHex = toDerHex;
  Signature.toLegacy = toLegacy;
  Signature.toRpc = toRpc2;
  Signature.toTuple = toTuple2;
  Signature.validate = validate2;
  Signature.vToYParity = vToYParity2;
  Signature.yParityToV = yParityToV2;
  const secp256k1_1 = /* @__PURE__ */ requireSecp256k1$3();
  const Bytes2 = requireBytes();
  const Errors2 = requireErrors();
  const Hex2 = requireHex();
  const Json2 = requireJson();
  const Solidity2 = requireSolidity();
  function assert2(signature, options = {}) {
    const { recovered } = options;
    if (typeof signature.r === "undefined")
      throw new MissingPropertiesError3({ signature });
    if (typeof signature.s === "undefined")
      throw new MissingPropertiesError3({ signature });
    if (recovered && typeof signature.yParity === "undefined")
      throw new MissingPropertiesError3({ signature });
    if (signature.r < 0n || signature.r > Solidity2.maxUint256)
      throw new InvalidRError3({ value: signature.r });
    if (signature.s < 0n || signature.s > Solidity2.maxUint256)
      throw new InvalidSError3({ value: signature.s });
    if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
      throw new InvalidYParityError3({ value: signature.yParity });
  }
  function fromBytes2(signature) {
    return fromHex2(Hex2.fromBytes(signature));
  }
  function fromHex2(signature) {
    if (signature.length !== 130 && signature.length !== 132)
      throw new InvalidSerializedSizeError5({ signature });
    const r = BigInt(Hex2.slice(signature, 0, 32));
    const s = BigInt(Hex2.slice(signature, 32, 64));
    const yParity = (() => {
      const yParity2 = Number(`0x${signature.slice(130)}`);
      if (Number.isNaN(yParity2))
        return void 0;
      try {
        return vToYParity2(yParity2);
      } catch {
        throw new InvalidYParityError3({ value: yParity2 });
      }
    })();
    if (typeof yParity === "undefined")
      return {
        r,
        s
      };
    return {
      r,
      s,
      yParity
    };
  }
  function extract2(value) {
    if (typeof value.r === "undefined")
      return void 0;
    if (typeof value.s === "undefined")
      return void 0;
    return from2(value);
  }
  function from2(signature) {
    const signature_ = (() => {
      if (typeof signature === "string")
        return fromHex2(signature);
      if (signature instanceof Uint8Array)
        return fromBytes2(signature);
      if (typeof signature.r === "string")
        return fromRpc2(signature);
      if (signature.v)
        return fromLegacy2(signature);
      return {
        r: signature.r,
        s: signature.s,
        ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
      };
    })();
    assert2(signature_);
    return signature_;
  }
  function fromDerBytes(signature) {
    return fromDerHex(Hex2.fromBytes(signature));
  }
  function fromDerHex(signature) {
    const { r, s } = secp256k1_1.secp256k1.Signature.fromDER(Hex2.from(signature).slice(2));
    return { r, s };
  }
  function fromLegacy2(signature) {
    return {
      r: signature.r,
      s: signature.s,
      yParity: vToYParity2(signature.v)
    };
  }
  function fromRpc2(signature) {
    const yParity = (() => {
      const v = signature.v ? Number(signature.v) : void 0;
      let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
      if (typeof v === "number" && typeof yParity2 !== "number")
        yParity2 = vToYParity2(v);
      if (typeof yParity2 !== "number")
        throw new InvalidYParityError3({ value: signature.yParity });
      return yParity2;
    })();
    return {
      r: BigInt(signature.r),
      s: BigInt(signature.s),
      yParity
    };
  }
  function fromTuple2(tuple) {
    const [yParity, r, s] = tuple;
    return from2({
      r: r === "0x" ? 0n : BigInt(r),
      s: s === "0x" ? 0n : BigInt(s),
      yParity: yParity === "0x" ? 0 : Number(yParity)
    });
  }
  function toBytes2(signature) {
    return Bytes2.fromHex(toHex2(signature));
  }
  function toHex2(signature) {
    assert2(signature);
    const r = signature.r;
    const s = signature.s;
    const signature_ = Hex2.concat(Hex2.fromNumber(r, { size: 32 }), Hex2.fromNumber(s, { size: 32 }), typeof signature.yParity === "number" ? Hex2.fromNumber(yParityToV2(signature.yParity), { size: 1 }) : "0x");
    return signature_;
  }
  function toDerBytes2(signature) {
    const sig = new secp256k1_1.secp256k1.Signature(signature.r, signature.s);
    return sig.toDERRawBytes();
  }
  function toDerHex(signature) {
    const sig = new secp256k1_1.secp256k1.Signature(signature.r, signature.s);
    return `0x${sig.toDERHex()}`;
  }
  function toLegacy(signature) {
    return {
      r: signature.r,
      s: signature.s,
      v: yParityToV2(signature.yParity)
    };
  }
  function toRpc2(signature) {
    const { r, s, yParity } = signature;
    return {
      r: Hex2.fromNumber(r, { size: 32 }),
      s: Hex2.fromNumber(s, { size: 32 }),
      yParity: yParity === 0 ? "0x0" : "0x1"
    };
  }
  function toTuple2(signature) {
    const { r, s, yParity } = signature;
    return [
      yParity ? "0x01" : "0x",
      r === 0n ? "0x" : Hex2.trimLeft(Hex2.fromNumber(r)),
      s === 0n ? "0x" : Hex2.trimLeft(Hex2.fromNumber(s))
    ];
  }
  function validate2(signature, options = {}) {
    try {
      assert2(signature, options);
      return true;
    } catch {
      return false;
    }
  }
  function vToYParity2(v) {
    if (v === 0 || v === 27)
      return 0;
    if (v === 1 || v === 28)
      return 1;
    if (v >= 35)
      return v % 2 === 0 ? 1 : 0;
    throw new InvalidVError3({ value: v });
  }
  function yParityToV2(yParity) {
    if (yParity === 0)
      return 27;
    if (yParity === 1)
      return 28;
    throw new InvalidYParityError3({ value: yParity });
  }
  class InvalidSerializedSizeError5 extends Errors2.BaseError {
    constructor({ signature }) {
      super(`Value \`${signature}\` is an invalid signature size.`, {
        metaMessages: [
          "Expected: 64 bytes or 65 bytes.",
          `Received ${Hex2.size(Hex2.from(signature))} bytes.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidSerializedSizeError"
      });
    }
  }
  Signature.InvalidSerializedSizeError = InvalidSerializedSizeError5;
  class MissingPropertiesError3 extends Errors2.BaseError {
    constructor({ signature }) {
      super(`Signature \`${Json2.stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.MissingPropertiesError"
      });
    }
  }
  Signature.MissingPropertiesError = MissingPropertiesError3;
  class InvalidRError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidRError"
      });
    }
  }
  Signature.InvalidRError = InvalidRError3;
  class InvalidSError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidSError"
      });
    }
  }
  Signature.InvalidSError = InvalidSError3;
  class InvalidYParityError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidYParityError"
      });
    }
  }
  Signature.InvalidYParityError = InvalidYParityError3;
  class InvalidVError3 extends Errors2.BaseError {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidVError"
      });
    }
  }
  Signature.InvalidVError = InvalidVError3;
  return Signature;
}
var hasRequiredAuthorization;
function requireAuthorization() {
  if (hasRequiredAuthorization) return Authorization;
  hasRequiredAuthorization = 1;
  Object.defineProperty(Authorization, "__esModule", { value: true });
  Authorization.from = from2;
  Authorization.fromRpc = fromRpc2;
  Authorization.fromRpcList = fromRpcList2;
  Authorization.fromTuple = fromTuple2;
  Authorization.fromTupleList = fromTupleList2;
  Authorization.getSignPayload = getSignPayload2;
  Authorization.hash = hash2;
  Authorization.toRpc = toRpc2;
  Authorization.toRpcList = toRpcList2;
  Authorization.toTuple = toTuple2;
  Authorization.toTupleList = toTupleList2;
  const Hash2 = requireHash();
  const Hex2 = requireHex();
  const Rlp2 = requireRlp();
  const Signature2 = requireSignature();
  function from2(authorization, options = {}) {
    if (typeof authorization.chainId === "string")
      return fromRpc2(authorization);
    return { ...authorization, ...options.signature };
  }
  function fromRpc2(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = Signature2.extract(authorization);
    return {
      address,
      chainId: Number(chainId),
      nonce: BigInt(nonce),
      ...signature
    };
  }
  function fromRpcList2(authorizationList) {
    return authorizationList.map(fromRpc2);
  }
  function fromTuple2(tuple) {
    const [chainId, address, nonce, yParity, r, s] = tuple;
    let args = {
      address,
      chainId: chainId === "0x" ? 0 : Number(chainId),
      nonce: nonce === "0x" ? 0n : BigInt(nonce)
    };
    if (yParity && r && s)
      args = { ...args, ...Signature2.fromTuple([yParity, r, s]) };
    return from2(args);
  }
  function fromTupleList2(tupleList) {
    const list = [];
    for (const tuple of tupleList)
      list.push(fromTuple2(tuple));
    return list;
  }
  function getSignPayload2(authorization) {
    return hash2(authorization, { presign: true });
  }
  function hash2(authorization, options = {}) {
    const { presign } = options;
    return Hash2.keccak256(Hex2.concat("0x05", Rlp2.fromHex(toTuple2(presign ? {
      address: authorization.address,
      chainId: authorization.chainId,
      nonce: authorization.nonce
    } : authorization))));
  }
  function toRpc2(authorization) {
    const { address, chainId, nonce, ...signature } = authorization;
    return {
      address,
      chainId: Hex2.fromNumber(chainId),
      nonce: Hex2.fromNumber(nonce),
      ...Signature2.toRpc(signature)
    };
  }
  function toRpcList2(authorizationList) {
    return authorizationList.map(toRpc2);
  }
  function toTuple2(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = Signature2.extract(authorization);
    return [
      chainId ? Hex2.fromNumber(chainId) : "0x",
      address,
      nonce ? Hex2.fromNumber(nonce) : "0x",
      ...signature ? Signature2.toTuple(signature) : []
    ];
  }
  function toTupleList2(list) {
    if (!list || list.length === 0)
      return [];
    const tupleList = [];
    for (const authorization of list)
      tupleList.push(toTuple2(authorization));
    return tupleList;
  }
  return Authorization;
}
var Secp256k1 = {};
var entropy = {};
var hasRequiredEntropy;
function requireEntropy() {
  if (hasRequiredEntropy) return entropy;
  hasRequiredEntropy = 1;
  Object.defineProperty(entropy, "__esModule", { value: true });
  entropy.extraEntropy = void 0;
  entropy.setExtraEntropy = setExtraEntropy;
  entropy.extraEntropy = false;
  function setExtraEntropy(entropy$12) {
    entropy.extraEntropy = entropy$12;
  }
  return entropy;
}
var hasRequiredSecp256k1;
function requireSecp256k1() {
  if (hasRequiredSecp256k1) return Secp256k1;
  hasRequiredSecp256k1 = 1;
  Object.defineProperty(Secp256k1, "__esModule", { value: true });
  Secp256k1.noble = void 0;
  Secp256k1.createKeyPair = createKeyPair2;
  Secp256k1.getPublicKey = getPublicKey;
  Secp256k1.getSharedSecret = getSharedSecret;
  Secp256k1.randomPrivateKey = randomPrivateKey;
  Secp256k1.recoverAddress = recoverAddress2;
  Secp256k1.recoverPublicKey = recoverPublicKey2;
  Secp256k1.sign = sign2;
  Secp256k1.verify = verify2;
  const secp256k1_1 = /* @__PURE__ */ requireSecp256k1$3();
  const Address2 = requireAddress();
  const Bytes2 = requireBytes();
  const Hex2 = requireHex();
  const Entropy = requireEntropy();
  const PublicKey2 = requirePublicKey();
  Secp256k1.noble = secp256k1_1.secp256k1;
  function createKeyPair2(options = {}) {
    const { as = "Hex" } = options;
    const privateKey = randomPrivateKey({ as });
    const publicKey = getPublicKey({ privateKey });
    return {
      privateKey,
      publicKey
    };
  }
  function getPublicKey(options) {
    const { privateKey } = options;
    const point = secp256k1_1.secp256k1.ProjectivePoint.fromPrivateKey(Hex2.from(privateKey).slice(2));
    return PublicKey2.from(point);
  }
  function getSharedSecret(options) {
    const { as = "Hex", privateKey, publicKey } = options;
    const point = secp256k1_1.secp256k1.ProjectivePoint.fromHex(PublicKey2.toHex(publicKey).slice(2));
    const sharedPoint = point.multiply(secp256k1_1.secp256k1.utils.normPrivateKeyToScalar(Hex2.from(privateKey).slice(2)));
    const sharedSecret = sharedPoint.toRawBytes(true);
    if (as === "Hex")
      return Hex2.fromBytes(sharedSecret);
    return sharedSecret;
  }
  function randomPrivateKey(options = {}) {
    const { as = "Hex" } = options;
    const bytes2 = secp256k1_1.secp256k1.utils.randomPrivateKey();
    if (as === "Hex")
      return Hex2.fromBytes(bytes2);
    return bytes2;
  }
  function recoverAddress2(options) {
    return Address2.fromPublicKey(recoverPublicKey2(options));
  }
  function recoverPublicKey2(options) {
    const { payload, signature } = options;
    const { r, s, yParity } = signature;
    const signature_ = new secp256k1_1.secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(yParity);
    const point = signature_.recoverPublicKey(Hex2.from(payload).substring(2));
    return PublicKey2.from(point);
  }
  function sign2(options) {
    const { extraEntropy = Entropy.extraEntropy, hash: hash2, payload, privateKey } = options;
    const { r, s, recovery } = secp256k1_1.secp256k1.sign(Bytes2.from(payload), Bytes2.from(privateKey), {
      extraEntropy: typeof extraEntropy === "boolean" ? extraEntropy : Hex2.from(extraEntropy).slice(2),
      lowS: true,
      ...hash2 ? { prehash: true } : {}
    });
    return {
      r,
      s,
      yParity: recovery
    };
  }
  function verify2(options) {
    const { hash: hash2, payload } = options;
    if (options.address)
      return Address2.isEqual(options.address, recoverAddress2({ payload, signature: options.signature }));
    return secp256k1_1.secp256k1.verify(options.signature, Bytes2.from(payload), PublicKey2.toBytes(options.publicKey), ...hash2 ? [{ prehash: true, lowS: true }] : []);
  }
  return Secp256k1;
}
var hasRequiredSignatureErc8010;
function requireSignatureErc8010() {
  if (hasRequiredSignatureErc8010) return SignatureErc8010;
  hasRequiredSignatureErc8010 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidWrappedSignatureError = exports.suffixParameters = exports.magicBytes = void 0;
    exports.assert = assert2;
    exports.from = from2;
    exports.unwrap = unwrap2;
    exports.wrap = wrap2;
    exports.validate = validate2;
    const AbiParameters2 = requireAbiParameters();
    const Authorization2 = requireAuthorization();
    const Errors2 = requireErrors();
    const Hex2 = requireHex();
    const Secp256k12 = requireSecp256k1();
    const Signature2 = requireSignature();
    exports.magicBytes = "0x8010801080108010801080108010801080108010801080108010801080108010";
    exports.suffixParameters = AbiParameters2.from("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
    function assert2(value) {
      if (typeof value === "string") {
        if (Hex2.slice(value, -32) !== exports.magicBytes)
          throw new InvalidWrappedSignatureError3(value);
      } else
        Signature2.assert(value.authorization);
    }
    function from2(value) {
      if (typeof value === "string")
        return unwrap2(value);
      return value;
    }
    function unwrap2(wrapped) {
      assert2(wrapped);
      const suffixLength = Hex2.toNumber(Hex2.slice(wrapped, -64, -32));
      const suffix = Hex2.slice(wrapped, -suffixLength - 64, -64);
      const signature = Hex2.slice(wrapped, 0, -suffixLength - 64);
      const [auth, to2, data] = AbiParameters2.decode(exports.suffixParameters, suffix);
      const authorization = Authorization2.from({
        address: auth.delegation,
        chainId: Number(auth.chainId),
        nonce: auth.nonce,
        yParity: auth.yParity,
        r: auth.r,
        s: auth.s
      });
      return {
        authorization,
        signature,
        ...data && data !== "0x" ? { data, to: to2 } : {}
      };
    }
    function wrap2(value) {
      const { data, signature } = value;
      assert2(value);
      const self = Secp256k12.recoverAddress({
        payload: Authorization2.getSignPayload(value.authorization),
        signature: Signature2.from(value.authorization)
      });
      const suffix = AbiParameters2.encode(exports.suffixParameters, [
        {
          ...value.authorization,
          delegation: value.authorization.address,
          chainId: BigInt(value.authorization.chainId)
        },
        value.to ?? self,
        data ?? "0x"
      ]);
      const suffixLength = Hex2.fromNumber(Hex2.size(suffix), { size: 32 });
      return Hex2.concat(signature, suffix, suffixLength, exports.magicBytes);
    }
    function validate2(value) {
      try {
        assert2(value);
        return true;
      } catch {
        return false;
      }
    }
    class InvalidWrappedSignatureError3 extends Errors2.BaseError {
      constructor(wrapped) {
        super(`Value \`${wrapped}\` is an invalid ERC-8010 wrapped signature.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SignatureErc8010.InvalidWrappedSignatureError"
        });
      }
    }
    exports.InvalidWrappedSignatureError = InvalidWrappedSignatureError3;
  })(SignatureErc8010);
  return SignatureErc8010;
}
var hasRequiredErc8010;
function requireErc8010() {
  if (hasRequiredErc8010) return erc8010;
  hasRequiredErc8010 = 1;
  Object.defineProperty(erc8010, "__esModule", { value: true });
  erc8010.SignatureErc8010 = void 0;
  erc8010.SignatureErc8010 = requireSignatureErc8010();
  return erc8010;
}
var AbiConstructor = {};
var AbiItem = {};
var abiItem = {};
var hasRequiredAbiItem$1;
function requireAbiItem$1() {
  if (hasRequiredAbiItem$1) return abiItem;
  hasRequiredAbiItem$1 = 1;
  Object.defineProperty(abiItem, "__esModule", { value: true });
  abiItem.normalizeSignature = normalizeSignature2;
  abiItem.isArgOfType = isArgOfType2;
  abiItem.getAmbiguousTypes = getAmbiguousTypes2;
  const Address2 = requireAddress();
  const Errors2 = requireErrors();
  function normalizeSignature2(signature) {
    let active = true;
    let current = "";
    let level = 0;
    let result = "";
    let valid = false;
    for (let i = 0; i < signature.length; i++) {
      const char = signature[i];
      if (["(", ")", ","].includes(char))
        active = true;
      if (char === "(")
        level++;
      if (char === ")")
        level--;
      if (!active)
        continue;
      if (level === 0) {
        if (char === " " && ["event", "function", "error", ""].includes(result))
          result = "";
        else {
          result += char;
          if (char === ")") {
            valid = true;
            break;
          }
        }
        continue;
      }
      if (char === " ") {
        if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
          current = "";
          active = false;
        }
        continue;
      }
      result += char;
      current += char;
    }
    if (!valid)
      throw new Errors2.BaseError("Unable to normalize signature.");
    return result;
  }
  function isArgOfType2(arg, abiParameter) {
    const argType = typeof arg;
    const abiParameterType = abiParameter.type;
    switch (abiParameterType) {
      case "address":
        return Address2.validate(arg, { strict: false });
      case "bool":
        return argType === "boolean";
      case "function":
        return argType === "string";
      case "string":
        return argType === "string";
      default: {
        if (abiParameterType === "tuple" && "components" in abiParameter)
          return Object.values(abiParameter.components).every((component, index) => {
            return isArgOfType2(Object.values(arg)[index], component);
          });
        if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
          return argType === "number" || argType === "bigint";
        if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
          return argType === "string" || arg instanceof Uint8Array;
        if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
          return Array.isArray(arg) && arg.every((x) => isArgOfType2(x, {
            ...abiParameter,
            type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
          }));
        }
        return false;
      }
    }
  }
  function getAmbiguousTypes2(sourceParameters, targetParameters, args) {
    for (const parameterIndex in sourceParameters) {
      const sourceParameter = sourceParameters[parameterIndex];
      const targetParameter = targetParameters[parameterIndex];
      if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
        return getAmbiguousTypes2(sourceParameter.components, targetParameter.components, args[parameterIndex]);
      const types = [sourceParameter.type, targetParameter.type];
      const ambiguous = (() => {
        if (types.includes("address") && types.includes("bytes20"))
          return true;
        if (types.includes("address") && types.includes("string"))
          return Address2.validate(args[parameterIndex], {
            strict: false
          });
        if (types.includes("address") && types.includes("bytes"))
          return Address2.validate(args[parameterIndex], {
            strict: false
          });
        return false;
      })();
      if (ambiguous)
        return types;
    }
    return;
  }
  return abiItem;
}
var hasRequiredAbiItem;
function requireAbiItem() {
  if (hasRequiredAbiItem) return AbiItem;
  hasRequiredAbiItem = 1;
  Object.defineProperty(AbiItem, "__esModule", { value: true });
  AbiItem.InvalidSelectorSizeError = AbiItem.NotFoundError = AbiItem.AmbiguityError = void 0;
  AbiItem.format = format2;
  AbiItem.from = from2;
  AbiItem.fromAbi = fromAbi2;
  AbiItem.getSelector = getSelector2;
  AbiItem.getSignature = getSignature2;
  AbiItem.getSignatureHash = getSignatureHash2;
  const abitype = /* @__PURE__ */ requireExports$1();
  const Errors2 = requireErrors();
  const Hash2 = requireHash();
  const Hex2 = requireHex();
  const internal = requireAbiItem$1();
  function format2(abiItem2) {
    return abitype.formatAbiItem(abiItem2);
  }
  function from2(abiItem2, options = {}) {
    const { prepare = true } = options;
    const item = (() => {
      if (Array.isArray(abiItem2))
        return abitype.parseAbiItem(abiItem2);
      if (typeof abiItem2 === "string")
        return abitype.parseAbiItem(abiItem2);
      return abiItem2;
    })();
    return {
      ...item,
      ...prepare ? { hash: getSignatureHash2(item) } : {}
    };
  }
  function fromAbi2(abi2, name, options) {
    const { args = [], prepare = true } = options ?? {};
    const isSelector = Hex2.validate(name, { strict: false });
    const abiItems = abi2.filter((abiItem3) => {
      if (isSelector) {
        if (abiItem3.type === "function" || abiItem3.type === "error")
          return getSelector2(abiItem3) === Hex2.slice(name, 0, 4);
        if (abiItem3.type === "event")
          return getSignatureHash2(abiItem3) === name;
        return false;
      }
      return "name" in abiItem3 && abiItem3.name === name;
    });
    if (abiItems.length === 0)
      throw new NotFoundError2({ name });
    if (abiItems.length === 1)
      return {
        ...abiItems[0],
        ...prepare ? { hash: getSignatureHash2(abiItems[0]) } : {}
      };
    let matchedAbiItem;
    for (const abiItem3 of abiItems) {
      if (!("inputs" in abiItem3))
        continue;
      if (!args || args.length === 0) {
        if (!abiItem3.inputs || abiItem3.inputs.length === 0)
          return {
            ...abiItem3,
            ...prepare ? { hash: getSignatureHash2(abiItem3) } : {}
          };
        continue;
      }
      if (!abiItem3.inputs)
        continue;
      if (abiItem3.inputs.length === 0)
        continue;
      if (abiItem3.inputs.length !== args.length)
        continue;
      const matched = args.every((arg, index) => {
        const abiParameter = "inputs" in abiItem3 && abiItem3.inputs[index];
        if (!abiParameter)
          return false;
        return internal.isArgOfType(arg, abiParameter);
      });
      if (matched) {
        if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
          const ambiguousTypes = internal.getAmbiguousTypes(abiItem3.inputs, matchedAbiItem.inputs, args);
          if (ambiguousTypes)
            throw new AmbiguityError2({
              abiItem: abiItem3,
              type: ambiguousTypes[0]
            }, {
              abiItem: matchedAbiItem,
              type: ambiguousTypes[1]
            });
        }
        matchedAbiItem = abiItem3;
      }
    }
    const abiItem2 = (() => {
      if (matchedAbiItem)
        return matchedAbiItem;
      const [abiItem3, ...overloads] = abiItems;
      return { ...abiItem3, overloads };
    })();
    if (!abiItem2)
      throw new NotFoundError2({ name });
    return {
      ...abiItem2,
      ...prepare ? { hash: getSignatureHash2(abiItem2) } : {}
    };
  }
  function getSelector2(...parameters) {
    const abiItem2 = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name] = parameters;
        return fromAbi2(abi2, name);
      }
      return parameters[0];
    })();
    return Hex2.slice(getSignatureHash2(abiItem2), 0, 4);
  }
  function getSignature2(...parameters) {
    const abiItem2 = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name] = parameters;
        return fromAbi2(abi2, name);
      }
      return parameters[0];
    })();
    const signature = (() => {
      if (typeof abiItem2 === "string")
        return abiItem2;
      return abitype.formatAbiItem(abiItem2);
    })();
    return internal.normalizeSignature(signature);
  }
  function getSignatureHash2(...parameters) {
    const abiItem2 = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name] = parameters;
        return fromAbi2(abi2, name);
      }
      return parameters[0];
    })();
    if (typeof abiItem2 !== "string" && "hash" in abiItem2 && abiItem2.hash)
      return abiItem2.hash;
    return Hash2.keccak256(Hex2.fromString(getSignature2(abiItem2)));
  }
  class AmbiguityError2 extends Errors2.BaseError {
    constructor(x, y) {
      super("Found ambiguous types in overloaded ABI Items.", {
        metaMessages: [
          `\`${x.type}\` in \`${internal.normalizeSignature(abitype.formatAbiItem(x.abiItem))}\`, and`,
          `\`${y.type}\` in \`${internal.normalizeSignature(abitype.formatAbiItem(y.abiItem))}\``,
          "",
          "These types encode differently and cannot be distinguished at runtime.",
          "Remove one of the ambiguous items in the ABI."
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.AmbiguityError"
      });
    }
  }
  AbiItem.AmbiguityError = AmbiguityError2;
  class NotFoundError2 extends Errors2.BaseError {
    constructor({ name, data, type: type2 = "item" }) {
      const selector = (() => {
        if (name)
          return ` with name "${name}"`;
        if (data)
          return ` with data "${data}"`;
        return "";
      })();
      super(`ABI ${type2}${selector} not found.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.NotFoundError"
      });
    }
  }
  AbiItem.NotFoundError = NotFoundError2;
  class InvalidSelectorSizeError extends Errors2.BaseError {
    constructor({ data }) {
      super(`Selector size is invalid. Expected 4 bytes. Received ${Hex2.size(data)} bytes ("${data}").`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.InvalidSelectorSizeError"
      });
    }
  }
  AbiItem.InvalidSelectorSizeError = InvalidSelectorSizeError;
  return AbiItem;
}
var hasRequiredAbiConstructor;
function requireAbiConstructor() {
  if (hasRequiredAbiConstructor) return AbiConstructor;
  hasRequiredAbiConstructor = 1;
  Object.defineProperty(AbiConstructor, "__esModule", { value: true });
  AbiConstructor.decode = decode2;
  AbiConstructor.encode = encode2;
  AbiConstructor.format = format2;
  AbiConstructor.from = from2;
  AbiConstructor.fromAbi = fromAbi2;
  const abitype = /* @__PURE__ */ requireExports$1();
  const AbiItem2 = requireAbiItem();
  const AbiParameters2 = requireAbiParameters();
  const Hex2 = requireHex();
  function decode2(...parameters) {
    const [abiConstructor, options] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, options2] = parameters;
        return [fromAbi2(abi2), options2];
      }
      return parameters;
    })();
    const { bytecode } = options;
    if (abiConstructor.inputs?.length === 0)
      return void 0;
    const data = options.data.replace(bytecode, "0x");
    return AbiParameters2.decode(abiConstructor.inputs, data);
  }
  function encode2(...parameters) {
    const [abiConstructor, options] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, options2] = parameters;
        return [fromAbi2(abi2), options2];
      }
      return parameters;
    })();
    const { bytecode, args } = options;
    return Hex2.concat(bytecode, abiConstructor.inputs?.length && args?.length ? AbiParameters2.encode(abiConstructor.inputs, args) : "0x");
  }
  function format2(abiConstructor) {
    return abitype.formatAbiItem(abiConstructor);
  }
  function from2(abiConstructor) {
    return AbiItem2.from(abiConstructor);
  }
  function fromAbi2(abi2) {
    const item = abi2.find((item2) => item2.type === "constructor");
    if (!item)
      throw new AbiItem2.NotFoundError({ name: "constructor" });
    return item;
  }
  return AbiConstructor;
}
var AbiFunction = {};
var hasRequiredAbiFunction;
function requireAbiFunction() {
  if (hasRequiredAbiFunction) return AbiFunction;
  hasRequiredAbiFunction = 1;
  Object.defineProperty(AbiFunction, "__esModule", { value: true });
  AbiFunction.decodeData = decodeData;
  AbiFunction.decodeResult = decodeResult;
  AbiFunction.encodeData = encodeData2;
  AbiFunction.encodeResult = encodeResult;
  AbiFunction.format = format2;
  AbiFunction.from = from2;
  AbiFunction.fromAbi = fromAbi2;
  AbiFunction.getSelector = getSelector2;
  const abitype = /* @__PURE__ */ requireExports$1();
  const AbiItem2 = requireAbiItem();
  const AbiParameters2 = requireAbiParameters();
  const Hex2 = requireHex();
  function decodeData(...parameters) {
    const [abiFunction, data] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name, data2] = parameters;
        return [fromAbi2(abi2, name), data2];
      }
      return parameters;
    })();
    const { overloads } = abiFunction;
    if (Hex2.size(data) < 4)
      throw new AbiItem2.InvalidSelectorSizeError({ data });
    if (abiFunction.inputs?.length === 0)
      return void 0;
    const item = overloads ? fromAbi2([abiFunction, ...overloads], data) : abiFunction;
    if (Hex2.size(data) <= 4)
      return void 0;
    return AbiParameters2.decode(item.inputs, Hex2.slice(data, 4));
  }
  function decodeResult(...parameters) {
    const [abiFunction, data, options = {}] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name, data2, options2] = parameters;
        return [fromAbi2(abi2, name), data2, options2];
      }
      return parameters;
    })();
    const values = AbiParameters2.decode(abiFunction.outputs, data, options);
    if (values && Object.keys(values).length === 0)
      return void 0;
    if (values && Object.keys(values).length === 1) {
      if (Array.isArray(values))
        return values[0];
      return Object.values(values)[0];
    }
    return values;
  }
  function encodeData2(...parameters) {
    const [abiFunction, args = []] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name, args3] = parameters;
        return [fromAbi2(abi2, name, { args: args3 }), args3];
      }
      const [abiFunction2, args2] = parameters;
      return [abiFunction2, args2];
    })();
    const { overloads } = abiFunction;
    const item = overloads ? fromAbi2([abiFunction, ...overloads], abiFunction.name, {
      args
    }) : abiFunction;
    const selector = getSelector2(item);
    const data = args.length > 0 ? AbiParameters2.encode(item.inputs, args) : void 0;
    return data ? Hex2.concat(selector, data) : selector;
  }
  function encodeResult(...parameters) {
    const [abiFunction, output, options = {}] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name, output2, options2] = parameters;
        return [fromAbi2(abi2, name), output2, options2];
      }
      return parameters;
    })();
    const { as = "Array" } = options;
    const values = (() => {
      if (abiFunction.outputs.length === 1)
        return [output];
      if (Array.isArray(output))
        return output;
      if (as === "Object")
        return Object.values(output);
      return [output];
    })();
    return AbiParameters2.encode(abiFunction.outputs, values);
  }
  function format2(abiFunction) {
    return abitype.formatAbiItem(abiFunction);
  }
  function from2(abiFunction, options = {}) {
    return AbiItem2.from(abiFunction, options);
  }
  function fromAbi2(abi2, name, options) {
    const item = AbiItem2.fromAbi(abi2, name, options);
    if (item.type !== "function")
      throw new AbiItem2.NotFoundError({ name, type: "function" });
    return item;
  }
  function getSelector2(abiItem2) {
    return AbiItem2.getSelector(abiItem2);
  }
  return AbiFunction;
}
var erc6492 = {};
var SignatureErc6492 = {};
var hasRequiredSignatureErc6492;
function requireSignatureErc6492() {
  if (hasRequiredSignatureErc6492) return SignatureErc6492;
  hasRequiredSignatureErc6492 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidWrappedSignatureError = exports.universalSignatureValidatorAbi = exports.universalSignatureValidatorBytecode = exports.magicBytes = void 0;
    exports.assert = assert2;
    exports.from = from2;
    exports.unwrap = unwrap2;
    exports.wrap = wrap2;
    exports.validate = validate2;
    const AbiParameters2 = requireAbiParameters();
    const Errors2 = requireErrors();
    const Hex2 = requireHex();
    exports.magicBytes = "0x6492649264926492649264926492649264926492649264926492649264926492";
    exports.universalSignatureValidatorBytecode = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
    exports.universalSignatureValidatorAbi = [
      {
        inputs: [
          {
            name: "_signer",
            type: "address"
          },
          {
            name: "_hash",
            type: "bytes32"
          },
          {
            name: "_signature",
            type: "bytes"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        inputs: [
          {
            name: "_signer",
            type: "address"
          },
          {
            name: "_hash",
            type: "bytes32"
          },
          {
            name: "_signature",
            type: "bytes"
          }
        ],
        outputs: [
          {
            type: "bool"
          }
        ],
        stateMutability: "nonpayable",
        type: "function",
        name: "isValidSig"
      }
    ];
    function assert2(wrapped) {
      if (Hex2.slice(wrapped, -32) !== exports.magicBytes)
        throw new InvalidWrappedSignatureError3(wrapped);
    }
    function from2(wrapped) {
      if (typeof wrapped === "string")
        return unwrap2(wrapped);
      return wrapped;
    }
    function unwrap2(wrapped) {
      assert2(wrapped);
      const [to2, data, signature] = AbiParameters2.decode(AbiParameters2.from("address, bytes, bytes"), wrapped);
      return { data, signature, to: to2 };
    }
    function wrap2(value) {
      const { data, signature, to: to2 } = value;
      return Hex2.concat(AbiParameters2.encode(AbiParameters2.from("address, bytes, bytes"), [
        to2,
        data,
        signature
      ]), exports.magicBytes);
    }
    function validate2(wrapped) {
      try {
        assert2(wrapped);
        return true;
      } catch {
        return false;
      }
    }
    class InvalidWrappedSignatureError3 extends Errors2.BaseError {
      constructor(wrapped) {
        super(`Value \`${wrapped}\` is an invalid ERC-6492 wrapped signature.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SignatureErc6492.InvalidWrappedSignatureError"
        });
      }
    }
    exports.InvalidWrappedSignatureError = InvalidWrappedSignatureError3;
  })(SignatureErc6492);
  return SignatureErc6492;
}
var hasRequiredErc6492;
function requireErc6492() {
  if (hasRequiredErc6492) return erc6492;
  hasRequiredErc6492 = 1;
  Object.defineProperty(erc6492, "__esModule", { value: true });
  erc6492.SignatureErc6492 = void 0;
  erc6492.SignatureErc6492 = requireSignatureErc6492();
  return erc6492;
}
export {
  concat$1 as A,
  extractAddress as B,
  verify as C,
  getAddress as D,
  requireBlockOverrides as E,
  requireErc8010 as F,
  requireAbiConstructor as G,
  requireAbiFunction as H,
  requireErc6492 as I,
  require_cjs as J,
  slice$1 as K,
  toHex$1 as L,
  getSignPayload as M,
  sign as N,
  toHex as O,
  createKeyPair as P,
  fromHex$1 as Q,
  toDerBytes as R,
  encodeData as a,
  from$9 as b,
  validate$2 as c,
  fromNumber$1 as d,
  encode as e,
  from$8 as f,
  from$6 as g,
  getSignPayload$1 as h,
  from$3 as i,
  serialize as j,
  getFeePayerSignPayload as k,
  from$c as l,
  getSignPayload$2 as m,
  from$4 as n,
  fromPublicKey as o,
  fromHex$6 as p,
  toRpc as q,
  recoverAddress as r,
  sortMultisigApprovals as s,
  toRpc$7 as t,
  unwrap as u,
  validate$3 as v,
  wrap as w,
  fromRpc as x,
  toRpcType as y,
  deserialize$1 as z
};
