import type { Route } from "./+types/HalamanChat";
import { useEffect, useRef, useState } from "react";
import type { Chat } from "../domain/Chat";
import TampilanPesanChat from "./komponen/TampilanPesanChat";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { useOutletContext } from "react-router";
import type { ContextHalamanChatbot } from "./ContextHalamanChatbot";
import { Environment } from "~/dasar/types/Environment";
import ChatInput from "./komponen/ChatInput";
import { ChatSendingState } from "./parameter/ChatSendingState";
import { PesanChat } from "../domain/PesanChat";
import type { ChatFormData } from "./parameter/ChatFormData";
import UserMessage from "./komponen/UserMessage";
import { getPayloadWs } from "../api/dto/DtoConverter";
import { PayloadWsChatBaru } from "../api/dto/PayloadWsChatBaru";
import { payloadWsChatBaruToChat } from "../api/dto/ConverterPayloadChatBaru";
import { PayloadWsChatReady } from "../api/dto/PayloadWsChatReady";
import { PayloadWsBuatChat } from "../api/dto/PayloadWsBuatChat";
import { PayloadWsChatUpdate } from "../api/dto/PayloadWsChatUpdate";
import { payloadWsChatUpdateToDaftarPesanChat } from "../api/dto/ConverterPayloadChatUpdate";
import { PayloadWsGetPesanChatBaru } from "../api/dto/PayloadWsGetPesanChatBaru";
import { PayloadWsPesanChatLama } from "../api/dto/PayloadWsPesanChatLama";
import { payloadWsPesanChatLamaToDaftarPesanChat } from "../api/dto/ConverterWsPesanChatLama";
import type { KoneksiWsChat } from "../api/KoneksiWsChat";
import { PayloadWsBuatPesanChat } from "../api/dto/PayloadWsBuatPesanChat";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chat Support" }];
}

