import { NavLink } from "react-router";
import IkonPanahKiri from "~/komponen/IkonPanahKiri";

export default function BackToTicketsLink() {
  return (
    <div className="flex justify-start">
      <NavLink
        to="/tiket"
        className="flex items-center gap-2 text-sm -m-2 text-gray-600 py-2 rounded px-2 border border-transparent hover:bg-gray-100 hover:border-gray-200 hover:text-gray-800"
      >
        <IkonPanahKiri />
        Back to Tickets
      </NavLink>
    </div>
  );
}
