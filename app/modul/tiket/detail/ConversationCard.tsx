import ConversationHeader from "./ConversationHeader";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import ResolveButton from "./ResolveButton";

type Props = { idChat: string };

export default function ConversationCard({ idChat }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <ConversationHeader />
      <MessageItem />
      <hr className="border-gray-200" />
      <MessageInput />
      <ResolveButton />
    </div>
  );
}
