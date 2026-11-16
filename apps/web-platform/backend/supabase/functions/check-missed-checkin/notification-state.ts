import { expoTicketsDelivered as validateExpoTickets } from '../_shared/expoPush.ts'

export function getNotificationRetryState(attempts: number, error: string) {
  const failed = attempts >= 5
  return {
    status: failed ? 'failed' as const : 'pending' as const,
    lastError: error.slice(0, 500),
  }
}

export function expoTicketsDelivered(payload: unknown, expectedCount: number): boolean {
  return validateExpoTickets(payload, expectedCount)
}
