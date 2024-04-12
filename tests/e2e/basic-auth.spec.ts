import { expect, test } from "@playwright/test"

import {
  APP_URL,
  SIGN_IN_URL,
  TEST_PASSWORD,
  TEST_USERNAME,
} from "./constants/auth"

test("Basic auth", async ({ page }) => {
  await test.step("should login", async () => {
    await page.goto(SIGN_IN_URL)
    await page.locator("data-test=signin-username").fill(TEST_USERNAME)
    await page.locator("data-test=signin-password").fill(TEST_PASSWORD)
    await page.locator("data-test=signin-submit").click()
    await page.waitForURL((url) => url.origin === APP_URL, {
      waitUntil: "networkidle",
    })

    const homeHeader = page.locator("data-test=signin-home")
    const testMsg = `Welcome, ${TEST_USERNAME}`
    await expect(homeHeader).toContainText(testMsg, { ignoreCase: true })
  })
})
