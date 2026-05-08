// app/test/MockContext.ts
import { vi } from "vitest";
import type { OutletContext } from "~/dasar/OutletContext";
import type { MockKonektorBackend } from "./MockBackend";
import { mockKonektorBackend } from "./MockBackend";

type MockContextOverrides = Partial<Omit<OutletContext, "konektorBackend">> & {
  konektorBackend?: MockKonektorBackend;
};

export function mockContext(overrides?: MockContextOverrides): OutletContext {
  return {
    devMode: false,
    stateOtentikasi: { loading: false, infoPengguna: null } as any,
    konektorBackend: mockKonektorBackend() as any,
    setMasterNotifikasi: vi.fn(),
    setMasterError: vi.fn(),
    promptLogout: vi.fn(),
    stateNotifikasi: null,
    ...overrides,
    ...(overrides?.konektorBackend
      ? { konektorBackend: overrides.konektorBackend as any }
      : {}),
  };
}
