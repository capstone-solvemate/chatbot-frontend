import IkonGambar from "~/komponen/ikon/IkonGambar";
import IkonKirim from "~/komponen/ikon/IkonKirim";
import { useState } from "react";
import { IkonTiket } from "~/komponen/ikon/IkonTiket";

type Props = {
  expandSidebar: boolean;
  onSend: (text: string) => void;
  disabled: boolean;
  dialihkanKeTiket: boolean;
};

export default function ChatInput({
  expandSidebar,
  onSend,
  disabled,
  dialihkanKeTiket,
}: Props) {
  const [text, setText] = useState("");

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || disabled || dialihkanKeTiket) return;
    setText("");
    onSend(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className={`fixed z-10 bottom-0 left-0 bg-gray-50 w-full ${expandSidebar ? "ps-64" : "ps-0"} transition-all ease-out`}
    >
      <div className="p-4 pt-0 flex items-center gap-3 w-full max-w-3xl mx-auto">
        {dialihkanKeTiket ? (
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-sm text-gray-400 select-none">
            <IkonTiket className="w-4 h-4 shrink-0" />
            <span>This chat is locked. Continue through your ticket.</span>
          </div>
        ) : (
          <>
            <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2 bg-white">
              <button type="button" className="cursor-pointer">
                <IkonGambar />
              </button>

              <input
                name="pesan"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 outline-none text-sm"
                disabled={disabled}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={disabled || !text.trim()}
              className="w-10 h-10 cursor-pointer rounded-lg bg-blue-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <IkonKirim className="w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
