#!/usr/bin/env bun
import { $ } from "bun"
import { existsSync } from "fs"
import { homedir } from "os"
import { resolve } from "path"

const RUST_TARGET = Bun.env.TAURI_ENV_TARGET_TRIPLE || "aarch64-apple-darwin"

const sidecarsDir = "src-tauri/sidecars"
const dest = `${sidecarsDir}/opencode-cli-${RUST_TARGET}`

// Candidate binaries in order of preference
const candidates = [
  // 1. Installed CLI from app bundle (known working)
  "/Applications/OpenCode.app/Contents/MacOS/opencode-cli",
  // 2. Installed CLI in home directory
  resolve(homedir(), ".opencode/bin/opencode"),
  // 3. Built binary
  `../opencode/dist/@codingsoft/opencode-darwin-arm64/bin/opencode`,
]

async function isValid(path: string): Promise<boolean> {
  if (!existsSync(path)) return false
  
  try {
    const proc = Bun.spawn([path, "--version"], {
      timeout: 5000,
    })
    const exitCode = await proc.exited
    return exitCode === 0
  } catch {
    return false
  }
}

async function main() {
  // Create sidecars directory
  await $`mkdir -p ${sidecarsDir}`
  
  // Check if current sidecar is valid
  if (await isValid(dest)) {
    console.log(`Sidecar binary is valid: ${dest}`)
    return
  }
  
  // Find a working binary
  for (const path of candidates) {
    if (await isValid(path)) {
      console.log(`Found working binary at ${path}, copying to sidecars...`)
      await $`cp ${path} ${dest}`
      console.log(`Copied to ${dest}`)
      return
    }
  }
  
  console.error("No working binary found! Please build the CLI first with: bun run build --single")
  process.exit(1)
}

await main()
