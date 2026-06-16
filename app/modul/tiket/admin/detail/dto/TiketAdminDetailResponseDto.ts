export type PesanChatResponseDto = {
  id: string;
  idChat: string;
  pesan: string;
  dibuatPada: string; // ISO 8601
  dariAsisten: boolean; // true = dari AI, false = dari karyawan
};

export type PesanTiketResponseDto = {
  id: string;
  idTiket: string;
  idPembuat: number;
  pesan: string;
  dibuatPada: string; // ISO 8601
  lampiran: any[]
};

export type TiketResponseDto = {
  id: string;
  judul: string;
  deskripsi: string;
  idPembuat: number;
  namaPembuat: string;
  idChat: string;
  idKategori: number;
  status: "open" | "in_progress" | "done";
  dibuatPada: string;
  diperbaruiPada: string;
};

export type TiketAdminDetailResponseDto = TiketResponseDto & {
  emailPembuat: string;
  pesanTiket: PesanTiketResponseDto[];
  historiChat: PesanChatResponseDto[];
  lampiran: any[]
};