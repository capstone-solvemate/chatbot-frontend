import { vi } from "vitest";
import type { KonektorBackendChatbot } from "./KonektorBackendChatbot";
import type { WsErrorResponse } from "~/dasar/api/ws/dto/WsErrorResponse";
import type { BuatChatDto } from "./dto/BuatChatDto";
import type { WsError } from "~/dasar/api/ws/dto/WsError";

export function mockKonektorBackendChatbot(overrides: {
  listenPesanChatBaru?: (
    onMessage: (event: MessageEvent) => void,
    onError: (err: WsError) => void
  ) => WebSocket,
  buatChat?: (dto: BuatChatDto) => void
} = {}): KonektorBackendChatbot {
  return {
    listenPesanChatBaru: overrides.listenPesanChatBaru ?? vi.fn(),
    buatChat: overrides.buatChat ?? vi.fn()
  } as unknown as KonektorBackendChatbot
}