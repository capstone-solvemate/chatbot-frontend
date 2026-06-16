import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/HalamanChatbotMonitoring";
import { useChatbotMonitoringWs } from "../data/UseChatbotMonitoringWs";
import type { ChatbotMonitoringFilter } from "../data/ChatbotMonitoringTypes";
import ChatbotMonitoringHeader from "./ChatbotMonitoringHeader";
import ChatbotMonitoringStatsGrid from "./ChatbotMonitoringStatsGrid";
import ActivityTrendsCard from "./ActivityTrendsCard";
import AvgSessionPerHourCard from "./AvgSessionPerHourCard";
import DashboardFilterPanel from "~/modul/dashboard/DashboardFilterPanel";
import PopupDownload from "./PopupDownload";
import PopupShare from "./PopupShare";
import type { DtoKirimReport } from "../api/dto/DtoKirimReport";
import { useKonektorRestApi } from "~/dasar/hooks/useKonektorRestApi";
import { KonektorChatbotMonitoring } from "../api/KonektorChatbotMonitoring";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import { useNotifikasi } from "~/dasar/hooks/useNotifikasi";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chatbot Monitoring" }];
}

const CURRENT_YEAR = new Date().getFullYear();
const AVAILABLE_YEARS = [CURRENT_YEAR - 2, CURRENT_YEAR - 1, CURRENT_YEAR];

export default function HalamanChatbotMonitoring() {
  const navigate = useNavigate();
  const konektorRestApi = useKonektorRestApi();
  const konektorChatbotMonitoring = new KonektorChatbotMonitoring(
    konektorRestApi,
  );
  const { setMasterError } = useMasterError();
  const { notify } = useNotifikasi();

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

  const [popupDownloadDibuka, setPopupDownloadDibuka] = useState(false);
  const [popupShareDibuka, setPopupShareDibuka] = useState(false);

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

  function handleDownload() {
    setPopupDownloadDibuka(false);
    window.print();
  }

  function handleTutupDownload() {
    setPopupDownloadDibuka(false);
  }

  function handleOpenDownload() {
    setPopupDownloadDibuka(true);
  }

  function handleOpenShare() {
    setPopupDownloadDibuka(false);
    setPopupShareDibuka(true);
  }

  function handleTutupShare() {
    setPopupShareDibuka(false);
  }

  async function handleShare(email: string) {
    try {
      const dto: DtoKirimReport = {
        tahun: filter.tahun,
        bulan: filter.bulan ?? undefined,
        emailTujuan: email,
        zonaWaktu: new Date().getTimezoneOffset(),
      };
      await konektorChatbotMonitoring.share(dto);
      setPopupShareDibuka(false);
      notify("Report Sent", "The report has been sent to recipient email");
    } catch (e) {
      setMasterError(e);
    }
  }

  return (
    <main className="bg-gray-50 min-h-default p-8 space-y-4 print:p-4 print:space-y-3">
      <ChatbotMonitoringHeader onOpenDownload={handleOpenDownload} />

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
      {/* <TopUnansweredQuestionsCard questions={[]} isLoading={isLoading} /> */}

      {popupDownloadDibuka && (
        <PopupDownload
          onBatal={handleTutupDownload}
          onDownload={handleDownload}
          tahun={filter.tahun}
          bulan={filter.bulan ?? null}
          onShare={handleOpenShare}
        />
      )}

      {popupShareDibuka && (
        <PopupShare onBatal={handleTutupShare} onShare={handleShare} />
      )}
    </main>
  );
}
