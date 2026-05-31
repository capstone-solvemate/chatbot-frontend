import { useOutletContext } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockContextHalamanChatbot } from "./ContextHalamanChatbotStub";
import { render, waitFor, type RenderResult } from "@testing-library/react";
import HalamanChat from "./HalamanChat";
import { mockKonektorBackendChatbot } from "../api/KonektorBackendChatbotStub";
import type { KonektorBackendChatbot } from "../api/KonektorBackendChatbot";
import { userEvent } from "@testing-library/user-event";
import type { WsErrorResponse } from "~/dasar/api/ws/dto/WsErrorResponse";
import { mockWebSocket } from "~/dasar/api/ws/stub/websocket/WebSocketStub";
import { PayloadIdKoneksiWsChat } from "../api/dto/PayloadIdKoneksiWsChat";
import { TipePayloadWsChat } from "../api/dto/TipePayloadWsChat";
import { mockMessageEvent } from "~/dasar/api/ws/stub/websocket/MessageEventStub";

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
  useOutletContext: vi.fn(),
}));

function getInputPesan(renderResult: RenderResult) {
  return renderResult.container.querySelector(
    `#form_message input[name="pesan"]`,
  );
}

function getTombolKirim(renderResult: RenderResult) {
  return renderResult.container.querySelector(
    `#form_message button[type="submit"]`,
  );
}

function renderHalaman(
  overrides: {
    konektorBackendChatbot?: KonektorBackendChatbot;
  } = {},
): RenderResult {
  vi.mocked(useOutletContext).mockReturnValue(
    mockContextHalamanChatbot({
      idChat: null,
      konektorBackendChatbot: overrides.konektorBackendChatbot,
    }),
  );

  window.HTMLElement.prototype.scrollIntoView = function () {};

  return render(<HalamanChat />);
}

describe("HalamanChat", () => {
  describe("harus menampilkan UI minimal untuk input pesan chat", () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = renderHalaman();
    });

    it("harus menampilkan input field pesan", () => {
      expect(getInputPesan(renderResult)).toBeInTheDocument();
    });

    it("harus menampilkan tombol kirim", () => {
      expect(getTombolKirim(renderResult)).toBeInTheDocument();
    });
  });

  describe("saat pengguna submit pesan chat baru", () => {
    // it("dilarang", () => {});

    it(`harus panggil fungsi "listenPesanChatBaru"`, async () => {
      const pesan = "How to resolve paper jam?";

      const konektorBackendChatbot = mockKonektorBackendChatbot();
      const renderResult = renderHalaman({
        konektorBackendChatbot,
      });

      const inputPesan = getInputPesan(renderResult)!;
      const tombolKirim = getTombolKirim(renderResult)!;

      await userEvent.type(inputPesan, pesan);
      await userEvent.click(tombolKirim);

      expect(konektorBackendChatbot.listenPesanChatBaru).toHaveBeenCalled();
    });

    it(`harus menampilkan pesan "Connecting to server..." tepat sebelum memanggil fungsi "listenPesanChatBaru"`, async () => {
      const pesan = "How to resolve paper jam?";

      const konektorBackendChatbot = mockKonektorBackendChatbot();
      const renderResult = renderHalaman({
        konektorBackendChatbot,
      });

      const inputPesan = getInputPesan(renderResult)!;
      const tombolKirim = getTombolKirim(renderResult)!;

      await userEvent.type(inputPesan, pesan);
      await userEvent.click(tombolKirim);

      await waitFor(() => {
        const sendingStatus =
          renderResult.container.querySelector("#sending-status");
        expect(sendingStatus).toHaveTextContent("Connecting to server...");
      });
    });

    it(`harus panggil fungsi "buatChat" dengan pesan dan idKoneksi yang sesuai`, async () => {
      const pesan = "How to resolve paper jam?";

      const idKoneksi = "test";

      const konektorBackendChatbot = mockKonektorBackendChatbot({
        listenPesanChatBaru: (
          onMessage: (event: MessageEvent) => void,
        ): WebSocket => {
          onMessage(
            mockMessageEvent({
              data: JSON.stringify({
                tipe: TipePayloadWsChat.IdKoneksi,
                idKoneksi,
              }),
            }),
          );
          return mockWebSocket();
        },
      });
      const renderResult = renderHalaman({
        konektorBackendChatbot,
      });

      const inputPesan = getInputPesan(renderResult)!;
      const tombolKirim = getTombolKirim(renderResult)!;

      await userEvent.type(inputPesan, pesan);
      await userEvent.click(tombolKirim);

      expect(konektorBackendChatbot.buatChat).toHaveBeenCalledWith(
        expect.objectContaining({
          idKoneksiWs: idKoneksi,
          pesan: pesan,
        }),
      );
    });

    it(`harus menampilkan pesan "Uploading your message..." tepat sebelum memanggil fungsi "buatChat"`, async () => {
      const pesan = "How to resolve paper jam?";

      const idKoneksi = "test";

      let selesaikanFungsiPesanBaru = { fn: null as (() => void) | null };

      const konektorBackendChatbot = mockKonektorBackendChatbot({
        listenPesanChatBaru: (
          onMessage: (event: MessageEvent) => void,
        ): WebSocket => {
          onMessage(
            mockMessageEvent({
              data: JSON.stringify({
                tipe: TipePayloadWsChat.IdKoneksi,
                idKoneksi,
              }),
            }),
          );
          return mockWebSocket();
        },
        buatChat: () => {
          return new Promise<void>((resolve) => {
            selesaikanFungsiPesanBaru.fn = () => {
              resolve();
            };
          });
        },
      });
      const renderResult = renderHalaman({
        konektorBackendChatbot,
      });

      const inputPesan = getInputPesan(renderResult)!;
      const tombolKirim = getTombolKirim(renderResult)!;

      await userEvent.type(inputPesan, pesan);
      await userEvent.click(tombolKirim);

      await waitFor(() => {
        const sendingStatus =
          renderResult.container.querySelector("#sending-status");
        expect(sendingStatus).toHaveTextContent("Uploading your message...");
      });

      selesaikanFungsiPesanBaru.fn?.();
    });
  });
});
