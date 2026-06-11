import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/HalamanTambahPengguna";
import type { TambahPenggunaDto } from "../data/dto/TambahPenggunaDto";
import PenggunaFormCard from "../../form/ui/PenggunaFormCard";
import type { PenggunaFormData } from "../../form/data/PenggunaFormData";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import { HttpError } from "~/dasar/api/rest/KonektorRestApi";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add User" }];
}

export default function HalamanTambahPengguna() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();
  const navigate = useNavigate();

  async function handleSubmit(data: PenggunaFormData) {
    if (submitting) return;
    setSubmitting(true);
    setServerError(null);

    try {
      const dto: TambahPenggunaDto = {
        nama: data.nama,
        email: data.email,
        password: data.password,
        peran: data.peran,
      };

      await konektorBackend.post("/api/admin/pengguna", dto);
      navigate("/admin/settings/pengguna");
    } catch (e: any) {
      if (e instanceof HttpError && e.status === 422) {
        // Validation error from server — tampilkan pesan spesifik jika ada
        const msg =
          typeof e.payload === "object" && e.payload?.message
            ? e.payload.message
            : "The email may already be taken. Please check the data and try again.";
        setServerError(msg);
      } else {
        setMasterError(e);
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    navigate("/admin/settings/pengguna");
  }

  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      {/* Page header */}
      <div className="mb-5">
        <button
          onClick={handleCancel}
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-3"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to Users
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Fill in the details below to create a new user account.
        </p>
      </div>

      {/* Server error banner */}
      {serverError && (
        <div className="mb-4 max-w-lg flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          <svg
            className="h-4 w-4 mt-0.5 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 1.5a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 8 1.5ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 5Zm0 6.5a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z"
            />
          </svg>
          <span>{serverError}</span>
        </div>
      )}

      <PenggunaFormCard
        oldPengguna={null}
        submitting={submitting}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </main>
  );
}
