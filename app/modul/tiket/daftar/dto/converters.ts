// modul/tiket/daftar/converters.ts
import { Tiket } from "../../Tiket";
import type { TiketResponseDto } from "./TiketResponseDto";
import { stringToStatusTiket } from "../../StatusTiket";


export function dtoToTiket(dto: TiketResponseDto): Tiket {
  return new Tiket(
    dto.id,
    dto.judul,
    dto.deskripsi,
    dto.idKategori,
    dto.idChat,
    stringToStatusTiket(dto.status),
    new Date(dto.dibuatPada),
    new Date(dto.diperbaruiPada),
  );
}