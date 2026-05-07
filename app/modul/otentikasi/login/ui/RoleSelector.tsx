import { PeranPengguna } from "~/dasar/PeranPengguna";
import RoleOption from "./RoleOption";

interface Props {
  peran: PeranPengguna;
  onSetPeran: (peran: PeranPengguna) => void;
}

export default function RoleSelector({ peran, onSetPeran }: Props) {
  return (
    <div className="w-full mb-5">
      <p className="text-sm font-medium mb-2 text-gray-700">Login As</p>

      <div className="flex gap-3">
        <RoleOption
          active={peran === PeranPengguna.Karyawan}
          onClick={() => {
            onSetPeran(PeranPengguna.Karyawan);
          }}
        >
          Employee
        </RoleOption>

        <RoleOption
          active={peran === PeranPengguna.Admin}
          onClick={() => {
            onSetPeran(PeranPengguna.Admin);
          }}
        >
          Admin
        </RoleOption>
      </div>
    </div>
  );
}
