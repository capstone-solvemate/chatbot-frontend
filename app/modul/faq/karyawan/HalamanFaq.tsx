import FaqHeader from "./FaqHeader";
import FaqSearch from "./FaqSearch";
import FaqCategoryTabs from "./FaqCategoryTabs";
import FaqList from "./FaqList";
import { useEffect, useRef, useState } from "react";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import type { Faq } from "../Faq";
import { useLoaderData, useNavigation } from "react-router";
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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  // const { KonektorBackend } = await import("~/dasar/KonektorBackend");
  // const konektorBackend = new KonektorBackend(() => {});
  const { KonektorRestApi } = await import("~/dasar/api/rest/KonektorRestApi");
  const konektorBackend = new KonektorRestApi(() => {});
  const [kategorisRes, faqsRes] = await Promise.all([
    konektorBackend.get("/api/categories"),
    konektorBackend.get("/api/faqs", {} as GetFaqsRequestDto),
  ]);

  const kategorisDto: any[] = await kategorisRes.json();
  const faqsData = (await faqsRes.json()) as GetFaqsResponseDto;

  const daftarKategori = kategorisDto.map((dto) => dtoToKategori(dto));

  const mapKategori = new Map<number, Kategori>();
  for (const k of daftarKategori) {
    mapKategori.set(k.id, k);
  }

  const faqs = faqsData.faqs.map((dtoFaq) => {
    const faq = dtoToFaq(dtoFaq);
    const kategoriTerkait = mapKategori.get(faq.idKategori);
    if (kategoriTerkait) faq.kategori = kategoriTerkait;
    return faq;
  });

  return { daftarKategori, faqs };
}

export default function FaqPage() {
  const data = useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();

  if (!data || navigation.state === "loading") return <HalamanLoading />;

  return (
    <FaqPageContent
      initialKategori={data.daftarKategori}
      initialFaqs={data.faqs}
    />
  );
}

function FaqPageContent({
  initialKategori,
  initialFaqs,
}: {
  initialKategori: Kategori[];
  initialFaqs: Faq[];
}) {
  const [filterKategori, setFilterKategori] = useState<Kategori | null>(null);
  const [faqDipilih, setFaqDipilih] = useState<Faq | null>(null);
  const [jawabanSurvei, setJawabanSurvei] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);

  const mapKategori = useRef(new Map<number, Kategori>());
  const [daftarKategori] = useState<Kategori[]>(() => {
    mapKategori.current.clear();
    for (const k of initialKategori) {
      mapKategori.current.set(k.id, k);
    }
    return initialKategori;
  });

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

      const faqsBaru = data.faqs.map((dtoFaq) => {
        const faq = dtoToFaq(dtoFaq);
        const kategoriTerkait = mapKategori.current.get(faq.idKategori);
        if (kategoriTerkait) faq.kategori = kategoriTerkait;
        return faq;
      });

      setFaqs(faqsBaru);
    } catch (e: any) {
      setMasterError(e);
    }
  }

  async function handleSelectFaq(faq: Faq) {
    setFaqDipilih(faq);
    setJawabanSurvei(null);

    konektorBackend.post(`/api/faqs/${faq.id}/lihat`).catch(() => {});

    konektorBackend
      .get(`/api/faqs/${faq.id}/survei`)
      .then((res) => res.json())
      .then((data: { jawaban: boolean | null }) =>
        setJawabanSurvei(data.jawaban),
      )
      .catch(() => setJawabanSurvei(null));
  }

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) return;
    getFaqs();
  }, [filterKategori]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    getFaqs();
  }, [debouncedSearch]);

  return (
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
  );
}
