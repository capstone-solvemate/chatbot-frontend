import type React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import HalamanLoading from "./HalamanLoading";
import type { StateOtentikasi } from "./StateOtentikasi";
import { PeranPengguna } from "./PeranPengguna";
import HalamanDilarang from "./HalamanDilarang";

export default function LayoutAdmin(): React.JSX.Element {
  const [pass, setPass] = useState(false);
  const [dilarang, setDilarang] = useState(false);
  const [_devMode, stateOtentikasi]: [boolean, StateOtentikasi] =
    useOutletContext();
  const context: any = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (stateOtentikasi.pengguna) {
      if (stateOtentikasi.pengguna.peran !== PeranPengguna.Admin) {
        setDilarang(true);
      }
      setPass(true);
    } else {
      navigate("/login");
    }
  }, [stateOtentikasi]);

  return pass ? (
    dilarang ? (
      <HalamanDilarang ekspektasiPeran={PeranPengguna.Admin} />
    ) : (
      <Outlet context={context} />
    )
  ) : (
    <HalamanLoading />
  );
}
