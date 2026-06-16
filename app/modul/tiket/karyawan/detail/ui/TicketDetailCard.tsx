import TicketStatusBadges from "./TicketStatusBadges";
import TicketDescription from "./TicketDescription";
import TicketMeta from "./TicketMeta";
import type { Tiket } from "~/modul/tiket/Tiket";

type Props = { tiket: Tiket };

export default function TicketDetailCard({ tiket }: Props) {
  function force3Digits(data: string) {
    return data.padStart(3, "0");
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3 sm:space-y-5">
      <div>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
          Ticket #{force3Digits(tiket.id)}
        </h1>
        <p className="text-gray-700 text-base sm:text-xl mt-1">{tiket.judul}</p>
      </div>

      <TicketStatusBadges status={tiket.status} kategori={tiket.kategori} />

      <hr className="border-gray-200" />

      <TicketDescription deskripsi={tiket.deskripsi} />

      <hr className="border-gray-200" />

      {tiket.lampiranIds.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Attachments</h3>
          <div className="flex items-center gap-3">
            {tiket.lampiranIds.map((lampiranId) => {
              const urlLampiran = `/api/tiket/${tiket.idChat}/lampiran/${lampiranId}`;
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
        </div>
      )}

      <TicketMeta
        dibuatPada={tiket.dibuatPada}
        diperbaruiPada={tiket.diperbaruiPada}
      />
    </div>
  );
}
