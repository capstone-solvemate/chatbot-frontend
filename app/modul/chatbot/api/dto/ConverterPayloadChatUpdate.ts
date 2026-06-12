

import { PesanChat } from "../../domain/PesanChat.js";
import { payloadWsObjekPesanChatToPesanChat } from "./ConverterPayloadWsObjekPesanChat.js";
import type { PayloadWsChatUpdate } from "./PayloadWsChatUpdate.js";

export function payloadWsChatUpdateToDaftarPesanChat(payload: PayloadWsChatUpdate): PesanChat[] {
  return payload.pesan.map((payloadPesan) => payloadWsObjekPesanChatToPesanChat(payloadPesan))
}