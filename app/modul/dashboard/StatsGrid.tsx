import StatCard from "./StatCard";

type Props = {
  totalTiket: number | null;
  tiketTerbuka: number | null;
  isLoading: boolean;
};

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export default function StatsGrid({
  totalTiket,
  tiketTerbuka,
  isLoading,
}: Props) {
  const skeleton = "—";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Tickets"
        value={isLoading ? skeleton : formatNumber(totalTiket!)}
        subtitle="Tickets created"
        iconColor="bg-blue-500"
        isLoading={isLoading}
      />

      {/* Deflection Rate and Chatbot Usage are not yet from WebSocket — kept as static placeholders */}
      <StatCard
        label="Deflection Rate"
        value="—"
        subtitle="Resolved via FAQ/AI"
        iconColor="bg-green-500"
        isLoading={false}
      />

      <StatCard
        label="Chatbot Usage"
        value="—"
        subtitle="Sessions"
        iconColor="bg-purple-500"
        isLoading={false}
      />

      <StatCard
        label="Open Tickets"
        value={isLoading ? skeleton : formatNumber(tiketTerbuka!)}
        subtitle="Requires attention"
        iconColor="bg-orange-500"
        isLoading={isLoading}
      />
    </section>
  );
}
