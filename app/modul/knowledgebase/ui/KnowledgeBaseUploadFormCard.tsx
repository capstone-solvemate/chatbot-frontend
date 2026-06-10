import { useEffect, useRef, useState } from "react";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";

interface ValidationError {
  field: string;
  error: string;
  message: string;
}

import type { KnowledgeBase } from "../data/KnowledgeBase";

interface Props {
  onClose: (refreshRequired: boolean) => void;
  konektorBackend: any;
  setMasterError: (e: any) => void;
  dokumenToEdit?: KnowledgeBase;
}

export default function KnowledgeBaseUploadFormCard({
  onClose,
  konektorBackend,
  setMasterError,
  dokumenToEdit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(dokumenToEdit?.judul ?? "");
  const [idKategori, setIdKategori] = useState<number | "">(dokumenToEdit?.idKategori ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);
  const [loadingKategori, setLoadingKategori] = useState(true);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    konektorBackend
      .get("/api/admin/categories")
      .then(async (res: Response) => {
        const dto: any[] = await res.json();
        setDaftarKategori(dto.map(dtoToKategori));
      })
      .catch((e: any) => setMasterError(e))
      .finally(() => setLoadingKategori(false));
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    if (file) clearFieldError("file");
  }

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleUpload() {
    if (uploading) return;
    setFieldErrors({});

    // Client-side validation
    const errors: Record<string, string> = {};
    if (!title.trim()) errors.judul = "this field is required.";
    if (idKategori === "") errors.idKategori = "this field is required.";
    if (!dokumenToEdit && !selectedFile) errors.file = "this field is required.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      if (selectedFile) formData.append("file", selectedFile);
      formData.append("judul", title.trim());
      formData.append("idKategori", String(idKategori));

      const baseUrl: string = (import.meta as any).env.VITE_SITE_URL ?? "";
      const csrfToken =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("csrf_token="))
          ?.split("=")[1] ?? "";

      const method = dokumenToEdit ? "PUT" : "POST";
      const url = dokumenToEdit 
        ? `/api/admin/knowledge-base/${dokumenToEdit.id}`
        : `/api/admin/knowledge-base/upload`;

      const response = await fetch(
        baseUrl.replace(/\/$/, "") + url,
        {
          method,
          headers: { "X-CSRF-Token": csrfToken },
          body: formData,
          credentials: "include",
        },
      );

      if (response.status === 422) {
        const validationErrors: ValidationError[] = await response.json();
        const mapped: Record<string, string> = {};
        for (const ve of validationErrors) {
          mapped[ve.field] = ve.message;
        }
        setFieldErrors(mapped);
        return;
      }

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message ?? (dokumenToEdit ? "Edit failed" : "Upload failed"));
      }

      onClose(true);
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-5 bg-white rounded-xl border-2 border-gray-300 shadow-sm">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">
          {dokumenToEdit ? "Edit Document" : "Upload New Document"}
        </h2>
      </div>

      {/* Form Body */}
      <div className="px-6 py-5 space-y-4">
        {/* Document Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Document Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              clearFieldError("judul");
            }}
            placeholder="e.g. Network Configuration Guide"
            className={`w-full px-3 py-2 text-sm rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${
              fieldErrors.judul ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {fieldErrors.judul && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.judul}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={idKategori}
              onChange={(e) => {
                setIdKategori(
                  e.target.value === "" ? "" : Number(e.target.value),
                );
                clearFieldError("idKategori");
              }}
              disabled={loadingKategori}
              className={`w-full px-3 py-2 text-sm rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 disabled:opacity-60 ${
                fieldErrors.idKategori
                  ? "border-red-400 bg-red-50 text-gray-700"
                  : "border-gray-200 bg-gray-50 text-gray-700"
              }`}
            >
              <option value="">
                {loadingKategori
                  ? "Loading categories..."
                  : "Select a category"}
              </option>
              {daftarKategori.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nama}
                </option>
              ))}
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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
          {fieldErrors.idKategori && (
            <p className="mt-1 text-xs text-red-500">
              {fieldErrors.idKategori}
            </p>
          )}
        </div>

        {/* Upload File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dokumenToEdit ? "Replace File (Optional)" : "Upload File"}
          </label>
          <div
            className={`flex items-center w-full rounded-lg border overflow-hidden cursor-pointer ${
              fieldErrors.file
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-gray-50"
            }`}
            onClick={() => inputRef.current?.click()}
          >
            <span className="px-3 py-2 text-sm text-gray-600 bg-gray-100 border-r border-gray-200 shrink-0 select-none">
              Choose File
            </span>
            <span className="px-3 py-2 text-sm text-gray-500 truncate flex-1 select-none">
              {selectedFile?.name ?? (dokumenToEdit ? "Leave empty to keep current file" : "No file chosen")}
            </span>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.txt,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {fieldErrors.file ? (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.file}</p>
          ) : (
            <p className="mt-1.5 text-xs text-gray-400">
              Supported formats: PDF, TXT, DOC, DOCX
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-5 flex items-center gap-2">
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
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
          {uploading ? (dokumenToEdit ? "Saving..." : "Uploading...") : (dokumenToEdit ? "Save Changes" : "Upload Document")}
        </button>
        <button
          type="button"
          onClick={() => onClose(false)}
          disabled={uploading}
          className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
