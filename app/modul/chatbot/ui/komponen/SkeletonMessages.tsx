import type React from "react";
import SkeletonUserMessage from "./SkeletonUserMessage";
import SkeletonBotMessage from "./SkeletonBotMessage";

export default function SkeletonMessages(): React.JSX.Element {
  return (
    <div className="w-full max-w-3xl mx-auto flex-1 px-8 py-6 space-y-6">
      <SkeletonBotMessage />
      <SkeletonUserMessage />
      <SkeletonBotMessage />
      <SkeletonUserMessage />
    </div>
  );
}
