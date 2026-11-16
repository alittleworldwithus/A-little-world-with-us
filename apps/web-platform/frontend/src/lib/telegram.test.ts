import { afterEach, describe, expect, it, vi } from 'vitest'
vi.mock('server-only', () => ({}))
import { escapeTelegramHtml } from './telegram'

describe('escapeTelegramHtml', () => {
  it('escapes HTML metacharacters and quotes', () => {
    expect(escapeTelegramHtml('<script>alert("x")</script> & \'ok\'')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;ok&#39;')
  })
  it('preserves ordinary text', () => {
    expect(escapeTelegramHtml('Safety check-in')).toBe('Safety check-in')
  })
})

import { answerTelegramCallbackQuery, sendTelegramNotification } from './telegram'

describe('sendTelegramNotification', () => {
  it('escapes untrusted details before sending an HTML-mode message', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_CHAT_ID', 'test-chat')
    vi.stubEnv('TELEGRAM_ENABLED', 'true')
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    await sendTelegramNotification({ title: 'Notice', details: '<b>untrusted</b> & details', status: 'INFO' })
    const request = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body)) as { text: string; parse_mode: string }
    expect(request.parse_mode).toBe('HTML')
    expect(request.text).toContain('&lt;b&gt;untrusted&lt;/b&gt; &amp; details')
  })
})

describe('answerTelegramCallbackQuery', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('calls Telegram answerCallbackQuery with the callback query ID', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_ENABLED', 'true')
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(answerTelegramCallbackQuery('callback-123')).resolves.toBe(true)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.telegram.org/bottest-token/answerCallbackQuery',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ callback_query_id: 'callback-123' }),
      })
    )
  })

  it('returns false when Telegram rejects the callback acknowledgement', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_ENABLED', 'true')
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false, error_code: 400 }), { status: 400 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(answerTelegramCallbackQuery('callback-123')).resolves.toBe(false)
  })

  it('does not make a network request when the bot is disabled', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_ENABLED', 'false')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(answerTelegramCallbackQuery('callback-123')).resolves.toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
