import type { KonektorRestApi } from "../api/rest/KonektorRestApi";
import { useAppContext } from "./useAppContext";

export function useKonektorRestApi(): KonektorRestApi {
  return useAppContext().konektorBackend
}