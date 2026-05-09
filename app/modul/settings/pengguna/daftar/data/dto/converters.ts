import { intToPeranPengguna, type PeranPengguna } from "~/dasar/PeranPengguna";
import type { PenggunaResponseDto } from "./PenggunaResponseDto";
import { Pengguna } from "../../../data/Pengguna";

export function dtoToPengguna(dto: PenggunaResponseDto): Pengguna {
  return new Pengguna(
    dto.id,
    dto.nama,
    dto.email,
    "",
    dto.peran
      .map((p) => intToPeranPengguna(p))
      .filter((p): p is PeranPengguna => p !== null),
  );
}