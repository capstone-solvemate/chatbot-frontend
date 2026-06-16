export type PesanTiketResponseDto = {
  id: string;
  idTiket: string;
  idPembuat: number;
  pesan: string;
  dibuatPada: string;
};

export type TiketResponseDto = {
  id: string;
  judul: string;
  deskripsi: string;
  idPembuat: number;
  idChat: string;
  idKategori: number;
  status: string;
  dibuatPada: string;
  diperbaruiPada: string;
  lampiran: any
};

export type TiketDetailResponseDto = TiketResponseDto & {
  pesanTiket: PesanTiketResponseDto[];
};