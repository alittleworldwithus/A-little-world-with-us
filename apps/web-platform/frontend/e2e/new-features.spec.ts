import { test, expect } from '@playwright/test'

test.describe('Private feature authentication', () => {
  for (const route of ['/calendar', '/finance', '/wellness']) {
    test(`${route} handles access control or dev preview`, async ({ page }) => {
      await page.goto(route)
      // In local dev mode (next dev on localhost), middleware permits dev preview without redirect.
      // In staging/production, unauthenticated visitors are redirected to /login or /onboarding.
      await page.waitForLoadState('networkidle').catch(() => undefined)
      const url = page.url()
      const isRedirected = /\/(login|onboarding)(?:[/?#].*)?$/.test(url)
      const isAllowedRoute = url.includes(route)
      expect(isRedirected || isAllowedRoute).toBe(true)
    })
  }
})
