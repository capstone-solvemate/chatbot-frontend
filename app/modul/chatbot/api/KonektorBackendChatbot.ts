import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { KonektorWebsocket } from "~/dasar/api/ws/KonektorWebsocket";
import type { Chat } from "../domain/Chat";
import { dtoToChat } from "./dto/converters";

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
}