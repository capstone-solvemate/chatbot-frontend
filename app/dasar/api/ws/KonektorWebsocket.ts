import { ApiErrorCodes } from "../ApiErrorCodes";
import type { WsErrorResponse } from "./dto/WsErrorResponse";

export class KonektorWebsocket {
  constructor(
    private onUnauthenticated: () => void
  ) { }

  async connect(
    params: {
      path: string,
      onMessage: (event: MessageEvent) => void,
      onError: (status: number, reason: WsErrorResponse) => void
      onOpen?: () => void,
    }
  ) {
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
          params.onError(statusCode, reason)
        }
      }
    })
  }
}