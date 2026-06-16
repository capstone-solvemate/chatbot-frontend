import { useEffect, useState, type ChangeEvent } from "react";
import IkonHapus from "~/komponen/ikon/IkonHapus";
import IkonUpload from "~/komponen/ikon/IkonUpload";

type Props = {
  droppingFile: boolean;
  daftarLampiran: File[];
  supportedMimeLampiran: string[];
  onTambahLampiran: (daftarLampiran: File[]) => void;
  onHapusLampiran: (index: number) => void;
};

export default function UploadField({
  droppingFile,
  daftarLampiran,
  supportedMimeLampiran,
  onTambahLampiran,
  onHapusLampiran,
}: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = daftarLampiran.map((file) => URL.createObjectURL(file));

    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [daftarLampiran]);

  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    onTambahLampiran(files);

    e.target.value = "";
  }

  function handleHapusLampiran(i: number) {
    if (!confirm(`Are you sure to delete attachment no ${i + 1}`)) return;

    onHapusLampiran(i);
  }

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600">Attachments (Optional)</label>

      {previews.length > 0 && (
        <div className="flex items-center gap-5 mt-4 mb-2">
          {previews.map((preview, i) => (
            <div className="relative" key={i}>
              <div className="rounded-md overflow-hidden">
                <img className="object-cover w-20 h-20" src={preview} />
              </div>
              <button
                type="button"
                className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer bg-red-100 hover:bg-red-200 transition-colors rounded-full"
                onClick={() => handleHapusLampiran(i)}
              >
                <IkonHapus className="w-3 h-3 text-red-700" />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        id="attachments-input"
        className="hidden"
        accept={supportedMimeLampiran.join(",")}
        multiple
        onChange={handleFileInput}
      />

      <button
        type="button"
        className={`mt-2 border-2 rounded-md p-6 flex flex-col items-center cursor-pointer ${droppingFile ? "border-green-400 outline-2 outline-green-200" : "border-dashed border-gray-300"}`}
        onClick={() => document.getElementById("attachments-input")?.click()}
      >
        <div className="flex justify-center text-gray-400">
          <IkonUpload />
        </div>

        {droppingFile && (
          <p className="text-sm text-gray-500 mt-2">Drop Here</p>
        )}

        {!droppingFile && (
          <>
            <p className="text-sm text-gray-500 mt-2">
              Drop files here or click to upload
            </p>

            <p className="text-xs text-gray-500">
              Supported formats: PNG and JPEG. Maximum 5 files, up to 10 MB
              each.
            </p>

            <div className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md">
              Choose Files
            </div>
          </>
        )}
      </button>
    </div>
  );
}
