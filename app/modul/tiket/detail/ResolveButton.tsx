// modul/tiket/detail/ResolveButton.tsx

import { useState } from "react";
import IkonCheckCircle from "~/komponen/ikon/IkonCheckCircle";

type Props = {
  onResolve: () => Promise<void>;
  isResolved: boolean;
};

export default function ResolveButton({ onResolve, isResolved }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [memproses, setMemproses] = useState(false);

  async function handleKonfirmasi() {
    setMemproses(true);
    try {
      await onResolve();
    } finally {
      setMemproses(false);
      setShowConfirm(false);
    }
  }

  if (isResolved) {
    return (
      <div className="w-full bg-green-50 border border-green-200 text-green-700 font-medium py-3 rounded-lg flex items-center justify-center gap-2">
        <IkonCheckCircle />
        Ticket Resolved
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 space-y-3">
        <p className="text-sm text-gray-700 text-center">
          Mark this ticket as resolved? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirm(false)}
            disabled={memproses}
            className="flex-1 cursor-pointer py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleKonfirmasi}
            disabled={memproses}
            className="flex-1 cursor-pointer py-2 rounded-lg bg-green-600 hover:bg-green-700 text-sm text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IkonCheckCircle />
            {memproses ? "Processing..." : "Yes, Resolve"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
    >
      <IkonCheckCircle />
      Mark as Resolved
    </button>
  );
}
