import { b as transformEncoder, f as fixEncoderSize } from "./solana__codecs-core.mjs";
import { e as getStructEncoder, j as getBytesEncoder, i as getArrayEncoder } from "./solana__codecs-data-structures.mjs";
import { b as getShortU16Encoder } from "./solana__codecs-numbers.mjs";
import { S as SolanaError, E as SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES } from "./solana__errors.mjs";
import { d as compileTransactionMessage, g as getCompiledTransactionMessageEncoder, i as isTransactionMessageWithBlockhashLifetime, e as isTransactionMessageWithDurableNonceLifetime } from "./solana__transaction-messages.mjs";
import { c as getBase64Decoder } from "./solana__codecs-strings.mjs";
function getSignaturesToEncode(signaturesMap) {
  const signatures = Object.values(signaturesMap);
  if (signatures.length === 0) {
    throw new SolanaError(SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES);
  }
  return signatures.map((signature) => {
    if (!signature) {
      return new Uint8Array(64).fill(0);
    }
    return signature;
  });
}
function getSignaturesEncoder() {
  return transformEncoder(
    getArrayEncoder(fixEncoderSize(getBytesEncoder(), 64), { size: getShortU16Encoder() }),
    getSignaturesToEncode
  );
}
function getTransactionEncoder() {
  return getStructEncoder([
    ["signatures", getSignaturesEncoder()],
    ["messageBytes", getBytesEncoder()]
  ]);
}
function compileTransaction(transactionMessage) {
  const compiledMessage = compileTransactionMessage(transactionMessage);
  const messageBytes = getCompiledTransactionMessageEncoder().encode(compiledMessage);
  const transactionSigners = compiledMessage.staticAccounts.slice(0, compiledMessage.header.numSignerAccounts);
  const signatures = {};
  for (const signerAddress of transactionSigners) {
    signatures[signerAddress] = null;
  }
  let lifetimeConstraint;
  if (isTransactionMessageWithBlockhashLifetime(transactionMessage)) {
    lifetimeConstraint = {
      blockhash: transactionMessage.lifetimeConstraint.blockhash,
      lastValidBlockHeight: transactionMessage.lifetimeConstraint.lastValidBlockHeight
    };
  } else if (isTransactionMessageWithDurableNonceLifetime(transactionMessage)) {
    lifetimeConstraint = {
      nonce: transactionMessage.lifetimeConstraint.nonce,
      nonceAccountAddress: transactionMessage.instructions[0].accounts[0].address
    };
  }
  return Object.freeze({
    ...lifetimeConstraint ? { lifetimeConstraint } : void 0,
    messageBytes,
    signatures: Object.freeze(signatures)
  });
}
function getBase64EncodedWireTransaction(transaction) {
  const wireTransactionBytes = getTransactionEncoder().encode(transaction);
  return getBase64Decoder().decode(wireTransactionBytes);
}
export {
  compileTransaction as c,
  getBase64EncodedWireTransaction as g
};
