import { PayloadWsChat } from "./PayloadWsChat.js";
import type { TipePayloadWsChat } from "./TipePayloadWsChat.js";

export class PayloadWsChatBaru extends PayloadWsChat {
  constructor(
    public id: string,
    public idPembuat: number,
    public tanggalDibuat: string,
    public subjek: string,
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
    }[],
    public idKoneksiWs: string,
    tipe: TipePayloadWsChat
  ) {
    super(tipe)
  }
} 
