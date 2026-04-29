import { Notifikasi } from "~/dasar/notifikasi/Notifikasi";
import ItemNotifikasi from "./ItemNotifikasi";

type Props = {
  daftarNotifikasi: Notifikasi[];
};

export default function CardNotifikasi({ daftarNotifikasi }: Props) {
  return (
    <div
      className={`
        w-lg
        overflow-hidden
        rounded-2xl
        border
        border-gray-300
        bg-white
        shadow-sm
        absolute
        top-full
        translate-y-3
        right-0
      `}
    >
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
      </div>

      {/* Notifications */}
      <div>
        {daftarNotifikasi.map((notifikasi) => (
          <ItemNotifikasi notifikasi={notifikasi} />
        ))}
        {daftarNotifikasi.length === 0 && (
          <div className="p-4 cursor-default italic text-gray-400 text-sm text-center">
            No notifications yet
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200">
        <button
          className="
            w-full
            py-4
            px-3
            font-medium
            text-blue-600
            disabled:text-gray-300
            enabled:hover:bg-gray-50
            transition
            cursor-pointer
            disabled:cursor-default
          "
          disabled={daftarNotifikasi.length === 0}
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}
