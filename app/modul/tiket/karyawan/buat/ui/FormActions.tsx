import { Link } from "react-router";
import { Button, ButtonColor } from "~/komponen/Button";

export default function FormActions({
  idChat,
  submitting,
}: {
  idChat: string;
  submitting?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 justify-end gap-3 pt-2">
      <Link
        to={`/chat/${idChat}`}
        type="button"
        aria-disabled={submitting}
        className="px-4 py-2 flex text-sm border border-gray-300 rounded-md text-gray-600 items-center justify-center"
      >
        Cancel
      </Link>
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
