import IkonBot from "~/komponen/IkonBot";

type BotMessageProps = {
  text: string;
  time: string;
};

export default function BotMessage({ text, time }: BotMessageProps) {
  return (
    <div className="flex gap-3 items-start max-w-xl">
      <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <IkonBot />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900">
        <p>{text}</p>

        <span className="text-xs text-gray-500 mt-2 block">{time}</span>
      </div>
    </div>
  );
}
