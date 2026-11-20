import * as SecureStore from 'expo-secure-store'

const STORAGE_KEY = 'a-little-world-vault-wrapped-key'

export type WrappedKeyStorage = {
  ciphertext: string
  iv: string
  salt: string
  version: number
}

function isWrappedKeyStorage(value: unknown): value is WrappedKeyStorage {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const candidate = value as Partial<WrappedKeyStorage>
  return (
    typeof candidate.ciphertext === 'string' && candidate.ciphertext.length > 0 &&
    typeof candidate.iv === 'string' && candidate.iv.length > 0 &&
    typeof candidate.salt === 'string' && candidate.salt.length > 0 &&
    typeof candidate.version === 'number' && Number.isInteger(candidate.version) && candidate.version >= 1
  )
}

export async function saveWrappedKey(data: WrappedKeyStorage): Promise<void> {
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(data))
}

export async function loadWrappedKey(): Promise<WrappedKeyStorage | null> {
  const value = await SecureStore.getItemAsync(STORAGE_KEY)
  if (!value) return null
  try {
    const parsed: unknown = JSON.parse(value)
    return isWrappedKeyStorage(parsed) ? parsed : null
  } catch {
    // A malformed local value must not crash the vault screen. The user can
    // restore it from their recovery material instead.
    return null
  }
}

export async function clearWrappedKey(): Promise<void> {
  await SecureStore.deleteItemAsync(STORAGE_KEY)
}
