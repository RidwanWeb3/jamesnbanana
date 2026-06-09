import { a as assertAccountExists, f as fetchEncodedAccount, d as decodeAccount } from "./solana__accounts.mjs";
import { c as getProgramDerivedAddress, b as getAddressEncoder, d as getAddressDecoder } from "./solana__addresses.mjs";
import { A as AccountRole, u as upgradeRoleToSigner } from "./solana__instructions.mjs";
import { c as getU8Encoder, d as getU64Encoder, e as getU32Decoder, f as getU64Decoder, a as getU8Decoder } from "./solana__codecs-numbers.mjs";
import { g as getOptionDecoder } from "./solana__options.mjs";
import { e as getStructEncoder, k as getStructDecoder, a as getBooleanDecoder, l as getEnumDecoder } from "./solana__codecs-data-structures.mjs";
import { i as isTransactionSigner$1 } from "./solana__signers.mjs";
import { b as transformEncoder } from "./solana__codecs-core.mjs";
function getMintDecoder() {
  return getStructDecoder([
    [
      "mintAuthority",
      getOptionDecoder(getAddressDecoder(), {
        prefix: getU32Decoder(),
        noneValue: "zeroes"
      })
    ],
    ["supply", getU64Decoder()],
    ["decimals", getU8Decoder()],
    ["isInitialized", getBooleanDecoder()],
    [
      "freezeAuthority",
      getOptionDecoder(getAddressDecoder(), {
        prefix: getU32Decoder(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function decodeMint(encodedAccount) {
  return decodeAccount(
    encodedAccount,
    getMintDecoder()
  );
}
async function fetchMint(rpc, address, config) {
  const maybeAccount = await fetchMaybeMint(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}
async function fetchMaybeMint(rpc, address, config) {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeMint(maybeAccount);
}
var AccountState = /* @__PURE__ */ ((AccountState2) => {
  AccountState2[AccountState2["Uninitialized"] = 0] = "Uninitialized";
  AccountState2[AccountState2["Initialized"] = 1] = "Initialized";
  AccountState2[AccountState2["Frozen"] = 2] = "Frozen";
  return AccountState2;
})(AccountState || {});
function getAccountStateDecoder() {
  return getEnumDecoder(AccountState);
}
function getTokenDecoder() {
  return getStructDecoder([
    ["mint", getAddressDecoder()],
    ["owner", getAddressDecoder()],
    ["amount", getU64Decoder()],
    [
      "delegate",
      getOptionDecoder(getAddressDecoder(), {
        prefix: getU32Decoder(),
        noneValue: "zeroes"
      })
    ],
    ["state", getAccountStateDecoder()],
    [
      "isNative",
      getOptionDecoder(getU64Decoder(), {
        prefix: getU32Decoder(),
        noneValue: "zeroes"
      })
    ],
    ["delegatedAmount", getU64Decoder()],
    [
      "closeAuthority",
      getOptionDecoder(getAddressDecoder(), {
        prefix: getU32Decoder(),
        noneValue: "zeroes"
      })
    ]
  ]);
}
function decodeToken(encodedAccount) {
  return decodeAccount(
    encodedAccount,
    getTokenDecoder()
  );
}
async function fetchToken(rpc, address, config) {
  const maybeAccount = await fetchMaybeToken(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}
async function fetchMaybeToken(rpc, address, config) {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeToken(maybeAccount);
}
var ASSOCIATED_TOKEN_PROGRAM_ADDRESS = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
var TOKEN_PROGRAM_ADDRESS = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
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
      return Object.freeze({
        address: programAddress,
        role: AccountRole.READONLY
      });
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
async function findAssociatedTokenPda(seeds, config = {}) {
  const {
    programAddress = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getAddressEncoder().encode(seeds.owner),
      getAddressEncoder().encode(seeds.tokenProgram),
      getAddressEncoder().encode(seeds.mint)
    ]
  });
}
var CREATE_ASSOCIATED_TOKEN_DISCRIMINATOR = 0;
function getCreateAssociatedTokenInstructionDataEncoder() {
  return transformEncoder(
    getStructEncoder([["discriminator", getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: CREATE_ASSOCIATED_TOKEN_DISCRIMINATOR
    })
  );
}
async function getCreateAssociatedTokenInstructionAsync(input, config) {
  const programAddress = ASSOCIATED_TOKEN_PROGRAM_ADDRESS;
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    ata: { value: input.ata ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false }
  };
  const accounts = originalAccounts;
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
  }
  if (!accounts.ata.value) {
    accounts.ata.value = await findAssociatedTokenPda({
      owner: expectAddress(accounts.owner.value),
      tokenProgram: expectAddress(accounts.tokenProgram.value),
      mint: expectAddress(accounts.mint.value)
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value = "11111111111111111111111111111111";
  }
  const getAccountMeta = getAccountMetaFactory(programAddress);
  return Object.freeze({
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.ata),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram)
    ],
    data: getCreateAssociatedTokenInstructionDataEncoder().encode({}),
    programAddress
  });
}
var TRANSFER_CHECKED_DISCRIMINATOR = 12;
function getTransferCheckedInstructionDataEncoder() {
  return transformEncoder(
    getStructEncoder([
      ["discriminator", getU8Encoder()],
      ["amount", getU64Encoder()],
      ["decimals", getU8Encoder()]
    ]),
    (value) => ({ ...value, discriminator: TRANSFER_CHECKED_DISCRIMINATOR })
  );
}
function getTransferCheckedInstruction(input, config) {
  const programAddress = TOKEN_PROGRAM_ADDRESS;
  const originalAccounts = {
    source: { value: input.source ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: false },
    destination: { value: input.destination ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false }
  };
  const accounts = originalAccounts;
  const args = { ...input };
  const remainingAccounts = (args.multiSigners ?? []).map(
    (signer) => ({
      address: signer.address,
      role: AccountRole.READONLY_SIGNER,
      signer
    })
  );
  const getAccountMeta = getAccountMetaFactory(programAddress);
  return Object.freeze({
    accounts: [
      getAccountMeta(accounts.source),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.destination),
      getAccountMeta(accounts.authority),
      ...remainingAccounts
    ],
    data: getTransferCheckedInstructionDataEncoder().encode(
      args
    ),
    programAddress
  });
}
export {
  TOKEN_PROGRAM_ADDRESS as T,
  findAssociatedTokenPda as a,
  fetchToken as b,
  getTransferCheckedInstruction as c,
  fetchMint as f,
  getCreateAssociatedTokenInstructionAsync as g
};
