import type React from "react";
import { IkonCari } from "~/komponen/IkonCari";

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-sm">
      <IkonCari className="h-5 w-5 stroke-gray-400" />

      <input
        type="text"
        placeholder="Search for solutions, FAQs..."
        className="w-full bg-transparent border-gray-300 text-sm outline-none placeholder:text-gray-400"
        {...props}
      />
    </div>
  )
}