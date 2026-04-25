import FaqToolbar from "./FaqToolbar";
import FaqRow from "./FaqRow";

const faqs = [
  {
    question: "How do I reset my printer?",
    answer:
      "To reset your printer, turn it off, unplug it for 30 seconds, then plug it back in and turn it on.",
  },
  {
    question: "What should I do if I forgot my password?",
    answer:
      "Click on the 'Forgot Password' link on the login page. Enter your email address and you'll receive a reset link.",
  },
  {
    question: "How can I improve print quality?",
    answer:
      "Make sure you are using the correct paper type, check ink levels, clean the print heads.",
  },
  {
    question: "Where can I find replacement cartridges?",
    answer:
      "Contact the supply department or submit a ticket through the helpdesk system.",
  },
  {
    question: "How do I connect to the network printer?",
    answer: "Go to Settings > Devices > Printers & Scanners > Add a printer.",
  },
];

export default function FaqTableCard() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-sm text-gray-800">All FAQs (5)</h2>

        <FaqToolbar />
      </div>

      <div>
        {faqs.map((faq) => (
          <FaqRow
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
