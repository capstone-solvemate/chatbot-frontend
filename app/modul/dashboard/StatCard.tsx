type Props = {
  label: string;
  value: string;
  subtitle: string;
  iconColor: string;
};

export default function StatCard({ label, value, subtitle, iconColor }: Props) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
        <span className={`w-2 h-2 rounded-full ${iconColor}`} />
        <span>{label}</span>
      </div>

      <h3 className="text-4xl font-semibold text-gray-800">{value}</h3>

      <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
    </article>
  );
}
