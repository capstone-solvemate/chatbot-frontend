import type { Kategori } from "../Kategori";
import CardKategori from "./CardKategori";

interface Props {
  daftarKategori: Kategori[];
  onEdit: (kategori: Kategori) => void;
  onHapus: (kategori: Kategori) => void;
}

export default function DaftarKategori({
  daftarKategori,
  onEdit,
  onHapus,
}: Props) {
  if (daftarKategori.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No categories yet</p>
        <p className="text-xs text-gray-400 mt-1">
          Add your first category using the button above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-6">
      {daftarKategori.map((kategori) => (
        <CardKategori
          key={kategori.id}
          kategori={kategori}
          onEdit={onEdit}
          onHapus={onHapus}
        />
      ))}
    </div>
  );
}
