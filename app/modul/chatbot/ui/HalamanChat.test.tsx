import { useOutletContext } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockContextHalamanChatbot } from "./ContextHalamanChatbotStub";
import { render, waitFor, type RenderResult } from "@testing-library/react";
import HalamanChat from "./HalamanChat";
import { mockKonektorBackendChatbot } from "../api/KonektorBackendChatbotStub";
import type { KonektorBackendChatbot } from "../api/KonektorBackendChatbot";
import { userEvent } from "@testing-library/user-event";
import { mockWebSocket } from "~/dasar/api/ws/stub/websocket/WebSocketStub";
import { TipePayloadWsChat } from "../api/dto/TipePayloadWsChat";
import { mockMessageEvent } from "~/dasar/api/ws/stub/websocket/MessageEventStub";
import { WsError } from "~/dasar/api/ws/dto/WsError";
import { ApiErrorCodes } from "~/dasar/api/ApiErrorCodes";
import { HttpError } from "~/dasar/api/rest/KonektorRestApi";

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

    describe(`jika terjadi error saat memanggil fungsi "listenPesanChatBaru"`, () => {
      describe("harus menampilkan UI error", () => {
        let renderResult: RenderResult;

        beforeEach(() => {
          const konektorBackendChatbot = mockKonektorBackendChatbot({
            listenPesanChatBaru: (onMessage, onError) => {
              onError(
                new WsError(4500, {
                  error: ApiErrorCodes.ServerError,
                  message: "server error",
                }),
              );
              return mockWebSocket();
            },
          });
          renderResult = renderHalaman({
            konektorBackendChatbot,
          });
        });

        it(`harus menampilkan pesan error "Failed to connect to the server"`, async () => {
          const pesan = "How to resolve paper jam?";

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          await waitFor(() => {
            const sendingErrorMessage = renderResult.container.querySelector(
              "#sending-error-message",
            );
            expect(sendingErrorMessage).toHaveTextContent(
              "Failed to connect to the server",
            );
          });
        });

        it(`harus menampilkan tombol retry`, async () => {
          const pesan = "How to resolve paper jam?";

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          await waitFor(() => {
            const tombolRetry = renderResult.container.querySelector(
              "#btn-retry-sending-message",
            );
            expect(tombolRetry).toHaveTextContent("Retry");
          });
        });

        it(`harus menampilkan tombol cancel`, async () => {
          const pesan = "How to resolve paper jam?";

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          await waitFor(() => {
            const tombolCancel = renderResult.container.querySelector(
              "#btn-cancel-sending-message",
            );
            expect(tombolCancel).toHaveTextContent("Cancel");
          });
        });
      });

      describe("saat tombol retry diklik", () => {
        it(`harus memanggil kembali fungsi "listenPesanChatBaru"`, async () => {
          const pesan = "How to resolve paper jam?";

          let jumlahPanggilanListenPesanChatBaru = 0;

          const konektorBackendChatbot = mockKonektorBackendChatbot({
            listenPesanChatBaru: (_onMessage, onError) => {
              jumlahPanggilanListenPesanChatBaru++;
              onError(
                new WsError(4500, {
                  error: ApiErrorCodes.ServerError,
                  message: "server error",
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

          const tombolRetry = await waitFor(() => {
            return renderResult.container.querySelector(
              "#btn-retry-sending-message",
            )!;
          });

          konektorBackendChatbot.listenPesanChatBaru = (onMessage) => {
            jumlahPanggilanListenPesanChatBaru++;
            onMessage(mockMessageEvent());
            return mockWebSocket();
          };

          await userEvent.click(tombolRetry);

          expect(jumlahPanggilanListenPesanChatBaru).toBe(2);
        });

        it(`harus menyembunyikan UI error`, async () => {
          const pesan = "How to resolve paper jam?";

          const konektorBackendChatbot = mockKonektorBackendChatbot({
            listenPesanChatBaru: (_onMessage, onError) => {
              onError(
                new WsError(4500, {
                  error: ApiErrorCodes.ServerError,
                  message: "server error",
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

          const tombolRetry = await waitFor(() => {
            const btn = renderResult.container.querySelector(
              "#btn-retry-sending-message",
            )!;
            expect(btn).toBeInTheDocument();
            return btn;
          });

          konektorBackendChatbot.listenPesanChatBaru = (onMessage) => {
            onMessage(
              mockMessageEvent({
                data: JSON.stringify({
                  tipe: TipePayloadWsChat.IdKoneksi,
                  idKoneksi: "test",
                }),
              }),
            );
            return mockWebSocket();
          };

          await userEvent.click(tombolRetry);

          await waitFor(() => {
            const uiError = renderResult.container.querySelector(
              "#sending-error-message",
            );
            expect(uiError).not.toBeInTheDocument();
          });
        });
      });
    });

    describe(`jika terjadi error saat memanggil fungsi "buatChat"`, () => {
      const listenPesanChatBaru = (onMessage: (e: MessageEvent) => void) => {
        onMessage(
          mockMessageEvent({
            data: JSON.stringify({
              tipe: TipePayloadWsChat.IdKoneksi,
              idKoneksi: "test",
            }),
          }),
        );
        return mockWebSocket();
      };

      describe("harus menampilkan UI error", () => {
        let renderResult: RenderResult;

        beforeEach(() => {
          const konektorBackendChatbot = mockKonektorBackendChatbot({
            listenPesanChatBaru,
            buatChat: vi.fn().mockRejectedValue(new HttpError(500, {})),
          });
          renderResult = renderHalaman({
            konektorBackendChatbot,
          });
        });

        it(`harus menampilkan pesan error "Failed to sending new message"`, async () => {
          const pesan = "How to resolve paper jam?";

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          await waitFor(() => {
            const sendingErrorMessage = renderResult.container.querySelector(
              "#sending-error-message",
            );
            expect(sendingErrorMessage).toHaveTextContent(
              "Failed to sending new message",
            );
          });
        });

        it(`harus menampilkan tombol retry`, async () => {
          const pesan = "How to resolve paper jam?";

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          await waitFor(() => {
            const tombolRetry = renderResult.container.querySelector(
              "#btn-retry-sending-message",
            );
            expect(tombolRetry).toHaveTextContent("Retry");
          });
        });

        it(`harus menampilkan tombol cancel`, async () => {
          const pesan = "How to resolve paper jam?";

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          await waitFor(() => {
            const tombolCancel = renderResult.container.querySelector(
              "#btn-cancel-sending-message",
            );
            expect(tombolCancel).toHaveTextContent("Cancel");
          });
        });
      });

      describe("saat tombol retry diklik", () => {
        it(`harus memanggil kembali fungsi "buatChat"`, async () => {
          const pesan = "How to resolve paper jam?";

          const konektorBackendChatbot = mockKonektorBackendChatbot({
            listenPesanChatBaru: listenPesanChatBaru,
            buatChat: vi.fn().mockRejectedValue(new HttpError(500, {})),
          });

          const renderResult = renderHalaman({
            konektorBackendChatbot,
          });

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          const tombolRetry = await waitFor(() => {
            return renderResult.container.querySelector(
              "#btn-retry-sending-message",
            )!;
          });

          konektorBackendChatbot.buatChat = vi.fn().mockReturnValue({ id: 5n });

          await userEvent.click(tombolRetry);

          expect(konektorBackendChatbot.buatChat).toHaveBeenCalled();
        });

        it(`harus menyembunyikan UI error`, async () => {
          const pesan = "How to resolve paper jam?";

          const konektorBackendChatbot = mockKonektorBackendChatbot({
            listenPesanChatBaru: listenPesanChatBaru,
            buatChat: vi.fn().mockRejectedValue(new HttpError(500, {})),
          });

          const renderResult = renderHalaman({
            konektorBackendChatbot,
          });

          const inputPesan = getInputPesan(renderResult)!;
          const tombolKirim = getTombolKirim(renderResult)!;

          await userEvent.type(inputPesan, pesan);
          await userEvent.click(tombolKirim);

          const tombolRetry = await waitFor(() => {
            const btn = renderResult.container.querySelector(
              "#btn-retry-sending-message",
            )!;
            expect(btn).toBeInTheDocument();
            return btn;
          });

          konektorBackendChatbot.buatChat = vi.fn().mockReturnValue({ id: 5n });

          await userEvent.click(tombolRetry);

          await waitFor(() => {
            const uiError = renderResult.container.querySelector(
              "#sending-error-message",
            );
            expect(uiError).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});
