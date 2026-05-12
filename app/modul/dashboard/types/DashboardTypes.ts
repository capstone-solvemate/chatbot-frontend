export type HistoryItem = {
  label: string; // "Jan"–"Des" | "1"–"31" | "00"–"23"
  jumlah: number;
};

export type DashboardFilter = {
  tahun: number;
  bulan?: number; // 1–12
};

export type DashboardWsPayload = {
  totalTiket: number;
  tiketTerbuka: number;
  deflectionRate: number;      // 0–100, persentase
  totalSesiChat: number;
  historyTiket: HistoryItem[];
  historySesiChat: HistoryItem[];
  avgAktivitasPerJam: HistoryItem[]; // 24 item, jam 00–23
  mostFrequentIssues: null;          // belum tersedia dari server
  filter: DashboardFilter;
};