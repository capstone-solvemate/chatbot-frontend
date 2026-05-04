export type StatusTiket = "Open" | "In Progress" | "Resolved" | "Closed";

export interface PesanChat {
  id: number;
  pengirim: "user" | "bot" | "admin";
  isi: string;
  waktu: string; // ISO string
}

export interface TiketDetail {
  id: number;
  nomorTiket: string; // e.g. "#001"
  status: StatusTiket;
  namaUser: string;
  emailUser: string;
  kategori: string;
  dibuatPada: string; // ISO string

  percakapanChatbot: PesanChat[];
  percakapanSupport: PesanChat[];
}
