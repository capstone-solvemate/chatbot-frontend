import type { KonektorBackend } from "./KonektorBackend";
import type { StateOtentikasi } from "./StateOtentikasi";

export type ContextType = [
  boolean, // dev mode
  StateOtentikasi,
  KonektorBackend,
  (notifikasi: any | null) => void, // setMasterNotification
  (error: any | null) => void, // setMasterError
  () => void // prompt logout
]