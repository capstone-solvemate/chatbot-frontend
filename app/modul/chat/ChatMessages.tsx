import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import TicketAction from "./TicketAction";

export default function ChatMessages() {
  return (
    <div className="w-full max-w-3xl mx-auto flex-1 px-8 py-6 space-y-6">
      <BotMessage
        text="Hello! I'm your AI assistant. I can help you with equipment issues, technical questions, and printing problems. How can I assist you today?"
        time="05:07 PM"
      />

      <UserMessage text="My printer is not working" time="09:25" />

      <BotMessage
        text="I understand you're having trouble with your printer. Let me help you troubleshoot this issue. First, can you tell me what error message you're seeing on the printer display?"
        time="09:25"
      />

      <UserMessage text="It shows error code E-01" time="09:26" />

      <BotMessage
        text="Error code E-01 typically indicates a paper jam or sensor issue. Here are some steps you can try: 1. Turn off the printer 2. Open all trays and check for any stuck paper 3. Close all trays properly 4. Turn the printer back on Have you tried these steps?"
        time="09:26"
      />

      <UserMessage
        text="Yes, I tried all of that but the error persists"
        time="09:28"
      />

      <TicketAction />
    </div>
  );
}
