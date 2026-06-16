import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { DtoKirimReport } from "./dto/DtoKirimReport";

export class KonektorChatbotMonitoring {
  constructor(private readonly konektorRestApi: KonektorRestApi) { }

  async share(dto: DtoKirimReport) {
    await this.konektorRestApi.post("/api/chatbot-monitoring/share", dto)
  }
}