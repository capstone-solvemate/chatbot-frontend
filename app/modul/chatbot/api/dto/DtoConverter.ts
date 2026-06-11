import { Chat } from "../../domain/Chat";
import { PesanChat } from "../../domain/PesanChat";
import type { PayloadWsChat } from "./PayloadWsChat";
import { PayloadWsChatBaru } from "./PayloadWsChatBaru";
import { PayloadWsChatReady } from "./PayloadWsChatReady";
import { PayloadWsChatUpdate } from "./PayloadWsChatUpdate";
import { PayloadWsPesanChatLama } from "./PayloadWsPesanChatLama";
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
  if (data.tipe === TipePayloadWsChat.Ready) {
    return new PayloadWsChatReady()
  } else if (data.tipe === TipePayloadWsChat.ChatBaru) {
    return new PayloadWsChatBaru(
      data.id,
      data.idPembuat,
      data.tanggalDibuat,
      data.subjek,
      data.sedangDiproses,
      data.dialihkanKeTiket,
      data.pesan,
      data.tipe
    )
  } else if (data.tipe === TipePayloadWsChat.ChatUpdate) {
    return new PayloadWsChatUpdate(
      data.id,
      data.sedangDiproses,
      data.dialihkanKeTiket,
      data.pesan,
    )
  } else if (data.tipe === TipePayloadWsChat.DaftarChatLama) {
    return new PayloadWsPesanChatLama(
      data.daftarPesan
    )
  } else {
    throw new Error("Unsupported websocket chat payload")
  }
}