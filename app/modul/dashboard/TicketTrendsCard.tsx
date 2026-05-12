import type { DashboardFilter, HistoryItem } from "./types/DashboardTypes";
import { Line } from "react-chartjs-2";

type Props = {
  history: HistoryItem[];
  filter: DashboardFilter;
  isLoading: boolean;
};

function getFilterLabel(filter: DashboardFilter): string {
  if (filter.bulan !== undefined) {
    const monthName = new Date(filter.tahun, filter.bulan - 1).toLocaleString(
      "en-US",
      { month: "long" },
    );
    return `${monthName} ${filter.tahun}`;
  }
  return `${filter.tahun}`;
}

export default function TicketTrendsCard({
  history,
  filter,
  isLoading,
}: Props) {
  const hasData = history.length > 0 && history.some((h) => h.jumlah > 0);

  // Pick a subset of x-axis labels to avoid overcrowding
  const xLabels = history.map((item) => item.label);
  const maxJumlah = Math.max(...history.map((h) => h.jumlah), 1);

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 text-lg mt-1">
        Ticket Trends
      </h3>

      <p className="text-xs text-gray-600 mt-1">Number of Tickets Created</p>

      <p className="text-[11px] text-blue-500 font-medium mt-2 mb-4">
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
              No ticket data for this period
            </p>
          </div>
        ) : (
          <Line
            data={{
              labels: xLabels,
              datasets: [
                {
                  label: "Number of tickets created",
                  data: history.map((item) => item.jumlah),
                  borderColor: "#2563EB",
                  backgroundColor: "#2563EB",
                  borderWidth: 2,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  tension: 0, // garis lurus
                  fill: false,
                  spanGaps: false, // null = garis putus, tidak dilanjutkan
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              backgroundColor: "#fff",
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Time period",
                    color: "#888",
                    font: { size: 12 },
                  },
                  grid: {
                    color: "rgba(0,0,0,0.08)",
                    lineWidth: 1,
                    // dashed grid
                    //@ts-ignore
                    borderDash: [4, 4],
                  },
                  border: { display: false },
                  ticks: { color: "#888" },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of tickets created",
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
                  ticks: { color: "#888", stepSize: 55 },
                  max: maxJumlah,
                },
              },
            }}
          ></Line>
        )}
      </div>
    </section>
  );
}
