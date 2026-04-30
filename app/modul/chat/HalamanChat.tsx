import PageHeader from "./PageHeader";
import Navbar from "~/komponen/Navbar";
import type { Route } from "./+types/HalamanChat";
import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const KEY_LS_EXPAND_SIDEBAR = "expand_sidebar_chat_karyawan";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chat Support" }];
}

export default function HalamanChat() {
  const oldExpandSidebarConfig = localStorage.getItem(KEY_LS_EXPAND_SIDEBAR);
  const [expandSidebar, _setExpandSidebar] = useState(
    oldExpandSidebarConfig === "1",
  );

  function toggleExpandSidebar() {
    _setExpandSidebar((oldValue) => {
      const newValue = !oldValue;
      localStorage.setItem(KEY_LS_EXPAND_SIDEBAR, newValue ? "1" : "0");
      return newValue;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pb-6 pt-36">
        <PageHeader onToggleExpand={toggleExpandSidebar} />

        <div className="flex rounded-xl">
          <ChatSidebar expand={expandSidebar} />
          <div
            className={`${expandSidebar ? "w-64" : "w-0"} shrink-0 transition-all ease-out`}
          ></div>

          <div className="grow pb-16">
            <div></div>
            <ChatMessages />
            <ChatInput expandSidebar={expandSidebar} />
          </div>
        </div>
      </div>
    </div>
  );
}
