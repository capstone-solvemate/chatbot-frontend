import type { Faq } from "../Faq";
import FaqCard from "./FaqCard";

const faqs = [
  {
    question: "How do I reset my printer settings?",
    category: "Equipment",
  },
  {
    question: "What should I do if the print quality is poor?",
    category: "Printing Quality",
  },
  {
    question: "How do I connect to the company VPN?",
    category: "Technical",
  },
  {
    question: "Where can I find the equipment maintenance schedule?",
    category: "Equipment",
  },
  {
    question: "How do I request new equipment?",
    category: "Equipment",
  },
  {
    question: "What are the supported operating systems?",
    category: "Technical",
  },
  {
    question: "How do I report a paper jam?",
    category: "Equipment",
  },
  {
    question: "How can I access my email remotely?",
    category: "Technical",
  },
];

interface Props {
  faqs: Faq[];
}

export default function FaqList({ faqs }: Props) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <FaqCard key={faq.id} question={faq.question} kategori={faq.kategori} />
      ))}
    </div>
  );
}
