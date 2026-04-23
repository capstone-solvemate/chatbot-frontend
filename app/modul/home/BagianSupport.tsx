import HelpCard from "./HelpCard";
import TicketSummaryCard from "./TicketSummaryCard";

export default function BagianSupport() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-20 max-w-6xl mx-auto">
      <HelpCard />

      <TicketSummaryCard open={3} inProgress={2} resolved={8} />
    </section>
  );
}
