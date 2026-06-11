

import { LampiranPesanChat } from "../../domain/LampiranPesanChat.js";
import { PesanChat } from "../../domain/PesanChat.js";
import type { PayloadWsChatUpdate } from "./PayloadWsChatUpdate.js";

export function payloadWsChatUpdateToDaftarPesanChat(payload: PayloadWsChatUpdate): PesanChat[] {
  return payload.pesan.map((payloadPesan) => new PesanChat(
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
}