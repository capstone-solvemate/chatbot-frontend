export default function FormActions() {
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
        className="px-4 py-2 text-sm bg-gray-400 text-white rounded-md"
      >
        Submit Ticket
      </button>
    </div>
  );
}
