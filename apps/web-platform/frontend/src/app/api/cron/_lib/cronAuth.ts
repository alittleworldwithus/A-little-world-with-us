import { timingSafeEqual } from 'node:crypto'

function getCronSecret(): string | undefined {
  const secret = (process.env.CRON_SECRET || process.env.JOB_SECRET)?.trim()
  return secret || undefined
}

export function isAuthorizedCronRequest(request: Request): boolean {
  const secret = getCronSecret()
  const authorization = request.headers.get('authorization')
  if (!secret || !authorization?.startsWith('Bearer ')) return false

  const provided = Buffer.from(authorization.slice('Bearer '.length), 'utf8')
  const expected = Buffer.from(secret, 'utf8')
  return provided.length === expected.length && timingSafeEqual(provided, expected)
}

export function getCronJobSecretHeaders(): Record<string, string> {
  const secret = getCronSecret()
  if (!secret) throw new Error('Cron job secret is not configured.')
  return { 'x-job-secret': secret }
}
