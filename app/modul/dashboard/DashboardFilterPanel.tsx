const years = [2024, 2025, 2026];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DashboardFilterPanel() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
        {/* Filter Icon */}
        <span>Filter Data</span>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-[11px] uppercase text-gray-400 mb-2">Year</p>

          <div className="flex gap-2 flex-wrap">
            {years.map((year) => (
              <button
                key={year}
                className={
                  year === 2026
                    ? "px-3 py-1 rounded bg-blue-600 text-white text-xs"
                    : "px-3 py-1 rounded border border-gray-200 bg-white text-gray-600 text-xs"
                }
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase text-gray-400 mb-2">
            Month (Optional)
          </p>

          <div className="flex flex-wrap gap-2">
            {months.map((month) => (
              <button
                key={month}
                className="px-3 py-1 rounded border border-gray-200 bg-gray-50 text-gray-600 text-xs"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
