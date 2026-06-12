import { Line } from "react-chartjs-2";
import type { ChatbotHistoryItem } from "../data/ChatbotMonitoringTypes";

type Props = {
  avgSesiPerJam: ChatbotHistoryItem[];
  isLoading: boolean;
};

// Pastikan semua 24 jam terwakili, isi jam yang kosong dengan 0
function normalizeHourlyData(raw: ChatbotHistoryItem[]): ChatbotHistoryItem[] {
  const map = new Map(raw.map((item) => [item.label, item.jumlah]));
  return Array.from({ length: 24 }, (_, i) => {
    const label = String(i).padStart(2, "0");
    return { label, jumlah: map.get(label) ?? 0 };
  });
}

export default function AvgSessionPerHourCard({
  avgSesiPerJam,
  isLoading,
}: Props) {
  let timezoneFixedData = [...avgSesiPerJam];
  for (const avg of timezoneFixedData) {
    const jam = Number(avg.label);
    if (!isNaN(jam)) {
      const fixedJam = (jam + 7) % 24;
      avg.label = String(fixedJam).padStart(2, "0");
    }
  }
  timezoneFixedData = timezoneFixedData.sort(
    (a, b) => Number(a.label) - Number(b.label),
  );

  const normalized = normalizeHourlyData(timezoneFixedData);
  const hasData = normalized.some((h) => h.jumlah > 0);
  const maxJumlah = Math.max(...normalized.map((h) => h.jumlah), 1);

  // Tampilkan setiap 3 jam di x-axis agar tidak penuh (00, 03, 06, ...)
  const tickLabels = normalized.map((item, i) =>
    i % 3 === 0 ? `${item.label}:00` : "",
  );

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm break-inside-avoid">
      <h3 className="font-semibold text-gray-900 text-lg mt-1">
        Average Session per Hour
      </h3>

      <p className="text-xs text-gray-600 mt-1">
        Average number session at each hour of the day.
      </p>

      <div className="h-72 rounded-lg relative overflow-hidden mt-6">
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
              No session data for this period
            </p>
          </div>
        ) : (
          <Line
            data={{
              labels: tickLabels,
              datasets: [
                {
                  label: "Avg sessions",
                  data: normalized.map((item) => item.jumlah),
                  borderColor: "#2563EB",
                  backgroundColor: "#2563EB",
                  borderWidth: 2,
                  pointRadius: 3,
                  pointHoverRadius: 5,
                  tension: 0,
                  fill: false,
                  spanGaps: true,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    title: (items) => {
                      const idx = items[0].dataIndex;
                      return `${normalized[idx].label}:00`;
                    },
                  },
                },
              },
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
                    text: "Average number of sessions",
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
