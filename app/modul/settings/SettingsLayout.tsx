import type React from "react";
import { Outlet, useOutletContext } from "react-router";
import type { OutletContext } from "~/dasar/OutletContext";
import SettingsSidebar from "./SettingsSidebar";

export default function SettingsLayout(): React.JSX.Element {
  const context: OutletContext = useOutletContext();
  const sidebarWidth = "12rem";

  return (
    <div className="flex">
      <div className="shrink-0" style={{ width: sidebarWidth }}>
        <SettingsSidebar width={sidebarWidth} />
      </div>
      <div className="grow">
        <Outlet context={context} />
      </div>
    </div>
  );
}
