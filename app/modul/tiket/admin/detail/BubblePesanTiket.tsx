import type { PesanTiket } from "./dto/TiketAdminDetail";
import { formatWaktu } from "./formatWaktu";

export default function BubblePesanTiket({
  pesan,
  idPembuatTiket,
}: {
  pesan: PesanTiket;
  idPembuatTiket: number;
}) {
  const waktu = formatWaktu(pesan.waktu);
  const dariKaryawan = pesan.idPembuat === idPembuatTiket;

  if (dariKaryawan) {
    // Karyawan → kiri, putih
    return (
      <div className="flex justify-start">
        <div className="max-w-[75%]">
          <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
            {pesan.isi}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{waktu}</p>
        </div>
      </div>
    );
  }

  // Admin → kanan, biru + avatar
  return (
    <div className="flex justify-end items-end gap-2">
      <div className="max-w-[72%]">
        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          {pesan.isi}
        </div>
        <p className="text-[11px] text-gray-400 mt-1 text-right">{waktu}</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mb-5">
        You
      </div>
    </div>
  );
}
