import FaqCard from "./FaqCard"
// import { Printer, KeyRound, Wifi, Monitor, Mail, Shield } from "lucide-react"

const faqs = [
  {
    title: "Printer not working",
    description: "Fix common printer connectivity issues",
  },
  {
    title: "Printer not working",
    description: "Fix common printer connectivity issues",
  },
  {
    title: "Printer not working",
    description: "Fix common printer connectivity issues",
  },
  {
    title: "Printer not working",
    description: "Fix common printer connectivity issues",
  },
  {
    title: "Printer not working",
    description: "Fix common printer connectivity issues",
  },
  {
    title: "Printer not working",
    description: "Fix common printer connectivity issues",
  },
]

export default function TampilanDaftarFaq() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {faqs.map((faq) => (
        <FaqCard
          key={faq.title}
          title={faq.title}
          description={faq.description}
        />
      ))}
    </div>
  )
}