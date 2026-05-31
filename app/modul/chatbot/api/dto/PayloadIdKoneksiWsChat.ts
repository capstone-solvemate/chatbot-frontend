import { PayloadWsChat } from "./PayloadWsChat.js";
import type { TipePayloadWsChat } from "./TipePayloadWsChat.js";

export class PayloadIdKoneksiWsChat extends PayloadWsChat {
  constructor(
    tipe: TipePayloadWsChat,
    public idKoneksi: string
  ) {
    super(tipe)
  }
} 
