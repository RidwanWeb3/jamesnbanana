const version = "0.1.1";
function getVersion() {
  return version;
}
class BaseError extends Error {
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
    return walk(this, fn);
  }
}
Object.defineProperty(BaseError, "defaultStaticOptions", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: {
    docsOrigin: "https://oxlib.sh",
    showVersion: false,
    version: `ox@${getVersion()}`
  }
});
(() => {
  BaseError.setStaticOptions(BaseError.defaultStaticOptions);
})();
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn);
  return fn ? null : err;
}
function pad(hex_, options = {}) {
  const { dir, size = 32 } = options;
  if (size === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size * 2, "0")}`;
}
function fromNumber(value, options = {}) {
  const { signed, size } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size) {
    if (signed)
      maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? BigInt.asUintN(size * 8, BigInt(value_)) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size)
    return padLeft(hex, size);
  return hex;
}
function padLeft(value, size) {
  return pad(value, { dir: "left", size });
}
class IntegerOutOfRangeError extends BaseError {
  constructor({ max, min, signed, size, value }) {
    super(`Number \`${value}\` is not in safe${size ? ` ${size * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
}
class SizeExceedsPaddingSizeError extends BaseError {
  constructor({ size, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
}
function toRpc$1(withdrawal) {
  return {
    address: withdrawal.address,
    amount: fromNumber(withdrawal.amount),
    index: fromNumber(withdrawal.index),
    validatorIndex: fromNumber(withdrawal.validatorIndex)
  };
}
function toRpc(blockOverrides) {
  return {
    ...typeof blockOverrides.baseFeePerGas === "bigint" && {
      baseFeePerGas: fromNumber(blockOverrides.baseFeePerGas)
    },
    ...typeof blockOverrides.blobBaseFee === "bigint" && {
      blobBaseFee: fromNumber(blockOverrides.blobBaseFee)
    },
    ...typeof blockOverrides.feeRecipient === "string" && {
      feeRecipient: blockOverrides.feeRecipient
    },
    ...typeof blockOverrides.gasLimit === "bigint" && {
      gasLimit: fromNumber(blockOverrides.gasLimit)
    },
    ...typeof blockOverrides.number === "bigint" && {
      number: fromNumber(blockOverrides.number)
    },
    ...typeof blockOverrides.prevRandao === "bigint" && {
      prevRandao: fromNumber(blockOverrides.prevRandao)
    },
    ...typeof blockOverrides.time === "bigint" && {
      time: fromNumber(blockOverrides.time)
    },
    ...blockOverrides.withdrawals && {
      withdrawals: blockOverrides.withdrawals.map(toRpc$1)
    }
  };
}
export {
  toRpc as t
};
