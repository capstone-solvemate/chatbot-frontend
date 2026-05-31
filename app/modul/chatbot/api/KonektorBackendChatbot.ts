import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { KonektorWebsocket } from "~/dasar/api/ws/KonektorWebsocket";
import type { Chat } from "../domain/Chat";
import { dtoToChat } from "./dto/DtoConverter";
import type { WsErrorResponse } from "~/dasar/api/ws/dto/WsErrorResponse";
import type { BuatChatDto } from "./dto/BuatChatDto";
import type { WsError } from "~/dasar/api/ws/dto/WsError";

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
    onError: (err: WsError) => void
  ): WebSocket {
    return this.konektorWebsocket.connect({
      path: '/api/chat/ws',
      onMessage: onMessage,
      onError: onError
    })
  }

  async buatChat(dto: BuatChatDto): Promise<void> {

  }
}