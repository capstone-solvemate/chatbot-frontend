import FaqHeader from "./FaqHeader";
import FaqSearch from "./FaqSearch";
import FaqCategoryTabs from "./FaqCategoryTabs";
import FaqList from "./FaqList";
import { useEffect, useRef, useState } from "react";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import type { Faq } from "../Faq";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import type { GetFaqsResponseDto } from "../admin/daftar/GetFaqsResponseDto";
import { dtoToFaq } from "../admin/daftar/converters";
import HalamanLoading from "~/dasar/HalamanLoading";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";
import type { Route } from "./+types/HalamanFaq";
import DetailFaq from "./DetailFaq";
import type { GetFaqsRequestDto } from "../admin/dto/GetFaqsRequestDto";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Frequently Asked Questions" }];
}

export default function FaqPage() {
  const [loading, setLoading] = useState(true);
  const [filterKategori, setFilterKategori] = useState<Kategori | null>(null);

  const [faqDipilih, setFaqDipilih] = useState<Faq | null>(null);
  const [jawabanSurvei, setJawabanSurvei] = useState<boolean | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const mapKategori = useRef(new Map<number, Kategori>());
  const [daftarKategori, _setDaftarKategori] = useState<Kategori[]>([]);
  function setDaftarKategori(data: Kategori[]) {
    mapKategori.current.clear();
    for (const kategori of data) {
      mapKategori.current.set(kategori.id, kategori);
    }
    _setDaftarKategori(data);
  }

  const [faqs, setFaqs] = useState<Faq[]>([]);

  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  async function getFaqs() {
    try {
      const reqData: GetFaqsRequestDto = {
        idkategori: filterKategori?.id || null,
        query: debouncedSearch.trim() ? debouncedSearch.trim() : null,
      };
      const response = await konektorBackend.get("/api/faqs", reqData);
      const data = (await response.json()) as GetFaqsResponseDto;

      const faqsBaru = data.faqs.map((dtoFaq) => dtoToFaq(dtoFaq));
      for (const faq of faqsBaru) {
        const kategoriTerkait = mapKategori.current.get(faq.idKategori);
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

  async function handleSelectFaq(faq: Faq) {
    setFaqDipilih(faq);
    setJawabanSurvei(null); // reset state survei sebelum data baru datang

    // POST lihat — fire and forget, tidak perlu tunggu
    konektorBackend.post(`/api/faqs/${faq.id}/lihat`).catch(() => {});

    // GET survei — update state saat response datang
    konektorBackend
      .get(`/api/faqs/${faq.id}/survei`)
      .then((res) => res.json())
      .then((data: { jawaban: boolean | null }) =>
        setJawabanSurvei(data.jawaban),
      )
      .catch(() => setJawabanSurvei(null));
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
    <main className="min-h-default bg-gray-50">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <FaqHeader />
        <FaqSearch search={search} onSearchChange={setSearch} />
        <FaqCategoryTabs
          daftarKategori={daftarKategori}
          filterKategori={filterKategori}
          onSelectKategori={(kategori) => setFilterKategori(kategori)}
        />
        <FaqList faqs={faqs} onSelectFaq={handleSelectFaq} />
      </section>

      {faqDipilih && (
        <DetailFaq
          faq={faqDipilih}
          jawabanSurvei={jawabanSurvei}
          onJawabanSurveiChange={setJawabanSurvei}
          onClose={() => setFaqDipilih(null)}
          konektorBackend={konektorBackend}
        />
      )}
    </main>
  ) : (
    <HalamanLoading />
  );
}
