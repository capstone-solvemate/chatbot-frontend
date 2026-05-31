import { vi } from "vitest"
import type { WsErrorResponse } from "../dto/WsErrorResponse"
import type { KonektorWebsocket } from "../KonektorWebsocket"

export function mockKonektorWebsocket(overrides: {
  connect?: (
    params: {
      path: string,
      onMessage: (event: MessageEvent) => void,
      onError: (status: number, reason: WsErrorResponse) => void
      onOpen?: () => void,
    }
  ) => void
} = {}): KonektorWebsocket {
  return {
    connect: overrides.connect ?? vi.fn()
  } as unknown as KonektorWebsocket
}