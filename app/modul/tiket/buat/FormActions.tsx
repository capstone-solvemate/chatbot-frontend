import { Button, ButtonColor } from "~/komponen/Button";

export default function FormActions({ submitting }: { submitting?: boolean }) {
  return (
    <div className="grid grid-cols-3 justify-end gap-3 pt-2">
      <button
        type="button"
        className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-600"
      >
        Cancel
      </button>
      <Button
        type="submit"
        disabled={submitting}
        className={`text-sm col-span-2 transition-colors`}
        color={ButtonColor.Blue}
      >
        {submitting ? "Submitting..." : "Submit Ticket"}
      </Button>
    </div>
  );
}
