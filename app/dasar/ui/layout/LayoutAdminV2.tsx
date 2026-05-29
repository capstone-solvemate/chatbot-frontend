import type React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import HalamanLoading from "../../HalamanLoading";
import { PeranPengguna } from "../../PeranPengguna";
import HalamanDilarang from "../../HalamanDilarang";
import type { OutletContext } from "../../OutletContext";
import NavbarV2 from "~/dasar/ui/tampilan/NavbarV2";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { Environment } from "~/dasar/types/Environment";

export default function LayoutAdminV2(): React.JSX.Element {
  const [pass, setPass] = useState(false);
  const [dilarang, setDilarang] = useState(false);
  const context: OutletContext = useOutletContext();
  const environment = useEnvironment();

  const navigate = useNavigate();

  function cekPeranPengguna() {
    if (environment === Environment.Mock) {
      setPass(true);
      return;
    }

    if (context.stateOtentikasi.pengguna) {
      if (context.stateOtentikasi.pengguna.peran !== PeranPengguna.Admin) {
        setDilarang(true);
      }
      setPass(true);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    cekPeranPengguna();
  }, [context.stateOtentikasi]);

  return pass ? (
    <div className="min-w-full">
      <NavbarV2 />
      <div className="pt-16">
        {dilarang ? (
          <HalamanDilarang ekspektasiPeran={PeranPengguna.Admin} />
        ) : (
          <Outlet context={context} />
        )}
      </div>
    </div>
  ) : (
    <HalamanLoading />
  );
}
