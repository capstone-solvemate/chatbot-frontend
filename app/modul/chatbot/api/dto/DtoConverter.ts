import { Chat } from "../../domain/Chat";
import { PesanChat } from "../../domain/PesanChat";
import { PayloadIdKoneksiWsChat } from "./PayloadIdKoneksiWsChat";
import type { PayloadWsChat } from "./PayloadWsChat";
import { TipePayloadWsChat } from "./TipePayloadWsChat";

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

export function getPayloadWs(data: any): PayloadWsChat {
  if (data.tipe === TipePayloadWsChat.IdKoneksi) {
    return new PayloadIdKoneksiWsChat(
      data.tipe,
      data.idKoneksi
    )
  } else {
    throw new Error("Unsupported websocket chat payload")
  }
}