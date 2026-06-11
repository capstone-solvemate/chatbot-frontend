import type { TipePayloadWsChat } from "./TipePayloadWsChat";

export abstract class PayloadWsChat {
  constructor(public tipe: TipePayloadWsChat) { }

  toPlainObject(): Record<string, any> {
    return {
      tipe: this.tipe
    }
  }
};
