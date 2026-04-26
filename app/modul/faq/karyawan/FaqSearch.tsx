export default function FaqSearch() {
  return (
    <div className="mb-6">
      <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-white px-4 shadow-sm">
        {/* Search Icon */}

        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
