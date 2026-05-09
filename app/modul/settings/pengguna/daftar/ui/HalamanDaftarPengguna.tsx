import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/HalamanDaftarPengguna";
import type { OutletContext } from "~/dasar/OutletContext";
import HalamanLoading from "~/dasar/HalamanLoading";
import { Button } from "~/komponen/Button";
import IkonTambah from "~/komponen/ikon/IkonTambah";
import IkonEdit from "~/komponen/ikon/IkonEdit";
import IkonHapus from "~/komponen/ikon/IkonHapus";
import type { Pengguna } from "../../data/Pengguna";
import type { PenggunaResponseDto } from "../data/dto/PenggunaResponseDto";
import { dtoToPengguna } from "../data/dto/converters";
import { IkonCari } from "~/komponen/ikon/IkonCari";
import PeranBadge from "./PeranBadge";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";

export function meta({}: Route.MetaArgs) {
  return [{ title: "User Management" }];
}

export default function HalamanDaftarPengguna() {
  const [pengguna, setPengguna] = useState<Pengguna[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [penggunaAkanDihapus, setPenggunaAkanDihapus] =
    useState<Pengguna | null>(null);
  const [menghapus, setMenghapus] = useState(false);

  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  // ── Fetch ──────────────────────────────────────────────────────────────────

  async function getDaftarPengguna() {
    try {
      const params: Record<string, any> = {};
      if (debouncedSearch.trim()) params.cari = debouncedSearch.trim();

      const response = await konektorBackend.get("/api/admin/pengguna", params);
      const dto: PenggunaResponseDto[] = await response.json();
      setPengguna(dto.map(dtoToPengguna));
    } catch (e: any) {
      setMasterError(e);
    }
  }

  useEffect(() => {
    getDaftarPengguna().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) getDaftarPengguna();
  }, [debouncedSearch]);

  // ── Debounce search ────────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Delete ─────────────────────────────────────────────────────────────────

  async function handleKonfirmasiHapus() {
    if (!penggunaAkanDihapus || menghapus) return;
    setMenghapus(true);
    try {
      await konektorBackend.delete(
        `/api/admin/users/${penggunaAkanDihapus.id}`,
      );
      getDaftarPengguna();
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setMenghapus(false);
      setPenggunaAkanDihapus(null);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) return <HalamanLoading />;

  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      {/* Page header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          View and manage all registered users
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-gray-100">
          <span className="font-semibold text-gray-700 shrink-0">
            All Users
          </span>

          <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto w-full sm:w-auto">
            {/* Search */}
            <div className="relative">
              <IkonCari className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 w-full sm:w-52"
              />
            </div>

            {/* Add button */}
            <Button
              className="text-sm! ps-2! pe-3! py-2! gap-1! shrink-0"
              leftIcon={<IkonTambah className="h-5" />}
              onClick={() => {
                /* TODO: open form */
              }}
            >
              Add User
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left font-medium px-5 py-3">Name</th>
                <th className="text-left font-medium px-5 py-3">Email</th>
                <th className="text-left font-medium px-5 py-3">Role</th>
                <th className="text-left font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pengguna.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-400 py-12 text-sm"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                pengguna.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {/* Avatar initial */}
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold shrink-0">
                          {p.nama.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-700">
                          {p.nama}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-3.5 text-gray-500">{p.email}</td>

                    {/* Role badges */}
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.peran.map((r) => (
                          <PeranBadge key={r} peran={r} />
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            /* TODO: open edit form */
                          }}
                        >
                          <IkonEdit className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-100 text-xs text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => setPenggunaAkanDihapus(p)}
                        >
                          <IkonHapus className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {pengguna.length > 0 && (
          <div className="px-5 py-3 text-xs text-gray-400 border-t border-gray-100">
            Showing {pengguna.length} user{pengguna.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {penggunaAkanDihapus && (
        <DeleteConfirmationModal
          pengguna={penggunaAkanDihapus}
          isDeleting={menghapus}
          onConfirm={handleKonfirmasiHapus}
          onCancel={() => setPenggunaAkanDihapus(null)}
        />
      )}
    </main>
  );
}
