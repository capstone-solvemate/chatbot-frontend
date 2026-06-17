import { useEffect, useState } from "react";
import IkonHapus from "~/komponen/ikon/IkonHapus";

type Props = {
  daftarLampiran: File[];
  onHapusLampiran: (index: number) => void;
};

export default function PreviewLampiran({
  daftarLampiran,
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

  function handleHapusLampiran(i: number) {
    if (!confirm(`Are you sure to delete attachment no ${i + 1}`)) return;

    onHapusLampiran(i);
  }

  return (
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
  );
}
