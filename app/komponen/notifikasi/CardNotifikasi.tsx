import { Notifikasi } from "~/dasar/notifikasi/Notifikasi";
import ItemNotifikasi from "./ItemNotifikasi";

export default function CardNotifikasi() {
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
        <ItemNotifikasi
          notifikasi={
            new Notifikasi(
              0,
              0,
              "Ticket #001 Update",
              "Ticket #001 is being processed by our team",
              new Date(),
              null,
            )
          }
        />

        <ItemNotifikasi
          notifikasi={
            new Notifikasi(
              0,
              0,
              "Ticket #002 Resolved",
              "Ticket #002 has been resolved",
              new Date(),
              new Date(),
            )
          }
        />
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
            hover:bg-gray-50
            transition
            cursor-pointer
          "
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}
