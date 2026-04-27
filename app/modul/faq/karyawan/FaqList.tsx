import type { Faq } from "../Faq";
import FaqCard from "./FaqCard";

interface Props {
  faqs: Faq[];
  onSelectFaq: (faq: Faq) => void;
}

export default function FaqList({ faqs, onSelectFaq }: Props) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <FaqCard
          key={faq.id}
          question={faq.question}
          kategori={faq.kategori}
          onClick={() => onSelectFaq(faq)}
        />
      ))}
      {faqs.length === 0 && (
        <div className="p-6 text-center italic text-gray-600 border border-gray-300 rounded-xl">
          No Data
        </div>
      )}
    </div>
  );
}
