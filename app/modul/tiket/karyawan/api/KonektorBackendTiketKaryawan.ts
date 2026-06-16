import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { BuatTiketRequestDto } from "./dto/BuatTiketRequestDto";

export class KonektorBackendTiketKaryawan {
  constructor(private konektorRestApi: KonektorRestApi) { }

  async buatTiket(dto: BuatTiketRequestDto) {
    await this.konektorRestApi.post("/api/tiket", dto);
  }
}