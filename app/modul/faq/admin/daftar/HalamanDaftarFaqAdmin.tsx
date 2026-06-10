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
import type { GetFaqsResponseDto } from "./GetFaqsResponseDto";
import { dtoAdminToFaq } from "./converters";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";
import FaqDeleteConfirmation from "./FaqDeleteConfirmation";
import type { GetFaqsRequestDto } from "../dto/GetFaqsRequestDto";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";

export function meta({}: Route.MetaArgs) {
  return [{ title: "FAQ Management" }];
}

export default function HalamanDaftarFaqAdmin() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [loading, setLoading] = useState(true);

  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);
  const [filterKategori, setFilterKategori] = useState<Kategori | null>(null);

  const [faqAkanDihapus, setFaqAkanDihapus] = useState<Faq | null>(null);
  const [menghapus, setMenghapus] = useState(false);

  const formRef = useRef<any>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
      const reqData: GetFaqsRequestDto = {
        idkategori: filterKategori?.id || null,
        query: debouncedSearch.trim() ? debouncedSearch.trim() : null,
      };
      const response = await konektorBackend.get("/api/admin/faqs", reqData);
      const data = (await response.json()) as GetFaqsResponseDto;

      const faqsBaru = data.faqs.map((dtoFaq) => dtoAdminToFaq(dtoFaq));
      setFaqs(faqsBaru);

      setTotalFaqs(data.total);
    } catch (e: any) {
      setMasterError(e);
    }
  }

  function handleSelectFilterKategori(id: number) {
    if (id < 1) {
      setFilterKategori(null);
    } else {
      setFilterKategori(
        daftarKategori.find((kategori) => kategori.id === id) || null,
      );
    }
  }

  useEffect(() => {
    getFaqs();
  }, [filterKategori]);

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

  function handleHapus(faq: Faq) {
    faq.kategori = daftarKategori.find((k) => k.id === faq.idKategori) || null;
    setFaqAkanDihapus(faq);
  }

  useEffect(() => {
    if (formRef && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formState]);

  async function handleKonfirmasiHapus() {
    if (!faqAkanDihapus) return;
    if (menghapus) return;
    setMenghapus(true);

    try {
      await konektorBackend.delete(`/api/admin/faqs/${faqAkanDihapus!.id}`);
      getFaqs();
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setMenghapus(false);
      setFaqAkanDihapus(null);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getFaqs();
  }, [debouncedSearch]);

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
        <FaqTableCard
          daftarKategori={daftarKategori}
          filterKategori={filterKategori}
          totalFaqs={totalFaqs}
          onSelectFilterKategori={handleSelectFilterKategori}
          faqs={faqs}
          onEdit={handleEdit}
          onHapus={handleHapus}
          search={search}
          onChangeSearch={setSearch}
        />
      </div>

      {faqAkanDihapus && (
        <FaqDeleteConfirmation
          onCancel={() => {
            setFaqAkanDihapus(null);
          }}
          onConfirm={handleKonfirmasiHapus}
          faq={faqAkanDihapus}
          isDeleting={menghapus}
        />
      )}
    </main>
  ) : (
    <HalamanLoading />
  );
}
