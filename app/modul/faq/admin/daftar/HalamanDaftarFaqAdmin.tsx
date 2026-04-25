import PageHeader from "./PageHeader";
import FaqTableCard from "./FaqTableCard";
import type { Route } from "./+types/HalamanDaftarFaqAdmin";

export function meta({}: Route.MetaArgs) {
  return [{ title: "FAQ Management" }];
}

export default function HalamanDaftarFaqAdmin() {
  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      <PageHeader />

      <div className="mt-6">
        <FaqTableCard />
      </div>
    </main>
  );
}
