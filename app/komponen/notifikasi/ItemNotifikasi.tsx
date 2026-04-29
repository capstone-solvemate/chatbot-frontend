import type { Notifikasi } from "~/dasar/notifikasi/Notifikasi";

type Props = {
  notifikasi: Notifikasi;
};

export default function ItemNotifikasi({ notifikasi }: Props) {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0 cursor-pointer">
      {/* Status Dot */}
      <div className="pt-3 shrink-0">
        <span
          className={`block h-2 w-2 rounded-full ${notifikasi.dibacaPada ? "bg-transparent" : "bg-blue-600"}`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <h3
          className={`${notifikasi.dibacaPada ? "font-medium" : "font-bold"} text-gray-900`}
        >
          {notifikasi.judul}
        </h3>

        <p className="text-gray-600">{notifikasi.deskripsi}</p>

        <p className="text-xs text-gray-400">
          {notifikasi.dibuatPada.toString()}
        </p>
      </div>
    </div>
  );
}
