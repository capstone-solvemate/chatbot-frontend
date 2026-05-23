import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Faq } from "../faq/Faq";
import TampilanHasilCariFaq from "./TampilanHasilCariFaq";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import type { GetFaqsRequestDto } from "../faq/admin/dto/GetFaqsRequestDto";
import type { GetFaqsResponseDto } from "../faq/admin/daftar/GetFaqsResponseDto";
import { dtoToFaq } from "../faq/admin/daftar/converters";
import { useMasterError } from "~/dasar/hooks/useMasterError";

export default function TampilanCariFaq() {
  const [showResult, setShowResult] = useState(false);
  const [foundFaqs, setFoundFaqs] = useState<Faq[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [isFocus, setFocus] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  useEffect(() => {
    if (isFocus && search.trim()) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [isFocus, search]);

  async function getFaqs() {
    if (isLoading) {
      return;
    }

    try {
      setLoading(true);

      const reqData: GetFaqsRequestDto = {
        idkategori: null,
        query: debouncedSearch.trim() ? debouncedSearch.trim() : null,
      };
      const response = await konektorBackend.get("/api/faqs", reqData);
      const data = (await response.json()) as GetFaqsResponseDto;

      const faqsBaru = data.faqs.map((dtoFaq) => {
        const faq = dtoToFaq(dtoFaq);
        return faq;
      });

      setFirstSearch(false);
      setFoundFaqs(faqsBaru);
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFoundFaqs([]);
      setFirstSearch(true);
      return;
    }

    getFaqs();
  }, [debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  function handleSearchBarFocus() {
    setFocus(true);
  }

  function handleSearchBarBlur() {
    setFocus(false);
  }

  return (
    <section className="bg-linear-to-b from-[#EFF6FF] to-white pb-16 pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-5xl font-medium text-gray-900">
          How can we help you?
        </h1>

        <div className="mt-8 relative">
          <SearchBar
            id="cariFaq"
            onFocus={handleSearchBarFocus}
            onBlur={handleSearchBarBlur}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            loading={isLoading}
            showResult={showResult}
          />
          {showResult && (
            <TampilanHasilCariFaq
              foundFaqs={foundFaqs}
              loading={isLoading}
              className="absolute left-0 top-full"
              firstSearch={firstSearch}
            />
          )}
        </div>

        {/* <div className="mt-6">
          <PopularSearches />
        </div> */}
      </div>
    </section>
  );
}
