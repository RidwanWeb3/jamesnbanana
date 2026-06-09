// scripts/patch-rollup.cjs
// Runs after npm install to ensure cross-platform native binaries exist.
//
// Problem: npm optional dependencies are resolved per-platform. When you run
// `npm install` on Windows, npm fetches Windows binaries but removes Linux ones,
// and vice versa. Since this repo is developed on both WSL/Linux and Windows
// (same /mnt/c/ path), we need BOTH sets of binaries present.
//
// Solution: .npmrc sets optional=false. This script manually installs missing
// native binaries using npm pack + tar, which works regardless of platform.

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Ensure a native binary package is installed in node_modules.
 * Uses npm pack + tar to extract directly, bypassing npm's platform filtering.
 */
function ensurePackage(scope, name, version, expectedFile) {
  const dir = scope
    ? path.join(__dirname, "..", "node_modules", scope, name)
    : path.join(__dirname, "..", "node_modules", name);

  if (fs.existsSync(expectedFile)) {
    return; // Already present
  }

  const pkgName = scope ? `${scope}/${name}` : name;
  console.log(`[patch] Installing ${pkgName}@${version}...`);

  try {
    const parentDir = path.join(dir, "..");
    fs.mkdirSync(parentDir, { recursive: true });
    execSync(`npm pack ${pkgName}@${version}`, { cwd: parentDir, stdio: "pipe" });
    const tgz = fs.readdirSync(parentDir).find(f =>
      f.startsWith(name.replace("/", "-")) && f.endsWith(".tgz") && !f.includes(".")
    );
    // More precise tgz matching
    const tgzFile = fs.readdirSync(parentDir).find(f => {
      const base = f.replace(".tgz", "");
      return base.startsWith(name.replace("/", "-")) && f.endsWith(".tgz") && !fs.statSync(path.join(parentDir, f)).isDirectory();
    });
    if (tgzFile) {
      fs.mkdirSync(dir, { recursive: true });
      execSync(`tar xzf "${tgzFile}" -C "${dir}" --strip-components=1`, { cwd: parentDir });
      fs.unlinkSync(path.join(parentDir, tgzFile));
      console.log(`[patch] Installed ${pkgName}`);
    }
  } catch (err) {
    console.warn(`[patch] Failed to install ${pkgName}: ${err.message}`);
  }
}

const platform = process.platform;

// --- Rollup native binaries ---
// Always install both Linux and Windows so the repo works from WSL and PowerShell.
ensurePackage("@rollup", "rollup-linux-x64-gnu", "4.61.1",
  path.join(__dirname, "..", "node_modules", "@rollup", "rollup-linux-x64-gnu", "rollup.linux-x64-gnu.node"));
ensurePackage("@rollup", "rollup-win32-x64-msvc", "4.61.1",
  path.join(__dirname, "..", "node_modules", "@rollup", "rollup-win32-x64-msvc", "rollup.win32-x64-msvc.node"));

// --- esbuild ---
// esbuild uses a different package structure (@esbuild/<platform>-<arch>)
const esbuildVersion = "0.27.7";
if (platform === "linux") {
  // On Linux, ensure Linux esbuild is present (Windows install may have removed it)
  if (!fs.existsSync(path.join(__dirname, "..", "node_modules", "@esbuild", "linux-x64", "bin", "esbuild"))) {
    const parentDir = path.join(__dirname, "..", "node_modules", "@esbuild");
    console.log(`[patch] Installing @esbuild/linux-x64@${esbuildVersion}...`);
    try {
      execSync(`npm pack @esbuild/linux-x64@${esbuildVersion}`, { cwd: parentDir, stdio: "pipe" });
      const tgz = fs.readdirSync(parentDir).find(f => f.startsWith("esbuild-linux-x64-") && f.endsWith(".tgz"));
      if (tgz) {
        fs.mkdirSync(path.join(parentDir, "linux-x64"), { recursive: true });
        execSync(`tar xzf "${tgz}" -C "${parentDir}/linux-x64" --strip-components=1`, { cwd: parentDir });
        fs.unlinkSync(path.join(parentDir, tgz));
        console.log("[patch] Installed @esbuild/linux-x64");
      }
    } catch (err) {
      console.warn(`[patch] Failed: ${err.message}`);
    }
  }
}

// --- lightningcss ---
ensurePackage(null, "lightningcss-linux-x64-gnu", "1.30.2",
  path.join(__dirname, "..", "node_modules", "lightningcss-linux-x64-gnu", "lightningcss.linux-x64-gnu.node"));

// --- tailwindcss oxide ---
ensurePackage("@tailwindcss", "oxide-linux-x64-gnu", "4.3.0",
  path.join(__dirname, "..", "node_modules", "@tailwindcss", "oxide-linux-x64-gnu", "tailwindcss-oxide.linux-x64-gnu.node"));

// --- rolldown ---
ensurePackage("@rolldown", "binding-linux-x64-gnu", "1.0.0-beta.38",
  path.join(__dirname, "..", "node_modules", "@rolldown", "binding-linux-x64-gnu", "rolldown-binding.linux-x64-gnu.node"));

console.log("[patch] Done");
