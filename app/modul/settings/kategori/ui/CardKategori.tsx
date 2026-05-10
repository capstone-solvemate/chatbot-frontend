import type { Kategori } from "../Kategori";
import { Button, ButtonColor } from "~/komponen/Button";
import IkonEdit from "~/komponen/ikon/IkonEdit";
import IkonHapus from "~/komponen/ikon/IkonHapus";

type Props = {
  kategori: Kategori;
  onEdit: (kategori: Kategori) => void;
  onHapus: (kategori: Kategori) => void;
};

export default function CardKategori({ kategori, onEdit, onHapus }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm hover:border-blue-100 hover:shadow-md hover:shadow-neutral-200 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <h3 className="font-semibold text-base text-gray-900">
          {kategori.nama}
        </h3>
        <div className="flex gap-2">
          <Button
            className="text-xs py-2! px-3!"
            color={ButtonColor.White}
            leftIcon={<IkonEdit className="h-4" />}
            onClick={() => onEdit(kategori)}
          >
            Edit
          </Button>
          <Button
            className="text-xs py-2! px-3! text-red-600! hover:text-red-700! border-gray-200!"
            color={ButtonColor.White}
            leftIcon={<IkonHapus className="h-4 text-red-500" />}
            onClick={() => onHapus(kategori)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
