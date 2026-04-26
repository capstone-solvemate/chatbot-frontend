import PageHeader from "./PageHeader";
import FaqTableCard from "./FaqTableCard";
import type { Route } from "./+types/HalamanDaftarFaqAdmin";
import { Button } from "~/komponen/Button";
import IkonTambah from "~/komponen/ikon/IkonTambah";
import { useEffect, useRef, useState } from "react";
import type { FormState } from "../FormState";
import FaqFormCard from "./FaqFormCard";
import { Faq } from "../../Faq";
import HalamanLoading from "~/dasar/HalamanLoading";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import type { GetFaqsResponseDto } from "./GetFaqsResponseDto";
import { dtoToFaq } from "./converters";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/daftar/converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "FAQ Management" }];
}

export default function HalamanDaftarFaqAdmin() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();
  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);

  const formRef = useRef<any>(null);

  async function getDaftarKategori() {
    try {
      const response = await konektorBackend.get("/api/admin/categories");
      const dto: any[] = await response.json();
      const daftarKategoriBaru = dto.map((dtoItem) => dtoToKategori(dtoItem));
      setDaftarKategori(daftarKategoriBaru);
    } catch (e: any) {
      setMasterError(e);
      throw e;
    }
  }

  async function getFaqs() {
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
    getDaftarKategori().then(() => {
      getFaqs().finally(() => {
        setLoading(false);
      });
    });
  }, []);

  const [formState, setFormState] = useState<FormState | null>(null);

  function showNewForm() {
    setFormState({ oldFaq: null });
  }

  function handleCloseForm(refreshRequired: boolean) {
    setFormState(null);
    if (refreshRequired) {
      getFaqs();
    }
  }

  function handleEdit(faq: Faq) {
    setFormState({ oldFaq: faq });
  }

  useEffect(() => {
    if (formRef && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formState]);

  return !loading ? (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      <PageHeader />

      {formState ? (
        <FaqFormCard
          daftarKategori={daftarKategori}
          ref={formRef}
          oldFaq={formState.oldFaq}
          onClose={handleCloseForm}
        />
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
