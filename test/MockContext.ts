// app/test/MockContext.ts
import { vi } from "vitest";
import type { OutletContext } from "~/dasar/OutletContext";
import { mockKonektorBackend } from "./stub/KonektorBackendStub";
import type { KonektorBackend } from "~/dasar/KonektorBackend";

type MockContextOverrides = Partial<Omit<OutletContext, "konektorBackend">> & {
  konektorBackend?: KonektorBackend;
};

export function mockContext(overrides: MockContextOverrides = {}): OutletContext {
  return {
    devMode: false,
    stateOtentikasi: { loading: false, infoPengguna: null } as any,
    konektorBackend: overrides.konektorBackend ?? mockKonektorBackend(),
    setMasterNotifikasi: vi.fn(),
    setMasterError: vi.fn(),
    promptLogout: vi.fn(),
    stateNotifikasi: null,
    loadMoreNotifikasi: vi.fn(),
    markAllNotifikasiAsRead: vi.fn(),
    markNotifikasiAsRead: vi.fn()
  };
}