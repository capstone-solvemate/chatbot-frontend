import type React from "react";
import type { Route } from "./+types/HalamanDaftarTiketAdmin";
import PageHeader from "./PageHeader";
import TabelTiket from "./TabelTiket";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ticket Management" }];
}

export default function HalamanDaftarTiketAdmin(): React.JSX.Element {
  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      <PageHeader />
      <TabelTiket />
    </main>
  );
}
