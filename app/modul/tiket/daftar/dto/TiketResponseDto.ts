export type TiketResponseDto = {
  id: string;
  judul: string;
  deskripsi: string;
  idPembuat: number;
  idChat: string;
  idKategori: number;
  status: "open" | "in_progress" | "done";
  dibuatPada: string;
  diperbaruiPada: string;
};