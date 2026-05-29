import { Chat } from "../../domain/Chat";
import { PesanChat } from "../../domain/PesanChat";

export function dtoToChat(dto: Record<string, any>): Chat {
  return new Chat(
    BigInt(dto.id),
    1,
    new Date(dto.tanggalDibuat),
    dto.subjek,
    dto.sedangDiproses ?? false,
    dto.dialihkanKeTiket ?? false,
  );
}

export function dtoToPesanChat(dto: Record<string, any>): PesanChat {
  return new PesanChat(
    BigInt(dto.id),
    BigInt(1),
    dto.pesan,
    new Date(dto.tanggalDibuat),
    dto.chatAsisten,
    dto.gagal ?? false,
  );
}