export default function HalamanChat() {
  const environment = useEnvironment();

  const context = useOutletContext() as ContextHalamanChatbot;
  const konektorBackend = context.konektorBackendChatbot;

  const [fetchingPesanChat, setFetchingPesanChat] = useState(true);

  const [daftarPesan, setDaftarPesan] = useState<PesanChat[]>([]);

  const [sendingState, _setSendingState] = useState(ChatSendingState.Idle);
  const sendingStateRef = useRef<ChatSendingState>(ChatSendingState.Idle);

  const [sedangDiproses, setSedangDiproses] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  const localIdChatRef = useRef<bigint | null>(null);
  const [localIdChat, _setLocalIdChat] = useState<bigint | null>(null);

  function setSendingState(state: ChatSendingState) {
    _setSendingState(state);
    sendingStateRef.current = state;
  }

  const [sendingError, setSendingError] = useState<string | null>(null);

  const [pesanChatAkanDikirim, setPesanChatAkanDikirim] =
    useState<PesanChat | null>(null);
  const formDataAkanDikirim = useRef<ChatFormData | null>(null);

  function setLocalIdChat(idChat: bigint | null) {
    _setLocalIdChat(idChat);
    localIdChatRef.current = idChat;
  }

  function formatTime(date: Date): string {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function mockListenPesanChatLama(idChat: bigint) {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    if (idChat > 100n) {
      context.onIdChatTidakDitemukan();
    }
    setFetchingPesanChat(false);
  }

  const koneksiWs = useRef<KoneksiWsChat | null>(null);

  function showError(err: "ws_conn_failed" | "buat_chat_fail") {
    if (err === "ws_conn_failed") {
      setSendingError("Failed to connect to the server");
    } else if (err === "buat_chat_fail") {
      setSendingError("Failed to sending new message");
    }
  }

  async function validasiLampiran(files: File[]): Promise<number[]> {
    const checks = await Promise.all(
      files.map(
        (file) =>
          new Promise<{ file: File; needsResize: boolean }>(
            (resolve, reject) => {
              const img = new Image();
              const url = URL.createObjectURL(file);
              img.onload = () => {
                URL.revokeObjectURL(url);
                resolve({
                  file,
                  needsResize: img.width > 2048 || img.height > 2048,
                });
              };
              img.onerror = reject;
              img.src = url;
            },
          ),
      ),
    );

    return checks
      .map((check, index) => (check.needsResize ? index : -1))
      .filter((index) => index !== -1);
  }

  async function resize(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);

        const scale = 2048 / Math.max(img.width, img.height);
        const newWidth = Math.round(img.width * scale);
        const newHeight = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        canvas.getContext("2d")!.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Failed making blob"));
            resolve(new File([blob], file.name, { type: file.type }));
          },
          file.type,
          0.9,
        );
      };

      img.onerror = reject;
      img.src = url;
    });
  }

  async function resizeLampiran(
    files: File[],
    indices: number[],
  ): Promise<File[]> {
    const indexSet = new Set(indices);
    return Promise.all(
      files.map((file, index) =>
        indexSet.has(index) ? resize(file) : Promise.resolve(file),
      ),
    );
  }

  function getDaftarPesanChatLama() {
    konektorBackend.current.getDaftarPesanChatLama(koneksiWs.current!.ws);
  }

  function handleDaftarPesanChatLamaDiterima(payload: PayloadWsPesanChatLama) {
    const daftarPesan = payloadWsPesanChatLamaToDaftarPesanChat(payload);
    setDaftarPesan((daftarLama) => [...daftarPesan, ...daftarLama]);
    setFetchingPesanChat(false);
  }

  function getPesanChatBaru() {
    if (daftarPesan.length === 0) {
      return;
    }

    const pesanTerakhir = daftarPesan[daftarPesan.length - 1];
    const idPesanTerakhir = pesanTerakhir.id;

    const payload = new PayloadWsGetPesanChatBaru(idPesanTerakhir.toString());
    konektorBackend.current.getPesanChatBaru(payload, koneksiWs.current!.ws);
  }

  function handleServerReady(isReconnecting: boolean) {
    if (koneksiWs.current === null) {
      console.error("websocket connection down");
    }

    // flow chat baru
    if (localIdChatRef.current === null) {
    }
    // flow chat lama
    else {
      // jika sebelumnya tidak terjadi reconnect, ambil riwayat pesan
      if (!isReconnecting) {
        getDaftarPesanChatLama();
      }
      // jika sebelumnya terjadi reconnect, ambil pesan baru yang terlewat akibat disconnect
      else {
        getPesanChatBaru();
      }
    }
  }

  function handleChatBaruDibuat(pChat: Chat) {
    setPesanChatAkanDikirim(null);
    context.onChatBaruDibuat(pChat);
    setSedangDiproses(pChat.sedangDiproses);
    setDaftarPesan([...pChat.pesan]);
    setLocalIdChat(pChat.id);
  }

  function handleChatUpdate(payload: PayloadWsChatUpdate) {
    if (payload.pesan.length > 0 && !payload.pesan[0].chatAsisten) {
      setPesanChatAkanDikirim(null);
      formDataAkanDikirim.current = null;
    }

    const daftarPesanBaru = payloadWsChatUpdateToDaftarPesanChat(payload);

    setSedangDiproses(payload.sedangDiproses);

    if (daftarPesanBaru.length > 0) {
      setDaftarPesan((pesanLama) => [...pesanLama, ...daftarPesanBaru]);
    }
  }

  function handlePesanServerDiterima(data: any, isReconnecting: boolean) {
    try {
      const payload = getPayloadWs(data);
      if (payload instanceof PayloadWsChatReady) {
        handleServerReady(isReconnecting);
      } else if (payload instanceof PayloadWsPesanChatLama) {
        handleDaftarPesanChatLamaDiterima(payload);
      } else if (payload instanceof PayloadWsChatUpdate) {
        handleChatUpdate(payload);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function hubungkanWebsocket(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let returned = false;

      const ws = konektorBackend.current.listenPesanChatBaru(
        (message: MessageEvent) => {
          const payload = getPayloadWs(JSON.parse(message.data));
          if (payload instanceof PayloadWsChatReady) {
            if (!returned) {
              returned = true;
              resolve();
            }
          } else if (payload instanceof PayloadWsChatBaru) {
            const chat = payloadWsChatBaruToChat(payload);
            handleChatBaruDibuat(chat);
          } else if (payload instanceof PayloadWsChatUpdate) {
            handleChatUpdate(payload);
          }
        },
        (err) => {
          koneksiWs.current = null;

          if (!returned) {
            returned = true;
            reject(err);
          }
        },
        () => {
          koneksiWs.current = null;
        },
      );

      koneksiWs.current = {
        ws,
        idChat: null,
      };
    });
  }

  async function listenPesanChatLama(
    idChat: bigint,
    isReconnecting: boolean = false,
  ) {
    setDisconnected(false);

    if (!isReconnecting) {
      setFetchingPesanChat(true);
      setDaftarPesan([]);
    }

    if (environment === Environment.Mock) {
      await mockListenPesanChatLama(idChat);
      return;
    }

    const ws = konektorBackend.current.listenPesanChatLama(
      idChat,
      (message) => {
        handlePesanServerDiterima(JSON.parse(message.data), isReconnecting);
      },
      (e) => {
        console.error(e);
      },
      () => {},
    );

    koneksiWs.current = {
      ws,
      idChat: localIdChatRef.current,
    };
  }

  async function submit() {
    setSendingError(null);

    if (!formDataAkanDikirim.current) {
      setSendingState(ChatSendingState.Idle);
      setPesanChatAkanDikirim(null);
      return;
    }

    if (sendingStateRef.current === ChatSendingState.Idle) {
      setPesanChatAkanDikirim(
        new PesanChat(
          0n,
          0n,
          formDataAkanDikirim.current.pesan,
          new Date(),
          false,
          false,
        ),
      );

      setSendingState(ChatSendingState.Preparing);
    }

    if (sendingStateRef.current === ChatSendingState.Preparing) {
      try {
        const lampiranPerluResize = await validasiLampiran(
          formDataAkanDikirim.current.lampiran,
        );
        if (lampiranPerluResize.length > 0) {
          setSendingState(ChatSendingState.ResizingImages);
          formDataAkanDikirim.current.lampiran = await resizeLampiran(
            formDataAkanDikirim.current.lampiran,
            lampiranPerluResize,
          );
        }
      } catch (e) {
        setSendingError("Failed to validating image size or resize it");
        console.error(e);
        setSendingState(ChatSendingState.Preparing);
      }

      setSendingState(ChatSendingState.Prepared);
    }

    if (localIdChatRef.current === null) {
      if (environment === Environment.Mock) {
        setSendingState(ChatSendingState.CreatingWsConnection);
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));

        if (formDataAkanDikirim.current.pesan === "error(1)") {
          showError("ws_conn_failed");
          setSendingState(ChatSendingState.Prepared);
          return;
        }

        setSendingState(ChatSendingState.Sending);
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));

        if (formDataAkanDikirim.current.pesan === "error(2)") {
          showError("buat_chat_fail");
          setSendingState(ChatSendingState.CreatingWsConnection);
          return;
        }

        setPesanChatAkanDikirim(null);
        formDataAkanDikirim.current = null;
        setSendingState(ChatSendingState.Idle);

        return;
      }

      if (sendingStateRef.current === ChatSendingState.Prepared) {
        setSendingState(ChatSendingState.CreatingWsConnection);

        try {
          await hubungkanWebsocket();
        } catch (e) {
          showError("ws_conn_failed");
          setSendingState(ChatSendingState.Prepared);
          return;
        }
      }

      if (sendingStateRef.current === ChatSendingState.CreatingWsConnection) {
        setSendingState(ChatSendingState.Sending);

        try {
          const daftarLampiranB64: string[] = [];
          for (const lampiran of formDataAkanDikirim.current.lampiran) {
            const lampiranB64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();

              reader.onload = () => {
                resolve(reader.result as string);
              };

              reader.onerror = reject;
              reader.readAsDataURL(lampiran);
            });
            daftarLampiranB64.push(lampiranB64);
          }
          await konektorBackend.current.buatChat(
            new PayloadWsBuatChat(
              formDataAkanDikirim.current.pesan,
              daftarLampiranB64,
            ),
            koneksiWs.current!.ws,
          );
        } catch (e) {
          showError("buat_chat_fail");
          setSendingState(ChatSendingState.CreatingWsConnection);
          return;
        }

        formDataAkanDikirim.current = null;
        setSendingState(ChatSendingState.Idle);
      }
    } else {
    }
  }

  function batalkanBuatPesan() {
    formDataAkanDikirim.current = null;
    setPesanChatAkanDikirim(null);
    setSendingError(null);
    setSendingState(ChatSendingState.Idle);
  }

  async function buatPesanChat() {
    const daftarLampiranB64: string[] = [];
    for (const lampiran of formDataAkanDikirim.current!.lampiran) {
      const lampiranB64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.onerror = reject;
        reader.readAsDataURL(lampiran);
      });
      daftarLampiranB64.push(lampiranB64);
    }
    const payload = new PayloadWsBuatPesanChat(
      formDataAkanDikirim.current!.pesan,
      daftarLampiranB64,
    );
    konektorBackend.current.buatPesanChat(payload, koneksiWs.current!.ws);
  }

  async function handleSubmit(data: ChatFormData) {
    formDataAkanDikirim.current = data;
    setPesanChatAkanDikirim(
      new PesanChat(
        0n,
        localIdChatRef.current!,
        data.pesan,
        new Date(),
        false,
        false,
      ),
    );

    if (localIdChatRef.current === null) {
      await submit();
    } else {
      await buatPesanChat();
    }
  }

  function handleHalamanMount() {
    if (context.idChat !== null) {
      listenPesanChatLama(context.idChat);
    } else {
      setFetchingPesanChat(false);
      setDaftarPesan([]);
    }
  }

  function handleHalamanUnmount() {
    if (koneksiWs.current) {
      koneksiWs.current.ws.close();
    }
  }

  useEffect(() => {
    setLocalIdChat(context.idChat);
    handleHalamanMount();

    return () => {
      handleHalamanUnmount();
    };
  }, [context.idChat]);

  return (
    <div className="grow pb-16">
      <TampilanPesanChat
        idChat={localIdChat}
        processing={sedangDiproses}
        loading={fetchingPesanChat}
        daftarPesanChat={daftarPesan}
      />
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 px-8 py-6">
        <div>
          {pesanChatAkanDikirim && (
            <UserMessage
              text={pesanChatAkanDikirim.pesan}
              time={formatTime(pesanChatAkanDikirim.tanggalDibuat)}
            />
          )}
        </div>

        {!sendingError && sendingState !== ChatSendingState.Idle && (
          <div
            className="text-sm italic text-gray-600 text-end mt-2"
            id="sending-status"
          >
            {sendingState === ChatSendingState.ResizingImages &&
              "Resizing Images..."}

            {sendingState === ChatSendingState.CreatingWsConnection &&
              "Connecting to server..."}

            {sendingState === ChatSendingState.Sending &&
              "Uploading your message..."}
          </div>
        )}

        {sendingError && (
          <div
            className="flex flex-col gap-1 items-end mt-2"
            id="sending-error-message"
          >
            <div className="text-red-500 italic text-sm">{sendingError}</div>
            <div className="flex gap-2">
              <button
                className="cursor-pointer rounded text-xs py-1 px-3 hover:bg-gray-200"
                onClick={() => batalkanBuatPesan()}
                id="btn-cancel-sending-message"
              >
                Cancel
              </button>
              <button
                className="cursor-pointer rounded text-xs py-1 px-3 text-blue-600 hover:bg-blue-100"
                onClick={() => submit()}
                id="btn-retry-sending-message"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>

      <ChatInput
        expandSidebar={context.expandSidebar}
        onSubmit={handleSubmit}
        disabled={fetchingPesanChat || sendingState !== ChatSendingState.Idle}
        dialihkanKeTiket={false}
      />
    </div>
  );
}
