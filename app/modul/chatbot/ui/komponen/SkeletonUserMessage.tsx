import type React from "react";

export default function SkeletonUserMessage(): React.JSX.Element {
  return (
    <div className="flex justify-end items-start gap-3">
      <div className="bg-gray-200 animate-pulse text-transparent rounded-xl px-4 py-3 text-sm max-w-xs">
        <p>Dummy</p>

        <span className="text-xs mt-2 block">00:00</span>
      </div>

      <div className="w-10 h-10 shrink-0 rounded-full bg-gray-200 animate-pulse flex items-center justify-center text-white"></div>
    </div>
  );
}
