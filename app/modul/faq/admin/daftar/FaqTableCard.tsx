import FaqToolbar from "./FaqToolbar";
import FaqRow from "./FaqRow";
import type { Faq } from "../../Faq";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import CardListAdmin from "~/komponen/admin/CardListAdmin";

interface Props {
  daftarKategori: Kategori[];
  filterKategori: Kategori | null;
  onSelectFilterKategori: (id: number) => void;
  totalFaqs: number;
  faqs: Faq[];
  search: string;
  onChangeSearch: (search: string) => void;
  onEdit: (faq: Faq) => void;
  onHapus: (faq: Faq) => void;
}

export default function FaqTableCard({
  daftarKategori,
  filterKategori,
  onSelectFilterKategori,
  faqs,
  totalFaqs,
  search,
  onChangeSearch,
  onEdit,
  onHapus,
}: Props) {
  return (
    <CardListAdmin>
      <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-sm text-gray-800">
          All FAQs ({totalFaqs})
        </h2>

        <FaqToolbar
          daftarKategori={daftarKategori}
          filterKategori={filterKategori}
          onSelectFilterKategori={onSelectFilterKategori}
          search={search}
          onChangeSearch={onChangeSearch}
        />
      </div>

      <div>
        {faqs.map((faq) => (
          <FaqRow
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            onEdit={() => onEdit(faq)}
            onHapus={() => onHapus(faq)}
          />
        ))}
        {faqs.length === 0 && (
          <div className="p-4 text-center text-gray-500 italic">No Data</div>
        )}
      </div>
    </CardListAdmin>
  );
}
