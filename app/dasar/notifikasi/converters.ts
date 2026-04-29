import { Notifikasi } from "./Notifikasi";

export function dtoToNotifikasi(dto: Record<string, any>): Notifikasi {
  return new Notifikasi(
    dto.id,
    dto.idPengguna,
    dto.judul,
    dto.deskripsi,
    new Date(dto.dibuatPada),
    dto.dibacaPada ? new Date(dto.dibacaPada) : null,
  );
}