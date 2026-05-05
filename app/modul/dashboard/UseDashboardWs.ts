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

  // Refs so callbacks always have fresh values without triggering re-connects
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
    if (filter.bulan !== undefined && filter.minggu !== undefined) {
      url.searchParams.set("minggu", String(filter.minggu));
    }
    return url.toString();
  }

  function connect(filter: DashboardFilter) {
    // Clean up any existing socket before opening a new one
    if (wsRef.current) {
      wsRef.current.onclose = null; // prevent reconnect loop from old socket
      wsRef.current.close();
    }

    setStatus("connecting");
    const ws = new WebSocket(buildWsUrl(filter));
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      setStatus("open");
      reconnectAttemptRef.current = 0;

      // If a filter change arrived while we were still connecting, send it now
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

      // Do NOT reconnect if we closed it intentionally
      if (isManuallyClosed.current) return;

      // Do NOT reconnect on auth-related close codes
      if (event.code === 4001) {
        onSessionExpired();
        return;
      }

      // Exponential backoff reconnect
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

  // Open connection once on mount
  useEffect(() => {
    isManuallyClosed.current = false;
    connect(initialFilter);

    return () => {
      isManuallyClosed.current = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);

      // Delay close sedikit — menghindari Strict Mode double-invoke
      // menutup koneksi yang legitimate
      const wsToClose = wsRef.current;
      setTimeout(() => {
        if (isManuallyClosed.current) {
          wsToClose?.close();
        }
      }, 100);
    };
  }, []);

  /**
   * Send a new filter to the server without reconnecting.
   * Safe to call at any time — queues the message if socket isn't open yet.
   */
  function sendFilter(filter: DashboardFilter) {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ filter }));
    } else {
      // Socket not ready yet — queue it; will be sent on open
      pendingFilterRef.current = filter;
    }
  }

  return { data, status, sendFilter };
}