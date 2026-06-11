import type React from "react";

export default function SkeletonBotMessage(): React.JSX.Element {
  return (
    <div className="flex gap-3 items-start max-w-xl">
      <div className="w-10 h-10 shrink-0 rounded-full bg-gray-200 animate-pulse flex items-center justify-center text-white"></div>

      <div className="border w-sm h-32 border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-200 animate-pulse text-transparent">
        <p>Dummy</p>

        <span className="text-xs mt-2 block">00:00</span>
      </div>
    </div>
  );
}
