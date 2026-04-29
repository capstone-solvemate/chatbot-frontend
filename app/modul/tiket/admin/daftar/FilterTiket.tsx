import type React from "react";
import InputCari from "./InputCari";
import PilihanStatus from "./PilihanStatus";
import PilihanKategori from "./PilihanKategori";

export default function FilterTiket(): React.JSX.Element {
  return (
    <div className="flex gap-2 justify-between p-6 items-center border-b border-gray-200">
      <h5 className="font-semibold text-lg">All Tickets</h5>
      <div className="flex gap-3 items-center">
        <InputCari />
        <PilihanStatus />
        <PilihanKategori />
      </div>
    </div>
  );
}
