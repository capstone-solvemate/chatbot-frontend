import type { OutletContext } from "~/dasar/OutletContext";
import type { KonektorBackendChatbot } from "../api/KonektorBackendChatbot";
import type React from "react";
import type { Chat } from "../domain/Chat";

export interface ContextHalamanChatbot extends OutletContext {
  konektorBackendChatbot: React.RefObject<KonektorBackendChatbot>;
  expandSidebar: boolean;
  idChat: bigint | null;
  onIdChatTidakDitemukan: () => void;
  onChatBaruDibuat: (chat: Chat) => void
}
