import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCronJobSecretHeaders, isAuthorizedCronRequest } from './cronAuth'

afterEach(() => { vi.unstubAllEnvs() })

describe('getCronJobSecretHeaders', () => {
  it('rejects a missing secret', () => {
    vi.stubEnv('CRON_SECRET', '')
    vi.stubEnv('JOB_SECRET', '')
    expect(() => getCronJobSecretHeaders()).toThrow('Cron job secret is not configured.')
  })
  it('uses CRON_SECRET as x-job-secret', () => {
    vi.stubEnv('CRON_SECRET', 'expected')
    expect(getCronJobSecretHeaders()).toEqual({ 'x-job-secret': 'expected' })
  })
  it('supports JOB_SECRET when CRON_SECRET is absent', () => {
    vi.stubEnv('CRON_SECRET', '')
    vi.stubEnv('JOB_SECRET', 'job-value')
    expect(getCronJobSecretHeaders()).toEqual({ 'x-job-secret': 'job-value' })
  })
  it('only accepts the exact bearer credential', () => {
    vi.stubEnv('CRON_SECRET', 'expected')
    expect(isAuthorizedCronRequest(new Request('https://example.test', { headers: { authorization: 'Bearer expected' } }))).toBe(true)
    expect(isAuthorizedCronRequest(new Request('https://example.test', { headers: { authorization: 'Bearer expected-extra' } }))).toBe(false)
    expect(isAuthorizedCronRequest(new Request('https://example.test', { headers: { authorization: 'Basic expected' } }))).toBe(false)
  })
})
