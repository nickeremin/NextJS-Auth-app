import type { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  globalSetup: "./tests/e2e/global-setup.ts",
}
export default config
