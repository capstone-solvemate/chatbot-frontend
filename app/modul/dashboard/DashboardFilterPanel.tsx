import type { DashboardFilter } from "./types/DashboardTypes";

const MONTHS = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

const WEEKS = [1, 2, 3, 4, 5];

type Props = {
  filter: DashboardFilter;
  availableYears: number[];
  onChange: (filter: DashboardFilter) => void;
};

export default function DashboardFilterPanel({
  filter,
  availableYears,
  onChange,
}: Props) {
  function selectYear(tahun: number) {
    // Changing year resets month and week
    onChange({ tahun });
  }

  function selectMonth(bulan: number) {
    if (filter.bulan === bulan) {
      // Toggle off → back to year-only view
      onChange({ tahun: filter.tahun });
    } else {
      // Changing month resets week
      onChange({ tahun: filter.tahun, bulan });
    }
  }

  function selectWeek(minggu: number) {
    if (filter.minggu === minggu) {
      // Toggle off → back to month view
      onChange({ tahun: filter.tahun, bulan: filter.bulan });
    } else {
      onChange({ tahun: filter.tahun, bulan: filter.bulan, minggu });
    }
  }

  const activeBtn =
    "px-3 py-1 rounded bg-blue-600 text-white text-xs font-medium";
  const inactiveBtn =
    "px-3 py-1 rounded border border-gray-200 bg-white text-gray-600 text-xs hover:bg-gray-50 transition-colors";

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
        <svg
          className="w-4 h-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V15a1 1 0 01-.553.894l-4 2A1 1 0 017 17v-6.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        <span>Filter Data</span>
      </div>

      <div className="space-y-5">
        {/* Year */}
        <div>
          <p className="text-[11px] uppercase text-gray-400 mb-2">Year</p>
          <div className="flex gap-2 flex-wrap">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => selectYear(year)}
                className={filter.tahun === year ? activeBtn : inactiveBtn}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Month */}
        <div>
          <p className="text-[11px] uppercase text-gray-400 mb-2">
            Month <span className="normal-case text-gray-300">(Optional)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {MONTHS.map((month) => (
              <button
                key={month.value}
                onClick={() => selectMonth(month.value)}
                className={
                  filter.bulan === month.value ? activeBtn : inactiveBtn
                }
              >
                {month.label}
              </button>
            ))}
          </div>
        </div>

        {/* Week — only shown when a month is selected */}
        {filter.bulan !== undefined && (
          <div>
            <p className="text-[11px] uppercase text-gray-400 mb-2">
              Week <span className="normal-case text-gray-300">(Optional)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {WEEKS.map((week) => (
                <button
                  key={week}
                  onClick={() => selectWeek(week)}
                  className={filter.minggu === week ? activeBtn : inactiveBtn}
                >
                  Week {week}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
