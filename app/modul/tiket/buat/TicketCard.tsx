import type React from "react";
import TicketForm from "./TicketForm";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import type { BuatTiketRequestDto } from "./dto/BuatTiketRequestDto";

interface Props {
  daftarKategori: Kategori[];
  idChat: string;
  onSubmit: (payload: BuatTiketRequestDto) => Promise<void>;
}

export default function TicketCard({
  daftarKategori,
  idChat,
  onSubmit,
}: Props): React.JSX.Element {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Create Support Ticket
      </h1>
      <p className="text-sm text-gray-600 mt-2">
        Fill out the form below and our support team will get back to you as
        soon as possible.
      </p>
      <div className="mt-6">
        <TicketForm
          daftarKategori={daftarKategori}
          idChat={idChat}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
