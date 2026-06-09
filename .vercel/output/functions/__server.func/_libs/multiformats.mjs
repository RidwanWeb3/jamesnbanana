import require$$1 from "crypto";
var basics = {};
var identity$1 = {};
var base = {};
var baseX;
var hasRequiredBaseX;
function requireBaseX() {
  if (hasRequiredBaseX) return baseX;
  hasRequiredBaseX = 1;
  function base3(ALPHABET, name) {
    if (ALPHABET.length >= 255) {
      throw new TypeError("Alphabet too long");
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i);
      var xc = x.charCodeAt(0);
      if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + " is ambiguous");
      }
      BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode(source) {
      if (source instanceof Uint8Array) ;
      else if (ArrayBuffer.isView(source)) {
        source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
      } else if (Array.isArray(source)) {
        source = Uint8Array.from(source);
      }
      if (!(source instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
      }
      if (source.length === 0) {
        return "";
      }
      var zeroes = 0;
      var length = 0;
      var pbegin = 0;
      var pend = source.length;
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
      }
      var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
      var b58 = new Uint8Array(size);
      while (pbegin !== pend) {
        var carry = source[pbegin];
        var i2 = 0;
        for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
          carry += 256 * b58[it1] >>> 0;
          b58[it1] = carry % BASE >>> 0;
          carry = carry / BASE >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length = i2;
        pbegin++;
      }
      var it2 = size - length;
      while (it2 !== size && b58[it2] === 0) {
        it2++;
      }
      var str = LEADER.repeat(zeroes);
      for (; it2 < size; ++it2) {
        str += ALPHABET.charAt(b58[it2]);
      }
      return str;
    }
    function decodeUnsafe(source) {
      if (typeof source !== "string") {
        throw new TypeError("Expected String");
      }
      if (source.length === 0) {
        return new Uint8Array();
      }
      var psz = 0;
      if (source[psz] === " ") {
        return;
      }
      var zeroes = 0;
      var length = 0;
      while (source[psz] === LEADER) {
        zeroes++;
        psz++;
      }
      var size = (source.length - psz) * FACTOR + 1 >>> 0;
      var b256 = new Uint8Array(size);
      while (source[psz]) {
        var carry = BASE_MAP[source.charCodeAt(psz)];
        if (carry === 255) {
          return;
        }
        var i2 = 0;
        for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
          carry += BASE * b256[it3] >>> 0;
          b256[it3] = carry % 256 >>> 0;
          carry = carry / 256 >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length = i2;
        psz++;
      }
      if (source[psz] === " ") {
        return;
      }
      var it4 = size - length;
      while (it4 !== size && b256[it4] === 0) {
        it4++;
      }
      var vch = new Uint8Array(zeroes + (size - it4));
      var j2 = zeroes;
      while (it4 !== size) {
        vch[j2++] = b256[it4++];
      }
      return vch;
    }
    function decode(string) {
      var buffer = decodeUnsafe(string);
      if (buffer) {
        return buffer;
      }
      throw new Error(`Non-${name} character`);
    }
    return {
      encode,
      decodeUnsafe,
      decode
    };
  }
  var src2 = base3;
  var _brrp__multiformats_scope_baseX = src2;
  baseX = _brrp__multiformats_scope_baseX;
  return baseX;
}
var bytes = {};
var hasRequiredBytes;
function requireBytes() {
  if (hasRequiredBytes) return bytes;
  hasRequiredBytes = 1;
  Object.defineProperty(bytes, "__esModule", { value: true });
  const empty = new Uint8Array(0);
  const toHex = (d) => d.reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
  const fromHex = (hex) => {
    const hexes = hex.match(/../g);
    return hexes ? new Uint8Array(hexes.map((b) => parseInt(b, 16))) : empty;
  };
  const equals = (aa, bb) => {
    if (aa === bb)
      return true;
    if (aa.byteLength !== bb.byteLength) {
      return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
      if (aa[ii] !== bb[ii]) {
        return false;
      }
    }
    return true;
  };
  const coerce = (o) => {
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
      return o;
    if (o instanceof ArrayBuffer)
      return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
      return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error("Unknown type, must be binary type");
  };
  const isBinary = (o) => o instanceof ArrayBuffer || ArrayBuffer.isView(o);
  const fromString = (str) => new TextEncoder().encode(str);
  const toString = (b) => new TextDecoder().decode(b);
  bytes.coerce = coerce;
  bytes.empty = empty;
  bytes.equals = equals;
  bytes.fromHex = fromHex;
  bytes.fromString = fromString;
  bytes.isBinary = isBinary;
  bytes.toHex = toHex;
  bytes.toString = toString;
  return bytes;
}
var hasRequiredBase;
function requireBase() {
  if (hasRequiredBase) return base;
  hasRequiredBase = 1;
  Object.defineProperty(base, "__esModule", { value: true });
  var baseX$1 = requireBaseX();
  var bytes2 = requireBytes();
  class Encoder {
    constructor(name, prefix, baseEncode) {
      this.name = name;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
    }
    encode(bytes3) {
      if (bytes3 instanceof Uint8Array) {
        return `${this.prefix}${this.baseEncode(bytes3)}`;
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  }
  class Decoder {
    constructor(name, prefix, baseDecode) {
      this.name = name;
      this.prefix = prefix;
      if (prefix.codePointAt(0) === void 0) {
        throw new Error("Invalid prefix character");
      }
      this.prefixCodePoint = prefix.codePointAt(0);
      this.baseDecode = baseDecode;
    }
    decode(text) {
      if (typeof text === "string") {
        if (text.codePointAt(0) !== this.prefixCodePoint) {
          throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        }
        return this.baseDecode(text.slice(this.prefix.length));
      } else {
        throw Error("Can only multibase decode strings");
      }
    }
    or(decoder) {
      return or(this, decoder);
    }
  }
  class ComposedDecoder {
    constructor(decoders) {
      this.decoders = decoders;
    }
    or(decoder) {
      return or(this, decoder);
    }
    decode(input) {
      const prefix = input[0];
      const decoder = this.decoders[prefix];
      if (decoder) {
        return decoder.decode(input);
      } else {
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
      }
    }
  }
  const or = (left, right) => new ComposedDecoder({
    ...left.decoders || { [left.prefix]: left },
    ...right.decoders || { [right.prefix]: right }
  });
  class Codec {
    constructor(name, prefix, baseEncode, baseDecode) {
      this.name = name;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
      this.baseDecode = baseDecode;
      this.encoder = new Encoder(name, prefix, baseEncode);
      this.decoder = new Decoder(name, prefix, baseDecode);
    }
    encode(input) {
      return this.encoder.encode(input);
    }
    decode(input) {
      return this.decoder.decode(input);
    }
  }
  const from = ({ name, prefix, encode: encode2, decode: decode2 }) => new Codec(name, prefix, encode2, decode2);
  const baseX2 = ({ prefix, name, alphabet }) => {
    const { encode: encode2, decode: decode2 } = baseX$1(alphabet, name);
    return from({
      prefix,
      name,
      encode: encode2,
      decode: (text) => bytes2.coerce(decode2(text))
    });
  };
  const decode = (string, alphabet, bitsPerChar, name) => {
    const codes = {};
    for (let i = 0; i < alphabet.length; ++i) {
      codes[alphabet[i]] = i;
    }
    let end = string.length;
    while (string[end - 1] === "=") {
      --end;
    }
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for (let i = 0; i < end; ++i) {
      const value = codes[string[i]];
      if (value === void 0) {
        throw new SyntaxError(`Non-${name} character`);
      }
      buffer = buffer << bitsPerChar | value;
      bits += bitsPerChar;
      if (bits >= 8) {
        bits -= 8;
        out[written++] = 255 & buffer >> bits;
      }
    }
    if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
      throw new SyntaxError("Unexpected end of data");
    }
    return out;
  };
  const encode = (data, alphabet, bitsPerChar) => {
    const pad = alphabet[alphabet.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer = 0;
    for (let i = 0; i < data.length; ++i) {
      buffer = buffer << 8 | data[i];
      bits += 8;
      while (bits > bitsPerChar) {
        bits -= bitsPerChar;
        out += alphabet[mask & buffer >> bits];
      }
    }
    if (bits) {
      out += alphabet[mask & buffer << bitsPerChar - bits];
    }
    if (pad) {
      while (out.length * bitsPerChar & 7) {
        out += "=";
      }
    }
    return out;
  };
  const rfc4648 = ({ name, prefix, bitsPerChar, alphabet }) => {
    return from({
      prefix,
      name,
      encode(input) {
        return encode(input, alphabet, bitsPerChar);
      },
      decode(input) {
        return decode(input, alphabet, bitsPerChar, name);
      }
    });
  };
  base.Codec = Codec;
  base.baseX = baseX2;
  base.from = from;
  base.or = or;
  base.rfc4648 = rfc4648;
  return base;
}
var hasRequiredIdentity$1;
function requireIdentity$1() {
  if (hasRequiredIdentity$1) return identity$1;
  hasRequiredIdentity$1 = 1;
  Object.defineProperty(identity$1, "__esModule", { value: true });
  var base3 = requireBase();
  var bytes2 = requireBytes();
  const identity2 = base3.from({
    prefix: "\0",
    name: "identity",
    encode: (buf) => bytes2.toString(buf),
    decode: (str) => bytes2.fromString(str)
  });
  identity$1.identity = identity2;
  return identity$1;
}
var base2 = {};
var hasRequiredBase2;
function requireBase2() {
  if (hasRequiredBase2) return base2;
  hasRequiredBase2 = 1;
  Object.defineProperty(base2, "__esModule", { value: true });
  var base3 = requireBase();
  const base2$1 = base3.rfc4648({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
  });
  base2.base2 = base2$1;
  return base2;
}
var base8 = {};
var hasRequiredBase8;
function requireBase8() {
  if (hasRequiredBase8) return base8;
  hasRequiredBase8 = 1;
  Object.defineProperty(base8, "__esModule", { value: true });
  var base3 = requireBase();
  const base8$1 = base3.rfc4648({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
  });
  base8.base8 = base8$1;
  return base8;
}
var base10 = {};
var hasRequiredBase10;
function requireBase10() {
  if (hasRequiredBase10) return base10;
  hasRequiredBase10 = 1;
  Object.defineProperty(base10, "__esModule", { value: true });
  var base3 = requireBase();
  const base10$1 = base3.baseX({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
  });
  base10.base10 = base10$1;
  return base10;
}
var base16 = {};
var hasRequiredBase16;
function requireBase16() {
  if (hasRequiredBase16) return base16;
  hasRequiredBase16 = 1;
  Object.defineProperty(base16, "__esModule", { value: true });
  var base3 = requireBase();
  const base16$1 = base3.rfc4648({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
  });
  const base16upper = base3.rfc4648({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
  });
  base16.base16 = base16$1;
  base16.base16upper = base16upper;
  return base16;
}
var base32 = {};
var hasRequiredBase32;
function requireBase32() {
  if (hasRequiredBase32) return base32;
  hasRequiredBase32 = 1;
  Object.defineProperty(base32, "__esModule", { value: true });
  var base3 = requireBase();
  const base32$1 = base3.rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
  });
  const base32upper = base3.rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
  });
  const base32pad = base3.rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
  });
  const base32padupper = base3.rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
  });
  const base32hex = base3.rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
  });
  const base32hexupper = base3.rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
  });
  const base32hexpad = base3.rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
  });
  const base32hexpadupper = base3.rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
  });
  const base32z = base3.rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
  });
  base32.base32 = base32$1;
  base32.base32hex = base32hex;
  base32.base32hexpad = base32hexpad;
  base32.base32hexpadupper = base32hexpadupper;
  base32.base32hexupper = base32hexupper;
  base32.base32pad = base32pad;
  base32.base32padupper = base32padupper;
  base32.base32upper = base32upper;
  base32.base32z = base32z;
  return base32;
}
var base36 = {};
var hasRequiredBase36;
function requireBase36() {
  if (hasRequiredBase36) return base36;
  hasRequiredBase36 = 1;
  Object.defineProperty(base36, "__esModule", { value: true });
  var base3 = requireBase();
  const base36$1 = base3.baseX({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
  });
  const base36upper = base3.baseX({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  });
  base36.base36 = base36$1;
  base36.base36upper = base36upper;
  return base36;
}
var base58 = {};
var hasRequiredBase58;
function requireBase58() {
  if (hasRequiredBase58) return base58;
  hasRequiredBase58 = 1;
  Object.defineProperty(base58, "__esModule", { value: true });
  var base3 = requireBase();
  const base58btc = base3.baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  });
  const base58flickr = base3.baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  });
  base58.base58btc = base58btc;
  base58.base58flickr = base58flickr;
  return base58;
}
var base64 = {};
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64) return base64;
  hasRequiredBase64 = 1;
  Object.defineProperty(base64, "__esModule", { value: true });
  var base3 = requireBase();
  const base64$1 = base3.rfc4648({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
  });
  const base64pad = base3.rfc4648({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
  });
  const base64url = base3.rfc4648({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
  });
  const base64urlpad = base3.rfc4648({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
  });
  base64.base64 = base64$1;
  base64.base64pad = base64pad;
  base64.base64url = base64url;
  base64.base64urlpad = base64urlpad;
  return base64;
}
var base256emoji = {};
var hasRequiredBase256emoji;
function requireBase256emoji() {
  if (hasRequiredBase256emoji) return base256emoji;
  hasRequiredBase256emoji = 1;
  Object.defineProperty(base256emoji, "__esModule", { value: true });
  var base3 = requireBase();
  const alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
  const alphabetBytesToChars = alphabet.reduce((p, c, i) => {
    p[i] = c;
    return p;
  }, []);
  const alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
    p[c.codePointAt(0)] = i;
    return p;
  }, []);
  function encode(data) {
    return data.reduce((p, c) => {
      p += alphabetBytesToChars[c];
      return p;
    }, "");
  }
  function decode(str) {
    const byts = [];
    for (const char of str) {
      const byt = alphabetCharsToBytes[char.codePointAt(0)];
      if (byt === void 0) {
        throw new Error(`Non-base256emoji character: ${char}`);
      }
      byts.push(byt);
    }
    return new Uint8Array(byts);
  }
  const base256emoji$1 = base3.from({
    prefix: "🚀",
    name: "base256emoji",
    encode,
    decode
  });
  base256emoji.base256emoji = base256emoji$1;
  return base256emoji;
}
var sha2 = {};
var hasher = {};
var digest = {};
var varint = {};
var varint_1;
var hasRequiredVarint$1;
function requireVarint$1() {
  if (hasRequiredVarint$1) return varint_1;
  hasRequiredVarint$1 = 1;
  var encode_1 = encode;
  var MSB = 128, MSBALL = -128, INT = Math.pow(2, 31);
  function encode(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
      out[offset++] = num & 255 | MSB;
      num /= 128;
    }
    while (num & MSBALL) {
      out[offset++] = num & 255 | MSB;
      num >>>= 7;
    }
    out[offset] = num | 0;
    encode.bytes = offset - oldOffset + 1;
    return out;
  }
  var decode = read;
  var MSB$1 = 128, REST$1 = 127;
  function read(buf, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
    do {
      if (counter >= l) {
        read.bytes = 0;
        throw new RangeError("Could not decode varint");
      }
      b = buf[counter++];
      res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
      shift += 7;
    } while (b >= MSB$1);
    read.bytes = counter - offset;
    return res;
  }
  var N1 = Math.pow(2, 7);
  var N2 = Math.pow(2, 14);
  var N3 = Math.pow(2, 21);
  var N4 = Math.pow(2, 28);
  var N5 = Math.pow(2, 35);
  var N6 = Math.pow(2, 42);
  var N7 = Math.pow(2, 49);
  var N8 = Math.pow(2, 56);
  var N9 = Math.pow(2, 63);
  var length = function(value) {
    return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
  };
  var varint2 = {
    encode: encode_1,
    decode,
    encodingLength: length
  };
  var _brrp_varint = varint2;
  var varint$1 = _brrp_varint;
  varint_1 = varint$1;
  return varint_1;
}
var hasRequiredVarint;
function requireVarint() {
  if (hasRequiredVarint) return varint;
  hasRequiredVarint = 1;
  Object.defineProperty(varint, "__esModule", { value: true });
  var varint$1 = requireVarint$1();
  const decode = (data, offset = 0) => {
    const code = varint$1.decode(data, offset);
    return [
      code,
      varint$1.decode.bytes
    ];
  };
  const encodeTo = (int, target, offset = 0) => {
    varint$1.encode(int, target, offset);
    return target;
  };
  const encodingLength = (int) => {
    return varint$1.encodingLength(int);
  };
  varint.decode = decode;
  varint.encodeTo = encodeTo;
  varint.encodingLength = encodingLength;
  return varint;
}
var hasRequiredDigest;
function requireDigest() {
  if (hasRequiredDigest) return digest;
  hasRequiredDigest = 1;
  Object.defineProperty(digest, "__esModule", { value: true });
  var bytes2 = requireBytes();
  var varint2 = requireVarint();
  const create = (code, digest2) => {
    const size = digest2.byteLength;
    const sizeOffset = varint2.encodingLength(code);
    const digestOffset = sizeOffset + varint2.encodingLength(size);
    const bytes3 = new Uint8Array(digestOffset + size);
    varint2.encodeTo(code, bytes3, 0);
    varint2.encodeTo(size, bytes3, sizeOffset);
    bytes3.set(digest2, digestOffset);
    return new Digest(code, size, digest2, bytes3);
  };
  const decode = (multihash) => {
    const bytes$1 = bytes2.coerce(multihash);
    const [code, sizeOffset] = varint2.decode(bytes$1);
    const [size, digestOffset] = varint2.decode(bytes$1.subarray(sizeOffset));
    const digest2 = bytes$1.subarray(sizeOffset + digestOffset);
    if (digest2.byteLength !== size) {
      throw new Error("Incorrect length");
    }
    return new Digest(code, size, digest2, bytes$1);
  };
  const equals = (a, b) => {
    if (a === b) {
      return true;
    } else {
      return a.code === b.code && a.size === b.size && bytes2.equals(a.bytes, b.bytes);
    }
  };
  class Digest {
    constructor(code, size, digest2, bytes3) {
      this.code = code;
      this.size = size;
      this.digest = digest2;
      this.bytes = bytes3;
    }
  }
  digest.Digest = Digest;
  digest.create = create;
  digest.decode = decode;
  digest.equals = equals;
  return digest;
}
var hasRequiredHasher;
function requireHasher() {
  if (hasRequiredHasher) return hasher;
  hasRequiredHasher = 1;
  Object.defineProperty(hasher, "__esModule", { value: true });
  var digest2 = requireDigest();
  const from = ({ name, code, encode }) => new Hasher(name, code, encode);
  class Hasher {
    constructor(name, code, encode) {
      this.name = name;
      this.code = code;
      this.encode = encode;
    }
    digest(input) {
      if (input instanceof Uint8Array) {
        const result = this.encode(input);
        return result instanceof Uint8Array ? digest2.create(this.code, result) : result.then((digest$1) => digest2.create(this.code, digest$1));
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  }
  hasher.Hasher = Hasher;
  hasher.from = from;
  return hasher;
}
var hasRequiredSha2;
function requireSha2() {
  if (hasRequiredSha2) return sha2;
  hasRequiredSha2 = 1;
  Object.defineProperty(sha2, "__esModule", { value: true });
  var crypto = require$$1;
  var hasher2 = requireHasher();
  var bytes2 = requireBytes();
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var crypto__default = /* @__PURE__ */ _interopDefaultLegacy(crypto);
  const sha256 = hasher2.from({
    name: "sha2-256",
    code: 18,
    encode: (input) => bytes2.coerce(crypto__default["default"].createHash("sha256").update(input).digest())
  });
  const sha512 = hasher2.from({
    name: "sha2-512",
    code: 19,
    encode: (input) => bytes2.coerce(crypto__default["default"].createHash("sha512").update(input).digest())
  });
  sha2.sha256 = sha256;
  sha2.sha512 = sha512;
  return sha2;
}
var identity = {};
var hasRequiredIdentity;
function requireIdentity() {
  if (hasRequiredIdentity) return identity;
  hasRequiredIdentity = 1;
  Object.defineProperty(identity, "__esModule", { value: true });
  var bytes2 = requireBytes();
  var digest$1 = requireDigest();
  const code = 0;
  const name = "identity";
  const encode = bytes2.coerce;
  const digest2 = (input) => digest$1.create(code, encode(input));
  const identity$12 = {
    code,
    name,
    encode,
    digest: digest2
  };
  identity.identity = identity$12;
  return identity;
}
var raw = {};
var hasRequiredRaw;
function requireRaw() {
  if (hasRequiredRaw) return raw;
  hasRequiredRaw = 1;
  Object.defineProperty(raw, "__esModule", { value: true });
  var bytes2 = requireBytes();
  const name = "raw";
  const code = 85;
  const encode = (node) => bytes2.coerce(node);
  const decode = (data) => bytes2.coerce(data);
  raw.code = code;
  raw.decode = decode;
  raw.encode = encode;
  raw.name = name;
  return raw;
}
var json = {};
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json;
  hasRequiredJson = 1;
  Object.defineProperty(json, "__esModule", { value: true });
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  const name = "json";
  const code = 512;
  const encode = (node) => textEncoder.encode(JSON.stringify(node));
  const decode = (data) => JSON.parse(textDecoder.decode(data));
  json.code = code;
  json.decode = decode;
  json.encode = encode;
  json.name = name;
  return json;
}
var src = {};
var cid = {};
var hasRequiredCid;
function requireCid() {
  if (hasRequiredCid) return cid;
  hasRequiredCid = 1;
  Object.defineProperty(cid, "__esModule", { value: true });
  var varint2 = requireVarint();
  var digest2 = requireDigest();
  var base582 = requireBase58();
  var base322 = requireBase32();
  var bytes2 = requireBytes();
  class CID {
    constructor(version2, code, multihash, bytes3) {
      this.code = code;
      this.version = version2;
      this.multihash = multihash;
      this.bytes = bytes3;
      this.byteOffset = bytes3.byteOffset;
      this.byteLength = bytes3.byteLength;
      this.asCID = this;
      this._baseCache = /* @__PURE__ */ new Map();
      Object.defineProperties(this, {
        byteOffset: hidden,
        byteLength: hidden,
        code: readonly,
        version: readonly,
        multihash: readonly,
        bytes: readonly,
        _baseCache: hidden,
        asCID: hidden
      });
    }
    toV0() {
      switch (this.version) {
        case 0: {
          return this;
        }
        default: {
          const { code, multihash } = this;
          if (code !== DAG_PB_CODE) {
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          }
          if (multihash.code !== SHA_256_CODE) {
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          }
          return CID.createV0(multihash);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          const { code, digest: digest$1 } = this.multihash;
          const multihash = digest2.create(code, digest$1);
          return CID.createV1(this.code, multihash);
        }
        case 1: {
          return this;
        }
        default: {
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
        }
      }
    }
    equals(other) {
      return other && this.code === other.code && this.version === other.version && digest2.equals(this.multihash, other.multihash);
    }
    toString(base3) {
      const { bytes: bytes3, version: version2, _baseCache } = this;
      switch (version2) {
        case 0:
          return toStringV0(bytes3, _baseCache, base3 || base582.base58btc.encoder);
        default:
          return toStringV1(bytes3, _baseCache, base3 || base322.base32.encoder);
      }
    }
    toJSON() {
      return {
        code: this.code,
        version: this.version,
        hash: this.multihash.bytes
      };
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")";
    }
    static isCID(value) {
      deprecate(/^0\.0/, IS_CID_DEPRECATION);
      return !!(value && (value[cidSymbol] || value.asCID === value));
    }
    get toBaseEncodedString() {
      throw new Error("Deprecated, use .toString()");
    }
    get codec() {
      throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
      throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
      throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
      throw new Error('"prefix" property is deprecated');
    }
    static asCID(value) {
      if (value instanceof CID) {
        return value;
      } else if (value != null && value.asCID === value) {
        const { version: version2, code, multihash, bytes: bytes3 } = value;
        return new CID(version2, code, multihash, bytes3 || encodeCID(version2, code, multihash.bytes));
      } else if (value != null && value[cidSymbol] === true) {
        const { version: version2, multihash, code } = value;
        const digest$1 = digest2.decode(multihash);
        return CID.create(version2, code, digest$1);
      } else {
        return null;
      }
    }
    static create(version2, code, digest3) {
      if (typeof code !== "number") {
        throw new Error("String codecs are no longer supported");
      }
      switch (version2) {
        case 0: {
          if (code !== DAG_PB_CODE) {
            throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
          } else {
            return new CID(version2, code, digest3, digest3.bytes);
          }
        }
        case 1: {
          const bytes3 = encodeCID(version2, code, digest3.bytes);
          return new CID(version2, code, digest3, bytes3);
        }
        default: {
          throw new Error("Invalid version");
        }
      }
    }
    static createV0(digest3) {
      return CID.create(0, DAG_PB_CODE, digest3);
    }
    static createV1(code, digest3) {
      return CID.create(1, code, digest3);
    }
    static decode(bytes3) {
      const [cid2, remainder] = CID.decodeFirst(bytes3);
      if (remainder.length) {
        throw new Error("Incorrect length");
      }
      return cid2;
    }
    static decodeFirst(bytes$1) {
      const specs = CID.inspectBytes(bytes$1);
      const prefixSize = specs.size - specs.multihashSize;
      const multihashBytes = bytes2.coerce(bytes$1.subarray(prefixSize, prefixSize + specs.multihashSize));
      if (multihashBytes.byteLength !== specs.multihashSize) {
        throw new Error("Incorrect length");
      }
      const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
      const digest$1 = new digest2.Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
      const cid2 = specs.version === 0 ? CID.createV0(digest$1) : CID.createV1(specs.codec, digest$1);
      return [
        cid2,
        bytes$1.subarray(specs.size)
      ];
    }
    static inspectBytes(initialBytes) {
      let offset = 0;
      const next = () => {
        const [i, length] = varint2.decode(initialBytes.subarray(offset));
        offset += length;
        return i;
      };
      let version2 = next();
      let codec = DAG_PB_CODE;
      if (version2 === 18) {
        version2 = 0;
        offset = 0;
      } else if (version2 === 1) {
        codec = next();
      }
      if (version2 !== 0 && version2 !== 1) {
        throw new RangeError(`Invalid CID version ${version2}`);
      }
      const prefixSize = offset;
      const multihashCode = next();
      const digestSize = next();
      const size = offset + digestSize;
      const multihashSize = size - prefixSize;
      return {
        version: version2,
        codec,
        multihashCode,
        digestSize,
        multihashSize,
        size
      };
    }
    static parse(source, base3) {
      const [prefix, bytes3] = parseCIDtoBytes(source, base3);
      const cid2 = CID.decode(bytes3);
      cid2._baseCache.set(prefix, source);
      return cid2;
    }
  }
  const parseCIDtoBytes = (source, base3) => {
    switch (source[0]) {
      case "Q": {
        const decoder = base3 || base582.base58btc;
        return [
          base582.base58btc.prefix,
          decoder.decode(`${base582.base58btc.prefix}${source}`)
        ];
      }
      case base582.base58btc.prefix: {
        const decoder = base3 || base582.base58btc;
        return [
          base582.base58btc.prefix,
          decoder.decode(source)
        ];
      }
      case base322.base32.prefix: {
        const decoder = base3 || base322.base32;
        return [
          base322.base32.prefix,
          decoder.decode(source)
        ];
      }
      default: {
        if (base3 == null) {
          throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
        }
        return [
          source[0],
          base3.decode(source)
        ];
      }
    }
  };
  const toStringV0 = (bytes3, cache, base3) => {
    const { prefix } = base3;
    if (prefix !== base582.base58btc.prefix) {
      throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
    }
    const cid2 = cache.get(prefix);
    if (cid2 == null) {
      const cid3 = base3.encode(bytes3).slice(1);
      cache.set(prefix, cid3);
      return cid3;
    } else {
      return cid2;
    }
  };
  const toStringV1 = (bytes3, cache, base3) => {
    const { prefix } = base3;
    const cid2 = cache.get(prefix);
    if (cid2 == null) {
      const cid3 = base3.encode(bytes3);
      cache.set(prefix, cid3);
      return cid3;
    } else {
      return cid2;
    }
  };
  const DAG_PB_CODE = 112;
  const SHA_256_CODE = 18;
  const encodeCID = (version2, code, multihash) => {
    const codeOffset = varint2.encodingLength(version2);
    const hashOffset = codeOffset + varint2.encodingLength(code);
    const bytes3 = new Uint8Array(hashOffset + multihash.byteLength);
    varint2.encodeTo(version2, bytes3, 0);
    varint2.encodeTo(code, bytes3, codeOffset);
    bytes3.set(multihash, hashOffset);
    return bytes3;
  };
  const cidSymbol = /* @__PURE__ */ Symbol.for("@ipld/js-cid/CID");
  const readonly = {
    writable: false,
    configurable: false,
    enumerable: true
  };
  const hidden = {
    writable: false,
    enumerable: false,
    configurable: false
  };
  const version = "0.0.0-dev";
  const deprecate = (range, message) => {
    if (range.test(version)) {
      console.warn(message);
    } else {
      throw new Error(message);
    }
  };
  const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
  cid.CID = CID;
  return cid;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  Object.defineProperty(src, "__esModule", { value: true });
  var cid2 = requireCid();
  var varint2 = requireVarint();
  var bytes2 = requireBytes();
  var hasher2 = requireHasher();
  var digest2 = requireDigest();
  src.CID = cid2.CID;
  src.varint = varint2;
  src.bytes = bytes2;
  src.hasher = hasher2;
  src.digest = digest2;
  return src;
}
var hasRequiredBasics;
function requireBasics() {
  if (hasRequiredBasics) return basics;
  hasRequiredBasics = 1;
  Object.defineProperty(basics, "__esModule", { value: true });
  var identity2 = requireIdentity$1();
  var base22 = requireBase2();
  var base82 = requireBase8();
  var base102 = requireBase10();
  var base162 = requireBase16();
  var base322 = requireBase32();
  var base362 = requireBase36();
  var base582 = requireBase58();
  var base642 = requireBase64();
  var base256emoji2 = requireBase256emoji();
  var sha22 = requireSha2();
  var identity$12 = requireIdentity();
  var raw2 = requireRaw();
  var json2 = requireJson();
  requireSrc();
  var cid2 = requireCid();
  var hasher2 = requireHasher();
  var digest2 = requireDigest();
  var varint2 = requireVarint();
  var bytes2 = requireBytes();
  const bases = {
    ...identity2,
    ...base22,
    ...base82,
    ...base102,
    ...base162,
    ...base322,
    ...base362,
    ...base582,
    ...base642,
    ...base256emoji2
  };
  const hashes = {
    ...sha22,
    ...identity$12
  };
  const codecs = {
    raw: raw2,
    json: json2
  };
  basics.CID = cid2.CID;
  basics.hasher = hasher2;
  basics.digest = digest2;
  basics.varint = varint2;
  basics.bytes = bytes2;
  basics.bases = bases;
  basics.codecs = codecs;
  basics.hashes = hashes;
  return basics;
}
export {
  requireBasics as r
};
