import BackToTicketsLink from "./BackToTicketsLink";
import TicketDetailCard from "./TicketDetailCard";
import ConversationCard from "./ConversationCard";
import type { Route } from "./+types/HalamanDetailTiket";
import Navbar from "~/komponen/Navbar";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Detail Tiket" }];
}

export default function HalamanDetailTiket() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pb-8 pt-32 space-y-6">
        <BackToTicketsLink />

        <TicketDetailCard />

        <ConversationCard />
      </div>
    </div>
  );
}
