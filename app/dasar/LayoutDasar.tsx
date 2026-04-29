import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import DevModeNotification from "./DevModeNotification";
import { StateOtentikasi } from "./StateOtentikasi";
import HalamanLoading from "./HalamanLoading";
import { FetchError, HttpError, KonektorBackend } from "./KonektorBackend";
import HalamanOffline from "./HalamanOffline";
import MasterError from "./MasterError";
import { dtoToInfoPengguna, type InfoPenggunaDto } from "./InfoPenggunaDto";
import LogoutConfirmationView from "./LogoutConfirmationView";
import type { StateNotifikasi } from "./notifikasi/StateNotifikasi";
import type { GetNotifikasiResponseDto } from "./notifikasi/GetNotifikasiResponseDto";
import { dtoToNotifikasi } from "./notifikasi/converters";

export default function LayoutDasar(): React.JSX.Element {
  const [devMode, setDevMode] = useState(false);
  const [stateOtentikasi, setStateOtentikasi] = useState(
    new StateOtentikasi(true),
  );
  const [stateNotifikasi, setStateNotifikasi] =
    useState<StateNotifikasi | null>(null);
  const [offline, setOffline] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(stateOtentikasi.loading);
  }, [stateOtentikasi]);

  const [masterError, setMasterError] = useState<any | null>(null);

  const [masterErrorStr, setMasterErrorStr] = useState<string | null>(null);
  useEffect(() => {
    if (masterError === null) {
      setMasterErrorStr(null);
    } else {
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
    }
  }, [masterError]);

  const [masterNotifikasi, setMasterNotifikasi] = useState<any | null>(null);

  const konektorBackend = new KonektorBackend(() => setDevMode(true));

  const [logoutPrompted, setLogoutPrompted] = useState(false);
  const promptLogout = () => {
    setLogoutPrompted(true);
  };

  const [loggingOut, setLoggingOut] = useState(false);

  const handleCancelLogout = () => {
    setLogoutPrompted(false);
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const reload = () => {
      location.reload();
    };
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

  async function getNotifikasi() {
    const resp = await konektorBackend.get("/api/notifikasi");
    const respData: GetNotifikasiResponseDto = await resp.json();
    const notifikasi = respData.notifikasi.map((dto) => dtoToNotifikasi(dto));
    const stateNotifikasi: StateNotifikasi = {
      jumlahBelumDibaca: respData.jumlahBelumDibaca,
      notifikasi: notifikasi,
    };
    setStateNotifikasi(stateNotifikasi);
  }

  useEffect(() => {
    const fn = async () => {
      try {
        const resp = await konektorBackend.get("/api/auth/me");
        const dto: InfoPenggunaDto = await resp.json();
        const infoPengguna = dtoToInfoPengguna(dto);
        setStateOtentikasi(new StateOtentikasi(false, infoPengguna));

        await getNotifikasi();
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
          <Outlet
            context={[
              devMode,
              stateOtentikasi,
              konektorBackend,
              setMasterNotifikasi,
              setMasterError,
              promptLogout,
              stateNotifikasi,
            ]}
          />
          {logoutPrompted && (
            <LogoutConfirmationView
              loading={loggingOut}
              onCancel={handleCancelLogout}
              onConfirm={handleLogout}
            />
          )}
        </>
      )}
    </div>
  );
}
