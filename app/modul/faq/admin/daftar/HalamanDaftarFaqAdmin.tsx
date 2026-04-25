import PageHeader from "./PageHeader";
import FaqTableCard from "./FaqTableCard";
import type { Route } from "./+types/HalamanDaftarFaqAdmin";
import { Button } from "~/komponen/Button";
import IkonTambah from "~/komponen/ikon/IkonTambah";
import { useEffect, useState } from "react";
import type { FormState } from "../FormState";
import FaqFormCard from "./FaqFormCard";
import { Faq } from "../../Faq";

export function meta({}: Route.MetaArgs) {
  return [{ title: "FAQ Management" }];
}

export default function HalamanDaftarFaqAdmin() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [totalFaqs, setTotalFaqs] = useState(0);

  useEffect(() => {
    setFaqs([
      new Faq(
        1,
        1,
        "How do I connect to the network printer?",
        "Go to Settings > Devices > Printers & Scanners > Add a printer.",
      ),
    ]);
    setTotalFaqs(1);
  }, []);

  const [formState, setFormState] = useState<FormState | null>(null);

  function showNewForm() {
    setFormState({ oldFaq: null });
  }

  function hideForm() {
    setFormState(null);
  }

  function handleEdit(faq: Faq) {
    setFormState({ oldFaq: faq });
  }

  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      <PageHeader />

      {formState ? (
        <FaqFormCard oldFaq={formState.oldFaq} onCancel={hideForm} />
      ) : (
        <Button
          className="mt-5 text-sm! ps-2! pe-3! py-2! gap-1!"
          leftIcon={<IkonTambah className="h-5" />}
          onClick={() => showNewForm()}
        >
          Add New FAQ
        </Button>
      )}

      <div className="mt-6">
        <FaqTableCard totalFaqs={totalFaqs} faqs={faqs} onEdit={handleEdit} />
      </div>
    </main>
  );
}
