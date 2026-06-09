import { b as base } from "./base-x.mjs";
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs58 = base(ALPHABET);
export {
  bs58 as b
};
