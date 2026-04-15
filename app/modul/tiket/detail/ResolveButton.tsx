import IkonCheckCircle from "~/komponen/ikon/IkonCheckCircle";

export default function ResolveButton() {
  return (
    <button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2">
      <IkonCheckCircle />
      Mark as Resolved
    </button>
  );
}
