import AssistantInfo from "./AssistantInfo";
import AssistantChatPreview from "./AssistantChatPreview";

export default function AiAssistantCard() {
  return (
    <div className="grid grid-cols-2 rounded-2xl overflow-hidden bg-white shadow-xl">
      <AssistantInfo />
      <AssistantChatPreview />
    </div>
  );
}
