import type { KonektorRestApi } from "../api/rest/KonektorRestApi";
import { useAppContext } from "./useAppContext";

export function useKonektorBackend(): KonektorRestApi {
  return useAppContext().konektorBackend;
}