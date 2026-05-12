import HelpCard from "./HelpCard";
import TicketSummaryCard from "./TicketSummaryCard";

type Props = {
  loading: boolean;
  open: number;
  inProgress: number;
  resolved: number;
};

export default function BagianSupport({
  loading,
  open,
  inProgress,
  resolved,
}: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-20 max-w-6xl mx-auto">
      <HelpCard />

      <TicketSummaryCard
        open={open}
        inProgress={inProgress}
        resolved={resolved}
        loading={loading}
      />
    </section>
  );
}
