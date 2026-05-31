import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { KonektorWebsocket } from "~/dasar/api/ws/KonektorWebsocket";
import type { Chat } from "../domain/Chat";
import { dtoToChat } from "./dto/DtoConverter";
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

  async buatChat(dto: BuatChatDto): Promise<void> {
    await this.konektorRestApi.post("/api/chat", dto)
  }
}