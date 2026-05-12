import { useEffect, useRef, useState } from "react";
import type { DashboardFilter, DashboardWsPayload } from "./types/DashboardTypes";

type WsStatus = "connecting" | "open" | "closed" | "error";

type UseDashboardWsReturn = {
  data: DashboardWsPayload | null;
  status: WsStatus;
  sendFilter: (filter: DashboardFilter) => void;
};

const RECONNECT_BASE_DELAY_MS = 1000;
const RECONNECT_MAX_DELAY_MS = 30000;
const RECONNECT_MAX_ATTEMPTS = 8;

export function useDashboardWs(
  initialFilter: DashboardFilter,
  onSessionExpired: () => void,
): UseDashboardWsReturn {
  const [data, setData] = useState<DashboardWsPayload | null>(null);
  const [status, setStatus] = useState<WsStatus>("connecting");

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isManuallyClosed = useRef(false);
  const pendingFilterRef = useRef<DashboardFilter | null>(null);

  function buildWsUrl(filter: DashboardFilter): string {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const url = new URL(`/api/dashboard/ws`, `${protocol}://${window.location.host}`);
    url.searchParams.set("tahun", String(filter.tahun));
    if (filter.bulan !== undefined) {
      url.searchParams.set("bulan", String(filter.bulan));
    }
    return url.toString();
  }

  function connect(filter: DashboardFilter) {
    if (wsRef.current) {
      wsRef.current.onclose = null;
      wsRef.current.close();
    }

    setStatus("connecting");
    const ws = new WebSocket(buildWsUrl(filter));
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      setStatus("open");
      reconnectAttemptRef.current = 0;

      if (pendingFilterRef.current) {
        ws.send(JSON.stringify({ filter: pendingFilterRef.current }));
        pendingFilterRef.current = null;
      }
    });

    ws.addEventListener("message", (event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data as string);

        if (payload.type === "session_expired") {
          isManuallyClosed.current = true;
          ws.close();
          onSessionExpired();
          return;
        }

        setData(payload as DashboardWsPayload);
      } catch {
        // Malformed message — silently ignore
      }
    });

    ws.addEventListener("error", () => {
      setStatus("error");
    });

    ws.addEventListener("close", (event: CloseEvent) => {
      setStatus("closed");

      if (isManuallyClosed.current) return;

      if (event.code === 4001) {
        onSessionExpired();
        return;
      }

      const attempt = reconnectAttemptRef.current;
      if (attempt >= RECONNECT_MAX_ATTEMPTS) return;

      const delay = Math.min(
        RECONNECT_BASE_DELAY_MS * 2 ** attempt,
        RECONNECT_MAX_DELAY_MS,
      );
      reconnectAttemptRef.current += 1;

      reconnectTimerRef.current = setTimeout(() => {
        connect(initialFilter);
      }, delay);
    });
  }

  useEffect(() => {
    isManuallyClosed.current = false;
    connect(initialFilter);

    return () => {
      isManuallyClosed.current = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);

      const wsToClose = wsRef.current;
      setTimeout(() => {
        if (isManuallyClosed.current) {
          wsToClose?.close();
        }
      }, 100);
    };
  }, []);

  function sendFilter(filter: DashboardFilter) {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ filter }));
    } else {
      pendingFilterRef.current = filter;
    }
  }

  return { data, status, sendFilter };
}