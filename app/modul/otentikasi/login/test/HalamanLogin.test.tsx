import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  type RenderResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HalamanLogin from "../ui/HalamanLogin";
import { HttpError } from "~/dasar/KonektorBackend";

function makeContext(backend: MockKonektorBackend, setMasterError = vi.fn()) {
  return [undefined, undefined, backend, undefined, setMasterError] as const;
}

// react-router outlet context
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

// localStorage mock (jsdom already provides it, but we control it per-test)
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// location.reload
const reloadMock = vi.fn();
Object.defineProperty(window, "location", {
  writable: true,
  value: { ...window.location, reload: reloadMock },
});

// ---------------------------------------------------------------------------
// Test setup
// ---------------------------------------------------------------------------

import { MemoryRouter, useOutletContext } from "react-router";
import {
  mockKonektorBackend,
  type MockKonektorBackend,
} from "~test/MockBackend";

beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
});

function renderLogin(
  backend: MockKonektorBackend,
  setMasterError = vi.fn(),
): RenderResult {
  (useOutletContext as ReturnType<typeof vi.fn>).mockReturnValue(
    makeContext(backend, setMasterError),
  );
  return render(
    <MemoryRouter>
      <HalamanLogin />
    </MemoryRouter>,
  );
}

describe("HalamanLogin", () => {
  describe("harus render UI minimal", () => {
    it("render pilihan role Employee dan Admin", () => {
      const backend = mockKonektorBackend();
      renderLogin(backend);
      expect(
        screen.getByRole("button", { name: /employee/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /admin/i }),
      ).toBeInTheDocument();
    });

    it("render input Email Address", () => {
      const backend = mockKonektorBackend();
      const { container } = renderLogin(backend);
      const emailInput = container.querySelector(
        'input[type="email"][name="email"]',
      );
      expect(emailInput).toBeInTheDocument();
    });

    it("render input Password", () => {
      const backend = mockKonektorBackend();
      const { container } = renderLogin(backend);
      const passwordInput = container.querySelector(
        'input[type="password"][name="password"]',
      );
      expect(passwordInput).toBeInTheDocument();
    });

    it("render tombol Sign In", () => {
      const backend = mockKonektorBackend();
      renderLogin(backend);
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });
  });

  describe("harus memanggil endpoint backend yang benar", () => {
    it("memanggil endpoint /api/auth/login/employee ketika role Employee dipilih", async () => {
      const backend = mockKonektorBackend();
      const { container } = renderLogin(backend);

      fireEvent.click(screen.getByRole("button", { name: /employee/i }));
      await userEvent.type(
        container.querySelector('input[type="email"][name="email"]')!,
        "user@test.com",
      );
      await userEvent.type(
        container.querySelector('input[type="password"][name="password"]')!,
        "password123",
      );
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() =>
        expect(backend.post).toHaveBeenCalledWith(
          "/api/auth/login/employee",
          expect.objectContaining({ email: "user@test.com" }),
        ),
      );
      expect(reloadMock).toHaveBeenCalledOnce();
    });

    it("memanggil endpoint /api/auth/login/admin ketika role Admin dipilih", async () => {
      const backend = mockKonektorBackend();
      const { container } = renderLogin(backend);

      fireEvent.click(screen.getByRole("button", { name: /admin/i }));
      await userEvent.type(
        container.querySelector('input[type="email"][name="email"]')!,
        "admin@test.com",
      );
      await userEvent.type(
        container.querySelector('input[type="password"][name="password"]')!,
        "password123",
      );
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() =>
        expect(backend.post).toHaveBeenCalledWith(
          "/api/auth/login/admin",
          expect.objectContaining({ email: "admin@test.com" }),
        ),
      );
      expect(reloadMock).toHaveBeenCalledOnce();
    });
  });

  it("jika menerima status 401 dari backend, tampilkan pesan invalid credentials", async () => {
    const backend = mockKonektorBackend({
      post: () => Promise.reject(new HttpError(401, "Unauthorized")),
    });
    const { container } = renderLogin(backend);

    await userEvent.type(
      container.querySelector('input[type="email"][name="email"]')!,
      "wrong@test.com",
    );
    await userEvent.type(
      container.querySelector('input[type="password"][name="password"]')!,
      "wrongpass",
    );
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument(),
    );
  });

  describe("jika terjadi error yang tidak perlu ditangani secara khusus, panggil setMasterError", () => {
    it("panggil setMasterError ketika menerima status 500 dari backend", async () => {
      const error = new HttpError(500, "Unauthorized");
      const backend = mockKonektorBackend({
        post: () => Promise.reject(error),
      });
      const setMasterError = vi.fn();
      const { container } = renderLogin(backend, setMasterError);

      await userEvent.type(
        container.querySelector('input[type="email"][name="email"]')!,
        "user@test.com",
      );
      await userEvent.type(
        container.querySelector('input[type="password"][name="password"]')!,
        "password123",
      );
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => expect(setMasterError).toHaveBeenCalledWith(error));
      expect(
        screen.queryByText(/invalid credentials/i),
      ).not.toBeInTheDocument();
    });

    it("panggil setMasterError ketika terjadi network error", async () => {
      const networkError = new TypeError("Failed to fetch");
      const backend = mockKonektorBackend({
        post: () => Promise.reject(networkError),
      });
      const setMasterError = vi.fn();
      const { container } = renderLogin(backend, setMasterError);

      await userEvent.type(
        container.querySelector('input[type="email"][name="email"]')!,
        "user@test.com",
      );
      await userEvent.type(
        container.querySelector('input[type="password"][name="password"]')!,
        "password123",
      );
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() =>
        expect(setMasterError).toHaveBeenCalledWith(networkError),
      );
    });
  });
});
