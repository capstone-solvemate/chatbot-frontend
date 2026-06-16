import { useAppContext } from "./useAppContext";

export function useNotifikasi(): { notify: (title: string, body: string) => void } {
  return { notify: useAppContext().notify }
}