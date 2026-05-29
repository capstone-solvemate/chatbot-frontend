import { vi } from "vitest";
import type { KonektorBackend } from "~/dasar/KonektorBackend";

export type MockKonektorBackend = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
};

export type MockKonektorBackendOptions = {
  get?: (endpoint: string, data?: Record<string, any>) => Promise<Response>;
  post?: (endpoint: string, data?: any) => Promise<Response>;
  patch?: (endpoint: string, data?: any) => Promise<Response>;
  put?: (endpoint: string, data?: any) => Promise<Response>;
  delete?: (endpoint: string) => Promise<Response>;
};
const fallbackImpl = () => Promise.resolve(new Response(null, { status: 200 }));

export function mockResponse(): Response {
  return {
    json: vi.fn().mockResolvedValue({})
  } as unknown as Response
}

export function mockKonektorBackend(
  ovd: MockKonektorBackendOptions = {}
): KonektorBackend {
  return {
    get: ovd.get ?? vi.fn().mockResolvedValue(mockResponse()),
    post: ovd.post ?? vi.fn().mockResolvedValue(mockResponse()),
    patch: ovd.patch ?? vi.fn().mockResolvedValue(mockResponse()),
    put: ovd.put ?? vi.fn().mockResolvedValue(mockResponse()),
    delete: ovd.delete ?? vi.fn().mockResolvedValue(mockResponse()),
  } as unknown as KonektorBackend;
}