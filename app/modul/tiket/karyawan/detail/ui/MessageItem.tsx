import type { PesanTiket } from "~/modul/tiket/PesanTiket";

type Props = {
  pesan: PesanTiket;
  isOwn: boolean;
  idChat: string;
};

const formatDate = (date: Date) =>
  date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export default function MessageItem({ pesan, isOwn, idChat }: Props) {
  const avatar = (
    <div
      className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
        isOwn ? "bg-indigo-500" : "bg-blue-600"
      }`}
    >
      {isOwn ? "US" : "IT"}
    </div>
  );

  const bubble = (
    <div
      className={`rounded-lg p-4 max-w-xl ${
        isOwn ? "bg-indigo-50 ms-8" : "bg-gray-100 me-8"
      }`}
    >
      <p className="text-gray-900">{pesan.pesan}</p>
      <span
        className={`text-xs text-gray-500 block mt-2 ${isOwn ? "text-right" : ""}`}
      >
        {formatDate(pesan.dibuatPada)}
      </span>
    </div>
  );

  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      {avatar}
      <div>
        {pesan.lampiranIds.length > 0 && (
          <div
            className={`flex items-center gap-3 mb-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
          >
            {pesan.lampiranIds.map((lampiranId) => {
              const urlLampiran = `/api/tiket/${idChat}/pesan/${pesan.id}/lampiran/${lampiranId}`;
              return (
                <a
                  type="button"
                  href={urlLampiran}
                  target="_blank"
                  key={lampiranId}
                >
                  <div className="rounded-md overflow-hidden">
                    <img src={urlLampiran} className="w-20 h-20" />
                  </div>
                </a>
              );
            })}
          </div>
        )}
        {bubble}
      </div>
    </div>
  );
}
