import type { UnansweredQuestion } from "../data/ChatbotMonitoringTypes";

type Props = {
  questions: UnansweredQuestion[];
  isLoading: boolean;
};

export default function TopUnansweredQuestionsCard({
  questions,
  isLoading,
}: Props) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 text-lg">
        Top Unanswered Questions
      </h3>
      <p className="text-xs text-gray-500 mt-1 mb-5">
        Questions that users asked but the chatbot couldn't answer
      </p>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-gray-400">
          No unanswered questions for this period
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between gap-4 bg-gray-50 rounded-lg px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {q.question}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Asked {q.askedCount} times
                </p>
              </div>

              <button
                className="shrink-0 text-xs font-medium text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-lg cursor-pointer"
                onClick={() => {
                  /* TODO: implement Add to FAQ */
                }}
              >
                Add to FAQ
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
