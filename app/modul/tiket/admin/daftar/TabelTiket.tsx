import type React from "react";
import CardListAdmin from "~/komponen/admin/CardListAdmin";
import FilterTiket from "./FilterTiket";
import TableAdmin from "~/komponen/admin/TableAdmin";
import TableHeaderAdmin from "~/komponen/admin/TableHeaderAdmin";
import TableHeadColAdmin from "~/komponen/admin/TableHeadColAdmin";
import TableColAdmin from "~/komponen/admin/TableColAdmin";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import type { Tiket } from "~/modul/tiket/Tiket";
import { Link } from "react-router";
import { StatusTiket, statusTiketToString } from "../../StatusTiket";

type Props = {
  daftarKategori: Kategori[];
  tikets: Tiket[];
  search: string;
  onChangeSearch: (value: string) => void;
  filterStatus: number;
  onChangeStatus: (value: number) => void;
  filterKategori: number;
  onChangeKategori: (value: number) => void;
};

function StatusBadge({ status }: { status: StatusTiket }) {
  const styles: Record<StatusTiket, string> = {
    [StatusTiket.Open]: "bg-red-100 text-red-700 border border-red-200",
    [StatusTiket.InProgress]:
      "bg-orange-100 text-orange-700 border border-orange-200",
    [StatusTiket.Resolved]:
      "bg-green-100 text-green-700 border border-green-200",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {statusTiketToString(status)}
    </span>
  );
}

export default function TabelTiket({
  daftarKategori,
  tikets,
  search,
  onChangeSearch,
  filterStatus,
  onChangeStatus,
  filterKategori,
  onChangeKategori,
}: Props): React.JSX.Element {
  return (
    <section className="mt-4">
      <CardListAdmin>
        <FilterTiket
          daftarKategori={daftarKategori}
          search={search}
          onChangeSearch={onChangeSearch}
          filterStatus={filterStatus}
          onChangeStatus={onChangeStatus}
          filterKategori={filterKategori}
          onChangeKategori={onChangeKategori}
        />

        <TableAdmin className="mt-8">
          <TableHeaderAdmin>
            <tr>
              <TableHeadColAdmin>TICKET ID</TableHeadColAdmin>
              <TableHeadColAdmin>TITLE</TableHeadColAdmin>
              <TableHeadColAdmin>USER</TableHeadColAdmin>
              <TableHeadColAdmin>CATEGORY</TableHeadColAdmin>
              <TableHeadColAdmin>STATUS</TableHeadColAdmin>
              <TableHeadColAdmin>LAST UPDATE</TableHeadColAdmin>
              <TableHeadColAdmin>ACTIONS</TableHeadColAdmin>
            </tr>
          </TableHeaderAdmin>
          <tbody>
            {tikets.length === 0 ? (
              <tr>
                <TableColAdmin
                  className="italic text-center text-gray-500 text-sm"
                  colSpan={7}
                >
                  No Data
                </TableColAdmin>
              </tr>
            ) : (
              tikets.map((tiket) => {
                const kategori = daftarKategori.find(
                  (k) => k.id === tiket.idKategori,
                );
                return (
                  <tr key={tiket.id} className="hover:bg-gray-50">
                    <TableColAdmin className="text-sm font-mono text-gray-500">
                      #{tiket.id.padStart(3, "0")}
                    </TableColAdmin>
                    <TableColAdmin className="text-sm font-medium max-w-xs truncate">
                      {tiket.judul}
                    </TableColAdmin>
                    <TableColAdmin className="text-sm text-gray-600">
                      {tiket.namaPembuat || ""}
                    </TableColAdmin>
                    <TableColAdmin className="text-sm text-gray-600">
                      {kategori?.nama ?? "-"}
                    </TableColAdmin>
                    <TableColAdmin>
                      <StatusBadge status={tiket.status} />
                    </TableColAdmin>
                    <TableColAdmin className="text-sm text-gray-500">
                      {tiket.diperbaruiPada.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableColAdmin>
                    <TableColAdmin>
                      <Link
                        to={`/tiket/${tiket.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </TableColAdmin>
                  </tr>
                );
              })
            )}
          </tbody>
        </TableAdmin>
      </CardListAdmin>
    </section>
  );
}
