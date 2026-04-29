import type React from "react";
import CardListAdmin from "~/komponen/admin/CardListAdmin";
import FilterTiket from "./FilterTiket";
import TableAdmin from "~/komponen/admin/TableAdmin";
import TableHeaderAdmin from "~/komponen/admin/TableHeaderAdmin";
import TableHeadColAdmin from "~/komponen/admin/TableHeadColAdmin";
import TableColAdmin from "~/komponen/admin/TableColAdmin";

export default function TabelTiket(): React.JSX.Element {
  return (
    <section className="mt-4">
      <CardListAdmin>
        <FilterTiket />

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
            <tr>
              <TableColAdmin
                className="italic text-center text-gray-500 text-sm"
                colSpan={7}
              >
                No Data
              </TableColAdmin>
            </tr>
          </tbody>
        </TableAdmin>
      </CardListAdmin>
    </section>
  );
}
