const bars = [82, 74, 95, 85];

export default function ChatbotActivityCard() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-1">Chatbot Activity</h3>

      <p className="text-xs text-gray-400 mb-6">Number of Chatbot Sessions</p>

      <div className="h-72 rounded-lg border border-gray-100 bg-gray-50 p-6">
        <div className="h-full flex items-end gap-4">
          {bars.map((bar, index) => (
            <div key={index} className="flex-1 flex items-end">
              <div
                className="w-full bg-blue-600 rounded-t-md"
                style={{ height: `${bar}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
