import { useOutletContext } from "react-router";
import type { OutletContext } from "../OutletContext";

export function useAppContext(): OutletContext {
  return useOutletContext<OutletContext>();
}