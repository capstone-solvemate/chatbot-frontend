import { Chat } from "../Chat";
import { PesanChat } from "../PesanChat";

export function dtoToChat(dto: Record<string, any>): Chat {
  return new Chat(
    String(dto.id),
    dto.subjek,
    new Date(dto.tanggalDibuat),
    dto.sedangDiproses ?? false,
    dto.dialihkanKeTiket ?? false,
  );
}

export function dtoToPesanChat(dto: Record<string, any>): PesanChat {
  return new PesanChat(
    String(dto.id),
    dto.pesan,
    dto.chatAsisten,
    new Date(dto.tanggalDibuat),
    dto.gagal ?? false,
  );
}