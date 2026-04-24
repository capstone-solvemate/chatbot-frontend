import type { Route } from "./+types/HalamanDashboardAdmin";
import AverageActivityCard from "./AverageActivityCard";
import ChatbotActivityCard from "./ChatbotActivityCard";
import DashboardFilterPanel from "./DashboardFilterPanel";
import DashboardHeader from "./DashboardHeader";
import FrequentIssuesCard from "./FrequentIssuesCard";
import StatsGrid from "./StatsGrid";
import TicketTrendsCard from "./TicketTrendsCard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard Admin" }];
}

export default function AdminDashboardPage() {
  return (
    <main className="bg-gray-50" style={{ minHeight: "calc(100vh - 4rem)" }}>
      <section className="p-5 space-y-4">
        <DashboardHeader />

        <DashboardFilterPanel />

        <StatsGrid />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TicketTrendsCard />
          <ChatbotActivityCard />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AverageActivityCard />
          </div>

          <FrequentIssuesCard />
        </section>
      </section>
    </main>
  );
}
