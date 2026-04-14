export default function MessageItem() {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
        IT
      </div>

      <div className="bg-gray-100 rounded-lg p-4 max-w-xl me-8">
        <p className="text-gray-900">
          A technician has been assigned to your ticket and will visit the
          location within 2 hours.
        </p>

        <span className="text-xs text-gray-500 block mt-2">
          Apr 3, 2026, 2:20 PM
        </span>
      </div>
    </div>
  );
}
