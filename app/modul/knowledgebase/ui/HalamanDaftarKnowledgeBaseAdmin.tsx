import type { Route } from "./+types/HalamanDaftarKnowledgeBaseAdmin";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import HalamanLoading from "~/dasar/HalamanLoading";
import { KnowledgeBase } from "../data/KnowledgeBase";
import { dtoToKnowledgeBase } from "../data/dto/converters";
import type { KnowledgeBaseResponseDto } from "../data/dto/KnowledgeBaseResponseDto";
import KnowledgeBaseStatusBadge from "./KnowledgeBaseStatusBadge";
import KnowledgeBaseDeleteConfirmation from "./KnowledgeBaseDeleteConfirmation";
import KnowledgeBaseUploadFormCard from "./KnowledgeBaseUploadFormCard";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Knowledge Base Management" }];
}

export default function HalamanDaftarKnowledgeBaseAdmin() {
  const [dokumens, setDokumens] = useState<KnowledgeBase[]>([]);
  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState<number | null>(null);

  const [dokumenAkanDihapus, setDokumenAkanDihapus] =
    useState<KnowledgeBase | null>(null);
  const [menghapus, setMenghapus] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  // — Debounce search 500ms —
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  async function getDokumens() {
    try {
      const params: Record<string, any> = {};
      if (debouncedSearch.trim()) params.judul = debouncedSearch.trim();
      if (filterKategori !== null) params.idKategori = filterKategori;

      const response = await konektorBackend.get(
        "/api/admin/knowledge-base",
        params,
      );
      const dto: KnowledgeBaseResponseDto[] = await response.json();
      setDokumens(dto.map(dtoToKnowledgeBase));
    } catch (e: any) {
      setMasterError(e);
    }
  }

  async function getDaftarKategori() {
    try {
      const response = await konektorBackend.get("/api/admin/categories");
      const dto: any[] = await response.json();
      setDaftarKategori(dto.map(dtoToKategori));
    } catch (e: any) {
      setMasterError(e);
    }
  }

  function getNamaKategori(idKategori: number): string | null {
    return daftarKategori.find((k) => k.id === idKategori)?.nama ?? null;
  }

  // Initial load
  useEffect(() => {
    Promise.all([getDokumens(), getDaftarKategori()]).finally(() =>
      setLoading(false),
    );
  }, []);

  // Re-fetch saat search atau filter berubah
  useEffect(() => {
    if (!loading) getDokumens();
  }, [debouncedSearch, filterKategori]);

  // Scroll ke form saat muncul
  useEffect(() => {
    if (showUploadForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showUploadForm]);

  function handleCloseForm(refreshRequired: boolean) {
    setShowUploadForm(false);
    if (refreshRequired) getDokumens();
  }

  async function handleKonfirmasiHapus() {
    if (!dokumenAkanDihapus || menghapus) return;
    setMenghapus(true);
    try {
      await konektorBackend.delete(
        `/api/admin/knowledge-base/${dokumenAkanDihapus.id}`,
      );
      await getDokumens();
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setMenghapus(false);
      setDokumenAkanDihapus(null);
    }
  }

  function formatDate(date: Date | null): string {
    if (!date) return "-";
    return date.toLocaleDateString("en-CA"); // YYYY-MM-DD
  }

  if (loading) return <HalamanLoading />;

  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Knowledge Base Management
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage documents used by the AI chatbot
        </p>
      </div>

      {/* Upload Form Card atau tombol Upload */}
      {showUploadForm ? (
        <div ref={formRef}>
          <KnowledgeBaseUploadFormCard
            onClose={handleCloseForm}
            konektorBackend={konektorBackend}
            setMasterError={setMasterError}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowUploadForm(true)}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload New Document
        </button>
      )}

      {/* Table Card */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Card Header - Search & Filter */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3">
          <h2 className="text-sm font-semibold text-gray-700 shrink-0">
            Documents
          </h2>

          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <div className="relative">
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-52"
              />
            </div>

            {/* Filter Kategori */}
            <div className="relative">
              <select
                value={filterKategori ?? ""}
                onChange={(e) =>
                  setFilterKategori(
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
                className="pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white text-gray-700 cursor-pointer"
              >
                <option value="">All Category</option>
                {daftarKategori.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama}
                  </option>
                ))}
              </select>
              <svg
                className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* List */}
        {dokumens.length === 0 ? (
          <div className="py-16 text-center">
            <svg
              className="w-10 h-10 mx-auto text-gray-200 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm text-gray-400">
              {search || filterKategori
                ? "No documents match your search."
                : "No documents uploaded yet."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {dokumens.map((dokumen) => {
              const namaKategori = getNamaKategori(dokumen.idKategori);
              const isLocked = dokumen.isPending || dokumen.isProcessing;
              return (
                <li
                  key={dokumen.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* File Icon */}
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* Baris 1: Judul */}
                    <p className="text-sm font-semibold text-gray-800">
                      {dokumen.judul}
                    </p>

                    {/* Baris 2: badge kategori + tipe file + ukuran + status */}
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {namaKategori && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                          {namaKategori}
                        </span>
                      )}
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded">
                        {dokumen.tipeFile}
                      </span>
                      <span className="text-xs text-gray-400">
                        {dokumen.ukuranBerkasFormatted}
                      </span>
                      <KnowledgeBaseStatusBadge status={dokumen.status} />
                    </div>

                    {/* Baris 3: Uploaded by Admin on ... */}
                    <p className="text-xs text-gray-400 mt-1">
                      Uploaded by Admin on {formatDate(dokumen.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={isLocked}
                      title={
                        isLocked
                          ? "Not available while document is being processed"
                          : undefined
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDokumenAkanDihapus(dokumen)}
                      disabled={isLocked}
                      title={
                        isLocked
                          ? "Not available while document is being processed"
                          : undefined
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Footer count */}
        {dokumens.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            {dokumens.length} document{dokumens.length !== 1 ? "s" : ""}
            {search || filterKategori ? " found" : " total"}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {dokumenAkanDihapus && (
        <KnowledgeBaseDeleteConfirmation
          dokumen={dokumenAkanDihapus}
          isDeleting={menghapus}
          onConfirm={handleKonfirmasiHapus}
          onCancel={() => setDokumenAkanDihapus(null)}
        />
      )}
    </main>
  );
}
