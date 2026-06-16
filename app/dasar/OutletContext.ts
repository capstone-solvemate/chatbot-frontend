import type { KonektorRestApi } from "./api/rest/KonektorRestApi"
import type { KonektorWebsocket } from "./api/ws/KonektorWebsocket"
import type { StateNotifikasi } from "./notifikasi/StateNotifikasi"
import type { StateOtentikasi } from "./StateOtentikasi"
import type { Environment } from "./types/Environment"

export interface OutletContext {
  environment: Environment,
  stateOtentikasi: StateOtentikasi,
  konektorBackend: KonektorRestApi,
  konektorWebsocket: KonektorWebsocket,
  notify: (title: string, body: string) => void,
  setMasterError: (error: any | null) => void,
  promptLogout: () => void,
  stateNotifikasi: StateNotifikasi | null,
  loadMoreNotifikasi: () => Promise<void>,
  markNotifikasiAsRead: (id: bigint) => Promise<void>,
  markAllNotifikasiAsRead: () => Promise<void>,
}