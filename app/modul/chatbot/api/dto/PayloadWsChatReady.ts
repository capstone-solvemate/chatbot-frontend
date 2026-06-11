import { PayloadWsChat } from "./PayloadWsChat";
import { TipePayloadWsChat } from "./TipePayloadWsChat";

export class PayloadWsChatReady extends PayloadWsChat {
  constructor() {
    super(TipePayloadWsChat.Ready)
  }
};