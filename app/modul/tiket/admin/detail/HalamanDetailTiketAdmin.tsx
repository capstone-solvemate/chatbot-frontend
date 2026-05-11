import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import HalamanLoading from "~/dasar/HalamanLoading";
import type {
  TiketAdminDetail,
  StatusTiketAngka,
  PesanChat,
  PesanTiket,
} from "./dto/TiketAdminDetail";
import type {
  TiketAdminDetailResponseDto,
  PesanTiketResponseDto,
} from "./dto/TiketAdminDetailResponseDto";
import { dtoToTiketAdminDetail, dtoToPesanTiket } from "./dto/converters";
import type { Route } from "./+types/HalamanDetailTiketAdmin";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ticket Detail" }];
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: StatusTiketAngka; label: string }[] = [
  { value: 1, label: "Open" },
  { value: 2, label: "In Progress" },
  { value: 3, label: "Resolved" },
];

function labelStatus(status: StatusTiketAngka): string {
  return (
    STATUS_OPTIONS.find((s) => s.value === status)?.label ?? String(status)
  );
}

function statusBadgeClass(status: StatusTiketAngka): string {
  switch (status) {
    case 1:
      return "bg-blue-100 text-blue-700 border-blue-200";
    case 2:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case 3:
      return "bg-green-100 text-green-700 border-green-200";
  }
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatWaktu(iso: string): string {
  return new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTanggalWaktu(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Bubble Chat Histori AI ───────────────────────────────────────────────────

function BubbleChatHistori({ pesan }: { pesan: PesanChat }) {
  const waktu = formatWaktu(pesan.waktu);

  if (!pesan.dariAsisten) {
    // Karyawan → kanan, biru
    return (
      <div className="flex justify-end">
        <div className="max-w-[72%]">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
            {pesan.isi}
          </div>
          <p className="text-[11px] text-gray-400 mt-1 text-right">{waktu}</p>
        </div>
      </div>
    );
  }

  // AI → kiri, putih
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%]">
        <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          {pesan.isi}
        </div>
        <p className="text-[11px] text-gray-400 mt-1">{waktu}</p>
      </div>
    </div>
  );
}

// ─── Bubble Pesan Tiket (Support) ─────────────────────────────────────────────

function BubblePesanTiket({
  pesan,
  idPembuatTiket,
}: {
  pesan: PesanTiket;
  idPembuatTiket: number;
}) {
  const waktu = formatWaktu(pesan.waktu);
  const dariKaryawan = pesan.idPembuat === idPembuatTiket;

  if (dariKaryawan) {
    // Karyawan → kiri, putih
    return (
      <div className="flex justify-start">
        <div className="max-w-[75%]">
          <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
            {pesan.isi}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{waktu}</p>
        </div>
      </div>
    );
  }

  // Admin → kanan, biru + avatar
  return (
    <div className="flex justify-end items-end gap-2">
      <div className="max-w-[72%]">
        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          {pesan.isi}
        </div>
        <p className="text-[11px] text-gray-400 mt-1 text-right">{waktu}</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mb-5">
        You
      </div>
    </div>
  );
}

// ─── Seksi Histori Chatbot ─────────────────────────────────────────────────────

function SeksiHistoriChatbot({ historiChat }: { historiChat: PesanChat[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3.5 h-3.5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              AI Chatbot Conversation
            </h2>
            <p className="text-xs text-gray-400">
              Conversation before ticket creation
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 space-y-3 max-h-96 overflow-y-auto bg-gray-50">
        {historiChat.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No chatbot conversation recorded.
          </p>
        ) : (
          historiChat.map((p) => <BubbleChatHistori key={p.id} pesan={p} />)
        )}
      </div>
    </div>
  );
}

// ─── Seksi Human Support ──────────────────────────────────────────────────────

function SeksiHumanSupport({
  pesanTiket,
  idPembuatTiket,
  onKirimBalasan,
  mengirim,
}: {
  pesanTiket: PesanTiket[];
  idPembuatTiket: number;
  onKirimBalasan: (teks: string) => Promise<void>;
  mengirim: boolean;
}) {
  const [balasan, setBalasan] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pesanTiket]);

  async function handleKirim() {
    if (!balasan.trim() || mengirim) return;
    const teks = balasan.trim();
    setBalasan("");
    await onKirimBalasan(teks);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleKirim();
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3.5 h-3.5 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Human Support Conversation
            </h2>
            <p className="text-xs text-gray-400">
              After escalation to support team
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 space-y-3 max-h-72 overflow-y-auto bg-gray-50">
        {pesanTiket.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No support conversation yet.
          </p>
        ) : (
          pesanTiket.map((p) => (
            <BubblePesanTiket
              key={p.id}
              pesan={p}
              idPembuatTiket={idPembuatTiket}
            />
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-500 mb-2">Send Response</p>
        <div className="relative">
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-36 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            rows={3}
            placeholder="Type your response to the user..."
            value={balasan}
            onChange={(e) => setBalasan(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={mengirim}
          />
          <button
            onClick={handleKirim}
            disabled={!balasan.trim() || mengirim}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {mengirim ? "Sending..." : "Send Response"}
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5">
          Press Ctrl+Enter to send
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HalamanDetailTiketAdmin() {
  const { id } = useParams<{ id: string }>();
  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  const [tiket, setTiket] = useState<TiketAdminDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [menyimpanStatus, setMenyimpanStatus] = useState(false);
  const [mengirimBalasan, setMengirimBalasan] = useState(false);

  const mapKategori = useRef(new Map<number, Kategori>());
  function setDaftarKategori(data: Kategori[]) {
    mapKategori.current.clear();
    for (const kategori of data) {
      mapKategori.current.set(kategori.id, kategori);
    }
  }
  async function getDaftarKategori() {
    try {
      const response = await konektorBackend.get("/api/admin/categories");
      const dto: any[] = await response.json();
      setDaftarKategori(dto.map((d) => dtoToKategori(d)));
    } catch (e: any) {
      setMasterError(e);
      throw e;
    }
  }

  async function getTiketDetail() {
    try {
      const response = await konektorBackend.get(`/api/tiket/${id}/admin`);
      const body = (await response.json()) as {
        success: boolean;
        data: TiketAdminDetailResponseDto;
      };
      const tiketBaru = dtoToTiketAdminDetail(body.data);
      tiketBaru.kategori = mapKategori.current.get(tiketBaru.idKategori);
      setTiket(tiketBaru);
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDaftarKategori().then(() => getTiketDetail());
  }, [id]);

  /**
   * PATCH /api/tiket/:id/status
   * Body: { status: 1 | 2 | 3 }
   * Response 200: { success: true } — tidak mengembalikan data tiket.
   * Update state lokal langsung setelah sukses.
   */
  async function handleUbahStatus(statusBaru: StatusTiketAngka) {
    if (!tiket || menyimpanStatus || statusBaru === tiket.status) return;
    setMenyimpanStatus(true);
    // Optimistic update
    const statusLama = tiket.status;
    setTiket({ ...tiket, status: statusBaru });
    try {
      await konektorBackend.patch(`/api/tiket/${id}/status`, {
        status: statusBaru,
      });
    } catch (e: any) {
      // Rollback jika gagal
      setTiket({ ...tiket, status: statusLama });
      setMasterError(e);
    } finally {
      setMenyimpanStatus(false);
    }
  }

  /**
   * POST /api/tiket/:id/pesan
   * Body: { pesan: string }
   * Response 201: { success: true, data: PesanTiketResponseDto }
   * Append pesan baru langsung dari response — tidak perlu full refresh.
   */
  async function handleKirimBalasan(teks: string) {
    if (!tiket || mengirimBalasan) return;
    setMengirimBalasan(true);
    try {
      const response = await konektorBackend.post(`/api/tiket/${id}/pesan`, {
        pesan: teks,
      });
      const body = (await response.json()) as {
        success: boolean;
        data: PesanTiketResponseDto;
      };
      const pesanBaru = dtoToPesanTiket(body.data);
      setTiket({
        ...tiket,
        pesanTiket: [...tiket.pesanTiket, pesanBaru],
      });
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setMengirimBalasan(false);
    }
  }

  if (loading) return <HalamanLoading />;

  if (!tiket) {
    return (
      <main className="bg-gray-50 min-h-default flex items-center justify-center">
        <p className="text-gray-500 text-sm">Ticket not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      {/* Back */}
      <Link
        to="/admin/tiket"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-5"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Tickets
      </Link>

      <div className="flex gap-5 items-start">
        {/* ── Sidebar ──────────────────────────────────────────── */}
        <aside className="w-56 flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-5 sticky top-6">
          <h2 className="text-sm font-semibold text-gray-700">
            Ticket Details
          </h2>

          <div className="space-y-4">
            {/* Ticket ID */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                Ticket ID
              </p>
              <p className="text-sm font-mono font-medium text-gray-800">
                #{tiket.id.padStart(3, "0")}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Status
              </p>
              <div
                className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium mb-2 ${statusBadgeClass(tiket.status)}`}
              >
                {menyimpanStatus && (
                  <svg
                    className="animate-spin w-3 h-3 mr-1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
                {labelStatus(tiket.status)}
              </div>
              <select
                value={tiket.status}
                onChange={(e) =>
                  handleUbahStatus(Number(e.target.value) as StatusTiketAngka)
                }
                disabled={menyimpanStatus}
                className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-60 cursor-pointer"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* User */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                User
              </p>
              <p className="text-sm font-medium text-gray-800">
                {tiket.namaPembuat}
              </p>
              <p className="text-xs text-gray-400 break-all">
                {tiket.emailPembuat}
              </p>
            </div>

            {/* Category */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                Category
              </p>
              <p className="text-sm text-gray-800">
                {tiket.kategori?.nama || ""}
              </p>
            </div>

            {/* Created */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                Created
              </p>
              <p className="text-xs text-gray-600">
                {formatTanggalWaktu(tiket.dibuatPada)}
              </p>
            </div>
          </div>
        </aside>

        {/* ── Conversation Area ─────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-5">
          <SeksiHistoriChatbot historiChat={tiket.historiChat} />
          <SeksiHumanSupport
            pesanTiket={tiket.pesanTiket}
            idPembuatTiket={tiket.idPembuat}
            onKirimBalasan={handleKirimBalasan}
            mengirim={mengirimBalasan}
          />
        </div>
      </div>
    </main>
  );
}
