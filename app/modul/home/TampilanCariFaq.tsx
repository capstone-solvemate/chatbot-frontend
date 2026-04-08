import SearchBar from "./SearchBar"
import PopularSearches from "./TampilanPopularSearch"

export default function TampilanCariFaq() {
  return (
    <section className="bg-linear-to-b from-[#EFF6FF] to-white pb-16 pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">

        <h1 className="text-5xl font-medium text-gray-900">
          How can we help you?
        </h1>

        <div className="mt-8">
          <SearchBar id="cariFaq" />
        </div>

        <div className="mt-6">
          <PopularSearches />
        </div>

      </div>
    </section>
  )
}