import { useAppContext } from "./useAppContext";

export function useMasterError() {
  const { setMasterError } = useAppContext();
  return { setMasterError };
}