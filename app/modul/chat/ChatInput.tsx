import IkonGambar from "~/komponen/IkonGambar";
import IkonKirim from "~/komponen/IkonKirim";

export default function ChatInput() {
  return (
    <div
      className="fixed z-40 bottom-0 left-14 bg-gray-50"
      style={{ width: "calc(100vw - 3.5rem)" }}
    >
      <div className="p-4 pt-0 flex items-center gap-3 w-full max-w-3xl mx-auto">
        <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2">
          <button type="button" className="cursor-pointer">
            <IkonGambar />
          </button>

          <input
            type="text"
            name="newChat"
            placeholder="Type your message..."
            className="flex-1 outline-none text-sm"
          />
        </div>

        <button className="w-10 h-10 cursor-pointer rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <IkonKirim className="w-5" />
        </button>
      </div>
    </div>
  );
}
