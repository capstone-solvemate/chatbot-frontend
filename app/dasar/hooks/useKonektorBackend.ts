import type { KonektorBackend } from "../KonektorBackend";
import { useAppContext } from "./useAppContext";

export function useKonektorBackend(): KonektorBackend {
  return useAppContext().konektorBackend;
}