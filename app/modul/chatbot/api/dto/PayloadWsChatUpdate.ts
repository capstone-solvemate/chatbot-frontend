import { PayloadWsChat } from "./PayloadWsChat.js";
import type { PayloadWsObjekPesanChat } from "./PayloadWsObjekPesanChat.js";
import { TipePayloadWsChat } from "./TipePayloadWsChat.js";

export class PayloadWsChatUpdate extends PayloadWsChat {
  constructor(
    public id: string,
    public sedangDiproses: boolean,
    public dialihkanKeTiket: boolean,
    public pesan: PayloadWsObjekPesanChat[]
  ) {
    super(TipePayloadWsChat.ChatUpdate)
  }
} 
