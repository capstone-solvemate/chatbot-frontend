import { PayloadWsChat } from "./PayloadWsChat";
import type { PayloadWsObjekPesanChat } from "./PayloadWsObjekPesanChat";
import { TipePayloadWsChat } from "./TipePayloadWsChat";

export class PayloadWsPesanChatLama extends PayloadWsChat {
  constructor(
    public daftarPesan: PayloadWsObjekPesanChat[]
  ) {
    super(TipePayloadWsChat.DaftarChatLama)
  }
}