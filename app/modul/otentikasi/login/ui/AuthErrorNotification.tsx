import type React from "react";

interface Props {
  message: string;
  onClear: () => void;
}

export default function AuthErrorNotification({
  message,
  onClear,
}: Props): React.JSX.Element {
  return (
    <div className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-2 w-full shadow-sm flex items-center justify-between text-red-600 gap-2">
      <p className="text-sm text-center grow">{message}</p>
      <button type="button" className="cursor-pointer" onClick={onClear}>
        x
      </button>
    </div>
  );
}
