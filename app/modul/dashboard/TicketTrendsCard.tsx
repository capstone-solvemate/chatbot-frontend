import type { DashboardFilter, HistoryItem } from "./types/DashboardTypes";

type Props = {
  history: HistoryItem[];
  filter: DashboardFilter;
  isLoading: boolean;
};

const CHART_W = 800;
const CHART_H = 300;
const PADDING = { top: 20, right: 20, bottom: 30, left: 40 };

/**
 * Maps history data to SVG coordinate points.
 * The chart area is (PADDING.left → CHART_W - PADDING.right) × (PADDING.top → CHART_H - PADDING.bottom).
 */
function historyToPoints(history: HistoryItem[]): string {
  if (history.length === 0) return "";

  const maxJumlah = Math.max(...history.map((h) => h.jumlah), 1);
  const chartWidth = CHART_W - PADDING.left - PADDING.right;
  const chartHeight = CHART_H - PADDING.top - PADDING.bottom;

  return history
    .map((item, i) => {
      const x =
        PADDING.left +
        (history.length === 1
          ? chartWidth / 2
          : (i / (history.length - 1)) * chartWidth);
      const y =
        PADDING.top + chartHeight - (item.jumlah / maxJumlah) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(history: HistoryItem[]): string {
  if (history.length === 0) return "";

  const maxJumlah = Math.max(...history.map((h) => h.jumlah), 1);
  const chartWidth = CHART_W - PADDING.left - PADDING.right;
  const chartHeight = CHART_H - PADDING.top - PADDING.bottom;
  const bottom = PADDING.top + chartHeight;

  const pts = history.map((item, i) => {
    const x =
      PADDING.left +
      (history.length === 1
        ? chartWidth / 2
        : (i / (history.length - 1)) * chartWidth);
    const y =
      PADDING.top + chartHeight - (item.jumlah / maxJumlah) * chartHeight;
    return { x, y };
  });

  const firstX = pts[0].x;
  const lastX = pts[pts.length - 1].x;

  return [
    `M ${firstX} ${bottom}`,
    ...pts.map((p) => `L ${p.x} ${p.y}`),
    `L ${lastX} ${bottom}`,
    "Z",
  ].join(" ");
}

function getFilterLabel(filter: DashboardFilter): string {
  if (filter.minggu !== undefined && filter.bulan !== undefined) {
    return `Week ${filter.minggu} of month ${filter.bulan}, ${filter.tahun}`;
  }
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
  const points = historyToPoints(history);
  const areaPath = buildAreaPath(history);
  const hasData = history.length > 0 && history.some((h) => h.jumlah > 0);

  // Pick a subset of x-axis labels to avoid overcrowding
  const labelStep = Math.ceil(history.length / 12);
  const xLabels = history.filter((_, i) => i % labelStep === 0);
  const maxJumlah = Math.max(...history.map((h) => h.jumlah), 1);
  const chartHeight = CHART_H - PADDING.top - PADDING.bottom;
  const chartWidth = CHART_W - PADDING.left - PADDING.right;

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-1">Ticket Trends</h3>

      <p className="text-xs text-gray-400 mb-1">Number of Tickets Created</p>

      <p className="text-[11px] text-blue-500 font-medium mb-5">
        {getFilterLabel(filter)}
      </p>

      <div className="h-72 rounded-lg border border-gray-100 bg-gray-50 relative overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Loading data...</span>
            </div>
          </div>
        ) : !hasData ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-gray-400">
              No ticket data for this period
            </p>
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = PADDING.top + chartHeight - ratio * chartHeight;
              return (
                <line
                  key={ratio}
                  x1={PADDING.left}
                  y1={y}
                  x2={CHART_W - PADDING.right}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              );
            })}

            {/* Y-axis labels */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = PADDING.top + chartHeight - ratio * chartHeight;
              const val = Math.round(maxJumlah * ratio);
              return (
                <text
                  key={ratio}
                  x={PADDING.left - 6}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="18"
                  fill="#9ca3af"
                >
                  {val}
                </text>
              );
            })}

            {/* Area fill */}
            <path d={areaPath} fill="url(#areaGradient)" />

            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Data points */}
            {history.map((item, i) => {
              const x =
                PADDING.left +
                (history.length === 1
                  ? chartWidth / 2
                  : (i / (history.length - 1)) * chartWidth);
              const y =
                PADDING.top +
                chartHeight -
                (item.jumlah / maxJumlah) * chartHeight;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#ffffff"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />
              );
            })}

            {/* X-axis labels */}
            {xLabels.map((item) => {
              const i = history.indexOf(item);
              const x =
                PADDING.left +
                (history.length === 1
                  ? chartWidth / 2
                  : (i / (history.length - 1)) * chartWidth);
              return (
                <text
                  key={i}
                  x={x}
                  y={CHART_H - 4}
                  textAnchor="middle"
                  fontSize="18"
                  fill="#9ca3af"
                >
                  {item.label}
                </text>
              );
            })}
          </svg>
        )}
      </div>
    </section>
  );
}
