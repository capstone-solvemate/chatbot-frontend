import type { PeranPengguna } from "~/dasar/PeranPengguna";

export class Pengguna {
  constructor(
    public id: number,
    public nama: string,
    public email: string,
    public password: string,
    public peran: PeranPengguna[],
  ) { }
}
