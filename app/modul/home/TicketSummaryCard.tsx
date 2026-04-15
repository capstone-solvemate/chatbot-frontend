import IkonExclamationCircle from "~/komponen/ikon/IkonExclamationCircle";
import TicketStatItem from "./TicketStatItem";
import IkonJam from "~/komponen/ikon/IkonJam";
import IkonDone from "~/komponen/ikon/IkonDone";
import { NavLink } from "react-router";

type TicketSummaryCardProps = {
  open: number;
  inProgress: number;
  resolved: number;
};

export default function TicketSummaryCard({
  open,
  inProgress,
  resolved,
}: TicketSummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">Your Tickets</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <TicketStatItem
          value={open}
          label="Open"
          icon={<IkonExclamationCircle />}
          color="orange"
        />

        <TicketStatItem
          value={inProgress}
          label="In Progress"
          icon={<IkonJam />}
          color="blue"
        />

        <TicketStatItem
          value={resolved}
          label="Resolved"
          icon={<IkonDone />}
          color="green"
        />
      </div>

      <NavLink
        to="/tiket"
        className="text-center text-blue-600 hover:text-blue-700 font-medium items-center gap-1"
      >
        View all tickets →
      </NavLink>
    </div>
  );
}
