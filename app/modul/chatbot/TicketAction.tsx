import { Button } from "~/komponen/Button";
import IkonBot from "~/komponen/ikon/IkonBot";
import { IkonTiket } from "~/komponen/ikon/IkonTiket";

type Props = {
  idChat: string;
  dialihkanKeTiket: boolean;
};

export default function TicketAction({ idChat, dialihkanKeTiket }: Props) {
  return (
    <div className="flex gap-3 items-start max-w-xl">
      <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <IkonBot />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm text-gray-900 w-full">
        {dialihkanKeTiket ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <IkonTiket className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
              <p className="text-gray-600">
                A support ticket has been created for this conversation. This
                chat is now locked — our technical team will follow up through
                the ticket.
              </p>
            </div>
            <Button className="px-6 py-2! self-start" href={`/tiket/${idChat}`}>
              Go to ticket
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-4">
              It looks like this issue requires further assistance from our
              technical team.
            </p>
            <Button className="px-6 py-2!" href={`/tiket/create/${idChat}`}>
              Create a ticket now
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
