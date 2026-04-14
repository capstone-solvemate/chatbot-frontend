import ChipKategori from "../ChipKategori";
import ChipStatusTiket from "../ChipStatusTiket";
import { StatusTiket } from "../StatusTiket";

export default function TicketStatusBadges() {
  return (
    <div className="flex gap-3">
      <ChipStatusTiket size="sm" status={StatusTiket.InProgress} withIcon />

      <ChipKategori size="sm" kategori="Equipment" />
    </div>
  );
}
