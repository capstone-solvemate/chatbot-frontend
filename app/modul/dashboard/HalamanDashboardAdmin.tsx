import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/HalamanDashboardAdmin";
import AverageActivityCard from "./AverageActivityCard";
import ChatbotActivityCard from "./ChatbotActivityCard";
import DashboardFilterPanel from "./DashboardFilterPanel";
import DashboardHeader from "./DashboardHeader";
import FrequentIssuesCard from "./FrequentIssuesCard";
import StatsGrid from "./StatsGrid";
import TicketTrendsCard from "./TicketTrendsCard";
import { useDashboardWs } from "./UseDashboardWs";
import type { DashboardFilter } from "./types/DashboardTypes";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard Admin" }];
}

const CURRENT_YEAR = new Date().getFullYear();

// Generate the available years shown in the filter (3 years back up to current)
const AVAILABLE_YEARS = [CURRENT_YEAR - 2, CURRENT_YEAR - 1, CURRENT_YEAR];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<DashboardFilter>({
    tahun: CURRENT_YEAR,
  });

  const handleSessionExpired = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const { data, status, sendFilter } = useDashboardWs(
    filter,
    handleSessionExpired,
  );

  // Whenever the user changes the filter, push it to the server
  useEffect(() => {
    sendFilter(filter);
    // sendFilter is stable (ref-based), safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  function handleFilterChange(newFilter: DashboardFilter) {
    setFilter(newFilter);
  }

  return (
    <main className="bg-gray-50 min-h-default p-8 space-y-4">
      <DashboardHeader />

      {/* Connection status banner — only shown when not open */}
      {status === "connecting" && (
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          Connecting to live data...
        </div>
      )}
      {status === "error" || status === "closed" ? (
        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 shadow-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Connection lost — attempting to reconnect...
        </div>
      ) : null}

      <DashboardFilterPanel
        filter={filter}
        availableYears={AVAILABLE_YEARS}
        onChange={handleFilterChange}
      />

      <StatsGrid
        totalTiket={data?.totalTiket ?? null}
        tiketTerbuka={data?.tiketTerbuka ?? null}
        isLoading={data === null}
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TicketTrendsCard
          history={data?.history ?? []}
          filter={data?.filter ?? filter}
          isLoading={data === null}
        />
        <ChatbotActivityCard />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <AverageActivityCard />
        </div>
        <FrequentIssuesCard />
      </section>
    </main>
  );
}
