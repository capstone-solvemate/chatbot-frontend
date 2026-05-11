import type { PesanChat } from "./dto/TiketAdminDetail";
import { formatWaktu } from "./formatWaktu";

export default function BubbleChatHistori({ pesan }: { pesan: PesanChat }) {
  const waktu = formatWaktu(pesan.waktu);

  if (!pesan.dariAsisten) {
    // Karyawan → kanan, biru
    return (
      <div className="flex justify-end">
        <div className="max-w-[72%]">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm flex flex-col">
            <span>{pesan.isi}</span>
            <p className="text-xs text-blue-100 mt-1">{waktu}</p>
          </div>
        </div>
      </div>
    );
  }

  // AI → kiri, putih
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%]">
        <div className="bg-gray-100 border border-gray-200 text-gray-900 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          <span>{pesan.isi}</span>
          <p className="text-xs text-gray-500 mt-1">{waktu}</p>
        </div>
      </div>
    </div>
  );
}
