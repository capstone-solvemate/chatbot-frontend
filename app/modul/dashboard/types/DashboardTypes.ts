export type HistoryItem = {
  label: string;
  jumlah: number;
};

export type DashboardFilter = {
  tahun: number;
  bulan?: number;
};

export type DashboardWsPayload = {
  totalTiket: number;
  tiketTerbuka: number;
  history: HistoryItem[];
  filter: DashboardFilter;
};  