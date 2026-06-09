var AccountRole = /* @__PURE__ */ ((AccountRole2) => {
  AccountRole2[AccountRole2["WRITABLE_SIGNER"] = /* 3 */
  3] = "WRITABLE_SIGNER";
  AccountRole2[AccountRole2["READONLY_SIGNER"] = /* 2 */
  2] = "READONLY_SIGNER";
  AccountRole2[AccountRole2["WRITABLE"] = /* 1 */
  1] = "WRITABLE";
  AccountRole2[AccountRole2["READONLY"] = /* 0 */
  0] = "READONLY";
  return AccountRole2;
})(AccountRole || {});
var IS_SIGNER_BITMASK = 2;
var IS_WRITABLE_BITMASK = 1;
function isSignerRole(role) {
  return role >= 2;
}
function isWritableRole(role) {
  return (role & IS_WRITABLE_BITMASK) !== 0;
}
function mergeRoles(roleA, roleB) {
  return roleA | roleB;
}
function upgradeRoleToSigner(role) {
  return role | IS_SIGNER_BITMASK;
}
export {
  AccountRole as A,
  isWritableRole as a,
  isSignerRole as i,
  mergeRoles as m,
  upgradeRoleToSigner as u
};
