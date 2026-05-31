import type { KonektorBackendChatbot } from "../api/KonektorBackendChatbot";
import { mockKonektorBackendChatbot } from "../api/KonektorBackendChatbotStub";
import type { ContextHalamanChatbot } from "./ContextHalamanChatbot";

export function mockContextHalamanChatbot(overrides: {
  konektorBackendChatbot?: KonektorBackendChatbot
  idChat?: bigint | null
} = {}): ContextHalamanChatbot {
  return {
    konektorBackendChatbot: overrides.konektorBackendChatbot ?? mockKonektorBackendChatbot(),
    idChat: overrides.idChat ?? null
  } as unknown as ContextHalamanChatbot
}