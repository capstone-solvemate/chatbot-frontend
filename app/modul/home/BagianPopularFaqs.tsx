import { useEffect, useState } from "react";
import TampilanDaftarFaq from "./TampilanDaftarFaq";
import type { Faq } from "~/modul/faq/Faq";
import { dtoToFaq } from "~/modul/faq/admin/daftar/converters";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { Link } from "react-router";
import DetailFaq from "../faq/karyawan/DetailFaq";

export default function BagianPopularFaqs() {
  const konektorBackend = useKonektorBackend();
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  const [faqDipilih, setFaqDipilih] = useState<Faq | null>(null);
  const [jawabanSurvei, setJawabanSurvei] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchPopularFaqs = async () => {
      try {
        const response = await konektorBackend.get("/api/faqs/populer");
        const data = await response.json();
        setFaqs(data.data.map((dto: Record<string, any>) => dtoToFaq(dto)));
      } catch (_e) {
        // Gagal fetch: biarkan list kosong, halaman tetap tampil
      } finally {
        setLoading(false);
      }
    };

    fetchPopularFaqs();
  }, []);

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

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-medium text-gray-900">Popular FAQs</h2>
          <p className="mt-2 text-sm text-gray-500">
            Find quick answers to common questions
          </p>
        </div>

        <TampilanDaftarFaq
          faqs={faqs}
          loading={loading}
          onSelectFaq={handleSelectFaq}
        />

        {!loading && (
          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="text-sm cursor-pointer font-medium text-blue-600 hover:underline"
            >
              View all FAQs →
            </Link>
          </div>
        )}
      </div>

      {faqDipilih && (
        <DetailFaq
          faq={faqDipilih}
          jawabanSurvei={jawabanSurvei}
          onJawabanSurveiChange={setJawabanSurvei}
          onClose={() => setFaqDipilih(null)}
          konektorBackend={konektorBackend}
        />
      )}
    </section>
  );
}
