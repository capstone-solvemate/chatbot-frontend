import { Kategori } from "../Kategori.js";

export function dtoToKategori(dto: any): Kategori {
  return new Kategori(
    dto.id,
    dto.nama,
  );
}
