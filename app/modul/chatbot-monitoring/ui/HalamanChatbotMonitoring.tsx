import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/HalamanChatbotMonitoring";
import { useChatbotMonitoringWs } from "../data/UseChatbotMonitoringWs";
import type { ChatbotMonitoringFilter } from "../data/ChatbotMonitoringTypes";
import ChatbotMonitoringHeader from "./ChatbotMonitoringHeader";
import ChatbotMonitoringStatsGrid from "./ChatbotMonitoringStatsGrid";
import ActivityTrendsCard from "./ActivityTrendsCard";
import AvgSessionPerHourCard from "./AvgSessionPerHourCard";
import TopUnansweredQuestionsCard from "./TopUnansweredQuestionsCard";
import DashboardFilterPanel from "~/modul/dashboard/DashboardFilterPanel";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chatbot Monitoring" }];
}

const CURRENT_YEAR = new Date().getFullYear();
const AVAILABLE_YEARS = [CURRENT_YEAR - 2, CURRENT_YEAR - 1, CURRENT_YEAR];

export default function HalamanChatbotMonitoring() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<ChatbotMonitoringFilter>({
    tahun: CURRENT_YEAR,
  });

  const handleSessionExpired = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const { data, status, sendFilter } = useChatbotMonitoringWs(
    filter,
    handleSessionExpired,
  );

  useEffect(() => {
    sendFilter(filter);
    // sendFilter is stable (ref-based), safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  function handleFilterChange(newFilter: ChatbotMonitoringFilter) {
    setFilter(newFilter);
  }

  const isLoading = data === null;
  const activeFilter = data?.filter ?? filter;

  return (
    <main className="bg-gray-50 min-h-default p-8 space-y-4 print:p-4 print:space-y-3">
      <ChatbotMonitoringHeader />

      {/* Connection status banners */}
      {status === "connecting" && (
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm w-fit print:hidden">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          Connecting to live data...
        </div>
      )}
      {(status === "error" || status === "closed") && (
        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 shadow-sm w-fit print:hidden">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Connection lost — attempting to reconnect...
        </div>
      )}

      {/* Filter panel */}
      <div className="print:hidden">
        <DashboardFilterPanel
          filter={filter}
          availableYears={AVAILABLE_YEARS}
          onChange={handleFilterChange}
        />
      </div>

      {/* Stats */}
      <ChatbotMonitoringStatsGrid
        totalSesi={data?.totalSesi ?? null}
        totalPesan={data?.totalPesan ?? null}
        avgPesanPerSesi={data?.avgPesanPerSesi ?? null}
        unansweredQuestions={data?.unansweredQuestions ?? null}
        isLoading={isLoading}
      />

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityTrendsCard
          activityTrends={
            data?.historyAktivitas ?? []
          } /* field name sesuai API */
          filter={activeFilter}
          isLoading={isLoading}
        />
        <AvgSessionPerHourCard
          avgSesiPerJam={data?.avgSesiPerJam ?? []}
          isLoading={isLoading}
        />
      </section>

      {/* Top Unanswered Questions — topUnansweredQuestions masih null dari server */}
      <TopUnansweredQuestionsCard questions={[]} isLoading={isLoading} />
    </main>
  );
}
