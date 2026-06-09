// scripts/patch-rollup.js
// Patches rollup/dist/native.js to gracefully fall back to @rollup/wasm-node
// when the platform-specific native binary is missing or corrupt.
//
// This runs automatically after every `npm install` via the postinstall script.
// It handles the case where npm optionalDependencies resolution on one platform
// doesn't install the native binary for another platform (e.g. Linux npm install
// won't fetch the Windows win32-x64-msvc binary).

const fs = require("fs");
const path = require("path");

const nativePath = path.join(__dirname, "..", "node_modules", "rollup", "dist", "native.js");

if (!fs.existsSync(nativePath)) {
  console.warn("[patch-rollup] native.js not found, skipping");
  process.exit(0);
}

const content = fs.readFileSync(nativePath, "utf8");

// Already patched — idempotent
if (content.includes("@rollup/wasm-node")) {
  process.exit(0);
}

const original = `const { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = requireWithFriendlyError(
\texistsSync(path.join(__dirname, localName)) ? localName : \`@rollup/rollup-\${packageBase}\`
);`;

const patched = `let parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16;
try {
\t({ parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = requireWithFriendlyError(
\t\texistsSync(path.join(__dirname, localName)) ? localName : \`@rollup/rollup-\${packageBase}\`,
\t));
} catch {
\tconst wasm = require("@rollup/wasm-node");
\t({ parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = wasm);
}`;

if (!content.includes(original)) {
  console.warn("[patch-rollup] Could not find target code in native.js, skipping");
  process.exit(0);
}

fs.writeFileSync(nativePath, content.replace(original, patched));
console.log("[patch-rollup] Patched rollup/dist/native.js for cross-platform WASM fallback");
