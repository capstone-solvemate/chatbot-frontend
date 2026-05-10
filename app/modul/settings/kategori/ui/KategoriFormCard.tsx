import { useEffect, useRef, useState } from "react";
import type { Kategori } from "../Kategori";
import { Button, ButtonColor } from "~/komponen/Button";
import IkonTutup from "~/komponen/ikon/IkonTutup";
import IkonCheck from "~/komponen/ikon/IkonCheck";

interface Props {
  oldKategori: Kategori | null;
  onClose: (refreshRequired: boolean) => void;
  onSubmit: (nama: string, oldKategori: Kategori | null) => Promise<void>;
  submitting: boolean;
}

export default function KategoriFormCard({
  oldKategori,
  onClose,
  onSubmit,
  submitting,
}: Props) {
  const [nama, setNama] = useState(oldKategori?.nama ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const isEdit = oldKategori !== null;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim() || submitting) return;
    await onSubmit(nama.trim(), oldKategori);
  }

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">
          {isEdit ? "Edit Category" : "New Category"}
        </h2>
        <button
          type="button"
          onClick={() => onClose(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IkonTutup className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="nama-kategori"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Category Name
          </label>
          <input
            id="nama-kategori"
            ref={inputRef}
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="e.g. HR, IT, Finance"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            color={ButtonColor.White}
            className="text-sm! px-4! py-2!"
            onClick={() => onClose(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-sm! px-4! py-2! gap-1!"
            leftIcon={<IkonCheck className="h-4" />}
            disabled={!nama.trim() || submitting}
          >
            {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
