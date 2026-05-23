import type React from "react";
import { IkonCari } from "~/komponen/ikon/IkonCari";
import IndikatorLoading from "~/komponen/IndikatorLoading";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading: boolean;
  showResult: boolean;
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="relative">
      <IkonCari className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

      <input
        type="text"
        placeholder="Search for solutions, FAQs..."
        className={`
          w-full 
          text-sm
          rounded-lg
          outline-none
        placeholder:text-gray-400
          pe-4
          ps-12
          py-4
          border
          transition-colors
        border-gray-300
        focus:border-gray-500
          focus:shadow-gray-400/40
        bg-white 
          shadow-md
          ${props.showResult ? "border-b-0 rounded-b-none" : ""}
        `}
        autoComplete="off"
        {...props}
      />

      {props.loading && (
        <IndikatorLoading className="absolute right-4 top-1/2 -translate-y-1/2" />
      )}
    </div>
  );
}
