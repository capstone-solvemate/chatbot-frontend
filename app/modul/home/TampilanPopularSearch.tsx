import SearchChip from "./SearchChip";

const searches = [
  "Printer issue",
  "Login problem",
  "Network connection",
  "Software installation",
];

export default function PopularSearches() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
      <p className="text-sm text-gray-500 whitespace-nowrap pt-1">
        Popular searches:
      </p>

      <div className="flex flex-wrap sm:overflow-x-auto justify-center sm:justify-start gap-2">
        {searches.map((item) => (
          <SearchChip key={item}>{item}</SearchChip>
        ))}
      </div>
    </div>
  );
}
