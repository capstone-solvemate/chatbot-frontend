import type React from "react";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router";
import HalamanLoading from "./HalamanLoading";
import type { StateOtentikasi } from "./StateOtentikasi";
import { PeranPengguna } from "./PeranPengguna";
import HalamanDilarang from "./HalamanDilarang";

export default function LayoutKaryawan(): React.JSX.Element {
  const location = useLocation();
  const pathname = location.pathname;

  const [dilarang, setDilarang] = useState(false);
  const [pass, setPass] = useState(false);
  const [_devMode, stateOtentikasi]: [boolean, StateOtentikasi] =
    useOutletContext();
  const context: any = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (stateOtentikasi.pengguna) {
      if (stateOtentikasi.pengguna.peran !== PeranPengguna.Karyawan) {
        if (
          pathname === "/" &&
          stateOtentikasi.pengguna.peran === PeranPengguna.Admin
        ) {
          navigate("/admin/dashboard", { replace: true });
        } else {
          setDilarang(true);
        }
      }
      setPass(true);
    } else {
      navigate("/login");
    }
  }, [stateOtentikasi]);

  return pass ? (
    dilarang ? (
      <HalamanDilarang ekspektasiPeran={PeranPengguna.Karyawan} />
    ) : (
      <Outlet context={context} />
    )
  ) : (
    <HalamanLoading />
  );
}
