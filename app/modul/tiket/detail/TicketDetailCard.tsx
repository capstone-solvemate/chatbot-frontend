import TicketStatusBadges from "./TicketStatusBadges";
import TicketDescription from "./TicketDescription";
import TicketMeta from "./TicketMeta";

export default function TicketDetailCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ticket #001</h1>

        <p className="text-gray-700 text-xl mt-1">Printer not responding</p>
      </div>

      <TicketStatusBadges />

      <hr className="border-gray-200" />

      <TicketDescription />

      <hr className="border-gray-200" />

      <TicketMeta />
    </div>
  );
}
