import { PayloadWsChat } from "./PayloadWsChat.js";
import { TipePayloadWsChat } from "./TipePayloadWsChat.js";

export class PayloadWsChatUpdate extends PayloadWsChat {
  constructor(
    public id: string,
    public sedangDiproses: boolean,
    public dialihkanKeTiket: boolean,
    public pesan: {
      id: string,
      pesan: string,
      tanggalDibuat: string,
      chatAsisten: boolean,
      gagal: boolean,
      lampiran: {
        id: string,
      }[],
    }[]
  ) {
    super(TipePayloadWsChat.ChatUpdate)
  }
} 
