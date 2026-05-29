import type { OutletContext } from "~/dasar/OutletContext";
import type { KonektorBackendChatbot } from "../api/KonektorBackendChatbot";

export interface ContextHalamanChatbot extends OutletContext {
  konektorBackendChatbot: KonektorBackendChatbot;
  expandSidebar: boolean;
  idChat: bigint | null;
  onIdChatTidakDitemukan: () => void;
}
