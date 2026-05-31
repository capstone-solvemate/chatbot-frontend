import type { WsErrorResponse } from "./WsErrorResponse";

export class WsError extends Error {
  constructor(
    public code: number,
    public reason: WsErrorResponse
  ) {
    super(`WsError with code ${code}: ${reason.error}`)
  }
}