import type { KonektorBackend } from "./KonektorBackend"
import type { StateNotifikasi } from "./notifikasi/StateNotifikasi"
import type { StateOtentikasi } from "./StateOtentikasi"

export type OutletContext = {
  devMode: boolean,
  stateOtentikasi: StateOtentikasi,
  konektorBackend: KonektorBackend,
  setMasterNotifikasi: (notifikasi: any | null) => void,
  setMasterError: (error: any | null) => void,
  promptLogout: () => void,
  stateNotifikasi: StateNotifikasi | null,
  loadMoreNotifikasi: () => Promise<void>,
  markNotifikasiAsRead: (id: bigint) => Promise<void>,
  markAllNotifikasiAsRead: () => Promise<void>,
}