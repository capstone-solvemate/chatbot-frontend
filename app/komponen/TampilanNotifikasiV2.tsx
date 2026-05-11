import { useEffect, useRef, useState, type MouseEvent } from "react";
import { IkonNotifikasi } from "./ikon/IkonNotifikasi";
import CardNotifikasi from "./notifikasi/CardNotifikasi";
import { useStateNotifikasi } from "~/dasar/hooks/useStateNotifikasi";

export default function TampilanNotifikasiV2() {
  const stateNotifikasi = useStateNotifikasi();
  const [dibuka, setDibuka] = useState(false);
  const el = useRef<HTMLDivElement>(null);

  function handleKlikNotifikasi(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setDibuka((prev) => !prev);
  }

  useEffect(() => {
    const listenerTutup = (e: PointerEvent) => {
      if (el.current && !el.current.contains(e.target as Node)) {
        setDibuka(false);
      }
    };
    document.addEventListener("click", listenerTutup);
    return () => document.removeEventListener("click", listenerTutup);
  }, []);

  return (
    <div className="relative" ref={el}>
      <button
        className={`
          relative cursor-pointer
          ${dibuka ? "bg-gray-200" : "enabled:hover:bg-gray-100"}
          text-gray-600 disabled:text-gray-300
          w-10 h-10 flex items-center justify-center rounded-full
          transition-colors
        `}
        onClick={handleKlikNotifikasi}
        disabled={stateNotifikasi === null}
      >
        <IkonNotifikasi className="h-4 w-4" />

        {(stateNotifikasi?.jumlahBelumDibaca ?? 0) > 0 && (
          <span className="absolute -right-1 -top-1 flex min-w-5 h-5 py-0.5 px-1.5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
            {stateNotifikasi!.jumlahBelumDibaca > 99
              ? "99+"
              : stateNotifikasi!.jumlahBelumDibaca}
          </span>
        )}
      </button>

      {dibuka && stateNotifikasi !== null && (
        <CardNotifikasi
          daftarNotifikasi={stateNotifikasi.notifikasi}
          adaLebihBanyak={stateNotifikasi.adaLebihBanyak}
        />
      )}
    </div>
  );
}
