import type { Kategori } from "~/modul/settings/kategori/Kategori";

/** 1 = open, 2 = in_progress, 3 = done */
export type StatusTiketAngka = 1 | 2 | 3;

/** String representasi status untuk keperluan display */
export type StatusTiketString = "open" | "in_progress" | "done";

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
  status: StatusTiketAngka;
  dibuatPada: string;
  diperbaruiPada: string;
  pesanTiket: PesanTiket[];
  historiChat: PesanChat[];
  kategori?: Kategori;
  lampiranIds: string[]
}