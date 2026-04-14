import { Button } from "~/komponen/Button";

type HelpCardProps = {
  onCreateTicket?: () => void;
};

export default function HelpCard({ onCreateTicket }: HelpCardProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">
        Need More Help?
      </h2>

      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        If you couldn't find a solution, create a support ticket and our team
        will assist you.
      </p>

      <Button className="mt-4" onClick={onCreateTicket} leftIcon={<div>+</div>}>
        Create Ticket
      </Button>
    </div>
  );
}
