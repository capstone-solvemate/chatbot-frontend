import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { PesanChat } from "../../domain/PesanChat";
import type { Chat } from "../../domain/Chat";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";

type Props = {
  expandSidebar: boolean;
  chat: Chat | null;
  onChatCreated: (chat: Chat) => void;
  onChatUpdated: (chat: Chat) => void;
};

function buatPesanSambutan(tanggal: Date): PesanChat {
  return new PesanChat(
    0n,
    0n,
    "Hello! I'm your AI assistant. I can help you with equipment issues, technical questions, and printing problems. How can I assist you today?",
    tanggal,
    true,
    false,
  );
}

export default function TampilanPesanChat({
  expandSidebar,
  chat,
  onChatCreated,
  onChatUpdated,
}: Props) {
  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();
  const navigate = useNavigate();

  const [daftarPesanChat, setDaftarPesanChat] = useState<PesanChat[]>([
    buatPesanSambutan(new Date()),
  ]);

  // isSending lokal: aktif saat request POST sedang berjalan (sebelum WS jawaban tiba)
  // Digabung dengan chat.sedangDiproses agar saat load ulang halaman
  // (chat sudah ada tapi WS belum jawab) indikator loading tetap tampil.
  const [isSendingLokal, setIsSendingLokal] = useState(false);
  const isSending = isSendingLokal || (chat?.sedangDiproses ?? false);

  const [loadingPesan, setLoadingPesan] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [daftarPesanChat, isSending]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (!chat) {
      setDaftarPesanChat([buatPesanSambutan(new Date())]);
      setIsSendingLokal(false);
      return;
    }

    // async function loadPesanDanKonekWs() {
    //   setLoadingPesan(true);
    //   try {
    //     const response = await konektorBackend.get(`/api/chat/${chat!.id}`);
    //     const data = await response.json();
    //     const pesan: PesanChat[] = (data.pesan ?? []).map((dto: any) =>
    //       dtoToPesanChat(dto),
    //     );
    //     setDaftarPesanChat([buatPesanSambutan(chat!.tanggalDibuat), ...pesan]);
    //   } catch (e: any) {
    //     setMasterError(e);
    //   } finally {
    //     setLoadingPesan(false);
    //   }

    //   konekWebSocket(chat!.id);
    // }

    // loadPesanDanKonekWs();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [chat?.id]);

  // Saat chat.sedangDiproses berubah jadi true dari luar (e.g. navigasi ke chat
  // yang masih diproses), pastikan isSendingLokal tidak menghalangi
  useEffect(() => {
    if (!chat?.sedangDiproses) {
      setIsSendingLokal(false);
    }
  }, [chat?.sedangDiproses]);

  // function konekWebSocket(idChat: string) {
  //   const wsBaseUrl = (import.meta.env.VITE_SITE_URL as string)
  //     .replace(/^https?/, (m) => (m === "https" ? "wss" : "ws"))
  //     .replace(/\/$/, "");

  //   const ws = new WebSocket(`${wsBaseUrl}/api/chat/${idChat}/ws`);
  //   wsRef.current = ws;

  // ws.onmessage = (event) => {
  //   try {
  //     const data = JSON.parse(event.data);

  //     switch (data.type) {
  //       case "jawaban": {
  //         const pesanBaru = dtoToPesanChat({
  //           ...data.pesan,
  //           chatAsisten: true,
  //           gagal: false,
  //         });
  //         setDaftarPesanChat((prev) => [...prev, pesanBaru]);
  //         setIsSendingLokal(false);
  //         // Beritahu parent agar sedangDiproses = false di daftarChat
  //         if (chat) {
  //           onChatUpdated(
  //             new (chat.constructor as any)(
  //               chat.id,
  //               chat.subjek,
  //               chat.tanggalDibuat,
  //               false,
  //               chat.dialihkanKeTiket,
  //             ),
  //           );
  //         }
  //         break;
  //       }
  //       case "error": {
  //         // Tandai pesan karyawan terakhir sebagai gagal
  //         setDaftarPesanChat((prev) => {
  //           const lastUserMsgIdx = [...prev]
  //             .reverse()
  //             .findIndex((p) => !p.chatAsisten);
  //           if (lastUserMsgIdx === -1) return prev;
  //           const realIdx = prev.length - 1 - lastUserMsgIdx;
  //           return prev.map((p, i) =>
  //             i === realIdx
  //               ? new PesanChat(
  //                   p.id,
  //                   p.pesan,
  //                   p.chatAsisten,
  //                   p.tanggalDibuat,
  //                   true,
  //                 )
  //               : p,
  //           );
  //         });
  //         setIsSendingLokal(false);
  //         if (chat) {
  //           onChatUpdated(
  //             new (chat.constructor as any)(
  //               chat.id,
  //               chat.subjek,
  //               chat.tanggalDibuat,
  //               false,
  //               chat.dialihkanKeTiket,
  //             ),
  //           );
  //         }
  //         break;
  //       }
  //       case "session_expired": {
  //         navigate("/login");
  //         break;
  //       }
  //     }
  //   } catch (_e) {
  //     // Abaikan pesan WebSocket yang tidak valid
  //   }
  // };

  // ws.onclose = (event) => {
  //   if (event.code === 4001) {
  //     navigate("/login");
  //   }
  // };

  // ws.onerror = () => {
  //   setIsSendingLokal(false);
  // };
  // }

  async function handleSend(text: string) {
    if (isSending) return;

    const pesanUserOptimistic = new PesanChat(
      0n,
      0n,
      text,
      new Date(),
      false,
      false,
    );
    setDaftarPesanChat((prev) => [...prev, pesanUserOptimistic]);
    setIsSendingLokal(true);

    // try {
    //   if (!chat) {
    //     const response = await konektorBackend.post("/api/chat", {
    //       pesan: text,
    //     });
    //     const data = await response.json();

    //     const pesanServer = new PesanChat(
    //       String(data.pesan.id),
    //       data.pesan.pesan,
    //       false,
    //       new Date(data.pesan.tanggalDibuat),
    //       false,
    //     );

    //     const detailResponse = await konektorBackend.get(
    //       `/api/chat/${data.idChat}`,
    //     );
    //     const detailData = await detailResponse.json();
    //     const chatBaru = dtoToChat(detailData);
    //     setDaftarPesanChat([
    //       buatPesanSambutan(chatBaru.tanggalDibuat),
    //       pesanServer,
    //     ]);
    //     onChatCreated(chatBaru);

    //     konekWebSocket(data.idChat);
    //   } else {
    //     const response = await konektorBackend.post(`/api/chat/${chat.id}`, {
    //       pesan: text,
    //     });
    //     const data = await response.json();

    //     const pesanServer = new PesanChat(
    //       String(data.pesan.id),
    //       data.pesan.pesan,
    //       false,
    //       new Date(data.pesan.tanggalDibuat),
    //       false,
    //     );
    //     setDaftarPesanChat((prev) => [
    //       ...prev.filter((p) => p.id !== pesanUserOptimistic.id),
    //       pesanServer,
    //     ]);

    //     // isSendingLokal tetap true — akan di-reset saat WS jawaban/error tiba
    //   }
    // } catch (e: any) {
    //   setDaftarPesanChat((prev) =>
    //     prev.filter((p) => p.id !== pesanUserOptimistic.id),
    //   );
    //   setIsSendingLokal(false);
    //   setMasterError(e);
    // }
  }

  return (
    <>
      {loadingPesan ? (
        <div className="w-full max-w-3xl mx-auto px-8 py-6 text-sm text-gray-400 italic">
          Memuat pesan...
        </div>
      ) : (
        <ChatMessages
          daftarPesanChat={daftarPesanChat}
          isSending={isSending}
          chat={chat}
          showTicketAction={!isSending}
        />
      )}

      <div ref={bottomRef} />
    </>
  );
}
