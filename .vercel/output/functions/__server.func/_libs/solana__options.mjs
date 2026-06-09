import { k as transformDecoder, m as assertIsFixedSize, e as fixDecoderSize, l as containsBytes } from "./solana__codecs-core.mjs";
import { g as getUnitDecoder, a as getBooleanDecoder, b as getConstantDecoder, c as getUnionDecoder, d as getTupleDecoder } from "./solana__codecs-data-structures.mjs";
import { a as getU8Decoder } from "./solana__codecs-numbers.mjs";
var some = (value) => ({ __option: "Some", value });
var none = () => ({ __option: "None" });
function getOptionDecoder(item, config = {}) {
  const prefix = (() => {
    if (config.prefix === null) {
      return transformDecoder(getUnitDecoder(), () => false);
    }
    return getBooleanDecoder({ size: config.prefix ?? getU8Decoder() });
  })();
  const noneValue = (() => {
    if (config.noneValue === "zeroes") {
      assertIsFixedSize(item);
      return fixDecoderSize(getUnitDecoder(), item.fixedSize);
    }
    if (!config.noneValue) {
      return getUnitDecoder();
    }
    return getConstantDecoder(config.noneValue);
  })();
  return getUnionDecoder(
    [
      transformDecoder(getTupleDecoder([prefix, noneValue]), () => none()),
      transformDecoder(getTupleDecoder([prefix, item]), ([, value]) => some(value))
    ],
    (bytes, offset) => {
      if (config.prefix === null && !config.noneValue) {
        return Number(offset < bytes.length);
      }
      if (config.prefix === null && config.noneValue != null) {
        const zeroValue = config.noneValue === "zeroes" ? new Uint8Array(noneValue.fixedSize).fill(0) : config.noneValue;
        return containsBytes(bytes, zeroValue, offset) ? 0 : 1;
      }
      return Number(prefix.read(bytes, offset)[0]);
    }
  );
}
export {
  getOptionDecoder as g
};
