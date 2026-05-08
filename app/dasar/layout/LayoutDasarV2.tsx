import { useState, useEffect } from "react";
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

  const loading = stateOtentikasi.loading;

  const konektorBackend = new KonektorBackend(() => setDevMode(true));

  // — Master error: convert error ke string —
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

  // — Notifikasi —
  async function fetchNotifikasi() {
    const resp = await konektorBackend.get("/api/notifikasi");
    const respData: GetNotifikasiResponseDto = await resp.json();
    setStateNotifikasi({
      jumlahBelumDibaca: respData.jumlahBelumDibaca,
      notifikasi: respData.notifikasi.map((dto) => dtoToNotifikasi(dto)),
    });
  }

  // — Otentikasi: cek sesi saat mount —
  useEffect(() => {
    const fn = async () => {
      try {
        const resp = await konektorBackend.get("/api/auth/me");
        const dto: InfoPenggunaDto = await resp.json();
        setStateOtentikasi(new StateOtentikasi(false, dtoToInfoPengguna(dto)));
        await fetchNotifikasi();
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
        </>
      )}
    </div>
  );
}
