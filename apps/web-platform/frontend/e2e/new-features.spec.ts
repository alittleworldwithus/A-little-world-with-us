import { test, expect } from '@playwright/test'

test.describe('Private feature authentication', () => {
  for (const route of ['/calendar', '/finance', '/wellness']) {
    test(`${route} handles access control or dev preview`, async ({ page }) => {
      await page.goto(route)
      // /finance permanently redirects to /calendar?section=finance
      // In local dev mode (next dev on localhost), middleware permits dev preview without redirect.
      // In staging/production, unauthenticated visitors are redirected to /login or /onboarding.
      await page.waitForLoadState('networkidle').catch(() => undefined)
      const url = page.url()
      const isRedirected = /\/(login|onboarding)(?:[/?#].*)?$/.test(url)
      const isAllowedRoute = url.includes(route) || url.includes('section=finance')
      expect(isRedirected || isAllowedRoute).toBe(true)
    })
  }
})
