import Navbar from "~/komponen/Navbar";
import TicketCard from "./TicketCard";

export default function HalamanBuatTiket() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-6 pb-8 pt-28">
        <div className="flex justify-center px-4">
          <TicketCard />
        </div>
      </div>
    </>
  );
}
