import { vi } from "vitest"
import { mockResponseHeaders } from "./ResponseHeadersStub"

export function mockResponse(overrides: {
  json?: () => Promise<object | object[]>
  headers?: Headers
} = {}): Response {
  return {
    json: overrides.json ?? vi.fn().mockResolvedValue({}),
    headers: overrides.headers ?? mockResponseHeaders()
  } as unknown as Response
}