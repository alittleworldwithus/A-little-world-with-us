import { describe, expect, it } from 'vitest'
import { isLocalDevelopmentRequest } from './middleware'

describe('isLocalDevelopmentRequest', () => {
  it('allows only loopback hosts during development', () => {
    expect(isLocalDevelopmentRequest('localhost', 'development')).toBe(true)
    expect(isLocalDevelopmentRequest('127.0.0.1', 'development')).toBe(true)
    expect(isLocalDevelopmentRequest('::1', 'development')).toBe(true)
  })

  it('never enables a production authentication bypass', () => {
    expect(isLocalDevelopmentRequest('alittleworldwithus.com', 'production')).toBe(false)
    expect(isLocalDevelopmentRequest('localhost', 'production')).toBe(false)
  })
})
