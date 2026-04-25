import FaqToolbar from "./FaqToolbar";
import FaqRow from "./FaqRow";
import type { Faq } from "../../Faq";

interface Props {
  totalFaqs: number;
  faqs: Faq[];
  onEdit: (faq: Faq) => void;
}

export default function FaqTableCard({ faqs, totalFaqs, onEdit }: Props) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-sm text-gray-800">
          All FAQs ({totalFaqs})
        </h2>

        <FaqToolbar />
      </div>

      <div>
        {faqs.map((faq) => (
          <FaqRow
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            onEdit={() => onEdit(faq)}
          />
        ))}
      </div>
    </section>
  );
}
