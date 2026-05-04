import type { TiketAdminDetail, PesanChat, PesanTiket } from "./TiketAdminDetail";
import type {
  TiketAdminDetailResponseDto,
  PesanChatResponseDto,
  PesanTiketResponseDto,
} from "./TiketAdminDetailResponseDto";

export function dtoToPesanChat(dto: PesanChatResponseDto): PesanChat {
  return {
    id: dto.id,
    dariAsisten: dto.dariAsisten,
    isi: dto.pesan,
    waktu: dto.dibuatPada,
  };
}

export function dtoToPesanTiket(dto: PesanTiketResponseDto): PesanTiket {
  return {
    id: dto.id,
    idPembuat: dto.idPembuat,
    isi: dto.pesan,
    waktu: dto.dibuatPada,
  };
}

export function dtoToTiketAdminDetail(dto: TiketAdminDetailResponseDto): TiketAdminDetail {
  return {
    id: dto.id,
    judul: dto.judul,
    deskripsi: dto.deskripsi,
    idPembuat: dto.idPembuat,
    namaPembuat: dto.namaPembuat,
    emailPembuat: dto.emailPembuat,
    idChat: dto.idChat,
    idKategori: dto.idKategori,
    status: dto.status,
    dibuatPada: dto.dibuatPada,
    diperbaruiPada: dto.diperbaruiPada,
    pesanTiket: dto.pesanTiket.map(dtoToPesanTiket),
    historiChat: dto.historiChat.map(dtoToPesanChat),
  };
}