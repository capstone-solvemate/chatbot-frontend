import IkonGambar from "~/komponen/IkonGambar";
import IkonKirim from "~/komponen/IkonKirim";

export default function MessageInput() {
  return (
    <form className="flex items-center gap-3" method="post">
      <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-3 py-2 gap-2">
        <button type="button" className="cursor-pointer">
          <IkonGambar />
        </button>

        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 outline-none text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg bg-gray-400 text-white"
      >
        <IkonKirim />
      </button>
    </form>
  );
}
