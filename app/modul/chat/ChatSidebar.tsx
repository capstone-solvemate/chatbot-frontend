import IkonEdit from "~/komponen/ikon/IkonEdit";
import IkonPerlebar from "~/komponen/ikon/IkonPerlebar";
import ChatSidebarItem from "./ChatSidebarItem";
import IkonChatBubbleBerisi from "~/komponen/ikon/IkonChatBubbleBerisi";
import { useOutletContext } from "react-router";

export default function ChatSidebar() {
  const [devMode]: [boolean] = useOutletContext();
  const dummyChat = new Array(20).fill(null);

  return (
    <div
      className="fixed z-40 left-0 w-16 overflow-y-auto shrink-0 border-r bg-white border-gray-200 flex flex-col items-center py-4 gap-6"
      style={{ height: `calc(100vh - ${devMode ? "10.75" : "9"}rem)` }}
    >
      {/* Menu */}
      <ChatSidebarItem>
        <IkonPerlebar className="w-5" />
      </ChatSidebarItem>

      <ChatSidebarItem>
        <IkonEdit className="w-5" />
      </ChatSidebarItem>

      <div className="w-full border-t border-gray-700" />

      {/* History */}
      {dummyChat.map((_e, i) => (
        <ChatSidebarItem key={i}>
          <IkonChatBubbleBerisi className="w-5" />
        </ChatSidebarItem>
      ))}
    </div>
  );
}
