import { Button } from "~/komponen/Button";
import { AssistantFeatureItem } from "./AssistantFeatureItem";
import IkonSparkles from "~/komponen/ikon/IkonSparkles";
import IkonChatBubble from "~/komponen/ikon/IkonChatBubble";

export default function AssistantInfo() {
  return (
    <div className="p-10 flex flex-col gap-6 items-center md:items-start">
      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
        <IkonSparkles className="w-5" />
      </div>

      <h2 className="text-3xl font-medium text-gray-900 text-center md:text-start">
        Ask AI Assistant
      </h2>

      <p className="text-gray-500 leading-relaxed text-center md:text-start">
        Get instant help using our AI chatbot. Available 24/7 to answer your
        questions and provide quick solutions to common problems.
      </p>

      <ul className="flex flex-col gap-3">
        <AssistantFeatureItem text="Instant responses, no waiting" />
        <AssistantFeatureItem text="Powered by advanced AI technology" />
        <AssistantFeatureItem text="Solve problems without creating tickets" />
      </ul>

      <Button
        href="/chat"
        className="mt-4"
        leftIcon={<IkonChatBubble className="w-5" />}
      >
        Start Chat with AI
      </Button>
    </div>
  );
}
