import { PayloadWsChat } from "./PayloadWsChat";
import { TipePayloadWsChat } from "./TipePayloadWsChat";

export class PayloadWsBuatPesanChat extends PayloadWsChat {
  constructor(
    private pesan: string,
    private daftarLampiran: string[]
  ) {
    super(TipePayloadWsChat.BuatPesan)
  }

  override toPlainObject(): Record<string, any> {
    return {
      ...super.toPlainObject(),
      pesan: this.pesan,
      daftarLampiran: this.daftarLampiran
    }
  }
}