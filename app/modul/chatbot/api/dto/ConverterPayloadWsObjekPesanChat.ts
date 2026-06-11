import { LampiranPesanChat } from "../../domain/LampiranPesanChat";
import { PesanChat } from "../../domain/PesanChat";
import type { PayloadWsObjekPesanChat } from "./PayloadWsObjekPesanChat";

export function payloadWsObjekPesanChatToPesanChat(payload: PayloadWsObjekPesanChat): PesanChat {
  return new PesanChat(
    BigInt(payload.id),
    0n,
    payload.pesan,
    new Date(payload.tanggalDibuat),
    payload.chatAsisten,
    payload.gagal,
    payload.daftarLampiran.map((payloadLampiran) => new LampiranPesanChat(
      BigInt(payloadLampiran.id),
      BigInt(payload.id)
    ))
  )
}