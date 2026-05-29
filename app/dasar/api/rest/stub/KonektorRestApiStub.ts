import { vi } from "vitest"
import type { KonektorRestApi } from "../KonektorRestApi"
import { mockResponse } from "./fetch/ResponseStub"

export function mockKonektorRestApi(overrides: {
  post?: (endpoint: string, data?: any) => Promise<Response>,
  put?: (endpoint: string, data?: any) => Promise<Response>,
  patch?: (endpoint: string, data?: any) => Promise<Response>,
  get?: (endpoint: string, data?: Record<string, any>) => Promise<Response>,
  delete?: (endpoint: string) => Promise<Response>
} = {}): KonektorRestApi {
  return {
    post: overrides.post ?? vi.fn().mockResolvedValue(mockResponse()),
    put: overrides.put ?? vi.fn().mockResolvedValue(mockResponse()),
    patch: overrides.patch ?? vi.fn().mockResolvedValue(mockResponse()),
    get: overrides.get ?? vi.fn().mockResolvedValue(mockResponse()),
    delete: overrides.delete ?? vi.fn().mockResolvedValue(mockResponse()),
  } as unknown as KonektorRestApi
}