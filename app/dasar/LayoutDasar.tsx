import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import DevModeNotification from "./DevModeNotification";
import { StateOtentikasi } from "./StateOtentikasi";
import HalamanLoading from "./HalamanLoading";

export default function LayoutDasar(): React.JSX.Element {
  const [devMode, setDevMode] = useState(false);
  const [stateOtentikasi, setStateOtentikasi] = useState(
    new StateOtentikasi(true),
  );

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(stateOtentikasi.loading);
  }, [stateOtentikasi]);

  useEffect(() => {
    const to = setTimeout(() => {
      setStateOtentikasi(new StateOtentikasi(false));
    }, 1000);
    return () => {
      clearTimeout(to);
    };
  });

  return (
    <div className={`min-h-screen ${devMode && "pt-7"}`}>
      {devMode && <DevModeNotification />}
      {loading ? (
        <HalamanLoading devMode={devMode} />
      ) : (
        <Outlet context={[devMode]} />
      )}
    </div>
  );
}
