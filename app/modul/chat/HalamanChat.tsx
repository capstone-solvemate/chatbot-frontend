import PageHeader from "./PageHeader";
import ChatLayout from "./ChatLayout";
import Navbar from "~/komponen/Navbar";
import type { Route } from "./+types/HalamanChat";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chat Support" }];
}

export default function HalamanChat() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pb-6 pt-36">
        <PageHeader />

        <ChatLayout />
      </div>
    </div>
  );
}
