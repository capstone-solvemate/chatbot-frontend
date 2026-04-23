import { Button } from "~/komponen/Button";
import HelpCardItem from "./HelpCardItem";

export default function HelpCard() {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">
        How to Create a Ticket
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <HelpCardItem>
          Initiate a chat with the <strong>AI Assistant</strong>
        </HelpCardItem>

        <HelpCardItem>
          <strong>Provide a clear description</strong> of your issue
        </HelpCardItem>

        <HelpCardItem>
          <strong>Receive a ticket</strong> link{" "}
          <strong>if no solution is found</strong>
        </HelpCardItem>
      </div>
    </div>
  );
}
