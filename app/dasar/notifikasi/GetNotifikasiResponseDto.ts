export type GetNotifikasiResponseDto = {
  jumlahBelumDibaca: number;
  notifikasi: Record<string, any>[];
  adaLebihBanyak: boolean;
};

export type GetNotifikasiRequestDto = {
  sebelum?: string;
};