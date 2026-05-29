import type React from "react";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router";
import HalamanLoading from "../../HalamanLoading";
import { PeranPengguna } from "../../PeranPengguna";
import HalamanDilarang from "../../HalamanDilarang";
import NavbarV2 from "~/komponen/NavbarV2";
import { useStateOtentikasi } from "../../hooks/useStateOtentikasi";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { Environment } from "~/dasar/types/Environment";

export default function LayoutKaryawan(): React.JSX.Element {
  const location = useLocation();
  const pathname = location.pathname;

  const [dilarang, setDilarang] = useState(false);
  const [pass, setPass] = useState(false);
  const stateOtentikasi = useStateOtentikasi();
  const context: any = useOutletContext();
  const environment = useEnvironment();

  const navigate = useNavigate();

  function cekPeranPengguna() {
    if (environment === Environment.Mock) {
      setPass(true);
      return;
    }

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
  }

  useEffect(() => {
    cekPeranPengguna();
  }, [stateOtentikasi]);

  return pass ? (
    <div className="min-w-full">
      <NavbarV2 />
      <div className="pt-16">
        {dilarang ? (
          <HalamanDilarang ekspektasiPeran={PeranPengguna.Karyawan} />
        ) : (
          <Outlet context={context} />
        )}
      </div>
    </div>
  ) : (
    <HalamanLoading />
  );
}
