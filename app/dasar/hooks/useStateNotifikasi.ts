import type { StateNotifikasi } from "../notifikasi/StateNotifikasi";
import { useAppContext } from "./useAppContext";

export function useStateNotifikasi(): StateNotifikasi | null {
  const { stateNotifikasi } = useAppContext();
  return stateNotifikasi;
}