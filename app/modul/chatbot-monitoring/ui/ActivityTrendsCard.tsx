import { Bar } from "react-chartjs-2";
import type {
  ChatbotHistoryItem,
  ChatbotMonitoringFilter,
} from "../data/ChatbotMonitoringTypes";

type Props = {
  activityTrends: ChatbotHistoryItem[];
  filter: ChatbotMonitoringFilter;
  isLoading: boolean;
};

function getFilterLabel(filter: ChatbotMonitoringFilter): string {
  if (filter.bulan !== undefined) {
    const monthName = new Date(filter.tahun, filter.bulan - 1).toLocaleString(
      "en-US",
      { month: "long" },
    );
    return `${monthName} ${filter.tahun}`;
  }
  return `${filter.tahun}`;
}

export default function ActivityTrendsCard({
  activityTrends,
  filter,
  isLoading,
}: Props) {
  const hasData =
    activityTrends.length > 0 && activityTrends.some((h) => h.jumlah > 0);

  const maxJumlah = Math.max(...activityTrends.map((h) => h.jumlah), 1);

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 text-lg mt-1">
        Activity Trends
      </h3>

      <p className="text-xs text-gray-600 mt-1">Number of Chatbot Sessions</p>

      <p className="text-[11px] text-blue-600 font-medium mt-2 mb-4">
        {getFilterLabel(filter)}
      </p>

      <div className="h-72 rounded-lg relative overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center border border-gray-100 bg-gray-50">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Loading data...</span>
            </div>
          </div>
        ) : !hasData ? (
          <div className="absolute inset-0 flex items-center justify-center border border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-400">
              No activity data for this period
            </p>
          </div>
        ) : (
          <Bar
            data={{
              labels: activityTrends.map((item) => item.label),
              datasets: [
                {
                  label: "Chatbot sessions",
                  data: activityTrends.map((item) => item.jumlah),
                  backgroundColor: "#155dfc",
                  borderRadius: 4,
                  borderSkipped: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Time period",
                    color: "#888",
                    font: { size: 12 },
                  },
                  grid: { display: false },
                  border: { display: false },
                  ticks: { color: "#888" },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of chatbot sessions",
                    color: "#888",
                    font: { size: 12 },
                  },
                  grid: {
                    color: "rgba(0,0,0,0.08)",
                    lineWidth: 1,
                    //@ts-ignore
                    borderDash: [4, 4],
                  },
                  border: { display: false },
                  ticks: { color: "#888" },
                  max: maxJumlah,
                },
              },
            }}
          />
        )}
      </div>
    </section>
  );
}
