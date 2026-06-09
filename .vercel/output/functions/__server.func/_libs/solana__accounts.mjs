import { S as SolanaError, h as SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND, i as SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT } from "./solana__errors.mjs";
import { g as getBase64Encoder } from "./solana__codecs-strings.mjs";
function decodeAccount(encodedAccount, decoder) {
  try {
    if ("exists" in encodedAccount && !encodedAccount.exists) {
      return encodedAccount;
    }
    return Object.freeze({ ...encodedAccount, data: decoder.decode(encodedAccount.data) });
  } catch {
    throw new SolanaError(SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT, {
      address: encodedAccount.address
    });
  }
}
function parseBase64RpcAccount(address, rpcAccount) {
  if (!rpcAccount) return Object.freeze({ address, exists: false });
  const data = getBase64Encoder().encode(rpcAccount.data[0]);
  return Object.freeze({ ...parseBaseAccount(rpcAccount), address, data, exists: true });
}
function parseBaseAccount(rpcAccount) {
  return Object.freeze({
    executable: rpcAccount.executable,
    lamports: rpcAccount.lamports,
    programAddress: rpcAccount.owner,
    space: rpcAccount.space
  });
}
async function fetchEncodedAccount(rpc, address, config = {}) {
  const { abortSignal, ...rpcConfig } = config;
  const response = await rpc.getAccountInfo(address, { ...rpcConfig, encoding: "base64" }).send({ abortSignal });
  return parseBase64RpcAccount(address, response.value);
}
function assertAccountExists(account) {
  if (!account.exists) {
    throw new SolanaError(SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND, { address: account.address });
  }
}
export {
  assertAccountExists as a,
  decodeAccount as d,
  fetchEncodedAccount as f
};
