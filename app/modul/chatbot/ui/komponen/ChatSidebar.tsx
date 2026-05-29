import IkonEdit from "~/komponen/ikon/IkonEdit";
import ChatSidebarItem from "./ChatSidebarItem";
import IkonChatBubbleBerisi from "~/komponen/ikon/IkonChatBubbleBerisi";
import type { Chat } from "../../domain/Chat";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { Environment } from "~/dasar/types/Environment";
import ChatSidebarItemSkeleton from "./ChatSidebarItemSkeleton";

type Props = {
  loading: boolean;
  expand: boolean;
  daftarChat: Chat[];
  idChatAktif: bigint | null;
};

export default function ChatSidebar({
  loading,
  expand,
  daftarChat,
  idChatAktif,
}: Props) {
  const notProductionMode = useEnvironment() !== Environment.Production;

  return (
    <div
      className={`fixed ${notProductionMode ? "top-40 pt-3" : "top-32 pt-4"}  z-20 left-0 ${expand ? "w-64" : "w-0"} overflow-y-auto overflow-x-hidden shrink-0 border-r bg-white border-gray-200 flex flex-col transition-all ease-out`}
      style={{ height: `calc(100vh - ${notProductionMode ? "10" : "8"}rem)` }}
    >
      <ChatSidebarItem
        icon={<IkonEdit className="w-5" />}
        active={idChatAktif === null}
        to="/chat"
      >
        New Chat
      </ChatSidebarItem>

      <div className="w-full border-t border-gray-300" />

      {!loading
        ? daftarChat.map((chat) => (
            <ChatSidebarItem
              key={chat.id}
              icon={<IkonChatBubbleBerisi className="w-5" />}
              active={idChatAktif === chat.id}
              to={`/chat/${chat.id}`}
            >
              {chat.subjek}
            </ChatSidebarItem>
          ))
        : Array.from({ length: 5 }).map((_, i) => (
            <ChatSidebarItemSkeleton key={i} />
          ))}
    </div>
  );
}
