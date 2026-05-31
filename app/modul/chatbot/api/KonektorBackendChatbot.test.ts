import { describe, expect, it } from "vitest";
import { KonektorBackendChatbot } from "./KonektorBackendChatbot";
import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { KonektorWebsocket } from "~/dasar/api/ws/KonektorWebsocket";
import { mockKonektorRestApi } from "~/dasar/api/rest/stub/KonektorRestApiStub";
import { mockKonektorWebsocket } from "~/dasar/api/ws/stub/KonektorWebsocketStub";
import { mockMessageEvent } from "~/dasar/api/ws/stub/websocket/MessageEventStub";
import type { WsErrorResponse } from "~/dasar/api/ws/dto/WsErrorResponse";
import { ApiErrorCodes } from "~/dasar/api/ApiErrorCodes";

function buatKonektorBackendChatbot(deps: {
  konektorRestApi?: KonektorRestApi,
  konektorWebsocket?: KonektorWebsocket
} = {}): KonektorBackendChatbot {
  return new KonektorBackendChatbot(
    deps.konektorRestApi ?? mockKonektorRestApi(),
    deps.konektorWebsocket ?? mockKonektorWebsocket()
  )
}

describe("KonektorBackendChatbot", () => {
  describe("fungsi 'listenPesanChatBaru'", () => {
    it("harus memanggil fungsi connect dengan path '/api/chat/ws' class KonektorWebsocket", () => {
      const konektorWebsocket = mockKonektorWebsocket()
      const konektorBackendChatbot = buatKonektorBackendChatbot({
        konektorWebsocket: konektorWebsocket
      })

      konektorBackendChatbot.listenPesanChatBaru(() => { }, () => { })

      expect(konektorWebsocket.connect).toHaveBeenCalledWith(
        expect.objectContaining({ path: '/api/chat/ws' })
      )
    })

    it("harus memanggil callback onMessage saat ada pesan dari server dan memberikan parameter pesan yang sesuai", () => {
      const message = JSON.stringify({ type: 0 })

      const konektorWebsocket = mockKonektorWebsocket({
        connect: (params) => {
          params.onMessage(mockMessageEvent({
            data: message
          }))
        }
      })
      const konektorBackendChatbot = buatKonektorBackendChatbot({
        konektorWebsocket: konektorWebsocket
      })

      let collectedMessage: string | null = null

      const onMessageCallback = (message: MessageEvent) => {
        collectedMessage = message.data
      }

      konektorBackendChatbot.listenPesanChatBaru(onMessageCallback, () => { })

      expect(collectedMessage).toBe(message)
    })

    it("harus memanggil callback onError saat terjadi error dengan memberikan data error yang sesuai", () => {
      const code = 4401
      const reason: WsErrorResponse = {
        error: ApiErrorCodes.Unauthenticated,
        message: "unauthenticated"
      }

      const konektorWebsocket = mockKonektorWebsocket({
        connect: (params) => {
          params.onError(code, reason)
        }
      })
      const konektorBackendChatbot = buatKonektorBackendChatbot({
        konektorWebsocket: konektorWebsocket
      })

      let collectedCode: number = 0
      let collectedReason: WsErrorResponse | null = null

      const onErrorCallback = (code: number, reason: WsErrorResponse) => {
        collectedCode = code
        collectedReason = reason
      }

      konektorBackendChatbot.listenPesanChatBaru(() => { }, onErrorCallback)

      expect(collectedCode).toBe(code)
      expect(collectedReason!.error).toBe(reason.error)
    })
  })
})