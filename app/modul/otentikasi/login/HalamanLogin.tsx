import type React from "react";
import type { Route } from "./+types/HalamanLogin";
import LoginCard from "./LoginCard";
import { useState } from "react";
import { Peran } from "../Peran";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export default function HalamanLogin(): React.JSX.Element {
  const [peran, setPeran] = useState(Peran.Karyawan);

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6 sm:p-12">
      <LoginCard peran={peran} onSetPeran={(peran) => setPeran(peran)} />
    </div>
  );
}
