import { s as stringType, Z as ZodIssueCode, a as arrayType, u as unionType, p as preprocessType, i as intersectionType, o as objectType, b as booleanType, n as numberType, d as discriminatedUnionType, l as literalType, t as tupleType, c as lazyType, r as recordType, N as NEVER } from "./zod.mjs";
const version$2 = "1.2.3";
class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
    const docsPath = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsPath ? [`Docs: https://abitype.dev${docsPath}`] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: abitype@${version$2}`
    ].join("\n");
    super(message);
    Object.defineProperty(this, "details", {
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
    Object.defineProperty(this, "metaMessages", {
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
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiTypeError"
    });
    if (args.cause)
      this.cause = args.cause;
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.shortMessage = shortMessage;
  }
}
function execTyped$1(regex2, string) {
  const match = regex2.exec(string);
  return match?.groups;
}
const bytesRegex$1 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex$1 = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
const isTupleRegex = /^\(.+?\).*?$/;
const tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
function formatAbiParameter$2(abiParameter2) {
  let type = abiParameter2.type;
  if (tupleRegex.test(abiParameter2.type) && "components" in abiParameter2) {
    type = "(";
    const length = abiParameter2.components.length;
    for (let i = 0; i < length; i++) {
      const component = abiParameter2.components[i];
      type += formatAbiParameter$2(component);
      if (i < length - 1)
        type += ", ";
    }
    const result = execTyped$1(tupleRegex, abiParameter2.type);
    type += `)${result?.array || ""}`;
    return formatAbiParameter$2({
      ...abiParameter2,
      type
    });
  }
  if ("indexed" in abiParameter2 && abiParameter2.indexed)
    type = `${type} indexed`;
  if (abiParameter2.name)
    return `${type} ${abiParameter2.name}`;
  return type;
}
function formatAbiParameters$2(abiParameters) {
  let params = "";
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter2 = abiParameters[i];
    params += formatAbiParameter$2(abiParameter2);
    if (i !== length - 1)
      params += ", ";
  }
  return params;
}
function formatAbiItem$2(abiItem2) {
  if (abiItem2.type === "function")
    return `function ${abiItem2.name}(${formatAbiParameters$2(abiItem2.inputs)})${abiItem2.stateMutability && abiItem2.stateMutability !== "nonpayable" ? ` ${abiItem2.stateMutability}` : ""}${abiItem2.outputs?.length ? ` returns (${formatAbiParameters$2(abiItem2.outputs)})` : ""}`;
  if (abiItem2.type === "event")
    return `event ${abiItem2.name}(${formatAbiParameters$2(abiItem2.inputs)})`;
  if (abiItem2.type === "error")
    return `error ${abiItem2.name}(${formatAbiParameters$2(abiItem2.inputs)})`;
  if (abiItem2.type === "constructor")
    return `constructor(${formatAbiParameters$2(abiItem2.inputs)})${abiItem2.stateMutability === "payable" ? " payable" : ""}`;
  if (abiItem2.type === "fallback")
    return `fallback() external${abiItem2.stateMutability === "payable" ? " payable" : ""}`;
  return "receive() external payable";
}
const errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function isErrorSignature(signature2) {
  return errorSignatureRegex.test(signature2);
}
function execErrorSignature(signature2) {
  return execTyped$1(errorSignatureRegex, signature2);
}
const eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function isEventSignature(signature2) {
  return eventSignatureRegex.test(signature2);
}
function execEventSignature(signature2) {
  return execTyped$1(eventSignatureRegex, signature2);
}
const functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function isFunctionSignature(signature2) {
  return functionSignatureRegex.test(signature2);
}
function execFunctionSignature(signature2) {
  return execTyped$1(functionSignatureRegex, signature2);
}
const structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function isStructSignature(signature2) {
  return structSignatureRegex.test(signature2);
}
function execStructSignature(signature2) {
  return execTyped$1(structSignatureRegex, signature2);
}
const constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function isConstructorSignature(signature2) {
  return constructorSignatureRegex.test(signature2);
}
function execConstructorSignature(signature2) {
  return execTyped$1(constructorSignatureRegex, signature2);
}
const fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function isFallbackSignature(signature2) {
  return fallbackSignatureRegex.test(signature2);
}
function execFallbackSignature(signature2) {
  return execTyped$1(fallbackSignatureRegex, signature2);
}
const receiveSignatureRegex = /^receive\(\) external payable$/;
function isReceiveSignature(signature2) {
  return receiveSignatureRegex.test(signature2);
}
const modifiers = /* @__PURE__ */ new Set([
  "memory",
  "indexed",
  "storage",
  "calldata"
]);
const eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
const functionModifiers = /* @__PURE__ */ new Set([
  "calldata",
  "memory",
  "storage"
]);
class InvalidAbiItemError extends BaseError {
  constructor({ signature: signature2 }) {
    super("Failed to parse ABI item.", {
      details: `parseAbiItem(${JSON.stringify(signature2, null, 2)})`,
      docsPath: "/api/human#parseabiitem-1"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiItemError"
    });
  }
}
class UnknownTypeError extends BaseError {
  constructor({ type }) {
    super("Unknown type.", {
      metaMessages: [
        `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownTypeError"
    });
  }
}
class UnknownSolidityTypeError extends BaseError {
  constructor({ type }) {
    super("Unknown type.", {
      metaMessages: [`Type "${type}" is not a valid ABI type.`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownSolidityTypeError"
    });
  }
}
class InvalidAbiParametersError extends BaseError {
  constructor({ params }) {
    super("Failed to parse ABI parameters.", {
      details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
      docsPath: "/api/human#parseabiparameters-1"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiParametersError"
    });
  }
}
class InvalidParameterError extends BaseError {
  constructor({ param }) {
    super("Invalid ABI parameter.", {
      details: param
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidParameterError"
    });
  }
}
class SolidityProtectedKeywordError extends BaseError {
  constructor({ param, name }) {
    super("Invalid ABI parameter.", {
      details: param,
      metaMessages: [
        `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SolidityProtectedKeywordError"
    });
  }
}
class InvalidModifierError extends BaseError {
  constructor({ param, type, modifier }) {
    super("Invalid ABI parameter.", {
      details: param,
      metaMessages: [
        `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidModifierError"
    });
  }
}
class InvalidFunctionModifierError extends BaseError {
  constructor({ param, type, modifier }) {
    super("Invalid ABI parameter.", {
      details: param,
      metaMessages: [
        `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
        `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidFunctionModifierError"
    });
  }
}
class InvalidAbiTypeParameterError extends BaseError {
  constructor({ abiParameter: abiParameter2 }) {
    super("Invalid ABI parameter.", {
      details: JSON.stringify(abiParameter2, null, 2),
      metaMessages: ["ABI parameter type is invalid."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiTypeParameterError"
    });
  }
}
class InvalidSignatureError extends BaseError {
  constructor({ signature: signature2, type }) {
    super(`Invalid ${type} signature.`, {
      details: signature2
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSignatureError"
    });
  }
}
class UnknownSignatureError extends BaseError {
  constructor({ signature: signature2 }) {
    super("Unknown signature.", {
      details: signature2
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownSignatureError"
    });
  }
}
class InvalidStructSignatureError extends BaseError {
  constructor({ signature: signature2 }) {
    super("Invalid struct signature.", {
      details: signature2,
      metaMessages: ["No properties exist."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidStructSignatureError"
    });
  }
}
class CircularReferenceError extends BaseError {
  constructor({ type }) {
    super("Circular reference detected.", {
      metaMessages: [`Struct "${type}" is a circular reference.`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "CircularReferenceError"
    });
  }
}
class InvalidParenthesisError extends BaseError {
  constructor({ current, depth }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
      ],
      details: `Depth "${depth}"`
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidParenthesisError"
    });
  }
}
function getParameterCacheKey(param, type, structs2) {
  let structKey = "";
  if (structs2)
    for (const struct2 of Object.entries(structs2)) {
      if (!struct2)
        continue;
      let propertyKey = "";
      for (const property of struct2[1]) {
        propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
      }
      structKey += `(${struct2[0]}{${propertyKey}})`;
    }
  if (type)
    return `${type}:${param}${structKey}`;
  return `${param}${structKey}`;
}
const parameterCache = /* @__PURE__ */ new Map([
  // Unnamed
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  // Named
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  // Indexed
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: true }
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: true }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: true }
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: true }
  ]
]);
function parseSignature(signature2, structs2 = {}) {
  if (isFunctionSignature(signature2))
    return parseFunctionSignature(signature2, structs2);
  if (isEventSignature(signature2))
    return parseEventSignature(signature2, structs2);
  if (isErrorSignature(signature2))
    return parseErrorSignature(signature2, structs2);
  if (isConstructorSignature(signature2))
    return parseConstructorSignature(signature2, structs2);
  if (isFallbackSignature(signature2))
    return parseFallbackSignature(signature2);
  if (isReceiveSignature(signature2))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new UnknownSignatureError({ signature: signature2 });
}
function parseFunctionSignature(signature2, structs2 = {}) {
  const match = execFunctionSignature(signature2);
  if (!match)
    throw new InvalidSignatureError({ signature: signature2, type: "function" });
  const inputParams = splitParameters$2(match.parameters);
  const inputs = [];
  const inputLength = inputParams.length;
  for (let i = 0; i < inputLength; i++) {
    inputs.push(parseAbiParameter$2(inputParams[i], {
      modifiers: functionModifiers,
      structs: structs2,
      type: "function"
    }));
  }
  const outputs = [];
  if (match.returns) {
    const outputParams = splitParameters$2(match.returns);
    const outputLength = outputParams.length;
    for (let i = 0; i < outputLength; i++) {
      outputs.push(parseAbiParameter$2(outputParams[i], {
        modifiers: functionModifiers,
        structs: structs2,
        type: "function"
      }));
    }
  }
  return {
    name: match.name,
    type: "function",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs,
    outputs
  };
}
function parseEventSignature(signature2, structs2 = {}) {
  const match = execEventSignature(signature2);
  if (!match)
    throw new InvalidSignatureError({ signature: signature2, type: "event" });
  const params = splitParameters$2(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter$2(params[i], {
      modifiers: eventModifiers,
      structs: structs2,
      type: "event"
    }));
  return { name: match.name, type: "event", inputs: abiParameters };
}
function parseErrorSignature(signature2, structs2 = {}) {
  const match = execErrorSignature(signature2);
  if (!match)
    throw new InvalidSignatureError({ signature: signature2, type: "error" });
  const params = splitParameters$2(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter$2(params[i], { structs: structs2, type: "error" }));
  return { name: match.name, type: "error", inputs: abiParameters };
}
function parseConstructorSignature(signature2, structs2 = {}) {
  const match = execConstructorSignature(signature2);
  if (!match)
    throw new InvalidSignatureError({ signature: signature2, type: "constructor" });
  const params = splitParameters$2(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter$2(params[i], { structs: structs2, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs: abiParameters
  };
}
function parseFallbackSignature(signature2) {
  const match = execFallbackSignature(signature2);
  if (!match)
    throw new InvalidSignatureError({ signature: signature2, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: match.stateMutability ?? "nonpayable"
  };
}
const abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
const abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
const dynamicIntegerRegex = /^u?int$/;
function parseAbiParameter$2(param, options) {
  const parameterCacheKey = getParameterCacheKey(param, options?.type, options?.structs);
  if (parameterCache.has(parameterCacheKey))
    return parameterCache.get(parameterCacheKey);
  const isTuple = isTupleRegex.test(param);
  const match = execTyped$1(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
  if (!match)
    throw new InvalidParameterError({ param });
  if (match.name && isSolidityKeyword(match.name))
    throw new SolidityProtectedKeywordError({ param, name: match.name });
  const name = match.name ? { name: match.name } : {};
  const indexed = match.modifier === "indexed" ? { indexed: true } : {};
  const structs2 = options?.structs ?? {};
  let type;
  let components = {};
  if (isTuple) {
    type = "tuple";
    const params = splitParameters$2(match.type);
    const components_ = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      components_.push(parseAbiParameter$2(params[i], { structs: structs2 }));
    }
    components = { components: components_ };
  } else if (match.type in structs2) {
    type = "tuple";
    components = { components: structs2[match.type] };
  } else if (dynamicIntegerRegex.test(match.type)) {
    type = `${match.type}256`;
  } else if (match.type === "address payable") {
    type = "address";
  } else {
    type = match.type;
    if (!(options?.type === "struct") && !isSolidityType$1(type))
      throw new UnknownSolidityTypeError({ type });
  }
  if (match.modifier) {
    if (!options?.modifiers?.has?.(match.modifier))
      throw new InvalidModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
    if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
      throw new InvalidFunctionModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
  }
  const abiParameter2 = {
    type: `${type}${match.array ?? ""}`,
    ...name,
    ...indexed,
    ...components
  };
  parameterCache.set(parameterCacheKey, abiParameter2);
  return abiParameter2;
}
function splitParameters$2(params, result = [], current = "", depth = 0) {
  const length = params.trim().length;
  for (let i = 0; i < length; i++) {
    const char = params[i];
    const tail = params.slice(i + 1);
    switch (char) {
      case ",":
        return depth === 0 ? splitParameters$2(tail, [...result, current.trim()]) : splitParameters$2(tail, result, `${current}${char}`, depth);
      case "(":
        return splitParameters$2(tail, result, `${current}${char}`, depth + 1);
      case ")":
        return splitParameters$2(tail, result, `${current}${char}`, depth - 1);
      default:
        return splitParameters$2(tail, result, `${current}${char}`, depth);
    }
  }
  if (current === "")
    return result;
  if (depth !== 0)
    throw new InvalidParenthesisError({ current, depth });
  result.push(current.trim());
  return result;
}
function isSolidityType$1(type) {
  return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex$1.test(type) || integerRegex$1.test(type);
}
const protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function isSolidityKeyword(name) {
  return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex$1.test(name) || integerRegex$1.test(name) || protectedKeywordsRegex.test(name);
}
function isValidDataLocation(type, isArray) {
  return isArray || type === "bytes" || type === "string" || type === "tuple";
}
function parseStructs(signatures2) {
  const shallowStructs = {};
  const signaturesLength = signatures2.length;
  for (let i = 0; i < signaturesLength; i++) {
    const signature2 = signatures2[i];
    if (!isStructSignature(signature2))
      continue;
    const match = execStructSignature(signature2);
    if (!match)
      throw new InvalidSignatureError({ signature: signature2, type: "struct" });
    const properties = match.properties.split(";");
    const components = [];
    const propertiesLength = properties.length;
    for (let k = 0; k < propertiesLength; k++) {
      const property = properties[k];
      const trimmed = property.trim();
      if (!trimmed)
        continue;
      const abiParameter2 = parseAbiParameter$2(trimmed, {
        type: "struct"
      });
      components.push(abiParameter2);
    }
    if (!components.length)
      throw new InvalidStructSignatureError({ signature: signature2 });
    shallowStructs[match.name] = components;
  }
  const resolvedStructs = {};
  const entries = Object.entries(shallowStructs);
  const entriesLength = entries.length;
  for (let i = 0; i < entriesLength; i++) {
    const [name, parameters] = entries[i];
    resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
  }
  return resolvedStructs;
}
const typeWithoutTupleRegex$1 = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function resolveStructs(abiParameters = [], structs2 = {}, ancestors = /* @__PURE__ */ new Set()) {
  const components = [];
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter2 = abiParameters[i];
    const isTuple = isTupleRegex.test(abiParameter2.type);
    if (isTuple)
      components.push(abiParameter2);
    else {
      const match = execTyped$1(typeWithoutTupleRegex$1, abiParameter2.type);
      if (!match?.type)
        throw new InvalidAbiTypeParameterError({ abiParameter: abiParameter2 });
      const { array, type } = match;
      if (type in structs2) {
        if (ancestors.has(type))
          throw new CircularReferenceError({ type });
        components.push({
          ...abiParameter2,
          type: `tuple${array ?? ""}`,
          components: resolveStructs(structs2[type], structs2, /* @__PURE__ */ new Set([...ancestors, type]))
        });
      } else {
        if (isSolidityType$1(type))
          components.push(abiParameter2);
        else
          throw new UnknownTypeError({ type });
      }
    }
  }
  return components;
}
function parseAbi$2(signatures2) {
  const structs2 = parseStructs(signatures2);
  const abi = [];
  const length = signatures2.length;
  for (let i = 0; i < length; i++) {
    const signature2 = signatures2[i];
    if (isStructSignature(signature2))
      continue;
    abi.push(parseSignature(signature2, structs2));
  }
  return abi;
}
function parseAbiItem$2(signature2) {
  let abiItem2;
  if (typeof signature2 === "string")
    abiItem2 = parseSignature(signature2);
  else {
    const structs2 = parseStructs(signature2);
    const length = signature2.length;
    for (let i = 0; i < length; i++) {
      const signature_ = signature2[i];
      if (isStructSignature(signature_))
        continue;
      abiItem2 = parseSignature(signature_, structs2);
      break;
    }
  }
  if (!abiItem2)
    throw new InvalidAbiItemError({ signature: signature2 });
  return abiItem2;
}
function parseAbiParameters$2(params) {
  const abiParameters = [];
  if (typeof params === "string") {
    const parameters = splitParameters$2(params);
    const length = parameters.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(parseAbiParameter$2(parameters[i], { modifiers }));
    }
  } else {
    const structs2 = parseStructs(params);
    const length = params.length;
    for (let i = 0; i < length; i++) {
      const signature2 = params[i];
      if (isStructSignature(signature2))
        continue;
      const parameters = splitParameters$2(signature2);
      const length2 = parameters.length;
      for (let k = 0; k < length2; k++) {
        abiParameters.push(parseAbiParameter$2(parameters[k], { modifiers, structs: structs2 }));
      }
    }
  }
  if (abiParameters.length === 0)
    throw new InvalidAbiParametersError({ params });
  return abiParameters;
}
var exports$2 = {};
var errors$1 = {};
var version$1 = {};
var hasRequiredVersion$1;
function requireVersion$1() {
  if (hasRequiredVersion$1) return version$1;
  hasRequiredVersion$1 = 1;
  Object.defineProperty(version$1, "__esModule", { value: true });
  version$1.version = void 0;
  version$1.version = "1.2.4";
  return version$1;
}
var hasRequiredErrors$1;
function requireErrors$1() {
  if (hasRequiredErrors$1) return errors$1;
  hasRequiredErrors$1 = 1;
  Object.defineProperty(errors$1, "__esModule", { value: true });
  errors$1.BaseError = void 0;
  const version_js_1 = requireVersion$1();
  class BaseError2 extends Error {
    constructor(shortMessage, args = {}) {
      const details = args.cause instanceof BaseError2 ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
      const docsPath = args.cause instanceof BaseError2 ? args.cause.docsPath || args.docsPath : args.docsPath;
      const message = [
        shortMessage || "An error occurred.",
        "",
        ...args.metaMessages ? [...args.metaMessages, ""] : [],
        ...docsPath ? [`Docs: https://abitype.dev${docsPath}`] : [],
        ...details ? [`Details: ${details}`] : [],
        `Version: abitype@${version_js_1.version}`
      ].join("\n");
      super(message);
      Object.defineProperty(this, "details", {
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
      Object.defineProperty(this, "metaMessages", {
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
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiTypeError"
      });
      if (args.cause)
        this.cause = args.cause;
      this.details = details;
      this.docsPath = docsPath;
      this.metaMessages = args.metaMessages;
      this.shortMessage = shortMessage;
    }
  }
  errors$1.BaseError = BaseError2;
  return errors$1;
}
var narrow$1 = {};
var hasRequiredNarrow$1;
function requireNarrow$1() {
  if (hasRequiredNarrow$1) return narrow$1;
  hasRequiredNarrow$1 = 1;
  Object.defineProperty(narrow$1, "__esModule", { value: true });
  narrow$1.narrow = narrow2;
  function narrow2(value) {
    return value;
  }
  return narrow$1;
}
var formatAbi$1 = {};
var formatAbiItem$1 = {};
var formatAbiParameters$1 = {};
var formatAbiParameter$1 = {};
var regex$1 = {};
var hasRequiredRegex$1;
function requireRegex$1() {
  if (hasRequiredRegex$1) return regex$1;
  hasRequiredRegex$1 = 1;
  Object.defineProperty(regex$1, "__esModule", { value: true });
  regex$1.isTupleRegex = regex$1.integerRegex = regex$1.bytesRegex = void 0;
  regex$1.execTyped = execTyped2;
  function execTyped2(regex2, string) {
    const match = regex2.exec(string);
    return match?.groups;
  }
  regex$1.bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
  regex$1.integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  regex$1.isTupleRegex = /^\(.+?\).*?$/;
  return regex$1;
}
var hasRequiredFormatAbiParameter$1;
function requireFormatAbiParameter$1() {
  if (hasRequiredFormatAbiParameter$1) return formatAbiParameter$1;
  hasRequiredFormatAbiParameter$1 = 1;
  Object.defineProperty(formatAbiParameter$1, "__esModule", { value: true });
  formatAbiParameter$1.formatAbiParameter = formatAbiParameter2;
  const regex_js_1 = requireRegex$1();
  const tupleRegex2 = /^tuple(?<array>(\[(\d*)\])*)$/;
  function formatAbiParameter2(abiParameter2) {
    let type = abiParameter2.type;
    if (tupleRegex2.test(abiParameter2.type) && "components" in abiParameter2) {
      type = "(";
      const length = abiParameter2.components.length;
      for (let i = 0; i < length; i++) {
        const component = abiParameter2.components[i];
        type += formatAbiParameter2(component);
        if (i < length - 1)
          type += ", ";
      }
      const result = (0, regex_js_1.execTyped)(tupleRegex2, abiParameter2.type);
      type += `)${result?.array || ""}`;
      return formatAbiParameter2({
        ...abiParameter2,
        type
      });
    }
    if ("indexed" in abiParameter2 && abiParameter2.indexed)
      type = `${type} indexed`;
    if (abiParameter2.name)
      return `${type} ${abiParameter2.name}`;
    return type;
  }
  return formatAbiParameter$1;
}
var hasRequiredFormatAbiParameters$1;
function requireFormatAbiParameters$1() {
  if (hasRequiredFormatAbiParameters$1) return formatAbiParameters$1;
  hasRequiredFormatAbiParameters$1 = 1;
  Object.defineProperty(formatAbiParameters$1, "__esModule", { value: true });
  formatAbiParameters$1.formatAbiParameters = formatAbiParameters2;
  const formatAbiParameter_js_1 = requireFormatAbiParameter$1();
  function formatAbiParameters2(abiParameters) {
    let params = "";
    const length = abiParameters.length;
    for (let i = 0; i < length; i++) {
      const abiParameter2 = abiParameters[i];
      params += (0, formatAbiParameter_js_1.formatAbiParameter)(abiParameter2);
      if (i !== length - 1)
        params += ", ";
    }
    return params;
  }
  return formatAbiParameters$1;
}
var hasRequiredFormatAbiItem$1;
function requireFormatAbiItem$1() {
  if (hasRequiredFormatAbiItem$1) return formatAbiItem$1;
  hasRequiredFormatAbiItem$1 = 1;
  Object.defineProperty(formatAbiItem$1, "__esModule", { value: true });
  formatAbiItem$1.formatAbiItem = formatAbiItem2;
  const formatAbiParameters_js_1 = requireFormatAbiParameters$1();
  function formatAbiItem2(abiItem2) {
    if (abiItem2.type === "function")
      return `function ${abiItem2.name}(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})${abiItem2.stateMutability && abiItem2.stateMutability !== "nonpayable" ? ` ${abiItem2.stateMutability}` : ""}${abiItem2.outputs?.length ? ` returns (${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.outputs)})` : ""}`;
    if (abiItem2.type === "event")
      return `event ${abiItem2.name}(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})`;
    if (abiItem2.type === "error")
      return `error ${abiItem2.name}(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})`;
    if (abiItem2.type === "constructor")
      return `constructor(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})${abiItem2.stateMutability === "payable" ? " payable" : ""}`;
    if (abiItem2.type === "fallback")
      return `fallback() external${abiItem2.stateMutability === "payable" ? " payable" : ""}`;
    return "receive() external payable";
  }
  return formatAbiItem$1;
}
var hasRequiredFormatAbi$1;
function requireFormatAbi$1() {
  if (hasRequiredFormatAbi$1) return formatAbi$1;
  hasRequiredFormatAbi$1 = 1;
  Object.defineProperty(formatAbi$1, "__esModule", { value: true });
  formatAbi$1.formatAbi = formatAbi2;
  const formatAbiItem_js_1 = requireFormatAbiItem$1();
  function formatAbi2(abi) {
    const signatures2 = [];
    const length = abi.length;
    for (let i = 0; i < length; i++) {
      const abiItem2 = abi[i];
      const signature2 = (0, formatAbiItem_js_1.formatAbiItem)(abiItem2);
      signatures2.push(signature2);
    }
    return signatures2;
  }
  return formatAbi$1;
}
var parseAbi$1 = {};
var signatures$1 = {};
var hasRequiredSignatures$1;
function requireSignatures$1() {
  if (hasRequiredSignatures$1) return signatures$1;
  hasRequiredSignatures$1 = 1;
  Object.defineProperty(signatures$1, "__esModule", { value: true });
  signatures$1.functionModifiers = signatures$1.eventModifiers = signatures$1.modifiers = void 0;
  signatures$1.isErrorSignature = isErrorSignature2;
  signatures$1.execErrorSignature = execErrorSignature2;
  signatures$1.isEventSignature = isEventSignature2;
  signatures$1.execEventSignature = execEventSignature2;
  signatures$1.isFunctionSignature = isFunctionSignature2;
  signatures$1.execFunctionSignature = execFunctionSignature2;
  signatures$1.isStructSignature = isStructSignature2;
  signatures$1.execStructSignature = execStructSignature2;
  signatures$1.isConstructorSignature = isConstructorSignature2;
  signatures$1.execConstructorSignature = execConstructorSignature2;
  signatures$1.isFallbackSignature = isFallbackSignature2;
  signatures$1.execFallbackSignature = execFallbackSignature2;
  signatures$1.isReceiveSignature = isReceiveSignature2;
  const regex_js_1 = requireRegex$1();
  const errorSignatureRegex2 = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function isErrorSignature2(signature2) {
    return errorSignatureRegex2.test(signature2);
  }
  function execErrorSignature2(signature2) {
    return (0, regex_js_1.execTyped)(errorSignatureRegex2, signature2);
  }
  const eventSignatureRegex2 = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function isEventSignature2(signature2) {
    return eventSignatureRegex2.test(signature2);
  }
  function execEventSignature2(signature2) {
    return (0, regex_js_1.execTyped)(eventSignatureRegex2, signature2);
  }
  const functionSignatureRegex2 = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
  function isFunctionSignature2(signature2) {
    return functionSignatureRegex2.test(signature2);
  }
  function execFunctionSignature2(signature2) {
    return (0, regex_js_1.execTyped)(functionSignatureRegex2, signature2);
  }
  const structSignatureRegex2 = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
  function isStructSignature2(signature2) {
    return structSignatureRegex2.test(signature2);
  }
  function execStructSignature2(signature2) {
    return (0, regex_js_1.execTyped)(structSignatureRegex2, signature2);
  }
  const constructorSignatureRegex2 = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
  function isConstructorSignature2(signature2) {
    return constructorSignatureRegex2.test(signature2);
  }
  function execConstructorSignature2(signature2) {
    return (0, regex_js_1.execTyped)(constructorSignatureRegex2, signature2);
  }
  const fallbackSignatureRegex2 = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
  function isFallbackSignature2(signature2) {
    return fallbackSignatureRegex2.test(signature2);
  }
  function execFallbackSignature2(signature2) {
    return (0, regex_js_1.execTyped)(fallbackSignatureRegex2, signature2);
  }
  const receiveSignatureRegex2 = /^receive\(\) external payable$/;
  function isReceiveSignature2(signature2) {
    return receiveSignatureRegex2.test(signature2);
  }
  signatures$1.modifiers = /* @__PURE__ */ new Set([
    "memory",
    "indexed",
    "storage",
    "calldata"
  ]);
  signatures$1.eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
  signatures$1.functionModifiers = /* @__PURE__ */ new Set([
    "calldata",
    "memory",
    "storage"
  ]);
  return signatures$1;
}
var structs$1 = {};
var abiItem$1 = {};
var hasRequiredAbiItem$1;
function requireAbiItem$1() {
  if (hasRequiredAbiItem$1) return abiItem$1;
  hasRequiredAbiItem$1 = 1;
  Object.defineProperty(abiItem$1, "__esModule", { value: true });
  abiItem$1.UnknownSolidityTypeError = abiItem$1.UnknownTypeError = abiItem$1.InvalidAbiItemError = void 0;
  const errors_js_1 = requireErrors$1();
  class InvalidAbiItemError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2 }) {
      super("Failed to parse ABI item.", {
        details: `parseAbiItem(${JSON.stringify(signature2, null, 2)})`,
        docsPath: "/api/human#parseabiitem-1"
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiItemError"
      });
    }
  }
  abiItem$1.InvalidAbiItemError = InvalidAbiItemError2;
  class UnknownTypeError2 extends errors_js_1.BaseError {
    constructor({ type }) {
      super("Unknown type.", {
        metaMessages: [
          `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "UnknownTypeError"
      });
    }
  }
  abiItem$1.UnknownTypeError = UnknownTypeError2;
  class UnknownSolidityTypeError2 extends errors_js_1.BaseError {
    constructor({ type }) {
      super("Unknown type.", {
        metaMessages: [`Type "${type}" is not a valid ABI type.`]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "UnknownSolidityTypeError"
      });
    }
  }
  abiItem$1.UnknownSolidityTypeError = UnknownSolidityTypeError2;
  return abiItem$1;
}
var abiParameter$1 = {};
var hasRequiredAbiParameter$1;
function requireAbiParameter$1() {
  if (hasRequiredAbiParameter$1) return abiParameter$1;
  hasRequiredAbiParameter$1 = 1;
  Object.defineProperty(abiParameter$1, "__esModule", { value: true });
  abiParameter$1.InvalidAbiTypeParameterError = abiParameter$1.InvalidFunctionModifierError = abiParameter$1.InvalidModifierError = abiParameter$1.SolidityProtectedKeywordError = abiParameter$1.InvalidParameterError = abiParameter$1.InvalidAbiParametersError = abiParameter$1.InvalidAbiParameterError = void 0;
  const errors_js_1 = requireErrors$1();
  class InvalidAbiParameterError extends errors_js_1.BaseError {
    constructor({ param }) {
      super("Failed to parse ABI parameter.", {
        details: `parseAbiParameter(${JSON.stringify(param, null, 2)})`,
        docsPath: "/api/human#parseabiparameter-1"
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiParameterError"
      });
    }
  }
  abiParameter$1.InvalidAbiParameterError = InvalidAbiParameterError;
  class InvalidAbiParametersError2 extends errors_js_1.BaseError {
    constructor({ params }) {
      super("Failed to parse ABI parameters.", {
        details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
        docsPath: "/api/human#parseabiparameters-1"
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiParametersError"
      });
    }
  }
  abiParameter$1.InvalidAbiParametersError = InvalidAbiParametersError2;
  class InvalidParameterError2 extends errors_js_1.BaseError {
    constructor({ param }) {
      super("Invalid ABI parameter.", {
        details: param
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidParameterError"
      });
    }
  }
  abiParameter$1.InvalidParameterError = InvalidParameterError2;
  class SolidityProtectedKeywordError2 extends errors_js_1.BaseError {
    constructor({ param, name }) {
      super("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "SolidityProtectedKeywordError"
      });
    }
  }
  abiParameter$1.SolidityProtectedKeywordError = SolidityProtectedKeywordError2;
  class InvalidModifierError2 extends errors_js_1.BaseError {
    constructor({ param, type, modifier }) {
      super("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidModifierError"
      });
    }
  }
  abiParameter$1.InvalidModifierError = InvalidModifierError2;
  class InvalidFunctionModifierError2 extends errors_js_1.BaseError {
    constructor({ param, type, modifier }) {
      super("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidFunctionModifierError"
      });
    }
  }
  abiParameter$1.InvalidFunctionModifierError = InvalidFunctionModifierError2;
  class InvalidAbiTypeParameterError2 extends errors_js_1.BaseError {
    constructor({ abiParameter: abiParameter2 }) {
      super("Invalid ABI parameter.", {
        details: JSON.stringify(abiParameter2, null, 2),
        metaMessages: ["ABI parameter type is invalid."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiTypeParameterError"
      });
    }
  }
  abiParameter$1.InvalidAbiTypeParameterError = InvalidAbiTypeParameterError2;
  return abiParameter$1;
}
var signature$1 = {};
var hasRequiredSignature$1;
function requireSignature$1() {
  if (hasRequiredSignature$1) return signature$1;
  hasRequiredSignature$1 = 1;
  Object.defineProperty(signature$1, "__esModule", { value: true });
  signature$1.InvalidStructSignatureError = signature$1.UnknownSignatureError = signature$1.InvalidSignatureError = void 0;
  const errors_js_1 = requireErrors$1();
  class InvalidSignatureError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2, type }) {
      super(`Invalid ${type} signature.`, {
        details: signature2
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidSignatureError"
      });
    }
  }
  signature$1.InvalidSignatureError = InvalidSignatureError2;
  class UnknownSignatureError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2 }) {
      super("Unknown signature.", {
        details: signature2
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "UnknownSignatureError"
      });
    }
  }
  signature$1.UnknownSignatureError = UnknownSignatureError2;
  class InvalidStructSignatureError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2 }) {
      super("Invalid struct signature.", {
        details: signature2,
        metaMessages: ["No properties exist."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidStructSignatureError"
      });
    }
  }
  signature$1.InvalidStructSignatureError = InvalidStructSignatureError2;
  return signature$1;
}
var struct$1 = {};
var hasRequiredStruct$1;
function requireStruct$1() {
  if (hasRequiredStruct$1) return struct$1;
  hasRequiredStruct$1 = 1;
  Object.defineProperty(struct$1, "__esModule", { value: true });
  struct$1.CircularReferenceError = void 0;
  const errors_js_1 = requireErrors$1();
  class CircularReferenceError2 extends errors_js_1.BaseError {
    constructor({ type }) {
      super("Circular reference detected.", {
        metaMessages: [`Struct "${type}" is a circular reference.`]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "CircularReferenceError"
      });
    }
  }
  struct$1.CircularReferenceError = CircularReferenceError2;
  return struct$1;
}
var utils$1 = {};
var splitParameters$1 = {};
var hasRequiredSplitParameters$1;
function requireSplitParameters$1() {
  if (hasRequiredSplitParameters$1) return splitParameters$1;
  hasRequiredSplitParameters$1 = 1;
  Object.defineProperty(splitParameters$1, "__esModule", { value: true });
  splitParameters$1.InvalidParenthesisError = void 0;
  const errors_js_1 = requireErrors$1();
  class InvalidParenthesisError2 extends errors_js_1.BaseError {
    constructor({ current, depth }) {
      super("Unbalanced parentheses.", {
        metaMessages: [
          `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
        ],
        details: `Depth "${depth}"`
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidParenthesisError"
      });
    }
  }
  splitParameters$1.InvalidParenthesisError = InvalidParenthesisError2;
  return splitParameters$1;
}
var cache$1 = {};
var hasRequiredCache$1;
function requireCache$1() {
  if (hasRequiredCache$1) return cache$1;
  hasRequiredCache$1 = 1;
  Object.defineProperty(cache$1, "__esModule", { value: true });
  cache$1.parameterCache = void 0;
  cache$1.getParameterCacheKey = getParameterCacheKey2;
  function getParameterCacheKey2(param, type, structs2) {
    let structKey = "";
    if (structs2)
      for (const struct2 of Object.entries(structs2)) {
        if (!struct2)
          continue;
        let propertyKey = "";
        for (const property of struct2[1]) {
          propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
        }
        structKey += `(${struct2[0]}{${propertyKey}})`;
      }
    if (type)
      return `${type}:${param}${structKey}`;
    return `${param}${structKey}`;
  }
  cache$1.parameterCache = /* @__PURE__ */ new Map([
    ["address", { type: "address" }],
    ["bool", { type: "bool" }],
    ["bytes", { type: "bytes" }],
    ["bytes32", { type: "bytes32" }],
    ["int", { type: "int256" }],
    ["int256", { type: "int256" }],
    ["string", { type: "string" }],
    ["uint", { type: "uint256" }],
    ["uint8", { type: "uint8" }],
    ["uint16", { type: "uint16" }],
    ["uint24", { type: "uint24" }],
    ["uint32", { type: "uint32" }],
    ["uint64", { type: "uint64" }],
    ["uint96", { type: "uint96" }],
    ["uint112", { type: "uint112" }],
    ["uint160", { type: "uint160" }],
    ["uint192", { type: "uint192" }],
    ["uint256", { type: "uint256" }],
    ["address owner", { type: "address", name: "owner" }],
    ["address to", { type: "address", name: "to" }],
    ["bool approved", { type: "bool", name: "approved" }],
    ["bytes _data", { type: "bytes", name: "_data" }],
    ["bytes data", { type: "bytes", name: "data" }],
    ["bytes signature", { type: "bytes", name: "signature" }],
    ["bytes32 hash", { type: "bytes32", name: "hash" }],
    ["bytes32 r", { type: "bytes32", name: "r" }],
    ["bytes32 root", { type: "bytes32", name: "root" }],
    ["bytes32 s", { type: "bytes32", name: "s" }],
    ["string name", { type: "string", name: "name" }],
    ["string symbol", { type: "string", name: "symbol" }],
    ["string tokenURI", { type: "string", name: "tokenURI" }],
    ["uint tokenId", { type: "uint256", name: "tokenId" }],
    ["uint8 v", { type: "uint8", name: "v" }],
    ["uint256 balance", { type: "uint256", name: "balance" }],
    ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
    ["uint256 value", { type: "uint256", name: "value" }],
    [
      "event:address indexed from",
      { type: "address", name: "from", indexed: true }
    ],
    ["event:address indexed to", { type: "address", name: "to", indexed: true }],
    [
      "event:uint indexed tokenId",
      { type: "uint256", name: "tokenId", indexed: true }
    ],
    [
      "event:uint256 indexed tokenId",
      { type: "uint256", name: "tokenId", indexed: true }
    ]
  ]);
  return cache$1;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  Object.defineProperty(utils$1, "__esModule", { value: true });
  utils$1.parseSignature = parseSignature2;
  utils$1.parseFunctionSignature = parseFunctionSignature2;
  utils$1.parseEventSignature = parseEventSignature2;
  utils$1.parseErrorSignature = parseErrorSignature2;
  utils$1.parseConstructorSignature = parseConstructorSignature2;
  utils$1.parseFallbackSignature = parseFallbackSignature2;
  utils$1.parseAbiParameter = parseAbiParameter2;
  utils$1.splitParameters = splitParameters2;
  utils$1.isSolidityType = isSolidityType2;
  utils$1.isSolidityKeyword = isSolidityKeyword2;
  utils$1.isValidDataLocation = isValidDataLocation2;
  const regex_js_1 = requireRegex$1();
  const abiItem_js_1 = requireAbiItem$1();
  const abiParameter_js_1 = requireAbiParameter$1();
  const signature_js_1 = requireSignature$1();
  const splitParameters_js_1 = requireSplitParameters$1();
  const cache_js_1 = requireCache$1();
  const signatures_js_1 = requireSignatures$1();
  function parseSignature2(signature2, structs2 = {}) {
    if ((0, signatures_js_1.isFunctionSignature)(signature2))
      return parseFunctionSignature2(signature2, structs2);
    if ((0, signatures_js_1.isEventSignature)(signature2))
      return parseEventSignature2(signature2, structs2);
    if ((0, signatures_js_1.isErrorSignature)(signature2))
      return parseErrorSignature2(signature2, structs2);
    if ((0, signatures_js_1.isConstructorSignature)(signature2))
      return parseConstructorSignature2(signature2, structs2);
    if ((0, signatures_js_1.isFallbackSignature)(signature2))
      return parseFallbackSignature2(signature2);
    if ((0, signatures_js_1.isReceiveSignature)(signature2))
      return {
        type: "receive",
        stateMutability: "payable"
      };
    throw new signature_js_1.UnknownSignatureError({ signature: signature2 });
  }
  function parseFunctionSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execFunctionSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "function" });
    const inputParams = splitParameters2(match.parameters);
    const inputs = [];
    const inputLength = inputParams.length;
    for (let i = 0; i < inputLength; i++) {
      inputs.push(parseAbiParameter2(inputParams[i], {
        modifiers: signatures_js_1.functionModifiers,
        structs: structs2,
        type: "function"
      }));
    }
    const outputs = [];
    if (match.returns) {
      const outputParams = splitParameters2(match.returns);
      const outputLength = outputParams.length;
      for (let i = 0; i < outputLength; i++) {
        outputs.push(parseAbiParameter2(outputParams[i], {
          modifiers: signatures_js_1.functionModifiers,
          structs: structs2,
          type: "function"
        }));
      }
    }
    return {
      name: match.name,
      type: "function",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs,
      outputs
    };
  }
  function parseEventSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execEventSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "event" });
    const params = splitParameters2(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++)
      abiParameters.push(parseAbiParameter2(params[i], {
        modifiers: signatures_js_1.eventModifiers,
        structs: structs2,
        type: "event"
      }));
    return { name: match.name, type: "event", inputs: abiParameters };
  }
  function parseErrorSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execErrorSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "error" });
    const params = splitParameters2(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++)
      abiParameters.push(parseAbiParameter2(params[i], { structs: structs2, type: "error" }));
    return { name: match.name, type: "error", inputs: abiParameters };
  }
  function parseConstructorSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execConstructorSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "constructor" });
    const params = splitParameters2(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++)
      abiParameters.push(parseAbiParameter2(params[i], { structs: structs2, type: "constructor" }));
    return {
      type: "constructor",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs: abiParameters
    };
  }
  function parseFallbackSignature2(signature2) {
    const match = (0, signatures_js_1.execFallbackSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "fallback" });
    return {
      type: "fallback",
      stateMutability: match.stateMutability ?? "nonpayable"
    };
  }
  const abiParameterWithoutTupleRegex2 = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
  const abiParameterWithTupleRegex2 = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
  const dynamicIntegerRegex2 = /^u?int$/;
  function parseAbiParameter2(param, options) {
    const parameterCacheKey = (0, cache_js_1.getParameterCacheKey)(param, options?.type, options?.structs);
    if (cache_js_1.parameterCache.has(parameterCacheKey))
      return cache_js_1.parameterCache.get(parameterCacheKey);
    const isTuple = regex_js_1.isTupleRegex.test(param);
    const match = (0, regex_js_1.execTyped)(isTuple ? abiParameterWithTupleRegex2 : abiParameterWithoutTupleRegex2, param);
    if (!match)
      throw new abiParameter_js_1.InvalidParameterError({ param });
    if (match.name && isSolidityKeyword2(match.name))
      throw new abiParameter_js_1.SolidityProtectedKeywordError({ param, name: match.name });
    const name = match.name ? { name: match.name } : {};
    const indexed = match.modifier === "indexed" ? { indexed: true } : {};
    const structs2 = options?.structs ?? {};
    let type;
    let components = {};
    if (isTuple) {
      type = "tuple";
      const params = splitParameters2(match.type);
      const components_ = [];
      const length = params.length;
      for (let i = 0; i < length; i++) {
        components_.push(parseAbiParameter2(params[i], { structs: structs2 }));
      }
      components = { components: components_ };
    } else if (match.type in structs2) {
      type = "tuple";
      components = { components: structs2[match.type] };
    } else if (dynamicIntegerRegex2.test(match.type)) {
      type = `${match.type}256`;
    } else if (match.type === "address payable") {
      type = "address";
    } else {
      type = match.type;
      if (!(options?.type === "struct") && !isSolidityType2(type))
        throw new abiItem_js_1.UnknownSolidityTypeError({ type });
    }
    if (match.modifier) {
      if (!options?.modifiers?.has?.(match.modifier))
        throw new abiParameter_js_1.InvalidModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
      if (signatures_js_1.functionModifiers.has(match.modifier) && !isValidDataLocation2(type, !!match.array))
        throw new abiParameter_js_1.InvalidFunctionModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
    }
    const abiParameter2 = {
      type: `${type}${match.array ?? ""}`,
      ...name,
      ...indexed,
      ...components
    };
    cache_js_1.parameterCache.set(parameterCacheKey, abiParameter2);
    return abiParameter2;
  }
  function splitParameters2(params, result = [], current = "", depth = 0) {
    const length = params.trim().length;
    for (let i = 0; i < length; i++) {
      const char = params[i];
      const tail = params.slice(i + 1);
      switch (char) {
        case ",":
          return depth === 0 ? splitParameters2(tail, [...result, current.trim()]) : splitParameters2(tail, result, `${current}${char}`, depth);
        case "(":
          return splitParameters2(tail, result, `${current}${char}`, depth + 1);
        case ")":
          return splitParameters2(tail, result, `${current}${char}`, depth - 1);
        default:
          return splitParameters2(tail, result, `${current}${char}`, depth);
      }
    }
    if (current === "")
      return result;
    if (depth !== 0)
      throw new splitParameters_js_1.InvalidParenthesisError({ current, depth });
    result.push(current.trim());
    return result;
  }
  function isSolidityType2(type) {
    return type === "address" || type === "bool" || type === "function" || type === "string" || regex_js_1.bytesRegex.test(type) || regex_js_1.integerRegex.test(type);
  }
  const protectedKeywordsRegex2 = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  function isSolidityKeyword2(name) {
    return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || regex_js_1.bytesRegex.test(name) || regex_js_1.integerRegex.test(name) || protectedKeywordsRegex2.test(name);
  }
  function isValidDataLocation2(type, isArray) {
    return isArray || type === "bytes" || type === "string" || type === "tuple";
  }
  return utils$1;
}
var hasRequiredStructs$1;
function requireStructs$1() {
  if (hasRequiredStructs$1) return structs$1;
  hasRequiredStructs$1 = 1;
  Object.defineProperty(structs$1, "__esModule", { value: true });
  structs$1.parseStructs = parseStructs2;
  const regex_js_1 = requireRegex$1();
  const abiItem_js_1 = requireAbiItem$1();
  const abiParameter_js_1 = requireAbiParameter$1();
  const signature_js_1 = requireSignature$1();
  const struct_js_1 = requireStruct$1();
  const signatures_js_1 = requireSignatures$1();
  const utils_js_1 = requireUtils$1();
  function parseStructs2(signatures2) {
    const shallowStructs = {};
    const signaturesLength = signatures2.length;
    for (let i = 0; i < signaturesLength; i++) {
      const signature2 = signatures2[i];
      if (!(0, signatures_js_1.isStructSignature)(signature2))
        continue;
      const match = (0, signatures_js_1.execStructSignature)(signature2);
      if (!match)
        throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "struct" });
      const properties = match.properties.split(";");
      const components = [];
      const propertiesLength = properties.length;
      for (let k = 0; k < propertiesLength; k++) {
        const property = properties[k];
        const trimmed = property.trim();
        if (!trimmed)
          continue;
        const abiParameter2 = (0, utils_js_1.parseAbiParameter)(trimmed, {
          type: "struct"
        });
        components.push(abiParameter2);
      }
      if (!components.length)
        throw new signature_js_1.InvalidStructSignatureError({ signature: signature2 });
      shallowStructs[match.name] = components;
    }
    const resolvedStructs = {};
    const entries = Object.entries(shallowStructs);
    const entriesLength = entries.length;
    for (let i = 0; i < entriesLength; i++) {
      const [name, parameters] = entries[i];
      resolvedStructs[name] = resolveStructs2(parameters, shallowStructs);
    }
    return resolvedStructs;
  }
  const typeWithoutTupleRegex2 = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  function resolveStructs2(abiParameters = [], structs2 = {}, ancestors = /* @__PURE__ */ new Set()) {
    const components = [];
    const length = abiParameters.length;
    for (let i = 0; i < length; i++) {
      const abiParameter2 = abiParameters[i];
      const isTuple = regex_js_1.isTupleRegex.test(abiParameter2.type);
      if (isTuple)
        components.push(abiParameter2);
      else {
        const match = (0, regex_js_1.execTyped)(typeWithoutTupleRegex2, abiParameter2.type);
        if (!match?.type)
          throw new abiParameter_js_1.InvalidAbiTypeParameterError({ abiParameter: abiParameter2 });
        const { array, type } = match;
        if (type in structs2) {
          if (ancestors.has(type))
            throw new struct_js_1.CircularReferenceError({ type });
          components.push({
            ...abiParameter2,
            type: `tuple${array ?? ""}`,
            components: resolveStructs2(structs2[type], structs2, /* @__PURE__ */ new Set([...ancestors, type]))
          });
        } else {
          if ((0, utils_js_1.isSolidityType)(type))
            components.push(abiParameter2);
          else
            throw new abiItem_js_1.UnknownTypeError({ type });
        }
      }
    }
    return components;
  }
  return structs$1;
}
var hasRequiredParseAbi$1;
function requireParseAbi$1() {
  if (hasRequiredParseAbi$1) return parseAbi$1;
  hasRequiredParseAbi$1 = 1;
  Object.defineProperty(parseAbi$1, "__esModule", { value: true });
  parseAbi$1.parseAbi = parseAbi2;
  const signatures_js_1 = requireSignatures$1();
  const structs_js_1 = requireStructs$1();
  const utils_js_1 = requireUtils$1();
  function parseAbi2(signatures2) {
    const structs2 = (0, structs_js_1.parseStructs)(signatures2);
    const abi = [];
    const length = signatures2.length;
    for (let i = 0; i < length; i++) {
      const signature2 = signatures2[i];
      if ((0, signatures_js_1.isStructSignature)(signature2))
        continue;
      abi.push((0, utils_js_1.parseSignature)(signature2, structs2));
    }
    return abi;
  }
  return parseAbi$1;
}
var parseAbiItem$1 = {};
var hasRequiredParseAbiItem$1;
function requireParseAbiItem$1() {
  if (hasRequiredParseAbiItem$1) return parseAbiItem$1;
  hasRequiredParseAbiItem$1 = 1;
  Object.defineProperty(parseAbiItem$1, "__esModule", { value: true });
  parseAbiItem$1.parseAbiItem = parseAbiItem2;
  const abiItem_js_1 = requireAbiItem$1();
  const signatures_js_1 = requireSignatures$1();
  const structs_js_1 = requireStructs$1();
  const utils_js_1 = requireUtils$1();
  function parseAbiItem2(signature2) {
    let abiItem2;
    if (typeof signature2 === "string")
      abiItem2 = (0, utils_js_1.parseSignature)(signature2);
    else {
      const structs2 = (0, structs_js_1.parseStructs)(signature2);
      const length = signature2.length;
      for (let i = 0; i < length; i++) {
        const signature_ = signature2[i];
        if ((0, signatures_js_1.isStructSignature)(signature_))
          continue;
        abiItem2 = (0, utils_js_1.parseSignature)(signature_, structs2);
        break;
      }
    }
    if (!abiItem2)
      throw new abiItem_js_1.InvalidAbiItemError({ signature: signature2 });
    return abiItem2;
  }
  return parseAbiItem$1;
}
var parseAbiParameter$1 = {};
var hasRequiredParseAbiParameter$1;
function requireParseAbiParameter$1() {
  if (hasRequiredParseAbiParameter$1) return parseAbiParameter$1;
  hasRequiredParseAbiParameter$1 = 1;
  Object.defineProperty(parseAbiParameter$1, "__esModule", { value: true });
  parseAbiParameter$1.parseAbiParameter = parseAbiParameter2;
  const abiParameter_js_1 = requireAbiParameter$1();
  const signatures_js_1 = requireSignatures$1();
  const structs_js_1 = requireStructs$1();
  const utils_js_1 = requireUtils$1();
  function parseAbiParameter2(param) {
    let abiParameter2;
    if (typeof param === "string")
      abiParameter2 = (0, utils_js_1.parseAbiParameter)(param, {
        modifiers: signatures_js_1.modifiers
      });
    else {
      const structs2 = (0, structs_js_1.parseStructs)(param);
      const length = param.length;
      for (let i = 0; i < length; i++) {
        const signature2 = param[i];
        if ((0, signatures_js_1.isStructSignature)(signature2))
          continue;
        abiParameter2 = (0, utils_js_1.parseAbiParameter)(signature2, { modifiers: signatures_js_1.modifiers, structs: structs2 });
        break;
      }
    }
    if (!abiParameter2)
      throw new abiParameter_js_1.InvalidAbiParameterError({ param });
    return abiParameter2;
  }
  return parseAbiParameter$1;
}
var parseAbiParameters$1 = {};
var hasRequiredParseAbiParameters$1;
function requireParseAbiParameters$1() {
  if (hasRequiredParseAbiParameters$1) return parseAbiParameters$1;
  hasRequiredParseAbiParameters$1 = 1;
  Object.defineProperty(parseAbiParameters$1, "__esModule", { value: true });
  parseAbiParameters$1.parseAbiParameters = parseAbiParameters2;
  const abiParameter_js_1 = requireAbiParameter$1();
  const signatures_js_1 = requireSignatures$1();
  const structs_js_1 = requireStructs$1();
  const utils_js_1 = requireUtils$1();
  const utils_js_2 = requireUtils$1();
  function parseAbiParameters2(params) {
    const abiParameters = [];
    if (typeof params === "string") {
      const parameters = (0, utils_js_1.splitParameters)(params);
      const length = parameters.length;
      for (let i = 0; i < length; i++) {
        abiParameters.push((0, utils_js_2.parseAbiParameter)(parameters[i], { modifiers: signatures_js_1.modifiers }));
      }
    } else {
      const structs2 = (0, structs_js_1.parseStructs)(params);
      const length = params.length;
      for (let i = 0; i < length; i++) {
        const signature2 = params[i];
        if ((0, signatures_js_1.isStructSignature)(signature2))
          continue;
        const parameters = (0, utils_js_1.splitParameters)(signature2);
        const length2 = parameters.length;
        for (let k = 0; k < length2; k++) {
          abiParameters.push((0, utils_js_2.parseAbiParameter)(parameters[k], { modifiers: signatures_js_1.modifiers, structs: structs2 }));
        }
      }
    }
    if (abiParameters.length === 0)
      throw new abiParameter_js_1.InvalidAbiParametersError({ params });
    return abiParameters;
  }
  return parseAbiParameters$1;
}
var hasRequiredExports$1;
function requireExports$1() {
  if (hasRequiredExports$1) return exports$2;
  hasRequiredExports$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CircularReferenceError = exports.InvalidParenthesisError = exports.UnknownSignatureError = exports.InvalidSignatureError = exports.InvalidStructSignatureError = exports.InvalidAbiParameterError = exports.InvalidAbiParametersError = exports.InvalidParameterError = exports.SolidityProtectedKeywordError = exports.InvalidModifierError = exports.InvalidFunctionModifierError = exports.InvalidAbiTypeParameterError = exports.UnknownSolidityTypeError = exports.InvalidAbiItemError = exports.UnknownTypeError = exports.parseAbiParameters = exports.parseAbiParameter = exports.parseAbiItem = exports.parseAbi = exports.formatAbiParameters = exports.formatAbiParameter = exports.formatAbiItem = exports.formatAbi = exports.narrow = exports.BaseError = void 0;
    var errors_js_1 = requireErrors$1();
    Object.defineProperty(exports, "BaseError", { enumerable: true, get: function() {
      return errors_js_1.BaseError;
    } });
    var narrow_js_1 = requireNarrow$1();
    Object.defineProperty(exports, "narrow", { enumerable: true, get: function() {
      return narrow_js_1.narrow;
    } });
    var formatAbi_js_1 = requireFormatAbi$1();
    Object.defineProperty(exports, "formatAbi", { enumerable: true, get: function() {
      return formatAbi_js_1.formatAbi;
    } });
    var formatAbiItem_js_1 = requireFormatAbiItem$1();
    Object.defineProperty(exports, "formatAbiItem", { enumerable: true, get: function() {
      return formatAbiItem_js_1.formatAbiItem;
    } });
    var formatAbiParameter_js_1 = requireFormatAbiParameter$1();
    Object.defineProperty(exports, "formatAbiParameter", { enumerable: true, get: function() {
      return formatAbiParameter_js_1.formatAbiParameter;
    } });
    var formatAbiParameters_js_1 = requireFormatAbiParameters$1();
    Object.defineProperty(exports, "formatAbiParameters", { enumerable: true, get: function() {
      return formatAbiParameters_js_1.formatAbiParameters;
    } });
    var parseAbi_js_1 = requireParseAbi$1();
    Object.defineProperty(exports, "parseAbi", { enumerable: true, get: function() {
      return parseAbi_js_1.parseAbi;
    } });
    var parseAbiItem_js_1 = requireParseAbiItem$1();
    Object.defineProperty(exports, "parseAbiItem", { enumerable: true, get: function() {
      return parseAbiItem_js_1.parseAbiItem;
    } });
    var parseAbiParameter_js_1 = requireParseAbiParameter$1();
    Object.defineProperty(exports, "parseAbiParameter", { enumerable: true, get: function() {
      return parseAbiParameter_js_1.parseAbiParameter;
    } });
    var parseAbiParameters_js_1 = requireParseAbiParameters$1();
    Object.defineProperty(exports, "parseAbiParameters", { enumerable: true, get: function() {
      return parseAbiParameters_js_1.parseAbiParameters;
    } });
    var abiItem_js_1 = requireAbiItem$1();
    Object.defineProperty(exports, "UnknownTypeError", { enumerable: true, get: function() {
      return abiItem_js_1.UnknownTypeError;
    } });
    Object.defineProperty(exports, "InvalidAbiItemError", { enumerable: true, get: function() {
      return abiItem_js_1.InvalidAbiItemError;
    } });
    Object.defineProperty(exports, "UnknownSolidityTypeError", { enumerable: true, get: function() {
      return abiItem_js_1.UnknownSolidityTypeError;
    } });
    var abiParameter_js_1 = requireAbiParameter$1();
    Object.defineProperty(exports, "InvalidAbiTypeParameterError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidAbiTypeParameterError;
    } });
    Object.defineProperty(exports, "InvalidFunctionModifierError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidFunctionModifierError;
    } });
    Object.defineProperty(exports, "InvalidModifierError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidModifierError;
    } });
    Object.defineProperty(exports, "SolidityProtectedKeywordError", { enumerable: true, get: function() {
      return abiParameter_js_1.SolidityProtectedKeywordError;
    } });
    Object.defineProperty(exports, "InvalidParameterError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidParameterError;
    } });
    Object.defineProperty(exports, "InvalidAbiParametersError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidAbiParametersError;
    } });
    Object.defineProperty(exports, "InvalidAbiParameterError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidAbiParameterError;
    } });
    var signature_js_1 = requireSignature$1();
    Object.defineProperty(exports, "InvalidStructSignatureError", { enumerable: true, get: function() {
      return signature_js_1.InvalidStructSignatureError;
    } });
    Object.defineProperty(exports, "InvalidSignatureError", { enumerable: true, get: function() {
      return signature_js_1.InvalidSignatureError;
    } });
    Object.defineProperty(exports, "UnknownSignatureError", { enumerable: true, get: function() {
      return signature_js_1.UnknownSignatureError;
    } });
    var splitParameters_js_1 = requireSplitParameters$1();
    Object.defineProperty(exports, "InvalidParenthesisError", { enumerable: true, get: function() {
      return splitParameters_js_1.InvalidParenthesisError;
    } });
    var struct_js_1 = requireStruct$1();
    Object.defineProperty(exports, "CircularReferenceError", { enumerable: true, get: function() {
      return struct_js_1.CircularReferenceError;
    } });
  })(exports$2);
  return exports$2;
}
function execTyped(regex2, string) {
  const match = regex2.exec(string);
  return match?.groups;
}
const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function isSolidityType(type) {
  return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex.test(type) || integerRegex.test(type);
}
const Identifier = stringType().regex(/[a-zA-Z$_][a-zA-Z0-9$_]*/);
const Address = stringType().transform((val, ctx) => {
  const regex2 = /^0x[a-fA-F0-9]{40}$/;
  if (!regex2.test(val)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: `Invalid Address ${val}`
    });
  }
  return val;
});
const SolidityAddress = literalType("address");
const SolidityBool = literalType("bool");
const SolidityBytes = stringType().regex(bytesRegex);
const SolidityFunction = literalType("function");
const SolidityString = literalType("string");
const SolidityTuple = literalType("tuple");
const SolidityInt = stringType().regex(integerRegex);
const SolidityArrayWithoutTuple = stringType().regex(/^(address|bool|function|string|bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?|u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?)(\[[0-9]{0,}\])+$/);
const SolidityArrayWithTuple = stringType().regex(/^tuple(\[[0-9]{0,}\])+$/);
const SolidityArray = unionType([
  SolidityArrayWithTuple,
  SolidityArrayWithoutTuple
]);
const AbiParameter = lazyType(() => intersectionType(objectType({
  name: unionType([Identifier.optional(), literalType("")]),
  /** Representation used by Solidity compiler */
  internalType: stringType().optional()
}), unionType([
  objectType({
    type: unionType([
      SolidityAddress,
      SolidityBool,
      SolidityBytes,
      SolidityFunction,
      SolidityString,
      SolidityInt,
      SolidityArrayWithoutTuple
    ])
  }),
  objectType({
    type: unionType([SolidityTuple, SolidityArrayWithTuple]),
    components: arrayType(AbiParameter).readonly()
  })
])));
const AbiEventParameter = intersectionType(AbiParameter, objectType({ indexed: booleanType().optional() }));
const AbiStateMutability = unionType([
  literalType("pure"),
  literalType("view"),
  literalType("nonpayable"),
  literalType("payable")
]);
preprocessType((val) => {
  const abiFunction = val;
  if (abiFunction.stateMutability === void 0) {
    if (abiFunction.constant)
      abiFunction.stateMutability = "view";
    else if (abiFunction.payable)
      abiFunction.stateMutability = "payable";
    else
      abiFunction.stateMutability = "nonpayable";
  }
  return val;
}, objectType({
  type: literalType("function"),
  /**
   * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
   * https://github.com/ethereum/solidity/issues/992
   */
  constant: booleanType().optional(),
  /**
   * @deprecated Vyper used to provide gas estimates
   * https://github.com/vyperlang/vyper/issues/2151
   */
  gas: numberType().optional(),
  inputs: arrayType(AbiParameter).readonly(),
  name: Identifier,
  outputs: arrayType(AbiParameter).readonly(),
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * https://github.com/ethereum/solidity/issues/992
   */
  payable: booleanType().optional(),
  stateMutability: AbiStateMutability
}));
preprocessType((val) => {
  const abiFunction = val;
  if (abiFunction.stateMutability === void 0) {
    if (abiFunction.payable)
      abiFunction.stateMutability = "payable";
    else
      abiFunction.stateMutability = "nonpayable";
  }
  return val;
}, objectType({
  type: literalType("constructor"),
  /**
   * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
   * https://github.com/ethereum/solidity/issues/992
   */
  inputs: arrayType(AbiParameter).readonly(),
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * https://github.com/ethereum/solidity/issues/992
   */
  payable: booleanType().optional(),
  stateMutability: unionType([literalType("nonpayable"), literalType("payable")])
}));
preprocessType((val) => {
  const abiFunction = val;
  if (abiFunction.stateMutability === void 0) {
    if (abiFunction.payable)
      abiFunction.stateMutability = "payable";
    else
      abiFunction.stateMutability = "nonpayable";
  }
  return val;
}, objectType({
  type: literalType("fallback"),
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * https://github.com/ethereum/solidity/issues/992
   */
  payable: booleanType().optional(),
  stateMutability: unionType([literalType("nonpayable"), literalType("payable")])
}));
objectType({
  type: literalType("receive"),
  stateMutability: literalType("payable")
});
const AbiEvent = objectType({
  type: literalType("event"),
  anonymous: booleanType().optional(),
  inputs: arrayType(AbiEventParameter).readonly(),
  name: Identifier
});
const AbiError = objectType({
  type: literalType("error"),
  inputs: arrayType(AbiParameter).readonly(),
  name: stringType()
});
unionType([
  literalType("constructor"),
  literalType("event"),
  literalType("error"),
  literalType("fallback"),
  literalType("function"),
  literalType("receive")
]);
const Abi = arrayType(unionType([
  AbiError,
  AbiEvent,
  // TODO: Replace code below to `z.switch` (https://github.com/colinhacks/zod/issues/2106)
  // Need to redefine `AbiFunction | AbiConstructor | AbiFallback | AbiReceive` since `z.discriminate` doesn't support `z.preprocess` on `options`
  // https://github.com/colinhacks/zod/issues/1490
  preprocessType((val) => {
    const abiItem2 = val;
    if (abiItem2.type === "receive")
      return abiItem2;
    if (val.stateMutability === void 0) {
      if (abiItem2.type === "function" && abiItem2.constant)
        abiItem2.stateMutability = "view";
      else if (abiItem2.payable)
        abiItem2.stateMutability = "payable";
      else
        abiItem2.stateMutability = "nonpayable";
    }
    return val;
  }, intersectionType(objectType({
    /**
     * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    constant: booleanType().optional(),
    /**
     * @deprecated Vyper used to provide gas estimates
     * https://github.com/vyperlang/vyper/issues/2151
     */
    gas: numberType().optional(),
    /**
     * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    payable: booleanType().optional()
  }), discriminatedUnionType("type", [
    objectType({
      type: literalType("function"),
      inputs: arrayType(AbiParameter).readonly(),
      name: stringType().regex(/[a-zA-Z$_][a-zA-Z0-9$_]*/),
      outputs: arrayType(AbiParameter).readonly(),
      stateMutability: AbiStateMutability
    }),
    objectType({
      type: literalType("constructor"),
      inputs: arrayType(AbiParameter).readonly(),
      stateMutability: unionType([
        literalType("payable"),
        literalType("nonpayable")
      ])
    }),
    objectType({
      type: literalType("fallback"),
      inputs: tupleType([]).optional(),
      stateMutability: unionType([
        literalType("payable"),
        literalType("nonpayable")
      ])
    }),
    objectType({
      type: literalType("receive"),
      stateMutability: literalType("payable")
    })
  ])))
])).readonly();
objectType({
  chainId: numberType().optional(),
  name: Identifier.optional(),
  salt: stringType().optional(),
  verifyingContract: Address.optional(),
  version: stringType().optional()
});
unionType([
  SolidityAddress,
  SolidityBool,
  SolidityBytes,
  SolidityString,
  SolidityInt,
  SolidityArray
]);
const TypedDataParameter = objectType({
  name: Identifier,
  type: stringType()
});
recordType(Identifier, arrayType(TypedDataParameter)).transform((val, ctx) => validateTypedDataKeys(val, ctx));
function validateTypedDataKeys(typedData, zodContext) {
  const keys = Object.keys(typedData);
  for (let i = 0; i < keys.length; i++) {
    if (isSolidityType(keys[i])) {
      zodContext.addIssue({
        code: "custom",
        message: `Invalid key. ${keys[i]} is a solidity type.`
      });
      return NEVER;
    }
    validateTypedDataParameters(keys[i], typedData, zodContext);
  }
  return typedData;
}
const typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*?)(?<array>(?:\[\d*?\])+?)?$/;
function validateTypedDataParameters(key, typedData, zodContext, ancestors = /* @__PURE__ */ new Set()) {
  const val = typedData[key];
  const length = val.length;
  for (let i = 0; i < length; i++) {
    if (val[i]?.type === key) {
      zodContext.addIssue({
        code: "custom",
        message: `Invalid type. ${key} is a self reference.`
      });
      return NEVER;
    }
    const match = execTyped(typeWithoutTupleRegex, val[i]?.type);
    if (!match?.type) {
      zodContext.addIssue({
        code: "custom",
        message: `Invalid type. ${key} does not have a type.`
      });
      return NEVER;
    }
    if (match.type in typedData) {
      if (ancestors.has(match.type)) {
        zodContext.addIssue({
          code: "custom",
          message: `Invalid type. ${match.type} is a circular reference.`
        });
        return NEVER;
      }
      validateTypedDataParameters(match.type, typedData, zodContext, /* @__PURE__ */ new Set([...ancestors, match.type]));
    } else if (!isSolidityType(match.type)) {
      zodContext.addIssue({
        code: "custom",
        message: `Invalid type. ${match.type} is not a valid EIP-712 type.`
      });
    }
  }
  return;
}
var exports$1 = {};
var errors = {};
var version = {};
var hasRequiredVersion;
function requireVersion() {
  if (hasRequiredVersion) return version;
  hasRequiredVersion = 1;
  Object.defineProperty(version, "__esModule", { value: true });
  version.version = void 0;
  version.version = "1.2.3";
  return version;
}
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  Object.defineProperty(errors, "__esModule", { value: true });
  errors.BaseError = void 0;
  const version_js_1 = requireVersion();
  class BaseError2 extends Error {
    constructor(shortMessage, args = {}) {
      const details = args.cause instanceof BaseError2 ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
      const docsPath = args.cause instanceof BaseError2 ? args.cause.docsPath || args.docsPath : args.docsPath;
      const message = [
        shortMessage || "An error occurred.",
        "",
        ...args.metaMessages ? [...args.metaMessages, ""] : [],
        ...docsPath ? [`Docs: https://abitype.dev${docsPath}`] : [],
        ...details ? [`Details: ${details}`] : [],
        `Version: abitype@${version_js_1.version}`
      ].join("\n");
      super(message);
      Object.defineProperty(this, "details", {
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
      Object.defineProperty(this, "metaMessages", {
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
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiTypeError"
      });
      if (args.cause)
        this.cause = args.cause;
      this.details = details;
      this.docsPath = docsPath;
      this.metaMessages = args.metaMessages;
      this.shortMessage = shortMessage;
    }
  }
  errors.BaseError = BaseError2;
  return errors;
}
var narrow = {};
var hasRequiredNarrow;
function requireNarrow() {
  if (hasRequiredNarrow) return narrow;
  hasRequiredNarrow = 1;
  Object.defineProperty(narrow, "__esModule", { value: true });
  narrow.narrow = narrow$12;
  function narrow$12(value) {
    return value;
  }
  return narrow;
}
var formatAbi = {};
var formatAbiItem = {};
var formatAbiParameters = {};
var formatAbiParameter = {};
var regex = {};
var hasRequiredRegex;
function requireRegex() {
  if (hasRequiredRegex) return regex;
  hasRequiredRegex = 1;
  Object.defineProperty(regex, "__esModule", { value: true });
  regex.isTupleRegex = regex.integerRegex = regex.bytesRegex = void 0;
  regex.execTyped = execTyped2;
  function execTyped2(regex2, string) {
    const match = regex2.exec(string);
    return match?.groups;
  }
  regex.bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
  regex.integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  regex.isTupleRegex = /^\(.+?\).*?$/;
  return regex;
}
var hasRequiredFormatAbiParameter;
function requireFormatAbiParameter() {
  if (hasRequiredFormatAbiParameter) return formatAbiParameter;
  hasRequiredFormatAbiParameter = 1;
  Object.defineProperty(formatAbiParameter, "__esModule", { value: true });
  formatAbiParameter.formatAbiParameter = formatAbiParameter$12;
  const regex_js_1 = requireRegex();
  const tupleRegex2 = /^tuple(?<array>(\[(\d*)\])*)$/;
  function formatAbiParameter$12(abiParameter2) {
    let type = abiParameter2.type;
    if (tupleRegex2.test(abiParameter2.type) && "components" in abiParameter2) {
      type = "(";
      const length = abiParameter2.components.length;
      for (let i = 0; i < length; i++) {
        const component = abiParameter2.components[i];
        type += formatAbiParameter$12(component);
        if (i < length - 1)
          type += ", ";
      }
      const result = (0, regex_js_1.execTyped)(tupleRegex2, abiParameter2.type);
      type += `)${result?.array || ""}`;
      return formatAbiParameter$12({
        ...abiParameter2,
        type
      });
    }
    if ("indexed" in abiParameter2 && abiParameter2.indexed)
      type = `${type} indexed`;
    if (abiParameter2.name)
      return `${type} ${abiParameter2.name}`;
    return type;
  }
  return formatAbiParameter;
}
var hasRequiredFormatAbiParameters;
function requireFormatAbiParameters() {
  if (hasRequiredFormatAbiParameters) return formatAbiParameters;
  hasRequiredFormatAbiParameters = 1;
  Object.defineProperty(formatAbiParameters, "__esModule", { value: true });
  formatAbiParameters.formatAbiParameters = formatAbiParameters$12;
  const formatAbiParameter_js_1 = requireFormatAbiParameter();
  function formatAbiParameters$12(abiParameters) {
    let params = "";
    const length = abiParameters.length;
    for (let i = 0; i < length; i++) {
      const abiParameter2 = abiParameters[i];
      params += (0, formatAbiParameter_js_1.formatAbiParameter)(abiParameter2);
      if (i !== length - 1)
        params += ", ";
    }
    return params;
  }
  return formatAbiParameters;
}
var hasRequiredFormatAbiItem;
function requireFormatAbiItem() {
  if (hasRequiredFormatAbiItem) return formatAbiItem;
  hasRequiredFormatAbiItem = 1;
  Object.defineProperty(formatAbiItem, "__esModule", { value: true });
  formatAbiItem.formatAbiItem = formatAbiItem$12;
  const formatAbiParameters_js_1 = requireFormatAbiParameters();
  function formatAbiItem$12(abiItem2) {
    if (abiItem2.type === "function")
      return `function ${abiItem2.name}(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})${abiItem2.stateMutability && abiItem2.stateMutability !== "nonpayable" ? ` ${abiItem2.stateMutability}` : ""}${abiItem2.outputs?.length ? ` returns (${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.outputs)})` : ""}`;
    if (abiItem2.type === "event")
      return `event ${abiItem2.name}(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})`;
    if (abiItem2.type === "error")
      return `error ${abiItem2.name}(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})`;
    if (abiItem2.type === "constructor")
      return `constructor(${(0, formatAbiParameters_js_1.formatAbiParameters)(abiItem2.inputs)})${abiItem2.stateMutability === "payable" ? " payable" : ""}`;
    if (abiItem2.type === "fallback")
      return `fallback() external${abiItem2.stateMutability === "payable" ? " payable" : ""}`;
    return "receive() external payable";
  }
  return formatAbiItem;
}
var hasRequiredFormatAbi;
function requireFormatAbi() {
  if (hasRequiredFormatAbi) return formatAbi;
  hasRequiredFormatAbi = 1;
  Object.defineProperty(formatAbi, "__esModule", { value: true });
  formatAbi.formatAbi = formatAbi$12;
  const formatAbiItem_js_1 = requireFormatAbiItem();
  function formatAbi$12(abi) {
    const signatures2 = [];
    const length = abi.length;
    for (let i = 0; i < length; i++) {
      const abiItem2 = abi[i];
      const signature2 = (0, formatAbiItem_js_1.formatAbiItem)(abiItem2);
      signatures2.push(signature2);
    }
    return signatures2;
  }
  return formatAbi;
}
var parseAbi = {};
var signatures = {};
var hasRequiredSignatures;
function requireSignatures() {
  if (hasRequiredSignatures) return signatures;
  hasRequiredSignatures = 1;
  Object.defineProperty(signatures, "__esModule", { value: true });
  signatures.functionModifiers = signatures.eventModifiers = signatures.modifiers = void 0;
  signatures.isErrorSignature = isErrorSignature2;
  signatures.execErrorSignature = execErrorSignature2;
  signatures.isEventSignature = isEventSignature2;
  signatures.execEventSignature = execEventSignature2;
  signatures.isFunctionSignature = isFunctionSignature2;
  signatures.execFunctionSignature = execFunctionSignature2;
  signatures.isStructSignature = isStructSignature2;
  signatures.execStructSignature = execStructSignature2;
  signatures.isConstructorSignature = isConstructorSignature2;
  signatures.execConstructorSignature = execConstructorSignature2;
  signatures.isFallbackSignature = isFallbackSignature2;
  signatures.execFallbackSignature = execFallbackSignature2;
  signatures.isReceiveSignature = isReceiveSignature2;
  const regex_js_1 = requireRegex();
  const errorSignatureRegex2 = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function isErrorSignature2(signature2) {
    return errorSignatureRegex2.test(signature2);
  }
  function execErrorSignature2(signature2) {
    return (0, regex_js_1.execTyped)(errorSignatureRegex2, signature2);
  }
  const eventSignatureRegex2 = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function isEventSignature2(signature2) {
    return eventSignatureRegex2.test(signature2);
  }
  function execEventSignature2(signature2) {
    return (0, regex_js_1.execTyped)(eventSignatureRegex2, signature2);
  }
  const functionSignatureRegex2 = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
  function isFunctionSignature2(signature2) {
    return functionSignatureRegex2.test(signature2);
  }
  function execFunctionSignature2(signature2) {
    return (0, regex_js_1.execTyped)(functionSignatureRegex2, signature2);
  }
  const structSignatureRegex2 = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
  function isStructSignature2(signature2) {
    return structSignatureRegex2.test(signature2);
  }
  function execStructSignature2(signature2) {
    return (0, regex_js_1.execTyped)(structSignatureRegex2, signature2);
  }
  const constructorSignatureRegex2 = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
  function isConstructorSignature2(signature2) {
    return constructorSignatureRegex2.test(signature2);
  }
  function execConstructorSignature2(signature2) {
    return (0, regex_js_1.execTyped)(constructorSignatureRegex2, signature2);
  }
  const fallbackSignatureRegex2 = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
  function isFallbackSignature2(signature2) {
    return fallbackSignatureRegex2.test(signature2);
  }
  function execFallbackSignature2(signature2) {
    return (0, regex_js_1.execTyped)(fallbackSignatureRegex2, signature2);
  }
  const receiveSignatureRegex2 = /^receive\(\) external payable$/;
  function isReceiveSignature2(signature2) {
    return receiveSignatureRegex2.test(signature2);
  }
  signatures.modifiers = /* @__PURE__ */ new Set([
    "memory",
    "indexed",
    "storage",
    "calldata"
  ]);
  signatures.eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
  signatures.functionModifiers = /* @__PURE__ */ new Set([
    "calldata",
    "memory",
    "storage"
  ]);
  return signatures;
}
var structs = {};
var abiItem = {};
var hasRequiredAbiItem;
function requireAbiItem() {
  if (hasRequiredAbiItem) return abiItem;
  hasRequiredAbiItem = 1;
  Object.defineProperty(abiItem, "__esModule", { value: true });
  abiItem.UnknownSolidityTypeError = abiItem.UnknownTypeError = abiItem.InvalidAbiItemError = void 0;
  const errors_js_1 = requireErrors();
  class InvalidAbiItemError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2 }) {
      super("Failed to parse ABI item.", {
        details: `parseAbiItem(${JSON.stringify(signature2, null, 2)})`,
        docsPath: "/api/human#parseabiitem-1"
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiItemError"
      });
    }
  }
  abiItem.InvalidAbiItemError = InvalidAbiItemError2;
  class UnknownTypeError2 extends errors_js_1.BaseError {
    constructor({ type }) {
      super("Unknown type.", {
        metaMessages: [
          `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "UnknownTypeError"
      });
    }
  }
  abiItem.UnknownTypeError = UnknownTypeError2;
  class UnknownSolidityTypeError2 extends errors_js_1.BaseError {
    constructor({ type }) {
      super("Unknown type.", {
        metaMessages: [`Type "${type}" is not a valid ABI type.`]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "UnknownSolidityTypeError"
      });
    }
  }
  abiItem.UnknownSolidityTypeError = UnknownSolidityTypeError2;
  return abiItem;
}
var abiParameter = {};
var hasRequiredAbiParameter;
function requireAbiParameter() {
  if (hasRequiredAbiParameter) return abiParameter;
  hasRequiredAbiParameter = 1;
  Object.defineProperty(abiParameter, "__esModule", { value: true });
  abiParameter.InvalidAbiTypeParameterError = abiParameter.InvalidFunctionModifierError = abiParameter.InvalidModifierError = abiParameter.SolidityProtectedKeywordError = abiParameter.InvalidParameterError = abiParameter.InvalidAbiParametersError = abiParameter.InvalidAbiParameterError = void 0;
  const errors_js_1 = requireErrors();
  class InvalidAbiParameterError extends errors_js_1.BaseError {
    constructor({ param }) {
      super("Failed to parse ABI parameter.", {
        details: `parseAbiParameter(${JSON.stringify(param, null, 2)})`,
        docsPath: "/api/human#parseabiparameter-1"
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiParameterError"
      });
    }
  }
  abiParameter.InvalidAbiParameterError = InvalidAbiParameterError;
  class InvalidAbiParametersError2 extends errors_js_1.BaseError {
    constructor({ params }) {
      super("Failed to parse ABI parameters.", {
        details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
        docsPath: "/api/human#parseabiparameters-1"
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiParametersError"
      });
    }
  }
  abiParameter.InvalidAbiParametersError = InvalidAbiParametersError2;
  class InvalidParameterError2 extends errors_js_1.BaseError {
    constructor({ param }) {
      super("Invalid ABI parameter.", {
        details: param
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidParameterError"
      });
    }
  }
  abiParameter.InvalidParameterError = InvalidParameterError2;
  class SolidityProtectedKeywordError2 extends errors_js_1.BaseError {
    constructor({ param, name }) {
      super("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "SolidityProtectedKeywordError"
      });
    }
  }
  abiParameter.SolidityProtectedKeywordError = SolidityProtectedKeywordError2;
  class InvalidModifierError2 extends errors_js_1.BaseError {
    constructor({ param, type, modifier }) {
      super("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidModifierError"
      });
    }
  }
  abiParameter.InvalidModifierError = InvalidModifierError2;
  class InvalidFunctionModifierError2 extends errors_js_1.BaseError {
    constructor({ param, type, modifier }) {
      super("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidFunctionModifierError"
      });
    }
  }
  abiParameter.InvalidFunctionModifierError = InvalidFunctionModifierError2;
  class InvalidAbiTypeParameterError2 extends errors_js_1.BaseError {
    constructor({ abiParameter: abiParameter2 }) {
      super("Invalid ABI parameter.", {
        details: JSON.stringify(abiParameter2, null, 2),
        metaMessages: ["ABI parameter type is invalid."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidAbiTypeParameterError"
      });
    }
  }
  abiParameter.InvalidAbiTypeParameterError = InvalidAbiTypeParameterError2;
  return abiParameter;
}
var signature = {};
var hasRequiredSignature;
function requireSignature() {
  if (hasRequiredSignature) return signature;
  hasRequiredSignature = 1;
  Object.defineProperty(signature, "__esModule", { value: true });
  signature.InvalidStructSignatureError = signature.UnknownSignatureError = signature.InvalidSignatureError = void 0;
  const errors_js_1 = requireErrors();
  class InvalidSignatureError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2, type }) {
      super(`Invalid ${type} signature.`, {
        details: signature2
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidSignatureError"
      });
    }
  }
  signature.InvalidSignatureError = InvalidSignatureError2;
  class UnknownSignatureError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2 }) {
      super("Unknown signature.", {
        details: signature2
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "UnknownSignatureError"
      });
    }
  }
  signature.UnknownSignatureError = UnknownSignatureError2;
  class InvalidStructSignatureError2 extends errors_js_1.BaseError {
    constructor({ signature: signature2 }) {
      super("Invalid struct signature.", {
        details: signature2,
        metaMessages: ["No properties exist."]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidStructSignatureError"
      });
    }
  }
  signature.InvalidStructSignatureError = InvalidStructSignatureError2;
  return signature;
}
var struct = {};
var hasRequiredStruct;
function requireStruct() {
  if (hasRequiredStruct) return struct;
  hasRequiredStruct = 1;
  Object.defineProperty(struct, "__esModule", { value: true });
  struct.CircularReferenceError = void 0;
  const errors_js_1 = requireErrors();
  class CircularReferenceError2 extends errors_js_1.BaseError {
    constructor({ type }) {
      super("Circular reference detected.", {
        metaMessages: [`Struct "${type}" is a circular reference.`]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "CircularReferenceError"
      });
    }
  }
  struct.CircularReferenceError = CircularReferenceError2;
  return struct;
}
var utils = {};
var splitParameters = {};
var hasRequiredSplitParameters;
function requireSplitParameters() {
  if (hasRequiredSplitParameters) return splitParameters;
  hasRequiredSplitParameters = 1;
  Object.defineProperty(splitParameters, "__esModule", { value: true });
  splitParameters.InvalidParenthesisError = void 0;
  const errors_js_1 = requireErrors();
  class InvalidParenthesisError2 extends errors_js_1.BaseError {
    constructor({ current, depth }) {
      super("Unbalanced parentheses.", {
        metaMessages: [
          `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
        ],
        details: `Depth "${depth}"`
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "InvalidParenthesisError"
      });
    }
  }
  splitParameters.InvalidParenthesisError = InvalidParenthesisError2;
  return splitParameters;
}
var cache = {};
var hasRequiredCache;
function requireCache() {
  if (hasRequiredCache) return cache;
  hasRequiredCache = 1;
  Object.defineProperty(cache, "__esModule", { value: true });
  cache.parameterCache = void 0;
  cache.getParameterCacheKey = getParameterCacheKey2;
  function getParameterCacheKey2(param, type, structs2) {
    let structKey = "";
    if (structs2)
      for (const struct2 of Object.entries(structs2)) {
        if (!struct2)
          continue;
        let propertyKey = "";
        for (const property of struct2[1]) {
          propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
        }
        structKey += `(${struct2[0]}{${propertyKey}})`;
      }
    if (type)
      return `${type}:${param}${structKey}`;
    return `${param}${structKey}`;
  }
  cache.parameterCache = /* @__PURE__ */ new Map([
    ["address", { type: "address" }],
    ["bool", { type: "bool" }],
    ["bytes", { type: "bytes" }],
    ["bytes32", { type: "bytes32" }],
    ["int", { type: "int256" }],
    ["int256", { type: "int256" }],
    ["string", { type: "string" }],
    ["uint", { type: "uint256" }],
    ["uint8", { type: "uint8" }],
    ["uint16", { type: "uint16" }],
    ["uint24", { type: "uint24" }],
    ["uint32", { type: "uint32" }],
    ["uint64", { type: "uint64" }],
    ["uint96", { type: "uint96" }],
    ["uint112", { type: "uint112" }],
    ["uint160", { type: "uint160" }],
    ["uint192", { type: "uint192" }],
    ["uint256", { type: "uint256" }],
    ["address owner", { type: "address", name: "owner" }],
    ["address to", { type: "address", name: "to" }],
    ["bool approved", { type: "bool", name: "approved" }],
    ["bytes _data", { type: "bytes", name: "_data" }],
    ["bytes data", { type: "bytes", name: "data" }],
    ["bytes signature", { type: "bytes", name: "signature" }],
    ["bytes32 hash", { type: "bytes32", name: "hash" }],
    ["bytes32 r", { type: "bytes32", name: "r" }],
    ["bytes32 root", { type: "bytes32", name: "root" }],
    ["bytes32 s", { type: "bytes32", name: "s" }],
    ["string name", { type: "string", name: "name" }],
    ["string symbol", { type: "string", name: "symbol" }],
    ["string tokenURI", { type: "string", name: "tokenURI" }],
    ["uint tokenId", { type: "uint256", name: "tokenId" }],
    ["uint8 v", { type: "uint8", name: "v" }],
    ["uint256 balance", { type: "uint256", name: "balance" }],
    ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
    ["uint256 value", { type: "uint256", name: "value" }],
    [
      "event:address indexed from",
      { type: "address", name: "from", indexed: true }
    ],
    ["event:address indexed to", { type: "address", name: "to", indexed: true }],
    [
      "event:uint indexed tokenId",
      { type: "uint256", name: "tokenId", indexed: true }
    ],
    [
      "event:uint256 indexed tokenId",
      { type: "uint256", name: "tokenId", indexed: true }
    ]
  ]);
  return cache;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.parseSignature = parseSignature2;
  utils.parseFunctionSignature = parseFunctionSignature2;
  utils.parseEventSignature = parseEventSignature2;
  utils.parseErrorSignature = parseErrorSignature2;
  utils.parseConstructorSignature = parseConstructorSignature2;
  utils.parseFallbackSignature = parseFallbackSignature2;
  utils.parseAbiParameter = parseAbiParameter2;
  utils.splitParameters = splitParameters2;
  utils.isSolidityType = isSolidityType2;
  utils.isSolidityKeyword = isSolidityKeyword2;
  utils.isValidDataLocation = isValidDataLocation2;
  const regex_js_1 = requireRegex();
  const abiItem_js_1 = requireAbiItem();
  const abiParameter_js_1 = requireAbiParameter();
  const signature_js_1 = requireSignature();
  const splitParameters_js_1 = requireSplitParameters();
  const cache_js_1 = requireCache();
  const signatures_js_1 = requireSignatures();
  function parseSignature2(signature2, structs2 = {}) {
    if ((0, signatures_js_1.isFunctionSignature)(signature2))
      return parseFunctionSignature2(signature2, structs2);
    if ((0, signatures_js_1.isEventSignature)(signature2))
      return parseEventSignature2(signature2, structs2);
    if ((0, signatures_js_1.isErrorSignature)(signature2))
      return parseErrorSignature2(signature2, structs2);
    if ((0, signatures_js_1.isConstructorSignature)(signature2))
      return parseConstructorSignature2(signature2, structs2);
    if ((0, signatures_js_1.isFallbackSignature)(signature2))
      return parseFallbackSignature2(signature2);
    if ((0, signatures_js_1.isReceiveSignature)(signature2))
      return {
        type: "receive",
        stateMutability: "payable"
      };
    throw new signature_js_1.UnknownSignatureError({ signature: signature2 });
  }
  function parseFunctionSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execFunctionSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "function" });
    const inputParams = splitParameters2(match.parameters);
    const inputs = [];
    const inputLength = inputParams.length;
    for (let i = 0; i < inputLength; i++) {
      inputs.push(parseAbiParameter2(inputParams[i], {
        modifiers: signatures_js_1.functionModifiers,
        structs: structs2,
        type: "function"
      }));
    }
    const outputs = [];
    if (match.returns) {
      const outputParams = splitParameters2(match.returns);
      const outputLength = outputParams.length;
      for (let i = 0; i < outputLength; i++) {
        outputs.push(parseAbiParameter2(outputParams[i], {
          modifiers: signatures_js_1.functionModifiers,
          structs: structs2,
          type: "function"
        }));
      }
    }
    return {
      name: match.name,
      type: "function",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs,
      outputs
    };
  }
  function parseEventSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execEventSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "event" });
    const params = splitParameters2(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++)
      abiParameters.push(parseAbiParameter2(params[i], {
        modifiers: signatures_js_1.eventModifiers,
        structs: structs2,
        type: "event"
      }));
    return { name: match.name, type: "event", inputs: abiParameters };
  }
  function parseErrorSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execErrorSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "error" });
    const params = splitParameters2(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++)
      abiParameters.push(parseAbiParameter2(params[i], { structs: structs2, type: "error" }));
    return { name: match.name, type: "error", inputs: abiParameters };
  }
  function parseConstructorSignature2(signature2, structs2 = {}) {
    const match = (0, signatures_js_1.execConstructorSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "constructor" });
    const params = splitParameters2(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++)
      abiParameters.push(parseAbiParameter2(params[i], { structs: structs2, type: "constructor" }));
    return {
      type: "constructor",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs: abiParameters
    };
  }
  function parseFallbackSignature2(signature2) {
    const match = (0, signatures_js_1.execFallbackSignature)(signature2);
    if (!match)
      throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "fallback" });
    return {
      type: "fallback",
      stateMutability: match.stateMutability ?? "nonpayable"
    };
  }
  const abiParameterWithoutTupleRegex2 = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
  const abiParameterWithTupleRegex2 = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
  const dynamicIntegerRegex2 = /^u?int$/;
  function parseAbiParameter2(param, options) {
    const parameterCacheKey = (0, cache_js_1.getParameterCacheKey)(param, options?.type, options?.structs);
    if (cache_js_1.parameterCache.has(parameterCacheKey))
      return cache_js_1.parameterCache.get(parameterCacheKey);
    const isTuple = regex_js_1.isTupleRegex.test(param);
    const match = (0, regex_js_1.execTyped)(isTuple ? abiParameterWithTupleRegex2 : abiParameterWithoutTupleRegex2, param);
    if (!match)
      throw new abiParameter_js_1.InvalidParameterError({ param });
    if (match.name && isSolidityKeyword2(match.name))
      throw new abiParameter_js_1.SolidityProtectedKeywordError({ param, name: match.name });
    const name = match.name ? { name: match.name } : {};
    const indexed = match.modifier === "indexed" ? { indexed: true } : {};
    const structs2 = options?.structs ?? {};
    let type;
    let components = {};
    if (isTuple) {
      type = "tuple";
      const params = splitParameters2(match.type);
      const components_ = [];
      const length = params.length;
      for (let i = 0; i < length; i++) {
        components_.push(parseAbiParameter2(params[i], { structs: structs2 }));
      }
      components = { components: components_ };
    } else if (match.type in structs2) {
      type = "tuple";
      components = { components: structs2[match.type] };
    } else if (dynamicIntegerRegex2.test(match.type)) {
      type = `${match.type}256`;
    } else if (match.type === "address payable") {
      type = "address";
    } else {
      type = match.type;
      if (!(options?.type === "struct") && !isSolidityType2(type))
        throw new abiItem_js_1.UnknownSolidityTypeError({ type });
    }
    if (match.modifier) {
      if (!options?.modifiers?.has?.(match.modifier))
        throw new abiParameter_js_1.InvalidModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
      if (signatures_js_1.functionModifiers.has(match.modifier) && !isValidDataLocation2(type, !!match.array))
        throw new abiParameter_js_1.InvalidFunctionModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
    }
    const abiParameter2 = {
      type: `${type}${match.array ?? ""}`,
      ...name,
      ...indexed,
      ...components
    };
    cache_js_1.parameterCache.set(parameterCacheKey, abiParameter2);
    return abiParameter2;
  }
  function splitParameters2(params, result = [], current = "", depth = 0) {
    const length = params.trim().length;
    for (let i = 0; i < length; i++) {
      const char = params[i];
      const tail = params.slice(i + 1);
      switch (char) {
        case ",":
          return depth === 0 ? splitParameters2(tail, [...result, current.trim()]) : splitParameters2(tail, result, `${current}${char}`, depth);
        case "(":
          return splitParameters2(tail, result, `${current}${char}`, depth + 1);
        case ")":
          return splitParameters2(tail, result, `${current}${char}`, depth - 1);
        default:
          return splitParameters2(tail, result, `${current}${char}`, depth);
      }
    }
    if (current === "")
      return result;
    if (depth !== 0)
      throw new splitParameters_js_1.InvalidParenthesisError({ current, depth });
    result.push(current.trim());
    return result;
  }
  function isSolidityType2(type) {
    return type === "address" || type === "bool" || type === "function" || type === "string" || regex_js_1.bytesRegex.test(type) || regex_js_1.integerRegex.test(type);
  }
  const protectedKeywordsRegex2 = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  function isSolidityKeyword2(name) {
    return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || regex_js_1.bytesRegex.test(name) || regex_js_1.integerRegex.test(name) || protectedKeywordsRegex2.test(name);
  }
  function isValidDataLocation2(type, isArray) {
    return isArray || type === "bytes" || type === "string" || type === "tuple";
  }
  return utils;
}
var hasRequiredStructs;
function requireStructs() {
  if (hasRequiredStructs) return structs;
  hasRequiredStructs = 1;
  Object.defineProperty(structs, "__esModule", { value: true });
  structs.parseStructs = parseStructs2;
  const regex_js_1 = requireRegex();
  const abiItem_js_1 = requireAbiItem();
  const abiParameter_js_1 = requireAbiParameter();
  const signature_js_1 = requireSignature();
  const struct_js_1 = requireStruct();
  const signatures_js_1 = requireSignatures();
  const utils_js_1 = requireUtils();
  function parseStructs2(signatures2) {
    const shallowStructs = {};
    const signaturesLength = signatures2.length;
    for (let i = 0; i < signaturesLength; i++) {
      const signature2 = signatures2[i];
      if (!(0, signatures_js_1.isStructSignature)(signature2))
        continue;
      const match = (0, signatures_js_1.execStructSignature)(signature2);
      if (!match)
        throw new signature_js_1.InvalidSignatureError({ signature: signature2, type: "struct" });
      const properties = match.properties.split(";");
      const components = [];
      const propertiesLength = properties.length;
      for (let k = 0; k < propertiesLength; k++) {
        const property = properties[k];
        const trimmed = property.trim();
        if (!trimmed)
          continue;
        const abiParameter2 = (0, utils_js_1.parseAbiParameter)(trimmed, {
          type: "struct"
        });
        components.push(abiParameter2);
      }
      if (!components.length)
        throw new signature_js_1.InvalidStructSignatureError({ signature: signature2 });
      shallowStructs[match.name] = components;
    }
    const resolvedStructs = {};
    const entries = Object.entries(shallowStructs);
    const entriesLength = entries.length;
    for (let i = 0; i < entriesLength; i++) {
      const [name, parameters] = entries[i];
      resolvedStructs[name] = resolveStructs2(parameters, shallowStructs);
    }
    return resolvedStructs;
  }
  const typeWithoutTupleRegex2 = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  function resolveStructs2(abiParameters = [], structs2 = {}, ancestors = /* @__PURE__ */ new Set()) {
    const components = [];
    const length = abiParameters.length;
    for (let i = 0; i < length; i++) {
      const abiParameter2 = abiParameters[i];
      const isTuple = regex_js_1.isTupleRegex.test(abiParameter2.type);
      if (isTuple)
        components.push(abiParameter2);
      else {
        const match = (0, regex_js_1.execTyped)(typeWithoutTupleRegex2, abiParameter2.type);
        if (!match?.type)
          throw new abiParameter_js_1.InvalidAbiTypeParameterError({ abiParameter: abiParameter2 });
        const { array, type } = match;
        if (type in structs2) {
          if (ancestors.has(type))
            throw new struct_js_1.CircularReferenceError({ type });
          components.push({
            ...abiParameter2,
            type: `tuple${array ?? ""}`,
            components: resolveStructs2(structs2[type], structs2, /* @__PURE__ */ new Set([...ancestors, type]))
          });
        } else {
          if ((0, utils_js_1.isSolidityType)(type))
            components.push(abiParameter2);
          else
            throw new abiItem_js_1.UnknownTypeError({ type });
        }
      }
    }
    return components;
  }
  return structs;
}
var hasRequiredParseAbi;
function requireParseAbi() {
  if (hasRequiredParseAbi) return parseAbi;
  hasRequiredParseAbi = 1;
  Object.defineProperty(parseAbi, "__esModule", { value: true });
  parseAbi.parseAbi = parseAbi$12;
  const signatures_js_1 = requireSignatures();
  const structs_js_1 = requireStructs();
  const utils_js_1 = requireUtils();
  function parseAbi$12(signatures2) {
    const structs2 = (0, structs_js_1.parseStructs)(signatures2);
    const abi = [];
    const length = signatures2.length;
    for (let i = 0; i < length; i++) {
      const signature2 = signatures2[i];
      if ((0, signatures_js_1.isStructSignature)(signature2))
        continue;
      abi.push((0, utils_js_1.parseSignature)(signature2, structs2));
    }
    return abi;
  }
  return parseAbi;
}
var parseAbiItem = {};
var hasRequiredParseAbiItem;
function requireParseAbiItem() {
  if (hasRequiredParseAbiItem) return parseAbiItem;
  hasRequiredParseAbiItem = 1;
  Object.defineProperty(parseAbiItem, "__esModule", { value: true });
  parseAbiItem.parseAbiItem = parseAbiItem$12;
  const abiItem_js_1 = requireAbiItem();
  const signatures_js_1 = requireSignatures();
  const structs_js_1 = requireStructs();
  const utils_js_1 = requireUtils();
  function parseAbiItem$12(signature2) {
    let abiItem2;
    if (typeof signature2 === "string")
      abiItem2 = (0, utils_js_1.parseSignature)(signature2);
    else {
      const structs2 = (0, structs_js_1.parseStructs)(signature2);
      const length = signature2.length;
      for (let i = 0; i < length; i++) {
        const signature_ = signature2[i];
        if ((0, signatures_js_1.isStructSignature)(signature_))
          continue;
        abiItem2 = (0, utils_js_1.parseSignature)(signature_, structs2);
        break;
      }
    }
    if (!abiItem2)
      throw new abiItem_js_1.InvalidAbiItemError({ signature: signature2 });
    return abiItem2;
  }
  return parseAbiItem;
}
var parseAbiParameter = {};
var hasRequiredParseAbiParameter;
function requireParseAbiParameter() {
  if (hasRequiredParseAbiParameter) return parseAbiParameter;
  hasRequiredParseAbiParameter = 1;
  Object.defineProperty(parseAbiParameter, "__esModule", { value: true });
  parseAbiParameter.parseAbiParameter = parseAbiParameter$12;
  const abiParameter_js_1 = requireAbiParameter();
  const signatures_js_1 = requireSignatures();
  const structs_js_1 = requireStructs();
  const utils_js_1 = requireUtils();
  function parseAbiParameter$12(param) {
    let abiParameter2;
    if (typeof param === "string")
      abiParameter2 = (0, utils_js_1.parseAbiParameter)(param, {
        modifiers: signatures_js_1.modifiers
      });
    else {
      const structs2 = (0, structs_js_1.parseStructs)(param);
      const length = param.length;
      for (let i = 0; i < length; i++) {
        const signature2 = param[i];
        if ((0, signatures_js_1.isStructSignature)(signature2))
          continue;
        abiParameter2 = (0, utils_js_1.parseAbiParameter)(signature2, { modifiers: signatures_js_1.modifiers, structs: structs2 });
        break;
      }
    }
    if (!abiParameter2)
      throw new abiParameter_js_1.InvalidAbiParameterError({ param });
    return abiParameter2;
  }
  return parseAbiParameter;
}
var parseAbiParameters = {};
var hasRequiredParseAbiParameters;
function requireParseAbiParameters() {
  if (hasRequiredParseAbiParameters) return parseAbiParameters;
  hasRequiredParseAbiParameters = 1;
  Object.defineProperty(parseAbiParameters, "__esModule", { value: true });
  parseAbiParameters.parseAbiParameters = parseAbiParameters$12;
  const abiParameter_js_1 = requireAbiParameter();
  const signatures_js_1 = requireSignatures();
  const structs_js_1 = requireStructs();
  const utils_js_1 = requireUtils();
  const utils_js_2 = requireUtils();
  function parseAbiParameters$12(params) {
    const abiParameters = [];
    if (typeof params === "string") {
      const parameters = (0, utils_js_1.splitParameters)(params);
      const length = parameters.length;
      for (let i = 0; i < length; i++) {
        abiParameters.push((0, utils_js_2.parseAbiParameter)(parameters[i], { modifiers: signatures_js_1.modifiers }));
      }
    } else {
      const structs2 = (0, structs_js_1.parseStructs)(params);
      const length = params.length;
      for (let i = 0; i < length; i++) {
        const signature2 = params[i];
        if ((0, signatures_js_1.isStructSignature)(signature2))
          continue;
        const parameters = (0, utils_js_1.splitParameters)(signature2);
        const length2 = parameters.length;
        for (let k = 0; k < length2; k++) {
          abiParameters.push((0, utils_js_2.parseAbiParameter)(parameters[k], { modifiers: signatures_js_1.modifiers, structs: structs2 }));
        }
      }
    }
    if (abiParameters.length === 0)
      throw new abiParameter_js_1.InvalidAbiParametersError({ params });
    return abiParameters;
  }
  return parseAbiParameters;
}
var hasRequiredExports;
function requireExports() {
  if (hasRequiredExports) return exports$1;
  hasRequiredExports = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CircularReferenceError = exports.InvalidParenthesisError = exports.UnknownSignatureError = exports.InvalidSignatureError = exports.InvalidStructSignatureError = exports.InvalidAbiParameterError = exports.InvalidAbiParametersError = exports.InvalidParameterError = exports.SolidityProtectedKeywordError = exports.InvalidModifierError = exports.InvalidFunctionModifierError = exports.InvalidAbiTypeParameterError = exports.UnknownSolidityTypeError = exports.InvalidAbiItemError = exports.UnknownTypeError = exports.parseAbiParameters = exports.parseAbiParameter = exports.parseAbiItem = exports.parseAbi = exports.formatAbiParameters = exports.formatAbiParameter = exports.formatAbiItem = exports.formatAbi = exports.narrow = exports.BaseError = void 0;
    var errors_js_1 = requireErrors();
    Object.defineProperty(exports, "BaseError", { enumerable: true, get: function() {
      return errors_js_1.BaseError;
    } });
    var narrow_js_1 = requireNarrow();
    Object.defineProperty(exports, "narrow", { enumerable: true, get: function() {
      return narrow_js_1.narrow;
    } });
    var formatAbi_js_1 = requireFormatAbi();
    Object.defineProperty(exports, "formatAbi", { enumerable: true, get: function() {
      return formatAbi_js_1.formatAbi;
    } });
    var formatAbiItem_js_1 = requireFormatAbiItem();
    Object.defineProperty(exports, "formatAbiItem", { enumerable: true, get: function() {
      return formatAbiItem_js_1.formatAbiItem;
    } });
    var formatAbiParameter_js_1 = requireFormatAbiParameter();
    Object.defineProperty(exports, "formatAbiParameter", { enumerable: true, get: function() {
      return formatAbiParameter_js_1.formatAbiParameter;
    } });
    var formatAbiParameters_js_1 = requireFormatAbiParameters();
    Object.defineProperty(exports, "formatAbiParameters", { enumerable: true, get: function() {
      return formatAbiParameters_js_1.formatAbiParameters;
    } });
    var parseAbi_js_1 = requireParseAbi();
    Object.defineProperty(exports, "parseAbi", { enumerable: true, get: function() {
      return parseAbi_js_1.parseAbi;
    } });
    var parseAbiItem_js_1 = requireParseAbiItem();
    Object.defineProperty(exports, "parseAbiItem", { enumerable: true, get: function() {
      return parseAbiItem_js_1.parseAbiItem;
    } });
    var parseAbiParameter_js_1 = requireParseAbiParameter();
    Object.defineProperty(exports, "parseAbiParameter", { enumerable: true, get: function() {
      return parseAbiParameter_js_1.parseAbiParameter;
    } });
    var parseAbiParameters_js_1 = requireParseAbiParameters();
    Object.defineProperty(exports, "parseAbiParameters", { enumerable: true, get: function() {
      return parseAbiParameters_js_1.parseAbiParameters;
    } });
    var abiItem_js_1 = requireAbiItem();
    Object.defineProperty(exports, "UnknownTypeError", { enumerable: true, get: function() {
      return abiItem_js_1.UnknownTypeError;
    } });
    Object.defineProperty(exports, "InvalidAbiItemError", { enumerable: true, get: function() {
      return abiItem_js_1.InvalidAbiItemError;
    } });
    Object.defineProperty(exports, "UnknownSolidityTypeError", { enumerable: true, get: function() {
      return abiItem_js_1.UnknownSolidityTypeError;
    } });
    var abiParameter_js_1 = requireAbiParameter();
    Object.defineProperty(exports, "InvalidAbiTypeParameterError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidAbiTypeParameterError;
    } });
    Object.defineProperty(exports, "InvalidFunctionModifierError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidFunctionModifierError;
    } });
    Object.defineProperty(exports, "InvalidModifierError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidModifierError;
    } });
    Object.defineProperty(exports, "SolidityProtectedKeywordError", { enumerable: true, get: function() {
      return abiParameter_js_1.SolidityProtectedKeywordError;
    } });
    Object.defineProperty(exports, "InvalidParameterError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidParameterError;
    } });
    Object.defineProperty(exports, "InvalidAbiParametersError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidAbiParametersError;
    } });
    Object.defineProperty(exports, "InvalidAbiParameterError", { enumerable: true, get: function() {
      return abiParameter_js_1.InvalidAbiParameterError;
    } });
    var signature_js_1 = requireSignature();
    Object.defineProperty(exports, "InvalidStructSignatureError", { enumerable: true, get: function() {
      return signature_js_1.InvalidStructSignatureError;
    } });
    Object.defineProperty(exports, "InvalidSignatureError", { enumerable: true, get: function() {
      return signature_js_1.InvalidSignatureError;
    } });
    Object.defineProperty(exports, "UnknownSignatureError", { enumerable: true, get: function() {
      return signature_js_1.UnknownSignatureError;
    } });
    var splitParameters_js_1 = requireSplitParameters();
    Object.defineProperty(exports, "InvalidParenthesisError", { enumerable: true, get: function() {
      return splitParameters_js_1.InvalidParenthesisError;
    } });
    var struct_js_1 = requireStruct();
    Object.defineProperty(exports, "CircularReferenceError", { enumerable: true, get: function() {
      return struct_js_1.CircularReferenceError;
    } });
  })(exports$1);
  return exports$1;
}
export {
  Address as A,
  CircularReferenceError as C,
  InvalidAbiItemError as I,
  SolidityProtectedKeywordError as S,
  UnknownSignatureError as U,
  InvalidAbiParametersError as a,
  InvalidAbiTypeParameterError as b,
  InvalidFunctionModifierError as c,
  InvalidModifierError as d,
  InvalidParameterError as e,
  formatAbiItem$2 as f,
  InvalidParenthesisError as g,
  InvalidSignatureError as h,
  InvalidStructSignatureError as i,
  UnknownTypeError as j,
  parseAbiItem$2 as k,
  parseAbiParameters$2 as l,
  formatAbiParameters$2 as m,
  requireExports$1 as n,
  Abi as o,
  parseAbi$2 as p,
  requireExports as r
};
