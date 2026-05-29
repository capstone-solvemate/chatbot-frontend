import IkonTutup from "~/komponen/ikon/IkonTutup";

type Props = {
  src: string;
  onDelete: () => void;
};

export default function UploadImagePreview({ src, onDelete }: Props) {
  return (
    <div className="w-16 h-16 relative rounded border border-gray-200">
      <img src={src} className="w-16 h-16 rounded object-contain" />
      <button
        onClick={onDelete}
        type="button"
        className="absolute bg-red-50 border border-red-100 cursor-pointer text-black rounded-full right-0 top-0 -translate-y-1/2 translate-x-1/2 p-0.5"
      >
        <IkonTutup className="w-3 h-3" />
      </button>
    </div>
  );
}
