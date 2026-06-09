import { i as isAddress } from "./solana__addresses.mjs";
function isBlockhash(putativeBlockhash) {
  return isAddress(putativeBlockhash);
}
export {
  isBlockhash as i
};
