import IkonUser from "~/komponen/ikon/IkonUser";

type UserMessageProps = {
  text: string;
  time: string;
};

export default function UserMessage({ text, time }: UserMessageProps) {
  return (
    <div className="flex justify-end items-start gap-3">
      <div className="bg-blue-600 text-white rounded-xl px-4 py-3 text-sm max-w-xs">
        <p>{text}</p>

        <span className="text-xs text-blue-100 mt-2 block">{time}</span>
      </div>

      <div className="w-10 h-10 shrink-0 rounded-full bg-gray-700 flex items-center justify-center text-white">
        <IkonUser />
      </div>
    </div>
  );
}
