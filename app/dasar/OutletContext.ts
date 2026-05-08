import type { KonektorBackend } from "./KonektorBackend"
import type { StateNotifikasi } from "./notifikasi/StateNotifikasi"
import type { StateOtentikasi } from "./StateOtentikasi"

export type OutletContext = {
  devMode: boolean, // dev mode
  stateOtentikasi: StateOtentikasi,
  konektorBackend: KonektorBackend,
  setMasterNotifikasi: (notifikasi: any | null) => void, // setMasterNotification
  setMasterError: (error: any | null) => void, // setMasterError
  promptLogout: () => void, // prompt logout
  stateNotifikasi: StateNotifikasi | null // state notifikasi
}