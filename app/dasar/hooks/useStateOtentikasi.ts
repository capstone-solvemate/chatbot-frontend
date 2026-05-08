import type { StateOtentikasi } from "../StateOtentikasi";
import { useAppContext } from "./useAppContext";

export function useStateOtentikasi(): StateOtentikasi {
  return useAppContext().stateOtentikasi;
}