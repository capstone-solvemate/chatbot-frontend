import IkonSparkles from "~/komponen/IkonSparkles";
import AssistantChatBubble from "./AssistantChatBubble";

export default function AssistantChatPreview() {
  return (
    <div className="bg-linear-to-r from-blue-50 to-blue-100 md:flex items-center justify-center p-10 hidden">
      <div className="relative flex flex-col gap-4">
        <AssistantChatBubble variant="user">
          How do I reset my password?
        </AssistantChatBubble>

        <AssistantChatBubble variant="ai">
          I can help you with that! Let me guide you through the password reset
          process...
        </AssistantChatBubble>

        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 shadow-lg">
          <IkonSparkles className="w-5" />
        </div>
      </div>
    </div>
  );
}
