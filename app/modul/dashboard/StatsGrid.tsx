import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Tickets"
        value="867"
        subtitle="Tickets created"
        iconColor="bg-blue-500"
      />

      <StatCard
        label="Deflection Rate"
        value="67%"
        subtitle="Resolved via FAQ/AI"
        iconColor="bg-green-500"
      />

      <StatCard
        label="Chatbot Usage"
        value="5,397"
        subtitle="Sessions"
        iconColor="bg-purple-500"
      />

      <StatCard
        label="Open Tickets"
        value="23"
        subtitle="Requires attention"
        iconColor="bg-orange-500"
      />
    </section>
  );
}
