import { useNavigate } from "react-router";
import type { Notifikasi } from "~/dasar/notifikasi/Notifikasi";
import { NotifikasiTiket } from "~/dasar/notifikasi/NotifikasiTiket";
import { useAppContext } from "~/dasar/hooks/useAppContext";
import { useStateOtentikasi } from "~/dasar/hooks/useStateOtentikasi";
import { PeranPengguna } from "~/dasar/PeranPengguna";

type Props = {
  notifikasi: Notifikasi;
};

function formatWaktu(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ItemNotifikasi({ notifikasi }: Props) {
  const navigate = useNavigate();
  const { markNotifikasiAsRead } = useAppContext();
  const stateOtentikasi = useStateOtentikasi();

  const isClickable = notifikasi instanceof NotifikasiTiket;
  const sudahDibaca = notifikasi.dibacaPada !== null;

  async function handleClick() {
    if (!sudahDibaca) {
      await markNotifikasiAsRead(notifikasi.id);
    }
    if (notifikasi instanceof NotifikasiTiket) {
      if (stateOtentikasi.pengguna?.peran === PeranPengguna.Admin) {
        navigate(`/admin/tiket/${notifikasi.idTiket}`);
      } else {
        navigate(`/tiket/${notifikasi.idTiket}`);
      }
    }
  }

  return (
    <div
      onClick={isClickable ? handleClick : undefined}
      className={`
        flex gap-3 px-4 py-3.5
        border-b border-gray-100 last:border-b-0
        transition-colors
        ${
          isClickable
            ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100"
            : "cursor-default"
        }
        ${!sudahDibaca ? "bg-blue-50/40" : ""}
      `}
    >
      {/* Unread dot */}
      <div className="pt-1.5 shrink-0">
        <span
          className={`block h-2 w-2 rounded-full transition-colors ${
            sudahDibaca ? "bg-transparent" : "bg-blue-500"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <h3
          className={`text-sm ${
            sudahDibaca
              ? "font-normal text-gray-700"
              : "font-semibold text-gray-900"
          } truncate`}
        >
          {notifikasi.judul}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          {notifikasi.deskripsi}
        </p>

        <p className="text-xs text-gray-400 mt-0.5">
          {formatWaktu(notifikasi.dibuatPada)}
        </p>
      </div>
    </div>
  );
}
