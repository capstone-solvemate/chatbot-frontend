import type { TipePayloadWsChat } from "./TipePayloadWsChat.js";

export abstract class PayloadWsChat {
  constructor(public tipe: TipePayloadWsChat) { }
};
