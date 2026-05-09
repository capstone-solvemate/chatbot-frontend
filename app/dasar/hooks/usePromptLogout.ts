import { useAppContext } from "./useAppContext";

export function usePromptLogout(): () => void {
  const { promptLogout } = useAppContext();
  return promptLogout;
}