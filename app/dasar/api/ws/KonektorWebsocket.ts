import { ApiErrorCodes } from "../ApiErrorCodes";
import { WsError } from "./dto/WsError";
import type { WsErrorResponse } from "./dto/WsErrorResponse";

export class KonektorWebsocket {
  constructor(
    private onUnauthenticated: () => void
  ) { }

  connect(
    params: {
      path: string,
      onMessage: (event: MessageEvent) => void,
      onError: (err: WsError) => void
      onOpen?: () => void,
    }
  ): WebSocket {
    const baseUrl: URL = new URL(import.meta.env.VITE_SITE_URL)
    const protocol = baseUrl.protocol === "https:" ? "wss" : "ws";
    const url = new URL(params.path, `${protocol}://${baseUrl.host}`);

    const ws = new WebSocket(url)

    ws.addEventListener('open', () => {
      params.onOpen?.()
    })

    ws.addEventListener('message', params.onMessage)

    ws.addEventListener('close', (event: CloseEvent) => {
      const statusCode = event.code
      if (statusCode > 4399) {
        const reason: WsErrorResponse = JSON.parse(event.reason)
        if (statusCode === 4401 || reason.error === ApiErrorCodes.Unauthenticated) {
          this.onUnauthenticated()
        } else {
          params.onError(new WsError(statusCode, reason))
        }
      }
    })

    return ws
  }
}