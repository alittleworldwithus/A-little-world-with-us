import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { fetchWithTimeout } = vi.hoisted(() => ({
  fetchWithTimeout: vi.fn(),
}))

vi.mock('@/lib/ai/request-client', () => ({ fetchWithTimeout }))

import { generateAiResponse } from './providers'

describe('Gemini provider request security', () => {
  beforeEach(() => {
    vi.stubEnv('GEMINI_API_KEY', 'test-gemini-key')
    vi.stubEnv('AI_GEMINI_MODEL', 'gemini-2.5-flash')
    fetchWithTimeout.mockReset()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('sends the API key only in the x-goog-api-key header, never in the URL', async () => {
    fetchWithTimeout.mockResolvedValue(new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: 'Hello from Gemini' }] } }],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }))

    const result = await generateAiResponse({
      messages: [{ role: 'user', content: 'Hello' }],
      provider: 'gemini',
      allowedProviders: ['gemini'],
    })

    expect(result).toEqual({ content: 'Hello from Gemini', provider: 'gemini' })
    const [url, init] = fetchWithTimeout.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent')
    expect(url).not.toContain('test-gemini-key')
    expect(init.headers).toEqual({
      'Content-Type': 'application/json',
      'x-goog-api-key': 'test-gemini-key',
    })
  })
})
