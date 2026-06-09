import { a as createEncoder, i as isFixedSize, j as getEncodedSize, c as createDecoder, k as transformDecoder, l as containsBytes } from "./solana__codecs-core.mjs";
import { g as getU32Encoder, a as getU8Decoder } from "./solana__codecs-numbers.mjs";
import { S as SolanaError, t as SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS, u as SOLANA_ERROR__CODECS__INVALID_CONSTANT, v as SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS, w as SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE, x as SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE } from "./solana__errors.mjs";
function assertValidNumberOfItemsForCodec(codecDescription, expected, actual) {
  if (expected !== actual) {
    throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS, {
      actual,
      codecDescription,
      expected
    });
  }
}
function maxCodecSizes(sizes) {
  return sizes.reduce(
    (all, size) => all === null || size === null ? null : Math.max(all, size),
    0
  );
}
function sumCodecSizes(sizes) {
  return sizes.reduce((all, size) => all === null || size === null ? null : all + size, 0);
}
function getFixedSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : null;
}
function getMaxSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : codec.maxSize ?? null;
}
function getArrayEncoder(item, config = {}) {
  const size = config.size ?? getU32Encoder();
  const fixedSize = computeArrayLikeCodecSize(size, getFixedSize(item));
  const maxSize = computeArrayLikeCodecSize(size, getMaxSize(item)) ?? void 0;
  return createEncoder({
    ...fixedSize !== null ? { fixedSize } : {
      getSizeFromValue: (array) => {
        const prefixSize = typeof size === "object" ? getEncodedSize(array.length, size) : 0;
        return prefixSize + [...array].reduce((all, value) => all + getEncodedSize(value, item), 0);
      },
      maxSize
    },
    write: (array, bytes, offset) => {
      if (typeof size === "number") {
        assertValidNumberOfItemsForCodec("array", size, array.length);
      }
      if (typeof size === "object") {
        offset = size.write(array.length, bytes, offset);
      }
      array.forEach((value) => {
        offset = item.write(value, bytes, offset);
      });
      return offset;
    }
  });
}
function computeArrayLikeCodecSize(size, itemSize) {
  if (typeof size !== "number") return null;
  if (size === 0) return 0;
  return itemSize === null ? null : itemSize * size;
}
function getBooleanDecoder(config = {}) {
  return transformDecoder(config.size ?? getU8Decoder(), (value) => Number(value) === 1);
}
function getBytesEncoder() {
  return createEncoder({
    getSizeFromValue: (value) => value.length,
    write: (value, bytes, offset) => {
      bytes.set(value, offset);
      return offset + value.length;
    }
  });
}
var getBase16Decoder = () => createDecoder({
  read(bytes, offset) {
    const value = bytes.slice(offset).reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    return [value, bytes.length];
  }
});
function getConstantEncoder(constant) {
  return createEncoder({
    fixedSize: constant.length,
    write: (_, bytes, offset) => {
      bytes.set(constant, offset);
      return offset + constant.length;
    }
  });
}
function getConstantDecoder(constant) {
  return createDecoder({
    fixedSize: constant.length,
    read: (bytes, offset) => {
      const base16 = getBase16Decoder();
      if (!containsBytes(bytes, constant, offset)) {
        throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_CONSTANT, {
          constant,
          data: bytes,
          hexConstant: base16.decode(constant),
          hexData: base16.decode(bytes),
          offset
        });
      }
      return [void 0, offset + constant.length];
    }
  });
}
function getTupleDecoder(items) {
  const fixedSize = sumCodecSizes(items.map(getFixedSize));
  const maxSize = sumCodecSizes(items.map(getMaxSize)) ?? void 0;
  return createDecoder({
    ...fixedSize === null ? { maxSize } : { fixedSize },
    read: (bytes, offset) => {
      const values = [];
      items.forEach((item) => {
        const [newValue, newOffset] = item.read(bytes, offset);
        values.push(newValue);
        offset = newOffset;
      });
      return [values, offset];
    }
  });
}
function getUnionEncoder(variants, getIndexFromValue) {
  const fixedSize = getUnionFixedSize(variants);
  const write = (variant, bytes, offset) => {
    const index = getIndexFromValue(variant);
    assertValidVariantIndex(variants, index);
    return variants[index].write(variant, bytes, offset);
  };
  if (fixedSize !== null) {
    return createEncoder({ fixedSize, write });
  }
  const maxSize = getUnionMaxSize(variants);
  return createEncoder({
    ...maxSize !== null ? { maxSize } : {},
    getSizeFromValue: (variant) => {
      const index = getIndexFromValue(variant);
      assertValidVariantIndex(variants, index);
      return getEncodedSize(variant, variants[index]);
    },
    write
  });
}
function getUnionDecoder(variants, getIndexFromBytes) {
  const fixedSize = getUnionFixedSize(variants);
  const read = (bytes, offset) => {
    const index = getIndexFromBytes(bytes, offset);
    assertValidVariantIndex(variants, index);
    return variants[index].read(bytes, offset);
  };
  if (fixedSize !== null) {
    return createDecoder({ fixedSize, read });
  }
  const maxSize = getUnionMaxSize(variants);
  return createDecoder({ ...maxSize !== null ? { maxSize } : {}, read });
}
function assertValidVariantIndex(variants, index) {
  if (typeof variants[index] === "undefined") {
    throw new SolanaError(SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE, {
      maxRange: variants.length - 1,
      minRange: 0,
      variant: index
    });
  }
}
function getUnionFixedSize(variants) {
  if (variants.length === 0) return 0;
  if (!isFixedSize(variants[0])) return null;
  const variantSize = variants[0].fixedSize;
  const sameSizedVariants = variants.every((variant) => isFixedSize(variant) && variant.fixedSize === variantSize);
  return sameSizedVariants ? variantSize : null;
}
function getUnionMaxSize(variants) {
  return maxCodecSizes(variants.map((variant) => getMaxSize(variant)));
}
function getEnumStats(constructor) {
  const numericalValues = [...new Set(Object.values(constructor).filter((v) => typeof v === "number"))].sort();
  const enumRecord = Object.fromEntries(Object.entries(constructor).slice(numericalValues.length));
  const enumKeys = Object.keys(enumRecord);
  const enumValues = Object.values(enumRecord);
  const stringValues = [
    .../* @__PURE__ */ new Set([...enumKeys, ...enumValues.filter((v) => typeof v === "string")])
  ];
  return { enumKeys, enumRecord, enumValues, numericalValues, stringValues };
}
function getEnumIndexFromDiscriminator({
  discriminator,
  enumKeys,
  enumValues,
  useValuesAsDiscriminators
}) {
  if (!useValuesAsDiscriminators) {
    return discriminator >= 0 && discriminator < enumKeys.length ? discriminator : -1;
  }
  return findLastIndex(enumValues, (value) => value === discriminator);
}
function findLastIndex(array, predicate) {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array)) return l;
  }
  return -1;
}
function formatNumericalValues(values) {
  if (values.length === 0) return "";
  let range = [values[0], values[0]];
  const ranges = [];
  for (let index = 1; index < values.length; index++) {
    const value = values[index];
    if (range[1] + 1 === value) {
      range[1] = value;
    } else {
      ranges.push(range[0] === range[1] ? `${range[0]}` : `${range[0]}-${range[1]}`);
      range = [value, value];
    }
  }
  ranges.push(range[0] === range[1] ? `${range[0]}` : `${range[0]}-${range[1]}`);
  return ranges.join(", ");
}
function getEnumDecoder(constructor, config = {}) {
  const prefix = config.size ?? getU8Decoder();
  const useValuesAsDiscriminators = config.useValuesAsDiscriminators ?? false;
  const { enumKeys, enumValues, numericalValues } = getEnumStats(constructor);
  if (useValuesAsDiscriminators && enumValues.some((value) => typeof value === "string")) {
    throw new SolanaError(SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS, {
      stringValues: enumValues.filter((v) => typeof v === "string")
    });
  }
  return transformDecoder(prefix, (value) => {
    const discriminator = Number(value);
    const index = getEnumIndexFromDiscriminator({
      discriminator,
      enumKeys,
      enumValues,
      useValuesAsDiscriminators
    });
    if (index < 0) {
      const validDiscriminators = useValuesAsDiscriminators ? numericalValues : [...Array(enumKeys.length).keys()];
      throw new SolanaError(SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE, {
        discriminator,
        formattedValidDiscriminators: formatNumericalValues(validDiscriminators),
        validDiscriminators
      });
    }
    return enumValues[index];
  });
}
function getUnitDecoder() {
  return createDecoder({
    fixedSize: 0,
    read: (_bytes, offset) => [void 0, offset]
  });
}
function getStructEncoder(fields) {
  const fieldCodecs = fields.map(([, codec]) => codec);
  const fixedSize = sumCodecSizes(fieldCodecs.map(getFixedSize));
  const maxSize = sumCodecSizes(fieldCodecs.map(getMaxSize)) ?? void 0;
  return createEncoder({
    ...fixedSize === null ? {
      getSizeFromValue: (value) => fields.map(([key, codec]) => getEncodedSize(value[key], codec)).reduce((all, one) => all + one, 0),
      maxSize
    } : { fixedSize },
    write: (struct, bytes, offset) => {
      fields.forEach(([key, codec]) => {
        offset = codec.write(struct[key], bytes, offset);
      });
      return offset;
    }
  });
}
function getStructDecoder(fields) {
  const fieldCodecs = fields.map(([, codec]) => codec);
  const fixedSize = sumCodecSizes(fieldCodecs.map(getFixedSize));
  const maxSize = sumCodecSizes(fieldCodecs.map(getMaxSize)) ?? void 0;
  return createDecoder({
    ...fixedSize === null ? { maxSize } : { fixedSize },
    read: (bytes, offset) => {
      const struct = {};
      fields.forEach(([key, codec]) => {
        const [value, newOffset] = codec.read(bytes, offset);
        offset = newOffset;
        struct[key] = value;
      });
      return [struct, offset];
    }
  });
}
export {
  getBooleanDecoder as a,
  getConstantDecoder as b,
  getUnionDecoder as c,
  getTupleDecoder as d,
  getStructEncoder as e,
  getUnionEncoder as f,
  getUnitDecoder as g,
  getConstantEncoder as h,
  getArrayEncoder as i,
  getBytesEncoder as j,
  getStructDecoder as k,
  getEnumDecoder as l
};
