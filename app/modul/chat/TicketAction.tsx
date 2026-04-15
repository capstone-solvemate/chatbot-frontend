import IkonBot from "~/komponen/ikon/IkonBot";

export default function TicketAction() {
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

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
          Create a ticket now
        </button>

        <span className="text-xs text-gray-500 mt-2 block">09:28</span>
      </div>
    </div>
  );
}
