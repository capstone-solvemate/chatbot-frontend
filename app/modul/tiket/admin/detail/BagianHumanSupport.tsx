import { useEffect, useRef, useState } from "react";
import type { PesanTiket } from "./dto/TiketAdminDetail";
import BubblePesanTiket from "./BubblePesanTiket";
import IkonUser from "~/komponen/ikon/IkonUser";

export default function BagianHumanSupport({
  pesanTiket,
  idPembuatTiket,
  onKirimBalasan,
  mengirim,
}: {
  pesanTiket: PesanTiket[];
  idPembuatTiket: number;
  onKirimBalasan: (teks: string) => Promise<void>;
  mengirim: boolean;
}) {
  const [balasan, setBalasan] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pesanTiket]);

  async function handleKirim() {
    if (!balasan.trim() || mengirim) return;
    const teks = balasan.trim();
    setBalasan("");
    await onKirimBalasan(teks);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleKirim();
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-blue-50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full text-blue-600 flex items-center justify-center shrink-0">
            <IkonUser />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Human Support Conversation
            </h2>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          After escalation to support team
        </p>
      </div>

      <div className="px-5 py-4 space-y-3 bg-gray-50">
        {pesanTiket.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No support conversation yet.
          </p>
        ) : (
          pesanTiket.map((p) => (
            <BubblePesanTiket
              key={p.id}
              pesan={p}
              idPembuatTiket={idPembuatTiket}
            />
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-500 mb-2">Send Response</p>
        <div className="relative">
          <textarea
            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 pr-36 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            rows={3}
            placeholder="Type your response to the user..."
            value={balasan}
            onChange={(e) => setBalasan(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={mengirim}
          />
        </div>
        <div className="flex gap-2 justify-between items-start mt-2">
          <p className="text-[11px] text-gray-400 mt-1.5">
            Press Ctrl+Enter to send
          </p>
          <button
            onClick={handleKirim}
            disabled={!balasan.trim() || mengirim}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {mengirim ? "Sending..." : "Send Response"}
          </button>
        </div>
      </div>
    </div>
  );
}
