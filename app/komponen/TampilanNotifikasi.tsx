import { useEffect, useRef, useState, type MouseEvent } from "react";
import { IkonNotifikasi } from "./ikon/IkonNotifikasi";
import CardNotifikasi from "./notifikasi/CardNotifikasi";

export default function TampilanNotifikasi() {
  const [dibuka, setDibuka] = useState(false);

  function handleKlikNotifikasi(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setDibuka((dibuka) => !dibuka);
  }

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listenerTutupNotifikasi = (e: PointerEvent) => {
      if (el && !el.current?.contains(e.target as Node)) {
        setDibuka(false);
      }
    };

    document.addEventListener("click", listenerTutupNotifikasi);

    return () => {
      document.removeEventListener("click", listenerTutupNotifikasi);
    };
  }, []);

  return (
    <div className="relative" ref={el}>
      <button
        className={`relative cursor-pointer ${dibuka ? "bg-gray-200" : "hover:bg-gray-100"} w-10 h-10 flex items-center justify-center rounded-full`}
        onClick={handleKlikNotifikasi}
      >
        <IkonNotifikasi className="h-4 w-4 stroke-gray-600" />

        <span className="absolute -right-1 -top-1 flex py-0.5 px-1.5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          2
        </span>
      </button>

      {dibuka && <CardNotifikasi />}
    </div>
  );
}
