import { b as transformEncoder } from "./solana__codecs-core.mjs";
import { e as getStructEncoder } from "./solana__codecs-data-structures.mjs";
import { g as getU32Encoder, d as getU64Encoder } from "./solana__codecs-numbers.mjs";
import { A as AccountRole, u as upgradeRoleToSigner } from "./solana__instructions.mjs";
import { i as isTransactionSigner$1 } from "./solana__signers.mjs";
var SYSTEM_PROGRAM_ADDRESS = "11111111111111111111111111111111";
function expectAddress(value) {
  if (!value) {
    throw new Error("Expected a Address.");
  }
  if (typeof value === "object" && "address" in value) {
    return value.address;
  }
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
function getAccountMetaFactory(programAddress, optionalAccountStrategy) {
  return (account) => {
    if (!account.value) {
      return;
    }
    const writableRole = account.isWritable ? AccountRole.WRITABLE : AccountRole.READONLY;
    return Object.freeze({
      address: expectAddress(account.value),
      role: isTransactionSigner(account.value) ? upgradeRoleToSigner(writableRole) : writableRole,
      ...isTransactionSigner(account.value) ? { signer: account.value } : {}
    });
  };
}
function isTransactionSigner(value) {
  return !!value && typeof value === "object" && "address" in value && isTransactionSigner$1(value);
}
var TRANSFER_SOL_DISCRIMINATOR = 2;
function getTransferSolInstructionDataEncoder() {
  return transformEncoder(
    getStructEncoder([
      ["discriminator", getU32Encoder()],
      ["amount", getU64Encoder()]
    ]),
    (value) => ({ ...value, discriminator: TRANSFER_SOL_DISCRIMINATOR })
  );
}
function getTransferSolInstruction(input, config) {
  const programAddress = SYSTEM_PROGRAM_ADDRESS;
  const originalAccounts = {
    source: { value: input.source ?? null, isWritable: true },
    destination: { value: input.destination ?? null, isWritable: true }
  };
  const accounts = originalAccounts;
  const args = { ...input };
  const getAccountMeta = getAccountMetaFactory();
  return Object.freeze({
    accounts: [
      getAccountMeta(accounts.source),
      getAccountMeta(accounts.destination)
    ],
    data: getTransferSolInstructionDataEncoder().encode(
      args
    ),
    programAddress
  });
}
export {
  getTransferSolInstruction as g
};
