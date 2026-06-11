import type React from "react";
import IkonBot from "~/komponen/ikon/IkonBot";

export default function TampilanProcessing(): React.JSX.Element {
  return (
    <div className="flex gap-3 items-start max-w-xl">
      <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <span className="text-xs font-medium">
          <IkonBot />
        </span>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500">
        <span className="flex gap-1 items-center">
          <span className="animate-bounce [animation-delay:0ms]">·</span>
          <span className="animate-bounce [animation-delay:150ms]">·</span>
          <span className="animate-bounce [animation-delay:300ms]">·</span>
        </span>
      </div>
    </div>
  );
}
