import type React from "react";
import { useDevMode } from "~/dasar/hooks/useDevMode";
import SettingsSidebarItem from "./SettingsSidebarItem";

type Props = {
  width: string;
};

export default function SettingsSidebar({ width }: Props): React.JSX.Element {
  const devMode = useDevMode();

  return (
    <div
      className={`fixed left-0 top-16 min-h-default flex flex-col border-r border-gray-200 shadow ${devMode && "mt-7"}`}
      style={{ width }}
    >
      <SettingsSidebarItem to="/admin/settings/kategori">
        Kategori
      </SettingsSidebarItem>
      <SettingsSidebarItem to="/admin/settings/pengguna">
        Pengguna
      </SettingsSidebarItem>
    </div>
  );
}
