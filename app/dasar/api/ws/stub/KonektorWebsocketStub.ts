import { vi } from "vitest"
import type { WsErrorResponse } from "../dto/WsErrorResponse"
import type { KonektorWebsocket } from "../KonektorWebsocket"
import type { WsError } from "../dto/WsError"

export function mockKonektorWebsocket(overrides: {
  connect?: (
    params: {
      path: string,
      onMessage: (event: MessageEvent) => void,
      onError: (err: WsError) => void
      onOpen?: () => void,
      onNormalClose?: (code: number) => void
    }
  ) => void
} = {}): KonektorWebsocket {
  return {
    connect: overrides.connect ?? vi.fn()
  } as unknown as KonektorWebsocket
}