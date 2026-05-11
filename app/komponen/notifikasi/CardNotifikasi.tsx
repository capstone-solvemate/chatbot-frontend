import { useEffect, useRef, useState } from "react";
import type { Notifikasi } from "~/dasar/notifikasi/Notifikasi";
import ItemNotifikasi from "./ItemNotifikasi";
import { useAppContext } from "~/dasar/hooks/useAppContext";

type Props = {
  daftarNotifikasi: Notifikasi[];
  adaLebihBanyak: boolean;
};

export default function CardNotifikasi({
  daftarNotifikasi,
  adaLebihBanyak,
}: Props) {
  const { loadMoreNotifikasi, markAllNotifikasiAsRead } = useAppContext();
  const [loadingMore, setLoadingMore] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && adaLebihBanyak && !loadingMore) {
          setLoadingMore(true);
          try {
            await loadMoreNotifikasi();
          } finally {
            setLoadingMore(false);
          }
        }
      },
      { root: scrollRef.current, threshold: 0.1 },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [adaLebihBanyak, loadingMore, loadMoreNotifikasi]);

  async function handleMarkAll() {
    if (markingAll) return;
    setMarkingAll(true);
    try {
      await markAllNotifikasiAsRead();
    } finally {
      setMarkingAll(false);
    }
  }

  const adaYangBelumDibaca = daftarNotifikasi.some((n) => !n.dibacaPada);

  return (
    <div
      className={`
        w-80 sm:w-96
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-lg
        absolute
        top-full
        translate-y-3
        right-0
      `}
    >
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
      </div>

      {/* List */}
      <div ref={scrollRef} className="overflow-y-auto max-h-96">
        {daftarNotifikasi.map((notifikasi) => (
          <ItemNotifikasi
            key={notifikasi.id.toString()}
            notifikasi={notifikasi}
          />
        ))}

        {daftarNotifikasi.length === 0 && (
          <div className="py-10 px-4 text-center">
            <p className="text-sm text-gray-400 italic">No notifications yet</p>
          </div>
        )}

        {/* Sentinel untuk IntersectionObserver */}
        <div ref={sentinelRef} className="h-1" />

        {/* Loading more indicator */}
        {loadingMore && (
          <div className="flex justify-center py-3">
            <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          </div>
        )}

        {/* End of list */}
        {!adaLebihBanyak && daftarNotifikasi.length > 0 && (
          <p className="text-center text-xs text-gray-300 py-3">
            All caught up
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100">
        <button
          className="
            w-full
            py-3
            px-4
            text-sm
            font-medium
            text-blue-600
            disabled:text-gray-300
            enabled:hover:bg-gray-50
            transition
            cursor-pointer
            disabled:cursor-default
          "
          disabled={!adaYangBelumDibaca || markingAll}
          onClick={handleMarkAll}
        >
          {markingAll ? "Marking..." : "Mark all as read"}
        </button>
      </div>
    </div>
  );
}
