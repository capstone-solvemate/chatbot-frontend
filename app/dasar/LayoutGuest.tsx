import type React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import HalamanLoading from "./HalamanLoading";
import type { StateOtentikasi } from "./StateOtentikasi";

export default function LayoutGuest(): React.JSX.Element {
  const [pass, setPass] = useState(false);
  const [_devMode, stateOtentikasi]: [boolean, StateOtentikasi] =
    useOutletContext();
  const context: any = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (stateOtentikasi.pengguna) {
      navigate("/");
    } else {
      setPass(true);
    }
  }, [stateOtentikasi]);

  return pass ? <Outlet context={context} /> : <HalamanLoading />;
}
