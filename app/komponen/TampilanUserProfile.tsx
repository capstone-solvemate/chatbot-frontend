import { useOutletContext } from "react-router";
import { IkonLogout } from "./ikon/IkonLogout";
import type { ContextType } from "~/dasar/ContextType";

export default function TampilanUserProfile() {
  const [_a, stateOtentikasi]: ContextType = useOutletContext();

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-800">
          {stateOtentikasi.pengguna?.nama || ""}
        </p>
        <p className="text-xs text-gray-500">
          Employee ID: EMP{stateOtentikasi.pengguna?.id ?? 0}
        </p>
      </div>

      <button className="text-gray-500 cursor-pointer stroke-gray-500 hover:text-gray-700 hover:stroke-gray-700">
        <IkonLogout className="h-5 w-5" />
      </button>
    </div>
  );
}
