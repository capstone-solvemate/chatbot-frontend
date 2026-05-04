// modul/tiket/daftar/TicketList.tsx
import type { Tiket } from "../Tiket";
import TicketCard from "./TicketCard";

type Props = {
  tikets: Tiket[];
};

function formatRelative(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 60) return `${diffMins} minutes ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

export default function TicketList({ tikets }: Props) {
  if (tikets.length === 0) {
    return <p className="text-center text-gray-500 py-12">No tickets found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {tikets.map((tiket) => (
        <TicketCard
          key={tiket.id}
          id={tiket.id}
          title={tiket.judul}
          description={tiket.deskripsi}
          category={tiket.kategori}
          status={tiket.status}
          created={`Created ${formatRelative(tiket.dibuatPada)}`}
          updated={`Updated ${formatRelative(tiket.diperbaruiPada)}`}
        />
      ))}
    </div>
  );
}
