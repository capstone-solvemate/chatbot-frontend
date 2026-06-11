

import { Chat } from "../../domain/Chat.js";
import { LampiranPesanChat } from "../../domain/LampiranPesanChat.js";
import { PesanChat } from "../../domain/PesanChat.js";
import type { PayloadWsChatBaru } from "./PayloadWsChatBaru.js";

export function payloadWsChatBaruToChat(payload: PayloadWsChatBaru): Chat {
  return new Chat(
    BigInt(payload.id),
    payload.idPembuat,
    new Date(payload.tanggalDibuat),
    payload.subjek,
    payload.sedangDiproses,
    payload.dialihkanKeTiket,
    payload.pesan.map((payloadPesan) => new PesanChat(
      BigInt(payloadPesan.id),
      BigInt(payload.id),
      payloadPesan.pesan,
      new Date(payloadPesan.tanggalDibuat),
      payloadPesan.chatAsisten,
      payloadPesan.gagal,
      payloadPesan.lampiran.map((payloadLampiran) => new LampiranPesanChat(
        BigInt(payloadLampiran.id),
        BigInt(payloadPesan.id)
      ))
    ))
  )
};