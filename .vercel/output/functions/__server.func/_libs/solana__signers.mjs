function isTransactionModifyingSigner(value) {
  return "modifyAndSignTransactions" in value && typeof value.modifyAndSignTransactions === "function";
}
function isTransactionPartialSigner(value) {
  return "signTransactions" in value && typeof value.signTransactions === "function";
}
function isTransactionSendingSigner(value) {
  return "signAndSendTransactions" in value && typeof value.signAndSendTransactions === "function";
}
function isTransactionSigner(value) {
  return isTransactionPartialSigner(value) || isTransactionModifyingSigner(value) || isTransactionSendingSigner(value);
}
function createNoopSigner(address) {
  const out = {
    address,
    signMessages: (messages) => Promise.resolve(messages.map(() => Object.freeze({}))),
    signTransactions: (transactions) => Promise.resolve(transactions.map(() => Object.freeze({})))
  };
  return Object.freeze(out);
}
export {
  createNoopSigner as c,
  isTransactionSigner as i
};
