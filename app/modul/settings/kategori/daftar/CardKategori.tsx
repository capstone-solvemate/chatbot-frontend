import { NavLink } from "react-router";
import type { Kategori } from "../Kategori";
import { Button, ButtonColor } from "~/komponen/Button";
import IkonEdit from "~/komponen/ikon/IkonEdit";

type Props = {
  kategori: Kategori;
};

export default function CardKategori({ kategori }: Props) {
  return (
    <NavLink
      to={`/admin/settings/kategori/${kategori.id}`}
      className="bg-white text-start border border-gray-200 rounded-xl px-6 py-4 shadow-sm cursor-pointer hover:border-blue-100 hover:shadow-md hover:shadow-neutral-400"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <h3 className="font-semibold text-lg text-gray-900">{kategori.nama}</h3>
        <div className="flex gap-2">
          <Button
            className="text-xs py-2! px-3!"
            color={ButtonColor.White}
            leftIcon={<IkonEdit className="h-5" />}
          >
            Edit
          </Button>
          <Button
            className="text-xs py-2! px-3! text-red-600!"
            color={ButtonColor.White}
            leftIcon={<IkonEdit className="h-5" />}
          >
            Delete
          </Button>
        </div>
      </div>
    </NavLink>
  );
}
