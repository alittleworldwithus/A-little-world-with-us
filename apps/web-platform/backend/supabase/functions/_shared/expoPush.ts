export function expoTicketsDelivered(payload: unknown, expectedCount: number): boolean {
  if (!payload || typeof payload !== 'object' || expectedCount < 1) return false
  const rawData = (payload as { data?: unknown }).data
  const data = Array.isArray(rawData)
    ? rawData
    : expectedCount === 1 && rawData && typeof rawData === 'object'
      ? [rawData]
      : null
  if (!data || data.length !== expectedCount) return false
  return data.every((ticket) => Boolean(ticket) && typeof ticket === 'object' && (ticket as { status?: unknown }).status === 'ok')
}
