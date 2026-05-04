import type { Kategori } from "~/modul/settings/kategori/Kategori";
import ChipKategori from "../ChipKategori";
import ChipStatusTiket from "../ChipStatusTiket";
import type { StatusTiket } from "../StatusTiket";

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
