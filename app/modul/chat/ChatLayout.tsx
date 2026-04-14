import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
  return (
    <div className="flex rounded-xl">
      <ChatSidebar />
      <div className="w-16 shrink-0"></div>

      <div className="grow pb-16">
        <div></div>
        <ChatMessages />

        <ChatInput />
      </div>
    </div>
  );
}
