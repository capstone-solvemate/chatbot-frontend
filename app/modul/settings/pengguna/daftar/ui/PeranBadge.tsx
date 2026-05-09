import { PeranPengguna } from "~/dasar/PeranPengguna";

type Props = {
  peran: PeranPengguna;
};

export default function PeranBadge({ peran }: Props) {
  const isAdmin = peran === PeranPengguna.Admin;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isAdmin ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
      }`}
    >
      {isAdmin ? "Admin" : "Karyawan"}
    </span>
  );
}
