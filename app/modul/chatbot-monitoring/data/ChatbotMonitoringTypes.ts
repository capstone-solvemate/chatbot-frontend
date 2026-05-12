export type ChatbotHistoryItem = {
  label: string; // "Jan"–"Des" | "1"–"31" | "00"–"23"
  jumlah: number;
};

export type ChatbotMonitoringFilter = {
  tahun: number;
  bulan?: number; // 1–12
};

export type UnansweredQuestion = {
  id: number;
  question: string;
  askedCount: number;
};

export type ChatbotMonitoringWsPayload = {
  totalSesi: number;
  totalPesan: number;
  avgPesanPerSesi: number;
  unansweredQuestions: number;            // proxy: total tiket dalam filter
  historyAktivitas: ChatbotHistoryItem[]; // sesi chat per periode
  avgSesiPerJam: ChatbotHistoryItem[];    // 24 item jam 00–23
  topUnansweredQuestions: null;           // belum tersedia dari server
  filter: ChatbotMonitoringFilter;
};