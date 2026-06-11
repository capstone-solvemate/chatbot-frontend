import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import type { Route } from "./+types/HalamanEditPengguna";
import type { OutletContext } from "~/dasar/OutletContext";
import type { Pengguna } from "~/modul/settings/pengguna/data/Pengguna";
import HalamanLoading from "~/dasar/HalamanLoading";
import type { PenggunaResponseDto } from "../../daftar/data/dto/PenggunaResponseDto";
import { dtoToPengguna } from "../../daftar/data/dto/converters";
import type { PenggunaFormData } from "../../form/data/PenggunaFormData";
import PenggunaFormCard from "../../form/ui/PenggunaFormCard";
import type { EditPenggunaDto } from "../data/dto/EditPenggunaDto";
import { HttpError } from "~/dasar/api/rest/KonektorRestApi";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit User" }];
}

export default function HalamanEditPengguna() {
  const { id } = useParams<{ id: string }>();
  const [pengguna, setPengguna] = useState<Pengguna | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { konektorBackend, setMasterError }: OutletContext = useOutletContext();
  const navigate = useNavigate();

  // ── Fetch pengguna by ID ───────────────────────────────────────────────────

  useEffect(() => {
    async function fetchPengguna() {
      try {
        const response = await konektorBackend.get(`/api/admin/pengguna/${id}`);
        const dto: PenggunaResponseDto = await response.json();
        setPengguna(dtoToPengguna(dto));
      } catch (e: any) {
        setMasterError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPengguna();
  }, [id]);

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit(data: PenggunaFormData, isActive: boolean) {
    if (submitting || !pengguna) return;
    setSubmitting(true);
    setServerError(null);

    try {
      const dto: EditPenggunaDto = {
        nama: data.nama,
        email: data.email,
        peran: data.peran,
        is_active: isActive,
        // Hanya kirim password_baru jika diisi
        ...(data.password ? { password_baru: data.password } : {}),
      };

      await konektorBackend.put(`/api/admin/pengguna/${pengguna.id}`, dto);
      navigate("/admin/settings/pengguna");
    } catch (e: any) {
      if (e instanceof HttpError && (e.status === 422 || e.status === 409)) {
        const errors = Array.isArray(e.payload) ? e.payload : [];
        const emailError = errors.find((err: any) => err.field === "email");
        setServerError(
          emailError?.message ?? "Please check the data and try again.",
        );
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

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) return <HalamanLoading />;

  return (
    <main className="grow bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      {/* Page header */}
      <div className="mb-5">
        <button
          onClick={handleCancel}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-3"
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
        <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Update details for{" "}
          <span className="font-medium text-gray-700">{pengguna?.nama}</span>.
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
        oldPengguna={pengguna}
        submitting={submitting}
        onSubmit={(formData) => handleSubmit(formData, pengguna!.isActive)}
        onCancel={handleCancel}
      />
    </main>
  );
}
