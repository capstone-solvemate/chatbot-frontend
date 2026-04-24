const issues = [
  { title: "Printer not responding", count: 45 },
  { title: "Login authentication failed", count: 32 },
  { title: "Print quality issues", count: 28 },
  { title: "Network connection problem", count: 19 },
  { title: "Scanner malfunction", count: 15 },
];

export default function FrequentIssuesCard() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full">
      <h3 className="font-semibold text-gray-800 mb-1">Most Frequent Issues</h3>

      <p className="text-xs text-gray-400 mb-6">
        Common problems frequently reported by users
      </p>

      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.title}
            className="flex items-center justify-between border-b border-gray-100 pb-3"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                {issue.title}
              </h4>
              <p className="text-[11px] text-gray-400">Equipment</p>
            </div>

            <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center">
              {issue.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
