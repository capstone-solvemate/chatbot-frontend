import { vi } from "vitest";

export type MockKonektorBackend = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
};

export type MockKonektorBackendOptions = {
  get?: () => Promise<Response>;
  post?: () => Promise<Response>;
  patch?: () => Promise<Response>;
  put?: () => Promise<Response>;
  delete?: () => Promise<Response>;
};
const fallbackImpl = () => Promise.resolve(new Response(null, { status: 200 }));

export function mockKonektorBackend(
  options: MockKonektorBackendOptions = {}
): MockKonektorBackend {
  return {
    get: vi.fn(options.get ?? fallbackImpl),
    post: vi.fn(options.post ?? fallbackImpl),
    patch: vi.fn(options.patch ?? fallbackImpl),
    put: vi.fn(options.put ?? fallbackImpl),
    delete: vi.fn(options.delete ?? fallbackImpl),
  };
}