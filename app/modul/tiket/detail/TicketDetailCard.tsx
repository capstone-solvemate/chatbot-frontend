import type { Tiket } from "../Tiket";
import TicketStatusBadges from "./TicketStatusBadges";
import TicketDescription from "./TicketDescription";
import TicketMeta from "./TicketMeta";

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

      <TicketMeta
        dibuatPada={tiket.dibuatPada}
        diperbaruiPada={tiket.diperbaruiPada}
      />
    </div>
  );
}
