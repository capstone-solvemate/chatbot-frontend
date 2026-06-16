// modul/tiket/daftar/converters.ts
import { Tiket } from "../../Tiket";
import type { PesanTiketResponseDto, TiketResponseDto } from "./TiketResponseDto";
import { stringToStatusTiket } from "../../StatusTiket";
import { PesanTiket } from "../../PesanTiket";


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
    dto.lampiran.map((item: any) => item.id)
  );
}

export function dtoToPesanTiket(dto: PesanTiketResponseDto): PesanTiket {
  return new PesanTiket(
    dto.id,
    dto.idTiket,
    dto.idPembuat,
    dto.pesan,
    new Date(dto.dibuatPada),
    dto.lampiran.map((item) => item.id)
  );
}