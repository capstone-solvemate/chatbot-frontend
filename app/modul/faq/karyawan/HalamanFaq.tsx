import FaqHeader from "./FaqHeader";
import FaqSearch from "./FaqSearch";
import FaqCategoryTabs from "./FaqCategoryTabs";
import FaqList from "./FaqList";
import { useEffect, useState } from "react";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import type { Faq } from "../Faq";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import type { GetFaqsResponseDto } from "../admin/daftar/GetFaqsResponseDto";
import { dtoToFaq } from "../admin/daftar/converters";
import HalamanLoading from "~/dasar/HalamanLoading";
import { dtoToKategori } from "~/modul/settings/kategori/daftar/converters";
import type { Route } from "./+types/HalamanFaq";
import DetailFaq from "./DetailFaq";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Frequently Asked Questions" }];
}

export default function FaqPage() {
  const [loading, setLoading] = useState(true);
  const [filterKategori, setFilterKategori] = useState<Kategori | null>(null);

  const [faqDipilih, setFaqDipilih] = useState<Faq | null>(null);

  const mapKategori = new Map<number, Kategori>();
  const [daftarKategori, _setDaftarKategori] = useState<Kategori[]>([]);
  function setDaftarKategori(data: Kategori[]) {
    mapKategori.clear();
    for (const kategori of data) {
      mapKategori.set(kategori.id, kategori);
    }

    _setDaftarKategori(data);
  }

  const [faqs, setFaqs] = useState<Faq[]>([]);

  const [_a, _b, konektorBackend, _d, setMasterError]: ContextType =
    useOutletContext();

  async function getFaqs() {
    try {
      const response = await konektorBackend.get("/api/faqs");
      const data = (await response.json()) as GetFaqsResponseDto;

      const faqsBaru = data.faqs.map((dtoFaq) => dtoToFaq(dtoFaq));
      for (const faq of faqsBaru) {
        const kategoriTerkait = mapKategori.get(faq.idKategori);
        if (kategoriTerkait) {
          faq.kategori = kategoriTerkait;
        }
      }

      setFaqs(faqsBaru);
    } catch (e: any) {
      setMasterError(e);
    }
  }

  async function getDaftarKategori() {
    try {
      const response = await konektorBackend.get("/api/categories");
      const dto: any[] = await response.json();
      const daftarKategoriBaru = dto.map((dtoItem) => dtoToKategori(dtoItem));
      setDaftarKategori(daftarKategoriBaru);
    } catch (e: any) {
      setMasterError(e);
      throw e;
    }
  }

  useEffect(() => {
    getDaftarKategori().then(() => {
      getFaqs().finally(() => {
        setLoading(false);
      });
    });
  }, []);

  return !loading ? (
    <main className="min-h-default bg-gray-50">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <FaqHeader />
        <FaqSearch />
        <FaqCategoryTabs
          daftarKategori={daftarKategori}
          filterKategori={filterKategori}
          onSelectKategori={(kategori) => setFilterKategori(kategori)}
        />
        <FaqList faqs={faqs} onSelectFaq={(faq) => setFaqDipilih(faq)} />
      </section>

      {faqDipilih && (
        <DetailFaq faq={faqDipilih} onClose={() => setFaqDipilih(null)} />
      )}
    </main>
  ) : (
    <HalamanLoading />
  );
}
