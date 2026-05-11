import IkonPerlebar from "~/komponen/ikon/IkonPerlebar";
import { useDevMode } from "~/dasar/hooks/useDevMode";

type Props = {
  onToggleExpand: () => void;
};

export default function PageHeader({ onToggleExpand }: Props) {
  const devMode = useDevMode();

  return (
    <div
      className={`flex border-y border-gray-200 py-4 gap-2 fixed ${devMode ? "top-23" : "top-16"} bg-white z-30 h-20 w-full`}
    >
      <button
        className="cursor-pointer px-4 py-3 flex gap-2 text-sm items-center text-left text-gray-600"
        onClick={onToggleExpand}
      >
        <IkonPerlebar className="w-5" />
      </button>
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>

        <p className="text-sm text-gray-600">
          Get instant help from our AI-powered assistant
        </p>
      </div>
    </div>
  );
}
