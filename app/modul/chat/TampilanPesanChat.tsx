import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { PesanChat } from "./PesanChat";
import type { Chat } from "./Chat";
import type { ContextType } from "~/dasar/ContextType";
import { dtoToChat, dtoToPesanChat } from "./dto/converters";

type Props = {
  expandSidebar: boolean;
  chat: Chat | null;
  onChatCreated: (chat: Chat) => void;
};

const PESAN_SAMBUTAN = new PesanChat(
  "0",
  "Hello! I'm your AI assistant. I can help you with equipment issues, technical questions, and printing problems. How can I assist you today?",
  true,
  new Date(),
);

export default function TampilanPesanChat({
  expandSidebar,
  chat,
  onChatCreated,
}: Props) {
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();
  const navigate = useNavigate();

  const [daftarPesanChat, setDaftarPesanChat] = useState<PesanChat[]>([
    PESAN_SAMBUTAN,
  ]);
  const [isSending, setIsSending] = useState(false);
  const [tiketDisarankan, setTiketDisarankan] = useState(false);
  const [loadingPesan, setLoadingPesan] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Scroll ke bawah tiap ada pesan baru atau saat menunggu
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [daftarPesanChat, isSending]);

  // Load histori pesan dan setup WebSocket saat chat aktif berubah
  useEffect(() => {
    // Tutup WebSocket lama jika ada
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (!chat) {
      setDaftarPesanChat([PESAN_SAMBUTAN]);
      return;
    }

    async function loadPesanDanKonekWs() {
      setLoadingPesan(true);
      try {
        const response = await konektorBackend.get(`/api/chat/${chat!.id}`);
        const data = await response.json();
        const pesan: PesanChat[] = (data.pesan ?? []).map((dto: any) =>
          dtoToPesanChat(dto),
        );
        setDaftarPesanChat([PESAN_SAMBUTAN, ...pesan]);
      } catch (e: any) {
        setMasterError(e);
      } finally {
        setLoadingPesan(false);
      }

      // Konek WebSocket setelah load histori
      konekWebSocket(chat!.id);
    }

    loadPesanDanKonekWs();

    return () => {
      // Cleanup saat component unmount atau chat berganti
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [chat?.id]);

  useEffect(() => {
    setTiketDisarankan(chat !== null);
    console.log(chat !== null);
  }, [chat]);

  function konekWebSocket(idChat: string) {
    const wsBaseUrl = (import.meta.env.VITE_SITE_URL as string)
      .replace(/^https?/, (m) => (m === "https" ? "wss" : "ws"))
      .replace(/\/$/, "");

    const ws = new WebSocket(`${wsBaseUrl}/api/chat/${idChat}/ws`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "jawaban": {
            const pesanBaru = dtoToPesanChat({
              ...data.pesan,
              chatAsisten: true,
            });
            setDaftarPesanChat((prev) => [...prev, pesanBaru]);
            setIsSending(false);
            break;
          }
          case "error": {
            // Tampilkan pesan error sebagai pesan bot
            const pesanError = new PesanChat(
              `err-${Date.now()}`,
              data.pesan,
              true,
              new Date(),
            );
            setDaftarPesanChat((prev) => [...prev, pesanError]);
            setIsSending(false);
            break;
          }
          case "session_expired": {
            navigate("/login");
            break;
          }
        }
      } catch (_e) {
        // Abaikan pesan WebSocket yang tidak valid
      }
    };

    ws.onclose = (event) => {
      if (event.code === 4001) {
        navigate("/login");
      }
      // Untuk kode close lain (misal server restart), bisa tambahkan
      // logika reconnect di sini jika diperlukan
    };

    ws.onerror = () => {
      setIsSending(false);
    };
  }

  async function handleSend(text: string) {
    if (isSending) return;

    // Tambahkan pesan user ke UI segera (optimistic)
    const pesanUserOptimistic = new PesanChat(
      `temp-${Date.now()}`,
      text,
      false,
      new Date(),
    );
    setDaftarPesanChat((prev) => [...prev, pesanUserOptimistic]);
    setIsSending(true);

    try {
      if (!chat) {
        // Buat chat baru dengan pesan pertama
        const response = await konektorBackend.post("/api/chat", {
          pesan: text,
        });
        const data = await response.json();

        // Ganti pesan optimistic dengan data server
        const pesanServer = new PesanChat(
          String(data.pesan.id),
          data.pesan.pesan,
          false,
          new Date(data.pesan.tanggalDibuat),
        );
        setDaftarPesanChat([pesanServer]);

        // Buat objek Chat dari response lalu notifikasi parent
        // GET /api/chat/:id untuk ambil data subjek
        const detailResponse = await konektorBackend.get(
          `/api/chat/${data.idChat}`,
        );
        const detailData = await detailResponse.json();
        const chatBaru = dtoToChat(detailData);
        onChatCreated(chatBaru);

        // Konek WebSocket untuk terima jawaban asisten
        konekWebSocket(data.idChat);
      } else {
        // Kirim pesan balasan ke chat yang sudah ada
        const response = await konektorBackend.post(`/api/chat/${chat.id}`, {
          pesan: text,
        });
        const data = await response.json();

        // Ganti pesan optimistic dengan data dari server
        const pesanServer = new PesanChat(
          String(data.pesan.id),
          data.pesan.pesan,
          false,
          new Date(data.pesan.tanggalDibuat),
        );
        setDaftarPesanChat((prev) => [
          ...prev.filter((p) => p.id !== pesanUserOptimistic.id),
          pesanServer,
        ]);

        // isSending tetap true — akan di-set false saat jawaban WebSocket tiba
      }
    } catch (e: any) {
      // Rollback pesan optimistic jika request gagal
      setDaftarPesanChat((prev) =>
        prev.filter((p) => p.id !== pesanUserOptimistic.id),
      );
      setIsSending(false);
      setMasterError(e);
    }
  }

  return (
    <div className="grow pb-16">
      {loadingPesan ? (
        <div className="w-full max-w-3xl mx-auto px-8 py-6 text-sm text-gray-400 italic">
          Memuat pesan...
        </div>
      ) : (
        <ChatMessages
          daftarPesanChat={daftarPesanChat}
          isSending={isSending}
          chat={chat}
        />
      )}

      <div ref={bottomRef} />

      <ChatInput
        expandSidebar={expandSidebar}
        onSend={handleSend}
        isSending={isSending}
      />
    </div>
  );
}
