import type { KonektorBackend } from "./KonektorBackend";
import type { StateNotifikasi } from "./notifikasi/StateNotifikasi";
import type { StateOtentikasi } from "./StateOtentikasi";

export type ContextType = [
  boolean, // dev mode
  StateOtentikasi,
  KonektorBackend,
  (notifikasi: any | null) => void, // setMasterNotification
  (error: any | null) => void, // setMasterError
  () => void, // prompt logout
  StateNotifikasi | null // state notifikasi
]