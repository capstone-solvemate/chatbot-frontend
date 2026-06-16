// modul/tiket/detail/MessageInput.tsx

import { useRef, useState, type ChangeEvent } from "react";
import IkonGambar from "~/komponen/ikon/IkonGambar";
import IkonKirim from "~/komponen/ikon/IkonKirim";

type Props = {
  onKirim: (teks: string) => Promise<void>;
  onTambahLampiran: (daftarLampiran: File[]) => void;
  supportedMimeLampiran: string[];
};

export default function MessageInput({
  onKirim,
  onTambahLampiran,
  supportedMimeLampiran,
}: Props) {
  const [teks, setTeks] = useState("");
  const [mengirim, setMengirim] = useState(false);

  const inputFileElement = useRef<null | HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = teks.trim();
    if (!trimmed || mengirim) return;
    setMengirim(true);
    try {
      await onKirim(trimmed);
      setTeks("");
    } finally {
      setMengirim(false);
    }
  }

  function handleKlikInputFile() {
    inputFileElement.current?.click();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    onTambahLampiran(files);

    e.target.value = "";
  }

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-3 py-2 gap-2">
        <input
          ref={inputFileElement}
          onChange={handleInputChange}
          type="file"
          className="hidden"
          name="attachment-pesan-tiket"
          multiple
          accept={supportedMimeLampiran.join(",")}
        />

        <button
          type="button"
          className="cursor-pointer"
          onClick={handleKlikInputFile}
        >
          <IkonGambar />
        </button>

        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 outline-none text-sm"
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          disabled={mengirim}
        />
      </div>

      <button
        type="submit"
        disabled={mengirim || !teks.trim()}
        className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg bg-gray-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IkonKirim />
      </button>
    </form>
  );
}
