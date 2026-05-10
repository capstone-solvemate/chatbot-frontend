import FaqCard from "./FaqCard";
import type { Faq } from "~/modul/faq/Faq";

interface Props {
  faqs: Faq[];
  loading?: boolean;
  onSelectFaq: (faq: Faq) => void;
}

function FaqCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 animate-pulse">
      <div className="flex justify-between gap-4">
        <div className="h-10 w-10 rounded-lg bg-gray-200" />
        <div className="h-4 w-4 rounded bg-gray-200" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-2/3 rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function TampilanDaftarFaq({
  faqs,
  loading = false,
  onSelectFaq,
}: Props) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <FaqCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {faqs.map((faq) => (
        <FaqCard
          onClick={() => onSelectFaq(faq)}
          key={faq.id}
          title={faq.question}
          description={faq.answer}
        />
      ))}
    </div>
  );
}
