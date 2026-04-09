import { type ReactNode } from "react";

type ChatBubbleProps = {
  children: ReactNode;
  variant?: "user" | "ai";
};

export default function AssistantChatBubble({
  children,
  variant = "user",
}: ChatBubbleProps) {
  return (
    <div className={"max-w-xs " + (variant === "ai" && "ps-6")}>
      <div
        className={
          "px-4 py-3 text-sm shadow rounded-xl " +
          (variant === "user"
            ? "bg-white text-gray-700 rounded-tl-none"
            : "bg-blue-600 text-white rounded-tr-none")
        }
      >
        {children}
      </div>
    </div>
  );
}
