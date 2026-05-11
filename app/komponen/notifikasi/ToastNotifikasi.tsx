import { useEffect, useRef, useState } from "react";
import type { Notifikasi } from "~/dasar/notifikasi/Notifikasi";
import { NotifikasiTiket } from "~/dasar/notifikasi/NotifikasiTiket";
import { IkonNotifikasi } from "~/komponen/ikon/IkonNotifikasi";
import { useNavigate } from "react-router";
import IkonTutup from "../ikon/IkonTutup";
import { PeranPengguna } from "~/dasar/PeranPengguna";

const TOAST_DURATION_MS = 5000;

type Props = {
  notifikasi: Notifikasi;
  onDismiss: () => void;
  peran: PeranPengguna;
};

export default function ToastNotifikasi({
  notifikasi,
  onDismiss,
  peran,
}: Props) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredRef = useRef(false);

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      if (!hoveredRef.current) {
        dismiss();
      }
    }, TOAST_DURATION_MS);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => onDismiss(), 300);
  };

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true));
    startTimer();
    return () => clearTimer();
  }, []);

  const handleMouseEnter = () => {
    hoveredRef.current = true;
    clearTimer();
  };

  const handleMouseLeave = () => {
    hoveredRef.current = false;
    startTimer();
  };

  const handleClick = () => {
    if (notifikasi instanceof NotifikasiTiket) {
      if (peran === PeranPengguna.Admin) {
        navigate(`/admin/tiket/${notifikasi.idTiket}`);
      } else {
        navigate(`/tiket/${notifikasi.idTiket}`);
      }
    }
    dismiss();
  };

  const isClickable = notifikasi instanceof NotifikasiTiket;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isClickable ? handleClick : undefined}
      className={`
        pointer-events-auto
        w-80
        bg-white
        border border-gray-200
        rounded-xl
        shadow-lg
        overflow-hidden
        transition-all duration-300 ease-out
        ${
          visible && !exiting
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-8"
        }
        ${isClickable ? "cursor-pointer hover:bg-gray-50" : "cursor-default"}
      `}
    >
      {/* Progress bar */}
      <div className="h-0.5 bg-gray-100 w-full">
        <div
          className="h-full bg-blue-500 origin-left"
          style={{
            animation: `toast-shrink ${TOAST_DURATION_MS}ms linear forwards`,
          }}
          onAnimationEnd={() => {
            if (!hoveredRef.current) dismiss();
          }}
        />
      </div>

      <div className="flex items-start gap-3 px-4 py-3">
        {/* Icon */}
        <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
          <IkonNotifikasi className="w-3.5 h-3.5 text-blue-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {notifikasi.judul}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {notifikasi.deskripsi}
          </p>
        </div>

        {/* Dismiss */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="shrink-0 mt-0.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <IkonTutup className="w-3.5 h-3.5" />
        </button>
      </div>

      <style>{`
        @keyframes toast-shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
