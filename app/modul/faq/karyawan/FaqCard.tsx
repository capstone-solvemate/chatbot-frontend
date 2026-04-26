import type { Kategori } from "~/modul/settings/kategori/Kategori";

type FaqCardProps = {
  question: string;
  kategori: Kategori | null;
};

export default function FaqCard({ question, kategori }: FaqCardProps) {
  return (
    <button className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left shadow-sm transition hover:border-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-800">{question}</h3>

          {kategori && (
            <span className="mt-3 inline-block rounded bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-600">
              {kategori.nama}
            </span>
          )}
        </div>

        <div className="ml-4 text-gray-400">{/* Chevron Right Icon */}</div>
      </div>
    </button>
  );
}
