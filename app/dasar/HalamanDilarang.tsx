import { Button } from "~/komponen/Button";
import { PeranPengguna, peranPenggunaToString } from "./PeranPengguna";
import type { Route } from "../+types/root";

interface Props {
  ekspektasiPeran: PeranPengguna;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Forbidden" }];
}

export default function HalamanDilarang({
  ekspektasiPeran,
}: Props): React.JSX.Element {
  const ekspektasiPeranStr = peranPenggunaToString(ekspektasiPeran, "en");

  function gotoHome() {
    window.location.replace(location.origin);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-blue-50 bg-gray-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Forbidden</h1>
        <p className="text-gray-600 mb-6">
          This is <strong>{ekspektasiPeranStr}</strong> page.
          <br />
          <br /> Access is denied because you are{" "}
          <strong>not an {ekspektasiPeranStr}</strong> or <br />
          <strong>not logged in</strong> as an {ekspektasiPeranStr}.
        </p>
        <Button
          onClick={gotoHome}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
