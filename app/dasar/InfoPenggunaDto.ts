import { InfoPengguna } from "./InfoPengguna";
import { PeranPengguna, stringToPeranPengguna } from "./PeranPengguna";

export type InfoPenggunaDto = {
  id: number;
  nama: string;
  peran: string
};

export function dtoToInfoPengguna(dto: InfoPenggunaDto): InfoPengguna {
  return new InfoPengguna(dto.id, dto.nama, stringToPeranPengguna(dto.peran) ?? PeranPengguna.Karyawan)
}