import { Link } from "react-router";
import type { Faq } from "../faq/Faq";
import { IkonCari } from "~/komponen/ikon/IkonCari";

type Props = {
  className?: string;
  foundFaqs: Faq[];
  loading: boolean;
  firstSearch: boolean;
  onSelectFaq?: (faq: Faq) => void;
};

export default function TampilanHasilCariFaq({
  className = "",
  foundFaqs,
  loading,
  firstSearch,
  onSelectFaq,
}: Props) {
  return (
    <div
      className={`w-full bg-white border border-t-0 border-gray-500 rounded-b-lg text-left ${className}`}
    >
      <hr className="mx-4 border-gray-400" />
      <div className="flex flex-col gap-1 py-2">
        {foundFaqs.map((faq) => (
          <button 
            key={faq.id}
            onMouseDown={(e) => {
              e.preventDefault();
              if (onSelectFaq) onSelectFaq(faq);
            }}
            className="px-4 text-sm hover:bg-gray-100 py-0.5 text-left flex items-center gap-2 cursor-pointer"
          >
            <IkonCari className="w-4 h-4" />
            <span>{faq.question}</span>
          </button>
        ))}
        {foundFaqs.length === 0 && (
          <div className="px-4 text-center text-sm text-gray-500 italic">
            {!loading && !firstSearch ? "No FAQs found" : "Searching..."}
          </div>
        )}
      </div>
    </div>
  );
}
