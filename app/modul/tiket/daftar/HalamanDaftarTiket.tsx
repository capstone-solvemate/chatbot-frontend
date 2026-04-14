import Navbar from "~/komponen/Navbar";
import type { Route } from "./+types/HalamanDaftarTiket";
import PageHeader from "./PageHeader";
import TicketFilter from "./TicketFilter";
import TicketList from "./TicketList";

export function meta({}: Route.MetaArgs) {
  return [{ title: "My Tickets" }];
}

export default function HalamanDaftarTiket() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pb-8 pt-32 space-y-6">
        <PageHeader />
        <TicketFilter />
        <TicketList />
      </div>
    </div>
  );
}
