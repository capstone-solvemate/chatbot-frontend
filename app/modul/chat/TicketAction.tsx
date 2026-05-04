import { Button } from "~/komponen/Button";
import IkonBot from "~/komponen/ikon/IkonBot";

type Props = {
  idChat: string;
};

export default function TicketAction({ idChat }: Props) {
  return (
    <div className="flex gap-3 items-start max-w-xl">
      <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <IkonBot />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm text-gray-900 w-full">
        <p className="mb-4">
          It looks like this issue requires further assistance from our
          technical team.
        </p>

        <Button className="px-6 py-2!" href={`/tiket/create/${idChat}`}>
          Create a ticket now
        </Button>

        <span className="text-xs text-gray-500 mt-2 block">09:28</span>
      </div>
    </div>
  );
}
