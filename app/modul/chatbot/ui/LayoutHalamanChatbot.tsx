import { Outlet } from "react-router";
import { useKonektorRestApi } from "~/dasar/hooks/useKonektorRestApi";
import { useKonektorWebsocket } from "~/dasar/hooks/useKonektorWebsocket";
import { KonektorBackendChatbot } from "../api/KonektorBackendChatbot";
import { useEffect, useRef, useState } from "react";
import type { Chat } from "../domain/Chat";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { Environment } from "~/dasar/types/Environment";
import { mockChats } from "../domain/ChatStub";
import { useAppContext } from "~/dasar/hooks/useAppContext";
import PageHeader from "./komponen/PageHeader";
import ChatSidebar from "./komponen/ChatSidebar";
import { useParams } from "react-router";
import PopupError from "~/dasar/ui/tampilan/PopupError";
import { useNavigate } from "react-router";

const KEY_LS_EXPAND_SIDEBAR = "expand_sidebar_chat_karyawan";

export default function LayoutHalamanChat() {
  const [idChatAktif, setIdChatAktif] = useState<bigint | null | undefined>(
    undefined,
  );

  const [idBukanAngka, setIdBukanAngka] = useState<boolean>(false);
  const [idTidakDitemukan, setIdTidakDitemukan] = useState<boolean>(false);

  function resolveIdErrors() {
    setIdBukanAngka(false);
    setIdTidakDitemukan(false);
  }

  const { id: idDariUrl } = useParams<{ id?: string }>();
  useEffect(() => {
    try {
      if (!idDariUrl) {
        setIdChatAktif(null);
        resolveIdErrors();
      } else {
        setIdChatAktif(BigInt(idDariUrl));
      }
    } catch (e) {
      setIdBukanAngka(true);
    }
  }, [idDariUrl]);

  const navigate = useNavigate();

  const appContext = useAppContext();

  const konektorRestApi = useKonektorRestApi();
  const konektorWebsocket = useKonektorWebsocket();

  const konektorBackendChatbot = useRef<KonektorBackendChatbot | null>(null);

  const [daftarChat, setDaftarChat] = useState<Chat[]>([]);
  const [fetchingDaftarChat, setFetchingDaftarChat] = useState(true);

  const environment = useEnvironment();

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

  function handleIdChatTidakDitemukan() {
    setIdTidakDitemukan(true);
  }

  async function fetchDaftarChat(): Promise<void> {
    if (environment === Environment.Mock) {
      setFetchingDaftarChat(true);
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      setDaftarChat(mockChats());
      setFetchingDaftarChat(false);
      return;
    }

    try {
      setFetchingDaftarChat(true);
      const daftarChatBaru =
        await konektorBackendChatbot.current!.getDaftarChat();
      setDaftarChat(daftarChatBaru);
    } catch (e) {
      // setMasterError(e);
    } finally {
      setFetchingDaftarChat(false);
    }
  }

  function onPageMounted() {
    if (!konektorBackendChatbot.current) {
      konektorBackendChatbot.current = new KonektorBackendChatbot(
        konektorRestApi,
        konektorWebsocket,
      );
    }

    fetchDaftarChat();
  }

  useEffect(() => {
    onPageMounted();
  }, []);

  return (
    <div className="min-h-default bg-gray-50">
      <div className="pb-6 pt-36">
        <PageHeader onToggleExpand={toggleExpandSidebar} />

        <div className="flex rounded-xl">
          <ChatSidebar
            loading={fetchingDaftarChat}
            daftarChat={daftarChat}
            expand={expandSidebar}
            idChatAktif={idChatAktif ?? null}
          />
          <div
            className={`${expandSidebar ? "w-64" : "w-0"} shrink-0 transition-all ease-out`}
          />

          {idBukanAngka && (
            <PopupError
              title="Invalid Chat ID"
              message="The system detected a non-numeric chat ID in the URL."
              closable={true}
              onClose={() => {
                navigate("/chat");
              }}
              closeCaption="Fix"
            />
          )}

          {idTidakDitemukan && (
            <PopupError
              title="Invalid Chat ID"
              message={`Chat with ID '${idChatAktif}' was not found.`}
              closable={true}
              onClose={() => {
                navigate("/chat");
              }}
              closeCaption="New Chat"
            />
          )}

          {!idBukanAngka && idChatAktif !== undefined && (
            <Outlet
              context={{
                ...appContext,
                konektorBackendChatbot,
                expandSidebar,
                idChat: idChatAktif,
                onIdChatTidakDitemukan: handleIdChatTidakDitemukan,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
