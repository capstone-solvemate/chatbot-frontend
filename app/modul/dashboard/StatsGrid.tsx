import { IkonTiket } from "~/komponen/ikon/IkonTiket";
import StatCard from "./StatCard";
import IkonBot from "~/komponen/ikon/IkonBot";
import IkonExclamationCircle from "~/komponen/ikon/IkonExclamationCircle";
import IkonDeflection from "~/komponen/ikon/IkonDeflection";

type Props = {
  totalTiket: number | null;
  tiketTerbuka: number | null;
  deflectionRate: number | null;
  totalSesiChat: number | null;
  isLoading: boolean;
};

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export default function StatsGrid({
  totalTiket,
  tiketTerbuka,
  deflectionRate,
  totalSesiChat,
  isLoading,
}: Props) {
  const skeleton = "—";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<IkonTiket className="w-4 h-4 text-blue-600" />}
        label="Total Tickets"
        value={isLoading ? skeleton : formatNumber(totalTiket!)}
        subtitle="Tickets created"
        isLoading={isLoading}
      />

      <StatCard
        icon={<IkonDeflection className="w-4 h-4 text-green-600" />}
        label="Deflection Rate"
        value={isLoading ? skeleton : `${deflectionRate!}%`}
        subtitle="Resolved via FAQ/AI"
        isLoading={isLoading}
      />

      <StatCard
        icon={<IkonBot className="w-4 h-4 text-purple-600" />}
        label="Chatbot Usage"
        value={isLoading ? skeleton : formatNumber(totalSesiChat!)}
        subtitle="Sessions"
        isLoading={isLoading}
      />

      <StatCard
        icon={<IkonExclamationCircle className="w-4 h-4 text-red-500" />}
        label="Open Tickets"
        value={isLoading ? skeleton : formatNumber(tiketTerbuka!)}
        subtitle="Requires attention"
        isLoading={isLoading}
      />
    </section>
  );
}
