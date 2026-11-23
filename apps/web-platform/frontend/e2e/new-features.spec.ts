import { test, expect } from '@playwright/test'

test.describe('Private feature authentication', () => {
  for (const route of ['/calendar', '/finance', '/wellness']) {
    test(`${route} redirects unauthenticated visitors to login or onboarding`, async ({ page }) => {
      await page.goto(route)
      // Unauthenticated users are redirected to /login.
      // Authenticated users who haven't completed onboarding are redirected to /onboarding.
      await expect(page).toHaveURL(/\/(login|onboarding)(?:[/?#].*)?$/)
    })
  }
})
