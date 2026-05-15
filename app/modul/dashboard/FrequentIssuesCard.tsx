import type { IssueCategory } from "./types/DashboardTypes";

type Props = {
  frequentIssueCategories: IssueCategory[];
};

export default function FrequentIssuesCard({ frequentIssueCategories }: Props) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full">
      <h3 className="font-semibold text-gray-800 mb-1">
        Most Frequent Issue Categories
      </h3>

      <p className="text-xs text-gray-400 mb-6">
        Common problem categories frequently reported by users
      </p>

      <div className="space-y-4 overflow-y-auto h-72">
        {frequentIssueCategories.map((category) => (
          <div
            key={category.idKategori}
            className="flex items-center justify-between border-b border-gray-100 pb-3"
          >
            <div className="flex flex-col items-start">
              <h4 className="text-sm font-medium text-gray-700">
                {category.namaKategori}
              </h4>
            </div>

            <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center">
              {category.jumlah}
            </span>
          </div>
        ))}
        {frequentIssueCategories.length === 0 && (
          <div className="w-full h-full flex items-center justify-center italic text-gray-400">
            No issues for this period
          </div>
        )}
      </div>
    </section>
  );
}
