const points = [
  { left: "8%", bottom: "68%" },
  { left: "14%", bottom: "61%" },
  { left: "26%", bottom: "72%" },
  { left: "34%", bottom: "75%" },
];

export default function TicketTrendsCard() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-1">Ticket Trends</h3>

      <p className="text-xs text-gray-400 mb-6">Number of Tickets Created</p>

      <div className="h-72 rounded-lg border border-gray-100 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-gray-100" />
          ))}
        </div>

        {points.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-600 rounded-full"
            style={{ left: p.left, bottom: p.bottom }}
          />
        ))}

        <div className="absolute left-[8%] bottom-[68%] w-[26%] h-[2px] bg-blue-500 rotate-[12deg] origin-left" />
        <div className="absolute left-[14%] bottom-[61%] w-[14%] h-[2px] bg-blue-500 -rotate-[16deg] origin-left" />
        <div className="absolute left-[26%] bottom-[72%] w-[10%] h-[2px] bg-blue-500 -rotate-[8deg] origin-left" />
      </div>
    </section>
  );
}
