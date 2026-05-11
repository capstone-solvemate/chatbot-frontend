import { Notifikasi } from "./Notifikasi";
import { NotifikasiTiket } from "./NotifikasiTiket";

export function dtoToNotifikasi(dto: Record<string, any>): Notifikasi {
  if (dto.type === 2) {
    return new NotifikasiTiket(
      BigInt(dto.id),
      dto.idPengguna,
      dto.judul,
      dto.deskripsi,
      new Date(dto.dibuatPada),
      dto.dibacaPada ? new Date(dto.dibacaPada) : null,
      BigInt(dto.idTiket),
    );
  }

  return new Notifikasi(
    BigInt(dto.id),
    dto.idPengguna,
    dto.judul,
    dto.deskripsi,
    new Date(dto.dibuatPada),
    dto.dibacaPada ? new Date(dto.dibacaPada) : null,
  );
}