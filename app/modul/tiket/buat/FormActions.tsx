export default function FormActions({ submitting }: { submitting?: boolean }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button
        type="button"
        className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-600"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 text-sm text-white rounded-md transition-colors ${
          submitting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Submitting..." : "Submit Ticket"}
      </button>
    </div>
  );
}
