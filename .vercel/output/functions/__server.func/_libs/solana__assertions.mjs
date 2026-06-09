import { S as SolanaError, j as SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED, k as SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED } from "./solana__errors.mjs";
function assertDigestCapabilityIsAvailable() {
  if (typeof globalThis.crypto === "undefined" || typeof globalThis.crypto.subtle?.digest !== "function") {
    throw new SolanaError(SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED);
  }
}
function assertKeyExporterIsAvailable() {
  if (typeof globalThis.crypto === "undefined" || typeof globalThis.crypto.subtle?.exportKey !== "function") {
    throw new SolanaError(SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED);
  }
}
export {
  assertDigestCapabilityIsAvailable as a,
  assertKeyExporterIsAvailable as b
};
