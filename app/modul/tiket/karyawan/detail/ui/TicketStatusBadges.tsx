import type { Kategori } from "~/modul/settings/kategori/Kategori";
import ChipKategori from "~/modul/tiket/ChipKategori";
import ChipStatusTiket from "~/modul/tiket/ChipStatusTiket";
import type { StatusTiket } from "~/modul/tiket/StatusTiket";

type Props = {
  status: StatusTiket;
  kategori: Kategori | null;
};

export default function TicketStatusBadges({ status, kategori }: Props) {
  return (
    <div className="flex gap-3">
      <ChipStatusTiket size="sm" status={status} withIcon />
      {kategori && <ChipKategori size="sm" kategori={kategori} />}
    </div>
  );
}
