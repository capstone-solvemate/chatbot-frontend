import IkonEdit from "~/komponen/ikon/IkonEdit";
import IkonPerlebar from "~/komponen/ikon/IkonPerlebar";
import ChatSidebarItem from "./ChatSidebarItem";
import IkonChatBubbleBerisi from "~/komponen/ikon/IkonChatBubbleBerisi";
import { useOutletContext } from "react-router";

type Props = {
  expand: boolean;
};

export default function ChatSidebar({ expand }: Props) {
  const [devMode]: [boolean] = useOutletContext();
  const dummyChat = new Array(20).fill(null);

  return (
    <div
      className={`fixed z-40 left-0 ${expand ? "w-64" : "w-0"} overflow-y-auto shrink-0 border-r bg-white border-gray-200 flex flex-col transition-all ease-out`}
      style={{ height: `calc(100vh - ${devMode ? "10.75" : "9"}rem)` }}
    >
      <ChatSidebarItem icon={<IkonEdit className="w-5" />}>
        New Chat
      </ChatSidebarItem>

      <div className="w-full border-t border-gray-300" />

      {/* History */}
      {dummyChat.map((_e, i) => (
        <ChatSidebarItem
          key={i}
          icon={<IkonChatBubbleBerisi className="w-5" />}
        >
          Chat {i + 1}
        </ChatSidebarItem>
      ))}
    </div>
  );
}
