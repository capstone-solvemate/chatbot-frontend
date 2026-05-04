export enum StatusTiket {
  Open,
  InProgress,
  Resolved,
}

export function statusTiketToString(status: StatusTiket): string {
  switch (status) {
    case StatusTiket.Open:
      return "Open";
    case StatusTiket.InProgress:
      return "In Progress";
    case StatusTiket.Resolved:
      return "Resolved";
  }
}

export function stringToStatusTiket(status: string): StatusTiket {
  switch (status) {
    case "Open": return StatusTiket.Open;
    case "In Progress": return StatusTiket.InProgress;
    case "Done": return StatusTiket.Resolved;
    default: return StatusTiket.Open;
  }
}