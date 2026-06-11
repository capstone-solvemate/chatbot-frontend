import { PayloadWsChat } from "./PayloadWsChat";
import { TipePayloadWsChat } from "./TipePayloadWsChat";

export class PayloadWsGetPesanChatLama extends PayloadWsChat {
  constructor() {
    super(TipePayloadWsChat.GetDaftarChatLama)
  }
}