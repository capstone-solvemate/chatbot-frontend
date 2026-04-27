import { IkonCari } from "~/komponen/ikon/IkonCari";

interface Props {
  search: string;
  onSearchChange: (search: string) => void;
}

export default function FaqSearch({ search, onSearchChange }: Props) {
  return (
    <div className="mb-6">
      <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-white px-4 shadow-sm">
        <IkonCari className="h-6 text-gray-400" />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder="Search FAQs..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 ps-2"
        />
      </div>
    </div>
  );
}
