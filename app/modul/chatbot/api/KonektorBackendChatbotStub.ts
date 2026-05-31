import { vi } from "vitest";
import type { KonektorBackendChatbot } from "./KonektorBackendChatbot";
import type { WsErrorResponse } from "~/dasar/api/ws/dto/WsErrorResponse";
import type { BuatChatDto } from "./dto/BuatChatDto";

export function mockKonektorBackendChatbot(overrides: {
  listenPesanChatBaru?: (
    onMessage: (event: MessageEvent) => void,
    onError: (status: number, reason: WsErrorResponse) => void
  ) => WebSocket,
  buatChat?: (dto: BuatChatDto) => void
} = {}): KonektorBackendChatbot {
  return {
    listenPesanChatBaru: overrides.listenPesanChatBaru ?? vi.fn(),
    buatChat: overrides.buatChat ?? vi.fn()
  } as unknown as KonektorBackendChatbot
}