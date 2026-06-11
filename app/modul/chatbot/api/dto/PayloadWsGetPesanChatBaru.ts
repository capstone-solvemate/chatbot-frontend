import { PayloadWsChat } from "./PayloadWsChat";
import { TipePayloadWsChat } from "./TipePayloadWsChat";

export class PayloadWsGetPesanChatBaru extends PayloadWsChat {
  constructor(private idPesanChatTerakhir: string) {
    super(TipePayloadWsChat.GetDaftarChatBaru)
  }

  override toPlainObject(): Record<string, any> {
    return {
      ...super.toPlainObject(),
      idPesanChatTerakhir: this.idPesanChatTerakhir
    }
  }
}