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
