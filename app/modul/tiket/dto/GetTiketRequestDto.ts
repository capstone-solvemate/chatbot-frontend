export type GetTiketRequestDto = {
  status?: 1 | 2 | 3 | null;
  idKategori?: number | null;
  kata?: string | null;
};