import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { KonektorWebsocket } from "~/dasar/api/ws/KonektorWebsocket";
import type { Chat } from "../domain/Chat";
import { dtoToChat } from "./dto/DtoConverter";
import type { WsError } from "~/dasar/api/ws/dto/WsError";
import type { PayloadWsBuatChat } from "./dto/PayloadWsBuatChat";
import { PayloadWsGetPesanChatLama } from "./dto/PayloadWsGetPesanChatLama";
import type { PayloadWsGetPesanChatBaru } from "./dto/PayloadWsGetPesanChatBaru";

export class KonektorBackendChatbot {
  constructor(
    private konektorRestApi: KonektorRestApi,
    private konektorWebsocket: KonektorWebsocket
  ) { }

  async getDaftarChat(): Promise<Chat[]> {
    const response = await this.konektorRestApi.get("/api/chat");
    const dto: any[] = await response.json();
    return dto.map((item) => dtoToChat(item));
  }

  listenPesanChatBaru(
    onMessage: (event: MessageEvent) => void,
    onError: (err: WsError) => void,
    onNormalClose?: () => void
  ): WebSocket {
    return this.konektorWebsocket.connect({
      path: '/api/ws/chat',
      onMessage: onMessage,
      onError: onError,
      onNormalClose: onNormalClose
    })
  }

  listenPesanChatLama(
    idChat: bigint,
    onMessage: (event: MessageEvent) => void,
    onError: (err: WsError) => void,
    onNormalClose?: () => void
  ): WebSocket {
    return this.konektorWebsocket.connect({
      path: `/api/ws/chat/${idChat.toString()}`,
      onMessage: onMessage,
      onError: onError,
      onNormalClose: onNormalClose
    })
  }

  buatChat(payload: PayloadWsBuatChat, ws: WebSocket): void {
    ws.send(JSON.stringify(payload.toPlainObject()))
  }

  getDaftarPesanChatLama(ws: WebSocket): void {
    const payload = new PayloadWsGetPesanChatLama()
    ws.send(JSON.stringify(payload.toPlainObject()))
  }

  getPesanChatBaru(payload: PayloadWsGetPesanChatBaru, ws: WebSocket) {
    ws.send(JSON.stringify(payload.toPlainObject()))
  }
}