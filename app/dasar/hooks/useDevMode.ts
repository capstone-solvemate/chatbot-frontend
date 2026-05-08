import { useAppContext } from "./useAppContext";

export function useDevMode(): boolean {
  return useAppContext().devMode;
}