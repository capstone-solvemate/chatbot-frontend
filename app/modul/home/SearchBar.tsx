import type React from "react";
import { IkonCari } from "~/komponen/ikon/IkonCari";

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 relative rounded-lg border border-gray-300 bg-white shadow-md">
      <IkonCari className="absolute left-4 h-5 w-5 text-gray-400" />

      <input
        type="text"
        placeholder="Search for solutions, FAQs..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 pe-4 ps-12 py-4"
        {...props}
      />
    </div>
  );
}
