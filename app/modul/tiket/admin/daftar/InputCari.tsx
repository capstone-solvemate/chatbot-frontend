import type React from "react";
import { IkonCari } from "~/komponen/ikon/IkonCari";

export default function InputCari(): React.JSX.Element {
  return (
    <div className="relative">
      <IkonCari className="absolute inset-s-3 top-1/2 -translate-y-1/2 h-4 text-gray-400" />
      <input
        type="text"
        className="ps-9 bg-gray-100 py-2 pe-2 outline-transparent focus:outline-gray-800 rounded-md text-gray-800 text-sm"
        placeholder="Search tickets..."
      />
    </div>
  );
}
