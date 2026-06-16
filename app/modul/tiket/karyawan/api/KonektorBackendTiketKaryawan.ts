import type { KonektorRestApi } from "~/dasar/api/rest/KonektorRestApi";
import type { BuatTiketRequestDto } from "./dto/BuatTiketRequestDto";

export class KonektorBackendTiketKaryawan {
  constructor(private konektorRestApi: KonektorRestApi) { }

  async buatTiket(dto: BuatTiketRequestDto) {
    const { daftarLampiran, ...dtoTanpaLampiran } = dto
    const formData = new FormData()
    for (const lampiran of daftarLampiran) {
      formData.append("files", lampiran)
    }
    for (const key of Object.keys(dtoTanpaLampiran) as Array<keyof typeof dtoTanpaLampiran>) {
      formData.append(key, `${dtoTanpaLampiran[key]}`)
    }
    await this.konektorRestApi.post("/api/tiket", formData);
  }
}