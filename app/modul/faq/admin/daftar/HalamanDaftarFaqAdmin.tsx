import PageHeader from "./PageHeader";
import FaqTableCard from "./FaqTableCard";
import type { Route } from "./+types/HalamanDaftarFaqAdmin";
import { Button } from "~/komponen/Button";
import IkonTambah from "~/komponen/ikon/IkonTambah";
import { useEffect, useState } from "react";
import type { FormState } from "../FormState";
import FaqFormCard from "./FaqFormCard";
import { Faq } from "../../Faq";
import HalamanLoading from "~/dasar/HalamanLoading";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import type { GetFaqsResponseDto } from "./GetFaqsResponseDto";
import { dtoToFaq } from "./converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "FAQ Management" }];
}

export default function HalamanDaftarFaqAdmin() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  async function getData() {
    try {
      const response = await konektorBackend.get("/api/admin/faqs");
      const data = (await response.json()) as GetFaqsResponseDto;

      const faqsBaru = data.faqs.map((dtoFaq) => dtoToFaq(dtoFaq));
      setFaqs(faqsBaru);

      setTotalFaqs(data.total);
    } catch (e: any) {
      setMasterError(e);
    }
  }

  useEffect(() => {
    getData().finally(() => {
      setLoading(false);
    });
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

  return !loading ? (
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
  ) : (
    <HalamanLoading />
  );
}
