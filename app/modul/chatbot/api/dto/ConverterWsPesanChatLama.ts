import type { PesanChat } from "../../domain/PesanChat";
import { payloadWsObjekPesanChatToPesanChat } from "./ConverterPayloadWsObjekPesanChat";
import type { PayloadWsPesanChatLama } from "./PayloadWsPesanChatLama";

export function payloadWsPesanChatLamaToDaftarPesanChat(payload: PayloadWsPesanChatLama): PesanChat[] {
  return payload.daftarPesan.map((payloadPesan) => payloadWsObjekPesanChatToPesanChat(payloadPesan))
}