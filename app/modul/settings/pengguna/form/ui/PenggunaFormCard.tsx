import { useState } from "react";
import {
  PeranPengguna,
  peranPenggunaToInt,
  intToPeranPengguna,
} from "~/dasar/PeranPengguna";
import type { Pengguna } from "../../data/Pengguna";
import type { PenggunaFormData } from "../data/PenggunaFormData";

// ── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  /**
   * Jika diisi, form berjalan dalam mode edit.
   * Jika null, form berjalan dalam mode tambah.
   */
  oldPengguna: Pengguna | null;
  submitting: boolean;
  /** Dipanggil saat form di-submit dengan data yang valid. */
  onSubmit: (data: PenggunaFormData) => void;
  /** Dipanggil saat user menekan tombol Cancel. */
  onCancel: () => void;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const SEMUA_PERAN = [PeranPengguna.Karyawan, PeranPengguna.Admin] as const;

function peranLabel(peran: PeranPengguna): string {
  return peran === PeranPengguna.Admin ? "Admin" : "Karyawan";
}

// ── Sub-component: field wrapper ──────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PenggunaFormCard({
  oldPengguna,
  submitting,
  onSubmit,
  onCancel,
}: Props) {
  const isEdit = oldPengguna !== null;

  // ── Form state ──────────────────────────────────────────────────────────────

  const [nama, setNama] = useState(oldPengguna?.nama ?? "");
  const [email, setEmail] = useState(oldPengguna?.email ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Peran disimpan sebagai Set of PeranPengguna untuk kemudahan toggle
  const [selectedPeran, setSelectedPeran] = useState<Set<PeranPengguna>>(
    new Set(oldPengguna?.peran ?? [PeranPengguna.Karyawan]),
  );

  // ── Validation errors ───────────────────────────────────────────────────────

  const [errors, setErrors] = useState<
    Partial<Record<keyof PenggunaFormData | "peran", string>>
  >({});

  function validate(): boolean {
    const newErrors: typeof errors = {};

    if (!nama.trim()) newErrors.nama = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!isEdit && !password) {
      newErrors.password = "Password is required.";
    } else if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (selectedPeran.size === 0) {
      newErrors.peran = "Select at least one role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Handlers ────────────────────────────────────────────────────────────────

  function togglePeran(peran: PeranPengguna) {
    setSelectedPeran((prev) => {
      const next = new Set(prev);
      if (next.has(peran)) {
        next.delete(peran);
      } else {
        next.add(peran);
      }
      return next;
    });
  }

  function handleSubmit() {
    if (!validate()) return;

    const data: PenggunaFormData = {
      nama: nama.trim(),
      email: email.trim(),
      password,
      peran: [...selectedPeran].map(peranPenggunaToInt),
    };
    onSubmit(data);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full">
      {/* Header */}
      <h2 className="text-base font-semibold text-gray-800 mb-5">
        {isEdit ? "Edit User" : "Add New User"}
      </h2>

      <div className="flex flex-col gap-4">
        {/* Nama */}
        <Field label="Full Name" htmlFor="nama" error={errors.nama}>
          <input
            id="nama"
            type="text"
            placeholder="e.g. John Doe"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className={`text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors ${
              errors.nama ? "border-red-400" : "border-gray-200"
            }`}
          />
        </Field>

        {/* Email */}
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            placeholder="e.g. john@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors ${
              errors.email ? "border-red-400" : "border-gray-200"
            }`}
          />
        </Field>

        {/* Password */}
        <Field
          label={
            isEdit ? "New Password (leave blank to keep current)" : "Password"
          }
          htmlFor="password"
          error={errors.password}
        >
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={
                isEdit ? "Leave blank to keep current" : "Min. 8 characters"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full text-sm px-3 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors ${
                errors.password ? "border-red-400" : "border-gray-200"
              }`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        {/* Peran */}
        <Field label="Role" error={errors.peran}>
          <div className="flex gap-3">
            {SEMUA_PERAN.map((peran) => {
              const checked = selectedPeran.has(peran);
              return (
                <button
                  key={peran}
                  type="button"
                  onClick={() => togglePeran(peran)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${
                    checked
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {/* Checkbox visual */}
                  <span
                    className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {checked && (
                      <svg
                        className="h-2.5 w-2.5 text-white"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M1.5 5L4 7.5L8.5 2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {peranLabel(peran)}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-6 pt-5 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 font-medium"
        >
          {submitting
            ? isEdit
              ? "Saving..."
              : "Adding..."
            : isEdit
              ? "Save Changes"
              : "Add User"}
        </button>
      </div>
    </div>
  );
}
