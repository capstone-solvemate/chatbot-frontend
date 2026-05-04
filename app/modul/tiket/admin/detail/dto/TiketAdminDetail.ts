export type StatusTiket = "open" | "in_progress" | "done";

export interface PesanChat {
  id: string;
  /** true = dari AI/asisten, false = dari karyawan */
  dariAsisten: boolean;
  isi: string;
  waktu: string; // ISO 8601
}

export interface PesanTiket {
  id: string;
  idPembuat: number;
  isi: string;
  waktu: string; // ISO 8601
}

export interface TiketAdminDetail {
  id: string;
  judul: string;
  deskripsi: string;
  idPembuat: number;
  namaPembuat: string;
  emailPembuat: string;
  idChat: string;
  idKategori: number;
  status: StatusTiket;
  dibuatPada: string;
  diperbaruiPada: string;
  pesanTiket: PesanTiket[];
  historiChat: PesanChat[];
}