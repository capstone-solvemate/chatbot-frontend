export default function FaqToolbar() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* search icon */}
        <input
          placeholder="Search FAQs..."
          className="w-56 rounded-md px-4 py-2 text-sm bg-gray-100 outline-none text-gray-900"
        />
      </div>

      <select className="w-40 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-900 outline-none">
        <option>All Category</option>
      </select>
    </div>
  );
}
