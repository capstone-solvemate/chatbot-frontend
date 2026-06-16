import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import HalamanLoading from "~/dasar/HalamanLoading";
import type {
  TiketAdminDetail,
  StatusTiketAngka,
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
import IkonPanahKiri from "~/komponen/ikon/IkonPanahKiri";
import IkonLoading from "~/komponen/ikon/IkonLoading";
import BagianHistoryChatbot from "./BagianHistoryChatbot";
import BagianHumanSupport from "./BagianHumanSupport";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ticket Detail" }];
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: StatusTiketAngka; label: string }[] = [
  { value: 1, label: "Open" },
  { value: 2, label: "In Progress" },
  { value: 3, label: "Resolved" },
];

function formatTanggalWaktu(iso: string): string {
  return new Date(iso).toISOString().slice(0, 19).replace("T", " ");
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
    <main className="bg-gray-50 text-gray-800 px-16 py-6 min-h-default">
      <div className="flex gap-5 items-start">
        <div className="w-72 shrink-0">
          <div className="w-72 shrink-0 fixed z-30 top-24">
            {/* Back */}
            <Link
              to="/admin/tiket"
              className="inline-flex items-center gap-1.5 text-sm text-gray-900 hover:text-gray-500 transition-colors mb-5"
            >
              <IkonPanahKiri />
              Back to Tickets
            </Link>

            {/* ── Sidebar ──────────────────────────────────────────── */}
            <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-5">
              <h2 className="text-lg font-semibold text-gray-700">
                Ticket Details
              </h2>

              <div className="space-y-4">
                {/* Ticket ID */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-gray-600">
                    Ticket ID
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    #{tiket.id.padStart(3, "0")}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-gray-600">
                    Status
                  </p>
                  <select
                    value={tiket.status}
                    onChange={(e) =>
                      handleUbahStatus(
                        Number(e.target.value) as StatusTiketAngka,
                      )
                    }
                    disabled={menyimpanStatus}
                    className="relative w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-60 cursor-pointer mt-2"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {menyimpanStatus && <IkonLoading />}
                </div>

                {/* User */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-gray-600">
                    User
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-2">
                    {tiket.namaPembuat}
                  </p>
                  <p className="text-xs text-gray-600 break-all mt-1">
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

                {/* Attachments */}
                {tiket.lampiranIds.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                      Attachments
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {tiket.lampiranIds.map((lampiranId) => {
                        const urlLampiran = `/api/tiket/${tiket.idChat}/lampiran/${lampiranId}`;
                        return (
                          <a type="button" href={urlLampiran} target="_blank">
                            <div className="rounded-md overflow-hidden">
                              <img src={urlLampiran} className="w-10 h-10" />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* ── Conversation Area ─────────────────────────────────── */}
        <div className="flex-1 pt-12">
          <div className="pt-1 min-w-0 space-y-5">
            <BagianHistoryChatbot historiChat={tiket.historiChat} />
            <BagianHumanSupport
              pesanTiket={tiket.pesanTiket}
              idPembuatTiket={tiket.idPembuat}
              onKirimBalasan={handleKirimBalasan}
              mengirim={mengirimBalasan}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
