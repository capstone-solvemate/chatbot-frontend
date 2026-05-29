import { Environment } from "../types/Environment";
import { useAppContext } from "./useAppContext";

export function useEnvironment(): Environment {
  return useAppContext().environment;
}