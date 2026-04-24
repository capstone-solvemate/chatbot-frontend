export default function AverageActivityCard() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-1">
        Average Combined Activity per Hour
      </h3>

      <p className="text-xs text-gray-400 mb-6">
        Shows the average number of combined ticket and chatbot interactions.
      </p>

      <div className="h-72 border border-gray-100 rounded-lg bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-gray-100" />
          ))}
        </div>

        <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full">
          <path
            d="M20 240
             C70 180,90 260,120 220
             C170 190,210 210,260 170
             C320 70,360 40,420 110
             C470 150,520 30,560 70
             C610 210,650 200,690 140
             C730 120,760 240,790 200"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
          />
        </svg>
      </div>
    </section>
  );
}
