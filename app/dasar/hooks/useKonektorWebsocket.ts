import type { KonektorWebsocket } from "../api/ws/KonektorWebsocket";
import { useAppContext } from "./useAppContext";

export function useKonektorWebsocket(): KonektorWebsocket {
  return useAppContext().konektorWebsocket
}