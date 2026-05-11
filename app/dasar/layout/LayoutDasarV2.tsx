import { useState, useEffect, useRef, useCallback } from "react";
import { Outlet } from "react-router";
import DevModeNotification from "../DevModeNotification";
import { StateOtentikasi } from "../StateOtentikasi";
import HalamanLoading from "../HalamanLoading";
import { FetchError, HttpError, KonektorBackend } from "../KonektorBackend";
import HalamanOffline from "../HalamanOffline";
import MasterError from "../MasterError";
import { dtoToInfoPengguna, type InfoPenggunaDto } from "../InfoPenggunaDto";
import LogoutConfirmationView from "../LogoutConfirmationView";
import type { StateNotifikasi } from "../notifikasi/StateNotifikasi";
import type { GetNotifikasiResponseDto } from "../notifikasi/GetNotifikasiResponseDto";
import { dtoToNotifikasi } from "../notifikasi/converters";
import type { OutletContext } from "../OutletContext";
import type { Notifikasi } from "../notifikasi/Notifikasi";
import ToastNotifikasi from "~/komponen/notifikasi/ToastNotifikasi";

export default function LayoutDasarV2(): React.JSX.Element {
  const [devMode, setDevMode] = useState(false);
  const [stateOtentikasi, setStateOtentikasi] = useState(
    new StateOtentikasi(true),
  );
  const [stateNotifikasi, setStateNotifikasi] =
    useState<StateNotifikasi | null>(null);
  const [offline, setOffline] = useState(false);
  const [masterError, setMasterError] = useState<any | null>(null);
  const [masterErrorStr, setMasterErrorStr] = useState<string | null>(null);
  const [masterNotifikasi, setMasterNotifikasi] = useState<any | null>(null);
  const [logoutPrompted, setLogoutPrompted] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Toast realtime dari WS — bisa stack beberapa sekaligus
  const [toastList, setToastList] = useState<Notifikasi[]>([]);

  const loadingMoreRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);

  const loading = stateOtentikasi.loading;

  const konektorBackend = new KonektorBackend(() => setDevMode(true));

  // — Master error —
  useEffect(() => {
    if (masterError === null) {
      setMasterErrorStr(null);
      return;
    }
    console.log(masterError);
    if (masterError instanceof FetchError) {
      setMasterErrorStr(
        "There is an internet connection issue or the server is unavailable.",
      );
    } else if (masterError instanceof Error) {
      setMasterErrorStr(masterError.message);
    } else {
      setMasterErrorStr("Something went wrong.");
    }
  }, [masterError]);

  // — Fetch notifikasi (load awal atau load more) —
  async function fetchNotifikasi(cursor?: string): Promise<void> {
    const params: Record<string, any> = {};
    if (cursor) params.sebelum = cursor;

    const resp = await konektorBackend.get("/api/notifikasi", params);
    const respData: GetNotifikasiResponseDto = await resp.json();
    console.log(respData.notifikasi);
    const notifikasiBaru = respData.notifikasi.map((dto) =>
      dtoToNotifikasi(dto),
    );

    if (cursor) {
      // Load more: append
      setStateNotifikasi((prev) => {
        if (!prev) return prev;
        return {
          jumlahBelumDibaca: respData.jumlahBelumDibaca,
          notifikasi: [...prev.notifikasi, ...notifikasiBaru],
          adaLebihBanyak: respData.adaLebihBanyak,
        };
      });
    } else {
      // Load awal: replace
      setStateNotifikasi({
        jumlahBelumDibaca: respData.jumlahBelumDibaca,
        notifikasi: notifikasiBaru,
        adaLebihBanyak: respData.adaLebihBanyak,
      });
    }
  }

  // — Load more (dipanggil dari CardNotifikasi saat scroll ke bawah) —
  const loadMoreNotifikasi = useCallback(async (): Promise<void> => {
    if (loadingMoreRef.current) return;
    if (!stateNotifikasi?.adaLebihBanyak) return;
    if (!stateNotifikasi.notifikasi.length) return;

    loadingMoreRef.current = true;
    try {
      const notifikasiTerlama =
        stateNotifikasi.notifikasi[stateNotifikasi.notifikasi.length - 1];
      const cursor = notifikasiTerlama.id.toString();
      await fetchNotifikasi(cursor);
    } catch (e: any) {
      setMasterError(e);
    } finally {
      loadingMoreRef.current = false;
    }
  }, [stateNotifikasi]);

  // — Mark single as read —
  const markNotifikasiAsRead = useCallback(
    async (id: bigint): Promise<void> => {
      // Optimistic update dulu
      setStateNotifikasi((prev) => {
        if (!prev) return prev;
        const sudahDibaca =
          prev.notifikasi.find((n) => n.id === id)?.dibacaPada !== null;
        if (sudahDibaca) return prev;
        return {
          ...prev,
          jumlahBelumDibaca: Math.max(0, prev.jumlahBelumDibaca - 1),
          notifikasi: prev.notifikasi.map((n) =>
            n.id === id ? { ...n, dibacaPada: new Date() } : n,
          ),
        };
      });

      try {
        await konektorBackend.patch(`/api/notifikasi/${id}/baca`);
      } catch (e: any) {
        // Rollback optimistic update
        setStateNotifikasi((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            jumlahBelumDibaca: prev.jumlahBelumDibaca + 1,
            notifikasi: prev.notifikasi.map((n) =>
              n.id === id ? { ...n, dibacaPada: null } : n,
            ),
          };
        });
        setMasterError(e);
      }
    },
    [konektorBackend],
  );

  // — Mark all as read —
  const markAllNotifikasiAsRead = useCallback(async (): Promise<void> => {
    const now = new Date();

    // Optimistic update
    setStateNotifikasi((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        jumlahBelumDibaca: 0,
        notifikasi: prev.notifikasi.map((n) => ({
          ...n,
          dibacaPada: n.dibacaPada ?? now,
        })),
      };
    });

    try {
      await konektorBackend.patch("/api/notifikasi/baca-semua");
    } catch (e: any) {
      // Rollback: refetch
      await fetchNotifikasi();
      setMasterError(e);
    }
  }, [konektorBackend]);

  // — WebSocket —
  const connectWs = useCallback(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL as string;
    const wsUrl =
      baseUrl.replace(/^http/, "ws").replace(/\/$/, "") + "/api/notifikasi/ws";

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.addEventListener("message", (event) => {
      try {
        const pesan = JSON.parse(event.data);

        if (pesan.type === "session_expired") {
          window.location.href = "/login";
          return;
        }

        const notifikasiMasuk = dtoToNotifikasi(pesan);

        // Prepend ke state notifikasi
        setStateNotifikasi((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            jumlahBelumDibaca: prev.jumlahBelumDibaca + 1,
            notifikasi: [notifikasiMasuk, ...prev.notifikasi],
          };
        });

        // Tambah ke toast list
        setToastList((prev) => [...prev, notifikasiMasuk]);
      } catch (e) {
        console.error("WS message parse error:", e);
      }
    });

    ws.addEventListener("close", (event) => {
      wsRef.current = null;
      if (event.code === 4001) {
        window.location.href = "/login";
        return;
      }
      // Reconnect setelah 3 detik kalau bukan karena auth error
      if (event.code !== 1000) {
        setTimeout(() => connectWs(), 3000);
      }
    });

    ws.addEventListener("error", () => {
      ws.close();
    });
  }, []);

  const dismissToast = useCallback((id: bigint) => {
    setToastList((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // — Otentikasi: cek sesi saat mount —
  useEffect(() => {
    const fn = async () => {
      try {
        const resp = await konektorBackend.get("/api/auth/me");
        const dto: InfoPenggunaDto = await resp.json();
        setStateOtentikasi(new StateOtentikasi(false, dtoToInfoPengguna(dto)));
        await fetchNotifikasi();
        connectWs();
      } catch (e: any) {
        if (e instanceof HttpError && e.status === 401) {
          setStateOtentikasi(new StateOtentikasi(false));
        } else if (e instanceof FetchError) {
          setOffline(true);
          setStateOtentikasi(new StateOtentikasi(false));
        } else {
          setMasterError(e);
        }
      }
    };
    fn();

    return () => {
      wsRef.current?.close(1000);
    };
  }, []);

  // — Logout —
  const promptLogout = () => setLogoutPrompted(true);
  const handleCancelLogout = () => setLogoutPrompted(false);

  const handleConfirmLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    const reload = () => location.reload();
    try {
      await konektorBackend.post("/api/auth/logout");
      reload();
    } catch (e: any) {
      if (e instanceof HttpError && e.status === 401) {
        reload();
      } else {
        setMasterError(e);
      }
    } finally {
      setLogoutPrompted(false);
      setLoggingOut(false);
    }
  };

  // — Outlet context —
  const outletContext: OutletContext = {
    devMode,
    stateOtentikasi,
    konektorBackend,
    setMasterNotifikasi,
    setMasterError,
    promptLogout,
    stateNotifikasi,
    loadMoreNotifikasi,
    markNotifikasiAsRead,
    markAllNotifikasiAsRead,
  };

  return (
    <div className={`min-h-screen ${devMode && "pt-7"}`}>
      {devMode && <DevModeNotification />}
      {masterErrorStr && (
        <MasterError
          message={masterErrorStr}
          closable={!loading}
          onClose={() => setMasterError(null)}
        />
      )}
      {loading ? (
        <HalamanLoading devMode={devMode} />
      ) : offline ? (
        <HalamanOffline />
      ) : (
        <>
          <Outlet context={outletContext satisfies OutletContext} />
          {logoutPrompted && (
            <LogoutConfirmationView
              loading={loggingOut}
              onCancel={handleCancelLogout}
              onConfirm={handleConfirmLogout}
            />
          )}
          {/* Toast realtime dari WS */}
          <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end pointer-events-none">
            {stateOtentikasi.pengguna &&
              toastList.map((notifikasi) => (
                <ToastNotifikasi
                  peran={stateOtentikasi.pengguna!.peran}
                  key={notifikasi.id.toString()}
                  notifikasi={notifikasi}
                  onDismiss={() => dismissToast(notifikasi.id)}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
