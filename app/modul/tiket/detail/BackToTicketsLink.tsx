import { NavLink } from "react-router";
import IkonPanahKiri from "~/komponen/IkonPanahKiri";

export default function BackToTicketsLink() {
  return (
    <NavLink
      to="/tiket"
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
    >
      <IkonPanahKiri />
      Back to Tickets
    </NavLink>
  );
}
