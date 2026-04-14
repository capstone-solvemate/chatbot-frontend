import TicketCard from "./TicketCard";

export default function TicketList() {
  return (
    <div className="flex flex-col gap-4">
      <TicketCard
        id="#001"
        title="Printer not responding"
        description="The printer on the 3rd floor is not responding to print commands."
        category="Equipment"
        status="In Progress"
        created="Created 2 days ago"
        updated="Updated 1 day ago"
      />

      <TicketCard
        id="#002"
        title="Software installation request"
        description="I need Adobe Acrobat Pro installed on my workstation."
        category="Technical"
        status="Resolved"
        created="Created 3 days ago"
        updated="Updated 3 days ago"
      />

      <TicketCard
        id="#003"
        title="Print quality issues - streaking"
        description="Prints have horizontal streaks across the page."
        category="Equipment"
        status="Open"
        created="Created about 9 hours ago"
        updated="Updated about 9 hours ago"
      />
    </div>
  );
}
