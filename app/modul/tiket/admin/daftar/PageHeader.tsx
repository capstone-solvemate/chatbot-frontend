import type React from "react";
import PageSubTitleAdmin from "~/komponen/admin/PageSubTitleAdmin";
import PageTitleAdmin from "~/komponen/admin/PageTitleAdmin";

export default function PageHeader(): React.JSX.Element {
  return (
    <section>
      <PageTitleAdmin>Ticket Management</PageTitleAdmin>
      <PageSubTitleAdmin>View and manage all support tickets</PageSubTitleAdmin>
    </section>
  );
}
