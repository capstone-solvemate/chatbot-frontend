import IkonEdit from "~/komponen/ikon/IkonEdit";
import ChatSidebarItem from "./ChatSidebarItem";
import IkonChatBubbleBerisi from "~/komponen/ikon/IkonChatBubbleBerisi";
import type { Chat } from "./Chat";
import { useDevMode } from "~/dasar/hooks/useDevMode";

type Props = {
  expand: boolean;
  daftarChat: Chat[];
  chatAktifId: string | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
};

export default function ChatSidebar({
  expand,
  daftarChat,
  chatAktifId,
  onSelectChat,
  onNewChat,
}: Props) {
  const devMode = useDevMode();

  return (
    <div
      className={`fixed ${devMode ? "top-40 pt-3" : "top-32 pt-4"}  z-20 left-0 ${expand ? "w-64" : "w-0"} overflow-y-auto overflow-x-hidden shrink-0 border-r bg-white border-gray-200 flex flex-col transition-all ease-out`}
      style={{ height: `calc(100vh - ${devMode ? "10" : "8"}rem)` }}
    >
      <ChatSidebarItem
        icon={<IkonEdit className="w-5" />}
        onClick={onNewChat}
        active={chatAktifId === null}
      >
        New Chat
      </ChatSidebarItem>

      <div className="w-full border-t border-gray-300" />

      {daftarChat.map((chat) => (
        <ChatSidebarItem
          key={chat.id}
          icon={<IkonChatBubbleBerisi className="w-5" />}
          onClick={() => onSelectChat(chat)}
          active={chatAktifId === chat.id}
        >
          {chat.subjek}
        </ChatSidebarItem>
      ))}
    </div>
  );
}
