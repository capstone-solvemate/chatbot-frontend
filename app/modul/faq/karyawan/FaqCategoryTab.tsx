import type { Kategori } from "~/modul/settings/kategori/Kategori";

interface Props {
  kategori: Kategori | null;
  active: boolean;
  onClick: () => void;
}

export default function FaqCategoryTab({ kategori, active, onClick }: Props) {
  return (
    <button
      key={kategori?.id || 0}
      className={`
            rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer
            ${
              active
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-600 border border-gray-200"
            }
          `}
      onClick={onClick}
    >
      {kategori?.nama || "All"}
    </button>
  );
}
