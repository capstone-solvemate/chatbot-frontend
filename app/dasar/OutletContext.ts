import type { KonektorRestApi } from "./api/rest/KonektorRestApi"
import type { StateNotifikasi } from "./notifikasi/StateNotifikasi"
import type { StateOtentikasi } from "./StateOtentikasi"
import type { Environment } from "./types/Environment"

export type OutletContext = {
  environment: Environment,
  stateOtentikasi: StateOtentikasi,
  konektorBackend: KonektorRestApi,
  setMasterNotifikasi: (notifikasi: any | null) => void,
  setMasterError: (error: any | null) => void,
  promptLogout: () => void,
  stateNotifikasi: StateNotifikasi | null,
  loadMoreNotifikasi: () => Promise<void>,
  markNotifikasiAsRead: (id: bigint) => Promise<void>,
  markAllNotifikasiAsRead: () => Promise<void>,
}