import StatCard from "~/modul/dashboard/StatCard";
import IkonChat from "~/komponen/ikon/IkonChat";
import IkonUserGroup from "~/komponen/ikon/IkonUserGroup";
import IkonBarChart from "~/komponen/ikon/IkonBarChart";
import IkonExclamationTriangle from "~/komponen/ikon/IkonExclamationTriangle";

type Props = {
  totalSesi: number | null;
  totalPesan: number | null;
  avgPesanPerSesi: number | null;
  unansweredQuestions: number | null;
  isLoading: boolean;
};

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

function formatDecimal(value: number): string {
  return value.toFixed(1);
}

export default function ChatbotMonitoringStatsGrid({
  totalSesi,
  totalPesan,
  avgPesanPerSesi,
  unansweredQuestions,
  isLoading,
}: Props) {
  const skeleton = "—";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<IkonUserGroup className="w-4 h-4 text-blue-600" />}
        label="Total Sessions"
        value={isLoading ? skeleton : formatNumber(totalSesi!)}
        subtitle="Chatbot sessions"
        isLoading={isLoading}
      />

      <StatCard
        icon={<IkonChat className="w-4 h-4 text-green-600" />}
        label="Total Messages"
        value={isLoading ? skeleton : formatNumber(totalPesan!)}
        subtitle="Messages exchanged"
        isLoading={isLoading}
      />

      <StatCard
        icon={<IkonBarChart className="w-4 h-4 text-purple-600" />}
        label="Avg Messages/Session"
        value={isLoading ? skeleton : formatDecimal(avgPesanPerSesi!)}
        subtitle="Messages exchanged in each session"
        isLoading={isLoading}
      />

      <StatCard
        icon={<IkonExclamationTriangle className="w-4 h-4 text-orange-500" />}
        label="Unanswered Questions"
        value={isLoading ? skeleton : formatNumber(unansweredQuestions!)}
        subtitle="Requires attention"
        isLoading={isLoading}
      />
    </section>
  );
}
