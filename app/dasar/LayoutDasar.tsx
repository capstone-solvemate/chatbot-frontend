import { useState } from "react";
import { Outlet } from "react-router";
import DevModeNotification from "./DevModeNotification";

export default function LayoutDasar(): React.JSX.Element {
  const [devMode, setDevMode] = useState(false);

  return (
    <div className={`min-h-screen ${devMode && "pt-7"}`}>
      {devMode && <DevModeNotification />}
      <Outlet context={[devMode]} />
    </div>
  );
}
