import { useEffect, useState } from "react"
import { type MouseEvent } from "react";
import AngleDownIcon from "@/assets/images/icons/angle_down.svg"
import SendIcon from "@/assets/images/icons/send.svg"
import TicketItemView from "./components/TicketItemView";
import ChatItemView from "./components/ChatItemView";
import { CHATBOT_MINIMIZE_EVENT_NAME } from "@/Constants"


export default function App() {
  const [minimized, setMinimized] = useState<boolean>(true);
  const [activeTicketIndex, setActiveTicketIndex] = useState<number>(0);

  useEffect(() => {
    const search = new URLSearchParams(location.search)
    const parentOrigin = search.get("parent_origin")

    if (parentOrigin) {
      window.parent.postMessage({
        type: CHATBOT_MINIMIZE_EVENT_NAME,
        state: minimized
      }, parentOrigin)
    }
  }, [minimized])

  const handleMinimizeButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMinimized(!minimized)
  }

  const handleTitleClick = () => {
    if (minimized) {
      setMinimized(!minimized)
    }
  }

  const handleTicketItemClick = (index: number) => {
    setActiveTicketIndex(index)
  }

  return (
    <div role="button" className={"flex flex-col rounded-t-lg bg-white " + (!minimized && "h-96")}>
      <div className={"flex justify-between px-4 py-2 border-b " + (minimized ? "cursor-pointer border-transparent" : "cursor-default border-black")} onClick={handleTitleClick}>
        <div>Tanya Kami</div>
        {!minimized &&
          <button onClick={handleMinimizeButtonClick} className="cursor-pointer">
            <img src={AngleDownIcon} />
          </button>
        }
      </div>
      {!minimized &&
        <div className="flex grow">
          <div className="shrink-0 flex flex-col border-r p-2 gap-1">
            <TicketItemView selected={activeTicketIndex == 0} onClick={() => { handleTicketItemClick(0) }}>
              Tiket Baru
            </TicketItemView>
            <TicketItemView selected={activeTicketIndex == 1} onClick={() => { handleTicketItemClick(1) }}>
              Tiket 1
            </TicketItemView>
            <TicketItemView selected={activeTicketIndex == 2} onClick={() => { handleTicketItemClick(2) }} >
              Tiket 2
            </TicketItemView>
            <div className="text-xs mt-5">Closed Ticket</div>
            <TicketItemView selected={activeTicketIndex == 3} onClick={() => { handleTicketItemClick(3) }} >
              Tiket 3
            </TicketItemView>
          </div>
          <div className="grow flex flex-col p-2 gap-2">
            <div className="grow flex flex-col gap-4 overflow-y-auto">
              <ChatItemView fromCustomer={true}>Selamat siang, bagaimana mengatasi masalah printer tidak mau keluar tinta?</ChatItemView>
              <ChatItemView fromCustomer={false}>Terima kasih telah menghubungi kami. Bisakah diinformasikan jenis printer yang Anda pakai?</ChatItemView>
            </div>
            <div className="flex gap-2">
              <textarea className="border border-gray-500 rounded p-1.5 grow outline-none" placeholder="Tanya sesuatu..." rows={1}></textarea>
              <button className="bg-gray-200 p-2 rounded cursor-pointer">
                <img src={SendIcon} />
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
