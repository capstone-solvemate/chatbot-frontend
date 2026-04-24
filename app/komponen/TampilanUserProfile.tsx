import { PeranPengguna } from "~/dasar/PeranPengguna";
import { IkonLogout } from "./ikon/IkonLogout";
import type { StateOtentikasi } from "~/dasar/StateOtentikasi";

interface Props {
  stateOtentikasi: StateOtentikasi;
}

export default function TampilanUserProfile({ stateOtentikasi }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-800">
          {stateOtentikasi.pengguna?.nama || ""}
        </p>
        <p className="text-xs text-gray-500">
          {stateOtentikasi.pengguna?.peran === PeranPengguna.Admin ? (
            <>Support Team</>
          ) : (
            <>Employee ID: EMP{stateOtentikasi.pengguna?.id ?? 0}</>
          )}
        </p>
      </div>

      <button className="text-gray-500 cursor-pointer stroke-gray-500 hover:text-gray-700 hover:stroke-gray-700">
        <IkonLogout className="h-5 w-5" />
      </button>
    </div>
  );
}
