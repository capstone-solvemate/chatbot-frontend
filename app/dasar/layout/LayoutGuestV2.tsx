import type React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import HalamanLoading from "../HalamanLoading";
import { PeranPengguna } from "../PeranPengguna";
import type { OutletContext } from "../OutletContext";
import { useStateOtentikasi } from "../hooks/useStateOtentikasi";

export default function LayoutGuest(): React.JSX.Element {
  const [pass, setPass] = useState(false);
  const stateOtentikasi = useStateOtentikasi();
  const context: OutletContext = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (stateOtentikasi.pengguna) {
      if (stateOtentikasi.pengguna.peran === PeranPengguna.Admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setPass(true);
    }
  }, [stateOtentikasi]);

  return pass ? <Outlet context={context} /> : <HalamanLoading />;
}
