import { useState } from "react";
import RoleOption from "./RoleOption";
import { Peran } from "../Peran";

interface Props {
  peran: Peran;
  onSetPeran: (peran: Peran) => void;
}

export default function RoleSelector({ peran, onSetPeran }: Props) {
  return (
    <div className="w-full mb-5">
      <p className="text-sm font-medium mb-2 text-gray-700">Login As</p>

      <div className="flex gap-3">
        <RoleOption
          active={peran === Peran.Karyawan}
          onClick={() => {
            onSetPeran(Peran.Karyawan);
          }}
        >
          Employee
        </RoleOption>

        <RoleOption
          active={peran === Peran.Admin}
          onClick={() => {
            onSetPeran(Peran.Admin);
          }}
        >
          Admin
        </RoleOption>
      </div>
    </div>
  );
}
