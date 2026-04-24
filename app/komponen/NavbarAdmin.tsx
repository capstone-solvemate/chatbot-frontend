import type React from "react";
import Navbar from "./Navbar";
import { PeranPengguna } from "~/dasar/PeranPengguna";

export default function NavbarAdmin(): React.JSX.Element {
  return <Navbar peran={PeranPengguna.Admin} />;
}
