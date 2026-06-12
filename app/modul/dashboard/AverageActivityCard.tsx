import { Line } from "react-chartjs-2";
import type { HistoryItem } from "./types/DashboardTypes";

type Props = {
  avgAktivitasPerJam: HistoryItem[];
  isLoading: boolean;
};

// Ensure all 24 hours are represented, filling missing hours with 0
function normalizeHourlyData(raw: HistoryItem[]): HistoryItem[] {
  const map = new Map(raw.map((item) => [item.label, item.jumlah]));
  return Array.from({ length: 24 }, (_, i) => {
    const label = String(i).padStart(2, "0");
    return { label, jumlah: map.get(label) ?? 0 };
  });
}

export default function AverageActivityCard({
  avgAktivitasPerJam,
  isLoading,
}: Props) {
  let timezoneFixedData = [...avgAktivitasPerJam];
  for (const avg of avgAktivitasPerJam) {
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

  // Show only every 3rd hour on x-axis to avoid crowding (00, 03, 06, ...)
  const tickLabels = normalized.map((item, i) =>
    i % 3 === 0 ? `${item.label}:00` : "",
  );

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-1">
        Average Combined Activity per Hour
      </h3>

      <p className="text-xs text-gray-400 mb-6">
        Average number of combined ticket and chatbot interactions per hour of
        day.
      </p>

      <div className="h-72 rounded-lg relative overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center border border-gray-100 bg-gray-50">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
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
          <Line
            data={{
              labels: tickLabels,
              datasets: [
                {
                  label: "Avg activity",
                  data: normalized.map((item) => item.jumlah),
                  borderColor: "#10b981",
                  backgroundColor: "#10b981",
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
                    text: "Time of Day",
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
                    text: "Average Number of Interactions",
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
                  max: Math.ceil(maxJumlah * 1.2),
                },
              },
            }}
          />
        )}
      </div>
    </section>
  );
}
