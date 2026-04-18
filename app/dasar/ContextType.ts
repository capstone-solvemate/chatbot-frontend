import type { KonektorBackend } from "./KonektorBackend";
import type { StateOtentikasi } from "./StateOtentikasi";

export type ContextType = [
  boolean,
  StateOtentikasi,
  KonektorBackend,
  (notifikasi: any | null) => void,
  (error: any | null) => void
]