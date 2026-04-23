import type React from "react";
import TicketForm from "./TicketForm";

export default function TicketCard(): React.JSX.Element {
  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Create Support Ticket
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Fill out the form below and our support team will get back to you as
        soon as possible.
      </p>

      <div className="mt-6">
        <TicketForm />
      </div>
    </div>
  );
}
