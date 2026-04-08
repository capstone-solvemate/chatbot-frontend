import SearchChip from "./SearchChip"

const searches = [
  "Printer issue",
  "Login problem",
  "Network connection",
  "Software installation",
]

export default function PopularSearches() {
  return (
    <div className="flex items-center gap-3">

      <p className="text-sm text-gray-500">
        Popular searches:
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {searches.map((item) => (
          <SearchChip key={item}>
            {item}
          </SearchChip>
        ))}
      </div>

    </div>
  )
}