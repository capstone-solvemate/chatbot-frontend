import { vi } from "vitest";

export function mockResponseHeaders() {
  return {
    get: vi.fn().mockReturnValue("")
  } as unknown as Headers
}